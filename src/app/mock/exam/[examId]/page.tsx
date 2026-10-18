"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import KaTeXMath from "@/components/KaTeXMath";
import DesmosCalculator from "@/components/DesmosCalculator";
import QuestionDiagram from "@/components/QuestionDiagram";
import Portal from "@/components/Portal";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { useTheme } from "@/components/ThemeContext";
import {
  BLUEBOOK_EXAMS,
  BluebookExamForm,
  BluebookQuestion,
  getRwDisplayContent,
} from "@/lib/bluebook-tests";
import {
  saveExamSession,
  getExamSession,
  clearExamSession,
  saveAttemptReport,
  computeBluebookScaledScore,
  getDigitalSatPercentile,
  ExamSessionState,
  MockAttemptReport,
} from "@/lib/mock-storage";
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
  AlertCircle,
  Eye,
  EyeOff,
  Zap,
  Sparkles,
  BookOpen,
  Coffee,
  ArrowRight,
  Layers,
  X,
  Target,
  ShieldCheck,
  Highlighter,
  ChevronDown,
  Info,
  Maximize2,
  Minimize2,
  Check,
  FileText,
  Sun,
  Moon,
  ArrowLeft,
} from "lucide-react";

export default function BluebookExamRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const examId = (params?.examId as string) || "bluebook-official-1";

  const { theme, toggleTheme } = useTheme();

  // Find Exam Form
  const exam: BluebookExamForm = useMemo(() => {
    return (
      BLUEBOOK_EXAMS.find((e) => e.id === examId || e.formCode.toLowerCase() === examId.toLowerCase()) ||
      BLUEBOOK_EXAMS[0]
    );
  }, [examId]);

  // Exam Progress State
  const [stage, setStage] = useState<"testing" | "section_review" | "break">("testing");
  const [currentSection, setCurrentSection] = useState<"READING_WRITING" | "MATH">("READING_WRITING");
  const [currentModuleNum, setCurrentModuleNum] = useState<1 | 2>(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Active question set
  const [activeQuestions, setActiveQuestions] = useState<BluebookQuestion[]>([]);
  const [servedQuestions, setServedQuestions] = useState<BluebookQuestion[]>([]);
  const [isHardModule2RW, setIsHardModule2RW] = useState<boolean | null>(null);
  const [isHardModule2Math, setIsHardModule2Math] = useState<boolean | null>(null);

  // User input states
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
  const [formulaTab, setFormulaTab] = useState<"cb" | "satashkent" | "desmos" | "rw">("cb");

  // Timer states
  const [timeLeft, setTimeLeft] = useState(32 * 60);
  const [showTimer, setShowTimer] = useState(true);
  const [breakTimeLeft, setBreakTimeLeft] = useState(10 * 60);
  const examStartTimeRef = useRef<number>(Date.now());
  const [sessionRestoredNotice, setSessionRestoredNotice] = useState(false);

  // Question Grid filter
  const [gridFilter, setGridFilter] = useState<"all" | "unanswered" | "flagged">("all");

  // Lock body scroll when modals open
  useBodyScrollLock(showFormulaSheet || showDirections || showLeaveConfirmation || showFiveMinAlert);

  // Initialize or restore session
  useEffect(() => {
    const saved = getExamSession(exam.id);
    if (saved && saved.servedQuestions && saved.servedQuestions.length > 0) {
      // Restore in-progress session
      setCurrentSection(saved.currentSection);
      setCurrentModuleNum(saved.currentModuleNum);
      setCurrentIndex(saved.currentIndex || 0);
      setUserAnswers(saved.userAnswers || {});
      setFlagged(saved.flagged || {});
      setStruckOut(saved.struckOut || {});
      setHighlights(saved.highlights || {});
      setUserNotes(saved.userNotes || {});
      setTimeLeft(saved.timeLeft || 32 * 60);
      setIsHardModule2RW(saved.isHardModule2RW);
      setIsHardModule2Math(saved.isHardModule2Math);
      setServedQuestions(saved.servedQuestions);
      examStartTimeRef.current = saved.examStartTime || Date.now();

      // Set active module questions
      if (saved.currentSection === "READING_WRITING") {
        if (saved.currentModuleNum === 1) {
          setActiveQuestions(exam.rwModule1);
        } else {
          setActiveQuestions(saved.isHardModule2RW ? exam.rwModule2Hard : exam.rwModule2Easy);
        }
      } else {
        if (saved.currentModuleNum === 1) {
          setActiveQuestions(exam.mathModule1);
        } else {
          setActiveQuestions(saved.isHardModule2Math ? exam.mathModule2Hard : exam.mathModule2Easy);
        }
      }

      setSessionRestoredNotice(true);
      setTimeout(() => setSessionRestoredNotice(false), 5000);
    } else {
      // Start fresh attempt
      const initialQs = exam.rwModule1;
      setActiveQuestions(initialQs);
      setServedQuestions(initialQs);
      setCurrentSection("READING_WRITING");
      setCurrentModuleNum(1);
      setCurrentIndex(0);
      setTimeLeft(exam.rwTimingMinutes * 60);
      examStartTimeRef.current = Date.now();
    }
  }, [exam]);

  // Autosave session on every state change
  useEffect(() => {
    if (stage === "testing" || stage === "section_review") {
      const sessionData: ExamSessionState = {
        examId: exam.id,
        currentSection,
        currentModuleNum,
        currentIndex,
        userAnswers,
        flagged,
        struckOut,
        highlights,
        userNotes,
        timeLeft,
        isHardModule2RW,
        isHardModule2Math,
        servedQuestions,
        examStartTime: examStartTimeRef.current,
        lastUpdated: Date.now(),
      };
      saveExamSession(exam.id, sessionData);
    }
  }, [
    exam.id,
    stage,
    currentSection,
    currentModuleNum,
    currentIndex,
    userAnswers,
    flagged,
    struckOut,
    highlights,
    userNotes,
    timeLeft,
    isHardModule2RW,
    isHardModule2Math,
    servedQuestions,
  ]);

  // Section Timer countdown
  useEffect(() => {
    if (stage !== "testing" && stage !== "section_review") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 300 && !hasShownFiveMinAlert) {
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

  // 10-Minute Break Timer
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

  const handleTimeExpired = () => {
    if (stage === "testing") {
      setStage("section_review");
    } else {
      submitCurrentModule();
    }
  };

  const currentQuestion: BluebookQuestion | undefined = activeQuestions[currentIndex];

  // Answer handler
  const handleSelectAnswer = (choice: string) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: choice,
    }));
  };

  const handleFlagToggle = () => {
    if (!currentQuestion) return;
    setFlagged((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const toggleStrikeOption = (letter: string) => {
    if (!currentQuestion) return;
    const key = `${currentQuestion.id}_${letter}`;
    setStruckOut((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Keyboard navigation (ArrowLeft: Back, ArrowRight / Enter: Next, A-D: Select Option)
  useEffect(() => {
    if (stage !== "testing") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "Enter" && !e.shiftKey) {
        if (currentIndex < activeQuestions.length - 1) {
          e.preventDefault();
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (["a", "b", "c", "d", "A", "B", "C", "D"].includes(e.key)) {
        const letter = e.key.toUpperCase();
        if (currentQuestion && currentQuestion.type === "multiple_choice") {
          handleSelectAnswer(letter);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [stage, activeQuestions.length, currentIndex, currentQuestion]);

  const submitCurrentModule = () => {
    setShowQuestionGrid(false);

    if (currentSection === "READING_WRITING" && currentModuleNum === 1) {
      // Evaluate Module 1 performance for Adaptive Routing
      let m1Correct = 0;
      exam.rwModule1.forEach((q) => {
        const ans = userAnswers[q.id]?.trim().toUpperCase();
        if (ans && ans === q.correctAnswer.trim().toUpperCase()) {
          m1Correct++;
        }
      });

      const ratio = m1Correct / (exam.rwModule1.length || 27);
      const isHard = ratio >= 0.62;
      setIsHardModule2RW(isHard);

      const nextQs = isHard ? exam.rwModule2Hard : exam.rwModule2Easy;
      setActiveQuestions(nextQs);
      setServedQuestions((prev) => [...prev, ...nextQs]);
      setCurrentModuleNum(2);
      setCurrentIndex(0);
      setTimeLeft(exam.rwTimingMinutes * 60);
      setHasShownFiveMinAlert(false);
      setStage("testing");
      return;
    }

    if (currentSection === "READING_WRITING" && currentModuleNum === 2) {
      // Finished Reading & Writing -> Official 10-Minute Break
      setStage("break");
      setBreakTimeLeft(10 * 60);
      return;
    }

    if (currentSection === "MATH" && currentModuleNum === 1) {
      // Evaluate Math Module 1 performance for Adaptive Routing
      let m1Correct = 0;
      exam.mathModule1.forEach((q) => {
        const ans = userAnswers[q.id]?.trim().toUpperCase();
        if (ans && ans === q.correctAnswer.trim().toUpperCase()) {
          m1Correct++;
        }
      });

      const ratio = m1Correct / (exam.mathModule1.length || 22);
      const isHard = ratio >= 0.62;
      setIsHardModule2Math(isHard);

      const nextQs = isHard ? exam.mathModule2Hard : exam.mathModule2Easy;
      setActiveQuestions(nextQs);
      setServedQuestions((prev) => [...prev, ...nextQs]);
      setCurrentModuleNum(2);
      setCurrentIndex(0);
      setTimeLeft(exam.mathTimingMinutes * 60);
      setHasShownFiveMinAlert(false);
      setStage("testing");
      return;
    }

    if (currentSection === "MATH" && currentModuleNum === 2) {
      // Entire 4-Module Digital SAT completed!
      finalizeExamAttempt();
    }
  };

  const startMathSection = () => {
    setCurrentSection("MATH");
    setCurrentModuleNum(1);
    setActiveQuestions(exam.mathModule1);
    setServedQuestions((prev) => [...prev, ...exam.mathModule1]);
    setCurrentIndex(0);
    setTimeLeft(exam.mathTimingMinutes * 60);
    setHasShownFiveMinAlert(false);
    setStage("testing");
  };

  // Finalize attempt, build report, save snapshot, and redirect
  const finalizeExamAttempt = () => {
    let rwM1Correct = 0, rwM1Total = 0;
    let rwM2Correct = 0, rwM2Total = 0;
    let mathM1Correct = 0, mathM1Total = 0;
    let mathM2Correct = 0, mathM2Total = 0;

    const questionsToScore = servedQuestions.length > 0 ? servedQuestions : [
      ...exam.rwModule1,
      ...(isHardModule2RW ? exam.rwModule2Hard : exam.rwModule2Easy),
      ...exam.mathModule1,
      ...(isHardModule2Math ? exam.mathModule2Hard : exam.mathModule2Easy),
    ];

    const domainStats: Record<string, { correct: number; total: number; accuracy: number; section: string }> = {};

    questionsToScore.forEach((q) => {
      const userAns = userAnswers[q.id]?.trim().toUpperCase();
      const isCorrect = userAns && userAns === q.correctAnswer.trim().toUpperCase();

      if (!domainStats[q.domain]) {
        domainStats[q.domain] = { correct: 0, total: 0, accuracy: 0, section: q.section };
      }
      domainStats[q.domain].total++;
      if (isCorrect) domainStats[q.domain].correct++;

      if (q.section === "READING_WRITING") {
        if (q.module === 1) {
          rwM1Total++;
          if (isCorrect) rwM1Correct++;
        } else {
          rwM2Total++;
          if (isCorrect) rwM2Correct++;
        }
      } else {
        if (q.module === 1) {
          mathM1Total++;
          if (isCorrect) mathM1Correct++;
        } else {
          mathM2Total++;
          if (isCorrect) mathM2Correct++;
        }
      }
    });

    Object.keys(domainStats).forEach((d) => {
      domainStats[d].accuracy = Math.round((domainStats[d].correct / (domainStats[d].total || 1)) * 100);
    });

    const isHardRW = isHardModule2RW ?? (rwM1Correct / (rwM1Total || 1) >= 0.62);
    const isHardMath = isHardModule2Math ?? (mathM1Correct / (mathM1Total || 1) >= 0.62);

    const rwScore = computeBluebookScaledScore({
      m1Correct: rwM1Correct,
      m1Total: rwM1Total,
      m2Correct: rwM2Correct,
      m2Total: rwM2Total,
      isHardRoute: isHardRW,
      section: "RW",
    });

    const mathScore = computeBluebookScaledScore({
      m1Correct: mathM1Correct,
      m1Total: mathM1Total,
      m2Correct: mathM2Correct,
      m2Total: mathM2Total,
      isHardRoute: isHardMath,
      section: "MATH",
    });

    const totalScore = rwScore + mathScore;
    const percentile = getDigitalSatPercentile(totalScore);
    const attemptId = "mock_" + Date.now();
    const timeSpent = Math.max(1, Math.round((Date.now() - examStartTimeRef.current) / 1000));

    const report: MockAttemptReport = {
      id: attemptId,
      examId: exam.id,
      title: exam.title,
      formCode: exam.formCode,
      totalScore,
      rwScore,
      mathScore,
      totalCorrect: rwM1Correct + rwM2Correct + mathM1Correct + mathM2Correct,
      totalQuestions: rwM1Total + rwM2Total + mathM1Total + mathM2Total || 98,
      percentile,
      rwTier: isHardRW
        ? "Upper Stage (Hard Module 2 — 800 Capable)"
        : "Lower Stage (Standard Module 2 — 590 Cap)",
      mathTier: isHardMath
        ? "Upper Stage (Hard Module 2 — 800 Capable)"
        : "Lower Stage (Standard Module 2 — 610 Cap)",
      completedAt: new Date().toISOString(),
      timeSpent,
      rwM1: { correct: rwM1Correct, total: rwM1Total, percent: Math.round((rwM1Correct / (rwM1Total || 1)) * 100) },
      rwM2: { correct: rwM2Correct, total: rwM2Total, percent: Math.round((rwM2Correct / (rwM2Total || 1)) * 100), isHard: isHardRW },
      mathM1: { correct: mathM1Correct, total: mathM1Total, percent: Math.round((mathM1Correct / (mathM1Total || 1)) * 100) },
      mathM2: { correct: mathM2Correct, total: mathM2Total, percent: Math.round((mathM2Correct / (mathM2Total || 1)) * 100), isHard: isHardMath },
      domainStats,
      questions: questionsToScore,
      userAnswers,
      flagged,
    };

    // 1. Save Full Attempt Report & update history
    saveAttemptReport(report);

    // 2. Clear in-progress session
    clearExamSession(exam.id);

    // 3. Post to Neon Database
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: exam.title,
        section: "FULL",
        score: totalScore,
        mathScore,
        readingScore: rwScore,
        totalQuestions: report.totalQuestions,
        correctCount: report.totalCorrect,
        timeSpent,
        domainStats,
      }),
    }).catch(() => {});

    // 4. Redirect to permanent dedicated report page
    router.push(`/mock/results/${attemptId}`);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // =========================================================================
  // RENDER: 10-MINUTE SCHEDULED BREAK
  // =========================================================================
  if (stage === "break") {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center justify-center p-6 select-none">
        <div className="max-w-xl w-full text-center space-y-6 p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <Coffee className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-blue)]">
              Official College Board 10-Minute Break
            </span>
            <h2 className="text-3xl font-black tracking-tight text-[var(--text-main)]">
              Reading & Writing Section Completed
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Step away, stretch, drink water. Do not close this window. Your test will automatically resume with Math Module 1 when the timer expires.
            </p>
          </div>

          <div className="py-6 border-y border-[var(--border-main)]">
            <div className="text-5xl sm:text-6xl font-black font-mono text-[var(--accent-amber)]">
              {formatTimer(breakTimeLeft)}
            </div>
            <span className="text-xs text-[var(--text-muted)] font-mono mt-1 block">
              Remaining Break Time
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={startMathSection}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Resume Testing Now (Skip Break)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: MODULE REVIEW DRAWER (End of Module review screen)
  // =========================================================================
  if (stage === "section_review") {
    const totalModuleQs = activeQuestions.length;
    const answeredCount = activeQuestions.filter((q) => Boolean(userAnswers[q.id])).length;
    const unansweredCount = totalModuleQs - answeredCount;

    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col justify-between select-none">
        {/* Header */}
        <header className="h-14 px-6 border-b border-[var(--border-main)] bg-[var(--bg-card)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">
              Section {currentSection === "READING_WRITING" ? "1" : "2"}: {currentSection === "READING_WRITING" ? "Reading and Writing" : "Math"} • Module {currentModuleNum} Review
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)]">
              {formatTimer(timeLeft)}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto w-full p-6 space-y-6 flex-1">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-[var(--text-main)]">
              Check Your Work
            </h2>
            <p className="text-xs text-[var(--text-muted)] max-w-lg mx-auto">
              On test day, you can check your work until time expires for this module. Once you submit this module, you cannot return to these questions.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              {answeredCount} Answered
            </span>
            <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {unansweredCount} Unanswered
            </span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-9 md:grid-cols-11 gap-2.5 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)]">
            {activeQuestions.map((q, idx) => {
              const isAnswered = Boolean(userAnswers[q.id]);
              const isFlag = Boolean(flagged[q.id]);

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setStage("testing");
                  }}
                  className={`relative h-12 rounded-xl flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                    isAnswered
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-[var(--bg-surface)] text-[var(--text-main)] border-[var(--border-main)] hover:border-blue-500"
                  }`}
                >
                  {isFlag && (
                    <Bookmark className="w-3 h-3 text-amber-400 absolute top-1 right-1 fill-current" />
                  )}
                  <span>{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="h-16 px-6 border-t border-[var(--border-main)] bg-[var(--bg-card)] flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setStage("testing");
            }}
            className="px-5 py-2 rounded-xl border border-[var(--border-main)] hover:bg-[var(--bg-surface)] text-xs font-bold"
          >
            Return to Questions
          </button>

          <button
            onClick={submitCurrentModule}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-2"
          >
            <span>
              {currentSection === "MATH" && currentModuleNum === 2 ? "Finish & View Score Report" : "Submit Module"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // RENDER: TESTING INTERFACE (1:1 Official Bluebook Ecosystem)
  // =========================================================================
  const rwDisplay = currentQuestion?.section === "READING_WRITING" ? getRwDisplayContent(currentQuestion) : null;
  const passageToShow = currentQuestion?.passage || rwDisplay?.passage;
  const promptToShow = rwDisplay ? rwDisplay.prompt : currentQuestion?.prompt || "";
  const isFlagged = currentQuestion ? Boolean(flagged[currentQuestion.id]) : false;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col justify-between overflow-hidden select-none">
      {/* Session Restored Floating Banner */}
      {sessionRestoredNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Session Restored: All your answers and timer progress were preserved!</span>
        </div>
      )}

      {/* Bluebook Official Header */}
      <header className="h-14 shrink-0 px-4 sm:px-6 bg-[var(--bg-card)] border-b border-[var(--border-main)] flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLeaveConfirmation(true)}
            className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition font-medium"
            title="Return to lobby (progress is auto-saved)"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Lobby</span>
          </button>

          <div className="h-4 w-px bg-[var(--border-main)]" />

          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm">
              Section {currentSection === "READING_WRITING" ? "1" : "2"}: {currentSection === "READING_WRITING" ? "Reading and Writing" : "Math"}
            </span>
            <button
              onClick={() => setShowDirections(!showDirections)}
              className="text-xs text-[var(--accent-blue)] hover:underline flex items-center gap-1"
            >
              <span>Directions</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Center: Timer */}
        <div className="flex items-center gap-2">
          {showTimer ? (
            <div className="font-mono text-sm sm:text-base font-black px-3 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          ) : (
            <div className="text-xs font-mono text-[var(--text-muted)] px-3 py-1">Timer Hidden</div>
          )}
          <button
            onClick={() => setShowTimer(!showTimer)}
            className="text-[11px] font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] px-2 py-1 rounded-md"
          >
            {showTimer ? "Hide" : "Show"}
          </button>
        </div>

        {/* Right Tools: Option Eliminator, Desmos, Formula Sheet, Theme */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Option Eliminator */}
          <button
            onClick={() => setIsOptionEliminatorActive(!isOptionEliminatorActive)}
            className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              isOptionEliminatorActive
                ? "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] shadow-sm"
                : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border-[var(--border-main)]"
            }`}
            title="Option Eliminator (Strikethrough choices)"
          >
            <Strikethrough className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Eliminate</span>
          </button>

          {/* Math Tools */}
          {currentSection === "MATH" && (
            <>
              <button
                onClick={() => setShowFormulaSheet(true)}
                className="p-2 rounded-xl text-xs font-bold bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition flex items-center gap-1.5"
                title="Reference Sheet"
              >
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                <span className="hidden md:inline">Reference</span>
              </button>

              <button
                onClick={() => setIsDesmosOpen(!isDesmosOpen)}
                className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                  isDesmosOpen
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border-[var(--border-main)]"
                }`}
                title="Desmos Graphing Calculator"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Desmos</span>
              </button>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition"
            title="Toggle Dark/Light Mode"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* Main Testing View */}
      <main className="flex-1 min-h-0 w-full flex overflow-hidden relative">
        {currentQuestion && (
          <div className="w-full h-full flex flex-col md:flex-row overflow-hidden">
            {/* Left: Reading Passage (split 50/50 for RW, or full prompt for Math) */}
            {passageToShow && (
              <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-[var(--border-main)] overflow-y-auto leading-relaxed text-sm md:text-base font-serif text-[var(--text-secondary)] whitespace-pre-line bg-[var(--bg-surface)]/30">
                <div className="max-w-xl mx-auto break-words leading-relaxed">
                  {passageToShow}
                </div>
              </div>
            )}

            {/* Right: Question Stem, Options, and Tools */}
            <div className={`w-full ${passageToShow ? "md:w-1/2 h-1/2 md:h-full" : "max-w-3xl mx-auto h-full"} p-6 md:p-8 lg:p-10 overflow-y-auto space-y-6 flex flex-col justify-between`}>
              <div className="space-y-6 max-w-xl mx-auto w-full">
                {/* Question Info Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)] gap-2">
                  <button
                    onClick={() => setShowQuestionGrid(true)}
                    className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)] hover:underline flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-[var(--accent-blue)]/10 transition"
                    title="Open full 27 question navigator grid"
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
                    <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Compact Prev / Next buttons in header for immediate access */}
                    <div className="flex items-center gap-0.5 bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-lg p-0.5">
                      <button
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                        className="px-2 py-1 text-xs font-bold disabled:opacity-30 hover:text-[var(--text-main)] text-[var(--text-muted)] transition"
                        title="Previous Question (Left Arrow)"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (currentIndex < activeQuestions.length - 1) {
                            setCurrentIndex((prev) => prev + 1);
                          } else {
                            setStage("section_review");
                          }
                        }}
                        className="px-2 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline transition"
                        title="Next Question (Right Arrow / Enter)"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={handleFlagToggle}
                      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-lg transition ${
                        isFlagged
                          ? "bg-amber-500/15 text-amber-500 font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? "fill-current" : ""}`} />
                      <span className="hidden sm:inline">{isFlagged ? "Marked" : "Mark for Review"}</span>
                    </button>
                  </div>
                </div>

                {/* Geometric Diagram if present */}
                {(currentQuestion.diagramPreset || currentQuestion.diagramSvg) && (
                  <div className="py-2">
                    <QuestionDiagram
                      preset={currentQuestion.diagramPreset}
                      customSvg={currentQuestion.diagramSvg}
                      prompt={promptToShow}
                      domain={currentQuestion.domain}
                    />
                  </div>
                )}

                {/* Prompt Stem */}
                <div className="text-sm sm:text-base font-medium text-[var(--text-main)] leading-relaxed">
                  <KaTeXMath content={promptToShow} />
                </div>

                {/* Multiple Choice Options */}
                {currentQuestion.type === "multiple_choice" && currentQuestion.options && (
                  <div className="space-y-3 pt-2">
                    {currentQuestion.options.map((opt) => {
                      const letter = opt.substring(0, 1).toUpperCase();
                      const cleanText = opt.substring(3).trim();
                      const isSelected = userAnswers[currentQuestion.id] === letter;
                      const isStruck = struckOut[`${currentQuestion.id}_${letter}`];

                      return (
                        <div
                          key={letter}
                          onClick={() => {
                            if (!isStruck) handleSelectAnswer(letter);
                          }}
                          className={`relative p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-600/30 font-semibold"
                              : isStruck
                              ? "bg-[var(--bg-surface)]/50 border-dashed border-[var(--border-main)] opacity-40 line-through text-[var(--text-muted)]"
                              : "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-blue-500 hover:bg-[var(--bg-surface)] text-[var(--text-main)]"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                            <span
                              className={`w-7 h-7 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "bg-white text-blue-600"
                                  : "bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-muted)]"
                              }`}
                            >
                              {letter}
                            </span>
                            <div className="leading-relaxed break-words min-w-0 flex-1">
                              <KaTeXMath content={cleanText} />
                            </div>
                          </div>

                          {isOptionEliminatorActive && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStrikeOption(letter);
                              }}
                              className="px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-rose-500 transition"
                            >
                              {isStruck ? "Restore" : "Strike"}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Student Produced Response (Grid-in) */}
                {currentQuestion.type === "spr" && (
                  <div className="pt-2 space-y-3">
                    <label className="text-xs text-[var(--text-muted)] block">
                      Enter your numeric answer or fraction (e.g., 42, -5/2, 0.75):
                    </label>
                    <input
                      type="text"
                      value={userAnswers[currentQuestion.id] || ""}
                      onChange={(e) => handleSelectAnswer(e.target.value)}
                      placeholder="Type answer..."
                      className="w-full max-w-xs px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-sm font-mono font-bold focus:border-blue-500 outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Embedded Desmos Drawer */}
      {isDesmosOpen && currentSection === "MATH" && (
        <div className="fixed bottom-16 right-4 w-full max-w-lg h-96 z-40 rounded-2xl shadow-2xl border border-[var(--border-main)] bg-[var(--bg-card)] overflow-hidden flex flex-col">
          <div className="h-10 px-4 bg-[var(--bg-surface)] border-b border-[var(--border-main)] flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-2">
              <Calculator className="w-3.5 h-3.5 text-emerald-500" />
              <span>Desmos Graphing Calculator</span>
            </span>
            <button onClick={() => setIsDesmosOpen(false)} className="hover:text-rose-500">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full">
            <DesmosCalculator />
          </div>
        </div>
      )}

      {/* Bluebook Footer Navigation - Permanently Pinned */}
      <footer className="h-16 shrink-0 px-4 sm:px-6 bg-[var(--bg-card)] border-t border-[var(--border-main)] flex items-center justify-between z-30 shadow-lg">
        <div>
          <button
            onClick={() => setShowQuestionGrid(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border-main)] hover:bg-[var(--bg-surface)] text-xs font-bold font-mono transition"
          >
            <Grid className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
            <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
            <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 rounded-xl border border-[var(--border-main)] hover:bg-[var(--bg-surface)] disabled:opacity-30 disabled:pointer-events-none text-xs font-bold transition flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {currentIndex < activeQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setStage("section_review")}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <span>Review Module</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>

      {/* Question Grid Modal */}
      {showQuestionGrid && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
                <h3 className="font-bold text-sm">
                  Section {currentSection === "READING_WRITING" ? "1" : "2"} • Module {currentModuleNum} Questions
                </h3>
                <button onClick={() => setShowQuestionGrid(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-9 gap-2 max-h-72 overflow-y-auto p-1">
                {activeQuestions.map((q, idx) => {
                  const isAnswered = Boolean(userAnswers[q.id]);
                  const isFlag = Boolean(flagged[q.id]);
                  const isCurrent = idx === currentIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowQuestionGrid(false);
                      }}
                      className={`relative h-11 rounded-xl flex items-center justify-center font-mono text-xs font-bold border transition-all ${
                        isCurrent
                          ? "ring-2 ring-blue-500 bg-blue-500 text-white border-blue-500"
                          : isAnswered
                          ? "bg-[var(--bg-surface)] text-[var(--text-main)] border-blue-500/50"
                          : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-main)] hover:border-blue-500"
                      }`}
                    >
                      {isFlag && <Bookmark className="w-3 h-3 text-amber-500 absolute top-1 right-1 fill-current" />}
                      <span>{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Portal>
      )}

      {/* Leave Confirmation Modal */}
      {showLeaveConfirmation && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl max-w-md w-full p-6 space-y-4 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Leave Practice Test?</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Your progress, answers, and remaining time are automatically saved. You can resume this exam right where you left off from the lobby at any time.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowLeaveConfirmation(false)}
                  className="px-5 py-2.5 rounded-xl border border-[var(--border-main)] text-xs font-bold hover:bg-[var(--bg-surface)]"
                >
                  Continue Test
                </button>
                <Link
                  href="/mock"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md"
                >
                  Save & Exit to Lobby
                </Link>
              </div>
            </div>
          </div>
        </Portal>
      )}

      {/* Official Bluebook Directions Modal */}
      {showDirections && (
        <Portal>
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowDirections(false)}
          >
            <div
              className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span>
                    Section {currentSection === "READING_WRITING" ? "1: Reading and Writing" : "2: Math"} Directions
                  </span>
                </h3>
                <button
                  onClick={() => setShowDirections(false)}
                  className="p-1 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-muted)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs sm:text-sm text-[var(--text-secondary)] space-y-3 leading-relaxed">
                {currentSection === "READING_WRITING" ? (
                  <>
                    <p>
                      The questions in this section address a number of important reading and writing skills. Each question includes one or more passages, which may include a table or a graph.
                    </p>
                    <p>
                      Read each passage and question carefully, and then choose the best answer to the question based on the passage(s).
                    </p>
                    <p>
                      All questions in this section are multiple-choice with four answer choices. Each question has a single best answer.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      The questions in this section address a number of important math skills. Use of a calculator is permitted for all questions.
                    </p>
                    <p>
                      Unless a question indicates otherwise, all variables and expressions represent real numbers, and figures provided are drawn to scale.
                    </p>
                    <p>
                      All questions are multiple-choice with four answer choices, or student-produced response (grid-in).
                    </p>
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-[var(--border-main)] flex justify-end">
                <button
                  onClick={() => setShowDirections(false)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm"
                >
                  Close Directions
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}

      {/* Official Math Formula Sheet Modal */}
      {showFormulaSheet && (
        <Portal>
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-hidden"
            onClick={() => setShowFormulaSheet(false)}
          >
            <div
              className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-6 md:p-8 space-y-6 relative text-[var(--text-main)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-4">
                <div>
                  <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                    <BookOpen className="text-amber-500 w-5 h-5" />
                    Official Digital SAT Math Reference Sheet
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Provided by College Board for all Digital SAT Math questions.
                  </p>
                </div>
                <button
                  onClick={() => setShowFormulaSheet(false)}
                  className="p-2 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                  <span className="font-bold text-[var(--accent-blue)] block font-mono text-[11px] uppercase tracking-wide">
                    1. Circle Formulas
                  </span>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Area:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">A = π r²</code>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Circumference:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">C = 2 π r</code>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Arc Length:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">s = r θ</code> (θ in radians)
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Sector Area:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">A = (1/2) r² θ</code>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                  <span className="font-bold text-[var(--accent-blue)] block font-mono text-[11px] uppercase tracking-wide">
                    2. Triangle Geometry & Trigonometry
                  </span>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Area:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">A = (1/2) b h</code>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Pythagorean Theorem:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">a² + b² = c²</code>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Special 30°-60°-90°:</strong> Sides <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">x : x√3 : 2x</code>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Special 45°-45°-90°:</strong> Sides <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">x : x : x√2</code>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                  <span className="font-bold text-[var(--accent-blue)] block font-mono text-[11px] uppercase tracking-wide">
                    3. 3D Solid Volumes
                  </span>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Rectangular Prism:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">V = l w h</code>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Right Cylinder:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">V = π r² h</code>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Sphere:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">V = (4/3) π r³</code>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Cone:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">V = (1/3) π r² h</code>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • <strong>Pyramid:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">V = (1/3) l w h</code>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                  <span className="font-bold text-[var(--accent-blue)] block font-mono text-[11px] uppercase tracking-wide">
                    4. Degree & Radian Invariants
                  </span>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • Degrees in a circle = <strong>360°</strong>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • Radians in a circle = <strong>2π</strong>
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    • Angles in a triangle = <strong>180°</strong>
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border-main)] flex justify-end">
                <button
                  onClick={() => setShowFormulaSheet(false)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm"
                >
                  Close Sheet
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
