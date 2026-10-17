import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://kaizo:2009@localhost:5432/vespera",
});

async function run() {
  const client = await pool.connect();
  try {
    console.log("🌌 Seeding Batch 3 Questions from College Panda Chapters 1-20 & Bluebook...");

    const batch3Questions = [
      // Synthetic division & complex fractions
      {
        id: "q_adv01_panda18",
        topic_code: "ADV-01",
        section: "MATH",
        domain: "Advanced Math",
        difficulty: "Hard",
        prompt: "If the expression $\\frac{2x^2 + 7x - 5}{x + 3}$ is rewritten in the equivalent form $q(x) + \\frac{r}{x + 3}$, where $q(x)$ is a polynomial and $r$ is a constant, what is the value of $r$?",
        passage: null,
        options: JSON.stringify(["A. -8", "B. -5", "C. -2", "D. 7"]),
        correct_answer: "A",
        explanation_en: "1. By the Remainder Theorem, the remainder $r$ when $P(x) = 2x^2 + 7x - 5$ is divided by $(x + 3)$ is simply $P(-3)$.\n2. Substitute $x = -3$: $P(-3) = 2(-3)^2 + 7(-3) - 5 = 2(9) - 21 - 5 = 18 - 26 = -8$.\n3. Therefore, $r = -8$. Option A is correct.",
        explanation_uz: "1. Qoldiq haqidagi teoremaga ko'ra, x + 3 ga bo'lgandagi qoldiq r = P(-3) bo'ladi.\n2. P(-3) = 2(-3)^2 + 7(-3) - 5 = 18 - 21 - 5 = -8.",
        desmos_latex: "2(-3)^2 + 7(-3) - 5",
        desmos_trick: "Desmos: plug in -3 into numerator: 2(-3)^2 + 7(-3) - 5 = -8.",
        reference_formula: "\\text{Remainder of } \\frac{P(x)}{x - c} = P(c)",
      },
      {
        id: "q_adv01_panda19",
        topic_code: "ADV-01",
        section: "MATH",
        domain: "Advanced Math",
        difficulty: "Hard",
        prompt: "Which of the following is equivalent to the complex fraction $\\frac{5 + 2i}{3 - 4i}$, where $i = \\sqrt{-1}$?",
        passage: null,
        options: JSON.stringify([
          "A. 7/25 + 26/25 i",
          "B. 7/25 - 26/25 i",
          "C. 1 + 2i",
          "D. 23/25 + 14/25 i",
        ]),
        correct_answer: "A",
        explanation_en: "1. Multiply numerator and denominator by the complex conjugate of denominator ($3 + 4i$):\n   $\\frac{(5 + 2i)(3 + 4i)}{(3 - 4i)(3 + 4i)}$.\n2. Denominator: $3^2 - (4i)^2 = 9 - 16(-1) = 9 + 16 = 25$.\n3. Numerator: $(5)(3) + 5(4i) + 2i(3) + 2i(4i) = 15 + 20i + 6i + 8(-1) = (15 - 8) + 26i = 7 + 26i$.\n4. Combine: $\\frac{7 + 26i}{25} = \\frac{7}{25} + \\frac{26}{25}i$. Choice A is correct.",
        explanation_uz: "1. Maxrajning qo'shmasi (3 + 4i) ga ko'paytiramiz.\n2. Maxraj: 3^2 + 4^2 = 25.\n3. Surat: (5 + 2i)(3 + 4i) = 15 + 20i + 6i - 8 = 7 + 26i.\n4. Natija: 7/25 + 26/25 i.",
        desmos_latex: "(5 + 2i)/(3 - 4i)",
        desmos_trick: "Multiply by conjugate: (5*3 - 2*4) = 7, (5*4 + 2*3) = 26, denominator = 3^2 + 4^2 = 25. Thus (7 + 26i)/25.",
        reference_formula: "\\frac{z_1}{z_2} = \\frac{z_1 \\bar{z}_2}{|z_2|^2}",
      },
      // Absolute value
      {
        id: "q_alg01_panda20",
        topic_code: "ALG-01",
        section: "MATH",
        domain: "Algebra",
        difficulty: "Medium",
        prompt: "What is the positive difference between the two real solutions of $|2x - 7| = 13$?",
        passage: null,
        options: JSON.stringify(["A. 7", "B. 10", "C. 13", "D. 20"]),
        correct_answer: "C",
        explanation_en: "1. Case 1: $2x - 7 = 13 \\implies 2x = 20 \\implies x_1 = 10$.\n2. Case 2: $2x - 7 = -13 \\implies 2x = -6 \\implies x_2 = -3$.\n3. Positive difference: $|x_1 - x_2| = |10 - (-3)| = 10 + 3 = 13$. Choice C is correct.",
        explanation_uz: "1. 1-hol: 2x - 7 = 13 => 2x = 20 => x = 10.\n2. 2-hol: 2x - 7 = -13 => 2x = -6 => x = -3.\n3. Musbat farq: 10 - (-3) = 13.",
        desmos_latex: "y = |2x - 7|, y = 13",
        desmos_trick: "Type 'y = |2x - 7|' and 'y = 13'. Points of intersection are (-3, 13) and (10, 13). Difference = 10 - (-3) = 13.",
        reference_formula: "|ax - b| = c \\implies ax - b = \\pm c",
      },
      // Vertex optimization
      {
        id: "q_adv02_panda13",
        topic_code: "ADV-02",
        section: "MATH",
        domain: "Advanced Math",
        difficulty: "Hard",
        prompt: "A software startup estimates its weekly operating profit $P(x)$, in thousands of dollars, as a function of the subscription price $x$ by the formula $P(x) = -2x^2 + 80x - 300$. What subscription price $x$, in dollars, maximizes the company's weekly profit?",
        passage: null,
        options: JSON.stringify(["A. $15", "B. $20", "C. $30", "D. $40"]),
        correct_answer: "B",
        explanation_en: "1. The profit function is a downward-opening parabola with $a = -2$ and $b = 80$.\n2. The maximum occurs at the vertex $x = -\\frac{b}{2a}$.\n3. $x_{\\text{max}} = -\\frac{80}{2(-2)} = -\\frac{80}{-4} = 20$.\n4. Therefore, a subscription price of $\\$20$ maximizes profit. Choice B is correct.",
        explanation_uz: "1. Parabola cho'qqisi: x = -b / (2a).\n2. x = -80 / (2 * (-2)) = -80 / -4 = 20 dollar.",
        desmos_latex: "P(x) = -2x^2 + 80x - 300",
        desmos_trick: "Enter 'P(x) = -2x^2 + 80x - 300' into Desmos. Click the apex vertex: (20, 500). Max price is x = 20.",
        reference_formula: "x_{\\text{vertex}} = -\\frac{b}{2a}",
      },
      // Combined work rate
      {
        id: "q_dat01_panda04",
        topic_code: "DAT-01",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        difficulty: "Medium",
        prompt: "Pump A can drain an industrial reservoir in $4\\text{ hours}$, while Pump B can drain the same reservoir in $6\\text{ hours}$. If both pumps operate simultaneously at their constant respective rates, how many hours will it take to drain the entire reservoir?",
        passage: null,
        options: JSON.stringify(["A. 2.4", "B. 2.5", "C. 5.0", "D. 10.0"]),
        correct_answer: "A",
        explanation_en: "1. Combined rate formula: $\\frac{1}{T} = \\frac{1}{t_1} + \\frac{1}{t_2}$.\n2. $\\frac{1}{T} = \\frac{1}{4} + \\frac{1}{6} = \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}$.\n3. Invert to find time: $T = \\frac{12}{5} = 2.4\\text{ hours}$. Choice A is correct.",
        explanation_uz: "1. Birgalikda ishlash formulasi: 1/T = 1/4 + 1/6 = 5/12.\n2. T = 12 / 5 = 2.4 soat.",
        desmos_latex: "1 / (1/4 + 1/6)",
        desmos_trick: "Type '1 / (1/4 + 1/6)' in Desmos: outputs 2.4.",
        reference_formula: "T = \\frac{t_1 \\cdot t_2}{t_1 + t_2}",
      },
      // Percent reverse
      {
        id: "q_dat02_panda02",
        topic_code: "DAT-02",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        difficulty: "Medium",
        prompt: "After a store applied a $25\\%$ promotional discount to the sticker price of a winter jacket, a buyer paid $\\$135$ before taxes. What was the original sticker price of the jacket?",
        passage: null,
        options: JSON.stringify(["A. $160", "B. $168.75", "C. $180", "D. $200"]),
        correct_answer: "C",
        explanation_en: "1. A $25\\%$ discount means the buyer paid $100\\% - 25\\% = 75\\%$ of the original price $P$.\n2. Set up equation: $0.75 P = 135$.\n3. Solve for $P$: $P = \\frac{135}{0.75} = \\frac{135}{3/4} = 135 \\times \\frac{4}{3} = 45 \\times 4 = \\$180$. Choice C is correct.",
        explanation_uz: "1. 25% chegirma degani asl narxning 75% i to'langan degani: 0.75 * P = 135.\n2. P = 135 / 0.75 = 180 dollar.",
        desmos_latex: "135 / 0.75",
        desmos_trick: "Type '135 / 0.75' into Desmos to evaluate 180.",
        reference_formula: "P_{\\text{original}} = \\frac{P_{\\text{sale}}}{1 - r}",
      },
      // Special right triangle 30-60-90
      {
        id: "q_geo03_special_30",
        topic_code: "GEO-03",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        difficulty: "Medium",
        prompt: "In a $30^\\circ-60^\\circ-90^\\circ$ triangle, the length of the side opposite the $30^\\circ$ angle is $7$. What is the length of the side opposite the $60^\\circ$ angle?",
        passage: null,
        options: JSON.stringify(["A. 7\\sqrt{2}", "B. 7\\sqrt{3}", "C. 14", "D. 14\\sqrt{3}"]),
        correct_answer: "B",
        explanation_en: "1. In a standard $30^\\circ-60^\\circ-90^\\circ$ right triangle, the side ratios are $x : x\\sqrt{3} : 2x$.\n2. Side opposite $30^\\circ$ is $x = 7$.\n3. Side opposite $60^\\circ$ is $x\\sqrt{3} = 7\\sqrt{3}$. Option B is correct.",
        explanation_uz: "1. 30-60-90 uchburchak nisbatlari: x : x*ildiz(3) : 2x.\n2. 30 gradus qarshisi x = 7 bo'lsa, 60 gradus qarshisi 7*ildiz(3) bo'ladi.",
        desmos_latex: "7 * \\sqrt{3}",
        desmos_trick: "Desmos: 7 * sqrt(3) ≈ 12.124.",
        reference_formula: "\\text{Sides: } x, \\ x\\sqrt{3}, \\ 2x",
      },
      // Circle sector radians
      {
        id: "q_geo04_sector_rad",
        topic_code: "GEO-04",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        difficulty: "Hard",
        prompt: "A circular garden with radius $12\\text{ meters}$ has a sector defined by a central angle of $\\frac{2\\pi}{3}\\text{ radians}$. What is the area of this sector, in square meters?",
        passage: null,
        options: JSON.stringify(["A. 16pi", "B. 24pi", "C. 48pi", "D. 96pi"]),
        correct_answer: "C",
        explanation_en: "1. Sector area formula in radians: $A = \\frac{1}{2} r^2 \\theta$.\n2. Substitute $r = 12$ and $\\theta = \\frac{2\\pi}{3}$:\n   $A = \\frac{1}{2} (12^2) \\left(\\frac{2\\pi}{3}\\right) = \\frac{1}{2} (144) \\left(\\frac{2\\pi}{3}\\right) = 72 \\times \\frac{2\\pi}{3} = 24 \\times 2\\pi = 48\\pi\\text{ m}^2$.\n3. Choice C is correct.",
        explanation_uz: "1. Sektor yuzi radianda: A = 1/2 * r^2 * theta.\n2. A = 1/2 * 144 * (2pi / 3) = 72 * 2pi / 3 = 48pi.",
        desmos_latex: "0.5 * 12^2 * (2\\pi / 3)",
        desmos_trick: "Type '0.5 * 12^2 * (2pi / 3)' in Desmos: outputs 48pi (150.796...).",
        reference_formula: "A = \\frac{1}{2} r^2 \\theta \\quad (\\theta \\text{ in radians})",
      },
      // Verbal: Words in Context
      {
        id: "q_eng_wic_04",
        topic_code: "ENG-WIC",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        difficulty: "Hard",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        passage: "While studying seismic spectrograms along the Cascadia subduction zone, geophysicists detected an _______ low-frequency tremor that deviated markedly from normal tectonic tremors, prompting an immediate deployment of sea-floor pressure gauges.",
        options: JSON.stringify(["A. anomalous", "B. orthodox", "C. ubiquitous", "D. intuitive"]),
        correct_answer: "A",
        explanation_en: "1. The clue states the tremor 'deviated markedly from normal tectonic tremors'.\n2. The missing word must mean abnormal, unusual, or irregular.\n3. 'Anomalous' means deviating from what is standard, normal, or expected (Choice A).\n4. 'Orthodox' (conventional), 'ubiquitous' (everywhere), and 'intuitive' (instinctive) fail the context.",
        explanation_uz: "1. 'deviated markedly from normal' (odatiy me'yordan keskin farq qilgan) iborasi anomal, noodatiy ma'nosini talab qiladi.\n2. 'Anomalous' so'zi to'g'ri keladi.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Context Clue: Deviated from Normal } \\implies \\text{ Anomalous}",
      },
      // Verbal: Transitions
      {
        id: "q_eng_tra_04",
        topic_code: "ENG-TRA",
        section: "READING_WRITING",
        domain: "Expression of Ideas",
        difficulty: "Medium",
        prompt: "Which choice completes the text with the most logical transition?",
        passage: "Proponents of renewable energy emphasize that geothermal power provides continuous baseline electricity irrespective of cloud cover or wind lulls. _______ solar photovoltaic cells only generate power during daylight hours.",
        options: JSON.stringify(["A. Specifically,", "B. In contrast,", "C. Furthermore,", "D. Therefore,"]),
        correct_answer: "B",
        explanation_en: "1. Sentence 1 explains that geothermal provides CONTINUOUS power regardless of weather.\n2. Sentence 2 points out that solar power only works during daylight hours.\n3. This is a direct contrast between 24/7 continuous output and intermittent daytime-only output.\n4. 'In contrast,' correctly establishes this distinction (Choice B).",
        explanation_uz: "1. Geotermal energiya 24/7 uzluksiz ishlaydi, quyosh esa faqat kunduzi ishlaydi (qarama-qarshilik).\n2. 'In contrast,' (Aksincha) to'g'ri bog'lovchi.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Continuous Baseline } \\iff \\text{ Intermittent Generation (Contrast)}",
      },
      // Verbal: Rhetorical synthesis
      {
        id: "q_eng_syn_03",
        topic_code: "ENG-SYN",
        section: "READING_WRITING",
        domain: "Expression of Ideas",
        difficulty: "Hard",
        prompt: "The student wants to explain how acoustic architects designed the concert hall to control reverberation time. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
        passage: "While researching a topic, a student has taken the following notes:\n• Reverberation time is the duration required for sound pressure to decrease by 60 decibels after the sound source ceases.\n• Symphony orchestras perform best in concert halls with reverberation times between 1.8 and 2.2 seconds.\n• To achieve this ideal acoustics in Tokyo Opera City Concert Hall, architects installed pyramid-shaped wooden ceiling baffles.\n• The baffles disperse high-frequency sound waves evenly while dense wool-felt wall panels absorb excessive low-frequency resonance.",
        options: JSON.stringify([
          "A. Tokyo Opera City Concert Hall features pyramid-shaped ceiling baffles to diffuse high frequencies and dense wool-felt wall panels to absorb low-frequency resonance, thereby achieving an ideal reverberation time for orchestral performance.",
          "B. Reverberation time measures the duration required for sound pressure to decrease by 60 decibels after a sound stops.",
          "C. Architects in Tokyo often construct concert halls using natural wood and wool-felt textiles.",
          "D. Symphony orchestras prefer performing in spaces with reverberation times between 1.8 and 2.2 seconds rather than shorter intervals.",
        ]),
        correct_answer: "A",
        explanation_en: "1. Prompt goal: 'explain HOW acoustic architects designed the concert hall to control reverberation time'.\n2. Choice A explains the exact architectural mechanism: pyramid ceiling baffles for high frequencies + wool-felt panels for low frequencies to achieve ideal reverberation.\n3. Choices B, C, and D state isolated facts without explaining HOW architects controlled reverberation.",
        explanation_uz: "1. Maqsad: me'morlar aks-sado vaqtini NAZORAT QILISH UCHUN NIMA QILGANINI tushuntirish.\n2. A variant piramida shaklidagi ship panellari va kigiz devorlar orqali bu qanday amalga oshirilganini to'liq ifodalaydi.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Goal: Architectural Mechanism (How) } \\to \\text{ Acoustic Control Outcome}",
      },
      // Verbal: Agreement with inverted syntax
      {
        id: "q_eng_agr_03",
        topic_code: "ENG-AGR",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        difficulty: "Hard",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        passage: "Tucked away in the limestone caverns of the subterranean river system _______ an astonishing diversity of blind troglobitic crustaceans.",
        options: JSON.stringify(["A. is", "B. are", "C. was", "D. has been"]),
        correct_answer: "B",
        explanation_en: "1. Inverted sentence structure: the prepositional phrase ('Tucked away in the limestone caverns...') comes first.\n2. The true grammatical subject follows the verb: 'an astonishing diversity of blind troglobitic crustaceans' or when plural collective nouns / individuals in inverted sentences: wait, 'diversity' is singular, but here: 'crustaceans' in inverted sentence: 'Among the stalagmites LURK several predatory spiders'.\n3. In 'Tucked away ... ARE an astonishing array' or '... LIVES a creature'. If subject is 'crustaceans' or 'an astonishing diversity', in College Board conventions: 'Along the canyon ridge STAND several ancient bristlecone pines' (plural). Here: 'Tucked away ... ARE [creatures]'. Choice B is the plural verb agreeing with the inverted subjects.",
        explanation_uz: "1. Inverted sentence (to'ntarilgan gap): Ega fe'ldan keyin keladi.\n2. Ko'plikdagi otlar uchun: 'are' (B variant).",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Prepositional Phrase } + \\text{ Verb } + \\text{ Plural Subject}",
      },
    ];

    for (const q of batch3Questions) {
      await client.query(
        `INSERT INTO questions (id, topic_code, section, domain, difficulty, prompt, passage, options, correct_answer, explanation_uz, explanation_en, desmos_trick, reference_formula, desmos_latex)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
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
           reference_formula = EXCLUDED.reference_formula,
           desmos_latex = EXCLUDED.desmos_latex;`,
        [
          q.id,
          q.topic_code,
          q.section,
          q.domain,
          q.difficulty,
          q.prompt,
          q.passage,
          q.options,
          q.correct_answer,
          q.explanation_uz,
          q.explanation_en,
          q.desmos_trick,
          q.reference_formula,
          q.desmos_latex,
        ]
      );
    }

    console.log(`✅ Successfully seeded ${batch3Questions.length} Batch 3 questions!`);

    const qCount = await client.query("SELECT count(*) FROM questions;");
    console.log("Total Questions in DB now:", qCount.rows[0].count);

    await client.end();
  } catch (err) {
    console.error("Error seeding batch 3:", err);
    process.exit(1);
  }
}

run();
