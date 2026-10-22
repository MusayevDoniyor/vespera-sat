import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

try:
    import pypdf
    has_pypdf = True
except ImportError:
    has_pypdf = False

mat_dir = "materials"
files = [f for f in os.listdir(mat_dir) if os.path.isfile(os.path.join(mat_dir, f))]
files.sort(key=lambda x: os.path.getsize(os.path.join(mat_dir, x)), reverse=True)

print(f"Total files in materials/: {len(files)}")
print(f"{'Filename':<65} | {'Size (MB)':<10} | {'Pages':<8} | {'Type'}")
print("-" * 105)

results = []
for f in files:
    full_path = os.path.join(mat_dir, f)
    size_mb = os.path.getsize(full_path) / (1024 * 1024)
    pages_count = "N/A"
    ftype = "Other"
    
    if f.lower().endswith('.pdf'):
        ftype = "PDF Book/Quiz"
        if has_pypdf:
            try:
                reader = pypdf.PdfReader(full_path)
                pages_count = str(len(reader.pages))
            except Exception as e:
                pages_count = "Error"
    elif f.lower().endswith('.json'):
        ftype = "JSON Dataset"
    
    results.append({
        "name": f,
        "size_mb": round(size_mb, 2),
        "pages": pages_count,
        "type": ftype
    })
    print(f"{f:<65} | {size_mb:>8.2f} MB | {str(pages_count):>8} | {ftype}")

import json
with open("materials_inventory.json", "w", encoding="utf-8") as out:
    json.dump(results, out, indent=2)

print("\nSaved inventory to materials_inventory.json")
