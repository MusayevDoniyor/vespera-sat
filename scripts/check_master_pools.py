import json

with open(r"C:\dev\vespera\scripts\exported_all_questions.json", "r", encoding="utf-8") as f:
    qs = json.load(f)

print(f"Total master questions: {len(qs)}")
by_sec = {}
for q in qs:
    sec = q.get("section", "UNKNOWN")
    diff = q.get("difficulty", "Medium")
    key = (sec, diff)
    by_sec[key] = by_sec.get(key, 0) + 1

for k, v in sorted(by_sec.items()):
    print(f"  {k[0]} - {k[1]}: {v}")
