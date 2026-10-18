export interface KhanSkillLesson {
  id: string;
  title: string;
  difficulty: "Foundations" | "Medium" | "Advanced";
  domain: "Algebra" | "Problem Solving and Data Analysis" | "Advanced Math" | "Geometry and Trigonometry" | "General";
  topicCode: string; // Maps to Vespera official topic codes
  description: string;
  lessonContent: {
    overview_uz: string;
    overview_en: string;
    firstPrinciples: string[];
    rules: { name: string; formula: string; explanation: string }[];
    desmosBypass: { title: string; keys: string; tip: string };
  };
  basicExample: {
    question: string;
    choices?: string[];
    stepByStep: string[];
    correctAnswer: string;
    takeaway: string;
  };
  harderExample: {
    question: string;
    choices?: string[];
    trapAnalysis: string;
    solution: string;
    correctAnswer: string;
    speedHack: string;
  };
}

export interface KhanUnit {
  unitNumber: number;
  id: string;
  title: string;
  tier: "Foundations" | "Medium" | "Advanced" | "General";
  domain: string;
  description_en: string;
  description_uz: string;
  skills: KhanSkillLesson[];
}

export const KHAN_SAT_MATH_UNITS: KhanUnit[] = [
  // ==========================================
  // UNIT 1: ABOUT THE SAT
  // ==========================================
  {
    unitNumber: 1,
    id: "unit-01-about-sat",
    title: "Unit 1: About the Digital SAT Math",
    tier: "General",
    domain: "Orientation & Test Strategy",
    description_en: "Comprehensive orientation on the Digital SAT structure, multistage adaptive testing, scoring scales, pacing algorithms, and Built-in Desmos graphing.",
    description_uz: "Digital SAT imtihoni tuzilishi, 2 bosqichli adaptiv modullar, ball shkalasi, vaqtni to'g'ri taqsimlash va o'rnatilgan Desmos kalkulyatoridan to'liq foydalanish sirlari.",
    skills: [
      {
        id: "skill-u1-structure",
        title: "Digital SAT Math Structure & Adaptive Engine",
        difficulty: "Foundations",
        domain: "General",
        topicCode: "ALG-01",
        description: "Understanding Module 1, Module 2 (Easy vs Hard routing), and the 200–800 score scale.",
        lessonContent: {
          overview_uz: "Digital SAT Math 2 ta modullardan iborat (har birida 22 ta savol, 35 daqiqadan). Modul 1 dagi natijangizga qarab tizim sizni Modul 2 ning Hard yoki Easy versiyasiga yo'naltiradi. 700+ ball olish uchun Modul 1 da kamida 15-18 ta to'g'ri yechib, Hard Modul 2 ga o'tish shart!",
          overview_en: "The Digital SAT Math contains 2 modules (22 questions each, 35 minutes each). Your Module 1 accuracy determines whether you route into the Harder or Easier Module 2. Scoring 700+ requires routing into Hard Module 2 by achieving at least 15-18 correct in Module 1.",
          firstPrinciples: [
            "Total 44 questions across 70 minutes (average 95 seconds per question).",
            "Approximately 75% Multiple Choice, 25% Student-Produced Response (grid-in).",
            "No penalty for guessing — never leave any question blank!",
            "Desmos is available on 100% of the Math section."
          ],
          rules: [
            { name: "Pacing Formula", formula: "t_{avg} = 95\\text{ seconds/question}", explanation: "Solve Easy questions in 30-45s to bank 2.5 minutes for Hard questions." },
            { name: "Score Floor", formula: "\\text{Easy Mod 2 Max} \\approx 600-640", explanation: "If routed to Easy Module 2, the score is capped around 600-640." }
          ],
          desmosBypass: {
            title: "Desmos Full Screen Toggle",
            keys: "Gear icon -> Zoom Fit or drag to inspect intercepts",
            tip: "Use split-screen with Desmos on Vespera to mimic the Bluebook testing window."
          }
        },
        basicExample: {
          question: "How many questions are in each Math module, and what is the allotted time?",
          choices: ["A. 20 questions, 30 min", "B. 22 questions, 35 min", "C. 27 questions, 32 min", "D. 30 questions, 45 min"],
          stepByStep: ["Module 1 has 22 questions in 35 minutes.", "Module 2 has 22 questions in 35 minutes.", "Total: 44 questions in 70 minutes."],
          correctAnswer: "B",
          takeaway: "Internalize 35 minutes for 22 questions: pacing check at question 11 should be around 17:30 remaining."
        },
        harderExample: {
          question: "A student answers 19/22 in Module 1 correctly. In Module 2 (Hard), they miss 5 questions. What is their approximate score band?",
          choices: ["A. 580-620", "B. 650-680", "C. 710-750", "D. 770-800"],
          trapAnalysis: "Many students think missing 5 questions drops them below 700. In Hard Module 2, each question is weighted with higher discrimination, so missing 5 in Hard Mod 2 easily keeps you in 710-750!",
          solution: "Routing to Hard Module 2 unlocks the 800 ceiling. Missing 3-5 questions in Hard Mod 2 yields roughly 720-750.",
          correctAnswer: "C",
          speedHack: "Never fear Hard questions — getting into Hard Module 2 guarantees your score ceiling is 800."
        }
      }
    ]
  },

  // ==========================================
  // UNIT 2: FOUNDATIONS: ALGEBRA
  // ==========================================
  {
    unitNumber: 2,
    id: "unit-02-foundations-algebra",
    title: "Unit 2: Foundations: Algebra",
    tier: "Foundations",
    domain: "Algebra",
    description_en: "Core foundational algebraic mechanics: one-variable linear equations, basic inequalities, foundational word problems, and graphing linear functions.",
    description_uz: "Algebraning eng muhim poydevori: bir o'zgaruvchili tenglamalar, sodda tengsizliklar, boshlang'ich matnli masalalar va to'g'ri chiziq grafiklari.",
    skills: [
      {
        id: "skill-u2-linear-eq",
        title: "Solving Linear Equations & Inequalities: Foundations",
        difficulty: "Foundations",
        domain: "Algebra",
        topicCode: "ALG-01",
        description: "Direct algebraic isolation, balance scale transformations, and one-step linear inequalities.",
        lessonContent: {
          overview_uz: "Chiziqli tenglama $ax + b = c$ shaklida bo'ladi. Asosiy maqsad: $x$ ni yolg'iz qoldirish (izolyatsiya qilish). Tenglamaning har ikki tomoniga bir xil amal bajaring. Tengsizlikda manfiy songa ko'paytirsangiz yoki bo'lsangiz, tengsizlik belgisi teskarisiga o'zgaradi!",
          overview_en: "A linear equation takes the form ax + b = c. The core objective is isolating the variable x. Apply the inverse operations equally to both sides. In inequalities, multiplying or dividing by a negative number flips the inequality symbol!",
          firstPrinciples: [
            "Inverse Operations: Addition undoes subtraction; division undoes multiplication.",
            "Combine like terms on each side before moving variables across the equal sign.",
            "Inequality Flip Rule: If -2x < 6, dividing by -2 yields x > -3."
          ],
          rules: [
            { name: "Isolating Variable", formula: "ax + b = c \\implies ax = c - b \\implies x = \\frac{c - b}{a}", explanation: "Subtract constant first, then divide by coefficient a." },
            { name: "Negative Inequality Invariant", formula: "-kx < c \\iff x > -\\frac{c}{k} \\quad (k > 0)", explanation: "Direction changes whenever multiplying or dividing by negative values." }
          ],
          desmosBypass: {
            title: "Desmos Auto-Solve",
            keys: "Type '3x - 7 = 14' into Line 1",
            tip: "Desmos plots a vertical line at the exact solution x = 7. Read the x-intercept directly!"
          }
        },
        basicExample: {
          question: "If $4x - 9 = 15$, what is the value of $x$?",
          choices: ["A. 4", "B. 5", "C. 6", "D. 7"],
          stepByStep: [
            "Step 1: Add 9 to both sides: $4x = 15 + 9 = 24$.",
            "Step 2: Divide both sides by 4: $x = \\frac{24}{4} = 6$."
          ],
          correctAnswer: "C",
          takeaway: "Always check your answer by plugging back in: 4(6) - 9 = 24 - 9 = 15."
        },
        harderExample: {
          question: "If $-3(2x - 5) \\ge 21$, which of the following describes all possible values of $x$?",
          choices: ["A. x \\le -1", "B. x \\ge -1", "C. x \\le 6", "D. x \\ge 6"],
          trapAnalysis: "Students often forget to flip the inequality sign when dividing by -3, or miscalculate -3 * -5 = +15.",
          solution: "Divide both sides by -3 and flip the sign: 2x - 5 <= -7. Add 5: 2x <= -2. Divide by 2: x <= -1.",
          correctAnswer: "A",
          speedHack: "Type '-3(2x - 5) >= 21' into Desmos. Look at the shaded boundary: it shades to the left of x = -1 (meaning x <= -1)!"
        }
      },
      {
        id: "skill-u2-word-prob",
        title: "Linear Equation Word Problems: Foundations",
        difficulty: "Foundations",
        domain: "Algebra",
        topicCode: "ALG-01",
        description: "Translating real-world rates, fixed fees, and budget constraints into standard linear models.",
        lessonContent: {
          overview_uz: "SAT dagi eng mashhur matnli masala: Boshlang'ich to'lov (Fixed Fee / y-intercept) va Soatlik/Birlik to'lov (Rate / Slope). Formula doimo: Jami = (Birlik narx × miqdor) + Boshlang'ich to'lov.",
          overview_en: "The most classic SAT word problem: Initial Fixed Fee (y-intercept) and Hourly/Unit Rate (slope). The universal model is: Total = (Rate * Quantity) + Initial Value (y = mx + b).",
          firstPrinciples: [
            "'Per', 'each', 'every' indicates the slope m (rate of change).",
            "'Flat fee', 'initial deposit', 'starting amount' indicates the y-intercept b.",
            "Match units carefully: if rate is per minute, hours must be converted to minutes."
          ],
          rules: [
            { name: "Linear Cost Model", formula: "C(x) = m x + b", explanation: "m = variable rate per unit x, b = fixed initial startup fee." }
          ],
          desmosBypass: {
            title: "Desmos Word Equation Solver",
            keys: "Type '45 + 18x = 117' in Desmos",
            tip: "The vertical line instantly shows x = 4. No algebra needed."
          }
        },
        basicExample: {
          question: "A plumber charges a $\\$50$ house-call diagnostic fee plus $\\$35$ per hour of repair. If the total bill was $\\$190$, how many hours did the repair take?",
          choices: ["A. 3", "B. 4", "C. 5", "D. 6"],
          stepByStep: [
            "Set up equation: Total = 35h + 50.",
            "35h + 50 = 190.",
            "Subtract 50: 35h = 140.",
            "Divide by 35: h = 4 hours."
          ],
          correctAnswer: "B",
          takeaway: "Identify '35 per hour' as slope and '50 fee' as constant intercept."
        },
        harderExample: {
          question: "An internet service provider charges a $\\$20$ activation fee and $\\$45$ per month. A competitor charges no activation fee and $\\$50$ per month. After how many months will the total costs be equal?",
          choices: ["A. 2", "B. 4", "C. 5", "D. 8"],
          trapAnalysis: "Students often calculate the difference in 1 month (50 - 45 = 5) but forget to divide the initial fee gap (20) by 5.",
          solution: "Set Provider 1 = Provider 2: 45m + 20 = 50m. Subtract 45m: 20 = 5m => m = 4 months.",
          correctAnswer: "B",
          speedHack: "Type '45x + 20' on Line 1 and '50x' on Line 2 in Desmos. Tap the intersection point: (4, 200). The answer is x = 4!"
        }
      },
      {
        id: "skill-u2-linear-graphs",
        title: "Graphs of Linear Equations & Functions: Foundations",
        difficulty: "Foundations",
        domain: "Algebra",
        topicCode: "ALG-02",
        description: "Slope-intercept form y = mx + b, finding slopes from two points, and interpreting graphs.",
        lessonContent: {
          overview_uz: "To'g'ri chiziq formulasi: $y = mx + b$. Bu yerda $m = \\frac{y_2 - y_1}{x_2 - x_1}$ (qiyalik - slope). Agar $m > 0$ bo'lsa chiziq yuqoriga ko'tariladi, $m < 0$ bo'lsa pastga tushadi. $b$ esa $y$-o'qini kesib o'tish nuqtasi $(0, b)$.",
          overview_en: "Slope-intercept form: y = mx + b. The slope is m = (y2 - y1) / (x2 - x1) (rise over run). If m > 0 the line slopes upward; if m < 0 it slopes downward. b is the y-intercept at coordinate (0, b).",
          firstPrinciples: [
            "Slope = Change in y / Change in x (Rise / Run).",
            "Horizontal line has slope m = 0 (y = c).",
            "Vertical line has undefined slope (x = c).",
            "Parallel lines have IDENTICAL slopes (m1 = m2)."
          ],
          rules: [
            { name: "Slope Formula", formula: "m = \\frac{y_2 - y_1}{x_2 - x_1}", explanation: "Subtract y-coordinates over x-coordinates in the exact same order." },
            { name: "Perpendicular Slope", formula: "m_\\perp = -\\frac{1}{m}", explanation: "Perpendicular lines have negative reciprocal slopes (product = -1)." }
          ],
          desmosBypass: {
            title: "Desmos Table for Slope",
            keys: "Click + -> Table -> Enter (x1, y1) and (x2, y2). Type y1 ~ m x1 + b",
            tip: "Desmos immediately displays the exact slope m and intercept b in milliseconds!"
          }
        },
        basicExample: {
          question: "What is the slope of the line passing through $(3, 7)$ and $(8, 17)$?",
          choices: ["A. 1/2", "B. 2", "C. 3", "D. 5"],
          stepByStep: [
            "Apply slope formula: m = (17 - 7) / (8 - 3).",
            "Numerator: 17 - 7 = 10.",
            "Denominator: 8 - 3 = 5.",
            "m = 10 / 5 = 2."
          ],
          correctAnswer: "B",
          takeaway: "Check: from (3,7) to (8,17), x increases by 5, y increases by 10, 10/5 = 2."
        },
        harderExample: {
          question: "Line $k$ has equation $3x + 2y = 12$. Line $p$ is perpendicular to line $k$. What is the slope of line $p$?",
          choices: ["A. -3/2", "B. -2/3", "C. 2/3", "D. 3/2"],
          trapAnalysis: "Students mistakenly think the slope of 3x + 2y = 12 is 3. In standard form Ax + By = C, slope is -A/B = -3/2! Then perpendicular is negative reciprocal.",
          solution: "1. Convert to slope-intercept: 2y = -3x + 12 => y = (-3/2)x + 6. Slope of k is -3/2. 2. Perpendicular slope is -1 / (-3/2) = +2/3.",
          correctAnswer: "C",
          speedHack: "Standard form slope trick: m = -A/B. Perpendicular slope = +B/A. Here A=3, B=2, so B/A = 2/3!"
        }
      }
    ]
  },

  // ==========================================
  // UNIT 3: FOUNDATIONS: PROBLEM SOLVING & DATA
  // ==========================================
  {
    unitNumber: 3,
    id: "unit-03-foundations-psda",
    title: "Unit 3: Foundations: Problem Solving & Data Analysis",
    tier: "Foundations",
    domain: "Problem Solving and Data Analysis",
    description_en: "Ratios, proportions, unit conversions, percentages, and basic statistical measures (mean, median, range).",
    description_uz: "Nisbat va proporsiya, birliklarni o'girish (unit conversion), foizlar va boshlang'ich statistika (o'rtacha arifmetik, mediana, diapazon).",
    skills: [
      {
        id: "skill-u3-ratios-percents",
        title: "Ratios, Rates & Percentages: Foundations",
        difficulty: "Foundations",
        domain: "Problem Solving and Data Analysis",
        topicCode: "DAT-01",
        description: "Cross-multiplication proportions, percentage increases/decreases, and dimensional unit conversion.",
        lessonContent: {
          overview_uz: "Proporsiya: $\\frac{a}{b} = \\frac{c}{d} \\implies a \\cdot d = b \\cdot c$. Foizda: $p\\%$ bu $\\frac{p}{100}$ degani. Agar son $20\\%$ ga oshsa, uni $1.20$ ga ko'paytiramiz; agar $15\\%$ ga kamaysa, $0.85$ ga ko'paytiramiz.",
          overview_en: "Proportions: a/b = c/d implies a*d = b*c. A percent means p/100. A 20% increase equals multiplying by (1 + 0.20) = 1.20; a 15% decrease equals multiplying by (1 - 0.15) = 0.85.",
          firstPrinciples: [
            "Multiplier Method: New = Original * (1 +/- percent as decimal).",
            "Percent of a number: 'is' means equal (=), 'of' means multiply (*).",
            "Dimensional Analysis: Multiply by conversion factors so unwanted units cancel out."
          ],
          rules: [
            { name: "Percent Change", formula: "\\% \\text{ Change} = \\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100", explanation: "Always divide by the original (Old) baseline value." },
            { name: "Unit Multiplier", formula: "1\\text{ hour} = 60\\text{ min}, \\quad 1\\text{ mile} = 5280\\text{ ft}", explanation: "Line up fractions so units cancel diagonally." }
          ],
          desmosBypass: {
            title: "Desmos Percentage Multiplier",
            keys: "Type '85 * (1 + 0.18)' directly into Desmos",
            tip: "Desmos evaluates percentages instantly without doing scratch arithmetic."
          }
        },
        basicExample: {
          question: "A store reduces the price of a $\\$120$ jacket by $25\\%$. What is the sale price of the jacket?",
          choices: ["A. $\\$85", "B. $\\$90", "C. $\\$95", "D. $\\$100"],
          stepByStep: [
            "Method 1: Discount = 0.25 * 120 = $\\$30$. Sale price = 120 - 30 = $\\$90$.",
            "Method 2 (Fast): Sale price = 120 * (1 - 0.25) = 120 * 0.75 = $\\$90$."
          ],
          correctAnswer: "B",
          takeaway: "Direct multiplier: a 25% discount means you pay 75% of the original."
        },
        harderExample: {
          question: "An antique increased in value by $20\\%$ in year 1, and then decreased by $20\\%$ in year 2. If the initial value was $\\$500$, what is the final value?",
          choices: ["A. $\\$480", "B. $\\$500", "C. $\\$520", "D. $\\$540"],
          trapAnalysis: "Classic SAT trap! Students assume +20% and -20% cancel each other out back to 500. They DO NOT because the second percentage is taken on a larger baseline!",
          solution: "Year 1: 500 * 1.20 = 600. Year 2: 600 * 0.80 = 480. Net change is 500 * (1.20 * 0.80) = 500 * 0.96 = $\\$480$ (a 4% net loss!).",
          correctAnswer: "A",
          speedHack: "Always multiply successive multipliers: (1 + 0.20)(1 - 0.20) = 1 - 0.04 = 0.96. 500 * 0.96 = 480!"
        }
      }
    ]
  },

  // ==========================================
  // UNIT 4: FOUNDATIONS: ADVANCED MATH
  // ==========================================
  {
    unitNumber: 4,
    id: "unit-04-foundations-adv-math",
    title: "Unit 4: Foundations: Advanced Math",
    tier: "Foundations",
    domain: "Advanced Math",
    description_en: "Foundations of quadratic functions, factoring binomials, exponent laws, and basic radical simplifications.",
    description_uz: "Murakkab matematikaning poydevori: kvadrat tenglamalar, ko'paytuvchilarga ajratish, daraja qoidalari va ildizlarni soddalashtirish.",
    skills: [
      {
        id: "skill-u4-factoring-quadratics",
        title: "Factoring & Solving Quadratics: Foundations",
        difficulty: "Foundations",
        domain: "Advanced Math",
        topicCode: "ADV-02",
        description: "Zero product property, factoring trinomials x^2 + bx + c, and difference of squares.",
        lessonContent: {
          overview_uz: "Kvadrat tenglama $ax^2 + bx + c = 0$ ko'rinishida bo'ladi. Agar ko'paytma nolga teng bo'lsa $(x - p)(x - q) = 0$, demak har bir qavs nolga teng: $x = p$ yoki $x = q$. Kvadratlar ayirmasi: $x^2 - a^2 = (x - a)(x + a)$.",
          overview_en: "A quadratic equation is ax^2 + bx + c = 0. The zero product property states that if (x - p)(x - q) = 0, then x = p or x = q. The difference of squares formula is: x^2 - a^2 = (x - a)(x + a).",
          firstPrinciples: [
            "Difference of two squares: a^2 - b^2 = (a - b)(a + b).",
            "Perfect square trinomials: (a +/- b)^2 = a^2 +/- 2ab + b^2.",
            "Roots/Zeros are the x-intercepts of the parabola where y = 0."
          ],
          rules: [
            { name: "Difference of Squares", formula: "x^2 - k^2 = (x - k)(x + k)", explanation: "Two terms with a minus sign factor into conjugate binomials." },
            { name: "Quadratic Formula", formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", explanation: "Universal solution for any quadratic equation." }
          ],
          desmosBypass: {
            title: "Desmos Instant Root Finder",
            keys: "Type 'y = x^2 - 5x + 6' in Desmos",
            tip: "Click on the gray dots on the x-axis. Desmos labels (2, 0) and (3, 0) directly!"
          }
        },
        basicExample: {
          question: "What are the solutions to the equation $x^2 - 7x + 12 = 0$?",
          choices: ["A. x = 2 and x = 6", "B. x = 3 and x = 4", "C. x = -3 and x = -4", "D. x = 1 and x = 12"],
          stepByStep: [
            "Find two numbers that multiply to 12 and add to -7.",
            "Numbers are -3 and -4, since (-3) * (-4) = 12 and (-3) + (-4) = -7.",
            "Factor: (x - 3)(x - 4) = 0.",
            "Set each factor to zero: x = 3 or x = 4."
          ],
          correctAnswer: "B",
          takeaway: "The signs in (x - 3)(x - 4) lead to positive roots x = +3 and x = +4."
        },
        harderExample: {
          question: "If $(2x - 3)^2 = 49$, what is the sum of the solutions to the equation?",
          choices: ["A. 0", "B. 3", "C. 7", "D. 10"],
          trapAnalysis: "Students expand the quadratic and use quadratic formula, wasting 90 seconds, or forget the negative square root (-7)!",
          solution: "Take the square root of both sides: 2x - 3 = 7 or 2x - 3 = -7. Case 1: 2x = 10 => x = 5. Case 2: 2x = -4 => x = -2. Sum of solutions = 5 + (-2) = 3.",
          correctAnswer: "B",
          speedHack: "Vieta's formula shortcut: for any equation (ax - b)^2 = c, expanding gives a^2 x^2 - 2ab x + ... The sum of roots is -(-2ab)/a^2 = 2b/a. Here 2(3)/2 = 3!"
        }
      }
    ]
  },

  // ==========================================
  // UNIT 5: FOUNDATIONS: GEOMETRY & TRIG
  // ==========================================
  {
    unitNumber: 5,
    id: "unit-05-foundations-geom-trig",
    title: "Unit 5: Foundations: Geometry & Trigonometry",
    tier: "Foundations",
    domain: "Geometry and Trigonometry",
    description_en: "Area and perimeter formulas, right triangle properties, Pythagorean theorem, and basic SOH CAH TOA trigonometry.",
    description_uz: "Geometriya asoslari: yuzalar va perimetrlar, to'g'ri burchakli uchburchak, Pifagor teoremasi va SOH CAH TOA trigonometriyasi.",
    skills: [
      {
        id: "skill-u5-triangles-trig",
        title: "Right Triangles & SOH CAH TOA: Foundations",
        difficulty: "Foundations",
        domain: "Geometry and Trigonometry",
        topicCode: "GEO-02",
        description: "Pythagorean theorem, special 30-60-90 / 45-45-90 ratios, and acute angle sine/cosine relationships.",
        lessonContent: {
          overview_uz: "To'g'ri burchakli uchburchakda gipotenuza $c$ eng uzun tomon: $a^2 + b^2 = c^2$. Trigonometrik nisbatlar: $\\sin(\\theta) = \\frac{\\text{Qarama-qarshi}}{\\text{Gipotenuza}}$, $\\cos(\\theta) = \\frac{\\text{Yondosh}}{\\text{Gipotenuza}}$, $\\tan(\\theta) = \\frac{\\text{Qarama-qarshi}}{\\text{Yondosh}}$. SAT dagi oltin qoida: $\\sin(x) = \\cos(90^\\circ - x)$!",
          overview_en: "In a right triangle, hypotenuse c satisfies a^2 + b^2 = c^2. SOH CAH TOA: sin = Opp/Hyp, cos = Adj/Hyp, tan = Opp/Adj. The Golden SAT Invariant: sin(x) = cos(90 deg - x) for complementary angles!",
          firstPrinciples: [
            "Pythagorean triples to memorize: 3-4-5, 5-12-13, 7-24-25, 8-15-17.",
            "Complementary Angle Theorem: If angle A + angle B = 90 deg, then sin(A) = cos(B).",
            "Special triangles: 45-45-90 (x, x, x*sqrt(2)) and 30-60-90 (x, x*sqrt(3), 2x)."
          ],
          rules: [
            { name: "Complementary Invariant", formula: "\\sin(A) = \\cos(B) \\iff A + B = 90^\\circ", explanation: "Whenever sin(expression 1) = cos(expression 2), sum them to 90 degrees." },
            { name: "Pythagorean Theorem", formula: "a^2 + b^2 = c^2", explanation: "c must strictly be the side opposite the 90-degree angle." }
          ],
          desmosBypass: {
            title: "Desmos Complementary Angle Solver",
            keys: "Type '(4x - 10) + (3x + 2) = 90'",
            tip: "Instant vertical line gives x immediately without manual algebra."
          }
        },
        basicExample: {
          question: "In a right triangle, one leg has length 6 and the other leg has length 8. What is the length of the hypotenuse?",
          choices: ["A. 9", "B. 10", "C. 12", "D. 14"],
          stepByStep: [
            "Use Pythagorean theorem: a^2 + b^2 = c^2.",
            "6^2 + 8^2 = 36 + 64 = 100.",
            "c = sqrt(100) = 10.",
            "Notice this is simply the 3-4-5 triangle scaled by a factor of 2!"
          ],
          correctAnswer: "B",
          takeaway: "Spotting scaled 3-4-5 triples saves 30 seconds of calculation on test day."
        },
        harderExample: {
          question: "In a right triangle, $\\sin(4x - 12)^\\circ = \\cos(2x + 18)^\\circ$. What is the value of $x$?",
          choices: ["A. 14", "B. 17", "C. 21", "D. 24"],
          trapAnalysis: "Students attempt to compute inverse sine or cosine on calculator, getting confused. The rule states: the angles MUST sum to 90 degrees!",
          solution: "Set (4x - 12) + (2x + 18) = 90. Group terms: 6x + 6 = 90 => 6x = 84 => x = 14.",
          correctAnswer: "A",
          speedHack: "Type '(4x - 12) + (2x + 18) = 90' directly into Desmos. Read x = 14 immediately!"
        }
      }
    ]
  },

  // ==========================================
  // UNITS 6–9: MEDIUM TRACK
  // ==========================================
  {
    unitNumber: 6,
    id: "unit-06-medium-algebra",
    title: "Unit 6: Medium: Algebra",
    tier: "Medium",
    domain: "Algebra",
    description_en: "Systems of linear equations with substitution and elimination, two-variable inequalities, and multi-step linear modeling.",
    description_uz: "Chiziqli tenglamalar sistemasi (o'rniga qo'yish va qo'shish usullari), ikki o'zgaruvchili tengsizliklar va ko'p bosqichli chiziqli modellar.",
    skills: [
      {
        id: "skill-u6-systems",
        title: "Solving Systems of Linear Equations: Medium",
        difficulty: "Medium",
        domain: "Algebra",
        topicCode: "ALG-03",
        description: "Solving 2x2 systems with substitution/elimination, and intersection point analysis.",
        lessonContent: {
          overview_uz: "Chiziqli sistemada ikkita to'g'ri chiziqning kesishish nuqtasi $(x, y)$ topiladi. Agar chiziqlar parallel bo'lsa: yechim yo'q (No solution). Agar ustma-ust tushsa: cheksiz yechim (Infinitely many solutions).",
          overview_en: "A linear system solves for the intersection point (x, y) of two lines. Parallel lines have No Solution; identical coincident lines have Infinitely Many Solutions.",
          firstPrinciples: [
            "Intersection Point: The coordinate (x, y) that satisfies both equations simultaneously.",
            "Elimination: Multiply an equation to match coefficients and add/subtract to cancel one variable.",
            "Desmos graphs both lines simultaneously — tap intersection to see (x, y)."
          ],
          rules: [
            { name: "No Solution Criteria", formula: "\\frac{A_1}{A_2} = \\frac{B_1}{B_2} \\neq \\frac{C_1}{C_2}", explanation: "Slopes are equal but y-intercepts differ." },
            { name: "Infinite Solutions Criteria", formula: "\\frac{A_1}{A_2} = \\frac{B_1}{B_2} = \\frac{C_1}{C_2}", explanation: "Both equations are scalar multiples of the exact same line." }
          ],
          desmosBypass: {
            title: "Desmos System Intersection",
            keys: "Type Eq 1 in Line 1, Eq 2 in Line 2",
            tip: "Click on the intersection point of the two colored lines to reveal (x, y)."
          }
        },
        basicExample: {
          question: "Consider the system:\n$$2x + y = 11$$\n$$x - y = 1$$\nWhat is the value of $x$?",
          choices: ["A. 3", "B. 4", "C. 5", "D. 6"],
          stepByStep: [
            "Add both equations together to eliminate y: (2x + y) + (x - y) = 11 + 1.",
            "3x = 12.",
            "x = 4."
          ],
          correctAnswer: "B",
          takeaway: "Elimination is fastest when variable coefficients are opposites (+y and -y)."
        },
        harderExample: {
          question: "The system of equations has no solutions:\n$$3x - 5y = 8$$\n$$kx - 10y = 12$$\nWhat is the value of $k$?",
          choices: ["A. -6", "B. 6", "C. 9", "D. 15"],
          trapAnalysis: "Students try to solve for x and y instead of recognizing the parallel slope condition: coefficients of x and y must be strictly proportional!",
          solution: "Ratio of y-coefficients: -10 / -5 = 2. Therefore, k must be 2 * 3 = 6. Check constants: 8 * 2 = 16 != 12, confirming lines are parallel (no solution).",
          correctAnswer: "B",
          speedHack: "Proportion rule: 3 / k = -5 / -10 => 3 / k = 1/2 => k = 6!"
        }
      }
    ]
  },

  {
    unitNumber: 7,
    id: "unit-07-medium-psda",
    title: "Unit 7: Medium: Problem Solving & Data Analysis",
    tier: "Medium",
    domain: "Problem Solving and Data Analysis",
    description_en: "Two-way contingency tables, conditional probability, margins of error, and scatterplot lines of best fit.",
    description_uz: "Ikki tomonlama jadvallar (two-way tables), shartli ehtimollik, xatolik chegarasi (margin of error) va scatterplot regressiya chiziqlari.",
    skills: [
      {
        id: "skill-u7-tables-stats",
        title: "Two-Way Tables & Conditional Probability: Medium",
        difficulty: "Medium",
        domain: "Problem Solving and Data Analysis",
        topicCode: "DAT-03",
        description: "Conditional probability from frequency tables (Given that condition P(A|B)).",
        lessonContent: {
          overview_uz: "Shartli ehtimollikda eng muhim narsa: Mahrajni (denominator) to'g'ri tanlash! Agar savolda 'Given that the person is a junior' deyilsa, jami barcha odamlar emas, faqat juniorlar qatori mahrajga olinadi!",
          overview_en: "In conditional probability, the single most critical step is identifying the denominator. 'Given that the person is a junior' means your denominator is strictly the total of the junior row, NOT the entire sample!",
          firstPrinciples: [
            "P(A | B) = Count(A and B) / Count(B).",
            "Keywords 'given that', 'among those who', 'of the students who' restrict the universe."
          ],
          rules: [
            { name: "Conditional Formula", formula: "P(A \\mid B) = \\frac{\\text{Intersection of A and B}}{\\text{Total in Condition B}}", explanation: "Condition B defines the restricted sub-population denominator." }
          ],
          desmosBypass: {
            title: "Desmos Quick Fraction Check",
            keys: "Type 14/45 in Desmos and click the fraction icon to simplify",
            tip: "Converts between decimals and reduced fractions in one click."
          }
        },
        basicExample: {
          question: "In a survey of 100 students, 60 are boys and 40 are girls. 30 boys and 20 girls play chess. If a student who plays chess is selected at random, what is the probability that the student is a girl?",
          choices: ["A. 20/100", "B. 20/50", "C. 40/100", "D. 20/40"],
          stepByStep: [
            "Condition: 'a student who plays chess is selected'.",
            "Total chess players = 30 boys + 20 girls = 50 (this is the denominator!).",
            "Favorable outcome: girls who play chess = 20.",
            "Probability = 20 / 50 = 2/5."
          ],
          correctAnswer: "B",
          takeaway: "Do NOT divide by 100! The prompt restricts the selection to chess players (50)."
        },
        harderExample: {
          question: "A poll of 1,200 voters has a margin of error of 3%. A second poll by the same organization wants to reduce the margin of error to 1.5%. How many voters must be sampled?",
          choices: ["A. 2,400", "B. 3,600", "C. 4,800", "D. 6,000"],
          trapAnalysis: "Students think halving the margin of error requires doubling the sample (2 * 1200 = 2400). That is FALSE because margin of error is inversely proportional to the SQUARE ROOT of sample size!",
          solution: "Margin of error MoE is proportional to 1 / sqrt(n). To divide MoE by 2, we must multiply n by 2^2 = 4! New sample = 1,200 * 4 = 4,800 voters.",
          correctAnswer: "C",
          speedHack: "Square the factor: half the error -> 4 times the sample size. One third error -> 9 times the sample size!"
        }
      }
    ]
  },

  {
    unitNumber: 8,
    id: "unit-08-medium-adv-math",
    title: "Unit 8: Medium: Advanced Math",
    tier: "Medium",
    domain: "Advanced Math",
    description_en: "Quadratic vertex form y = a(x - h)^2 + k, nonlinear function transformations, rational expressions, and radicals.",
    description_uz: "Parabola uchi (vertex form), funksiyalarni siljitish (transformations), kasr-ratsional ifodalar va ildizlar.",
    skills: [
      {
        id: "skill-u8-vertex-form",
        title: "Quadratic Graphs & Vertex Form: Medium",
        difficulty: "Medium",
        domain: "Advanced Math",
        topicCode: "ADV-03",
        description: "Identifying vertex (h, k), axis of symmetry x = -b/(2a), and maximum/minimum values.",
        lessonContent: {
          overview_uz: "Parabola tenglamasining uch shakli bor: 1) Standard: $y = ax^2 + bx + c$ ($c$ - y-intercept). 2) Factored: $y = a(x - r_1)(x - r_2)$ ($r_1, r_2$ - ildizlar). 3) Vertex form: $y = a(x - h)^2 + k$. Bu yerda $(h, k)$ parabola uchidir! Agar $a > 0$ bo'lsa, minimum qiymat $k$ bo'ladi; agar $a < 0$ bo'lsa, maksimum qiymat $k$ bo'ladi.",
          overview_en: "Vertex form y = a(x - h)^2 + k directly reveals the vertex (h, k). If a > 0, the parabola opens upward with minimum value k. If a < 0, it opens downward with maximum value k. Axis of symmetry is x = h = -b/(2a).",
          firstPrinciples: [
            "Vertex coordinate (h, k): h is the x-value where max/min occurs; k is the actual max/min value.",
            "Horizontal shift: (x - 3) moves graph RIGHT by 3; (x + 3) moves graph LEFT by 3.",
            "Vertical shift: + k moves UP; - k moves DOWN."
          ],
          rules: [
            { name: "Axis of Symmetry", formula: "x_v = -\\frac{b}{2a}", explanation: "Midpoint between roots gives the x-coordinate of the vertex." },
            { name: "Vertex Form", formula: "y = a(x - h)^2 + k", explanation: "Directly shows extreme value k without calculus." }
          ],
          desmosBypass: {
            title: "Desmos Vertex Inspection",
            keys: "Type quadratic into Desmos and click the top or bottom apex gray dot",
            tip: "Desmos reveals the exact (h, k) coordinates instantly."
          }
        },
        basicExample: {
          question: "Which equation represents a parabola with vertex at $(4, -7)$?",
          choices: ["A. y = (x - 4)^2 - 7", "B. y = (x + 4)^2 - 7", "C. y = (x - 4)^2 + 7", "D. y = (x + 4)^2 + 7"],
          stepByStep: [
            "Use vertex form: y = a(x - h)^2 + k.",
            "Substitute h = 4 and k = -7: y = a(x - 4)^2 - 7.",
            "Setting a = 1 gives choice A."
          ],
          correctAnswer: "A",
          takeaway: "Notice the minus inside: (x - 4) corresponds to positive x = 4."
        },
        harderExample: {
          question: "The function $f(x) = 2x^2 - 12x + 25$ has a minimum value at $(h, k)$. What is the value of $k$?",
          choices: ["A. 3", "B. 7", "C. 12", "D. 25"],
          trapAnalysis: "Students confuse h (the input x) with k (the minimum output y). The question asks for k!",
          solution: "1. Find h = -b / (2a) = -(-12) / (2 * 2) = 12 / 4 = 3. 2. Plug x = 3 into f(x) to find k: f(3) = 2(3)^2 - 12(3) + 25 = 2(9) - 36 + 25 = 18 - 36 + 25 = 7.",
          correctAnswer: "B",
          speedHack: "Type 'y = 2x^2 - 12x + 25' into Desmos. Tap the vertex point: (3, 7). The value of k is 7!"
        }
      }
    ]
  },

  {
    unitNumber: 9,
    id: "unit-09-medium-geom-trig",
    title: "Unit 9: Medium: Geometry & Trigonometry",
    tier: "Medium",
    domain: "Geometry and Trigonometry",
    description_en: "Circle equations in the xy-plane (x - h)^2 + (y - k)^2 = r^2, radian conversions, and volume of 3D solids.",
    description_uz: "Aylananing koordinata tekisligidagi tenglamasi, radianlar va 3D figuralar hajmi.",
    skills: [
      {
        id: "skill-u9-circle-equations",
        title: "Circle Equations in the xy-Plane: Medium",
        difficulty: "Medium",
        domain: "Geometry and Trigonometry",
        topicCode: "GEO-03",
        description: "Standard equation (x - h)^2 + (y - k)^2 = r^2, center (h, k), radius r, and completing the square.",
        lessonContent: {
          overview_uz: "Aylana tenglamasi: $(x - h)^2 + (y - k)^2 = r^2$. Markazi: $(h, k)$, Radiusi: $r = \\sqrt{r^2}$. Agar tenglama yoyilgan $x^2 + y^2 - 6x + 8y = 0$ holatida berilsa, to'la kvadratga ajratish kerak yoki markazni $h = -A/2, k = -B/2$ formulasidan darrov topish mumkin!",
          overview_en: "Standard circle equation: (x - h)^2 + (y - k)^2 = r^2. Center is (h, k); radius is r = sqrt(r^2). To find center from x^2 + y^2 + Ax + By + C = 0: center is (-A/2, -B/2).",
          firstPrinciples: [
            "The right-hand side is radius SQUARED (r^2), not r!",
            "Completing square shortcut: add (b/2)^2 to both sides for each variable.",
            "Circumference = 2*pi*r, Area = pi*r^2."
          ],
          rules: [
            { name: "Center Shortcut", formula: "h = -\\frac{A}{2}, \\quad k = -\\frac{B}{2}", explanation: "Fastest way to get center coordinates without completing the square." },
            { name: "Radius Formula", formula: "r = \\sqrt{h^2 + k^2 - C}", explanation: "Instant radius from general equation x^2 + y^2 + Ax + By + C = 0." }
          ],
          desmosBypass: {
            title: "Desmos Circle Plotter",
            keys: "Type general equation directly into Desmos, e.g. x^2 + y^2 - 8x + 6y = 0",
            tip: "Desmos plots the circle perfectly. Click the center or measure distance across to find diameter."
          }
        },
        basicExample: {
          question: "A circle has equation $(x - 5)^2 + (y + 2)^2 = 36$. What is the center and radius of the circle?",
          choices: ["A. Center (5, -2), radius 6", "B. Center (-5, 2), radius 6", "C. Center (5, -2), radius 36", "D. Center (-5, 2), radius 36"],
          stepByStep: [
            "Compare to (x - h)^2 + (y - k)^2 = r^2.",
            "h = 5, k = -2 => Center is (5, -2).",
            "r^2 = 36 => r = sqrt(36) = 6."
          ],
          correctAnswer: "A",
          takeaway: "Remember: the radius is the square root of 36, which is 6, NOT 36."
        },
        harderExample: {
          question: "The equation $x^2 + y^2 - 10x + 6y = 15$ defines a circle in the $xy$-plane. What is the radius of the circle?",
          choices: ["A. 5", "B. 7", "C. 8", "D. 49"],
          trapAnalysis: "Students forget to add the squared constants (25 and 9) to the right-hand side of the equation when completing the square.",
          solution: "1. Group terms: (x^2 - 10x + 25) + (y^2 + 6y + 9) = 15 + 25 + 9. 2. (x - 5)^2 + (y + 3)^2 = 49. 3. r = sqrt(49) = 7.",
          correctAnswer: "B",
          speedHack: "Type 'x^2 + y^2 - 10x + 6y = 15' into Desmos. Look at the rightmost point (12, -3) and center (5, -3). Distance is 12 - 5 = 7!"
        }
      }
    ]
  },

  // ==========================================
  // UNITS 10–13: ADVANCED (TARGET 800)
  // ==========================================
  {
    unitNumber: 10,
    id: "unit-10-advanced-algebra",
    title: "Unit 10: Advanced: Algebra (Target 800)",
    tier: "Advanced",
    domain: "Algebra",
    description_en: "Parametric linear constants, infinite solutions with non-standard coefficients, and absolute value composite systems.",
    description_uz: "Parametrli chiziqli konstantalar, no-solution / infinite-solution murakkab masalalari va modul tenglamalari.",
    skills: [
      {
        id: "skill-u10-parametric",
        title: "Parametric Systems & Invariants: Advanced",
        difficulty: "Advanced",
        domain: "Algebra",
        topicCode: "ALG-03",
        description: "Solving systems with unknown constants a, b, k where infinitely many or no solutions occur.",
        lessonContent: {
          overview_uz: "Modul 2 ning 780-800 ballik masalalarida aniq sonlar o'rniga $a, b, k, r, s$ harflari beriladi. Oltin qoida: cheksiz yechim bo'lishi uchun x va y koeffitsiyentlari hamda ozod hadlar proporsional bo'lishi shart: $\\frac{A_1}{A_2} = \\frac{B_1}{B_2} = \\frac{C_1}{C_2}$.",
          overview_en: "Module 2 780-800 questions feature abstract constants instead of concrete numbers. For infinitely many solutions, the ratio of coefficients and constants must be strictly identical across both equations.",
          firstPrinciples: [
            "Parametric matching: equate corresponding coefficients on both sides.",
            "If asked for (x, y) on coincident line in terms of parameter r: set x = r and solve for y."
          ],
          rules: [
            { name: "Parametric Invariant", formula: "A_1/A_2 = B_1/B_2 = C_1/C_2", explanation: "All coefficients match up to a single constant scalar multiple." }
          ],
          desmosBypass: {
            title: "Desmos Slider Test",
            keys: "Add slider for constant 'a' and observe when lines merge completely",
            tip: "When the two lines overlap into a single line, that slider value is the exact answer."
          }
        },
        basicExample: {
          question: "For what value of $c$ does the system have infinitely many solutions?\n$$4x + 6y = 12$$\n$$6x + 9y = c$$",
          choices: ["A. 12", "B. 18", "C. 24", "D. 36"],
          stepByStep: [
            "Ratio of x-coefficients: 6 / 4 = 1.5.",
            "Ratio of y-coefficients: 9 / 6 = 1.5.",
            "For infinite solutions, constant must also scale by 1.5: c = 12 * 1.5 = 18."
          ],
          correctAnswer: "B",
          takeaway: "Equation 2 is simply 1.5 times Equation 1."
        },
        harderExample: {
          question: "For each real number $r$, which of the following points $(x, y)$ lies on the graph of both equations in the $xy$-plane?\n$$3x + 2y = 6$$\n$$6x + 4y = 12$$",
          choices: ["A. (r, 3 - 3/2 r)", "B. (r, 3 - r/2)", "C. (3 - r, 3 - 3/2 r)", "D. (3, 2 - 3/2 r)"],
          trapAnalysis: "Students freeze when seeing parameter r. This is just a parametric representation of the line: set x = r and express y!",
          solution: "Since both equations are identical (3x + 2y = 6), let x = r: 3r + 2y = 6 => 2y = 6 - 3r => y = 3 - (3/2)r. The point is (r, 3 - 3/2 r).",
          correctAnswer: "A",
          speedHack: "Test with r = 0: point is (0, 3). Plug (0, 3) into 3x + 2y = 6: 3(0) + 2(3) = 6 (true!). Test choices: Choice A gives y = 3. Choice B gives 3. Test r = 2: 3(2) + 2(0) = 6 so (2, 0). Choice A gives 3 - 3/2(2) = 0! 100% Match!"
        }
      }
    ]
  },

  {
    unitNumber: 11,
    id: "unit-11-advanced-psda",
    title: "Unit 11: Advanced: Problem Solving & Data Analysis",
    tier: "Advanced",
    domain: "Problem Solving and Data Analysis",
    description_en: "Exponential decay models with fractional time periods, compound growth inversions, and statistical sampling conclusions.",
    description_uz: "Murakkab eksponentsial kamayish/o'sish modellari (yarim yemirilish davri), og'irlikli o'rtacha qiymatlar va statistik xulosalar.",
    skills: [
      {
        id: "skill-u11-exponential-models",
        title: "Exponential Growth & Decay with Fractional Time: Advanced",
        difficulty: "Advanced",
        domain: "Problem Solving and Data Analysis",
        topicCode: "DAT-04",
        description: "Models with form A(t) = P(1 +/- r)^(t/k) where period k is not 1 year.",
        lessonContent: {
          overview_uz: "Eksponentsial o'sish/kamayish formulasi: $f(t) = P(1 \\pm r)^{t/k}$. Bu yerda $P$ - boshlang'ich qiymat, $r$ - foiz o'zgarishi, $k$ - o'zgarish davri (masalan, har 5 yilda 2 baravar oshsa: $P(2)^{t/5}$). Agar darajada $t/k$ bo'lsa, har $k$ vaqt birligida amaliyot 1 marta to'liq bajariladi.",
          overview_en: "Exponential models take the form f(t) = P(1 +/- r)^(t/k). P is initial value, r is rate, and k is the cycle duration (e.g. doubles every 5 years: P(2)^(t/5)). If t is years, t/k ensures the base multiplies once every k years.",
          firstPrinciples: [
            "Half-life of h years: Mass = M_0 * (0.5)^(t/h).",
            "Doubling every d hours: Population = P_0 * (2)^(t/d).",
            "Convert time units in exponent to match base rate description."
          ],
          rules: [
            { name: "General Exponential Cycle", formula: "A(t) = a \\cdot b^{\\frac{t}{k}}", explanation: "b is growth/decay factor, k is the number of time units per cycle." }
          ],
          desmosBypass: {
            title: "Desmos Exponent Evaluation",
            keys: "Type function directly and evaluate at specific t values",
            tip: "Compare table values for given answer choices against the problem description."
          }
        },
        basicExample: {
          question: "A colony of bacteria doubles in population every 4 hours. If there were initially 150 bacteria, which function models the population after $t$ hours?",
          choices: ["A. P(t) = 150(2)^{4t}", "B. P(t) = 150(2)^{t/4}", "C. P(t) = 150(4)^{2t}", "D. P(t) = 150(4)^{t/2}"],
          stepByStep: [
            "Initial population P = 150.",
            "Doubling factor base = 2.",
            "Every 4 hours means when t = 4, the exponent must be 1. Thus exponent is t/4.",
            "P(t) = 150(2)^{t/4}."
          ],
          correctAnswer: "B",
          takeaway: "Test t = 4: choice B gives 150(2)^1 = 300 (doubled!). Choice A gives 150(2)^16 (huge!)."
        },
        harderExample: {
          question: "A radioactive isotope has a half-life of 29 years. A scientist measures an initial mass of 128 grams. Which equation represents the mass $M$ remaining after $y$ years, where $y$ is measured in decades (1 decade = 10 years)?",
          choices: ["A. M = 128(0.5)^{29y/10}", "B. M = 128(0.5)^{10y/29}", "C. M = 128(0.5)^{y/290}", "D. M = 128(0.5)^{290/y}"],
          trapAnalysis: "Students know t/29 is years, but when time is decades, y decades = 10y years. Substituting t = 10y gives exponent 10y / 29!",
          solution: "Time in years is t = 10y. The standard equation in years is 128(0.5)^{t/29}. Replacing t with 10y gives 128(0.5)^{10y/29}.",
          correctAnswer: "B",
          speedHack: "Plug in 2.9 decades (29 years): the mass must be half (64). In choice B, 10(2.9)/29 = 1, so 128(0.5)^1 = 64! Instant match!"
        }
      }
    ]
  },

  {
    unitNumber: 12,
    id: "unit-12-advanced-adv-math",
    title: "Unit 12: Advanced: Advanced Math (Target 800)",
    tier: "Advanced",
    domain: "Advanced Math",
    description_en: "Discriminant analysis b^2 - 4ac, nonlinear systems with tangent intersections, and polynomial remainder theorem.",
    description_uz: "Diskriminant tahlili ($b^2 - 4ac$), chiziqli va kvadratik egri chiziqlar kesishmasi (urinma bo'lish sharti) va qoldiq teoremasi.",
    skills: [
      {
        id: "skill-u12-discriminant-tangents",
        title: "Discriminant Analysis & Nonlinear Systems: Advanced",
        difficulty: "Advanced",
        domain: "Advanced Math",
        topicCode: "ADV-04",
        description: "Using discriminant D = b^2 - 4ac to determine 0, 1 (tangent), or 2 intersections in systems.",
        lessonContent: {
          overview_uz: "Agar to'g'ri chiziq $y = mx + d$ va parabola $y = ax^2 + bx + c$ kesishsa: ularni tenglashtiramiz. Hosil bo'lgan kvadrat tenglamaning diskriminanti $D = B^2 - 4AC$ tekshiriladi: 1) $D > 0$: 2 ta nuqtada kesishadi. 2) $D = 0$: 1 ta nuqtada urinadi (tangent / exactly one solution). 3) $D < 0$: kesishmaydi (0 ta yechim).",
          overview_en: "When a line and parabola intersect, set them equal to form Ax^2 + Bx + C = 0. The discriminant D = B^2 - 4AC governs the number of solutions: D > 0 means 2 intersections; D = 0 means tangent with exactly 1 solution; D < 0 means no intersection.",
          firstPrinciples: [
            "Exactly one solution in a linear-quadratic system ALWAYS means D = 0.",
            "Discriminant formula: D = b^2 - 4ac."
          ],
          rules: [
            { name: "Single Solution Invariant", formula: "b^2 - 4ac = 0 \\implies \\text{Exactly 1 Solution (Tangent)}", explanation: "Set discriminant to zero to solve for the missing coefficient." }
          ],
          desmosBypass: {
            title: "Desmos Tangent Slider",
            keys: "Graph both equations with a slider for 'c'. Adjust slider until line touches parabola at exactly 1 point",
            tip: "Read the slider value directly off the screen."
          }
        },
        basicExample: {
          question: "How many real solutions does the equation $x^2 - 6x + 9 = 0$ have?",
          choices: ["A. 0", "B. 1", "C. 2", "D. Infinitely many"],
          stepByStep: [
            "Calculate discriminant: D = b^2 - 4ac.",
            "a = 1, b = -6, c = 9.",
            "D = (-6)^2 - 4(1)(9) = 36 - 36 = 0.",
            "Since D = 0, there is exactly 1 real solution (x = 3)."
          ],
          correctAnswer: "B",
          takeaway: "D = 0 always corresponds to a perfect square trinomial (x - 3)^2 = 0."
        },
        harderExample: {
          question: "The system of equations has exactly one real solution:\n$$y = 2x^2 - 8x + c$$\n$$y = 4x - 10$$\nWhat is the value of the constant $c$?",
          choices: ["A. 4", "B. 8", "C. 12", "D. 18"],
          trapAnalysis: "Students solve for x without equating the equations or confuse the original c with the new combined constant.",
          solution: "1. Equate expressions: 2x^2 - 8x + c = 4x - 10. 2. Rearrange to standard form: 2x^2 - 12x + (c + 10) = 0. Here A = 2, B = -12, C = (c + 10). 3. For exactly one solution, D = 0: (-12)^2 - 4(2)(c + 10) = 0 => 144 - 8(c + 10) = 0 => 144 = 8(c + 10) => 18 = c + 10 => c = 8.",
          correctAnswer: "B",
          speedHack: "In Desmos, plot y = 4x - 10 and y = 2x^2 - 8x + c with slider c. Move c until parabola rests exactly tangent to the line. At c = 8, they touch at (3, 2)!"
        }
      }
    ]
  },

  {
    unitNumber: 13,
    id: "unit-13-advanced-geom-trig",
    title: "Unit 13: Advanced: Geometry & Trigonometry (Target 800)",
    tier: "Advanced",
    domain: "Geometry and Trigonometry",
    description_en: "3D geometry ratios, similar solids scaling, circle tangent theorems, and multi-step trigonometric proofs.",
    description_uz: "3D geometriya, o'xshash figuralar hajmi va yuzasi nisbatlari, aylanaga urinma teoremalari va murakkab trigonometriya.",
    skills: [
      {
        id: "skill-u13-similar-solids",
        title: "Similar Solids Scaling & Volume Ratios: Advanced",
        difficulty: "Advanced",
        domain: "Geometry and Trigonometry",
        topicCode: "GEO-01",
        description: "Scaling linear dimensions by k scales area by k^2 and volume by k^3.",
        lessonContent: {
          overview_uz: "O'xshash geometrik figuralarda oltin qoida: 1) Chiziqli o'lchamlar (radius, balandlik, perimetr) $k$ marta kattalashsa: 2) Yuza (Area) $k^2$ marta kattalashadi! 3) Hajm (Volume) $k^3$ marta kattalashadi! Masalan, radiuslar nisbati 3:7 bo'lsa, hajmlar nisbati $3^3 : 7^3 = 27 : 343$ bo'ladi!",
          overview_en: "In similar geometric figures: if linear dimensions (radius, height, perimeter) scale by factor k, Area scales by k^2 and Volume scales by k^3! For example, if radii have ratio 3:7, their volumes have ratio 3^3 : 7^3 = 27 : 343.",
          firstPrinciples: [
            "Linear ratio: a / b.",
            "Surface Area ratio: (a / b)^2 = a^2 / b^2.",
            "Volume ratio: (a / b)^3 = a^3 / b^3."
          ],
          rules: [
            { name: "Cube Scaling Law", formula: "\\frac{V_B}{V_A} = \\left(\\frac{r_B}{r_A}\\right)^3", explanation: "Never multiply volume by linear factor; must cube the scale factor." }
          ],
          desmosBypass: {
            title: "Desmos Ratio Calculation",
            keys: "Type (7/3)^3 * Volume_A",
            tip: "Calculates the exact fraction answer in simplified form."
          }
        },
        basicExample: {
          question: "Two similar rectangles have sides with ratio $1 : 4$. If the area of the smaller rectangle is 12, what is the area of the larger rectangle?",
          choices: ["A. 48", "B. 96", "C. 144", "D. 192"],
          stepByStep: [
            "Linear ratio is 1 : 4.",
            "Area scales by (4 / 1)^2 = 16.",
            "Area of larger rectangle = 12 * 16 = 192."
          ],
          correctAnswer: "D",
          takeaway: "Area scales by the square of the linear scale factor: 4^2 = 16."
        },
        harderExample: {
          question: "Right circular cylinders A and B are similar. The height of cylinder A is 10 units, and the diameter of its base is equal to its height. The ratio of the diameter of cylinder A to cylinder B is $3 : 7$. What is the volume, in cubic units, of cylinder B?",
          choices: ["A. 250\\pi", "B. 1,750\\pi / 3", "C. 12,250\\pi / 9", "D. 85,750\\pi / 27"],
          trapAnalysis: "From the real September 2026 exam! Students calculate radius of cylinder B and get bogged down in messy fraction cubing.",
          solution: "1. For Cylinder A: height h = 10, diameter d = 10, so radius r = 5. Volume V_A = pi * r^2 * h = pi * (5)^2 * 10 = 250*pi. 2. Scale factor from A to B is 7/3. 3. Volume scales by (7/3)^3 = 343 / 27. 4. Volume of B = 250*pi * (343 / 27) = 85,750*pi / 27.",
          correctAnswer: "D",
          speedHack: "Type '250 * (7/3)^3' into Desmos and hit fraction button: 85750/27. Multiply by pi: Choice D!"
        }
      }
    ]
  }
];
