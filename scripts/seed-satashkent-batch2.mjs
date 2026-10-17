import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://kaizo:2009@localhost:5432/vespera",
});

const batch2Questions = [
  {
    id: "q_satashkent_math_hard_07",
    section: "MATH",
    domain: "Algebra",
    topic_code: "ALG-02",
    difficulty: "Hard",
    prompt: "In the $xy$-plane, line $k$ has a slope of $\\frac{n}{3}$, where $n$ is a positive constant. Line $p$ is perpendicular to line $k$ and passes through the points $(0, 2)$ and $(6, -1)$. What is the value of $n$?",
    options: JSON.stringify([
      "A. 4",
      "B. 5",
      "C. 6",
      "D. 8"
    ]),
    correct_answer: "C",
    explanation_en: "The slope of line $p$ through $(0, 2)$ and $(6, -1)$ is $m_p = \\frac{-1 - 2}{6 - 0} = -\\frac{3}{6} = -\\frac{1}{2}$. Since line $k$ is perpendicular to line $p$, its slope is the negative reciprocal: $m_k = -\\frac{1}{-1/2} = 2$. Given that $m_k = \\frac{n}{3}$, we have $\\frac{n}{3} = 2 \\implies n = 6$. Source: SATashkent Math Hard Book (Page 26, Q26).",
    explanation_uz: "p to'g'ri chiziqning burchak koeffitsienti: m_p = (-1 - 2)/(6 - 0) = -3/6 = -1/2. k to'g'ri chiziq unga perpendikulyar bo'lgani uchun uning burchak koeffitsienti qarama-qarshi teskari: m_k = 2 bo'ladi. m_k = n/3 berilganligi sababli, n/3 = 2 => n = 6. To'g'ri javob C. Manba: SATashkent Math Hard Book (26-bet).",
    desmos_trick: "Calculate slope of p: (-1 - 2)/(6 - 0) = -0.5. Negative reciprocal is 2. Solve n/3 = 2 in Desmos -> n = 6.",
    desmos_latex: "m_p = \\frac{-1 - 2}{6 - 0}",
    reference_formula: "m_1 \\cdot m_2 = -1"
  },
  {
    id: "q_satashkent_math_hard_08",
    section: "MATH",
    domain: "Advanced Math",
    topic_code: "ADV-01",
    difficulty: "Hard",
    prompt: "Which of the following equations displays the maximum value of $f(x) = -2x^2 + 12x - 10$ as a constant or coefficient?",
    options: JSON.stringify([
      "A. f(x) = -2(x - 3)^2 + 8",
      "B. f(x) = -2(x - 1)(x - 5)",
      "C. f(x) = -2x^2 + 12x - 10",
      "D. f(x) = -(2x - 6)^2 + 8"
    ]),
    correct_answer: "A",
    explanation_en: "To display the maximum or minimum value of a quadratic function as a constant or coefficient, the function must be written in vertex form: $f(x) = a(x - h)^2 + k$, where $(h, k)$ is the vertex. Completing the square for $f(x) = -2(x^2 - 6x) - 10 = -2(x - 3)^2 + 18 - 10 = -2(x - 3)^2 + 8$. The maximum value $k = 8$ is explicitly visible in Choice A. Source: SATashkent Math Hard Book (Page 24, Q24).",
    explanation_uz: "Kvadrat funksiyaning maksimum yoki minimum qiymatini konstanta sifatida ko'rsatish uchun u cho'qqi (vertex) ko'rinishida yozilishi shart: f(x) = a(x - h)^2 + k. Qavsni to'ldirsak: f(x) = -2(x - 3)^2 + 8 bo'ladi va maksimum qiymat 8 aynan ko'rinadi. Shuning uchun to'g'ri javob A. Manba: SATashkent Math Hard Book (24-bet).",
    desmos_trick: "Graph all 4 choices in Desmos. They all produce the same parabola with vertex (3, 8), but only Choice A explicitly displays 8 as an isolated constant!",
    desmos_latex: "f(x) = -2(x - 3)^2 + 8",
    reference_formula: "f(x) = a(x - h)^2 + k"
  },
  {
    id: "q_satashkent_math_hard_09",
    section: "MATH",
    domain: "Advanced Math",
    topic_code: "ADV-03",
    difficulty: "Hard",
    prompt: "The function $f$ is defined by $f(x) = 140(1.08)^x$. The function $g$ is defined by $g(x) = f(x - 3)$. Which of the following equivalent forms of $g(x)$ displays the value of $g(0)$ as a constant or coefficient?",
    options: JSON.stringify([
      "A. g(x) = [140 / (1.08)^3](1.08)^x",
      "B. g(x) = 140(1.08)^(x - 3)",
      "C. g(x) = 140(1.08)^x - 3",
      "D. g(x) = 140((1.08)^x - 3)"
    ]),
    correct_answer: "A",
    explanation_en: "We are given $g(x) = f(x - 3) = 140(1.08)^{x - 3}$. Expanding using exponent properties: $140(1.08)^{x - 3} = 140(1.08)^{-3}(1.08)^x = \\frac{140}{(1.08)^3}(1.08)^x$. When $x = 0$, $g(0) = \\frac{140}{(1.08)^3}$. In Choice A, this exact value $\\frac{140}{(1.08)^3}$ is displayed directly as the leading coefficient. Source: SATashkent Math Hard Book (Page 23, Q23).",
    explanation_uz: "g(x) = f(x - 3) = 140(1.08)^(x - 3). Daraja xossasidan foydalansak: 140(1.08)^(-3) * (1.08)^x = [140 / (1.08)^3] * (1.08)^x. x = 0 bo'lganda g(0) = 140 / (1.08)^3 bo'ladi va bu qiymat aynan A javobda koeffitsient sifatida ko'rsatilgan. To'g'ri javob A. Manba: SATashkent Math Hard Book (23-bet).",
    desmos_trick: "Calculate g(0) = 140*(1.08)^(-3) ≈ 111.137 in Desmos. The coefficient in Choice A is 140 / 1.08^3 = 111.137!",
    desmos_latex: "g(x) = \\frac{140}{1.08^3}(1.08)^x",
    reference_formula: "a^{m-n} = \\frac{a^m}{a^n}"
  },
  {
    id: "q_satashkent_math_hard_10",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    topic_code: "DAT-01",
    difficulty: "Hard",
    prompt: "A high-speed commuter train travels at a constant speed of $v$ miles per hour. If the train covers $d$ miles in $m$ minutes, which of the following represents $v$ in terms of $d$ and $m$?",
    options: JSON.stringify([
      "A. v = 60d / m",
      "B. v = d / (60m)",
      "C. v = m / (60d)",
      "D. v = 60m / d"
    ]),
    correct_answer: "A",
    explanation_en: "Speed is defined as distance divided by time: $v = \\frac{\\text{distance}}{\\text{time in hours}}$. The time given is $m$ minutes, which equals $\\frac{m}{60}$ hours. Therefore, $v = \\frac{d}{\\frac{m}{60}} = \\frac{60d}{m}$. Choice A is correct. Source: SATashkent Math Hard Book (Page 28, Q28).",
    explanation_uz: "Tezlik v = masofa / soatdagi vaqt. m minut = m / 60 soat. Shuning uchun v = d / (m / 60) = 60d / m. To'g'ri javob A. Manba: SATashkent Math Hard Book (28-bet).",
    desmos_trick: "Test with easy numbers: let distance d = 60 miles, time m = 60 minutes (1 hour). Speed must be 60 mph. Plug into choices: Choice A gives 60(60)/60 = 60. Choice B gives 60/3600 = 1/60. Match is A!",
    desmos_latex: "v = \\frac{60d}{m}",
    reference_formula: "v = \\frac{d}{t}"
  },
  {
    id: "q_satashkent_math_hard_11",
    section: "MATH",
    domain: "Advanced Math",
    topic_code: "ADV-02",
    difficulty: "Hard",
    prompt: "The polynomial $p(x)$ is divided by $x - 4$. If the quotient is $2x^2 + 3x - 1$ and the remainder is $7$, which of the following is equal to $p(x)$?",
    options: JSON.stringify([
      "A. 2x^3 - 5x^2 - 13x + 11",
      "B. 2x^3 - 5x^2 - 13x + 3",
      "C. 2x^3 + 11x^2 + 11x - 7",
      "D. 2x^3 - 5x^2 - x + 7"
    ]),
    correct_answer: "A",
    explanation_en: "By the polynomial division algorithm: $p(x) = (\\text{divisor})(\\text{quotient}) + \\text{remainder} = (x - 4)(2x^2 + 3x - 1) + 7$. Expanding: $x(2x^2 + 3x - 1) - 4(2x^2 + 3x - 1) + 7 = 2x^3 + 3x^2 - x - 8x^2 - 12x + 4 + 7 = 2x^3 - 5x^2 - 13x + 11$. Therefore, Choice A is correct. Source: SATashkent Math Hard Book (Page 31, Q31).",
    explanation_uz: "Ko'phadni bo'lish teoremasi: p(x) = bo'luvchi * bo'linma + qoldiq = (x - 4)(2x^2 + 3x - 1) + 7. Qavslarni ochsak: 2x^3 + 3x^2 - x - 8x^2 - 12x + 4 + 7 = 2x^3 - 5x^2 - 13x + 11. To'g'ri javob A. Manba: SATashkent Math Hard Book (31-bet).",
    desmos_trick: "By Remainder Theorem, p(4) must equal 7! Test x = 4 in Choice A: 2(64) - 5(16) - 13(4) + 11 = 128 - 80 - 52 + 11 = 7. Instant 5-second check!",
    desmos_latex: "p(4) = 7",
    reference_formula: "p(x) = d(x) \\cdot q(x) + r"
  },
  {
    id: "q_satashkent_math_hard_12",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    topic_code: "GEO-03",
    difficulty: "Hard",
    prompt: "In a right triangle, $\\sin(3x + 14)^\\circ = \\cos(2x + 6)^\\circ$, where the angle measures are in degrees and acute. What is the value of $x$?",
    options: JSON.stringify([
      "A. 14",
      "B. 16",
      "C. 18",
      "D. 24"
    ]),
    correct_answer: "A",
    explanation_en: "By the complementary angle trigonometric identity, $\\sin(A) = \\cos(B) \\iff A + B = 90^\\circ$ for acute angles. Setting the sum of the angles equal to $90^\\circ$: $(3x + 14) + (2x + 6) = 90 \\implies 5x + 20 = 90 \\implies 5x = 70 \\implies x = 14$. Choice A is correct. Source: SATashkent Trigonometric Identities Guide.",
    explanation_uz: "To'ldiruvchi burchaklar uchun sin(A) = cos(B) <=> A + B = 90 gradus. Demak: (3x + 14) + (2x + 6) = 90 => 5x + 20 = 90 => 5x = 70 => x = 14. To'g'ri javob A. Manba: SATashkent Trigonometric Identities Guide.",
    desmos_trick: "Type 3x + 14 + 2x + 6 = 90 into Desmos in degree mode. Desmos displays a vertical line at x = 14!",
    desmos_latex: "\\sin(A) = \\cos(90^\\circ - A)",
    reference_formula: "A + B = 90^\\circ \\iff \\sin(A) = \\cos(B)"
  },
  {
    id: "q_satashkent_math_hard_13",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    topic_code: "GEO-04",
    difficulty: "Hard",
    prompt: "In the $xy$-plane, the circle defined by $x^2 + y^2 - 10x + 6y + 9 = 0$ is translated $3$ units to the right and $4$ units down. What are the coordinates of the center of the translated circle?",
    options: JSON.stringify([
      "A. (8, -7)",
      "B. (2, 1)",
      "C. (8, -1)",
      "D. (-2, -7)"
    ]),
    correct_answer: "A",
    explanation_en: "Complete the square to find the original center: $(x^2 - 10x + 25) + (y^2 + 6y + 9) = -9 + 25 + 9 \\implies (x - 5)^2 + (y + 3)^2 = 25$. The original center is $(h, k) = (5, -3)$. Translating $3$ units to the right increases the $x$-coordinate: $5 + 3 = 8$. Translating $4$ units down decreases the $y$-coordinate: $-3 - 4 = -7$. The translated center is $(8, -7)$. Choice A is correct. Source: SAT Math Cheat Sheet (Page 5).",
    explanation_uz: "To'liq kvadratga ajratamiz: (x - 5)^2 + (y + 3)^2 = 25. Dastlabki aylana markazi (5, -3). 3 birlik o'ngga surilsa x: 5 + 3 = 8 bo'ladi. 4 birlik pastga surilsa y: -3 - 4 = -7 bo'ladi. Yangi markaz (8, -7). To'g'ri javob A. Manba: SAT Math Cheat Sheet (5-bet).",
    desmos_trick: "Type x^2 + y^2 - 10x + 6y + 9 = 0 directly into Desmos. Click the center to see (5, -3). Add 3 to x and subtract 4 from y -> (8, -7). Done in 8 seconds!",
    desmos_latex: "(x - h)^2 + (y - k)^2 = r^2",
    reference_formula: "(x - h)^2 + (y - k)^2 = r^2"
  },
  {
    id: "q_satashkent_math_hard_14",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    topic_code: "DAT-03",
    difficulty: "Hard",
    prompt: "A polling organization surveys a random sample of $1,600$ registered voters and reports a margin of error of $2.4\\%$ at a $95\\%$ confidence level. If the organization wishes to cut the margin of error in half to $1.2\\%$ at the same confidence level, approximately what sample size would be required?",
    options: JSON.stringify([
      "A. 3,200 voters",
      "B. 4,800 voters",
      "C. 6,400 voters",
      "D. 8,000 voters"
    ]),
    correct_answer: "C",
    explanation_en: "The margin of error for a sample proportion is inversely proportional to the square root of the sample size: $MOE \\propto \\frac{1}{\\sqrt{n}}$. To decrease the margin of error by a factor of $2$ (cutting in half), the denominator $\\sqrt{n}$ must increase by a factor of $2$, meaning the sample size $n$ must increase by a factor of $2^2 = 4$. Therefore, required sample size = $1,600 \\times 4 = 6,400$. Choice C is correct. Source: SAT Math Problem Solving and Data Analysis Revision file (Page 84).",
    explanation_uz: "Xatolik chegarasi (margin of error) tanlanma hajmining kvadrat ildiziga teskari proporsional: MOE ~ 1/sqrt(n). Xatolikni 2 barobar kamaytirish uchun, tanlanma hajmi 2^2 = 4 barobarga oshishi kerak: 1600 * 4 = 6400. To'g'ri javob C. Manba: SAT Math Problem Solving Revision (84-bet).",
    desmos_trick: "Rule of thumb: To halve the margin of error, multiply sample size by 4: 1600 * 4 = 6400.",
    desmos_latex: "MOE = z^* \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}",
    reference_formula: "MOE \\propto \\frac{1}{\\sqrt{n}}"
  },
  {
    id: "q_satashkent_writing_11",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-BOU",
    difficulty: "Hard",
    prompt: "In the late 1960s, marine biologist Sylvia Earle led the first all-female team of aquanauts during the Tektite II ______ living for two weeks in an underwater habitat fifty feet below the surface of Great Lameshur Bay.",
    options: JSON.stringify([
      "A. project;",
      "B. project,",
      "C. project:",
      "D. project"
    ]),
    correct_answer: "B",
    explanation_en: "The clause 'living for two weeks in an underwater habitat...' is a nonessential participial modifier describing the mission. It must be separated from the independent clause with a comma. A semicolon (Choice A) is incorrect because the following clause lacks a finite verb and subject. Choice C (colon) is incorrect because what follows does not illustrate or explain 'project' as an appositive noun phrase. Choice B is correct. Source: SAToplam Writing Book (Page 114, Q114).",
    explanation_uz: "'living for two weeks...' iborasi ergashgan sifatdoshli aniqlovchi bo'lib, mustaqil gapdan vergul bilan ajratilishi shart. Nuqtali vergul (A) xato, chunki undan keyin mustaqil gap kelmagan. To'g'ri javob B. Manba: SAToplam Writing (114-bet).",
    desmos_trick: "Gramilliy Rule: Semicolons require an Independent Clause on BOTH sides [IC ; IC]. 'Living for two weeks...' has no subject + finite verb, so semicolon is instantly eliminated!",
    desmos_latex: "\\text{[IC] , [participial modifier]}",
    reference_formula: "\\text{Clause Boundary Invariant}"
  },
  {
    id: "q_satashkent_writing_12",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-AGR",
    difficulty: "Hard",
    prompt: "Recent analysis of ancient sediment cores collected from Siberian permafrost ______ that microbial communities survived in dormant states for hundreds of thousands of years.",
    options: JSON.stringify([
      "A. indicates",
      "B. indicate",
      "C. are indicating",
      "D. have indicated"
    ]),
    correct_answer: "A",
    explanation_en: "Using Gramilliy's signature '3x1 Elimination Tactic': Identify the grammatical subject. The subject is 'Recent analysis' (singular noun). The prepositional modifier 'of ancient sediment cores collected from Siberian permafrost' is intervening material and does not affect agreement. Notice that Choices B ('indicate'), C ('are indicating'), and D ('have indicated') are all plural verbs. Choice A ('indicates') is the singular outlier, matching the singular subject. Choice A is correct. Source: Gramilliy (Page 34).",
    explanation_uz: "Gramilliy 3x1 qoidasi: Gapning egasi 'Recent analysis' (birlikda). Qolgan so'zlar oraliq to'ldiruvchi. Javoblarga qarasak: B (indicate), C (are indicating) va D (have indicated) - barchasi ko'plikda (3 ta ko'plik). Yagona birlikdagi javob - A (indicates). Shuning uchun to'g'ri javob A. Manba: Gramilliy (34-bet).",
    desmos_trick: "Gramilliy 3x1 Rule: If 3 options are plural verbs and 1 option is a singular verb, the singular outlier is 100% correct!",
    desmos_latex: "\\text{Subject (Singular)} \\implies \\text{Verb (Singular)}",
    reference_formula: "\\text{Subject-Verb Invariant}"
  },
  {
    id: "q_satashkent_writing_13",
    section: "READING_WRITING",
    domain: "Expression of Ideas",
    topic_code: "ENG-TRA",
    difficulty: "Hard",
    prompt: "High-entropy alloys combine five or more metallic elements in roughly equal atomic proportions, conferring exceptional resistance to thermal degradation and mechanical wear. ______, developing scalable synthesis techniques remains economically challenging for aerospace manufacturers.",
    options: JSON.stringify([
      "A. Specifically,",
      "B. However,",
      "C. Consequently,",
      "D. Furthermore,"
    ]),
    correct_answer: "B",
    explanation_en: "The first sentence highlights the remarkable engineering advantages of high-entropy alloys (positive qualities). The second sentence introduces a severe economic and manufacturing obstacle (negative constraint). This shift represents a contrast, making 'However,' the logically correct transition. Choices A, C, and D fail to convey contrast. Source: SAToplam Writing Book (Page 210) & English Elite Book.",
    explanation_uz: "Birinchi gap qotishmalarning ulkan afzalliklarini ta'kidlaydi (ijobiy). Ikkinchi gap esa ishlab chiqarishdagi iqtisodiy qiyinchiliklarni bildiradi (qarama-qarshilik). Zidlovchi munosabatni faqat 'However,' to'g'ri bog'laydi. To'g'ri javob B. Manba: SAToplam Writing (210-bet).",
    desmos_trick: "Sentence 1 is positive (+). Sentence 2 is negative (-). Contrast indicator needed -> However.",
    desmos_latex: "\\text{Advantage (+)} \\xrightarrow{\\text{However}} \\text{Limitation (-)}",
    reference_formula: "\\text{Transition Logic Invariant}"
  },
  {
    id: "q_satashkent_writing_14",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    topic_code: "ENG-WIC",
    difficulty: "Hard",
    prompt: "In her lecture on renewable infrastructure, the civil engineer argued that intermittent renewable power sources cannot completely replace base-load coal generators unless municipal grids invest in ______ battery storage facilities.",
    options: JSON.stringify([
      "A. obsolete",
      "B. prolific",
      "C. substantial",
      "D. capricious"
    ]),
    correct_answer: "C",
    explanation_en: "The sentence requires an adjective describing large, sufficient battery facilities capable of meeting the heavy demands of an entire municipal grid. 'Substantial' means large in size, value, or importance. 'Obsolete' (outdated) contradicts progress; 'prolific' applies to creative output; 'capricious' (unpredictable) contradicts grid reliability. Choice C is correct. Source: Vocabook 3.0 (Page 48).",
    explanation_uz: "Shahar elektr tarmog'ini ta'minlash uchun batareya omborlari katta va yetarli hajmda bo'lishi kerak. 'Substantial' so'zi katta hajm va ahamiyatga ega degan ma'noni beradi. To'g'ri javob C. Manba: Vocabook 3.0 (48-bet).",
    desmos_trick: "Context clue: 'completely replace base-load coal generators' requires large-scale storage -> Substantial.",
    desmos_latex: "\\text{Context: Large-scale municipal capacity} \\implies \\text{Substantial}",
    reference_formula: "\\text{Words in Context Precision}"
  },
  {
    id: "q_satashkent_writing_15",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-MOD",
    difficulty: "Hard",
    prompt: "Having meticulously restored the fifteenth-century fresco using infrared spectroscopy and microscopic pigmentation swabs, ______",
    options: JSON.stringify([
      "A. the painting was finally unveiled by museum conservators to an eager international audience.",
      "B. museum conservators finally unveiled the painting to an eager international audience.",
      "C. the unveiling of the painting was carried out by museum conservators before an eager international audience.",
      "D. eager international visitors watched museum conservators unveil the painting."
    ]),
    correct_answer: "B",
    explanation_en: "The introductory modifier 'Having meticulously restored the fifteenth-century fresco...' is an action that can logically be performed only by the conservators, not by the painting (Choice A) or the unveiling (Choice C). Choice D places 'visitors' after the comma, implying visitors restored the fresco. Choice B correctly places 'museum conservators' immediately following the comma. Choice B is correct. Source: Gramilliy (Page 42, Dangling Modifiers).",
    explanation_uz: "Ergashgan sifatdosh 'Having meticulously restored...' kim tomonidan bajarilgan bo'lsa, o'sha ega verguldan keyin darhol kelishi shart. Freskani restavratsiya qilgan shaxslar bu 'museum conservators'. A va C da rasm yoki taqdimot e'lon qilingan bo'lib, osilgan modifikator xatosi yuzaga keladi. To'g'ri javob B. Manba: Gramilliy (42-bet).",
    desmos_trick: "Who did the restoring? Conservators! Choice B puts 'museum conservators' immediately after the comma.",
    desmos_latex: "\\text{Participial Modifier} , \\text{Logical Actor (Conservators)}",
    reference_formula: "\\text{Modifier Alignment Invariant}"
  },
  {
    id: "q_satashkent_writing_16",
    section: "READING_WRITING",
    domain: "Expression of Ideas",
    topic_code: "ENG-SYN",
    difficulty: "Hard",
    prompt: "While researching a topic, a student has taken the following notes:\n• Quasars are extremely luminous active galactic nuclei powered by supermassive black holes.\n• In 2020, astronomers identified J0313-1806, the most distant known quasar at a redshift of z = 7.64.\n• J0313-1806 formed only 670 million years after the Big Bang.\n• Its central black hole contains approximately 1.6 billion solar masses.\n• Existing cosmological models struggle to explain how such a massive black hole could form so quickly.\n\nThe student wants to emphasize the cosmological challenge presented by J0313-1806. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    options: JSON.stringify([
      "A. Identified in 2020 at a redshift of z = 7.64, the quasar J0313-1806 is powered by a supermassive black hole.",
      "B. Because J0313-1806 accumulated 1.6 billion solar masses just 670 million years after the Big Bang, its rapid formation challenges existing cosmological models.",
      "C. Quasars are extremely luminous active galactic nuclei, and J0313-1806 is the most distant one known to astronomers.",
      "D. With a redshift of z = 7.64, J0313-1806 formed within 670 million years of the Big Bang."
    ]),
    correct_answer: "B",
    explanation_en: "The student's specific goal is to 'emphasize the cosmological challenge presented by J0313-1806'. Choice B explicitly highlights both the immense mass (1.6 billion solar masses) and early emergence (670 million years after Big Bang) as the direct cause of the challenge to cosmological models. Choices A, C, and D omit the challenge entirely. Choice B is correct. Source: SAToplam Writing Book (Page 310).",
    explanation_uz: "Talabaning aniq maqsadi - J0313-1806 keltirib chiqargan kosmologik jumboqni ta'kidlash. Faqat B varianti qora tuynukning ulkan massasi va koinotning dastlabki 670 million yilida shakllanishi mavjud modellarga qanday qiyinchilik tug'dirishini to'liq ifodalaydi. To'g'ri javob B. Manba: SAToplam Writing (310-bet).",
    desmos_trick: "Check prompt goal: 'emphasize cosmological challenge'. Only Choice B mentions challenging existing models!",
    desmos_latex: "\\text{Goal: Emphasize Challenge} \\implies \\text{Choice B}",
    reference_formula: "\\text{Rhetorical Synthesis Alignment}"
  },
  {
    id: "q_satashkent_math_hard_15",
    section: "MATH",
    domain: "Advanced Math",
    topic_code: "ADV-01",
    difficulty: "Hard",
    prompt: "In the $xy$-plane, the graph of $y = 2x^2 - 8x + c$ intersects the horizontal line $y = 3$ at exactly one point. What is the value of the constant $c$?",
    options: JSON.stringify([
      "A. 8",
      "B. 11",
      "C. -5",
      "D. 5"
    ]),
    correct_answer: "B",
    explanation_en: "Setting the equations equal to find intersection points: $2x^2 - 8x + c = 3 \\implies 2x^2 - 8x + (c - 3) = 0$. Since there is exactly one intersection point, the quadratic equation must have exactly one real solution, meaning its discriminant equals zero: $\\Delta = b^2 - 4ac = (-8)^2 - 4(2)(c - 3) = 0$. Simplifying: $64 - 8(c - 3) = 0 \\implies 8(c - 3) = 64 \\implies c - 3 = 8 \\implies c = 11$. Choice B is correct. Source: SATashkent Math Hard Book (Page 45, Q45).",
    explanation_uz: "Tenglamalarni tenglashtiramiz: 2x^2 - 8x + c = 3 => 2x^2 - 8x + (c - 3) = 0. Aniq 1 ta kesishish nuqtasi bo'lishi uchun diskriminant nolga teng bo'lishi kerak: (-8)^2 - 4*2*(c - 3) = 0 => 64 - 8(c - 3) = 0 => c - 3 = 8 => c = 11. To'g'ri javob B. Manba: SATashkent Math Hard Book (45-bet).",
    desmos_trick: "Enter y = 2x^2 - 8x + c with slider c. Add line y = 3. Slide c until the vertex of the parabola touches the line y = 3. It touches perfectly when c = 11!",
    desmos_latex: "(-8)^2 - 4(2)(c - 3) = 0",
    reference_formula: "\\Delta = b^2 - 4ac = 0"
  },
  {
    id: "q_satashkent_math_hard_16",
    section: "MATH",
    domain: "Algebra",
    topic_code: "ALG-03",
    difficulty: "Hard",
    prompt: "Consider the system of linear equations:\n$$\\begin{cases} 4x - ky = 18 \\\\ 6x + 9y = c \\end{cases}$$\nIf the system has infinitely many solutions, what is the value of $k + c$?",
    options: JSON.stringify([
      "A. 21",
      "B. 27",
      "C. 33",
      "D. -6"
    ]),
    correct_answer: "A",
    explanation_en: "For a linear system to have infinitely many solutions, the ratio of coefficients must be equal: $\\frac{4}{6} = \\frac{-k}{9} = \\frac{18}{c}$. Since $\\frac{4}{6} = \\frac{2}{3}$: First, $\\frac{-k}{9} = \\frac{2}{3} \\implies -3k = 18 \\implies k = -6$. Second, $\\frac{18}{c} = \\frac{2}{3} \\implies 2c = 54 \\implies c = 27$. Therefore, $k + c = -6 + 27 = 21$. Choice A is correct. Source: SATashkent Math Hard Book (Page 52, Q52).",
    explanation_uz: "Chiziqli tenglamalar sistemasi cheksiz ko'p yechimga ega bo'lishi uchun barcha koeffitsientlar nisbati teng bo'lishi shart: 4/6 = -k/9 = 18/c. 4/6 = 2/3. Demak, -k/9 = 2/3 => k = -6. 18/c = 2/3 => c = 27. U holda k + c = -6 + 27 = 21. To'g'ri javob A. Manba: SATashkent Math Hard Book (52-bet).",
    desmos_trick: "Type 4/6 = -k/9 and 4/6 = 18/c in Desmos -> k = -6, c = 27 -> sum = 21.",
    desmos_latex: "\\frac{A_1}{A_2} = \\frac{B_1}{B_2} = \\frac{C_1}{C_2}",
    reference_formula: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}"
  },
  {
    id: "q_satashkent_writing_17",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    topic_code: "ENG-WIC",
    difficulty: "Hard",
    prompt: "Rather than offering empty platitudes, the independent ombudsman addressed the university senate with remarkable ______, detailing administrative lapses that contributed to the budget shortfall.",
    options: JSON.stringify([
      "A. reticence",
      "B. candor",
      "C. austerity",
      "D. ambiguity"
    ]),
    correct_answer: "B",
    explanation_en: "The sentence contrasts 'empty platitudes' with an honest, direct account of shortcomings. 'Candor' means openness, frankness, and honesty in speech. 'Reticence' (reluctance to speak) and 'ambiguity' (vagueness) contradict the thorough detailing of lapses. Choice B is correct. Source: Vocabook 3.0 (Page 88).",
    explanation_uz: "Gapda 'quruq gaplar' o'rniga kamchiliklarni ochiq-oydin aytganligi ta'kidlangan. 'Candor' - samimiylik, ochiqlik va haqiqatni yuzga aytish. To'g'ri javob B. Manba: Vocabook 3.0 (88-bet).",
    desmos_trick: "Contrast clue: 'Rather than offering empty platitudes' -> Frank, honest speech -> Candor.",
    desmos_latex: "\\text{Contrast with platitudes} \\implies \\text{Candor}",
    reference_formula: "\\text{Words in Context Nuance}"
  },
  {
    id: "q_satashkent_math_hard_17",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    topic_code: "GEO-01",
    difficulty: "Hard",
    prompt: "A right circular cone has a base radius of $r$ and a height of $h$. A second right circular cone has a base radius that is $40\\%$ greater than $r$ and a height that is $25\\%$ less than $h$. The volume of the second cone is what percentage greater than the volume of the first cone?",
    options: JSON.stringify([
      "A. 47%",
      "B. 50%",
      "C. 15%",
      "D. 75%"
    ]),
    correct_answer: "A",
    explanation_en: "The volume of a cone is $V = \\frac{1}{3}\\pi r^2 h$. For the second cone: $r_2 = 1.40r$ and $h_2 = 0.75h$. Substituting into the volume formula: $V_2 = \\frac{1}{3}\\pi (1.40r)^2 (0.75h) = \\frac{1}{3}\\pi (1.96 r^2)(0.75 h) = (1.96 \\times 0.75) V_1 = 1.47 V_1$. A value of $1.47 V_1$ corresponds to a $47\\%$ increase over $V_1$. Choice A is correct. Source: SAT Math Cheat Sheet (Page 6).",
    explanation_uz: "Konus hajmi V = 1/3 * pi * r^2 * h. Yangi radius r2 = 1.4r, yangi balandlik h2 = 0.75h. Yangi hajm: V2 = 1/3 * pi * (1.4r)^2 * 0.75h = (1.96 * 0.75) * V1 = 1.47 V1. Bu dastlabki hajmga nisbatan 47% ga ko'p degani. To'g'ri javob A. Manba: SAT Math Cheat Sheet (6-bet).",
    desmos_trick: "Calculate 1.4^2 * 0.75 in Desmos: 1.47 -> 47% increase!",
    desmos_latex: "V = \\frac{1}{3}\\pi r^2 h",
    reference_formula: "V_2 = (1.4)^2 \\cdot (0.75) \\cdot V_1"
  }
];

async function seedBatch2() {
  const client = await pool.connect();
  try {
    console.log(`Starting insertion of ${batch2Questions.length} batch 2 SATashkent questions...`);
    let inserted = 0;

    for (const q of batch2Questions) {
      const query = `
        INSERT INTO questions (
          id, section, domain, topic_code, difficulty, prompt, options,
          correct_answer, explanation_en, explanation_uz, desmos_trick, desmos_latex, reference_formula
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
        )
        ON CONFLICT (id) DO UPDATE SET
          prompt = EXCLUDED.prompt,
          options = EXCLUDED.options,
          correct_answer = EXCLUDED.correct_answer,
          explanation_en = EXCLUDED.explanation_en,
          explanation_uz = EXCLUDED.explanation_uz,
          desmos_trick = EXCLUDED.desmos_trick,
          desmos_latex = EXCLUDED.desmos_latex,
          reference_formula = EXCLUDED.reference_formula;
      `;

      await client.query(query, [
        q.id,
        q.section,
        q.domain,
        q.topic_code,
        q.difficulty,
        q.prompt,
        q.options,
        q.correct_answer,
        q.explanation_en,
        q.explanation_uz,
        q.desmos_trick,
        q.desmos_latex,
        q.reference_formula,
      ]);
      inserted++;
    }

    console.log(`Successfully upserted ${inserted} questions.`);
    const total = await client.query("SELECT COUNT(*)::int as count FROM questions");
    console.log(`Total questions in database now: ${total.rows[0].count}`);
  } catch (err) {
    console.error("Error seeding batch 2:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seedBatch2();
