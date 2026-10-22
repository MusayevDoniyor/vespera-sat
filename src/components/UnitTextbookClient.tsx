"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Clock,
  Calculator,
  RotateCcw,
  Send,
  Loader2,
  Layers
} from "lucide-react";
import KaTeXMath from "./KaTeXMath";
import UnitDiagrams from "./UnitDiagrams";
import { KhanFullUnit } from "@/lib/khan-textbook-units";

interface Props {
  unit: KhanFullUnit;
}

export default function UnitTextbookClient({ unit }: Props) {
  const [activeTab, setActiveTab] = useState<"textbook" | "quiz" | "speedhacks" | "ai">("textbook");
  const [selectedSectionId, setSelectedSectionId] = useState<string>(unit.sections[0]?.id || "");

  // Reset section state whenever unit changes
  useEffect(() => {
    if (unit.sections && unit.sections.length > 0) {
      setSelectedSectionId(unit.sections[0].id);
    }
  }, [unit.id]);

  // Quiz State
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [showDesmosSplit, setShowDesmosSplit] = useState<boolean>(false);

  // AI Copilot State
  const [aiInput, setAiInput] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiMessages, setAiMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: `Hello! I am your personal **${unit.title}** AI Study Mentor. Ask me any conceptual question, trap clarification, or Desmos strategy for this unit!`
    }
  ]);

  const activeSection = unit.sections.find((s) => s.id === selectedSectionId) || unit.sections[0];

  const handleSelectOption = (questionId: string, choiceLetter: string) => {
    if (submittedQuestions[questionId]) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: choiceLetter }));
  };

  const handleSubmitQuestion = (questionId: string) => {
    if (!userAnswers[questionId]) return;
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSubmittedQuestions({});
  };

  const totalAnswered = Object.keys(submittedQuestions).length;
  const correctCount = unit.practiceQuestions.filter(
    (q) => submittedQuestions[q.id] && userAnswers[q.id] === q.correctAnswer
  ).length;

  const handleSendAiMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || aiInput;
    if (!textToSend.trim() || aiLoading) return;

    setAiMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    if (!customPrompt) setAiInput("");
    setAiLoading(true);

    try {
      const res = await fetch("/api/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicDomain: unit.domain,
          questionPrompt: `Unit Context: ${unit.title} (${unit.description})`,
          userQuestion: textToSend,
          explanationEn: unit.description
        })
      });

      if (!res.ok) throw new Error("AI failed to respond");
      const data = await res.json();
      const reply = data.reply || data.copilotReply || data.text || "Sorry, please try again.";
      setAiMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (e: any) {
      setAiMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Error connecting to AI tutor: ${e.message || "Please try again."}`
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const scrollToReader = () => {
    const el = document.getElementById("active-section-reader");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] pb-20">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-40 bg-[var(--bg-main)]/90 backdrop-blur-md border-b border-[var(--border-main)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/curriculum"
              className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--accent-blue)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-main)]"
              title="Back to Curriculum"
              aria-label="Back to Curriculum"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30 font-mono">
                  Unit {unit.unitNumber}
                </span>
                <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                  {unit.domain}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-[var(--text-main)] truncate max-w-[280px] sm:max-w-md">
                {unit.title}
              </h1>
            </div>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDesmosSplit(!showDesmosSplit)}
              aria-label="Toggle Desmos Graphing Calculator"
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                showDesmosSplit
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)] hover:border-[var(--accent-blue)]"
              }`}
            >
              <Calculator size={14} />
              <span className="hidden sm:inline">Desmos</span>
            </button>

            {unit.prevUnitId && (
              <Link
                href={`/curriculum/units/${unit.prevUnitId}`}
                className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--accent-blue)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                title="Previous Unit"
                aria-label="Previous Unit"
              >
                <ArrowLeft size={16} />
              </Link>
            )}

            {unit.nextUnitId && (
              <Link
                href={`/curriculum/units/${unit.nextUnitId}`}
                className="px-3 py-1.5 rounded-xl bg-[var(--accent-blue)] text-white text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
                title="Next Unit"
                aria-label="Next Unit"
              >
                <span>Next Unit</span>
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Unit Hero Banner with Enhanced Contrast */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30 font-mono">
                  {unit.tier} Track
                </span>
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 font-mono">
                  {unit.estimatedHours} Study Time
                </span>
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30 font-mono">
                  10 Practice Q&A Included
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {unit.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {unit.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-center px-4 border-r border-slate-200 dark:border-slate-700">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">Sections</div>
                <div className="text-xl font-black text-slate-900 dark:text-white">{unit.sections.length}</div>
              </div>
              <div className="text-center px-4">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">Questions</div>
                <div className="text-xl font-black text-emerald-700 dark:text-emerald-400">{unit.practiceQuestions.length}</div>
              </div>
            </div>
          </div>

          {/* Primary View Switcher Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 overflow-x-auto">
            <button
              onClick={() => setActiveTab("textbook")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "textbook"
                  ? "bg-blue-600 text-white shadow-sm ring-1 ring-blue-600"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <BookOpen size={14} />
              <span>Textbook & Theory ({unit.sections.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "quiz"
                  ? "bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <CheckCircle2 size={14} />
              <span>10-Question Target Practice ({totalAnswered}/10)</span>
            </button>

            <button
              onClick={() => setActiveTab("speedhacks")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "speedhacks"
                  ? "bg-amber-600 text-white shadow-sm ring-1 ring-amber-600"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <Zap size={14} />
              <span>SAT SpeedHacks ({unit.speedHacks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "ai"
                  ? "bg-blue-600 text-white shadow-sm ring-1 ring-blue-600"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <Sparkles size={14} />
              <span>AI Study Copilot</span>
            </button>
          </div>
        </div>

        {/* Desmos Split View (If Toggled) */}
        {showDesmosSplit && (
          <div className="mb-6 p-4 rounded-3xl bg-[var(--bg-card)] border border-[var(--accent-blue)]/50 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calculator size={16} className="text-[var(--accent-blue)]" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Official Bluebook Desmos Graphing Calculator Sandbox
                </span>
              </div>
              <button
                onClick={() => setShowDesmosSplit(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-bold hover:text-slate-900 dark:hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-inner">
              <iframe
                src="https://www.desmos.com/testing/cb-digital-sat/graphing"
                className="w-full h-full border-none"
                title="Desmos Graphing Calculator"
              />
            </div>
          </div>
        )}

        {/* TAB 1: TEXTBOOK & THEORY */}
        {activeTab === "textbook" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sidebar Table of Contents */}
            <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 px-2 mb-2 flex items-center justify-between font-mono">
                <span>Chapter Index</span>
                <span className="text-[11px]">{unit.sections.length} Chapters</span>
              </div>

              {unit.sections.map((section, idx) => {
                const isActive = selectedSectionId === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setSelectedSectionId(section.id);
                      scrollToReader();
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-500/20"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isActive
                          ? "bg-white text-blue-700 shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs leading-snug line-clamp-2 ${isActive ? "font-bold text-white" : "font-semibold text-slate-900 dark:text-slate-100"}`}>
                        {section.title}
                      </div>
                      <div className={`text-[11px] flex items-center gap-1 mt-1 font-mono ${isActive ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>
                        <Clock size={11} />
                        <span>{section.readTime}</span>
                      </div>
                    </div>
                  </button>
                );
              })}

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/25 mt-4 space-y-2">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Test Your Comprehension</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  Done reading the theory? Solidify your mastery with the 10-question target practice set.
                </p>
                <button
                  onClick={() => setActiveTab("quiz")}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Start Practice Set
                </button>
              </div>
            </div>

            {/* Main Section Content Area */}
            <div id="active-section-reader" className="lg:col-span-8 space-y-6">
              {activeSection && (
                <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                  {/* Section Title & Header */}
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
                    <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400 font-mono font-bold mb-1 uppercase tracking-wider">
                      <span>Chapter {unit.sections.findIndex((s) => s.id === activeSection.id) + 1} of {unit.sections.length}</span>
                      <span>•</span>
                      <span>{activeSection.readTime}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                      {activeSection.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed font-medium">
                      {activeSection.summary}
                    </p>
                  </div>

                  {/* Visual Diagram */}
                  {activeSection.diagramType && (
                    <UnitDiagrams type={activeSection.diagramType} />
                  )}

                  {/* Section Body Text & KaTeX Content */}
                  <div className="text-xs md:text-sm leading-relaxed text-slate-900 dark:text-slate-100 space-y-4">
                    <KaTeXMath mathText={activeSection.contentMarkdown} />
                  </div>

                  {/* Key Takeaways Card with Accessible Light/Dark Colors */}
                  {activeSection.keyTakeaways && activeSection.keyTakeaways.length > 0 && (
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2 font-mono">
                        <CheckCircle2 size={15} />
                        <span>Key Principles & Core Takeaways</span>
                      </div>
                      <div className="space-y-2">
                        {activeSection.keyTakeaways.map((takeaway, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                            <div className="flex-1">
                              <KaTeXMath mathText={takeaway} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Desmos Interactive Callout with High Contrast */}
                  {activeSection.desmosExample && (
                    <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/30 space-y-2.5">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="text-xs font-bold text-blue-950 dark:text-blue-200 flex items-center gap-2">
                          <Calculator size={15} className="text-[var(--accent-blue)]" />
                          <span>Desmos SpeedHack: {activeSection.desmosExample.title}</span>
                        </div>
                        <button
                          onClick={() => setShowDesmosSplit(true)}
                          className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-sm transition-all"
                        >
                          Open in Desmos
                        </button>
                      </div>
                      {/* Desmos Expression Input Display */}
                      <div className="rounded-xl overflow-hidden border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-slate-900 shadow-xs divide-y divide-slate-100 dark:divide-slate-800/80 font-mono text-xs">
                        {activeSection.desmosExample.expression
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((exprLine, lIdx) => (
                            <div
                              key={lIdx}
                              className="flex items-center gap-3 px-3.5 py-2.5 bg-slate-50/50 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 transition-colors"
                            >
                              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-bold flex items-center justify-center shrink-0 select-none border border-blue-200 dark:border-blue-800">
                                {lIdx + 1}
                              </span>
                              <span className="text-slate-900 dark:text-blue-200 font-semibold tracking-wide flex-1 break-all">
                                {exprLine}
                              </span>
                            </div>
                          ))}
                      </div>
                      <p className="text-xs text-blue-950 dark:text-blue-100 leading-relaxed font-medium">
                        {activeSection.desmosExample.tip}
                      </p>
                    </div>
                  )}

                  {/* Bottom Section Navigator */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                    {(() => {
                      const curIdx = unit.sections.findIndex((s) => s.id === activeSection.id);
                      const prevSec = unit.sections[curIdx - 1];
                      const nextSec = unit.sections[curIdx + 1];

                      return (
                        <>
                          {prevSec ? (
                            <button
                              onClick={() => {
                                setSelectedSectionId(prevSec.id);
                                scrollToReader();
                              }}
                              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[var(--bg-surface)] border border-slate-300 dark:border-[var(--border-main)] text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 flex items-center gap-2"
                            >
                              <ArrowLeft size={14} />
                              <span className="line-clamp-1 max-w-[150px]">{prevSec.title}</span>
                            </button>
                          ) : (
                            <div />
                          )}

                          {nextSec ? (
                            <button
                              onClick={() => {
                                setSelectedSectionId(nextSec.id);
                                scrollToReader();
                              }}
                              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 flex items-center gap-2 shadow-sm"
                            >
                              <span className="line-clamp-1 max-w-[150px]">{nextSec.title}</span>
                              <ArrowRight size={14} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setActiveTab("quiz")}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                            >
                              <span>Go to 10-Question Quiz</span>
                              <CheckCircle2 size={14} />
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: 10 TARGET PRACTICE QUESTIONS */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            {/* Quiz Banner & Score Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div>
                <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 size={15} />
                  <span>Unit {unit.unitNumber} Target Practice Set</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  10 Target Diagnostic Questions
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-medium">
                  Select an option for each question to unlock immediate step-by-step mathematical derivation and trap analysis.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-mono font-bold">Accuracy Score:</div>
                  <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                    {correctCount} / {unit.practiceQuestions.length}
                  </div>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-blue-500 transition-colors"
                  title="Reset Quiz"
                  aria-label="Reset Quiz"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {unit.practiceQuestions.map((q, idx) => {
                const isSubmitted = !!submittedQuestions[q.id];
                const selected = userAnswers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-6 md:p-8 rounded-3xl border transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/40"
                          : "bg-rose-50/70 dark:bg-rose-950/20 border-rose-300 dark:border-rose-500/40"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        Question #{idx + 1}
                      </span>
                      {isSubmitted && (
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                            isCorrect
                              ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30"
                              : "bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30"
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 size={14} />
                              <span>Correct (+1 Point)</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={14} />
                              <span>Incorrect (Correct: {q.correctAnswer})</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>

                    {/* Question Prompt */}
                    <div className="text-sm md:text-base font-semibold text-slate-900 dark:text-white leading-relaxed mb-6">
                      <KaTeXMath mathText={q.prompt} />
                    </div>

                    {/* Options (A, B, C, D) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {q.options.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx);
                        const isThisSelected = selected === letter;
                        const isThisCorrect = q.correctAnswer === letter;

                        let optClasses =
                          "p-4 rounded-2xl border text-xs md:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer text-left ";

                        if (!isSubmitted) {
                          optClasses += isThisSelected
                            ? "bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-950 dark:text-blue-100 shadow-sm ring-1 ring-blue-500"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500 hover:text-slate-900 dark:hover:text-white";
                        } else {
                          if (isThisCorrect) {
                            optClasses += "bg-emerald-100 dark:bg-emerald-900/40 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold";
                          } else if (isThisSelected && !isCorrect) {
                            optClasses += "bg-rose-100 dark:bg-rose-900/40 border-rose-500 text-rose-950 dark:text-rose-100 font-bold";
                          } else {
                            optClasses += "bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-700/40 opacity-40 text-slate-600 dark:text-slate-400";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isSubmitted}
                            onClick={() => handleSelectOption(q.id, letter)}
                            className={optClasses}
                          >
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                                isThisSelected
                                  ? isSubmitted
                                    ? isCorrect
                                      ? "bg-emerald-600 text-white"
                                      : "bg-rose-600 text-white"
                                    : "bg-blue-600 text-white"
                                  : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-xs"
                              }`}
                            >
                              {letter}
                            </span>
                            <div className="flex-1 min-w-0 pt-0.5 text-slate-900 dark:text-slate-100 font-medium">
                              <KaTeXMath mathText={opt} />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit Button */}
                    {!isSubmitted ? (
                      <button
                        disabled={!selected}
                        onClick={() => handleSubmitQuestion(q.id)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                          selected
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm cursor-pointer"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 opacity-60 cursor-not-allowed"
                        }`}
                      >
                        <span>Check Answer</span>
                        <ArrowRight size={14} />
                      </button>
                    ) : (
                      /* Post-Submission Detailed Explanation Drawer */
                      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2 font-mono">
                          <BookOpen size={14} />
                          <span>Step-by-Step Derivation & Explanation</span>
                        </div>

                        <div className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-2">
                          <KaTeXMath mathText={q.explanation} />
                        </div>

                        {q.satTrap && (
                          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-950 dark:text-amber-200 font-medium">
                            <AlertTriangle size={15} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                            <div>
                              <strong className="text-amber-900 dark:text-amber-100">SAT Trap Alert:</strong> {q.satTrap}
                            </div>
                          </div>
                        )}

                        {q.desmosTrick && (
                          <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-500/30 flex items-start gap-2.5 text-xs text-blue-950 dark:text-blue-200 font-medium">
                            <Zap size={15} className="shrink-0 text-[var(--accent-blue)] mt-0.5" />
                            <div>
                              <strong className="text-blue-900 dark:text-blue-100">Desmos SpeedHack:</strong> {q.desmosTrick}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SAT SPEEDHACKS */}
        {activeTab === "speedhacks" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1 font-mono">
                <Zap size={15} />
                <span>800-Scorer SpeedHacks & Execution Tactics</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {unit.title}: SpeedHacks
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-medium">
                Solve questions 3–5x faster than conventional textbook manipulation using College Board test quirks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unit.speedHacks.map((hack, hIdx) => (
                <div
                  key={hIdx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/40 transition-all space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
                      Hack #{hIdx + 1}
                    </span>
                    <Zap size={16} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {hack.title}
                  </h4>
                  <div className="space-y-2 text-xs font-medium text-slate-800 dark:text-slate-200">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400 font-bold">Trigger Pattern: </span>
                      <KaTeXMath mathText={hack.trigger} />
                    </div>
                    <div>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">SpeedHack Shortcut: </span>
                      <KaTeXMath mathText={hack.shortcut} />
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-900 dark:text-slate-100 font-mono text-xs shadow-xs">
                      <span className="font-bold text-slate-500 dark:text-slate-400 select-none">Example: </span>
                      <span className="font-semibold">{hack.example}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AI COPILOT TUTOR */}
        {activeTab === "ai" && (
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 flex items-center justify-center text-[var(--accent-blue)]">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Vespera SAT AI Study Copilot
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Personalized tutor specialized in {unit.title} concepts, traps, and Desmos techniques.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() =>
                  handleSendAiMessage("Summarize the 3 most essential rules from this unit with clear examples.")
                }
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-[var(--accent-blue)] shrink-0 transition-colors font-medium"
              >
                💡 3 Essential Rules with Examples
              </button>
              <button
                onClick={() =>
                  handleSendAiMessage("How do I use Desmos to solve this unit's problems in under 30 seconds?")
                }
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-[var(--accent-blue)] shrink-0 transition-colors font-medium"
              >
                ⚡ Desmos 30-Second SpeedHacks
              </button>
              <button
                onClick={() =>
                  handleSendAiMessage("What are the most common traps test writers set on Hard Module 2 for this topic?")
                }
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-[var(--accent-blue)] shrink-0 transition-colors font-medium"
              >
                ⚠️ Hard Module 2 Traps
              </button>
            </div>

            {/* Chat Message Stream */}
            <div className="space-y-4 max-h-[450px] overflow-y-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              {aiMessages.map((msg, mIdx) => (
                <div
                  key={mIdx}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-lg bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] flex items-center justify-center shrink-0 mt-0.5 border border-[var(--accent-blue)]/20">
                      <Sparkles size={14} />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none font-medium shadow-sm"
                        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-tl-none space-y-2 shadow-sm"
                    }`}
                  >
                    <KaTeXMath mathText={msg.text} />
                  </div>
                </div>
              ))}

              {aiLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 p-2">
                  <Loader2 size={16} className="animate-spin text-[var(--accent-blue)]" />
                  <span>AI Mentor is analyzing mathematical principles...</span>
                </div>
              )}
            </div>

            {/* Chat Input Field */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
                placeholder="Ask any question about this unit (e.g., How do I solve systems with Desmos?)..."
                className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs md:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[var(--accent-blue)] transition-colors shadow-sm"
              />
              <button
                disabled={!aiInput.trim() || aiLoading}
                onClick={() => handleSendAiMessage()}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
              >
                <span>Send</span>
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
