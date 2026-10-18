export interface TextbookSection {
  id: string;
  title: string;
  readTime: string;
  summary: string;
  contentMarkdown: string;
  keyTakeaways: string[];
  diagramType?: "adaptive-routing" | "desmos-keyboard" | "pacing-clock" | "formula-reference" | "linear-graph" | "system-intersection" | "inequality-plane" | "parallel-perpendicular" | "word-problem-model" | "percent-multiplier" | "two-way-conditional" | "scatterplot-residuals" | "parabola-vertex" | "quadratic-discriminant" | "special-triangles-trig" | "circle-equation";
  desmosExample?: {
    title: string;
    expression: string;
    tip: string;
  };
}

export interface TextbookPracticeQuestion {
  id: string;
  questionNumber: number;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  desmosTrick?: string;
  satTrap?: string;
  referenceFormula?: string;
}

export interface KhanFullUnit {
  id: string;
  unitNumber: number;
  title: string;
  slug: string;
  tier: "Foundations" | "Medium" | "Advanced" | "General";
  domain: string;
  topicCode: string;
  estimatedHours: string;
  description: string;
  overviewSummary: string;
  sections: TextbookSection[];
  speedHacks: { title: string; trigger: string; shortcut: string; example: string }[];
  practiceQuestions: TextbookPracticeQuestion[];
  nextUnitId?: string;
  prevUnitId?: string;
}

export const KHAN_FULL_UNITS: Record<string, KhanFullUnit> = {
  // =========================================================================
  // UNIT 1: ABOUT THE DIGITAL SAT MATH
  // =========================================================================
  "unit-01-about-sat": {
    id: "unit-01-about-sat",
    unitNumber: 1,
    title: "Unit 1: About the Digital SAT Math",
    slug: "unit-01-about-sat",
    tier: "General",
    domain: "Orientation & Test Strategy",
    topicCode: "ALG-01",
    estimatedHours: "2.5 hours",
    description: "Digital SAT test architecture, multistage adaptive routing engine, Bluebook secrets, official Desmos superpowers, formula sheets, and 800-target pacing.",
    overviewSummary: "Digital SAT Math is not a test of high-school math memorization — it is a standardized test of mathematical speed, pattern recognition, and tactical calculator execution. In this comprehensive textbook unit, you will master the exact test mechanics that separate 600-scorers from 800-scorers.",
    sections: [
      {
        id: "u1-sec-1-architecture",
        title: "1. Digital SAT Math Structure & Adaptive Engine",
        readTime: "6 min read",
        summary: "The Math section consists of two 35-minute modules (22 questions each, 70 minutes total). Module 1 performance strictly determines whether you route into the Easier or Harder Module 2.",
        diagramType: "adaptive-routing",
        keyTakeaways: [
          "Module 1 contains a balanced mix of Easy, Medium, and Hard questions.",
          "Scoring approximately 15 or more correct out of 22 in Module 1 routes you into the Harder Module 2.",
          "Routing to the Harder Module 2 unlocks the 800 score ceiling. Routing to the Easier Module 2 caps your score at roughly 600–640 even if you score 100% in Module 2!",
          "Approximately 75% of questions are 4-option Multiple Choice; 25% are Student-Produced Response (Grid-in)."
        ],
        contentMarkdown: `### The Multistage Adaptive Architecture

The Digital SAT Math test is **multistage adaptive**. Unlike the legacy paper SAT where every student answered the same static question booklet, the digital exam adapts to your ability level halfway through the test.

#### The 2-Module Sequence:
1. **Module 1 (Routing Module - 35 minutes, 22 questions):**
   - Every student takes the exact same difficulty distribution.
   - Questions range from straightforward arithmetic to medium algebra and geometry.
   - **Your score in Module 1 directly dictates your Module 2 routing.**
2. **Module 2 (Scored Adaptive Module - 35 minutes, 22 questions):**
   - **Harder Module 2:** If you answer roughly **15 or more** questions correctly in Module 1, you unlock the Hard Module. Here, the score ceiling is **800**. Even if you miss 4-5 hard questions, you can still easily achieve **720–760**!
   - **Easier Module 2:** If you get fewer than ~14 correct, you enter the Easy Module. The questions are simpler, but your final score is **capped at approximately 600–640**, regardless of getting every question right in Module 2.

> **Key Rule for 750+ Scorers:** Module 1 is the most critical 35 minutes of your test day. Double-check questions 1 through 15 in Module 1 to guarantee you unlock the Hard Module 2!`
      },
      {
        id: "u1-sec-2-pacing",
        title: "2. The 95-Second Pacing Rule & Time Allocation",
        readTime: "5 min read",
        summary: "Total time: 70 minutes for 44 questions = 95 seconds per question on average. Bank time on early easy questions (30-45s) to afford 2.5 minutes on complex late questions.",
        diagramType: "pacing-clock",
        keyTakeaways: [
          "Questions roughly progress from easiest to hardest within each module (1-8 Easy, 9-16 Medium, 17-22 Hard).",
          "At Question 11, you should have approximately 18:00 to 20:00 remaining on your clock.",
          "Never spend more than 2 minutes stuck on a single question — mark it for review and move on.",
          "There is ZERO penalty for guessing: never leave any bubble or grid-in box blank!"
        ],
        contentMarkdown: `### Pacing Mechanics: How Elite Students Divide Time

With 35 minutes for 22 questions, your average time per question is:
$$\\frac{35 \\times 60 \\text{ seconds}}{22 \\text{ questions}} = 95.45 \\text{ seconds/question}$$

However, you should **never** spend 95 seconds on every question. The optimal time allocation follows the **Tiered Velocity Framework**:

| Question Range | Difficulty Tier | Target Time / Question | Accumulated Time Remaining |
| :--- | :--- | :--- | :--- |
| **Q1 – Q6** | Easy Foundations | **30 – 45 seconds** | ~31:00 remaining |
| **Q7 – Q14** | Medium Transitions | **60 – 75 seconds** | ~19:00 remaining |
| **Q15 – Q18** | High-Yield Medium/Hard | **90 – 120 seconds** | ~10:00 remaining |
| **Q19 – Q22** | Hard Module 2 Endbosses | **120 – 150 seconds** | ~02:00 remaining for review |

#### The Bluebook Timer Technique:
Click "Hide Timer" if the countdown stresses you, but check it at two fixed milestones:
1. **Milestone 1 (Question 11):** Timer should show $\\ge 17:30$.
2. **Milestone 2 (Question 18):** Timer should show $\\ge 06:00$.`
      },
      {
        id: "u1-sec-3-desmos",
        title: "3. Built-in Desmos Graphing Calculator Superpowers",
        readTime: "8 min read",
        summary: "Desmos is available throughout the entire Math section. Using sliders, regression (~), intercepts, and direct equation typing eliminates over 60% of manual algebra.",
        diagramType: "desmos-keyboard",
        desmosExample: {
          title: "System of Linear Equations SpeedHack",
          expression: "2x + 3y = 12 \n4x - y = 10",
          tip: "Click the grey intersection point: Desmos displays (3, 2). x = 3, y = 2 in 4 seconds flat!"
        },
        keyTakeaways: [
          "Desmos can directly graph equations with 1 variable: typing '4x - 9 = 15' draws a vertical line at x = 6.",
          "Use the tilde symbol (~) for linear regression: y1 ~ m*x1 + b instantly solves any slope or y-intercept table question.",
          "Use the 'Convert to Fraction' button next to decimals to turn 0.83333... into 5/6.",
          "Desmos automatically highlights roots (zeros), y-intercepts, and vertex extrema (min/max) as clickable grey dots."
        ],
        contentMarkdown: `### The Desmos Superpower

In the paper SAT, the calculator was restricted on Section 3. On the Digital SAT, **the official College Board Desmos Graphing Calculator is embedded on every single question.**

#### The 4 Golden Desmos Rules:
1. **1-Variable Equations = Free Answers:**
   - Type $5(2x - 3) = 35$ directly into Line 1. Desmos draws a vertical line at $x = 5$. No algebra required!
2. **Systems of Equations = Click the Dot:**
   - Enter Equation 1 in Line 1, Equation 2 in Line 2. Tap the intersection point. The $(x, y)$ coordinates pop up instantly.
3. **Equivalence Checking:**
   - If a question asks *"Which expression is equivalent to $(x+3)^2 - 4$?"*, graph the given expression in Line 1. Then graph each choice (A, B, C, D) in Line 2. The correct answer will overlay the original graph **100% identically**.
4. **Desmos Regression for Tables:**
   - Add a table (+ icon -> Table). Enter $(x_1, y_1)$ values.
   - In Line 2, type: $y_1 \\sim m x_1 + b$ or $y_1 \\sim a(x_1 - h)^2 + k$.
   - Desmos will calculate parameters $m, b, a, h, k$ with $r^2 = 1$.`
      },
      {
        id: "u1-sec-4-reference",
        title: "4. Official Formula Sheet: Provided vs MUST Memorize",
        readTime: "6 min read",
        summary: "The on-screen Reference Sheet only provides basic geometric areas and volumes. Crucial formulas like the Quadratic Formula, Vertex formula, Vieta's relations, and Circle equations must be memorized.",
        diagramType: "formula-reference",
        keyTakeaways: [
          "Provided on Screen: Area of circle, rectangle, triangle; Circumference; Volume of rectangular prism, cylinder, sphere, cone, pyramid; Special right triangles (30-60-90, 45-45-90); Pythagorean theorem.",
          "NOT Provided (MUST Memorize): Quadratic Formula $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$.",
          "NOT Provided: Vertex formula $h = -\\frac{b}{2a}$ and $y = a(x-h)^2 + k$.",
          "NOT Provided: Vieta's formulas: sum of roots $= -b/a$, product $= c/a$.",
          "NOT Provided: Circle standard equation $(x-h)^2 + (y-k)^2 = r^2$."
        ],
        contentMarkdown: `### The Reference Sheet Reality Check

In the Bluebook app, clicking the **Reference** icon in the upper-right corner opens an official formula sheet. However, **90% of the math questions on the SAT test formulas that are NOT on this sheet!**

#### What IS on the Reference Sheet:
- Area: $A = \\pi r^2$, $A = \\ell w$, $A = \\frac{1}{2} b h$
- Circle Circumference: $C = 2\\pi r$
- Volume: $V = \\ell w h$, $V = \\pi r^2 h$, $V = \\frac{4}{3} \\pi r^3$, $V = \\frac{1}{3} \\pi r^2 h$, $V = \\frac{1}{3} \\ell w h$
- Pythagorean Theorem: $a^2 + b^2 = c^2$
- Special Right Triangles: $45^\\circ-45^\\circ-90^\\circ$ ($x, x, x\\sqrt{2}$) and $30^\\circ-60^\\circ-90^\\circ$ ($x, x\\sqrt{3}, 2x$)
- Number of degrees in a circle ($360^\\circ$) and radians in a circle ($2\\pi$)
- Sum of angles in a triangle ($180^\\circ$)

#### What is NOT Provided (Must Memorize!):
1. **Slope formula:** $m = \\frac{y_2 - y_1}{x_2 - x_1}$
2. **Quadratic Formula:** $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$
3. **Discriminant Rules:** $D = b^2 - 4ac$ ($D > 0$: 2 real roots, $D = 0$: 1 real root, $D < 0$: 0 real roots)
4. **Vertex of Parabola:** $x_v = -\\frac{b}{2a}$, $y_v = f(x_v)$
5. **Vieta's Formulas:** $r_1 + r_2 = -\\frac{b}{a}, \\quad r_1 r_2 = \\frac{c}{a}$
6. **Exponential Model:** $y = a(1 \\pm r)^t$ or $y = a \\cdot b^{t/k}$
7. **Circle Standard Form:** $(x - h)^2 + (y - k)^2 = r^2$
8. **Trigonometric Co-function Identity:** $\\sin(x) = \\cos(90^\\circ - x)$`
      },
      {
        id: "u1-sec-5-gridin",
        title: "5. Student-Produced Response (Grid-in) Rules & Formatting",
        readTime: "4 min read",
        summary: "25% of questions are fill-in-the-blank. Negative numbers are permitted on Digital SAT. Never enter mixed numbers like 3 1/2 — enter 7/2 or 3.5.",
        keyTakeaways: [
          "Enter up to 5 characters for positive numbers, up to 6 characters including a negative sign.",
          "Mixed numbers: '3 1/2' will be read as 31/2 (15.5) and marked wrong! Convert to 3.5 or 7/2.",
          "Repeating decimals: Fill all available spaces (e.g. 2/3 must be entered as .6666 or .6667 or 2/3).",
          "There is never more than one correct answer required — if a question has two solutions (e.g. x = 2 and x = 5), entering EITHER 2 OR 5 receives full credit."
        ],
        contentMarkdown: `### Mastering the Student-Produced Response (SPR)

Approximately **5 to 6 questions per module** are Student-Produced Responses (fill-in-the-blank). The College Board's automated grading engine adheres to strict syntax rules:

1. **Fractions:**
   - Use the forward slash \`/\`. Example: \`7/3\` or \`-4/5\`.
   - Fractions do NOT need to be reduced to lowest terms unless specified (e.g. \`4/8\` is graded identical to \`1/2\`).
2. **Decimals & Truncation:**
   - If a decimal does not terminate, you **MUST fill all available character slots**.
   - Example: $\\frac{1}{3}$ entered as \`0.33\` will be marked **WRONG**! You must enter \`.3333\` or \`0.333\` or simply \`1/3\`.
3. **Mixed Numbers are FORBIDDEN:**
   - If the answer is $3\\frac{1}{2}$, typing \`3 1/2\` will be interpreted by the computer as $\\frac{31}{2} = 15.5$. Always convert to improper fraction \`7/2\` or decimal \`3.5\`.
4. **Negative Numbers:**
   - The Digital SAT now fully supports negative grid-in answers (e.g. \`-12\` or \`-3/4\`).`
      }
    ],
    speedHacks: [
      {
        title: "Desmos Single-Variable Vertical Line",
        trigger: "Any complicated equation with only one variable $x$",
        shortcut: "Type the full equation directly into Desmos without solving.",
        example: "Type '3(2x - 4) + 7 = 19'. Desmos plots a vertical line at x = 4. Read the answer!"
      },
      {
        title: "Equivalent Expression Visual Overlay",
        trigger: "Questions asking 'Which expression is equivalent to...'",
        shortcut: "Plot original expression in Line 1. Plot options in Line 2-5. Look for identical graphs.",
        example: "Line 1: (2x - 3)(x + 5). Line 2: 2x^2 + 7x - 15. The graphs sit exactly on top of each other!"
      },
      {
        title: "The Guessing Safety Net",
        trigger: "1 minute remaining on clock with 2 unanswered questions.",
        shortcut: "Pick a consistent letter (e.g. 'B' or 'C') and bubble both instantly.",
        example: "Zero penalty for wrong answers means guessing gives a guaranteed 25% expected value over 0%."
      }
    ],
    practiceQuestions: [
      {
        id: "u1_q01_adaptive",
        questionNumber: 1,
        prompt: "A student is taking Module 1 of the Digital SAT Math section. To ensure routing into the Harder Module 2 and unlock an 800 score ceiling, approximately how many questions out of 22 must the student answer correctly?",
        options: [
          "A. At least 8 questions",
          "B. At least 11 questions",
          "C. Approximately 15 or more questions",
          "D. Exactly 22 questions"
        ],
        correctAnswer: "C",
        explanation: "In the multistage adaptive testing engine, correctly answering approximately 15 or more out of 22 questions in Module 1 is required to route into the Harder Module 2, unlocking the 800 ceiling. Scoring below ~14 caps the score ceiling around 600-640.",
        satTrap: "Thinking you need 100% (22/22) to enter Hard Module 2. 15-16 correct is generally sufficient."
      },
      {
        id: "u1_q02_guessing",
        questionNumber: 2,
        prompt: "With 45 seconds remaining in Module 2, a student has 2 multiple-choice questions left completely blank. Which of the following is the mathematically optimal test strategy?",
        options: [
          "A. Leave both questions blank to avoid wrong-answer penalty points.",
          "B. Rapidly pick and bubble an answer choice for both questions before time expires.",
          "C. Try to fully solve one question and leave the other blank.",
          "D. Click 'Mark for Review' on both and wait for the time to expire."
        ],
        correctAnswer: "B",
        explanation: "The Digital SAT has NO guessing penalty. Leaving a question blank has a 0% probability of earning points, whereas guessing yields at least a 25% expected probability.",
        satTrap: "Assuming the legacy SAT penalty (-0.25 points) still exists. Digital SAT has zero guessing penalty."
      },
      {
        id: "u1_q03_calc_rules",
        questionNumber: 3,
        prompt: "On which portion of the Digital SAT Math section is the built-in Desmos graphing calculator permitted for student use?",
        options: [
          "A. Only on Module 2",
          "B. Only on questions marked with a calculator icon",
          "C. On 100% of questions in both Module 1 and Module 2",
          "D. Only on multiple-choice questions, not grid-ins"
        ],
        correctAnswer: "C",
        explanation: "Unlike the legacy paper SAT (which had a No-Calculator section), the Digital SAT features the Desmos calculator on all 44 questions across both Module 1 and Module 2.",
        satTrap: "Confusing the legacy Paper SAT (Section 3 No-Calculator) with the Digital SAT."
      },
      {
        id: "u1_q04_formulas",
        questionNumber: 4,
        prompt: "Which of the following mathematical formulas is NOT provided on the official on-screen Reference Sheet in the Bluebook testing app?",
        options: [
          "A. Volume of a right circular cylinder ($V = \\pi r^2 h$)",
          "B. The Quadratic Formula ($x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$)",
          "C. Area of a circle ($A = \\pi r^2$)",
          "D. Special right triangle ratio for $30^\\circ-60^\\circ-90^\\circ$"
        ],
        correctAnswer: "B",
        explanation: "The Quadratic Formula is completely absent from the official SAT Reference sheet. Only geometric area and volume formulas are provided. You must memorize algebraic formulas or use Desmos.",
        referenceFormula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
      },
      {
        id: "u1_q05_gridin_syntax",
        questionNumber: 5,
        prompt: "If a student solves a student-produced response (grid-in) question and obtains the exact value $4\\frac{1}{2}$, how must this answer be typed into the answer box to avoid being marked incorrect?",
        options: [
          "A. `4 1/2` with a space",
          "B. `4.5` or `9/2`",
          "C. `4-1/2` with a hyphen",
          "D. `4_1/2` with an underscore"
        ],
        correctAnswer: "B",
        explanation: "Mixed numbers are not recognized by Bluebook scoring. Entering '4 1/2' parses as 41/2 = 20.5 and is marked wrong. You must enter improper fraction 9/2 or decimal 4.5.",
        satTrap: "Typing spaces between whole numbers and fractions: '4 1/2' turns into 41/2."
      },
      {
        id: "u1_q06_pacing_milestone",
        questionNumber: 6,
        prompt: "Under the optimal 95-second velocity framework, how much time should a student ideally have remaining on the clock when reaching Question 11 of Module 1?",
        options: [
          "A. Approximately 5 minutes",
          "B. Approximately 10 minutes",
          "C. Approximately 18 to 20 minutes",
          "D. Exactly 30 minutes"
        ],
        correctAnswer: "C",
        explanation: "With 35 total minutes, reaching the halfway mark (Question 11) with 18 to 20 minutes remaining ensures a sufficient time surplus for the challenging final questions (18-22).",
        satTrap: "Spending equal time (1.5 min) on early easy questions, leaving too little time for hard questions."
      },
      {
        id: "u1_q07_easy_cap",
        questionNumber: 7,
        prompt: "If a test taker performs poorly on Module 1 and gets routed to the Easier Module 2, what is the approximate maximum score cap they can achieve on the Math section, even if they answer every question in Module 2 correctly?",
        options: [
          "A. 450",
          "B. 550",
          "C. 600 – 640",
          "D. 750"
        ],
        correctAnswer: "C",
        explanation: "The Easier Module 2 has a ceiling cap around 600–640. To achieve a 700+ score, a student must route to the Harder Module 2.",
        satTrap: "Believing that scoring 100% on the Easy Module 2 can still yield a 700+."
      },
      {
        id: "u1_q08_desmos_regression",
        questionNumber: 8,
        prompt: "When using the built-in Desmos graphing calculator to find the line of best fit for a table with columns $x_1$ and $y_1$, which operator must be used instead of the standard equals sign ($=$)?",
        options: [
          "A. `:=`",
          "B. `~` (tilde)",
          "C. `==`",
          "D. `->`"
        ],
        correctAnswer: "B",
        explanation: "Desmos requires the tilde operator (`~`) for regression analysis (e.g. `y1 ~ m*x1 + b`) to estimate optimal parameters.",
        desmosTrick: "Type 'y1 ~ m x1 + b' in Desmos to calculate slope m and intercept b instantly from any table."
      },
      {
        id: "u1_q09_spr_percentage",
        questionNumber: 9,
        prompt: "What approximate percentage of questions across the Digital SAT Math section are Student-Produced Responses (fill-in-the-blank) rather than 4-choice Multiple Choice questions?",
        options: [
          "A. 10%",
          "B. 25%",
          "C. 50%",
          "D. 75%"
        ],
        correctAnswer: "B",
        explanation: "Approximately 25% of math questions (about 11 out of 44, or 5-6 per module) are Student-Produced Responses (grid-ins).",
        satTrap: "Assuming all SAT questions are multiple-choice with A, B, C, D choices."
      },
      {
        id: "u1_q10_connectivity",
        questionNumber: 10,
        prompt: "During the real test administration, if your laptop battery dies or the testing center Wi-Fi temporarily disconnects, what occurs according to College Board Bluebook test specifications?",
        options: [
          "A. Your test is permanently canceled and you receive a score of zero.",
          "B. The test continues running on the clock without pausing, losing your answers.",
          "C. Your answers and timer are saved locally on your device, and you resume immediately once powered or reconnected.",
          "D. You must restart the entire test from Question 1 of Module 1."
        ],
        correctAnswer: "C",
        explanation: "Bluebook runs locally on your machine and caches progress. If internet drops or device reboots, your timer and completed answers are safely preserved.",
        satTrap: "Panicking during an internet blip — the timer halts and saves all progress safely."
      }
    ],
    nextUnitId: "unit-02-foundations-algebra"
  },

  // =========================================================================
  // UNIT 2: FOUNDATIONS: ALGEBRA
  // =========================================================================
  "unit-02-foundations-algebra": {
    id: "unit-02-foundations-algebra",
    unitNumber: 2,
    title: "Unit 2: Foundations: Algebra",
    slug: "unit-02-foundations-algebra",
    tier: "Foundations",
    domain: "Algebra",
    topicCode: "ALG-01",
    estimatedHours: "4.0 hours",
    description: "Foundations of linear equations & inequalities, graphing lines with slope-intercept, solving systems of linear equations, and Desmos speed tactics.",
    overviewSummary: "Algebra accounts for approximately 35% of all questions on the Digital SAT Math section. If you achieve 100% accuracy on foundational algebra, you virtually guarantee your passage into the Hard Module 2. Master isolating variables, linear modeling, and Desmos intersection tricks.",
    sections: [
      {
        id: "u2-sec-1-linear-eq",
        title: "1. Solving Linear Equations in One Variable & Solution Types",
        readTime: "7 min read",
        summary: "A linear equation takes the standard form ax + b = c. Master the inverse operation mechanics and memorize the 3 exact solution conditions tested on the Digital SAT.",
        diagramType: "linear-graph",
        desmosExample: {
          title: "Desmos Single-Variable Solver",
          expression: "5(2x - 3) + 4 = 39",
          tip: "Desmos plots a vertical line at x = 5. You can read the solution directly off the x-axis!"
        },
        keyTakeaways: [
          "Inverse Operations: Addition undoes subtraction; division undoes multiplication.",
          "Distributive Traps: Always distribute negative signs carefully: $-3(2x - 5) = -6x + 15$.",
          "One Unique Solution: Variable coefficients are different ($m_1 \\ne m_2$).",
          "No Solution condition: $ax + b = ax + c$ (where $b \\ne c$). The variable terms cancel ($0 = c - b$), which is mathematically impossible.",
          "Infinitely Many Solutions: $ax + b = ax + b$. Both sides simplify to an identical algebraic expression ($0 = 0$ identity)."
        ],
        contentMarkdown: `### The Foundations of Linear Equations

A linear equation is any mathematical statement where variables appear only to the first power ($x^1$). Solving an equation means finding all values of $x$ that make the equality strictly true.

#### The 3 Solution Outcomes on the Digital SAT:
The College Board frequently tests whether you understand when an equation has one, zero, or infinite solutions without requiring you to do lengthy arithmetic:

| Solution Outcome | Algebraic Condition | Visual/Geometric Meaning | College Board Keyword |
| :--- | :--- | :--- | :--- |
| **One Unique Solution** | $m_1 \\ne m_2$ | Lines intersect at exactly one point $(x_0, y_0)$ | *"Has exactly one solution for x"* |
| **No Solution (Parallel)** | $m_1 = m_2$ and $b_1 \\ne b_2$ | Parallel lines with different intercepts; never meet | *"Has no solution"*, *"Contradiction"* |
| **Infinitely Many (Identity)** | $m_1 = m_2$ and $b_1 = b_2$ | Coincident lines; every point on the line is a solution | *"True for all real values of x"* |

#### Step-by-Step Isolation Algorithm:
1. **Clear fractions or decimals:** Multiply every term by the least common denominator.
2. **Distribute across parentheses:** Watch negative multipliers carefully.
3. **Group variable terms:** Move all $x$ terms to one side and constants to the other side.
4. **Isolate $x$:** Divide by the variable's coefficient.

#### Worked Example:
> *"In the equation $k(3x - 4) = 12x - 16$, the equation is true for all real values of $x$. What is the value of constant $k$?"*

$$\\text{Distribute the left side: } 3kx - 4k = 12x - 16$$
For infinitely many solutions, coefficients must match:
$$3k = 12 \\implies k = 4$$
$$4k = 16 \\implies k = 4$$
Both conditions confirm that $k = 4$.`,
      },
      {
        id: "u2-sec-2-word-problems",
        title: "2. Linear Equation Word Problems: Translating English to Algebra",
        readTime: "8 min read",
        summary: "Translate real-world SAT scenarios into y = mx + b. 'Per', 'each', and 'every' signal the slope m; 'flat fee', 'initial deposit', or 'starting amount' signals the y-intercept b.",
        diagramType: "word-problem-model",
        desmosExample: {
          title: "Direct Budget Solver",
          expression: "14h + 25 = 95",
          tip: "Desmos plots a vertical line at h = 5. Marco can rent the kayak for exactly 5 hours!"
        },
        keyTakeaways: [
          "Rate of Change = Slope ($m$): Look for keywords: 'per', 'each', 'every', 'hourly'.",
          "Initial Value = y-intercept ($b$): Look for keywords: 'deposit', 'fee', 'start', 'at time t = 0'.",
          "Total Cost equation: $\\text{Total} = (\\text{Unit Rate}) \\times x + \\text{Fixed Base}$.",
          "Unit Alignment: Verify that the rate and time units match (hours vs minutes, dollars vs cents)."
        ],
        contentMarkdown: `### Translating English Scenarios into Mathematics

SAT word problems evaluate your ability to decompose narrative sentences into structured algebraic models. Most foundational problems map directly onto the slope-intercept form:

$$\\text{Total } (y) = \\text{Rate of Change } (m) \\times \\text{Quantity } (x) + \\text{Initial Baseline } (b)$$

#### The SAT Translation Dictionary:
| English Keyword / Phrase | Mathematical Meaning | Algebraic Operation |
| :--- | :--- | :--- |
| *"is", "was", "will be", "equals", "costs"* | Equality | $=$ |
| *"per", "each", "every", "rate of"* | Slope / Rate of change | $\\times m$ |
| *"flat fee", "initial cost", "starting deposit"* | Vertical Intercept / Baseline | $+ b$ |
| *"is decreased by", "drops by", "less than"* | Subtraction / Negative slope | $- mx$ |
| *"at least", "no less than", "minimum of"* | Lower bound inequality | $\\ge$ |
| *"at most", "cannot exceed", "maximum budget"* | Upper bound inequality | $\\le$ |

#### Worked Example:
> *"A commercial electrician charges a $\\$65$ diagnostic consultation fee plus $\\$48$ for each hour of repair work on site. If a client's invoice totaled $\\$305$, how many hours did the electrician work?"*

$$\\text{Model: } 48h + 65 = 305$$
$$48h = 240 \\implies h = \\frac{240}{48} = 5\\text{ hours}$$
The electrician worked for exactly **5 hours**.`,
      },
      {
        id: "u2-sec-3-linear-relations",
        title: "3. Linear Relationship Word Problems: Interpreting Rates, Offsets & Domain",
        readTime: "7 min read",
        summary: "Master the College Board's favorite question format: interpreting what the constants m and b mean in real-world contexts and evaluating realistic domains.",
        diagramType: "word-problem-model",
        desmosExample: {
          title: "Table Linear Regression (~)",
          expression: "y_1 \\sim m x_1 + b",
          tip: "Add a table in Desmos (+ icon). Type y1 ~ m x1 + b. Desmos instantly calculates slope m and intercept b with r² = 1."
        },
        keyTakeaways: [
          "Interpreting Slope ($m$): 'For every 1 unit increase in x, y increases (or decreases) by m units.'",
          "Interpreting Intercept ($b$): 'The baseline value of y when x = 0 (before any time or events elapsed).'",
          "Rate Constant Test: Linear models require that $\\frac{\\Delta y}{\\Delta x}$ remains strictly constant across all data pairs.",
          "Domain Restrictions: Physical variables like time, distance, and population counts cannot be negative ($x \\ge 0$)."
        ],
        contentMarkdown: `### Interpreting Linear Functions in Context

On the Digital SAT, the College Board frequently presents an equation like $W = 35d + 120$ and asks: *"What is the best interpretation of the number 35 in this context?"*

#### The Standard Interpretation Formulas:
- **Interpretation of Slope ($m$):**
  > *"The estimated increase in [dependent variable $y$] for each additional 1 unit increase in [independent variable $x$]."*
- **Interpretation of Intercept ($b$):**
  > *"The baseline or starting value of [dependent variable $y$] when [independent variable $x$] is zero."*

#### Common Distractor Traps to Avoid:
1. **Confusing Total with Rate:** An answer choice stating *"The total amount earned over $d$ days"* is WRONG when describing slope $m$. Slope is strictly the *per-day* increment.
2. **Reversing Variables:** Choosing *"The number of days per dollar"* instead of *"The number of dollars per day"*.
3. **Ignoring Units:** A problem giving time in minutes but slope in hours requires multiplying or dividing by 60.

#### Worked Example:
> *"The function $C(m) = 2.75m + 14$ estimates the total weight in pounds of a shipment of $m$ metal brackets packed in a wooden shipping crate. What is the best interpretation of 14 in this model?"*

In $C(m) = 2.75m + 14$:
- $2.75$ is the slope: the weight in pounds of **one individual bracket**.
- $14$ is the $y$-intercept ($C(0) = 14$): the weight of the **empty wooden crate** with zero brackets.`,
      },
      {
        id: "u2-sec-4-graphs",
        title: "4. Graphs of Linear Equations & Functions: Standard Form, Slopes & Intercepts",
        readTime: "8 min read",
        summary: "Understand the three forms of linear equations. Use rapid shortcut formulas for Standard Form Ax + By = C to calculate slopes and intercepts in under 5 seconds.",
        diagramType: "linear-graph",
        desmosExample: {
          title: "Standard Form Direct Plotter",
          expression: "3x - 4y = 24",
          tip: "Never waste time converting standard form into y = mx + b by hand. Desmos graphs 3x - 4y = 24 directly and highlights intercepts (8, 0) and (0, -6) as clickable dots!"
        },
        keyTakeaways: [
          "Slope formula: $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\text{Rise}}{\\text{Run}}$.",
          "Standard Form Shortcut: For $Ax + By = C$, $\\text{Slope } m = -\\frac{A}{B}$, $y\\text{-intercept } = \\frac{C}{B}$, $x\\text{-intercept } = \\frac{C}{A}$.",
          "Horizontal line ($y = c$): Slope is 0; parallel to x-axis.",
          "Vertical line ($x = c$): Slope is undefined; perpendicular to x-axis."
        ],
        contentMarkdown: `### The Three Linear Forms on the SAT

Every straight line in the coordinate plane can be written in three algebraic forms:

#### 1. Slope-Intercept Form:
$$y = mx + b$$
- $m$: Slope (rate of steepness)
- $b$: $y$-intercept (the point where the line crosses the vertical axis: $(0, b)$)

#### 2. Standard Form:
$$Ax + By = C$$
- **Slope:** $m = -\\frac{A}{B}$
- **$y$-intercept:** Set $x = 0 \\implies y = \\frac{C}{B}$
- **$x$-intercept:** Set $y = 0 \\implies x = \\frac{C}{A}$

#### 3. Point-Slope Form:
$$y - y_1 = m(x - x_1)$$
- Ideal when you are given a slope $m$ and a passing point $(x_1, y_1)$.

#### Summary of Line Orientations:
| Line Orientation | Equation Pattern | Slope Value ($m$) | Example |
| :--- | :--- | :--- | :--- |
| **Rising (Left to Right)** | $y = mx + b$ | $m > 0$ | $y = 3x - 2$ |
| **Falling (Left to Right)** | $y = -mx + b$ | $m < 0$ | $y = -2x + 7$ |
| **Horizontal Line** | $y = c$ | $m = 0$ | $y = 4$ |
| **Vertical Line** | $x = c$ | $m = \\text{undefined}$ | $x = -3$ |`,
      },
      {
        id: "u2-sec-5-parallel-perp",
        title: "5. Parallel & Perpendicular Lines in the xy-Plane",
        readTime: "6 min read",
        summary: "Parallel lines share identical slopes; perpendicular lines have negative reciprocal slopes. Learn the instant perpendicular coefficient swap trick.",
        diagramType: "parallel-perpendicular",
        desmosExample: {
          title: "Perpendicular Slope Checker",
          expression: "y = (3/4)x + 2 \\ny = (-4/3)x - 1",
          tip: "Notice the lines cross at an exact 90-degree right angle. Their slopes (3/4 and -4/3) multiply to -1!"
        },
        keyTakeaways: [
          "Parallel Lines: $m_1 = m_2$ and $b_1 \\ne b_2$. Slopes are strictly equal, never intersect.",
          "Perpendicular Lines: $m_1 \\cdot m_2 = -1 \\iff m_2 = -\\frac{1}{m_1}$ (negative reciprocal).",
          "Standard Form Perpendicular Shortcut: If line 1 is $Ax + By = C$, any perpendicular line has the form $Bx - Ay = K$.",
          "Horizontal & Vertical: The line $y = 5$ is perpendicular to $x = 2$."
        ],
        contentMarkdown: `### Geometric Line Relationships

The SAT regularly tests whether you can calculate slopes of parallel and perpendicular lines.

#### Parallel Lines ($m_1 = m_2$):
Two lines are parallel if and only if they have the **exact same slope** but different $y$-intercepts:
$$L_1: y = 3x + 5 \\quad \\text{is parallel to} \\quad L_2: y = 3x - 11$$

#### Perpendicular Lines ($m_1 \\cdot m_2 = -1$):
Two lines are perpendicular if their slopes are **opposite (negative) reciprocals**:
$$m_2 = -\\frac{1}{m_1}$$

| Original Slope ($m_1$) | Perpendicular Slope ($m_2$) | Notes |
| :--- | :--- | :--- |
| $\\frac{2}{3}$ | $-\\frac{3}{2}$ | Flip fraction and change sign |
| $-4$ | $+\\frac{1}{4}$ | Negative integer becomes positive unit fraction |
| $-\\frac{5}{7}$ | $+\\frac{7}{5}$ | Flip and make positive |
| $0$ (Horizontal) | $\\text{Undefined}$ (Vertical) | Perpendicular axes |

#### Worked Example:
> *"Line $j$ has the equation $3x + 5y = 15$. Line $k$ is perpendicular to line $j$ and passes through the point $(6, -2)$. What is the equation of line $k$?"*

1. Find slope of line $j$: $m_j = -\\frac{A}{B} = -\\frac{3}{5}$.
2. Perpendicular slope: $m_k = +\\frac{5}{3}$.
3. Use point-slope with $(6, -2)$:
$$y - (-2) = \\frac{5}{3}(x - 6) \\implies y + 2 = \\frac{5}{3}x - 10 \\implies y = \\frac{5}{3}x - 12$$`,
      },
      {
        id: "u2-sec-6-systems",
        title: "6. Systems of Linear Equations: Substitution, Elimination & Desmos",
        readTime: "8 min read",
        summary: "A system of linear equations represents two lines in the xy-plane. Their intersection point is the unique solution. Desmos finds the solution in 3 seconds flat.",
        diagramType: "system-intersection",
        desmosExample: {
          title: "System Intersection Trick",
          expression: "2x + 3y = 18 \\n4x - y = 8",
          tip: "Click the grey dot where lines cross: Desmos displays (3, 4). x = 3, y = 4 in 4 seconds flat!"
        },
        keyTakeaways: [
          "Intersection Principle: The solution to any system is the point $(x, y)$ that satisfies both equations simultaneously.",
          "When to use Elimination: When coefficients of one variable are additive inverses (e.g. $+3y$ and $-3y$).",
          "When to use Substitution: When one equation has an isolated variable ($y = 2x - 5$).",
          "When to use Desmos: On 100% of Digital SAT systems where choices or values of $x, y$ are required!",
          "Composite Value Trap: If question asks for $3x + 3y$, add the two equations together instead of solving for $x$ and $y$ separately."
        ],
        contentMarkdown: `### Systems of Linear Equations

A linear system in two variables has the general form:
$$\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}$$

#### The Three Geometric Cases on the SAT:
1. **Lines Intersect (One Unique Solution):**
   - The slopes are not equal: $m_1 \\ne m_2 \\iff \\frac{a_1}{a_2} \\ne \\frac{b_1}{b_2}$.
2. **Lines are Parallel (No Solution):**
   - Slopes are equal, but $y$-intercepts are different:
   $$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2}$$
3. **Lines are Coincident (Infinitely Many Solutions):**
   - Both equations represent the exact same line:
   $$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$$

#### The Desmos 4-Second SpeedHack:
Enter Equation 1 on Line 1, Equation 2 on Line 2. A grey dot appears at their intersection. Click the dot to reveal the $(x, y)$ solution coordinates instantly.`,
      },
      {
        id: "u2-sec-7-systems-word-problems",
        title: "7. Systems Word Problems: Mixture, Tickets & Quantity-Value Systems",
        readTime: "8 min read",
        summary: "Deconstruct real-world systems into two simultaneous equations: the Quantity Equation (total count) and the Value Equation (total dollars or weight).",
        diagramType: "system-intersection",
        desmosExample: {
          title: "Ticket System Solver",
          expression: "s + a = 250 \\n6s + 10a = 1900",
          tip: "Click grey dot: (150, 100). 150 student tickets and 100 adult tickets were sold!"
        },
        keyTakeaways: [
          "Quantity Equation: $x + y = \\text{Total Items}$ (e.g. number of tickets, coins, hours).",
          "Value Equation: $C_1 x + C_2 y = \\text{Total Dollar Revenue}$ (multiply each item by its unit price).",
          "Mixture Framework: $(\\%_1)(V_1) + (\\%_2)(V_2) = (\\%_\\text{final})(V_1 + V_2)$.",
          "Desmos Solver: Graph both word problem equations directly in Desmos using x and y."
        ],
        contentMarkdown: `### The Quantity-Value System Framework

Almost all SAT systems word problems follow the universal **Quantity-Value Dual Equation** pattern:

#### Equation 1: Quantity (Total Count)
$$x + y = \\text{Total Number of Items}$$

#### Equation 2: Value (Total Worth, Weight, or Dollars)
$$\\text{Rate}_1 \\cdot x + \\text{Rate}_2 \\cdot y = \\text{Total Revenue}$$

#### Worked Example:
> *"A high school drama club sold a total of 250 tickets to an evening performance. Student tickets cost $\\$6$ each, and adult tickets cost $\\$10$ each. If the total ticket sales were $\\$1,900$, how many student tickets were sold?"*

1. Define variables: Let $s =$ student tickets, $a =$ adult tickets.
2. System equations:
$$\\begin{cases} s + a = 250 \\\\ 6s + 10a = 1900 \\end{cases}$$
3. Multiply Equation 1 by 10 to eliminate $a$:
$$10s + 10a = 2500$$
$$-(6s + 10a = 1900)$$
$$4s = 600 \\implies s = 150$$
Exactly **150 student tickets** were sold.`,
      },
      {
        id: "u2-sec-8-inequalities",
        title: "8. Linear Inequalities & Systems of Inequalities: Flip Rule & Feasible Regions",
        readTime: "7 min read",
        summary: "Multiply or divide by a negative number? Flip the inequality symbol! Learn how to identify boundary lines and determine valid solutions in shaded feasible regions.",
        diagramType: "inequality-plane",
        desmosExample: {
          title: "Inequality Feasible Region Shading",
          expression: "y >= 2x - 3 \\ny < -x + 4",
          tip: "Desmos shades both regions. The darker overlapping area is the valid solution set!"
        },
        keyTakeaways: [
          "Negative Inversion Rule: Multiplying or dividing both sides by a negative number REVERSES the inequality symbol ($< \\leftrightarrow >$).",
          "Boundary Lines: Strict inequalities ($<, >$) are drawn with dashed lines; non-strict ($\\le, \\ge$) are drawn with solid lines.",
          "Test Point Technique: Plug $(0, 0)$ into the inequality. If the resulting statement is true, shade the region containing $(0, 0)$.",
          "Systems of Inequalities: A point $(x, y)$ is a valid solution if and only if it falls inside the overlapping shaded region of all inequalities in the system."
        ],
        contentMarkdown: `### Linear Inequalities in One and Two Variables

An inequality describes an entire region of solutions rather than a single discrete point.

#### The Fundamental Negative Inversion Rule:
Whenever you multiply or divide both sides of an inequality by a negative number, you **MUST flip the inequality symbol**:

$$-4x + 7 < 31 \\implies -4x < 24 \\implies x > \\frac{24}{-4} \\implies x > -6$$

#### Shading the Coordinate Plane:
| Inequality Form | Boundary Line Type | Shaded Half-Plane | Boundary Points Included? |
| :--- | :--- | :--- | :--- |
| $y > mx + b$ | **Dashed** | **Above** the line | **NO** (Strictly greater) |
| $y < mx + b$ | **Dashed** | **Below** the line | **NO** (Strictly less) |
| $y \\ge mx + b$ | **Solid** | **Above** the line | **YES** (Points on line are solutions) |
| $y \\le mx + b$ | **Solid** | **Below** the line | **YES** (Points on line are solutions) |

#### Testing Points:
To verify whether point $(x_0, y_0)$ is a solution to a system of inequalities, substitute its coordinates into both inequalities. If both statements evaluate to true, the point lies in the feasible region.`,
      }
    ],
    speedHacks: [
      {
        title: "Desmos Single-Variable Vertical Line Solver",
        trigger: "Any complicated linear equation with only one unknown variable x",
        shortcut: "Type the full equation directly into Desmos without solving algebraically.",
        example: "Type '5(2x - 3) + 4 = 39'. Desmos plots a vertical line at x = 5. Read the answer!"
      },
      {
        title: "Two-Line System Intersection Clicker",
        trigger: "Any system of two linear equations with choices for x or y",
        shortcut: "Type both lines into Desmos. Tap the grey intersection dot to reveal (x, y).",
        example: "Line 1: 3x + 2y = 16. Line 2: y = 2x - 6. Tap grey dot: (4, 2). Immediate answer!"
      },
      {
        title: "Scale Factor Matching for 'No Solution' Systems",
        trigger: "Linear systems with unknown constant k stated to have 'No Solution'",
        shortcut: "Equate the ratio of x-coefficients to the ratio of y-coefficients.",
        example: "If 2x + 5y = 7 and kx + 10y = 15 have no solution: k must equal 2 * (10/5) = 4."
      },
      {
        title: "Composite Structure Factoring Shortcut",
        trigger: "Question provides 2x + 5y = 11 and asks for 8x + 20y - 15",
        shortcut: "Factor the target: 8x + 20y = 4(2x + 5y) = 4(11) = 44. Subtract 15 to get 29.",
        example: "Never solve for individual x and y when the question asks for a composite multiple!"
      },
      {
        title: "Inequality Feasible Region Overlay in Desmos",
        trigger: "Questions asking which ordered pair (x, y) satisfies a system of inequalities",
        shortcut: "Type both inequalities into Desmos with <, >, <=, or >=. Graph the answer choices as points (a, b).",
        example: "The valid answer choice will sit visibly inside the doubly-shaded overlapping area."
      }
    ],
    practiceQuestions: [
      {
        id: "u2_q01_linear_iso",
        questionNumber: 1,
        prompt: "If $5(2x - 3) + 4 = 39$, what is the value of $x$?",
        options: ["A. 3", "B. 4", "C. 5", "D. 6"],
        correctAnswer: "C",
        explanation: "1. Distribute: $10x - 15 + 4 = 39$.\n2. Combine like terms: $10x - 11 = 39$.\n3. Add 11 to both sides: $10x = 50$.\n4. Divide by 10: $x = 5$.",
        desmosTrick: "Type '5(2x - 3) + 4 = 39' into Desmos. A vertical line appears at x = 5. Done in 3 seconds!"
      },
      {
        id: "u2_q02_no_solution",
        questionNumber: 2,
        prompt: "In the equation $kx - 14 = 8x + 22$, where $k$ is a constant, the equation has no solution for $x$. What is the value of $k$?",
        options: ["A. -14", "B. 0", "C. 8", "D. 22"],
        correctAnswer: "C",
        explanation: "For a linear equation in one variable to have no solution, the coefficients of x must be identical ($k = 8$) while the constants differ ($-14 \\ne 22$), creating a false statement $0 = 36$.",
        satTrap: "Setting k equal to the constants (-14 or 22) instead of matching the x-coefficients."
      },
      {
        id: "u2_q03_infinite_sol",
        questionNumber: 3,
        prompt: "The equation $6(2x - b) = ax - 18$ has infinitely many solutions, where $a$ and $b$ are constants. What is the value of $a + b$?",
        options: ["A. 9", "B. 12", "C. 15", "D. 18"],
        correctAnswer: "C",
        explanation: "1. Distribute left side: $12x - 6b = ax - 18$.\n2. For infinitely many solutions, coefficients of x must match: $a = 12$.\n3. Constants must match: $-6b = -18 \\implies b = 3$.\n4. Therefore, $a + b = 12 + 3 = 15$.",
        referenceFormula: "a_1 = a_2 \\quad \\text{and} \\quad c_1 = c_2"
      },
      {
        id: "u2_q04_inequality_flip",
        questionNumber: 4,
        prompt: "Which inequality represents all possible values of $x$ such that $-4x + 7 < 31$?",
        options: ["A. x < -6", "B. x > -6", "C. x < 6", "D. x > 6"],
        correctAnswer: "B",
        explanation: "1. Subtract 7 from both sides: $-4x < 24$.\n2. Divide by -4 and FLIP the inequality sign: $x > \\frac{24}{-4} \\implies x > -6$.",
        satTrap: "Forgetting to reverse the '<' sign to '>' when dividing by negative 4."
      },
      {
        id: "u2_q05_system_inter",
        questionNumber: 5,
        prompt: "If $(x, y)$ satisfies the system of equations $2x + 3y = 18$ and $4x - y = 8$, what is the value of $x + y$?",
        options: ["A. 4", "B. 5", "C. 7", "D. 9"],
        correctAnswer: "C",
        explanation: "1. From equation 2: $y = 4x - 8$.\n2. Substitute into equation 1: $2x + 3(4x - 8) = 18 \\implies 14x - 24 = 18 \\implies 14x = 42 \\implies x = 3$.\n3. Then $y = 4(3) - 8 = 4$.\n4. Sum $x + y = 3 + 4 = 7$.",
        desmosTrick: "Type both lines into Desmos. Click the intersection: (3, 4). Calculate 3 + 4 = 7."
      },
      {
        id: "u2_q06_word_rental",
        questionNumber: 6,
        prompt: "A moving truck rental service charges $\\$80$ for the first day plus $\\$0.45$ per mile driven. If a customer has a budget of $\\$170$ for a one-day rental, what is the maximum distance, in miles, the customer can drive?",
        options: ["A. 150", "B. 180", "C. 200", "D. 220"],
        correctAnswer: "C",
        explanation: "1. Set up inequality: $0.45m + 80 \\le 170$.\n2. Subtract 80: $0.45m \\le 90$.\n3. Divide by 0.45: $m \\le \\frac{90}{0.45} = 200\\text{ miles}$.",
        desmosTrick: "Type '(170 - 80) / 0.45' into Desmos to get 200 immediately."
      },
      {
        id: "u2_q07_slope_intercept",
        questionNumber: 7,
        prompt: "Line $L$ in the $xy$-plane passes through the points $(2, 7)$ and $(6, 19)$. What is the $y$-intercept of line $L$?",
        options: ["A. -1", "B. 1", "C. 3", "D. 5"],
        correctAnswer: "B",
        explanation: "1. Slope $m = \\frac{19 - 7}{6 - 2} = \\frac{12}{4} = 3$.\n2. Use point-slope with $(2, 7)$: $y - 7 = 3(x - 2) \\implies y = 3x - 6 + 7 = 3x + 1$.\n3. The y-intercept is $b = 1$.",
        referenceFormula: "m = \\frac{y_2 - y_1}{x_2 - x_1}, \\quad y = mx + b"
      },
      {
        id: "u2_q08_perpendicular",
        questionNumber: 8,
        prompt: "Line $p$ has the equation $y = -\\frac{2}{5}x + 4$. Line $q$ is perpendicular to line $p$ in the $xy$-plane and passes through the point $(4, 11)$. What is the slope of line $q$?",
        options: ["A. -\\frac{5}{2}", "B. -\\frac{2}{5}", "C. \\frac{2}{5}", "D. \\frac{5}{2}"],
        correctAnswer: "D",
        explanation: "Perpendicular lines have negative reciprocal slopes ($m_1 \\cdot m_2 = -1$). The negative reciprocal of $-\\frac{2}{5}$ is $+\\frac{5}{2}$.",
        referenceFormula: "m_{\\perp} = -\\frac{1}{m}"
      },
      {
        id: "u2_q09_structure_shortcut",
        questionNumber: 9,
        prompt: "If $2x + 5y = 11$, what is the value of $8x + 20y - 15$?",
        options: ["A. 29", "B. 33", "C. 44", "D. 59"],
        correctAnswer: "A",
        explanation: "1. Notice the multiple structure: $8x + 20y = 4(2x + 5y)$.\n2. Substitute $(2x + 5y) = 11$: $4(11) = 44$.\n3. Subtract 15: $44 - 15 = 29$.",
        satTrap: "Trying to solve for individual values of x and y with only one equation."
      },
      {
        id: "u2_q10_system_no_sol",
        questionNumber: 10,
        prompt: "Consider the system of equations: $3x + ay = 12$ and $6x + 8y = 20$. For what value of the constant $a$ will the system have no solution?",
        options: ["A. 2", "B. 4", "C. 6", "D. 8"],
        correctAnswer: "B",
        explanation: "For no solution (parallel lines), the ratio of coefficients must be equal: $\\frac{3}{6} = \\frac{a}{8} \\implies \\frac{1}{2} = \\frac{a}{8} \\implies a = 4$. Constants differ: $\\frac{12}{20} = \\frac{3}{5} \\ne \\frac{1}{2}$.",
        referenceFormula: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2}"
      }
    ],
    prevUnitId: "unit-01-about-sat",
    nextUnitId: "unit-03-foundations-psda"
  },

  // =========================================================================
  // UNIT 3: FOUNDATIONS: PROBLEM SOLVING & DATA ANALYSIS
  // =========================================================================
  "unit-03-foundations-psda": {
    id: "unit-03-foundations-psda",
    unitNumber: 3,
    title: "Unit 3: Foundations: Problem Solving & Data Analysis",
    slug: "unit-03-foundations-psda",
    tier: "Foundations",
    domain: "Problem Solving and Data Analysis",
    topicCode: "DAT-01",
    estimatedHours: "4.5 hours",
    description: "Core foundations of ratios, proportional rates, percentage change, dimensional unit conversions, statistics (mean/median/spread), two-way tables, and scatterplot regression.",
    overviewSummary: "Problem Solving and Data Analysis accounts for approximately 15% to 20% of the Digital SAT Math section. Questions emphasize real-world contextual reasoning: translating multi-step word problems into mathematical ratios, calculating compound percentage multipliers, converting complex units, and extracting accurate conditional probabilities from frequency tables.",
    sections: [
      {
        id: "u3-sec-1-ratios-rates",
        title: "1. Ratios, Rates & Proportions: Setting Up Cross-Multiplication Models",
        readTime: "8 min read",
        summary: "A ratio is a quantitative comparison of two values (a : b). Master cross-multiplication, unit rate conversions, and scale factor modeling.",
        diagramType: "word-problem-model",
        desmosExample: {
          title: "Direct Ratio Solver",
          expression: "x / 14 = 9 / 6",
          tip: "Desmos graphs a vertical line at x = 21. No manual cross-multiplication required!"
        },
        keyTakeaways: [
          "Cross-Multiplication Rule: $\\frac{a}{b} = \\frac{c}{d} \\iff a \\cdot d = b \\cdot c$.",
          "Part-to-Part vs Part-to-Whole: If the ratio of boys to girls is $3:5$, the ratio of boys to total students is $3:(3+5) = 3:8$.",
          "Unit Rate: $\\frac{\\text{Total Quantity}}{\\text{Number of Units}}$ (e.g., miles per gallon, dollars per pound).",
          "Scaling Factor ($k$): If a recipe ratio is $2:5:7$, the actual component quantities are $2k, 5k, 7k$."
        ],
        contentMarkdown: `### The Foundations of Ratios and Proportions

A ratio compares two quantities by division. A proportion is a mathematical statement that two ratios are strictly equal:

$$\\frac{a}{b} = \\frac{c}{d} \\implies a \\cdot d = b \\cdot c$$

#### 1. Part-to-Part vs. Part-to-Whole:
The College Board frequently sets traps by giving a part-to-part ratio and asking for a part-to-whole probability or percentage:
- If red marbles to blue marbles is in the ratio $4:7$:
  - **Part-to-Part:** $\\frac{\\text{Red}}{\\text{Blue}} = \\frac{4}{7}$
  - **Part-to-Whole (Red):** $\\frac{\\text{Red}}{\\text{Total}} = \\frac{4}{4 + 7} = \\frac{4}{11}$
  - **Part-to-Whole (Blue):** $\\frac{\\text{Blue}}{\\text{Total}} = \\frac{7}{4 + 7} = \\frac{7}{11}$

#### 2. The Multiplier Constant ($k$) Technique:
When a problem provides a multi-part ratio like $3:4:5$ and a total sum, introduce an unknown scaling multiplier $k$:
$$3k + 4k + 5k = \\text{Total} \\implies 12k = \\text{Total} \\implies k = \\frac{\\text{Total}}{12}$$

#### Worked Example:
> *"A contractor mixes sand, gravel, and cement in the ratio $3 : 5 : 2$ by weight to make concrete. If the contractor needs to produce $1,800\\text{ kg}$ of concrete, how many kilograms of gravel are required?"*

1. Set up the scaling equation:
$$3k + 5k + 2k = 1800 \\implies 10k = 1800 \\implies k = 180$$
2. Gravel corresponds to the middle term ($5k$):
$$\\text{Gravel} = 5 \\times 180 = 900\\text{ kg}$$
The contractor needs **900 kg of gravel**.`
      },
      {
        id: "u3-sec-2-percentages",
        title: "2. Percentages, Percent Change & The Multiplier Method (1 ± r)",
        readTime: "8 min read",
        summary: "Never use slow grade-school methods for percentages. Convert every percentage increase or decrease into a single decimal multiplier (1 +/- r).",
        diagramType: "percent-multiplier",
        desmosExample: {
          title: "Successive Multiplier Evaluator",
          expression: "450 * (1 + 0.15) * (1 - 0.20)",
          tip: "Desmos computes compound percentage changes in one step. 450 * 1.15 * 0.8 = 414."
        },
        keyTakeaways: [
          "Multiplier Rule: Increase of $p\\% \\implies \\times (1 + \\frac{p}{100})$; Decrease of $p\\% \\implies \\times (1 - \\frac{p}{100})$.",
          "Percent Change: $\\frac{\\text{New} - \\text{Old}}{\\text{Old}} \\times 100\\%$. Always divide by the starting baseline!",
          "Successive Percentage Trap: $+20\\%$ followed by $-20\\%$ is $(1.20)(0.80) = 0.96$ ($4\\%$ net loss, NOT zero!).",
          "Original Value Recovery: $\\text{Original} = \\frac{\\text{Final}}{1 \\pm r}$."
        ],
        contentMarkdown: `### The High-Speed Decimal Multiplier Method

On the Digital SAT, calculating percentages step-by-step with scratch arithmetic wastes valuable time. Use the **Decimal Multiplier Principle**:

| Scenario | Percent Language | Decimal Multiplier | Algebraic Formula |
| :--- | :--- | :--- | :--- |
| **Increase** | *"increases by 18%"* | $1 + 0.18 = 1.18$ | $\\text{New} = \\text{Original} \\times 1.18$ |
| **Decrease** | *"discounted by 25%"* | $1 - 0.25 = 0.75$ | $\\text{New} = \\text{Original} \\times 0.75$ |
| **Sales Tax** | *"price plus 7.5% tax"* | $1 + 0.075 = 1.075$ | $\\text{Total} = \\text{Price} \\times 1.075$ |
| **Depreciation** | *"loses 12% value/yr"* | $1 - 0.12 = 0.88$ | $V(t) = V_0 \\times (0.88)^t$ |

#### 1. The Percent Change Formula:
$$\\% \\text{ Change} = \\frac{\\text{New Value} - \\text{Original Value}}{\\text{Original Value}} \\times 100\\%$$

> [!WARNING]
> **The Baseline Trap:** Always divide by the **Original** (initial) value, never the New value!

#### 2. Successive Changes (Compounding Multipliers):
If an item undergoes multiple percentage changes sequentially, multiply their individual decimal factors together:
$$\\text{Final} = \\text{Original} \\times (1 + r_1) \\times (1 + r_2) \\times \\dots$$

#### Worked Example:
> *"A retail store increases the original price of a gaming monitor by $30\\%$. During a weekend clearance sale, the new price is discounted by $20\\%$. If the original price was $\\$400$, what was the final clearance price?"*

$$\\text{Final Price} = 400 \\times (1 + 0.30) \\times (1 - 0.20)$$
$$\\text{Final Price} = 400 \\times 1.30 \\times 0.80 = 400 \\times 1.04 = \\$416$$
Notice the net effect is a $4\\%$ overall increase ($1.30 \\times 0.80 = 1.04$).`
      },
      {
        id: "u3-sec-3-unit-conversion",
        title: "3. Dimensional Analysis & Multi-Step Unit Conversions: Avoiding the Area/Volume Trap",
        readTime: "7 min read",
        summary: "Chain conversion factors so units cancel out diagonally. Avoid the lethal area and volume power trap.",
        diagramType: "formula-reference",
        desmosExample: {
          title: "Multi-Step Unit Converter",
          expression: "60 * (5280 / 3600)",
          tip: "60 mph = 88 feet per second. Desmos evaluates conversion fraction chains instantly."
        },
        keyTakeaways: [
          "Fraction Alignment: Place unwanted units diagonally opposite so they cancel out mathematically.",
          "Rate Conversion: To convert miles/hour to feet/second, multiply by $\\frac{5280\\text{ ft}}{1\\text{ mile}}$ and $\\frac{1\\text{ hour}}{3600\\text{ sec}}$.",
          "Area Square Trap: $1\\text{ yd} = 3\\text{ ft} \\implies 1\\text{ yd}^2 = 3^2\\text{ ft}^2 = 9\\text{ ft}^2$, NOT $3\\text{ ft}^2$!",
          "Volume Cube Trap: $1\\text{ m} = 100\\text{ cm} \\implies 1\\text{ m}^3 = 100^3\\text{ cm}^3 = 1,000,000\\text{ cm}^3$."
        ],
        contentMarkdown: `### Dimensional Analysis: Canceling Units Like Variables

In dimensional analysis, physical units ($cm, s, kg, miles$) follow the exact same rules as algebraic variables:

$$\\frac{\\text{Unit } A}{1} \\times \\frac{\\text{Unit } B}{\\text{Unit } A} = \\text{Unit } B$$

#### Standard SAT Conversion Equivalencies:
- **Time:** $1\\text{ hr} = 60\\text{ min} = 3,600\\text{ sec}$
- **Length:** $1\\text{ mile} = 5,280\\text{ feet}$, $1\\text{ yard} = 3\\text{ feet}$, $1\\text{ foot} = 12\\text{ inches}$
- **Metric:** $1\\text{ km} = 1,000\\text{ m}$, $1\\text{ m} = 100\\text{ cm}$, $1\\text{ kg} = 1,000\\text{ g}$

#### The High-Scorer Area and Volume Trap:
When converting units of **Area** (squared) or **Volume** (cubed), you must raise the entire conversion factor to the power:

| Linear Dimension | Area Dimension (Squared) | Volume Dimension (Cubed) |
| :--- | :--- | :--- |
| $1\\text{ yd} = 3\\text{ ft}$ | $1\\text{ yd}^2 = 3^2 = 9\\text{ ft}^2$ | $1\\text{ yd}^3 = 3^3 = 27\\text{ ft}^3$ |
| $1\\text{ ft} = 12\\text{ in}$ | $1\\text{ ft}^2 = 12^2 = 144\\text{ in}^2$ | $1\\text{ ft}^3 = 12^3 = 1,728\\text{ in}^3$ |
| $1\\text{ m} = 100\\text{ cm}$ | $1\\text{ m}^2 = 100^2 = 10,000\\text{ cm}^2$ | $1\\text{ m}^3 = 100^3 = 1,000,000\\text{ cm}^3$ |

#### Worked Example:
> *"A car is traveling along a highway at a constant speed of $45\\text{ miles per hour}$. What is the car's speed in feet per second? ($1\\text{ mile} = 5,280\\text{ feet}$)"*

$$\\frac{45\\text{ miles}}{1\\text{ hour}} \\times \\frac{5,280\\text{ feet}}{1\\text{ mile}} \\times \\frac{1\\text{ hour}}{3,600\\text{ seconds}}$$
$$\\text{Speed} = \\frac{45 \\times 5280}{3600} = \\frac{237,600}{3,600} = 66\\text{ feet per second}$$`
      },
      {
        id: "u3-sec-4-statistics",
        title: "4. Descriptive Statistics: Mean, Median, Mode, Range & Outlier Skewness",
        readTime: "8 min read",
        summary: "Master center (mean, median) and spread (range, standard deviation). Understand how extreme outliers warp the mean while leaving the median untouched.",
        diagramType: "formula-reference",
        desmosExample: {
          title: "Desmos List Statistics Engine",
          expression: "L = [72, 85, 91, 78, 94] \\nmean(L) \\nmedian(L) \\nstdev(L)",
          tip: "Type L = [numbers]. Desmos computes mean, median, and sample standard deviation instantly!"
        },
        keyTakeaways: [
          "Sum Equation: $\\sum x = n \\cdot \\bar{x}$. If you know the mean and count, you know the total sum!",
          "Missing Score: $\\text{Required Score} = (\\text{Total Count} \\times \\text{Desired Mean}) - \\text{Current Sum}$.",
          "Median Position: In an ordered set of $n$ numbers, the median is at index $\\frac{n+1}{2}$. For even $n$, average the two middle values.",
          "Outlier Sensitivity: High outliers pull the mean up ($\\text{Mean} > \\text{Median}$); low outliers pull the mean down ($\\text{Mean} < \\text{Median}$). The median is resistant.",
          "Standard Deviation: Measures dispersion from the mean. A wider or more spread-out dataset has a higher standard deviation."
        ],
        contentMarkdown: `### Measures of Center and Dispersion

Statistical reasoning on the SAT tests your understanding of data distributions and the mathematical distinction between mean and median.

#### 1. The Arithmetic Mean:
$$\\bar{x} = \\frac{\\sum x}{n} \\iff \\sum x = n \\cdot \\bar{x}$$

#### 2. The Missing Score Algorithm:
If a student takes $n$ tests and wants an average of $A$, the required total sum is $n \\times A$. Subtract the known scores to isolate the unknown test score:
$$\\text{Score}_{\\text{new}} = (n \\times A) - \\sum \\text{known scores}$$

#### 3. Comparing Mean vs. Median under Skewness:
- **Symmetric Distribution:** $\\text{Mean} \\approx \\text{Median}$
- **Right-Skewed (Extreme High Outlier):** $\\text{Mean} > \\text{Median}$ (The outlier pulls the mean to the right).
- **Left-Skewed (Extreme Low Outlier):** $\\text{Mean} < \\text{Median}$ (The outlier pulls the mean to the left).

> [!NOTE]
> **Median Resistance:** The median depends only on the rank order of numbers. Changing a single high value from $100$ to $1,000,000$ leaves the median completely unchanged, but drastically inflates the mean!

#### 4. Range and Standard Deviation:
- **Range:** $\\text{Maximum} - \\text{Minimum}$.
- **Standard Deviation:** A measure of how concentrated numbers are around the mean.
  - If all data points are identical ($[5, 5, 5, 5]$), $\\text{standard deviation} = 0$.
  - Datasets with values clustered near the center have **smaller** standard deviation than datasets with values pushed to the extremes.`
      },
      {
        id: "u3-sec-5-two-way-tables",
        title: "5. Two-Way Frequency Tables: Joint, Marginal & Conditional Probability",
        readTime: "7 min read",
        summary: "Categorical data organized by rows and columns. Learn the golden rule of conditional probability: identify the restricted denominator first!",
        diagramType: "two-way-conditional",
        desmosExample: {
          title: "Restricted Denominator Fraction",
          expression: "18 / (18 + 42)",
          tip: "Click Desmos's fraction toggle (convert to decimal or exact fraction 3/10) to match SAT choices."
        },
        keyTakeaways: [
          "Overall Probability: $\\frac{\\text{Cell Count}}{\\text{Grand Total}}$.",
          "Conditional Trigger Words: 'Given that', 'Of those who', 'Among the students'. These words shrink the denominator to that specific row or column subtotal!",
          "Joint Frequency: The count at the intersection of a specific row and column.",
          "Marginal Frequency: The subtotal at the edge of a row or column."
        ],
        contentMarkdown: `### Two-Way Tables and Conditional Probability

A two-way frequency table categorizes observational data across two distinct variables (e.g., Grade Level vs. Preferred Activity):

| Class Level | Plays a Sport | Does Not Play | Row Total |
| :--- | :--- | :--- | :--- |
| **Sophomores** | 45 | 55 | **100** |
| **Juniors** | 60 | 40 | **100** |
| **Seniors** | 75 | 25 | **100** |
| **Column Total** | **180** | **120** | **Grand Total: 300** |

#### The Golden Rule of Probability Questions:
Always read the **Subject of the Question** to determine the denominator:

1. **Unconditional Question:**
   > *"If a student is chosen at random from all 300 students, what is the probability they are a Senior who plays a sport?"*
   $$\\text{Probability} = \\frac{\\text{Seniors who play}}{\\text{Grand Total}} = \\frac{75}{300} = \\frac{1}{4} = 0.25$$

2. **Conditional Question (Restricted Row):**
   > *"If a student is chosen at random from the **Seniors**, what is the probability they play a sport?"*
   - Denominator is restricted to **Seniors Total (100)**:
   $$\\text{Probability} = \\frac{75}{100} = \\frac{3}{4} = 0.75$$

3. **Conditional Question (Restricted Column):**
   > *"Among the students who **play a sport**, what is the probability that the student is a Junior?"*
   - Denominator is restricted to **Plays a Sport Total (180)**:
   $$\\text{Probability} = \\frac{60}{180} = \\frac{1}{3} \\approx 0.333$$`
      },
      {
        id: "u3-sec-6-scatterplots",
        title: "6. Scatterplots, Lines of Best Fit & Residual Analysis",
        readTime: "8 min read",
        summary: "Interpret trends in bivariate data. Master the residual formula (Actual - Predicted) and use Desmos table regression for lines of best fit.",
        diagramType: "scatterplot-residuals",
        desmosExample: {
          title: "Table Linear Regression (~)",
          expression: "y_1 \\sim m x_1 + b",
          tip: "Enter (x1, y1) data into a Desmos table (+ -> table). Type y1 ~ m x1 + b. Desmos finds the best fit line immediately!"
        },
        keyTakeaways: [
          "Line of Best Fit: $y = mx + b$. Slope ($m$) represents the average estimated change in $y$ for each 1-unit increase in $x$.",
          "Vertical Intercept ($b$): Estimated value of $y$ when $x = 0$.",
          "Residual Formula: $\\text{Residual} = y_{\\text{actual}} - y_{\\text{predicted}}$.",
          "Positive Residual: The actual data point sits ABOVE the regression line ($y_{\\text{actual}} > y_{\\text{predicted}}$).",
          "Negative Residual: The actual data point sits BELOW the regression line ($y_{\\text{actual}} < y_{\\text{predicted}}$)."
        ],
        contentMarkdown: `### Scatterplots and Trendlines

A scatterplot displays relationships between two quantitative variables. The line of best fit (trendline) models the overall linear association:

$$\\hat{y} = mx + b$$

#### 1. Interpreting Model Parameters:
- **Slope ($m$):** *"For each additional 1 unit increase in $x$, the model predicts that $y$ will increase (or decrease) by an average of $m$ units."*
- **$y$-Intercept ($b$):** *"The predicted value of $y$ when $x = 0$."* Always evaluate whether $x = 0$ makes physical sense in context!

#### 2. The Residual Formula:
A residual measures vertical prediction error:

$$\\text{Residual} = y_{\\text{actual}} - y_{\\text{predicted}}$$

- If the actual plotted dot is **above** the line: $\\text{Residual} > 0$ (Model under-predicted).
- If the actual plotted dot is **below** the line: $\\text{Residual} < 0$ (Model over-predicted).
- If the dot lies **directly on** the line: $\\text{Residual} = 0$.

#### Worked Example:
> *"A biologist models the height $h$ in centimeters of a sunflower $t$ days after planting with the equation $h = 3.2t + 14$. On day $15$, the biologist measures an actual sunflower height of $68\\text{ cm}$. What is the residual for this sunflower?"*

1. Calculate predicted height:
$$h_{\\text{predicted}} = 3.2(15) + 14 = 48 + 14 = 62\\text{ cm}$$
2. Apply the residual formula:
$$\\text{Residual} = h_{\\text{actual}} - h_{\\text{predicted}} = 68 - 62 = +6\\text{ cm}$$
The residual is **+6 cm** (the actual sunflower grew 6 cm taller than predicted).`
      }
    ],
    speedHacks: [
      {
        title: "Desmos Statistical List Functions",
        trigger: "Questions asking for mean, median, or standard deviation of a dataset",
        shortcut: "Define list L = [val1, val2, ...]. Type mean(L), median(L), stdev(L).",
        example: "Type 'L = [14, 28, 35, 42]'. Then 'mean(L)' immediately yields 29.75."
      },
      {
        title: "Successive Percentage Product Multiplier",
        trigger: "Multi-step percentage increases and decreases on an initial value",
        shortcut: "Chain decimal factors: Base * (1 + p1) * (1 - p2). Never calculate intermediate subtotals.",
        example: "A $200 item increased by 15% then decreased by 30%: type '200 * 1.15 * 0.70' -> 161."
      },
      {
        title: "The Target Average Sum Trick",
        trigger: "Finding a missing test or quiz score to achieve a target average",
        shortcut: "Multiply Target Average by Total Count, then subtract the sum of known scores.",
        example: "To average 85 over 4 tests with known scores 80, 88, 82: type '4*85 - (80+88+82)' -> 90."
      },
      {
        title: "Two-Way Table Denominator Isolation",
        trigger: "Conditional probability phrases ('Given that...', 'Of those who...')",
        shortcut: "Circle the row or column named in the condition. That subtotal is your entire denominator.",
        example: "'Of the juniors, probability of passing' = (Passing Juniors) / (Total Juniors)."
      },
      {
        title: "Desmos Table Linear Regression",
        trigger: "Scatterplot data given in a table asking for line of best fit equation",
        shortcut: "Click + -> Table. Input points (x1, y1). Type 'y1 ~ m x1 + b'. Desmos computes m and b.",
        example: "Enter coordinates; Desmos outputs precise slope m, intercept b, and r² correlation in real time."
      }
    ],
    practiceQuestions: [
      {
        id: "u3_q01_ratio_scaling",
        questionNumber: 1,
        prompt: "A chemical solution is mixed using acid, water, and alcohol in the ratio $2 : 5 : 3$ by volume. If the final mixture has a total volume of $750\\text{ mL}$, how many milliliters of water are in the mixture?",
        options: ["A. 150 mL", "B. 225 mL", "C. 375 mL", "D. 450 mL"],
        correctAnswer: "C",
        explanation: "1. Introduce multiplier $k$: $2k + 5k + 3k = 750$.\n2. Combine like terms: $10k = 750 \\implies k = 75$.\n3. Water corresponds to the middle term ($5k$): $5 \\times 75 = 375\\text{ mL}$.",
        desmosTrick: "Type '750 * (5 / (2 + 5 + 3))' into Desmos to get 375 immediately."
      },
      {
        id: "u3_q02_percent_tax_discount",
        questionNumber: 2,
        prompt: "A jacket originally priced at $\\$160$ is discounted by $25\\%$. In addition, a sales tax of $8\\%$ is applied to the discounted price. What is the final total cost of the jacket?",
        options: ["A. $\\$120.00", "B. $\\$128.00", "C. $\\$129.60", "D. $\\$132.80"],
        correctAnswer: "C",
        explanation: "1. Discount multiplier: $1 - 0.25 = 0.75$.\n2. Discounted price: $160 \\times 0.75 = 120$.\n3. Sales tax multiplier: $1 + 0.08 = 1.08$.\n4. Final cost: $120 \\times 1.08 = \\$129.60$.\n(Or in one direct line: $160 \\times 0.75 \\times 1.08 = 129.60$).",
        desmosTrick: "Type '160 * 0.75 * 1.08' directly into Desmos. Instant answer: 129.6."
      },
      {
        id: "u3_q03_successive_discount_trap",
        questionNumber: 3,
        prompt: "The stock price of a company increased by $30\\%$ during the first quarter and subsequently decreased by $20\\%$ during the second quarter. What was the net percentage change in the stock price across both quarters?",
        options: ["A. 10% decrease", "B. 4% increase", "C. 10% increase", "D. 14% increase"],
        correctAnswer: "B",
        explanation: "1. Successive multiplier: $(1 + 0.30) \\times (1 - 0.20) = 1.30 \\times 0.80 = 1.04$.\n2. Convert multiplier to percent change: $(1.04 - 1.00) \\times 100\\% = +4\\%$.\n3. The stock gained a net $4\\%$ across both quarters.",
        satTrap: "Subtracting 30% - 20% = 10% increase! Percentages cannot be added or subtracted directly because the second percentage applies to a different baseline."
      },
      {
        id: "u3_q04_unit_conversion_speed",
        questionNumber: 4,
        prompt: "A high-speed train travels at a constant velocity of $180\\text{ kilometers per hour}$. What is the train's speed in meters per second?",
        options: ["A. 30 m/s", "B. 50 m/s", "C. 60 m/s", "D. 75 m/s"],
        correctAnswer: "B",
        explanation: "1. Conversion factors: $1\\text{ km} = 1,000\\text{ m}$ and $1\\text{ hr} = 3,600\\text{ sec}$.\n2. Multiply: $\\frac{180\\text{ km}}{1\\text{ hr}} \\times \\frac{1000\\text{ m}}{1\\text{ km}} \\times \\frac{1\\text{ hr}}{3600\\text{ sec}} = \\frac{180,000}{3600} = 50\\text{ m/s}$.",
        desmosTrick: "Type '180 * (1000 / 3600)' into Desmos to get 50 in 2 seconds."
      },
      {
        id: "u3_q05_missing_mean_score",
        questionNumber: 5,
        prompt: "A student scored $82, 89, 78,$ and $91$ on the first four exams in a mathematics course. What score must the student achieve on the fifth exam to have an overall mean score of exactly $88$ across all five exams?",
        options: ["A. 96", "B. 98", "C. 100", "D. 102"],
        correctAnswer: "C",
        explanation: "1. Total sum needed across 5 exams: $5 \\times 88 = 440$.\n2. Sum of first four exams: $82 + 89 + 78 + 91 = 340$.\n3. Required fifth exam score: $440 - 340 = 100$.",
        referenceFormula: "\\text{Required Score} = n \\cdot \\bar{x} - \\sum x_{\\text{known}}"
      },
      {
        id: "u3_q06_outlier_impact",
        questionNumber: 6,
        prompt: "A dataset consists of the annual salaries of 9 employees at a startup company, ranging from $\\$55,000$ to $\\$75,000$. A new executive is hired with an annual salary of $\\$450,000$. Which of the following statements correctly describes the effect of adding the executive's salary to the dataset?",
        options: [
          "A. The mean will increase significantly, but the median will change by at most a small amount.",
          "B. The median will increase significantly, but the mean will remain unchanged.",
          "C. Both the mean and median will increase by the exact same amount.",
          "D. Neither the mean nor the median will change."
        ],
        correctAnswer: "A",
        explanation: "The extreme high salary ($\\$450,000$) is an outlier. Outliers have a massive mathematical impact on the mean (which sums all values), but only shift the median by one position along the ordered list.",
        satTrap: "Assuming mean and median always move together symmetrically."
      },
      {
        id: "u3_q07_conditional_probability",
        questionNumber: 7,
        prompt: "A survey of 120 high school seniors recorded their post-graduation plans:\n\n| Plan | Male | Female | Total |\n| :--- | :--- | :--- | :--- |\n| 4-Year University | 32 | 48 | 80 |\n| Community College | 18 | 12 | 30 |\n| Workforce / Military | 6 | 4 | 10 |\n| **Total** | **56** | **64** | **120** |\n\nIf a female student is selected at random from the survey, what is the probability that her plan is to attend a 4-Year University?",
        options: ["A. \\frac{32}{80}", "B. \\frac{48}{120}", "C. \\frac{48}{80}", "D. \\frac{48}{64}"],
        correctAnswer: "D",
        explanation: "1. The question states: 'If a female student is selected at random...'\n2. The condition restricts the denominator to the Female subtotal: $64$.\n3. Favorable count: Females attending a 4-Year University = $48$.\n4. Probability = $\\frac{48}{64} = \\frac{3}{4} = 0.75$.",
        satTrap: "Using the grand total 120 as the denominator (Option B), or using the 4-Year University total 80 (Option C)."
      },
      {
        id: "u3_q08_residual_calculation",
        questionNumber: 8,
        prompt: "A scatterplot displays the study hours ($x$) and exam scores ($y$) of several students. The line of best fit for the data is given by $\\hat{y} = 4.5x + 52$. For one student who studied for $6\\text{ hours}$, the actual score achieved on the exam was $84$. What is the residual for this data point?",
        options: ["A. -5", "B. +5", "C. +7", "D. +9"],
        correctAnswer: "B",
        explanation: "1. Calculate predicted score: $\\hat{y} = 4.5(6) + 52 = 27 + 52 = 79$.\n2. Actual score: $y = 84$.\n3. Residual formula: $\\text{Residual} = y_{\\text{actual}} - y_{\\text{predicted}} = 84 - 79 = +5$.",
        referenceFormula: "\\text{Residual} = y_{\\text{actual}} - y_{\\text{predicted}}"
      },
      {
        id: "u3_q09_area_unit_conversion",
        questionNumber: 9,
        prompt: "A rectangular garden has an area of $24\\text{ square yards}$. Given that $1\\text{ yard} = 3\\text{ feet}$, what is the area of the garden in square feet?",
        options: ["A. 72 sq ft", "B. 144 sq ft", "C. 216 sq ft", "D. 288 sq ft"],
        correctAnswer: "C",
        explanation: "1. For linear conversion: $1\\text{ yd} = 3\\text{ ft}$.\n2. For area conversion, square the factor: $1\\text{ yd}^2 = (3\\text{ ft})^2 = 9\\text{ ft}^2$.\n3. Multiply: $24\\text{ yd}^2 \\times 9\\text{ ft}^2/\\text{yd}^2 = 216\\text{ sq ft}$.",
        satTrap: "Multiplying by 3 instead of 9 (getting 72, Option A). Always square linear conversion factors for area!"
      },
      {
        id: "u3_q10_scatterplot_slope_interpretation",
        questionNumber: 10,
        prompt: "The scatterplot relationship between the temperature in degrees Celsius ($C$) and the chirping frequency in chirps per minute ($F$) of a certain cricket species is modeled by the linear regression equation $F = 4.2C + 38$. What is the best interpretation of the number $4.2$ in this model?",
        options: [
          "A. The cricket chirps 4.2 times per minute when the temperature is 0 degrees Celsius.",
          "B. The estimated increase in temperature for each additional chirp per minute.",
          "C. The estimated increase in chirps per minute for each 1 degree Celsius increase in temperature.",
          "D. The total number of crickets observed in the study."
        ],
        correctAnswer: "C",
        explanation: "In $F = 4.2C + 38$, $4.2$ is the slope ($m$). Slope represents the estimated change in the dependent variable ($F$, chirps per minute) for each 1-unit increase in the independent variable ($C$, degrees Celsius).",
        satTrap: "Confusing independent and dependent variables (Option B reverses the causality)."
      }
    ],
    prevUnitId: "unit-02-foundations-algebra",
    nextUnitId: "unit-04-foundations-adv-math"
  },

  // =========================================================================
  // UNIT 4: FOUNDATIONS: ADVANCED MATH
  // =========================================================================
  "unit-04-foundations-adv-math": {
    id: "unit-04-foundations-adv-math",
    unitNumber: 4,
    title: "Unit 4: Foundations: Advanced Math",
    slug: "unit-04-foundations-adv-math",
    tier: "Foundations",
    domain: "Advanced Math",
    topicCode: "ADV-02",
    estimatedHours: "5.0 hours",
    description: "Core foundations of quadratic equations, factoring trinomials, vertex form parabolas, exponent laws, radical equations, and polynomial operations.",
    overviewSummary: "Advanced Math is the heaviest single domain on the Digital SAT Math section, representing approximately 35% of all questions. Mastery of quadratic roots, vertex form conversions, discriminant outcomes (b² - 4ac), fractional exponent rules, and Desmos root-finding tricks guarantees your highest score yield on Module 2.",
    sections: [
      {
        id: "u4-sec-1-factoring",
        title: "1. Factoring Quadratics & The Zero Product Property",
        readTime: "8 min read",
        summary: "A quadratic expression takes the form ax² + bx + c. Master the zero product property, the difference of two squares, and factoring trinomials.",
        diagramType: "parabola-vertex",
        desmosExample: {
          title: "Instant Root Clicker",
          expression: "y = x^2 - 5x + 6",
          tip: "Desmos highlights the x-intercepts with clickable grey dots: (2, 0) and (3, 0). Roots in 2 seconds flat!"
        },
        keyTakeaways: [
          "Zero Product Property: If $(x - p)(x - q) = 0$, then $x = p$ or $x = q$.",
          "Difference of Two Squares: $a^2 - b^2 = (a - b)(a + b)$. Always check if both terms are perfect squares with a minus sign.",
          "Perfect Square Trinomials: $(a \\pm b)^2 = a^2 \\pm 2ab + b^2$.",
          "Roots are x-Intercepts: The solutions to $f(x) = 0$ are the points where the parabola intersects the horizontal axis ($y = 0$)."
        ],
        contentMarkdown: `### The Foundations of Quadratic Factoring

A quadratic equation is any second-degree polynomial equation that can be written in standard form:

$$ax^2 + bx + c = 0 \\quad (a \\ne 0)$$

#### 1. The Zero Product Property:
If the product of two algebraic factors is zero, at least one of the factors must equal zero:
$$(x - r_1)(x - r_2) = 0 \\implies x - r_1 = 0 \\quad \\text{or} \\quad x - r_2 = 0 \\implies x = r_1, \\quad x = r_2$$

#### 2. Key Factoring Patterns on the SAT:
- **Difference of Two Squares:**
  $$a^2 - b^2 = (a - b)(a + b)$$
  *Example:* $9x^2 - 49 = (3x - 7)(3x + 7)$
- **Perfect Square Trinomials:**
  $$a^2 + 2ab + b^2 = (a + b)^2$$
  $$a^2 - 2ab + b^2 = (a - b)^2$$
  *Example:* $x^2 - 10x + 25 = (x - 5)^2$

#### 3. Factoring Trinomials ($x^2 + bx + c$):
To factor $x^2 + bx + c$, find two numbers $p$ and $q$ such that:
$$p \\cdot q = c \\quad \\text{and} \\quad p + q = b$$
Then write the factored form as $(x + p)(x + q) = 0$.

#### Worked Example:
> *"What are all solutions to the quadratic equation $x^2 - 8x + 15 = 0$?"*

1. Find two numbers that multiply to $+15$ and add to $-8$:
   $$(-3) \\times (-5) = +15, \\quad (-3) + (-5) = -8$$
2. Factor:
   $$(x - 3)(x - 5) = 0$$
3. Apply zero product property:
   $$x - 3 = 0 \\implies x = 3$$
   $$x - 5 = 0 \\implies x = 5$$
The solutions are **x = 3** and **x = 5**.`
      },
      {
        id: "u4-sec-2-formula-discriminant",
        title: "2. The Quadratic Formula, Discriminant (b² - 4ac) & Vieta's Shortcuts",
        readTime: "8 min read",
        summary: "When a quadratic cannot be factored easily, use the Quadratic Formula. The discriminant determines the number of real roots; Vieta's formulas give sums and products in 2 seconds.",
        diagramType: "quadratic-discriminant",
        desmosExample: {
          title: "Direct Quadratic Solver",
          expression: "2x^2 - 7x + 3 = 0",
          tip: "Desmos graphs two vertical lines at x = 0.5 and x = 3. Direct answers without the quadratic formula!"
        },
        keyTakeaways: [
          "Quadratic Formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. Works universally for any quadratic equation.",
          "Discriminant ($\\Delta = b^2 - 4ac$): $\\Delta > 0 \\implies 2\\text{ real roots}$; $\\Delta = 0 \\implies 1\\text{ real root (tangent)}$; $\\Delta < 0 \\implies 0\\text{ real roots (2 complex)}$.",
          "Vieta's Sum of Roots: $\\text{Sum } (r_1 + r_2) = -\\frac{b}{a}$. Never solve for individual roots when asked for their sum!",
          "Vieta's Product of Roots: $\\text{Product } (r_1 \\cdot r_2) = \\frac{c}{a}$."
        ],
        contentMarkdown: `### The Universal Quadratic Formula & Discriminant

When a quadratic equation $ax^2 + bx + c = 0$ does not factor cleanly with integers, apply the **Quadratic Formula**:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

#### 1. The Discriminant: $\\Delta = b^2 - 4ac$
The expression under the square root determines the number and nature of solutions:

| Discriminant Value | Solution Outcome | Geometric Meaning in the xy-Plane | SAT Keyphrase |
| :--- | :--- | :--- | :--- |
| **$b^2 - 4ac > 0$** | **2 Distinct Real Roots** | Parabola crosses the $x$-axis at two distinct points | *"Has two distinct real solutions"* |
| **$b^2 - 4ac = 0$** | **1 Real Root (Double Root)** | Parabola is tangent to the $x$-axis (vertex touches at 1 point) | *"Has exactly one real solution"* |
| **$b^2 - 4ac < 0$** | **0 Real Roots (2 Complex)** | Parabola does not touch or cross the $x$-axis | *"Has no real solutions"* |

#### 2. Vieta's 3-Second Formulas:
College Board questions frequently ask: *"What is the sum of the solutions to $3x^2 - 14x + 8 = 0$?"*
Instead of solving for the roots, use **Vieta's Formulas**:

$$\\text{Sum of Roots } (r_1 + r_2) = -\\frac{b}{a}$$
$$\\text{Product of Roots } (r_1 \\cdot r_2) = \\frac{c}{a}$$

*Instant Calculation:* For $3x^2 - 14x + 8 = 0$, the sum of roots is simply $-\\frac{-14}{3} = \\frac{14}{3}$. Done in 3 seconds!`
      },
      {
        id: "u4-sec-3-vertex-form",
        title: "3. Vertex Form, Maximums/Minimums & Parabola Symmetry",
        readTime: "8 min read",
        summary: "Understand how the vertex (h, k) reveals maximum and minimum values. Master the axis of symmetry formula and vertex form conversions.",
        diagramType: "parabola-vertex",
        desmosExample: {
          title: "Vertex Apex Inspector",
          expression: "y = -2(x - 3)^2 + 18",
          tip: "Click the top apex dot on the parabola: Desmos displays (3, 18). The maximum value of y is 18, occurring at x = 3!"
        },
        keyTakeaways: [
          "Vertex Form: $y = a(x - h)^2 + k$. The vertex is located at the coordinates $(h, k)$.",
          "Maximum vs Minimum: If $a > 0$, parabola opens upward $\\implies$ vertex is a Minimum value $k$. If $a < 0$, parabola opens downward $\\implies$ vertex is a Maximum value $k$.",
          "Axis of Symmetry: $x = h = -\\frac{b}{2a} = \\frac{r_1 + r_2}{2}$ (the axis passes right through the midpoint of the zeros).",
          "Constants Reveal Form: Questions asking 'Which form displays the maximum/minimum value as a constant or coefficient?' ALWAYS refer to Vertex Form."
        ],
        contentMarkdown: `### The Power of Vertex Form

The graph of every quadratic function is a symmetrical curve called a **parabola**.

#### 1. Vertex Form Equation:
$$y = a(x - h)^2 + k$$

- **Vertex:** $(h, k)$
- **Sign of $a$:**
  - $a > 0$: Opens **upward** ($\\cup$). The function has a **minimum value** equal to $k$ at $x = h$.
  - $a < 0$: Opens **downward** ($\\cap$). The function has a **maximum value** equal to $k$ at $x = h$.

#### 2. Finding the Vertex from Standard Form ($ax^2 + bx + c$):
1. **$x$-coordinate of the vertex:**
   $$h = -\\frac{b}{2a}$$
2. **$y$-coordinate of the vertex:**
   $$k = f(h) = f\\left(-\\frac{b}{2a}\\right)$$

#### 3. Parabola Symmetry:
A parabola is strictly symmetric across the vertical line $x = h$. If the parabola has $x$-intercepts at $r_1$ and $r_2$, the axis of symmetry lies at their exact arithmetic midpoint:
$$h = \\frac{r_1 + r_2}{2}$$

#### Worked Example:
> *"The function $P(x) = -5x^2 + 40x + 120$ models the daily profit, in dollars, of a bakery selling $x$ specialty cakes. What is the maximum daily profit the bakery can earn?"*

1. Find the cake quantity $x$ that maximizes profit:
   $$x = -\\frac{b}{2a} = -\\frac{40}{2(-5)} = \\frac{40}{10} = 4\\text{ cakes}$$
2. Substitute $x = 4$ into $P(x)$ to evaluate maximum profit:
   $$P(4) = -5(4)^2 + 40(4) + 120 = -5(16) + 160 + 120 = -80 + 280 = \\$200$$
The maximum daily profit is **$200**.`
      },
      {
        id: "u4-sec-4-exponent-laws",
        title: "4. Laws of Exponents & Rational/Fractional Powers",
        readTime: "7 min read",
        summary: "Memorize the 6 essential exponent laws. Convert fractional exponents into radical roots using the 'Power over Root' rule.",
        diagramType: "formula-reference",
        desmosExample: {
          title: "Fractional Power Solver",
          expression: "x^(3/2) = 27",
          tip: "Desmos graphs a vertical line at x = 9. You can read the solution directly off the x-axis!"
        },
        keyTakeaways: [
          "Product Rule: $x^a \\cdot x^b = x^{a+b}$ (Add exponents when multiplying equal bases).",
          "Quotient Rule: $\\frac{x^a}{x^b} = x^{a-b}$ (Subtract exponents when dividing equal bases).",
          "Power of a Power: $(x^a)^b = x^{a \\cdot b}$ (Multiply exponents when raising a power to a power).",
          "Negative Exponent: $x^{-n} = \\frac{1}{x^n}$ (Flip the base to the opposite side of the fraction).",
          "Rational Exponent: $x^{m/n} = \\sqrt[n]{x^m} = (\\sqrt[n]{x})^m$ (Power on top, root in the denominator).",
          "Equal Base Property: If $b^x = b^y$ (where $b > 0, b \\ne 1$), then $x = y$."
        ],
        contentMarkdown: `### The 6 Essential Laws of Exponents

Manipulating exponential expressions is one of the most frequently tested algebra skills on the SAT:

| Exponent Rule | Mathematical Formula | Example |
| :--- | :--- | :--- |
| **Product of Powers** | $x^a \\cdot x^b = x^{a+b}$ | $x^3 \\cdot x^5 = x^{3+5} = x^8$ |
| **Quotient of Powers** | $\\frac{x^a}{x^b} = x^{a-b}$ | $\\frac{x^7}{x^2} = x^{7-2} = x^5$ |
| **Power to a Power** | $(x^a)^b = x^{ab}$ | $(x^4)^3 = x^{4 \\times 3} = x^{12}$ |
| **Product to a Power** | $(xy)^a = x^a y^a$ | $(3x)^3 = 3^3 x^3 = 27x^3$ |
| **Zero Exponent** | $x^0 = 1 \\quad (x \\ne 0)$ | $15^0 = 1, \\quad (-4)^0 = 1$ |
| **Negative Exponent** | $x^{-n} = \\frac{1}{x^n}$ | $2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$ |

#### The 'Power over Root' Fractional Exponent Rule:
The numerator represents the **Power**; the denominator represents the **Index of the Radical Root**:

$$x^{\\frac{m}{n}} = \\sqrt[n]{x^m} = \\left(\\sqrt[n]{x}\\right)^m$$

*Example:* $8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = (2)^2 = 4$.

#### The Equal Base Property:
When solving exponential equations, rewrite both sides with the exact same numerical base:
$$4^{x+1} = 32 \\implies (2^2)^{x+1} = 2^5 \\implies 2^{2x+2} = 2^5 \\implies 2x + 2 = 5 \\implies x = 1.5$$`
      },
      {
        id: "u4-sec-5-radicals-extraneous",
        title: "5. Radical Equations & The Extraneous Solution Trap",
        readTime: "7 min read",
        summary: "Isolate the radical before squaring. Understand why squaring both sides can generate false 'extraneous' solutions and how to spot them instantly.",
        diagramType: "formula-reference",
        desmosExample: {
          title: "Radical Intersection Check",
          expression: "y = \\sqrt{2x + 7} \\ny = x - 4",
          tip: "Graph both sides. Desmos shows only ONE real intersection at (9, 5). The extraneous root x = 1 does not exist on the graph!"
        },
        keyTakeaways: [
          "Isolate First: Always isolate the radical term on one side of the equation before squaring.",
          "Extraneous Solutions: Squaring both sides of an equation can introduce false roots because $(-a)^2 = (+a)^2$.",
          "Verification Rule: You MUST plug your algebraic solutions back into the original un-squared equation to verify.",
          "Principal Square Root: In real mathematics, $\\sqrt{k} \\ge 0$ is strictly non-negative. If $\\sqrt{\\text{expr}} = -3$, there is NO real solution!"
        ],
        contentMarkdown: `### Solving Radical Equations & Extraneous Roots

A radical equation contains a variable underneath a square root symbol:

$$\\sqrt{ax + b} = cx + d$$

#### Step-by-Step Solution Algorithm:
1. **Isolate the radical:** Move all non-radical terms to the opposite side of the equation.
2. **Square both sides:** Eliminate the square root by raising both sides to the second power.
3. **Solve the resulting quadratic equation:** Factor or apply the quadratic formula.
4. **Test all solutions for extraneous roots:** Substitute every candidate value back into the original equation.

#### Why Do Extraneous Solutions Occur?
Squaring creates artificial symmetry:
$$x = 3 \\implies x^2 = 9$$
$$x = -3 \\implies x^2 = 9$$
Both statements yield $x^2 = 9$, but only $x = 3$ satisfies $\\sqrt{x + 6} = x$.

#### Worked Example:
> *"Solve the equation $\\sqrt{2x + 7} = x - 4$ for all real values of $x$."*

1. Square both sides:
   $$2x + 7 = (x - 4)^2$$
   $$2x + 7 = x^2 - 8x + 16$$
2. Move all terms to one side:
   $$x^2 - 10x + 9 = 0$$
3. Factor:
   $$(x - 9)(x - 1) = 0 \\implies x = 9 \\quad \\text{or} \\quad x = 1$$
4. **Test candidate roots:**
   - Test $x = 9$: $\\sqrt{2(9) + 7} = \\sqrt{25} = 5$. Right side: $9 - 4 = 5$. **VALID ($5 = 5$)**!
   - Test $x = 1$: $\\sqrt{2(1) + 7} = \\sqrt{9} = 3$. Right side: $1 - 4 = -3$. **EXTRANEOUS ($3 \\ne -3$)**!
The only valid solution is **x = 9**.`
      },
      {
        id: "u4-sec-6-polynomials",
        title: "6. Operations on Polynomials: FOIL, Long Division & The Remainder Theorem",
        readTime: "8 min read",
        summary: "Master polynomial multiplication, division with remainders, and the Polynomial Remainder Theorem (P(c) = Remainder).",
        diagramType: "formula-reference",
        desmosExample: {
          title: "Remainder Theorem Function Evaluator",
          expression: "P(x) = 2x^3 - 5x^2 + 3x - 7 \\nP(3)",
          tip: "Type P(x) on line 1, P(3) on line 2. Desmos instantly evaluates P(3) = 11. That 11 is the exact remainder when divided by (x - 3)!"
        },
        keyTakeaways: [
          "Polynomial Remainder Theorem: When a polynomial $P(x)$ is divided by a linear binomial $(x - c)$, the remainder is simply $P(c)$.",
          "Factor Theorem: A linear binomial $(x - c)$ is a factor of $P(x)$ if and only if the remainder is zero ($P(c) = 0$).",
          "Polynomial Division Form: $\\frac{P(x)}{x - c} = Q(x) + \\frac{R}{x - c}$, where $Q(x)$ is the quotient and $R$ is the constant remainder.",
          "Equivalent Expression Matching: When matching polynomial division choices, plug in a simple test number like $x = 0$ or $x = 2$ into both the question and answer choices."
        ],
        contentMarkdown: `### Operations on Polynomials & The Remainder Theorem

Polynomial algebra on the SAT tests structural equivalence and division properties.

#### 1. Polynomial Division Architecture:
When dividing a polynomial $P(x)$ by a divisor $D(x)$:

$$\\frac{P(x)}{D(x)} = Q(x) + \\frac{R}{D(x)}$$

- $Q(x)$: The **Quotient**
- $R$: The **Remainder** (a constant when dividing by a linear factor $x - c$)

#### 2. The Polynomial Remainder Theorem:
> *"If a polynomial $P(x)$ is divided by $(x - c)$, the remainder is strictly equal to $P(c)$."*

You never need to perform long polynomial division if the question only asks for the remainder:
- Dividing by $(x - 4) \\implies \\text{Remainder} = P(4)$
- Dividing by $(x + 2) \\implies \\text{Remainder} = P(-2)$
- Dividing by $(2x - 1) \\implies \\text{Remainder} = P(0.5)$

#### 3. The Factor Theorem:
A binomial $(x - c)$ is a factor of $P(x)$ if and only if $P(c) = 0$. In other words, $c$ is a zero (root) of the polynomial.

#### Worked Example:
> *"What is the remainder when $P(x) = x^3 - 4x^2 + 2x + 7$ is divided by $(x - 3)$?"*

By the Remainder Theorem, evaluate $P(3)$:
$$P(3) = (3)^3 - 4(3)^2 + 2(3) + 7 = 27 - 4(9) + 6 + 7 = 27 - 36 + 13 = 4$$
The remainder is **4**.`
      }
    ],
    speedHacks: [
      {
        title: "Desmos Clickable Parabola Roots & Vertex",
        trigger: "Any quadratic equation asking for zeros, x-intercepts, or vertex maximum/minimum",
        shortcut: "Type the quadratic into Desmos as 'y = ax^2 + bx + c'. Click grey dots directly.",
        example: "Type 'y = x^2 - 6x + 8'. Desmos shows x-intercepts (2, 0) and (4, 0), and vertex at (3, -1)."
      },
      {
        title: "Vieta's Sum of Roots Formula (-b/a)",
        trigger: "Questions asking 'What is the sum of the solutions to the equation...?'",
        shortcut: "Calculate -b/a directly. Never solve for the roots using factoring or quadratic formula.",
        example: "For 5x^2 - 35x + 11 = 0, the sum of solutions is -(-35)/5 = 7 in 2 seconds."
      },
      {
        title: "The Discriminant (b² - 4ac) Solution Counter",
        trigger: "Questions asking for what value of constant k the equation has 0, 1, or 2 real solutions",
        shortcut: "Set b² - 4ac = 0 for 1 solution, > 0 for 2 solutions, < 0 for no real solutions.",
        example: "If x^2 - 8x + k = 0 has 1 solution: (-8)^2 - 4(1)(k) = 0 => 64 - 4k = 0 => k = 16."
      },
      {
        title: "Equal Base Exponential Conversion",
        trigger: "Equations with powers on both sides (e.g., 8^(x+1) = 16^x)",
        shortcut: "Rewrite all bases as powers of 2, 3, or 5, then equate the exponents.",
        example: "Rewrite 8 as 2^3 and 16 as 2^4: 2^(3(x+1)) = 2^(4x) => 3x + 3 = 4x => x = 3."
      },
      {
        title: "Desmos Direct Radical Root Validation",
        trigger: "Radical equations that may contain extraneous solutions",
        shortcut: "Graph Left Side as y1 and Right Side as y2. Click the intersection to see the ONLY valid root.",
        example: "Line 1: y = sqrt(2x + 7). Line 2: y = x - 4. Desmos shows one intersection at (9, 5). Root is 9!"
      }
    ],
    practiceQuestions: [
      {
        id: "u4_q01_factoring_roots",
        questionNumber: 1,
        prompt: "What are the solutions to the quadratic equation $x^2 - 9x + 20 = 0$?",
        options: ["A. x = -4 and x = -5", "B. x = 2 and x = 10", "C. x = 4 and x = 5", "D. x = 1 and x = 20"],
        correctAnswer: "C",
        explanation: "1. Find two numbers that multiply to $+20$ and add to $-9$.\n2. The numbers are $-4$ and $-5$ since $(-4)(-5) = 20$ and $(-4) + (-5) = -9$.\n3. Factor: $(x - 4)(x - 5) = 0$.\n4. Zero product property: $x = 4$ or $x = 5$.",
        desmosTrick: "Type 'y = x^2 - 9x + 20' into Desmos. Tap the x-axis to see (4, 0) and (5, 0)."
      },
      {
        id: "u4_q02_difference_squares",
        questionNumber: 2,
        prompt: "Which of the following expressions is equivalent to $4x^2 - 49$?",
        options: [
          "A. (2x - 7)^2",
          "B. (2x - 7)(2x + 7)",
          "C. (4x - 7)(x + 7)",
          "D. 4(x - 7)(x + 7)"
        ],
        correctAnswer: "B",
        explanation: "1. Recognize the difference of two squares: $a^2 - b^2 = (a - b)(a + b)$.\n2. Here $a^2 = 4x^2 \\implies a = 2x$, and $b^2 = 49 \\implies b = 7$.\n3. Therefore, $4x^2 - 49 = (2x - 7)(2x + 7)$.",
        referenceFormula: "a^2 - b^2 = (a - b)(a + b)"
      },
      {
        id: "u4_q03_discriminant_condition",
        questionNumber: 3,
        prompt: "In the quadratic equation $x^2 - 6x + c = 0$, where $c$ is a constant, the equation has exactly one distinct real solution. What is the value of $c$?",
        options: ["A. -9", "B. 3", "C. 6", "D. 9"],
        correctAnswer: "D",
        explanation: "1. A quadratic equation has exactly one real solution when its discriminant equals zero: $\\Delta = b^2 - 4ac = 0$.\n2. Here $a = 1, b = -6$:\n$$(-6)^2 - 4(1)(c) = 0$$\n$$36 - 4c = 0 \\implies 4c = 36 \\implies c = 9$$.",
        satTrap: "Setting c = 6 or c = 3 instead of solving b^2 - 4ac = 0."
      },
      {
        id: "u4_q04_vietas_sum",
        questionNumber: 4,
        prompt: "What is the sum of the solutions to the equation $3x^2 - 15x - 42 = 0$?",
        options: ["A. -15", "B. -5", "C. 5", "D. 15"],
        correctAnswer: "C",
        explanation: "1. Use Vieta's formula for the sum of roots: $\\text{Sum} = -\\frac{b}{a}$.\n2. Here $a = 3, b = -15$:\n$$\\text{Sum} = -\\frac{-15}{3} = \\frac{15}{3} = 5$$.\n(Alternatively: divide by 3 to get $x^2 - 5x - 14 = 0 \\implies (x - 7)(x + 2) = 0 \\implies 7 + (-2) = 5$).",
        referenceFormula: "r_1 + r_2 = -\\frac{b}{a}"
      },
      {
        id: "u4_q05_vertex_maximum",
        questionNumber: 5,
        prompt: "The function $f(x) = -(x - 4)^2 + 25$ is graphed in the $xy$-plane. What is the maximum value of $f(x)$?",
        options: ["A. -4", "B. 4", "C. 21", "D. 25"],
        correctAnswer: "D",
        explanation: "1. The function is given in vertex form: $f(x) = a(x - h)^2 + k$.\n2. The vertex is at $(h, k) = (4, 25)$.\n3. Since $a = -1 < 0$, the parabola opens downward, meaning the vertex represents the absolute maximum value.\n4. The maximum value of the function (the y-value) is $25$, which occurs when $x = 4$.",
        satTrap: "Answering 4 (the x-coordinate where the maximum occurs) instead of 25 (the maximum value of the function itself)."
      },
      {
        id: "u4_q06_fractional_exponent",
        questionNumber: 6,
        prompt: "For all positive values of $x$, which of the following is equivalent to $(8x^6)^{\\frac{2}{3}}$?",
        options: ["A. 4x^4", "B. 4x^9", "C. 16x^4", "D. 64x^4"],
        correctAnswer: "A",
        explanation: "1. Distribute the fractional exponent to both factors: $(8)^{\\frac{2}{3}} \\cdot (x^6)^{\\frac{2}{3}}$.\n2. Evaluate $8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4$.\n3. Multiply exponents for $x$: $6 \\times \\frac{2}{3} = \\frac{12}{3} = 4 \\implies x^4$.\n4. Combine: $4x^4$.",
        referenceFormula: "(ab)^n = a^n b^n, \\quad (a^m)^n = a^{mn}"
      },
      {
        id: "u4_q07_equal_base_exponential",
        questionNumber: 7,
        prompt: "If $4^{2x - 1} = 32$, what is the value of $x$?",
        options: ["A. \\frac{5}{4}", "B. \\frac{7}{4}", "C. 2", "D. \\frac{9}{4}"],
        correctAnswer: "B",
        explanation: "1. Express both sides with base 2: $4 = 2^2$ and $32 = 2^5$.\n2. Rewrite equation: $(2^2)^{2x - 1} = 2^5$.\n3. Multiply exponents: $2^{4x - 2} = 2^5$.\n4. Equate exponents: $4x - 2 = 5 \\implies 4x = 7 \\implies x = \\frac{7}{4}$.",
        desmosTrick: "Type '4^(2x - 1) = 32' in Desmos. Desmos plots a vertical line at x = 1.75 = 7/4!"
      },
      {
        id: "u4_q08_extraneous_radical",
        questionNumber: 8,
        prompt: "What is the complete set of all real solutions to the equation $\\sqrt{3x + 1} = x - 3$?",
        options: ["A. {1}", "B. {8}", "C. {1, 8}", "D. No real solutions"],
        correctAnswer: "B",
        explanation: "1. Square both sides: $3x + 1 = (x - 3)^2 = x^2 - 6x + 9$.\n2. Rearrange into standard form: $x^2 - 9x + 8 = 0$.\n3. Factor: $(x - 8)(x - 1) = 0 \\implies x = 8$ or $x = 1$.\n4. Check candidate roots:\n   - Check $x = 8$: $\\sqrt{3(8) + 1} = \\sqrt{25} = 5$. Right side: $8 - 3 = 5$. **VALID ($5 = 5$)**.\n   - Check $x = 1$: $\\sqrt{3(1) + 1} = \\sqrt{4} = 2$. Right side: $1 - 3 = -2$. **EXTRANEOUS ($2 \\ne -2$)**.\n5. Therefore, the only valid solution is $\{8\}$.",
        satTrap: "Selecting Option C ({1, 8}) without checking for extraneous roots."
      },
      {
        id: "u4_q09_remainder_theorem",
        questionNumber: 9,
        prompt: "When the polynomial $P(x) = x^3 - 2x^2 + 4x - 5$ is divided by $(x - 3)$, what is the remainder?",
        options: ["A. 11", "B. 16", "C. 21", "D. 25"],
        correctAnswer: "B",
        explanation: "1. By the Polynomial Remainder Theorem, the remainder when $P(x)$ is divided by $(x - c)$ is simply $P(c)$.\n2. Here $c = 3$, so evaluate $P(3)$:\n$$P(3) = (3)^3 - 2(3)^2 + 4(3) - 5$$\n$$P(3) = 27 - 2(9) + 12 - 5 = 27 - 18 + 12 - 5 = 16$$.\n3. The remainder is $16$.",
        referenceFormula: "P(c) = \\text{Remainder when } P(x) \\text{ is divided by } (x - c)"
      },
      {
        id: "u4_q10_vertex_form_constant",
        questionNumber: 10,
        prompt: "Which of the following equivalent equations displays the coordinates of the vertex of the parabola as constants or coefficients?",
        options: [
          "A. y = x^2 - 6x + 5",
          "B. y = (x - 1)(x - 5)",
          "C. y = (x - 3)^2 - 4",
          "D. y + 4 = x(x - 6)"
        ],
        correctAnswer: "C",
        explanation: "Vertex form is $y = a(x - h)^2 + k$, where $(h, k)$ is the vertex. In $y = (x - 3)^2 - 4$, the numbers $3$ and $-4$ directly display the vertex coordinates $(3, -4)$ as constants in the equation.",
        satTrap: "Confusing factored form (which displays the x-intercepts) with vertex form (which displays the vertex)."
      }
    ],
    prevUnitId: "unit-03-foundations-psda",
    nextUnitId: "unit-05-foundations-geom-trig"
  },

  // =========================================================================
  // UNIT 5: FOUNDATIONS: GEOMETRY & TRIGONOMETRY
  // =========================================================================
  "unit-05-foundations-geom-trig": {
    id: "unit-05-foundations-geom-trig",
    unitNumber: 5,
    title: "Unit 5: Foundations: Geometry & Trigonometry",
    slug: "unit-05-foundations-geom-trig",
    tier: "Foundations",
    domain: "Geometry and Trigonometry",
    topicCode: "GEO-02",
    estimatedHours: "4.5 hours",
    description: "Area and volume formulas, right triangle geometry, special right triangles (30-60-90, 45-45-90), SOH CAH TOA trigonometry, complementary angle identity, and circle equations in the xy-plane.",
    overviewSummary: "Geometry and Trigonometry constitutes approximately 15% of the Digital SAT Math section. Questions heavily test properties of right triangles, the universal complementary angle rule (sin A = cos B), special triangle side ratios, circle geometry in standard form, and composite solid volume calculations.",
    sections: [
      {
        id: "u5-sec-1-areas-volumes",
        title: "1. Area, Perimeter & 3D Solids: Applying the Official Reference Sheet",
        readTime: "8 min read",
        summary: "Master 2D plane area and 3D solid volume formulas. Understand how dimensional scaling factor k scales area by k² and volume by k³.",
        diagramType: "formula-reference",
        desmosExample: {
          title: "Cone Volume Evaluator",
          expression: "V = (1/3) * \\pi * 6^2 * 14",
          tip: "Type the exact volume formula into Desmos. Desmos evaluates 527.787 or exact fraction expressions instantly!"
        },
        keyTakeaways: [
          "Reference Sheet Access: Formulas for circles, rectangles, triangles, cylinders, cones, and spheres are built into the Bluebook reference sheet icon.",
          "Circle Area vs Circumference: Area $= \\pi r^2$; Circumference $= 2\\pi r = \\pi d$. Watch diameter vs radius traps!",
          "3D Solid Volumes: Prism/Cylinder $= \\text{Base Area} \\times h$; Pyramid/Cone $= \\frac{1}{3} \\times \\text{Base Area} \\times h$; Sphere $= \\frac{4}{3}\\pi r^3$.",
          "Dimensional Scaling Law: If linear dimensions scale by factor $k$, perimeter scales by $k$, area scales by $k^2$, and volume scales by $k^3$."
        ],
        contentMarkdown: `### 2D Area and 3D Volume Foundations

The College Board provides a reference sheet with standard geometry formulas on the Digital SAT. However, high-scorers memorize them to eliminate context switching:

#### 1. Core 2D Geometry Formulas:
- **Triangle:** $\\text{Area} = \\frac{1}{2} b h$
- **Rectangle:** $\\text{Area} = l w, \\quad \\text{Perimeter} = 2l + 2w$
- **Circle:** $\\text{Area} = \\pi r^2, \\quad \\text{Circumference} = 2\\pi r$

#### 2. Core 3D Volume Formulas:
- **Rectangular Prism:** $V = l w h$
- **Right Circular Cylinder:** $V = \\pi r^2 h$
- **Right Circular Cone:** $V = \\frac{1}{3} \\pi r^2 h$
- **Sphere:** $V = \\frac{4}{3} \\pi r^3$

#### 3. The Dimensional Scaling Law (High-Yield SAT Favorite):
When a 3D solid is scaled uniformly by a linear factor $k$:

| Dimension Type | Linear Scale Factor | Formula | Example ($k = 3$) |
| :--- | :--- | :--- | :--- |
| **Linear Length / Perimeter** | $k^1$ | $\\text{New Length} = k \\times \\text{Original}$ | $3\\times$ longer |
| **Surface Area / Cross-Section** | $k^2$ | $\\text{New Area} = k^2 \\times \\text{Original}$ | $3^2 = 9\\times$ larger |
| **Volume / Capacity** | $k^3$ | $\\text{New Volume} = k^3 \\times \\text{Original}$ | $3^3 = 27\\times$ larger |

#### Worked Example:
> *"Cylinder A has a volume of $40\\text{ cm}^3$. Cylinder B is similar to Cylinder A, with all linear dimensions (radius and height) scaled by a factor of $3$. What is the volume of Cylinder B?"*

$$\\text{Volume}_B = \\text{Volume}_A \\times k^3 = 40 \\times 3^3 = 40 \\times 27 = 1,080\\text{ cm}^3$$
The volume of Cylinder B is **1,080 cm³**.`
      },
      {
        id: "u5-sec-2-angles-transversals",
        title: "2. Angles, Parallel Lines & Transversals: The Exterior Angle Theorem",
        readTime: "7 min read",
        summary: "Identify congruent angle pairs formed by transversals. Apply the triangle angle sum (180°) and the Exterior Angle Theorem.",
        diagramType: "parallel-perpendicular",
        desmosExample: {
          title: "Linear Angle Pair Solver",
          expression: "(3x + 15) + (2x - 10) = 180",
          tip: "Desmos graphs a vertical line at x = 35. You can solve transversal angle equations instantly!"
        },
        keyTakeaways: [
          "Supplementary Angles: Sum to $180^\\circ$ (form a straight line).",
          "Complementary Angles: Sum to $90^\\circ$ (form a right angle).",
          "Vertical Angles: Angles opposite each other when two lines intersect are strictly equal.",
          "Parallel Lines Cut by a Transversal: All acute angles are equal to each other; all obtuse angles are equal to each other; any acute angle + any obtuse angle $= 180^\\circ$.",
          "Exterior Angle Theorem: The measure of an exterior angle of a triangle equals the sum of the two remote interior angles: $d = a + b$."
        ],
        contentMarkdown: `### Angle Relationships and Triangles

Angle puzzles on the SAT rely on a few foundational geometric invariants:

#### 1. Angle Pairs:
- **Linear Pair (Supplementary):** $\\angle 1 + \\angle 2 = 180^\\circ$
- **Vertical Angles:** Vertically opposite angles are congruent ($\\angle 1 = \\angle 3$)

#### 2. Parallel Lines with a Transversal:
When two parallel lines $L_1 \\parallel L_2$ are intersected by a transversal $T$, only **two distinct angle measures** exist:
1. **Equal Angles:**
   - Alternate Interior Angles (e.g., top-right and bottom-left)
   - Alternate Exterior Angles
   - Corresponding Angles
2. **Supplementary Angles:**
   - Consecutive Interior Angles sum to $180^\\circ$.

#### 3. The Triangle Exterior Angle Theorem:
In any triangle with interior angles $a, b, c$, extend one side to form an exterior angle $d$:
$$d = a + b$$
> *"The measure of an exterior angle equals the sum of the two remote (opposite) interior angles."*

#### Worked Example:
> *"In $\\triangle ABC$, the measure of $\\angle A$ is $42^\\circ$ and the measure of $\\angle B$ is $68^\\circ$. If side $AC$ is extended past $C$, what is the measure of the exterior angle at vertex $C$?"*

By the Exterior Angle Theorem:
$$\\text{Exterior Angle} = \\angle A + \\angle B = 42^\\circ + 68^\\circ = 110^\\circ$$
The exterior angle at $C$ is **110°**.`
      },
      {
        id: "u5-sec-3-pythagorean-triples",
        title: "3. Right Triangles, The Pythagorean Theorem & High-Yield Triples",
        readTime: "8 min read",
        summary: "Understand the Pythagorean Theorem (a² + b² = c²). Memorize the four sacred SAT Pythagorean triples to bypass arithmetic completely.",
        diagramType: "special-triangles-trig",
        desmosExample: {
          title: "Hypotenuse Calculation",
          expression: "c = \\sqrt{15^2 + 36^2}",
          tip: "Desmos computes c = 39 immediately. Notice that 15-36-39 is simply the 5-12-13 triple scaled by 3!"
        },
        keyTakeaways: [
          "Pythagorean Theorem: $a^2 + b^2 = c^2$, where $c$ is strictly the hypotenuse (opposite the $90^\\circ$ right angle).",
          "The 4 Sacred Pythagorean Triples: $3-4-5$, $5-12-13$, $7-24-25$, $8-15-17$.",
          "Scaled Triples: Multiples of triples are also right triangles (e.g., $6-8-10$, $9-12-15$, $10-24-26$, $15-20-25$).",
          "Hypotenuse Isolation: Leg $a = \\sqrt{c^2 - b^2}$. Never add when solving for a leg!"
        ],
        contentMarkdown: `### The Pythagorean Theorem & Sacred Triples

In every Euclidean right triangle with legs $a$ and $b$ and hypotenuse $c$:

$$a^2 + b^2 = c^2 \\iff c = \\sqrt{a^2 + b^2}$$

#### The 4 High-Yield SAT Pythagorean Triples:
Memorizing these integer triples saves 60 seconds of scratchpad computation on every triangle problem:

| Base Triple | Common Multiples Tested on the Digital SAT |
| :--- | :--- |
| **$3 - 4 - 5$** | $6-8-10, \\quad 9-12-15, \\quad 12-16-20, \\quad 30-40-50$ |
| **$5 - 12 - 13$** | $10-24-26, \\quad 15-36-39, \\quad 25-60-65$ |
| **$7 - 24 - 25$** | $14-48-50$ |
| **$8 - 15 - 17$** | $16-30-34$ |

#### Worked Example:
> *"A right triangle has a hypotenuse of length $52$ and one leg of length $20$. What is the length of the other leg?"*

1. Check for a scaled triple:
   - Divide hypotenuse by $4$: $52 / 4 = 13$.
   - Divide known leg by $4$: $20 / 4 = 5$.
2. This is the sacred $5-12-13$ triple scaled by a factor of $4$!
3. Missing leg:
   $$12 \\times 4 = 48$$
The missing leg has length **48**.`
      },
      {
        id: "u5-sec-4-special-triangles",
        title: "4. Special Right Triangles: 45°-45°-90° and 30°-60°-90° Side Ratios",
        readTime: "8 min read",
        summary: "Special right triangles have fixed geometric side length ratios. Master moving back and forth between legs and hypotenuse using radical scaling.",
        diagramType: "special-triangles-trig",
        desmosExample: {
          title: "Special Triangle Leg Solver",
          expression: "x = 18 / \\sqrt{2}",
          tip: "Desmos computes 12.7279... or exact radical expression 9√2. Square diagonal legs in 2 seconds!"
        },
        keyTakeaways: [
          "45°-45°-90° (Isosceles Right Triangle): Sides are in the ratio $x : x : x\\sqrt{2}$. Given hypotenuse $h$, legs are $\\frac{h}{\\sqrt{2}} = \\frac{h\\sqrt{2}}{2}$.",
          "30°-60°-90° Triangle: Sides are in the ratio $x : x\\sqrt{3} : 2x$.",
          "Short Leg is Key: In a 30-60-90 triangle, the short leg (opposite $30^\\circ$) is half the hypotenuse ($x = \\frac{1}{2}c$).",
          "Long Leg: The long leg (opposite $60^\\circ$) is short leg times $\\sqrt{3}$ ($x\\sqrt{3}$)."
        ],
        contentMarkdown: `### Special Right Triangles

Special right triangles appear on every Digital SAT because they bridge geometry and trigonometry without requiring a calculator.

#### 1. The $45^\\circ - 45^\\circ - 90^\\circ$ Triangle (Isosceles Right):
Formed by cutting a square in half along its diagonal:
- **Side Ratio:** $x : x : x\\sqrt{2}$
- **Legs:** Both legs are strictly equal ($a = b = x$).
- **Hypotenuse:** $c = x\\sqrt{2}$.
- **Finding Leg from Hypotenuse:**
  $$\\text{Leg} = \\frac{\\text{Hypotenuse}}{\\sqrt{2}} = \\frac{\\text{Hypotenuse} \\times \\sqrt{2}}{2}$$

#### 2. The $30^\\circ - 60^\\circ - 90^\\circ$ Triangle:
Formed by dropping an altitude down the center of an equilateral triangle:
- **Side Ratio:** $x : x\\sqrt{3} : 2x$
- **Short Leg ($x$):** Opposite the $30^\\circ$ angle. Equal to **half the hypotenuse**.
- **Long Leg ($x\\sqrt{3}$):** Opposite the $60^\\circ$ angle. Equal to **short leg $\\times \\sqrt{3}$**.
- **Hypotenuse ($2x$):** Opposite the $90^\\circ$ angle. Equal to **$2 \\times$ short leg**.

#### Worked Example:
> *"An equilateral triangle has side lengths of $12$. An altitude is drawn from one vertex to the opposite base. What is the area of the equilateral triangle?"*

1. Dropping the altitude creates two congruent $30^\\circ-60^\\circ-90^\\circ$ triangles.
2. The hypotenuse is $12$.
3. The short leg (half the base) is $x = 12 / 2 = 6$.
4. The long leg (altitude height $h$) is $h = 6\\sqrt{3}$.
5. Calculate triangle area:
   $$\\text{Area} = \\frac{1}{2} b h = \\frac{1}{2}(12)(6\\sqrt{3}) = 36\\sqrt{3}$$
The area is **36√3**.`
      },
      {
        id: "u5-sec-5-soh-cah-toa",
        title: "5. Trigonometry: SOH CAH TOA & The Golden Complementary Invariant",
        readTime: "8 min read",
        summary: "Define sine, cosine, and tangent in right triangles. Master the #1 most tested trigonometry fact on the SAT: sin(A) = cos(90° - A).",
        diagramType: "special-triangles-trig",
        desmosExample: {
          title: "Complementary Invariant Solver",
          expression: "(4x - 12) + (2x + 18) = 90",
          tip: "Type the complementary angle equation directly into Desmos. Instant vertical line reveals x = 14!"
        },
        keyTakeaways: [
          "SOH CAH TOA: $\\sin = \\frac{\\text{Opp}}{\\text{Hyp}}$, $\\cos = \\frac{\\text{Adj}}{\\text{Hyp}}$, $\\tan = \\frac{\\text{Opp}}{\\text{Adj}}$.",
          "The SAT #1 Golden Trigonometric Identity: $\\sin(A) = \\cos(B) \\iff A + B = 90^\\circ$ (or $\\frac{\\pi}{2}$ radians).",
          "Tangent Identity: $\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}$.",
          "Similar Triangles Invariant: Trigonometric ratios depend ONLY on the angle, NOT on triangle size! If $\\triangle ABC \\sim \\triangle DEF$, then $\\sin(A) = \\sin(D)$."
        ],
        contentMarkdown: `### Right Triangle Trigonometry & SOH CAH TOA

Trigonometry on the SAT is strictly right-triangle based.

#### 1. Definitions (SOH CAH TOA):
For an acute angle $\\theta$ in a right triangle:

$$\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$$
$$\\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$$
$$\\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}}$$

#### 2. The #1 Golden SAT Trigonometric Rule:
In any right triangle, the two acute angles $A$ and $B$ are complementary ($A + B = 90^\\circ$). Therefore:

$$\\sin(A) = \\cos(B) \\iff A + B = 90^\\circ$$
$$\\sin(x) = \\cos(90^\\circ - x)$$

In radians:
$$\\sin(x) = \\cos\\left(\\frac{\\pi}{2} - x\\right)$$

> [!IMPORTANT]
> **Test-Day Execution:** Whenever you see an equation with sine on one side and cosine on the other ($\\sin(\\text{expr}_1) = \\cos(\\text{expr}_2)$), set the expressions to sum to $90^\\circ$ (or $\\frac{\\pi}{2}$) and solve for the unknown!

#### Worked Example:
> *"In a right triangle, $\\sin(5x - 14)^\\circ = \\cos(3x + 16)^\\circ$. What is the value of $x$?"*

1. Equate the sum of the angles to $90^\\circ$:
   $$(5x - 14) + (3x + 16) = 90$$
2. Combine like terms:
   $$8x + 2 = 90 \\implies 8x = 88 \\implies x = 11$$
The value of $x$ is **11**.`
      },
      {
        id: "u5-sec-6-circles",
        title: "6. Circles: Standard Equation, Arc Length & Sector Area",
        readTime: "8 min read",
        summary: "Understand the circle equation (x - h)² + (y - k)² = r² in the xy-plane. Calculate fractional arc lengths, sector areas, and inscribed angles.",
        diagramType: "circle-equation",
        desmosExample: {
          title: "Circle Grapher & Center Locator",
          expression: "(x - 4)^2 + (y + 2)^2 = 25",
          tip: "Desmos graphs the circle in the coordinate plane. You can read the center (4, -2) and radius 5 directly!"
        },
        keyTakeaways: [
          "Standard Equation of a Circle: $(x - h)^2 + (y - k)^2 = r^2$. Center is $(h, k)$ and radius is $r = \\sqrt{r^2}$.",
          "Sign Reversal in Center: $(x - 5)^2 + (y + 3)^2 = 49 \\implies \\text{Center} = (5, -3)$.",
          "Arc Length Formula: $s = \\frac{\\theta}{360^\\circ} \\times 2\\pi r = r\\theta_{\\text{rad}}$.",
          "Sector Area Formula: $A = \\frac{\\theta}{360^\\circ} \\times \\pi r^2 = \\frac{1}{2} r^2 \\theta_{\\text{rad}}$.",
          "Inscribed Angle Theorem: An angle inscribed on the circle is exactly HALF of the central angle intercepting the same arc: $\\angle_{\\text{inscribed}} = \\frac{1}{2} \\angle_{\\text{central}}$."
        ],
        contentMarkdown: `### Circle Geometry & The Coordinate Plane

Circle questions on the Digital SAT fall into two categories: coordinate equations and angular sector calculations.

#### 1. Standard Circle Equation in the $xy$-Plane:
$$(x - h)^2 + (y - k)^2 = r^2$$

- **Center:** $(h, k)$ (Note the minus signs: $(x - 4)$ means $h = 4$; $(y + 7)$ means $k = -7$).
- **Radius:** $r = \\sqrt{\\text{Right Side}}$ (If the equation ends in $64$, $r = \\sqrt{64} = 8$, NOT $64$!).

#### 2. Completing the Square to Find Circle Center and Radius:
When given general form $x^2 + y^2 - 6x + 8y - 24 = 0$:
1. Group $x$ and $y$ terms:
   $$(x^2 - 6x) + (y^2 + 8y) = 24$$
2. Add $\\left(\\frac{b}{2}\\right)^2$ to both sides for each variable:
   - For $x$: $\\left(-\\frac{6}{2}\\right)^2 = 9$
   - For $y$: $\\left(\\frac{8}{2}\\right)^2 = 16$
3. Add to right side:
   $$(x^2 - 6x + 9) + (y^2 + 8y + 16) = 24 + 9 + 16$$
   $$(x - 3)^2 + (y + 4)^2 = 49$$
- **Center:** $(3, -4)$, **Radius:** $r = \\sqrt{49} = 7$.

#### 3. Arc Length and Sector Area:
The arc and sector are proportional fractions of the total circle:

$$\\text{Fraction of Circle} = \\frac{\\theta}{360^\\circ} = \\frac{\\theta_{\\text{rad}}}{2\\pi}$$
$$\\text{Arc Length } s = \\left(\\frac{\\theta}{360^\\circ}\\right) \\times 2\\pi r$$
$$\\text{Sector Area } A = \\left(\\frac{\\theta}{360^\\circ}\\right) \\times \\pi r^2$$`
      }
    ],
    speedHacks: [
      {
        title: "The Complementary Angle Equation Solver",
        trigger: "Any equation with sin(expression 1) = cos(expression 2)",
        shortcut: "Set (expression 1) + (expression 2) = 90. Solve for x directly in Desmos.",
        example: "sin(4x - 10) = cos(3x + 16) => type '4x - 10 + 3x + 16 = 90' in Desmos => x = 12."
      },
      {
        title: "Desmos Circle Grapher & Radius Inspector",
        trigger: "Any circle equation given in standard form or general form",
        shortcut: "Type the full circle equation directly into Desmos. Desmos graphs it perfectly.",
        example: "Type 'x^2 + y^2 - 8x + 6y = 0'. Desmos renders the circle. Click extremes to find center (4, -3) and r = 5."
      },
      {
        title: "Scaled Pythagorean Triple Spotting",
        trigger: "Right triangle with large hypotenuse or legs (e.g. 39 and 15)",
        shortcut: "Divide side lengths by common factors (3, 4, 5, 10) to expose base 3-4-5 or 5-12-13 triples.",
        example: "Sides 15 and 39: divide by 3 -> 5 and 13. Missing leg is 12 * 3 = 36 in 2 seconds."
      },
      {
        title: "Linear to Area / Volume Scale Factor Power Rule",
        trigger: "Questions asking how scaling radius/side changes area or volume",
        shortcut: "Area scales by k²; Volume scales by k³. Never recalculate full geometric formulas.",
        example: "If a sphere's radius is multiplied by 4, its volume is multiplied by 4^3 = 64."
      },
      {
        title: "Triangle Exterior Angle Fast Sum",
        trigger: "Exterior angle of a triangle given two opposite interior angles",
        shortcut: "Add the two remote interior angles directly. Never compute the supplementary 3rd angle first.",
        example: "If remote angles are 54° and 72°, the exterior angle is immediately 54 + 72 = 126°."
      }
    ],
    practiceQuestions: [
      {
        id: "u5_q01_pythagorean_triple",
        questionNumber: 1,
        prompt: "A right triangle has a hypotenuse of length $39$ and one leg of length $15$. What is the length of the other leg?",
        options: ["A. 24", "B. 32", "C. 36", "D. 38"],
        correctAnswer: "C",
        explanation: "1. Check for a scaled Pythagorean triple: $15 = 3 \\times 5$ and $39 = 3 \\times 13$.\n2. This matches the sacred $5-12-13$ triple scaled by a factor of $3$.\n3. Therefore, the missing leg is $3 \\times 12 = 36$.\n(Or: $\\sqrt{39^2 - 15^2} = \\sqrt{1521 - 225} = \\sqrt{1296} = 36$).",
        desmosTrick: "Type 'sqrt(39^2 - 15^2)' into Desmos to get 36 immediately."
      },
      {
        id: "u5_q02_complementary_trig",
        questionNumber: 2,
        prompt: "In a right-angled triangle, $\\sin(3x - 5)^\\circ = \\cos(2x + 15)^\\circ$. What is the value of $x$?",
        options: ["A. 14", "B. 16", "C. 18", "D. 20"],
        correctAnswer: "B",
        explanation: "1. For any complementary angles $A$ and $B$, $\\sin(A) = \\cos(B) \\iff A + B = 90^\\circ$.\n2. Set up equation: $(3x - 5) + (2x + 15) = 90$.\n3. Combine like terms: $5x + 10 = 90 \\implies 5x = 80 \\implies x = 16$.",
        referenceFormula: "\\sin(A) = \\cos(B) \\iff A + B = 90^\\circ"
      },
      {
        id: "u5_q03_circle_standard_eq",
        questionNumber: 3,
        prompt: "The equation of a circle in the $xy$-plane is $(x - 5)^2 + (y + 8)^2 = 64$. What are the coordinates of the center and the length of the radius of the circle?",
        options: [
          "A. Center (-5, 8), Radius 8",
          "B. Center (5, -8), Radius 8",
          "C. Center (5, -8), Radius 64",
          "D. Center (-5, 8), Radius 64"
        ],
        correctAnswer: "B",
        explanation: "1. Standard form is $(x - h)^2 + (y - k)^2 = r^2$.\n2. Here $h = 5$ and $k = -8$, so the center is $(5, -8)$.\n3. The radius is $r = \\sqrt{64} = 8$.\n4. Therefore, Center $(5, -8)$ and Radius $8$.",
        satTrap: "Assuming radius is 64 without taking the square root (Option C), or forgetting the negative signs in (h, k) (Option A)."
      },
      {
        id: "u5_q04_special_45_45_90",
        questionNumber: 4,
        prompt: "A square has a perimeter of $48\\text{ cm}$. What is the length of the diagonal of the square?",
        options: ["A. 12 cm", "B. 12\\sqrt{2} cm", "C. 24 cm", "D. 24\\sqrt{2} cm"],
        correctAnswer: "B",
        explanation: "1. Find side length of the square: $s = 48 / 4 = 12\\text{ cm}$.\n2. The diagonal divides the square into two $45^\\circ-45^\\circ-90^\\circ$ right triangles with legs $12$.\n3. Hypotenuse formula for $45-45-90$: $\\text{Diagonal} = s\\sqrt{2} = 12\\sqrt{2}\\text{ cm}$.",
        referenceFormula: "\\text{Diagonal of square with side } s = s\\sqrt{2}"
      },
      {
        id: "u5_q05_special_30_60_90",
        questionNumber: 5,
        prompt: "An equilateral triangle has a side length of $10$. What is the area of the equilateral triangle?",
        options: ["A. 25", "B. 25\\sqrt{3}", "C. 50", "D. 50\\sqrt{3}"],
        correctAnswer: "B",
        explanation: "1. Drawing an altitude creates two $30^\\circ-60^\\circ-90^\\circ$ triangles.\n2. The hypotenuse is $10$. Short leg (half the base) is $10 / 2 = 5$.\n3. The altitude (height $h$) is the long leg: $h = 5\\sqrt{3}$.\n4. Triangle area: $A = \\frac{1}{2} b h = \\frac{1}{2}(10)(5\\sqrt{3}) = 25\\sqrt{3}$.\n(Or using equilateral formula: $\\frac{s^2 \\sqrt{3}}{4} = \\frac{100\\sqrt{3}}{4} = 25\\sqrt{3}$).",
        referenceFormula: "\\text{Area of equilateral triangle} = \\frac{s^2 \\sqrt{3}}{4}"
      },
      {
        id: "u5_q06_arc_length",
        questionNumber: 6,
        prompt: "A circle with radius $15$ has a central angle measuring $72^\\circ$. What is the length of the minor arc intercepted by this central angle?",
        options: ["A. 3\\pi", "B. 6\\pi", "C. 9\\pi", "D. 12\\pi"],
        correctAnswer: "B",
        explanation: "1. Fraction of the circle: $\\frac{72^\\circ}{360^\\circ} = \\frac{1}{5}$.\n2. Total circumference: $C = 2\\pi r = 2\\pi(15) = 30\\pi$.\n3. Arc length: $s = \\frac{1}{5} \\times 30\\pi = 6\\pi$.",
        referenceFormula: "s = \\frac{\\theta}{360^\\circ} \\times 2\\pi r"
      },
      {
        id: "u5_q07_exterior_angle",
        questionNumber: 7,
        prompt: "In triangle $PQR$, the measure of angle $P$ is $54^\\circ$ and the measure of angle $Q$ is $71^\\circ$. What is the measure of the exterior angle at vertex $R$?",
        options: ["A. 55^\\circ", "B. 115^\\circ", "C. 125^\\circ", "D. 135^\\circ"],
        correctAnswer: "C",
        explanation: "1. By the Exterior Angle Theorem, the exterior angle at vertex $R$ equals the sum of the two remote interior angles $P$ and $Q$.\n2. $\\text{Exterior Angle} = 54^\\circ + 71^\\circ = 125^\\circ$.",
        referenceFormula: "\\angle_{\\text{exterior}} = \\angle_1 + \\angle_2"
      },
      {
        id: "u5_q08_cylinder_volume_scaling",
        questionNumber: 8,
        prompt: "A right circular cylinder has a volume of $18\\pi\\text{ cm}^3$. If the radius of the cylinder is multiplied by $3$ while the height remains unchanged, what is the volume of the new cylinder?",
        options: ["A. 54\\pi cm^3", "B. 108\\pi cm^3", "C. 162\\pi cm^3", "D. 486\\pi cm^3"],
        correctAnswer: "C",
        explanation: "1. Cylinder volume formula: $V = \\pi r^2 h$.\n2. Since the radius $r$ is squared in the volume formula, multiplying the radius by $3$ multiplies the volume by $3^2 = 9$.\n3. New volume: $18\\pi \\times 9 = 162\\pi\\text{ cm}^3$.",
        satTrap: "Multiplying by 3 instead of 3^2 = 9 (getting 54pi, Option A)."
      },
      {
        id: "u5_q09_tangent_trig_ratio",
        questionNumber: 9,
        prompt: "In right triangle $DEF$, the right angle is at $E$. The length of leg $DE$ is $9$, and the length of leg $EF$ is $12$. What is the value of $\\tan(D)$?",
        options: ["A. \\frac{3}{5}", "B. \\frac{3}{4}", "C. \\frac{4}{5}", "D. \\frac{4}{3}"],
        correctAnswer: "D",
        explanation: "1. For angle $D$, the opposite leg is $EF = 12$.\n2. The adjacent leg to angle $D$ is $DE = 9$.\n3. Tangent definition: $\\tan(D) = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{12}{9} = \\frac{4}{3}$.",
        referenceFormula: "\\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}}"
      },
      {
        id: "u5_q10_circle_inscribed_angle",
        questionNumber: 10,
        prompt: "Points $A$, $B$, and $C$ lie on a circle with center $O$. If central angle $\\angle AOC$ measures $110^\\circ$, what is the measure of the inscribed angle $\\angle ABC$?",
        options: ["A. 45^\\circ", "B. 55^\\circ", "C. 70^\\circ", "D. 110^\\circ"],
        correctAnswer: "B",
        explanation: "1. By the Inscribed Angle Theorem, an inscribed angle that intercepts the same arc as a central angle is exactly half the central angle measure.\n2. $\\angle ABC = \\frac{1}{2} \\times \\angle AOC = \\frac{1}{2} \\times 110^\\circ = 55^\\circ$.",
        referenceFormula: "\\angle_{\\text{inscribed}} = \\frac{1}{2} \\angle_{\\text{central}}"
      }
    ],
    prevUnitId: "unit-04-foundations-adv-math",
    nextUnitId: "unit-06-medium-algebra"
  },
  "unit-06-medium-algebra": UNIT_06_MEDIUM_ALGEBRA,
  "unit-07-medium-psda": UNIT_07_MEDIUM_PSDA,
  "unit-08-medium-adv-math": UNIT_08_MEDIUM_ADV_MATH,
  "unit-09-medium-geom-trig": UNIT_09_MEDIUM_GEOM_TRIG,
  "unit-10-advanced-algebra": UNIT_10_ADVANCED_ALGEBRA,
  "unit-11-advanced-psda": UNIT_11_ADVANCED_PSDA,
  "unit-12-advanced-adv-math": UNIT_12_ADVANCED_ADV_MATH,
  "unit-13-advanced-geom-trig": UNIT_13_ADVANCED_GEOM_TRIG
};

import { UNIT_06_MEDIUM_ALGEBRA } from "./textbook-units/unit-06";
import { UNIT_07_MEDIUM_PSDA } from "./textbook-units/unit-07";
import { UNIT_08_MEDIUM_ADV_MATH } from "./textbook-units/unit-08";
import { UNIT_09_MEDIUM_GEOM_TRIG } from "./textbook-units/unit-09";
import { UNIT_10_ADVANCED_ALGEBRA } from "./textbook-units/unit-10";
import { UNIT_11_ADVANCED_PSDA } from "./textbook-units/unit-11";
import { UNIT_12_ADVANCED_ADV_MATH } from "./textbook-units/unit-12";
import { UNIT_13_ADVANCED_GEOM_TRIG } from "./textbook-units/unit-13";

import { KHAN_SAT_MATH_UNITS } from "./khan-units-data";

export function getAllKhanUnitIds(): string[] {
  return KHAN_SAT_MATH_UNITS.map((u) => u.id);
}

export function getKhanFullUnit(unitId: string): KhanFullUnit | null {
  if (KHAN_FULL_UNITS[unitId]) {
    return KHAN_FULL_UNITS[unitId];
  }

  // Fallback / scaffold for other units from KHAN_SAT_MATH_UNITS (100% in English)
  const baseUnit = KHAN_SAT_MATH_UNITS.find((u) => u.id === unitId);
  if (!baseUnit) return null;

  const currentIdx = KHAN_SAT_MATH_UNITS.findIndex((u) => u.id === unitId);
  const prevUnit = KHAN_SAT_MATH_UNITS[currentIdx - 1];
  const nextUnit = KHAN_SAT_MATH_UNITS[currentIdx + 1];

  const sections: TextbookSection[] = baseUnit.skills.map((skill, sIdx) => ({
    id: skill.id,
    title: `${sIdx + 1}. ${skill.title}`,
    readTime: "7 min read",
    summary: skill.lessonContent.overview_en,
    contentMarkdown: `### ${skill.title}\n\n${skill.lessonContent.overview_en}\n\n#### First Principles & Rules:\n${skill.lessonContent.firstPrinciples.map((fp) => `- ${fp}`).join("\n")}\n\n#### Key Formulas & Identities:\n${skill.lessonContent.rules.map((r) => `- **${r.name}:** $${r.formula}$ — ${r.explanation}`).join("\n")}`,
    keyTakeaways: skill.lessonContent.firstPrinciples,
    desmosExample: {
      title: skill.lessonContent.desmosBypass.title,
      expression: skill.lessonContent.desmosBypass.keys,
      tip: skill.lessonContent.desmosBypass.tip
    }
  }));

  const practiceQuestions: TextbookPracticeQuestion[] = baseUnit.skills.flatMap((skill, sIdx) => {
    const list: TextbookPracticeQuestion[] = [];
    if (skill.basicExample) {
      list.push({
        id: `${skill.id}_basic`,
        questionNumber: list.length + 1,
        prompt: skill.basicExample.question,
        options: skill.basicExample.choices || ["A", "B", "C", "D"],
        correctAnswer: skill.basicExample.correctAnswer,
        explanation: skill.basicExample.stepByStep.join("\n"),
        satTrap: skill.basicExample.takeaway
      });
    }
    if (skill.harderExample) {
      list.push({
        id: `${skill.id}_harder`,
        questionNumber: list.length + 1,
        prompt: skill.harderExample.question,
        options: skill.harderExample.choices || ["A", "B", "C", "D"],
        correctAnswer: skill.harderExample.correctAnswer,
        explanation: skill.harderExample.solution,
        satTrap: skill.harderExample.trapAnalysis,
        desmosTrick: skill.harderExample.speedHack
      });
    }
    return list;
  });

  return {
    id: baseUnit.id,
    unitNumber: baseUnit.unitNumber,
    title: baseUnit.title,
    slug: baseUnit.id,
    tier: baseUnit.tier,
    domain: baseUnit.domain,
    topicCode: baseUnit.skills[0]?.topicCode || "ALG-01",
    estimatedHours: "3.5 hours",
    description: baseUnit.description_en,
    overviewSummary: baseUnit.description_en,
    sections,
    speedHacks: baseUnit.skills.map((s) => ({
      title: s.lessonContent.desmosBypass.title,
      trigger: s.title,
      shortcut: s.lessonContent.desmosBypass.tip,
      example: s.lessonContent.desmosBypass.keys
    })),
    practiceQuestions: practiceQuestions.length >= 1 ? practiceQuestions : [],
    prevUnitId: prevUnit?.id,
    nextUnitId: nextUnit?.id
  };
}
