import os
import sys
import re
from pypdf import PdfReader

sys.stdout.reconfigure(encoding="utf-8")

pdf_files = [f for f in os.listdir("materials") if f.endswith(".pdf")]

print("=" * 80)
print(f"AUDITING ALL {len(pdf_files)} PDF FILES IN materials/")
print("=" * 80)

results = []

for f in sorted(pdf_files):
    path = os.path.join("materials", f)
    size_mb = os.path.getsize(path) / (1024 * 1024)
    try:
        reader = PdfReader(path)
        pages = len(reader.pages)
        
        # Check first 3 pages and outline
        first_text = ""
        for i in range(min(5, pages)):
            first_text += (reader.pages[i].extract_text() or "") + " "
            
        outline_items = []
        if reader.outline:
            def extract(items):
                for item in items:
                    if isinstance(item, list):
                        extract(item)
                    elif hasattr(item, 'title'):
                        outline_items.append(str(item.title))
            extract(reader.outline)
        outline_count = len(outline_items)
        outline_samples = outline_items[:5]
            
        # Detect test types
        is_official_bluebook = "practice test" in first_text.lower() or "bluebook" in f.lower() or "official digital sat" in f.lower()
        is_past_exam = any(m in f.lower() for m in ["october", "elite", "akror", "real", "past"])
        is_question_bank = any(m in f.lower() for m in ["oplam", "hard", "mathbook", "all in one", "panda", "meltzer", "vocab"])
        
        results.append({
            "file": f,
            "pages": pages,
            "size_mb": round(size_mb, 1),
            "outline_count": outline_count,
            "sample_toc": outline_samples,
            "category": "Official Bluebook" if is_official_bluebook else ("Real Recalled Forms" if is_past_exam else "Domain Question Bank / Guide")
        })
    except Exception as e:
        results.append({
            "file": f,
            "pages": 0,
            "size_mb": round(size_mb, 1),
            "outline_count": 0,
            "sample_toc": [],
            "error": str(e)
        })

print(f"{'Filename':<42} | {'Pages':<6} | {'Size':<7} | {'Category'}")
print("-" * 80)
for r in results:
    print(f"{r['file'][:40]:<42} | {r.get('pages', 0):<6} | {str(r.get('size_mb', 0))+'MB':<7} | {r.get('category', 'Error')}")
    if r.get("sample_toc"):
        print(f"   -> TOC: {', '.join(r['sample_toc'][:4])}")
