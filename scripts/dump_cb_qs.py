import pypdf
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader("materials/College Board New Qs (120) by @satmath_1.pdf")
print("Total pages:", len(reader.pages))

full_text = ""
for i in range(len(reader.pages)):
    full_text += f"\n<<<PAGE_{i+1}>>>\n" + reader.pages[i].extract_text()

with open("scripts/cb_new_qs_raw.txt", "w", encoding="utf-8") as f:
    f.write(full_text)

print("Saved raw text. Total chars:", len(full_text))

qids = re.findall(r"Question ID:\s*([a-f0-9]+)", full_text, re.IGNORECASE)
print("Found Question IDs count:", len(qids))
print("Sample QIDs:", qids[:10])
