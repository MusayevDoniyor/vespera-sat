import pypdf
import os
import json

pdf_path = r"C:\dev\vespera\materials\College Board New Qs (120) by @satmath_1.pdf"
reader = pypdf.PdfReader(pdf_path)

print(f"Total pages: {len(reader.pages)}")

pages_with_images = []
for idx, page in enumerate(reader.pages):
    imgs = len(page.images)
    if imgs > 0:
        pages_with_images.append((idx + 1, imgs))

print(f"Pages with images: {len(pages_with_images)} out of {len(reader.pages)}")
if pages_with_images:
    print("Image pages:", pages_with_images[:10])

# Let's inspect page 1 text in full detail
print("\n--- FULL TEXT SAMPLE (PAGE 1) ---")
print(reader.pages[0].extract_text())

print("\n--- FULL TEXT SAMPLE (PAGE 2) ---")
print(reader.pages[1].extract_text())

print("\n--- FULL TEXT SAMPLE (PAGE 3) ---")
print(reader.pages[2].extract_text())
