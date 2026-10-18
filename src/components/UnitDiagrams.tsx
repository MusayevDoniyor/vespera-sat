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
            <text x="347" y="59" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Score $\ge$ 15</text>

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
            <text x="240" y="128" fill="#d97706" fontSize="11" textAnchor="middle" fontWeight="bold">Run: $\Delta x = 2$</text>
            <text x="295" y="70" fill="#d97706" fontSize="11" fontWeight="bold">Rise: $\Delta y = 3$</text>

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
            Intersection $(x_0, y_0)$
          </span>
        </div>

        <div className="w-full overflow-x-auto flex justify-center">
          <svg viewBox="0 0 400 280" className="w-full max-w-[420px] font-sans">
            {/* Axes */}
            <line x1="40" y1="140" x2="360" y2="140" stroke="#64748b" strokeWidth="1.5" />
            <line x1="200" y1="30" x2="200" y2="250" stroke="#64748b" strokeWidth="1.5" />

            {/* Line 1 */}
            <line x1="100" y1="240" x2="300" y2="40" stroke="#0284c7" strokeWidth="2.5" />
            <text x="305" y="45" fill="#0284c7" fontSize="11" fontWeight="bold">Line 1: $y = 2x - 2$</text>

            {/* Line 2 */}
            <line x1="90" y1="50" x2="320" y2="220" stroke="#e11d48" strokeWidth="2.5" />
            <text x="315" y="235" fill="#e11d48" fontSize="11" fontWeight="bold">Line 2: $y = -x + 4$</text>

            {/* Intersection at (2, 2) */}
            <circle cx="233" cy="107" r="7" fill="#f59e0b" stroke="#78350f" strokeWidth="2" className="animate-pulse" />
            <rect x="245" y="90" width="115" height="28" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            <text x="302" y="108" fill="#fde68a" fontSize="11" textAnchor="middle" fontWeight="bold">Solution (2, 2)</text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
