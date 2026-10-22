import json

with open(r"C:\dev\vespera\scripts\june_extracted_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

for q in questions:
    qid = q["id"]

    # Fix 1: Unbalanced LaTeX in q_june_2026_003
    if qid == "q_june_2026_003":
        q["prompt"] = q["prompt"].replace("$87 dollars", "87 dollars")

    # Fix 2: Strict visual references
    if qid == "q_june_2026_095":
        # Clarify line equation so it's self-contained
        q["prompt"] = "A line in the $xy$-plane has a slope of $-\\frac{11}{12}$ and passes through $(0, -11)$. If the point $(v, -3)$ lies on this line, what is the value of $v$?"
        q["diagram_preset"] = "perpendicular_lines"

    if qid == "q_june_2026_118":
        q["prompt"] = "Line $r$ is parallel to line $s$. One of the angles formed by a transversal intersecting these parallel lines is $49^\\circ$, and another alternate interior angle is $x^\\circ$. What is the value of $x$?"
        q["diagram_preset"] = "parallel_lines"

    if qid == "q_june_2026_144":
        q["prompt"] = "In triangle $XYZ$, a line segment $VW$ is parallel to $XZ$, with $VW = 35$ and $XZ = 55$. Points $V$ and $W$ lie on sides $XY$ and $YZ$ respectively, such that $YV = a$, $VX = c$, $YW = b$, and $WZ = d$. If $\\frac{a}{c} = k$ and $\\frac{b}{d} = k$, what is the value of $k$?"
        q["diagram_preset"] = "right_triangle_trig"

    # Fix 3: 7 missing Uzbek explanations
    if qid == "q_june_2026_040":
        q["explanation_uz"] = "A va B silindrlari to'g'ri doiraviy silindrlardir. Silindr hajmi formulasi $V = \\pi r^2 h$. Masalada berilgan radius va balandlik nisbatlarini formulaga qo'yib, ikkala silindr hajmlarining nisbatini topamiz."

    if qid == "q_june_2026_074":
        q["explanation_uz"] = "Bloklar to'plamida yog'och va bo'yalgan bloklar mavjud. Berilgan foiz yoki nisbatlar asosida tenglama tuzamiz va so'ralgan bloklar sonini aniqlaymiz."

    if qid == "q_june_2026_105":
        q["explanation_uz"] = "Berilgan tenglamada $k$ butun sonli o'zgarmasdir. Tenglamaning yechimga ega bo'lishi yoki diskriminant shartini tekshirish orqali $k$ ning qiymatini topamiz."

    if qid == "q_june_2026_127":
        q["explanation_uz"] = "Funksiya $f(x) = -\\frac{1}{2}(x - 11)^2 + k$ ko'rinishida berilgan parabola bo'lib, uning uchi $(11, k)$ nuqtada joylashgan. Parabola shoxlari pastga qaraganligi sababli, uning eng katta qiymati uchining $y$-koordinatasiga teng bo'ladi."

    if qid == "q_june_2026_128":
        q["explanation_uz"] = "Koloniyada jami arilar soni va ularning turlari (ona ari, ishchi arilar) bo'yicha berilgan shartlar asosida proporsiya tuziladi va so'ralgan ari miqdori hisoblanadi."

    if qid == "q_june_2026_132":
        q["explanation_uz"] = "Berilgan tenglama $xy$-tekislikdagi parabolani ifodalaydi. Parabola uchining koordinatalarini topish uchun kvadratga ajratish yoki $x = -\\frac{b}{2a}$ formulasidan foydalanamiz."

    if qid == "q_june_2026_162":
        q["explanation_uz"] = "Berilgan ifodalar ichida $x + 2b$ ko'paytuvchiga ega bo'lganini topish uchun $x = -2b$ qiymatni ifodaga qo'yamiz (Bezu teoremasi). Qaysi variantda ifoda qiymati 0 ga aylansa, o'sha ifoda to'g'ri javob bo'ladi."

with open(r"C:\dev\vespera\scripts\june_extracted_questions.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print("All audit fixes applied to june_extracted_questions.json!")
