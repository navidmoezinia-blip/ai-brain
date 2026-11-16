# `projects/micu-anki/` — MICU Anki card source

`micu_cards.py` holds a `CARDS` list of `(topic, text, extra)` tuples. `text` is Anki cloze markup. The cards are general critical-care teaching points.

To load them, import `CARDS` in a script that uses the `anki` Python library and add each tuple as a cloze note.
