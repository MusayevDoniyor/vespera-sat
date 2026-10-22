import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open(r"C:\dev\vespera\scripts\exported_all_questions.json", encoding="utf-8"))
for q in data:
    if q["id"] == "cb_4042ff0b":
        print("ID:", q["id"])
        print("Prompt:", q.get("prompt"))
        print("Diagram Preset:", q.get("diagram_preset"))
