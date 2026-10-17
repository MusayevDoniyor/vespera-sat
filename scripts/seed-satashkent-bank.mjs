import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://kaizo:2009@localhost:5432/vespera",
});

const satashkentQuestions = [
  {
    id: "q_satashkent_math_hard_01",
    section: "MATH",
    domain: "Algebra",
    topic_code: "ALG-02",
    difficulty: "Hard",
    prompt: "In the $xy$-plane, line $k$ and line $l$ are perpendicular and intersect at the point $(2, 8)$. If line $k$ is defined by the equation $y = mx + b$, where $m$ and $b$ are constants and $m > 1$, which of the following points lies on line $l$?",
    options: JSON.stringify([
      "A. (3, 8 - 1/m)",
      "B. (3, 8 + 1/m)",
      "C. (3, 8 - m)",
      "D. (3, 8 + m)"
    ]),
    correct_answer: "A",
    explanation_en: "Line $k$ has slope $m$. Since line $l$ is perpendicular to line $k$, its slope is the negative reciprocal: $m_\\perp = -\\frac{1}{m}$. Line $l$ passes through $(2, 8)$, so its point-slope equation is $y - 8 = -\\frac{1}{m}(x - 2)$. For $x = 3$, $y - 8 = -\\frac{1}{m}(3 - 2) = -\\frac{1}{m}$, giving $y = 8 - \\frac{1}{m}$. Therefore, the point $(3, 8 - \\frac{1}{m})$ lies on line $l$. Source: SATashkent Math Hard Book (Page 7, Q1).",
    explanation_uz: "k to'g'ri chiziqning burchak koeffitsienti m. l to'g'ri chiziq unga perpendikulyar bo'lgani sababli, uning burchak koeffitsienti qarama-qarshi teskari: -1/m bo'ladi. l to'g'ri chiziq (2, 8) nuqtadan o'tadi: y - 8 = -1/m(x - 2). x = 3 bo'lganda: y - 8 = -1/m(1) => y = 8 - 1/m. Shuning uchun to'g'ri javob A. Manba: SATashkent Math Hard Book (7-bet, 1-savol).",
    desmos_trick: "Test with a number: let m = 2. Line k passes through (2, 8) with slope 2. Perpendicular line l passes through (2, 8) with slope -1/2 = -0.5. At x = 3, y = 8 - 0.5 = 7.5. Plug m = 2 into choices: Choice A gives 8 - 1/2 = 7.5!",
    desmos_latex: "y - 8 = -\\frac{1}{2}(x - 2)",
    reference_formula: "m_\\perp = -\\frac{1}{m}"
  },
  {
    id: "q_satashkent_math_hard_02",
    section: "MATH",
    domain: "Algebra",
    topic_code: "ALG-03",
    difficulty: "Hard",
    prompt: "For each real number $r$, which of the following points $(x, y)$ lies on the graph of both equations in the $xy$-plane for the given system?\n$$3x + 2y = 6$$\n$$6x + 4y = 12$$",
    options: JSON.stringify([
      "A. (r, 3 - 3/2 r)",
      "B. (r, 3 - r/2)",
      "C. (3 - r, 3 - 3/2 r)",
      "D. (3, 2 - 3/2 r)"
    ]),
    correct_answer: "A",
    explanation_en: "Both equations represent the exact same coincident line because $6x + 4y = 12$ is simply $2(3x + 2y = 6)$. To find the general parametric point on this line in terms of $r$, set $x = r$. Substituting into $3x + 2y = 6$ yields: $3r + 2y = 6 \\implies 2y = 6 - 3r \\implies y = 3 - \\frac{3}{2}r$. Therefore, for every real number $r$, the point $(r, 3 - \\frac{3}{2}r)$ lies on the graph of both equations. Source: SATashkent Math Hard Book (Page 9, Q10).",
    explanation_uz: "Ikkala tenglama ham aynan bir xil to'g'ri chiziqni ifodalaydi (chunki ikkinchi tenglama birinchisini 2 ga ko'paytirilgani). Parametr r orqali yechimni ifodalash uchun x = r deb olamiz: 3r + 2y = 6 => 2y = 6 - 3r => y = 3 - 3/2 r. Shunday qilib, to'g'ri nuqta (r, 3 - 3/2 r) bo'ladi. Manba: SATashkent Math Hard Book (9-bet, 10-savol).",
    desmos_trick: "Type 3x + 2y = 6 into Desmos. Let r = 0, point is (0, 3). Choice A gives (0, 3). Let r = 2, point is (2, 0). Choice A gives (2, 3 - 3) = (2, 0). 100% match!",
    desmos_latex: "3x + 2y = 6",
    reference_formula: "\\frac{A_1}{A_2} = \\frac{B_1}{B_2} = \\frac{C_1}{C_2}"
  },
  {
    id: "q_satashkent_math_hard_03",
    section: "MATH",
    domain: "Algebra",
    topic_code: "ALG-02",
    difficulty: "Hard",
    prompt: "The table shows three values of $x$ and their corresponding values of $y$ where $s$ is a positive constant:\n\n$$\\begin{array}{|c|c|} \\hline x & y \\\\ \\hline -2s & 17 \\\\ -s & 14 \\\\ s & 8 \\\\ \\hline \\end{array}$$\n\nThere is a linear relationship between $x$ and $y$. Which of the following equations represents this relationship?",
    options: JSON.stringify([
      "A. sx + 3y = 11s",
      "B. 3x + sy = 11s",
      "C. 3x + sy = 11",
      "D. sx + 3y = 11"
    ]),
    correct_answer: "B",
    explanation_en: "Calculate the slope using points $(-2s, 17)$ and $(-s, 14)$: $m = \\frac{14 - 17}{-s - (-2s)} = \\frac{-3}{s} = -\\frac{3}{s}$. Using point-slope form with point $(s, 8)$: $y - 8 = -\\frac{3}{s}(x - s) \\implies y - 8 = -\\frac{3}{s}x + 3 \\implies y = -\\frac{3}{s}x + 11$. Multiply entire equation by $s$: $sy = -3x + 11s \\implies 3x + sy = 11s$. Source: SATashkent Math Hard Book (Page 10, Q16).",
    explanation_uz: "Burchak koeffitsientini topamiz: m = (14 - 17) / (-s - (-2s)) = -3 / s. (s, 8) nuqta orqali to'g'ri chiziq tenglamasini yozamiz: y - 8 = -3/s (x - s) => y = -3/s x + 11. Barcha hadlarni s ga ko'paytirsak: sy = -3x + 11s => 3x + sy = 11s. To'g'ri javob B. Manba: SATashkent Math Hard Book (10-bet, 16-savol).",
    desmos_trick: "Assign s = 1. Points become (-2, 17), (-1, 14), (1, 8). Enter points into Desmos table, then test choice B with s = 1: 3x + y = 11. It passes through all 3 points!",
    desmos_latex: "3x + y = 11",
    reference_formula: "m = \\frac{y_2 - y_1}{x_2 - x_1}"
  },
  {
    id: "q_satashkent_math_hard_04",
    section: "MATH",
    domain: "Algebra",
    topic_code: "ALG-01",
    difficulty: "Hard",
    prompt: "The typical energy per gram of three macronutrients is: Protein (4.0 calories/g), Fat (9.0 calories/g), and Carbohydrate (4.0 calories/g). If the 180 food calories in a granola bar come entirely from $p$ grams of protein, $f$ grams of fat, and $c$ grams of carbohydrate, which of the following expresses $f$ in terms of $p$ and $c$?",
    options: JSON.stringify([
      "A. f = 20 + 4/9(p + c)",
      "B. f = 20 - 4/9(p + c)",
      "C. f = 20 - 4/9(p - c)",
      "D. f = 20 + 9/4(p + c)"
    ]),
    correct_answer: "B",
    explanation_en: "Total energy equation: $4.0p + 9.0f + 4.0c = 180$. Group terms with like coefficients: $9f + 4(p + c) = 180 \\implies 9f = 180 - 4(p + c)$. Divide both sides by 9: $f = \\frac{180}{9} - \\frac{4}{9}(p + c) = 20 - \\frac{4}{9}(p + c)$. Source: SATashkent Math Hard Book (Page 8, Q6).",
    explanation_uz: "Jami kaloriya tenglamasi: 4p + 9f + 4c = 180. O'xshash hadlarni guruhlaymiz: 9f + 4(p + c) = 180 => 9f = 180 - 4(p + c). 9 ga bo'lamiz: f = 20 - 4/9(p + c). To'g'ri javob B.",
    desmos_trick: "Substitute simple values: let p = 0 and c = 0. Then 9f = 180 => f = 20. If p = 9, c = 0, then 4(9) + 9f = 180 => 36 + 9f = 180 => 9f = 144 => f = 16. Choice B gives 20 - 4/9(9) = 16!",
    desmos_latex: "f = 20 - \\frac{4}{9}(p + c)",
    reference_formula: "\\text{Calories} = 4p + 9f + 4c"
  },
  {
    id: "q_satashkent_rw_gramilliy_01",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-BOU",
    difficulty: "Medium",
    prompt: "Kizomba, a genre of dance that originated in Angola, has become an international ______ 2022, the Indian dance duo known as Elvis and Namrata defeated performers from around the world to win the annual Olympiads of Kizomba competition held in Paris, France, becoming the first-ever Asian winners.",
    options: JSON.stringify([
      "A. phenomenon in",
      "B. phenomenon and in",
      "C. phenomenon. In",
      "D. phenomenon, in"
    ]),
    correct_answer: "C",
    explanation_en: "The sentence consists of two independent clauses: Clause 1 ('Kizomba... has become an international phenomenon') and Clause 2 ('In 2022, the Indian dance duo... defeated performers...'). A comma alone produces a comma splice (Choice D). Choices A and B create ungrammatical run-ons and fragments. Only Choice C with a period correctly separates the two independent clauses. This is an authentic application of SATashkent's Gramilliy 3x1 elimination tactic (3 dependent run-ons vs 1 valid boundary). Source: SATashkent Gramilliy (Page 35).",
    explanation_uz: "Matn ikkita mustaqil gapdan iborat. Ikkita mustaqil gapni shunchaki vergul bilan bog'lab bo'lmaydi (Comma Splice). Faqatgina C variantida nuqta bilan ikki mustaqil gap to'g'ri ajratilgan (SATashkent Gramilliy 3x1 taktikasi).",
    desmos_trick: null,
    desmos_latex: null,
    reference_formula: "\\text{IC} . \\text{IC}"
  },
  {
    id: "q_satashkent_rw_gramilliy_02",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-AGR",
    difficulty: "Hard",
    prompt: "Portrait of Marquess Massimiliano Stampa is one of dozens of remaining works by the Italian Renaissance artist Sofonisba Anguissola. _______ in 1557, her painting can now be found at the Walters Art Museum in Baltimore.",
    options: JSON.stringify([
      "A. Will complete",
      "B. Completed",
      "C. Completes",
      "D. Was completed"
    ]),
    correct_answer: "B",
    explanation_en: "The introductory element modifies 'her painting'. A past participial adjective phrase ('Completed in 1557') correctly modifies the portrait. Choice D ('Was completed in 1557') creates a comma splice because it introduces a conjugated verb without a coordinating conjunction. Choices A and C are active tense verbs, which cannot logically describe a painting creating itself. Only participial adjective 'Completed' (B) is grammatical. Source: SATashkent Gramilliy (Page 36).",
    explanation_uz: "Bu yerda kirish qismi 'her painting' (uning kartinasi)ni ta'riflaydi. 'Completed in 1557' (1557-yilda yaratilgan) sifatdosh iborasi kartinani to'g'ri ta'riflaydi. 'Was completed' qo'yilsa, ikkita mustaqil gap hosil bo'lib comma splice yuzaga kelardi. Manba: SATashkent Gramilliy (36-bet).",
    desmos_trick: null,
    desmos_latex: null,
    reference_formula: "[\\text{Participial Modifier}], [\\text{Subject}] + [\\text{Verb}]"
  },
  {
    id: "q_satashkent_rw_gramilliy_03",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-AGR",
    difficulty: "Hard",
    prompt: "The writer Maya Angelou, along with others such as Lorenzo Thomas and Gwendolyn Brooks, _______ commonly associated with the Black Arts movement, a loose-knit group of writers and artists active in the 1960s and the 1970s who were interested in exploring the Black American experience through their work.",
    options: JSON.stringify([
      "A. is",
      "B. are",
      "C. have been",
      "D. were"
    ]),
    correct_answer: "A",
    explanation_en: "The true grammatical subject of the sentence is the singular noun 'The writer Maya Angelou'. The phrase 'along with others such as Lorenzo Thomas and Gwendolyn Brooks' is an intervening prepositional modifier and does NOT make the subject plural. Therefore, the verb must be singular ('is'). Choices B, C, and D are all plural, forming a classic SATashkent 3x1 pattern where 3 plural verbs are eliminated to reveal the single singular verb. Source: SATashkent Gramilliy (Page 43, March 2023 Real Exam).",
    explanation_uz: "Ega – birlikdagi 'The writer Maya Angelou'. 'Along with others...' iborasi oraliq qo'shimcha ibora bo'lib, egani ko'plikka aylantirmaydi. Shuning uchun fe'l birlikda ('is') bo'lishi shart. Qolgan 3 ta variant (are, have been, were) ko'plikda – bu SATashkent 3x1 qoidasining yaqqol namunasidir! Manba: Gramilliy (43-bet).",
    desmos_trick: null,
    desmos_latex: null,
    reference_formula: "\\text{Subject}_{\\text{singular}} + \\text{Verb}_{\\text{singular}}"
  },
  {
    id: "q_satashkent_rw_satoplam_01",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-BOU",
    difficulty: "Hard",
    prompt: "Within Earth's biomes, there are four main types of deserts: arid, semiarid, coastal, and cold. The Great Salt Desert in western Asia is an arid ______ it is one of the largest deserts in the world, with a total area of about 77,000 km².",
    options: JSON.stringify([
      "A. desert",
      "B. desert,",
      "C. desert;",
      "D. desert and"
    ]),
    correct_answer: "C",
    explanation_en: "The passage contains two complete independent clauses: 'The Great Salt Desert... is an arid desert' and 'it is one of the largest deserts in the world...'. Joining two independent clauses requires a semicolon (;), a period (.), or a comma + coordinating conjunction (FANBOYS). A lone comma (Choice B) creates a comma splice. A semicolon (Choice C) is the only option that correctly establishes the clause boundary. Source: SATashkent SAToplam Writing Book (Page 7, Q4).",
    explanation_uz: "Ikkita mustaqil gap: 'The Great Salt Desert... is an arid desert' va 'it is one of the largest deserts in the world...'. Ularni bog'lash uchun nuqtali vergul (;) zarur. Shuning uchun to'g'ri javob C. Manba: SAToplam Writing Book (7-bet, 4-savol).",
    desmos_trick: null,
    desmos_latex: null,
    reference_formula: "\\text{IC} ; \\text{IC}"
  }
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log("Seeding authentic SATashkent questions into PostgreSQL...");

    for (const q of satashkentQuestions) {
      await client.query(
        `INSERT INTO questions (
          id, section, domain, topic_code, difficulty, prompt, options, correct_answer, 
          explanation_en, explanation_uz, desmos_trick, desmos_latex, reference_formula
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (id) DO UPDATE SET
          prompt = EXCLUDED.prompt,
          options = EXCLUDED.options,
          correct_answer = EXCLUDED.correct_answer,
          explanation_en = EXCLUDED.explanation_en,
          explanation_uz = EXCLUDED.explanation_uz,
          desmos_trick = EXCLUDED.desmos_trick,
          desmos_latex = EXCLUDED.desmos_latex,
          reference_formula = EXCLUDED.reference_formula;`,
        [
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
        ]
      );
    }

    const { rows } = await client.query("SELECT COUNT(*)::int as total FROM questions;");
    console.log(`Success! Total questions in Vespera question bank now: ${rows[0].total}`);
  } catch (err) {
    console.error("Error seeding questions:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
