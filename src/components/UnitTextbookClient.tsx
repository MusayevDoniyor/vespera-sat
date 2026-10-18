"use client";

import React, { useState } from "react";
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
  Layers,
  ChevronRight,
  Clock,
  Compass,
  MessageSquare,
  Calculator,
  RotateCcw,
  Send,
  Loader2,
  HelpCircle,
  FileText
} from "lucide-react";
import KaTeXMath from "./KaTeXMath";
import UnitDiagrams from "./UnitDiagrams";
import { KhanFullUnit, TextbookSection, TextbookPracticeQuestion } from "@/lib/khan-textbook-units";

interface Props {
  unit: KhanFullUnit;
}

export default function UnitTextbookClient({ unit }: Props) {
  const [activeTab, setActiveTab] = useState<"textbook" | "quiz" | "speedhacks" | "ai">("textbook");
  const [selectedSectionId, setSelectedSectionId] = useState<string>(unit.sections[0]?.id || "");

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
      text: `Salom! Men sizning **${unit.title}** bo'yicha shaxsiy AI repetitoringizman. Ushbu unitdagi har qanday formula, strategiya yoki savol bo'yicha tushuntirish so'rashingiz mumkin!`
    }
  ]);

  const activeSection = unit.sections.find((s) => s.id === selectedSectionId) || unit.sections[0];

  const handleSelectOption = (questionId: string, choiceLetter: string) => {
    if (submittedQuestions[questionId]) return; // locked after submit
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

  // Score calculation
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
          questionPrompt: `Unit Context: ${unit.title} (${unit.description_en})`,
          userQuestion: textToSend,
          explanationUz: unit.description_uz,
          explanationEn: unit.description_en
        })
      });

      if (!res.ok) throw new Error("AI javob bera olmadi");
      const data = await res.json();
      const reply = data.reply || data.copilotReply || data.text || "Kechirasiz, qayta urinib ko'ring.";
      setAiMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (e: any) {
      setAiMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Xatolik yuz berdi: ${e.message || "Iltimos qaytadan urinib ko'ring"}`
        }
      ]);
    } finally {
      setAiLoading(false);
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
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] font-mono">
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
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                showDesmosSplit
                  ? "bg-cyan-500 text-white border-cyan-400 shadow-sm"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)]"
              }`}
            >
              <Calculator size={14} />
              <span className="hidden sm:inline">Desmos</span>
            </button>

            {unit.prevUnitId && (
              <Link
                href={`/curriculum/units/${unit.prevUnitId}`}
                className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--accent-blue)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                title="Oldingi Unit"
              >
                <ArrowLeft size={16} />
              </Link>
            )}

            {unit.nextUnitId && (
              <Link
                href={`/curriculum/units/${unit.nextUnitId}`}
                className="px-3 py-1.5 rounded-xl bg-[var(--accent-blue)] text-white text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
                title="Keyingi Unit"
              >
                <span>Keyingi Unit</span>
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Unit Hero Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-950/30 via-[var(--bg-card)] to-purple-950/20 border border-[var(--border-main)] mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-mono">
                  {unit.tier} Track
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">
                  {unit.estimatedHours} Study Time
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  10 Practice Q&A Included
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tight">
                {unit.title}
              </h2>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                {unit.description_uz}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 bg-[var(--bg-surface)] p-3 rounded-2xl border border-[var(--border-main)]">
              <div className="text-center px-3 border-r border-[var(--border-main)]">
                <div className="text-xs text-[var(--text-muted)] font-mono">Bo'limlar</div>
                <div className="text-lg font-black text-[var(--text-main)]">{unit.sections.length}</div>
              </div>
              <div className="text-center px-3">
                <div className="text-xs text-[var(--text-muted)] font-mono">Savollar</div>
                <div className="text-lg font-black text-emerald-400">{unit.practiceQuestions.length}</div>
              </div>
            </div>
          </div>

          {/* Primary View Switcher Tabs */}
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-[var(--border-main)]/60 overflow-x-auto">
            <button
              onClick={() => setActiveTab("textbook")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "textbook"
                  ? "bg-[var(--accent-blue)] text-white shadow-sm"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <BookOpen size={14} />
              <span>Darslik & Nazariya ({unit.sections.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "quiz"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <CheckCircle2 size={14} />
              <span>10 talik Target Quiz ({totalAnswered}/10)</span>
            </button>

            <button
              onClick={() => setActiveTab("speedhacks")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "speedhacks"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <Zap size={14} />
              <span>SAT SpeedHacks ({unit.speedHacks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "ai"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <Sparkles size={14} />
              <span>AI Repetitor (Copilot)</span>
            </button>
          </div>
        </div>

        {/* Desmos Split View (If Toggled) */}
        {showDesmosSplit && (
          <div className="mb-6 p-4 rounded-3xl bg-[var(--bg-surface)] border-2 border-cyan-500/40 shadow-lg">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-main)]">
              <div className="flex items-center gap-2">
                <Calculator size={16} className="text-cyan-400" />
                <span className="text-xs font-bold text-[var(--text-main)]">
                  Bluebook Rasmiy Desmos Kalkulyatori Sandbox
                </span>
              </div>
              <button
                onClick={() => setShowDesmosSplit(false)}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                Yopish
              </button>
            </div>
            <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-[var(--border-main)]">
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
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] px-2 mb-2 flex items-center justify-between">
                <span>Darslik Mundarijasi</span>
                <span className="font-mono text-[11px]">{unit.sections.length} Bob</span>
              </div>

              {unit.sections.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSectionId(section.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    selectedSectionId === section.id
                      ? "bg-[var(--bg-surface)] border-[var(--accent-blue)] text-[var(--text-main)] shadow-sm"
                      : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--text-muted)]/40"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedSectionId === section.id
                        ? "bg-[var(--accent-blue)] text-white"
                        : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold leading-snug line-clamp-2">
                      {section.title}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 mt-1 font-mono">
                      <Clock size={11} />
                      <span>{section.readTime}</span>
                    </div>
                  </div>
                </button>
              ))}

              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/20 to-[var(--bg-card)] border border-emerald-500/20 mt-4 space-y-2">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Bilimingizni sinab ko'ring</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Nazariyani o'qib bo'lgach, 10 talik amaliy testni yechib, tushunchangizni mustahkamlang.
                </p>
                <button
                  onClick={() => setActiveTab("quiz")}
                  className="w-full py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors"
                >
                  Target Quizni boshlash
                </button>
              </div>
            </div>

            {/* Main Section Content Area */}
            <div className="lg:col-span-8 space-y-6">
              {activeSection && (
                <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-6">
                  {/* Section Title & Header */}
                  <div className="border-b border-[var(--border-main)] pb-5">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-1">
                      <span>BOB {unit.sections.findIndex((s) => s.id === activeSection.id) + 1}</span>
                      <span>•</span>
                      <span>{activeSection.readTime}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-[var(--text-main)]">
                      {activeSection.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                      {activeSection.summary_uz}
                    </p>
                  </div>

                  {/* Visual Diagram (If section has one) */}
                  {activeSection.diagramType && (
                    <UnitDiagrams type={activeSection.diagramType} />
                  )}

                  {/* Section Body Text & KaTeX Content */}
                  <div className="prose prose-invert max-w-none text-xs md:text-sm leading-relaxed text-[var(--text-main)] space-y-4">
                    <KaTeXMath mathText={activeSection.contentMarkdown} />
                  </div>

                  {/* Key Takeaways Card */}
                  {activeSection.keyTakeaways && activeSection.keyTakeaways.length > 0 && (
                    <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)] flex items-center gap-2">
                        <CheckCircle2 size={15} />
                        <span>Asosiy Qoidalar & Xulosalar (Takeaways)</span>
                      </div>
                      <div className="space-y-2">
                        {activeSection.keyTakeaways.map((takeaway, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] mt-1.5 shrink-0" />
                            <div className="flex-1">
                              <KaTeXMath mathText={takeaway} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Desmos Interactive Callout */}
                  {activeSection.desmosExample && (
                    <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                          <Calculator size={14} />
                          <span>Desmos Tezkor Usuli: {activeSection.desmosExample.title}</span>
                        </div>
                        <button
                          onClick={() => setShowDesmosSplit(true)}
                          className="text-[11px] font-bold text-cyan-300 underline hover:text-white"
                        >
                          Desmos'da sinab ko'rish
                        </button>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-yellow-300">
                        {activeSection.desmosExample.expression}
                      </div>
                      <p className="text-xs text-cyan-200/80">
                        {activeSection.desmosExample.tip}
                      </p>
                    </div>
                  )}

                  {/* Bottom Section Navigator */}
                  <div className="flex items-center justify-between pt-6 border-t border-[var(--border-main)]">
                    {(() => {
                      const curIdx = unit.sections.findIndex((s) => s.id === activeSection.id);
                      const prevSec = unit.sections[curIdx - 1];
                      const nextSec = unit.sections[curIdx + 1];

                      return (
                        <>
                          {prevSec ? (
                            <button
                              onClick={() => setSelectedSectionId(prevSec.id)}
                              className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-main)] hover:border-[var(--accent-blue)] flex items-center gap-2"
                            >
                              <ArrowLeft size={14} />
                              <span className="line-clamp-1 max-w-[150px]">{prevSec.title}</span>
                            </button>
                          ) : (
                            <div />
                          )}

                          {nextSec ? (
                            <button
                              onClick={() => setSelectedSectionId(nextSec.id)}
                              className="px-4 py-2 rounded-xl bg-[var(--accent-blue)] text-white text-xs font-bold hover:opacity-90 flex items-center gap-2 shadow-sm"
                            >
                              <span className="line-clamp-1 max-w-[150px]">{nextSec.title}</span>
                              <ArrowRight size={14} />
                            </button>
                          ) : (
                            <button
                              onClick={() => setActiveTab("quiz")}
                              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 flex items-center gap-2 shadow-sm"
                            >
                              <span>10 talik Quizga o'tish</span>
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
            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>Unit {unit.unitNumber} Rasmiy Amaliyot Seti</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)]">
                  10 ta Target Diagnostic Savollar
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Har bir savolga javob bering va darhol qadamma-qadam yechimini ko'ring.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-[var(--text-muted)] font-mono">Natija:</div>
                  <div className="text-2xl font-black text-emerald-400">
                    {correctCount} / {unit.practiceQuestions.length}
                  </div>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--accent-blue)] transition-colors"
                  title="Qaytadan yechish"
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
                          ? "bg-emerald-950/15 border-emerald-500/40"
                          : "bg-rose-950/15 border-rose-500/40"
                        : "bg-[var(--bg-card)] border-[var(--border-main)]"
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-main)]">
                        Savol #{idx + 1}
                      </span>
                      {isSubmitted && (
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                            isCorrect
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 size={14} />
                              <span>To'g'ri! (+1)</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={14} />
                              <span>Xato! (To'g'ri: {q.correctAnswer})</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>

                    {/* Question Prompt */}
                    <div className="text-sm md:text-base font-medium text-[var(--text-main)] leading-relaxed mb-6">
                      <KaTeXMath mathText={q.prompt} />
                    </div>

                    {/* Options (A, B, C, D) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {q.options.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                        const isThisSelected = selected === letter;
                        const isThisCorrect = q.correctAnswer === letter;

                        let optClasses =
                          "p-4 rounded-2xl border text-xs md:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer text-left ";

                        if (!isSubmitted) {
                          optClasses += isThisSelected
                            ? "bg-[var(--accent-blue)]/15 border-[var(--accent-blue)] text-[var(--text-main)] shadow-sm"
                            : "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-muted)] hover:border-[var(--text-muted)]/50 hover:text-[var(--text-main)]";
                        } else {
                          if (isThisCorrect) {
                            optClasses += "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold";
                          } else if (isThisSelected && !isCorrect) {
                            optClasses += "bg-rose-500/20 border-rose-500 text-rose-200 font-bold";
                          } else {
                            optClasses += "bg-[var(--bg-surface)]/50 border-[var(--border-main)]/50 opacity-40 text-[var(--text-muted)]";
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
                                      ? "bg-emerald-500 text-white"
                                      : "bg-rose-500 text-white"
                                    : "bg-[var(--accent-blue)] text-white"
                                  : "bg-[var(--bg-main)] text-[var(--text-muted)]"
                              }`}
                            >
                              {letter}
                            </span>
                            <div className="flex-1 min-w-0 pt-0.5">
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
                            ? "bg-[var(--accent-blue)] text-white hover:opacity-90 shadow-sm cursor-pointer"
                            : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-main)] opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <span>Javobni Tekshirish</span>
                        <ArrowRight size={14} />
                      </button>
                    ) : (
                      /* Post-Submission Detailed Explanation Drawer */
                      <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)] flex items-center gap-2">
                          <BookOpen size={14} />
                          <span>Qadamma-Qadam Yechim & Tahlil</span>
                        </div>

                        <div className="text-xs md:text-sm text-[var(--text-main)] leading-relaxed space-y-2">
                          <KaTeXMath mathText={q.explanation_uz} />
                        </div>

                        {q.satTrap && (
                          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                            <AlertTriangle size={15} className="shrink-0 text-amber-400 mt-0.5" />
                            <div>
                              <strong>SAT Tuzog'i (Trap):</strong> {q.satTrap}
                            </div>
                          </div>
                        )}

                        {q.desmosTrick && (
                          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-2.5 text-xs text-cyan-200">
                            <Zap size={15} className="shrink-0 text-cyan-400 mt-0.5" />
                            <div>
                              <strong>Desmos SpeedHack:</strong> {q.desmosTrick}
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
            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)]">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Zap size={15} />
                <span>800 Ball Oluvchilarning Tezkor Usullari</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)]">
                {unit.title}: SpeedHacks & Shortcutlar
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Ushbu usullar yordamida savollarni standart usuldan 3-5 barobar tezroq yechishingiz mumkin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unit.speedHacks.map((hack, hIdx) => (
                <div
                  key={hIdx}
                  className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-amber-500/40 transition-all space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Hack #{hIdx + 1}
                    </span>
                    <Zap size={16} className="text-amber-400" />
                  </div>
                  <h4 className="text-base font-bold text-[var(--text-main)]">
                    {hack.title}
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[var(--text-muted)] font-bold">Qachon ishlatiladi (Trigger): </span>
                      <KaTeXMath mathText={hack.trigger} />
                    </div>
                    <div>
                      <span className="text-emerald-400 font-bold">Tezkor usul (Shortcut): </span>
                      <KaTeXMath mathText={hack.shortcut} />
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-[11px] font-mono text-cyan-300">
                      Masalan: {hack.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AI COPILOT TUTOR */}
        {activeTab === "ai" && (
          <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-main)]">
                    Vespera SAT AI Repetitor
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Faqat {unit.title} mavzusi bo'yicha maxsus tayyorlangan sun'iy intellekt
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() =>
                  handleSendAiMessage("Ushbu unitning eng muhim 3 ta qoidasini amaliy misol bilan tushuntirib ber")
                }
                className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-purple-500/40 shrink-0 transition-colors"
              >
                💡 Eng muhim 3 ta qoida
              </button>
              <button
                onClick={() =>
                  handleSendAiMessage("Desmos yordamida qanday qilib ushbu mavzuni 30 soniyada yechsa bo'ladi?")
                }
                className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-purple-500/40 shrink-0 transition-colors"
              >
                ⚡ Desmos Speedhack sirlari
              </button>
              <button
                onClick={() =>
                  handleSendAiMessage("Hard Module 2 da eng ko'p qanday chalg'ituvchi tuzoqlar (traps) tushadi?")
                }
                className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-purple-500/40 shrink-0 transition-colors"
              >
                ⚠️ Hard Module 2 tuzoqlari
              </button>
            </div>

            {/* Chat Message Stream */}
            <div className="space-y-4 max-h-[450px] overflow-y-auto p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
              {aiMessages.map((msg, mIdx) => (
                <div
                  key={mIdx}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={14} />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[var(--accent-blue)] text-white rounded-tr-none font-medium"
                        : "bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-main)] rounded-tl-none space-y-2"
                    }`}
                  >
                    <KaTeXMath mathText={msg.text} />
                  </div>
                </div>
              ))}

              {aiLoading && (
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] p-2">
                  <Loader2 size={16} className="animate-spin text-purple-400" />
                  <span>AI Repetitor chuqur tahlil qilmoqda...</span>
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
                placeholder="Savolingizni yozing (masalan: Viyet formulasini Desmos'da qanday tekshiraman?)..."
                className="flex-1 px-4 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs md:text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                disabled={!aiInput.trim() || aiLoading}
                onClick={() => handleSendAiMessage()}
                className="px-5 py-3 rounded-2xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
              >
                <span>Yuborish</span>
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
