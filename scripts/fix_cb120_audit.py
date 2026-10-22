import json

with open(r"C:\dev\vespera\scripts\cb120_extracted_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

for q in questions:
    qid = q["id"]
    if qid == "q_cb120_p15_2":
        q["prompt"] = "In the given configuration, $\\triangle ABC$ is congruent to $\\triangle BDE$. If $r = 54$ and $s = 26$, what is the length of $\\overline{CD}$?"
        q["diagram_preset"] = "right_triangle_altitude"
    
    if qid == "q_cb120_p16_2":
        q["prompt"] = "Quadrilateral $CDEF$ is divided by diagonal $DF$ into two triangles $\\triangle CDF$ and $\\triangle FED$. It is given that $CD = EF$ and $FC = DE$. If $x = 65$ and $y = 30$, what is the measure of $\\angle CDE$?"
        q["diagram_preset"] = "parallel_lines"
        
    if qid == "q_cb120_p18_2":
        q["explanation_uz"] = "$AB = BC$ bo'lganligi sababli, $\\triangle ABC$ teng yonli uchburchakdir. $DE \\parallel AC$ shartiga ko'ra, $\\triangle DBE$ uchburchagi $\\triangle ABC$ ga o'xshash. O'xshashlik xossalari va berilgan $AB = 81$ qiymatidan foydalanib, $BE$ kesmaning uzunligi 27 ga teng bo'ladi."
        
    if qid == "q_cb120_p41_2":
        q["explanation_uz"] = "Grafikdan ko'rinib turibdiki, $f(x)$ kamayuvchi chiziqli funksiya bo'lib, uning $y$-o'qi bilan kesishish nuqtasi $(0, 13)$ da joylashgan. $g(x)$ esa o'suvchi chiziqli funksiya bo'lib, uning $y$-o'qi bilan kesishish nuqtasi $(0, 7)$ da. Ikkala funksiya $x = 11$ nuqtada bir xil $y = 11$ qiymatga erishadi. Demak, mos keluvchi to'g'ri ifoda aniqlanadi."

with open(r"C:\dev\vespera\scripts\cb120_extracted_questions.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print("Audit fixes applied to cb120_extracted_questions.json!")
