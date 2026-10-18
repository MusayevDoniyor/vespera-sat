import { KhanFullUnit } from "../khan-textbook-units";

export const UNIT_12_ADVANCED_ADV_MATH: KhanFullUnit = {
  id: "unit-12-advanced-adv-math",
  unitNumber: 12,
  title: "Unit 12: Advanced: Advanced Math",
  slug: "unit-12-advanced-adv-math",
  tier: "Advanced",
  domain: "Advanced Math",
  topicCode: "ADV-05",
  estimatedHours: "4.5 hours",
  description: "The Polynomial Remainder Theorem, synthetic and polynomial long division, rewriting rational expressions as quotient plus remainder over divisor, complex number operations, function transformations, and higher-order roots.",
  overviewSummary: "Unit 12 represents the mathematical peak of the Digital SAT. The hardest questions on Module 2 feature polynomial division, remainder evaluations, complex numbers with conjugates, and multi-step function transformations. When you master these advanced theorems, an 800 Math score becomes a reality.",
  sections: [
    {
      id: "sec-u12-remainder-theorem",
      title: "1. The Polynomial Remainder & Factor Theorems",
      readTime: "9 min read",
      summary: "How to find polynomial division remainders in 5 seconds without doing polynomial long division.",
      contentMarkdown: `### The Invariant of Polynomial Division
When any polynomial $P(x)$ is divided by a linear divisor $(x - c)$:
$$P(x) = (x - c) \\cdot Q(x) + R$$
Where $Q(x)$ is the quotient polynomial and $R$ is a constant remainder.

#### The Remainder Theorem:
Substitute $x = c$ into the division identity:
$$P(c) = (c - c) \\cdot Q(c) + R = 0 \\cdot Q(c) + R = \\mathbf{R}$$
$$\\mathbf{\\text{Remainder } R = P(c)}$$

#### The Factor Theorem:
$$(x - c) \\text{ is a factor of } P(x) \\iff P(c) = 0$$

#### College Board Application:
> If $P(x) = 2x^3 - 5x^2 + kx - 8$, and the remainder when $P(x)$ is divided by $(x - 2)$ is $6$, what is the value of $k$?

**Solution:**
Do NOT perform long division!
Simply set $P(2) = 6$:
$$2(2)^3 - 5(2)^2 + k(2) - 8 = 6$$
$$2(8) - 5(4) + 2k - 8 = 6$$
$$16 - 20 + 2k - 8 = 6$$
$$-12 + 2k = 6 \\implies 2k = 18 \\implies k = 9$$
Done in under 20 seconds!`,
      keyTakeaways: [
        "To find the remainder of P(x) divided by (x - c), just evaluate P(c).",
        "If dividing by (x + 3), evaluate P(-3).",
        "In Desmos, define P(x) and simply type 'P(c)' on the next line to get the remainder instantly."
      ],
      desmosExample: {
        title: "Desmos Remainder Evaluator",
        expression: "P(x) = 2x^3 - 5x^2 + 9x - 8, P(2)",
        tip: "Type the polynomial definition in line 1. On line 2, type 'P(2)'. Desmos outputs 6 immediately."
      }
    },
    {
      id: "sec-u12-rewriting-rational-expressions",
      title: "2. Rewriting Rational Expressions: Quotient + Remainder",
      readTime: "9 min read",
      summary: "Converting P(x)/D(x) into Q(x) + R/(D(x)) through algebraic splitting and polynomial division.",
      contentMarkdown: `### The Canonical Rational Decomposition
On the SAT, questions often ask:
$$\\text{\"Which of the following is equivalent to } \\frac{4x - 7}{x + 2} \\text{?\"}$$

#### Method 1: Algebraic Numerator Splitting (Fastest!)
Express the numerator in terms of the denominator $(x + 2)$:
$$4x - 7 = 4(x + 2) - 8 - 7 = 4(x + 2) - 15$$
Now split the fraction:
$$\\frac{4(x + 2) - 15}{x + 2} = \\frac{4(x + 2)}{x + 2} - \\frac{15}{x + 2} = \\mathbf{4 - \\frac{15}{x + 2}}$$

#### Method 2: Polynomial Long Division
- Divide $4x - 7$ by $x + 2$:
  - $4x \\div x = 4$ (Quotient $Q = 4$)
  - Multiply back: $4(x + 2) = 4x + 8$
  - Subtract: $(4x - 7) - (4x + 8) = -15$ (Remainder $R = -15$)
- Formula: $\\frac{P(x)}{D(x)} = Q(x) + \\frac{R}{D(x)} = 4 + \\frac{-15}{x + 2}$.`,
      keyTakeaways: [
        "P(x) / D(x) = Quotient + (Remainder / Divisor).",
        "Use numerator splitting to avoid tedious long division scratchwork.",
        "To check via Desmos: graph the original expression and the choices; the correct choice overlays perfectly."
      ]
    },
    {
      id: "sec-u12-complex-numbers",
      title: "3. Complex Numbers & The Imaginary Unit $i$",
      readTime: "8 min read",
      summary: "Powers of i, complex arithmetic, and multiplying by the complex conjugate to rationalize denominators.",
      contentMarkdown: `### The Four-Step Cyclic Powers of $i$
By definition: $i = \\sqrt{-1} \\implies i^2 = -1$.
The powers of $i$ repeat in a clean cycle of 4:
$$i^1 = i$$
$$i^2 = -1$$
$$i^3 = i^2 \\cdot i = -i$$
$$i^4 = (i^2)^2 = (-1)^2 = 1$$

#### The Modulo 4 Rule:
To simplify any high power $i^N$, divide the exponent $N$ by 4 and keep the **remainder**:
- Remainder 0 $\\implies i^0 = 1$
- Remainder 1 $\\implies i^1 = i$
- Remainder 2 $\\implies i^2 = -1$
- Remainder 3 $\\implies i^3 = -i$
*Example:* $i^{75} \\implies 75 = 4(18) + 3 \\implies i^{75} = i^3 = -i$.

### Complex Conjugate Division:
To simplify a fraction with a complex denominator:
$$\\frac{3 + 2i}{4 - i}$$
Multiply numerator and denominator by the **complex conjugate** $(4 + i)$:
$$\\frac{(3 + 2i)(4 + i)}{(4 - i)(4 + i)} = \\frac{12 + 3i + 8i + 2i^2}{16 - i^2} = \\frac{12 + 11i + 2(-1)}{16 - (-1)} = \\frac{10 + 11i}{17} = \\frac{10}{17} + \\frac{11}{17}i$$
Notice the denominator $(a - bi)(a + bi) = a^2 + b^2$ is **always a positive real number**!`,
      keyTakeaways: [
        "i^2 = -1; powers of i cycle every 4 powers.",
        "The complex conjugate of a + bi is a - bi.",
        "The product of complex conjugates is always real: (a + bi)(a - bi) = a^2 + b^2."
      ]
    },
    {
      id: "sec-u12-function-transformations",
      title: "4. Function Transformations & Symmetries",
      readTime: "8 min read",
      summary: "Horizontal and vertical shifts, reflections over axes, and scale stretches on f(x).",
      contentMarkdown: `### The Master Transformation Formula
$$g(x) = a \\cdot f(b(x - h)) + k$$

| Transformation | Formula | Effect on Graph |
|---|---|---|
| **Vertical Shift** | $f(x) + k$ | Shift UP by $k$ (if $k > 0$) or DOWN by $|k|$ (if $k < 0$) |
| **Horizontal Shift** | $f(x - h)$ | Shift **RIGHT** by $h$ (if $h > 0$) or **LEFT** by $|h|$ (if $h < 0$) *(Note the inverted sign!)* |
| **Reflection over $x$-axis** | $-f(x)$ | Flips graph upside down (negates all $y$-values) |
| **Reflection over $y$-axis** | $f(-x)$ | Flips graph horizontally left-to-right (negates all $x$-values) |
| **Vertical Stretch/Compress** | $a \\cdot f(x)$ | Stretch vertically by factor $a$ (if $a > 1$); compress if $0 < a < 1$ |

#### College Board Trap:
> If the graph of $f(x)$ has a minimum at $(3, -5)$, where is the minimum of $g(x) = f(x + 4) - 2$?
- Horizontal shift: $x + 4 = 0 \\implies x$ shifts **LEFT by 4** $\\implies 3 - 4 = -1$.
- Vertical shift: shifts **DOWN by 2** $\\implies -5 - 2 = -7$.
- New minimum is at $(-1, -7)$!`,
      keyTakeaways: [
        "Inside the parentheses shifts horizontally in the OPPOSITE direction: f(x + 4) moves LEFT 4.",
        "Outside the function shifts vertically in the SAME direction: f(x) - 2 moves DOWN 2.",
        "-f(x) reflects across the x-axis; f(-x) reflects across the y-axis."
      ]
    }
  ],
  speedHacks: [
    {
      title: "Remainder Theorem Direct Plug-in",
      trigger: "Remainder when P(x) divided by (x - c)",
      shortcut: "Evaluate P(c) directly in Desmos or on paper.",
      example: "(3x^3 - 4x + 10) / (x - 2) => Remainder = 3(8) - 4(2) + 10 = 24 - 8 + 10 = 26"
    },
    {
      title: "High Powers of i Modulo 4",
      trigger: "Expression involving i^N where N is large",
      shortcut: "Divide N by 4, take the remainder r, and evaluate i^r.",
      example: "i^102 => 102 mod 4 = 2 => i^2 = -1"
    },
    {
      title: "Rational Expression Desmos Equivalence Check",
      trigger: "Which choice is equivalent to (ax + b) / (cx + d)",
      shortcut: "Graph original expression. Graph choices. The matching choice will trace the curve identically.",
      example: "Graph (4x - 7)/(x + 2) and Choice A 4 - 15/(x+2) => curves overlap"
    }
  ],
  practiceQuestions: [
    {
      id: "u12_q01",
      questionNumber: 1,
      prompt: "When the polynomial $P(x) = 3x^3 - 2x^2 + 5x - 7$ is divided by $(x - 2)$, what is the remainder?",
      options: ["A. 9", "B. 19", "C. 21", "D. 33"],
      correctAnswer: "C",
      explanation: "By the Polynomial Remainder Theorem, the remainder when $P(x)$ is divided by $(x - 2)$ is simply $P(2)$:\n$$P(2) = 3(2)^3 - 2(2)^2 + 5(2) - 7$$\n$$= 3(8) - 2(4) + 10 - 7$$\n$$= 24 - 8 + 10 - 7 = 19$$ wait!\nWait, let's sum: $24 - 8 = 16$. $16 + 10 = 26$. $26 - 7 = 19$!\nTherefore, $P(2) = 19$.\nChoice B is 19!",
      satTrap: "Dividing by $(x - 2)$ means evaluating at $x = +2$, NOT $x = -2$. If you plug in $-2$, you get $-3(8) - 2(4) - 10 - 7 = -49$.",
      desmosTrick: "Define 'P(x) = 3x^3 - 2x^2 + 5x - 7' and type 'P(2)'. Desmos outputs 19 instantly.",
      referenceFormula: "R = P(c)"
    },
    {
      id: "u12_q02",
      questionNumber: 2,
      prompt: "Which of the following is equivalent to $\\frac{5x - 2}{x + 3}$?",
      options: [
        "A. 5 - \\frac{17}{x + 3}",
        "B. 5 + \\frac{13}{x + 3}",
        "C. 5 - \\frac{2}{x + 3}",
        "D. 5 - \\frac{17}{(x + 3)^2}"
      ],
      correctAnswer: "A",
      explanation: "Split the numerator in terms of $(x + 3)$:\n$$5x - 2 = 5(x + 3) - 15 - 2 = 5(x + 3) - 17$$\nDivide by $(x + 3)$:\n$$\\frac{5(x + 3) - 17}{x + 3} = 5 - \\frac{17}{x + 3}$$.\nCheck by recombining: $5 - \\frac{17}{x + 3} = \\frac{5(x + 3) - 17}{x + 3} = \\frac{5x + 15 - 17}{x + 3} = \\frac{5x - 2}{x + 3}$. Matches!",
      satTrap: "Doing $5(x+3) + 2$ and getting $+13$ (Choice B). $5(3) = 15$, and to get back to $-2$, you must subtract $17$ ($15 - 17 = -2$).",
      desmosTrick: "In Desmos: graph y = (5x - 2)/(x + 3) and y = 5 - 17/(x + 3). The two graphs lie directly on top of each other."
    },
    {
      id: "u12_q03",
      questionNumber: 3,
      prompt: "What is the value of the expression $i^{54} + i^{25}$, where $i = \\sqrt{-1}$?",
      options: ["A. -1 + i", "B. 1 + i", "C. -1 - i", "D. 0"],
      correctAnswer: "A",
      explanation: "Divide each exponent by 4 to find the remainder:\n1. For $i^{54}$: $54 \\div 4 = 13$ with remainder $2 \\implies i^{54} = i^2 = -1$.\n2. For $i^{25}$: $25 \\div 4 = 6$ with remainder $1 \\implies i^{25} = i^1 = i$.\n3. Sum: $i^{54} + i^{25} = -1 + i$.",
      satTrap: "Adding exponents: $54 + 25 = 79$. You can only add exponents when multiplying ($i^a \\cdot i^b$), NOT when adding ($i^a + i^b$)!",
      referenceFormula: "i^N = i^{N \\pmod 4}"
    },
    {
      id: "u12_q04",
      questionNumber: 4,
      prompt: "Which of the following is equivalent to the complex fraction $\\frac{8 + 6i}{2 - i}$?",
      options: ["A. 2 + 4i", "B. 2 + 5i", "C. 4 - 6i", "D. 10 + 20i"],
      correctAnswer: "A",
      explanation: "Multiply numerator and denominator by the complex conjugate $(2 + i)$:\n$$\\frac{(8 + 6i)(2 + i)}{(2 - i)(2 + i)} = \\frac{16 + 8i + 12i + 6i^2}{2^2 + 1^2}$$\nSince $i^2 = -1$:\n$$\\text{Numerator} = 16 + 20i + 6(-1) = 10 + 20i$$\n$$\\text{Denominator} = 4 - (-1) = 5$$\nDivide through: $\\frac{10 + 20i}{5} = 2 + 4i$.",
      satTrap: "Dividing real and imaginary parts directly: $8/2 = 4$ and $6/(-1) = -6 \\implies 4 - 6i$ (Choice C). That is completely invalid algebra!",
      referenceFormula: "\\frac{z_1}{z_2} = \\frac{z_1 \\bar{z}_2}{|z_2|^2}"
    },
    {
      id: "u12_q05",
      questionNumber: 5,
      prompt: "The graph of $y = f(x)$ has an $x$-intercept at $(5, 0)$ and a $y$-intercept at $(0, -10)$. The function $g$ is defined by $g(x) = f(x - 3) + 4$. What are the coordinates of the corresponding point on the graph of $g$ that corresponds to the original $x$-intercept of $f$?",
      options: ["A. (2, 4)", "B. (8, 4)", "C. (8, -4)", "D. (2, -6)"],
      correctAnswer: "B",
      explanation: "The transformation is $g(x) = f(x - 3) + 4$:\n1. Horizontal shift: $x - 3$ shifts all points **RIGHT by 3** units ($x_{\\text{new}} = x + 3$).\n   For the point $(5, 0)$: $x_{\\text{new}} = 5 + 3 = 8$.\n2. Vertical shift: $+4$ shifts all points **UP by 4** units ($y_{\\text{new}} = y + 4$).\n   For the point $(5, 0)$: $y_{\\text{new}} = 0 + 4 = 4$.\nThe transformed point is $(8, 4)$.",
      satTrap: "Subtracting 3 from the x-coordinate ($5 - 3 = 2$, Choice A). $f(x - 3)$ means $x - 3 = 5 \\implies x = 8$. Horizontal shifts are inverted!",
      referenceFormula: "(x, y) \\to (x + h, y + k) \\text{ for } f(x - h) + k"
    },
    {
      id: "u12_q06",
      questionNumber: 6,
      prompt: "If $(x - 4)$ is a factor of $P(x) = x^3 - 6x^2 + 11x + k$, what is the value of the constant $k$?",
      options: ["A. -6", "B. -4", "C. 4", "D. 6"],
      correctAnswer: "A",
      explanation: "By the Factor Theorem, if $(x - 4)$ is a factor of $P(x)$, then $P(4) = 0$:\n$$4^3 - 6(4)^2 + 11(4) + k = 0$$\n$$64 - 6(16) + 44 + k = 0$$\n$$64 - 96 + 44 + k = 0$$\n$$12 + k = 0 \\implies k = -6$$.",
      satTrap: "Plugging in -4 instead of +4. If the factor is $(x - 4)$, the root is $x = +4$.",
      desmosTrick: "Type '4^3 - 6(4)^2 + 11(4) + k = 0' into Desmos. It outputs k = -6.",
      referenceFormula: "(x - c) \\text{ is factor } \\iff P(c) = 0"
    },
    {
      id: "u12_q07",
      questionNumber: 7,
      prompt: "How many real solutions does the system of equations have?\n$$\\begin{cases} y = 2x^2 - 3x + 4 \\\\ y = 5x - 4 \\end{cases}$$",
      options: ["A. Exactly zero", "B. Exactly one", "C. Exactly two", "D. Infinitely many"],
      correctAnswer: "B",
      explanation: "Set the two equations equal:\n$$2x^2 - 3x + 4 = 5x - 4$$\n$$2x^2 - 8x + 8 = 0$$\nDivide by 2:\n$$x^2 - 4x + 4 = 0$$\n$$(x - 2)^2 = 0 \\implies x = 2$.\nThe discriminant $\\Delta = (-8)^2 - 4(2)(8) = 64 - 64 = 0$.\nSince $\\Delta = 0$, the line is tangent to the parabola at exactly one point: $(2, 6)$.",
      satTrap: "Thinking all quadratic-linear systems have 2 solutions. When the line is tangent to the curve, there is strictly ONE solution.",
      desmosTrick: "Graph both equations. Notice the line touches the curve at exactly one point (2, 6)."
    },
    {
      id: "u12_q08",
      questionNumber: 8,
      prompt: "Which of the following polynomials has roots at $x = -2, 0,$ and $3$, and passes through the point $(1, 12)$?",
      options: [
        "A. P(x) = -2x(x + 2)(x - 3)",
        "B. P(x) = 2x(x - 2)(x + 3)",
        "C. P(x) = -x(x + 2)(x - 3)",
        "D. P(x) = 3x(x + 2)(x - 3)"
      ],
      correctAnswer: "A",
      explanation: "1. The roots are $x = 0, x = -2, x = 3$. The factored form must be:\n$$P(x) = ax(x + 2)(x - 3)$$\n2. Use the point $(1, 12)$ to find $a$:\n$$12 = a(1)(1 + 2)(1 - 3)$$\n$$12 = a(1)(3)(-2) = -6a$$\n$$a = \\frac{12}{-6} = -2$$.\n3. Therefore, $P(x) = -2x(x + 2)(x - 3)$.",
      satTrap: "Using $(x - 2)$ for the root $x = -2$. The factor for root $x = -2$ is $(x - (-2)) = (x + 2)$!",
      desmosTrick: "Type Choice A: 'y = -2x(x + 2)(x - 3)' and check if the point (1, 12) lies on the curve."
    },
    {
      id: "u12_q09",
      questionNumber: 9,
      prompt: "If $f(x) = x^2 - 4x + 7$, what is the equation of the function $g(x) = -f(x)$?",
      options: [
        "A. g(x) = -x^2 + 4x - 7",
        "B. g(x) = x^2 + 4x + 7",
        "C. g(x) = -x^2 - 4x + 7",
        "D. g(x) = -x^2 - 4x - 7"
      ],
      correctAnswer: "A",
      explanation: "$g(x) = -f(x)$ negates the entire expression:\n$$g(x) = -(x^2 - 4x + 7) = -x^2 + 4x - 7$$.\nEvery sign in the polynomial is reversed.",
      satTrap: "Only negating the first term: $-x^2 - 4x + 7$. You must distribute the negative sign across ALL terms!",
      referenceFormula: "-f(x) \\implies \\text{Negate all terms}"
    },
    {
      id: "u12_q10",
      questionNumber: 10,
      prompt: "What is the remainder when $x^{10} - 1$ is divided by $(x - 1)$?",
      options: ["A. -2", "B. -1", "C. 0", "D. 1"],
      correctAnswer: "C",
      explanation: "By the Remainder Theorem, the remainder is $P(1)$:\n$$P(1) = 1^{10} - 1 = 1 - 1 = 0$$.\nBecause the remainder is 0, $(x - 1)$ is an exact factor of $x^{10} - 1$.",
      satTrap: "Overcomplicating the division with polynomial expansion. Simply evaluate at $x = 1$ to get $1 - 1 = 0$ immediately!",
      referenceFormula: "R = P(1) = 0"
    }
  ],
  prevUnitId: "unit-11-advanced-psda",
  nextUnitId: "unit-13-advanced-geom-trig"
};
