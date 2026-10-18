import pypdf
import sys

sys.stdout.reconfigure(encoding='utf-8')

for name in ["sat-math-easy-practice-quiz.pdf", "sat-math-medium-practice-quiz.pdf"]:
    reader = pypdf.PdfReader(f"materials/{name}")
    full_text = ""
    for i in range(len(reader.pages)):
        full_text += f"\n<<<PAGE_{i+1}>>>\n" + (reader.pages[i].extract_text() or "")
    
    out_name = f"scripts/{name.replace('.pdf', '_raw.txt')}"
    with open(out_name, "w", encoding="utf-8") as f:
        f.write(full_text)
    print(f"Dumped {name}: {len(reader.pages)} pages, {len(full_text)} chars")
