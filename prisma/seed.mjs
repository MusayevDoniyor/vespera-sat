import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌌 Seeding Vespera Curriculum & Question Bank...");

  // Clear existing
  await prisma.userProgress.deleteMany({});
  await prisma.errorLog.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.topic.deleteMany({});

  const topicsData = [
    // MATH - ALGEBRA
    {
      code: "ALG-01",
      section: "MATH",
      domain: "Algebra",
      titleUz: "Bir o'zgaruvchili chiziqli tenglamalar",
      titleEn: "Linear Equations in One Variable",
      descriptionUz: "Tenglamalarni yechish, no solution va infinitely many solutions qoidalari, matnli masalalarni tuzish.",
      desmosTips: "Tenglamani Desmos'ga to'g'ridan-to'g'ri yozing (masalan, 4x + 12 = 32). Desmos vertikal chiziq chizib, to'g'ri x qiymatini darhol ko'rsatadi!",
      order: 1,
    },
    {
      code: "ALG-02",
      section: "MATH",
      domain: "Algebra",
      titleUz: "Ikki o'zgaruvchili chiziqli tenglamalar va grafiklar",
      titleEn: "Linear Equations in Two Variables",
      descriptionUz: "Slope (qiyalik m), y-intercept (b), y = mx + b shakli, parallel va perpendikulyar to'g'ri chiziqlar.",
      desmosTips: "Tenglamani y = mx + b shaklida yozing. 'm' va 'b' uchun slider qo'shib, to'g'ri chiziq qanday harakatlanishini jonli ko'ring.",
      order: 2,
    },
    {
      code: "ALG-03",
      section: "MATH",
      domain: "Algebra",
      titleUz: "Chiziqli tenglamalar sistemasi",
      titleEn: "Systems of Linear Equations",
      descriptionUz: "Substitution va elimination usullari, 1 ta yechim, cheksiz yechim yoki yechim yo'qligini aniqlash.",
      desmosTips: "Ikkala tenglamani Desmos'da 1- va 2-qatorlarga yozing. Chiziqlar kesishgan nuqtaga bosing — (x, y) koordinatalari bir zumda ko'rinadi!",
      order: 3,
    },
    {
      code: "ALG-04",
      section: "MATH",
      domain: "Algebra",
      titleUz: "Chiziqli tengsizliklar va sohalar",
      titleEn: "Linear Inequalities in One or Two Variables",
      descriptionUz: "Tengsizliklar koordinata tekisligida, yechimlar sohasi va sohadagi nuqtalarni tekshirish.",
      desmosTips: "Tengsizlik belgisini (masalan, y > 2x - 4) Desmos'ga yozing — bo'yalgan soha paydo bo'ladi. Variantdagi nuqtalar shu sohada yotishini ko'ring.",
      order: 4,
    },

    // MATH - ADVANCED MATH
    {
      code: "ADV-01",
      section: "MATH",
      domain: "Advanced Math",
      titleUz: "Ekvivalent ifodalar va Ko'phadlar",
      titleEn: "Equivalent Expressions & Factoring",
      descriptionUz: "Ko'phadlarni ko'paytuvchilarga ajratish, qisqa ko'paytirish formulalari, kasrlarni soddalashtirish.",
      desmosTips: "Asl ifodani 1-qatorga, variantlardagi ifodani 2-qatorga yozing. Agar ikkala grafik ustma-ust tushsa, ular 100% ekvivalent!",
      order: 5,
    },
    {
      code: "ADV-02",
      section: "MATH",
      domain: "Advanced Math",
      titleUz: "Daraja va ildizlar qoidalari",
      titleEn: "Laws of Exponents & Radicals",
      descriptionUz: "Kasr darajalar (x^(a/b) = ildiz), manfiy darajalar va darajalar ustida amallar.",
      desmosTips: "Ildizli va darajali ifodalarga biror son (masalan x = 3) berib, Desmos'da qiymatini hisoblab taqqoslang.",
      order: 6,
    },
    {
      code: "ADV-03",
      section: "MATH",
      domain: "Advanced Math",
      titleUz: "Kvadrat tenglamalar va Parabola",
      titleEn: "Quadratic Equations and Functions",
      descriptionUz: "Diskriminant (D = b^2 - 4ac), ildizlar soni, Vertex form y = a(x-h)^2 + k, eng katta/kichik qiymat.",
      desmosTips: "Parabolani kiriting va uning cho'qqisiga (vertex) yoki x o'qini kesgan nuqtalariga (zeros) bosing. Desmos koordinatalarni darhol chiqaradi.",
      order: 7,
    },
    {
      code: "ADV-04",
      section: "MATH",
      domain: "Advanced Math",
      titleUz: "Ko'rsatkichli funksiyalar (Growth & Decay)",
      titleEn: "Exponential Functions & Word Problems",
      descriptionUz: "y = a * b^x formulasi, murakkab foiz, aholi o'sishi va radioaktiv parchalanish modellari.",
      desmosTips: "Regression usuli: jadvalga ma'lumotlarni yozing va y1 ~ a * b^x1 formulasini kiriting — a va b darhol topiladi!",
      order: 8,
    },
    {
      code: "ADV-05",
      section: "MATH",
      domain: "Advanced Math",
      titleUz: "Chiziqli bo'lmagan funksiyalar va sistemalar",
      titleEn: "Nonlinear Systems & Function Graphs",
      descriptionUz: "Parabola va to'g'ri chiziqning kesishishi, modul va kubik funksiyalar tahlili.",
      desmosTips: "Tenglamalarni kiritib, kesishish nuqtalarini sanang: 2 ta bo'lsa 2 yechim, urinsa 1 yechim, tegmasa 0 yechim.",
      order: 9,
    },

    // MATH - PROBLEM SOLVING & DATA
    {
      code: "DAT-01",
      section: "MATH",
      domain: "Problem Solving & Data Analysis",
      titleUz: "Nisbat, tezlik, proporsiya va foizlar",
      titleEn: "Ratios, Rates, Proportions & Percentages",
      descriptionUz: "Unit conversion (o'lchov birliklari), Percent increase/decrease, zichlik va tezlik masalalari.",
      desmosTips: "Desmos'dan kalkulyator sifatida foydalaning: (Yangi - Eski) / Eski * 100 orqali foiz o'zgarishini bir qatorda hisoblang.",
      order: 10,
    },
    {
      code: "DAT-02",
      section: "MATH",
      domain: "Problem Solving & Data Analysis",
      titleUz: "Statistika: O'rta qiymat, Mediana va Og'ish",
      titleEn: "One-Variable Statistics & Outliers",
      descriptionUz: "Mean, Median, Mode, Range, Standard Deviation (tarqoqlik) va chetga chiquvchi outlierlar ta'siri.",
      desmosTips: "Desmos'da mean([1, 2, 5, 8, 9]) yoki median([1, 2, 5, 8, 9]) deb yozing — qo'lda sanash shart emas!",
      order: 11,
    },
    {
      code: "DAT-03",
      section: "MATH",
      domain: "Problem Solving & Data Analysis",
      titleUz: "Jadvallar, Scatterplots va Ehtimollik",
      titleEn: "Two-Variable Data, Tables & Probability",
      descriptionUz: "Line of best fit, ikki tomonlama chastota jadvallari (two-way tables) va shartli ehtimollik.",
      desmosTips: "Jadval tuzib, x1 va y1 nuqtalariga y1 ~ m*x1 + b deb yozsangiz, eng mos chiziq tenglamasini chiqaradi.",
      order: 12,
    },
    {
      code: "DAT-04",
      section: "MATH",
      domain: "Problem Solving & Data Analysis",
      titleUz: "Tanlanma va Xatolik chegarasi (Margin of Error)",
      titleEn: "Data Collection, Sampling & Inferences",
      descriptionUz: "Tasodifiy tanlanma (random sampling), margin of error va statistik xulosalar ishonchliligi.",
      desmosTips: "Margin of error masalalarida interval [o'rtacha - xato, o'rtacha + xato] orasida bo'lishini tekshiring.",
      order: 13,
    },

    // MATH - GEOMETRY & TRIG
    {
      code: "GEO-01",
      section: "MATH",
      domain: "Geometry & Trigonometry",
      titleUz: "Yuza va Hajm formulalari",
      titleEn: "Area and Volume Formulas",
      descriptionUz: "Uchburchaklar, to'g'ri to'rtburchaklar, silindr, konus va shar yuzalari va hajmlari.",
      desmosTips: "Bluebook formula ma'lumotnomasidagi formulalarni Desmos'da o'zgaruvchilar bilan qulay hisoblang.",
      order: 14,
    },
    {
      code: "GEO-02",
      section: "MATH",
      domain: "Geometry & Trigonometry",
      titleUz: "Chiziqlar, burchaklar va Pifagor uchburchaklari",
      titleEn: "Lines, Angles, and Triangles",
      descriptionUz: "Parallel chiziqlar burchaklari, Pifagor teoremasi, 30-60-90 va 45-45-90 maxsus uchburchaklar.",
      desmosTips: "Pifagor formulasi c = sqrt(a^2 + b^2) ni Desmos'da tez hisoblang.",
      order: 15,
    },
    {
      code: "GEO-03",
      section: "MATH",
      domain: "Geometry & Trigonometry",
      titleUz: "Aylana va Doira tenglamalari",
      titleEn: "Circles & Circle Equations",
      descriptionUz: "Koordinatadagi aylana: (x-h)^2 + (y-k)^2 = r^2, yoy uzunligi va sektor yuzasi.",
      desmosTips: "Aylana tenglamasini to'liq ko'rinishida yozsangiz, Desmos uning markazini va radiusini darhol vizual ko'rsatadi!",
      order: 16,
    },
    {
      code: "GEO-04",
      section: "MATH",
      domain: "Geometry & Trigonometry",
      titleUz: "Trigonometriya asoslari",
      titleEn: "Trigonometry & Radians",
      descriptionUz: "sin, cos, tan nisbatlari, sin(x) = cos(90 - x) xossasi, gradus va radian almashtirish.",
      desmosTips: "Desmos'ning pastki o'ng tomonidagi sozlamalarida 'Degrees' yoki 'Radians' rejimini to'g'ri tanlashni unutmang!",
      order: 17,
    },

    // READING & WRITING
    {
      code: "ENG-WIC",
      section: "READING_WRITING",
      domain: "Craft and Structure",
      titleUz: "Kontekstda So'z Boyligi",
      titleEn: "Words in Context",
      descriptionUz: "Akademik so'zlarning kontekstga mos ma'nosi va so'zlarning ikkilamchi nozik ma'nolari.",
      desmosTips: null,
      order: 18,
    },
    {
      code: "ENG-PUR",
      section: "READING_WRITING",
      domain: "Craft and Structure",
      titleUz: "Matn Tuzilishi va Maqsad",
      titleEn: "Text Structure and Purpose",
      descriptionUz: "Muayyan jumlaning vazifasini aniqlash, muallifning umumiy maqsadini belgilash.",
      desmosTips: null,
      order: 19,
    },
    {
      code: "ENG-CRO",
      section: "READING_WRITING",
      domain: "Craft and Structure",
      titleUz: "Matnlararo Bog'liqlik",
      titleEn: "Cross-Text Connections",
      descriptionUz: "Bitta ilmiy mavzuga doir ikki muallif nuqtai nazarini qiyoslash va munosabatini aniqlash.",
      desmosTips: null,
      order: 20,
    },
    {
      code: "ENG-CID",
      section: "READING_WRITING",
      domain: "Information and Ideas",
      titleUz: "Asosiy G'oya va Detallar",
      titleEn: "Central Ideas and Details",
      descriptionUz: "Matndagi asosiy g'oyani va uni quvvatlovchi dalillarni aniq topish texnikasi.",
      desmosTips: null,
      order: 21,
    },
    {
      code: "ENG-COE",
      section: "READING_WRITING",
      domain: "Information and Ideas",
      titleUz: "Dalillar Nazorati (Matnli va Grafiklar)",
      titleEn: "Command of Evidence",
      descriptionUz: "Ilmiy gipotezani tasdiqlovchi eng kuchli iqtibosni yoki grafik/jadvaldagi raqamli dalilni tanlash.",
      desmosTips: null,
      order: 22,
    },
    {
      code: "ENG-INF",
      section: "READING_WRITING",
      domain: "Information and Ideas",
      titleUz: "Mantiqiy Xulosalar",
      titleEn: "Inferences",
      descriptionUz: "Matn oxiridagi bo'sh joyni mantiqan eng to'g'ri va ilmiy xulosa bilan yakunlash.",
      desmosTips: null,
      order: 23,
    },
    {
      code: "ENG-SYN",
      section: "READING_WRITING",
      domain: "Expression of Ideas",
      titleUz: "Ritorik Sintez (Qaydlar bilan ishlash)",
      titleEn: "Rhetorical Synthesis",
      descriptionUz: "Talaba konspektidagi ma'lumotlar asosida berilgan aniq maqsadga (goal) xizmat qiluvchi gapni tuzish.",
      desmosTips: null,
      order: 24,
    },
    {
      code: "ENG-TRA",
      section: "READING_WRITING",
      domain: "Expression of Ideas",
      titleUz: "O'tish So'zlari va Mantiqiy Bog'lovchilar",
      titleEn: "Transitions",
      descriptionUz: "However, Furthermore, Consequently, Specifically, In contrast kabi bog'lovchilar matritsasi.",
      desmosTips: null,
      order: 25,
    },
    {
      code: "ENG-BOU",
      section: "READING_WRITING",
      domain: "Standard English Conventions",
      titleUz: "Gap Chegaralari va Tinish Belgilari",
      titleEn: "Boundaries & Punctuation",
      descriptionUz: "Semicolons (;), Colons (:), Dashes (—), Comma splice xatolari va mustaqil gaplarni ulash qoidalari.",
      desmosTips: null,
      order: 26,
    },
    {
      code: "ENG-AGR",
      section: "READING_WRITING",
      domain: "Standard English Conventions",
      titleUz: "Fe'l va Ot Moslashuvi",
      titleEn: "Form, Structure, and Sense",
      descriptionUz: "Subject-Verb agreement, Pronoun-Antecedent, Fe'l zamonlari ketma-ketligi.",
      desmosTips: null,
      order: 27,
    },
    {
      code: "ENG-MOD",
      section: "READING_WRITING",
      domain: "Standard English Conventions",
      titleUz: "Aniqlovchilarning O'rni (Modifiers)",
      titleEn: "Modifier Placement",
      descriptionUz: "Dangling modifiers va misplaced modifiers xatolarini tuzatish usullari.",
      desmosTips: null,
      order: 28,
    },
  ];

  for (const t of topicsData) {
    await prisma.topic.create({ data: t });
  }

  const topics = await prisma.topic.findMany();
  const topicMap = new Map(topics.map((t) => [t.code, t.id]));

  const questionsData = [
    // 1. Math - Linear Equations
    {
      topicCode: "ALG-01",
      section: "MATH",
      domain: "Algebra",
      difficulty: "Easy",
      prompt: "If $4x + 12 = 36$, what is the value of $2x - 3$?",
      passage: null,
      options: JSON.stringify(["A. 6", "B. 9", "C. 12", "D. 15"]),
      correctAnswer: "B",
      explanationUz: "QADAM 1 (Hayotiy tushuntirish): Bu tarozi kabi. Tenglikning ikkala tomonidan 12 ni ayiramiz: 4x = 24. Keyin 4 ga bo'lamiz: x = 6. Savol 2x - 3 ni so'ragan: 2*(6) - 3 = 12 - 3 = 9.",
      explanationEn: "Solve for $x$: $4x = 36 - 12 \\implies 4x = 24 \\implies x = 6$. Then $2(6) - 3 = 9$.",
      desmosTrick: "Desmos'da '4x + 12 = 36' deb yozing. U vertikal to'g'ri chiziq chizib, x = 6 ekanini ko'rsatadi. Keyin '2(6) - 3' deb yozsangiz, javob 9 chiqadi!",
      referenceFormula: "ax + b = c \\implies x = \\frac{c - b}{a}",
    },
    // 2. Math - No Solutions / Infinite Solutions
    {
      topicCode: "ALG-01",
      section: "MATH",
      domain: "Algebra",
      difficulty: "Medium",
      prompt: "In the equation $kx + 18 = 6(2x + 3)$, $k$ is a constant. If the equation has infinitely many solutions, what is the value of $k$?",
      passage: null,
      options: JSON.stringify(["A. 6", "B. 12", "C. 18", "D. 24"]),
      correctAnswer: "B",
      explanationUz: "QADAM 1 (Sodda mantiq): 'Cheksiz ko'p yechim' (Infinitely many solutions) degani — tenglamaning chap va o'ng tomoni 100% bir xil egizak bo'lishi kerak. Qavsni ochsak: 6*(2x + 3) = 12x + 18. Chap tomonda: kx + 18 turibdi. Demak kx qismi 12x ga teng bo'lishi shart! k = 12.",
      explanationEn: "Expand the right side: $6(2x + 3) = 12x + 18$. For infinitely many solutions: $kx + 18 = 12x + 18 \\implies k = 12$.",
      desmosTrick: "Desmos'ga 'kx + 18 = 6(2x + 3)' deb yozing va k ga slider bering. k = 12 bo'lgandagina butun ekran yechimga aylanadi!",
      referenceFormula: "Ax + B = Cx + D \\text{ has } \\infty \\text{ solutions when } A = C \\text{ and } B = D.",
    },
    // 3. Math - Systems of Equations
    {
      topicCode: "ALG-03",
      section: "MATH",
      domain: "Algebra",
      difficulty: "Medium",
      prompt: "Consider the system of equations:\n$$\\begin{cases} 3x - y = 7 \\\\ 2x + 3y = 23 \\end{cases}$$\nWhat is the value of $x + y$?",
      passage: null,
      options: JSON.stringify(["A. 5", "B. 7", "C. 9", "D. 11"]),
      correctAnswer: "C",
      explanationUz: "QADAM 1: Birinchi tenglamadan y ni topamiz: y = 3x - 7. Ikkinchi tenglamaga qo'yamiz: 2x + 3(3x - 7) = 23 -> 11x = 44 -> x = 4. Unda y = 3(4) - 7 = 5. Bizdan x + y so'ralgan: 4 + 5 = 9.",
      explanationEn: "Substitute $y = 3x - 7$: $2x + 3(3x - 7) = 23 \\implies 11x - 21 = 23 \\implies x = 4$. Then $y = 5$. $x + y = 9$.",
      desmosTrick: "⚡ DESMOS CHEAT CODE: 1-qatorga '3x - y = 7', 2-qatorga '2x + 3y = 23' deb yozing. Kesishgan nuqtaga bosing: (4, 5). 4 + 5 = 9. 10 soniyada tayyor!",
      referenceFormula: "\\text{Intersection of lines } \\implies (x, y)",
    },
    // 4. Math - Quadratic Vertex Form
    {
      topicCode: "ADV-03",
      section: "MATH",
      domain: "Advanced Math",
      difficulty: "Hard",
      prompt: "The function $f(x) = 2(x - 4)^2 - 18$ is graphed in the $xy$-plane. Which of the following gives the $x$-intercepts of the graph?",
      passage: null,
      options: JSON.stringify(["A. (1, 0) and (7, 0)", "B. (-1, 0) and (7, 0)", "C. (4, -18)", "D. (-4, 18)"]),
      correctAnswer: "A",
      explanationUz: "QADAM 1: x-intercept degani y = 0 degani! 2(x - 4)^2 - 18 = 0 -> 2(x - 4)^2 = 18 -> (x - 4)^2 = 9. Ildiz olsak: x - 4 = +3 yoki -3. Demak x = 7 yoki x = 1. Nuqtalar: (1, 0) va (7, 0).",
      explanationEn: "Set $f(x) = 0$: $2(x - 4)^2 = 18 \\implies (x - 4)^2 = 9 \\implies x - 4 = \\pm 3 \\implies x = 7, 1$.",
      desmosTrick: "⚡ DESMOS CHEAT CODE: Desmos'ga 'y = 2(x - 4)^2 - 18' deb yozing. Grafikning x o'qini kesgan nuqtalariga bosing: (1, 0) va (7, 0) chiqadi!",
      referenceFormula: "y = a(x - h)^2 + k",
    },
    // 5. Math - Circles
    {
      topicCode: "GEO-03",
      section: "MATH",
      domain: "Geometry & Trigonometry",
      difficulty: "Medium",
      prompt: "The equation of a circle in the $xy$-plane is $(x + 5)^2 + (y - 3)^2 = 49$. What is the radius of the circle, and what are the coordinates of its center?",
      passage: null,
      options: JSON.stringify([
        "A. Center: (-5, 3), Radius: 7",
        "B. Center: (5, -3), Radius: 7",
        "C. Center: (-5, 3), Radius: 49",
        "D. Center: (5, -3), Radius: 49",
      ]),
      correctAnswer: "A",
      explanationUz: "QADAM 1: Standart formula: (x - h)^2 + (y - k)^2 = r^2. Markaz (h, k), radius r. Bizda (x + 5) bor, demak h = -5. (y - 3) bor, k = 3. r^2 = 49 bo'lsa, r = 7. Markaz: (-5, 3), radius: 7.",
      explanationEn: "Circle equation: $(x - h)^2 + (y - k)^2 = r^2$. Center is $(-5, 3)$ and $r = \\sqrt{49} = 7$.",
      desmosTrick: "⚡ DESMOS CHEAT CODE: Tenglamani Desmos'ga yozing: '(x + 5)^2 + (y - 3)^2 = 49'. Grafikda doira markazi (-5, 3) va radiusi 7 ekani yaqqol ko'rinadi!",
      referenceFormula: "(x - h)^2 + (y - k)^2 = r^2",
    },
    // 6. English - Rhetorical Synthesis
    {
      topicCode: "ENG-SYN",
      section: "READING_WRITING",
      domain: "Expression of Ideas",
      difficulty: "Hard",
      prompt: "The student wants to emphasize the difference in the primary dietary sources of the two penguin species. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
      passage: "While researching a topic, a student has taken the following notes:\n• The Adélie penguin (*Pygoscelis adeliae*) lives along the coast of the Antarctic continent.\n• Its diet primarily consists of Antarctic krill.\n• The gentoo penguin (*Pygoscelis papua*) inhabits sub-Antarctic islands and the Antarctic Peninsula.\n• Its diet consists mainly of fish, squid, and krill in varying proportions depending on location.\n• Both species are classified under the genus *Pygoscelis*.",
      options: JSON.stringify([
        "A. Although both species belong to the genus Pygoscelis, the Adélie penguin feeds predominantly on Antarctic krill, whereas the gentoo penguin's diet is more varied, consisting largely of fish and squid alongside krill.",
        "B. Belonging to the genus Pygoscelis, the Adélie penguin and gentoo penguin inhabit distinct Antarctic and sub-Antarctic regions.",
        "C. The diet of the gentoo penguin consists mainly of fish, squid, and krill, which it hunts across sub-Antarctic islands.",
        "D. Antarctic krill is a dietary staple for penguins living along the coast of the Antarctic continent, including the Adélie penguin.",
      ]),
      correctAnswer: "A",
      explanationUz: "QADAM 1 (IELTS 7.5 talabasi uchun SAT qoidasi): Savol maqsadini (goal) tekshiring: 'emphasize the difference in the primary dietary sources of the two penguin species'. Demak, ikkala tur va ularning ozuqa farqi bo'lishi kerak. Faqat A variantda ikkala tur ozuqasi taqqoslangan ('whereas the gentoo penguin's diet is more varied'). B variantda ozuqa yo'q, C faqat bitta tur, D faqat bitta tur haqida.",
      explanationEn: "Option A directly satisfies the goal by contrasting both species' diets. Options B, C, and D fail the specific prompt constraint.",
      desmosTrick: null,
      referenceFormula: "\\text{Goal Matching: Both Entities + Contrast in Diet}",
    },
    // 7. English - Transitions
    {
      topicCode: "ENG-TRA",
      section: "READING_WRITING",
      domain: "Expression of Ideas",
      difficulty: "Medium",
      prompt: "Astronomers initially hypothesized that the exoplanet WASP-121b was completely devoid of water vapor in its upper atmosphere. Recent observations using the James Webb Space Telescope detected unmistakable spectral signatures of vaporized water and carbon monoxide. _______ researchers have revised their chemical models of ultra-hot Jupiter atmospheres.",
      passage: null,
      options: JSON.stringify(["A. In contrast,", "B. Consequently,", "C. For instance,", "D. Furthermore,"]),
      correctAnswer: "B",
      explanationUz: "QADAM 1: Oldingi gapda yangi ma'lumot topilgani aytildi (Sabab). Keyingi gapda esa olimlar o'z modellarini o'zgartirishgani aytildi (Natija). Demak, Sabab-Oqibat (Cause-Effect) mantiqi bor. 'Consequently' (Natijada / Shu sababli) aynan shu vazifani bajaradi.",
      explanationEn: "The revision of models is the result of the new observation. 'Consequently' correctly indicates the cause-and-effect relationship.",
      desmosTrick: null,
      referenceFormula: "\\text{Cause } \\implies \\text{Consequently} \\implies \\text{Effect}",
    },
    // 8. English - Sentence Boundaries
    {
      topicCode: "ENG-BOU",
      section: "READING_WRITING",
      domain: "Standard English Conventions",
      difficulty: "Medium",
      prompt: "The discovery of the Burgess Shale fossils in 1909 dramatically altered paleontologists' understanding of the Cambrian _______ exquisite soft-tissue preservation provided unprecedented detail regarding early animal body plans.",
      passage: null,
      options: JSON.stringify([
        "A. explosion its",
        "B. explosion, its",
        "C. explosion; its",
        "D. explosion whose",
      ]),
      correctAnswer: "C",
      explanationUz: "QADAM 1: Birinchi qism mustaqil to'liq gap (Independent Clause 1). Ikkinchi qism ham alohida mustaqil to'liq gap (Independent Clause 2). Ikkita mustaqil gapni shunchaki vergul bilan ulab bo'lmaydi (Comma splice xatosi). Ularni to'g'ri ulash uchun Semicolon (;) kerak! To'g'ri javob: C.",
      explanationEn: "Both clauses are independent. Joining them requires either a period, a semicolon, or a comma + coordinating conjunction. A semicolon (choice C) is grammatically required.",
      desmosTrick: null,
      referenceFormula: "\\text{Independent Clause } ; \\text{ Independent Clause}",
    },
  ];

  for (const q of questionsData) {
    const topicId = topicMap.get(q.topicCode);
    if (topicId) {
      await prisma.question.create({
        data: {
          topicId,
          section: q.section,
          domain: q.domain,
          difficulty: q.difficulty,
          prompt: q.prompt,
          passage: q.passage,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanationUz: q.explanationUz,
          explanationEn: q.explanationEn,
          desmosTrick: q.desmosTrick,
          referenceFormula: q.referenceFormula,
        },
      });
    }
  }

  console.log(`✅ Successfully seeded ${topicsData.length} topics and ${questionsData.length} questions into Vespera DB!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
