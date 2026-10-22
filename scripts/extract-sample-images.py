import pypdf
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "materials/All June 2026 Math questions @DSATuz.pdf"
reader = pypdf.PdfReader(pdf_path)

os.makedirs("scripts/extracted_june_samples", exist_ok=True)

for p_num in [1, 2, 3, 4, 5, 10, 50, 100, 150, 190]:
    page = reader.pages[p_num - 1]
    for img_idx, img in enumerate(page.images):
        filename = f"scripts/extracted_june_samples/page_{p_num}_img_{img_idx}_{img.name}"
        with open(filename, "wb") as f:
            f.write(img.data)
        print(f"Page {p_num}: saved {filename} ({len(img.data)} bytes)")
