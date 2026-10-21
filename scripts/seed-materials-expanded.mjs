import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Error: DATABASE_URL environment variable is required.");
  process.exit(1);
}

const pool = new Pool({ connectionString });

const newQuestionsFromMaterials = [
  // ==========================================
  // REAL SEPTEMBER 2026 EXAM (HARD MODULE 2)
  // ==========================================
  {
    id: "q_real_sep2026_01",
    topic_code: "ADV-03",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Hard",
    prompt: "The functions $f$ and $g$ are defined by $f(x) = x^2 + px + 42$ and $g(x) = x^2 + 10x + 18$, where $p$ is a constant. The solutions to $f(x) = 0$ are $r$ and $s$, and the solutions to $g(x) = 0$ are $r + 2$ and $s + 2$. What is the value of $p$?",
    options: JSON.stringify(["A. 10", "B. 12", "C. 14", "D. 18"]),
    correct_answer: "C",
    explanation_en: "1. By Vieta's formulas, the sum of roots for $g(x) = x^2 + 10x + 18$ is $(r + 2) + (s + 2) = -10$.\n2. Simplify: $r + s + 4 = -10 \\implies r + s = -14$.\n3. For $f(x) = x^2 + px + 42$, the sum of roots is $r + s = -p$.\n4. Equating the two expressions: $-p = -14 \\implies p = 14$.\nCheck with products: $(r+2)(s+2) = rs + 2(r+s) + 4 = 42 + 2(-14) + 4 = 18$ (matches!). Source: Real September SAT Math Exam.",
    explanation_uz: "1. Viyet formulasiga ko'ra, g(x) ildizlari yig'indisi: (r + 2) + (s + 2) = -10 bo'ladi.\n2. r + s + 4 = -10 => r + s = -14.\n3. f(x) uchun ildizlar yig'indisi: r + s = -p.\n4. -p = -14 => p = 14. To'g'ri javob C.",
    desmos_trick: "Graph g(x) = x^2 + 10x + 18 in Desmos to find roots: x = -2.26 and x = -7.74. Subtract 2 to find r and s: r = -4.26, s = -9.74. Sum is -14. Since sum is -p, p = 14!",
    reference_formula: "r_1 + r_2 = -\\frac{b}{a}, \\quad r_1 r_2 = \\frac{c}{a}"
  },
  {
    id: "q_real_sep2026_02",
    topic_code: "GEO-01",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    difficulty: "Hard",
    prompt: "Right circular cylinders A and B are similar. The height of cylinder A is 10 units, and the diameter of its base is equal to its height. The ratio of the diameter of cylinder A to cylinder B is $3 : 7$. What is the volume, in cubic units, of cylinder B?",
    options: JSON.stringify([
      "A. 250\\pi",
      "B. \\frac{1750\\pi}{3}",
      "C. \\frac{12250\\pi}{9}",
      "D. \\frac{85750\\pi}{27}"
    ]),
    correct_answer: "D",
    explanation_en: "1. For cylinder A: height $h_A = 10$, diameter $d_A = 10$, so radius $r_A = 5$.\n2. Volume of cylinder A: $V_A = \\pi r_A^2 h_A = \\pi (5)^2 (10) = 250\\pi$.\n3. The cylinders are similar with linear scale factor $k = \\frac{7}{3}$.\n4. For similar 3D solids, volume scales by the cube of the linear ratio: $\\frac{V_B}{V_A} = k^3 = \\left(\\frac{7}{3}\\right)^3 = \\frac{343}{27}$.\n5. $V_B = 250\\pi \\times \\frac{343}{27} = \\frac{85,750\\pi}{27}$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. A silindr uchun: h = 10, diametr = 10, radius = 5. Hajmi: V_A = pi * 5^2 * 10 = 250*pi.\n2. Chiziqli o'lchamlar nisbati: 7/3.\n3. O'xshash 3D jismlar hajmi kub nisbatda o'zgaradi: (7/3)^3 = 343 / 27.\n4. B silindr hajmi = 250*pi * (343 / 27) = 85750*pi / 27. To'g'ri javob D.",
    desmos_trick: "Type '250 * (7/3)^3' into Desmos and click the fraction toggle button: it directly returns 85750/27!",
    reference_formula: "\\frac{V_2}{V_1} = \\left(\\frac{L_2}{L_1}\\right)^3"
  },
  {
    id: "q_real_sep2026_03",
    topic_code: "ADV-03",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Hard",
    prompt: "The function $f$ is defined by $f(x) = 3x^2 + 48x + 193$. The function $g$ is defined by $g(x) = f(x + 7)$. What is the minimum value of $g(x)$?",
    options: JSON.stringify(["A. -15", "B. -8", "C. 1", "D. 8"]),
    correct_answer: "C",
    explanation_en: "1. The transformation $g(x) = f(x + 7)$ shifts the graph horizontally to the left by 7 units.\n2. A horizontal translation does NOT change the vertical range or minimum output value ($y$-value) of a function.\n3. Find the minimum of $f(x)$: the vertex occurs at $x = -\\frac{b}{2a} = -\\frac{48}{2(3)} = -8$.\n4. Evaluate $f(-8) = 3(-8)^2 + 48(-8) + 193 = 3(64) - 384 + 193 = 192 - 384 + 193 = 1$.\n5. Therefore, the minimum value of $g(x)$ is also 1. Source: Real September SAT Math Exam.",
    explanation_uz: "1. g(x) = f(x + 7) grafigi gorizontal chapga 7 birlik siljish demakdir.\n2. Gorizontal siljish funksiyaning eng kichik qiymatini (y qiymatini) zarracha o'zgartirmaydi!\n3. f(x) parabola uchi: x = -48 / (2*3) = -8.\n4. f(-8) = 3(64) - 384 + 193 = 1. Demak g(x) ning ham eng kichik qiymati 1 bo'ladi.",
    desmos_trick: "Type 'y = 3(x+7)^2 + 48(x+7) + 193' into Desmos. Tap the vertex point: (-15, 1). The minimum y-value is 1!",
    reference_formula: "x_v = -\\frac{b}{2a}, \\quad y_{min} = f(x_v)"
  },
  {
    id: "q_real_sep2026_04",
    topic_code: "DAT-01",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    difficulty: "Hard",
    prompt: "In December 2024, daily high temperatures in a town were recorded: 5 days in $35 < t \\le 40$, 3 days in $40 < t \\le 45$, 2 days in $45 < t \\le 50$, and 2 days in $50 < t \\le 55$. In January 2025, the daily high temperature was greater than $35^\\circ\\text{F}$ on 18 days. This number of days is $p\\%$ greater than the number of days in December on which the daily high temperature was greater than $35^\\circ\\text{F}$. What is the value of $p$?",
    options: JSON.stringify(["A. 33.3", "B. 40", "C. 50", "D. 60"]),
    correct_answer: "C",
    explanation_en: "1. Count December days with $t > 35^\\circ\\text{F}$: $5 + 3 + 2 + 2 = 12$ days.\n2. In January, there were 18 such days.\n3. Percent greater formula: $p = \\frac{18 - 12}{12} \\times 100\\% = \\frac{6}{12} \\times 100\\% = 50\\%$.\n4. Therefore, $p = 50$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Dekabrda 35 gradusdan yuqori bo'lgan kunlar soni: 5 + 3 + 2 + 2 = 12 kun.\n2. Yanvarda esa 18 kun.\n3. Foiz o'sishi: (18 - 12) / 12 * 100% = 6 / 12 * 100% = 50%. To'g'ri javob C.",
    desmos_trick: "Type '(18 - 12) / 12 * 100' into Desmos to get 50.",
    reference_formula: "\\% \\text{ Increase} = \\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100\\%"
  },
  {
    id: "q_real_sep2026_06",
    topic_code: "ADV-04",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Medium",
    prompt: "A sample of a certain isotope takes 29 years to decay to half its original mass. The function $s(t) = 128(0.5)^{t/29}$ gives the approximate mass of this isotope, in grams, that remains $t$ years after a 128-gram sample starts to decay. Which statement is the best interpretation of $s(58) = 32$ in this context?",
    options: JSON.stringify([
      "A. Approximately 32 grams of the sample remains 58 years after the sample starts to decay.",
      "B. The mass of the sample has decreased by approximately 32 grams 58 years after the sample starts to decay.",
      "C. The mass of the sample has decreased by approximately 58 grams 32 years after the sample starts to decay.",
      "D. Approximately 58 grams of the sample remains 32 years after the sample starts to decay."
    ]),
    correct_answer: "A",
    explanation_en: "1. In function notation $s(t)$, the input $t$ represents the number of years after decay began ($t = 58$).\n2. The output $s(t)$ represents the remaining mass in grams ($s(58) = 32$ grams).\n3. Thus, approximately 32 grams remains 58 years after the sample starts decaying.\n4. Choice B is incorrect because 32 is the remaining mass, not the amount decreased. Source: Real September SAT Math Exam.",
    explanation_uz: "1. s(t) funksiyada kiruvchi t - bu o'tgan yillar soni (58 yil).\n2. Chiqish qiymati s(t) - qolgan massa (32 gramm).\n3. Demak, parchalanish boshlanganidan 58 yil o'tib, namunadan taxminan 32 gramm qoladi.",
    desmos_trick: "Calculate 128 * (0.5)^(58/29) = 128 * (0.5)^2 = 128 * 0.25 = 32.",
    reference_formula: "A(t) = A_0 \\left(\\frac{1}{2}\\right)^{t / t_{1/2}}"
  },
  {
    id: "q_real_sep2026_07",
    topic_code: "ADV-05",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Hard",
    prompt: "The function $f$ is defined by $f(x) = \\frac{|x|}{a} - 14$, where $a < 0$. What is the product of $f(15a)$ and $f(8a)$?",
    options: JSON.stringify(["A. -638", "B. 29", "C. 506", "D. 638"]),
    correct_answer: "D",
    explanation_en: "1. Since $a < 0$, $15a$ is negative. Therefore, $|15a| = -(15a) = -15a$.\n2. Substitute into $f(x)$: $f(15a) = \\frac{-15a}{a} - 14 = -15 - 14 = -29$.\n3. Similarly, since $a < 0$, $8a$ is negative, so $|8a| = -8a$.\n4. Substitute: $f(8a) = \\frac{-8a}{a} - 14 = -8 - 14 = -22$.\n5. The product is $(-29) \\times (-22) = 638$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. a < 0 (manfiy son), shuning uchun 15a manfiy bo'ladi. Moduldan -15a chiqadi: |15a| = -15a.\n2. f(15a) = (-15a)/a - 14 = -15 - 14 = -29.\n3. Xuddi shunday, f(8a) = (-8a)/a - 14 = -8 - 14 = -22.\n4. Ko'paytma: (-29) * (-22) = 638.",
    desmos_trick: "Pick a test value like a = -1 in Desmos: f(x) = |x|/(-1) - 14. Evaluate f(-15) * f(-8) = (-29) * (-22) = 638!",
    reference_formula: "|k| = -k \\quad (\\text{for } k < 0)"
  },
  {
    id: "q_real_sep2026_08",
    topic_code: "DAT-01",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    difficulty: "Hard",
    prompt: "On a plot of land, 52.0% of the square footage is farmland and the remaining square footage is pasture. There are buildings on exactly 21.5% of the square footage of the farmland, and there are buildings on exactly 14.0% of the square footage of the pasture. If there are buildings on exactly $p\\%$ of the total square footage of the plot of land, what is the value of $p$?",
    options: JSON.stringify(["A. 17.5", "B. 17.9", "C. 18.2", "D. 35.5"]),
    correct_answer: "B",
    explanation_en: "1. Assume the total plot of land is 100 square units.\n2. Farmland = 52 units; Pasture = $100 - 52 = 48$ units.\n3. Buildings on farmland = $0.215 \\times 52 = 11.18$ units.\n4. Buildings on pasture = $0.140 \\times 48 = 6.72$ units.\n5. Total square footage with buildings = $11.18 + 6.72 = 17.90$ units.\n6. As a percent of 100, $p = 17.9\\%$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Jami yerni 100 deb olamiz: ekin maydoni = 52, yaylov = 48.\n2. Ekin maydonidagi binolar: 52 * 0.215 = 11.18.\n3. Yaylovdagi binolar: 48 * 0.14 = 6.72.\n4. Jami binolar: 11.18 + 6.72 = 17.9. Demak p = 17.9.",
    desmos_trick: "Type '0.52 * 21.5 + 0.48 * 14.0' in Desmos to get 17.9 immediately.",
    reference_formula: "P_{\\text{weighted}} = w_1 P_1 + w_2 P_2"
  },
  {
    id: "q_real_sep2026_09",
    topic_code: "ALG-04",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Medium",
    prompt: "Consider the system of inequalities: $y < 24 - 8x$ and $\\frac{y}{8} > 9$. Which inequality represents the $x$-values for all solutions $(x, y)$ that satisfy the given system of inequalities in the $xy$-plane?",
    options: JSON.stringify(["A. x > 3", "B. x < 3", "C. x > -6", "D. x < -6"]),
    correct_answer: "D",
    explanation_en: "1. Multiply the second inequality by 8: $y > 72$.\n2. Combine with the first inequality: $72 < y < 24 - 8x$.\n3. Therefore: $72 < 24 - 8x$.\n4. Subtract 24 from both sides: $48 < -8x$.\n5. Divide by -8 (reverse inequality sign!): $-6 > x \\implies x < -6$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Ikkinchi tengsizlikdan: y > 72.\n2. Birinchi tengsizlikka qo'yamiz: 72 < y < 24 - 8x => 72 < 24 - 8x.\n3. 48 < -8x => manfiy 8 ga bo'lganda ishora o'zgaradi: x < -6. To'g'ri javob D.",
    desmos_trick: "Plot both inequalities in Desmos: the overlap region only exists to the left of x = -6.",
    reference_formula: "a < b \\implies -a > -b"
  },
  {
    id: "q_real_sep2026_10",
    topic_code: "ALG-04",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Hard",
    prompt: "A certain circuit consists of 8 resistors connected in series, where the resistance of each resistor is positive. The total circuit resistance is 130 ohms. The total resistance of 3 of the resistors is 90 ohms. Which inequality best represents all possible values of the resistance $x$, in ohms, of one of the other 5 resistors in this circuit?",
    options: JSON.stringify(["A. 0 < x < 8", "B. 0 < x < 40", "C. 40 < x < 90", "D. 40 < x < 130"]),
    correct_answer: "B",
    explanation_en: "1. Total resistance of the remaining 5 resistors is $130 - 90 = 40$ ohms.\n2. Let the other 5 resistors have resistances $x, r_2, r_3, r_4, r_5$, so $x + r_2 + r_3 + r_4 + r_5 = 40$.\n3. Since all resistances must be strictly positive ($r_i > 0$), $x > 0$.\n4. The maximum possible value for $x$ occurs when the other 4 resistors approach 0, meaning $x < 40$.\n5. Therefore, $0 < x < 40$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Qolgan 5 ta rezistorning umumiy qarshiligi: 130 - 90 = 40 Om.\n2. Barcha qarshiliklar musbat bo'lgani uchun: x > 0.\n3. Bir rezistor maksimal bo'lishi uchun qolgan 4 tasi 0 ga yaqin bo'lishi kerak, demak x < 40.\n4. Javob: 0 < x < 40.",
    desmos_trick: "If 5 positive numbers sum to 40, any single number must be strictly between 0 and 40.",
    reference_formula: "R_{\\text{total}} = \\sum_{i=1}^n R_i"
  },
  {
    id: "q_real_sep2026_11",
    topic_code: "ADV-01",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Medium",
    prompt: "An engineer connects resistors in series with a total resistance of $\\frac{47}{45}$ ohms represented by $\\frac{x}{5} + \\frac{y}{9} = \\frac{47}{45}$. There are $x$ resistors of type A, which each have a resistance of $a$ ohms, and $y$ resistors of type B, which each have a resistance of $b$ ohms. According to this equation, what is the positive difference between the value of $a$ and the value of $b$?",
    options: JSON.stringify(["A. 47", "B. 4", "C. \\frac{47}{45}", "D. \\frac{4}{45}"]),
    correct_answer: "D",
    explanation_en: "1. In series, total resistance is $x \\cdot a + y \\cdot b$.\n2. From the given equation $\\frac{x}{5} + \\frac{y}{9} = \\left(\\frac{1}{5}\\right)x + \\left(\\frac{1}{9}\\right)y = \\frac{47}{45}$, we see $a = \\frac{1}{5}$ and $b = \\frac{1}{9}$.\n3. The positive difference is $|a - b| = \\frac{1}{5} - \\frac{1}{9} = \\frac{9 - 5}{45} = \\frac{4}{45}$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Tenglamadan ko'rinib turibdiki, a = 1/5 va b = 1/9 Om.\n2. Musbat ayirma: 1/5 - 1/9 = 9/45 - 5/45 = 4/45. To'g'ri javob D.",
    desmos_trick: "Type '1/5 - 1/9' into Desmos and toggle fraction button: 4/45.",
    reference_formula: "\\frac{1}{a} - \\frac{1}{b} = \\frac{b - a}{ab}"
  },
  {
    id: "q_real_sep2026_13",
    topic_code: "ALG-02",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Easy",
    prompt: "A moving truck rental company charges $165 for the first hour and $95 for each additional hour, plus the cost of gas used. Which equation represents this situation, where $y$ is the total cost in dollars of renting a truck for $x$ hours, $w$ is the cost in dollars of gas used, and $x \\ge 1$?",
    options: JSON.stringify([
      "A. y = 95(x - 1) + w",
      "B. y = 165 + 95 + w",
      "C. y = 165 + 95x + w",
      "D. y = 165 + 95(x - 1) + w"
    ]),
    correct_answer: "D",
    explanation_en: "1. The first hour is fixed at $165.\n2. The remaining number of hours is $(x - 1)$, charged at $95 per hour: $95(x - 1)$.\n3. Adding gas cost $w$: $y = 165 + 95(x - 1) + w$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Dastlabki 1 soat uchun 165 dollar to'lanadi.\n2. Qolgan (x - 1) soatlar uchun soatiga 95 dollar: 95(x - 1).\n3. Benzin xarajati w qo'shiladi: y = 165 + 95(x - 1) + w.",
    desmos_trick: "Test x = 1: y should equal 165 + w. Only Choice D gives 165 + 95(0) + w = 165 + w!",
    reference_formula: "y = C_{\\text{initial}} + r(x - 1) + C_{\\text{fixed}}"
  },
  {
    id: "q_real_sep2026_14",
    topic_code: "DAT-01",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    difficulty: "Medium",
    prompt: "The population density of Town A is 120 people per square mile, and Town B is 90 people per square mile. Town A has a population of 20,640 people, and Town B has a population of 3,870 people. The area, in square miles, of Town A is $k$ times the area, in square miles, of Town B. What is the value of $k$?",
    options: JSON.stringify(["A. 2", "B. 3", "C. 4", "D. 5"]),
    correct_answer: "C",
    explanation_en: "1. $\\text{Area} = \\frac{\\text{Population}}{\\text{Density}}$.\n2. $\\text{Area}_A = \\frac{20640}{120} = 172\\text{ sq mi}$.\n3. $\\text{Area}_B = \\frac{3870}{90} = 43\\text{ sq mi}$.\n4. Ratio $k = \\frac{\\text{Area}_A}{\\text{Area}_B} = \\frac{172}{43} = 4$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Maydon = Aholi / Zichlik.\n2. A shahar maydoni = 20640 / 120 = 172 kv milya.\n3. B shahar maydoni = 3870 / 90 = 43 kv milya.\n4. k = 172 / 43 = 4.",
    desmos_trick: "Type '(20640 / 120) / (3870 / 90)' in Desmos: output is 4.",
    reference_formula: "\\text{Density} = \\frac{\\text{Population}}{\\text{Area}}"
  },
  {
    id: "q_real_sep2026_15",
    topic_code: "ALG-03",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Medium",
    prompt: "In 2010, a skating team had a total of 51 skaters, each classified as either advanced or intermediate. From 2010 to 2020, the number of advanced skaters on the team increased by 59%, and intermediate skaters increased by 48%. The total number of skaters on the team increased by 53%. Which equation best represents this situation, where $a$ and $b$ represent advanced and intermediate skaters in 2010?",
    options: JSON.stringify([
      "A. 1.48a + 1.59b = 51(1.53)",
      "B. 1.59a + 1.48b = 51(1.53)",
      "C. 1.53a + 0.59b = 51(1.48)",
      "D. 1.59a + 1.53b = 51(1.48)"
    ]),
    correct_answer: "B",
    explanation_en: "1. Advanced skaters in 2020: $a \\times (1 + 0.59) = 1.59a$.\n2. Intermediate skaters in 2020: $b \\times (1 + 0.48) = 1.48b$.\n3. Total team in 2020: $51 \\times (1 + 0.53) = 51(1.53)$.\n4. Equating total skaters: $1.59a + 1.48b = 51(1.53)$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Advanced konkichilar 59% ga oshdi: 1.59a.\n2. Intermediate konkichilar 48% ga oshdi: 1.48b.\n3. Jami jamoa 53% ga oshdi: 51 * 1.53.\n4. Tenglama: 1.59a + 1.48b = 51(1.53). To'g'ri javob B.",
    desmos_trick: "Check coefficients: 59% increase corresponds to 1 + 0.59 = 1.59 on a, 48% on b.",
    reference_formula: "\\text{New} = \\text{Original}(1 + r)"
  },
  {
    id: "q_real_sep2026_16",
    topic_code: "GEO-02",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    difficulty: "Easy",
    prompt: "In the figure, triangle $CAE$ is similar to triangle $CBD$. The measure of angle $CBD$ is $57^\\circ$, and $AE = 25(BD)$. What is the measure of angle $CAE$?",
    options: JSON.stringify(["A. (25 \\cdot 57)^\\circ", "B. (25 + 57)^\\circ", "C. 57^\\circ", "D. 25^\\circ"]),
    correct_answer: "C",
    explanation_en: "1. By definition of similar triangles, corresponding angles are congruent (equal in measure), regardless of the scale factor between sides!\n2. Since $\\triangle CAE \\sim \\triangle CBD$, corresponding angle $\\angle CAE = \\angle CBD = 57^\\circ$.\n3. Do not multiply the angle by the linear scale factor 25! Source: Real September SAT Math Exam.",
    explanation_uz: "1. O'xshash uchburchaklarda mos burchaklar teng bo'ladi! Tomonlarning kattalashish koeffitsienti (25) burchakka aslo ta'sir qilmaydi.\n2. Demak burchak CAE = 57 gradus.",
    desmos_trick: "Similar figures: angles remain identical, only side lengths and areas scale.",
    reference_formula: "\\triangle ABC \\sim \\triangle DEF \\implies \\angle A = \\angle D"
  },
  {
    id: "q_real_sep2026_18",
    topic_code: "ADV-04",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Medium",
    prompt: "Each year from 2005 to 2015, the pheasant population counted per mile in a state decreased by 3.5% of the previous year's value. If there were 6.22 pheasants per mile in 2005, which of the following best approximates the number of pheasants per mile in 2015?",
    options: JSON.stringify([
      "A. 0.965(6.22)^{10}",
      "B. 1.035(6.22)^{10}",
      "C. 6.22(0.035)^{10}",
      "D. 6.22(0.965)^{10}"
    ]),
    correct_answer: "D",
    explanation_en: "1. Annual decay rate $r = 3.5\\% = 0.035$.\n2. Annual multiplier: $1 - r = 1 - 0.035 = 0.965$.\n3. The elapsed time from 2005 to 2015 is $2015 - 2005 = 10$ years.\n4. Exponential decay model: $P(t) = P_0 (1 - r)^t = 6.22(0.965)^{10}$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Har yili 3.5% ga kamayadi, demak ko'paytuvchi: 1 - 0.035 = 0.965.\n2. 2005 dan 2015 gacha 10 yil o'tgan.\n3. Model: 6.22 * (0.965)^10. To'g'ri javob D.",
    desmos_trick: "Identify base: decreasing by 3.5% means base must be 0.965. Initial value 6.22 is in front.",
    reference_formula: "y = a(1 - r)^t"
  },
  {
    id: "q_real_sep2026_21",
    topic_code: "ALG-02",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Medium",
    prompt: "The function $F(x) = \\frac{9}{5}(x - 273.15) + 32$ gives the temperature in degrees Fahrenheit that corresponds to $x$ kelvins. If a temperature increased by 2.10 kelvins, by how much did the temperature increase, in degrees Fahrenheit?",
    options: JSON.stringify(["A. 3.78", "B. 35.78", "C. 487.89", "D. 519.89"]),
    correct_answer: "A",
    explanation_en: "1. In any linear function $F(x) = m x + b$, the change in output is $\\Delta F = m \\cdot \\Delta x$.\n2. Here, the slope is $m = \\frac{9}{5} = 1.8$.\n3. The change in input is $\\Delta x = 2.10$ kelvins.\n4. Therefore: $\\Delta F = 1.8 \\times 2.10 = 3.78^\\circ\\text{F}$.\n5. Do NOT substitute 2.10 for $x$ and evaluate $F(2.10)$ — the question asks for the INCREASE (rate of change)! Source: Real September SAT Math Exam.",
    explanation_uz: "1. Chiziqli funksiyada o'zgarish: Delta F = qiyalik * Delta x.\n2. Qiyalik m = 9/5 = 1.8.\n3. O'zgarish = 1.8 * 2.10 = 3.78 gradus Farengeyt.",
    desmos_trick: "Calculate '1.8 * 2.10' in Desmos: 3.78.",
    reference_formula: "\\Delta y = m \\cdot \\Delta x"
  },
  {
    id: "q_real_sep2026_23",
    topic_code: "GEO-03",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    difficulty: "Hard",
    prompt: "In the $xy$-plane, a circle has center $C(h, k)$. Points $A$ and $B$ lie on the circle. Point $A$ has coordinates $(h + 1, k + \\sqrt{102})$, and $\\angle ACB$ is a right angle ($90^\\circ$). What is the length of chord $AB$?",
    options: JSON.stringify(["A. \\sqrt{206}", "B. 2\\sqrt{102}", "C. 103\\sqrt{2}", "D. 103\\sqrt{3}"]),
    correct_answer: "A",
    explanation_en: "1. Find radius $r = CA$ using the distance formula:\n$r = \\sqrt{(h+1 - h)^2 + (k+\\sqrt{102} - k)^2} = \\sqrt{1^2 + (\\sqrt{102})^2} = \\sqrt{1 + 102} = \\sqrt{103}$.\n2. $\\triangle ACB$ is an isosceles right triangle with legs $CA = CB = r = \\sqrt{103}$.\n3. By the Pythagorean theorem, the hypotenuse is $AB = r\\sqrt{2} = \\sqrt{103} \\times \\sqrt{2} = \\sqrt{206}$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Radiusi r: r = sqrt(1^2 + 102) = sqrt(103).\n2. Uchburchak ACB - to'g'ri burchakli teng yonli uchburchak, chunki CA = CB = r.\n3. Gipotenuza: AB = r * sqrt(2) = sqrt(103 * 2) = sqrt(206).",
    desmos_trick: "Radius = sqrt(1^2 + 102) = sqrt(103). Hypotenuse of 45-45-90 triangle is x*sqrt(2) = sqrt(103)*sqrt(2) = sqrt(206).",
    reference_formula: "c = r\\sqrt{2} \\quad (\\text{for } 90^\\circ \\text{ central angle})"
  },
  {
    id: "q_real_sep2026_27",
    topic_code: "GEO-01",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    difficulty: "Hard",
    prompt: "Right rectangular prism X is similar to right rectangular prism Y. The surface area of prism X is $56\\text{ cm}^2$, and the surface area of prism Y is $896\\text{ cm}^2$. The volume of prism Y is $1,536\\text{ cm}^3$. What is the sum of the volumes, in $\\text{cm}^3$, of prism X and prism Y?",
    options: JSON.stringify(["A. 1560", "B. 1592", "C. 1632", "D. 2432"]),
    correct_answer: "A",
    explanation_en: "1. Area scale factor: $k^2 = \\frac{SA_Y}{SA_X} = \\frac{896}{56} = 16$.\n2. Linear scale factor: $k = \\sqrt{16} = 4$.\n3. Volume scale factor: $k^3 = 4^3 = 64$.\n4. Volume of prism X: $V_X = \\frac{V_Y}{64} = \\frac{1536}{64} = 24\\text{ cm}^3$.\n5. Sum of volumes: $V_X + V_Y = 24 + 1536 = 1560\\text{ cm}^3$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Yuzalar nisbati: 896 / 56 = 16. Demak chiziqli koeffitsient k = sqrt(16) = 4.\n2. Hajmlar nisbati: k^3 = 4^3 = 64.\n3. X prizma hajmi: 1536 / 64 = 24.\n4. Hajmlar yig'indisi: 24 + 1536 = 1560.",
    desmos_trick: "Type '1536 / (896 / 56)^(3/2) + 1536' in Desmos: outputs 1560 immediately!",
    reference_formula: "\\frac{V_2}{V_1} = \\left(\\sqrt{\\frac{A_2}{A_1}}\\right)^3"
  },
  {
    id: "q_real_sep2026_30",
    topic_code: "ALG-02",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Medium",
    prompt: "Each 3.0-ounce serving of cheddar cheese and each 1.2-ounce serving of tuna provides about 1 microgram of vitamin B12. If a total of 3.5 micrograms of vitamin B12 are consumed from eating $x$ ounces of cheese and $y$ ounces of tuna, which equation best represents this situation?",
    options: JSON.stringify([
      "A. 0.33x + 0.33y = 3.5",
      "B. 3.0x + 1.2y = 3.5",
      "C. 1.2x + 3.0y = 3.5",
      "D. 0.33x + 0.83y = 3.5"
    ]),
    correct_answer: "D",
    explanation_en: "1. Cheddar cheese provides 1 microgram per 3.0 oz, which is $\\frac{1}{3.0} \\approx 0.33$ micrograms per ounce.\n2. Tuna provides 1 microgram per 1.2 oz, which is $\\frac{1}{1.2} = \\frac{5}{6} \\approx 0.83$ micrograms per ounce.\n3. Total B12 = $(\\text{rate}_\\text{cheese})x + (\\text{rate}_\\text{tuna})y = 0.33x + 0.83y = 3.5$. Source: Real September SAT Math Exam.",
    explanation_uz: "1. Pishloq: 1 mkg / 3.0 oz = 0.33 mkg har bir unsiya uchun.\n2. Tuna balig'i: 1 mkg / 1.2 oz = 0.83 mkg har bir unsiya uchun.\n3. Jami B12: 0.33x + 0.83y = 3.5. To'g'ri javob D.",
    desmos_trick: "Calculate 1/3 = 0.333 and 1/1.2 = 0.833: coefficients must match unit rates per ounce.",
    reference_formula: "\\text{Rate} = \\frac{\\text{Nutrient}}{\\text{Weight}}"
  },

  // ==========================================
  // REAL QUIZ FOUNDATIONS (EASY TRACK)
  // ==========================================
  {
    id: "q_easy_quiz_01_pace",
    topic_code: "DAT-01",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    difficulty: "Easy",
    prompt: "Aubrey can run at a pace of 6 miles per hour. Running at the same rate, how many miles can she run in 90 minutes?",
    options: JSON.stringify(["A. 4", "B. 6", "C. 8", "D. 9"]),
    correct_answer: "D",
    explanation_en: "1. Convert 90 minutes to hours: $90\\text{ minutes} = \\frac{90}{60} = 1.5\\text{ hours}$.\n2. Distance = Rate × Time: $d = 6\\text{ mph} \\times 1.5\\text{ hours} = 9\\text{ miles}$. Source: SAT Math Practice Quiz.",
    explanation_uz: "1. 90 minutni soatga aylantiramiz: 90 / 60 = 1.5 soat.\n2. Masofa = Tezlik * Vaqt: 6 * 1.5 = 9 mil.",
    desmos_trick: "Type '6 * (90/60)' into Desmos to get 9 immediately.",
    reference_formula: "d = r \\cdot t"
  },
  {
    id: "q_easy_quiz_02_factors",
    topic_code: "ALG-01",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Easy",
    prompt: "Which of the following is a factor of $15 + 45$?",
    options: JSON.stringify(["A. 18", "B. 25", "C. 30", "D. 35"]),
    correct_answer: "C",
    explanation_en: "1. Evaluate $15 + 45 = 60$.\n2. A factor of 60 divides 60 evenly with no remainder.\n3. Testing choices: $60 / 18 = 3.33$, $60 / 25 = 2.4$, $60 / 30 = 2$ (integer!), $60 / 35 = 1.71$.\n4. Therefore, 30 is a factor of 60.",
    explanation_uz: "1. 15 + 45 = 60.\n2. 60 ning bo'luvchilarini tekshiramiz: 60 soni 30 ga qoldiqsiz bo'linadi (60 / 30 = 2).",
    desmos_trick: "Type '60 / 30' to verify it equals integer 2.",
    reference_formula: "\\text{Factor: } a \\mid b \\iff \\frac{b}{a} \\in \\mathbb{Z}"
  },
  {
    id: "q_easy_quiz_03_seq",
    topic_code: "ADV-01",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Easy",
    prompt: "The first term in a sequence is $x$, and each term thereafter is equal to twice the previous term: $x, 2x, 4x, \\dots$. Which of the following is the sum of the first five terms of this sequence?",
    options: JSON.stringify(["A. 10x", "B. 15x", "C. 30x", "D. 31x"]),
    correct_answer: "D",
    explanation_en: "1. Write out the first five terms: $x, 2x, 4x, 8x, 16x$.\n2. Sum them together: $x + 2x + 4x + 8x + 16x = (1 + 2 + 4 + 8 + 16)x = 31x$.",
    explanation_uz: "1. Dastlabki 5 ta hadni yozamiz: x, 2x, 4x, 8x, 16x.\n2. Ularni qo'shamiz: 1 + 2 + 4 + 8 + 16 = 31x.",
    desmos_trick: "Test with x = 1: 1 + 2 + 4 + 8 + 16 = 31. Choice D gives 31(1) = 31!",
    reference_formula: "S_n = \\sum_{i=1}^n a_i"
  },
  {
    id: "q_easy_quiz_04_inverse",
    topic_code: "ALG-01",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Easy",
    prompt: "A number is divided by 4. The result is then divided by 3, for a final result of 2. What was the original number?",
    options: JSON.stringify(["A. 12", "B. 18", "C. 24", "D. 36"]),
    correct_answer: "C",
    explanation_en: "1. Work backwards using inverse operations.\n2. Before the last division by 3, the number was $2 \\times 3 = 6$.\n3. Before the division by 4, the original number was $6 \\times 4 = 24$.\nAlgebraic check: $\\frac{24/4}{3} = \\frac{6}{3} = 2$.",
    explanation_uz: "1. Teskari amallar bilan orqadan boshlaymiz.\n2. 3 ga bo'linishdan oldin: 2 * 3 = 6 bo'lgan.\n3. 4 ga bo'linishdan oldin: 6 * 4 = 24 bo'lgan.",
    desmos_trick: "Type '(x / 4) / 3 = 2' in Desmos to read x = 24.",
    reference_formula: "\\frac{x/a}{b} = c \\implies x = a \\cdot b \\cdot c"
  },
  {
    id: "q_easy_quiz_05_cabbages",
    topic_code: "DAT-01",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    difficulty: "Easy",
    prompt: "A farmer can pick 12 cabbages in 1 hour. Working at the same rate, how long in hours would it take two farmers to pick 48 cabbages?",
    options: JSON.stringify(["A. 1", "B. 2", "C. 4", "D. 6"]),
    correct_answer: "B",
    explanation_en: "1. One farmer's rate = 12 cabbages/hour.\n2. Two farmers working together produce $12 \\times 2 = 24$ cabbages/hour.\n3. Time required: $\\frac{48\\text{ cabbages}}{24\\text{ cabbages/hour}} = 2\\text{ hours}$.",
    explanation_uz: "1. 1 ta dehqon 1 soatda 12 ta karam teradi.\n2. 2 ta dehqon 1 soatda 24 ta teradi.\n3. 48 ta karam uchun: 48 / 24 = 2 soat.",
    desmos_trick: "Calculate 48 / (12 * 2) = 2.",
    reference_formula: "t = \\frac{W}{R_{\\text{combined}}}"
  },
  {
    id: "q_easy_quiz_07_alg_scale",
    topic_code: "ALG-01",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Easy",
    prompt: "If $x + 1 = 23$, what is the value of $3x + 3$?",
    options: JSON.stringify(["A. 22", "B. 46", "C. 66", "D. 69"]),
    correct_answer: "D",
    explanation_en: "1. Notice structure: $3x + 3 = 3(x + 1)$.\n2. Substitute $(x + 1) = 23$ directly: $3(23) = 69$.\n3. You do not even need to solve for $x$ first!",
    explanation_uz: "1. Ifodani ko'paytuvchiga ajratamiz: 3x + 3 = 3(x + 1).\n2. x + 1 o'rniga to'g'ridan-to'g'ri 23 ni qo'yamiz: 3 * 23 = 69.",
    desmos_trick: "Type 'x + 1 = 23', Desmos gives x = 22. In Line 2, type '3(22) + 3' = 69.",
    reference_formula: "k(ax + b) = k \\cdot C"
  },
  {
    id: "q_easy_quiz_08_radical",
    topic_code: "ADV-02",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Easy",
    prompt: "If $\\sqrt{2x + 4} = \\sqrt{36}$, what is the value of $x$?",
    options: JSON.stringify(["A. 6", "B. 8", "C. 12", "D. 16"]),
    correct_answer: "D",
    explanation_en: "1. Square both sides: $2x + 4 = 36$.\n2. Subtract 4: $2x = 32$.\n3. Divide by 2: $x = 16$.",
    explanation_uz: "1. Ikkala tomonni kvadratga ko'taramiz: 2x + 4 = 36.\n2. 2x = 32 => x = 16.",
    desmos_trick: "Type 'sqrt(2x + 4) = sqrt(36)' into Desmos: vertical line appears at x = 16.",
    reference_formula: "\\sqrt{a} = \\sqrt{b} \\implies a = b"
  },
  {
    id: "q_easy_quiz_09_system",
    topic_code: "ALG-03",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Easy",
    prompt: "If $2a + 3b = 12$ and $3b - 4 = 2$, then what is the value of $a$?",
    options: JSON.stringify(["A. 2", "B. 3", "C. 4", "D. 6"]),
    correct_answer: "B",
    explanation_en: "1. From the second equation: $3b = 2 + 4 = 6$.\n2. Substitute $3b = 6$ into the first equation: $2a + 6 = 12$.\n3. Subtract 6: $2a = 6 \\implies a = 3$.",
    explanation_uz: "1. Ikkinchi tenglamadan: 3b = 6.\n2. Birinchi tenglamaga qo'yamiz: 2a + 6 = 12 => 2a = 6 => a = 3.",
    desmos_trick: "Substitute 3b = 6 in Desmos line 1: 2a + 6 = 12, gives a = 3.",
    reference_formula: "\\text{Direct Substitution}"
  },

  // ==========================================
  // REAL QUIZ MEDIUM (MEDIUM TRACK)
  // ==========================================
  {
    id: "q_med_quiz_01_divisible",
    topic_code: "DAT-01",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    difficulty: "Medium",
    prompt: "How many positive integers less than 100 are divisible by 3, 5, and 7 simultaneously?",
    options: JSON.stringify(["A. 0", "B. 1", "C. 2", "D. 3"]),
    correct_answer: "A",
    explanation_en: "1. Since 3, 5, and 7 are all prime numbers, their least common multiple (LCM) is $3 \\times 5 \\times 7 = 105$.\n2. Any integer divisible by 3, 5, and 7 must be a multiple of 105.\n3. The smallest positive multiple of 105 is 105, which is already greater than 100.\n4. Therefore, there are 0 such integers less than 100.",
    explanation_uz: "1. 3, 5 va 7 tub sonlar bo'lgani uchun, ularning eng kichik umumiy karralisi (EKUK): 3 * 5 * 7 = 105 bo'ladi.\n2. 100 dan kichik musbat butun sonlar ichida 105 ga bo'linadigani yo'q (0 ta).",
    desmos_trick: "Type 'lcm(3, lcm(5, 7))' in Desmos: outputs 105. Since 105 > 100, answer is 0.",
    reference_formula: "\\text{LCM}(a, b, c) = a \\cdot b \\cdot c \\quad (\\text{for coprime})"
  },
  {
    id: "q_med_quiz_02_sq_sum",
    topic_code: "ADV-02",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Medium",
    prompt: "Twice an integer is added to the square of the integer. Next, the result is increased by 1. Which of the following could be the value of the final sum?",
    options: JSON.stringify(["A. 36", "B. 41", "C. 45", "D. 50"]),
    correct_answer: "A",
    explanation_en: "1. Let the integer be $n$.\n2. 'Twice an integer added to the square of the integer': $n^2 + 2n$.\n3. 'Increased by 1': $n^2 + 2n + 1$.\n4. Notice the perfect square identity: $n^2 + 2n + 1 = (n + 1)^2$.\n5. Therefore, the final sum MUST be a perfect square integer!\n6. Among the choices (36, 41, 45, 50), only 36 is a perfect square ($6^2$, where $n = 5$).",
    explanation_uz: "1. Butun son n bo'lsin: n^2 + 2n + 1.\n2. Bu to'la kvadrat formulasidir: (n + 1)^2.\n3. Demak, natija albatta biror butun sonning kvadrati bo'lishi shart! Variantlar ichida faqat 36 to'la kvadratdir (6^2).",
    desmos_trick: "Test n = 5: 5^2 + 2(5) + 1 = 25 + 10 + 1 = 36!",
    reference_formula: "(n + 1)^2 = n^2 + 2n + 1"
  },
  {
    id: "q_med_quiz_03_min_func",
    topic_code: "ADV-03",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Medium",
    prompt: "The function $f$ is defined by $f(x) = (x + 3)(x - 3)$. What is the least possible value of $f(x)$ for all real numbers $x$?",
    options: JSON.stringify(["A. -9", "B. -6", "C. 0", "D. 9"]),
    correct_answer: "A",
    explanation_en: "1. Expand $f(x) = (x + 3)(x - 3) = x^2 - 9$ (difference of squares).\n2. For all real numbers $x$, $x^2 \\ge 0$.\n3. Therefore, the least possible value of $x^2$ is 0, which occurs at $x = 0$.\n4. Substituting $x = 0$ yields $f(0) = 0 - 9 = -9$.",
    explanation_uz: "1. Qavslarni ochamiz: f(x) = x^2 - 9.\n2. Har qanday haqiqiy son uchun x^2 >= 0 bo'ladi.\n3. Eng kichik qiymat x = 0 da erishiladi: 0 - 9 = -9.",
    desmos_trick: "Type 'y = (x+3)(x-3)' into Desmos. Tap the lowest point on the parabola: (0, -9). Minimum is -9!",
    reference_formula: "x^2 \\ge 0 \\implies x^2 - c \\ge -c"
  },
  {
    id: "q_med_quiz_04_exponents",
    topic_code: "ADV-01",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Medium",
    prompt: "If $4^3 + 4^3 + 4^3 + 4^3 = 2^x$, what is the value of $x$?",
    options: JSON.stringify(["A. 6", "B. 7", "C. 8", "D. 12"]),
    correct_answer: "C",
    explanation_en: "1. Notice there are four identical terms of $4^3$.\n2. Combine: $4^3 + 4^3 + 4^3 + 4^3 = 4 \\times (4^3) = 4^1 \\times 4^3 = 4^4$.\n3. Express with base 2: since $4 = 2^2$, $4^4 = (2^2)^4 = 2^{2 \\times 4} = 2^8$.\n4. Since $2^8 = 2^x$, $x = 8$.",
    explanation_uz: "1. Chap tomonda 4 ta bir xil 4^3 bor: 4 * (4^3) = 4^4.\n2. 4 ni 2 ning asosi sifatida yozamiz: (2^2)^4 = 2^8.\n3. 2^8 = 2^x bo'lgani uchun, x = 8 bo'ladi.",
    desmos_trick: "Type '4^3 + 4^3 + 4^3 + 4^3' in Line 1 (outputs 256). Type '2^8' in Line 2 (outputs 256). Match!",
    reference_formula: "k \\cdot a^n = a^{n+1} \\quad (\\text{if } k = a)"
  },
  {
    id: "q_med_quiz_08_unit_conv",
    topic_code: "DAT-01",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    difficulty: "Medium",
    prompt: "Amy can walk 3,600 feet in 10 minutes. Walking at the same rate, how many yards can Amy walk in 10 seconds? (1 yard = 3 feet)",
    options: JSON.stringify(["A. 2", "B. 10", "C. 20", "D. 60"]),
    correct_answer: "C",
    explanation_en: "1. Convert 3,600 feet to yards: $3,600 / 3 = 1,200\\text{ yards}$.\n2. So Amy walks 1,200 yards in 10 minutes ($600\\text{ seconds}$).\n3. Find rate in yards per second: $\\frac{1,200\\text{ yards}}{600\\text{ seconds}} = 2\\text{ yards/second}$.\n4. In 10 seconds, she walks: $2\\text{ yards/second} \\times 10\\text{ seconds} = 20\\text{ yards}$.",
    explanation_uz: "1. 3,600 futni yardga aylantiramiz: 3,600 / 3 = 1,200 yard.\n2. 10 minut = 600 sekund. Demak 600 sekundda 1,200 yard yuradi.\n3. 1 sekundda: 1,200 / 600 = 2 yard.\n4. 10 sekundda: 2 * 10 = 20 yard.",
    desmos_trick: "Calculate '(3600 / 3) / (10 * 60) * 10' in Desmos: 20.",
    reference_formula: "d = r \\cdot t, \\quad 1\\text{ yd} = 3\\text{ ft}"
  }
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log(`🚀 Seeding ${newQuestionsFromMaterials.length} New Real Material Questions into vespera.questions...`);
    let count = 0;
    for (const q of newQuestionsFromMaterials) {
      await client.query(
        `INSERT INTO vespera.questions (
          id, topic_code, section, domain, difficulty, prompt, passage,
          options, correct_answer, explanation_uz, explanation_en,
          desmos_trick, reference_formula
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (id) DO UPDATE SET
          topic_code = EXCLUDED.topic_code,
          section = EXCLUDED.section,
          domain = EXCLUDED.domain,
          difficulty = EXCLUDED.difficulty,
          prompt = EXCLUDED.prompt,
          passage = EXCLUDED.passage,
          options = EXCLUDED.options,
          correct_answer = EXCLUDED.correct_answer,
          explanation_uz = EXCLUDED.explanation_uz,
          explanation_en = EXCLUDED.explanation_en,
          desmos_trick = EXCLUDED.desmos_trick,
          reference_formula = EXCLUDED.reference_formula;`,
        [
          q.id,
          q.topic_code,
          q.section,
          q.domain,
          q.difficulty,
          q.prompt,
          null,
          q.options,
          q.correct_answer,
          q.explanation_uz,
          q.explanation_en,
          q.desmos_trick,
          q.reference_formula
        ]
      );
      count++;
    }
    console.log(`✅ Successfully seeded ${count} questions into vespera.questions!`);
  } finally {
    client.release();
    pool.end();
  }
}

seed().catch(console.error);
