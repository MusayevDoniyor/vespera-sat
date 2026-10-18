import json
import re

def parse_easy_quiz():
    with open("scripts/sat-math-easy-practice-quiz_raw.txt", "r", encoding="utf-8") as f:
        content = f.read()

    # Split into sections: Questions part and Answers part
    # Page 8+ contains answers
    parts = content.split("<<<PAGE_8>>>")
    q_text = parts[0]
    ans_text = "<<<PAGE_8>>>" + parts[1] if len(parts) > 1 else ""

    # Let's inspect answer matches
    ans_matches = re.findall(r"(\d+)\.\s+([A-E]|\d+)\s+\(Estimated Diﬃculty Level:\s*(\d+)\)", ans_text)
    print(f"Easy Quiz Answers found: {len(ans_matches)}")
    return ans_matches

def parse_medium_quiz():
    with open("scripts/sat-math-medium-practice-quiz_raw.txt", "r", encoding="utf-8") as f:
        content = f.read()
    
    parts = content.split("<<<PAGE_11>>>")
    q_text = parts[0]
    ans_text = "<<<PAGE_11>>>" + parts[1] if len(parts) > 1 else ""
    
    ans_matches = re.findall(r"(\d+)\.\s+([A-E]|\d+)\s+\(Estimated Diﬃculty Level:\s*([0-9+]+)\)", ans_text)
    print(f"Medium Quiz Answers found: {len(ans_matches)}")
    return ans_matches

parse_easy_quiz()
parse_medium_quiz()
