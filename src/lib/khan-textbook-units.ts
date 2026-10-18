export interface TextbookSection {
  id: string;
  title: string;
  readTime: string;
  summary: string;
  contentMarkdown: string;
  keyTakeaways: string[];
  diagramType?: "adaptive-routing" | "desmos-keyboard" | "pacing-clock" | "formula-reference" | "linear-graph" | "system-intersection" | "inequality-plane";
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
        title: "1. Solving Linear Equations in One Variable: Ground Zero",
        readTime: "7 min read",
        summary: "A linear equation takes the standard form ax + b = c. The core principle is using inverse operations to isolate x on one side of the equal sign.",
        diagramType: "linear-graph",
        desmosExample: {
          title: "Desmos Single-Variable Solver",
          expression: "5(2x - 3) = 35",
          tip: "Desmos plots a vertical line at x = 5. You can read the solution directly off the x-axis!"
        },
        keyTakeaways: [
          "Inverse Operations: Addition undoes subtraction; division undoes multiplication.",
          "Distributive Property: Always distribute carefully before combining like terms: $a(b - c) = ab - ac$.",
          "No Solution condition: $ax + b = ax + c$ (where $b \\ne c$). The variable coefficients are identical, but constants differ ($0 = c - b$ impossible).",
          "Infinitely Many Solutions: $ax + b = ax + b$. Both sides are algebraically identical ($0 = 0$ identity)."
        ],
        contentMarkdown: `### The Anatomy of Linear Equations

A linear equation is any equation where the variable is raised only to the first power ($x^1$). It represents a flat, constant rate of change.

#### Three Possible Solution Outcomes on the SAT:
1. **Exactly One Solution:**
   $$3x + 7 = 19 \\implies 3x = 12 \\implies x = 4$$
   The variable coefficients are DIFFERENT on both sides.
2. **No Solution (Parallel / Contradiction):**
   $$4x + 9 = 4x - 5 \\implies 9 = -5 \\quad (\\text{False!})$$
   - **SAT Rule:** Coefficients of $x$ are **EQUAL**, but constants are **DIFFERENT**.
   - Example SAT question: *"If $kx + 8 = 5x - 3$ has no solution, what is $k$?"* $\\implies k = 5$.
3. **Infinitely Many Solutions (Identity):**
   $$2(3x + 4) = 6x + 8 \\implies 6x + 8 = 6x + 8 \\quad (\\text{Always True})$$
   - **SAT Rule:** Coefficients of $x$ are **EQUAL**, and constants are **EQUAL**.`
      },
      {
        id: "u2-sec-2-inequalities",
        title: "2. Linear Inequalities & The Negative Flip Rule",
        readTime: "6 min read",
        summary: "Whenever multiplying or dividing both sides of an inequality by a negative number, you MUST reverse (flip) the inequality symbol.",
        diagramType: "inequality-plane",
        keyTakeaways: [
          "Flip Rule: $-2x < 10 \\implies x > \\frac{10}{-2} \\implies x > -5$.",
          "Desmos Shading: Typing 'y > 2x - 4' into Desmos creates a dashed boundary line with the upper region shaded.",
          "Boundary check: Strict inequalities ($<, >$) have dashed lines (boundary excluded); non-strict ($\\le, \\ge$) have solid lines (boundary included)."
        ],
        contentMarkdown: `### The Negative Invariant Rule

Linear inequalities behave identically to linear equations with **one crucial exception**: multiplying or dividing by a negative value reverses the order of the real numbers on the number line.

$$\\text{If } -3x \\ge 18 \\implies x \\le \\frac{18}{-3} \\implies x \\le -6$$

#### Number Line & Plane Boundaries:
- **Strict Inequalities ($<$ and $>$):** Represented by an **open circle** on a number line, or a **dashed line** in the $xy$-plane. Points directly on the line are **NOT** solutions.
- **Inclusive Inequalities ($\\le$ and $\\ge$):** Represented by a **closed solid circle** or a **solid line**. Points directly on the line **ARE** valid solutions.`
      },
      {
        id: "u2-sec-3-word-problems",
        title: "3. Word Problems: Rate-Intercept Modeling ($y = mx + b$)",
        readTime: "8 min read",
        summary: "Master translating textual rates into y = mx + b. 'Per', 'each', and 'every' signal the slope m; 'flat fee', 'initial deposit', or 'starting amount' signals the y-intercept b.",
        keyTakeaways: [
          "Rate of Change = Slope ($m$): Look for keywords: 'per', 'each', 'every', 'hourly'.",
          "Initial Value = y-intercept ($b$): Look for keywords: 'deposit', 'fee', 'start', 'at time t = 0'.",
          "Total Cost equation: $\\text{Total} = (\\text{Unit Rate}) \\times x + \\text{Fixed Base}$."
        ],
        contentMarkdown: `### Translating English into Mathematics

Every year, thousands of students lose points on SAT word problems not because their math is weak, but because they fail to translate English sentence structure into algebraic equations.

#### The SAT Translation Dictionary:
- *"is", "was", "will be", "equals", "costs"* $\\implies =$
- *"per", "each", "every", "rate of"* $\\implies \\times$ (Slope $m$)
- *"flat fee", "initial cost", "starting with"* $\\implies + b$ (y-intercept)
- *"is $p\\%$ greater than $Q$"* $\\implies Q(1 + p/100)$
- *"at least $K$"* $\\implies \\ge K$
- *"at most $K$"* $\\implies \\le K$

#### Worked Example:
> *"A kayak rental company charges a $\\$25$ equipment deposit plus $\\$14$ for each hour of rental. If Marco has a budget of $\\$95$, what is the maximum number of full hours he can rent the kayak?"*

$$\\text{Model: } 14h + 25 \\le 95$$
$$14h \\le 70 \\implies h \\le 5$$
He can rent the kayak for a maximum of **5 full hours**.`
      },
      {
        id: "u2-sec-4-systems",
        title: "4. Systems of Linear Equations: Substitution, Elimination & Desmos",
        readTime: "8 min read",
        summary: "A system of linear equations represents two lines in the xy-plane. Their intersection point is the unique solution. Desmos finds the solution in 3 seconds flat.",
        diagramType: "system-intersection",
        desmosExample: {
          title: "System Intersection Trick",
          expression: "3x - 2y = 8 \nx + 4y = 12",
          tip: "Click the grey dot where lines cross: Desmos displays (4, 2). x = 4, y = 2!"
        },
        keyTakeaways: [
          "1 Solution: Lines intersect at one point $(x, y)$. Slopes are DIFFERENT ($m_1 \\ne m_2$).",
          "No Solution: Lines are parallel ($m_1 = m_2$) with different intercepts ($b_1 \\ne b_2$). They never touch.",
          "Infinitely Many Solutions: Lines are identical ($m_1 = m_2$ and $b_1 = b_2$). Every point on the line is a solution."
        ],
        contentMarkdown: `### Systems of Linear Equations

A system consists of two linear equations with two unknown variables:
$$\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}$$

#### The Three Geometric Cases on the SAT:
1. **Lines Intersect (One Unique Solution):**
   - The slopes are not equal: $m_1 \\ne m_2$.
2. **Lines are Parallel (No Solution):**
   - Slopes are equal, but $y$-intercepts are different:
   $$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2}$$
3. **Lines are Coincident (Infinitely Many Solutions):**
   - Both equations represent the exact same line:
   $$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$$`
      }
    ],
    speedHacks: [
      {
        title: "System Intersection Clicker",
        trigger: "Any system of two linear equations with choices for x or y",
        shortcut: "Type both lines into Desmos. Click the grey intersection dot.",
        example: "Line 1: 3x + 2y = 16. Line 2: y = 2x - 6. Tap grey dot: (4, 2). Immediate answer!"
      },
      {
        title: "Scale Factor Matching for 'No Solution'",
        trigger: "Equations with unknown constant $k$ and 'No Solution'",
        shortcut: "Make the ratio of x-coefficients equal the ratio of y-coefficients.",
        example: "If 2x + 5y = 7 and kx + 10y = 15 have no solution: k must equal 2 * (10/5) = 4."
      },
      {
        title: "Structure Substitution",
        trigger: "Question gives $x + y = 14$ and asks for $3x + 3y + 5$",
        shortcut: "Factor the target expression: $3(x + y) + 5 = 3(14) + 5 = 47$.",
        example: "Never solve for individual x and y when the question asks for a composite multiple!"
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
