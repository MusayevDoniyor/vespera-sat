from PIL import Image

img = Image.open(r"C:\dev\vespera\scripts\extracted_june_samples\page_2_img_0_Im0.png")
w, h = img.size

# Crop right side
right_img = img.crop((w // 2, 0, w, h))
right_img.save(r"C:\dev\vespera\scripts\extracted_june_samples\page_2_right.png")

# Also crop left side (question prompt)
left_img = img.crop((0, 0, w // 2, h))
left_img.save(r"C:\dev\vespera\scripts\extracted_june_samples\page_2_left.png")

print("Saved left and right crops of page 2")
