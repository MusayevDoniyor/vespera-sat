import pypdf
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "materials/All June 2026 Math questions @DSATuz.pdf"
reader = pypdf.PdfReader(pdf_path)
print(f"File: {pdf_path}")
print(f"Total pages: {len(reader.pages)}")

# Print first 5 pages sample
for i in range(min(5, len(reader.pages))):
    txt = reader.pages[i].extract_text() or ""
    print(f"\n=================== PAGE {i+1} ({len(txt)} chars) ===================")
    print(txt[:600].strip())
