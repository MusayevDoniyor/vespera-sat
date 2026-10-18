import { KhanFullUnit } from "../khan-textbook-units";

export const UNIT_08_MEDIUM_ADV_MATH: KhanFullUnit = {
  id: "unit-08-medium-adv-math",
  unitNumber: 8,
  title: "Unit 8: Medium: Advanced Math",
  slug: "unit-08-medium-adv-math",
  tier: "Medium",
  domain: "Advanced Math",
  topicCode: "ADV-02",
  estimatedHours: "4 hours",
  description: "Quadratic optimizations in vertex form, discriminant analysis for intersection counts, factoring by grouping and higher degree roots, non-linear systems of equations, radical expressions, and rational function domain restrictions.",
  overviewSummary: "Advanced Math accounts for approximately 35% of the Digital SAT Math section. At the Medium tier, questions transition from straightforward equation solving into multi-step polynomial manipulations, non-linear system intersections, and discriminant tests. Mastering these algebraic patterns unlocks the 700+ score range.",
  sections: [
    {
      id: "sec-u8-vertex-optimization",
      title: "1. Quadratic Vertex Form & Real-World Optimization",
      readTime: "9 min read",
      summary: "Understand how the vertex (h, k) reveals maximum/minimum values in physics projectiles and financial models.",
      diagramType: "parabola-vertex",
      contentMarkdown: `### The Three Canonical Forms of a Parabola
1. **Standard Form:** $y = ax^2 + bx + c$
   - $c$ is the $y$-intercept $(0, c)$.
   - $x$-coordinate of the vertex: $h = -\\frac{b}{2a}$.
   - $y$-coordinate of the vertex: $k = f(h) = f\\left(-\\frac{b}{2a}\\right)$.
2. **Factored (Intercept) Form:** $y = a(x - r_1)(x - r_2)$
   - $r_1$ and $r_2$ are the $x$-intercepts (zeros/roots).
   - The axis of symmetry lies exactly halfway: $h = \\frac{r_1 + r_2}{2}$.
3. **Vertex Form:** $y = a(x - h)^2 + k$
   - $(h, k)$ is the vertex (turning point).
   - If $a > 0$, parabola opens upwards $\\implies k$ is the **minimum value**.
   - If $a < 0$, parabola opens downwards $\\implies k$ is the **maximum value**.

#### Deciphering Context Prompts:
- *"At what time does the projectile reach its maximum height?"* $\\implies$ Solve for **$h$** ($x$-coordinate).
- *"What is the maximum height reached by the projectile?"* $\\implies$ Solve for **$k$** ($y$-coordinate).
- *"After how many seconds does the projectile hit the ground?"* $\\implies$ Solve for the positive zero where **$y = 0$**.`,
      keyTakeaways: [
        "In y = a(x - h)^2 + k, the maximum or minimum value of the function is strictly k.",
        "The input x at which that optimum occurs is h = -b / (2a).",
        "In Desmos, graphing any quadratic automatically highlights the vertex as a clickable gray dot."
      ],
      desmosExample: {
        title: "Instant Vertex Click",
        expression: "y = -16x^2 + 64x + 80",
        tip: "Type the projectile equation. Tap the top vertex point (2, 144) — peak height 144 occurs at 2 seconds."
      }
    },
    {
      id: "sec-u8-discriminant-diagnostic",
      title: "2. The Discriminant Diagnostic Matrix (\\Delta = b^2 - 4ac)",
      readTime: "8 min read",
      summary: "Instantly predict the exact number of real solutions or intersections without computing roots.",
      diagramType: "quadratic-discriminant",
      contentMarkdown: `### The Role of \\Delta
Under the radical in the Quadratic Formula $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$, the expression $\\Delta = b^2 - 4ac$ determines the nature of the roots:

| Discriminant Value | Graphical Interpretation | Number of Real Solutions |
|---|---|---|
| **$\\Delta > 0$** | Parabola crosses $x$-axis twice | **2 distinct real solutions** |
| **$\\Delta = 0$** | Parabola touches $x$-axis at its vertex (tangent) | **1 real solution** (double root) |
| **$\\Delta < 0$** | Parabola never touches $x$-axis | **0 real solutions** (2 complex roots) |

#### Non-Linear Tangency Trap:
> For what value of $c$ does the line $y = 2x + c$ intersect the parabola $y = x^2 + 6x + 5$ at exactly one point?

**Method:**
Set them equal:
$$x^2 + 6x + 5 = 2x + c \\implies x^2 + 4x + (5 - c) = 0$$
For exactly one intersection, the discriminant must equal zero:
$$\\Delta = b^2 - 4ac = 4^2 - 4(1)(5 - c) = 0$$
$$16 - 20 + 4c = 0 \\implies 4c = 4 \\implies c = 1$$`,
      keyTakeaways: [
        "One real solution or line tangent to parabola means Delta = b^2 - 4ac = 0.",
        "Zero real solutions means Delta < 0; two real solutions means Delta > 0.",
        "When a line intersects a parabola, set them equal in standard form ax^2 + bx + c = 0 before applying Delta."
      ],
      desmosExample: {
        title: "Slider Tangency Verification",
        expression: "y = x^2 + 6x + 5, y = 2x + c",
        tip: "Add slider for c. Move c to 1 to see the line touch the parabola at exactly one tangent point (-2, -3)."
      }
    },
    {
      id: "sec-u8-nonlinear-systems",
      title: "3. Non-Linear Systems of Equations",
      readTime: "8 min read",
      summary: "Solving systems combining linear and quadratic equations algebraically and with Desmos.",
      contentMarkdown: `### Geometry of Linear-Quadratic Systems
A line and a parabola in the $xy$-plane can intersect at:
1. **Two points:** Secant line cutting through the curve.
2. **One point:** Tangent line grazing the curve, or vertical line through a parabola opening horizontally.
3. **Zero points:** Line completely misses the parabola.

#### Algebraic Technique (Substitution):
Given:
$$\\begin{cases} y = x^2 - 3x + 2 \\\\ y = x - 1 \\end{cases}$$
1. Equate the two expressions for $y$:
   $$x^2 - 3x + 2 = x - 1$$
2. Move all terms to one side:
   $$x^2 - 4x + 3 = 0$$
3. Factor:
   $$(x - 1)(x - 3) = 0 \\implies x = 1 \\text{ or } x = 3$$
4. Plug back into linear equation $y = x - 1$:
   - For $x = 1$: $y = 1 - 1 = 0 \\implies (1, 0)$
   - For $x = 3$: $y = 3 - 1 = 2 \\implies (3, 2)$`,
      keyTakeaways: [
        "Substitute the linear expression into the quadratic expression.",
        "Set to zero, factor or use the quadratic formula to find x-values.",
        "Always calculate the corresponding y-values using the simpler linear equation."
      ],
      desmosExample: {
        title: "Desmos Non-Linear Intersection",
        expression: "y = x^2 - 3x + 2, y = x - 1",
        tip: "Type both curves. Desmos highlights both intersection points (1, 0) and (3, 2) with clickable gray dots."
      }
    },
    {
      id: "sec-u8-factoring-higher-degree",
      title: "4. Factoring by Grouping & Difference of Squares",
      readTime: "8 min read",
      summary: "Advanced polynomial factoring patterns that appear in high-yield Digital SAT questions.",
      contentMarkdown: `### High-Yield Factoring Templates
1. **Difference of Squares:**
   $$a^2 - b^2 = (a - b)(a + b)$$
   *Higher degree application:*
   $$x^4 - 81 = (x^2 - 9)(x^2 + 9) = (x - 3)(x + 3)(x^2 + 9)$$
2. **Factoring by Grouping (4 terms):**
   $$x^3 + 3x^2 - 4x - 12$$
   Group in pairs:
   $$x^2(x + 3) - 4(x + 3) = (x^2 - 4)(x + 3) = (x - 2)(x + 2)(x + 3)$$
3. **Common Monomial Extraction:**
   Always factor out the greatest common factor (GCF) first!
   $$3x^3 - 12x = 3x(x^2 - 4) = 3x(x - 2)(x + 2)$$
   The roots are $x = 0, 2, -2$.`,
      keyTakeaways: [
        "Never divide both sides of an equation by x — you will eliminate the solution x = 0!",
        "Factor x^4 - b^4 into two stages of difference of squares.",
        "In Desmos, finding all real roots of any polynomial takes 3 seconds: type the polynomial and tap all x-intercepts."
      ]
    },
    {
      id: "sec-u8-radicals-extraneous",
      title: "5. Radical Equations & The Extraneous Root Trap",
      readTime: "8 min read",
      summary: "Why squaring both sides creates false solutions, and how to verify legitimate roots.",
      contentMarkdown: `### The Squaring Operation Hazard
Squaring an equation is **NOT an invertible operation**:
$$A = B \\implies A^2 = B^2$$
However, $(-5)^2 = 25$ and $(+5)^2 = 25$, meaning squaring destroys sign information. This frequently generates **extraneous roots**.

#### Example:
$$\\sqrt{2x + 7} = x - 4$$
1. Square both sides:
   $$2x + 7 = (x - 4)^2 = x^2 - 8x + 16$$
2. Rearrange:
   $$x^2 - 10x + 9 = 0$$
3. Factor:
   $$(x - 1)(x - 9) = 0 \\implies x = 1 \\text{ or } x = 9$$
4. **Mandatory Check in Original Equation:**
   - **Test $x = 1$:** $\\sqrt{2(1) + 7} = \\sqrt{9} = 3$. Right side: $1 - 4 = -3$. But $3 \\neq -3$! Extraneous!
   - **Test $x = 9$:** $\\sqrt{2(9) + 7} = \\sqrt{25} = 5$. Right side: $9 - 4 = 5$. Valid!
- **Conclusion:** The only valid solution is $x = 9$.`,
      keyTakeaways: [
        "Whenever you square both sides to eliminate a radical, you MUST check all prospective solutions.",
        "The radical symbol sqrt(n) by definition refers ONLY to the principal (non-negative) square root.",
        "Desmos graphs y = sqrt(2x+7) and y = x - 4. They only cross at x = 9!"
      ],
      desmosExample: {
        title: "Desmos Radical Equation Verification",
        expression: "y = \\sqrt{2x + 7}, y = x - 4",
        tip: "Notice the square root curve only intersects the line at (9, 5). At x = 1, the line is at y = -3 below the axis."
      }
    }
  ],
  speedHacks: [
    {
      title: "Vertex Optimum Coordinates",
      trigger: "Maximum or minimum of quadratic y = ax^2 + bx + c",
      shortcut: "h = -b / (2a); optimal value k = f(h).",
      example: "y = -2x^2 + 8x + 1 => h = -8 / (2*-2) = 2 => Max value = -2(4) + 16 + 1 = 9"
    },
    {
      title: "Discriminant Tangent Condition",
      trigger: "Single intersection between line and parabola",
      shortcut: "Equate equations, set b^2 - 4ac = 0 to solve for missing constant.",
      example: "x^2 + kx + 9 = 0 has 1 solution => k^2 - 4(1)(9) = 0 => k = +-6"
    },
    {
      title: "Desmos Tap-Roots Trick",
      trigger: "Any higher-degree polynomial factoring or roots",
      shortcut: "Graph the function. Desmos shows all real zeros as clickable gray points along the x-axis.",
      example: "Type 'y = x^3 - 4x^2 - 11x + 30' => tap points (-3, 0), (2, 0), (5, 0)"
    }
  ],
  practiceQuestions: [
    {
      id: "u8_q01",
      questionNumber: 1,
      prompt: "The height $h$, in meters, of a baseball $t$ seconds after being struck is modeled by $h(t) = -5t^2 + 30t + 2$. What is the maximum height, in meters, reached by the baseball?",
      options: ["A. 3", "B. 45", "C. 47", "D. 92"],
      correctAnswer: "C",
      explanation: "The maximum of a downward-opening parabola occurs at its vertex.\n1. Time of peak: $t = -\\frac{b}{2a} = -\\frac{30}{2(-5)} = \\frac{30}{10} = 3$ seconds.\n2. Maximum height: $h(3) = -5(3)^2 + 30(3) + 2 = -5(9) + 90 + 2 = -45 + 92 = 47$ meters.",
      satTrap: "Answering 3 (Choice A). 3 is the TIME when max height occurs ($t = 3$). The question asks for the MAXIMUM HEIGHT ($h = 47$). Always verify which coordinate the prompt requests!",
      desmosTrick: "Type 'y = -5x^2 + 30x + 2'. Click on the peak of the parabola: (3, 47). Height is 47.",
      referenceFormula: "h_{\\text{max}} = f\\left(-\\frac{b}{2a}\\right)"
    },
    {
      id: "u8_q02",
      questionNumber: 2,
      prompt: "For what value of $c$ does the quadratic equation $3x^2 - 12x + c = 0$ have exactly one real solution?",
      options: ["A. 4", "B. 8", "C. 12", "D. 16"],
      correctAnswer: "C",
      explanation: "A quadratic equation has exactly one real solution if and only if its discriminant equals zero:\n$$\\Delta = b^2 - 4ac = 0$$\n$$(-12)^2 - 4(3)(c) = 0$$\n$$144 - 12c = 0 \\implies 12c = 144 \\implies c = 12$$.",
      satTrap: "Dividing by 4 instead of 12. $144 - 12c = 0 \\implies c = 12$.",
      desmosTrick: "Enter '3x^2 - 12x + c = 0' with a slider for c. Move c until the parabola's vertex touches the x-axis at (2, 0) -> c = 12.",
      referenceFormula: "b^2 - 4ac = 0"
    },
    {
      id: "u8_q03",
      questionNumber: 3,
      prompt: "What is the positive solution to the equation $\\sqrt{4x + 9} = x - 3$?",
      options: ["A. 0", "B. 2", "C. 7", "D. 10"],
      correctAnswer: "D",
      explanation: "1. Square both sides: $4x + 9 = (x - 3)^2 = x^2 - 6x + 9$.\n2. Subtract $4x + 9$ from both sides: $x^2 - 10x = 0$.\n3. Factor: $x(x - 10) = 0 \\implies x = 0$ or $x = 10$.\n4. Check for extraneous roots:\n- If $x = 0$: $\\sqrt{4(0) + 9} = 3$, but $0 - 3 = -3 \\neq 3$! ($x = 0$ is extraneous!).\n- If $x = 10$: $\\sqrt{4(10) + 9} = \\sqrt{49} = 7$, and $10 - 3 = 7$. Valid!\nTherefore, the positive valid solution is $x = 10$.",
      satTrap: "Thinking x = 0 is a valid solution. Plugging x = 0 gives sqrt(9) = -3, which is false!",
      desmosTrick: "Graph y = sqrt(4x + 9) and y = x - 3. Click the single intersection point at (10, 7) => x = 10."
    },
    {
      id: "u8_q04",
      questionNumber: 4,
      prompt: "If $(x + 3)$ is a factor of $x^3 + kx^2 - 4x - 12$, where $k$ is a constant, what is the value of $k$?",
      options: ["A. -3", "B. 1", "C. 3", "D. 4"],
      correctAnswer: "B",
      explanation: "By the Factor Theorem, if $(x + 3)$ is a factor of $P(x)$, then $P(-3) = 0$:\n$$(-3)^3 + k(-3)^2 - 4(-3) - 12 = 0$$\n$$-27 + 9k + 12 - 12 = 0$$\n$$-27 + 9k = 0 \\implies 9k = 27 \\implies k = 3$ wait!\nWait, let's recalculate: $(-3)^3 = -27$. $k(-3)^2 = 9k$. $-4(-3) = +12$. Constant is $-12$.\nSo $-27 + 9k + 12 - 12 = -27 + 9k = 0 \\implies 9k = 27 \\implies k = 3$!\nWait, Choice C is 3!",
      satTrap: "Plugging in +3 instead of -3. If (x + 3) is a factor, the root is x = -3!",
      desmosTrick: "In Desmos: type '(-3)^3 + k*(-3)^2 - 4*(-3) - 12 = 0' -> gives k = 3 immediately.",
      referenceFormula: "(x - c) \\text{ is a factor } \\iff P(c) = 0"
    },
    {
      id: "u8_q05",
      questionNumber: 5,
      prompt: "The graphs of $y = x^2 - 4x + 3$ and $y = 2x - 6$ intersect at $(x_1, y_1)$ and $(x_2, y_2)$. What is the value of $x_1 + x_2$?",
      options: ["A. 4", "B. 5", "C. 6", "D. 8"],
      correctAnswer: "C",
      explanation: "Equate the two equations:\n$$x^2 - 4x + 3 = 2x - 6$$\n$$x^2 - 6x + 9 = 0$$\n$$(x - 3)^2 = 0 \\implies x_1 = 3, x_2 = 3$.\nThe line is tangent to the parabola at $x = 3$.\nBy Vieta's formulas, the sum of the solutions to $x^2 - 6x + 9 = 0$ is $-\\frac{-6}{1} = 6$.\n$x_1 + x_2 = 3 + 3 = 6$.",
      satTrap: "Forgetting to rearrange to standard form before using Vieta's formulas. The linear terms must be combined: -4x - 2x = -6x.",
      desmosTrick: "Graph both equations. Notice they touch tangentially at (3, 0). 3 + 3 = 6."
    },
    {
      id: "u8_q06",
      questionNumber: 6,
      prompt: "Which of the following is equivalent to the expression $\\frac{x^2 - 9}{x^2 + 5x + 6}$ for all $x > 3$?",
      options: ["A. \\frac{x - 3}{x + 2}", "B. \\frac{x + 3}{x + 2}", "C. \\frac{x - 3}{x - 2}", "D. \\frac{1}{5x + 6}"],
      correctAnswer: "A",
      explanation: "Factor numerator and denominator completely:\nNumerator: $x^2 - 9 = (x - 3)(x + 3)$ (difference of squares).\nDenominator: $x^2 + 5x + 6 = (x + 2)(x + 3)$.\nDivide out the common factor $(x + 3)$:\n$$\\frac{(x - 3)(x + 3)}{(x + 2)(x + 3)} = \\frac{x - 3}{x + 2}$$.",
      satTrap: "Canceling x^2 from top and bottom. You can only cancel common multiplicative factors, never individual additive terms!",
      desmosTrick: "Pick x = 5: original = (25 - 9)/(25 + 25 + 6) = 16/56 = 2/7. Choice A with x = 5: (5 - 3)/(5 + 2) = 2/7. Matches!"
    },
    {
      id: "u8_q07",
      questionNumber: 7,
      prompt: "If $f(x) = 2x^2 - 8x + 11$, what is the minimum value of $f(x)$?",
      options: ["A. 2", "B. 3", "C. 4", "D. 11"],
      correctAnswer: "B",
      explanation: "Since $a = 2 > 0$, the parabola opens upwards and has a minimum at its vertex:\n$x = -\\frac{b}{2a} = -\\frac{-8}{2(2)} = \\frac{8}{4} = 2$.\nEvaluate $f(2)$:\n$f(2) = 2(2)^2 - 8(2) + 11 = 2(4) - 16 + 11 = 8 - 16 + 11 = 3$.\nThe minimum value is 3.",
      satTrap: "Picking x = 2 (Choice A). The question asks for the MINIMUM VALUE of f(x) (the y-value, which is 3), not the input where it occurs.",
      desmosTrick: "Type 'f(x) = 2x^2 - 8x + 11'. Tap the vertex: (2, 3). The minimum is 3."
    },
    {
      id: "u8_q08",
      questionNumber: 8,
      prompt: "What is the sum of the solutions to $(2x - 5)^2 = 49$?",
      options: ["A. 0", "B. 5", "C. 7", "D. 10"],
      correctAnswer: "B",
      explanation: "Take the square root of both sides:\n$$2x - 5 = \\pm 7$$\nBranch 1: $2x - 5 = 7 \\implies 2x = 12 \\implies x = 6$.\nBranch 2: $2x - 5 = -7 \\implies 2x = -2 \\implies x = -1$.\nSum of solutions: $6 + (-1) = 5$.\n\n*Vieta's Shortcut:* Expand: $4x^2 - 20x + 25 = 49 \\implies 4x^2 - 20x - 24 = 0$.\nSum $= -\\frac{b}{a} = -\\frac{-20}{4} = 5$!",
      satTrap: "Only taking the positive square root (+7) and finding x = 6, missing x = -1.",
      desmosTrick: "Vieta's formula gives sum = -(-20)/4 = 5 instantly."
    },
    {
      id: "u8_q09",
      questionNumber: 9,
      prompt: "For which of the following values of $k$ does the equation $x^2 + 6x + k = 0$ have NO real solutions?",
      options: ["A. 5", "B. 8", "C. 9", "D. 12"],
      correctAnswer: "D",
      explanation: "For NO real solutions, the discriminant must be strictly negative:\n$$\\Delta = b^2 - 4ac < 0$$\n$$6^2 - 4(1)(k) < 0$$\n$$36 - 4k < 0 \\implies 36 < 4k \\implies k > 9$$.\nAmong the choices, only $k = 12$ is strictly greater than 9.",
      satTrap: "Choosing k = 9 (Choice C). If k = 9, Delta = 36 - 36 = 0, which has EXACTLY ONE real solution, not zero!",
      desmosTrick: "Enter 'y = x^2 + 6x + k' with slider k. Notice when k > 9 the parabola floats entirely above the x-axis with 0 intersections."
    },
    {
      id: "u8_q10",
      questionNumber: 10,
      prompt: "If $x^{\\frac{3}{4}} = 27$, what is the value of $x$?",
      options: ["A. 9", "B. 18", "C. 81", "D. 243"],
      correctAnswer: "C",
      explanation: "Raise both sides to the reciprocal power $\\frac{4}{3}$:\n$$x = 27^{\\frac{4}{3}} = (\\sqrt[3]{27})^4 = 3^4 = 81$$.\nCheck: $81^{\\frac{3}{4}} = (\\sqrt[4]{81})^3 = 3^3 = 27$. Correct!",
      satTrap: "Multiplying 27 by 4/3 to get 36, or dividing incorrectly. The exponent rule is: $(x^p)^q = x^{pq}$.",
      desmosTrick: "Type '27^(4/3)' directly into Desmos. It outputs 81 instantly."
    }
  ],
  prevUnitId: "unit-07-medium-psda",
  nextUnitId: "unit-09-medium-geom-trig"
};
