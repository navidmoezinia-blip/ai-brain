"""File-only Epic section handoffs. Chart text is never executable or logged."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import uuid


class SectionError(Exception):
    pass


class SafeParser(argparse.ArgumentParser):
    def error(self, message):
        self.exit(2, '{"status":"failed","error":"invalid_arguments"}\n')


def require(condition, category):
    if not condition:
        raise SectionError(category)


def sha(data):
    return hashlib.sha256(data).hexdigest()


def identifier(value):
    require(isinstance(value, str) and re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_-]{0,63}', value), 'invalid_identifier')
    require(value.upper() not in {'CON', 'PRN', 'AUX', 'NUL', *(f'COM{i}' for i in range(10)), *(f'LPT{i}' for i in range(10))}, 'invalid_identifier')
    return value


def safe_path(path):
    path = Path(path).absolute()
    require(not any(p.is_symlink() or p.is_junction() for p in (path, *path.parents)), 'linked_path')
    return path.resolve()


def outside_git(path):
    path = safe_path(path)
    require(not any((p / '.git').exists() for p in (path, *path.parents)), 'output_inside_git')
    return path


def child(base, relative):
    require(isinstance(relative, str) and relative, 'invalid_relative_path')
    rel = Path(relative)
    require(not rel.is_absolute() and not rel.drive and '..' not in rel.parts, 'unsafe_path')
    target = safe_path(base / rel)
    require(target.is_relative_to(base), 'unsafe_path')
    return target


def read_json(path):
    value = json.loads(Path(path).read_bytes().decode('utf-8'))
    require(isinstance(value, dict), 'invalid_json_object')
    return value


def write_bytes(path, data):
    """Publish flushed bytes without replacing an existing destination."""
    temporary = path.with_name('.' + path.name + '.' + uuid.uuid4().hex + '.tmp')
    try:
        with open(temporary, 'xb') as output:
            output.write(data)
            output.flush()
            os.fsync(output.fileno())
        os.link(temporary, path)
        require(path.read_bytes() == data, 'write_readback_mismatch')
    finally:
        temporary.unlink(missing_ok=True)


def write_json(path, value):
    write_bytes(path, (json.dumps(value, ensure_ascii=True, indent=2) + '\n').encode('utf-8'))


def validate_metadata(meta):
    for key in ('runId', 'encounterKey', 'sectionType'):
        identifier(meta.get(key))
    for key in ('source', 'scope', 'coverage'):
        require(isinstance(meta.get(key), str) and meta[key].strip(), 'missing_source_metadata')
    for key in ('filters', 'gaps'):
        require(isinstance(meta.get(key), list) and all(isinstance(x, str) for x in meta[key]), 'invalid_source_metadata')
    require(meta.get('sourceVerified') is True and meta.get('captureComplete') is True, 'incomplete_capture')
    mode = meta.get('mode')
    allowed = {'notes-full', 'notes-ap'} if meta['sectionType'] == 'notes' else {'preserve'}
    require(mode in allowed, 'incompatible_mode')


def indexed_payloads(collection, first_copy, last_copy):
    collection = safe_path(collection)
    index = read_json(safe_path(str(collection) + '.index.json'))
    require(index.get('schemaVersion') == 1 and index.get('rawFile') == collection.name, 'invalid_index')
    identifier(index.get('collectionId'))
    entries = index.get('batches')
    require(isinstance(entries, list) and index.get('savedCount') == len(entries), 'invalid_index')
    require(type(first_copy) is int and type(last_copy) is int and 1 <= first_copy <= last_copy <= len(entries), 'unsaved_range')
    payloads = []
    offset = 0
    with collection.open('rb') as source:
        for number, entry in enumerate(entries, 1):
            require(isinstance(entry, dict) and entry.get('number') == number, 'invalid_index')
            values = [entry.get(k) for k in ('blockOffset', 'blockLength', 'payloadOffset', 'payloadLength')]
            require(all(type(v) is int and v >= 0 for v in values), 'invalid_index')
            start, length, payload_start, payload_length = values
            require(start == offset and length > 0 and start <= payload_start <= payload_start + payload_length <= start + length, 'invalid_index')
            offset += length
            if first_copy <= number <= last_copy:
                source.seek(start)
                block = source.read(length)
                require(len(block) == length and sha(block) == entry.get('blockSha256'), 'collection_integrity_failed')
                payload = block[payload_start - start:payload_start - start + payload_length]
                require(sha(payload) == entry.get('payloadSha256'), 'collection_integrity_failed')
                payload.decode('utf-8', errors='strict')
                require(payload, 'empty_batch')
                payloads.append((entry, payload))
    return index, payloads


def seal(collection, first_copy, last_copy, metadata, chart_dir, section):
    validate_metadata(metadata)
    identifier(section)
    chart = outside_git(chart_dir)
    index, payloads = indexed_payloads(collection, first_copy, last_copy)
    if 'collectionId' in metadata:
        require(metadata['collectionId'] == index['collectionId'], 'collection_identity_mismatch')
    directory = chart / section
    chart.mkdir(parents=True, exist_ok=True)
    directory.mkdir()
    (directory / 'batches').mkdir()
    batches, combined = [], []
    for entry, payload in payloads:
        relative = f'batches/{entry["number"]:06d}.txt'
        write_bytes(directory / relative, payload)
        batches.append(dict(number=entry['number'], capturedAt=entry['capturedAt'],
                            path=relative, bytes=len(payload), sha256=sha(payload)))
        combined.append(payload)
    # Separators are packaging only; exact individual source payloads remain available.
    raw = b'\r\n\r\n'.join(combined)
    raw_name = section + '.raw.txt'
    write_bytes(directory / raw_name, raw)
    handoff = dict(schemaVersion=1, sectionId=section, collectionId=index['collectionId'],
                   firstCopy=first_copy, lastCopy=last_copy, metadata=metadata,
                   separatorHex='0d0a0d0a', batches=batches,
                   raw=dict(path=raw_name, bytes=len(raw), sha256=sha(raw)))
    handoff_path = directory / (section + '.handoff.json')
    write_json(handoff_path, handoff)
    return dict(status='ready', handoffPath=str(handoff_path), rawPath=str(directory / raw_name),
                batchCount=len(batches), sha256=sha(raw))


def checked_file(base, record):
    require(isinstance(record, dict), 'invalid_file_record')
    path = child(base, record.get('path'))
    data = path.read_bytes()
    require(len(data) == record.get('bytes') and sha(data) == record.get('sha256'), 'file_integrity_failed')
    return path, data


def load_handoff(path, run_id, encounter_key):
    identifier(run_id)
    identifier(encounter_key)
    path = safe_path(path)
    base = outside_git(path.parent)
    handoff = read_json(path)
    require(handoff.get('schemaVersion') == 1, 'invalid_handoff')
    identifier(handoff.get('sectionId'))
    identifier(handoff.get('collectionId'))
    meta = handoff.get('metadata')
    require(isinstance(meta, dict), 'invalid_handoff')
    validate_metadata(meta)
    require(meta['runId'] == run_id and meta['encounterKey'] == encounter_key, 'identity_mismatch')
    require(handoff.get('separatorHex') == '0d0a0d0a', 'invalid_handoff')
    batches = handoff.get('batches')
    require(isinstance(batches, list) and batches, 'invalid_handoff')
    first, last = handoff.get('firstCopy'), handoff.get('lastCopy')
    require(type(first) is int and type(last) is int and first >= 1 and last - first + 1 == len(batches), 'invalid_handoff')
    payloads = []
    for number, batch in enumerate(batches, first):
        require(batch.get('number') == number, 'invalid_handoff')
        _, data = checked_file(base, batch)
        data.decode('utf-8', errors='strict')
        payloads.append(data)
    raw_path, raw = checked_file(base, handoff.get('raw'))
    require(raw == b'\r\n\r\n'.join(payloads), 'raw_batch_mismatch')
    return path, base, handoff, raw_path


def output_paths(base, section, attempt=None):
    directory = base if attempt is None else child(base, 'attempts/' + identifier(attempt))
    return dict(directory=directory, output=directory / (section + '.cleaned.txt'),
                report=directory / (section + '.review.json'), result=directory / (section + '.result.json'),
                agent=directory / 'agent-review.json')


def check_cleaner_report(report, raw_record, output_data, mode):
    require(report.get('schemaVersion') == 1 and report.get('mode') == mode, 'invalid_cleaner_report')
    require(report.get('inputSha256') == raw_record['sha256'] and report.get('inputBytes') == raw_record['bytes'], 'invalid_cleaner_report')
    require(report.get('outputSha256') == sha(output_data) and report.get('outputBytes') == len(output_data), 'invalid_cleaner_report')
    require(report.get('status') in {'complete', 'needs_review'} and report.get('coverageVerified') is False, 'invalid_cleaner_report')
    require(isinstance(report.get('review'), list), 'invalid_cleaner_report')
    if mode == 'preserve':
        require(sha(output_data) == raw_record['sha256'] and report.get('cleanerApplied') is False, 'preservation_failed')


def process(handoff_path, run_id, encounter_key, cleaner_dir, attempt=None):
    path, base, handoff, raw_path = load_handoff(handoff_path, run_id, encounter_key)
    section, mode = handoff['sectionId'], handoff['metadata']['mode']
    paths = output_paths(base, section, attempt)
    cleaner = safe_path(cleaner_dir)
    source_hash = sha((cleaner / 'index.html').read_bytes())
    script = cleaner / 'scripts/clean-section.mjs'
    require(script.is_file(), 'cleaner_unavailable')
    if attempt is not None:
        paths['directory'].parent.mkdir(exist_ok=True)
        paths['directory'].mkdir()
    lock = paths['directory'] / '.processing.lock'
    with open(lock, 'x', encoding='utf-8'):
        pass
    try:
        require(not any(paths[key].exists() for key in ('output', 'report', 'result', 'agent')), 'output_exists')
        before = sha(path.read_bytes())
        completed = subprocess.run(['node', str(script), '--input', str(raw_path),
                                    '--output', str(paths['output']), '--report', str(paths['report']), '--mode', mode],
                                   capture_output=True, timeout=120, check=False)
        require(completed.returncode == 0, 'cleaner_failed')
        _, _, after_handoff, _ = load_handoff(path, run_id, encounter_key)
        require(before == sha(path.read_bytes()) and after_handoff == handoff, 'handoff_changed')
        output = paths['output'].read_bytes()
        report_data = paths['report'].read_bytes()
        report = json.loads(report_data.decode('utf-8'))
        check_cleaner_report(report, handoff['raw'], output, mode)
        require(report.get('sourceHash') == source_hash == sha((cleaner / 'index.html').read_bytes()), 'cleaner_source_changed')
        result = dict(schemaVersion=1, runId=run_id, encounterKey=encounter_key, sectionId=section,
                      mode=mode, rawSha256=handoff['raw']['sha256'], handoffSha256=before,
                      status='processed', processingStatus=report['status'],
                      output=dict(path=paths['output'].relative_to(base).as_posix(), bytes=len(output), sha256=sha(output)),
                      report=dict(path=paths['report'].relative_to(base).as_posix(), bytes=len(report_data), sha256=sha(report_data)))
        write_json(paths['result'], result)
        return verify(path, run_id, encounter_key, attempt=attempt, processing_only=True)
    finally:
        lock.unlink(missing_ok=True)


def verify(handoff_path, run_id, encounter_key, attempt=None, processing_only=False):
    path, base, handoff, _ = load_handoff(handoff_path, run_id, encounter_key)
    paths = output_paths(base, handoff['sectionId'], attempt)
    safe_path(paths['result'])
    if not paths['result'].exists():
        return dict(status='pending_processing', handoffPath=str(path), resultPath=str(paths['result']))
    result_data = paths['result'].read_bytes()
    result = json.loads(result_data.decode('utf-8'))
    bindings = dict(schemaVersion=1, runId=run_id, encounterKey=encounter_key,
                    sectionId=handoff['sectionId'], mode=handoff['metadata']['mode'], rawSha256=handoff['raw']['sha256'])
    require(all(result.get(k) == v for k, v in bindings.items()), 'result_binding_mismatch')
    require(result.get('status') == 'processed' and result.get('handoffSha256') == sha(path.read_bytes()), 'invalid_result')
    output_path, output = checked_file(base, result.get('output'))
    report_path, report_data = checked_file(base, result.get('report'))
    require(output_path == paths['output'] and report_path == paths['report'], 'result_path_mismatch')
    report = json.loads(report_data.decode('utf-8'))
    check_cleaner_report(report, handoff['raw'], output, bindings['mode'])
    require(result.get('processingStatus') == report['status'], 'invalid_result')
    bindings.update(resultSha256=sha(result_data), outputSha256=sha(output))
    required_files = [handoff['raw']['path'], result['output']['path'], result['report']['path']]
    response = dict(status='processed', processingStatus=report['status'], resultPath=str(paths['result']),
                    outputPath=str(output_path), reviewPath=str(report_path), agentReviewPath=str(paths['agent']),
                    reviewBindings=bindings, requiredReviewedFiles=required_files)
    if processing_only:
        return response
    if not paths['agent'].exists():
        return dict(response, status='pending_review')
    review = read_json(safe_path(paths['agent']))
    require(all(review.get(k) == v for k, v in bindings.items()), 'agent_review_binding_mismatch')
    require(review.get('status') in {'complete', 'needs_review'}, 'invalid_agent_review')
    for field in ('reviewedFiles', 'limitations', 'issues'):
        require(isinstance(review.get(field), list), 'invalid_agent_review')
    require(all(isinstance(x, str) for x in review['reviewedFiles'] + review['limitations']), 'invalid_agent_review')
    require(set(required_files).issubset(review['reviewedFiles']), 'incomplete_agent_review')
    needs_review = report['status'] == 'needs_review' or bool(report['review']) or review['status'] == 'needs_review' or bool(review['limitations']) or bool(review['issues'])
    return dict(response, status='needs_review' if needs_review else 'complete')


def main(argv=None):
    parser = SafeParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    sealing = commands.add_parser('seal', help='Seal complete saved copies into a new chart section')
    for flag in ('collection', 'metadata', 'chart-dir', 'section'):
        sealing.add_argument('--' + flag, required=True)
    for flag in ('first-copy', 'last-copy'):
        sealing.add_argument('--' + flag, type=int, required=True)
    for name in ('process', 'verify'):
        command = commands.add_parser(name)
        for flag in ('handoff', 'run-id', 'encounter-key'):
            command.add_argument('--' + flag, required=True)
        command.add_argument('--attempt')
        if name == 'process':
            command.add_argument('--cleaner-dir', required=True)
        else:
            command.add_argument('--processing-only', action='store_true')
    args = parser.parse_args(argv)
    try:
        if args.command == 'seal':
            result = seal(args.collection, args.first_copy, args.last_copy, read_json(args.metadata), args.chart_dir, args.section)
        elif args.command == 'process':
            result = process(args.handoff, args.run_id, args.encounter_key, args.cleaner_dir, args.attempt)
        else:
            result = verify(args.handoff, args.run_id, args.encounter_key, args.attempt, args.processing_only)
        print(json.dumps(result, ensure_ascii=True))
        return 2 if result['status'].startswith('pending_') else 0
    except Exception as exc:
        category = str(exc) if isinstance(exc, SectionError) else type(exc).__name__
        print(json.dumps(dict(status='failed', error=category)), file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
