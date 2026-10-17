import os
import sys
import re
from pypdf import PdfReader

sys.stdout.reconfigure(encoding="utf-8")

MATERIALS_DIR = "materials"

target_files = [
    "Bluebook 4 official Digital SAT tests.pdf",
    "OFFICIAL DIGITAL SAT BOOK.pdf",
    "SAT_October_2026_All_Version.pdf",
    "digital-sat-sample-questions.pdf",
    "English Elite Book.pdf",
    "SATakror.pdf",
    "SAToplam Reading Book.pdf",
    "SAToplam Writing Book.pdf",
    "Math Hard Book.pdf",
    "Math Hardbook 20.pdf",
    "SAT Mathbook 20.pdf",
    "Mathbook 30.pdf",
    "All in One.pdf",
]

print("=" * 80)
print("EXHAUSTIVE AUDIT OF MOCK TESTS AND REAL EXAM ARCHIVES IN MATERIALS/")
print("=" * 80)

summary_results = []

for filename in target_files:
    filepath = os.path.join(MATERIALS_DIR, filename)
    if not os.path.exists(filepath):
        print(f"[MISSING] {filename}")
        continue

    try:
        reader = PdfReader(filepath)
        total_pages = len(reader.pages)
        print(f"\n[FILE] {filename} (Total Pages: {total_pages})")

        outline_titles = []
        try:
            if reader.outline:
                def extract_outline(items):
                    for item in items:
                        if isinstance(item, list):
                            extract_outline(item)
                        elif hasattr(item, 'title'):
                            outline_titles.append(str(item.title))
                extract_outline(reader.outline)
        except Exception:
            pass

        if outline_titles:
            print(f"  Bookmarks/TOC ({len(outline_titles)} items):")
            for t in outline_titles[:15]:
                print(f"    - {t}")
            if len(outline_titles) > 15:
                print(f"    ... and {len(outline_titles) - 15} more")

        # Scan all pages for full practice tests and modules
        found_tests = set()
        found_modules = set()
        total_reading_qs = 0
        total_math_qs = 0

        # Scan sample pages (up to 120 pages evenly distributed or all if < 120)
        step = max(1, total_pages // 60)
        pages_to_scan = list(range(0, total_pages, step))
        if total_pages - 1 not in pages_to_scan:
            pages_to_scan.append(total_pages - 1)

        for p_idx in pages_to_scan:
            try:
                text = reader.pages[p_idx].extract_text() or ""
                # Find tests like "Practice Test 1", "Practice Test 2", "Test 3", etc.
                t_matches = re.findall(r"(?:Digital SAT|Official|Practice)?\s*(?:Practice\s+)?Test\s*#?([0-9]+|[A-Z])", text, re.IGNORECASE)
                for tm in t_matches:
                    found_tests.add(f"Test {tm}")

                # Find Module occurrences
                m_matches = re.findall(r"(?:Reading and Writing|Math)\s*Module\s*([12])", text, re.IGNORECASE)
                for mm in m_matches:
                    found_modules.add(f"Module {mm}")
            except Exception:
                pass

        print(f"  Detected Test Identifiers: {sorted(list(found_tests))[:10]}")
        print(f"  Detected Module Identifiers: {sorted(list(found_modules))}")

        # Extract sample text from first page and middle page to understand format
        sample_page1 = (reader.pages[0].extract_text() or "")[:350].replace("\n", " ")
        sample_page_mid = (reader.pages[total_pages // 2].extract_text() or "")[:350].replace("\n", " ")
        print(f"  Preview P.1: {sample_page1[:180]}...")
        print(f"  Preview Mid (P.{total_pages // 2}): {sample_page_mid[:180]}...")

    except Exception as e:
        print(f"  Error reading {filename}: {e}")

print("\n" + "=" * 80)
print("AUDIT SUMMARY COMPLETE")
print("=" * 80)
