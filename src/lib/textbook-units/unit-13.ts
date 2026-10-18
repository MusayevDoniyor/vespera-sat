import { KhanFullUnit } from "../khan-textbook-units";

export const UNIT_13_ADVANCED_GEOM_TRIG: KhanFullUnit = {
  id: "unit-13-advanced-geom-trig",
  unitNumber: 13,
  title: "Unit 13: Advanced: Geometry & Trigonometry",
  slug: "unit-13-advanced-geom-trig",
  tier: "Advanced",
  domain: "Geometry & Trigonometry",
  topicCode: "GEO-03",
  estimatedHours: "4.5 hours",
  description: "Circles tangent to lines and coordinate axes, inscribed angle theorems, radian trigonometry and the unit circle coordinates, 3D composite solids, and coordinate geometry proofs.",
  overviewSummary: "Unit 13 represents the capstone of the Digital SAT Math curriculum. Questions at this level combine coordinate geometry, circular angle theorems, trigonometric symmetries across all four quadrants, and 3D spatial reasoning. Mastering these principles guarantees complete confidence on the toughest Module 2 problems.",
  sections: [
    {
      id: "sec-u13-circle-tangency",
      title: "1. Circles Tangent to Lines & Coordinate Axes",
      readTime: "9 min read",
      summary: "Exploiting tangency properties to find centers, radii, and tangent line equations without complex algebra.",
      diagramType: "circle-equation",
      contentMarkdown: `### The Tangency Radius Invariant
When a circle with center $(h, k)$ and radius $r$ is tangent to a line:
$$\\mathbf{\\text{The radius is perpendicular to the tangent line at the point of tangency.}}$$

#### Coordinate Axis Tangency Rules:
1. **Circle tangent to the $x$-axis ($y = 0$):**
   - The vertical distance from center $(h, k)$ to the $x$-axis is $|k|$.
   - Therefore: $\\mathbf{r = |k|}$.
   - The point of tangency is $(h, 0)$.
2. **Circle tangent to the $y$-axis ($x = 0$):**
   - The horizontal distance from center $(h, k)$ to the $y$-axis is $|h|$.
   - Therefore: $\\mathbf{r = |h|}$.
   - The point of tangency is $(0, k)$.
3. **Circle tangent to BOTH axes in Quadrant I:**
   - Center is $(r, r)$.
   - Equation: $(x - r)^2 + (y - r)^2 = r^2$.

#### Example Problem:
> A circle with radius 5 is tangent to the line $y = 3$ and has its center at $(4, k)$, where $k > 3$. What is the value of $k$?
- Since the line is horizontal ($y = 3$), the distance from the center $(4, k)$ to the line is $k - 3$.
- This distance must equal the radius: $k - 3 = 5 \\implies k = 8$!`,
      keyTakeaways: [
        "If tangent to the x-axis, radius r = |k|.",
        "If tangent to the y-axis, radius r = |h|.",
        "Radius is always strictly perpendicular to any tangent line."
      ],
      desmosExample: {
        title: "Desmos Tangent Circle",
        expression: "(x - 4)^2 + (y - 8)^2 = 25, y = 3",
        tip: "Type the circle and the line y = 3. Notice the circle grazes the line at exactly one point (4, 3)."
      }
    },
    {
      id: "sec-u13-inscribed-angles",
      title: "2. The Inscribed Angle & Thales's Theorems",
      readTime: "9 min read",
      summary: "Understanding the 2:1 relationship between central and inscribed angles, and why right angles always inscribed in semicircles.",
      contentMarkdown: `### The Inscribed Angle Theorem
An angle $\\angle ABC$ whose vertex $B$ lies on the circle and whose sides are chords is an **inscribed angle**.

$$\\mathbf{\\text{Inscribed Angle} = \\frac{1}{2} \\cdot (\\text{Central Angle}) = \\frac{1}{2} \\cdot (\\text{Intercepted Arc})}$$

#### Two Profound Corollaries:
1. **Angles Subtending the Same Arc:**
   - Any two inscribed angles that intercept the exact same arc or chord are **strictly equal**!
2. **Thales's Theorem (Angle Inscribed in a Semicircle):**
   - If an inscribed angle intercepts a **diameter** (an arc of $180^\\circ$), the angle is:
     $$\\theta = \\frac{1}{2}(180^\\circ) = \\mathbf{90^\\circ}$$
   - **SAT Key Takeaway:** Any triangle inscribed in a circle with one side as the diameter is **GUARANTEED to be a right triangle**! The diameter is the hypotenuse!

#### Cyclic Quadrilateral Theorem:
If a four-sided polygon is inscribed in a circle, its **opposite angles sum to $180^\\circ$**:
$$\\angle A + \\angle C = 180^\\circ, \\quad \\angle B + \\angle D = 180^\\circ$$`,
      keyTakeaways: [
        "Inscribed angle is always HALF the central angle intercepting the same arc.",
        "An angle inscribed in a semicircle is ALWAYS a 90-degree right angle.",
        "Opposite angles of an inscribed quadrilateral are supplementary (sum to 180 degrees)."
      ]
    },
    {
      id: "sec-u13-unit-circle-quadrants",
      title: "3. The Unit Circle & Trigonometric Signs Across Quadrants",
      readTime: "9 min read",
      summary: "Mastering the ASTC quadrant rule, reference angles, and exact values of sine, cosine, and tangent.",
      diagramType: "special-triangles-trig",
      contentMarkdown: `### Coordinates on the Unit Circle ($x^2 + y^2 = 1$)
For any angle $\\theta$ measured counterclockwise from the positive $x$-axis:
$$x = \\cos(\\theta), \\quad y = \\sin(\\theta), \\quad \\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)} = \\frac{y}{x}$$

#### The ASTC Quadrant Mnemonic (\"All Students Take Calculus\"):
- **Quadrant I ($0$ to $\\frac{\\pi}{2}$):** **A**ll functions are positive ($\\,\\sin > 0, \\cos > 0, \\tan > 0\\,$).
- **Quadrant II ($\\frac{\\pi}{2}$ to $\\pi$):** **S**ine only is positive ($\\sin > 0, \\cos < 0, \\tan < 0$).
- **Quadrant III ($\\pi$ to $\\frac{3\\pi}{2}$):** **T**angent only is positive ($\\tan > 0, \\sin < 0, \\cos < 0$).
- **Quadrant IV ($\\frac{3\\pi}{2}$ to $2\\pi$):** **C**osine only is positive ($\\cos > 0, \\sin < 0, \\tan < 0$).

#### Exact Values to Memorize:
| $\\theta$ (deg) | $\\theta$ (rad) | $\\sin(\\theta)$ | $\\cos(\\theta)$ | $\\tan(\\theta)$ |
|---|---|---|---|---|
| $30^\\circ$ | $\\pi/6$ | $1/2$ | $\\sqrt{3}/2$ | $1/\\sqrt{3} = \\sqrt{3}/3$ |
| $45^\\circ$ | $\\pi/4$ | $\\sqrt{2}/2$ | $\\sqrt{2}/2$ | $1$ |
| $60^\\circ$ | $\\pi/3$ | $\\sqrt{3}/2$ | $1/2$ | $\\sqrt{3}$ |`,
      keyTakeaways: [
        "cos(theta) is the x-coordinate, sin(theta) is the y-coordinate on the unit circle.",
        "ASTC: All (Q1), Sine (Q2), Tangent (Q3), Cosine (Q4) are positive.",
        "Desmos computes sin, cos, tan in both Degrees and Radians — check the wrench icon!"
      ],
      desmosExample: {
        title: "Desmos Unit Circle Verification",
        expression: "x^2 + y^2 = 1, (\\cos(\\pi/3), \\sin(\\pi/3))",
        tip: "Desmos plots the point (0.5, 0.866) on the unit circle. cos(pi/3) = 1/2 and sin(pi/3) = sqrt(3)/2."
      }
    },
    {
      id: "sec-u13-3d-composite-solids",
      title: "4. 3D Composite Solids & Inscribed Geometry",
      readTime: "8 min read",
      summary: "Solving complex multi-solid problems: inscribed spheres in cubes, water filling cones, and volume difference calculations.",
      diagramType: "formula-reference",
      contentMarkdown: `### High-Yield Inscribed Solid Relationships
1. **Sphere Inscribed in a Cube:**
   - If a sphere is inscribed in a cube of side length $s$:
     $$\\text{Diameter } 2r = s \\implies r = \\frac{s}{2}$$
   - Volume of Cube: $V_{\\text{cube}} = s^3$
   - Volume of Sphere: $V_{\\text{sphere}} = \\frac{4}{3}\\pi \\left(\\frac{s}{2}\\right)^3 = \\frac{4}{3}\\pi \\frac{s^3}{8} = \\frac{1}{6}\\pi s^3 \\approx 0.524 s^3$.
   - The sphere occupies approximately $52.4\\%$ of the cube's volume.

2. **Cylinder Inscribed in a Rectangular Prism:**
   - Base diameter equals prism width: $2r = w$.
   - Cylinder height equals prism height: $h_{\\text{cyl}} = h_{\\text{prism}}$.

3. **Frustum of a Cone (Truncated Cone):**
   - Volume of frustum = $(\\text{Volume of Big Original Cone}) - (\\text{Volume of Small Cut-off Cone})$.
   - Use similar triangles to relate heights and radii: $\\frac{r_{\\text{small}}}{r_{\\text{big}}} = \\frac{h_{\\text{small}}}{h_{\\text{big}}}$.`,
      keyTakeaways: [
        "In a sphere inscribed in a cube, diameter = side length s.",
        "For truncated cones or pyramids, subtract the small top solid from the large full solid.",
        "Reference formulas (Volume of cone, sphere, cylinder) are always accessible on the College Board reference sheet."
      ]
    }
  ],
  speedHacks: [
    {
      title: "Thales Semicircle Right Triangle Shortcut",
      trigger: "Triangle inscribed in circle with diameter as one side",
      shortcut: "Opposite angle is automatically 90 degrees. Use Pythagorean theorem immediately.",
      example: "Diameter = 10, one leg = 6 => other leg is 8 (3-4-5 triple)!"
    },
    {
      title: "Circle Tangent to x-axis or y-axis",
      trigger: "Circle with center (h, k) tangent to x-axis or y-axis",
      shortcut: "Tangent to x-axis => r = |k|. Tangent to y-axis => r = |h|.",
      example: "Center at (5, -8) tangent to x-axis => radius r = 8"
    },
    {
      title: "ASTC Quadrant Sign Check",
      trigger: "Trig value with angle in Quadrants II, III, or IV",
      shortcut: "Use reference angle in Quadrant I, then attach sign from All-Students-Take-Calculus.",
      example: "cos(150 deg): Q2 (cosine negative) => -cos(30 deg) = -sqrt(3)/2"
    }
  ],
  practiceQuestions: [
    {
      id: "u13_q01",
      questionNumber: 1,
      prompt: "A circle in the $xy$-plane has its center at $(-3, 4)$ and is tangent to the $x$-axis. What is the equation of the circle?",
      options: [
        "A. (x + 3)^2 + (y - 4)^2 = 9",
        "B. (x + 3)^2 + (y - 4)^2 = 16",
        "C. (x - 3)^2 + (y + 4)^2 = 16",
        "D. (x + 3)^2 + (y - 4)^2 = 25"
      ],
      correctAnswer: "B",
      explanation: "1. Center is $(h, k) = (-3, 4)$.\n2. The circle is tangent to the $x$-axis, so the radius is the vertical distance from the center to the $x$-axis: $r = |k| = |4| = 4$.\n3. The standard equation is $(x - (-3))^2 + (y - 4)^2 = 4^2 \\implies (x + 3)^2 + (y - 4)^2 = 16$.",
      satTrap: "Setting radius to $|h| = 3$ to get 9 (Choice A). Tangent to the X-AXIS means vertical distance to y = 0, which is determined by the Y-COORDINATE $k = 4$!",
      desmosTrick: "Type '(x + 3)^2 + (y - 4)^2 = 16'. Notice it touches the x-axis at exactly one point: (-3, 0).",
      referenceFormula: "r = |k| \\text{ for circle tangent to } x\\text{-axis}"
    },
    {
      id: "u13_q02",
      questionNumber: 2,
      prompt: "Triangle $ABC$ is inscribed in a circle such that $AB$ is a diameter of the circle. If the radius of the circle is $10$ and $AC = 12$, what is the length of side $BC$?",
      options: ["A. 8", "B. 16", "C. 18", "D. 2\\sqrt{34}"],
      correctAnswer: "B",
      explanation: "1. By Thales's Theorem, an angle inscribed in a semicircle is a right angle $\\implies \\angle C = 90^\\circ$.\n2. Triangle $ABC$ is a right triangle with hypotenuse $AB$.\n3. Since radius is 10, the diameter $AB = 2 \\cdot 10 = 20$.\n4. Apply Pythagorean theorem: $AC^2 + BC^2 = AB^2$\n$$12^2 + BC^2 = 20^2$$\n$$144 + BC^2 = 400 \\implies BC^2 = 256 \\implies BC = \\sqrt{256} = 16$.\n(Notice this is the $3-4-5$ Pythagorean triple scaled by $4$: $12 - 16 - 20$!).",
      satTrap: "Using hypotenuse 10 instead of 20. The radius is 10, but the diameter is $2 \\times 10 = 20$!",
      desmosTrick: "Type 'sqrt(20^2 - 12^2)' in Desmos => 16.",
      referenceFormula: "\\text{Thales's Theorem: } \\angle C = 90^\\circ, \\; a^2 + b^2 = d^2"
    },
    {
      id: "u13_q03",
      questionNumber: 3,
      prompt: "In a circle with center $O$, central angle $\\angle AOC$ measures $110^\\circ$. Point $B$ lies on the major arc $AC$. What is the measure of the inscribed angle $\\angle ABC$?",
      options: ["A. 55^\\circ", "B. 70^\\circ", "C. 110^\\circ", "D. 220^\\circ"],
      correctAnswer: "A",
      explanation: "By the Inscribed Angle Theorem, the measure of an angle inscribed in a circle is exactly half the measure of the central angle that intercepts the same arc:\n$$\\angle ABC = \\frac{1}{2} \\angle AOC = \\frac{1}{2}(110^\\circ) = 55^\\circ$$.",
      satTrap: "Doubling the angle to $220^\\circ$ (Choice D). The central angle is twice the inscribed angle; therefore, the inscribed angle is HALF the central angle!",
      referenceFormula: "\\theta_{\\text{inscribed}} = \\frac{1}{2} \\theta_{\\text{central}}"
    },
    {
      id: "u13_q04",
      questionNumber: 4,
      prompt: "If $\\sin(\\theta) = -\\frac{3}{5}$ and angle $\\theta$ lies in Quadrant III, what is the value of $\\cos(\\theta)$?",
      options: ["A. -4/5", "B. 4/5", "C. -3/4", "D. 4/3"],
      correctAnswer: "A",
      explanation: "1. Use Pythagorean identity: $\\sin^2(\\theta) + \\cos^2(\\theta) = 1$.\n$$\\left(-\\frac{3}{5}\\right)^2 + \\cos^2(\\theta) = 1 \\implies \\frac{9}{25} + \\cos^2(\\theta) = 1$$\n$$\\cos^2(\\theta) = 1 - \\frac{9}{25} = \\frac{16}{25} \\implies \\cos(\\theta) = \\pm \\frac{4}{5}$$.\n2. Determine sign using ASTC:\nIn Quadrant III, only Tangent is positive; Sine and Cosine are both **NEGATIVE**!\nTherefore, $\\cos(\\theta) = -\\frac{4}{5}$.",
      satTrap: "Choosing $+4/5$ (Choice B). In Quadrant III, x-coordinates are negative, so cosine MUST be negative!",
      referenceFormula: "\\sin^2(\\theta) + \\cos^2(\\theta) = 1, \\quad \\cos(\\theta) < 0 \\text{ in Q3}"
    },
    {
      id: "u13_q05",
      questionNumber: 5,
      prompt: "A solid sphere is inscribed inside a cube of side length $6 \\text{ cm}$ such that the sphere touches all six faces of the cube. What is the volume, in $\\text{cm}^3$, of the space inside the cube that is NOT occupied by the sphere?",
      options: [
        "A. 216 - 36\\pi",
        "B. 216 - 72\\pi",
        "C. 216 - 144\\pi",
        "D. 216 - 288\\pi"
      ],
      correctAnswer: "A",
      explanation: "1. Volume of the cube: $V_{\\text{cube}} = s^3 = 6^3 = 216 \\text{ cm}^3$.\n2. Since the sphere touches all faces, its diameter equals the side length: $2r = 6 \\implies r = 3 \\text{ cm}$.\n3. Volume of the sphere: $V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi (3^3) = \\frac{4}{3}\\pi (27) = 36\\pi \\text{ cm}^3$.\n4. Unoccupied volume: $V_{\\text{cube}} - V_{\\text{sphere}} = 216 - 36\\pi$.",
      satTrap: "Using $r = 6$ instead of $r = 3$. The DIAMETER is 6, so the radius is $6/2 = 3$!",
      referenceFormula: "V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3"
    },
    {
      id: "u13_q06",
      questionNumber: 6,
      prompt: "In the $xy$-plane, what is the distance between the center of the circle $(x - 5)^2 + (y + 2)^2 = 36$ and the point $(1, 1)$?",
      options: ["A. 4", "B. 5", "C. 6", "D. \\sqrt{37}"],
      correctAnswer: "B",
      explanation: "1. Extract the center of the circle: $(h, k) = (5, -2)$.\n2. Apply the distance formula to $(5, -2)$ and $(1, 1)$:\n$$d = \\sqrt{(5 - 1)^2 + (-2 - 1)^2} = \\sqrt{4^2 + (-3)^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$$.\n(Notice this forms a classic $3-4-5$ right triangle).",
      satTrap: "Using the radius 6 in the calculation. The question asks for the distance between the CENTER and the point, which is independent of the radius.",
      desmosTrick: "Type 'distance((5, -2), (1, 1))' directly into Desmos. It outputs 5.",
      referenceFormula: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}"
    },
    {
      id: "u13_q07",
      questionNumber: 7,
      prompt: "A right circular cone has a base radius of 6 and a height of 8. A plane parallel to the base cuts through the cone at a height of 4 above the base, forming a smaller cone at the top. What is the volume of the smaller cone?",
      options: ["A. 12\\pi", "B. 24\\pi", "C. 36\\pi", "D. 96\\pi"],
      correctAnswer: "A",
      explanation: "1. Original cone height $H = 8$. The plane cuts at height 4 from the base, so the smaller cone at the top has height $h = 8 - 4 = 4$.\n2. Ratio of heights: $k = \\frac{h}{H} = \\frac{4}{8} = \\frac{1}{2}$.\n3. By similar triangles, the radius of the smaller cone is $r = \\frac{1}{2}(6) = 3$.\n4. Volume of smaller cone: $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi (3^2)(4) = \\frac{1}{3}\\pi (9)(4) = 12\\pi$.\n\n*Scaling Shortcut:* $V_{\\text{original}} = \\frac{1}{3}\\pi (6^2)(8) = 96\\pi$. Since $k = 1/2$, $V_{\\text{small}} = 96\\pi \\cdot (1/2)^3 = 96\\pi / 8 = 12\\pi$!",
      satTrap: "Using height 4 but keeping radius 6. When the cone is cut, the radius scales proportionally: $r = 3$!",
      referenceFormula: "V = \\frac{1}{3}\\pi r^2 h, \\quad V_{\\text{small}} = k^3 V_{\\text{big}}"
    },
    {
      id: "u13_q08",
      questionNumber: 8,
      prompt: "What is the exact value of $\\cos\\left(\\frac{5\\pi}{6}\\right)$?",
      options: ["A. -\\frac{\\sqrt{3}}{2}", "B. -\\frac{1}{2}", "C. \\frac{1}{2}", "D. \\frac{\\sqrt{3}}{2}"],
      correctAnswer: "A",
      explanation: "1. Angle $\\frac{5\\pi}{6} = 150^\\circ$ lies in **Quadrant II**.\n2. Reference angle: $\\pi - \\frac{5\\pi}{6} = \\frac{\\pi}{6} = 30^\\circ$.\n3. In Quadrant II, cosine is **negative** (ASTC).\n4. Therefore, $\\cos\\left(\\frac{5\\pi}{6}\\right) = -\\cos\\left(\\frac{\\pi}{6}\\right) = -\\frac{\\sqrt{3}}{2}$.",
      satTrap: "Confusing sine and cosine: $\\sin(5\\pi/6) = +1/2$, but $\\cos(5\\pi/6) = -\\sqrt{3}/2$.",
      desmosTrick: "Type 'cos(5 * pi / 6)' into Desmos. It outputs -0.866025, which matches -sqrt(3)/2."
    },
    {
      id: "u13_q09",
      questionNumber: 9,
      prompt: "Points $A(2, 5)$ and $B(8, 13)$ are endpoints of a diameter of a circle. What is the equation of the circle?",
      options: [
        "A. (x - 5)^2 + (y - 9)^2 = 25",
        "B. (x - 5)^2 + (y - 9)^2 = 100",
        "C. (x + 5)^2 + (y + 9)^2 = 25",
        "D. (x - 5)^2 + (y - 9)^2 = 5"
      ],
      correctAnswer: "A",
      explanation: "1. Center is the midpoint of the diameter $AB$:\n$$(h, k) = \\left(\\frac{2 + 8}{2}, \\frac{5 + 13}{2}\\right) = (5, 9)$$\n2. The diameter length is the distance between $A$ and $B$:\n$$D = \\sqrt{(8 - 2)^2 + (13 - 5)^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$$.\n3. Radius is half the diameter: $r = \\frac{10}{2} = 5$.\n4. $r^2 = 5^2 = 25$.\n5. Equation: $(x - 5)^2 + (y - 9)^2 = 25$.",
      satTrap: "Using the diameter $D = 10$ as the radius to get $r^2 = 100$ (Choice B). The radius is HALF the diameter: $r = 5$, so $r^2 = 25$!",
      referenceFormula: "\\text{Midpoint } = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right), \\quad r = \\frac{D}{2}"
    },
    {
      id: "u13_q10",
      questionNumber: 10,
      prompt: "In a circle, a chord of length 16 is at a distance of 6 from the center of the circle. What is the radius of the circle?",
      options: ["A. 8", "B. 10", "C. 12", "D. \\sqrt{52}"],
      correctAnswer: "B",
      explanation: "1. The perpendicular segment from the center of the circle to a chord bisects the chord into two equal halves.\n2. Half the chord length is $\\frac{16}{2} = 8$.\n3. The perpendicular distance from the center to the chord is $6$.\n4. The radius $r$, the perpendicular segment (6), and half the chord (8) form a right triangle:\n$$r^2 = 6^2 + 8^2 = 36 + 64 = 100 \\implies r = 10$$.\n(A classic $6-8-10$ right triangle, scaled from $3-4-5$!).",
      satTrap: "Using the full chord length 16 in the Pythagorean theorem: $6^2 + 16^2 = 36 + 256 = 292$. The perpendicular bisects the chord, so you must use 8!",
      desmosTrick: "In Desmos: type 'sqrt(6^2 + 8^2)' => outputs 10.",
      referenceFormula: "r^2 = d^2 + \\left(\\frac{L}{2}\\right)^2"
    }
  ],
  prevUnitId: "unit-12-advanced-adv-math"
};
