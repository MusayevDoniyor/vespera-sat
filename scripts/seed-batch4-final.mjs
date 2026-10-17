import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://kaizo:2009@localhost:5432/vespera",
});

async function run() {
  const client = await pool.connect();
  try {
    const batch4 = [
      {
        id: "q_eng_pur_03",
        topic_code: "ENG-PUR",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        difficulty: "Hard",
        prompt: "Which choice best describes the overall rhetorical purpose of the passage?",
        passage: "Throughout the eighteenth century, European cartographers depicted Terra Australis Incognita as an immense temperate landmass counterbalancing the northern continents, populating their charts with speculative coastlines and fictional mountain ranges. When Captain James Cook's second Pacific expedition crossed the Antarctic Circle in 1773 without sighting land, it extinguished these Renaissance geographic fantasies. Cook replaced romantic conjecture with rigorous empirical navigation, definitively constraining any hypothetical southern continent to inaccessible polar ice.",
        options: JSON.stringify([
          "A. It illustrates how empirical exploration dismantled speculative European cartographic myths regarding the southern hemisphere.",
          "B. It argues that Renaissance cartographers possessed superior navigational instruments compared to eighteenth-century explorers.",
          "C. It chronicles Cook's personal journals and their literary influence on European Romantic poetry.",
          "D. It warns modern oceanographers against venturing into sub-zero Antarctic waterways.",
        ]),
        correct_answer: "A",
        explanation_en: "1. The text describes how cartographers imagined a fictional continent (Terra Australis), and Cook's empirical voyage disproved and replaced those myths with factual science.\n2. Choice A accurately summarizes this rhetorical purpose.",
        explanation_uz: "1. Matnda qadimiy xaritalardagi to'qima afsonalar Cookning amaliy ilmiy ekspeditsiyasi orqali puchga chiqarilgani aytilgan.\n2. A variant to'g'ri.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Rhetorical Purpose: Replace Myth with Empirical Truth}",
      },
      {
        id: "q_eng_mod_03",
        topic_code: "ENG-MOD",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        difficulty: "Medium",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        passage: "Pioneering the application of crystallography to biological macromolecules, _______ in understanding genetic replication.",
        options: JSON.stringify([
          "A. Rosalind Franklin's high-resolution X-ray diffraction images of DNA enabled a breakthrough",
          "B. Rosalind Franklin produced high-resolution X-ray diffraction images of DNA that enabled a breakthrough",
          "C. a breakthrough was achieved when Rosalind Franklin analyzed DNA diffraction patterns",
          "D. the double-helix structure of DNA was discovered by Rosalind Franklin",
        ]),
        correct_answer: "B",
        explanation_en: "1. Introductory modifier: 'Pioneering the application of crystallography to biological macromolecules, ...'\n2. Who pioneered crystallography? The person: Rosalind Franklin!\n3. In Choice A, the subject is 'images' (images cannot pioneer crystallography).\n4. In Choice C, the subject is 'breakthrough'; in Choice D, it is 'structure'.\n5. Choice B correctly places 'Rosalind Franklin' as the immediate subject performing the pioneering work.",
        explanation_uz: "1. 'Pioneering the application...' (Kriptografiyani birinchi bo'lib qo'llagan holda...) - buni inson (Rosalind Franklin) qilgan.\n2. Verguldan keyin darhol 'Rosalind Franklin produced...' kelishi shart. A variantdagi 'Franklin's images' tuzoq!",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{[Modifier]}, \\text{[Person/Agent]}",
      },
      {
        id: "q_eng_cro_03",
        topic_code: "ENG-CRO",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        difficulty: "Hard",
        prompt: "Based on the texts, both authors would most likely agree with which statement regarding the domestication of the wolf (*Canis lupus*)?",
        passage: "Text 1\nArchaeogeneticist Dr. Sarah Lin asserts that gray wolves self-domesticated by scavenging food scraps around Upper Paleolithic hunter-gatherer camps, arguing that human-wolf interaction began passively without intentional selective breeding.\n\nText 2\nEthologist Dr. Mikhail Voronin argues that ancient humans actively captured wolf pups and socialized them for hunting cooperation, though he concedes that only wolves with genetically lower fight-or-flight cortisol thresholds could tolerate proximity to human settlements.",
        options: JSON.stringify([
          "A. The initial stage of wolf-human proximity required wolves to possess genetic traits that reduced fear of humans.",
          "B. Humans exclusively captured adult wolves using pitfall traps during the Bronze Age.",
          "C. Wolves were initially domesticated for agricultural herd protection rather than hunting or scavenging.",
          "D. Modern dogs share zero mitochondrial DNA with ancient Eurasian wolves.",
        ]),
        correct_answer: "A",
        explanation_en: "1. Text 1 describes wolves scavenging near camps (requires reduced fear/tolerance).\n2. Text 2 explicitly concedes that only wolves with genetically lower fight-or-flight cortisol thresholds could tolerate proximity to human settlements.\n3. Both authors therefore agree that lower fear/reduced stress in proximity to humans was necessary (Choice A).",
        explanation_uz: "1. Ikkala matn ham bo'rilar inson yonida yashashi uchun ularda insondan qo'rqish darajasi past bo'lgan genetik xususiyat bo'lishi kerakligini tan oladi.\n2. A variant to'g'ri.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Overlap Consensus across Disagreeing Passages}",
      },
      {
        id: "q_alg03_panda10_inf",
        topic_code: "ALG-03",
        section: "MATH",
        domain: "Algebra",
        difficulty: "Hard",
        prompt: "In the system of equations below, $c$ is a constant:\n$$\\begin{cases} 3x - 5y = 12 \\\\ 6x - 10y = 2c \\end{cases}$$\nIf the system has infinitely many solutions $(x, y)$, what is the value of $c$?",
        passage: null,
        options: JSON.stringify(["A. 6", "B. 12", "C. 24", "D. 48"]),
        correct_answer: "B",
        explanation_en: "1. Notice that multiplying the first equation by $2$ gives $6x - 10y = 24$.\n2. For the system to have infinitely many solutions, the two equations must be identical: $6x - 10y = 2c \\implies 2c = 24$.\n3. Solve for $c$: $c = 12$. Choice B is correct.",
        explanation_uz: "1. 1-tenglamani 2 ga ko'paytiramiz: 6x - 10y = 24.\n2. Cheksiz ko'p yechim bo'lishi uchun 2c = 24 bo'lishi shart => c = 12.",
        desmos_latex: "2c = 24",
        desmos_trick: "Multiply equation 1 by 2: 24 = 2c => c = 12.",
        reference_formula: "\\frac{A_1}{A_2} = \\frac{B_1}{B_2} = \\frac{C_1}{C_2} \\implies \\infty \\text{ solutions}",
      },
      {
        id: "q_dat03_iqr_box",
        topic_code: "DAT-03",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        difficulty: "Medium",
        prompt: "In a summary box plot representing the test scores of $80$ students, the first quartile ($Q_1$) is $68$ and the third quartile ($Q_3$) is $86$. What is the interquartile range (IQR) of the scores?",
        passage: null,
        options: JSON.stringify(["A. 9", "B. 18", "C. 68", "D. 86"]),
        correct_answer: "B",
        explanation_en: "1. Recall the definition: $\\text{IQR} = Q_3 - Q_1$.\n2. $\\text{IQR} = 86 - 68 = 18$. Choice B is correct.",
        explanation_uz: "1. IQR (Kvartillararo masofa) = Q3 - Q1 = 86 - 68 = 18.",
        desmos_latex: "86 - 68",
        desmos_trick: "Desmos: 86 - 68 = 18.",
        reference_formula: "\\text{IQR} = Q_3 - Q_1",
      },
      {
        id: "q_geo01_sph_cube",
        topic_code: "GEO-01",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        difficulty: "Hard",
        prompt: "A sphere is perfectly inscribed inside a cube such that the sphere touches all six faces of the cube. If the edge length of the cube is $6\\text{ cm}$, what is the volume of the sphere, in cubic centimeters?",
        passage: null,
        options: JSON.stringify(["A. 18pi", "B. 36pi", "C. 72pi", "D. 288pi"]),
        correct_answer: "B",
        explanation_en: "1. The sphere touches opposite faces of the cube, so its diameter equals the cube's edge length: $d = 6\\text{ cm} \\implies r = 3\\text{ cm}$.\n2. Sphere volume formula: $V = \\frac{4}{3}\\pi r^3$.\n3. Substitute $r = 3$: $V = \\frac{4}{3}\\pi (3^3) = \\frac{4}{3}\\pi (27) = 4\\pi \\times 9 = 36\\pi\\text{ cm}^3$. Choice B is correct.",
        explanation_uz: "1. Shar kub ichiga chizilgan, demak uning diametri kub qirrasiga teng: d = 6 => r = 3 sm.\n2. Shar hajmi: V = 4/3 * pi * r^3 = 4/3 * pi * 27 = 36pi.",
        desmos_latex: "(4/3) * \\pi * 3^3",
        desmos_trick: "Type '(4/3) * pi * 3^3' in Desmos: 36pi (113.097...).",
        reference_formula: "V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3",
      },
      {
        id: "q_geo02_parallel_alt",
        topic_code: "GEO-02",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        difficulty: "Easy",
        prompt: "In the $xy$-plane, parallel lines $L_1$ and $L_2$ are intersected by transversal line $T$. If one of the acute alternate interior angles measures $(5x - 15)^\\circ$ and its corresponding alternate interior angle measures $(3x + 25)^\\circ$, what is the value of $x$?",
        passage: null,
        options: JSON.stringify(["A. 10", "B. 20", "C. 25", "D. 40"]),
        correct_answer: "B",
        explanation_en: "1. Alternate interior angles formed by parallel lines cut by a transversal are equal: $5x - 15 = 3x + 25$.\n2. Subtract $3x$: $2x - 15 = 25$.\n3. Add $15$: $2x = 40 \\implies x = 20$. Choice B is correct.",
        explanation_uz: "1. Parallel to'g'ri chiziqlarda ichki almashinuvchi burchaklar o'zaro teng bo'ladi: 5x - 15 = 3x + 25.\n2. 2x = 40 => x = 20.",
        desmos_latex: "5x - 15 = 3x + 25",
        desmos_trick: "Type '5x - 15 = 3x + 25' in Desmos: vertical line at x = 20.",
        reference_formula: "\\angle_1 = \\angle_2 \\quad (\\text{Alternate Interior Angles})",
      },
      {
        id: "q_adv05_circle_line",
        topic_code: "ADV-05",
        section: "MATH",
        domain: "Advanced Math",
        difficulty: "Hard",
        prompt: "A line with equation $y = mx + 10$ is tangent to the circle $x^2 + y^2 = 20$ in the $xy$-plane, where $m > 0$. What is the value of the slope $m$?",
        passage: null,
        options: JSON.stringify(["A. 1", "B. 2", "C. \\sqrt{3}", "D. 4"]),
        correct_answer: "B",
        explanation_en: "1. Substitute $y = mx + 10$ into the circle equation: $x^2 + (mx + 10)^2 = 20$.\n2. Expand: $x^2 + m^2 x^2 + 20mx + 100 = 20 \\implies (1 + m^2)x^2 + 20mx + 80 = 0$.\n3. Tangency requires discriminant to be ZERO ($b^2 - 4ac = 0$):\n   $(20m)^2 - 4(1 + m^2)(80) = 0$.\n4. $400m^2 - 320(1 + m^2) = 0 \\implies 400m^2 - 320 - 320m^2 = 0 \\implies 80m^2 = 320$.\n5. $m^2 = \\frac{320}{80} = 4 \\implies m = 2$ (since $m > 0$). Option B is correct.",
        explanation_uz: "1. Chiziq tenglamasini aylanaga qo'yamiz: (1 + m^2)x^2 + 20mx + 80 = 0.\n2. Urinish sharti D = 0: (20m)^2 - 4(1 + m^2)*80 = 0 => 400m^2 - 320 - 320m^2 = 0.\n3. 80m^2 = 320 => m^2 = 4 => m = 2.",
        desmos_latex: "x^2 + y^2 = 20, y = 2x + 10",
        desmos_trick: "Plot 'x^2 + y^2 = 20' and 'y = mx + 10' with a slider for m. At m = 2, the line perfectly touches the circle at (-4, 2).",
        reference_formula: "b^2 - 4ac = 0 \\implies \\text{Line is Tangent to Circle}",
      },
    ];

    for (const q of batch4) {
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

    console.log(`✅ Batch 4 seeded!`);
    const qCount = await client.query("SELECT count(*) FROM questions;");
    console.log("🔥 GRAND TOTAL Questions in DB:", qCount.rows[0].count);

    await client.end();
  } catch (err) {
    console.error("Error in batch 4:", err);
    process.exit(1);
  }
}

run();
