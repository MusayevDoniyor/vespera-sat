import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://kaizo:2009@localhost:5432/vespera",
});

async function run() {
  const client = await pool.connect();
  try {
    console.log("🌌 Starting Full Vespera Materials & Question Bank Enrichment...");

    // 1. Ensure topics table schema has description_en and desmos_tips_en
    await client.query(`
      ALTER TABLE topics ADD COLUMN IF NOT EXISTS description_en TEXT;
      ALTER TABLE topics ADD COLUMN IF NOT EXISTS desmos_tips_en TEXT;
      ALTER TABLE topics ADD COLUMN IF NOT EXISTS formula_sheet TEXT;
      ALTER TABLE questions ADD COLUMN IF NOT EXISTS desmos_latex TEXT;
    `);

    // 2. Reconcile any duplicate topics: reassign questions to canonical codes
    await client.query(`
      UPDATE questions SET topic_code = 'ENG-CRO' WHERE topic_code = 'ENG-CXP';
      UPDATE questions SET topic_code = 'ENG-CID' WHERE topic_code = 'ENG-CTE';
      UPDATE questions SET topic_code = 'ENG-CDE' WHERE topic_code = 'ENG-COE';
      UPDATE questions SET topic_code = 'ENG-AGR' WHERE topic_code = 'ENG-SVA';
    `);

    // Clean up duplicate topic rows if they exist
    await client.query(`
      DELETE FROM topics WHERE code IN ('ENG-CXP', 'ENG-CTE', 'ENG-COE', 'ENG-SVA');
    `);

    // 3. Define the 28 Official Digital SAT Topics with rich descriptions and formula sheets
    const officialTopics = [
      // ---------------- MATH: ALGEBRA ----------------
      {
        code: "ALG-01",
        section: "MATH",
        domain: "Algebra",
        title_uz: "Bir o'zgaruvchili chiziqli tenglamalar",
        title_en: "Linear Equations in One Variable",
        description_en: "Master single-variable multi-step linear equations, word problem translation, absolute value equations, and conditions for zero, one, or infinitely many solutions.",
        desmos_tips_en: "Type the equation directly into Desmos (e.g. 28x + 45 = 185). Desmos plots a vertical line whose x-value is the exact root!",
        formula_sheet: "Total = mx + b | Solutions: No solution if 0x = c (c ≠ 0); Infinite solutions if 0x = 0; Unique if ax = b (a ≠ 0) | Absolute Value: |ax + b| = c ⇒ ax + b = c or ax + b = -c.",
        sort_order: 1,
      },
      {
        code: "ALG-02",
        section: "MATH",
        domain: "Algebra",
        title_uz: "Ikki o'zgaruvchili chiziqli tenglamalar va grafiklar",
        title_en: "Linear Equations in Two Variables & Graphs",
        description_en: "Analyze slope-intercept form (y = mx + b), standard form (Ax + By = C), parallel lines (m1 = m2), and perpendicular lines (m1 * m2 = -1).",
        desmos_tips_en: "Plot y = mx + b with sliders for 'm' and 'b' to dynamically inspect slope steepness, signs, and vertical shifts.",
        formula_sheet: "Slope: m = (y2 - y1)/(x2 - x1) | Point-Slope: y - y1 = m(x - x1) | Perpendicular: m_perp = -1/m | Standard Form: Ax + By = C (slope = -A/B, y-int = C/B).",
        sort_order: 2,
      },
      {
        code: "ALG-03",
        section: "MATH",
        domain: "Algebra",
        title_uz: "Chiziqli tenglamalar sistemasi",
        title_en: "Systems of Two Linear Equations",
        description_en: "Solve simultaneous 2x2 linear systems via substitution and elimination. Detect parallel lines (no solution) and coincident lines (infinite solutions).",
        desmos_tips_en: "Type both equations on lines 1 and 2. Click the intersection point to instantly see exact (x, y) coordinates.",
        formula_sheet: "Unique Solution: A1/A2 ≠ B1/B2 | No Solution (Parallel): A1/A2 = B1/B2 ≠ C1/C2 | Infinitely Many Solutions (Coincident): A1/A2 = B1/B2 = C1/C2.",
        sort_order: 3,
      },
      {
        code: "ALG-04",
        section: "MATH",
        domain: "Algebra",
        title_uz: "Chiziqli tengsizliklar va sohalar",
        title_en: "Linear Inequalities in One or Two Variables",
        description_en: "Interpret half-plane solution regions on the Cartesian plane, test boundary points, and solve systems of linear inequalities.",
        desmos_tips_en: "Type inequalities like y >= 2x - 4 directly. Desmos shades the viable solution region; test given answer choices to verify if they fall in the shaded area.",
        formula_sheet: "Flipping Rule: Multiply/divide by negative ⇒ flip inequality (< becomes >, ≤ becomes ≥) | Strict (<, >) = dashed line; Non-strict (≤, ≥) = solid line.",
        sort_order: 4,
      },

      // ---------------- MATH: ADVANCED MATH ----------------
      {
        code: "ADV-01",
        section: "MATH",
        domain: "Advanced Math",
        title_uz: "Ekvivalent ifodalar va Ko'phadlar",
        title_en: "Equivalent Expressions & Polynomial Operations",
        description_en: "Factor polynomials, apply difference of squares, manipulate complex numbers (i^2 = -1), and apply the Remainder Theorem (P(a) = remainder).",
        desmos_tips_en: "Enter the original expression on line 1 and the answer choice on line 2. If the graphs overlap identically, they are 100% equivalent!",
        formula_sheet: "Difference of Squares: a^2 - b^2 = (a-b)(a+b) | Perfect Square: (a ± b)^2 = a^2 ± 2ab + b^2 | Complex Numbers: i = √(-1), i^2 = -1, i^3 = -i, i^4 = 1 | Remainder Theorem: Remainder of P(x)/(x - c) is P(c).",
        sort_order: 5,
      },
      {
        code: "ADV-02",
        section: "MATH",
        domain: "Advanced Math",
        title_uz: "Kvadrat tenglamalar va parabolalar",
        title_en: "Nonlinear Functions & Quadratic Equations",
        description_en: "Solve quadratics by factoring, quadratic formula, and completing the square. Analyze vertex form y = a(x - h)^2 + k, zeros, and the discriminant D = b^2 - 4ac.",
        desmos_tips_en: "Type any quadratic into Desmos and click the vertex or x-intercepts. Desmos displays grey dot markers for instant coordinate inspection.",
        formula_sheet: "Quadratic Formula: x = (-b ± √(b^2 - 4ac)) / (2a) | Discriminant: D > 0 (2 real roots), D = 0 (1 real root), D < 0 (no real roots) | Vertex x = -b/(2a) | Sum of Roots = -b/a, Product = c/a.",
        sort_order: 6,
      },
      {
        code: "ADV-03",
        section: "MATH",
        domain: "Advanced Math",
        title_uz: "Eksponentsial funksiyalar va modellar",
        title_en: "Exponential Functions & Growth/Decay Models",
        description_en: "Construct exponential models y = a(b)^(t/k). Differentiate between linear constant growth and percentage-based compound expansion.",
        desmos_tips_en: "Plot y = a(b)^x and verify values from given problem tables by typing x-coordinates directly into a Desmos table.",
        formula_sheet: "Exponential Model: y = a(1 ± r)^t or y = a * b^(t/k) | a = initial value (at t = 0), b = growth/decay factor (b > 1 growth, 0 < b < 1 decay), r = percentage rate.",
        sort_order: 7,
      },
      {
        code: "ADV-04",
        section: "MATH",
        domain: "Advanced Math",
        title_uz: "Daraja va ildizlar qoidalari",
        title_en: "Radicals & Rational Exponents",
        description_en: "Manipulate fractional exponents x^(a/b) = b-root(x^a), simplify radical expressions, and eliminate extraneous solutions from radical equations.",
        desmos_tips_en: "Substitute a test integer (such as x = 2 or x = 3) into radical expressions to compare numeric outputs with answer choices.",
        formula_sheet: "Fractional Exponent: x^(a/b) = √(b){x^a} = (√(b){x})^a | x^(-a) = 1/(x^a) | x^a * x^b = x^(a+b) | (x^a)^b = x^(ab) | Extraneous check: always plug answers back into original radical!",
        sort_order: 8,
      },
      {
        code: "ADV-05",
        section: "MATH",
        domain: "Advanced Math",
        title_uz: "Nochiziqli tenglamalar sistemasi",
        title_en: "Nonlinear Equation Systems",
        description_en: "Solve intersections between a line and a parabola, circle, or hyperbola, determining the exact number of intersection coordinates.",
        desmos_tips_en: "Plot the line and curve simultaneously. Desmos highlights all intersection points with clickable grey markers.",
        formula_sheet: "Substitute linear equation into nonlinear equation ⇒ Quadratic in x: Ax^2 + Bx + C = 0. Discriminant B^2 - 4AC determines number of intersections: 2 points (D > 0), 1 tangent point (D = 0), 0 intersections (D < 0).",
        sort_order: 9,
      },

      // ---------------- MATH: PROBLEM SOLVING & DATA ANALYSIS ----------------
      {
        code: "DAT-01",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        title_uz: "Nisbatlar, tezliklar va birliklar konvertatsiyasi",
        title_en: "Ratios, Rates, Proportions & Unit Conversions",
        description_en: "Solve direct and inverse proportions, multi-step unit conversions (dimensional analysis), density (mass/volume), and combined work rates.",
        desmos_tips_en: "Set up ratio equations directly (e.g. 10/5 = x/2) to let Desmos solve for x instantly.",
        formula_sheet: "Density = Mass / Volume | Speed = Distance / Time | Combined Work: 1/t_total = 1/t1 + 1/t2 | Unit Conversion: Multiply conversion factors canceling out unwanted units.",
        sort_order: 10,
      },
      {
        code: "DAT-02",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        title_uz: "Foizlar va foiz o'zgarishi",
        title_en: "Percentages & Percent Change",
        description_en: "Calculate percent increase, percent decrease, percent of a percent, and reverse percentage problems without calculation slips.",
        desmos_tips_en: "Type multiplying factors directly: 15% increase is * 1.15; 20% discount is * 0.80.",
        formula_sheet: "Percent Change = ((New - Old) / Old) * 100% | Percent of Percent: A% of B% of X = (A/100) * (B/100) * X | Reverse Percent: Original = Final / (1 ± r).",
        sort_order: 11,
      },
      {
        code: "DAT-03",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        title_uz: "Bir o'zgaruvchili ma'lumotlar va statistika",
        title_en: "One-Variable Data: Distributions & Statistics",
        description_en: "Analyze mean, median, mode, range, interquartile range (IQR), standard deviation, histograms, and the impact of outliers on distributions.",
        desmos_tips_en: "Enter data sets into Desmos: mean(L1), median(L1), stdev(L1) calculate summary statistics instantly.",
        formula_sheet: "Mean = Sum / N | Median = Middle value (ordered) | Range = Max - Min | IQR = Q3 - Q1 | Outlier Trap: Extreme high outlier pulls MEAN upward, while MEDIAN remains virtually unchanged.",
        sort_order: 12,
      },
      {
        code: "DAT-04",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        title_uz: "Ikki o'zgaruvchili ma'lumotlar va scatterplotlar",
        title_en: "Two-Variable Data: Scatterplots & Line of Best Fit",
        description_en: "Interpret scatterplots, lines of best fit, slopes as rates of change, y-intercepts as initial values, and calculate positive/negative residuals.",
        desmos_tips_en: "Use Desmos regression table: enter x1, y1 and type 'y1 ~ m*x1 + b' to generate best-fit parameters instantly.",
        formula_sheet: "Best Fit Model: ŷ = mx + b | Residual = Observed y - Predicted ŷ (y - ŷ) | Positive residual: point lies ABOVE line; Negative residual: point lies BELOW line.",
        sort_order: 13,
      },

      // ---------------- MATH: GEOMETRY & TRIGONOMETRY ----------------
      {
        code: "GEO-01",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        title_uz: "Yuza, perimetr va hajm formulalari",
        title_en: "Area, Perimeter & Volume Formulas",
        description_en: "Calculate surface area and volume of rectangular prisms, right circular cylinders (V = πr^2h), right cones (V = 1/3πr^2h), and spheres (V = 4/3πr^3).",
        desmos_tips_en: "Type geometric volume expressions with variable sliders to evaluate changes in radius or height on volume.",
        formula_sheet: "Cylinder: V = πr^2h, SA = 2πrh + 2πr^2 | Cone: V = (1/3)πr^2h | Sphere: V = (4/3)πr^3, SA = 4πr^2 | Cube: V = s^3, SA = 6s^2.",
        sort_order: 14,
      },
      {
        code: "GEO-02",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        title_uz: "Chiziqlar, burchaklar va uchburchaklar",
        title_en: "Lines, Angles & Triangle Properties",
        description_en: "Apply parallel lines cut by transversals, triangle angle sum (180°), exterior angle theorem, and similar triangles proportional side lengths.",
        desmos_tips_en: "Set up similar triangle proportions a/b = c/d directly into Desmos for immediate numerical solutions.",
        formula_sheet: "Triangle Sum: ∠A + ∠B + ∠C = 180° | Exterior Angle: ∠Ext = ∠A + ∠B (non-adjacent) | Similar Triangles: Corresponding sides proportional (a1/a2 = b1/b2 = c1/c2), Area ratio = (Scale factor)^2.",
        sort_order: 15,
      },
      {
        code: "GEO-03",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        title_uz: "To'g'ri burchakli uchburchak va trigonometriya",
        title_en: "Right Triangles & Trigonometry",
        description_en: "Master SOH CAH TOA, Pythagorean theorem (a^2 + b^2 = c^2), special right triangles (30-60-90, 45-45-90), and co-function complementary identities.",
        desmos_tips_en: "Ensure Desmos is set to DEG or RAD matching the problem. Type sin(x), cos(x), tan(x) directly.",
        formula_sheet: "Pythagorean: a^2 + b^2 = c^2 | SOH-CAH-TOA: sin = Opp/Hyp, cos = Adj/Hyp, tan = Opp/Adj | Co-function Theorem: sin(x) = cos(90° - x) ⇔ x + y = 90° | Pythagorean Identity: sin^2(θ) + cos^2(θ) = 1 | Radian: 180° = π rad.",
        sort_order: 16,
      },
      {
        code: "GEO-04",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        title_uz: "Aylanalar: tenglamalar, radius va burchaklar",
        title_en: "Circles: Equations, Sectors & Radians",
        description_en: "Analyze circle standard equation (x - h)^2 + (y - k)^2 = r^2, arc length s = rθ, and sector area A = 1/2 r^2 θ in degrees and radians.",
        desmos_tips_en: "Type the circle equation directly. Desmos plots the circle; click the center and boundary to verify coordinates and radius.",
        formula_sheet: "Circle Equation: (x - h)^2 + (y - k)^2 = r^2 (Center (h, k), Radius r) | Arc Length: s = (θ/360°) * 2πr = rθ (radians) | Sector Area: A = (θ/360°) * πr^2 = (1/2)r^2 θ (radians).",
        sort_order: 17,
      },

      // ---------------- VERBAL: INFORMATION & IDEAS ----------------
      {
        code: "ENG-CID",
        section: "READING_WRITING",
        domain: "Information and Ideas",
        title_uz: "Asosiy g'oya va matn tafsilotlari",
        title_en: "Central Ideas and Details",
        description_en: "Determine the central idea or overarching claim of a passage and extract specific factual details directly supported by the text.",
        desmos_tips_en: null,
        formula_sheet: "Rule: The correct choice must be 100% directly substantiated by textual evidence. Beware of extreme scope (always, never, purely) or true-in-real-life but unmentioned assertions.",
        sort_order: 18,
      },
      {
        code: "ENG-CDE",
        section: "READING_WRITING",
        domain: "Information and Ideas",
        title_uz: "Dalillardan foydalanish (Matnli va Grafik)",
        title_en: "Command of Evidence: Textual & Quantitative",
        description_en: "Identify pieces of textual or quantitative data (charts, graphs, tables) that directly support, undermine, or illustrate a stated scientific hypothesis.",
        desmos_tips_en: null,
        formula_sheet: "Strategy: 1. Identify the exact hypothesis being tested. 2. Verify which option provides the exact data matching the directional prediction (e.g. higher, lower, correlated). Eliminate neutral options.",
        sort_order: 19,
      },
      {
        code: "ENG-INF",
        section: "READING_WRITING",
        domain: "Information and Ideas",
        title_uz: "Mantiqiy xulosalar va dalilni yakunlash",
        title_en: "Logical Inferences & Argument Completion",
        description_en: "Synthesize premises across academic paragraphs to infer the unstated conclusion that most logically completes the author's argument.",
        desmos_tips_en: null,
        formula_sheet: "Golden Rule: Treat inference like an inevitable next mathematical step. Look for subtle contrast words (however, nonetheless) signaling that the final sentence must resolve the puzzle.",
        sort_order: 20,
      },

      // ---------------- VERBAL: CRAFT & STRUCTURE ----------------
      {
        code: "ENG-WIC",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        title_uz: "Kontekstdagi so'zlar (Lug'at)",
        title_en: "Words in Context (Advanced Vocabulary)",
        description_en: "Determine the precise meaning of advanced vocabulary words based on surrounding contextual clues, syntactic role, and connotations.",
        desmos_tips_en: null,
        formula_sheet: "Method: Predict your own simple word before looking at options. Substitute your prediction into the blank, then pick the exact synonym that matches tone and register.",
        sort_order: 21,
      },
      {
        code: "ENG-PUR",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        title_uz: "Matn strukturasi va ritorik maqsad",
        title_en: "Text Structure & Overall Rhetorical Purpose",
        description_en: "Analyze the overall rhetorical organization of a text and explain how individual sentences or paragraphs contribute to the author's primary goal.",
        desmos_tips_en: null,
        formula_sheet: "Structure Mapping: Sentence 1: [Background / Established View] -> Sentence 2: [New Finding / Pivot] -> Sentence 3: [Implications]. Pick the answer describing this transition.",
        sort_order: 22,
      },
      {
        code: "ENG-CRO",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        title_uz: "Matnlararo bog'liqlik (Dual Passages)",
        title_en: "Cross-Text Connections",
        description_en: "Synthesize dual passages to determine how the author of Text 2 would respond to a specific claim, finding, or methodology presented in Text 1.",
        desmos_tips_en: null,
        formula_sheet: "Synthesis Protocol: Summarize Text 1 stance (+/-). Summarize Text 2 stance (+/-). Find the exact overlap point where their methodologies or conclusions agree or clash.",
        sort_order: 23,
      },

      // ---------------- VERBAL: EXPRESSION OF IDEAS ----------------
      {
        code: "ENG-TRA",
        section: "READING_WRITING",
        domain: "Expression of Ideas",
        title_uz: "Mantiqiy bog'lovchilar va o'tish so'zlari",
        title_en: "Transitions & Logical Connectors",
        description_en: "Select the most logical transition word connecting two thoughts: Continuation/Cause (Consequently, Furthermore), Contrast (However, In contrast), or Exemplification (For instance).",
        desmos_tips_en: null,
        formula_sheet: "Categories: 1. Cause/Effect: Thus, Consequently, Therefore | 2. Contrast: However, Conversely, Nonetheless | 3. Addition: Furthermore, Moreover | 4. Example: For instance, Specifically.",
        sort_order: 24,
      },
      {
        code: "ENG-SYN",
        section: "READING_WRITING",
        domain: "Expression of Ideas",
        title_uz: "Ritorik sintez (Talaba qaydlari)",
        title_en: "Rhetorical Synthesis (Bullet-Point Notes)",
        description_en: "Synthesize research bullet points to achieve a specified rhetorical goal (e.g. emphasize a difference, introduce a discovery, or present a similarity).",
        desmos_tips_en: null,
        formula_sheet: "First-Order Rule: Read the GOAL in the question stem first. If the goal is 'emphasize the difference between X and Y', eliminate any option that only mentions X, only mentions Y, or states a similarity.",
        sort_order: 25,
      },

      // ---------------- VERBAL: STANDARD ENGLISH CONVENTIONS ----------------
      {
        code: "ENG-BOU",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        title_uz: "Tinish belgilari: Nuqtali vergul, Qo'shtirnoq, Ikki nuqta",
        title_en: "Boundaries: Semicolons, Colons & Dashes",
        description_en: "Apply standard punctuation conventions to demarcate independent clauses, parenthetical non-essential elements, and explanatory colons.",
        desmos_tips_en: null,
        formula_sheet: "Semicolon (;): [Independent] ; [Independent] | Colon (:): [100% Independent Sentence] : [Explanation/List] | Em-Dash Pair: [Subject] — [aside] — [Verb] | Comma Splice is fatal: NEVER [Indep] , [Indep] without FANBOYS.",
        sort_order: 26,
      },
      {
        code: "ENG-MOD",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        title_uz: "Aniqlovchilar joylashuvi (Dangling modifiers)",
        title_en: "Modifier Placement & Dangling Participles",
        description_en: "Ensure modifying phrases immediately precede or follow the specific noun they logically describe to eliminate dangling or misplaced modifiers.",
        desmos_tips_en: null,
        formula_sheet: "Dangling Modifier Rule: [Introductory Participial Phrase], [SUBJECT performing the action] ... | Example: 'Having spent decades in exile, the general returned.' (The general spent decades, not the country!).",
        sort_order: 27,
      },
      {
        code: "ENG-AGR",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        title_uz: "Ega-kesim moslashuvi va fe'l shakllari",
        title_en: "Form, Structure, and Sense (Agreement & Verbs)",
        description_en: "Enforce subject-verb agreement across intervening prepositional phrases, maintain consistent verb tenses, and match pronouns to their antecedents.",
        desmos_tips_en: null,
        formula_sheet: "Ignore Prepositional Phrases: 'The box [of antique silver ornaments] IS (not are) heavy.' | Compound Subject with 'and' is plural; with 'neither/nor' agrees with closer subject.",
        sort_order: 28,
      },
    ];

    for (const t of officialTopics) {
      await client.query(
        `INSERT INTO topics (id, section, domain, code, title_uz, title_en, description_uz, description_en, desmos_tips, desmos_tips_en, formula_sheet, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         ON CONFLICT (code) DO UPDATE SET
           section = EXCLUDED.section,
           domain = EXCLUDED.domain,
           title_uz = EXCLUDED.title_uz,
           title_en = EXCLUDED.title_en,
           description_uz = EXCLUDED.description_uz,
           description_en = EXCLUDED.description_en,
           desmos_tips = EXCLUDED.desmos_tips,
           desmos_tips_en = EXCLUDED.desmos_tips_en,
           formula_sheet = EXCLUDED.formula_sheet,
           sort_order = EXCLUDED.sort_order;`,
        [
          `top_${t.code.toLowerCase().replace("-", "_")}`,
          t.section,
          t.domain,
          t.code,
          t.title_uz,
          t.title_en,
          t.description_en, // sync
          t.description_en,
          t.desmos_tips_en,
          t.desmos_tips_en,
          t.formula_sheet,
          t.sort_order,
        ]
      );
    }
    console.log("✅ 28 Official Digital SAT Topics synchronized successfully!");

    await client.end();
  } catch (err) {
    console.error("Error in topic synchronization:", err);
    process.exit(1);
  }
}

run();
