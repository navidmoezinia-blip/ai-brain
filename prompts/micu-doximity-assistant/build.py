"""Validate and export the all-in-one MICU Doximity Ask Template + Sources bundle."""
import argparse
import hashlib
import json
from pathlib import Path
import zipfile

INSTRUCTIONS_BOX_CAP = 20_000
REQUIRED_SOURCES = (
    "00_shared_rules.md",
    "01_prep_and_updates.md",
    "02_progress_note.md",
    "03_initial_hp.md",
    "04_rounds_handoff_consult_code.md",
    "05_exemplars.md",
)


def _assert_ascii(label: str, text: str) -> None:
    if text.isascii():
        return
    for line_no, line in enumerate(text.splitlines(), start=1):
        if not line.isascii():
            bad_chars = "".join(sorted({ch for ch in line if ord(ch) >= 128}))
            raise ValueError(f"{label}:{line_no}: non-ASCII characters found: {bad_chars!r}")


def _record(text: str) -> dict:
    data = text.encode("utf-8")
    return {
        "characters": len(text),
        "bytes": len(data),
        "sha256": hashlib.sha256(data).hexdigest(),
    }


def validate_and_collect(root: Path) -> tuple[dict[str, str], dict]:
    instructions_path = root / "TEMPLATE_INSTRUCTIONS.txt"
    if not instructions_path.is_file():
        raise FileNotFoundError(f"Missing {instructions_path}")
    instructions = instructions_path.read_text(encoding="utf-8")
    _assert_ascii("TEMPLATE_INSTRUCTIONS.txt", instructions)
    if len(instructions) > INSTRUCTIONS_BOX_CAP:
        raise ValueError(
            f"TEMPLATE_INSTRUCTIONS.txt is {len(instructions)} chars "
            f"(exceeds {INSTRUCTIONS_BOX_CAP}-char Doximity Instructions box cap)"
        )

    files: dict[str, str] = {"TEMPLATE_INSTRUCTIONS.txt": instructions}
    combined_parts = [instructions.rstrip()]

    for name in REQUIRED_SOURCES:
        rel = f"sources/{name}"
        src_path = root / rel
        if not src_path.is_file():
            raise FileNotFoundError(f"Missing {src_path}")
        text = src_path.read_text(encoding="utf-8")
        _assert_ascii(rel, text)
        files[rel] = text
        combined_parts.append(f"{'=' * 78}\nSOURCE FILE: {name}\n{'=' * 78}\n\n{text.rstrip()}")

    readme_path = root / "README.md"
    if readme_path.is_file():
        readme_text = readme_path.read_text(encoding="utf-8")
        _assert_ascii("README.md", readme_text)
        files["README.md"] = readme_text

    all_in_one = "\n\n".join(combined_parts) + "\n"
    _assert_ascii("DOXIMITY_MICU_ALL_IN_ONE.txt", all_in_one)
    files["DOXIMITY_MICU_ALL_IN_ONE.txt"] = all_in_one

    source_chars = sum(len(files[f"sources/{name}"]) for name in REQUIRED_SOURCES)
    manifest = {
        "format": "MICU Doximity Ask All-in-One Template + Attached Sources",
        "instructions_box_cap": INSTRUCTIONS_BOX_CAP,
        "instructions_characters": len(instructions),
        "instructions_headroom": INSTRUCTIONS_BOX_CAP - len(instructions),
        "attached_sources_count": len(REQUIRED_SOURCES),
        "attached_sources_characters": source_chars,
        "combined_all_in_one_characters": len(all_in_one),
        "files": {name: _record(text) for name, text in files.items()},
    }
    return files, manifest


def build(destination: Path | None = None) -> dict:
    root = Path(__file__).resolve().parent
    files, manifest = validate_and_collect(root)
    if destination is None:
        return manifest

    destination.mkdir(parents=True, exist_ok=True)
    (destination / "sources").mkdir(parents=True, exist_ok=True)

    exported: dict[str, bytes] = {}
    for rel_name, text in files.items():
        out_text = text
        if rel_name == "README.md":
            out_text = out_text.replace(
                "](../../",
                "](https://github.com/navidmoezinia-blip/ai-brain/blob/main/",
            )
            manifest["files"][rel_name] = _record(out_text)
        data = out_text.encode("utf-8")
        out_path = destination / rel_name
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_bytes(data)
        exported[rel_name] = data

    manifest_bytes = (json.dumps(manifest, indent=2) + "\n").encode("utf-8")
    (destination / "manifest.json").write_bytes(manifest_bytes)
    exported["manifest.json"] = manifest_bytes

    archive = destination / "MICU-Doximity-Assistant.zip"
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for rel_name in exported:
            zf.write(destination / rel_name, rel_name)

    with zipfile.ZipFile(archive, "r") as zf:
        for rel_name, expected in exported.items():
            if zf.read(rel_name) != expected:
                raise ValueError(f"Archive readback mismatch: {rel_name}")

    return manifest


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=None,
        help="Optional export directory outside Git (writes files, DOXIMITY_MICU_ALL_IN_ONE.txt, manifest.json, and ZIP)",
    )
    args = parser.parse_args()
    print(json.dumps(build(args.output), indent=2))
