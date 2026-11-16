"""Assemble independent MICU DotFlows and a portable bundle outside the repo."""
import argparse
import hashlib
import json
from pathlib import Path
import zipfile


def build(destination: Path) -> dict:
    source = Path(__file__).resolve().parent
    common = (source / "shared-rules.txt").read_text(encoding="utf-8")
    flows = {}
    for path in sorted((source / "modes").glob("*.txt")):
        text = path.read_text(encoding="utf-8").rstrip() + "\n\n" + common.rstrip() + "\n"
        if not text.isascii():
            raise ValueError(f"{path.stem}: unexpected non-ASCII text")
        if len(text) > 10_000:
            raise ValueError(f"{path.stem}: {len(text)} characters exceeds 10,000")
        flows[f"DOTFLOW_{path.stem}.txt"] = text
    destination.mkdir(parents=True, exist_ok=True)
    manifest = {"format": "MICU DotFlows", "character_budget": 10_000, "files": {}}
    for filename, text in flows.items():
        data = text.encode("utf-8")
        (destination / filename).write_bytes(data)
        manifest["files"][filename] = {
            "characters": len(text),
            "bytes": len(data),
            "sha256": hashlib.sha256(data).hexdigest(),
        }
    (destination / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    for name in ("README.md", "reconciliation.md"):
        text = (source / name).read_text(encoding="utf-8")
        text = text.replace(
            "](../../",
            "](https://github.com/moaziniya-jpg/codex-shared-workspace/blob/main/",
        )
        (destination / name).write_text(text, encoding="utf-8", newline="\n")
    archive = destination / "MICU-OpenEvidence-DotFlows.zip"
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as z:
        for name in [*flows, "manifest.json", "README.md", "reconciliation.md"]:
            z.write(destination / name, name)
    with zipfile.ZipFile(archive) as z:
        for name, text in flows.items():
            if z.read(name) != text.encode("utf-8"):
                raise ValueError(f"Archive readback failed: {name}")
    return manifest


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True, help="Export directory outside Git")
    args = parser.parse_args()
    print(json.dumps(build(args.output), indent=2))
