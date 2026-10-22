from PIL import Image

img = Image.open(r"C:\dev\vespera\scripts\extracted_june_samples\page_2_img_0_Im0.png").convert("RGB")
w, h = img.size
pix = img.load()

box_pixels = []
for y in range(h):
    for x in range(w // 2, w):
        r, g, b = pix[x, y]
        # Match (150, 140, 240) - lavender border
        if b > 210 and r > 130 and r < 180 and g > 120 and g < 170:
            box_pixels.append((x, y))

print(f"Total border pixels: {len(box_pixels)}")
if box_pixels:
    xs = [p[0] for p in box_pixels]
    ys = [p[1] for p in box_pixels]
    print(f"X: {min(xs)} to {max(xs)}, Y: {min(ys)} to {max(ys)}")
    print(f"Center Y: {(min(ys) + max(ys)) // 2}")
