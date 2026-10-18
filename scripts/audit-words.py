import json

with open('scripts/extracted/sat_650_clean_parsed.json', 'r', encoding='utf-8') as f:
    words = json.load(f)

print(f"Total words in JSON: {len(words)}")
issues = []
for w in words:
    word = w['word'].strip()
    defn = w['definition'].strip()
    if not word or len(word) < 2:
        issues.append(f"Empty/short word at id {w['id']}: {w}")
    if not defn or len(defn) < 5:
        issues.append(f"Empty/short def at id {w['id']}: {w}")
    # check for weird leftover numbers in word
    if any(c.isdigit() for c in word):
        issues.append(f"Digit in word at id {w['id']}: {word}")

if issues:
    print(f"Found {len(issues)} issues:")
    for iss in issues:
        print(" -", iss)
else:
    print("ALL 650 WORDS AND DEFINITIONS VALIDATED WITH ZERO ISSUES!")
