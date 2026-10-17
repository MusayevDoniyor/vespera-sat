"use client";

import React from "react";

export type DiagramPresetType =
  | "right_triangle_altitude"
  | "right_triangle_trig"
  | "circle_coordinate"
  | "function_shift"
  | "perpendicular_lines"
  | "parabola_tangent"
  | "parallel_lines"
  | "box_plot"
  | "circle_general"
  | "rectangle_area"
  | "similar_triangles"
  | "normal_distribution";

export function getAutoDiagramPreset(prompt: string, domain?: string): DiagramPresetType | null {
  if (!prompt) return null;
  const p = prompt.toLowerCase();
  if (
    p.includes("altitude is drawn from c to hypotenuse") ||
    (p.includes("altitude") && p.includes("hypotenuse")) ||
    (p.includes("ad = 4") && p.includes("db = 9"))
  ) {
    return "right_triangle_altitude";
  }
  if (
    (p.includes("right triangle") || p.includes("triangle abc")) &&
    (p.includes("sin(a)") || p.includes("tan(a)") || p.includes("cos(") || p.includes("acute angles"))
  ) {
    return "right_triangle_trig";
  }
  if (
    (p.includes("x^2 + y^2") || p.includes("circle in the xy-plane") || p.includes("circle equation")) &&
    (p.includes("radius") || p.includes("center"))
  ) {
    return "circle_coordinate";
  }
  if (
    p.includes("g(x) = f(x - 3)") ||
    p.includes("graph of g(x)") ||
    p.includes("transformation occurred") ||
    (p.includes("shifted") && p.includes("graph"))
  ) {
    return "function_shift";
  }
  if (p.includes("perpendicular") && (p.includes("line") || p.includes("slope") || p.includes("reciprocal"))) {
    return "perpendicular_lines";
  }
  if (
    (p.includes("line l_1") || p.includes("line l1") || p.includes("parallel")) &&
    (p.includes("y-intercept") || p.includes("slope") || p.includes("4x - 6y"))
  ) {
    return "parallel_lines";
  }
  if (
    (p.includes("exactly one real solution") || p.includes("exactly one solution") || p.includes("tangent")) &&
    (p.includes("3x^2") || p.includes("quadratic") || p.includes("x^2 - 6x") || p.includes("discriminant"))
  ) {
    return "parabola_tangent";
  }
  if (p.includes("rectangle has a width of n") || (p.includes("rectangle") && p.includes("area of 120"))) {
    return "rectangle_area";
  }
  if (p.includes("diameter of 16") || (p.includes("circle has a diameter") && p.includes("area"))) {
    return "circle_general";
  }
  if (p.includes("margin of error") || p.includes("confidence level") || p.includes("registered voters")) {
    return "normal_distribution";
  }
  if (p.includes("box plot") || p.includes("interquartile") || (p.includes("median") && p.includes("quartile"))) {
    return "box_plot";
  }
  return null;
}

interface QuestionDiagramProps {
  preset?: DiagramPresetType | string | null;
  customSvg?: string | null;
  prompt?: string;
  domain?: string;
  caption?: string;
  className?: string;
}

export default function QuestionDiagram({
  preset,
  customSvg,
  prompt,
  domain,
  caption = "Note: Figure not drawn to scale.",
  className = "",
}: QuestionDiagramProps) {
  const activePreset = (preset as DiagramPresetType) || (prompt ? getAutoDiagramPreset(prompt, domain) : null);
  if (!activePreset && !customSvg) return null;

  return (
    <div
      className={`my-4 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex flex-col items-center justify-center max-w-lg mx-auto shadow-sm transition-colors ${className}`}
    >
      {/* Header Badge */}
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-subtle)] text-[11px] font-semibold tracking-wider uppercase text-[var(--text-muted)]">
        <span>Reference Figure</span>
        <span className="italic font-normal">{caption}</span>
      </div>

      {/* SVG Container */}
      <div className="w-full flex items-center justify-center py-2 overflow-x-auto">
        {customSvg ? (
          <div
            className="w-full max-w-md flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: customSvg }}
          />
        ) : (
          renderPreset(activePreset)
        )}
      </div>
    </div>
  );
}

function renderPreset(preset?: DiagramPresetType | null) {
  switch (preset) {
    case "right_triangle_altitude":
      // Triangle ABC with altitude CD perpendicular to hypotenuse AB
      return (
        <svg
          viewBox="0 0 420 240"
          className="w-full max-w-[380px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Triangle ABC: A=(40, 200), B=(380, 200), C=(160, 40) */}
          <polygon
            points="40,200 380,200 160,40"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="fill-[var(--bg-card)]/50"
          />

          {/* Altitude CD: C=(160, 40) to D=(160, 200) */}
          <line
            x1="160"
            y1="40"
            x2="160"
            y2="200"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />

          {/* Right Angle marker at C=(160, 40) */}
          <path
            d="M 148,56 L 164,68 L 176,52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />

          {/* Right Angle marker at D=(160, 200) */}
          <rect
            x="160"
            y="182"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />

          {/* Segment Dimensions */}
          {/* AD = 4 */}
          <line x1="40" y1="215" x2="160" y2="215" stroke="#94a3b8" strokeWidth="1.5" />
          <text
            x="100"
            y="232"
            textAnchor="middle"
            className="text-xs font-bold fill-[var(--text-main)]"
          >
            AD = 4
          </text>

          {/* DB = 9 */}
          <line x1="160" y1="215" x2="380" y2="215" stroke="#94a3b8" strokeWidth="1.5" />
          <text
            x="270"
            y="232"
            textAnchor="middle"
            className="text-xs font-bold fill-[var(--text-main)]"
          >
            DB = 9
          </text>

          {/* Altitude label h */}
          <text
            x="142"
            y="125"
            textAnchor="end"
            className="text-sm font-bold fill-blue-500 font-mono"
          >
            h (CD = ?)
          </text>

          {/* Vertex Labels */}
          <text x="24" y="206" className="text-sm font-bold fill-[var(--text-main)]">
            A
          </text>
          <text x="390" y="206" className="text-sm font-bold fill-[var(--text-main)]">
            B
          </text>
          <text x="160" y="28" textAnchor="middle" className="text-sm font-bold fill-[var(--text-main)]">
            C
          </text>
          <text x="160" y="196" textAnchor="end" className="text-xs font-bold fill-[var(--text-muted)]">
            D
          </text>
        </svg>
      );

    case "right_triangle_trig":
      // Right triangle ABC with acute angles A, B and right angle C
      return (
        <svg
          viewBox="0 0 360 220"
          className="w-full max-w-[340px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Vertices: C=(60, 180), B=(300, 180), A=(60, 40) */}
          <polygon
            points="60,180 300,180 60,40"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="fill-[var(--bg-card)]/40"
          />

          {/* Right Angle marker at C */}
          <rect
            x="60"
            y="162"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />

          {/* Angle A Arc */}
          <path
            d="M 60,65 A 25 25 0 0 0 78,51"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Angle B Arc */}
          <path
            d="M 270,180 A 30 30 0 0 0 282,166"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />

          {/* Side Labels */}
          <text x="40" y="115" textAnchor="middle" className="text-xs font-bold fill-[var(--text-main)]">
            5
          </text>
          <text x="180" y="198" textAnchor="middle" className="text-xs font-bold fill-[var(--text-main)]">
            12
          </text>
          <text x="195" y="100" textAnchor="middle" className="text-xs font-bold fill-blue-500 font-mono">
            Hypotenuse = 13
          </text>

          {/* Vertex Labels */}
          <text x="56" y="28" textAnchor="middle" className="text-sm font-bold fill-blue-500">
            A
          </text>
          <text x="45" y="190" className="text-sm font-bold fill-[var(--text-main)]">
            C (90°)
          </text>
          <text x="312" y="186" className="text-sm font-bold fill-emerald-500">
            B
          </text>
        </svg>
      );

    case "circle_coordinate":
      // Coordinate plane circle centered at (5, -3) with radius 5
      return (
        <svg
          viewBox="0 0 340 260"
          className="w-full max-w-[320px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Coordinate Grid Axes */}
          <line x1="30" y1="90" x2="310" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="90" y1="20" x2="90" y2="240" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="315" y="94" className="text-[11px] font-bold fill-[var(--text-muted)]">
            x
          </text>
          <text x="94" y="20" className="text-[11px] font-bold fill-[var(--text-muted)]">
            y
          </text>

          {/* Origin */}
          <text x="80" y="104" className="text-[10px] fill-[var(--text-muted)]">
            (0,0)
          </text>

          {/* Circle (x - 5)^2 + (y + 3)^2 = 25 */}
          {/* Scale: Origin=(90, 90). Center at x=5 (scale 16px/unit -> 90+80=170), y=-3 (down 48px -> 90+48=138), Radius 5=80px */}
          <circle
            cx="170"
            cy="138"
            r="80"
            stroke="#3b82f6"
            strokeWidth="2.5"
            className="fill-blue-500/10"
          />

          {/* Center Point */}
          <circle cx="170" cy="138" r="4" fill="#3b82f6" />
          <text
            x="176"
            y="136"
            className="text-[11px] font-bold fill-[var(--text-main)]"
          >
            (h, k) = (5, -3)
          </text>

          {/* Radius line */}
          <line
            x1="170"
            y1="138"
            x2="250"
            y2="138"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <text
            x="210"
            y="130"
            textAnchor="middle"
            className="text-xs font-bold fill-emerald-500 font-mono"
          >
            r = 5
          </text>
        </svg>
      );

    case "function_shift":
      // Transformation graph: f(x) and g(x) = f(x - 3) + 5
      return (
        <svg
          viewBox="0 0 360 240"
          className="w-full max-w-[340px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Axes */}
          <line x1="30" y1="180" x2="330" y2="180" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="120" y1="20" x2="120" y2="220" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="335" y="184" className="text-[11px] font-bold fill-[var(--text-muted)]">x</text>
          <text x="124" y="24" className="text-[11px] font-bold fill-[var(--text-muted)]">y</text>

          {/* Original Parabola f(x) with vertex at (120, 180) */}
          <path
            d="M 70,80 Q 120,180 170,80"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 3"
          />
          <circle cx="120" cy="180" r="4" fill="#94a3b8" />
          <text x="100" y="196" className="text-[10px] fill-[var(--text-muted)] font-mono">f(x) vertex (0, 0)</text>

          {/* Shift Vector Arrow: 3 right (60px) + 5 up (80px) -> vertex at (180, 100) */}
          <path
            d="M 120,180 L 180,180 L 180,105"
            stroke="#f59e0b"
            strokeWidth="1.8"
            strokeDasharray="3 3"
            fill="none"
          />
          <text x="150" y="194" textAnchor="middle" className="text-[10px] font-bold fill-amber-500">
            +3 Right
          </text>
          <text x="190" y="145" className="text-[10px] font-bold fill-amber-500">
            +5 Up
          </text>

          {/* Shifted Parabola g(x) */}
          <path
            d="M 130,20 Q 180,100 230,20"
            stroke="#3b82f6"
            strokeWidth="2.8"
            fill="none"
          />
          <circle cx="180" cy="100" r="4.5" fill="#3b82f6" />
          <text x="190" y="96" className="text-xs font-bold fill-blue-500 font-mono">
            g(x) = f(x - 3) + 5
          </text>
        </svg>
      );

    case "perpendicular_lines":
      // Two perpendicular lines with right-angle marker
      return (
        <svg
          viewBox="0 0 340 220"
          className="w-full max-w-[320px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Axes */}
          <line x1="20" y1="160" x2="320" y2="160" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="80" y1="20" x2="80" y2="200" stroke="#94a3b8" strokeWidth="1.2" />

          {/* Line 1: positive slope m1 = 2 */}
          <line x1="40" y1="200" x2="220" y2="20" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="225" y="30" className="text-xs font-bold fill-blue-500">Line k (slope m)</text>

          {/* Line 2: perpendicular slope m2 = -1/2 */}
          <line x1="40" y1="65" x2="280" y2="185" stroke="#8b5cf6" strokeWidth="2.5" />
          <text x="285" y="180" className="text-xs font-bold fill-purple-500">Line p (slope -1/m)</text>

          {/* Intersection point at (130, 110) */}
          <circle cx="130" cy="110" r="4.5" fill="#ef4444" />
          <text x="140" y="110" className="text-xs font-bold fill-rose-500 font-mono">
            (2, 8)
          </text>

          {/* Square right-angle symbol at (130, 110) */}
          <path
            d="M 120,105 L 125,95 L 135,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );

    case "parabola_tangent":
      // Parabola y = 3x^2 - 12x + 12 touching x-axis at (2, 0)
      return (
        <svg
          viewBox="0 0 340 220"
          className="w-full max-w-[320px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Axes */}
          <line x1="30" y1="170" x2="310" y2="170" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="100" y1="20" x2="100" y2="200" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="315" y="174" className="text-[11px] font-bold fill-[var(--text-muted)]">x</text>
          <text x="104" y="24" className="text-[11px] font-bold fill-[var(--text-muted)]">y</text>

          {/* Parabola touching at (170, 170) -> x = 2 */}
          <path
            d="M 120,40 Q 170,170 220,40"
            stroke="#3b82f6"
            strokeWidth="2.8"
            fill="none"
          />

          {/* Tangent point on x-axis */}
          <circle cx="170" cy="170" r="5" fill="#ef4444" />
          <text
            x="170"
            y="192"
            textAnchor="middle"
            className="text-xs font-bold fill-rose-500 font-mono"
          >
            (2, 0) — Tangent point
          </text>

          <text x="175" y="70" className="text-xs font-bold fill-blue-500 font-mono">
            b² - 4ac = 0
          </text>
          <text x="175" y="86" className="text-[11px] fill-[var(--text-muted)] font-mono">
            Exactly 1 real root
          </text>
        </svg>
      );

    case "box_plot":
      // Statistical Box Plot
      return (
        <svg
          viewBox="0 0 380 160"
          className="w-full max-w-[360px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Number line */}
          <line x1="30" y1="120" x2="350" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Ticks */}
          {[50, 100, 150, 200, 250, 300].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="116" x2={x} y2="124" stroke="#94a3b8" strokeWidth="1.5" />
              <text x={x} y="138" textAnchor="middle" className="text-[10px] fill-[var(--text-muted)]">
                {10 * (i + 1)}
              </text>
            </g>
          ))}

          {/* Left Whisker: 60 to 120 */}
          <line x1="60" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="2" />
          <line x1="60" y1="45" x2="60" y2="75" stroke="currentColor" strokeWidth="2" />
          <text x="60" y="40" textAnchor="middle" className="text-[10px] font-bold fill-[var(--text-muted)]">
            Min
          </text>

          {/* Box: 120 (Q1) to 260 (Q3) */}
          <rect
            x="120"
            y="35"
            width="140"
            height="50"
            stroke="#3b82f6"
            strokeWidth="2.2"
            className="fill-blue-500/15"
          />
          <text x="120" y="28" textAnchor="middle" className="text-[10px] font-bold fill-blue-500">
            Q1 (25%)
          </text>

          {/* Median line at 180 */}
          <line x1="180" y1="35" x2="180" y2="85" stroke="#ef4444" strokeWidth="2.5" />
          <text x="180" y="28" textAnchor="middle" className="text-[10px] font-bold fill-rose-500">
            Median
          </text>

          <text x="260" y="28" textAnchor="middle" className="text-[10px] font-bold fill-blue-500">
            Q3 (75%)
          </text>

          {/* Right Whisker: 260 to 320 */}
          <line x1="260" y1="60" x2="320" y2="60" stroke="currentColor" strokeWidth="2" />
          <line x1="320" y1="45" x2="320" y2="75" stroke="currentColor" strokeWidth="2" />
          <text x="320" y="40" textAnchor="middle" className="text-[10px] font-bold fill-[var(--text-muted)]">
            Max
          </text>
        </svg>
      );

    case "parallel_lines":
      // Parallel lines L1 and L2 intersected by a transversal
      return (
        <svg
          viewBox="0 0 360 220"
          className="w-full max-w-[340px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Line L1: 4x - 6y = 15 (slope 2/3) */}
          <line x1="30" y1="70" x2="330" y2="70" stroke="#3b82f6" strokeWidth="2.5" />
          {/* Parallel arrow on L1 */}
          <path d="M 170,64 L 182,70 L 170,76" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1" />
          <text x="35" y="60" className="text-xs font-bold fill-blue-500 font-mono">
            L₁: 4x - 6y = 15 (m = 2/3)
          </text>

          {/* Line L2: Parallel, through (9, 2) */}
          <line x1="30" y1="150" x2="330" y2="150" stroke="#10b981" strokeWidth="2.5" />
          {/* Parallel arrow on L2 */}
          <path d="M 170,144 L 182,150 L 170,156" fill="#10b981" stroke="#10b981" strokeWidth="1" />
          <text x="35" y="140" className="text-xs font-bold fill-emerald-500 font-mono">
            L₂: Parallel to L₁ through (9, 2)
          </text>

          {/* Transversal line t */}
          <line x1="90" y1="20" x2="270" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
          <text x="275" y="195" className="text-xs font-bold fill-[var(--text-muted)]">
            t
          </text>

          {/* Point (9, 2) marker on L2 */}
          <circle cx="210" cy="150" r="4.5" fill="#ef4444" />
          <text x="218" y="166" className="text-xs font-bold fill-rose-500 font-mono">
            (9, 2)
          </text>

          {/* Note */}
          <text x="180" y="210" textAnchor="middle" className="text-[11px] font-semibold fill-[var(--text-muted)]">
            Slopes are equal: m₁ = m₂ = 2/3
          </text>
        </svg>
      );

    case "circle_general":
      // Geometric circle with diameter and radius
      return (
        <svg
          viewBox="0 0 320 220"
          className="w-full max-w-[300px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circle */}
          <circle cx="160" cy="110" r="75" stroke="#3b82f6" strokeWidth="2.5" className="fill-blue-500/10" />

          {/* Center Point O */}
          <circle cx="160" cy="110" r="4" fill="currentColor" />
          <text x="160" y="100" textAnchor="middle" className="text-xs font-bold fill-[var(--text-main)] font-mono">
            O
          </text>

          {/* Diameter AB */}
          <line x1="85" y1="110" x2="235" y2="110" stroke="#ef4444" strokeWidth="2.2" />
          <circle cx="85" cy="110" r="3.5" fill="#ef4444" />
          <circle cx="235" cy="110" r="3.5" fill="#ef4444" />
          <text x="75" y="114" textAnchor="end" className="text-xs font-bold fill-[var(--text-main)]">
            A
          </text>
          <text x="245" y="114" textAnchor="start" className="text-xs font-bold fill-[var(--text-main)]">
            B
          </text>

          {/* Radius label */}
          <text x="195" y="126" textAnchor="middle" className="text-xs font-bold fill-emerald-500 font-mono">
            r = 8
          </text>

          {/* Formula */}
          <text x="160" y="200" textAnchor="middle" className="text-xs font-bold fill-[var(--text-main)] font-mono">
            Diameter = 16 cm ⇒ Area = π(8)² = 64π
          </text>
        </svg>
      );

    case "rectangle_area":
      // Rectangle with width n, length n + 7, Area = 120
      return (
        <svg
          viewBox="0 0 360 220"
          className="w-full max-w-[340px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rectangle ABCD */}
          <rect
            x="70"
            y="50"
            width="220"
            height="120"
            stroke="#3b82f6"
            strokeWidth="2.5"
            className="fill-blue-500/10"
          />

          {/* Corner right angle markers */}
          <rect x="70" y="50" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="276" y="50" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="70" y="156" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="276" y="156" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" />

          {/* Width label (left): n */}
          <text x="50" y="115" textAnchor="middle" className="text-sm font-bold fill-amber-500 font-mono">
            n
          </text>

          {/* Length label (top): n + 7 */}
          <text x="180" y="38" textAnchor="middle" className="text-sm font-bold fill-amber-500 font-mono">
            Length = n + 7
          </text>

          {/* Center Area */}
          <text x="180" y="105" textAnchor="middle" className="text-sm font-bold fill-blue-500 font-mono">
            Area = 120 yd²
          </text>
          <text x="180" y="125" textAnchor="middle" className="text-xs fill-[var(--text-muted)] font-mono">
            n(n + 7) = 120 ⇒ n = 8, L = 15
          </text>

          {/* Bottom perimeter note */}
          <text x="180" y="200" textAnchor="middle" className="text-xs font-bold fill-[var(--text-main)] font-mono">
            Perimeter = 2(8 + 15) = 46 yards
          </text>
        </svg>
      );

    case "similar_triangles":
      // Similar triangles ADE and ABC with DE || BC
      return (
        <svg
          viewBox="0 0 360 220"
          className="w-full max-w-[340px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Triangle ABC: A=(180, 30), B=(60, 190), C=(300, 190) */}
          <polygon
            points="180,30 60,190 300,190"
            stroke="currentColor"
            strokeWidth="2.5"
            className="fill-[var(--bg-card)]/40"
          />

          {/* Segment DE parallel to BC: D=(120, 110), E=(240, 110) */}
          <line x1="120" y1="110" x2="240" y2="110" stroke="#3b82f6" strokeWidth="2.5" />

          {/* Parallel arrows */}
          <path d="M 175,106 L 185,110 L 175,114" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1" />
          <path d="M 175,186 L 185,190 L 175,194" fill="currentColor" stroke="currentColor" strokeWidth="1" />

          {/* Labels */}
          <text x="180" y="22" textAnchor="middle" className="text-sm font-bold fill-[var(--text-main)]">A</text>
          <text x="105" y="112" textAnchor="end" className="text-xs font-bold fill-blue-500">D</text>
          <text x="255" y="112" textAnchor="start" className="text-xs font-bold fill-blue-500">E</text>
          <text x="45" y="195" textAnchor="end" className="text-sm font-bold fill-[var(--text-main)]">B</text>
          <text x="315" y="195" textAnchor="start" className="text-sm font-bold fill-[var(--text-main)]">C</text>

          <text x="180" y="145" textAnchor="middle" className="text-xs font-bold fill-blue-500 font-mono">
            DE ∥ BC ⇒ △ADE ∼ △ABC
          </text>
        </svg>
      );

    case "normal_distribution":
      // Normal bell curve with confidence interval & margin of error
      return (
        <svg
          viewBox="0 0 380 200"
          className="w-full max-w-[360px] h-auto text-[var(--text-main)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Baseline */}
          <line x1="30" y1="160" x2="350" y2="160" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Shaded 95% Confidence Interval Area */}
          <path
            d="M 100,160 Q 140,150 160,80 Q 190,20 190,20 Q 190,20 220,80 Q 240,150 280,160 Z"
            className="fill-blue-500/20"
          />

          {/* Bell curve */}
          <path
            d="M 40,160 C 100,160 140,140 160,80 C 175,35 185,20 190,20 C 195,20 205,35 220,80 C 240,140 280,160 340,160"
            stroke="#3b82f6"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Mean Center Line */}
          <line x1="190" y1="20" x2="190" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <text x="190" y="175" textAnchor="middle" className="text-xs font-bold fill-rose-500 font-mono">
            p̂ = 64%
          </text>

          {/* Margin of error bounds: 64% ± 2.8% */}
          <line x1="130" y1="110" x2="130" y2="160" stroke="#10b981" strokeWidth="1.8" strokeDasharray="2 2" />
          <line x1="250" y1="110" x2="250" y2="160" stroke="#10b981" strokeWidth="1.8" strokeDasharray="2 2" />
          <text x="130" y="175" textAnchor="middle" className="text-[10px] font-bold fill-emerald-500 font-mono">
            61.2%
          </text>
          <text x="250" y="175" textAnchor="middle" className="text-[10px] font-bold fill-emerald-500 font-mono">
            66.8%
          </text>

          {/* Double arrow for margin of error */}
          <line x1="130" y1="135" x2="250" y2="135" stroke="#10b981" strokeWidth="1.8" />
          <text x="190" y="130" textAnchor="middle" className="text-[11px] font-bold fill-emerald-500 font-mono">
            Margin of Error = ±2.8% (95% CI)
          </text>
        </svg>
      );

    default:
      return null;
  }
}
