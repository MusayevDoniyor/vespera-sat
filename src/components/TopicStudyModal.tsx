"use client";

import React, { useState, useEffect } from "react";
import KaTeXMath from "./KaTeXMath";
import QuestionCard from "./QuestionCard";
import { TopicDeepDive, OFFICIAL_TOPICS_DATA } from "@/lib/curriculum-data";
import {
  X,
  BookOpen,
  Sparkles,
  AlertTriangle,
  Calculator,
  Layers,
  Award,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  FileText,
  Zap,
  Target,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import Portal from "./Portal";

interface TopicStudyModalProps {
  topicCode: string | null;
  onClose: () => void;
  onLaunchVisualDiagram?: (diagramKey: string) => void;
}

export default function TopicStudyModal({
  topicCode,
  onClose,
  onLaunchVisualDiagram,
}: TopicStudyModalProps) {
  useBodyScrollLock(!!topicCode);

  const [activeTab, setActiveTab] = useState<
    "theory" | "formulas" | "traps" | "desmos" | "practice"
  >("theory");
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const topic: TopicDeepDive | undefined = topicCode
    ? OFFICIAL_TOPICS_DATA[topicCode]
    : undefined;

  // Listen for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Fetch questions for this topic when entering practice tab or opening
  useEffect(() => {
    if (!topicCode) return;
    setLoadingQuestions(true);
    fetch(`/api/questions?topicCode=${encodeURIComponent(topicCode)}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
        setLoadingQuestions(false);
      })
      .catch((err) => {
        console.error("Error loading topic questions:", err);
        setLoadingQuestions(false);
      });
  }, [topicCode]);

  if (!topicCode || !topic) return null;

  const isMath = topic.section === "MATH";

  return (
    <Portal>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-hidden"
        onClick={onClose}
      >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[var(--text-main)] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-5 md:p-6 border-b border-[var(--border-main)] bg-[var(--bg-surface)] shrink-0 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md font-mono ${
                  isMath
                    ? "bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] border border-[var(--accent-blue)]/30"
                    : "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30"
                }`}
              >
                {topic.code} • {topic.domain}
              </span>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-mono ${
                  topic.yieldTier === "HIGHEST YIELD"
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                    : topic.yieldTier === "HIGH YIELD"
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                }`}
              >
                ★ {topic.yieldTier} ({topic.frequencyPercent})
              </span>

              <span className="text-xs text-[var(--text-muted)] font-mono">
                {questions.length} Practice Questions Available
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black tracking-tight text-[var(--text-main)]">
              {topic.title_en}
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">
              {topic.title_uz}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 px-6 pt-3 border-b border-[var(--border-main)] bg-[var(--bg-surface)] overflow-x-auto scrollbar-none text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab("theory")}
            className={`flex items-center gap-2 pb-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === "theory"
                ? "border-[var(--accent-blue)] text-[var(--accent-blue)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <BookOpen size={14} />
            <span>Theory & First Principles</span>
          </button>

          <button
            onClick={() => setActiveTab("formulas")}
            className={`flex items-center gap-2 pb-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === "formulas"
                ? "border-[var(--accent-blue)] text-[var(--accent-blue)]"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Layers size={14} />
            <span>Invariants & Formulas ({topic.formulas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("traps")}
            className={`flex items-center gap-2 pb-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === "traps"
                ? "border-amber-500 text-amber-600 dark:text-amber-400"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <AlertTriangle size={14} />
            <span>SAT Traps & Pitfalls ({topic.traps.length})</span>
          </button>

          {topic.desmosBypass && (
            <button
              onClick={() => setActiveTab("desmos")}
              className={`flex items-center gap-2 pb-3 px-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === "desmos"
                  ? "border-[var(--accent-green)] text-[var(--accent-green)]"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <Sparkles size={14} />
              <span>Desmos 10s Speedhack</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("practice")}
            className={`flex items-center gap-2 pb-3 px-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === "practice"
                ? "border-purple-600 text-purple-600 dark:text-purple-400"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Target size={14} />
            <span>Live Drill ({questions.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto overscroll-contain space-y-6 flex-1">
          {/* TAB 1: THEORY & FIRST PRINCIPLES */}
          {activeTab === "theory" && (
            <div className="space-y-6">
              {/* College Panda Chapter Reference Card */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] shrink-0 mt-0.5">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider font-mono">
                    College Panda Curriculum Mapping
                  </h4>
                  <p className="text-xs font-semibold text-[var(--accent-blue)] mt-0.5">
                    {topic.collegePandaChapter}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    Matched to the official College Board Digital SAT question taxonomy and College Panda chapter curricula.
                  </p>
                </div>
              </div>

              {/* SATashkent Resource Mapping */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[var(--bg-surface)] to-[var(--accent-blue)]/5 border border-[var(--border-main)] flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider font-mono flex items-center gap-2">
                    <span>SAT Tashkent Resource Reference</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
                      National Vault
                    </span>
                  </h4>
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-0.5">
                    {isMath
                      ? "SAT Math Cheat Sheet & Math Hard Book / Mathbook 3.0"
                      : "Gramilliy (Grammar Bible) & SAToplam Writing / Vocabook 3.0"}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    {isMath
                      ? "Master SATashkent's 1-glance cheat sheet invariants and multi-version variant problem sets."
                      : "Apply Gramilliy's signature '3x1 Elimination Tactic' and 'Start Backwards (Q27 to Q1)' pacing rule."}
                  </p>
                </div>
              </div>

              {/* Core Conceptual Invariant */}
              <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-blue)] font-mono">
                      First-Principles Geometric & Verbal Foundation
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-main)] leading-relaxed font-medium">
                    {topic.firstPrinciples.coreConcept}
                  </p>
                </div>

                {/* Conceptual Summary */}
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-muted)] leading-relaxed">
                  <strong className="text-[var(--text-main)] block mb-1">
                    💡 Intuitive Conceptual Summary:
                  </strong>
                  {topic.firstPrinciples.uzbekSummary}
                </div>

                {/* Key Bullet Points */}
                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider font-mono">
                    Non-Negotiable Examination Invariants
                  </h5>
                  <ul className="space-y-2">
                    {topic.firstPrinciples.keyPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)] leading-relaxed">
                        <CheckCircle2
                          size={14}
                          className="text-[var(--accent-green)] shrink-0 mt-0.5"
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual Model Link (if available) */}
              {topic.diagramKey && onLaunchVisualDiagram && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[var(--accent-blue)]/10 via-[var(--bg-card)] to-purple-500/10 border border-[var(--border-main)] flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[var(--accent-blue)]" />
                      <span>Interactive 300 DPI Visual Laboratory Available</span>
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      Explore first-principles coordinate diagrams and live parameter sandboxes.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onLaunchVisualDiagram(topic.diagramKey!);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[var(--accent-blue)] text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-90 shadow-sm shrink-0"
                  >
                    <span>Open Laboratory</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INVARIANTS & FORMULAS */}
          {activeTab === "formulas" && (
            <div className="space-y-4">
              <div className="text-xs text-[var(--text-muted)] mb-2 font-mono">
                Publication-grade mathematical invariants rendered via KaTeX. Memorize these formulas for guaranteed speed on the exam.
              </div>

              {topic.formulas.map((f, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-main)] font-mono">
                      #{idx + 1} {f.name}
                    </span>
                    <span className="text-[10px] text-[var(--accent-blue)] font-mono uppercase font-bold">
                      Invariant
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] overflow-x-auto text-center">
                    <KaTeXMath content={`$$${f.latex}$$`} />
                  </div>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {f.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SAT TRAPS & PITFALLS */}
          {activeTab === "traps" && (
            <div className="space-y-4">
              <div className="text-xs text-[var(--text-muted)] mb-2 font-mono">
                College Board psychometric test-designers write questions around predictable cognitive biases. Here is how to disarm them:
              </div>

              {topic.traps.map((tr, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3"
                >
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <AlertTriangle size={16} className="shrink-0" />
                    <h4 className="text-xs font-bold uppercase tracking-wide font-mono">
                      Trap #{idx + 1}: {tr.title}
                    </h4>
                  </div>

                  <p className="text-xs text-[var(--text-main)] leading-relaxed">
                    {tr.explanation}
                  </p>

                  <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-amber-500/20 text-xs text-[var(--text-muted)] leading-relaxed">
                    <strong className="text-amber-600 dark:text-amber-400 block mb-0.5">
                      🛡️ How to avoid:
                    </strong>
                    {tr.avoidTip}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: DESMOS SPEED ENGINE */}
          {activeTab === "desmos" && topic.desmosBypass && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-4">
                <div className="flex items-center gap-2 text-[var(--accent-green)]">
                  <Sparkles size={18} />
                  <h4 className="text-sm font-bold text-[var(--text-main)]">
                    {topic.desmosBypass.title}
                  </h4>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] font-mono text-xs text-[var(--accent-green)]">
                  <div className="text-[10px] uppercase text-[var(--text-muted)] mb-1">
                    Desmos Keystrokes & Syntax:
                  </div>
                  <code>{topic.desmosBypass.keystrokes}</code>
                </div>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {topic.desmosBypass.explanation}
                </p>

                {topic.desmosBypass.sampleEquation && (
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      Sample: {topic.desmosBypass.sampleEquation}
                    </span>
                    <Link
                      href={`/math?topic=${encodeURIComponent(topic.code)}`}
                      className="px-3.5 py-1.5 rounded-xl bg-[var(--accent-green)] text-white text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Open in Desmos Studio</span>
                      <ExternalLink size={13} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: LIVE PRACTICE DRILL */}
          {activeTab === "practice" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-main)]">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider font-mono">
                    Targeted Topic Problem Set
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                    Authentic College Board Digital SAT questions for {topic.code}.
                  </p>
                </div>

                <Link
                  href={
                    isMath
                      ? `/math?topic=${encodeURIComponent(topic.code)}`
                      : `/verbal?topic=${encodeURIComponent(topic.code)}`
                  }
                  className="px-3 py-1.5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-xs font-bold text-[var(--accent-blue)] flex items-center gap-1.5 transition-all"
                >
                  <span>Full Screen Studio</span>
                  <ExternalLink size={13} />
                </Link>
              </div>

              {loadingQuestions ? (
                <div className="p-12 text-center text-[var(--text-muted)]">
                  <div className="w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  Loading practice questions...
                </div>
              ) : questions.length === 0 ? (
                <div className="p-12 text-center text-[var(--text-muted)] bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-main)]">
                  No questions currently loaded for {topic.code}.
                </div>
              ) : (
                <div className="space-y-6">
                  {questions.map((q) => (
                    <QuestionCard key={q.id} question={q} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-5 border-t border-[var(--border-main)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-[var(--text-muted)] font-mono">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-main)]">ESC</kbd> to return
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors"
            >
              Close
            </button>

            <Link
              href={
                isMath
                  ? `/math?topic=${encodeURIComponent(topic.code)}`
                  : `/verbal?topic=${encodeURIComponent(topic.code)}`
              }
              className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all flex items-center gap-1.5 ${
                isMath
                  ? "bg-[var(--accent-blue)] hover:opacity-90"
                  : "bg-purple-600 hover:opacity-90"
              }`}
            >
              <span>Practice in {isMath ? "Math" : "Verbal"} Hub</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Portal>
);
}
