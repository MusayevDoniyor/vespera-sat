"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Calculator,
  Compass,
  GraduationCap,
  Play,
  X,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import KaTeXMath from "./KaTeXMath";
import { KHAN_SAT_MATH_UNITS, KhanUnit, KhanSkillLesson } from "@/lib/khan-units-data";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import Portal from "./Portal";

export default function KhanAcademyUnitsView() {
  const [selectedTier, setSelectedTier] = useState<"ALL" | "Foundations" | "Medium" | "Advanced">("ALL");
  const [expandedUnitId, setExpandedUnitId] = useState<string>("unit-02-foundations-algebra");
  const [activeLessonModal, setActiveLessonModal] = useState<KhanSkillLesson | null>(null);
  useBodyScrollLock(!!activeLessonModal);

  const filteredUnits = KHAN_SAT_MATH_UNITS.filter((u) => {
    if (selectedTier === "ALL") return true;
    return u.tier === selectedTier;
  });

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] relative overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] border border-[var(--accent-blue)]/30">
                13 Mastery Units
              </span>
              <span className="text-[11px] font-bold text-[var(--text-muted)]">
                Khan Academy Curriculum 1:1 System
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[var(--text-main)] tracking-tight">
              SAT Math: Step-by-Step Mastery Course
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-2xl mt-1 leading-relaxed">
              Learn every math concept from ground zero. Every skill contains an interactive zero-to-hero lesson, basic worked example, SAT trap breakdown, Desmos calculator bypass, and direct practice.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="shrink-0 flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-lg">
              🎯
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--text-main)]">Target: 800</div>
              <div className="text-[11px] text-[var(--text-muted)]">Foundations ➔ 800</div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedTier("ALL")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              selectedTier === "ALL"
                ? "bg-[var(--accent-blue)] text-white shadow-sm"
                : "bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            All 13 Units
          </button>
          <button
            onClick={() => setSelectedTier("Foundations")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedTier === "Foundations"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-[var(--bg-surface)] border border-[var(--border-main)] text-emerald-500 hover:text-emerald-400"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            Foundations (Ground Zero)
          </button>
          <button
            onClick={() => setSelectedTier("Medium")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedTier === "Medium"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-[var(--bg-surface)] border border-[var(--border-main)] text-amber-500 hover:text-amber-400"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
            Medium (Core Modules)
          </button>
          <button
            onClick={() => setSelectedTier("Advanced")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedTier === "Advanced"
                ? "bg-red-600 text-white shadow-sm"
                : "bg-[var(--bg-surface)] border border-[var(--border-main)] text-red-400 hover:text-red-300"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
            Advanced (Target 750–800)
          </button>
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-4">
        {filteredUnits.map((unit) => {
          const isExpanded = expandedUnitId === unit.id;

          const badgeColor =
            unit.tier === "Foundations"
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
              : unit.tier === "Medium"
              ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
              : unit.tier === "Advanced"
              ? "bg-red-500/10 text-red-500 border-red-500/30"
              : "bg-blue-500/10 text-blue-500 border-blue-500/30";

          return (
            <div
              key={unit.id}
              className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl overflow-hidden transition-all shadow-sm hover:border-[var(--accent-blue)]/40"
            >
              {/* Unit Card Header */}
              <div
                onClick={() => setExpandedUnitId(isExpanded ? "" : unit.id)}
                className="p-5 md:p-6 cursor-pointer flex items-center justify-between gap-4 select-none hover:bg-[var(--bg-surface)] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border font-mono ${badgeColor}`}>
                      {unit.tier.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-muted)]">
                      {unit.domain}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      • {unit.skills.length} core skill{unit.skills.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-[var(--text-main)]">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] max-w-2xl line-clamp-2">
                    {unit.description_en}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    href={`/curriculum/units/${unit.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <BookOpen size={13} />
                    <span className="hidden sm:inline">Open Chapter</span>
                    <span className="sm:hidden">Chapter</span>
                    <ArrowRight size={13} />
                  </Link>

                  <button className="w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-center justify-center text-[var(--text-muted)]">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Expanded Skills Accordion */}
              {isExpanded && (
                <div className="border-t border-[var(--border-main)] bg-[var(--bg-surface)]/40 p-4 md:p-6 space-y-3">
                  <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Lessons & Skill Modules in this Unit</span>
                    <span className="text-[11px] font-normal normal-case">
                      Click "Read Lesson" to study theory from zero
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {unit.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[var(--accent-blue)] transition-all group"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] flex items-center justify-center font-bold text-xs">
                              <BookOpen size={13} />
                            </span>
                            <h4 className="text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                              {skill.title}
                            </h4>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] pl-8">
                            {skill.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pl-8 md:pl-0 shrink-0 w-full md:w-auto">
                          <button
                            onClick={() => setActiveLessonModal(skill)}
                            className="flex-1 md:flex-none px-3.5 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-main)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <BookOpen size={13} />
                            <span>Read Lesson</span>
                          </button>

                          <Link
                            href={`/math?topic=${skill.topicCode}&difficulty=${skill.difficulty}`}
                            className="flex-1 md:flex-none px-3.5 py-1.5 rounded-xl bg-[var(--accent-blue)] text-white text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <span>Practice</span>
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lesson Modal Drawer */}
      {activeLessonModal && (
        <Portal>
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-hidden"
            onClick={() => setActiveLessonModal(null)}
          >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[var(--text-main)] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-[var(--border-main)] bg-[var(--bg-surface)] flex items-start justify-between gap-4 shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded font-mono bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]">
                    {activeLessonModal.difficulty.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-muted)]">
                    {activeLessonModal.domain}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[var(--text-main)]">
                  {activeLessonModal.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveLessonModal(null)}
                className="w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-main)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
              {/* English Overview */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1">
                    <GraduationCap size={14} /> Theory & Core Mathematical Concepts
                  </span>
                  <p className="text-xs md:text-sm text-[var(--text-main)] leading-relaxed">
                    {activeLessonModal.lessonContent.overview_en}
                  </p>
                </div>
              </div>

              {/* First Principles */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Key Principles to Memorize:
                </h4>
                <ul className="space-y-2">
                  {activeLessonModal.lessonContent.firstPrinciples.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-main)]">
                      <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mathematical Rules and Formulas */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Essential Formulas:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeLessonModal.lessonContent.rules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1"
                    >
                      <div className="text-xs font-bold text-[var(--accent-blue)]">{rule.name}</div>
                      <div className="py-1">
                        <KaTeXMath content={`$$${rule.formula}$$`} />
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)]">{rule.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desmos Bypass Secret */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                  <Calculator size={14} />
                  <span>Desmos 10-Second Speed Hack: {activeLessonModal.lessonContent.desmosBypass.title}</span>
                </div>
                <div className="font-mono text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20">
                  {activeLessonModal.lessonContent.desmosBypass.keys}
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  {activeLessonModal.lessonContent.desmosBypass.tip}
                </p>
              </div>

              {/* Basic Example Walkthrough */}
              <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-main)]">
                    Basic Example & Step-by-Step Walkthrough
                  </h4>
                </div>

                <div className="p-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border-main)] font-medium text-xs">
                  <KaTeXMath content={activeLessonModal.basicExample.question} />
                </div>

                {activeLessonModal.basicExample.choices && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {activeLessonModal.basicExample.choices.map((c, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border ${
                          c.startsWith(activeLessonModal.basicExample.correctAnswer)
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold"
                            : "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-muted)]"
                        }`}
                      >
                        <KaTeXMath content={c} />
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-1.5 pt-2 border-t border-[var(--border-main)] text-xs text-[var(--text-muted)]">
                  <span className="font-bold text-[var(--text-main)] block mb-1">Detailed Solution:</span>
                  {activeLessonModal.basicExample.stepByStep.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-[var(--accent-blue)]">•</span>
                      <span><KaTeXMath content={s} /></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Harder Example & SAT Trap Breakdown */}
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-amber-500">
                    Harder Example & College Board Trap Warning
                  </h4>
                </div>

                <div className="p-3 bg-[var(--bg-card)] rounded-xl border border-[var(--border-main)] font-medium text-xs">
                  <KaTeXMath content={activeLessonModal.harderExample.question} />
                </div>

                {activeLessonModal.harderExample.choices && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {activeLessonModal.harderExample.choices.map((c, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg border ${
                          c.startsWith(activeLessonModal.harderExample.correctAnswer)
                            ? "bg-amber-500/10 border-amber-500/40 text-amber-400 font-bold"
                            : "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-muted)]"
                        }`}
                      >
                        <KaTeXMath content={c} />
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                  <span className="font-bold block mb-1">⚠️ SAT Trap Warning:</span>
                  {activeLessonModal.harderExample.trapAnalysis}
                </div>

                <div className="text-xs text-[var(--text-main)] leading-relaxed">
                  <span className="font-bold block mb-1 text-[var(--text-muted)]">Official Solution & Speed Hack:</span>
                  <KaTeXMath content={activeLessonModal.harderExample.solution} />
                </div>
              </div>
            </div>

            {/* Footer with Direct Practice Link */}
            <div className="p-4 md:p-5 border-t border-[var(--border-main)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 shrink-0">
              <span className="text-xs text-[var(--text-muted)]">
                Ready to test yourself on this skill?
              </span>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setActiveLessonModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  Close
                </button>

                <Link
                  href={`/math?topic=${activeLessonModal.topicCode}&difficulty=${activeLessonModal.difficulty}`}
                  className="px-5 py-2 rounded-xl bg-[var(--accent-blue)] text-white text-xs font-bold hover:opacity-95 transition-opacity flex items-center gap-1.5 shadow-md"
                  onClick={() => setActiveLessonModal(null)}
                >
                  <span>Practice Questions for This Skill</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        </Portal>
      )}
    </div>
  );
}
