import json

with open(r"C:\dev\vespera\src\lib\bluebook-exams-data.json", "r", encoding="utf-8") as f:
    exams = json.load(f)

print(f"Total exams: {len(exams)}")
for e in exams:
    print(f"Exam ID: {e.get('id')} | Title: {e.get('title')} | RW M1: {len(e.get('rwModule1', []))} | Math M1: {len(e.get('mathModule1', []))}")

sample_q = exams[0]['rwModule1'][0]
print("\nSample question schema:")
for k, v in sample_q.items():
    print(f"  {k}: {type(v).__name__}")
