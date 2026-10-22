import pypdf
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "materials/All June 2026 Math questions @DSATuz.pdf"
reader = pypdf.PdfReader(pdf_path)

total_pages = len(reader.pages)
print(f"Total pages: {total_pages}")

pages_with_more_text = []
pages_with_images = []

for idx, page in enumerate(reader.pages):
    txt = (page.extract_text() or "").strip()
    # Check if there is text other than the watermark
    cleaned = txt.replace("@DSATuz", "").replace("USE OUR WEBSITE FOR YOUR PREP", "").replace("www.TopTierPrep.com", "").strip()
    if len(cleaned) > 20:
        pages_with_more_text.append((idx + 1, cleaned))
    
    # Check images
    if hasattr(page, 'images') and len(page.images) > 0:
        pages_with_images.append((idx + 1, len(page.images)))

print(f"Pages with extra text: {len(pages_with_more_text)}")
if pages_with_more_text:
    print("Sample extra text on page", pages_with_more_text[0][0])
    print(pages_with_more_text[0][1][:400])

print(f"Pages with images: {len(pages_with_images)}")
if pages_with_images:
    print(f"Sample images: first 5 pages with images: {pages_with_images[:5]}")
