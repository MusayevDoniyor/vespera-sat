"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Flame,
  Volume2,
  Star,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  Filter,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Shuffle,
  ChevronRight,
  HelpCircle,
  Award,
  Zap,
  Bookmark,
  TrendingUp,
  BrainCircuit,
  Eye,
  Check,
  X
} from "lucide-react";
import { SAT_650_VOCABULARY, SATVocabWord } from "@/lib/sat-vocab-data";
import {
  loadVocabProgress,
  recordVocabReview,
  toggleVocabStar,
  getVocabStats,
  RecallRating,
  VocabProgressItem,
  VocabStats
} from "@/lib/vocab-storage";

type StudyMode = "flashcards" | "quiz" | "vault";
type TierFilter = "all" | 1 | 2 | 3;
type StatusFilter = "all" | "due" | "learning" | "mastered" | "starred";

export default function VocabStudioPage() {
  const [mode, setMode] = useState<StudyMode>("flashcards");
  const [selectedTier, setSelectedTier] = useState<TierFilter>("all");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Flashcard State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<number, VocabProgressItem>>({});
  const [stats, setStats] = useState<VocabStats>({
    totalWords: 650,
    masteredCount: 0,
    learningCount: 0,
    newCount: 650,
    dueTodayCount: 0,
    starredCount: 0,
    streakDays: 1
  });

  // Quiz State
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // Load progress on mount
  const refreshStats = useCallback(() => {
    const p = loadVocabProgress();
    setProgressMap(p);
    setStats(getVocabStats());
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  // Filtered words pool
  const filteredWords = useMemo(() => {
    return SAT_650_VOCABULARY.filter((w) => {
      // Tier filter
      if (selectedTier !== "all" && w.tier !== selectedTier) return false;

      // Status filter
      const item = progressMap[w.id];
      if (selectedStatus === "mastered" && item?.status !== "mastered") return false;
      if (selectedStatus === "learning" && item?.status !== "learning") return false;
      if (selectedStatus === "starred" && !item?.starred) return false;
      if (selectedStatus === "due") {
        if (!item) return true; // new words count as due
        return new Date(item.nextReviewAt) <= new Date();
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesWord = w.word.toLowerCase().includes(q);
        const matchesUz = w.uzbek.toLowerCase().includes(q);
        const matchesDef = w.definition.toLowerCase().includes(q);
        const matchesSyn = w.synonyms.some((s) => s.toLowerCase().includes(q));
        if (!matchesWord && !matchesUz && !matchesDef && !matchesSyn) return false;
      }

      return true;
    });
  }, [selectedTier, selectedStatus, searchQuery, progressMap]);

  // Current Card
  const currentCard: SATVocabWord | undefined = filteredWords[currentIndex] || filteredWords[0];
  const currentProgress = currentCard ? progressMap[currentCard.id] : undefined;

  // Next / Prev card navigation
  const handleNextCard = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1 < filteredWords.length ? prev + 1 : 0));
  }, [filteredWords.length]);

  const handlePrevCard = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredWords.length - 1));
  }, [filteredWords.length]);

  // SM-2 Review handler
  const handleReview = useCallback(
    (rating: RecallRating) => {
      if (!currentCard) return;
      recordVocabReview(currentCard.id, rating);
      refreshStats();
      handleNextCard();
    },
    [currentCard, handleNextCard, refreshStats]
  );

  // Audio Pronunciation using SpeechSynthesis
  const speakWord = useCallback((word: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (mode !== "flashcards") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in search input
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNextCard();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrevCard();
      } else if (e.key === "1") {
        handleReview("again");
      } else if (e.key === "2") {
        handleReview("hard");
      } else if (e.key === "3") {
        handleReview("good");
      } else if (e.key === "4") {
        handleReview("easy");
      } else if (e.key.toLowerCase() === "p" && currentCard) {
        speakWord(currentCard.word);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, handleNextCard, handlePrevCard, handleReview, currentCard, speakWord]);

  // Star Toggle
  const handleToggleStar = (wordId: number) => {
    toggleVocabStar(wordId);
    refreshStats();
  };

  // Shuffle deck
  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filteredWords.length));
  };

  // Generate dynamic 4-choice quiz question
  const quizPool = useMemo(() => {
    return filteredWords.length >= 4 ? filteredWords : SAT_650_VOCABULARY;
  }, [filteredWords]);

  const currentQuizWord = quizPool[quizQuestionIndex % quizPool.length];

  const quizOptions = useMemo(() => {
    if (!currentQuizWord) return [];
    // pick 3 random distractors from quizPool
    const otherWords = quizPool.filter((w) => w.id !== currentQuizWord.id);
    const shuffled = [...otherWords].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [currentQuizWord, ...shuffled].sort(() => 0.5 - Math.random());
    return options;
  }, [currentQuizWord, quizPool]);

  const handleQuizAnswer = (wordName: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(wordName);
    setIsAnswerSubmitted(true);

    const isCorrect = wordName === currentQuizWord.word;
    if (isCorrect) {
      setQuizScore((prev) => prev + 10);
      setQuizStreak((prev) => prev + 1);
      recordVocabReview(currentQuizWord.id, "good");
    } else {
      setQuizStreak(0);
      recordVocabReview(currentQuizWord.id, "again");
    }
    refreshStats();
  };

  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 🧭 BREADCRUMBS & TOP BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-main)] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/verbal"
            className="p-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-[var(--accent-blue)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition shadow-sm"
            title="Return to Verbal Accelerator"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                Official Digital SAT 2023–2026 Form Recalls
              </span>
              <span className="text-xs text-[var(--text-muted)]">• 650 Real Exam Words</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-0.5 flex items-center gap-2">
              <span>SAT Words in Context Studio</span>
              <span className="text-base sm:text-lg px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-mono font-bold shadow-sm">
                SM-2 Engine
              </span>
            </h1>
          </div>
        </div>

        {/* Learning Streak & Quick Stats */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs shadow-sm font-mono">
            <Flame size={16} className="animate-pulse" />
            <span>{stats.streakDays} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs shadow-sm font-mono">
            <CheckCircle2 size={16} />
            <span>{stats.masteredCount} Mastered</span>
          </div>
        </div>
      </div>

      {/* 📊 MASTERY PROGRESS BAR & HIGHLIGHTS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-1">
          <span className="text-xs text-[var(--text-muted)] font-medium">Total Exam Words</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[var(--text-main)] font-mono">{stats.totalWords}</span>
            <span className="text-[11px] text-purple-600 font-bold">100% CB Forms</span>
          </div>
          <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round((stats.masteredCount / stats.totalWords) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-1">
          <span className="text-xs text-[var(--text-muted)] font-medium">Mastered (Long-Term)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {stats.masteredCount}
            </span>
            <span className="text-[11px] text-[var(--text-muted)] font-mono">
              ({Math.round((stats.masteredCount / stats.totalWords) * 100)}%)
            </span>
          </div>
          <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round((stats.masteredCount / stats.totalWords) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-1">
          <span className="text-xs text-[var(--text-muted)] font-medium">In Learning Phase</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
              {stats.learningCount}
            </span>
            <span className="text-[11px] text-[var(--text-muted)] font-mono">Active Recall</span>
          </div>
          <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round((stats.learningCount / stats.totalWords) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-1">
          <span className="text-xs text-[var(--text-muted)] font-medium">Starred / Bookmarked</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-500 font-mono">{stats.starredCount}</span>
            <span className="text-[11px] text-amber-500 font-bold">Priority Drill</span>
          </div>
          <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((stats.starredCount / 50) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* 🎛 MODE TABS & FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--bg-surface)] w-full md:w-auto">
          <button
            onClick={() => setMode("flashcards")}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === "flashcards"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <BrainCircuit size={14} />
            <span>SM-2 Flashcards</span>
          </button>

          <button
            onClick={() => setMode("quiz")}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === "quiz"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Zap size={14} />
            <span>Speed Quiz (MCQ)</span>
          </button>

          <button
            onClick={() => setMode("vault")}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === "vault"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Layers size={14} />
            <span>Vocab Vault ({filteredWords.length})</span>
          </button>
        </div>

        {/* Tier & Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] shrink-0 pl-1">Tier:</span>
          {(["all", 1, 2, 3] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedTier(t);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap border transition ${
                selectedTier === t
                  ? "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30 font-bold"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-transparent hover:text-[var(--text-main)]"
              }`}
            >
              {t === "all" ? "All Tiers (650)" : t === 1 ? "Tier 1: Core 150" : t === 2 ? "Tier 2: 700+ (250)" : "Tier 3: 800 Elite (250)"}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: SMART FLASHCARDS WITH SM-2 SPACED REPETITION      */}
      {/* ======================================================== */}
      {mode === "flashcards" && (
        <div className="space-y-6">
          {filteredWords.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-3">
              <HelpCircle className="w-12 h-12 text-[var(--text-muted)] mx-auto opacity-50" />
              <h3 className="text-lg font-bold">No words found in this filter</h3>
              <p className="text-xs text-[var(--text-muted)]">
                Try switching the Tier or Status filter to view more words.
              </p>
              <button
                onClick={() => {
                  setSelectedTier("all");
                  setSelectedStatus("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : currentCard ? (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Card Header & Controls */}
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--text-main)]">
                    Card {currentIndex + 1} of {filteredWords.length}
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    {currentCard.partOfSpeech}
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
                    Tier {currentCard.tier}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShuffle}
                    className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-purple-500 text-[var(--text-muted)] hover:text-[var(--text-main)] transition shadow-sm"
                    title="Shuffle deck"
                  >
                    <Shuffle size={14} />
                  </button>
                  <button
                    onClick={() => handleToggleStar(currentCard.id)}
                    className={`p-2 rounded-xl border transition shadow-sm ${
                      currentProgress?.starred
                        ? "bg-amber-500/15 border-amber-500/40 text-amber-500"
                        : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-muted)] hover:text-amber-500"
                    }`}
                    title="Star / Bookmark word"
                  >
                    <Star size={14} className={currentProgress?.starred ? "fill-amber-500" : ""} />
                  </button>
                </div>
              </div>

              {/* 🎴 3D FLIP CARD CONTAINER */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative min-h-[360px] sm:min-h-[400px] w-full rounded-3xl cursor-pointer perspective transition-all duration-300 hover:shadow-xl group"
              >
                <div
                  className={`relative w-full h-full min-h-[360px] sm:min-h-[400px] rounded-3xl p-8 border transition-all duration-500 flex flex-col justify-between ${
                    isFlipped
                      ? "bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-surface)] to-[var(--bg-card)] border-purple-500/40 shadow-lg"
                      : "bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-surface)] border-[var(--border-main)] shadow-md hover:border-purple-500/40"
                  }`}
                >
                  {/* FRONT: Word + Pronunciation + Prompt */}
                  {!isFlipped ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider uppercase font-bold">
                          Digital SAT Vocab • Word #{currentCard.id}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakWord(currentCard.word);
                          }}
                          className="p-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 transition"
                          title="Listen to pronunciation (P)"
                        >
                          <Volume2 size={18} />
                        </button>
                      </div>

                      <div className="my-auto text-center space-y-3 py-6">
                        <h2 className="text-4xl sm:text-5xl font-black text-[var(--text-main)] tracking-tight">
                          {currentCard.word}
                        </h2>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-muted)] font-mono">
                          <span>Part of Speech:</span>
                          <span className="font-bold text-[var(--text-main)]">{currentCard.partOfSpeech}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition font-medium">
                          <RotateCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                          <span>Click to reveal definition & Uzbek meaning (Space)</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    /* BACK: Definition + Uzbek Translation + Synonyms + Context */
                    <div className="space-y-5 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-xl font-black text-purple-600 dark:text-purple-400">
                            {currentCard.word}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakWord(currentCard.word);
                            }}
                            className="p-1.5 rounded-full bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 transition"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                        <span className="text-[11px] font-mono text-[var(--text-muted)]">
                          Card #{currentCard.id}
                        </span>
                      </div>

                      {/* Official English Definition */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[var(--text-muted)]">
                          College Board Definition:
                        </span>
                        <p className="text-sm font-semibold text-[var(--text-main)] leading-relaxed">
                          {currentCard.definition}
                        </p>
                      </div>

                      {/* Uzbek Translation */}
                      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-700 dark:text-purple-300">
                          <span>🇺🇿 O'zbekcha Ma'nosi & Izohi:</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-200 leading-relaxed">
                          {currentCard.uzbek}
                        </p>
                      </div>

                      {/* High-Yield Synonyms */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[var(--text-muted)]">
                          Key SAT Synonyms:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentCard.synonyms.map((s, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-main)] text-[11px] font-medium text-[var(--text-main)] font-mono"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Context Example */}
                      <div className="pt-2 border-t border-[var(--border-main)] text-xs text-[var(--text-muted)] italic leading-relaxed">
                        &ldquo;{currentCard.example}&rdquo;
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 🎯 SM-2 ACTIVE RECALL BUTTONS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono px-1">
                  <span>How well did you know this word?</span>
                  <span>Shortcuts: 1, 2, 3, 4</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => handleReview("again")}
                    className="p-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-bold transition flex flex-col items-center gap-1 shadow-sm active:scale-95"
                  >
                    <span className="text-xs flex items-center gap-1">
                      <X size={13} />
                      <span>Again</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-80">&lt; 1 min</span>
                  </button>

                  <button
                    onClick={() => handleReview("hard")}
                    className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold transition flex flex-col items-center gap-1 shadow-sm active:scale-95"
                  >
                    <span className="text-xs">⚠️ Hard</span>
                    <span className="text-[10px] font-mono opacity-80">1 day</span>
                  </button>

                  <button
                    onClick={() => handleReview("good")}
                    className="p-3 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold transition flex flex-col items-center gap-1 shadow-sm active:scale-95"
                  >
                    <span className="text-xs flex items-center gap-1">
                      <Check size={13} />
                      <span>Good</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-80">3 days</span>
                  </button>

                  <button
                    onClick={() => handleReview("easy")}
                    className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold transition flex flex-col items-center gap-1 shadow-sm active:scale-95"
                  >
                    <span className="text-xs flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      <span>Easy</span>
                    </span>
                    <span className="text-[10px] font-mono opacity-80">7 days</span>
                  </button>
                </div>
              </div>

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevCard}
                  className="px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-purple-500 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <ArrowLeft size={13} />
                  <span>Previous</span>
                </button>

                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Use <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)]">Space</kbd> to flip,{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)]">&larr;</kbd>{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)]">&rarr;</kbd> to navigate
                </div>

                <button
                  onClick={handleNextCard}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Next Card</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: SPEED QUIZ (WORDS IN CONTEXT ACTIVE RECALL)       */}
      {/* ======================================================== */}
      {mode === "quiz" && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Quiz Header */}
          <div className="flex items-center justify-between p-4 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 font-bold">
                <Zap size={18} />
              </div>
              <div>
                <span className="text-xs text-[var(--text-muted)] font-medium">Question {quizQuestionIndex + 1}</span>
                <h3 className="text-sm font-bold">Digital SAT Words in Context Drill</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-[var(--text-muted)] block">Score</span>
                <span className="text-base font-black text-purple-600 font-mono">{quizScore} pts</span>
              </div>
              <div className="text-right pl-3 border-l border-[var(--border-main)]">
                <span className="text-[10px] uppercase font-mono text-[var(--text-muted)] block">Streak</span>
                <span className="text-base font-black text-amber-500 font-mono flex items-center gap-1">
                  <Flame size={14} className="fill-amber-500" />
                  <span>{quizStreak}</span>
                </span>
              </div>
            </div>
          </div>

          {currentQuizWord && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-6">
              {/* Question Prompt */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-mono font-bold">
                  <span>Match Definition</span>
                  <span>•</span>
                  <span>Part of Speech: {currentQuizWord.partOfSpeech}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold leading-relaxed text-[var(--text-main)]">
                  Which word most accurately matches this College Board definition?
                </h2>
                <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-sm sm:text-base font-medium text-[var(--text-main)] leading-relaxed italic">
                  &ldquo;{currentQuizWord.definition}&rdquo;
                </div>
              </div>

              {/* 4 MCQ Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizOptions.map((opt) => {
                  const isSelected = selectedOption === opt.word;
                  const isCorrect = opt.word === currentQuizWord.word;
                  let btnStyle = "bg-[var(--bg-surface)] border-[var(--border-main)] hover:border-purple-500 text-[var(--text-main)]";

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400 font-bold shadow-sm";
                    } else {
                      btnStyle = "opacity-40 border-[var(--border-main)] text-[var(--text-muted)]";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleQuizAnswer(opt.word)}
                      disabled={isAnswerSubmitted}
                      className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between shadow-sm ${btnStyle}`}
                    >
                      <span>{opt.word}</span>
                      {isAnswerSubmitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                      {isAnswerSubmitted && isSelected && !isCorrect && <X size={16} className="text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Question */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                      💡 Vocabulary Breakdown:
                    </span>
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Next Question</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                  <p className="text-xs text-[var(--text-main)] leading-relaxed">
                    <strong>{currentQuizWord.word}</strong> means: <em>{currentQuizWord.definition}</em>
                  </p>
                  <p className="text-xs text-purple-900 dark:text-purple-200 font-semibold">
                    🇺🇿 O'zbekcha: {currentQuizWord.uzbek}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: VOCAB VAULT (ALL 650 WORDS DICTIONARY & SEARCH)   */}
      {/* ======================================================== */}
      {mode === "vault" && (
        <div className="space-y-6">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 650 words, Uzbek meanings, synonyms, or definitions..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] focus:border-purple-500 text-xs text-[var(--text-main)] outline-none transition shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Status Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
              {(["all", "due", "learning", "mastered", "starred"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-2 rounded-xl font-semibold capitalize whitespace-nowrap border transition ${
                    selectedStatus === st
                      ? "bg-purple-600 text-white font-bold border-purple-600 shadow-sm"
                      : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  {st === "all" ? "All Words" : st === "due" ? "Due Today" : st}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-xs text-[var(--text-muted)] flex items-center justify-between">
            <span>Showing {filteredWords.length} of 650 SAT real exam words</span>
            {searchQuery && <span>Filtered by: &ldquo;{searchQuery}&rdquo;</span>}
          </div>

          {/* Words Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredWords.map((item) => {
              const prog = progressMap[item.id];
              const isMastered = prog?.status === "mastered";
              const isLearning = prog?.status === "learning";
              const isStarred = prog?.starred;

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-purple-500/40 transition shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                          #{item.id}
                        </span>
                        <h4 className="text-base font-black text-[var(--text-main)] tracking-tight">
                          {item.word}
                        </h4>
                        <button
                          onClick={() => speakWord(item.word)}
                          className="p-1 rounded-full text-[var(--text-muted)] hover:text-purple-600 transition"
                          title="Listen to pronunciation"
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleToggleStar(item.id)}
                          className="text-[var(--text-muted)] hover:text-amber-500 transition"
                        >
                          <Star size={14} className={isStarred ? "fill-amber-500 text-amber-500" : ""} />
                        </button>
                        {isMastered && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-mono">
                            Mastered
                          </span>
                        )}
                        {isLearning && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-[10px] font-bold font-mono">
                            Learning
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-main)] leading-relaxed font-medium">
                      {item.definition}
                    </p>

                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-900 dark:text-purple-200 font-semibold leading-relaxed">
                      🇺🇿 {item.uzbek}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[var(--border-main)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
                    <span className="capitalize">{item.partOfSpeech}</span>
                    <span>Tier {item.tier}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
