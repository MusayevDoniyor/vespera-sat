import pypdf
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

def inspect_pdf(filepath):
    print(f"\n==========================================")
    print(f"FILE: {filepath}")
    reader = pypdf.PdfReader(filepath)
    num_pages = len(reader.pages)
    print(f"Total Pages: {num_pages}")
    
    # Print sample from first 2 pages
    for p_num in range(min(2, num_pages)):
        text = reader.pages[p_num].extract_text()
        print(f"\n--- PAGE {p_num + 1} (len={len(text) if text else 0}) ---")
        if text:
            print(text[:400])
        else:
            print("[NO EXTRACTABLE TEXT - might be scanned image]")

new_files = [
    "materials/College Board New Qs (120) by @satmath_1.pdf",
    "materials/Hard September math..pdf",
    "materials/sat-math-easy-practice-quiz.pdf",
    "materials/sat-math-medium-practice-quiz.pdf"
]

for f in new_files:
    if os.path.exists(f):
        inspect_pdf(f)
