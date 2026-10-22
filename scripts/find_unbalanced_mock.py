import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

data = json.load(open(r"C:\dev\vespera\src\lib\bluebook-exams-data.json", encoding="utf-8"))
for exam in data:
    for m in ['rwModule1', 'rwModule2Hard', 'rwModule2Easy', 'mathModule1', 'mathModule2Hard', 'mathModule2Easy']:
        for q in exam.get(m, []):
            txt = (q.get('prompt', '') or '') + ' ' + (q.get('passage', '') or '')
            cnt = txt.count('$')
            if cnt % 2 != 0:
                print(f"[{exam['id']} / {m}] {q.get('id')} has {cnt} dollars:")
                print(" ", q.get('prompt')[:120])
