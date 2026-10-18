export interface TextbookSection {
  id: string;
  title: string;
  readTime: string;
  summary: string;
  contentMarkdown: string;
  keyTakeaways: string[];
  diagramType?: "adaptive-routing" | "desmos-keyboard" | "pacing-clock" | "formula-reference" | "linear-graph" | "system-intersection" | "inequality-plane" | "parallel-perpendicular" | "word-problem-model";
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
  }
};

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
