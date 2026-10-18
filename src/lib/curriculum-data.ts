export const VALID_MATH_DOMAINS = [
  "Algebra",
  "Advanced Math",
  "Problem Solving & Data Analysis",
  "Geometry & Trigonometry",
] as const;

export const VALID_VERBAL_DOMAINS = [
  "Craft and Structure",
  "Information and Ideas",
  "Standard English Conventions",
  "Expression of Ideas",
] as const;

export function isMathDomain(domain?: string | null): boolean {
  if (!domain) return false;
  const d = domain.trim().toLowerCase();
  return (
    d.includes("algebra") ||
    d.includes("advanced") ||
    d.includes("geometry") ||
    d.includes("trig") ||
    d.includes("problem solving") ||
    d.includes("data analysis")
  );
}

export function isVerbalDomain(domain?: string | null): boolean {
  if (!domain) return false;
  const d = domain.trim().toLowerCase();
  return (
    d.includes("expression") ||
    d.includes("craft") ||
    d.includes("structure") ||
    d.includes("convention") ||
    d.includes("standard english") ||
    (d.includes("information") && d.includes("ideas"))
  );
}

export interface TopicDeepDive {
  code: string;
  section: "MATH" | "READING_WRITING";
  domain: string;
  title_en: string;
  title_uz: string;
  collegePandaChapter: string;
  yieldTier: "HIGHEST YIELD" | "HIGH YIELD" | "CORE FOUNDATION";
  frequencyPercent: string;
  description_en: string;
  description_uz: string;
  firstPrinciples: {
    coreConcept: string;
    uzbekSummary: string;
    keyPoints: string[];
  };
  traps: {
    title: string;
    explanation: string;
    avoidTip: string;
  }[];
  formulas: {
    name: string;
    latex: string;
    explanation: string;
  }[];
  desmosBypass?: {
    title: string;
    keystrokes: string;
    explanation: string;
    sampleEquation?: string;
  };
  diagramKey?: string;
  satashkentReference?: string;
  satashkentProTip?: string;
}

export const OFFICIAL_TOPICS_DATA: Record<string, TopicDeepDive> = {
  // ==========================================
  // MATH: ALGEBRA (ALG-01 to ALG-04)
  // ==========================================
  "ALG-01": {
    code: "ALG-01",
    section: "MATH",
    domain: "Algebra",
    title_en: "Linear Equations in One Variable",
    title_uz: "Bir o'zgaruvchili chiziqli tenglamalar",
    collegePandaChapter: "College Panda Math: Ch 8 (Manipulating & Solving Equations), Ch 9 (More Equation Solving Strategies), Ch 20 (Absolute Value)",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "12–15% of Math",
    description_en: "Master multi-step algebraic isolation, word problem modeling, balance scale logic, absolute value constraints, and zero/infinite solutions criteria.",
    description_uz: "Bir o'zgaruvchili ko'p bosqichli chiziqli tenglamalar, matnli masalalarni tenglamaga aylantirish, modul tenglamalari va yechimlar soni (0, 1 yoki cheksiz) mezonlari.",
    firstPrinciples: {
      coreConcept: "An equation represents a balanced scale. Any operation applied to one side must be identically applied to the other to preserve the equality invariant. A linear equation ax + b = c always yields exactly one root unless the variable vanishes.",
      uzbekSummary: "Tenglama – bu tarozining ikki pallasidir. Bir tomonga qilingan har bir arifmetik amal ikkinchi tomonga ham aynan bajarilishi shart. Agar x yo'qolib ketsa, natija chinlikka qarab cheksiz yoki 0 ta yechim beradi.",
      keyPoints: [
        "One unique solution: ax = b where a ≠ 0 gives x = b/a.",
        "No solution: 0x = c (where c ≠ 0), e.g. 5 = 9 (impossible equality).",
        "Infinitely many solutions: 0x = 0, both sides simplify to the exact identical expression.",
        "Absolute value |ax + b| = c splits into ax + b = c OR ax + b = -c (provided c ≥ 0).",
      ],
    },
    traps: [
      {
        title: "Absolute Value Negativity Trap",
        explanation: "If an equation simplifies to |2x - 7| = -4, test-takers often rush to solve 2x - 7 = -4 and 2x - 7 = 4, but the absolute value of any real number cannot be negative.",
        avoidTip: "Whenever an absolute value is isolated, verify that the opposite side is ≥ 0 before splitting into cases. If negative, immediately conclude 0 solutions.",
      },
      {
        title: "Negative Sign Distribution Slip",
        explanation: "In expressions like 5 - 2(3x - 4), students frequently write 5 - 6x - 8 instead of 5 - 6x + 8.",
        avoidTip: "Treat the minus sign as distributing (-2) across both terms inside parentheses.",
      },
      {
        title: "Zero vs Infinite Solutions Confusion",
        explanation: "0 = 0 means infinitely many solutions (identity), while 0x = 7 means no solution (contradiction).",
        avoidTip: "If all variables cancel out: True statement (4 = 4) = Infinite; False statement (0 = 8) = No solution.",
      },
    ],
    formulas: [
      {
        name: "General Linear Form",
        latex: "ax + b = c \\implies x = \\frac{c - b}{a} \\quad (a \\ne 0)",
        explanation: "Subtract constant term b, then divide by coefficient a.",
      },
      {
        name: "No Solution Condition",
        latex: "0 \\cdot x = c \\quad (c \\ne 0) \\implies \\emptyset",
        explanation: "Variables cancel leaving an impossible mathematical contradiction.",
      },
      {
        name: "Infinitely Many Solutions",
        latex: "0 \\cdot x = 0 \\implies x \\in \\mathbb{R}",
        explanation: "Variables cancel leaving a mathematical identity true for all real numbers.",
      },
      {
        name: "Absolute Value Split",
        latex: "|ax + b| = c \\iff ax + b = c \\quad \\text{or} \\quad ax + b = -c \\quad (c \\ge 0)",
        explanation: "Distance from origin equals c in either positive or negative direction.",
      },
    ],
    desmosBypass: {
      title: "Vertical Line Root Reveal",
      keystrokes: "Type equation directly (e.g., 4(x - 3) + 7 = 2x + 19)",
      explanation: "Desmos automatically graphs a vertical dashed line at the exact solution x = k. Hover or click the x-axis intercept to read the exact root instantaneously without manual algebra.",
      sampleEquation: "4(x - 3) + 7 = 2x + 19",
    },
    diagramKey: "balance_scale",
  },

  "ALG-02": {
    code: "ALG-02",
    section: "MATH",
    domain: "Algebra",
    title_en: "Linear Equations in Two Variables & Graphs",
    title_uz: "Ikki o'zgaruvchili chiziqli tenglamalar va grafiklar",
    collegePandaChapter: "College Panda Math: Ch 14 (Lines), Ch 15 (Interpreting Linear Models)",
    yieldTier: "HIGHEST YIELD",
    frequencyPercent: "16–20% of Math",
    description_en: "Analyze Cartesian coordinates, slope-intercept form (y = mx + b), standard form (Ax + By = C), parallel vs perpendicular slope invariants, and rate of change word problem models.",
    description_uz: "Dekart koordinatalar tekisligi, burchak koeffitsienti (y = mx + b), parallel va perpendikulyar to'g'ri chiziqlar qoidalari hamda matnli masalalarda birlik stavka ma'nosi.",
    firstPrinciples: {
      coreConcept: "A line is the geometric locus of points with a constant rate of change (Rise over Run). In the physical world, slope m represents the unit rate (cost per unit time, speed per hour), while b represents the initial state or fixed startup fee.",
      uzbekSummary: "To'g'ri chiziq – o'zgarish tezligi (koffitsient m) doimiy bo'lgan nuqtalar to'plamidir. Amaliy masalalarda m – birlik stavka (masalan, har bir soat narxi), b esa boshlang'ich to'lovdir.",
      keyPoints: [
        "Slope m = Δy / Δx = (y2 - y1) / (x2 - x1).",
        "Perpendicular lines: m1 * m2 = -1 (slopes are opposite reciprocals: flip fraction and change sign).",
        "Parallel lines: m1 = m2 with distinct y-intercepts.",
        "Standard form Ax + By = C: Slope = -A/B, y-intercept = C/B, x-intercept = C/A.",
      ],
    },
    traps: [
      {
        title: "Perpendicular Incomplete Inversion",
        explanation: "Students change the sign (+3/4 to -3/4) OR flip the fraction (3/4 to 4/3), but forget to do BOTH.",
        avoidTip: "Always execute both steps: Negate AND Reciprocate: +m becomes -1/m (e.g. +2/5 becomes -5/2).",
      },
      {
        title: "Standard Form Slope Sign Error",
        explanation: "In 3x + 4y = 12, students mistakenly think slope is +3/4 or +3. In reality, isolating y yields y = -(3/4)x + 3, so slope is -3/4.",
        avoidTip: "Memorize the direct formula: For Ax + By = C, Slope m = -A/B.",
      },
      {
        title: "Word Problem Intercept vs Slope Inversion",
        explanation: "A taxi charges $5 flat fee plus $2.50 per mile. Students often write y = 5x + 2.50 instead of y = 2.50x + 5.",
        avoidTip: "The number attached to words like 'per', 'each', 'every' is ALWAYS the slope m. The one-time fee is b.",
      },
    ],
    formulas: [
      {
        name: "Slope-Intercept Form",
        latex: "y = mx + b",
        explanation: "m = slope (rate of change), b = y-intercept (value at x = 0).",
      },
      {
        name: "Slope from Two Points",
        latex: "m = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}",
        explanation: "Vertical change (Rise) divided by horizontal change (Run).",
      },
      {
        name: "Perpendicular Slope Rule",
        latex: "m_\\perp = -\\frac{1}{m} \\iff m_1 \\cdot m_2 = -1",
        explanation: "Slopes are negative reciprocals: perpendicular vectors produce a 90° angle.",
      },
      {
        name: "Standard Form Conversion",
        latex: "Ax + By = C \\implies m = -\\frac{A}{B}, \\quad y_{\\text{int}} = \\frac{C}{B}, \\quad x_{\\text{int}} = \\frac{C}{A}",
        explanation: "Quick calculation of key invariants directly from standard form coefficients.",
      },
    ],
    desmosBypass: {
      title: "Direct Intercept and Slope Scanner",
      keystrokes: "Enter equation directly: 3x - 5y = 15",
      explanation: "Desmos immediately renders the line. Click on the gray intercept dots to read both the x-intercept (5, 0) and y-intercept (0, -3) in under 3 seconds without rearranging algebra.",
      sampleEquation: "3x - 5y = 15",
    },
    diagramKey: "slope_intercept",
  },

  "ALG-03": {
    code: "ALG-03",
    section: "MATH",
    domain: "Algebra",
    title_en: "Systems of Two Linear Equations",
    title_uz: "Chiziqli tenglamalar sistemasi",
    collegePandaChapter: "College Panda Math: Ch 10 (Systems of Equations)",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "10–12% of Math",
    description_en: "Solve simultaneous 2x2 linear systems via substitution and elimination. Master conditions for exactly one solution, no solution (parallel lines), and infinitely many solutions (coincident lines).",
    description_uz: "Tenglamalar sistemasini o'rniga qo'yish va qo'shish usuli bilan yechish. 1 ta yechim, 0 ta yechim (parallel to'g'ri chiziqlar) va cheksiz ko'p yechim mezonlari.",
    firstPrinciples: {
      coreConcept: "A system of two linear equations corresponds geometrically to two lines on the Cartesian plane. Their solution set is their geometric intersection: 1 point if they cross, 0 points if they are parallel, or infinitely many points if they coincide.",
      uzbekSummary: "Ikki chiziqli tenglama sistemasi geometrik jihatdan ikkita to'g'ri chiziqning kesishish nuqtalarini ifodalaydi. Agar chiziqlar parallel bo'lsa yechim yo'q, ustma-ust tushsa cheksiz ko'p yechim mavjud.",
      keyPoints: [
        "One Unique Solution: Slopes are unequal (A1/A2 ≠ B1/B2).",
        "No Solution: Slopes are identical but y-intercepts differ (A1/A2 = B1/B2 ≠ C1/C2). Lines are parallel.",
        "Infinitely Many Solutions: Both equations are proportional scalar multiples (A1/A2 = B1/B2 = C1/C2). Lines are identical.",
      ],
    },
    traps: [
      {
        title: "No Solution vs Infinite Solutions Inversion",
        explanation: "Students equate the slope ratio and then forget to check the constant term ratio.",
        avoidTip: "For 'No Solution', the constant ratio must NOT match (parallel). For 'Infinite Solutions', all three ratios must match identically.",
      },
      {
        title: "Solving for x When Problem Asked for x + y",
        explanation: "College Board frequently asks for 2x - y or x + y. Students waste minutes finding x and y separately.",
        avoidTip: "Check if simply adding or subtracting the two given equations directly reveals the requested expression!",
      },
    ],
    formulas: [
      {
        name: "Unique Solution Condition",
        latex: "\\frac{A_1}{A_2} \\ne \\frac{B_1}{B_2}",
        explanation: "Lines have different slopes and intersect at exactly one coordinate (x, y).",
      },
      {
        name: "No Solution (Parallel Lines)",
        latex: "\\frac{A_1}{A_2} = \\frac{B_1}{B_2} \\ne \\frac{C_1}{C_2}",
        explanation: "Equal slopes produce parallel lines that never cross.",
      },
      {
        name: "Infinitely Many Solutions (Coincident Lines)",
        latex: "\\frac{A_1}{A_2} = \\frac{B_1}{B_2} = \\frac{C_1}{C_2}",
        explanation: "Both equations describe the exact same geometric line.",
      },
    ],
    desmosBypass: {
      title: "Instant Point of Intersection Click",
      keystrokes: "Line 1: 2x + 3y = 12 | Line 2: 5x - y = 13",
      explanation: "Desmos graphs both lines simultaneously. Click on their intersection point to instantly copy the exact (x, y) coordinates with zero algebraic substitution.",
      sampleEquation: "2x + 3y = 12",
    },
    diagramKey: "systems_classification",
  },

  "ALG-04": {
    code: "ALG-04",
    section: "MATH",
    domain: "Algebra",
    title_en: "Linear Inequalities in One or Two Variables",
    title_uz: "Chiziqli tengsizliklar va sohalar",
    collegePandaChapter: "College Panda Math: Ch 11 (Inequalities)",
    yieldTier: "CORE FOUNDATION",
    frequencyPercent: "5–7% of Math",
    description_en: "Interpret solution regions (half-planes) on the coordinate plane, boundary lines (solid vs dashed), and test points for inequality systems.",
    description_uz: "Koordinata tekisligida yarim-tekisliklar, chegaraviy chiziqlar (uzluksiz yoki shtrixli) va tengsizliklar sistemasini tekshirish.",
    firstPrinciples: {
      coreConcept: "An inequality divides the Cartesian plane into two regions by a boundary line. Points in the shaded region satisfy the relationship. Strict inequalities (<, >) exclude the boundary (dashed line), while non-strict (≤, ≥) include it (solid line).",
      uzbekSummary: "Tengsizlik tekislikni chegara to'g'ri chiziq orqali ikkita sohaga ajratadi. Qat'iy tengsizliklar chegarani o'z ichiga olmaydi (shtrixli chiziq), noqat'iy tengsizliklar esa chegarani o'z ichiga oladi (tutash chiziq).",
      keyPoints: [
        "Multiply or divide by a negative number: FLIP the inequality sign (< becomes >, etc.).",
        "Dashed line for < and >; Solid line for ≤ and ≥.",
        "Test point method: plug (0, 0) into inequality to verify which side of the boundary to shade.",
      ],
    },
    traps: [
      {
        title: "Negative Multiplication Sign Flip Forgetfulness",
        explanation: "-3x ≥ 12 becomes x ≥ -4 instead of x ≤ -4.",
        avoidTip: "Every time you divide or multiply by a minus sign, immediately invert the direction of the inequality symbol.",
      },
      {
        title: "Boundary Point Inclusion in Strict Inequality",
        explanation: "If y > 2x + 1, a point lying exactly on y = 2x + 1 is NOT a solution.",
        avoidTip: "Strict inequalities (<, >) cannot have points on the boundary line itself.",
      },
    ],
    formulas: [
      {
        name: "Inequality Sign Inversion Rule",
        latex: "ax \\le b \\quad \\text{with } a < 0 \\implies x \\ge \\frac{b}{a}",
        explanation: "Dividing by a negative flips the relational ordering.",
      },
      {
        name: "Slope-Intercept Region",
        latex: "y \\ge mx + b \\implies \\text{Shaded region ABOVE the line}",
        explanation: "Values of y greater than the line boundary.",
      },
    ],
    desmosBypass: {
      title: "Visual Shading Overlay",
      keystrokes: "Type: y >= 2x - 3 and y < -x + 5",
      explanation: "Desmos shades each inequality in a distinct color. The overlapping shaded region represents the system's simultaneous solution set. Test given answer choices to see if they lie within the double-shaded zone.",
      sampleEquation: "y >= 2x - 3",
    },
  },

  // ==========================================
  // MATH: ADVANCED MATH (ADV-01 to ADV-05)
  // ==========================================
  "ADV-01": {
    code: "ADV-01",
    section: "MATH",
    domain: "Advanced Math",
    title_en: "Equivalent Expressions & Polynomial Operations",
    title_uz: "Ekvivalent ifodalar va Ko'phadlar",
    collegePandaChapter: "College Panda Math: Ch 18 (Synthetic Division), Ch 19 (Complex Numbers)",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "10–12% of Math",
    description_en: "Factor polynomials, apply difference of squares, manipulate complex numbers (i^2 = -1), and apply the Polynomial Remainder Theorem.",
    description_uz: "Ko'phadlarni ko'paytuvchilarga ajratish, kvadratlar ayirmasi, kompleks sonlar amallari (i^2 = -1) va qoldiqli bo'lish teoremasi.",
    firstPrinciples: {
      coreConcept: "Two expressions are equivalent if and only if they evaluate to the exact same value for every permissible domain input. Factoring, expanding, and algebraic manipulation rearrange form without changing identity.",
      uzbekSummary: "Ikki ifoda ekvivalent degani – o'zgaruvchining har qanday qiymatida ular aynan bir xil sonli natija beradi degani. Ko'paytuvchilarga ajratish faqat ifodaning shaklini o'zgartiradi.",
      keyPoints: [
        "Difference of squares: a^2 - b^2 = (a - b)(a + b).",
        "Perfect square trinomial: (a ± b)^2 = a^2 ± 2ab + b^2 (never forget 2ab!).",
        "Imaginary unit powers cycle every 4: i^1 = i, i^2 = -1, i^3 = -i, i^4 = 1.",
        "Remainder Theorem: When polynomial P(x) is divided by (x - c), the remainder is P(c).",
      ],
    },
    traps: [
      {
        title: "Dropping the Middle Term in Squaring",
        explanation: "Writing (x + 5)^2 = x^2 + 25 instead of x^2 + 10x + 25.",
        avoidTip: "Always use FOIL or remember the 2ab middle term when squaring any binomial.",
      },
      {
        title: "Complex Conjugate Denominator Rationalization",
        explanation: "Dividing by 3 + 2i: students multiply by 3 + 2i instead of conjugate 3 - 2i.",
        avoidTip: "To clear imaginary units from a denominator, multiply top and bottom by the complex conjugate (a - bi).",
      },
    ],
    formulas: [
      {
        name: "Difference of Squares",
        latex: "a^2 - b^2 = (a - b)(a + b)",
        explanation: "Universal factoring invariant for quadratic expressions.",
      },
      {
        name: "Complex Number Cycle",
        latex: "i = \\sqrt{-1}, \\quad i^2 = -1, \\quad i^3 = -i, \\quad i^4 = 1",
        explanation: "Powers of i repeat in a mod-4 cyclical pattern.",
      },
      {
        name: "Remainder Theorem",
        latex: "P(x) = (x - c)Q(x) + R \\implies R = P(c)",
        explanation: "Evaluating P(c) instantly gives the remainder when dividing by (x - c).",
      },
    ],
    desmosBypass: {
      title: "Graph Overlap Identity Verification",
      keystrokes: "Line 1: y = original expression | Line 2: y = answer choice (A)",
      explanation: "If choice (A) is algebraically equivalent to the original expression, their graphed curves will overlap 100% identically across the entire plane.",
      sampleEquation: "y = (2x - 3)(x + 5)",
    },
  },

  "ADV-02": {
    code: "ADV-02",
    section: "MATH",
    domain: "Advanced Math",
    title_en: "Nonlinear Functions & Quadratic Equations",
    title_uz: "Kvadrat tenglamalar va parabolalar",
    collegePandaChapter: "College Panda Math: Ch 17 (Quadratics), Ch 13 (Minimum & Maximum Word Problems)",
    yieldTier: "HIGHEST YIELD",
    frequencyPercent: "15–18% of Math",
    description_en: "Master quadratic forms (standard, vertex, factored), discriminant analysis (D = b^2 - 4ac), vertex coordinates x = -b/(2a), and Vieta's root formulas.",
    description_uz: "Kvadrat tenglamalar shakllari (standart, uchi va ko'paytuvchilar), diskriminant tahlili (D = b^2 - 4ac), parabola uchi koordinatalari va Viyet teoremalari.",
    firstPrinciples: {
      coreConcept: "A quadratic represents a parabola whose axis of symmetry passes through x = -b/(2a). The discriminant D = b^2 - 4ac dictates whether the curve crosses the x-axis twice, touches tangentially once, or never crosses.",
      uzbekSummary: "Kvadrat funksiya – bu simmetriya o'qi x = -b/(2a) da bo'lgan parabola. Diskriminant D = b^2 - 4ac parabola Ox o'qini 2 marta kesib o'tishini, 1 marta urinishini yoki umuman kesmasligini belgilaydi.",
      keyPoints: [
        "Vertex x-coordinate is the midpoint of the zeros: x_v = -b/(2a).",
        "Vertex form: y = a(x - h)^2 + k, vertex is exactly at (h, k).",
        "Discriminant D > 0: 2 distinct real roots; D = 0: 1 real root (vertex on axis); D < 0: 0 real roots.",
        "Vieta's Formulas: Sum of roots = -b/a, Product of roots = c/a.",
      ],
    },
    traps: [
      {
        title: "Vertex Form Horizontal Shift Sign Reversal",
        explanation: "In y = 3(x - 4)^2 + 5, students think the vertex is at (-4, 5) rather than (+4, 5).",
        avoidTip: "The formula is (x - h)^2. Therefore (x - 4) means h = +4. Signs inside parentheses are reversed.",
      },
      {
        title: "Asking for Max/Min Value vs x-coordinate",
        explanation: "If a problem asks 'What is the maximum height?', students give the x-value (time) rather than the y-value (height).",
        avoidTip: "Maximum value = y-coordinate (k). When the maximum occurs = x-coordinate (h).",
      },
    ],
    formulas: [
      {
        name: "Quadratic Formula",
        latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        explanation: "Universal solution for ax^2 + bx + c = 0.",
      },
      {
        name: "Discriminant Invariants",
        latex: "\\Delta = b^2 - 4ac \\quad (\\Delta > 0 \\implies 2, \\quad \\Delta = 0 \\implies 1, \\quad \\Delta < 0 \\implies 0)",
        explanation: "Number of real roots and geometric x-axis intersections.",
      },
      {
        name: "Vertex Coordinates",
        latex: "h = -\\frac{b}{2a}, \\quad k = c - \\frac{b^2}{4a}",
        explanation: "Axis of symmetry and extreme minimum/maximum value.",
      },
      {
        name: "Vieta's Formulas",
        latex: "x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 x_2 = \\frac{c}{a}",
        explanation: "Calculate sum or product of roots without solving.",
      },
    ],
    desmosBypass: {
      title: "Gray Vertex & Zero Tap",
      keystrokes: "Type quadratic: y = -2x^2 + 8x + 10",
      explanation: "Desmos graphs the parabola and automatically highlights the vertex and x-intercepts with gray dots. Click any dot to reveal exact coordinates immediately.",
      sampleEquation: "y = -2x^2 + 8x + 10",
    },
    diagramKey: "quadratic_parabola",
  },

  "ADV-03": {
    code: "ADV-03",
    section: "MATH",
    domain: "Advanced Math",
    title_en: "Exponential Functions & Growth/Decay Models",
    title_uz: "Eksponentsial funksiyalar va modellar",
    collegePandaChapter: "College Panda Math: Ch 3 (Exponential & Linear Growth), Ch 7 (Constructing Models)",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "8–10% of Math",
    description_en: "Construct exponential models y = a * b^(t/k). Differentiate between constant linear growth and proportional compound expansion, and interpret percent growth/decay rates.",
    description_uz: "Eksponentsial o'sish va kamayish modellari y = a * b^(t/k). Chiziqli (doimiy qo'shilish) va eksponentsial (foizli ko'payish) o'rtasidagi farqni aniqlash.",
    firstPrinciples: {
      coreConcept: "Linear models add a constant quantity per unit of time (y = mx + b). Exponential models multiply by a constant factor per unit of time (y = a * b^t). If growth occurs at r% per period, base b = 1 + r/100; for decay, b = 1 - r/100.",
      uzbekSummary: "Chiziqli model har bir qadamda doimiy miqdorni qo'shadi (+d). Eksponentsial model esa har bir qadamda doimiy songa ko'paytiradi (*b). Agar o'sish r% bo'lsa b = 1 + r/100, kamayish bo'lsa b = 1 - r/100.",
      keyPoints: [
        "Base b > 1: Exponential growth (e.g., 1.05 = 5% increase).",
        "Base 0 < b < 1: Exponential decay (e.g., 0.85 = 15% decrease).",
        "Compounding interval t/k: If quantity doubles every 3 hours, model is y = a * 2^(t/3).",
        "Initial value 'a' is always the value at t = 0 (the y-intercept).",
      ],
    },
    traps: [
      {
        title: "Decay Base vs Decay Rate Confusion",
        explanation: "If a population decreases by 12% per year, students mistakenly write b = 0.12 instead of b = 1 - 0.12 = 0.88.",
        avoidTip: "Base is always (1 - r). A 12% loss leaves 88% remaining, so base must be 0.88.",
      },
      {
        title: "Compounding Time Exponent Inversion",
        explanation: "If bacteria triple every 4 hours, students write 3^(4t) instead of 3^(t/4).",
        avoidTip: "Test t = 4 in your model. When t = 4, the exponent should equal 1 (tripled once). t/4 = 4/4 = 1. Therefore, the denominator is the interval.",
      },
    ],
    formulas: [
      {
        name: "Standard Exponential Model",
        latex: "y = a(1 \\pm r)^t",
        explanation: "a = initial quantity, r = growth/decay rate (decimal), t = time periods.",
      },
      {
        name: "Interval Compounding Model",
        latex: "y = a \\cdot b^{\\frac{t}{k}}",
        explanation: "k = time required to multiply by factor b (e.g. doubling period).",
      },
    ],
    desmosBypass: {
      title: "Desmos Table Verification",
      keystrokes: "Type y = a * b^x, add table to verify points (0, a) and (1, a*b)",
      explanation: "Create a Desmos table from given word problem values. Enter the formula with sliders to match data points exactly in seconds.",
      sampleEquation: "y = 500(1.08)^x",
    },
    diagramKey: "exponential_vs_linear",
  },

  "ADV-04": {
    code: "ADV-04",
    section: "MATH",
    domain: "Advanced Math",
    title_en: "Radicals & Rational Exponents",
    title_uz: "Daraja va ildizlar qoidalari",
    collegePandaChapter: "College Panda Math: Ch 1 (Exponents & Radicals)",
    yieldTier: "CORE FOUNDATION",
    frequencyPercent: "5–8% of Math",
    description_en: "Manipulate fractional exponents x^(a/b) = b-root(x^a), simplify radical expressions, and detect extraneous solutions generated by squaring equations.",
    description_uz: "Kasr darajalar x^(a/b) = b-darajali ildiz(x^a), ildizli ifodalarni soddalashtirish va tenglamani kvadratga ko'targanda paydo bo'ladigan begona ildizlarni aniqlash.",
    firstPrinciples: {
      coreConcept: "A fractional exponent represents a root in the denominator and a power in the numerator: x^(a/b) = (b-th root of x)^a. Squaring both sides of an equation can introduce extraneous roots because (-c)^2 = (+c)^2.",
      uzbekSummary: "Kasr darajaning maxraji ildiz darajasini, surati esa quvvatni bildiradi. Tenglamaning ikki tomonini kvadratga ko'targanda begona (haqiqiy bo'lmagan) ildizlar paydo bo'lishi mumkin.",
      keyPoints: [
        "x^(a/b) = (b√x)^a = b√(x^a).",
        "Negative exponent rule: x^(-n) = 1 / x^n.",
        "Product rule: x^a * x^b = x^(a + b); Quotient rule: x^a / x^b = x^(a - b).",
        "Power of power: (x^a)^b = x^(ab).",
        "Extraneous solution trap: Always plug roots back into the original radical!",
      ],
    },
    traps: [
      {
        title: "Forgetting to Check for Extraneous Solutions",
        explanation: "Solving √(2x + 3) = x - 6 yields two solutions, but one makes the right side negative, which is impossible for a principal square root.",
        avoidTip: "Whenever you square both sides to eliminate a root, you MUST test each candidate root in the original equation.",
      },
    ],
    formulas: [
      {
        name: "Fractional Exponent Definition",
        latex: "x^{\\frac{a}{b}} = \\sqrt[b]{x^a} = \\left(\\sqrt[b]{x}\\right)^a",
        explanation: "Denominator is the index of the radical; numerator is the power.",
      },
      {
        name: "Negative Exponent Rule",
        latex: "x^{-n} = \\frac{1}{x^n} \\quad (x \\ne 0)",
        explanation: "Negative power inverts the base into the reciprocal.",
      },
    ],
    desmosBypass: {
      title: "Extraneous Root Graph Filter",
      keystrokes: "Line 1: y = √(2x + 3) | Line 2: y = x - 6",
      explanation: "Graph both sides of the equation. Any true solution is an actual geometric intersection. If a candidate root does not intersect on the real graph, it is extraneous and eliminated instantly.",
      sampleEquation: "y = \\sqrt{2x + 3}",
    },
  },

  "ADV-05": {
    code: "ADV-05",
    section: "MATH",
    domain: "Advanced Math",
    title_en: "Nonlinear Equation Systems",
    title_uz: "Nochiziqli tenglamalar sistemasi",
    collegePandaChapter: "College Panda Math: Ch 10 & Ch 17 (Systems & Quadratics Intersection)",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "5–8% of Math",
    description_en: "Solve intersections between lines and parabolas or circles, determining the exact number of coordinate solutions via substitution and discriminant analysis.",
    description_uz: "To'g'ri chiziq va parabola yoki aylana kesishishini yechish, diskriminant orqali yechimlar sonini (0, 1, 2) aniqlash.",
    firstPrinciples: {
      coreConcept: "Substituting a linear equation y = mx + b into a quadratic y = ax^2 + bx + c produces a single quadratic in x. The discriminant of this resulting quadratic dictates how many points the line and curve share: 2 (secant), 1 (tangent), or 0.",
      uzbekSummary: "To'g'ri chiziq tenglamasini parabola tenglamasiga qo'yish bitta kvadrat tenglama hosil qiladi. Uning diskriminanti chiziq va parabolaning nechta umumiy nuqtasi borligini ko'rsatadi: 2 ta kesishish, 1 ta urinish yoki 0 ta.",
      keyPoints: [
        "Substitute y = mx + b into quadratic: ax^2 + (b - m)x + (c - d) = 0.",
        "Set Discriminant D = B^2 - 4AC to determine intersections.",
        "Line is tangent to parabola when D = 0 (exactly one solution).",
      ],
    },
    traps: [
      {
        title: "Assuming Tangency Means Zero Intersections",
        explanation: "Students mix up 'tangent' with 'no intersection'.",
        avoidTip: "Tangent means exactly ONE intersection point (Discriminant D = 0).",
      },
    ],
    formulas: [
      {
        name: "Line-Parabola Discriminant System",
        latex: "ax^2 + bx + c = mx + d \\implies ax^2 + (b - m)x + (c - d) = 0",
        explanation: "Equating y-values reduces 2D system to a 1D quadratic root problem.",
      },
    ],
    desmosBypass: {
      title: "Visual System Intersection Click",
      keystrokes: "Line 1: y = x^2 - 4x + 1 | Line 2: y = 2x - 8",
      explanation: "Desmos graphs both the parabola and the line simultaneously. Click each intersection marker to inspect exact (x, y) coordinates with zero quadratic formula calculation.",
      sampleEquation: "y = x^2 - 4x + 1",
    },
  },

  // ==========================================
  // MATH: DATA ANALYSIS (DAT-01 to DAT-04)
  // ==========================================
  "DAT-01": {
    code: "DAT-01",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    title_en: "Ratios, Rates, Proportions & Unit Conversions",
    title_uz: "Nisbatlar, tezliklar va birliklar konvertatsiyasi",
    collegePandaChapter: "College Panda Math: Ch 4 (Rates), Ch 5 & 6 (Ratio and Proportions)",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "8–10% of Math",
    description_en: "Solve multi-step unit conversions via dimensional analysis, direct vs inverse proportions, density (mass/volume), and combined work rate problems.",
    description_uz: "O'lchov birliklarini bosqichma-bosqich o'girish (dimensional analysis), to'g'ri va teskari mutanosiblik, zichlik (massa/hajm) va birgalikda ishlash masalalari.",
    firstPrinciples: {
      coreConcept: "A unit conversion is multiplying by fractions equal to 1 where numerator and denominator represent identical physical quantities in different units. Units cancel out algebraically just like variable factors.",
      uzbekSummary: "Birliklar konvertatsiyasi – qiymati 1 ga teng bo'lgan kasrlarga ko'paytirishdir. Birliklar xuddi o'zgaruvchilar kabi qisqaradi. Zichlik = Massa / Hajm.",
      keyPoints: [
        "Dimensional Analysis: (meters / second) * (60 sec / 1 min) * (60 min / 1 hr) = meters / hr.",
        "Combined work formula: 1/t_total = 1/t1 + 1/t2.",
        "Inverse variation: x1 * y1 = x2 * y2 (e.g. more workers take fewer days).",
        "Density formula: Density = Mass / Volume.",
      ],
    },
    traps: [
      {
        title: "Squared/Cubed Unit Conversion Trap",
        explanation: "1 foot = 12 inches, so students assume 1 square foot = 12 square inches. In reality, (12 inches)^2 = 144 square inches!",
        avoidTip: "Always square or cube the conversion factor when converting areas or volumes.",
      },
    ],
    formulas: [
      {
        name: "Combined Work Rate",
        latex: "\\frac{1}{t_{\\text{combined}}} = \\frac{1}{t_1} + \\frac{1}{t_2}",
        explanation: "Sum of individual fractional hourly outputs equals total output.",
      },
      {
        name: "Density Formula",
        latex: "\\text{Density} = \\frac{\\text{Mass}}{\\text{Volume}} \\implies M = D \\cdot V",
        explanation: "Physical invariant relating matter quantity to occupied space.",
      },
    ],
    desmosBypass: {
      title: "Direct Ratio Solver",
      keystrokes: "Type: 15 / 4 = x / 18",
      explanation: "Desmos solves proportional fractional equations directly and displays a vertical line at the exact numeric value of x.",
      sampleEquation: "15 / 4 = x / 18",
    },
  },

  "DAT-02": {
    code: "DAT-02",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    title_en: "Percentages & Percent Change",
    title_uz: "Foizlar va foiz o'zgarishi",
    collegePandaChapter: "College Panda Math: Ch 2 (Percent)",
    yieldTier: "HIGHEST YIELD",
    frequencyPercent: "10–12% of Math",
    description_en: "Calculate percent increase, percent decrease, percent of a percent, and reverse percentage calculations without baseline denominator confusion.",
    description_uz: "Foiz ortishi, kamayishi, foizning foizi va dastlabki qiymatni qayta hisoblash formulalari.",
    firstPrinciples: {
      coreConcept: "A percent is a ratio per 100. Percent change always compares the change relative to the ORIGINAL starting value, never the final value: % Change = ((New - Old) / Old) * 100%.",
      uzbekSummary: "Foiz o'zgarishi doimo DASTLABKI (boshlang'ich) qiymatga nisbatan hisoblanadi: O'zgarish = ((Yangi - Eski) / Eski) * 100%. 20% oshirib 20% kamaytirilsa dastlabki songa qaytmaydi!",
      keyPoints: [
        "Multiplier for r% increase: * (1 + r/100). E.g., +25% = * 1.25.",
        "Multiplier for r% decrease: * (1 - r/100). E.g., -30% = * 0.70.",
        "Sequential percent change: +20% then -20% gives 1.20 * 0.80 = 0.96 (a net 4% loss!).",
        "Original Price = Final Price / (1 ± r).",
      ],
    },
    traps: [
      {
        title: "Wrong Denominator in Percent Change",
        explanation: "If a price increases from $40 to $50, students divide by 50 instead of 40: (10/50 = 20% instead of 10/40 = 25%).",
        avoidTip: "The denominator is ALWAYS the original baseline: 'Old' or 'From' value.",
      },
      {
        title: "Adding Percentages Directly",
        explanation: "Increasing by 10% and then by 15% is NOT a 25% increase. It is 1.10 * 1.15 = 1.265 (a 26.5% increase).",
        avoidTip: "Always multiply the growth factors sequentially; never simply add percentages.",
      },
    ],
    formulas: [
      {
        name: "Percent Change Formula",
        latex: "\\% \\Delta = \\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100\\%",
        explanation: "Universal baseline formula for proportional gain or loss.",
      },
      {
        name: "Reverse Percentage Invariant",
        latex: "\\text{Original} = \\frac{\\text{Final}}{1 \\pm r}",
        explanation: "Recover original value from discounted or taxed total.",
      },
    ],
    desmosBypass: {
      title: "Factor Multiplication Speedhack",
      keystrokes: "Type: 85 * 1.15 * 0.80",
      explanation: "Chain multiplier decimals in Desmos in a single line to compute compound percent adjustments in 2 seconds.",
      sampleEquation: "85 * 1.15 * 0.80",
    },
  },

  "DAT-03": {
    code: "DAT-03",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    title_en: "One-Variable Data: Distributions & Statistics",
    title_uz: "Bir o'zgaruvchili ma'lumotlar va statistika",
    collegePandaChapter: "Official Digital SAT Study Guide: Data Analysis & Statistical Modeling",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "7–9% of Math",
    description_en: "Analyze mean, median, mode, range, standard deviation, interquartile range (IQR), and the disproportionate distortion of extreme outliers on distributions.",
    description_uz: "O'rta arifmetik (mean), mediana, moda, diapazon (range), standart og'ish (stdev) va anomal nuqtalarning (outliers) taqsimotga ta'siri.",
    firstPrinciples: {
      coreConcept: "The mean is sensitive to extreme values because it incorporates every value into the arithmetic sum. The median is resistant (robust) because it depends solely on rank position. High outliers pull the mean up while the median stays stable.",
      uzbekSummary: "O'rta arifmetik anomal katta yoki kichik sonlarga juda sezgir. Mediana esa o'rtadagi tartib o'rniga bog'liq bo'lgani uchun anomaliyalardan deyarli o'zgarmaydi. Katta outlier o'rta arifmetikni yuqoriga tortadi.",
      keyPoints: [
        "Mean = Sum of elements / Total count.",
        "Median = Middle value in ordered set (average of two middle values if N is even).",
        "Standard deviation measures spread: a wider, more dispersed distribution has a larger SD.",
        "IQR = Q3 - Q1 (contains the middle 50% of data).",
      ],
    },
    traps: [
      {
        title: "Confusing Standard Deviation with Mean Magnitude",
        explanation: "Students think a set with bigger numbers has a higher standard deviation.",
        avoidTip: "Standard deviation measures SPREAD (distance from mean), not how large numbers are. [100, 100, 100] has SD = 0, while [1, 5, 10] has a high SD.",
      },
      {
        title: "Outlier Effect on Median",
        explanation: "Students assume adding a huge outlier increases the median as much as the mean.",
        avoidTip: "Outliers heavily shift the MEAN. The MEDIAN barely changes (at most by one step).",
      },
    ],
    formulas: [
      {
        name: "Arithmetic Mean",
        latex: "\\bar{x} = \\frac{\\sum_{i=1}^n x_i}{n}",
        explanation: "Sum of all observations divided by sample count.",
      },
      {
        name: "Interquartile Range (IQR)",
        latex: "\\text{IQR} = Q_3 - Q_1",
        explanation: "Spread of the middle 50% of the distribution.",
      },
    ],
    desmosBypass: {
      title: "Desmos Stats Functions",
      keystrokes: "L = [4, 7, 9, 12, 15] then mean(L), median(L), stdev(L)",
      explanation: "Create a list L in Desmos. Built-in functions mean(L), median(L), and stdev(L) instantly display exact values.",
      sampleEquation: "mean([12, 15, 18, 22, 29])",
    },
    diagramKey: "statistics_distribution",
  },

  "DAT-04": {
    code: "DAT-04",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    title_en: "Two-Variable Data: Scatterplots & Line of Best Fit",
    title_uz: "Ikki o'zgaruvchili ma'lumotlar va scatterplotlar",
    collegePandaChapter: "College Panda Math: Ch 15 (Interpreting Linear Models)",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "6–8% of Math",
    description_en: "Interpret scatterplots, lines of best fit, slopes as rates of change, y-intercepts as initial conditions, and calculate positive/negative residuals.",
    description_uz: "Scatterplot grafiklari, eng mos to'g'ri chiziq (line of best fit), burchak koeffitsienti ma'nosi va qoldiqlar (residuals = haqiqiy - bashorat).",
    firstPrinciples: {
      coreConcept: "A line of best fit models the central trend between two variables. Residual = Observed Actual y - Predicted Line ŷ. Points above the line have positive residuals (model underestimates); points below have negative residuals (model overestimates).",
      uzbekSummary: "Eng mos to'g'ri chiziq ikki o'zgaruvchi orasidagi asosiy tendentsiyani ko'rsatadi. Residual = Haqiqiy qiymat - Model bashorati. Chiziqdan yuqoridagi nuqtalar musbat residualga ega.",
      keyPoints: [
        "Slope = predicted change in y per 1 unit increase in x.",
        "Residual = Actual y - Model ŷ.",
        "Correlation does NOT imply causation: an association between x and y does not prove x causes y.",
      ],
    },
    traps: [
      {
        title: "Residual Sign Reversal Trap",
        explanation: "Writing Residual = Predicted - Actual instead of Actual - Predicted.",
        avoidTip: "A-P: 'Actual minus Predicted'. If the actual dot is ABOVE the line, residual is POSITIVE.",
      },
    ],
    formulas: [
      {
        name: "Residual Invariant",
        latex: "e_i = y_i - \\hat{y}_i = \\text{Observed} - \\text{Predicted}",
        explanation: "Vertical distance between data point and regression model.",
      },
    ],
    desmosBypass: {
      title: "Desmos Linear Regression",
      keystrokes: "Insert table (x1, y1) and type: y1 ~ m*x1 + b",
      explanation: "Desmos computes the best-fit slope m, y-intercept b, and correlation coefficient r instantaneously.",
      sampleEquation: "y1 ~ m*x1 + b",
    },
    diagramKey: "scatterplot_bestfit",
  },

  // ==========================================
  // MATH: GEOMETRY & TRIGONOMETRY (GEO-01 to GEO-04)
  // ==========================================
  "GEO-01": {
    code: "GEO-01",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    title_en: "Area, Perimeter & Volume Formulas",
    title_uz: "Yuza, perimetr va hajm formulalari",
    collegePandaChapter: "Official Digital SAT Math Reference Sheet & 3D Geometry Modules",
    yieldTier: "CORE FOUNDATION",
    frequencyPercent: "5–7% of Math",
    description_en: "Calculate surface areas and volumes of cylinders, cones, spheres, rectangular prisms, and apply geometric scale factor powers (k for length, k^2 for area, k^3 for volume).",
    description_uz: "Tsilindr, konus, shar va to'g'ri burchakli parallelepiped hajmi va to'la sirti; o'xshashlik koeffitsienti qoidalari (chiziqli k, yuza k^2, hajm k^3).",
    firstPrinciples: {
      coreConcept: "Volume represents the 3D accumulation of 2D cross-sectional area over a perpendicular height. A cylinder is base area πr^2 extruded over height h (V = πr^2h). A cone is exactly 1/3 of the circumscribed cylinder (V = 1/3 πr^2h).",
      uzbekSummary: "Hajm – bu 2 o'lchamli ko'ndalang kesim yuzasining balandlik bo'ylab to'planishidir. Tsilindr hajmi V = πr^2h bo'lsa, konus uning aynan 1/3 qismiga teng: V = 1/3 πr^2h.",
      keyPoints: [
        "Right circular cylinder: V = πr^2h, SA = 2πrh + 2πr^2.",
        "Right circular cone: V = (1/3)πr^2h.",
        "Sphere: V = (4/3)πr^3, Surface Area = 4πr^2.",
        "Scale Factor Invariant: If linear dimensions scale by k, area scales by k^2 and volume scales by k^3.",
      ],
    },
    traps: [
      {
        title: "Scale Factor Volume Mistake",
        explanation: "If the radius of a cylinder doubles, students often assume the volume doubles.",
        avoidTip: "Radius is squared in V = πr^2h. Doubling radius multiplies volume by 2^2 = 4! If all dimensions double, volume multiplies by 2^3 = 8.",
      },
    ],
    formulas: [
      {
        name: "Cylinder Volume & Surface Area",
        latex: "V = \\pi r^2 h, \\quad SA = 2\\pi r h + 2\\pi r^2",
        explanation: "Base area times height plus circular endcaps.",
      },
      {
        name: "Cone Volume",
        latex: "V = \\frac{1}{3}\\pi r^2 h",
        explanation: "Exactly one third of cylinder with identical base and height.",
      },
      {
        name: "Sphere Volume & Surface Area",
        latex: "V = \\frac{4}{3}\\pi r^3, \\quad SA = 4\\pi r^2",
        explanation: "3D sphere invariants provided on College Board reference sheet.",
      },
      {
        name: "Scale Factor Power Laws",
        latex: "\\text{Length} \\propto k, \\quad \\text{Area} \\propto k^2, \\quad \\text{Volume} \\propto k^3",
        explanation: "Universal geometric scaling ratio.",
      },
    ],
    desmosBypass: {
      title: "Interactive Volume Dimension Sliders",
      keystrokes: "Type V = pi * r^2 * h with sliders for r and h",
      explanation: "Vary r and h dynamically to check percentage changes in volume without manual algebraic re-computation.",
      sampleEquation: "V = \\pi r^2 h",
    },
    diagramKey: "solids_geometry",
  },

  "GEO-02": {
    code: "GEO-02",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    title_en: "Lines, Angles & Triangle Properties",
    title_uz: "Chiziqlar, burchaklar va uchburchaklar",
    collegePandaChapter: "Official Digital SAT Triangles & Angle Theorems",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "6–8% of Math",
    description_en: "Apply transversal parallel line angle theorems, interior angle sum (180°), the Exterior Angle Theorem, and similar triangle side proportionality.",
    description_uz: "Parallel to'g'ri chiziqlar va kesuvchi hosil qilgan burchaklar, uchburchak ichki burchaklari yig'indisi (180°), tashqi burchak teoremasi va o'xshash uchburchaklar tomonlarining proporsionalligi.",
    firstPrinciples: {
      coreConcept: "When two parallel lines are cut by a transversal, all acute angles are equal, and all obtuse angles are equal; any acute plus any obtuse angle sums to 180°. Similar triangles have identical corresponding angles and proportional corresponding side lengths.",
      uzbekSummary: "Parallel chiziqlarni uchinchi chiziq kesib o'tganda hosil bo'lgan barcha o'tkir burchaklar o'zaro teng, barcha o'tmas burchaklar teng va o'tkir + o'tmas = 180°. O'xshash uchburchaklarning burchaklari teng, mos tomonlari esa proporsionaldir.",
      keyPoints: [
        "Triangle interior angle sum = 180°.",
        "Exterior Angle Theorem: An exterior angle equals the sum of the two non-adjacent interior angles.",
        "Similar Triangles: a1/a2 = b1/b2 = c1/c2; Ratio of Areas = (a1/a2)^2.",
        "Isosceles triangle: Angles opposite to equal sides are equal.",
      ],
    },
    traps: [
      {
        title: "Exterior Angle Confusion",
        explanation: "Calculating the adjacent supplementary angle first, then doing 180° minus that, creating room for arithmetic slip.",
        avoidTip: "Directly apply: Exterior Angle = Remote Interior Angle 1 + Remote Interior Angle 2.",
      },
      {
        title: "Similar Triangle Side Mismatch",
        explanation: "Setting up ratio with sides that do not correspond to identical opposite angles.",
        avoidTip: "Match sides by the angle opposite them! Side opposite 30° matches side opposite 30°.",
      },
    ],
    formulas: [
      {
        name: "Triangle Angle Sum",
        latex: "\\angle A + \\angle B + \\angle C = 180^\\circ",
        explanation: "Sum of interior angles of any Euclidean triangle.",
      },
      {
        name: "Exterior Angle Theorem",
        latex: "\\angle \\text{Ext} = \\angle A + \\angle B \\quad (\\text{remote angles})",
        explanation: "Exterior angle equals the sum of the two remote interior angles.",
      },
      {
        name: "Similar Triangle Side Ratio",
        latex: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} = k \\implies \\frac{\\text{Area}_1}{\\text{Area}_2} = k^2",
        explanation: "Linear proportionality k yields quadratic area scaling k^2.",
      },
    ],
    desmosBypass: {
      title: "Direct Proportion Cross-Multiplier",
      keystrokes: "Type: a / b = c / x to solve missing side length",
      explanation: "Input similar triangle side proportions directly into Desmos for instant side calculation.",
      sampleEquation: "8 / 12 = 5 / x",
    },
    diagramKey: "similar_triangles",
  },

  "GEO-03": {
    code: "GEO-03",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    title_en: "Right Triangles & Trigonometry",
    title_uz: "To'g'ri burchakli uchburchak va trigonometriya",
    collegePandaChapter: "Trigonometric Identities Reference & Special Right Triangles Modules",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "8–10% of Math",
    description_en: "Master SOH CAH TOA, Pythagorean theorem, special right triangles (30-60-90, 45-45-90), radian conversions, and the complementary angle identity sin(x) = cos(90° - x).",
    description_uz: "SOH CAH TOA qoidalari, Pifagor teoremasi, maxsus to'g'ri burchakli uchburchaklar (30-60-90, 45-45-90) va to'ldiruvchi burchaklar teoremalari: sin(x) = cos(90° - x).",
    firstPrinciples: {
      coreConcept: "Trigonometric ratios are scale-invariant properties of right triangles. The sine of an angle is the cosine of its complementary angle because the opposite side of one acute angle is the adjacent side of the other.",
      uzbekSummary: "Trigonometrik nisbatlar to'g'ri burchakli uchburchakning o'lchamiga bog'liq bo'lmagan xossalaridir. sin(x) = cos(90° - x) chunki bitta o'tkir burchakning qarshisidagi tomon ikkinchi o'tkir burchakning yopishgan tomonidir.",
      keyPoints: [
        "SOH CAH TOA: sin = Opp/Hyp, cos = Adj/Hyp, tan = Opp/Adj.",
        "Complementary Angle Identity: If x + y = 90° (or π/2), then sin(x) = cos(y).",
        "30-60-90 ratio: x : x√3 : 2x (hypotenuse is exactly 2x short leg).",
        "45-45-90 ratio: x : x : x√2.",
        "Pythagorean Identity: sin^2(θ) + cos^2(θ) = 1.",
        "Radian conversion: 180° = π radians.",
      ],
    },
    traps: [
      {
        title: "Complementary Identity Algebraic Disguise",
        explanation: "Given sin(4x - 10) = cos(3x + 16), students equate the arguments 4x - 10 = 3x + 16.",
        avoidTip: "Since sin(A) = cos(B), the angles must sum to 90°! Write: (4x - 10) + (3x + 16) = 90°.",
      },
      {
        title: "Degree vs Radian Mode Error in Desmos",
        explanation: "Evaluating trig functions in Desmos when calculator is set to the wrong mode (DEG vs RAD).",
        avoidTip: "Always check the wrench icon in Desmos to ensure it matches the question's angle format (Degrees vs Radians).",
      },
    ],
    formulas: [
      {
        name: "SOH-CAH-TOA Definitions",
        latex: "\\sin\\theta = \\frac{\\text{Opp}}{\\text{Hyp}}, \\quad \\cos\\theta = \\frac{\\text{Adj}}{\\text{Hyp}}, \\quad \\tan\\theta = \\frac{\\text{Opp}}{\\text{Adj}}",
        explanation: "Fundamental right triangle trigonometric definitions.",
      },
      {
        name: "Co-function Identity",
        latex: "\\sin(x) = \\cos(90^\\circ - x) \\iff x + y = 90^\\circ \\quad \\left(\\text{or } \\frac{\\pi}{2}\\right)",
        explanation: "Complementary acute angles have interchangeable sine and cosine.",
      },
      {
        name: "Special Right Triangles",
        latex: "30^\\circ-60^\\circ-90^\\circ: x : x\\sqrt{3} : 2x, \\qquad 45^\\circ-45^\\circ-90^\\circ: x : x : x\\sqrt{2}",
        explanation: "Standard ratios provided on College Board reference sheet.",
      },
      {
        name: "Fundamental Pythagorean Identity",
        latex: "\\sin^2(\\theta) + \\cos^2(\\theta) = 1, \\quad \\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}",
        explanation: "Derived directly from Pythagorean theorem on unit circle.",
      },
    ],
    desmosBypass: {
      title: "Complementary Equation Solver",
      keystrokes: "Type: (4x - 10) + (3x + 16) = 90",
      explanation: "Desmos graphs a vertical line at the exact value of x, solving the complementary trig problem in 5 seconds.",
      sampleEquation: "(4x - 10) + (3x + 16) = 90",
    },
    diagramKey: "trig_identities",
  },

  "GEO-04": {
    code: "GEO-04",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    title_en: "Circles: Equations, Sectors & Radians",
    title_uz: "Aylanalar: tenglamalar, radius va burchaklar",
    collegePandaChapter: "Official Digital SAT Circle Geometry & Completing the Square",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "7–9% of Math",
    description_en: "Analyze the standard circle equation (x - h)^2 + (y - k)^2 = r^2, completing the square to extract center and radius, arc length s = rθ, and sector area A = 1/2 r^2 θ.",
    description_uz: "Aylana standart tenglamasi (x - h)^2 + (y - k)^2 = r^2, to'la kvadratga ajratish orqali markaz va radiusni topish, yoy uzunligi va sektor yuzi.",
    firstPrinciples: {
      coreConcept: "A circle is the locus of all points equidistant from center (h, k). Its equation is simply the Pythagorean theorem: distance^2 = (x - h)^2 + (y - k)^2 = r^2. Arc length and sector area are exact fractions (θ / 360° or θ / 2π) of the total circumference and total area.",
      uzbekSummary: "Aylana – markazdan (h, k) bir xil r masofadagi nuqtalar to'plamidir. Aylana tenglamasi aslida Pifagor teoremasidir: (x - h)^2 + (y - k)^2 = r^2. Yoy uzunligi va sektor yuzi aylana to'liq perimetri va yuzasining mos burchak ulushidir.",
      keyPoints: [
        "Standard Form: (x - h)^2 + (y - k)^2 = r^2. Center is (h, k), radius is r.",
        "Completing the square: For x^2 + bx, add (b/2)^2 to both sides of the equation.",
        "Arc Length (radians): s = r * θ.",
        "Sector Area (radians): Area = 1/2 * r^2 * θ.",
        "Converting degrees to radians: Multiply by π / 180°.",
      ],
    },
    traps: [
      {
        title: "Radius Squared vs Radius Slip",
        explanation: "Given (x - 3)^2 + (y + 5)^2 = 36, students conclude the radius is 36 instead of √36 = 6.",
        avoidTip: "The right side is r^2. Always take the square root to determine radius r.",
      },
      {
        title: "Center Coordinate Sign Inversion",
        explanation: "Given (x - 4)^2 + (y + 7)^2 = 25, students identify the center as (-4, +7).",
        avoidTip: "The formula is (x - h)^2 + (y - k)^2. The center is (+4, -7).",
      },
    ],
    formulas: [
      {
        name: "Standard Circle Equation",
        latex: "(x - h)^2 + (y - k)^2 = r^2 \\quad \\text{Center: } (h, k), \\quad \\text{Radius: } r",
        explanation: "Pythagorean locus of points at distance r from center (h, k).",
      },
      {
        name: "Arc Length Formulas",
        latex: "s = r\\theta \\quad (\\text{radians}) \\qquad s = \\frac{\\theta}{360^\\circ} \\cdot 2\\pi r \\quad (\\text{degrees})",
        explanation: "Linear distance along the circumference subtended by central angle θ.",
      },
      {
        name: "Sector Area Formulas",
        latex: "A = \\frac{1}{2}r^2\\theta \\quad (\\text{radians}) \\qquad A = \\frac{\\theta}{360^\\circ} \\cdot \\pi r^2 \\quad (\\text{degrees})",
        explanation: "Fractional area of circle enclosed by central angle θ.",
      },
    ],
    desmosBypass: {
      title: "Direct Circle Plot & Radius Tap",
      keystrokes: "Type full expanded equation: x^2 + y^2 - 8x + 6y - 11 = 0",
      explanation: "Desmos graphs the circle immediately without completing the square! Click on the center or extreme points to read center coordinates and diameter in under 5 seconds.",
      sampleEquation: "x^2 + y^2 - 8x + 6y - 11 = 0",
    },
    diagramKey: "circle_geometry",
  },

  // ==========================================
  // READING & WRITING: INFORMATION & IDEAS (ENG-CID to ENG-INF)
  // ==========================================
  "ENG-CID": {
    code: "ENG-CID",
    section: "READING_WRITING",
    domain: "Information and Ideas",
    title_en: "Central Ideas and Details",
    title_uz: "Asosiy g'oya va matn tafsilotlari",
    collegePandaChapter: "Digital SAT Reading Mastery: Main Idea & Factual Verification",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "8–10% of RW",
    description_en: "Synthesize overarching arguments, main themes, and extract explicit factual details directly substantiated by passage text.",
    description_uz: "Matnning asosiy g'oyasi, markaziy da'vosi va matnda to'g'ridan-to'g'ri keltirilgan faktik detallarni aniqlash.",
    firstPrinciples: {
      coreConcept: "Every correct answer on SAT Reading must be 100% directly substantiated by textual proof. Correct answers paraphrase the text; incorrect answers introduce unsupported generalizations, reverse cause and effect, or exceed textual scope.",
      uzbekSummary: "SAT Reading savollarida to'g'ri javob 100% matndagi so'zlar bilan isbotlangan bo'lishi shart. To'g'ri variant matn mazmunini boshqa so'zlar bilan ifodalaydi; noto'g'ri variantlar esa haddan tashqari umumlashtirish yoki matnda yo'q fikrlarni kiritadi.",
      keyPoints: [
        "Literal paraphrasing: Look for synonyms that preserve the author's precise degree of claim.",
        "Scope elimination: Eliminate choices that use extreme qualifiers ('always', 'never', 'solely') unless the text explicitly uses them.",
        "Half-right, all-wrong rule: If the first half of a choice is accurate but the second half is unsupported, the entire option is eliminated.",
      ],
    },
    traps: [
      {
        title: "Real-World Truth Trap",
        explanation: "An answer choice may be scientifically true in real life, but if the passage does not mention it, it is 100% wrong on the SAT.",
        avoidTip: "Treat the passage as the ONLY universe of information. If it isn't stated or logically required by the text, eliminate it.",
      },
      {
        title: "Too Narrow / Detail Disguised as Main Idea",
        explanation: "Choosing a factually correct detail mentioned in just one sentence as the overarching central idea.",
        avoidTip: "The central idea must encompass the ENTIRE passage, not just one supporting example.",
      },
    ],
    formulas: [
      {
        name: "Central Idea Invariant",
        latex: "\\text{Central Idea} = \\text{Primary Subject} + \\text{Author's Specific Claim}",
        explanation: "Must cover the passage's holistic thesis rather than a solitary supporting sub-point.",
      },
    ],
  },

  "ENG-CDE": {
    code: "ENG-CDE",
    section: "READING_WRITING",
    domain: "Information and Ideas",
    title_en: "Command of Evidence: Textual & Quantitative",
    title_uz: "Dalillardan foydalanish (Matnli va Grafik)",
    collegePandaChapter: "Digital SAT Reading Mastery: Scientific Data, Graphs & Evidence Evaluation",
    yieldTier: "HIGHEST YIELD",
    frequencyPercent: "12–14% of RW",
    description_en: "Evaluate textual quotations or quantitative data tables/charts to determine which specific piece of evidence directly supports, undermines, or illustrates a scientific hypothesis.",
    description_uz: "Ilmiy gipotezani bevosita qo'llab-quvvatlovchi, rad etuvchi yoki tasdiqlovchi matnli dalillar va jadvallar/grafiklardagi raqamli ma'lumotlarni aniqlash.",
    firstPrinciples: {
      coreConcept: "Command of Evidence requires testing an empirical claim against data. The correct answer must directly validate the hypothesis's directional prediction (e.g. higher temperature leads to increased yield). Neutral data or reverse trends are immediate distractors.",
      uzbekSummary: "Bu savol turida olimlarning gipotezasi beriladi. To'g'ri javob varianti aynan o'sha gipotezadagi yo'nalishni (masalan, harorat ko'tarilsa hosildorlik oshishi) jadval yoki matn orqali to'g'ridan-to'g'ri isbotlab berishi kerak.",
      keyPoints: [
        "Isolate the exact hypothesis: Identify the independent and dependent variables.",
        "Check data direction: Does the chart show an increase, decrease, or no correlation?",
        "Control group comparison: Ensure the evidence compares the experimental group against the designated control baseline.",
      ],
    },
    traps: [
      {
        title: "True Data but Irrelevant Hypothesis Trap",
        explanation: "The choice accurately reads numbers from the chart, but the numbers relate to an irrelevant variable, not the specific hypothesis tested.",
        avoidTip: "Re-read the hypothesis sentence. The correct answer must substantiate THAT specific causal link.",
      },
    ],
    formulas: [
      {
        name: "Evidence Invariant",
        latex: "\\text{Hypothesis}(X \\implies Y) \\iff \\text{Valid Evidence}(\\Delta X \\implies \\Delta Y)",
        explanation: "The data must mirror the causal direction specified in the researchers' thesis.",
      },
    ],
  },

  "ENG-INF": {
    code: "ENG-INF",
    section: "READING_WRITING",
    domain: "Information and Ideas",
    title_en: "Logical Inferences & Argument Completion",
    title_uz: "Mantiqiy xulosalar va dalilni yakunlash",
    collegePandaChapter: "Digital SAT Inferences & Logical Completion Module",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "8–10% of RW",
    description_en: "Complete the final blank sentence of a complex academic passage by deducing the inevitable logical consequence of the presented premises.",
    description_uz: "Murakkab akademik matnning oxirgi bo'sh joyini oldingi keltirilgan mantiqiy asoslar natijasiga tayanib yakunlash.",
    firstPrinciples: {
      coreConcept: "An inference on the SAT is NOT an imaginative creative leap. It is an airtight, unassailable logical deduction. The correct conclusion must be the next immediate step that follows necessarily from the premises.",
      uzbekSummary: "SAT da xulosa chiqarish – bu taxmin yoki ijodiy fikr emas. Bu matndagi ma'lumotlardan muqarrar kelib chiqadigan mantiqiy xulosadir. To'g'ri variant matndan bitta qadam oldinga yuradi, sakrab o'tib ketmaydi.",
      keyPoints: [
        "Observe transition markers: Look for 'However', 'Therefore', 'Consequently' right before the blank.",
        "Stay within conservative boundaries: The best inference makes the smallest, safest logical step.",
        "Eliminate speculative claims: Any choice claiming what 'will always happen in the future' is usually invalid.",
      ],
    },
    traps: [
      {
        title: "Speculative Overreach Trap",
        explanation: "Choosing an answer that sounds profound or visionary but goes beyond what the premises strictly guarantee.",
        avoidTip: "Pick the most cautious, modest claim that cannot be contested given the facts in the text.",
      },
    ],
    formulas: [
      {
        name: "Deductive Syllogism Invariant",
        latex: "\\text{Premise}_1 + \\text{Premise}_2 \\implies \\text{Necessary Logical Conclusion}",
        explanation: "The missing concluding sentence must resolve the deductive premise framework.",
      },
    ],
  },

  // ==========================================
  // READING & WRITING: CRAFT & STRUCTURE (ENG-WIC to ENG-CRO)
  // ==========================================
  "ENG-WIC": {
    code: "ENG-WIC",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    title_en: "Words in Context (Advanced Vocabulary)",
    title_uz: "Kontekstdagi so'zlar (Lug'at)",
    collegePandaChapter: "Digital SAT Verbal: High-Register Academic Vocabulary & Context Clues",
    yieldTier: "HIGHEST YIELD",
    frequencyPercent: "15–18% of RW",
    description_en: "Determine the precise meaning of sophisticated vocabulary words based on surrounding contextual clues, syntactic role, and secondary definitions.",
    description_uz: "Murakkab akademik so'zlarning kontekstdagi aniq ma'nosini matn mantiqi, sinonimlar va antonimlar orqali aniqlash.",
    firstPrinciples: {
      coreConcept: "Words have multiple definitions; the SAT tests the exact sense dictated by surrounding context. Use the 'Blank Replacement Method': cover the word, invent your own simple substitute that makes complete sense, and match your word to the choices.",
      uzbekSummary: "So'zlarning bir nechta ma'nosi bo'ladi; SAT aynan matn kontekstiga mos ma'noni so'raydi. 'Bo'shliqni to'ldirish' usulidan foydalaning: so'zni berkitib, o'rniga oddiy sinonim qo'ying va variantlar ichidan unga eng yaqinini tanlang.",
      keyPoints: [
        "Blank replacement technique: Predict the word BEFORE looking at the answer choices.",
        "Secondary definitions: Common words used in uncommon ways (e.g. 'table' meaning to postpone, 'qualify' meaning to limit).",
        "Connotation match: Does the sentence require a positive, critical, or neutral tone?",
      ],
    },
    traps: [
      {
        title: "Primary Definition Magnet Trap",
        explanation: "Students pick the most familiar common dictionary definition, ignoring that the sentence uses the word in a specialized or secondary sense.",
        avoidTip: "Never select an answer solely because you recognize the word's common everyday meaning. Verify it in context.",
      },
    ],
    formulas: [
      {
        name: "Context Clue Alignment",
        latex: "\\text{Word Connotation} + \\text{Syntactic Parallelism} = \\text{Target Synonym}",
        explanation: "Contextual markers dictate valence and exact semantic shade.",
      },
    ],
  },

  "ENG-PUR": {
    code: "ENG-PUR",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    title_en: "Text Structure & Overall Rhetorical Purpose",
    title_uz: "Matn strukturasi va ritorik maqsad",
    collegePandaChapter: "Digital SAT Verbal: Structural Analysis & Paragraph Progression",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "7–9% of RW",
    description_en: "Describe how a passage unfolds structural stages (e.g. phenomenon introduced -> paradox identified -> novel solution proposed) and state the rhetorical role of specific sentences.",
    description_uz: "Matn rivojlanish bosqichlari (hodisa keltirilishi -> ziddiyat ko'rsatilishi -> yangi yechim taklif qilinishi) va alohida gaplarning vazifasini aniqlash.",
    firstPrinciples: {
      coreConcept: "Structure is the rhetorical skeleton of a passage. Authors organize ideas with purpose: introducing background, proposing hypotheses, presenting counterarguments, and offering syntheses. Focus on what the sentence DOES, not merely what it SAYS.",
      uzbekSummary: "Struktura – matnning skeletidir. Muallif har bir gapni ma'lum maqsad bilan yozadi: fon yaratish, gipoteza berish, e'tiroz bildirish yoki yechim berish. Gap nima HAQIDA ekaniga emas, nima VAZIFA bajarayotganiga e'tibor bering.",
      keyPoints: [
        "Functional verbs: 'undermines', 'illustrates', 'qualifies', 'reconciles', 'elaborates'.",
        "Sentence progression: Track shifts from general overview to specific empirical experiment.",
        "Role of underlined sentence: Ask whether it provides evidence, raises an objection, or introduces a definition.",
      ],
    },
    traps: [
      {
        title: "Confusing Topic Content with Rhetorical Function",
        explanation: "Picking a choice that accurately restates the subject matter (e.g. 'describes ancient pottery') instead of its rhetorical purpose (e.g. 'provides an example supporting a broader claim').",
        avoidTip: "Look for answer choices that describe the relationship of the sentence to the rest of the text.",
      },
    ],
    formulas: [
      {
        name: "Rhetorical Function Invariant",
        latex: "\\text{Function} = \\text{Action Verb} + \\text{Role in Paragraph Architecture}",
        explanation: "Evaluates structural mechanics rather than surface semantic details.",
      },
    ],
  },

  "ENG-CRO": {
    code: "ENG-CRO",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    title_en: "Cross-Text Connections",
    title_uz: "Matnlararo bog'liqlik (Dual Passages)",
    collegePandaChapter: "Digital SAT Dual Passages: Comparative Analysis & Author Alignment",
    yieldTier: "CORE FOUNDATION",
    frequencyPercent: "5–7% of RW",
    description_en: "Compare and contrast perspectives, methodologies, and conclusions between two paired historical or scientific texts on the same subject.",
    description_uz: "Bitta mavzudagi ikkita matn (Text 1 va Text 2) mualliflarining qarashlari, usullari va xulosalarini taqqoslash va bog'liqligini topish.",
    firstPrinciples: {
      coreConcept: "Dual passages require pinpointing the exact relationship between Text 1 and Text 2: agreement, nuance, complete contradiction, or application of theory to a new case study. Authors rarely disagree 100%; they usually disagree on a specific mechanism or scope.",
      uzbekSummary: "Ikkita matn o'rtasidagi munosabatni aniq belgilash kerak: ular fikrga qo'shiladimi, tuzatish kiritadimi yoki inkor qiladimi? Odatda ular butunlay zid bo'lmaydi, balki biror aniq mexanizm yoki ko'lam bo'yicha farq qiladi.",
      keyPoints: [
        "Synthesize Text 1's thesis in 5 words before reading Text 2.",
        "Identify Text 2's attitude toward Text 1: Validate, Challenge, or Nuance.",
        "Avoid extreme conflict assumptions: Disagreement is often nuanced and qualified.",
      ],
    },
    traps: [
      {
        title: "Conflating Author 1 and Author 2 Perspectives",
        explanation: "Attributing an assertion made by Author 1 to Author 2.",
        avoidTip: "Explicitly tag each premise with 'T1' or 'T2' in your mind before answering.",
      },
    ],
    formulas: [
      {
        name: "Dual Relationship Matrix",
        latex: "\\text{Text 2 vs Text 1} \\in \\{\\text{Rebuttal}, \\text{Extension}, \\text{Qualification}, \\text{Alternative Explanation}\\}",
        explanation: "Classification of inter-textual rhetorical relationships.",
      },
    ],
  },

  // ==========================================
  // READING & WRITING: EXPRESSION OF IDEAS (ENG-TRA, ENG-SYN)
  // ==========================================
  "ENG-TRA": {
    code: "ENG-TRA",
    section: "READING_WRITING",
    domain: "Expression of Ideas",
    title_en: "Transitions & Logical Connectors",
    title_uz: "Mantiqiy bog'lovchilar va o'tish so'zlari",
    collegePandaChapter: "Digital SAT Transitions Matrix: Contrast, Causation, Addition & Exemplification",
    yieldTier: "HIGHEST YIELD",
    frequencyPercent: "12–15% of RW",
    description_en: "Select the precise transitional word or phrase that correctly establishes the logical relationship between two consecutive sentences.",
    description_uz: "Ikki gap orasidagi mantiqiy aloqani (zidlik, sabab-oqibat, qo'shimcha ma'lumot yoki misol) to'g'ri ifodalovchi bog'lovchini tanlash.",
    firstPrinciples: {
      coreConcept: "Transitions act as logical road signs. To find the correct transition: 1. Read Sentence 1 and summarize its idea. 2. Read Sentence 2 WITHOUT the transition. 3. Determine the relationship category: Addition, Contrast, Causation, or Clarification.",
      uzbekSummary: "O'tish so'zlari mantiqiy yo'l belgilaridir. 1-gapni o'qing, 2-gapni o'tish so'zisiz o'qing va ular orasidagi munosabat turini aniqlang: Zidlik (However), Sabab-oqibat (Therefore), Qo'shimcha (Moreover) yoki Aniqlovchi (In fact).",
      keyPoints: [
        "Category 1: Contrast (However, Conversely, Nonetheless, On the other hand).",
        "Category 2: Cause & Effect (Therefore, Consequently, Thus, As a result).",
        "Category 3: Addition / Continuation (Furthermore, Moreover, In addition, Additionally).",
        "Category 4: Clarification / Restatement (Indeed, In fact, Specifically, For example).",
        "Elimination Hack: If two answer choices belong to the EXACT same category (e.g. 'Furthermore' and 'Moreover'), BOTH must be wrong!",
      ],
    },
    traps: [
      {
        title: "Category Twin Elimination Overlook",
        explanation: "Struggling to choose between 'Additionally' and 'Furthermore' when both perform identical semantic functions.",
        avoidTip: "Since the SAT has only one correct answer, two identical category choices automatically eliminate each other!",
      },
      {
        title: "Reading Sentence 2 With the Existing Transition",
        explanation: "Letting the placeholder transition bias your interpretation of sentence 2's meaning.",
        avoidTip: "Always mentally cross out the blank and read sentence 2 cleanly on its own.",
      },
    ],
    formulas: [
      {
        name: "Transition Functional Categories",
        latex: "\\text{Relationship} \\in \\{\\text{Contrast}(\\ne), \\text{Causation}(\\implies), \\text{Addition}(+), \\text{Restatement}(\\equiv)\\}",
        explanation: "Binary categorization of inter-sentential coherence markers.",
      },
    ],
    diagramKey: "rhetorical_transitions",
  },

  "ENG-SYN": {
    code: "ENG-SYN",
    section: "READING_WRITING",
    domain: "Expression of Ideas",
    title_en: "Rhetorical Synthesis (Bullet-Point Notes)",
    title_uz: "Ritorik sintez (Talaba qaydlari)",
    collegePandaChapter: "Digital SAT Student Notes & Bullet-Point Synthesizer",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "8–10% of RW",
    description_en: "Select the sentence that most effectively combines relevant bullet-point notes to achieve a student's specified rhetorical goal.",
    description_uz: "Berilgan konspekt qaydlaridan foydalanib, savolda belgilangan aniq maqsadga eng to'g'ri erishadigan variantni tanlash.",
    firstPrinciples: {
      coreConcept: "DO NOT READ THE BULLET POINTS FIRST! The prompt ALWAYS ends with a specific prompt instruction: 'The student wants to [EMPHASIZE X] or [CONTRAST Y].' The correct answer is the choice that achieves THAT SPECIFIC GOAL, regardless of how accurate other choices are.",
      uzbekSummary: "AVVAL QAYDLARNI O'QIMANG! Savol oxiridagi topshiriqqa qarang: 'The student wants to...'. To'g'ri javob – aynan shu maqsadni bajargan variantdir. Boshqa variantlar faktik to'g'ri bo'lsa ham, savol maqsadiga javob bermasa xatodir.",
      keyPoints: [
        "Step 1: Read the prompt's final goal sentence first.",
        "Step 2: Isolate the key goal condition (e.g. 'introduce the artist and her medium', 'contrast the two studies').",
        "Step 3: Eliminate choices that fail to fulfill the stated goal, even if their facts are accurate.",
        "Step 4: Verify that the chosen sentence contains no factual errors compared to the notes.",
      ],
    },
    traps: [
      {
        title: "Factual Accuracy without Goal Alignment Trap",
        explanation: "An answer choice is 100% true based on the bullet points, but it answers the WRONG goal (e.g. it describes history instead of contrasting findings).",
        avoidTip: "Always re-check the last sentence: 'The student wants to...'. Goal satisfaction beats general truth.",
      },
    ],
    formulas: [
      {
        name: "Synthesis Priority Invariant",
        latex: "\\text{Correct Choice} = \\text{Factual Accuracy} \\cap \\text{Exact Goal Compliance}",
        explanation: "Compliance with the prompt's specific rhetorical objective is strictly required.",
      },
    ],
    diagramKey: "rhetorical_synthesis",
  },

  // ==========================================
  // READING & WRITING: CONVENTIONS (ENG-BOU, ENG-MOD, ENG-AGR)
  // ==========================================
  "ENG-BOU": {
    code: "ENG-BOU",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    title_en: "Boundaries: Semicolons, Colons & Dashes",
    title_uz: "Tinish belgilari: Nuqtali vergul, Ikki nuqta va Chiziqcha",
    collegePandaChapter: "Digital SAT Grammar: Punctuation, Clause Boundaries & Semicolons",
    yieldTier: "HIGHEST YIELD",
    frequencyPercent: "14–16% of RW",
    description_en: "Connect independent and dependent clauses correctly using periods, semicolons, colons, em-dashes, and commas without comma splices or run-ons.",
    description_uz: "Mustaqil va ergash gaplarni nuqta, nuqtali vergul, ikki nuqta, chiziqcha va vergullar yordamida grammatik xatolarsiz (comma splice, run-on) bog'lash.",
    firstPrinciples: {
      coreConcept: "An Independent Clause (IC) contains a subject and conjugated verb and can stand alone as a complete sentence. Two ICs cannot be joined by a comma alone (Comma Splice). They require: 1. Period (. ), 2. Semicolon (; ), 3. Comma + FANBOYS (, and ), or 4. Colon (: if second explains first).",
      uzbekSummary: "Mustaqil gap (IC) mustaqil ma'noga ega bo'lgan to'liq gapdir. Ikkita mustaqil gapni shunchaki vergul bilan ulab bo'lmaydi (Comma Splice xatosi). Ular nuqta, nuqtali vergul, ', and/but' (FANBOYS) yoki ikki nuqta bilan bog'lanishi shart.",
      keyPoints: [
        "Semicolon Rule: IC ; IC (both sides must be complete sentences). Semicolon = Period.",
        "Colon Rule: IC : Explanation / List / Name (left side MUST be a complete independent clause).",
        "Em-Dash Rule: Single dash acts like a colon (IC — detail). Double dashes act like parentheses for non-essential info (— ... —).",
        "FANBOYS: IC, [for/and/nor/but/or/yet/so] IC.",
        "Comma Splice Violation: IC, IC is NEVER grammatically acceptable.",
      ],
    },
    traps: [
      {
        title: "Colon Preceded by Incomplete Sentence",
        explanation: "Using a colon after 'such as' or 'including' (e.g. 'He bought many fruits such as: apples, oranges').",
        avoidTip: "The clause BEFORE a colon must ALWAYS be a complete independent clause that could take a period.",
      },
      {
        title: "Semicolon with Conjunction Error",
        explanation: "Writing IC ; and IC (combining semicolon with coordinating conjunction).",
        avoidTip: "A semicolon replaces 'comma + and'. Never put 'and' immediately after a semicolon.",
      },
    ],
    formulas: [
      {
        name: "Clause Boundary Equations",
        latex: "\\text{IC} ; \\text{IC} \\quad \\iff \\quad \\text{IC} . \\text{IC} \\quad \\iff \\quad \\text{IC}, \\text{FANBOYS } \\text{IC}",
        explanation: "Grammatically equivalent methods to separate two independent clauses.",
      },
      {
        name: "Colon Invariant",
        latex: "\\text{Independent Clause} : \\text{Explanation, List, or Emphasis}",
        explanation: "Pre-colon clause must form a complete syntactically independent unit.",
      },
    ],
    diagramKey: "sentence_boundaries",
  },

  "ENG-MOD": {
    code: "ENG-MOD",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    title_en: "Modifier Placement & Dangling Participles",
    title_uz: "Aniqlovchilar joylashuvi (Dangling modifiers)",
    collegePandaChapter: "Digital SAT Grammar: Modifiers & Participial Phrases",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "7–9% of RW",
    description_en: "Ensure introductory participial and descriptive modifying phrases are immediately adjacent to the noun they logically describe, eliminating dangling modifiers.",
    description_uz: "Kirish aniqlovchi iboralari va sifatdosh shakllari o'zi ta'riflayotgan otning yonida turishini ta'minlash va mantiqsiz 'dangling modifier' xatolarini tuzatish.",
    firstPrinciples: {
      coreConcept: "A descriptive modifier must be placed as close as possible to the noun it modifies. An introductory modifying phrase MUST be immediately followed by the noun performing the action. If the wrong noun follows the comma, the modifier dangles.",
      uzbekSummary: "Ta'riflovchi ibora o'zi ta'riflayotgan otning roppa-rosa yonida turishi shart. Masalan, 'O'rmonda ketayotib, daraxtlar chiroyli ko'rindi' xato, chunki o'rmonda daraxtlar ketayotgani yo'q, inson ketayotgan edi.",
      keyPoints: [
        "Formula: [Introductory Modifying Phrase], [Logical Subject] + [Verb]...",
        "Dangling error: 'Having finished the test, the bell rang.' (The bell didn't finish the test!). Correct: 'Having finished the test, Sarah heard the bell ring.'",
        "Misplaced modifier: Keep modifiers next to what they describe to avoid absurd misattributions.",
      ],
    },
    traps: [
      {
        title: "Possessive Noun Dangling Trap",
        explanation: "Writing 'Walking into the room, Maria's eyes widened.' (Maria's eyes were not walking into the room; Maria was!).",
        avoidTip: "Ensure the noun right after the comma is the actual person/agent ('Maria'), not their possession ('Maria's eyes').",
      },
    ],
    formulas: [
      {
        name: "Modifier Alignment Rule",
        latex: "[\\text{Modifying Phrase}], \\quad \\mathbf{[\\text{Target Noun}]} + [\\text{Predicate}]",
        explanation: "Target noun must immediately follow the introductory comma delimiter.",
      },
    ],
  },

  "ENG-AGR": {
    code: "ENG-AGR",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    title_en: "Form, Structure, and Sense (Agreement & Verbs)",
    title_uz: "Ega-kesim moslashuvi va fe'l shakllari",
    collegePandaChapter: "Digital SAT Grammar: Subject-Verb Agreement, Verb Tenses & Parallelism",
    yieldTier: "HIGH YIELD",
    frequencyPercent: "8–10% of RW",
    description_en: "Verify grammatical concordance between subjects and conjugated verbs across intervening prepositional phrases, maintain tense consistency, and ensure parallel structure.",
    description_uz: "Ega va kesimning birlik/ko'plikda moslashuvi, oradagi qo'shimcha iboralar (prepositional phrases) ta'sirini bartaraf qilish va zamonlar izchilligi.",
    firstPrinciples: {
      coreConcept: "A singular subject requires a singular verb (ending in -s in present tense: 'The cat sleeps'). A plural subject requires a plural verb ('The cats sleep'). Intervening prepositional phrases never change the number of the subject.",
      uzbekSummary: "Birlikdagi ega birlikdagi fe'l bilan (-s qo'shimchasi bilan), ko'plikdagi ega ko'plikdagi fe'l bilan kelishi shart. Ega bilan kesim orasidagi 'of...', 'in...' kabi iboralar eganing birlik yoki ko'plikligini o'zgartirmaydi.",
      keyPoints: [
        "Cross out prepositional phrases: In 'The collection of rare postage stamps [is/are] valuable', cross out 'of rare postage stamps'. Subject is 'collection' (singular) -> 'is'.",
        "Compound subjects with 'and' are plural: 'The boy and his dog are playing.'",
        "Tense consistency: Keep past tense verbs consistent with preceding historical context unless a clear shift in time occurs.",
        "Parallelism: Elements in a list must match grammatical form (e.g. swimming, biking, and running).",
      ],
    },
    traps: [
      {
        title: "Intervening Prepositional Distractor Trap",
        explanation: "In 'A box of antique coins were found', matching the verb to the plural object 'coins' instead of the true singular subject 'box'.",
        avoidTip: "Mentally eliminate everything between the subject and the verb before choosing the verb form.",
      },
    ],
    formulas: [
      {
        name: "Subject-Verb Invariant",
        latex: "\\text{Subject}_{\\text{singular}} + \\text{Verb}_{\\text{singular}}(-s) \\quad \\text{vs} \\quad \\text{Subject}_{\\text{plural}} + \\text{Verb}_{\\text{plural}}(\\text{base})",
        explanation: "Grammatical number agreement must hold regardless of intervening clause length.",
      },
    ],
  },
};
