import pypdf
import sys

sys.stdout.reconfigure(encoding='utf-8')

def sample_pdf(filepath, name, num_pages=3):
    print(f"\n=======================================================")
    print(f"SAMPLE: {name} ({filepath})")
    print(f"=======================================================")
    try:
        reader = pypdf.PdfReader(filepath)
        total = len(reader.pages)
        print(f"Total pages: {total}")
        for p in range(min(num_pages, total)):
            txt = reader.pages[p].extract_text() or ""
            print(f"--- PAGE {p+1} ({len(txt)} chars) ---")
            print(txt[:400].strip())
    except Exception as e:
        print(f"Error: {e}")

sample_pdf("materials/Math Hard Book.pdf", "Math Hard Book", 2)
sample_pdf("materials/Hard September math..pdf", "Hard September Math", 2)
sample_pdf("materials/sat-math-easy-practice-quiz.pdf", "SAT Math Easy Quiz", 2)
sample_pdf("materials/sat-math-medium-practice-quiz.pdf", "SAT Math Medium Quiz", 2)
sample_pdf("materials/@SAT_TOP 500 DSAT Critical Reading Questions.pdf", "Top 500 Critical Reading", 2)
