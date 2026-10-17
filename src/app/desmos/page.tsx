"use client";

import React, { useState } from "react";
import DesmosCalculator from "@/components/DesmosCalculator";
import KaTeXMath from "@/components/KaTeXMath";
import { Sparkles, ArrowLeft, CheckCircle2, Play, Code2, Zap, Target } from "lucide-react";
import Link from "next/link";

export default function DesmosTacticsLabPage() {
  const [activeTacticIndex, setActiveTacticIndex] = useState(0);

  const tactics = [
    {
      id: "intersection",
      title: "1. The 10-Second Intersection Bypass (Solve Any Single-Variable Equation)",
      badge: "High Frequency",
      description:
        "Bypass algebraic distribution, common denominators, and variable isolation. Graph the left-hand side and right-hand side as two separate horizontal/linear relations.",
      steps: [
        "Line 1 in Desmos: Enter LHS as a function or expression: y = 4(2x - 3) + 7",
        "Line 2 in Desmos: Enter RHS: y = 35",
        "Click the intersection marker where the lines cross. The x-coordinate of the point (x, y) is your exact solution root!",
      ],
      sampleLatex: "y = 4(2x - 3) + 7",
      secondLatex: "y = 35",
    },
    {
      id: "regression",
      title: "2. Nonlinear Regression with '~' (Automated Parameter Discovery)",
      badge: "Bluebook Power Trick",
      description:
        "When given a data table or coordinate points that pass through an unknown polynomial or exponential curve, use the regression tilde (~) to let Desmos solve for unknown constants.",
      steps: [
        "Click the '+' icon in Desmos and insert a Table. Enter points like (1, 8) and (3, 72).",
        "Line 2: Enter exponential regression model: y_1 ~ a * b^{x_1}",
        "Desmos computes exact constants for 'a' and 'b' and statistics in under one second!",
      ],
      sampleLatex: "y_1 \\sim a \\cdot b^{x_1}",
      secondLatex: null,
    },
    {
      id: "vertex",
      title: "3. Parabola Vertex & Discriminant Zeros (Zero Manual Factoring)",
      badge: "Instant Extrema",
      description:
        "Forget manual quadratic formulas (-b / 2a or completing the square). Desmos automatically identifies maximums, minimums, and x-intercepts with interactive grey dots.",
      steps: [
        "Type the full quadratic function: y = -2(x - 4)^2 + 18 or y = 3x^2 - 12x + 5.",
        "Hover and click on the apex of the parabola to see the exact Vertex (h, k).",
        "Click the horizontal x-axis intersections to instantly view exact roots/zeros.",
      ],
      sampleLatex: "y = -2(x - 4)^2 + 18",
      secondLatex: null,
    },
    {
      id: "circle",
      title: "4. Circle Geometry: Center & Radius Inspection",
      badge: "Geometry Standard",
      description:
        "Convert standard circle form directly into visual coordinates without tedious binomial grouping.",
      steps: [
        "Type the equation directly: (x - 3)^2 + (y + 5)^2 = 49.",
        "Desmos plots the full circle. Center is (h, k) = (3, -5).",
        "Radius is the square root of 49: r = 7. Count 7 grid units horizontally or vertically to verify.",
      ],
      sampleLatex: "(x - 3)^2 + (y + 5)^2 = 49",
      secondLatex: null,
    },
    {
      id: "systems",
      title: "5. Systems of Equations: Zero vs. Infinite Solutions with Sliders",
      badge: "SAT Hard Tier",
      description:
        "For problems asking 'For what value of constant k does the system have no solutions or infinitely many solutions?', plot both equations with a slider for k.",
      steps: [
        "Line 1: Enter first linear equation: 3x - 5y = 12.",
        "Line 2: Enter second equation with parameter: k*x - 10y = 24.",
        "Click 'add slider: k'. Drag k to 6: watch both lines become identically coincident (infinitely many solutions)!",
      ],
      sampleLatex: "3x - 5y = 12",
      secondLatex: "6x - 10y = 24",
    },
    {
      id: "equivalence",
      title: "6. Equivalent Expressions & Factoring Verification",
      badge: "100% Accuracy",
      description:
        "When asked which answer choice is equivalent to a complicated algebraic polynomial or rational fraction, graph both.",
      steps: [
        "Line 1: Graph the given prompt expression: y = (x^3 - 8) / (x - 2).",
        "Line 2: Graph your chosen option: y = x^2 + 2x + 4.",
        "If the two curves completely overlap into a single line across all x, they are mathematically identical!",
      ],
      sampleLatex: "y = \\frac{x^3 - 8}{x - 2}",
      secondLatex: "y = x^2 + 2x + 4",
    },
  ];

  const currentTactic = tactics[activeTacticIndex];

  const handleInjectTactic = (tac: typeof tactics[0]) => {
    const latex = tac.sampleLatex;
    window.dispatchEvent(new CustomEvent("vespera_desmos_load", { detail: { latex } }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border-main)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/"
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] text-xs flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-xs font-bold text-[var(--accent-green)] uppercase tracking-wider font-mono">
              College Board Desmos Engine
            </span>
          </div>
          <h1 className="text-2xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-2.5">
            <Sparkles className="text-[var(--accent-green)]" size={26} />
            <span>Desmos Tactics Lab (10s SAT Cheatsheets)</span>
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Over 40% of Digital SAT Math problems can be solved in under 15 seconds without manual calculation using built-in Desmos graphing techniques.
          </p>
        </div>
      </div>

      {/* Main Workspace (Tactics Menu + Live Calculator) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tactics Selector & Guide */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            {tactics.map((tac, idx) => (
              <div
                key={tac.id}
                onClick={() => {
                  setActiveTacticIndex(idx);
                  handleInjectTactic(tac);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeTacticIndex === idx
                    ? "bg-[var(--bg-card)] border-[var(--accent-green)] shadow-sm ring-1 ring-[var(--accent-green)]/30"
                    : "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-[var(--accent-blue)]/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-[var(--text-main)]">{tac.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent-green)]/10 text-[var(--accent-green)] shrink-0 ml-2 font-mono">
                    {tac.badge}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2">{tac.description}</p>
              </div>
            ))}
          </div>

          {/* Active Tactic Detailed Walkthrough Card */}
          <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-[var(--accent-green)]" />
                <h3 className="font-bold text-sm text-[var(--text-main)]">Execution Protocol:</h3>
              </div>

              <button
                onClick={() => handleInjectTactic(currentTactic)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[var(--accent-green)] text-white hover:bg-[var(--accent-green)]/90 transition-all shadow-sm"
              >
                <Play size={12} className="fill-current" />
                <span>Inject to Graph</span>
              </button>
            </div>

            <p className="text-xs text-[var(--text-main)] leading-relaxed">
              {currentTactic.description}
            </p>

            <div className="space-y-2.5 pt-2 border-t border-[var(--border-main)]">
              {currentTactic.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)]">
                  <CheckCircle2 size={15} className="text-[var(--accent-green)] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{st}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-[var(--text-muted)] block mb-1 font-mono">
                Primary Test Expression:
              </span>
              <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] font-mono text-xs text-[var(--accent-blue)]">
                {currentTactic.sampleLatex}
              </div>
            </div>
          </div>
        </div>

        {/* Live Desmos Graphing Area */}
        <div className="lg:col-span-7">
          <div className="sticky top-20">
            <DesmosCalculator initialEquation={currentTactic.sampleLatex} />
          </div>
        </div>
      </div>
    </div>
  );
}
