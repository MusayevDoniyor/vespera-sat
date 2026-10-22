import os
import pypdf
from PIL import Image
import io

pdf_path = r"C:\dev\vespera\materials\All June 2026 Math questions @DSATuz.pdf"
out_dir = r"C:\dev\vespera\scripts\june_math_images"
os.makedirs(out_dir, exist_ok=True)

reader = pypdf.PdfReader(pdf_path)
total_pages = len(reader.pages)
print(f"Total pages to extract: {total_pages}")

extracted = 0
for idx, page in enumerate(reader.pages):
    page_num = idx + 1
    out_file = os.path.join(out_dir, f"page_{page_num:03d}.png")
    if os.path.exists(out_file):
        extracted += 1
        continue
    
    if len(page.images) > 0:
        img_data = page.images[0].data
        with open(out_file, "wb") as f:
            f.write(img_data)
        extracted += 1
        if page_num % 25 == 0 or page_num == total_pages:
            print(f"Extracted {page_num}/{total_pages}")
    else:
        print(f"Warning: No image on page {page_num}")

print(f"Extraction complete! Total extracted: {extracted}")
