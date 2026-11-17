"""Assemble the Doximity MICU set from the MICU DotFlow sources.

The mode and shared-rule wording is copied from ../micu-dotflows unchanged,
apart from the substitutions listed in SUBSTITUTIONS. Run with --check to
confirm the committed files still match the sources and the size limits.
"""
import argparse
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DOTFLOWS = HERE.parent / "micu-dotflows"
MAIN_NAME = "DOX_MICU_MAIN.txt"
MAIN_LIMIT = 20_000  # Doximity main instruction box
MAIN_MODES = ["micuprep", "micuupdate", "micunote"]
SOURCE_FILES = {
    "micuhp": "DOX_MICU_HP.txt",
    "micucheck": "DOX_MICU_CHECK.txt",
    "micupres": "DOX_MICU_PRESENT.txt",
    "micuhandoff": "DOX_MICU_HANDOFF.txt",
    "micuconsult": "DOX_MICU_CONSULT.txt",
}
# (file stem, old text, new text). Each old text must occur exactly once.
SUBSTITUTIONS = [
    ("shared-rules", "No cross-case data, Pages, Epic actions or messages.",
     "No cross-case data, Epic actions or messages."),
    ("micuprep", "Use OpenEvidence for the specific uncertain decision",
     "Retrieve evidence for the specific uncertain decision"),
    ("micuconsult", "resident adds locally outside OpenEvidence",
     "resident adds locally outside this chat"),
]
SOURCE_HEADER = (
    "DOXIMITY MICU SOURCE FILE. Instructions only, no patient facts. Apply "
    "together with the SHARED MICU RULES in the main instructions.\n"
)


def load(stem: str) -> str:
    folder = DOTFLOWS if stem == "shared-rules" else DOTFLOWS / "modes"
    text = (folder / f"{stem}.txt").read_text(encoding="utf-8").strip()
    for target, old, new in SUBSTITUTIONS:
        if target == stem:
            if text.count(old) != 1:
                raise ValueError(f"{stem}: expected exactly one {old!r}")
            text = text.replace(old, new)
    if stem != "shared-rules":
        prefix = f"DOTFLOW .{stem} - "
        if not text.startswith(prefix):
            raise ValueError(f"{stem}: unexpected header line")
        text = f"MODE .{stem} - " + text[len(prefix):]
    return text


def assemble() -> dict:
    router = (HERE / "router.txt").read_text(encoding="utf-8").strip()
    parts = [router, load("shared-rules"), *[load(m) for m in MAIN_MODES]]
    files = {MAIN_NAME: "\n\n".join(parts) + "\n"}
    for stem, name in SOURCE_FILES.items():
        files[f"sources/{name}"] = SOURCE_HEADER + load(stem) + "\n"
    unused = {p.stem for p in (DOTFLOWS / "modes").glob("*.txt")} - set(MAIN_MODES) - set(SOURCE_FILES)
    if unused:
        raise ValueError(f"DotFlow modes not placed anywhere: {sorted(unused)}")
    for name, text in files.items():
        if not text.isascii():
            raise ValueError(f"{name}: unexpected non-ASCII text")
    main = files[MAIN_NAME]
    crlf = len(main) + main.count("\n")  # if the box counts line breaks as two
    if crlf > MAIN_LIMIT:
        raise ValueError(f"{MAIN_NAME}: {len(main)} characters ({crlf} with CRLF) exceeds {MAIN_LIMIT}")
    return files


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="verify committed files, write nothing")
    args = parser.parse_args()
    files = assemble()
    stale = []
    for name, text in files.items():
        path = HERE / name
        if args.check:
            if not path.exists() or path.read_text(encoding="utf-8") != text:
                stale.append(name)
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(text, encoding="utf-8", newline="\n")
        print(f"{len(text):>6} chars  {name}")
    main_text = files[MAIN_NAME]
    print(f"main box: {len(main_text)} chars, {len(main_text) + main_text.count(chr(10))} if line breaks count twice, limit {MAIN_LIMIT}")
    if stale:
        print("OUT OF DATE: " + ", ".join(stale) + " (run build.py without --check)")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
