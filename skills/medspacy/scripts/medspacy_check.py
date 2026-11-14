"""Run medspaCy on a clinical note and report how each term is asserted.

Usage:
    python medspacy_check.py NOTE.txt --terms "chest pain,pneumonia,CHF"
    python medspacy_check.py NOTE.txt --terms-file terms.txt
    cat NOTE.txt | python medspacy_check.py - --terms "..."

Prints a markdown table: term, section, status (negated / historical /
hypothetical / family / uncertain / affirmed), and the sentence it came from.
"""
import argparse
import sys
import warnings

warnings.filterwarnings("ignore")

try:
    from loguru import logger
    logger.remove()
except ImportError:
    pass

import medspacy
from medspacy.ner import TargetRule

FLAGS = ["is_negated", "is_historical", "is_hypothetical", "is_family", "is_uncertain"]


def read_terms(args):
    terms = []
    if args.terms:
        terms += [t.strip() for t in args.terms.split(",")]
    if args.terms_file:
        with open(args.terms_file, encoding="utf-8") as f:
            terms += [line.strip() for line in f]
    return list(dict.fromkeys(t for t in terms if t))


def status(ent):
    flags = [f[3:] for f in FLAGS if getattr(ent._, f)]
    return ", ".join(flags) if flags else "affirmed"


def snippet(ent, width=160):
    text = " ".join(ent.sent.text.split()).replace("|", "/")
    return text if len(text) <= width else text[: width - 3] + "..."


def main():
    p = argparse.ArgumentParser()
    p.add_argument("note", help="note file, or - for stdin")
    p.add_argument("--terms", help="comma-separated terms to look for")
    p.add_argument("--terms-file", help="file with one term per line")
    args = p.parse_args()

    terms = read_terms(args)
    if not terms:
        sys.exit("No terms given. Pass --terms or --terms-file.")

    text = sys.stdin.read() if args.note == "-" else open(args.note, encoding="utf-8", errors="replace").read()

    nlp = medspacy.load(medspacy_enable=["medspacy_pyrush", "medspacy_target_matcher",
                                         "medspacy_context", "medspacy_sectionizer"])
    nlp.get_pipe("medspacy_target_matcher").add([TargetRule(t, "TERM") for t in terms])
    doc = nlp(text)

    sys.stdout.reconfigure(encoding="utf-8")
    print("| term | section | status | sentence |")
    print("|---|---|---|---|")
    found = set()
    for ent in doc.ents:
        found.add(ent.text.lower())
        print(f"| {ent.text} | {ent._.section_category or '-'} | {status(ent)} | {snippet(ent)} |")

    missing = [t for t in terms if t.lower() not in found]
    if missing:
        print(f"\nNot found in note: {', '.join(missing)}")


if __name__ == "__main__":
    main()
