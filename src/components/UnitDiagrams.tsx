"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Zap, Info, ShieldCheck } from "lucide-react";
import KaTeXMath from "./KaTeXMath";

interface DiagramProps {
  type: string;
}

export default function UnitDiagrams({ type }: DiagramProps) {
  if (type === "adaptive-routing") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              Digital SAT Multistage Adaptive Routing Engine
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30 font-bold">
            Interactive Flowchart
          </span>
        </div>

        <div className="w-full overflow-x-auto pb-2">
          <svg viewBox="0 0 760 280" className="w-full min-w-[650px] font-sans">
            <defs>
              <linearGradient id="gradMod1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="gradHard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="gradEasy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0.1" />
              </linearGradient>
              <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
              </marker>
              <marker id="arrowOrange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* MODULE 1 BOX */}
            <rect x="30" y="80" width="220" height="120" rx="16" fill="url(#gradMod1)" stroke="#3b82f6" strokeWidth="2" />
            <text x="140" y="112" textAnchor="middle" fill="#1e40af" className="dark:fill-blue-200" fontWeight="bold" fontSize="14">MODULE 1 (Routing)</text>
            <text x="140" y="134" textAnchor="middle" fill="#334155" className="dark:fill-slate-200" fontSize="12">22 Questions • 35 Minutes</text>
            <text x="140" y="156" textAnchor="middle" fill="#64748b" className="dark:fill-slate-400" fontSize="11">Mix: Easy, Medium, Hard</text>
            <text x="140" y="180" textAnchor="middle" fill="#0284c7" className="dark:fill-sky-300" fontSize="11" fontWeight="600">Threshold: ~15/22 Correct</text>

            {/* ROUTING PATHS */}
            {/* Top Branch (Hard) */}
            <path d="M 250 120 C 330 120, 340 55, 430 55" fill="none" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowGreen)" strokeDasharray="5,2" />
            <rect x="295" y="42" width="105" height="26" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="347" y="59" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Score ≥ 15</text>

            {/* Bottom Branch (Easy) */}
            <path d="M 250 160 C 330 160, 340 225, 430 225" fill="none" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrowOrange)" strokeDasharray="5,2" />
            <rect x="295" y="212" width="105" height="26" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
            <text x="347" y="229" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">Score &lt; 14</text>

            {/* HARD MODULE 2 BOX */}
            <rect x="440" y="20" width="280" height="95" rx="16" fill="url(#gradHard)" stroke="#10b981" strokeWidth="2" />
            <text x="580" y="48" textAnchor="middle" fill="#065f46" className="dark:fill-emerald-300" fontWeight="bold" fontSize="14">HARD MODULE 2 (Unlocked)</text>
            <text x="580" y="70" textAnchor="middle" fill="#334155" className="dark:fill-slate-200" fontSize="12" fontWeight="bold">Score Ceiling: 800 Perfect</text>
            <text x="580" y="92" textAnchor="middle" fill="#047857" className="dark:fill-emerald-200" fontSize="11">Even missing 4-5 questions yields 720–760!</text>

            {/* EASY MODULE 2 BOX */}
            <rect x="440" y="165" width="280" height="95" rx="16" fill="url(#gradEasy)" stroke="#f59e0b" strokeWidth="2" />
            <text x="580" y="193" textAnchor="middle" fill="#92400e" className="dark:fill-amber-300" fontWeight="bold" fontSize="14">EASY MODULE 2 (Restricted)</text>
            <text x="580" y="215" textAnchor="middle" fill="#b91c1c" className="dark:fill-rose-300" fontSize="12" fontWeight="bold">Score Capped at ~600 – 640</text>
            <text x="580" y="237" textAnchor="middle" fill="#78350f" className="dark:fill-amber-200" fontSize="11">100% in Mod 2 still CANNOT reach 700</text>
          </svg>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/30 text-xs text-blue-950 dark:text-blue-200 leading-relaxed flex items-start gap-3">
          <Info size={17} className="shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <span>
            <strong>Strategic Imperative:</strong> Do not make careless mistakes on Questions 1 through 15 in Module 1. High early accuracy guarantees routing into Hard Module 2, securing your 700–800 score potential!
          </span>
        </div>
      </div>
    );
  }

  if (type === "pacing-clock") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              The 95-Second Pacing Velocity Dial (35-Minute Module)
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-bold">
            Time Management
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-3">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/30">
            <div className="text-[11px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">Phase 1: Sprint</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">Questions 1 – 6</div>
            <div className="text-xs text-blue-700 dark:text-blue-200 mt-0.5 font-medium">30 – 45 sec / question</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-mono">Time remaining: ~31:00</div>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-500/30">
            <div className="text-[11px] font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">Phase 2: Cruise</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">Questions 7 – 14</div>
            <div className="text-xs text-cyan-700 dark:text-cyan-200 mt-0.5 font-medium">60 – 75 sec / question</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-mono">Time remaining: ~19:00</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30">
            <div className="text-[11px] font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider">Phase 3: Deep Work</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">Questions 15 – 18</div>
            <div className="text-xs text-purple-700 dark:text-purple-200 mt-0.5 font-medium">90 – 120 sec / question</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-mono">Time remaining: ~10:00</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30">
            <div className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">Phase 4: Endbosses</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">Questions 19 – 22</div>
            <div className="text-xs text-amber-700 dark:text-amber-200 mt-0.5 font-medium">120 – 150 sec / question</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-mono">Time remaining: ~02:00 (Check)</div>
          </div>
        </div>

        {/* Progress Bar Timeline */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden flex my-2 border border-slate-300 dark:border-slate-700">
          <div style={{ width: "25%" }} className="bg-blue-500 h-full" title="Easy sprint (Q1-6)" />
          <div style={{ width: "35%" }} className="bg-cyan-500 h-full" title="Medium cruise (Q7-14)" />
          <div style={{ width: "25%" }} className="bg-purple-500 h-full" title="Hard calculation (Q15-18)" />
          <div style={{ width: "15%" }} className="bg-amber-500 h-full" title="Endbosses & Review (Q19-22)" />
        </div>
      </div>
    );
  }

  if (type === "desmos-keyboard") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-cyan-600 dark:text-cyan-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              Digital SAT Built-in Desmos Superpowers
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-bold">
            Cheat Sheet
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-main)] space-y-1.5 shadow-sm">
            <div className="font-bold text-slate-900 dark:text-[var(--text-main)] flex items-center justify-between">
              <span>1. Single-Variable Direct Solver</span>
              <code className="text-cyan-700 dark:text-cyan-400 font-mono text-[11px] font-bold">Vertical Line</code>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              No manual algebra required. Typing <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-amber-600 dark:text-yellow-300">4(3x - 5) + 2 = 38</code> plots a vertical line at <code className="text-emerald-600 dark:text-emerald-400 font-bold">x = 4.667</code>. Read the answer directly!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-main)] space-y-1.5 shadow-sm">
            <div className="font-bold text-slate-900 dark:text-[var(--text-main)] flex items-center justify-between">
              <span>2. Linear & Quadratic Regression</span>
              <code className="text-purple-700 dark:text-purple-400 font-mono text-[11px] font-bold">~ Tilde Operator</code>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Add a table (+ icon), then type <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-amber-600 dark:text-yellow-300">y1 ~ m x1 + b</code> or <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-amber-600 dark:text-yellow-300">y1 ~ a(x1 - h)^2 + k</code>. Parameters are computed automatically.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-main)] space-y-1.5 shadow-sm">
            <div className="font-bold text-slate-900 dark:text-[var(--text-main)] flex items-center justify-between">
              <span>3. System of Equations Intersection</span>
              <code className="text-blue-700 dark:text-blue-400 font-mono text-[11px] font-bold">Grey Dot Click</code>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Enter Equation 1 on Line 1, Equation 2 on Line 2. Tap the grey intersection dot where lines cross — (x, y) coordinates pop up immediately.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-[var(--border-main)] space-y-1.5 shadow-sm">
            <div className="font-bold text-slate-900 dark:text-[var(--text-main)] flex items-center justify-between">
              <span>4. Decimal to Fraction Converter</span>
              <code className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] font-bold">Fraction Icon</code>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Click the small fraction rectangle toggle next to any decimal calculation to instantly convert values like <code className="text-emerald-600 dark:text-emerald-400 font-bold">0.8333...</code> into <code className="text-emerald-600 dark:text-emerald-400 font-bold">5/6</code>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "formula-reference") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              Formula Comparison: Provided on Screen vs MUST Memorize
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-bold">
            Essential Truth
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PROVIDED */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30">
            <div className="flex items-center gap-2 mb-3 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wide">
              <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>PROVIDED ON SCREEN (Bluebook Reference)</span>
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-disc pl-4 font-medium">
              <li><KaTeXMath mathText="Area of circle ($A = \pi r^2$) and circumference ($C = 2\pi r$)" /></li>
              <li>Area of rectangle and triangle</li>
              <li>Volume of cylinder, cone, sphere, and pyramid</li>
              <li><KaTeXMath mathText="Pythagorean theorem ($a^2 + b^2 = c^2$)" /></li>
              <li><KaTeXMath mathText="Special right triangles: $30^\circ-60^\circ-90^\circ$ and $45^\circ-45^\circ-90^\circ$" /></li>
              <li><KaTeXMath mathText="Degrees in circle ($360^\circ$) and radians ($2\pi$)" /></li>
            </ul>
          </div>

          {/* NOT PROVIDED */}
          <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/30">
            <div className="flex items-center gap-2 mb-3 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle size={16} className="text-rose-600 dark:text-rose-400" />
              <span>NOT PROVIDED (MUST MEMORIZE 100%!)</span>
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-disc pl-4 font-medium">
              <li><KaTeXMath mathText="**Quadratic Formula:** $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$" /></li>
              <li><KaTeXMath mathText="**Parabola Vertex:** $x_v = -\frac{b}{2a}$, $y_v = f(x_v)$" /></li>
              <li><KaTeXMath mathText="**Vieta's Formulas:** $r_1 + r_2 = -b/a$, $r_1 r_2 = c/a$" /></li>
              <li><KaTeXMath mathText="**Discriminant Rules:** $D = b^2 - 4ac$" /></li>
              <li><KaTeXMath mathText="**Circle Standard Form:** $(x-h)^2 + (y-k)^2 = r^2$" /></li>
              <li><KaTeXMath mathText="**Slope Formula:** $m = \frac{y_2 - y_1}{x_2 - x_1}$" /></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (type === "linear-graph") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
            <KaTeXMath mathText="Linear Graph: Slope ($m = \frac{\Delta y}{\Delta x}$) & Intercept ($b$)" />
          </h4>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30 font-bold">
            <KaTeXMath mathText="$y = \frac{3}{2}x + 1$" />
          </span>
        </div>

        <div className="w-full overflow-x-auto flex justify-center">
          <svg viewBox="0 0 400 300" className="w-full max-w-[420px] font-sans">
            {/* Grid Lines */}
            <g stroke="#94a3b8" strokeWidth="0.5" opacity="0.3">
              {[-100, -50, 0, 50, 100, 150].map((pos) => (
                <React.Fragment key={pos}>
                  <line x1="40" y1={150 - pos} x2="360" y2={150 - pos} />
                  <line x1={200 + pos} y1="30" x2={200 + pos} y2="270" />
                </React.Fragment>
              ))}
            </g>

            {/* Axes */}
            <line x1="40" y1="150" x2="360" y2="150" stroke="#64748b" strokeWidth="2" />
            <line x1="200" y1="30" x2="200" y2="270" stroke="#64748b" strokeWidth="2" />
            <text x="350" y="142" fill="#64748b" fontSize="12" fontWeight="bold">x</text>
            <text x="208" y="42" fill="#64748b" fontSize="12" fontWeight="bold">y</text>

            {/* Linear Line */}
            <line x1="60" y1="255" x2="320" y2="60" stroke="#0284c7" strokeWidth="3" />

            {/* Slope Triangle */}
            <path d="M 200 110 L 280 110 L 280 20" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="4,3" />
            <text x="240" y="128" fill="#d97706" fontSize="11" textAnchor="middle" fontWeight="bold">Run: Δx = 2</text>
            <text x="295" y="70" fill="#d97706" fontSize="11" fontWeight="bold">Rise: Δy = 3</text>

            {/* Intercept Point (0, 1) */}
            <circle cx="200" cy="110" r="5" fill="#059669" />
            <text x="135" y="105" fill="#059669" fontSize="11" fontWeight="bold">y-int: (0, 1)</text>

            {/* Point (2, 4) */}
            <circle cx="280" cy="20" r="5" fill="#0284c7" />
            <text x="290" y="25" fill="#0284c7" fontSize="11" fontWeight="bold">(2, 4)</text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "system-intersection") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
            System of Equations: Unique Intersection Point
          </h4>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-bold">
            Intersection Point (x₀, y₀)
          </span>
        </div>

        <div className="w-full overflow-x-auto flex justify-center">
          <svg viewBox="0 0 400 280" className="w-full max-w-[420px] font-sans">
            {/* Axes */}
            <line x1="40" y1="140" x2="360" y2="140" stroke="#64748b" strokeWidth="1.5" />
            <line x1="200" y1="30" x2="200" y2="250" stroke="#64748b" strokeWidth="1.5" />

            {/* Line 1 */}
            <line x1="100" y1="240" x2="300" y2="40" stroke="#0284c7" strokeWidth="2.5" />
            <text x="305" y="45" fill="#0284c7" fontSize="11" fontWeight="bold">Line 1: y = 2x - 2</text>

            {/* Line 2 */}
            <line x1="90" y1="50" x2="320" y2="220" stroke="#e11d48" strokeWidth="2.5" />
            <text x="315" y="235" fill="#e11d48" fontSize="11" fontWeight="bold">Line 2: y = -x + 4</text>

            {/* Intersection at (2, 2) */}
            <circle cx="233" cy="107" r="7" fill="#f59e0b" stroke="#78350f" strokeWidth="2" className="animate-pulse" />
            <rect x="245" y="90" width="115" height="28" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            <text x="302" y="108" fill="#fde68a" fontSize="11" textAnchor="middle" fontWeight="bold">Solution (2, 2)</text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "inequality-plane") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              Linear Inequality Shading & Boundary Rules
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/30 font-bold">
            y &gt; 2x - 2 (Dashed Boundary)
          </span>
        </div>

        <div className="w-full overflow-x-auto flex justify-center">
          <svg viewBox="0 0 420 280" className="w-full max-w-[440px] font-sans">
            <defs>
              <linearGradient id="shadeRegion" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Shaded Region Polygon (y > 2x - 2, upper-left region) */}
            <polygon points="40,240 40,30 380,30 250,30 145,240" fill="url(#shadeRegion)" />

            {/* Grid Axes */}
            <line x1="40" y1="140" x2="380" y2="140" stroke="#64748b" strokeWidth="1.5" />
            <line x1="210" y1="30" x2="210" y2="250" stroke="#64748b" strokeWidth="1.5" />
            <text x="370" y="132" fill="#64748b" fontSize="12" fontWeight="bold">x</text>
            <text x="218" y="42" fill="#64748b" fontSize="12" fontWeight="bold">y</text>

            {/* Dashed Boundary Line y = 2x - 2 */}
            <line x1="145" y1="240" x2="250" y2="30" stroke="#4f46e5" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="255" y="45" fill="#4f46e5" fontSize="11" fontWeight="bold">y &gt; 2x - 2 (Dashed Line)</text>

            {/* Test Point (0, 0) */}
            <circle cx="210" cy="140" r="5" fill="#10b981" />
            <rect x="220" y="125" width="145" height="26" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="292" y="142" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontWeight="bold">Test (0, 0): 0 &gt; -2 (True!)</text>

            {/* Solution Region Label */}
            <rect x="70" y="70" width="120" height="32" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
            <text x="130" y="90" fill="#e0e7ff" fontSize="11" textAnchor="middle" fontWeight="bold">Feasible Region</text>
          </svg>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] font-medium">
          <div className="p-2.5 rounded-xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span><strong>Strict (&lt;, &gt;):</strong> Dashed boundary, points on line are excluded.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span><strong>Inclusive (&le;, &ge;):</strong> Solid boundary, points on line are included.</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "parallel-perpendicular") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              Slope Geometry: Parallel vs Perpendicular Lines
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30 font-bold">
            m₁ · m₂ = -1
          </span>
        </div>

        <div className="w-full overflow-x-auto flex justify-center">
          <svg viewBox="0 0 420 280" className="w-full max-w-[440px] font-sans">
            {/* Axes */}
            <line x1="40" y1="140" x2="380" y2="140" stroke="#64748b" strokeWidth="1.5" />
            <line x1="210" y1="30" x2="210" y2="250" stroke="#64748b" strokeWidth="1.5" />
            <text x="370" y="132" fill="#64748b" fontSize="12" fontWeight="bold">x</text>
            <text x="218" y="42" fill="#64748b" fontSize="12" fontWeight="bold">y</text>

            {/* Line 1: y = 2x + 1 (Blue) */}
            <line x1="120" y1="240" x2="230" y2="20" stroke="#2563eb" strokeWidth="2.5" />
            <text x="235" y="30" fill="#2563eb" fontSize="11" fontWeight="bold">Line 1: m = 2</text>

            {/* Line 2: y = 2x - 3 (Cyan, Parallel) */}
            <line x1="160" y1="240" x2="270" y2="20" stroke="#06b6d4" strokeWidth="2.5" />
            <text x="275" y="40" fill="#06b6d4" fontSize="11" fontWeight="bold">Line 2: m = 2 (Parallel)</text>

            {/* Line 3: y = -1/2 x + 2 (Rose, Perpendicular) */}
            <line x1="60" y1="65" x2="360" y2="215" stroke="#e11d48" strokeWidth="2.5" />
            <text x="320" y="235" fill="#e11d48" fontSize="11" fontWeight="bold">Line 3: m = -1/2 (Perpendicular)</text>

            {/* 90 degree indicator square */}
            <path d="M 197 104 L 205 108 L 201 116 L 193 112 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
            <text x="175" y="98" fill="#ca8a04" fontSize="10" fontWeight="bold">90°</text>
          </svg>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] font-medium">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/30 text-blue-950 dark:text-blue-200">
            <strong>Parallel Lines:</strong> Identical slopes (<KaTeXMath mathText="$m_1 = m_2$" />), different intercepts. They never intersect (No Solution).
          </div>
          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/30 text-rose-950 dark:text-rose-200">
            <strong>Perpendicular Lines:</strong> Negative reciprocal slopes (<KaTeXMath mathText="$m_1 \cdot m_2 = -1$" /> or <KaTeXMath mathText="$m_2 = -\frac{1}{m_1}$" />). Intersect at a right angle (<KaTeXMath mathText="$90^\circ$" />).
          </div>
        </div>
      </div>
    );
  }

  if (type === "word-problem-model") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              Linear Word Problem Architecture: Translating English to Algebra
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-bold">
            y = mx + b
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">Dependent Variable</span>
            <h5 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>y (Total)</span>
            </h5>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Total cost, final amount, weight, temperature at time x.
            </p>
            <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold font-mono">"costs", "is equal to"</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 font-mono">Rate of Change</span>
            <h5 className="text-sm font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <span>m (Slope)</span>
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Change per unit. Multiply directly by the independent quantity x.
            </p>
            <div className="text-[10px] text-amber-700 dark:text-amber-400 font-bold font-mono">"per", "each", "hourly"</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 font-mono">Input Variable</span>
            <h5 className="text-sm font-black text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
              <span>x (Quantity)</span>
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Number of hours, miles driven, items produced, days elapsed.
            </p>
            <div className="text-[10px] text-purple-700 dark:text-purple-400 font-bold font-mono">"for x hours", "per mile"</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 font-mono">Initial Offset</span>
            <h5 className="text-sm font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
              <span>+ b (Intercept)</span>
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              One-time charge, starting balance, deposit, base entrance fee.
            </p>
            <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold font-mono">"fee", "starts with", "deposit"</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "percent-multiplier") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              The SAT Percent Multiplier Engine: Increase vs. Decrease
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30 font-bold">
            1 ± r
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 font-mono">Percentage Increase (+p%)</span>
            <h5 className="text-sm font-black text-emerald-900 dark:text-emerald-200">
              Multiplier = (1 + r) &gt; 1.00
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Add percentage in decimal to 1.
            </p>
            <div className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold font-mono">
              +25% increase → × 1.25<br />
              +8% tax → × 1.08
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-400 font-mono">Percentage Decrease (-p%)</span>
            <h5 className="text-sm font-black text-rose-900 dark:text-rose-200">
              Multiplier = (1 - r) &lt; 1.00
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Subtract percentage in decimal from 1.
            </p>
            <div className="text-[10px] text-rose-800 dark:text-rose-300 font-bold font-mono">
              -30% discount → × 0.70<br />
              -15% depreciation → × 0.85
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 font-mono">Successive Changes Trap</span>
            <h5 className="text-sm font-black text-amber-900 dark:text-amber-200">
              Multiply Sequential Multipliers
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              +20% then -20% is NOT 0% net!
            </p>
            <div className="text-[10px] text-amber-800 dark:text-amber-300 font-bold font-mono">
              (1.20)(0.80) = 0.96<br />
              Net = 4% LOSS from baseline
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "two-way-conditional") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              Two-Way Table Conditional Probability: Denominator Isolation
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30 font-bold">
            P(A | B) = Favorable / Subtotal
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 uppercase">Case 1: Unconditional (Grand Total)</div>
            <h5 className="text-xs font-bold text-slate-900 dark:text-white">
              "If a person is selected at random from the entire survey..."
            </h5>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-center text-xs font-bold text-blue-700 dark:text-blue-300">
              Denominator = Grand Total of All Survey Respondents
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              No restriction is stated, so divide by the bottom-right grand total.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30 space-y-2 shadow-sm">
            <div className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase">Case 2: Conditional (Row/Column Subtotal)</div>
            <h5 className="text-xs font-bold text-purple-950 dark:text-purple-200">
              "Given that the student is a senior..." or "Of those who voted yes..."
            </h5>
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/50 font-mono text-center text-xs font-bold text-purple-800 dark:text-purple-200">
              Denominator = Subtotal of that Specific Group Only!
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              The target population has shrunk. Ignore all other rows and columns entirely.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "scatterplot-residuals") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              Scatterplot Residuals: Actual vs. Predicted
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-bold">
            Residual = y_actual - y_predicted
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 font-mono">Positive Residual (&gt; 0)</span>
            <h5 className="text-sm font-black text-emerald-900 dark:text-emerald-200">
              Point Sits ABOVE the Line
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Actual observed value was GREATER than what the linear model predicted.
            </p>
            <div className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-bold">
              Residual = +4.5 (Model underestimated reality)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-400 font-mono">Negative Residual (&lt; 0)</span>
            <h5 className="text-sm font-black text-rose-900 dark:text-rose-200">
              Point Sits BELOW the Line
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Actual observed value was LESS than what the linear model predicted.
            </p>
            <div className="text-[10px] font-mono text-rose-800 dark:text-rose-300 font-bold">
              Residual = -3.2 (Model overestimated reality)
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "parabola-vertex") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              The Three Forms of a Quadratic: What Each Form Reveals Instantly
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/30 font-bold">
            Standard • Factored • Vertex
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 font-mono">1. Standard Form</span>
            <h5 className="text-sm font-black text-slate-900 dark:text-white font-mono">
              y = ax² + bx + c
            </h5>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Reveals the <strong>y-intercept</strong> as constant c: (0, c).
            </p>
            <div className="text-[10px] text-blue-700 dark:text-blue-300 font-bold font-mono">
              Axis: x = -b / (2a)
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 font-mono">2. Factored Form</span>
            <h5 className="text-sm font-black text-emerald-900 dark:text-emerald-200 font-mono">
              y = a(x - r₁)(x - r₂)
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Reveals the <strong>x-intercepts (zeros)</strong> as r₁ and r₂.
            </p>
            <div className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold font-mono">
              Midpoint: h = (r₁ + r₂) / 2
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 font-mono">3. Vertex Form</span>
            <h5 className="text-sm font-black text-purple-900 dark:text-purple-200 font-mono">
              y = a(x - h)² + k
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Reveals the <strong>maximum or minimum value</strong> (k) at x = h.
            </p>
            <div className="text-[10px] text-purple-800 dark:text-purple-300 font-bold font-mono">
              Vertex = (h, k)
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "quadratic-discriminant") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              The Quadratic Discriminant (b² - 4ac) & Real Roots
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-bold">
            Δ = b² - 4ac
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 font-mono">Δ &gt; 0 (Positive)</span>
            <h5 className="text-sm font-black text-emerald-900 dark:text-emerald-200">
              2 Distinct Real Roots
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Parabola crosses the x-axis at <strong>two separate points</strong>.
            </p>
            <div className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold font-mono">
              "Has two real solutions"
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 font-mono">Δ = 0 (Zero)</span>
            <h5 className="text-sm font-black text-blue-900 dark:text-blue-200">
              1 Real Root (Double)
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Parabola vertex is <strong>tangent to the x-axis</strong> (touches at 1 point).
            </p>
            <div className="text-[10px] text-blue-800 dark:text-blue-300 font-bold font-mono">
              "Has exactly one real solution"
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-400 font-mono">Δ &lt; 0 (Negative)</span>
            <h5 className="text-sm font-black text-rose-900 dark:text-rose-200">
              0 Real Roots (2 Complex)
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Parabola floats completely above or below the x-axis; <strong>never intersects</strong>.
            </p>
            <div className="text-[10px] text-rose-800 dark:text-rose-300 font-bold font-mono">
              "Has no real solutions"
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "special-triangles-trig") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              Special Right Triangles & The Golden Trigonometric Invariant
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-bold">
            SOH CAH TOA • sin(A) = cos(90° - A)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 font-mono">1. 45°-45°-90° Triangle</span>
            <h5 className="text-sm font-black text-slate-900 dark:text-white font-mono">
              x : x : x√2
            </h5>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Isosceles right triangle. Hypotenuse is leg times √2.
            </p>
            <div className="text-[10px] text-blue-700 dark:text-blue-300 font-bold font-mono">
              sin(45°) = cos(45°) = √2 / 2
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 font-mono">2. 30°-60°-90° Triangle</span>
            <h5 className="text-sm font-black text-emerald-900 dark:text-emerald-200 font-mono">
              x : x√3 : 2x
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Short leg (opp 30°) = x; Long leg = x√3; Hypotenuse = 2x.
            </p>
            <div className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold font-mono">
              sin(30°) = cos(60°) = 1/2
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 font-mono">3. Complementary Invariant</span>
            <h5 className="text-sm font-black text-purple-900 dark:text-purple-200 font-mono">
              sin(A) = cos(B) ⟺ A + B = 90°
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Whenever sin(expr 1) = cos(expr 2), their sum must strictly equal 90°.
            </p>
            <div className="text-[10px] text-purple-800 dark:text-purple-300 font-bold font-mono">
              sin(x) = cos(90° - x)
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "circle-equation") {
    return (
      <div className="w-full my-6 p-6 rounded-3xl bg-slate-50 dark:bg-[var(--bg-surface)] border border-slate-200 dark:border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-[var(--text-main)]">
              Circle Equation & Arc/Sector Geometry in the xy-Plane
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-bold">
            (x - h)² + (y - k)² = r²
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-[var(--bg-card)] border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-cyan-700 dark:text-cyan-400 font-mono">Standard Equation</span>
            <h5 className="text-sm font-black text-slate-900 dark:text-white font-mono">
              (x - h)² + (y - k)² = r²
            </h5>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              Center is at (h, k). Radius is √r² (watch the squared trap!).
            </p>
            <div className="text-[10px] text-cyan-800 dark:text-cyan-300 font-bold font-mono">
              r² = 36 ⟹ radius = 6
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 font-mono">Arc Length & Sector Area</span>
            <h5 className="text-sm font-black text-emerald-900 dark:text-emerald-200 font-mono">
              Fraction = θ / 360°
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              Arc length = (θ/360) · 2πr<br />
              Sector area = (θ/360) · πr²
            </p>
            <div className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold font-mono">
              Radian mode: s = rθ, A = ½r²θ
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-500/30 space-y-1.5 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 font-mono">Inscribed Angle Theorem</span>
            <h5 className="text-sm font-black text-purple-900 dark:text-purple-200 font-mono">
              Inscribed = ½ × Central
            </h5>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              An angle inscribed on the circle is exactly half the central angle intercepting the same arc.
            </p>
            <div className="text-[10px] text-purple-800 dark:text-purple-300 font-bold font-mono">
              Diameter inscribed angle = 90°
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
