"""Run medspaCy on a clinical note and report how each term is asserted.

Usage:
    python medspacy_check.py NOTE.txt --terms "chest pain,pneumonia,CHF"
    python medspacy_check.py NOTE.txt --terms-file terms.txt
    cat NOTE.txt | python medspacy_check.py - --terms "..."

Terms also match close spellings in the note ("pnuemonia", "short of breath")
via RapidFuzz. Prints a markdown table: term, text as written, section, status
(negated / historical / hypothetical / family / uncertain / affirmed), and the
sentence it came from.
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
from rapidfuzz import fuzz, process

FLAGS = ["is_negated", "is_historical", "is_hypothetical", "is_family", "is_uncertain"]
FUZZY_CUTOFF = 85    # fuzz.ratio score; "pnuemonia" vs "pneumonia" is 89
FUZZY_MIN_LEN = 5    # shorter terms (SOB, CHF) match exactly only
# Prefix swaps that score high but flip the meaning (hypertension vs hypotension).
OPPOSITE_PREFIXES = [("hyper", "hypo"), ("pre", "post"), ("inter", "intra")]


def flips_meaning(term, gram):
    """True if gram is term with a meaning-changing prefix added, dropped or swapped."""
    a, b = term.lower().split(), gram.split()
    pairs = zip(a, b) if len(a) == len(b) else [(" ".join(a), gram)]
    for x, y in pairs:
        if x == y:
            continue
        if x.endswith(y) or y.endswith(x):    # ab-normal, un-remarkable, non-compliant
            return True
        short, long = sorted((x, y), key=len)
        if long.startswith(short) and long[len(short):] not in ("s", "es", "ness"):
            return True                       # pneumonia vs (S.) pneumoniae; plurals, short(ness) ok
        for p, q in OPPOSITE_PREFIXES:
            if (x.startswith(p) and y.startswith(q)) or (x.startswith(q) and y.startswith(p)):
                return True
    return False


def read_terms(args):
    terms = []
    if args.terms:
        terms += [t.strip() for t in args.terms.split(",")]
    if args.terms_file:
        with open(args.terms_file, encoding="utf-8") as f:
            terms += [line.strip() for line in f]
    return list(dict.fromkeys(t for t in terms if t))


def fuzzy_variants(nlp, text, terms):
    """Map each term to phrases in the note that are close but not identical."""
    tokens = [None if t.is_space or t.is_punct else t.text for t in nlp.tokenizer(text)]
    variants = {}
    for term in terms:
        if len(term) < FUZZY_MIN_LEN:
            continue
        n = len(term.split())
        grams = set()
        for size in {max(1, n - 1), n, n + 1}:
            for i in range(len(tokens) - size + 1):
                gram = tokens[i:i + size]
                if None not in gram:
                    grams.add(" ".join(gram).lower())
        hits = process.extract(term.lower(), grams, scorer=fuzz.ratio,
                               score_cutoff=FUZZY_CUTOFF, limit=None)
        variants[term] = [g for g, _, _ in hits
                          if g != term.lower() and not flips_meaning(term, g)]
    return variants


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
    rules = [TargetRule(t, t) for t in terms]
    for term, found in fuzzy_variants(nlp, text, terms).items():
        rules += [TargetRule(v, term) for v in found]
    nlp.get_pipe("medspacy_target_matcher").add(rules)
    doc = nlp(text)

    sys.stdout.reconfigure(encoding="utf-8")
    print("| term | as written | section | status | sentence |")
    print("|---|---|---|---|---|")
    found = set()
    for ent in doc.ents:
        found.add(ent.label_)
        print(f"| {ent.label_} | {ent.text} | {ent._.section_category or '-'} | {status(ent)} | {snippet(ent)} |")

    missing = [t for t in terms if t not in found]
    if missing:
        print(f"\nNot found in note: {', '.join(missing)}")


if __name__ == "__main__":
    main()
