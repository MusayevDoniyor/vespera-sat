import pypdfium2 as pdfium
import re
import json

def clean_noise(text):
    text = re.sub(r'R\s*E\s*A\s*D\s*I\s*N\s*G\s*·\s*0\s*1\s*W\s*O\s*R\s*D\s*S\s*I\s*N\s*C\s*O\s*N\s*T\s*E\s*X\s*T\s*(?:Questions|Answers & Explanations)?', '', text, flags=re.IGNORECASE)
    text = re.sub(r'[AB]\s+Fill in the Blank\s+\d+\s+questions', '', text, flags=re.IGNORECASE)
    text = re.sub(r'[AB]\s+Find the Synonym\s+\d+\s+questions', '', text, flags=re.IGNORECASE)
    text = re.sub(r'(?:E\s*A\s*S\s*Y|M\s*E\s*D\s*I\s*U\s*M|H\s*A\s*R\s*D)\s+\d+\s+questions', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Book collection by SATLeague\s*\d*', '', text, flags=re.IGNORECASE)
    return text

def parse_all():
    pdf = pdfium.PdfDocument('C:/dev/vespera/materials/Reading Writing Professor IV.pdf')

    # --- 1. PARSE EXPLANATIONS (pages 94 to 198, index 93 to 197) ---
    print("Parsing explanations from pages 94 to 198...")
    expl_pages_text = ''
    for p in range(93, 198):
        expl_pages_text += '\n' + pdf[p].get_textpage().get_text_range()

    expl_splits = re.split(r'\n(\d+)\s+Correct answer\s+([A-D])\s+(Easy|Medium|Hard)\s+Back to question', expl_pages_text)
    explanations_dict = {}
    for i in range(1, len(expl_splits), 4):
        q_num = int(expl_splits[i])
        c_ans = expl_splits[i+1].strip()
        q_diff = expl_splits[i+2].strip()
        raw_text = expl_splits[i+3].strip()
        cleaned_text = clean_noise(raw_text)
        # remove target word line if repeated right before 'Choice ... is the best answer'
        cleaned_text = re.sub(r'^[A-D]\s+[^\n]+\n', '', cleaned_text.strip())
        explanations_dict[q_num] = {
            'correct_answer': c_ans,
            'difficulty': q_diff.capitalize(),
            'explanation_en': cleaned_text.strip()
        }

    print(f"Parsed {len(explanations_dict)} explanations.")

    # --- 2. PARSE QUESTIONS (pages 7 to 93, index 6 to 92) ---
    print("Parsing questions from pages 7 to 93...")
    questions = []

    for page_idx in range(6, 93):
        raw_text = pdf[page_idx].get_textpage().get_text_range()
        cleaned = clean_noise(raw_text)

        # 3 IDs
        ids = re.findall(r'ID\s+([a-f0-9]{8})', cleaned, re.IGNORECASE)
        # 3 Question Headers
        q_matches = list(re.finditer(r'(\d+)\s+Mark for Review\s+(Easy|Medium|Hard)\s+Explanation', cleaned))

        if len(ids) != 3 or len(q_matches) != 3:
            raise ValueError(f"Page {page_idx+1}: expected 3 IDs and 3 headers, got {len(ids)} IDs, {len(q_matches)} headers.")

        # Find passages part: starts after the last option of the 3rd question
        q3_start = q_matches[2].start()
        q3_part = cleaned[q3_start:]

        # find option D of q3
        d_match = re.search(r'\nD\s+[^\n]+', q3_part)
        if not d_match:
            raise ValueError(f"Page {page_idx+1}: could not locate option D of Q3")
        options_end_pos = q3_start + d_match.end()

        left_side = cleaned[:options_end_pos]
        right_side = cleaned[options_end_pos:]

        # Split passages by 'ID [a-f0-9]{8}\s*›'
        p_splits = re.split(r'ID\s+[a-f0-9]{8}\s*›', right_side)
        if len(p_splits) < 3:
            # Fallback split on just 'ID [a-f0-9]{8}'
            p_splits = re.split(r'ID\s+[a-f0-9]{8}', right_side)

        passages = [re.sub(r'[\r\n]+', ' ', p.strip()).strip() for p in p_splits[:3]]

        # Parse the 3 questions on left side
        for i in range(3):
            q_num = int(q_matches[i].group(1))
            diff = q_matches[i].group(2).capitalize()
            start = q_matches[i].end()
            end = q_matches[i+1].start() if i < 2 else options_end_pos
            block = left_side[start:end].strip()

            # Parse prompt and choices A, B, C, D
            lines = [l.strip() for l in block.split('\n') if l.strip()]
            prompt_lines = []
            opt_a, opt_b, opt_c, opt_d = [], [], [], []
            curr = prompt_lines
            for line in lines:
                if re.match(r'^A\s+', line):
                    curr = opt_a
                    curr.append(re.sub(r'^A\s+', '', line).strip())
                elif re.match(r'^B\s+', line):
                    curr = opt_b
                    curr.append(re.sub(r'^B\s+', '', line).strip())
                elif re.match(r'^C\s+', line):
                    curr = opt_c
                    curr.append(re.sub(r'^C\s+', '', line).strip())
                elif re.match(r'^D\s+', line):
                    curr = opt_d
                    curr.append(re.sub(r'^D\s+', '', line).strip())
                else:
                    curr.append(line)

            prompt = ' '.join(prompt_lines).strip()
            # Clean prompt
            prompt = re.sub(r'\s+', ' ', prompt)

            options = [
                'A. ' + ' '.join(opt_a).strip(),
                'B. ' + ' '.join(opt_b).strip(),
                'C. ' + ' '.join(opt_c).strip(),
                'D. ' + ' '.join(opt_d).strip(),
            ]

            expl_data = explanations_dict.get(q_num, {})
            correct_ans = expl_data.get('correct_answer', '')
            expl_en = expl_data.get('explanation_en', '')

            passage = passages[i] if i < len(passages) else ''
            # Clean passage extra spaces
            passage = re.sub(r'\s+', ' ', passage)

            questions.append({
                'num': q_num,
                'id': f'cb_{ids[i]}',
                'raw_id': ids[i],
                'section': 'READING_WRITING',
                'domain': 'Craft and Structure',
                'topic_code': 'ENG-WIC',
                'topicTitle': 'Words in Context',
                'difficulty': diff,
                'prompt': prompt,
                'passage': passage,
                'options': options,
                'correct_answer': correct_ans,
                'explanation_en': expl_en,
                'source': 'Reading Writing Professor IV'
            })

    print(f"Extracted all {len(questions)} questions.")

    # Validation
    for q in questions:
        if len(q['options']) != 4:
            print(f"Error options on Q{q['num']}: {q['options']}")
        if not q['correct_answer']:
            print(f"Missing correct_answer on Q{q['num']}")
        if not q['explanation_en']:
            print(f"Missing explanation_en on Q{q['num']}")
        if not q['passage'] or len(q['passage']) < 30:
            print(f"Suspicious passage on Q{q['num']}: {q['passage']}")
        if not q['prompt'] or len(q['prompt']) < 15:
            print(f"Suspicious prompt on Q{q['num']}: {q['prompt']}")

    output_path = 'C:/dev/vespera/scripts/raw_rw_prof_wic_261.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

    print(f"Successfully saved {len(questions)} questions to {output_path}!")

if __name__ == '__main__':
    parse_all()
