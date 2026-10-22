from PIL import Image

img = Image.open(r"C:\dev\vespera\scripts\extracted_june_samples\page_2_img_0_Im0.png")
print("Size:", img.size)

# Let's crop into 4 quadrants or check where text is
# Let's crop the center, top-left, bottom-left, etc.
# Even better, let's OCR with tesseract giving word bounding boxes!
