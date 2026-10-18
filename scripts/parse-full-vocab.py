import re
import json

with open('scripts/extracted/raw_ocr_dump.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pages = text.split('--- PAGE ')
entries = []
word_id = 1

for page in pages[1:]:
    p_num = int(page.split(' ---')[0])
    content = page.split(' ---')[1]
    
    content = re.sub(r'THE D7SAT\'S 650 MUST-KNOW SAT WORDS', '', content)
    content = re.sub(r'https?://[^\s]+', '', content).strip()
    
    parts = re.split(r'\s+—\s+', content)
    num_items = len(parts) - 1
    
    for i in range(num_items):
        left = parts[i].strip()
        right = parts[i+1].strip()
        
        # In left, word comes after the last period, semicolon, or number list
        # e.g. "1. Illusory" -> "Illusory"
        # e.g. "appearance. 3. Ingenious" -> "Ingenious"
        # e.g. ". 134. 135.  Misconstrued" -> "Misconstrued"
        # e.g. "606. Sustainable" -> "Sustainable"
        # e.g. "preceding def. Controversy in" -> "Controversy in"
        
        # Remove trailing periods from left definition
        left_tokens = left.split()
        
        # Find where the word starts: usually 1 to 3 tokens (e.g. "Controversy in", "Exposure to", "Stretching toward")
        # Let's find tokens that don't belong to the preceding definition sentence
        # Look backwards from end of left_tokens:
        word_tokens = []
        for token in reversed(left_tokens):
            clean_tok = re.sub(r'[^A-Za-z\-\'\/\(\)]', '', token)
            # If token is a number or contains terminal punctuation like '.', stop (it belongs to prev def or number list)
            if re.match(r'^\d+[\.\)]?$', token):
                break
            if token.endswith('.') or token.endswith(';') or token.endswith('!'):
                # might be last token of word if no period, but terminal punctuation means end of prev sentence
                # unless it's only 1 token
                if word_tokens:
                    break
            if clean_tok:
                word_tokens.insert(0, clean_tok)
            # If word already has 2 or 3 tokens and first is capitalized, that's the word/phrase
            if len(word_tokens) >= 1 and word_tokens[0][0].isupper() and len(word_tokens) >= 2 and word_tokens[1].lower() in ['in', 'to', 'on', 'with', 'about', 'toward', 'for', 'by', 'of', 'from', 'as']:
                break
            if len(word_tokens) == 1 and word_tokens[0][0].isupper() and (len(left_tokens) < 2 or re.match(r'^\d+[\.\)]?$', left_tokens[-2]) or left_tokens[-2].endswith('.')):
                break
                
        word = " ".join(word_tokens).strip()
        
        # Clean word
        word = re.sub(r'^\d+\s*[\.\)]?\s*', '', word).strip()
        word = re.sub(r'[^A-Za-z\s\-\'\/\(\)]', '', word).strip()
        
        # Extract definition from right
        if i < num_items - 1:
            # Find boundary: sentence ending (period) before next word
            # In right, definition ends with a period, followed by either number or next word
            # E.g. "based on illusion; not real or true; deceptive. 2. Imposing"
            # E.g. "grand and impressive in appearance. 3. Ingenious"
            # E.g. "misunderstood or interpreted incorrectly. Catalyzing"
            dm = re.search(r'^(.*?\.)(?:\s+\d+\.|\s+[A-Z][a-z]+|\s+\d+\s*|\Z)', right)
            if dm and len(dm.group(1).strip()) > 4:
                defn = dm.group(1).strip()
            else:
                # If no period, stop before next capitalized word at end
                dm2 = re.search(r'^(.*?)(?:\s+[A-Z][a-z]+|\Z)', right)
                defn = dm2.group(1).strip() if dm2 else right
        else:
            # Last item on page
            defn = re.sub(r'\s*\d+\s*$', '', right).strip()
            
        defn = re.sub(r'^\s*[\.\,\;\:\-]\s*', '', defn).strip()
        if not defn.endswith('.'):
            defn += '.'
            
        entries.append({
            'id': word_id,
            'word': word,
            'definition': defn,
            'page': p_num
        })
        word_id += 1

print(f"Total parsed entries: {len(entries)}")

# Verify and check entries
for i in range(min(15, len(entries))):
    print(f"{entries[i]['id']}. {entries[i]['word']} — {entries[i]['definition']}")

print("...")
for i in range(max(0, len(entries)-10), len(entries)):
    print(f"{entries[i]['id']}. {entries[i]['word']} — {entries[i]['definition']}")

with open('scripts/extracted/sat_650_clean_parsed.json', 'w', encoding='utf-8') as f:
    json.dump(entries, f, indent=2, ensure_ascii=False)
print("Saved to scripts/extracted/sat_650_clean_parsed.json")
