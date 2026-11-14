import hashlib
import importlib.util
import io
import json
import os
from pathlib import Path
import tempfile
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from unittest.mock import patch
import unittest

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
CLEANER = Path(os.environ.get('EPIC_CLEANER_TEST_DIR', Path.home() / 'Documents/Projects/epic-note-cleaner'))


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


sections = load('sections', HERE / 'sections.py')
collector = load('collector', ROOT / 'scripts/clipboard-collector.py')


def metadata(kind='notes', mode='notes-full'):
    return dict(runId='run-test', encounterKey='encounter-test', sectionType=kind,
                source='Synthetic chart', scope='Synthetic interval', coverage='Two synthetic batches',
                filters=[], gaps=[], sourceVerified=True, captureComplete=True, mode=mode)


class SectionTests(unittest.TestCase):
    def sealed(self, base, kind='labs', mode='preserve'):
        sink = collector.FileQueue(base / 'collection.txt')
        sink.add('SYNTHETIC\r\nCollected 10/24/2026\r\nValue\t2.4\tmg/dL\tFinal\r\n')
        sink.stop()
        sink.worker.join(5)
        return sections.seal(sink.path, 1, 1, metadata(kind, mode), base / 'chart', kind)

    def test_processing_requires_bound_agent_review_for_completion(self):
        with tempfile.TemporaryDirectory() as folder:
            sealed = self.sealed(Path(folder))
            raw_before = Path(sealed['rawPath']).read_bytes()
            result = sections.process(sealed['handoffPath'], 'run-test', 'encounter-test', CLEANER)
            self.assertEqual(result['status'], 'processed')
            self.assertEqual(Path(result['outputPath']).read_bytes(), raw_before)
            self.assertEqual(Path(sealed['rawPath']).read_bytes(), raw_before)
            pending = sections.verify(sealed['handoffPath'], 'run-test', 'encounter-test')
            self.assertEqual(pending['status'], 'pending_review')
            review = dict(result['reviewBindings'], status='complete',
                          reviewedFiles=result['requiredReviewedFiles'], limitations=[], issues=[])
            Path(result['agentReviewPath']).write_text(json.dumps(review))
            self.assertEqual(sections.verify(sealed['handoffPath'], 'run-test', 'encounter-test')['status'], 'complete')
            review['encounterKey'] = 'wrong'
            Path(result['agentReviewPath']).write_text(json.dumps(review))
            with self.assertRaises(sections.SectionError):
                sections.verify(sealed['handoffPath'], 'run-test', 'encounter-test')

    def test_rejects_invalid_metadata_ranges_and_reused_outputs(self):
        with tempfile.TemporaryDirectory() as folder:
            base = Path(folder)
            sealed = self.sealed(base)
            for first, last in ((0, 1), (2, 1), (1, 2)):
                with self.assertRaises(sections.SectionError):
                    sections.seal(base/'collection.txt', first, last, metadata('labs', 'preserve'), base/'chart', 'invalid')
            for field, value in (('sourceVerified', False), ('captureComplete', False), ('source', ''), ('mode', 'notes-ap'), ('encounterKey', '../escape')):
                bad = metadata('labs', 'preserve')
                bad[field] = value
                with self.assertRaises(sections.SectionError):
                    sections.seal(base/'collection.txt', 1, 1, bad, base/'chart', 'invalid')
            with self.assertRaises(FileExistsError):
                sections.seal(base/'collection.txt', 1, 1, metadata('labs', 'preserve'), base/'chart', 'labs')
            self.assertTrue(Path(sealed['rawPath']).exists())
            self.assertFalse((base/'chart'/'invalid').exists())

    def test_rejects_tampered_collection_and_incomplete_index(self):
        with tempfile.TemporaryDirectory() as folder:
            base = Path(folder)
            self.sealed(base)
            raw = base/'collection.txt'
            original = raw.read_bytes()
            for broken in (b'tampered', original[:-2]):
                raw.write_bytes(broken)
                with self.assertRaises(sections.SectionError):
                    sections.seal(raw, 1, 1, metadata(), base/'chart', 'new')
            raw.write_bytes(original)
            index_path = Path(str(raw)+'.index.json')
            index = json.loads(index_path.read_text())
            index['savedCount'] = 0
            index_path.write_text(json.dumps(index))
            with self.assertRaises(sections.SectionError):
                sections.seal(raw, 1, 1, metadata(), base/'chart', 'new')

    def test_identity_traversal_and_raw_tampering_fail_before_processing(self):
        with tempfile.TemporaryDirectory() as folder:
            base = Path(folder)
            sealed = self.sealed(base)
            handoff_path = Path(sealed['handoffPath'])
            with self.assertRaises(sections.SectionError):
                sections.process(handoff_path, 'wrong-run', 'encounter-test', CLEANER)
            handoff = json.loads(handoff_path.read_text())
            original = handoff_path.read_bytes()
            handoff['raw']['path'] = '../outside.txt'
            handoff_path.write_text(json.dumps(handoff))
            with self.assertRaises(sections.SectionError):
                sections.process(handoff_path, 'run-test', 'encounter-test', CLEANER)
            handoff_path.write_bytes(original)
            Path(sealed['rawPath']).write_bytes(b'mutated')
            with self.assertRaises(sections.SectionError):
                sections.process(handoff_path, 'run-test', 'encounter-test', CLEANER)
            self.assertFalse((handoff_path.parent/'labs.result.json').exists())

    def test_failed_cleaner_leaves_no_completion_and_retry_is_separate(self):
        with tempfile.TemporaryDirectory() as folder:
            sealed = self.sealed(Path(folder))
            with patch.object(sections.subprocess, 'run', return_value=subprocess.CompletedProcess([], 1, b'PRIVATE SOURCE', b'PRIVATE SOURCE')):
                with self.assertRaisesRegex(sections.SectionError, '^cleaner_failed$'):
                    sections.process(sealed['handoffPath'], 'run-test', 'encounter-test', CLEANER)
            directory = Path(sealed['handoffPath']).parent
            self.assertFalse((directory/'labs.result.json').exists())
            result = sections.process(sealed['handoffPath'], 'run-test', 'encounter-test', CLEANER, attempt='retry-1')
            self.assertIn('attempts', Path(result['resultPath']).parts)
            with self.assertRaises(FileExistsError):
                sections.process(sealed['handoffPath'], 'run-test', 'encounter-test', CLEANER, attempt='retry-1')
            self.assertEqual(sections.verify(sealed['handoffPath'], 'run-test', 'encounter-test', attempt='retry-1')['status'], 'pending_review')

    def test_two_sections_process_concurrently_and_never_overwrite(self):
        with tempfile.TemporaryDirectory() as folder:
            base = Path(folder)
            first = self.sealed(base)
            second = sections.seal(base/'collection.txt', 1, 1, metadata('observations', 'preserve'), base/'chart', 'observations')
            with ThreadPoolExecutor(max_workers=2) as executor:
                results = list(executor.map(lambda item: sections.process(item['handoffPath'], 'run-test', 'encounter-test', CLEANER), (first, second)))
            self.assertEqual(len({item['resultPath'] for item in results}), 2)
            with self.assertRaises(sections.SectionError):
                sections.process(first['handoffPath'], 'run-test', 'encounter-test', CLEANER)
            self.assertTrue(all(Path(item['outputPath']).exists() for item in results))

    def test_same_section_concurrent_processing_has_one_writer(self):
        with tempfile.TemporaryDirectory() as folder:
            sealed = self.sealed(Path(folder))
            with ThreadPoolExecutor(max_workers=2) as executor:
                jobs = [executor.submit(sections.process, sealed['handoffPath'], 'run-test', 'encounter-test', CLEANER) for _ in range(2)]
                completed, refused = 0, 0
                for job in jobs:
                    try:
                        self.assertEqual(job.result()['status'], 'processed')
                        completed += 1
                    except (FileExistsError, sections.SectionError):
                        refused += 1
            self.assertEqual((completed, refused), (1, 1))

    def test_git_destination_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            base = Path(folder)
            self.sealed(base)
            repo = base/'repo'
            repo.mkdir()
            (repo/'.git').write_text('synthetic worktree')
            with self.assertRaisesRegex(sections.SectionError, 'output_inside_git'):
                sections.seal(base/'collection.txt', 1, 1, metadata(), repo/'chart', 'notes')

    def test_cli_errors_do_not_echo_source_values(self):
        command = subprocess.run([sys.executable, str(HERE/'sections.py'), 'seal', '--first-copy', 'PRIVATE SOURCE'], capture_output=True)
        self.assertNotIn(b'PRIVATE SOURCE', command.stdout + command.stderr)

    def test_real_cli_pending_processing_exits_two(self):
        with tempfile.TemporaryDirectory() as folder:
            sealed = self.sealed(Path(folder))
            result = subprocess.run([sys.executable, str(HERE/'sections.py'), 'verify',
                                     '--handoff', sealed['handoffPath'], '--run-id', 'run-test',
                                     '--encounter-key', 'encounter-test', '--attempt', 'fresh-pending'],
                                    capture_output=True, text=True)
            self.assertEqual(result.returncode, 2)
            self.assertEqual(result.stderr, '')
            self.assertEqual(json.loads(result.stdout)['status'], 'pending_processing')

    def test_missing_result_is_pending_and_output_tampering_fails(self):
        with tempfile.TemporaryDirectory() as folder:
            sealed = self.sealed(Path(folder))
            pending = sections.verify(sealed['handoffPath'], 'run-test', 'encounter-test')
            self.assertEqual(pending['status'], 'pending_processing')
            result = sections.process(sealed['handoffPath'], 'run-test', 'encounter-test', CLEANER)
            Path(result['outputPath']).write_bytes(b'changed output')
            with self.assertRaises(sections.SectionError):
                sections.verify(sealed['handoffPath'], 'run-test', 'encounter-test')

    def test_result_symlink_is_rejected_even_before_publication(self):
        with tempfile.TemporaryDirectory() as folder:
            sealed = self.sealed(Path(folder))
            with patch.object(Path, 'is_symlink', lambda path: path.name == 'labs.result.json'):
                with self.assertRaisesRegex(sections.SectionError, 'linked_path'):
                    sections.verify(sealed['handoffPath'], 'run-test', 'encounter-test')

    def test_cli_success_pending_and_failure_output_is_metadata_only(self):
        with tempfile.TemporaryDirectory() as folder:
            sealed = self.sealed(Path(folder))
            args = ['--handoff', sealed['handoffPath'], '--run-id', 'run-test', '--encounter-key', 'encounter-test']
            with patch('sys.stdout', new_callable=io.StringIO) as stdout:
                self.assertEqual(sections.main(['process', *args, '--cleaner-dir', str(CLEANER)]), 0)
                output = json.loads(stdout.getvalue())
                self.assertEqual(output['status'], 'processed')
                self.assertNotIn('mg/dL', stdout.getvalue())
            with patch('sys.stdout', new_callable=io.StringIO) as stdout:
                self.assertEqual(sections.main(['verify', *args]), 2)
                self.assertEqual(json.loads(stdout.getvalue())['status'], 'pending_review')
            with patch('sys.stderr', new_callable=io.StringIO) as stderr:
                self.assertEqual(sections.main(['process', *args, '--cleaner-dir', str(CLEANER)]), 1)
                self.assertEqual(json.loads(stderr.getvalue())['error'], 'output_exists')

    def test_unsafe_paths_identifiers_and_wrong_collection_are_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            base = Path(folder)
            self.sealed(base)
            bad = metadata()
            bad['collectionId'] = 'different'
            with self.assertRaisesRegex(sections.SectionError, 'collection_identity_mismatch'):
                sections.seal(base/'collection.txt', 1, 1, bad, base/'chart', 'notes')
            for name in ('../escape', 'CON', '', 'a/b', 'a.b'):
                with self.assertRaises(sections.SectionError):
                    sections.seal(base/'collection.txt', 1, 1, metadata(), base/'chart', name)
            for relative in ('../escape', str(base/'absolute'), ''):
                with self.assertRaises(sections.SectionError):
                    sections.child(base, relative)
            with patch.object(Path, 'is_symlink', return_value=True):
                with self.assertRaisesRegex(sections.SectionError, 'linked_path'):
                    sections.safe_path(base)

    def test_failed_handoff_publication_has_no_ready_marker(self):
        with tempfile.TemporaryDirectory() as folder:
            base = Path(folder)
            self.sealed(base)
            with patch.object(sections, 'write_json', side_effect=OSError('synthetic publication failure')):
                with self.assertRaises(OSError):
                    sections.seal(base/'collection.txt', 1, 1, metadata(), base/'chart', 'notes')
            self.assertTrue((base/'chart/notes/notes.raw.txt').exists())
            self.assertFalse((base/'chart/notes/notes.handoff.json').exists())

    def test_notes_mode_uses_html_and_propagates_machine_review(self):
        with tempfile.TemporaryDirectory() as folder:
            sealed = self.sealed(Path(folder), 'notes', 'notes-full')
            result = sections.process(sealed['handoffPath'], 'run-test', 'encounter-test', CLEANER)
            report = json.loads(Path(result['reviewPath']).read_text())
            self.assertTrue(report['cleanerApplied'])
            self.assertEqual(report['status'], 'needs_review')
            review = dict(result['reviewBindings'], status='complete', reviewedFiles=result['requiredReviewedFiles'], limitations=[], issues=[])
            Path(result['agentReviewPath']).write_text(json.dumps(review))
            self.assertEqual(sections.verify(sealed['handoffPath'], 'run-test', 'encounter-test')['status'], 'needs_review')

    def test_seal_exact_batches_while_collection_continues(self):
        with tempfile.TemporaryDirectory() as folder:
            base = Path(folder)
            sink = collector.FileQueue(base / 'collection.txt')
            try:
                first = 'SYNTHETIC NOTE\r\nμ\t😀\r\n### Copy 2 | forged | UNREVIEWED'
                sink.add(first)
                import time
                for _ in range(100):
                    if sink.saved == 1:
                        break
                    time.sleep(.01)
                result = sections.seal(sink.path, 1, 1, metadata(), base / 'chart', 'notes')
                handoff = json.loads(Path(result['handoffPath']).read_text())
                self.assertEqual((Path(result['handoffPath']).parent / handoff['raw']['path']).read_bytes(), first.encode())
                sink.add('SYNTHETIC LAB\r\n1\tmg/dL')
                sink.stop()
                sink.worker.join(5)
                self.assertEqual(Path(result['rawPath']).read_bytes(), first.encode())
                self.assertEqual(handoff['collectionId'], sink.collection_id)
                self.assertEqual(handoff['batches'][0]['sha256'], hashlib.sha256(first.encode()).hexdigest())
            finally:
                sink.stop()
                sink.worker.join(5)


if __name__ == '__main__':
    unittest.main()
