import pymupdf
import winocr
import asyncio
from PIL import Image
import json
import re
import os

async def extract_all():
    pdf_path = 'materials/MUST KNOW 650 SAT real exam words @DSATuz.pdf'
    doc = pymupdf.open(pdf_path)
    print(f"Total pages in doc: {len(doc)}")
    
    all_raw_text = []
    
    for page_idx in range(1, len(doc)): # skip title page 0
        page = doc[page_idx]
        pix = page.get_pixmap(dpi=220)
        img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
        res = await winocr.recognize_pil(img)
        page_text = res.text
        print(f"Page {page_idx + 1} recognized ({len(page_text)} chars)")
        all_raw_text.append((page_idx + 1, page_text))
    
    # Save raw recognized text
    os.makedirs('scripts/extracted', exist_ok=True)
    with open('scripts/extracted/raw_ocr_dump.txt', 'w', encoding='utf-8') as f:
        for pnum, txt in all_raw_text:
            f.write(f"\n--- PAGE {pnum} ---\n{txt}\n")
            
    print("Raw OCR dump saved. Now parsing 650 words...")
    
    words_list = []
    
    # Normalize dashes and special chars
    full_text = "\n".join([t for _, t in all_raw_text])
    # Replace non-standard dashes and 
    clean_text = full_text.replace("", " — ").replace("–", " — ").replace("- ", " — ").replace(" — ", " — ")
    
    # Regex to extract: number. word — definition
    # Notice pattern: 1. Illusory — based on illusion...
    pattern = re.compile(r'(\b\d{1,3})\s*[\.\)]\s*([A-Za-z\s\-\/\(\)]+?)\s*(?:—|–|-)\s*([^0-9\n\r]+?)(?=(?:\s*\b\d{1,3}\s*[\.\)]|\s*THE D7SAT|\s*PAGE|\Z))', re.DOTALL)
    
    # Alternatively parse by line or regex
    matches = pattern.findall(clean_text)
    print(f"Regex found {len(matches)} matches")
    
    for num_str, word_str, def_str in matches:
        num = int(num_str.strip())
        word = word_str.strip()
        definition = re.sub(r'\s+', ' ', def_str.strip()).strip(' .;') + '.'
        words_list.append({
            "id": num,
            "word": word,
            "definition": definition
        })
        
    print(f"Extracted {len(words_list)} words")
    if words_list:
        print("First 3:", words_list[:3])
        print("Last 3:", words_list[-3:])
        
    with open('scripts/extracted/sat_650_parsed.json', 'w', encoding='utf-8') as f:
        json.dump(words_list, f, indent=2, ensure_ascii=False)
        
    print("Done! Saved to scripts/extracted/sat_650_parsed.json")

if __name__ == '__main__':
    asyncio.run(extract_all())
