import { KhanFullUnit } from "../khan-textbook-units";

export const UNIT_06_MEDIUM_ALGEBRA: KhanFullUnit = {
  id: "unit-06-medium-algebra",
  unitNumber: 6,
  title: "Unit 6: Medium: Algebra",
  slug: "unit-06-medium-algebra",
  tier: "Medium",
  domain: "Algebra",
  topicCode: "ALG-03",
  estimatedHours: "3.5 hours",
  description: "Advanced multi-step linear systems, substitution vs. elimination decision matrices, parallel lines with zero solutions, identical equations with infinite solutions, two-variable inequality half-planes, and absolute value systems.",
  overviewSummary: "Medium Algebra tests your tactical efficiency. In Foundations, you learned how to isolate variables. In Medium Algebra, the College Board adds parametric constants ($k, a, b$), systems with no or infinite solutions, and bounded inequality regions. Speed and algebraic precision are non-negotiable.",
  sections: [
    {
      id: "sec-u6-systems-decision",
      title: "1. Substitution vs. Elimination: The 5-Second Decision Matrix",
      readTime: "8 min read",
      summary: "How to instantly choose between substitution and elimination to solve 2x2 systems in under 45 seconds.",
      diagramType: "system-intersection",
      contentMarkdown: `### The Strategic Dilemma
Every system of two linear equations can theoretically be solved by either substitution or elimination. However, choosing the wrong method on the Digital SAT wastes 60–90 seconds of tedious scratchwork.

#### The 5-Second Decision Rule:
1. **Use Substitution when:**
   - One variable already has a coefficient of $\\pm 1$ (e.g., $x = 3y - 4$ or $2x + y = 9$).
   - The question asks for an expression already isolated (e.g., "What is the value of $y$?" when $y$ is isolated).
2. **Use Elimination when:**
   - Both equations are in standard form $Ax + By = C$.
   - The question asks for a **sum or difference** like $x + y$, $x - y$, or $3x + 3y$. Often, you do **NOT** need to find $x$ and $y$ individually! Simply add or subtract the two equations directly!

#### Direct Combination Trick:
Suppose you are given:
$$\\begin{cases} 4x + 3y = 22 \\\\ 2x + y = 10 \\end{cases}$$
If the question asks: **"What is the value of $2x + 2y$?"**
Do NOT solve for $x$ and $y$ separately! Subtract the second equation from the first:
$$(4x - 2x) + (3y - y) = 22 - 10 \\implies 2x + 2y = 12$$
Done in 5 seconds!`,
      keyTakeaways: [
        "If both equations are in standard form Ax + By = C, look for direct sum/difference combinations first.",
        "When asking for x + y, adding or subtracting equations often gives the target quantity immediately.",
        "In Desmos, typing both equations graphs them instantly — click the intersection point to inspect (x, y)."
      ],
      desmosExample: {
        title: "Instant System Intersection",
        expression: "4x + 3y = 22, 2x + y = 10",
        tip: "Type both lines. Tap the intersection point $(4, 2)$ to instantly read the coordinates without manual algebra."
      }
    },
    {
      id: "sec-u6-no-vs-infinite-solutions",
      title: "2. The Coefficient Ratio Theorem: No Solution vs. Infinite Solutions",
      readTime: "9 min read",
      summary: "Master the exact algebraic criteria for parallel lines (0 solutions) and identical lines (infinite solutions) without solving.",
      diagramType: "parallel-perpendicular",
      contentMarkdown: `### The Geometry of Linear Systems
A system of two linear equations in the $xy$-plane represents two lines:
1. **One Unique Solution:** Lines intersect at exactly one point (different slopes, $m_1 \\neq m_2$).
2. **No Solution:** Lines are parallel and distinct (equal slopes, different $y$-intercepts).
3. **Infinitely Many Solutions:** Lines are identical/coincident (equal slopes and identical $y$-intercepts).

#### The Standard Form Ratio Theorem
For a standard system:
$$\\begin{cases} A_1x + B_1y = C_1 \\\\ A_2x + B_2y = C_2 \\end{cases}$$

- **No Solution (Parallel Lines):**
  $$\\frac{A_1}{A_2} = \\frac{B_1}{B_2} \\neq \\frac{C_1}{C_2}$$
  The $x$- and $y$-coefficients are strictly proportional, but the constants are not.
  
- **Infinitely Many Solutions (Coincident Lines):**
  $$\\frac{A_1}{A_2} = \\frac{B_1}{B_2} = \\frac{C_1}{C_2}$$
  The entire second equation is simply a scalar multiple of the first equation.

#### College Board Trap Example:
> The system has no solution:
> $$\\begin{cases} 4x - 6y = 15 \\\\ 6x - ky = 20 \\end{cases}$$
> What is the value of $k$?

**Solution:**
Match the ratios:
$$\\frac{4}{6} = \\frac{-6}{-k} \\implies \\frac{2}{3} = \\frac{6}{k} \\implies 2k = 18 \\implies k = 9$$
Verify constants: $\\frac{4}{6} = \\frac{2}{3}$, but $\\frac{15}{20} = \\frac{3}{4} \\neq \\frac{2}{3}$.
The condition holds! $k = 9$.`,
      keyTakeaways: [
        "No solution means slopes are identical but y-intercepts differ.",
        "Infinitely many solutions means the two equations are identical multiples of each other.",
        "Set up the proportion A1/A2 = B1/B2 to solve for unknown parametric constants in under 15 seconds."
      ],
      desmosExample: {
        title: "Slider Verification for Parameter k",
        expression: "4x - 6y = 15, 6x - ky = 20",
        tip: "Add a slider for k and set k = 9. Notice both lines become parallel and never touch!"
      }
    },
    {
      id: "sec-u6-two-variable-inequalities",
      title: "3. Linear Inequalities in Two Variables & Shaded Half-Planes",
      readTime: "8 min read",
      summary: "Understand boundary lines (solid vs dashed), half-plane shading, and how to verify feasible region points.",
      diagramType: "inequality-plane",
      contentMarkdown: `### Reading Two-Variable Inequalities
An inequality in two variables like $y > 2x - 3$ partitions the coordinate plane into two halves separated by the boundary line $y = 2x - 3$.

#### Boundary Rules:
- **Strict Inequalities ($>$ or $<$):** The boundary is **dashed/dotted**. Points on the line are **NOT** solutions.
- **Inclusive Inequalities ($\\ge$ or $\\le$):** The boundary is **solid**. Points on the line **ARE** solutions.

#### Shading Direction:
- $y > mx + b$ or $y \\ge mx + b$: Shade **above** the boundary line.
- $y < mx + b$ or $y \\le mx + b$: Shade **below** the boundary line.
- **The $(0,0)$ Test:** If $(0,0)$ does not lie on the line, plug $(0,0)$ into the inequality. If the resulting statement is true, shade the region containing $(0,0)$. If false, shade the opposite side!

#### System of Inequalities (Feasible Region):
The solution set to a system of inequalities is the **overlapping intersection** of all shaded regions.
A point $(x, y)$ is a valid solution if and only if it satisfies **every single inequality** in the system.`,
      keyTakeaways: [
        "Solid line for >= and <= (boundary points included); dashed line for > and < (boundary excluded).",
        "Test (0,0) to verify shading direction reliably without memorizing confusing orientation rules.",
        "Desmos graphs inequalities with beautiful colored shading — points in the darkest overlap are solutions."
      ],
      desmosExample: {
        title: "Inequality Feasible Region",
        expression: "y >= 2x - 4, y < -x + 3",
        tip: "Desmos shades both regions simultaneously. The overlapping dark region is the solution set."
      }
    },
    {
      id: "sec-u6-linear-word-problems",
      title: "4. Multi-Step Linear Constraints & Rate Modeling",
      readTime: "7 min read",
      summary: "Translating complex real-world verbal prompts into standard form Ax + By <= C constraints.",
      diagramType: "word-problem-model",
      contentMarkdown: `### Deconstructing Contextual Prompts
College Board word problems often involve budget limits, carrying capacity, or production rates with two distinct items.

#### Structure of a Linear Constraint:
$$\\text{Rate}_A \\cdot A + \\text{Rate}_B \\cdot B \\le \\text{Total Budget}$$
- **$A$ and $B$:** Quantities of item $A$ and item $B$.
- **$\\text{Rate}_A$ and $\\text{Rate}_B$:** Unit cost, unit weight, or hourly consumption of each item.
- **Total:** Maximum capacity or allocated budget.

#### Interpreting Intercepts in Context:
- **$x$-intercept:** The amount of item $A$ if **zero** of item $B$ is purchased ($B = 0$).
- **$y$-intercept:** The amount of item $B$ if **zero** of item $A$ is purchased ($A = 0$).
- **Slope ($-\\frac{A}{B}$):** The trade-off rate (opportunity cost) — how many units of $B$ must be sacrificed to acquire one additional unit of $A$.`,
      keyTakeaways: [
        "Identify the units of the constant to ensure both terms match dimensions (e.g. dollars + dollars = dollars).",
        "The x-intercept represents the scenario where the second variable is set to 0.",
        "Pay strict attention to inequality phrasing: 'at most' means <=, 'at least' means >=, 'no more than' means <=."
      ]
    },
    {
      id: "sec-u6-absolute-value-multi",
      title: "5. Absolute Value Equations with Linear Components & Extraneous Roots",
      readTime: "8 min read",
      summary: "Handling equations of the form |ax + b| = cx + d and screening for extraneous roots.",
      contentMarkdown: `### The Dual-Branch Invariant
When an equation contains an absolute value equal to a variable expression:
$$|ax + b| = cx + d$$

You must split the problem into two distinct cases:
1. **Case 1 (Positive branch):** $ax + b = +(cx + d)$
2. **Case 2 (Negative branch):** $ax + b = -(cx + d)$

#### The Mandatory Check for Extraneous Roots:
Because the absolute value $|ax + b|$ can **never** be negative, any solution $x$ that causes $cx + d < 0$ is **extraneous and invalid**!

#### Example Walkthrough:
$$|2x - 3| = x - 5$$
- If we blindly solve:
  - Branch 1: $2x - 3 = x - 5 \\implies x = -2$
  - Branch 2: $2x - 3 = -(x - 5) = -x + 5 \\implies 3x = 8 \\implies x = 8/3$
- **Check both:**
  - For $x = -2$: Right side is $-2 - 5 = -7$. But $|2(-2) - 3| = |-7| = 7 \\neq -7$. Extraneous!
  - For $x = 8/3$: Right side is $8/3 - 5 = -7/3 < 0$. Also extraneous!
- **Conclusion:** There are **ZERO real solutions**!`,
      keyTakeaways: [
        "Always plug prospective solutions back into the original absolute value equation.",
        "An absolute value can NEVER equal a negative number.",
        "Desmos graphs y = |ax + b| and y = cx + d. If they never cross, there are no solutions!"
      ],
      desmosExample: {
        title: "Desmos Absolute Value Graphing",
        expression: "y = |2x - 3|, y = x - 5",
        tip: "Notice the V-shaped curve and the line do not intersect anywhere. Zero solutions confirmed in 3 seconds!"
      }
    }
  ],
  speedHacks: [
    {
      title: "Direct System Elimination Hack",
      trigger: "System asks for x + y, x - y, or a multiple",
      shortcut: "Add or subtract both equations directly instead of isolating x or y.",
      example: "(3x + 2y = 17) + (2x + 3y = 13) => 5x + 5y = 30 => x + y = 6"
    },
    {
      title: "Ratio of Coefficients for No Solution",
      trigger: "Problem states system has no solution or infinitely many solutions",
      shortcut: "Set A1 / A2 = B1 / B2 directly.",
      example: "3x + ky = 8 and 6x + 10y = 16 => 3/6 = k/10 => k = 5"
    },
    {
      title: "Desmos Tap-Intersection Trick",
      trigger: "Any system of two equations",
      shortcut: "Type both equations into Desmos. Tap the gray dot at the intersection to read (x, y).",
      example: "2x - 5y = 11 and 3x + y = 8 => tap dot to see (3, -1)"
    }
  ],
  practiceQuestions: [
    {
      id: "u6_q01",
      questionNumber: 1,
      prompt: "Consider the system of equations:\n$$\\begin{cases} 5x + 3y = 29 \\\\ 2x + 3y = 17 \\end{cases}$$\nWhat is the value of $x$?",
      options: ["A. 3", "B. 4", "C. 5", "D. 6"],
      correctAnswer: "B",
      explanation: "Subtract the second equation from the first to immediately eliminate $3y$:\n$(5x - 2x) + (3y - 3y) = 29 - 17$\n$3x = 12 \\implies x = 4$.",
      satTrap: "Do not solve for y first! Subtracting eliminates y in one step.",
      desmosTrick: "Type both equations into Desmos and tap the intersection point: (4, 3). So x = 4.",
      referenceFormula: "\\text{Elimination: } (A_1 - A_2)x = C_1 - C_2"
    },
    {
      id: "u6_q02",
      questionNumber: 2,
      prompt: "The system of equations has no solution:\n$$\\begin{cases} kx - 6y = 14 \\\\ 4x - 8y = 21 \\end{cases}$$\nWhat is the value of the constant $k$?",
      options: ["A. 2", "B. 3", "C. 4.5", "D. 6"],
      correctAnswer: "B",
      explanation: "For a linear system to have no solution, the lines must be parallel, meaning their $x$ and $y$ coefficients must be proportional:\n$$\\frac{k}{4} = \\frac{-6}{-8} \\implies \\frac{k}{4} = \\frac{3}{4} \\implies k = 3$$.\nCheck constants: $\\frac{14}{21} = \\frac{2}{3} \\neq \\frac{3}{4}$, confirming the lines are parallel and distinct.",
      satTrap: "Remember the signs! $\\frac{-6}{-8} = +\\frac{3}{4}$. Do not drop negative signs.",
      desmosTrick: "Enter 'kx - 6y = 14' with slider k, and '4x - 8y = 21'. Move k to 3 to see perfect parallel lines.",
      referenceFormula: "\\frac{A_1}{A_2} = \\frac{B_1}{B_2} \\neq \\frac{C_1}{C_2}"
    },
    {
      id: "u6_q03",
      questionNumber: 3,
      prompt: "If $7x - 2y = 15$ and $3x + 4y = 19$, what is the value of $10x + 2y$?",
      options: ["A. 24", "B. 34", "C. 42", "D. 48"],
      correctAnswer: "B",
      explanation: "Notice the target expression: $10x + 2y$.\nAdd the two equations together:\n$(7x + 3x) + (-2y + 4y) = 15 + 19$\n$10x + 2y = 34$.\nYou do not need to find $x$ or $y$ individually!",
      satTrap: "Spending 2 minutes solving for x = 7/2 and y = 19/8 before plugging back in. Always check if a direct sum yields the answer!",
      desmosTrick: "Type the two equations, find (x, y) = (2.882, 2.588), then evaluate 10x + 2y = 34."
    },
    {
      id: "u6_q04",
      questionNumber: 4,
      prompt: "A food truck sells tacos for $3 each and burritos for $7 each. On Tuesday, the truck sold a total of 120 items and collected $560. How many burritos were sold?",
      options: ["A. 40", "B. 50", "C. 65", "D. 70"],
      correctAnswer: "B",
      explanation: "Let $t$ be tacos and $b$ be burritos.\n$$\\begin{cases} t + b = 120 \\\\ 3t + 7b = 560 \\end{cases}$$\nMultiply first equation by 3: $3t + 3b = 360$.\nSubtract from second equation: $(3t + 7b) - (3t + 3b) = 560 - 360 \\implies 4b = 200 \\implies b = 50$.",
      satTrap: "Confusing tacos and burritos at the end. The question specifically asked for burritos (b = 50), not tacos (t = 70).",
      desmosTrick: "In Desmos: type 'x + y = 120' and '3x + 7y = 560'. Intersection is (70, 50). y = 50 (burritos)."
    },
    {
      id: "u6_q05",
      questionNumber: 5,
      prompt: "Which of the following points $(x, y)$ is in the solution set of the system of inequalities?\n$$y > 3x - 5$$\n$$2x + y \\le 10$$",
      options: ["A. (0, -6)", "B. (2, 7)", "C. (4, 3)", "D. (1, 2)"],
      correctAnswer: "D",
      explanation: "Test point (1, 2):\n1. $y > 3x - 5 \\implies 2 > 3(1) - 5 \\implies 2 > -2$ (True!)\n2. $2x + y \\le 10 \\implies 2(1) + 2 = 4 \\le 10$ (True!)\nBoth conditions hold, so (1, 2) is a valid solution.",
      satTrap: "Point B (2, 7): 7 > 3(2) - 5 = 1 (True), but 2(2) + 7 = 11 <= 10 is FALSE! A solution must satisfy BOTH inequalities.",
      desmosTrick: "Type 'y > 3x - 5' and '2x + y <= 10'. Plot all 4 options as points; only (1, 2) lies in the dark double-shaded region."
    },
    {
      id: "u6_q06",
      questionNumber: 6,
      prompt: "How many real solutions does the equation $|3x - 9| = -2x + 1$ have?",
      options: ["A. Exactly zero", "B. Exactly one", "C. Exactly two", "D. Infinitely many"],
      correctAnswer: "B",
      explanation: "Split into two branches:\nBranch 1: $3x - 9 = -2x + 1 \\implies 5x = 10 \\implies x = 2$.\nCheck $x = 2$: $|3(2) - 9| = |-3| = 3$. Right side: $-2(2) + 1 = -3$. But $|-3| = 3 \\neq -3$! Extraneous!\n\nBranch 2: $3x - 9 = -(-2x + 1) = 2x - 1 \\implies x = 8$.\nCheck $x = 8$: $|3(8) - 9| = |15| = 15$. Right side: $-2(8) + 1 = -15 \\neq 15$! Extraneous!\nWait, let's verify if there is any solution. Both x = 2 and x = 8 yield a negative right-hand side, so NEITHER is valid!\nTherefore, there are exactly zero real solutions.",
      satTrap: "Blindly solving algebra without checking the sign of the right-hand side. The right-hand side must be >= 0.",
      desmosTrick: "Graph y = |3x - 9| and y = -2x + 1. The two graphs never touch. Zero solutions!",
      referenceFormula: "|u| = v \\implies v \\ge 0"
    },
    {
      id: "u6_q07",
      questionNumber: 7,
      prompt: "The system of equations has infinitely many solutions:\n$$\\begin{cases} 6x - 15y = 21 \\\\ 2x - py = q \\end{cases}$$\nWhat is the value of $p + q$?",
      options: ["A. 7", "B. 12", "C. 14", "D. 18"],
      correctAnswer: "B",
      explanation: "For infinitely many solutions, the two equations must be identical scalar multiples.\nNotice the ratio of the $x$-coefficients: $\\frac{6}{2} = 3$.\nDividing the first equation by 3 gives:\n$$\\frac{6x}{3} - \\frac{15y}{3} = \\frac{21}{3} \\implies 2x - 5y = 7$$\nComparing to $2x - py = q$:\n$p = 5$ and $q = 7$.\nTherefore, $p + q = 5 + 7 = 12$.",
      satTrap: "Watching out for signs: the second equation is $2x - py = q$, so $-py = -5y \\implies p = +5$, not $-5$.",
      desmosTrick: "Type '6x - 15y = 21' and '2x - 5y = 7'. Notice they lie perfectly on top of each other."
    },
    {
      id: "u6_q08",
      questionNumber: 8,
      prompt: "In the $xy$-plane, line $L_1$ passes through $(0, 4)$ and $(6, 1)$. Line $L_2$ is perpendicular to line $L_1$ and passes through $(2, -1)$. What is the $y$-intercept of line $L_2$?",
      options: ["A. -5", "B. -3", "C. 3", "D. 5"],
      correctAnswer: "A",
      explanation: "1. Slope of $L_1$: $m_1 = \\frac{1 - 4}{6 - 0} = -\\frac{3}{6} = -\\frac{1}{2}$.\n2. Slope of perpendicular line $L_2$: negative reciprocal $m_2 = -\\frac{1}{-1/2} = +2$.\n3. Equation of $L_2$ using point $(2, -1)$:\n$y - (-1) = 2(x - 2) \\implies y + 1 = 2x - 4 \\implies y = 2x - 5$.\nTherefore, the $y$-intercept is $-5$.",
      satTrap: "Forgetting to take BOTH the negative and the reciprocal. Parallel slopes are equal; perpendicular slopes multiply to -1 ($m_1 m_2 = -1$).",
      desmosTrick: "Type 'y - 4 = (-1/2)(x - 0)' and 'y - (-1) = 2(x - 2)'. Tap the y-axis intercept of the second line: (0, -5)."
    },
    {
      id: "u6_q09",
      questionNumber: 9,
      prompt: "For what value of $c$ will the following system of equations have no solution?\n$$\\begin{cases} 9x - 12y = 18 \\\\ cx - 8y = 15 \\end{cases}$$\n",
      options: ["A. 4", "B. 6", "C. 8", "D. 12"],
      correctAnswer: "B",
      explanation: "Set the coefficient ratios equal:\n$$\\frac{9}{c} = \\frac{-12}{-8} \\implies \\frac{9}{c} = \\frac{3}{2} \\implies 3c = 18 \\implies c = 6$$.\nVerify constants: $\\frac{9}{6} = 1.5 \\neq \\frac{18}{15} = 1.2$, so lines are parallel and distinct (no solution).",
      satTrap: "Dividing incorrectly: $\\frac{-12}{-8} = +\\frac{3}{2}$. Solving $9/c = 3/2$ gives $c = 6$.",
      desmosTrick: "Enter 'cx - 8y = 15' with slider c and '9x - 12y = 18'. Set c = 6 to verify parallel orientation."
    },
    {
      id: "u6_q10",
      questionNumber: 10,
      prompt: "A system of equations consists of $x + 2y = 14$ and $y = 0.5x + 1$. What is the value of $xy$?",
      options: ["A. 12", "B. 18", "C. 24", "D. 32"],
      correctAnswer: "C",
      explanation: "Substitute $y = 0.5x + 1$ into $x + 2y = 14$:\n$x + 2(0.5x + 1) = 14$\n$x + x + 2 = 14$\n$2x = 12 \\implies x = 6$.\nNow find $y$: $y = 0.5(6) + 1 = 3 + 1 = 4$.\nThe question asks for $xy$:\n$xy = 6 \\cdot 4 = 24$.",
      satTrap: "Stopping at x = 6 or y = 4. Always re-read what the prompt asks for: $xy = 24$!",
      desmosTrick: "Graph both equations, click intersection to see (6, 4). Then type '6 * 4' in line 3 to get 24."
    }
  ],
  prevUnitId: "unit-05-foundations-geom-trig",
  nextUnitId: "unit-07-medium-psda"
};
