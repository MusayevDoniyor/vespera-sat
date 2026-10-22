import json

with open(r"C:\dev\vespera\materials_inventory.json", "r", encoding="utf-8") as f:
    inv = json.load(f)

print(f"Total files in materials/: {len(inv)}")

def get_p(item):
    p = item.get("pages", 0)
    if isinstance(p, int): return p
    if isinstance(p, str) and p.isdigit(): return int(p)
    return 0

total_pages = sum(get_p(f) for f in inv)
print(f"Total pages across all PDFs: {total_pages:,}")

print("\n--- TOP 25 LARGEST MATERIALS ---")
for item in sorted(inv, key=get_p, reverse=True)[:25]:
    pages = get_p(item)
    size_mb = item.get("size_bytes", 0) / (1024 * 1024)
    print(f"{pages:>5} pages | {size_mb:>6.1f} MB | {item.get('name')}")
