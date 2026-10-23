"use client";

import React, { useState, useEffect, useRef } from "react";
import KaTeXMath from "./KaTeXMath";
import QuestionDiagram from "./QuestionDiagram";
import { getRwDisplayContent } from "@/lib/bluebook-tests";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  RotateCcw,
  Strikethrough,
  Calendar,
  Send,
  Zap,
  Layers,
  Award,
} from "lucide-react";

interface QuestionCardProps {
  question: {
    id: string;
    section: string;
    domain: string;
    difficulty: string;
    prompt: string;
    passage?: string | null;
    options: string;
    correct_answer: string;
    explanation_uz?: string;
    explanation_en: string;
    desmos_trick?: string | null;
    desmos_latex?: string | null;
    reference_formula?: string | null;
    topic_title_uz?: string;
    topic_title_en?: string;
    diagramPreset?: string | null;
    diagramSvg?: string | null;
    progress_status?: string | null;
    user_choice?: string | null;
  };
  onAnswerSubmitted?: (isCorrect: boolean) => void;
  onOpenDesmosWithEquation?: (equation: string) => void;
}

export default function QuestionCard({
  question,
  onAnswerSubmitted,
  onOpenDesmosWithEquation,
}: QuestionCardProps) {
  const initialChoice = question.user_choice || null;
  const initialSubmitted = Boolean(question.progress_status);
  const initialCorrect =
    question.progress_status === "CORRECT"
      ? true
      : question.progress_status === "INCORRECT"
      ? false
      : null;

  const [selectedChoice, setSelectedChoice] = useState<string | null>(initialChoice);
  const [isSubmitted, setIsSubmitted] = useState(initialSubmitted);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(initialCorrect);
  const [activeTab, setActiveTab] = useState<"solution" | "desmos" | "formula">("solution");
  const [struckOut, setStruckOut] = useState<Record<string, boolean>>({});
  const [mistakeType, setMistakeType] = useState<string>("CONCEPT_GAP");
  const [isSaving, setIsSaving] = useState(false);
  const [sm2Result, setSm2Result] = useState<any>(null);
  const [isCardActive, setIsCardActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Sync state when question prop changes
  useEffect(() => {
    setSelectedChoice(question.user_choice || null);
    setIsSubmitted(Boolean(question.progress_status));
    setIsCorrect(
      question.progress_status === "CORRECT"
        ? true
        : question.progress_status === "INCORRECT"
        ? false
        : null
    );
    setStruckOut({});
    setSm2Result(null);
  }, [question.id, question.progress_status, question.user_choice]);

  // Parse options safely
  let optionsArray: string[] = [];
  try {
    optionsArray =
      typeof question.options === "string" ? JSON.parse(question.options) : question.options;
  } catch (e) {
    optionsArray = [];
  }

  // Keyboard Shortcuts: A, B, C, D (or 1-4) to pick; Enter to submit; R to retry
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Never intercept browser or OS hotkeys (Ctrl+A, Ctrl+C, Ctrl+V, Cmd+A, Alt+..., etc.)
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      // Ignore if user is currently typing in an input, textarea or contentEditable
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      // Check if this card is currently focused / hovered
      const activeQid = (window as any).vespera_active_qid;
      if (activeQid && activeQid !== question.id) {
        return;
      }

      const key = e.key.toUpperCase();

      // Choice selection: A, B, C, D
      if (["A", "B", "C", "D"].includes(key)) {
        if (!isSubmitted) {
          e.preventDefault();
          setSelectedChoice(key);
        }
      }
      // Choice selection: 1, 2, 3, 4
      else if (["1", "2", "3", "4"].includes(e.key)) {
        if (!isSubmitted) {
          e.preventDefault();
          const letters = ["A", "B", "C", "D"];
          const idx = parseInt(e.key, 10) - 1;
          if (letters[idx]) setSelectedChoice(letters[idx]);
        }
      }
      // Submit: Enter
      else if (e.key === "Enter" && !isSubmitted && selectedChoice && !isSaving) {
        e.preventDefault();
        handleSubmit();
      }
      // Retry: R (when submitted)
      else if (key === "R" && isSubmitted) {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedChoice, isSubmitted, isSaving]);

  const toggleStrike = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStruckOut((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSendToDesmos = () => {
    const latex = question.desmos_latex || "y = 2x + 4";
    window.dispatchEvent(new CustomEvent("vespera_desmos_load", { detail: { latex } }));
    if (onOpenDesmosWithEquation) {
      onOpenDesmosWithEquation(latex);
    }
  };

  const handleSubmit = async (customQuality?: number) => {
    if (!selectedChoice || isSaving) return;

    setIsSaving(true);
    const correctLetter = question.correct_answer.trim().toUpperCase();
    const chosenLetter = selectedChoice.charAt(0).toUpperCase();
    const correct = chosenLetter === correctLetter;

    setIsCorrect(correct);
    setIsSubmitted(true);

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          userChoice: chosenLetter,
          timeSpent: 45,
          mistakeType: correct ? null : mistakeType,
          qualityRating: customQuality || (correct ? 4 : 1),
        }),
      });

      const data = await res.json();
      if (data.sm2) {
        setSm2Result(data.sm2);
      }

      if (onAnswerSubmitted) {
        onAnswerSubmitted(correct);
      }
    } catch (err) {
      console.error("Failed to save progress:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRateSM2 = async (quality: number) => {
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          userChoice: question.correct_answer,
          timeSpent: 45,
          qualityRating: quality,
        }),
      });
      const data = await res.json();
      if (data.sm2) setSm2Result(data.sm2);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setSelectedChoice(null);
    setIsSubmitted(false);
    setIsCorrect(null);
    setStruckOut({});
    setSm2Result(null);
  };

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      onMouseEnter={() => {
        (window as any).vespera_active_qid = question.id;
        setIsCardActive(true);
      }}
      onMouseLeave={() => {
        setIsCardActive(false);
      }}
      onFocus={() => {
        (window as any).vespera_active_qid = question.id;
        setIsCardActive(true);
      }}
      onClick={() => {
        (window as any).vespera_active_qid = question.id;
        setIsCardActive(true);
      }}
      className={`bg-[var(--bg-card)] border rounded-3xl overflow-hidden shadow-sm transition-all outline-none ${
        isCardActive
          ? "border-[var(--accent-blue)]/70 ring-1 ring-[var(--accent-blue)]/20 shadow-md"
          : "border-[var(--border-main)] hover:border-[var(--accent-blue)]/40"
      }`}
    >
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-7 py-3 sm:py-4 bg-[var(--bg-surface)] border-b border-[var(--border-main)]">
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <span className="text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 font-mono">
            {question.domain}
          </span>
          <span
            className={`text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full ${
              question.difficulty === "Easy"
                ? "bg-[var(--accent-green)]/10 text-[var(--accent-green)]"
                : "bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]"
            }`}
          >
            {question.difficulty}
          </span>
          {isSubmitted && (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                isCorrect
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 size={13} className="shrink-0" />
                  <span>Solved</span>
                </>
              ) : (
                <>
                  <XCircle size={13} className="shrink-0" />
                  <span>Needs Review</span>
                </>
              )}
            </span>
          )}
          {question.topic_title_en && (
            <span className="text-xs text-[var(--text-muted)] hidden md:inline font-medium">
              • {question.topic_title_en}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {question.desmos_latex && (
            <button
              onClick={handleSendToDesmos}
              title="Load equation directly into Desmos"
              className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/20 hover:bg-[var(--accent-green)]/20 transition-all shadow-sm"
            >
              <Zap size={14} className="fill-current" />
              <span>Desmos</span>
            </button>
          )}

          <button
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("vespera_open_copilot", {
                  detail: {
                    question: question.prompt,
                    domain: question.domain,
                    userChoice: selectedChoice,
                    correctChoice: question.correct_answer,
                    options: optionsArray,
                    explanationUz: question.explanation_uz,
                    explanationEn: question.explanation_en,
                    desmosTrick: question.desmos_trick,
                    autoDiagnose: isSubmitted && !isCorrect,
                  },
                })
              );
            }}
            title="Ask AI Mentor for instant intuition or trap analysis"
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 hover:bg-[var(--accent-blue)]/20 transition-all shadow-sm"
          >
            <Sparkles size={14} />
            <span>AI Mentor</span>
          </button>

          {isSubmitted && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] px-2.5 sm:px-3 py-1.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] transition-colors text-xs font-medium shadow-sm"
            >
              <RotateCcw size={13} />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-7">
        {/* Reading Passage, Diagram and Prompt */}
        {(() => {
          const rwDisplay = question.section === "READING_WRITING" ? getRwDisplayContent(question as any) : null;
          const passageToShow = question.passage || rwDisplay?.passage;
          const promptToShow = rwDisplay ? rwDisplay.prompt : question.prompt;

          return (
            <>
              {/* Reading Passage if available */}
              {passageToShow && (
                <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-sm text-[var(--text-main)] leading-relaxed font-serif shadow-inner">
                  <span className="text-[11px] font-bold text-[var(--accent-blue)] uppercase tracking-wider block mb-2.5 font-sans">
                    📄 SAT Passage / Research Context:
                  </span>
                  <div className="whitespace-pre-line">{passageToShow}</div>
                </div>
              )}

              {/* Visual Reference Figure if available or auto-detected */}
              <QuestionDiagram
                preset={question.diagramPreset || (question as any).diagram_preset}
                customSvg={question.diagramSvg || (question as any).diagram_svg}
                prompt={passageToShow || promptToShow}
                domain={question.domain}
              />

              {/* Question Prompt */}
              <div className="text-base text-[var(--text-main)] font-medium leading-relaxed">
                <KaTeXMath content={promptToShow} />
              </div>
            </>
          );
        })()}

        {/* Options */}
        <div className="space-y-3.5">
          {optionsArray.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const cleanOpt = opt.replace(/^[A-D]\.\s*/, "").trim();
            const isSelected = selectedChoice === letter || selectedChoice === opt || selectedChoice === cleanOpt;
            const isStrike = !!struckOut[letter];
            const isCorrectOption = letter === question.correct_answer.toUpperCase();

            let borderBgStyle =
              "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-main)] hover:border-[var(--accent-blue)]/50 hover:bg-[var(--bg-card)]";

            if (isSubmitted) {
              if (isCorrectOption) {
                borderBgStyle =
                  "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold ring-1 ring-emerald-500/40";
              } else if (isSelected && !isCorrect) {
                borderBgStyle =
                  "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/40";
              }
            } else if (isSelected) {
              borderBgStyle =
                "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] text-[var(--accent-blue)] ring-1 ring-[var(--accent-blue)]/50 shadow-sm";
            }

            return (
              <div
                key={letter}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (!isSubmitted) setSelectedChoice(letter);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!isSubmitted) setSelectedChoice(letter);
                  }
                }}
                className={`group relative flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-blue)] ${borderBgStyle} ${
                  isStrike ? "opacity-35" : ""
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1 pr-4">
                  <div className="flex items-center gap-2 shrink-0 select-none">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border transition-colors ${
                        isSelected
                          ? "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] shadow-xs"
                          : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-main)] group-hover:border-[var(--accent-blue)]/50 group-hover:text-[var(--accent-blue)]"
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-muted)] opacity-60 group-hover:opacity-100 hidden sm:inline-block">
                      [{letter}]
                    </span>
                  </div>
                  <div className={`text-sm select-text cursor-text ${isStrike ? "line-through" : ""}`}>
                    <KaTeXMath content={cleanOpt} />
                  </div>
                </div>

                {!isSubmitted && (
                  <button
                    onClick={(e) => toggleStrike(letter, e)}
                    title="Eliminate Option (Strikethrough)"
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-[var(--bg-card)] transition-colors"
                  >
                    <Strikethrough size={15} />
                  </button>
                )}

                {isSubmitted && isCorrectOption && (
                  <CheckCircle2 size={20} className="text-emerald-500" />
                )}
                {isSubmitted && isSelected && !isCorrect && (
                  <XCircle size={20} className="text-rose-500" />
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Actions & Hotkeys Hint */}
        {!isSubmitted && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] flex-wrap">
              <span className="font-semibold text-[11px]">Keyboard:</span>
              <div className="flex items-center gap-1 font-mono text-[10px] font-bold">
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] shadow-2xs">A</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] shadow-2xs">B</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] shadow-2xs">C</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] shadow-2xs">D</kbd>
              </div>
              <span className="text-[11px]">to select</span>
              <span className="text-[var(--border-main)]">•</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] font-mono text-[10px] text-[var(--text-main)] font-bold shadow-2xs">Enter</kbd>
              <span className="text-[11px]">to submit</span>
            </div>

            <button
              onClick={() => handleSubmit()}
              disabled={!selectedChoice || isSaving}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                selectedChoice && !isSaving
                  ? "bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue)]/90 hover:scale-[1.01]"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-main)]"
              }`}
            >
              {isSaving ? "Checking..." : "Submit Answer"}
            </button>
          </div>
        )}

        {/* Post-Submit Feedback, SM-2 Rating & Explanations */}
        {isSubmitted && (
          <div className="pt-4 border-t border-[var(--border-main)] space-y-4">
            {/* Feedback Banner */}
            <div
              className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                isCorrect
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
              }`}
            >
              <div className="flex items-center gap-3">
                {isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                <div>
                  <h4 className="font-bold text-sm">
                    {isCorrect ? "Correct Solution! 🎉" : "Incorrect Answer"}
                  </h4>
                  <p className="text-xs opacity-90 mt-0.5">
                    Correct Option: <strong>Choice {question.correct_answer}</strong>
                    {sm2Result && (
                      <span className="ml-2 font-mono text-[11px]">
                        • SM-2 Interval: {sm2Result.intervalDays} days (Next Review:{" "}
                        {new Date(sm2Result.nextReviewAt).toLocaleDateString()})
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* SM-2 Interactive Confidence Rating (If Correct) */}
              {isCorrect && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <span className="text-[11px] mr-1">Recall Ease:</span>
                  <button
                    onClick={() => handleRateSM2(3)}
                    title="Required high effort (SM-2: 1-3 days)"
                    className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-amber-500 border border-[var(--border-main)] text-[11px] font-semibold"
                  >
                    Hard
                  </button>
                  <button
                    onClick={() => handleRateSM2(4)}
                    title="Clear recall with standard effort (SM-2: 3-6 days)"
                    className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--accent-blue)] border border-[var(--border-main)] text-[11px] font-semibold"
                  >
                    Good
                  </button>
                  <button
                    onClick={() => handleRateSM2(5)}
                    title="Instant recall / Solved with Desmos in 10s (SM-2: 6+ days)"
                    className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-emerald-500 border border-[var(--border-main)] text-[11px] font-semibold"
                  >
                    Easy ⚡
                  </button>
                </div>
              )}

              {/* Mistake Logger & AI Explainer Button (If Incorrect) */}
              {!isCorrect && (
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[var(--text-muted)] text-[11px]">Xato Turi:</span>
                    <select
                      value={mistakeType}
                      onChange={(e) => setMistakeType(e.target.value)}
                      className="bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-main)] rounded-lg px-2.5 py-1 text-xs outline-none font-medium"
                    >
                      <option value="CONCEPT_GAP">Concept / Formula Gap</option>
                      <option value="CALCULATION_SLIP">Calculation Slip</option>
                      <option value="MISREAD_QUESTION">Misread Question Stem</option>
                      <option value="DESMOS_MISSED">Missed Desmos Shortcut</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("vespera_open_copilot", {
                          detail: {
                            question: question.prompt,
                            domain: question.domain,
                            userChoice: selectedChoice,
                            correctChoice: question.correct_answer,
                            options: optionsArray,
                            explanationUz: question.explanation_uz,
                            explanationEn: question.explanation_en,
                            desmosTrick: question.desmos_trick,
                            autoDiagnose: true,
                          },
                        })
                      );
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm active:scale-95 transition-all"
                  >
                    <Sparkles size={13} className="text-amber-300 fill-amber-300" />
                    <span>💡 AI Diagnosis: Why is [{selectedChoice}] wrong?</span>
                  </button>
                </div>
              )}
            </div>

            {/* Structured Explainer Tabs */}
            <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] overflow-hidden shadow-sm">
              <div className="flex border-b border-[var(--border-main)] text-xs font-semibold overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab("solution")}
                  className={`flex-1 min-w-[130px] py-2.5 sm:py-3 px-3 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-2 transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === "solution"
                      ? "border-[var(--accent-blue)] text-[var(--accent-blue)] bg-[var(--bg-card)]"
                      : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  <BookOpen size={14} />
                  <span>Step-by-Step Solution</span>
                </button>

                {question.desmos_trick && (
                  <button
                    onClick={() => setActiveTab("desmos")}
                    className={`flex-1 min-w-[120px] py-2.5 sm:py-3 px-3 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-2 transition-colors border-b-2 whitespace-nowrap ${
                      activeTab === "desmos"
                        ? "border-[var(--accent-green)] text-[var(--accent-green)] bg-[var(--bg-card)]"
                        : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    <Sparkles size={14} className="text-[var(--accent-green)]" />
                    <span>Desmos 10s Hack</span>
                  </button>
                )}

                {question.reference_formula && (
                  <button
                    onClick={() => setActiveTab("formula")}
                    className={`flex-1 min-w-[130px] py-2.5 sm:py-3 px-3 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-2 transition-colors border-b-2 whitespace-nowrap ${
                      activeTab === "formula"
                        ? "border-[var(--accent-blue)] text-[var(--accent-blue)] bg-[var(--bg-card)] font-bold"
                        : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    <Layers size={14} />
                    <span>SAT Formula Reference</span>
                  </button>
                )}
              </div>

              {/* Explainer Body */}
              <div className="p-4 sm:p-6 text-sm leading-relaxed text-[var(--text-main)]">
                {activeTab === "solution" && (
                  <div className="space-y-4 font-sans">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <KaTeXMath content={question.explanation_en || question.explanation_uz || ""} />
                    </div>

                    {question.explanation_uz && question.explanation_uz !== question.explanation_en && (
                      <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs text-[var(--text-muted)] mt-3">
                        <span className="font-bold text-[var(--accent-blue)] block mb-1">
                          Mentor Note & Intuition:
                        </span>
                        <div className="whitespace-pre-line leading-relaxed">
                          <KaTeXMath content={question.explanation_uz} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "desmos" && question.desmos_trick && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30 text-[var(--text-main)] text-sm leading-relaxed">
                      <KaTeXMath content={question.desmos_trick} />
                    </div>

                    {question.desmos_latex && (
                      <button
                        onClick={handleSendToDesmos}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent-green)] text-white font-bold text-xs hover:bg-[var(--accent-green)]/90 transition-all shadow-sm"
                      >
                        <Zap size={14} className="fill-current" />
                        <span>Inject into Desmos ({question.desmos_latex})</span>
                      </button>
                    )}
                  </div>
                )}

                {activeTab === "formula" && question.reference_formula && (
                  <div className="space-y-3 font-sans">
                    <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] font-mono text-xs">
                      <span className="text-[var(--text-muted)] block mb-2 font-sans font-bold">
                        Official College Board Reference Formula:
                      </span>
                      <div className="text-center py-2 text-base text-[var(--accent-blue)]">
                        <KaTeXMath content={`$$${question.reference_formula}$$`} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
