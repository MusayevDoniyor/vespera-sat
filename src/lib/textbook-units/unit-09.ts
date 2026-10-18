import { KhanFullUnit } from "../khan-textbook-units";

export const UNIT_09_MEDIUM_GEOM_TRIG: KhanFullUnit = {
  id: "unit-09-medium-geom-trig",
  unitNumber: 9,
  title: "Unit 9: Medium: Geometry & Trigonometry",
  slug: "unit-09-medium-geom-trig",
  tier: "Medium",
  domain: "Geometry & Trigonometry",
  topicCode: "GEO-04",
  estimatedHours: "3.5 hours",
  description: "Circle equation completing the square, arc length and sector area with radians, trigonometric cofunction identities, special right triangles in multi-step composite figures, and 3D geometric similarity scaling.",
  overviewSummary: "Geometry and Trigonometry represents 15% of the Digital SAT Math section, but contains some of the quickest questions on the entire test once you know the exact formula sheets and algebraic shortcuts. At the Medium tier, you must master converting general circle equations into standard form and executing radian trigonometry effortlessly.",
  sections: [
    {
      id: "sec-u9-circle-completing-square",
      title: "1. The Circle Equation & Completing the Square",
      readTime: "9 min read",
      summary: "Converting expanded circle equations x^2 + y^2 + Dx + Ey + F = 0 into standard form (x - h)^2 + (y - k)^2 = r^2 in under 30 seconds.",
      diagramType: "circle-equation",
      contentMarkdown: `### The Standard Equation of a Circle
$$(x - h)^2 + (y - k)^2 = r^2$$
- Center: $(h, k)$ — remember the signs are **flipped**!
- Radius: $r = \\sqrt{r^2}$ — do NOT forget to take the square root of the constant!

#### The Complete the Square Algorithm:
Given: $x^2 + y^2 - 6x + 8y - 24 = 0$
1. Group $x$ and $y$ terms; move constant to the right:
   $$(x^2 - 6x) + (y^2 + 8y) = 24$$
2. Take half of each linear coefficient and square it:
   - For $x$: $\\left(\\frac{-6}{2}\\right)^2 = (-3)^2 = \\mathbf{9}$
   - For $y$: $\\left(\\frac{8}{2}\\right)^2 = (4)^2 = \\mathbf{16}$
3. Add these squares to **BOTH sides**:
   $$(x^2 - 6x + 9) + (y^2 + 8y + 16) = 24 + 9 + 16$$
4. Factor into binomial squares:
   $$(x - 3)^2 + (y + 4)^2 = 49$$
5. Extract properties:
   - Center: $(3, -4)$
   - Radius: $r = \\sqrt{49} = 7$

#### The 10-Second Shortcut Formula:
For $x^2 + y^2 + Dx + Ey + F = 0$:
$$h = -\\frac{D}{2}, \\quad k = -\\frac{E}{2}, \\quad r = \\sqrt{h^2 + k^2 - F}$$
Example above: $D = -6, E = 8, F = -24$.
$h = -(-6)/2 = 3$, $k = -(8)/2 = -4$.
$r = \\sqrt{3^2 + (-4)^2 - (-24)} = \\sqrt{9 + 16 + 24} = \\sqrt{49} = 7$!`,
      keyTakeaways: [
        "In (x - h)^2 + (y - k)^2 = r^2, center is (h, k) and radius is r.",
        "Shortcut: Center coordinates are -D/2 and -E/2.",
        "Radius is sqrt(h^2 + k^2 - F). Never forget to take the square root!"
      ],
      desmosExample: {
        title: "Desmos Circle Grapher",
        expression: "x^2 + y^2 - 6x + 8y - 24 = 0",
        tip: "Type the expanded equation directly. Desmos plots the full circle. Click the center (3, -4) and count to the edge to verify r = 7."
      }
    },
    {
      id: "sec-u9-arcs-sectors-radians",
      title: "2. Arcs, Sectors & Radians: The Proportionality Laws",
      readTime: "8 min read",
      summary: "Understand radians as arc length divided by radius, and calculate arc lengths and sector areas with simple formulas.",
      contentMarkdown: `### The Definition of a Radian
A radian is the angle subtended at the center of a circle by an arc equal in length to the radius:
$$\\text{Radians} = \\frac{\\text{Arc Length } s}{\\text{Radius } r} \\implies s = r\\theta$$
$$\\pi \\text{ radians} = 180^\\circ \\implies 2\\pi \\text{ radians} = 360^\\circ$$

#### The Radian Elegance:
When angle $\\theta$ is measured in **radians**, the formulas are strikingly simple:
- **Arc Length:** $s = r\\theta$
- **Sector Area:** $A = \\frac{1}{2}r^2\\theta$

#### The Degree Proportion Method:
If the angle is in degrees ($n^\\circ$):
- **Arc Length:** $s = \\left(\\frac{n^\\circ}{360^\\circ}\\right) \\cdot (2\\pi r)$
- **Sector Area:** $A = \\left(\\frac{n^\\circ}{360^\\circ}\\right) \\cdot (\\pi r^2)$

#### Conversion Invariant:
$$\\text{Degrees} \\to \\text{Radians}: \\quad \\text{multiply by } \\frac{\\pi}{180^\\circ}$$
$$\\text{Radians} \\to \\text{Degrees}: \\quad \\text{multiply by } \\frac{180^\\circ}{\\pi}$$`,
      keyTakeaways: [
        "Arc length s = r * theta when theta is in radians.",
        "Sector area A = (1/2) * r^2 * theta when theta is in radians.",
        "To convert radians to degrees, replace pi with 180 degrees."
      ]
    },
    {
      id: "sec-u9-cofunction-complementary",
      title: "3. The Complementary Angle Theorem: \\sin(A) = \\cos(B)",
      readTime: "7 min read",
      summary: "The single highest-yield trigonometry identity on the Digital SAT.",
      diagramType: "special-triangles-trig",
      contentMarkdown: `### The Cofunction Invariant
In any right triangle, the two acute angles $A$ and $B$ are complementary:
$$A + B = 90^\\circ \\quad \\text{or} \\quad A + B = \\frac{\\pi}{2} \\text{ radians}$$

Because the side opposite angle $A$ is the adjacent side of angle $B$:
$$\\sin(A) = \\frac{\\text{Opp}}{\\text{Hyp}} = \\cos(B)$$
$$\\sin(x) = \\cos(90^\\circ - x)$$

#### The Golden Rule:
Whenever the College Board gives you an equation of the form:
$$\\sin(\\text{Expression 1}) = \\cos(\\text{Expression 2})$$
You do **NOT** need a calculator! Simply sum the two expressions and set them equal to **$90^\\circ$** (or $\\frac{\\pi}{2}$):
$$\\mathbf{\\text{Expression 1} + \\text{Expression 2} = 90^\\circ}$$

#### Example:
> If $\\sin(3x - 15)^\\circ = \\cos(x + 25)^\\circ$, what is the value of $x$?
$$(3x - 15) + (x + 25) = 90$$
$$4x + 10 = 90 \\implies 4x = 80 \\implies x = 20$$`,
      keyTakeaways: [
        "sin(A) = cos(B) if and only if A + B = 90 degrees.",
        "In radians, A + B = pi / 2.",
        "Always add the two angle arguments to 90 degrees and solve for x linearly."
      ],
      desmosExample: {
        title: "Desmos Complementary Angle Linear Solve",
        expression: "(3x - 15) + (x + 25) = 90",
        tip: "Type the linear equation directly. Desmos draws a vertical line at x = 20."
      }
    },
    {
      id: "sec-u9-geometric-scaling",
      title: "4. Similarity & The Power Scaling Laws (k, k^2, k^3)",
      readTime: "8 min read",
      summary: "How side length ratios scale into surface area and volume ratios across similar figures.",
      diagramType: "formula-reference",
      contentMarkdown: `### The Universal Dimensional Scaling Law
If two geometric figures are **similar** with linear scale factor $k$:
$$\\frac{\\text{Length}_2}{\\text{Length}_1} = k$$

Then:
1. **Perimeters & Linear Dimensions scale by $k$:**
   $$\\frac{\\text{Perimeter}_2}{\\text{Perimeter}_1} = k$$
2. **Surface Areas & Base Areas scale by $k^2$:**
   $$\\frac{\\text{Area}_2}{\\text{Area}_1} = k^2$$
3. **Volumes & Capacities scale by $k^3$:**
   $$\\frac{\\text{Volume}_2}{\\text{Volume}_1} = k^3$$

#### Real SAT Exam Problem:
> Cylinder $A$ has surface area $50 \\text{ cm}^2$ and volume $12 \\text{ cm}^3$. Cylinder $B$ is similar to Cylinder $A$ and has surface area $200 \\text{ cm}^2$. What is the volume of Cylinder $B$?

**Solution:**
1. Ratio of areas: $\\frac{\\text{Area}_B}{\\text{Area}_A} = \\frac{200}{50} = 4 = k^2$.
2. Linear scale factor: $k = \\sqrt{4} = 2$.
3. Volume scaling factor: $k^3 = 2^3 = 8$.
4. $\\text{Volume}_B = 12 \\cdot 8 = \\mathbf{96 \\text{ cm}^3}$.`,
      keyTakeaways: [
        "Area ratio is the SQUARE of the linear ratio: k^2.",
        "Volume ratio is the CUBE of the linear ratio: k^3.",
        "To go from Area ratio to Volume ratio: first take the square root to get k, then cube it to get k^3!"
      ]
    }
  ],
  speedHacks: [
    {
      title: "Circle Center & Radius Shortcut",
      trigger: "Circle in expanded form x^2 + y^2 + Dx + Ey + F = 0",
      shortcut: "Center = (-D/2, -E/2); Radius = sqrt(h^2 + k^2 - F).",
      example: "x^2 + y^2 - 4x + 6y - 12 = 0 => Center = (2, -3); r = sqrt(4 + 9 - (-12)) = sqrt(25) = 5"
    },
    {
      title: "Complementary Trig 90-Degree Sum",
      trigger: "Equation where sin(expression) = cos(expression)",
      shortcut: "Set (Expression 1) + (Expression 2) = 90 degrees.",
      example: "sin(2x) = cos(3x) => 2x + 3x = 90 => 5x = 90 => x = 18"
    },
    {
      title: "Area to Volume Scaling Step",
      trigger: "Given area ratio of similar 3D figures, asked for volume",
      shortcut: "Find k = sqrt(Area2/Area1), then Volume2 = Volume1 * k^3.",
      example: "Area ratio = 9 => k = 3 => Volume ratio = 27"
    }
  ],
  practiceQuestions: [
    {
      id: "u9_q01",
      questionNumber: 1,
      prompt: "The equation of a circle in the $xy$-plane is $x^2 + y^2 + 8x - 10y - 8 = 0$. What is the radius of the circle?",
      options: ["A. 5", "B. 7", "C. 8", "D. 49"],
      correctAnswer: "B",
      explanation: "Use the circle shortcut:\n$h = -\\frac{D}{2} = -\\frac{8}{2} = -4$\n$k = -\\frac{E}{2} = -\\frac{-10}{2} = 5$\n$r = \\sqrt{h^2 + k^2 - F} = \\sqrt{(-4)^2 + 5^2 - (-8)} = \\sqrt{16 + 25 + 8} = \\sqrt{49} = 7$.",
      satTrap: "Forgetting to take the square root of 49 and picking 49 (Choice D). The radius is $r = 7$, while $r^2 = 49$.",
      desmosTrick: "Type the circle equation into Desmos. Tap the center (-4, 5) and the rightmost point (3, 5). Distance is 3 - (-4) = 7.",
      referenceFormula: "(x - h)^2 + (y - k)^2 = r^2"
    },
    {
      id: "u9_q02",
      questionNumber: 2,
      prompt: "In a right triangle $ABC$ with right angle at $C$, $\\sin(A) = \\frac{5}{13}$. What is the value of $\\cos(B)$?",
      options: ["A. 5/13", "B. 12/13", "C. 5/12", "D. 13/5"],
      correctAnswer: "A",
      explanation: "In any right triangle with right angle at $C$, angles $A$ and $B$ are complementary acute angles ($A + B = 90^\\circ$).\nBy the Complementary Angle Theorem, $\\cos(B) = \\sin(A)$.\nTherefore, $\\cos(B) = \\frac{5}{13}$.",
      satTrap: "Calculating $\\cos(A) = 12/13$ and picking Choice B. The question asks for $\\cos(B)$, which identically equals $\\sin(A) = 5/13$!",
      referenceFormula: "\\sin(A) = \\cos(90^\\circ - A) = \\cos(B)"
    },
    {
      id: "u9_q03",
      questionNumber: 3,
      prompt: "A circle has a radius of 12 inches. A central angle $\\theta$ intercepts an arc of length $8\\pi$ inches. What is the measure of angle $\\theta$, in radians?",
      options: ["A. \\frac{\\pi}{3}", "B. \\frac{2\\pi}{3}", "C. \\frac{3\\pi}{4}", "D. \\frac{4\\pi}{3}"],
      correctAnswer: "B",
      explanation: "Use the radian arc length formula: $s = r\\theta$.\n$$\\theta = \\frac{s}{r} = \\frac{8\\pi}{12} = \\frac{2\\pi}{3} \\text{ radians}$$.",
      satTrap: "Dividing radius by arc length ($12 / 8\\pi$), or confusing radians with degrees. The formula is simply $\\theta = s / r$.",
      desmosTrick: "Type '8 * pi / 12' in Desmos, which equals (2/3)*pi."
    },
    {
      id: "u9_q04",
      questionNumber: 4,
      prompt: "In the $xy$-plane, the center of a circle has coordinates $(3, -2)$, and the point $(7, 1)$ lies on the circle. What is the equation of the circle?",
      options: [
        "A. (x - 3)^2 + (y + 2)^2 = 5",
        "B. (x + 3)^2 + (y - 2)^2 = 25",
        "C. (x - 3)^2 + (y + 2)^2 = 25",
        "D. (x - 3)^2 + (y + 2)^2 = 16"
      ],
      correctAnswer: "C",
      explanation: "1. The radius is the distance from center $(3, -2)$ to point $(7, 1)$:\n$$r = \\sqrt{(7 - 3)^2 + (1 - (-2))^2} = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$$.\n2. The standard circle equation with center $(h, k) = (3, -2)$ and radius $r = 5$ is:\n$$(x - 3)^2 + (y - (-2))^2 = 5^2 \\implies (x - 3)^2 + (y + 2)^2 = 25$$.",
      satTrap: "Choice A puts $r = 5$ on the right side instead of $r^2 = 25$. Choice B flips the signs of $h$ and $k$.",
      referenceFormula: "(x - h)^2 + (y - k)^2 = r^2"
    },
    {
      id: "u9_q05",
      questionNumber: 5,
      prompt: "If $\\sin(5x - 28)^\\circ = \\cos(3x + 6)^\\circ$, what is the value of $x$?",
      options: ["A. 14", "B. 16", "C. 18", "D. 22"],
      correctAnswer: "A",
      explanation: "By the Complementary Angle Theorem, the two angles must sum to $90^\\circ$:\n$$(5x - 28) + (3x + 6) = 90$$\n$$8x - 22 = 90$$\n$$8x = 112 \\implies x = 14$$.",
      satTrap: "Setting them equal to each other ($5x - 28 = 3x + 6$). Sine equals cosine only when the angles sum to 90 degrees, NOT when they are equal (unless both are 45 degrees)!",
      desmosTrick: "Type '(5x - 28) + (3x + 6) = 90' into Desmos. It graphs a vertical line at x = 14."
    },
    {
      id: "u9_q06",
      questionNumber: 6,
      prompt: "Two similar rectangular prisms, $P$ and $Q$, have surface areas of $32 \\text{ cm}^2$ and $72 \\text{ cm}^2$, respectively. If the volume of prism $P$ is $24 \\text{ cm}^3$, what is the volume, in $\\text{cm}^3$, of prism $Q$?",
      options: ["A. 54", "B. 81", "C. 96", "D. 108"],
      correctAnswer: "B",
      explanation: "1. Ratio of surface areas: $\\frac{\\text{Area}_Q}{\\text{Area}_P} = \\frac{72}{32} = \\frac{9}{4} = k^2$.\n2. Linear scale factor: $k = \\sqrt{\\frac{9}{4}} = \\frac{3}{2}$.\n3. Ratio of volumes: $k^3 = \\left(\\frac{3}{2}\\right)^3 = \\frac{27}{8}$.\n4. Volume of prism $Q$: $24 \\cdot \\frac{27}{8} = 3 \\cdot 27 = 81 \\text{ cm}^3$.",
      satTrap: "Multiplying volume by the area ratio 9/4 to get 54 (Choice A). You MUST use the cube of the linear factor: $k^3 = 27/8$!",
      desmosTrick: "Type '24 * (sqrt(72/32))^3' into Desmos. Outputs 81 directly."
    },
    {
      id: "u9_q07",
      questionNumber: 7,
      prompt: "In a circle with radius 6, a sector has an area of $9\\pi$. What is the arc length of the sector?",
      options: ["A. 2\\pi", "B. 3\\pi", "C. 4.5\\pi", "D. 6\\pi"],
      correctAnswer: "B",
      explanation: "1. Total circle area: $A_{\\text{total}} = \\pi r^2 = \\pi (6^2) = 36\\pi$.\n2. Fraction of the circle represented by the sector: $\\frac{9\\pi}{36\\pi} = \\frac{1}{4}$.\n3. Total circumference: $C = 2\\pi r = 2\\pi (6) = 12\\pi$.\n4. Sector arc length: $\\frac{1}{4} \\cdot 12\\pi = 3\\pi$.",
      satTrap: "Dividing sector area by radius directly without accounting for the $1/2$ factor in $A = \\frac{1}{2}rs$. Note: $A = \\frac{1}{2}rs \\implies 9\\pi = \\frac{1}{2}(6)s \\implies 9\\pi = 3s \\implies s = 3\\pi$!",
      referenceFormula: "A_{\\text{sector}} = \\frac{1}{2} r s"
    },
    {
      id: "u9_q08",
      questionNumber: 8,
      prompt: "In a $30^\\circ-60^\\circ-90^\\circ$ triangle, the length of the side opposite the $60^\\circ$ angle is $15$. What is the length of the hypotenuse?",
      options: ["A. 10", "B. 10\\sqrt{3}", "C. 15\\sqrt{3}", "D. 30"],
      correctAnswer: "B",
      explanation: "In a $30^\\circ-60^\\circ-90^\\circ$ triangle, sides are in ratio $x : x\\sqrt{3} : 2x$.\nHere, the side opposite $60^\\circ$ is $x\\sqrt{3} = 15$.\n1. Find the short leg $x$: $x = \\frac{15}{\\sqrt{3}} = \\frac{15\\sqrt{3}}{3} = 5\\sqrt{3}$.\n2. The hypotenuse is $2x$: $2(5\\sqrt{3}) = 10\\sqrt{3}$.",
      satTrap: "Multiplying 15 by $\\sqrt{3}$ to get $15\\sqrt{3}$. The side opposite $60^\\circ$ ALREADY contains the $\\sqrt{3}$ factor, so you must DIVIDE by $\\sqrt{3}$ to find the short leg!",
      referenceFormula: "\\text{Sides: } x, \\; x\\sqrt{3}, \\; 2x"
    },
    {
      id: "u9_q09",
      questionNumber: 9,
      prompt: "A line is tangent to a circle at the point $(4, 3)$. If the center of the circle is at the origin $(0, 0)$, what is the slope of the tangent line?",
      options: ["A. -4/3", "B. -3/4", "C. 3/4", "D. 4/3"],
      correctAnswer: "A",
      explanation: "1. The radius connects the center $(0, 0)$ to the point of tangency $(4, 3)$.\n2. Slope of the radius: $m_{\\text{radius}} = \\frac{3 - 0}{4 - 0} = \\frac{3}{4}$.\n3. Fundamental Theorem: A tangent line to a circle is **strictly perpendicular** to the radius at the point of tangency.\n4. Therefore, the slope of the tangent line is the negative reciprocal: $m_{\\text{tangent}} = -\\frac{1}{3/4} = -\\frac{4}{3}$.",
      satTrap: "Choosing 3/4 (slope of the radius) or -3/4. The negative reciprocal of 3/4 is -4/3.",
      referenceFormula: "m_{\\text{tangent}} = -\\frac{1}{m_{\\text{radius}}}"
    },
    {
      id: "u9_q10",
      questionNumber: 10,
      prompt: "What is the area of a circle whose circumference is $16\\pi$?",
      options: ["A. 8\\pi", "B. 16\\pi", "C. 64\\pi", "D. 256\\pi"],
      correctAnswer: "C",
      explanation: "1. Circumference formula: $C = 2\\pi r = 16\\pi \\implies r = 8$.\n2. Area formula: $A = \\pi r^2 = \\pi (8^2) = 64\\pi$.",
      satTrap: "Squaring the circumference or using $r = 16$ to get $256\\pi$ (Choice D). Remember $C = 2\\pi r$, so $r = 16/2 = 8$.",
      referenceFormula: "C = 2\\pi r, \\quad A = \\pi r^2"
    }
  ],
  prevUnitId: "unit-08-medium-adv-math",
  nextUnitId: "unit-10-advanced-algebra"
};
