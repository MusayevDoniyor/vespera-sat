import json
import os

with open(r"C:\dev\vespera\materials_inventory.json", "r", encoding="utf-8") as f:
    inv = json.load(f)

def get_p(item):
    p = item.get("pages", 0)
    if isinstance(p, int): return p
    if isinstance(p, str) and p.isdigit(): return int(p)
    return 0

categories = {
    "English & Reading/Writing Mega-Banklar": [],
    "Math Mega-Banklar & Formulas": [],
    "Rasmiy Testlar, Recalled & Leaked Savollar": [],
    "Lug'at, Cram & Strategiya Qo'llanmalari": []
}

for item in inv:
    name = item.get("name", "")
    p = get_p(item)
    mb = item.get("size_bytes", 0) / (1024 * 1024)
    record = {"name": name, "pages": p, "size_mb": round(mb, 2)}
    
    n_lower = name.lower()
    if any(k in n_lower for k in ["vocab", "word", "650", "gram", "cram", "atlas agora", "rule"]):
        categories["Lug'at, Cram & Strategiya Qo'llanmalari"].append(record)
    elif any(k in n_lower for k in ["math", "bobrow", "solving", "revision", "hardbook"]):
        categories["Math Mega-Banklar & Formulas"].append(record)
    elif any(k in n_lower for k in ["bluebook", "recalled", "real_test", "prediction", "version", "college board new", "official digital sat"]):
        categories["Rasmiy Testlar, Recalled & Leaked Savollar"].append(record)
    else:
        categories["English & Reading/Writing Mega-Banklar"].append(record)

print("=== MATERIALS SUMMARY BY CATEGORY ===")
total_all_pages = sum(get_p(f) for f in inv)
print(f"Total Materials: {len(inv)} files | Total Pages: {total_all_pages:,}\n")

for cat, files in categories.items():
    cat_pages = sum(f["pages"] for f in files)
    print(f"\n### {cat} ({len(files)} ta fayl, jami {cat_pages:,} sahifa)")
    for f in sorted(files, key=lambda x: x["pages"], reverse=True):
        print(f"  - **{f['name']}** ({f['pages']} sahifa)")
