"use client";

import React, { useState, useEffect } from "react";
import KaTeXMath from "./KaTeXMath";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import Portal from "./Portal";
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Calculator,
  ChevronRight,
  Layers,
  Zap,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  X,
  ExternalLink,
  Download,
} from "lucide-react";

export type TopicDiagramKey =
  | "slope_intercept"
  | "quadratic_parabola"
  | "special_triangles"
  | "circle_geometry"
  | "balance_scale"
  | "punctuation_tree"
  | "scatterplot_bestfit"
  | "statistics_distribution"
  | "trig_identities"
  | "similar_triangles"
  | "solids_geometry"
  | "rhetorical_transitions"
  | "sentence_boundaries"
  | "rhetorical_synthesis"
  | "exponential_vs_linear"
  | "systems_classification";

interface VisualTopicDiagramProps {
  topicType?: TopicDiagramKey;
}

interface DiagramMeta {
  id: TopicDiagramKey;
  navTitle: string;
  category: "Math" | "Reading & Writing";
  domain: string;
  headline: string;
  imageSrc: string;
  imageAlt: string;
  caption: string;
  formulas: { title: string; latex: string; explanation: string }[];
  desmosShortcut?: {
    title: string;
    instructions: string;
    latexSnippet: string;
  };
  satTraps: string[];
}

const DIAGRAMS_DATA: Record<TopicDiagramKey, DiagramMeta> = {
  slope_intercept: {
    id: "slope_intercept",
    navTitle: "Linear Slope (y = mx + b)",
    category: "Math",
    domain: "Heart of Algebra (ALG-02)",
    headline: "Linear Equations, Slopes & Perpendicular Relationships",
    imageSrc: "/diagrams/diagram_slope_intercept.png",
    imageAlt: "Digital SAT Linear Slope Intercept and Perpendicular Slope Diagram",
    caption:
      "Cartesian coordinate plane showing y = (3/2)x + 1, Rise/Run right triangle, perpendicular line with negative reciprocal slope m = -2/3, and parallel line m = 3/2.",
    formulas: [
      {
        title: "Slope-Intercept Form",
        latex: "y = mx + b",
        explanation: "m = slope (rate of change), b = y-intercept (value when x = 0).",
      },
      {
        title: "Slope Calculation",
        latex: "m = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}",
        explanation: "Vertical change (Rise) divided by horizontal change (Run).",
      },
      {
        title: "Perpendicular Lines",
        latex: "m_{\\perp} = -\\frac{1}{m} \\iff m_1 \\cdot m_2 = -1",
        explanation: "Slopes are negative reciprocals: flip the fraction and negate the sign.",
      },
      {
        title: "Parallel Lines",
        latex: "m_{\\parallel} = m",
        explanation: "Parallel lines have identical slopes and never intersect.",
      },
    ],
    desmosShortcut: {
      title: "Desmos 10-Second Linear Hack",
      instructions:
        "Type any linear equation into Desmos directly (e.g. 3x - 2y = 8). Click on the line to immediately reveal the x-intercept and y-intercept coordinates.",
      latexSnippet: "y = \\frac{3}{2}x + 1",
    },
    satTraps: [
      "Perpendicular slopes require BOTH flipping the fraction AND changing the sign (+2/3 becomes -3/2).",
      "Horizontal lines have slope m = 0 and equation y = c. Vertical lines have undefined slope and equation x = c.",
      "In word problems, m is the unit rate ('per month', 'each gallon') and b is the initial flat fee.",
    ],
  },

  quadratic_parabola: {
    id: "quadratic_parabola",
    navTitle: "Parabola & Discriminant",
    category: "Math",
    domain: "Advanced Math (ADV-03)",
    headline: "Parabola Vertex Form, Symmetry, & Discriminant Analysis",
    imageSrc: "/diagrams/diagram_parabola_vertex.png",
    imageAlt: "Digital SAT Quadratic Parabola Vertex and Discriminant Diagram",
    caption:
      "Parabola vertex (h, k), axis of symmetry x = h, real roots, and the 3 Discriminant cases determining the number of solutions.",
    formulas: [
      {
        title: "Vertex Form",
        latex: "y = a(x - h)^2 + k",
        explanation: "Vertex is at (h, k). If a > 0, parabola opens UP (min = k). If a < 0, opens DOWN (max = k).",
      },
      {
        title: "Vertex from Standard Form",
        latex: "h = -\\frac{b}{2a}, \\quad k = c - \\frac{b^2}{4a}",
        explanation: "The axis of symmetry is always the vertical line x = -b / (2a).",
      },
      {
        title: "The Discriminant (D)",
        latex: "D = b^2 - 4ac",
        explanation: "D > 0: 2 real roots; D = 0: 1 tangent root; D < 0: 0 real roots (complex).",
      },
    ],
    desmosShortcut: {
      title: "Desmos 10-Second Vertex Hack",
      instructions:
        "Type any quadratic in standard or vertex form into Desmos. Click the gray dot at the curve's apex/base to view the exact (h, k) vertex without factoring or completing the square.",
      latexSnippet: "y = (x - 2)^2 - 3",
    },
    satTraps: [
      "Watch the sign in vertex form: y = (x - 4)^2 + 3 has vertex at (+4, 3), NOT (-4, 3).",
      "Questions asking for 'maximum height' or 'minimum cost' ask for the y-value of the vertex (k).",
      "Questions asking 'at what time' or 'for what quantity' the maximum occurs ask for the x-value (h).",
    ],
  },

  special_triangles: {
    id: "special_triangles",
    navTitle: "Special Right Triangles",
    category: "Math",
    domain: "Geometry & Trigonometry (GEO-02)",
    headline: "30°-60°-90° and 45°-45°-90° College Board Reference Standards",
    imageSrc: "/diagrams/diagram_special_triangles.png",
    imageAlt: "Digital SAT Special Right Triangles Reference Diagram",
    caption:
      "Exact side ratio relationships and trigonometric values for 30-60-90 (x : x√3 : 2x) and 45-45-90 (x : x : x√2) right triangles.",
    formulas: [
      {
        title: "30°-60°-90° Ratio",
        latex: "x : x\\sqrt{3} : 2x",
        explanation: "Short leg (opp 30°) = x; Long leg (opp 60°) = x√3; Hypotenuse = 2x.",
      },
      {
        title: "45°-45°-90° Ratio",
        latex: "x : x : x\\sqrt{2}",
        explanation: "Both legs are equal (x); Hypotenuse is leg multiplied by √2.",
      },
      {
        title: "Complementary Angles Theorem",
        latex: "\\sin(\\theta) = \\cos(90^\\circ - \\theta)",
        explanation: "If angles A and B are acute angles in a right triangle, sin(A) = cos(B).",
      },
    ],
    desmosShortcut: {
      title: "Desmos Trigonometry Mode",
      instructions:
        "Click the Wrench icon in Desmos and verify DEGREE mode is selected. Type sin(30) to get 0.5 or cos(45) to get 0.7071.",
      latexSnippet: "\\sin(30^{\\circ}) = 0.5",
    },
    satTraps: [
      "The side opposite 30° is always the shortest leg (x). Never assign x√3 to the short leg.",
      "In 45-45-90 triangles, if you are given hypotenuse H, each leg is H / √2 = (H√2) / 2.",
      "If a problem states sin(4x - 10) = cos(3x + 16), immediately set (4x - 10) + (3x + 16) = 90.",
    ],
  },

  circle_geometry: {
    id: "circle_geometry",
    navTitle: "Circle & Sector Geometry",
    category: "Math",
    domain: "Geometry & Trigonometry (GEO-03)",
    headline: "Cartesian Circle Equation, Radians, Arc Length, & Sector Area",
    imageSrc: "/diagrams/diagram_circle_geometry.png",
    imageAlt: "Digital SAT Circle Equation and Sector Geometry Diagram",
    caption:
      "Coordinate circle centered at (2, 1) with radius r = 3, complete with sector area A = (1/2)r²θ and arc length s = rθ.",
    formulas: [
      {
        title: "Standard Circle Equation",
        latex: "(x - h)^2 + (y - k)^2 = r^2",
        explanation: "Center is at (h, k); radius is r (the square root of the constant term).",
      },
      {
        title: "Arc Length (Radian & Degree)",
        latex: "s = r\\theta \\quad \\text{or} \\quad s = \\frac{\\theta^\\circ}{360^\\circ} \\cdot 2\\pi r",
        explanation: "Arc length is directly proportional to the central angle.",
      },
      {
        title: "Sector Area (Radian & Degree)",
        latex: "A = \\frac{1}{2}r^2\\theta \\quad \\text{or} \\quad A = \\frac{\\theta^\\circ}{360^\\circ} \\cdot \\pi r^2",
        explanation: "Area of the slice of pie created by central angle θ.",
      },
      {
        title: "Completing the Square",
        latex: "x^2 + Dx + \\left(\\frac{D}{2}\\right)^2 = \\left(x + \\frac{D}{2}\\right)^2",
        explanation: "Halve the middle coefficient and square it to find the center coordinates.",
      },
    ],
    desmosShortcut: {
      title: "Desmos Circle Visualizer",
      instructions:
        "Desmos graphs un-factored circle equations automatically! Type x^2 + y^2 - 4x - 2y = 4 into Desmos to see the center and radius instantly.",
      latexSnippet: "(x - 2)^2 + (y - 1)^2 = 9",
    },
    satTraps: [
      "The right-hand side is r², NOT r! If the equation ends in = 49, the radius is 7, not 49.",
      "Beware sign reversals in the center: (x + 3)² + (y - 5)² = 16 has center (-3, +5).",
      "Radians to degrees: multiply radians by 180 / π (e.g., π/3 rad = 60°).",
    ],
  },

  balance_scale: {
    id: "balance_scale",
    navTitle: "Balance Scale (Linear Isolation)",
    category: "Math",
    domain: "Heart of Algebra (ALG-01)",
    headline: "First-Principles Balance Scale & Algebraic Isolation",
    imageSrc: "/diagrams/diagram_balance_scale.png",
    imageAlt: "Digital SAT Mechanical Balance Scale Diagram",
    caption:
      "A calibrated mechanical scale illustrating the 3-step isolation of 4x + 12 = 36 via the Subtraction and Division properties of equality.",
    formulas: [
      {
        title: "Original Equation",
        latex: "4x + 12 = 36",
        explanation: "Both pans have equal mass; equilibrium is established at the fulcrum.",
      },
      {
        title: "Subtraction Property of Equality",
        latex: "4x + 12 - 12 = 36 - 12 \\implies 4x = 24",
        explanation: "Subtracting 12 from both pans maintains balance while isolating variable terms.",
      },
      {
        title: "Division Property of Equality",
        latex: "\\frac{4x}{4} = \\frac{24}{4} \\implies x = 6",
        explanation: "Dividing both sides by the coefficient 4 yields the value of a single unit of x.",
      },
    ],
    desmosShortcut: {
      title: "Desmos Single-Variable Solver",
      instructions:
        "Type any single-variable linear equation (e.g. 4x + 12 = 36) directly into Desmos. Desmos will plot a vertical line right through the solution x = 6.",
      latexSnippet: "4x + 12 = 36",
    },
    satTraps: [
      "Always check what the question asks for! It often asks for 2x, 4x + 5, or (x - 3), not just x.",
      "No Solution: occurs when variable coefficients are equal but constants differ (e.g. 3x + 4 = 3x - 1).",
      "Infinitely Many Solutions: occurs when both sides simplify to identical expressions (e.g. 2(x + 3) = 2x + 6).",
    ],
  },

  punctuation_tree: {
    id: "punctuation_tree",
    navTitle: "Punctuation & Boundary Tree",
    category: "Reading & Writing",
    domain: "Standard English Conventions (SEC-01)",
    headline: "Official Digital SAT Punctuation & Sentence Boundary Decision Tree",
    imageSrc: "/diagrams/diagram_punctuation_flowchart.png",
    imageAlt: "Digital SAT Punctuation and Sentence Boundaries Flowchart",
    caption:
      "College Board decision framework for semicolons, colons, em-dashes, and eliminating comma splices.",
    formulas: [
      {
        title: "Semicolon Rule ( ; )",
        latex: "[\\text{Independent Clause}] \\; ; \\; [\\text{Independent Clause}]",
        explanation: "A semicolon is grammatically identical to a period: both sides must be complete sentences.",
      },
      {
        title: "Colon Requirement ( : )",
        latex: "[100\\% \\text{ Complete Sentence}] : [\\text{Explanation / List / Appositive}]",
        explanation: "The clause before the colon must be fully independent; what follows can be a word, list, or clause.",
      },
      {
        title: "Em-Dash Matching ( — )",
        latex: "[\\text{Subject}] - [\\text{Non-Essential Interrupt}] - [\\text{Verb}]",
        explanation: "Dashes must be paired when interrupting the middle of a sentence; never pair a comma with a dash.",
      },
      {
        title: "Illegal Comma Splice Trap",
        latex: "[\\text{Independent Clause}] \\; , \\; [\\text{Independent Clause}] \\implies \\text{ERROR}",
        explanation: "Two independent sentences can NEVER be joined by a lone comma without a FANBOYS conjunction.",
      },
    ],
    desmosShortcut: {
      title: "SAT Elimination Hack: Semicolon = Period",
      instructions:
        "If two answer choices are identical except one uses a period and the other uses a semicolon, BOTH choices are 100% incorrect, as they perform the exact same grammatical function.",
      latexSnippet: "; \\equiv .",
    },
    satTraps: [
      "Never place a colon after 'such as', 'including', or forms of the verb 'to be' (is, are, was).",
      "Conjunctive adverbs (however, furthermore, therefore) between two independent clauses need a semicolon before and comma after: '...effort; however, the...'",
      "A non-essential modifier must be removable without breaking the core subject-verb sentence grammar.",
    ],
  },

  scatterplot_bestfit: {
    id: "scatterplot_bestfit",
    navTitle: "Scatterplots & Regression (DAT-04)",
    category: "Math",
    domain: "Problem Solving & Data Analysis (DAT-04)",
    headline: "Scatterplots, Linear Models & Residual Analysis",
    imageSrc: "/diagrams/diagram_scatterplot_bestfit.png",
    imageAlt: "Digital SAT Scatterplot and Line of Best Fit Residual Diagram",
    caption:
      "Scatterplot showing positive linear association, line of best fit y = 2.4x + 15, and residual deviation y - ŷ.",
    formulas: [
      {
        title: "Line of Best Fit Equation",
        latex: "\\hat{y} = mx + b",
        explanation: "m = slope (predicted change in y per 1 unit change in x), b = predicted value when x = 0.",
      },
      {
        title: "Residual Formula",
        latex: "\\text{Residual} = y - \\hat{y}",
        explanation: "Observed value minus predicted value. Positive = above line; Negative = below line.",
      },
    ],
    desmosShortcut: {
      title: "Desmos Table Regression Shortcut",
      instructions:
        "Create a table with x1 and y1 columns. In the next line, type 'y1 ~ m*x1 + b' to get the exact slope, intercept, and r^2 coefficient.",
      latexSnippet: "y_1 \\sim m x_1 + b",
    },
    satTraps: [
      "Correlation does NOT imply causation (only well-controlled randomized experiments establish causation).",
      "Do NOT extrapolate far beyond the range of observed x-values in the scatterplot.",
      "In word problems, interpret slope in terms of the specific units provided (e.g. 'dollars per hour').",
    ],
  },

  statistics_distribution: {
    id: "statistics_distribution",
    navTitle: "Distributions & Outliers (DAT-03)",
    category: "Math",
    domain: "Problem Solving & Data Analysis (DAT-03)",
    headline: "Empirical Rule, Bell Curves & Box Plot Statistics",
    imageSrc: "/diagrams/diagram_statistics_box_normal.png",
    imageAlt: "Digital SAT Normal Distribution and Box Plot Diagram",
    caption:
      "Empirical 68-95-99.7 rule for normal distributions and 5-number summary box plot (Min, Q1, Median, Q3, Max).",
    formulas: [
      {
        title: "Empirical 68-95 Rule",
        latex: "\\mu \\pm 1\\sigma \\approx 68\\%, \\quad \\mu \\pm 2\\sigma \\approx 95\\%",
        explanation: "68% of data falls within 1 standard deviation of the mean; 95% falls within 2 standard deviations.",
      },
      {
        title: "Interquartile Range (IQR)",
        latex: "\\text{IQR} = Q_3 - Q_1",
        explanation: "Middle 50% spread. Outlier boundaries are Q1 - 1.5*IQR and Q3 + 1.5*IQR.",
      },
    ],
    desmosShortcut: {
      title: "Desmos Statistics Functions",
      instructions:
        "Define a list L = [data]. Type 'mean(L)', 'median(L)', 'stdev(L)', and 'boxplot(L)' for instant summary statistics.",
      latexSnippet: "\\text{mean}(L), \\quad \\text{stdev}(L)",
    },
    satTraps: [
      "Extreme outliers drag the MEAN towards themselves, but leave the MEDIAN almost unaffected.",
      "Standard deviation measures spread: identical values have standard deviation = 0.",
      "Range = Max - Min is also highly sensitive to outliers.",
    ],
  },

  trig_identities: {
    id: "trig_identities",
    navTitle: "Trig Identities & Angles (GEO-03)",
    category: "Math",
    domain: "Geometry & Trigonometry (GEO-03)",
    headline: "Co-Function Theorem, Unit Circle & Pythagorean Identities",
    imageSrc: "/diagrams/diagram_trig_identities.png",
    imageAlt: "Digital SAT Trigonometric Identities and Complementary Angles",
    caption:
      "Right triangle demonstrating complementary angle identity sin(x) = cos(90° - x) and unit circle (cos θ, sin θ).",
    formulas: [
      {
        title: "Co-Function Identity",
        latex: "\\sin(x) = \\cos(90^\\circ - x) \\iff x + y = 90^\\circ",
        explanation: "The sine of an acute angle equals the cosine of its complementary angle.",
      },
      {
        title: "Pythagorean Identity",
        latex: "\\sin^2(\\theta) + \\cos^2(\\theta) = 1, \\quad \\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}",
        explanation: "Fundamental identity derived directly from the unit circle x^2 + y^2 = 1.",
      },
    ],
    desmosShortcut: {
      title: "Desmos Degree vs Radian Mode",
      instructions:
        "Always check the wrench icon in Desmos to confirm whether the problem is in Degrees (DEG) or Radians (RAD).",
      latexSnippet: "\\sin(19^\\circ) = \\cos(71^\\circ)",
    },
    satTraps: [
      "If sin(3x - 12) = cos(2x + 7), simply add the two angles and set equal to 90 degrees!",
      "Radians: 180 degrees = π radians. To convert radians to degrees, multiply by 180 / π.",
      "SOH CAH TOA only applies to right triangles.",
    ],
  },

  similar_triangles: {
    id: "similar_triangles",
    navTitle: "Similar Triangles & Proportions (GEO-02)",
    category: "Math",
    domain: "Geometry & Trigonometry (GEO-02)",
    headline: "Similar Triangles, Scale Factors & Shadow Proportions",
    imageSrc: "/diagrams/diagram_similar_triangles.png",
    imageAlt: "Digital SAT Similar Triangles and Sun Shadows Diagram",
    caption:
      "Two upright trees casting shadows with parallel sun rays creating similar right triangles.",
    formulas: [
      {
        title: "Similar Triangle Side Proportions",
        latex: "\\frac{\\text{Height}_1}{\\text{Shadow}_1} = \\frac{\\text{Height}_2}{\\text{Shadow}_2} \\iff \\frac{a_1}{a_2} = \\frac{b_1}{b_2}",
        explanation: "Corresponding side ratios are strictly equal across similar triangles.",
      },
      {
        title: "Area Ratio Property",
        latex: "\\frac{\\text{Area}_1}{\\text{Area}_2} = \\left(\\frac{L_1}{L_2}\\right)^2 = k^2",
        explanation: "If side lengths scale by factor k, area scales by k^2.",
      },
    ],
    desmosShortcut: {
      title: "Desmos Proportion Solver",
      instructions:
        "Enter '10/5 = x/2' directly into Desmos. It plots a vertical line at x = 4 for instant verification.",
      latexSnippet: "\\frac{10}{5} = \\frac{x}{2}",
    },
    satTraps: [
      "Similar triangles have EQUAL angle measures, but PROPORTIONAL side lengths.",
      "When side length is multiplied by 3, the area is multiplied by 3^2 = 9, NOT 3!",
      "Identify the corresponding vertices carefully when setting up proportions.",
    ],
  },

  solids_geometry: {
    id: "solids_geometry",
    navTitle: "3D Volume & Solids (GEO-01)",
    category: "Math",
    domain: "Geometry & Trigonometry (GEO-01)",
    headline: "Cylinders, Cones, Spheres & Rectangular Prisms",
    imageSrc: "/diagrams/diagram_solids_geometry.png",
    imageAlt: "Digital SAT 3D Solids Geometry Volume Formulas",
    caption:
      "Right circular cylinder, right cone, and sphere with their respective volume and surface area formulas.",
    formulas: [
      {
        title: "Cylinder Volume",
        latex: "V = \\pi r^2 h, \\quad \\text{Surface Area} = 2\\pi r h + 2\\pi r^2",
        explanation: "Base area (pi * r^2) multiplied by height h.",
      },
      {
        title: "Cone Volume",
        latex: "V = \\frac{1}{3}\\pi r^2 h",
        explanation: "A cone has exactly one-third the volume of a cylinder with the same radius and height.",
      },
      {
        title: "Sphere Volume & Area",
        latex: "V = \\frac{4}{3}\\pi r^3, \\quad \\text{Surface Area} = 4\\pi r^2",
        explanation: "Volume scales with radius cubed r^3; surface area scales with r^2.",
      },
    ],
    desmosShortcut: {
      title: "Desmos Volume Slider Check",
      instructions:
        "Define V(r, h) = pi * r^2 * h. Set r = 1 and h = 2 -> V = 2pi. Now set r = 2 and h = 1 -> V = 4pi (doubled!).",
      latexSnippet: "V = \\pi r^2 h",
    },
    satTraps: [
      "Doubling the radius quadruples the volume because radius is squared (r^2)!",
      "Make sure radius is used, not diameter (if diameter is 10, radius is 5).",
      "Check unit consistency (e.g. cubic meters vs liters).",
    ],
  },

  rhetorical_transitions: {
    id: "rhetorical_transitions",
    navTitle: "Rhetorical Transitions",
    category: "Reading & Writing",
    domain: "Expression of Ideas (EXP-01)",
    headline: "Digital SAT Rhetorical Transitions Master Taxonomy",
    imageSrc: "/diagrams/diagram_rhetorical_transitions.png",
    imageAlt: "Digital SAT Rhetorical Transitions 4-Category Master Taxonomy",
    caption:
      "The 4 universal transition types tested on the Digital SAT: Continuation/Addition, Contrast/Concession, Causation/Result, and Exemplification.",
    formulas: [
      {
        title: "1. Continuation & Addition",
        latex: "\\text{Furthermore, Moreover, Additionally, In fact}",
        explanation: "Next sentence agrees with, elaborates upon, or reinforces the prior claim.",
      },
      {
        title: "2. Contrast & Concession",
        latex: "\\text{However, Nevertheless, In contrast, Conversely, Yet}",
        explanation: "Next sentence reverses, restricts, or contradicts the previous sentence.",
      },
      {
        title: "3. Causation & Result",
        latex: "\\text{Therefore, Consequently, Thus, As a result, Hence}",
        explanation: "Next sentence represents a direct logical effect or outcome of the prior sentence.",
      },
      {
        title: "4. Exemplification",
        latex: "\\text{For example, Specifically, For instance, To illustrate}",
        explanation: "Next sentence provides a concrete specimen or specific proof of the general claim.",
      },
    ],
    satTraps: [
      "Twin Choices Elimination: If Choice A is 'Furthermore' and Choice B is 'Moreover', both do the exact same thing -> Eliminate both!",
      "Always read the sentence completely WITHOUT the transition word first to diagnose the organic logical relationship.",
      "Never select 'However' just because the topic changes; it must be a direct conceptual reversal.",
    ],
  },

  sentence_boundaries: {
    id: "sentence_boundaries",
    navTitle: "Sentence Boundaries",
    category: "Reading & Writing",
    domain: "Standard English Conventions (SEC-01)",
    headline: "Sentence Boundaries, Semicolons & Comma Splice Elimination",
    imageSrc: "/diagrams/diagram_sentence_boundaries.png",
    imageAlt: "Digital SAT Sentence Boundaries and Punctuation Reference Diagram",
    caption:
      "The 4 legal methods to join Independent Clauses (IC + IC) vs fatal traps: comma splices, run-ons, and fragments.",
    formulas: [
      {
        title: "The 4 Valid Joins",
        latex: "\\text{IC . IC} \\quad | \\quad \\text{IC ; IC} \\quad | \\quad \\text{IC , [FANBOYS] IC} \\quad | \\quad \\text{IC : Detail}",
        explanation: "Two complete thoughts can ONLY be joined by a Period, Semicolon, Comma + FANBOYS, or Colon.",
      },
      {
        title: "Comma Splice (Fatal Trap)",
        latex: "\\text{IC , IC} \\implies \\text{100\\% Grammatically Invalid}",
        explanation: "A lone comma can NEVER join two independent clauses without a coordinating conjunction.",
      },
      {
        title: "Period ≡ Semicolon Invariant",
        latex: "\\text{Period (.)} \\iff \\text{Semicolon (;)}",
        explanation: "If Choice A uses a period and Choice B uses a semicolon with the same wording, eliminate both.",
      },
    ],
    satTraps: [
      "FANBOYS words (for, and, nor, but, or, yet, so) require a comma only when joining two full sentences, not two verbs.",
      "Colons (:) require a complete Independent Clause before the colon; what follows can be a list, phrase, or sentence.",
      "Dashes (—) can act like commas (in pairs for non-essential info) or like a colon (single dash at end of sentence).",
    ],
  },

  rhetorical_synthesis: {
    id: "rhetorical_synthesis",
    navTitle: "Rhetorical Synthesis",
    category: "Reading & Writing",
    domain: "Expression of Ideas (EXP-02)",
    headline: "Rhetorical Synthesis & Research Notes 3-Step Target Algorithm",
    imageSrc: "/diagrams/diagram_rhetorical_synthesis.png",
    imageAlt: "Digital SAT Rhetorical Synthesis 3-Step Strategy Diagram",
    caption:
      "How to solve 'The student wants to...' research notes questions in 20 seconds using the 3-step goal elimination algorithm.",
    formulas: [
      {
        title: "Step 1: Read the Goal First",
        latex: "\\text{Jump to the final sentence in prompt stem}",
        explanation: "Identify the exact mission: emphasize similarity, introduce work, contrast findings.",
      },
      {
        title: "Step 2: Eliminate True-but-Irrelevant",
        latex: "\\text{True to notes} \\neq \\text{Answers the goal}",
        explanation: "2-3 trap choices will accurately quote the bullet points but fail the prompt's explicit goal.",
      },
      {
        title: "Step 3: Keyword Alignment",
        latex: "\\text{Goal = Similarity} \\implies \\text{Keywords: 'both', 'similarly', 'alike'}",
        explanation: "Confirm the winning sentence cleanly satisfies the target communicative function.",
      },
    ],
    satTraps: [
      "Never read all the bullet points before reading the question prompt. You only need the bullets that answer the specific goal.",
      "If the goal asks to introduce an artist to a new audience, the choice MUST mention who the artist is and what they do.",
    ],
  },

  exponential_vs_linear: {
    id: "exponential_vs_linear",
    navTitle: "Linear vs Exponential",
    category: "Math",
    domain: "Advanced Math (ADV-03)",
    headline: "Linear vs. Exponential Growth Models, Compounding & Half-Life",
    imageSrc: "/diagrams/diagram_exponential_vs_linear.png",
    imageAlt: "Digital SAT Linear vs Exponential Growth Curve Comparison",
    caption:
      "Comparison of linear growth (constant rate of change d) vs exponential growth (constant percent multiplier r) and asymptotic dominance.",
    formulas: [
      {
        title: "Linear Growth Form",
        latex: "f(t) = mt + b",
        explanation: "Increases by a constant dollar or quantity amount each period (Addition).",
      },
      {
        title: "Exponential Growth Form",
        latex: "g(t) = a(1 + r)^t",
        explanation: "Increases by a constant percentage or ratio each period (Multiplication).",
      },
      {
        title: "Half-Life Decay Formula",
        latex: "A(t) = A_0 \\left(\\frac{1}{2}\\right)^{t/h}",
        explanation: "A_0 = initial mass, h = half-life duration, t = elapsed time.",
      },
    ],
    desmosShortcut: {
      title: "Desmos Growth Crossover Shortcut",
      instructions:
        "Type f(x) = 15x + 20 and g(x) = 20(1.38)^x into Desmos. Click the intersection point to find the exact crossover threshold.",
      latexSnippet: "y = 20(1.38)^x",
    },
    satTraps: [
      "Watch the wording: 'increases by $50 per year' is LINEAR; 'increases by 5% per year' is EXPONENTIAL.",
      "In half-life, ensure the exponent is t / h, where h is the half-life period.",
    ],
  },

  systems_classification: {
    id: "systems_classification",
    navTitle: "Systems of Equations",
    category: "Math",
    domain: "Heart of Algebra (ALG-03)",
    headline: "Systems of Linear Equations: 1, 0, or Infinitely Many Solutions",
    imageSrc: "/diagrams/diagram_systems_classification.png",
    imageAlt: "Digital SAT Systems of Linear Equations 3 Geometric Cases",
    caption:
      "Complete geometric classification of linear systems: intersecting lines (1 solution), parallel lines (no solution), and coincident lines (infinite solutions).",
    formulas: [
      {
        title: "Case 1: Exactly 1 Solution",
        latex: "m_1 \\neq m_2 \\iff \\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}",
        explanation: "Lines have different slopes and intersect at exactly one (x, y) point.",
      },
      {
        title: "Case 2: No Solution (0)",
        latex: "m_1 = m_2, \\; b_1 \\neq b_2 \\iff \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}",
        explanation: "Parallel lines with equal slopes and different y-intercepts. They never intersect.",
      },
      {
        title: "Case 3: Infinitely Many Solutions",
        latex: "m_1 = m_2, \\; b_1 = b_2 \\iff \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}",
        explanation: "Coincident lines: identical slopes and intercepts. Every point on the line is a solution.",
      },
    ],
    desmosShortcut: {
      title: "Desmos System Intersection Shortcut",
      instructions:
        "Type both equations directly into Desmos lines 1 and 2. If lines overlap completely, infinite solutions; if parallel, no solution; if intersecting, click gray dot for (x, y).",
      latexSnippet: "\\begin{cases} 4x - 6y = 15 \\\\ ax - 9y = 20 \\end{cases}",
    },
    satTraps: [
      "For 'no solution' in ax + by = c, the ratio of x-coefficients must equal the ratio of y-coefficients (cross multiply: a1*b2 = a2*b1).",
      "Don't confuse 'x = 0' with 'no solution'. x = 0 is a valid, single solution!",
    ],
  },
};

export default function VisualTopicDiagram({ topicType = "slope_intercept" }: VisualTopicDiagramProps) {
  const [selectedKey, setSelectedKey] = useState<TopicDiagramKey>(topicType);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  useBodyScrollLock(isLightboxOpen);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<"ALL" | "Math" | "Reading & Writing">("ALL");
  const [transitionUserChoice, setTransitionUserChoice] = useState<string | null>(null);
  const [boundaryUserChoice, setBoundaryUserChoice] = useState<string | null>(null);
  const [synthesisChoice, setSynthesisChoice] = useState<string | null>(null);

  // Quick Interactive Simulator State for Selected Topic
  // 1. Slope simulator
  const [simSlopeM, setSimSlopeM] = useState<number>(1.5);
  const [simInterceptB, setSimInterceptB] = useState<number>(1);

  // 2. Parabola simulator
  const [simA, setSimA] = useState<number>(1);
  const [simB, setSimB] = useState<number>(-4);
  const [simC, setSimC] = useState<number>(1);

  // 3. Triangle scale
  const [simScale, setSimScale] = useState<number>(4);

  // 4. Circle radius & angle
  const [simRadius, setSimRadius] = useState<number>(3);
  const [simAngleDeg, setSimAngleDeg] = useState<number>(60);

  // 5. Scatterplot simulator
  const [simScatterX, setSimScatterX] = useState<number>(5);

  // 6. Statistics outlier
  const [simHasOutlier, setSimHasOutlier] = useState<boolean>(false);

  // 7. Trig angle
  const [simTrigAngle, setSimTrigAngle] = useState<number>(25);

  // 8. Similar triangle factor
  const [simScaleK, setSimScaleK] = useState<number>(3);

  // 9. Solids r and h
  const [simSolidR, setSimSolidR] = useState<number>(3);
  const [simSolidH, setSimSolidH] = useState<number>(6);

  // 10. Exponential growth t
  const [simGrowthT, setSimGrowthT] = useState<number>(4);

  // 11. System case
  const [simSystemCase, setSimSystemCase] = useState<"intersecting" | "parallel" | "coincident">("intersecting");

  const allCount = Object.keys(DIAGRAMS_DATA).length;
  const mathCount = Object.values(DIAGRAMS_DATA).filter((d) => d.category === "Math").length;
  const rwCount = Object.values(DIAGRAMS_DATA).filter((d) => d.category === "Reading & Writing").length;

  const handleCategoryFilterChange = (filter: "ALL" | "Math" | "Reading & Writing") => {
    setActiveCategoryFilter(filter);
    if (filter === "Reading & Writing") {
      if (DIAGRAMS_DATA[selectedKey]?.category !== "Reading & Writing") {
        setSelectedKey("rhetorical_transitions");
      }
    } else if (filter === "Math") {
      if (DIAGRAMS_DATA[selectedKey]?.category !== "Math") {
        setSelectedKey("slope_intercept");
      }
    }
  };

  const activeDiagram = DIAGRAMS_DATA[selectedKey] || DIAGRAMS_DATA.slope_intercept;

  const filteredDiagrams = Object.values(DIAGRAMS_DATA).filter(
    (d) => activeCategoryFilter === "ALL" || d.category === activeCategoryFilter
  );

  const handleOpenLightbox = () => {
    setZoomLevel(1);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div className="p-7 md:p-9 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm transition-all space-y-8">
      {/* Top Header & Topic Navigation */}
      <div className="flex flex-col gap-4 pb-5 border-b border-[var(--border-main)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold text-[var(--accent-blue)] uppercase tracking-wider font-mono">
                Academic Visual Laboratory
              </span>
              <span className="text-[var(--text-muted)]">•</span>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                {allCount} High-Resolution 300 DPI Figures
              </span>
            </div>
            <h3 className="text-xl font-black text-[var(--text-main)] tracking-tight">
              Digital SAT Visual Models & First-Principles Taxonomy
            </h3>
          </div>

          {/* Section Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] shrink-0 text-xs">
            <button
              onClick={() => handleCategoryFilterChange("ALL")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeCategoryFilter === "ALL"
                  ? "bg-[var(--accent-blue)] text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              All ({allCount})
            </button>
            <button
              onClick={() => handleCategoryFilterChange("Math")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeCategoryFilter === "Math"
                  ? "bg-[var(--accent-blue)] text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Math ({mathCount})
            </button>
            <button
              onClick={() => handleCategoryFilterChange("Reading & Writing")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeCategoryFilter === "Reading & Writing"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              English / RW ({rwCount})
            </button>
          </div>
        </div>

        {/* Topic Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {filteredDiagrams.map((item) => {
            const isSelected = selectedKey === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedKey(item.id)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-all border ${
                  isSelected
                    ? item.category === "Math"
                      ? "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] shadow-sm"
                      : "bg-purple-600 text-white border-purple-600 shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
                }`}
              >
                {item.navTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Diagram Presentation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Authentic High-Resolution Diagram Frame */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative group rounded-3xl overflow-hidden border border-[var(--border-main)] bg-[var(--bg-card)] shadow-md">
            {/* Academic Figure Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[var(--bg-surface)] border-b border-[var(--border-main)] text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-[var(--text-main)]">
                  FIGURE {activeDiagram.id.toUpperCase()}
                </span>
                <span className="text-[var(--text-muted)]">•</span>
                <span className="text-xs text-[var(--text-muted)] truncate max-w-[200px] sm:max-w-xs font-medium">
                  {activeDiagram.domain}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleOpenLightbox}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-main)] transition-colors text-xs font-semibold shadow-sm"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 size={13} />
                  <span>Inspect High-Res</span>
                </button>
              </div>
            </div>

            {/* Clickable Image Container with Spacious Matting */}
            <div
              onClick={handleOpenLightbox}
              className="cursor-zoom-in relative p-6 sm:p-8 flex items-center justify-center bg-white"
            >
              <img
                src={activeDiagram.imageSrc}
                alt={activeDiagram.imageAlt}
                className="w-full h-auto object-contain max-h-[380px] rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
                loading="eager"
              />

              {/* Hover Badge */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-main)] text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg pointer-events-none flex items-center gap-1.5">
                <ZoomIn size={13} className="text-[var(--accent-blue)]" />
                <span>Click to zoom (300 DPI)</span>
              </div>
            </div>

            {/* Caption Footer */}
            <div className="px-5 py-3.5 bg-[var(--bg-surface)] border-t border-[var(--border-main)] text-xs text-[var(--text-muted)] leading-relaxed font-sans">
              <strong className="text-[var(--text-main)] font-semibold">Caption: </strong>
              {activeDiagram.caption}
            </div>
          </div>

          {/* College Board SAT Traps Callout */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
              <AlertTriangle size={16} />
              <span>College Board SAT Traps & Pitfalls</span>
            </div>
            <ul className="space-y-2 text-[var(--text-main)] text-[11px] pl-5 list-disc">
              {activeDiagram.satTraps.map((trap, idx) => (
                <li key={idx} className="leading-relaxed">
                  {trap}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Formulas, Desmos Shortcuts & Interactive Sandbox */}
        <div className="lg:col-span-5 space-y-5">
          {/* Header Info */}
          <div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono ${
                activeDiagram.category === "Math"
                  ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20"
                  : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
              }`}
            >
              {activeDiagram.domain}
            </span>
            <h4 className="text-lg font-bold text-[var(--text-main)] mt-2 leading-snug">
              {activeDiagram.headline}
            </h4>
          </div>

          {/* Reference Formulas Card */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]">
              <BookOpen size={15} className="text-[var(--accent-blue)]" />
              <span>Core Mathematical Invariants</span>
            </div>

            <div className="space-y-3">
              {activeDiagram.formulas.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--text-main)]">{item.title}</span>
                  </div>
                  <div className="py-1 text-[var(--accent-blue)] font-mono text-sm overflow-x-auto scrollbar-none">
                    <KaTeXMath content={`$$${item.latex}$$`} />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Desmos 10-Second Shortcut Box */}
          {activeDiagram.desmosShortcut && (
            <div className="p-5 rounded-2xl bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/25 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--accent-green)] flex items-center gap-2">
                  <Zap size={15} className="fill-current" />
                  {activeDiagram.desmosShortcut.title}
                </span>
                <span className="font-mono text-[10px] text-[var(--accent-green)] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                  Desmos Native
                </span>
              </div>
              <p className="text-xs text-[var(--text-main)] leading-relaxed font-sans">
                {activeDiagram.desmosShortcut.instructions}
              </p>
              {activeDiagram.desmosShortcut.latexSnippet && (
                <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs text-[var(--accent-green)] flex items-center justify-between shadow-sm">
                  <div className="text-sm font-semibold text-[var(--accent-green)]">
                    <KaTeXMath content={`$${activeDiagram.desmosShortcut.latexSnippet}$`} />
                  </div>
                  <button
                    onClick={() => {
                      if (activeDiagram.desmosShortcut?.latexSnippet) {
                        window.dispatchEvent(
                          new CustomEvent("vespera_desmos_load", {
                            detail: { latex: activeDiagram.desmosShortcut.latexSnippet },
                          })
                        );
                      }
                    }}
                    className="text-[11px] font-bold text-[var(--accent-green)] hover:underline flex items-center gap-1.5"
                  >
                    <span>Load in Desmos</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Interactive Calculation Mini-Lab */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-main)]">
              <span className="flex items-center gap-2">
                <Calculator size={15} className="text-[var(--accent-blue)]" />
                <span>Interactive Concept Evaluator</span>
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">Live Invariant Sandbox</span>
            </div>

            {/* 1. Linear slope calculator */}
            {selectedKey === "slope_intercept" && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                      Slope m: <strong className="text-[var(--accent-blue)]">{simSlopeM}</strong>
                    </label>
                    <input
                      type="range"
                      min="-3"
                      max="3"
                      step="0.5"
                      value={simSlopeM}
                      onChange={(e) => setSimSlopeM(parseFloat(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                      y-intercept b: <strong className="text-emerald-600">{simInterceptB}</strong>
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={simInterceptB}
                      onChange={(e) => setSimInterceptB(parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Function:</span>
                    <span className="font-bold text-[var(--accent-blue)]">
                      y = {simSlopeM}x {simInterceptB >= 0 ? `+ ${simInterceptB}` : `- ${Math.abs(simInterceptB)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Perpendicular Slope (m⟂):</span>
                    <span className="font-bold text-rose-500">
                      {simSlopeM === 0 ? "Undefined (Vertical)" : (-1 / simSlopeM).toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">x-intercept (at y=0):</span>
                    <span className="font-bold text-emerald-600">
                      {simSlopeM === 0 ? "None (Horizontal)" : `(${(-simInterceptB / simSlopeM).toFixed(2)}, 0)`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Parabola Discriminant Calculator */}
            {selectedKey === "quadratic_parabola" && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-[var(--text-muted)] block mb-1">a: {simA}</label>
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="1"
                      value={simA}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setSimA(val === 0 ? 1 : val);
                      }}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--text-muted)] block mb-1">b: {simB}</label>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      step="1"
                      value={simB}
                      onChange={(e) => setSimB(parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--text-muted)] block mb-1">c: {simC}</label>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      step="1"
                      value={simC}
                      onChange={(e) => setSimC(parseInt(e.target.value, 10))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>
                </div>

                {(() => {
                  const D = simB * simB - 4 * simA * simC;
                  const h = -simB / (2 * simA);
                  const k = simC - (simB * simB) / (4 * simA);
                  return (
                    <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Discriminant (b² - 4ac):</span>
                        <span className={`font-bold ${D > 0 ? "text-emerald-500" : D === 0 ? "text-amber-500" : "text-rose-500"}`}>
                          D = {D} ({D > 0 ? "2 Real Roots" : D === 0 ? "1 Tangent Root" : "0 Real Roots"})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Vertex (h, k):</span>
                        <span className="font-bold text-[var(--accent-blue)]">
                          ({h.toFixed(2)}, {k.toFixed(2)})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Apex Direction:</span>
                        <span className="font-bold text-[var(--text-main)]">
                          {simA > 0 ? "Opens UP (Global Minimum)" : "Opens DOWN (Global Maximum)"}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 3. Special Right Triangles Multiplier */}
            {selectedKey === "special_triangles" && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Base Unit x:</span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 5, 10].map((v) => (
                      <button
                        key={v}
                        onClick={() => setSimScale(v)}
                        className={`px-2.5 py-1 rounded-lg font-mono font-bold border transition-colors ${
                          simScale === v
                            ? "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]"
                            : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)]"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1">
                    <span className="font-bold text-[var(--accent-blue)] block font-sans">30°-60°-90°:</span>
                    <div>Short: <strong>{simScale}</strong></div>
                    <div>Long: <strong>{simScale}√3 ≈ {(simScale * 1.732).toFixed(2)}</strong></div>
                    <div>Hyp: <strong>{2 * simScale}</strong></div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1">
                    <span className="font-bold text-emerald-600 block font-sans">45°-45°-90°:</span>
                    <div>Leg 1: <strong>{simScale}</strong></div>
                    <div>Leg 2: <strong>{simScale}</strong></div>
                    <div>Hyp: <strong>{simScale}√2 ≈ {(simScale * 1.414).toFixed(2)}</strong></div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Circle Arc and Sector Calculator */}
            {selectedKey === "circle_geometry" && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                      Radius r: <strong className="text-[var(--accent-blue)]">{simRadius}</strong>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={simRadius}
                      onChange={(e) => setSimRadius(parseInt(e.target.value, 10))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                      Angle θ: <strong className="text-emerald-600">{simAngleDeg}°</strong>
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="360"
                      step="15"
                      value={simAngleDeg}
                      onChange={(e) => setSimAngleDeg(parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                {(() => {
                  const rad = (simAngleDeg * Math.PI) / 180;
                  const arcLen = simRadius * rad;
                  const secArea = 0.5 * simRadius * simRadius * rad;
                  return (
                    <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Radian Measure:</span>
                        <span className="font-bold text-[var(--text-main)]">
                          {(rad / Math.PI).toFixed(2)}π rad ({rad.toFixed(2)} rad)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Arc Length (s = rθ):</span>
                        <span className="font-bold text-[var(--accent-blue)]">{arcLen.toFixed(2)} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Sector Area (A = ½r²θ):</span>
                        <span className="font-bold text-emerald-600">{secArea.toFixed(2)} sq units</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 5. Balance Scale step overview */}
            {selectedKey === "balance_scale" && (
              <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2 text-xs font-mono">
                <span className="font-sans font-bold text-[var(--accent-blue)] block text-[11px]">
                  Isolating 4x + 12 = 36 Step Breakdown:
                </span>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between border-b border-[var(--border-main)] pb-1">
                    <span className="text-[var(--text-muted)]">Pan Balance:</span>
                    <span className="font-bold text-[var(--text-main)]">4x + 12 = 36</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--border-main)] pb-1">
                    <span className="text-[var(--text-muted)]">Remove 12:</span>
                    <span className="font-bold text-amber-500">4x = 24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Divide by 4:</span>
                    <span className="font-bold text-emerald-500">x = 6 (Balanced)</span>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Punctuation quick test */}
            {selectedKey === "punctuation_tree" && (
              <div className="space-y-2 text-xs font-sans">
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block font-mono">
                  SAT Sentence Structure Test:
                </span>
                <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 text-[11px]">
                  <div className="text-[var(--text-main)] font-serif italic">
                    "The telescope verified astronomical coordinates [ ? ] the team announced the discovery."
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 font-mono pt-1">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                      ; Semicolon (Two ICs)
                    </div>
                    <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 font-bold border border-rose-500/20">
                      , Lone Comma (Splice!)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. Rhetorical Transitions Sandbox */}
            {selectedKey === "rhetorical_transitions" && (
              <div className="space-y-3 text-xs font-sans">
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block font-mono">
                  Interactive SAT Transition Challenge:
                </span>
                <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2.5">
                  <p className="text-[var(--text-main)] font-serif italic text-xs leading-relaxed">
                    "Initial trials produced negligible precipitation; [ <strong className="text-purple-600 font-sans not-italic font-bold">{transitionUserChoice || "?"}</strong> ], subsequent iterations with silver iodide yielded substantial rainfall."
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    {[
                      { word: "However", cat: "Contrast", correct: true },
                      { word: "Furthermore", cat: "Addition", correct: false },
                      { word: "Therefore", cat: "Causation", correct: false },
                      { word: "Specifically", cat: "Example", correct: false },
                    ].map((opt) => (
                      <button
                        key={opt.word}
                        onClick={() => setTransitionUserChoice(opt.word)}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          transitionUserChoice === opt.word
                            ? opt.correct
                              ? "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold"
                              : "bg-rose-500/15 border-rose-500 text-rose-500 font-bold"
                            : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)]"
                        }`}
                      >
                        <div>{opt.word}</div>
                        <div className="text-[10px] opacity-75 font-sans">{opt.cat}</div>
                      </button>
                    ))}
                  </div>
                  {transitionUserChoice && (
                    <div className="text-[11px] font-sans pt-1 text-[var(--text-muted)] leading-relaxed">
                      {transitionUserChoice === "However" ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Correct! Sentence 1 is a negative outcome ("negligible"), while Sentence 2 is a positive turnaround ("substantial"). This is a direct conceptual contrast.
                        </span>
                      ) : (
                        <span className="text-rose-500 font-semibold">
                          Incorrect. "Furthermore" and "Therefore" do not express contrast between "negligible" and "substantial".
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 8. Sentence Boundaries Sandbox */}
            {selectedKey === "sentence_boundaries" && (
              <div className="space-y-3 text-xs font-sans">
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block font-mono">
                  Sentence Boundary Clause Validator:
                </span>
                <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2.5">
                  <p className="text-[var(--text-main)] font-serif italic text-xs leading-relaxed">
                    "The rover transmitted atmospheric data [ <strong className="text-purple-600 font-sans not-italic font-bold">{boundaryUserChoice || "?"}</strong> ] mission controllers verified the coordinates."
                  </p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    {[
                      { punct: "; (Semicolon)", correct: true },
                      { punct: ", and", correct: true },
                      { punct: ", (Lone Comma)", correct: false },
                      { punct: "Ø (No punctuation)", correct: false },
                    ].map((opt) => (
                      <button
                        key={opt.punct}
                        onClick={() => setBoundaryUserChoice(opt.punct)}
                        className={`p-2 rounded-lg border text-left transition-all ${
                          boundaryUserChoice === opt.punct
                            ? opt.correct
                              ? "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold"
                              : "bg-rose-500/15 border-rose-500 text-rose-500 font-bold"
                            : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)]"
                        }`}
                      >
                        {opt.punct}
                      </button>
                    ))}
                  </div>
                  {boundaryUserChoice && (
                    <div className="text-[11px] font-sans pt-1 text-[var(--text-muted)] leading-relaxed">
                      {boundaryUserChoice.includes("Semicolon") || boundaryUserChoice === ", and" ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Valid Join! Both sides are complete Independent Clauses (Subject + Verb). Semicolon (;) or Comma + FANBOYS (, and) are 100% legal.
                        </span>
                      ) : (
                        <span className="text-rose-500 font-semibold">
                          Fatal SAT Error! A lone comma produces a Comma Splice (IC , IC). No punctuation produces a Run-on (IC IC).
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 9. Rhetorical Synthesis 3-Step Simulator */}
            {selectedKey === "rhetorical_synthesis" && (
              <div className="space-y-3 text-xs font-sans">
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block font-mono">
                  3-Step SAT Research Notes Simulator:
                </span>
                <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2.5">
                  <div className="text-[11px] font-semibold text-[var(--accent-blue)] font-mono">
                    Target Goal: "The student wants to emphasize a difference between the two telescope models."
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-main)] text-[11px] text-[var(--text-muted)] italic font-serif space-y-1">
                    <div>• Refracting telescopes utilize glass lenses and experience chromatic aberration.</div>
                    <div>• Reflecting telescopes utilize curved mirrors and eliminate chromatic distortion.</div>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {[
                      { text: "While refracting telescopes use lenses causing distortion, reflecting telescopes use mirrors that eliminate it.", correct: true },
                      { text: "Both refracting and reflecting telescopes were historically built to gather astronomical data.", correct: false },
                    ].map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSynthesisChoice(opt.text)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all ${
                          synthesisChoice === opt.text
                            ? opt.correct
                              ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold"
                              : "bg-rose-500/15 border-rose-500 text-rose-500 font-bold"
                            : "bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-main)] hover:border-[var(--accent-blue)]"
                        }`}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                  {synthesisChoice && (
                    <div className="text-[11px] font-sans pt-1">
                      {synthesisChoice.startsWith("While") ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Target Achieved! Contrasts both optical designs directly using "While...".
                        </span>
                      ) : (
                        <span className="text-rose-500 font-semibold">
                          Missed Goal! Choice B states a similarity, but the goal explicitly asked for a difference.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 10. Scatterplot Regression Simulator */}
            {selectedKey === "scatterplot_bestfit" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                    Input Independent Variable x: <strong className="text-[var(--accent-blue)]">{simScatterX}</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={simScatterX}
                    onChange={(e) => setSimScatterX(parseInt(e.target.value, 10))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
                {(() => {
                  const predY = (2.4 * simScatterX + 15).toFixed(1);
                  const obsY = (2.4 * simScatterX + 15 + (simScatterX % 2 === 0 ? 3.2 : -2.8)).toFixed(1);
                  const residual = (parseFloat(obsY) - parseFloat(predY)).toFixed(1);
                  return (
                    <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Model Equation:</span>
                        <span className="font-bold text-[var(--accent-blue)]">ŷ = 2.4x + 15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Predicted ŷ at x={simScatterX}:</span>
                        <span className="font-bold text-[var(--text-main)]">{predY}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Observed Point y:</span>
                        <span className="font-bold text-purple-600">{obsY}</span>
                      </div>
                      <div className="flex justify-between border-t border-[var(--border-main)] pt-1">
                        <span className="text-[var(--text-muted)]">Residual (y - ŷ):</span>
                        <span className={`font-bold ${parseFloat(residual) >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                          {parseFloat(residual) > 0 ? `+${residual}` : residual} ({parseFloat(residual) >= 0 ? "Above Line" : "Below Line"})
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 11. Statistics & Outlier Invariant Simulator */}
            {selectedKey === "statistics_distribution" && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Dataset: [18, 19, 20, 21, 22]</span>
                  <button
                    onClick={() => setSimHasOutlier(!simHasOutlier)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                      simHasOutlier
                        ? "bg-rose-500/15 text-rose-600 border-rose-500/40"
                        : "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border-[var(--accent-blue)]/30"
                    }`}
                  >
                    {simHasOutlier ? "Remove Outlier (95)" : "Inject Outlier (95)"}
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Mean (Average):</span>
                    <span className={`font-bold ${simHasOutlier ? "text-rose-500" : "text-[var(--accent-blue)]"}`}>
                      {simHasOutlier ? "32.5 (Surged by +12.5!)" : "20.0"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Median (Middle Value):</span>
                    <span className="font-bold text-emerald-600">
                      {simHasOutlier ? "20.5 (Virtually Unchanged!)" : "20.0"}
                    </span>
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] font-sans border-t border-[var(--border-main)] pt-1">
                    College Board Invariant: <strong>Outliers heavily distort the MEAN, but leave the MEDIAN robust.</strong>
                  </div>
                </div>
              </div>
            )}

            {/* 12. Trig Complementary Identity Calculator */}
            {selectedKey === "trig_identities" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                    Angle x: <strong className="text-[var(--accent-blue)]">{simTrigAngle}°</strong>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="85"
                    step="5"
                    value={simTrigAngle}
                    onChange={(e) => setSimTrigAngle(parseInt(e.target.value, 10))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
                {(() => {
                  const comp = 90 - simTrigAngle;
                  const rad = (simTrigAngle * Math.PI) / 180;
                  const sinVal = Math.sin(rad).toFixed(4);
                  return (
                    <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Co-Function Pair:</span>
                        <span className="font-bold text-emerald-600">sin({simTrigAngle}°) = cos({comp}°)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Evaluated Value:</span>
                        <span className="font-bold text-[var(--accent-blue)]">{sinVal}</span>
                      </div>
                      <div className="flex justify-between border-t border-[var(--border-main)] pt-1 text-[10px] font-sans">
                        <span className="text-[var(--text-muted)]">Sum of Angles:</span>
                        <span className="font-bold text-[var(--text-main)] font-mono">{simTrigAngle}° + {comp}° = 90°</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 13. Similar Triangles Scale Factor */}
            {selectedKey === "similar_triangles" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                    Linear Scale Factor k: <strong className="text-[var(--accent-blue)]">{simScaleK}x</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={simScaleK}
                    onChange={(e) => setSimScaleK(parseInt(e.target.value, 10))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Side Length Ratio:</span>
                    <span className="font-bold text-[var(--accent-blue)]">L₂ / L₁ = {simScaleK}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Area Ratio (k²):</span>
                    <span className="font-bold text-purple-600">Area₂ / Area₁ = {simScaleK * simScaleK}x</span>
                  </div>
                  <div className="flex justify-between border-t border-[var(--border-main)] pt-1">
                    <span className="text-[var(--text-muted)]">Volume Ratio (k³):</span>
                    <span className="font-bold text-emerald-600">Vol₂ / Vol₁ = {simScaleK * simScaleK * simScaleK}x</span>
                  </div>
                </div>
              </div>
            )}

            {/* 14. 3D Volume Comparison */}
            {selectedKey === "solids_geometry" && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                      Radius r: <strong>{simSolidR}</strong>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      step="1"
                      value={simSolidR}
                      onChange={(e) => setSimSolidR(parseInt(e.target.value, 10))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                      Height h: <strong>{simSolidH}</strong>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      step="1"
                      value={simSolidH}
                      onChange={(e) => setSimSolidH(parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>
                {(() => {
                  const cylV = (Math.PI * simSolidR * simSolidR * simSolidH).toFixed(1);
                  const coneV = (parseFloat(cylV) / 3).toFixed(1);
                  return (
                    <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Cylinder (V = πr²h):</span>
                        <span className="font-bold text-[var(--accent-blue)]">{cylV} units³</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Cone (V = ⅓πr²h):</span>
                        <span className="font-bold text-amber-500">{coneV} units³ (Exact ⅓)</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 15. Exponential vs Linear Dominance */}
            {selectedKey === "exponential_vs_linear" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-[var(--text-muted)] block mb-1">
                    Time Interval t: <strong className="text-[var(--accent-blue)]">{simGrowthT} years</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={simGrowthT}
                    onChange={(e) => setSimGrowthT(parseInt(e.target.value, 10))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
                {(() => {
                  const linearVal = 50 * simGrowthT + 100;
                  const expVal = Math.round(100 * Math.pow(1.18, simGrowthT));
                  return (
                    <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Linear (50t + 100):</span>
                        <span className="font-bold text-[var(--accent-blue)]">{linearVal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-muted)]">Exponential (100 · 1.18ᵗ):</span>
                        <span className="font-bold text-purple-600">{expVal}</span>
                      </div>
                      <div className="border-t border-[var(--border-main)] pt-1 text-[10px] font-sans">
                        <span className={`font-bold ${expVal > linearVal ? "text-purple-600" : "text-[var(--accent-blue)]"}`}>
                          {expVal > linearVal ? "Exponential has surpassed Linear growth!" : "Linear is temporarily ahead in early stages."}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 16. Systems Classification */}
            {selectedKey === "systems_classification" && (
              <div className="space-y-3 text-xs font-sans">
                <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
                  {[
                    { key: "intersecting", label: "1 Solution" },
                    { key: "parallel", label: "0 Solutions" },
                    { key: "coincident", label: "Infinite" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setSimSystemCase(item.key as any)}
                      className={`py-1.5 px-2 rounded-lg font-bold border transition-colors ${
                        simSystemCase === item.key
                          ? "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]"
                          : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-main)]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5 font-mono text-[11px]">
                  {simSystemCase === "intersecting" && (
                    <>
                      <div className="font-bold text-[var(--accent-blue)] font-sans">Case 1: Different Slopes (m₁ ≠ m₂)</div>
                      <div className="text-[var(--text-muted)]">2x + y = 6 and x - y = 0</div>
                      <div className="text-emerald-600 font-bold">Unique point of intersection: (2, 2)</div>
                    </>
                  )}
                  {simSystemCase === "parallel" && (
                    <>
                      <div className="font-bold text-rose-500 font-sans">Case 2: Equal Slopes, Different Intercepts</div>
                      <div className="text-[var(--text-muted)]">2x + y = 6 and 2x + y = 10</div>
                      <div className="text-rose-500 font-bold">Parallel lines $\rightarrow$ 0 intersection points</div>
                    </>
                  )}
                  {simSystemCase === "coincident" && (
                    <>
                      <div className="font-bold text-purple-600 font-sans">Case 3: Proportional Equations (All Ratios Equal)</div>
                      <div className="text-[var(--text-muted)]">2x + y = 6 and 4x + 2y = 12</div>
                      <div className="text-purple-600 font-bold">Same exact line $\rightarrow$ Infinitely Many Solutions</div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox / High-Resolution Modal */}
      {isLightboxOpen && (
        <Portal>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="High Resolution Figure Inspector"
            className="fixed inset-0 w-screen h-screen z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 overflow-hidden"
            onClick={handleCloseLightbox}
          >
          {/* Modal Container Card */}
          <div
            className="w-full max-w-3xl bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl shadow-2xl flex flex-col max-h-[85vh] text-[var(--text-main)] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-main)] bg-[var(--bg-surface)]">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 shrink-0">
                  300 DPI
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[var(--text-main)] truncate">
                    {activeDiagram.headline}
                  </h3>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono block truncate">
                    FIGURE {activeDiagram.id.toUpperCase()} • {activeDiagram.domain}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(0.75, prev - 0.25))}
                  className="p-1.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-main)] transition-colors shadow-2xs"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="text-[11px] font-mono font-bold px-2 py-1 rounded-lg bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-main)] hover:border-[var(--accent-blue)] shadow-2xs"
                  title="Click to reset to 100%"
                  aria-label="Reset zoom to 100%"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(2.5, prev + 0.25))}
                  className="p-1.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-main)] transition-colors shadow-2xs"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
                <a
                  href={activeDiagram.imageSrc}
                  download
                  className="p-1.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-main)] transition-colors shadow-2xs"
                  title="Download PNG Figure"
                  aria-label="Download PNG Figure"
                >
                  <Download size={14} />
                </a>
                <button
                  onClick={handleCloseLightbox}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-colors ml-1 shadow-2xs"
                  title="Close (Esc)"
                  aria-label="Close Modal"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Expanded Image Viewport */}
            <div className="w-full flex-1 overflow-auto overscroll-contain p-4 sm:p-6 bg-[var(--bg-surface)]/60 flex items-center justify-center min-h-[300px]">
              <div className="rounded-2xl overflow-hidden bg-white p-3 sm:p-4 shadow-md border border-[var(--border-main)] inline-flex items-center justify-center max-w-full">
                <img
                  src={activeDiagram.imageSrc}
                  alt={activeDiagram.imageAlt}
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
                  className="max-h-[50vh] sm:max-h-[55vh] max-w-full w-auto h-auto object-contain transition-transform duration-150 block"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-5 py-3 text-xs text-[var(--text-muted)] border-t border-[var(--border-main)] bg-[var(--bg-surface)]">
              <span className="truncate max-w-md text-[11px]">
                <strong className="text-[var(--text-main)] font-semibold">Caption:</strong> {activeDiagram.caption}
              </span>
              <span className="font-mono text-[10px] shrink-0 ml-3 text-[var(--text-muted)]">
                Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-main)] font-bold text-[9px]">ESC</kbd> to exit
              </span>
            </div>
          </div>
        </div>
        </Portal>
      )}
    </div>
  );
}
