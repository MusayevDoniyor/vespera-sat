import json

with open(r"C:\dev\vespera\scripts\june_extracted_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

q_map = {q["id"]: q for q in questions}

print("=== UNBALANCED LATEX (q_june_2026_003) ===")
if "q_june_2026_003" in q_map:
    print(q_map["q_june_2026_003"]["prompt"])

print("\n=== STRICT VISUAL QUESTIONS ===")
for qid in ['q_june_2026_095', 'q_june_2026_118', 'q_june_2026_144']:
    if qid in q_map:
        q = q_map[qid]
        print(f"\n--- {qid} ---")
        print("Prompt:", q["prompt"])
        print("Options:", q["options"])
        print("Ans:", q["correct_answer"])

print("\n=== MISSING UZ QUESTIONS ===")
missing_uz = [q for q in questions if not q.get("explanation_uz") or len(q.get("explanation_uz", "").strip()) < 10]
print("Count missing UZ:", len(missing_uz))
for q in missing_uz:
    print(q["id"], ":", q["prompt"][:60])
