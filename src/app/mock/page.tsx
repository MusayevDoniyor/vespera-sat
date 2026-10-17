"use client";

import React, { useEffect, useState, useRef } from "react";
import KaTeXMath from "@/components/KaTeXMath";
import DesmosCalculator from "@/components/DesmosCalculator";
import {
  Clock,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Grid,
  CheckCircle2,
  XCircle,
  Strikethrough,
  RotateCcw,
  Award,
  AlertCircle,
  Eye,
  EyeOff,
  Zap,
  Sparkles,
  BookOpen,
  Coffee,
  ArrowRight,
  BookMarked,
  Layers,
  X,
  Target,
  ShieldCheck,
  Highlighter,
  ChevronDown,
  Info,
  Maximize2,
  Minimize2,
  HelpCircle,
  Check,
  FileText,
  Sun,
  Moon
} from "lucide-react";
import Link from "next/link";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { useTheme } from "@/components/ThemeContext";
import QuestionDiagram from "@/components/QuestionDiagram";
import { BLUEBOOK_EXAMS, BluebookExamForm, BluebookQuestion } from "@/lib/bluebook-tests";

type ExamStage =
  | "lobby"
  | "testing"
  | "section_review"
  | "break"
  | "completed";

export default function BluebookMockPage() {
  const { theme, toggleTheme } = useTheme();
  // Active selected test
  const [selectedExam, setSelectedExam] = useState<BluebookExamForm>(BLUEBOOK_EXAMS[0]);
  const [stage, setStage] = useState<ExamStage>("lobby");
  const [formulaTab, setFormulaTab] = useState<"cb" | "satashkent" | "desmos" | "rw">("cb");

  // Section & Module state
  const [currentSection, setCurrentSection] = useState<"READING_WRITING" | "MATH">("READING_WRITING");
  const [currentModuleNum, setCurrentModuleNum] = useState<1 | 2>(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Active question sets
  const [activeQuestions, setActiveQuestions] = useState<BluebookQuestion[]>([]);
  const [servedQuestions, setServedQuestions] = useState<BluebookQuestion[]>([]);
  const [isHardModule2RW, setIsHardModule2RW] = useState<boolean | null>(null);
  const [isHardModule2Math, setIsHardModule2Math] = useState<boolean | null>(null);
  const [reviewFilter, setReviewFilter] = useState<"all" | "incorrect" | "correct" | "flagged" | "rw" | "math">("all");
  const [expandedReviewQs, setExpandedReviewQs] = useState<Record<string, boolean>>({});

  // User state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [struckOut, setStruckOut] = useState<Record<string, boolean>>({});
  const [highlights, setHighlights] = useState<Record<string, string[]>>({});
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});

  // Tool states
  const [isOptionEliminatorActive, setIsOptionEliminatorActive] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  const [isDesmosOpen, setIsDesmosOpen] = useState(false);
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [showFiveMinAlert, setShowFiveMinAlert] = useState(false);
  const [hasShownFiveMinAlert, setHasShownFiveMinAlert] = useState(false);

  // Scroll lock on open modals
  useBodyScrollLock(showFormulaSheet || showDirections || showLeaveConfirmation || showFiveMinAlert);

  // Timer states
  const [timeLeft, setTimeLeft] = useState(32 * 60);
  const [showTimer, setShowTimer] = useState(true);
  const [breakTimeLeft, setBreakTimeLeft] = useState(10 * 60);

  // Review Drawer filter
  const [gridFilter, setGridFilter] = useState<"all" | "unanswered" | "flagged">("all");

  // Final Results
  const [scoreResult, setScoreResult] = useState<{
    totalScore: number;
    rwScore: number;
    mathScore: number;
    rwCorrect: number;
    mathCorrect: number;
    totalCorrect: number;
    totalQuestions: number;
    percentile: number;
    rwTier: string;
    mathTier: string;
  } | null>(null);

  const currentQ = activeQuestions[currentIndex];

  // Helper to format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Timer countdown
  useEffect(() => {
    if (stage !== "testing" && stage !== "section_review") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        // Trigger 5-minute warning alert once
        if (prev === 300 && !hasShownFiveMinAlert) {
          setShowTimer(true);
          setShowFiveMinAlert(true);
          setHasShownFiveMinAlert(true);
        }
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stage, hasShownFiveMinAlert]);

  // Break timer countdown
  useEffect(() => {
    if (stage !== "break") return;
    const interval = setInterval(() => {
      setBreakTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          startMathSection();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage !== "testing" || !currentQ) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toUpperCase();
      if (["A", "B", "C", "D"].includes(key) && currentQ.type === "multiple_choice") {
        e.preventDefault();
        handleSelectOption(key);
      } else if (key === "F") {
        e.preventDefault();
        toggleFlag();
      } else if (key === "E") {
        e.preventDefault();
        setIsOptionEliminatorActive((prev) => !prev);
      } else if (e.key === "ArrowRight") {
        if (currentIndex < activeQuestions.length - 1) {
          e.preventDefault();
          setCurrentIndex((prev) => prev + 1);
        } else {
          e.preventDefault();
          setStage("section_review");
        }
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          e.preventDefault();
          setCurrentIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, stage, currentQ, activeQuestions.length]);

  // Start Exam
  const startExam = (exam: BluebookExamForm) => {
    setSelectedExam(exam);
    setCurrentSection("READING_WRITING");
    setCurrentModuleNum(1);
    setActiveQuestions(exam.rwModule1);
    setServedQuestions(exam.rwModule1);
    setCurrentIndex(0);
    setTimeLeft(exam.rwTimingMinutes * 60);
    setShowTimer(true);
    setHasShownFiveMinAlert(false);
    setUserAnswers({});
    setFlagged({});
    setStruckOut({});
    setIsHardModule2RW(null);
    setIsHardModule2Math(null);
    setReviewFilter("all");
    setExpandedReviewQs({});
    setStage("testing");
  };

  const handleSelectOption = (letter: string) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: letter,
    }));
  };

  const handleSPRInput = (val: string) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: val,
    }));
  };

  const toggleFlag = () => {
    if (!currentQ) return;
    setFlagged((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const toggleStrike = (letter: string) => {
    if (!currentQ) return;
    const key = `${currentQ.id}_${letter}`;
    setStruckOut((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Complete Module and Multistage Adaptive Routing
  const handleTimeExpired = () => {
    if (stage === "testing" || stage === "section_review") {
      submitCurrentModule();
    }
  };

  const submitCurrentModule = () => {
    setShowLeaveConfirmation(false);
    setShowQuestionGrid(false);

    if (currentSection === "READING_WRITING" && currentModuleNum === 1) {
      // Evaluate RW Module 1 score for MST routing
      let correctCount = 0;
      selectedExam.rwModule1.forEach((q) => {
        if (userAnswers[q.id]?.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
          correctCount++;
        }
      });

      const accuracy = correctCount / (selectedExam.rwModule1.length || 1);
      const isHard = accuracy >= 0.6; // If >= 60% correct, route to Hard module
      setIsHardModule2RW(isHard);

      const nextQuestions = isHard
        ? selectedExam.rwModule2Hard.length > 0
          ? selectedExam.rwModule2Hard
          : selectedExam.rwModule1
        : selectedExam.rwModule2Easy.length > 0
        ? selectedExam.rwModule2Easy
        : selectedExam.rwModule1;

      setCurrentModuleNum(2);
      setActiveQuestions(nextQuestions);
      setServedQuestions((prev) => [...prev, ...nextQuestions]);
      setCurrentIndex(0);
      setTimeLeft(selectedExam.rwTimingMinutes * 60);
      setHasShownFiveMinAlert(false);
      setStage("testing");
    } else if (currentSection === "READING_WRITING" && currentModuleNum === 2) {
      // Transition to Scheduled Break (10 minutes)
      setBreakTimeLeft(10 * 60);
      setStage("break");
    } else if (currentSection === "MATH" && currentModuleNum === 1) {
      // Evaluate Math Module 1 score for MST routing
      let correctCount = 0;
      selectedExam.mathModule1.forEach((q) => {
        if (userAnswers[q.id]?.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
          correctCount++;
        }
      });

      const accuracy = correctCount / (selectedExam.mathModule1.length || 1);
      const isHard = accuracy >= 0.6;
      setIsHardModule2Math(isHard);

      const nextQuestions = isHard
        ? selectedExam.mathModule2Hard.length > 0
          ? selectedExam.mathModule2Hard
          : selectedExam.mathModule1
        : selectedExam.mathModule2Easy.length > 0
        ? selectedExam.mathModule2Easy
        : selectedExam.mathModule1;

      setCurrentModuleNum(2);
      setActiveQuestions(nextQuestions);
      setServedQuestions((prev) => [...prev, ...nextQuestions]);
      setCurrentIndex(0);
      setTimeLeft(selectedExam.mathTimingMinutes * 60);
      setHasShownFiveMinAlert(false);
      setStage("testing");
    } else if (currentSection === "MATH" && currentModuleNum === 2) {
      // Complete entire exam and compute scaled College Board score
      finalizeExamScore();
    }
  };

  const startMathSection = () => {
    setCurrentSection("MATH");
    setCurrentModuleNum(1);
    setActiveQuestions(selectedExam.mathModule1);
    setServedQuestions((prev) => [...prev, ...selectedExam.mathModule1]);
    setCurrentIndex(0);
    setTimeLeft(selectedExam.mathTimingMinutes * 60);
    setHasShownFiveMinAlert(false);
    setIsHardModule2Math(null);
    setStage("testing");
  };

  const finalizeExamScore = () => {
    let rwCorrect = 0;
    let rwTotal = 0;
    let mathCorrect = 0;
    let mathTotal = 0;

    // Check questions served during this attempt
    const questionsToScore = servedQuestions.length > 0 ? servedQuestions : [
      ...selectedExam.rwModule1,
      ...(isHardModule2RW ? selectedExam.rwModule2Hard : selectedExam.rwModule2Easy),
      ...selectedExam.mathModule1,
      ...(isHardModule2Math ? selectedExam.mathModule2Hard : selectedExam.mathModule2Easy),
    ];

    questionsToScore.forEach((q) => {
      const userAns = userAnswers[q.id]?.trim().toUpperCase();
      const isCorrect = userAns && userAns === q.correctAnswer.trim().toUpperCase();
      if (q.section === "READING_WRITING") {
        rwTotal++;
        if (isCorrect) rwCorrect++;
      } else {
        mathTotal++;
        if (isCorrect) mathCorrect++;
      }
    });

    const rwRatio = rwTotal > 0 ? rwCorrect / rwTotal : 0.75;
    const mathRatio = mathTotal > 0 ? mathCorrect / mathTotal : 0.8;

    // College Board scaled scoring: 200 - 800 with 10 pt steps
    const rwScore = Math.round((200 + rwRatio * 600) / 10) * 10;
    const mathScore = Math.round((200 + mathRatio * 600) / 10) * 10;
    const totalScore = rwScore + mathScore;

    // Estimate percentile
    let percentile = 50;
    if (totalScore >= 1550) percentile = 99;
    else if (totalScore >= 1500) percentile = 98;
    else if (totalScore >= 1400) percentile = 93;
    else if (totalScore >= 1300) percentile = 86;
    else if (totalScore >= 1200) percentile = 74;
    else if (totalScore >= 1100) percentile = 60;
    else percentile = Math.max(20, Math.round((totalScore - 400) / 12));

    const result = {
      totalScore,
      rwScore,
      mathScore,
      rwCorrect,
      mathCorrect,
      totalCorrect: rwCorrect + mathCorrect,
      totalQuestions: rwTotal + mathTotal || 1,
      percentile,
      rwTier: isHardModule2RW ? "Adaptive Tier 2 (Hard - 700-800 Capable)" : "Adaptive Tier 2 (Standard)",
      mathTier: isHardModule2Math ? "Adaptive Tier 2 (Hard - 750-800 Capable)" : "Adaptive Tier 2 (Standard)",
    };

    setScoreResult(result);
    setStage("completed");

    // Persist attempt to database
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: selectedExam.title,
        section: "FULL",
        score: totalScore,
        mathScore,
        readingScore: rwScore,
        totalQuestions: result.totalQuestions,
        correctCount: result.totalCorrect,
        timeSpent: (selectedExam.rwTimingMinutes + selectedExam.mathTimingMinutes) * 60 - timeLeft,
      }),
    }).catch(() => {});
  };

  // =========================================================================
  // RENDER: LOBBY (Test Selector)
  // =========================================================================
  if (stage === "lobby") {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center justify-center p-4 md:p-8 transition-colors">
        <div className="w-full max-w-5xl space-y-8">
          {/* Top navigation / theme toggle */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Link>
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)] transition-colors shadow-sm flex items-center gap-2 text-xs font-medium"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={15} className="text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="text-indigo-600" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 text-[var(--accent-blue)] text-xs font-semibold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-blue)]" />
              1:1 Official College Board Bluebook Ecosystem
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--text-main)]">
              Digital SAT Bluebook Simulator
            </h1>
            <p className="text-sm md:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
              Haqiqiy Bluebook interfeysi, rasmiy College Board va SAT Tashkent testlari, 2-bosqichli adaptiv Multistage Testing (MST) marshrutlash tizimi va Desmos integratsiyasi.
            </p>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLUEBOOK_EXAMS.map((exam) => (
              <div
                key={exam.id}
                onClick={() => setSelectedExam(exam)}
                className={`relative rounded-2xl p-6 cursor-pointer border transition-all duration-200 flex flex-col justify-between ${
                  selectedExam.id === exam.id
                    ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] shadow-xl shadow-[var(--accent-blue)]/10 ring-2 ring-[var(--accent-blue)]/30"
                    : "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-[var(--accent-blue)]/40 hover:bg-[var(--bg-surface)] shadow-sm"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] border border-[var(--accent-blue)]/30">
                      {exam.badge}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      {exam.formCode}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--accent-blue)]">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
                      {exam.descriptionUz}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-main)] text-xs text-[var(--text-secondary)]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                      <span>{exam.rwTimingMinutes + exam.mathTimingMinutes} daqiqa</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                      <span>4 Adaptiv Modul</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startExam(exam);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 active:scale-95"
                  >
                    <span>Imtihonni Boshlash</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Guidelines */}
          <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] shadow-sm">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <span>
                <strong>Official Bluebook Rules:</strong> A Section Review screen appears before ending each module. Once submitted, modules cannot be revisited. A scheduled 10-minute break occurs between Section 1 and Section 2.
              </span>
            </div>
            <Link
              href="/"
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition whitespace-nowrap underline underline-offset-4"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: 10-MINUTE BREAK SCREEN
  // =========================================================================
  if (stage === "break") {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center justify-center p-6 text-center transition-colors">
        <div className="w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl p-8 md:p-12 space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500">
            <Coffee className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-main)]">
              Official 10-Minute Break
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Section 1 (Reading and Writing) is complete. Take a short rest, stretch, hydrate, and prepare for the Math section.
            </p>
          </div>

          <div className="py-4">
            <div className="text-6xl md:text-7xl font-mono font-bold tracking-tight text-amber-500">
              {formatTime(breakTimeLeft)}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">Break Time Remaining</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[var(--border-main)]">
            <button
              onClick={startMathSection}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 transition flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Resume Testing: Begin Math Section</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-[var(--text-muted)]">
              The Math section consists of 2 adaptive 35-minute modules with an embedded Desmos graphing calculator.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: MODULE REVIEW SCREEN (College Board Authentic)
  // =========================================================================
  if (stage === "section_review") {
    const answeredCount = activeQuestions.filter((q) => !!userAnswers[q.id]).length;
    const unansweredCount = activeQuestions.length - answeredCount;
    const flaggedCount = activeQuestions.filter((q) => !!flagged[q.id]).length;

    const filteredQuestions = activeQuestions.filter((q) => {
      if (gridFilter === "unanswered") return !userAnswers[q.id];
      if (gridFilter === "flagged") return !!flagged[q.id];
      return true;
    });

    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col transition-colors">
        {/* Top bar */}
        <header className="h-16 border-b border-[var(--border-main)] bg-[var(--bg-card)]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="text-base font-bold text-[var(--text-main)]">
              {currentSection === "READING_WRITING" ? "Section 1: Reading and Writing" : "Section 2: Math"} - Module {currentModuleNum} Review
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Review your questions below. Click on any question to view or modify your response.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-[var(--text-muted)] block">Time Remaining</span>
              <span className="text-sm font-mono font-bold text-[var(--accent-blue)]">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={() => setShowLeaveConfirmation(true)}
              className="py-2 px-5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition flex items-center gap-2"
            >
              <span>Submit & End Module</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-6">
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setGridFilter("all")}
              className={`p-4 rounded-2xl border text-left transition ${
                gridFilter === "all"
                  ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] text-[var(--text-main)]"
                  : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-secondary)]"
              }`}
            >
              <div className="text-2xl font-bold">{activeQuestions.length}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">All Questions</div>
            </button>
            <button
              onClick={() => setGridFilter("unanswered")}
              className={`p-4 rounded-2xl border text-left transition ${
                gridFilter === "unanswered"
                  ? "bg-rose-500/10 border-rose-500 text-[var(--text-main)]"
                  : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-secondary)]"
              }`}
            >
              <div className="text-2xl font-bold text-rose-500">{unansweredCount}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">Unanswered</div>
            </button>
            <button
              onClick={() => setGridFilter("flagged")}
              className={`p-4 rounded-2xl border text-left transition ${
                gridFilter === "flagged"
                  ? "bg-amber-500/10 border-amber-500 text-[var(--text-main)]"
                  : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-secondary)]"
              }`}
            >
              <div className="text-2xl font-bold text-amber-500">{flaggedCount}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">For Review</div>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredQuestions.map((q) => {
              const origIndex = activeQuestions.findIndex((orig) => orig.id === q.id);
              const isAnswered = !!userAnswers[q.id];
              const isFlagged = !!flagged[q.id];

              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(origIndex);
                    setStage("testing");
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between h-24 hover:scale-[1.02] shadow-sm ${
                    isAnswered
                      ? "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-[var(--accent-blue)]"
                      : "bg-rose-500/5 border-rose-500/30 hover:border-rose-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--text-main)]">Q {origIndex + 1}</span>
                    {isFlagged && <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />}
                  </div>
                  <div className="text-xs flex items-center justify-between">
                    <span className="text-[var(--text-muted)] truncate max-w-[80px]">{q.domain}</span>
                    <span
                      className={`font-mono font-bold text-xs ${
                        isAnswered ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {isAnswered ? userAnswers[q.id] : "—"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back button */}
          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={() => setStage("testing")}
              className="py-2.5 px-6 rounded-xl border border-[var(--border-main)] hover:bg-[var(--bg-surface)] text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Return to Questions</span>
            </button>
            <button
              onClick={() => setShowLeaveConfirmation(true)}
              className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <span>Submit & End Module</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </main>

        {/* Confirmation Modal */}
        {showLeaveConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-amber-500">
                <AlertCircle className="w-6 h-6" />
                <h3 className="text-lg font-bold text-[var(--text-main)]">Are you sure you want to end this module?</h3>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Once you submit and end this module, you cannot return to these questions or change your answers.
                {unansweredCount > 0 && (
                  <span className="block mt-2 font-bold text-rose-500">
                    Warning: You still have {unansweredCount} unanswered questions!
                  </span>
                )}
              </p>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-main)]">
                <button
                  onClick={() => setShowLeaveConfirmation(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition"
                >
                  Continue Reviewing
                </button>
                <button
                  onClick={submitCurrentModule}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition"
                >
                  Yes, End Module
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // RENDER: COMPLETED SCORE DASHBOARD
  // =========================================================================
  if (stage === "completed" && scoreResult) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center justify-center p-4 md:p-8 transition-colors">
        <div className="w-full max-w-4xl space-y-8">
          {/* Top Banner */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Exam Completed Successfully
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[var(--text-main)]">
              Your Digital SAT Score Report
            </h1>
            <p className="text-xs md:text-sm text-[var(--text-muted)]">
              {selectedExam.title} ({selectedExam.formCode})
            </p>
          </div>

          {/* Main Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Scaled Score */}
            <div className="md:col-span-1 rounded-3xl bg-gradient-to-b from-[var(--accent-blue)]/15 to-[var(--bg-card)] border border-[var(--accent-blue)]/30 p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-2xl">
              <span className="text-xs uppercase tracking-widest text-[var(--accent-blue)] font-bold mb-2">
                Total Scaled Score
              </span>
              <div className="text-6xl md:text-7xl font-mono font-black text-[var(--text-main)] tracking-tight">
                {scoreResult.totalScore}
              </div>
              <span className="text-xs text-[var(--text-muted)] mt-1">400 — 1600 Scale</span>
              <div className="mt-4 px-3 py-1.5 rounded-full bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] text-xs font-bold">
                Top {100 - scoreResult.percentile}% (Percentile: {scoreResult.percentile}th)
              </div>
            </div>

            {/* Section Scores */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Reading & Writing */}
              <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] p-6 flex flex-col justify-between shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-[var(--text-muted)]">Section 1</span>
                  <h3 className="text-base font-bold text-[var(--text-main)]">Reading & Writing</h3>
                  <div className="text-4xl font-mono font-black text-[var(--accent-blue)] mt-2">
                    {scoreResult.rwScore}
                    <span className="text-xs text-[var(--text-muted)] font-sans font-normal ml-1">/ 800</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-[var(--border-main)] space-y-1 text-xs text-[var(--text-muted)]">
                  <div className="flex justify-between">
                    <span>Correct Answers:</span>
                    <span className="font-bold text-emerald-500">{scoreResult.rwCorrect}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Tier:</span>
                    <span className="font-bold text-[var(--accent-blue)]">{scoreResult.rwTier}</span>
                  </div>
                </div>
              </div>

              {/* Math */}
              <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] p-6 flex flex-col justify-between shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-[var(--text-muted)]">Section 2</span>
                  <h3 className="text-base font-bold text-[var(--text-main)]">Math (Calculator Allowed)</h3>
                  <div className="text-4xl font-mono font-black text-emerald-500 mt-2">
                    {scoreResult.mathScore}
                    <span className="text-xs text-[var(--text-muted)] font-sans font-normal ml-1">/ 800</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-[var(--border-main)] space-y-1 text-xs text-[var(--text-muted)]">
                  <div className="flex justify-between">
                    <span>Correct Answers:</span>
                    <span className="font-bold text-emerald-500">{scoreResult.mathCorrect}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Tier:</span>
                    <span className="font-bold text-emerald-500">{scoreResult.mathTier}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setStage("lobby")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Select Another Exam</span>
            </button>
            <Link
              href="/curriculum"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-[var(--accent-blue)]" />
              <span>Deep-Dive in Curriculum</span>
            </Link>
          </div>

          {/* ================= DETAILED QUESTION-BY-QUESTION REVIEW PANEL ================= */}
          <div className="pt-8 border-t border-[var(--border-main)] space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[var(--text-main)] flex items-center gap-2">
                  <Award className="w-6 h-6 text-[var(--accent-blue)]" />
                  <span>Exam Question Analysis & Diagnostics</span>
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Detailed review of every question, your response, correct keys, and AI Copilot explanations
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {[
                  { id: "all", label: `All (${servedQuestions.length})` },
                  {
                    id: "incorrect",
                    label: `Incorrect (${
                      servedQuestions.filter((q) => {
                        const ans = userAnswers[q.id]?.trim().toUpperCase();
                        return !ans || ans !== q.correctAnswer.trim().toUpperCase();
                      }).length
                    })`,
                    highlight: "rose",
                  },
                  {
                    id: "correct",
                    label: `Correct (${
                      servedQuestions.filter((q) => {
                        const ans = userAnswers[q.id]?.trim().toUpperCase();
                        return ans === q.correctAnswer.trim().toUpperCase();
                      }).length
                    })`,
                    highlight: "emerald",
                  },
                  {
                    id: "flagged",
                    label: `Flagged (${
                      servedQuestions.filter((q) => flagged[q.id]).length
                    })`,
                  },
                  { id: "rw", label: "Reading & Writing" },
                  { id: "math", label: "Math" },
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
                        : "bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {servedQuestions
                .filter((q) => {
                  const userAns = userAnswers[q.id]?.trim().toUpperCase();
                  const isCorrect = userAns && userAns === q.correctAnswer.trim().toUpperCase();
                  if (reviewFilter === "incorrect") return !isCorrect;
                  if (reviewFilter === "correct") return isCorrect;
                  if (reviewFilter === "flagged") return flagged[q.id];
                  if (reviewFilter === "rw") return q.section === "READING_WRITING";
                  if (reviewFilter === "math") return q.section === "MATH";
                  return true;
                })
                .map((q, qIndex) => {
                  const userAns = userAnswers[q.id]?.trim().toUpperCase();
                  const isCorrect = userAns && userAns === q.correctAnswer.trim().toUpperCase();
                  const isAnswered = Boolean(userAns);
                  const isExpanded = expandedReviewQs[q.id] ?? (!isCorrect);

                  return (
                    <div
                      key={q.id}
                      className={`p-5 md:p-6 rounded-2xl bg-[var(--bg-card)] border transition-all shadow-sm ${
                        !isCorrect
                          ? "border-rose-500/30 hover:border-rose-500/60"
                          : "border-[var(--border-main)] hover:border-[var(--accent-blue)]/40"
                      }`}
                    >
                      {/* Question Header */}
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
                        </div>

                        {/* Status Badge */}
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
                        </div>
                      </div>

                      {/* Reading Passage if present */}
                      {q.passage && (
                        <div className="mt-4 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs md:text-sm text-[var(--text-secondary)] font-serif leading-relaxed max-h-56 overflow-y-auto">
                          {q.passage}
                        </div>
                      )}

                      {/* Question Prompt */}
                      <div className="mt-4 text-xs md:text-sm text-[var(--text-main)] font-medium leading-relaxed">
                        <KaTeXMath content={q.prompt} />
                      </div>

                      {/* Geometric SVG Diagram if present */}
                      <div className="mt-3">
                        <QuestionDiagram preset={q.diagramPreset} prompt={q.prompt} />
                      </div>

                      {/* Multiple Choice Options */}
                      {q.type === "multiple_choice" && q.options && (
                        <div className="mt-4 grid grid-cols-1 gap-2">
                          {Object.entries(q.options).map(([letter, text]) => {
                            const isThisCorrect = letter === q.correctAnswer;
                            const isThisUserChoice = letter === userAns;
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
                                  <span><KaTeXMath content={text} /></span>
                                </div>

                                {isThisCorrect && (
                                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-500/15">
                                    Correct Key
                                  </span>
                                )}
                                {isUserWrongHere && (
                                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 font-mono px-2 py-0.5 rounded bg-rose-500/15">
                                    Your Choice (Incorrect)
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* SPR Fill in the blank display */}
                      {q.type === "spr" && (
                        <div className="mt-4 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-center justify-between text-xs font-mono">
                          <span className="text-[var(--text-muted)]">
                            Your response: <strong className={isCorrect ? "text-emerald-500" : "text-rose-500"}>{userAns || "Omitted"}</strong>
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            Correct Value: {q.correctAnswer}
                          </span>
                        </div>
                      )}

                      {/* Footer Actions: AI Mentor Button & Explanation Toggle */}
                      <div className="mt-4 pt-3 border-t border-[var(--border-main)] flex flex-wrap items-center justify-between gap-3">
                        <button
                          onClick={() => {
                            setExpandedReviewQs((prev) => ({
                              ...prev,
                              [q.id]: !prev[q.id],
                            }));
                          }}
                          className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-1.5 transition"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{isExpanded ? "Hide Explanation" : "View Explanation"}</span>
                        </button>

                        {/* AI Mentor Button */}
                        <button
                          onClick={() => {
                            window.dispatchEvent(
                              new CustomEvent("vespera_open_copilot", {
                                detail: {
                                  question: q.prompt,
                                  domain: q.domain,
                                  userChoice: userAns || null,
                                  correctChoice: q.correctAnswer,
                                  options: q.options,
                                  explanationUz: q.explanationUz,
                                  explanationEn: q.explanationEn,
                                  desmosTrick: q.desmosTrick,
                                },
                              })
                            );
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold flex items-center gap-1.5 transition border border-purple-500/20 active:scale-95 shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          <span>💡 AI Copilot Breakdown (Why wrong?)</span>
                        </button>
                      </div>

                      {/* Expandable Explanation Body */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-[var(--border-main)] space-y-3 text-xs leading-relaxed animate-in fade-in duration-200">
                          {q.explanationUz && (
                            <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                              <span className="font-bold text-[var(--text-main)] block mb-1">
                                🇺🇿 Rasmiy Tushuntirish (O'zbekcha):
                              </span>
                              <div className="text-[var(--text-secondary)]">
                                <KaTeXMath content={q.explanationUz} />
                              </div>
                            </div>
                          )}

                          {q.explanationEn && (
                            <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                              <span className="font-bold text-[var(--text-main)] block mb-1">
                                🇺🇸 Official College Board Explanation (English):
                              </span>
                              <div className="text-[var(--text-secondary)]">
                                <KaTeXMath content={q.explanationEn} />
                              </div>
                            </div>
                          )}

                          {q.desmosTrick && (
                            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300">
                              <span className="font-bold block mb-1 flex items-center gap-1.5">
                                <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                Desmos 10-Second Shortcut / Speedhack:
                              </span>
                              <p className="font-mono text-[11px] leading-relaxed">
                                {q.desmosTrick}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: LIVE BLUEBOOK TESTING APPLICATION (1:1 College Board Layout)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col select-none transition-colors">
      {/* ================= TOP BAR (College Board Bluebook Header) ================= */}
      <header className="h-14 border-b border-[var(--border-main)] bg-[var(--bg-card)]/95 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
        {/* Left: Section & Module info + Directions toggle */}
        <div className="flex items-center gap-3">
          <div className="text-xs md:text-sm font-bold text-[var(--text-main)] tracking-wide">
            {currentSection === "READING_WRITING" ? "Section 1: Reading and Writing" : "Section 2: Math"}
            <span className="text-[var(--text-muted)] font-normal ml-1.5 hidden sm:inline">
              Module {currentModuleNum}
            </span>
          </div>
          <button
            onClick={() => setShowDirections((prev) => !prev)}
            className="flex items-center gap-1 text-xs text-[var(--accent-blue)] hover:text-blue-600 font-semibold px-2 py-1 rounded hover:bg-[var(--bg-surface)] transition"
          >
            <span>Directions</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Countdown Timer */}
        <div className="flex items-center gap-2">
          {showTimer ? (
            <div
              className={`flex items-center gap-1.5 font-mono text-sm md:text-base font-bold px-3 py-1 rounded-md border ${
                timeLeft <= 300
                  ? "bg-rose-500/15 border-rose-500 text-rose-500 animate-pulse"
                  : "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-main)]"
              }`}
            >
              <Clock className="w-4 h-4 text-[var(--text-muted)]" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          ) : (
            <div className="p-1 text-[var(--text-muted)]">
              <Clock className="w-4 h-4" />
            </div>
          )}
          <button
            onClick={() => setShowTimer((prev) => !prev)}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] px-2 py-1 rounded hover:bg-[var(--bg-surface)] transition font-medium"
          >
            {showTimer ? "Hide" : "Show"}
          </button>
        </div>

        {/* Right: Testing Tools */}
        <div className="flex items-center gap-1.5 md:gap-3">
          {/* Option Eliminator Toggle */}
          {currentQ?.type === "multiple_choice" && (
            <button
              onClick={() => setIsOptionEliminatorActive((prev) => !prev)}
              title="Option Eliminator (Strikethrough)"
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                isOptionEliminatorActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
              }`}
            >
              <Strikethrough className="w-4 h-4" />
              <span className="hidden md:inline">ABC</span>
            </button>
          )}

          {/* Formula Reference Sheet (Math or general) */}
          <button
            onClick={() => setShowFormulaSheet(true)}
            title="Formula & Invariants Reference Sheet"
            className="p-2 rounded-lg text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-emerald-500" />
            <span className="hidden md:inline">Reference</span>
          </button>

          {/* Desmos Graphing Calculator */}
          <button
            onClick={() => setIsDesmosOpen((prev) => !prev)}
            title="Open Desmos Graphing Calculator"
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              isDesmosOpen
                ? "bg-emerald-600 text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-500" />
            <span className="hidden md:inline">Desmos</span>
          </button>

          {/* AI Mentor Copilot */}
          <button
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("vespera_open_copilot", {
                  detail: {
                    question: currentQ?.prompt,
                    domain: currentQ?.domain,
                    userChoice: currentQ ? userAnswers[currentQ.id] : null,
                    correctChoice: currentQ?.correctAnswer,
                    options: currentQ?.options,
                    explanationUz: currentQ?.explanationUz,
                    explanationEn: currentQ?.explanationEn,
                    desmosTrick: currentQ?.desmosTrick,
                  },
                })
              );
            }}
            title="Ask AI Mentor for instant intuition, Desmos trick, or trap analysis"
            className="p-2 rounded-lg text-xs font-semibold text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[var(--accent-blue)]" />
            <span className="hidden md:inline">AI Mentor</span>
          </button>

          {/* Invert / Contrast Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "High-Contrast Light Mode" : "Dark Accommodation Mode"}
            className="p-2 rounded-lg text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition flex items-center gap-1.5"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
        </div>
      </header>

      {/* ================= WORKSPACE (Reading 2-Column or Math 1-Column) ================= */}
      <main className="flex-1 flex overflow-hidden">
        {currentQ ? (
          currentQ.section === "READING_WRITING" ? (
            /* 2-COLUMN SPLIT FOR READING AND WRITING */
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border-main)] overflow-y-auto">
              {/* Left Column: Passage / Stimulus */}
              <div className="p-6 md:p-10 overflow-y-auto overscroll-contain max-h-[calc(100vh-7rem)] text-[var(--text-main)] leading-relaxed text-sm md:text-base font-serif">
                {currentQ.passage ? (
                  <div className="space-y-4 whitespace-pre-line selection:bg-yellow-400/30">
                    {currentQ.passage}
                  </div>
                ) : (
                  <div className="text-[var(--text-muted)] italic">No passage required for this question.</div>
                )}
              </div>

              {/* Right Column: Stem & Multiple Choice Options */}
              <div className="p-6 md:p-10 overflow-y-auto overscroll-contain max-h-[calc(100vh-7rem)] flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  {/* Question header + Bookmark */}
                  <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
                    <span className="font-mono font-bold text-xs uppercase tracking-wider text-[var(--text-muted)]">
                      Question {currentIndex + 1} of {activeQuestions.length}
                    </span>
                    <button
                      onClick={toggleFlag}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded transition ${
                        flagged[currentQ.id]
                          ? "bg-amber-500/20 text-amber-500 border border-amber-500/40"
                          : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
                      }`}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${flagged[currentQ.id] ? "fill-amber-500 text-amber-500" : ""}`}
                      />
                      <span>Mark for Review</span>
                    </button>
                  </div>

                  {/* Visual Reference Figure if available */}
                  {(currentQ.diagramPreset || currentQ.diagramSvg) && (
                    <QuestionDiagram
                      preset={currentQ.diagramPreset}
                      customSvg={currentQ.diagramSvg}
                      prompt={currentQ.prompt}
                      domain={currentQ.domain}
                    />
                  )}

                  {/* Question stem */}
                  <div className="text-sm md:text-base font-medium text-[var(--text-main)] leading-relaxed">
                    <KaTeXMath content={currentQ.prompt} />
                  </div>

                  {/* Options */}
                  <div className="space-y-3 pt-2">
                    {currentQ.options?.map((opt) => {
                      const letter = opt.substring(0, 1);
                      const text = opt.substring(3);
                      const isSelected = userAnswers[currentQ.id] === letter;
                      const isStruck = !!struckOut[`${currentQ.id}_${letter}`];

                      return (
                        <div
                          key={opt}
                          onClick={() => !isStruck && handleSelectOption(letter)}
                          className={`relative group rounded-xl p-3.5 border transition cursor-pointer flex items-start justify-between gap-3 ${
                            isStruck
                              ? "opacity-35 line-through bg-[var(--bg-surface)] border-[var(--border-subtle)]"
                              : isSelected
                              ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] shadow-md ring-2 ring-[var(--accent-blue)]/20"
                              : "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-[var(--accent-blue)]/40 hover:bg-[var(--bg-surface)] shadow-sm"
                          }`}
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition ${
                                isSelected
                                  ? "bg-blue-600 text-white"
                                  : "border border-[var(--border-main)] text-[var(--text-muted)] group-hover:border-[var(--text-secondary)]"
                              }`}
                            >
                              {letter}
                            </span>
                            <span className="text-xs md:text-sm text-[var(--text-main)] mt-0.5 leading-snug">
                              <KaTeXMath content={text} />
                            </span>
                          </div>

                          {/* Strikethrough button */}
                          {isOptionEliminatorActive && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStrike(letter);
                              }}
                              className={`p-1 rounded text-xs transition ${
                                isStruck
                                  ? "text-rose-500 hover:bg-rose-500/10"
                                  : "text-[var(--text-muted)] hover:text-rose-500 hover:bg-[var(--bg-surface)]"
                              }`}
                              title={isStruck ? "Restore option" : "Cross out option"}
                            >
                              <Strikethrough className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* CENTERED LAYOUT FOR MATH WITH SPR GRID-IN & DESMOS */
            <div className="flex-1 flex overflow-y-auto justify-center p-6 md:p-12">
              <div className="w-full max-w-2xl space-y-8">
                {/* Question header + Bookmark */}
                <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
                  <span className="font-mono font-bold text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Question {currentIndex + 1} of {activeQuestions.length} (Math)
                  </span>
                  <button
                    onClick={toggleFlag}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded transition ${
                      flagged[currentQ.id]
                        ? "bg-amber-500/20 text-amber-500 border border-amber-500/40"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
                    }`}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${flagged[currentQ.id] ? "fill-amber-500 text-amber-500" : ""}`}
                    />
                    <span>Mark for Review</span>
                  </button>
                </div>

                {/* Visual Reference Figure if available */}
                <QuestionDiagram
                  preset={currentQ.diagramPreset}
                  customSvg={currentQ.diagramSvg}
                  prompt={currentQ.prompt}
                  domain={currentQ.domain}
                />

                {/* Math Prompt with LaTeX */}
                <div className="text-base md:text-lg text-[var(--text-main)] font-medium leading-relaxed">
                  <KaTeXMath content={currentQ.prompt} />
                </div>

                {/* Multiple Choice OR Student Produced Response (SPR) */}
                {currentQ.type === "spr" ? (
                  <div className="space-y-4 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl p-6">
                    <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      Student-Produced Response (Javobni kiriting):
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={userAnswers[currentQ.id] || ""}
                        onChange={(e) => handleSPRInput(e.target.value)}
                        placeholder="Masalan: 14 yoki 7/2"
                        className="px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-main)] font-mono text-lg font-bold w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {userAnswers[currentQ.id] && (
                        <button
                          onClick={() => handleSPRInput("")}
                          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)]"
                        >
                          Tozalash
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">
                      Raqam, o'nli kasr (masalan: 3.5) yoki oddiy kasr (masalan: 7/2) shaklida kiriting.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentQ.options?.map((opt) => {
                      const letter = opt.substring(0, 1);
                      const text = opt.substring(3);
                      const isSelected = userAnswers[currentQ.id] === letter;
                      const isStruck = !!struckOut[`${currentQ.id}_${letter}`];

                      return (
                        <div
                          key={opt}
                          onClick={() => !isStruck && handleSelectOption(letter)}
                          className={`relative group rounded-xl p-4 border transition cursor-pointer flex items-start justify-between gap-3 ${
                            isStruck
                              ? "opacity-35 line-through bg-[var(--bg-surface)] border-[var(--border-subtle)]"
                              : isSelected
                              ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] shadow-md ring-2 ring-[var(--accent-blue)]/20"
                              : "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-[var(--accent-blue)]/40 hover:bg-[var(--bg-surface)] shadow-sm"
                          }`}
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition ${
                                isSelected
                                  ? "bg-blue-600 text-white"
                                  : "border border-[var(--border-main)] text-[var(--text-muted)] group-hover:border-[var(--text-secondary)]"
                              }`}
                            >
                              {letter}
                            </span>
                            <span className="text-sm text-[var(--text-main)] mt-0.5 leading-snug">
                              <KaTeXMath content={text} />
                            </span>
                          </div>

                          {isOptionEliminatorActive && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStrike(letter);
                              }}
                              className="text-[var(--text-muted)] hover:text-rose-500 p-1"
                            >
                              <Strikethrough className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        ) : null}
      </main>

      {/* ================= BOTTOM BAR (Navigation + Question Grid Drawer) ================= */}
      <footer className="h-16 border-t border-[var(--border-main)] bg-[var(--bg-card)]/95 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky bottom-0 z-30">
        {/* Left: Back */}
        <button
          onClick={() => currentIndex > 0 && setCurrentIndex((prev) => prev - 1)}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
            currentIndex === 0
              ? "opacity-30 cursor-not-allowed text-[var(--text-muted)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Center: Question Grid Button */}
        <button
          onClick={() => setShowQuestionGrid((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-xs font-bold text-[var(--text-main)] transition shadow-sm"
        >
          <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              showQuestionGrid ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Right: Next or Review */}
        {currentIndex < activeQuestions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center gap-1.5"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setStage("section_review")}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition flex items-center gap-1.5"
          >
            <span>Review Section</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </footer>

      {/* ================= QUESTION GRID DRAWER (Bottom Pop-up) ================= */}
      {showQuestionGrid && (
        <div className="fixed inset-x-0 bottom-16 z-40 bg-[var(--bg-card)]/98 border-t border-[var(--border-main)] p-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-6 duration-200">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Question Grid
              </span>
              <button
                onClick={() => setShowQuestionGrid(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-14 gap-2">
              {activeQuestions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!userAnswers[q.id];
                const isFlagged = !!flagged[q.id];

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowQuestionGrid(false);
                    }}
                    className={`relative w-10 h-10 rounded-lg text-xs font-bold transition flex items-center justify-center border ${
                      isCurrent
                        ? "ring-2 ring-[var(--accent-blue)] bg-blue-600 text-white border-blue-500 shadow-md"
                        : isAnswered
                        ? "bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-main)] hover:border-[var(--accent-blue)]"
                        : "border-dashed border-[var(--border-main)] text-[var(--text-muted)] hover:border-[var(--text-secondary)] bg-[var(--bg-card)]"
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-[var(--bg-card)]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-main)] text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-blue-600" />
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[var(--bg-surface)] border border-[var(--border-main)]" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>For Review</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowQuestionGrid(false);
                  setStage("section_review");
                }}
                className="text-[var(--accent-blue)] hover:underline font-bold"
              >
                Open Section Review Screen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: DIRECTIONS ================= */}
      {showDirections && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl p-6 md:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
                <Info className="w-5 h-5 text-[var(--accent-blue)]" />
                Official Section Directions
              </h3>
              <button onClick={() => setShowDirections(false)} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-[var(--text-secondary)] leading-relaxed space-y-3">
              {currentSection === "READING_WRITING" ? (
                <>
                  <p>
                    <strong>Reading and Writing Section:</strong> Divided into 2 modules. You have 32 minutes to answer the questions in each module.
                  </p>
                  <p>
                    Each question features one or more short passages, possibly with an accompanying table or chart. Read each passage and prompt carefully, then choose the best answer from the four choices (A, B, C, D). Each question has exactly one correct answer.
                  </p>
                  <p>
                    <strong>Test Strategy:</strong> There is no penalty for guessing. We strongly recommend selecting an answer for every single question before time runs out.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Math Section:</strong> Divided into 2 adaptive modules. You have 35 minutes to complete each module.
                  </p>
                  <p>
                    An embedded official Desmos graphing calculator is available throughout all math questions. A reference sheet of formulas is accessible at any time from the top toolbar.
                  </p>
                  <p>
                    Approximately 75% of questions are multiple-choice, and 25% are Student-Produced Response (SPR) where you enter the numeric value directly into the grid.
                  </p>
                </>
              )}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowDirections(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white"
              >
                Close Directions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: 5 MINUTES LEFT ALERT ================= */}
      {showFiveMinAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] border border-amber-500/50 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-main)]">5 Minutes Remaining!</h3>
            <p className="text-xs text-[var(--text-muted)]">
              You have 5 minutes remaining in this module. Review any unanswered or flagged questions before time runs out.
            </p>
            <button
              onClick={() => setShowFiveMinAlert(false)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
            >
              Continue Testing
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL: FORMULA & INVARIANTS REFERENCE SHEET ================= */}
      {showFormulaSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl overflow-y-auto max-h-[85vh] overscroll-contain">
            <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-bold text-[var(--text-main)]">
                  Digital SAT Reference Sheet & Formula Vault
                </h3>
              </div>
              <button onClick={() => setShowFormulaSheet(false)} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] overflow-x-auto text-xs">
              <button
                onClick={() => setFormulaTab("cb")}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                  formulaTab === "cb"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                Official Reference (Math)
              </button>
              <button
                onClick={() => setFormulaTab("satashkent")}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                  formulaTab === "satashkent"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                SATashkent Invariants
              </button>
              <button
                onClick={() => setFormulaTab("desmos")}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                  formulaTab === "desmos"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                Desmos Bypass Hacks
              </button>
              <button
                onClick={() => setFormulaTab("rw")}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
                  formulaTab === "rw"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                Reading & Writing Bible
              </button>
            </div>

            {/* Tab 1: College Board Official Reference */}
            {formulaTab === "cb" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--text-main)]">Circle / Aylana</div>
                  <div><KaTeXMath content="\text{Area: } A = \pi r^2" /></div>
                  <div><KaTeXMath content="\text{Circumference: } C = 2\pi r" /></div>
                  <div className="text-[var(--text-muted)] text-[11px]">360° = 2π radians</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--text-main)]">Rectangle / To'rtburchak</div>
                  <div><KaTeXMath content="\text{Area: } A = l \cdot w" /></div>
                  <div><KaTeXMath content="\text{Perimeter: } P = 2l + 2w" /></div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--text-main)]">Triangle / Uchburchak</div>
                  <div><KaTeXMath content="\text{Area: } A = \frac{1}{2}bh" /></div>
                  <div><KaTeXMath content="\text{Pythagorean: } a^2 + b^2 = c^2" /></div>
                  <div className="text-[var(--text-muted)] text-[11px]">Sum of interior angles: 180°</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--text-main)]">Special Right Triangles</div>
                  <div><KaTeXMath content="45^\circ - 45^\circ - 90^\circ: x, x, x\sqrt{2}" /></div>
                  <div><KaTeXMath content="30^\circ - 60^\circ - 90^\circ: x, x\sqrt{3}, 2x" /></div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--text-main)]">Volume Formulas / Hajm</div>
                  <div><KaTeXMath content="\text{Cylinder: } V = \pi r^2 h" /></div>
                  <div><KaTeXMath content="\text{Sphere: } V = \frac{4}{3}\pi r^3" /></div>
                  <div><KaTeXMath content="\text{Cone: } V = \frac{1}{3}\pi r^2 h" /></div>
                  <div><KaTeXMath content="\text{Pyramid: } V = \frac{1}{3}lwh" /></div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--text-main)]">Trigonometric Ratios</div>
                  <div><KaTeXMath content="\sin(\theta) = \frac{\text{Opposite}}{\text{Hypotenuse}}" /></div>
                  <div><KaTeXMath content="\cos(\theta) = \frac{\text{Adjacent}}{\text{Hypotenuse}}" /></div>
                  <div><KaTeXMath content="\tan(\theta) = \frac{\text{Opposite}}{\text{Adjacent}}" /></div>
                  <div><KaTeXMath content="\sin(x) = \cos(90^\circ - x)" /></div>
                </div>
              </div>
            )}

            {/* Tab 2: SATashkent High-Yield Math Invariants */}
            {formulaTab === "satashkent" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--accent-blue)]">3 Essential Quadratic Forms</div>
                  <div><KaTeXMath content="\text{Standard: } y = ax^2 + bx + c \implies (0, c)" /></div>
                  <div><KaTeXMath content="\text{Vertex: } y = a(x - h)^2 + k \implies (h, k)" /></div>
                  <div><KaTeXMath content="\text{Factored: } y = a(x - x_1)(x - x_2) \implies \text{Roots}" /></div>
                  <div className="text-[var(--text-muted)] text-[11px]">Axis of symmetry: <KaTeXMath content="x = -\frac{b}{2a}" /></div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--accent-blue)]">Discriminant & Solutions</div>
                  <div><KaTeXMath content="D = b^2 - 4ac" /></div>
                  <div><KaTeXMath content="D > 0 \implies \text{2 Real Solutions (Two Intersections)}" /></div>
                  <div><KaTeXMath content="D = 0 \implies \text{1 Real Solution (Tangent / Single Root)}" /></div>
                  <div><KaTeXMath content="D < 0 \implies \text{0 Real Solutions (No Intersections)}" /></div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--accent-blue)]">2x2 Linear Systems (Chiziqli Sistemalar)</div>
                  <div><KaTeXMath content="\frac{a_1}{a_2} \ne \frac{b_1}{b_2} \implies \text{1 Solution}" /></div>
                  <div><KaTeXMath content="\frac{a_1}{a_2} = \frac{b_1}{b_2} \ne \frac{c_1}{c_2} \implies \text{No Solution (Parallel Lines)}" /></div>
                  <div><KaTeXMath content="\frac{a_1}{a_2} = \frac{b_1}{b_2} = \frac{c_1}{c_2} \implies \text{Infinitely Many (Coincident Lines)}" /></div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--accent-blue)]">Perpendicular Invariant & Altitude</div>
                  <div><KaTeXMath content="m_1 \cdot m_2 = -1 \implies m_\perp = -\frac{1}{m}" /></div>
                  <div><KaTeXMath content="\text{Altitude to Hypotenuse: } h = \sqrt{c_a \cdot c_b}" /></div>
                  <div><KaTeXMath content="\text{Altitude Formula: } h = \frac{a \cdot b}{c}" /></div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--accent-blue)]">Circle Equation in xy-plane</div>
                  <div><KaTeXMath content="(x - h)^2 + (y - k)^2 = r^2" /></div>
                  <div className="text-[var(--text-muted)] text-[11px]">Center: (h, k), Radius: r. Completing square: add <KaTeXMath content="(\frac{b}{2})^2" />.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
                  <div className="font-bold text-[var(--accent-blue)]">Margin of Error & Box Plots</div>
                  <div><KaTeXMath content="\text{MoE} \propto \frac{1}{\sqrt{n}} \quad (\uparrow n \implies \downarrow \text{MoE})" /></div>
                  <div><KaTeXMath content="\text{IQR} = Q_3 - Q_1, \quad \text{Range} = \text{Max} - \text{Min}" /></div>
                  <div className="text-[var(--text-muted)] text-[11px]">Middle 50% of distribution is enclosed in the box!</div>
                </div>
              </div>
            )}

            {/* Tab 3: Desmos Speedhack Commands */}
            {formulaTab === "desmos" && (
              <div className="space-y-3 text-xs text-[var(--text-secondary)]">
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
                  <div className="font-bold text-emerald-500 font-mono">1. Direct Equation Root Finding</div>
                  <p>
                    Type any one-variable equation directly, e.g., <code className="px-1.5 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-main)] font-mono">4x + 12 = 36</code>. Desmos automatically plots vertical lines at the exact root <code className="font-mono font-bold">x = 6</code>!
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
                  <div className="font-bold text-emerald-500 font-mono">2. Table Regression Shortcut (Table + ~)</div>
                  <p>
                    Add a table (+) and insert coordinates. On the next line, type regression syntax:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 font-mono">
                    <li>Linear: <span className="text-blue-500">y1 ~ mx1 + b</span></li>
                    <li>Quadratic: <span className="text-blue-500">y1 ~ ax1^2 + bx1 + c</span></li>
                    <li>Exponential: <span className="text-blue-500">y1 ~ ab^(x1)</span></li>
                  </ul>
                  <p className="text-[var(--text-muted)] text-[11px]">Parameters calculated instantly with zero manual algebra!</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
                  <div className="font-bold text-emerald-500 font-mono">3. System Intersection Click Shortcut</div>
                  <p>
                    Type both linear/nonlinear equations. Click directly on the intersection point — coordinates <code className="font-mono">(x, y)</code> appear instantly!
                  </p>
                </div>
              </div>
            )}

            {/* Tab 4: Reading & Writing Bible */}
            {formulaTab === "rw" && (
              <div className="space-y-3 text-xs text-[var(--text-secondary)]">
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
                  <div className="font-bold text-indigo-500">1. 3x1 Elimination Tactic (SATashkent Gramilliy)</div>
                  <p>
                    If 3 answer choices share the identical grammatical feature or structural flaw (e.g., 3 are past tense while 1 is present tense, or 3 produce comma splices), the 1 distinct outlier choice has a 95%+ probability of being correct!
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
                  <div className="font-bold text-indigo-500">2. Punctuation Invariants (Semicolon vs Colon)</div>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li><strong>Semicolon (;):</strong> <KaTeXMath content="\text{Independent Clause ; Independent Clause}" /> (Identical to a period in function).</li>
                    <li><strong>Colon (:):</strong> Left side MUST be a complete independent clause! The right side provides an explanation, list, or dramatic elaboration.</li>
                    <li><strong>Comma Splice Trap:</strong> <KaTeXMath content="\text{IC , IC} \quad \text{(ERROR! Requires FANBOYS or semicolon)}" /></li>
                  </ul>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
                  <div className="font-bold text-indigo-500">3. Modifier Placement (Dangling Modifier Trap)</div>
                  <p>
                    For introductory phrases <KaTeXMath content="\text{[Having studied...]}, \text{[Subject]}" />, the exact agent performing the introductory action MUST immediately follow the comma.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
                  <div className="font-bold text-indigo-500">4. Transition Signal Matrix</div>
                  <p>
                    <strong>Addition:</strong> Furthermore, In addition, Moreover. <br />
                    <strong>Contrast:</strong> However, Nevertheless, In contrast, On the other hand. <br />
                    <strong>Cause & Effect:</strong> Consequently, Therefore, As a result, Thus. <br />
                    <strong>Exemplification:</strong> Specifically, For instance, In particular.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end border-t border-[var(--border-main)]">
              <button
                onClick={() => setShowFormulaSheet(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-main)] text-[var(--text-main)] transition"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESMOS FLOATING PANEL ================= */}
      {isDesmosOpen && (
        <div className="fixed right-4 bottom-20 z-50 w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl shadow-2xl p-4 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              Desmos Graphing Calculator
            </span>
            <button onClick={() => setIsDesmosOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="h-80 pt-2">
            <DesmosCalculator onClose={() => setIsDesmosOpen(false)} isFloating={false} />
          </div>
        </div>
      )}
    </div>
  );
}
