"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, Zap, Info, ShieldCheck } from "lucide-react";
import KaTeXMath from "./KaTeXMath";

interface DiagramProps {
  type: string;
}

export default function UnitDiagrams({ type }: DiagramProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  if (type === "adaptive-routing") {
    return (
      <div className="w-full my-6 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <h4 className="text-sm font-bold text-[var(--text-main)]">
              Digital SAT Multistage Adaptive Routing Diagram
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
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
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
              </marker>
              <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
              </marker>
              <marker id="arrowOrange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" />
              </marker>
            </defs>

            {/* MODULE 1 BOX */}
            <rect x="30" y="80" width="220" height="120" rx="16" fill="url(#gradMod1)" stroke="#3b82f6" strokeWidth="2" />
            <text x="140" y="112" textAnchor="middle" fill="#93c5fd" fontWeight="bold" fontSize="14">MODULE 1 (Routing)</text>
            <text x="140" y="134" textAnchor="middle" fill="#e2e8f0" fontSize="12">22 Questions • 35 Minutes</text>
            <text x="140" y="156" textAnchor="middle" fill="#94a3b8" fontSize="11">Mix: Easy, Medium, Hard</text>
            <text x="140" y="180" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="600">Threshold: ~15/22 Correct</text>

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
            <text x="580" y="48" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" fontSize="14">HARD MODULE 2 (Unlocked)</text>
            <text x="580" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="12">Score Ceiling: 800 Perfect</text>
            <text x="580" y="92" textAnchor="middle" fill="#a7f3d0" fontSize="11">Even missing 4-5 questions yields 720-760!</text>

            {/* EASY MODULE 2 BOX */}
            <rect x="440" y="165" width="280" height="95" rx="16" fill="url(#gradEasy)" stroke="#f59e0b" strokeWidth="2" />
            <text x="580" y="193" textAnchor="middle" fill="#fcd34d" fontWeight="bold" fontSize="14">EASY MODULE 2 (Restricted)</text>
            <text x="580" y="215" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">Score Capped at ~600 - 640</text>
            <text x="580" y="237" textAnchor="middle" fill="#fed7aa" fontSize="11">100% correct in Mod 2 still CANNOT reach 700</text>
          </svg>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 leading-relaxed flex items-start gap-2.5">
          <Info size={16} className="shrink-0 text-blue-400 mt-0.5" />
          <span>
            <strong>Strategik Xulosa:</strong> Birinchi modulda 1-dan 15-savolgacha bo'lgan oson va o'rta savollarda beparvolik qilmang. Ularni to'g'ri yechish sizga 800 lik eshikni ochib beradi!
          </span>
        </div>
      </div>
    );
  }

  if (type === "pacing-clock") {
    return (
      <div className="w-full my-6 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="text-sm font-bold text-[var(--text-main)]">
              The 95-Second Pacing Velocity Dial (35 Min Module)
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Time Management
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-3">
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25">
            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Phase 1: Sprint</div>
            <div className="text-base font-extrabold text-[var(--text-main)] mt-1">Questions 1 – 6</div>
            <div className="text-xs text-blue-200 mt-0.5">30 – 45 soniya / savol</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-2 font-mono">Qoldiq vaqt: ~31:00</div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25">
            <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Phase 2: Cruise</div>
            <div className="text-base font-extrabold text-[var(--text-main)] mt-1">Questions 7 – 14</div>
            <div className="text-xs text-cyan-200 mt-0.5">60 – 75 soniya / savol</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-2 font-mono">Qoldiq vaqt: ~19:00</div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/25">
            <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Phase 3: Deep Work</div>
            <div className="text-base font-extrabold text-[var(--text-main)] mt-1">Questions 15 – 18</div>
            <div className="text-xs text-purple-200 mt-0.5">90 – 120 soniya / savol</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-2 font-mono">Qoldiq vaqt: ~10:00</div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Phase 4: Endbosses</div>
            <div className="text-base font-extrabold text-[var(--text-main)] mt-1">Questions 19 – 22</div>
            <div className="text-xs text-amber-200 mt-0.5">120 – 150 soniya / savol</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-2 font-mono">Qoldiq vaqt: ~02:00 (Check)</div>
          </div>
        </div>

        {/* Progress Bar Timeline */}
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex my-2 border border-slate-700">
          <div style={{ width: "25%" }} className="bg-blue-500 h-full" title="Easy sprint" />
          <div style={{ width: "35%" }} className="bg-cyan-500 h-full" title="Medium cruise" />
          <div style={{ width: "25%" }} className="bg-purple-500 h-full" title="Hard calculation" />
          <div style={{ width: "15%" }} className="bg-amber-500 h-full" title="Review reserve" />
        </div>
      </div>
    );
  }

  if (type === "desmos-keyboard") {
    return (
      <div className="w-full my-6 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-cyan-400" />
            <h4 className="text-sm font-bold text-[var(--text-main)]">
              Digital SAT Built-in Desmos Superpowers
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Cheat Sheet
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5">
            <div className="font-bold text-[var(--text-main)] flex items-center justify-between">
              <span>1. Single-Variable Direct Solver</span>
              <code className="text-cyan-400 font-mono text-[11px]">Vertical Line</code>
            </div>
            <p className="text-[var(--text-muted)]">
              Hech qanday qo'lda soddalashtirish shart emas. <code className="text-yellow-300">4(3x - 5) + 2 = 38</code> deb yozsangiz, Desmos <code className="text-emerald-400 font-bold">x = 4.667</code> da vertikal chiziq tortadi!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5">
            <div className="font-bold text-[var(--text-main)] flex items-center justify-between">
              <span>2. Linear & Quadratic Regression</span>
              <code className="text-purple-400 font-mono text-[11px]">~ Tilda belgisi</code>
            </div>
            <p className="text-[var(--text-muted)]">
              Jadval tuzib, <code className="text-yellow-300">y1 ~ m x1 + b</code> yoki <code className="text-yellow-300">y1 ~ a(x1 - h)^2 + k</code> yozsangiz, barcha qiyalik va koeffitsiyentlar avtomatik topiladi.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5">
            <div className="font-bold text-[var(--text-main)] flex items-center justify-between">
              <span>3. System of Equations Intersection</span>
              <code className="text-blue-400 font-mono text-[11px]">Grey Dot Click</code>
            </div>
            <p className="text-[var(--text-muted)]">
              1-qatorga 1-tenglamani, 2-qatorga 2-tenglamani yozing. Chiziqlar kesishgan kulrang nuqtaga bosing — (x, y) bir lahzada ko'rinadi.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1.5">
            <div className="font-bold text-[var(--text-main)] flex items-center justify-between">
              <span>4. Decimal to Fraction Converter</span>
              <code className="text-emerald-400 font-mono text-[11px]">Fraction Icon</code>
            </div>
            <p className="text-[var(--text-muted)]">
              Desmos chiqqan o'nli kasr yonidagi kichik to'rtburchak/kasr belgisini bossangiz, <code className="text-emerald-400">0.8333...</code> ni darhol <code className="text-emerald-400 font-bold">5/6</code> ga aylantirib beradi.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === "formula-reference") {
    return (
      <div className="w-full my-6 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" />
            <h4 className="text-sm font-bold text-[var(--text-main)]">
              Formula Comparison: Provided vs MUST Memorize
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Critical Truth
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PROVIDED */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 size={15} />
              <span>PROVIDED ON SCREEN (Bluebook Reference)</span>
            </div>
            <ul className="text-xs text-[var(--text-muted)] space-y-1.5 list-disc pl-4">
              <li><KaTeXMath mathText="Doira yuzi ($A = \pi r^2$) va perimetri ($C = 2\pi r$)" /></li>
              <li>To'g'ri to'rtburchak va uchburchak yuzi</li>
              <li>Silindr, konus, shar va piramida hajmlari</li>
              <li><KaTeXMath mathText="Pifagor teoremasi ($a^2 + b^2 = c^2$)" /></li>
              <li><KaTeXMath mathText="Maxsus uchburchaklar: $30^\circ-60^\circ-90^\circ$ va $45^\circ-45^\circ-90^\circ$" /></li>
              <li><KaTeXMath mathText="Doiradagi jami burchak ($360^\circ$ va $2\pi$)" /></li>
            </ul>
          </div>

          {/* NOT PROVIDED */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
            <div className="flex items-center gap-2 mb-2 text-rose-400 font-bold text-xs">
              <AlertTriangle size={15} />
              <span>NOT PROVIDED (MUST MEMORIZE 100%!)</span>
            </div>
            <ul className="text-xs text-[var(--text-muted)] space-y-1.5 list-disc pl-4">
              <li><KaTeXMath mathText="**Kvadrat tenglama:** $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$" /></li>
              <li><KaTeXMath mathText="**Parabola uchi (Vertex):** $x_v = -\frac{b}{2a}$, $y_v = f(x_v)$" /></li>
              <li><KaTeXMath mathText="**Viyet formulalari:** $r_1 + r_2 = -b/a$, $r_1 r_2 = c/a$" /></li>
              <li><KaTeXMath mathText="**Diskriminant qoidalari:** $D = b^2 - 4ac$" /></li>
              <li><KaTeXMath mathText="**Aylana tenglamasi:** $(x-h)^2 + (y-k)^2 = r^2$" /></li>
              <li><KaTeXMath mathText="**Qiyalik formulasi:** $m = \frac{y_2 - y_1}{x_2 - x_1}$" /></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (type === "linear-graph") {
    return (
      <div className="w-full my-6 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-[var(--text-main)]">
            <KaTeXMath mathText="Linear Graph: Slope ($m = \frac{\Delta y}{\Delta x}$) & Intercept ($b$)" />
          </h4>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <KaTeXMath mathText="$y = \frac{3}{2}x + 1$" />
          </span>
        </div>

        <div className="w-full overflow-x-auto flex justify-center">
          <svg viewBox="0 0 400 300" className="w-full max-w-[420px] font-sans">
            {/* Grid Lines */}
            <g stroke="#334155" strokeWidth="0.5" opacity="0.4">
              {[-100, -50, 0, 50, 100, 150].map((pos) => (
                <React.Fragment key={pos}>
                  <line x1="40" y1={150 - pos} x2="360" y2={150 - pos} />
                  <line x1={200 + pos} y1="30" x2={200 + pos} y2="270" />
                </React.Fragment>
              ))}
            </g>

            {/* Axes */}
            <line x1="40" y1="150" x2="360" y2="150" stroke="#94a3b8" strokeWidth="2" />
            <line x1="200" y1="30" x2="200" y2="270" stroke="#94a3b8" strokeWidth="2" />
            <text x="350" y="142" fill="#94a3b8" fontSize="12" fontWeight="bold">x</text>
            <text x="208" y="42" fill="#94a3b8" fontSize="12" fontWeight="bold">y</text>

            {/* Linear Line y = 1.5x + 1 -> points (-2, -2) -> (60, 240), (0, 1) -> (200, 110), (2, 4) -> (280, 30) */}
            <line x1="60" y1="255" x2="320" y2="60" stroke="#38bdf8" strokeWidth="3" />

            {/* Slope Triangle between (0, 1) [200, 110] and (2, 4) [280, 20] */}
            <path d="M 200 110 L 280 110 L 280 20" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,3" />
            <text x="240" y="128" fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold">Run: $\Delta x = 2$</text>
            <text x="295" y="70" fill="#f59e0b" fontSize="11" fontWeight="bold">Rise: $\Delta y = 3$</text>

            {/* Intercept Point (0, 1) */}
            <circle cx="200" cy="110" r="5" fill="#10b981" />
            <text x="140" y="105" fill="#6ee7b7" fontSize="11" fontWeight="bold">y-int: (0, 1)</text>

            {/* Point (2, 4) */}
            <circle cx="280" cy="20" r="5" fill="#38bdf8" />
            <text x="290" y="25" fill="#93c5fd" fontSize="11" fontWeight="bold">(2, 4)</text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === "system-intersection") {
    return (
      <div className="w-full my-6 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-[var(--text-main)]">
            System of Equations: Unique Intersection Point
          </h4>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Intersection $(x_0, y_0)$
          </span>
        </div>

        <div className="w-full overflow-x-auto flex justify-center">
          <svg viewBox="0 0 400 280" className="w-full max-w-[420px] font-sans">
            {/* Axes */}
            <line x1="40" y1="140" x2="360" y2="140" stroke="#64748b" strokeWidth="1.5" />
            <line x1="200" y1="30" x2="200" y2="250" stroke="#64748b" strokeWidth="1.5" />

            {/* Line 1: y = 2x - 2 */}
            <line x1="100" y1="240" x2="300" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="305" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">Line 1: $y = 2x - 2$</text>

            {/* Line 2: y = -x + 4 */}
            <line x1="90" y1="50" x2="320" y2="220" stroke="#f43f5e" strokeWidth="2.5" />
            <text x="315" y="235" fill="#f43f5e" fontSize="11" fontWeight="bold">Line 2: $y = -x + 4$</text>

            {/* Intersection at (2, 2) -> (240, 100) */}
            <circle cx="233" cy="107" r="7" fill="#fbbf24" stroke="#78350f" strokeWidth="2" className="animate-pulse" />
            <rect x="245" y="90" width="110" height="28" rx="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="1" />
            <text x="300" y="108" fill="#fde68a" fontSize="11" textAnchor="middle" fontWeight="bold">Solution (2, 2)</text>
          </svg>
        </div>
      </div>
    );
  }

  return null;
}
