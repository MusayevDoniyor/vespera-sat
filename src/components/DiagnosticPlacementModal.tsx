"use client";

import React, { useState } from "react";
import {
  Target,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Award,
  Zap,
  TrendingUp,
  X,
  RotateCcw
} from "lucide-react";
import {
  DIAGNOSTIC_BENCHMARK_QUESTIONS,
  evaluateDiagnostic
} from "@/lib/adaptive-engine";
import { useAuth } from "./AuthContext";
import KaTeXMath from "./KaTeXMath";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import Portal from "./Portal";

interface DiagnosticPlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: (result: any) => void;
}

export default function DiagnosticPlacementModal({
  isOpen,
  onClose,
  onCompleted
}: DiagnosticPlacementModalProps) {
  const { user, updateProfile } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const currentQ = DIAGNOSTIC_BENCHMARK_QUESTIONS[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / DIAGNOSTIC_BENCHMARK_QUESTIONS.length) * 100);

  const handleSelectOption = (choiceLetter: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: choiceLetter
    }));
  };

  const handleNext = () => {
    if (currentIdx < DIAGNOSTIC_BENCHMARK_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    const evalResult = evaluateDiagnostic(answers);
    setReport(evalResult);
    setIsFinished(true);

    if (user) {
      setSaving(true);
      try {
        await updateProfile({
          currentSatScore: evalResult.estimatedScore,
          priorityWeakness:
            evalResult.weakestSection === "MATH"
              ? "Math 0 to 800 & Desmos Speed Lab"
              : "Reading Transitions & Boundaries (Verbal 5-Sec Kill)"
        });
      } catch (err) {
        console.error("Error saving diagnostic score:", err);
      } finally {
        setSaving(false);
      }
    }

    if (onCompleted) {
      onCompleted(evalResult);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsFinished(false);
    setReport(null);
  };

  return (
    <Portal>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Diagnostic Placement Assessment"
        className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-hidden"
      >
      <div className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors"
          aria-label="Close diagnostic modal"
        >
          <X size={20} />
        </button>

        {!isFinished ? (
          <>
            {/* Header / Progress */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold">
                    <Target size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[var(--text-main)]">
                      5-Min Placement Diagnostic
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      Question {currentIdx + 1} of {DIAGNOSTIC_BENCHMARK_QUESTIONS.length} • {currentQ.section === "MATH" ? "Math" : "Reading & Writing"} ({currentQ.domain})
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[var(--accent-blue)] px-2.5 py-1 rounded-full bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full h-1.5 bg-[var(--bg-card)] rounded-full overflow-hidden border border-[var(--border-main)]">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Content */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)]">
                <div className="text-sm sm:text-base text-[var(--text-main)] leading-relaxed font-medium">
                  <KaTeXMath content={currentQ.prompt} />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, oIdx) => {
                  const letter = ["A", "B", "C", "D"][oIdx];
                  const isSelected = answers[currentQ.id] === letter;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(letter)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                        isSelected
                          ? "bg-blue-500/15 border-blue-500 text-[var(--text-main)] shadow-sm ring-1 ring-blue-500"
                          : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-main)] hover:border-[var(--border-hover)]"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-main)]"
                        }`}
                      >
                        {letter}
                      </span>
                      <div className="text-sm font-medium leading-relaxed">
                        <KaTeXMath content={opt} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 pt-4 border-t border-[var(--border-main)] flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft size={15} />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 disabled:opacity-40 disabled:pointer-events-none"
              >
                <span>{currentIdx === DIAGNOSTIC_BENCHMARK_QUESTIONS.length - 1 ? "Submit & View Report" : "Next Question"}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </>
        ) : (
          /* Report Card View */
          <div className="flex-1 overflow-y-auto space-y-6 animate-fade-in py-2">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <Award size={15} />
                <span>Diagnostic Assessment Complete</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight">
                Your Baseline SAT Score: {report.estimatedScore}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto">
                Based on your performance across 8 benchmark domains, here is your customized roadmap to reach 1550+.
              </p>
            </div>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] text-center space-y-1">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Math Section
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-[var(--accent-blue)]">
                  {report.estimatedMath}
                </div>
                <span className="text-[11px] text-[var(--text-muted)]">
                  {report.mathCorrect} of 4 benchmark Qs correct
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] text-center space-y-1">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                  Reading & Writing
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-[var(--accent-purple)]">
                  {report.estimatedVerbal}
                </div>
                <span className="text-[11px] text-[var(--text-muted)]">
                  {report.verbalCorrect} of 4 benchmark Qs correct
                </span>
              </div>
            </div>

            {/* Personalized Strategy Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 border border-blue-500/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-500">
                <Zap size={16} />
                <span>Recommended First Move</span>
              </div>
              <h4 className="text-base font-extrabold text-[var(--text-main)]">
                Start with {report.recommendedFirstUnit.title}
              </h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Your performance indicates that conquering this unit will yield the highest immediate point gain (+40 to +60 points) in under 7 days.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`/curriculum/units/${report.recommendedFirstUnit.slug}`}
                onClick={onClose}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all text-center"
              >
                <span>Start {report.recommendedFirstUnit.title}</span>
                <ArrowRight size={16} />
              </a>

              <button
                type="button"
                onClick={handleRestart}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw size={14} />
                <span>Retake</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </Portal>
  );
}
