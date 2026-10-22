import pypdfium2 as pdfium
import os

pdf_path = r"C:\dev\vespera\materials\College Board New Qs (120) by @satmath_1.pdf"
out_dir = r"C:\dev\vespera\scripts\cb_120_images"
os.makedirs(out_dir, exist_ok=True)

pdf = pdfium.PdfDocument(pdf_path)
print(f"Total pages in PDF: {len(pdf)}")

# Render first 3 pages
for i in range(min(3, len(pdf))):
    page = pdf[i]
    image = page.render(scale=2.0).to_pil()
    out_file = os.path.join(out_dir, f"page_{i+1:02d}.png")
    image.save(out_file)
    print(f"Saved {out_file} (size: {image.size})")
