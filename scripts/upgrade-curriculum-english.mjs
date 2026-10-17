import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://kaizo:2009@localhost:5432/vespera",
});

async function run() {
  const client = await pool.connect();
  try {
    console.log("Checking and upgrading topics schema...");
    await client.query(`
      ALTER TABLE topics ADD COLUMN IF NOT EXISTS description_en TEXT;
      ALTER TABLE topics ADD COLUMN IF NOT EXISTS desmos_tips_en TEXT;
    `);

    console.log("Columns verified. Now seeding all 28 official topics in pure English...");

    const topicsData = [
      // ================= MATH: ALGEBRA (4 topics) =================
      {
        code: "ALG-01",
        section: "MATH",
        domain: "Algebra",
        title_en: "Linear Equations in One Variable",
        description_en: "Master solving multi-step linear equations, determining zero, unique, or infinitely many solutions, and modeling contextual word problems.",
        desmos_tips_en: "Type the full equation directly into Desmos (e.g. 4x + 12 = 36). Desmos plots a vertical line whose x-value is the exact root!",
        sort_order: 1,
      },
      {
        code: "ALG-02",
        section: "MATH",
        domain: "Algebra",
        title_en: "Linear Equations in Two Variables & Graphs",
        description_en: "Analyze slope-intercept form (y = mx + b), standard form (Ax + By = C), rate of change, y-intercepts, and parallel vs. perpendicular lines.",
        desmos_tips_en: "Plot y = mx + b and add sliders for 'm' and 'b' to dynamically observe rotation, steepness, and vertical shifts.",
        sort_order: 2,
      },
      {
        code: "ALG-03",
        section: "MATH",
        domain: "Algebra",
        title_en: "Systems of Two Linear Equations",
        description_en: "Solve simultaneous 2x2 linear systems via substitution and elimination. Detect parallel lines (no solution) and coincident lines (infinite solutions).",
        desmos_tips_en: "Enter both equations on lines 1 and 2. Click the intersection point to instantly display the exact (x, y) coordinates.",
        sort_order: 3,
      },
      {
        code: "ALG-04",
        section: "MATH",
        domain: "Algebra",
        title_en: "Linear Inequalities in One or Two Variables",
        description_en: "Interpret solution regions on the Cartesian coordinate plane, test boundary points, and solve compound inequality systems.",
        desmos_tips_en: "Type inequalities like y >= 2x - 4 directly. Desmos shades the viable solution region; test given answer choices to verify if they fall in the shaded area.",
        sort_order: 4,
      },

      // ================= MATH: ADVANCED MATH (5 topics) =================
      {
        code: "ADV-01",
        section: "MATH",
        domain: "Advanced Math",
        title_en: "Equivalent Expressions & Polynomial Operations",
        description_en: "Factor polynomials, apply difference of squares, expand algebraic terms, and simplify complex rational fractions.",
        desmos_tips_en: "Enter the original expression on line 1 and the answer choice on line 2. If the graphs overlap identically, they are 100% equivalent!",
        sort_order: 5,
      },
      {
        code: "ADV-02",
        section: "MATH",
        domain: "Advanced Math",
        title_en: "Nonlinear Functions & Quadratic Equations",
        description_en: "Solve quadratics by factoring, quadratic formula, and completing the square. Analyze vertex form y = a(x - h)^2 + k and the discriminant D = b^2 - 4ac.",
        desmos_tips_en: "Type any quadratic into Desmos and click the vertex or x-intercepts. Desmos displays grey dot markers for instant coordinate inspection.",
        sort_order: 6,
      },
      {
        code: "ADV-03",
        section: "MATH",
        domain: "Advanced Math",
        title_en: "Exponential Functions & Growth/Decay Models",
        description_en: "Construct exponential models y = a(b)^(t/k). Differentiate between linear constant growth and percentage-based exponential expansion.",
        desmos_tips_en: "Plot y = a(b)^x and verify values from given problem tables by typing x-coordinates directly into a Desmos table.",
        sort_order: 7,
      },
      {
        code: "ADV-04",
        section: "MATH",
        domain: "Advanced Math",
        title_en: "Radicals & Rational Exponents",
        description_en: "Manipulate fractional exponents x^(a/b) = b-root(x^a), simplify radical expressions, and eliminate extraneous solutions from radical equations.",
        desmos_tips_en: "Substitute a convenient test integer (such as x = 2 or x = 3) into radical expressions to compare numeric outputs with answer choices.",
        sort_order: 8,
      },
      {
        code: "ADV-05",
        section: "MATH",
        domain: "Advanced Math",
        title_en: "Nonlinear Equation Systems",
        description_en: "Solve intersections between a line and a parabola, circle, or hyperbola, determining the exact number of intersection coordinates.",
        desmos_tips_en: "Plot the line and curve simultaneously. Desmos highlights all intersection points with clickable grey markers.",
        sort_order: 9,
      },

      // ================= MATH: PROBLEM SOLVING & DATA ANALYSIS (4 topics) =================
      {
        code: "DAT-01",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        title_en: "Ratios, Rates, Proportions & Unit Conversions",
        description_en: "Solve unit rate problems, dimensional analysis across measurement systems, and multi-step scale conversions.",
        desmos_tips_en: "Use Desmos as a high-speed arithmetic engine with conversion ratios multiplied in parenthetical fractions.",
        sort_order: 10,
      },
      {
        code: "DAT-02",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        title_en: "Percentages & Percent Change",
        description_en: "Calculate percent increase, percent decrease, successive discounts, and base value reconstruction from final amounts.",
        desmos_tips_en: "For successive percentage changes, multiply factors: e.g., 20% discount followed by 15% discount is calculated as 1 - (0.80 * 0.85).",
        sort_order: 11,
      },
      {
        code: "DAT-03",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        title_en: "One-Variable Data: Distributions & Statistics",
        description_en: "Interpret mean, median, mode, range, standard deviation, and evaluate the effect of outliers on skewness.",
        desmos_tips_en: "Type mean([list]) or stats([list]) into Desmos to instantly compute 5-number summaries, quartiles, and medians.",
        sort_order: 12,
      },
      {
        code: "DAT-04",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        title_en: "Two-Variable Data: Scatterplots & Line of Best Fit",
        description_en: "Analyze linear, quadratic, and exponential trendlines, calculate residuals, and evaluate correlation coefficients.",
        desmos_tips_en: "Create a table with x1 and y1, then type y1 ~ m*x1 + b. Desmos computes the exact regression parameters m, b, and r^2 in milliseconds!",
        sort_order: 13,
      },

      // ================= MATH: GEOMETRY & TRIGONOMETRY (4 topics) =================
      {
        code: "GEO-01",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        title_en: "Area, Perimeter & Volume Formulas",
        description_en: "Apply formulas for rectangles, triangles, circles, cylinders, cones, spheres, and prisms from the official SAT Reference Sheet.",
        desmos_tips_en: "Store formulas with variable names in Desmos (e.g. V = pi * r^2 * h) and assign slider values to evaluate composite solids.",
        sort_order: 14,
      },
      {
        code: "GEO-02",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        title_en: "Lines, Angles & Triangle Properties",
        description_en: "Parallel lines cut by transversals, vertical angles, interior angle sums, isosceles triangle theorems, and triangle inequality.",
        desmos_tips_en: "Remember: Interior angles of any n-sided polygon sum to (n - 2) * 180 degrees.",
        sort_order: 15,
      },
      {
        code: "GEO-03",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        title_en: "Right Triangles & Trigonometry",
        description_en: "Pythagorean Theorem, special right triangles (30-60-90 and 45-45-90), SOH CAH TOA, and co-function identity sin(x) = cos(90 - x).",
        desmos_tips_en: "Ensure Desmos angle mode is set to 'Degrees' (wrench icon) when evaluating sin, cos, and tan for right triangles.",
        sort_order: 16,
      },
      {
        code: "GEO-04",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        title_en: "Circles: Equations, Sectors & Radians",
        description_en: "Standard circle equation (x - h)^2 + (y - k)^2 = r^2, arc length s = r*theta, sector area A = 0.5*r^2*theta, and degree-to-radian conversion.",
        desmos_tips_en: "Type the circle equation directly into Desmos to immediately verify center (h, k) and calculate radius r = sqrt(RHS).",
        sort_order: 17,
      },

      // ================= VERBAL: READING & WRITING (11 topics) =================
      {
        code: "ENG-TRA",
        section: "READING_WRITING",
        domain: "Expression of Ideas",
        title_en: "Transitions & Logical Connectors",
        description_en: "Identify logical relationships between sentences: addition (furthermore), contrast (however, conversely), cause-and-effect (accordingly, therefore), or illustration (specifically).",
        desmos_tips_en: null,
        sort_order: 18,
      },
      {
        code: "ENG-SYN",
        section: "READING_WRITING",
        domain: "Expression of Ideas",
        title_en: "Rhetorical Synthesis (Bullet-Point Notes)",
        description_en: "Synthesize research notes to achieve a specified rhetorical goal: introduce a person, emphasize a contrast, or provide an illustrative example.",
        desmos_tips_en: null,
        sort_order: 19,
      },
      {
        code: "ENG-BOU",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        title_en: "Boundaries: Semicolons, Colons & Dashes",
        description_en: "Master punctuation rules separating independent clauses, colon usage (must follow a full independent clause), and em-dash parenthetical insertions.",
        desmos_tips_en: null,
        sort_order: 20,
      },
      {
        code: "ENG-MOD",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        title_en: "Modifier Placement & Dangling Participles",
        description_en: "Ensure introductory participial and prepositional phrases immediately precede the exact noun they are logically describing.",
        desmos_tips_en: null,
        sort_order: 21,
      },
      {
        code: "ENG-SVA",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        title_en: "Subject-Verb & Pronoun-Antecedent Agreement",
        description_en: "Identify the true grammatical subject separated by prepositional phrases, and match singular/plural verb conjugations and pronouns.",
        desmos_tips_en: null,
        sort_order: 22,
      },
      {
        code: "ENG-WIC",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        title_en: "Words in Context (Advanced Vocabulary)",
        description_en: "Determine the precise academic meaning of high-register words based on contextual clues, nuance, and secondary connotations.",
        desmos_tips_en: null,
        sort_order: 23,
      },
      {
        code: "ENG-PUR",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        title_en: "Text Structure & Overall Rhetorical Purpose",
        description_en: "Analyze the organizational progression of a passage and define the function of underlined sentences in developing the author's argument.",
        desmos_tips_en: null,
        sort_order: 24,
      },
      {
        code: "ENG-CXP",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        title_en: "Cross-Text Connections (Dual Passages)",
        description_en: "Compare perspectives, claims, methodologies, and critiques between two contrasting author viewpoints on a shared phenomenon.",
        desmos_tips_en: null,
        sort_order: 25,
      },
      {
        code: "ENG-CTE",
        section: "READING_WRITING",
        domain: "Information and Ideas",
        title_en: "Central Ideas & Textual Details",
        description_en: "Synthesize the primary thesis of academic passages and extract explicit factual evidence without over-interpreting.",
        desmos_tips_en: null,
        sort_order: 26,
      },
      {
        code: "ENG-CDE",
        section: "READING_WRITING",
        domain: "Information and Ideas",
        title_en: "Command of Evidence: Textual & Quantitative",
        description_en: "Select supporting or weakening evidence for a hypothesis from passage arguments or data tables, graphs, and charts.",
        desmos_tips_en: null,
        sort_order: 27,
      },
      {
        code: "ENG-INF",
        section: "READING_WRITING",
        domain: "Information and Ideas",
        title_en: "Logical Inferences & Argument Completion",
        description_en: "Complete the final thought of an academic passage by deducing the inevitable conclusion justified strictly by the premises.",
        desmos_tips_en: null,
        sort_order: 28,
      },
    ];

    for (const t of topicsData) {
      await client.query(
        `INSERT INTO topics (id, section, domain, code, title_uz, title_en, description_uz, description_en, desmos_tips, desmos_tips_en, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (code) DO UPDATE SET
           section = EXCLUDED.section,
           domain = EXCLUDED.domain,
           title_en = EXCLUDED.title_en,
           description_en = EXCLUDED.description_en,
           desmos_tips_en = EXCLUDED.desmos_tips_en,
           sort_order = EXCLUDED.sort_order;`,
        [
          `t_${t.code.toLowerCase().replace("-", "_")}`,
          t.section,
          t.domain,
          t.code,
          t.title_en,
          t.title_en,
          t.description_en,
          t.description_en,
          t.desmos_tips_en || "",
          t.desmos_tips_en || "",
          t.sort_order,
        ]
      );
    }

    console.log(`Successfully updated ${topicsData.length} topics with pristine English curriculum taxonomy!`);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);
