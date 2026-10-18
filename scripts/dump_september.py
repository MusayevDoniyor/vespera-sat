import pypdf
import sys

sys.stdout.reconfigure(encoding='utf-8')

reader = pypdf.PdfReader("materials/Hard September math..pdf")
print("Total pages:", len(reader.pages))

full_text = ""
for i in range(len(reader.pages)):
    full_text += f"\n<<<PAGE_{i+1}>>>\n" + (reader.pages[i].extract_text() or "")

with open("scripts/hard_september_raw.txt", "w", encoding="utf-8") as f:
    f.write(full_text)

print("Saved hard september raw text. Total chars:", len(full_text))
