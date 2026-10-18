"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  RotateCcw,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Calendar,
  Clock,
  Target,
  Zap,
} from "lucide-react";
import KaTeXMath from "@/components/KaTeXMath";
import QuestionDiagram from "@/components/QuestionDiagram";
import { MockAttemptReport } from "@/lib/mock-storage";
import { getRwDisplayContent } from "@/lib/bluebook-tests";

interface MockResultsViewProps {
  report: MockAttemptReport;
  onRetake?: () => void;
}

export default function MockResultsView({ report, onRetake }: MockResultsViewProps) {
  const [reviewFilter, setReviewFilter] = useState<
    "all" | "incorrect" | "correct" | "flagged" | "rw" | "math"
  >("all");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});

  const toggleExpand = (qid: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qid]: !(prev[qid] ?? true),
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    report.questions.forEach((q) => {
      all[q.id] = true;
    });
    setExpandedQuestions(all);
  };

  const collapseAll = () => {
    const all: Record<string, boolean> = {};
    report.questions.forEach((q) => {
      all[q.id] = false;
    });
    setExpandedQuestions(all);
  };

  const score = report.totalScore;
  const scoreBadgeColor =
    score >= 1450
      ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/30"
      : score >= 1200
      ? "text-blue-500 bg-blue-500/10 border-blue-500/30"
      : "text-amber-500 bg-amber-500/10 border-amber-500/30";

  const incorrectCount = report.questions.filter((q) => {
    const ans = report.userAnswers[q.id]?.trim().toUpperCase();
    return !ans || ans !== q.correctAnswer.trim().toUpperCase();
  }).length;

  const correctCount = report.questions.filter((q) => {
    const ans = report.userAnswers[q.id]?.trim().toUpperCase();
    return ans === q.correctAnswer.trim().toUpperCase();
  }).length;

  const filteredQuestions = report.questions.filter((q) => {
    const ans = report.userAnswers[q.id]?.trim().toUpperCase();
    const isCorrect = ans && ans === q.correctAnswer.trim().toUpperCase();
    if (reviewFilter === "incorrect") return !isCorrect;
    if (reviewFilter === "correct") return isCorrect;
    if (reviewFilter === "flagged") return Boolean(report.flagged?.[q.id]);
    if (reviewFilter === "rw") return q.section === "READING_WRITING";
    if (reviewFilter === "math") return q.section === "MATH";
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-main)] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/mock"
            className="p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition"
            title="Return to Exam Lobby"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] border border-[var(--accent-blue)]/30">
                {report.formCode}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(report.completedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[var(--text-main)] tracking-tight mt-1">
              {report.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {onRetake ? (
            <button
              onClick={onRetake}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition flex items-center gap-1.5 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </button>
          ) : (
            <Link
              href={`/mock/exam/${report.examId}`}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition flex items-center gap-1.5 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </Link>
          )}

          <Link
            href="/mock"
            className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-secondary)] font-bold text-xs transition"
          >
            <span>All Exams</span>
          </Link>
        </div>
      </div>

      {/* Main Score Report Card */}
      <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-main)]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              Official Digital SAT Score Report
            </div>
            <div className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-main)] flex items-baseline gap-3">
              <span>{report.totalScore}</span>
              <span className="text-base sm:text-lg text-[var(--text-muted)] font-normal font-mono">
                / 1600
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Estimated Percentile: <strong className="text-[var(--text-main)] font-mono">{report.percentile}th Percentile</strong> (Top {100 - report.percentile}%)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 border-t md:border-t-0 md:border-l border-[var(--border-main)] pt-4 md:pt-0 md:pl-8">
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Reading & Writing
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                {report.rwScore}
                <span className="text-xs font-normal text-[var(--text-muted)] ml-1">/ 800</span>
              </div>
              <div className="text-[11px] text-[var(--text-muted)] font-mono">
                {report.rwM1?.correct + report.rwM2?.correct} / 54 Correct
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                Math (Desmos Allowed)
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {report.mathScore}
                <span className="text-xs font-normal text-[var(--text-muted)] ml-1">/ 800</span>
              </div>
              <div className="text-[11px] text-[var(--text-muted)] font-mono">
                {report.mathM1?.correct + report.mathM2?.correct} / 44 Correct
              </div>
            </div>
          </div>
        </div>

        {/* Adaptive MST Routing Breakdown */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Digital SAT Multistage Adaptive Pathway (Bluebook MST Telemetry)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--text-main)]">Section 1: Reading & Writing</span>
                <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  {report.rwTier}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
                <span>Routing Module 1: {report.rwM1?.correct}/{report.rwM1?.total} ({report.rwM1?.percent}%)</span>
                <span>Adaptive Module 2: {report.rwM2?.correct}/{report.rwM2?.total} ({report.rwM2?.percent}%)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--text-main)]">Section 2: Math</span>
                <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {report.mathTier}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
                <span>Routing Module 1: {report.mathM1?.correct}/{report.mathM1?.total} ({report.mathM1?.percent}%)</span>
                <span>Adaptive Module 2: {report.mathM2?.correct}/{report.mathM2?.total} ({report.mathM2?.percent}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Mastery Breakdown */}
        {report.domainStats && Object.keys(report.domainStats).length > 0 && (
          <div className="space-y-4 pt-4 border-t border-[var(--border-main)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[var(--accent-blue)]" />
                <h3 className="text-sm font-bold text-[var(--text-main)]">
                  College Board Domain Mastery Breakdown
                </h3>
              </div>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                {Object.keys(report.domainStats).length} Domains Measured
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(report.domainStats).map(([domain, stat]) => (
                <div
                  key={domain}
                  className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text-main)] truncate max-w-[200px]">
                      {domain}
                    </span>
                    <span className="font-mono font-bold text-[var(--text-secondary)]">
                      {stat.correct}/{stat.total} ({stat.accuracy}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--bg-card)] overflow-hidden border border-[var(--border-main)]">
                    <div
                      className={`h-full transition-all duration-500 ${
                        stat.accuracy >= 80
                          ? "bg-emerald-500"
                          : stat.accuracy >= 60
                          ? "bg-[var(--accent-blue)]"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${stat.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 1-Click Adaptive Drill suggestions */}
            <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border border-blue-500/20 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-[var(--text-main)]">
                    Adaptive Recommendations Based on This Exam
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[var(--accent-blue)] font-bold">
                  1-Click Practice Drills
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Focus your prep on domains with accuracy under 70% to gain the most points on your next attempt:
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {Object.entries(report.domainStats)
                  .filter(([, stat]) => stat.accuracy < 70)
                  .sort(([, a], [, b]) => a.accuracy - b.accuracy)
                  .slice(0, 3)
                  .map(([domain, stat]) => {
                    const isMath =
                      domain.includes("Algebra") ||
                      domain.includes("Geometry") ||
                      domain.includes("Advanced") ||
                      domain.includes("Problem Solving");
                    const targetUrl = isMath
                      ? `/math?domain=${encodeURIComponent(domain)}&adaptive=true`
                      : `/verbal?domain=${encodeURIComponent(domain)}&adaptive=true`;

                    return (
                      <Link
                        key={domain}
                        href={targetUrl}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--accent-blue)] text-[var(--text-main)] transition shadow-sm flex items-center gap-1.5"
                      >
                        <span>{domain} ({stat.accuracy}%)</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                      </Link>
                    );
                  })}
                <Link
                  href="/"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm flex items-center gap-1.5"
                >
                  <span>View Dashboard Adaptive Feed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= DETAILED QUESTION DIAGNOSTICS & AI COPILOT ANALYSIS ================= */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-main)] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-main)] flex items-center gap-2">
              <Award className="w-6 h-6 text-[var(--accent-blue)]" />
              <span>Exam Question Analysis & Diagnostics</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Detailed review of all {report.questions.length} questions, your responses, correct answers, and AI Copilot explanations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs px-3 py-1.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-secondary)] font-medium transition"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-xs px-3 py-1.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-secondary)] font-medium transition"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {[
            { id: "all", label: `All (${report.questions.length})` },
            {
              id: "incorrect",
              label: `Incorrect (${incorrectCount})`,
              highlight: "rose",
            },
            {
              id: "correct",
              label: `Correct (${correctCount})`,
              highlight: "emerald",
            },
            {
              id: "rw",
              label: "Reading & Writing (54)",
            },
            {
              id: "math",
              label: "Math (44)",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setReviewFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                reviewFilter === tab.id
                  ? tab.highlight === "rose"
                    ? "bg-rose-500 text-white shadow-sm"
                    : tab.highlight === "emerald"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-[var(--accent-blue)] text-white shadow-sm"
                  : "bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, qIndex) => {
            const userAns = report.userAnswers[q.id]?.trim().toUpperCase();
            const isCorrect = userAns && userAns === q.correctAnswer.trim().toUpperCase();
            const isAnswered = Boolean(userAns);
            const isExpanded = expandedQuestions[q.id] ?? true;

            return (
              <div
                key={q.id}
                className={`p-5 md:p-6 rounded-2xl bg-[var(--bg-card)] border transition-all shadow-sm ${
                  !isCorrect
                    ? "border-rose-500/30 hover:border-rose-500/50"
                    : "border-[var(--border-main)] hover:border-[var(--accent-blue)]/40"
                }`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-main)]">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-main)] font-mono text-xs font-black flex items-center justify-center text-[var(--text-main)]">
                      {qIndex + 1}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        q.section === "READING_WRITING"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {q.section === "READING_WRITING" ? "Reading & Writing" : "Math"}
                    </span>
                    <span className="text-[11px] font-medium text-[var(--text-muted)] truncate max-w-[150px] sm:max-w-[250px]">
                      {q.domain}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-main)]">
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Status Badge & Toggle */}
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Correct ({q.correctAnswer})</span>
                      </span>
                    ) : isAnswered ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold font-mono">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Your Choice: {userAns} • Correct: {q.correctAnswer}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Omitted • Correct: {q.correctAnswer}</span>
                      </span>
                    )}

                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-4">
                    {/* Reading Passage and Diagram */}
                    {(() => {
                      const rwDisplay = q.section === "READING_WRITING" ? getRwDisplayContent(q) : null;
                      const passageToShow = q.passage || rwDisplay?.passage;
                      const promptToShow = rwDisplay ? rwDisplay.prompt : q.prompt;

                      return (
                        <>
                          {passageToShow && (
                            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs md:text-sm text-[var(--text-secondary)] font-serif leading-relaxed max-h-56 overflow-y-auto whitespace-pre-line">
                              {passageToShow}
                            </div>
                          )}

                          {(q.diagramPreset || q.diagramSvg) && (
                            <div className="mt-3">
                              <QuestionDiagram
                                preset={q.diagramPreset}
                                customSvg={q.diagramSvg}
                                prompt={passageToShow || promptToShow}
                                domain={q.domain}
                              />
                            </div>
                          )}

                          <div className="text-xs md:text-sm text-[var(--text-main)] font-medium leading-relaxed">
                            <KaTeXMath content={promptToShow} />
                          </div>
                        </>
                      );
                    })()}

                    {/* Options list */}
                    {q.type === "multiple_choice" && q.options && (
                      <div className="grid grid-cols-1 gap-2 pt-2">
                        {q.options.map((opt) => {
                          const letter = opt.substring(0, 1).toUpperCase();
                          const cleanText = opt.substring(3).trim();
                          const isThisCorrect = letter === q.correctAnswer.trim().toUpperCase();
                          const isThisUserChoice = letter === userAns?.trim().toUpperCase();
                          const isUserWrongHere = isThisUserChoice && !isThisCorrect;

                          return (
                            <div
                              key={letter}
                              className={`p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                                isThisCorrect
                                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-700 dark:text-emerald-300 font-semibold"
                                  : isUserWrongHere
                                  ? "bg-rose-500/10 border-rose-500/50 text-rose-700 dark:text-rose-300 font-semibold"
                                  : "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-secondary)]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                                    isThisCorrect
                                      ? "bg-emerald-500 text-white"
                                      : isUserWrongHere
                                      ? "bg-rose-500 text-white"
                                      : "bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)]"
                                  }`}
                                >
                                  {letter}
                                </span>
                                <div>
                                  <KaTeXMath content={cleanText} />
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {isThisCorrect && (
                                  <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                    Correct Key
                                  </span>
                                )}
                                {isUserWrongHere && (
                                  <span className="text-[11px] font-mono font-bold text-rose-500">
                                    Your Choice (Incorrect)
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* AI Copilot Explanation & Analysis */}
                    <div className="mt-4 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-blue)]">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>AI Copilot Analysis & Solution Guide</span>
                      </div>

                      {q.explanationEn && (
                        <div className="text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-line border-l-2 border-[var(--accent-blue)] pl-3">
                          <strong className="text-[var(--text-main)] block mb-1">Official Solution Rationale:</strong>
                          <KaTeXMath content={q.explanationEn} />
                        </div>
                      )}

                      {/* Desmos Trick if available */}
                      {q.desmosTrick && (
                        <div className="p-3 rounded-lg bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 text-xs text-[var(--text-secondary)] space-y-1">
                          <span className="font-bold text-[var(--accent-green)] flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            <span>Desmos Speedhack (10-Second Shortcut):</span>
                          </span>
                          <p className="leading-relaxed pl-5 font-mono text-[11px]">
                            {q.desmosTrick}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
