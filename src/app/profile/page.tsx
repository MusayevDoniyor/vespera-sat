"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import {
  User,
  Award,
  Flame,
  Calendar,
  Target,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  BookOpen,
  GraduationCap,
  Calculator,
  FileCheck2,
  ArrowUpRight,
  BarChart3,
  TrendingUp,
  Sliders,
  Shield,
  BrainCircuit,
  Search,
  Filter,
  RotateCcw,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface DifficultyItem {
  difficulty: string;
  total: number;
  attempted: number;
  correct: number;
  accuracy: number;
}

interface ActivityItem {
  id: string;
  question_id: string;
  status: "CORRECT" | "INCORRECT";
  user_choice: string;
  time_spent: number;
  updated_at: string;
  prompt: string;
  section: "MATH" | "READING_WRITING";
  domain: string;
  difficulty: "Easy" | "Medium" | "Hard";
  correct_answer: string;
  topic_title?: string;
}

export default function ProfilePage() {
  const { user, openOnboarding, openAuthModal } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters for recent activity
  const [sectionFilter, setSectionFilter] = useState<"ALL" | "MATH" | "READING_WRITING">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "CORRECT" | "INCORRECT">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load user profile stats:", err);
        setLoading(false);
      });
  }, [user]);

  // Days until target exam
  const daysUntilExam = useMemo(() => {
    if (!user?.examDate) return null;
    const exam = new Date(user.examDate);
    const today = new Date();
    const diff = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [user?.examDate]);

  // Filtered recent activity
  const filteredActivity = useMemo(() => {
    if (!stats?.recentActivity) return [];
    return (stats.recentActivity as ActivityItem[]).filter((item) => {
      if (sectionFilter !== "ALL" && item.section !== sectionFilter) return false;
      if (statusFilter !== "ALL" && item.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchPrompt = item.prompt?.toLowerCase().includes(q);
        const matchDomain = item.domain?.toLowerCase().includes(q);
        const matchTopic = item.topic_title?.toLowerCase().includes(q);
        if (!matchPrompt && !matchDomain && !matchTopic) return false;
      }
      return true;
    });
  }, [stats?.recentActivity, sectionFilter, statusFilter, searchQuery]);

  // Overall accuracy
  const overallAccuracy = useMemo(() => {
    if (!stats || !stats.totalSolved) return 0;
    return Math.round((stats.totalCorrect / stats.totalSolved) * 100);
  }, [stats]);

  return (
    <div className="w-full space-y-8 pb-16 animate-fade-in max-w-7xl mx-auto">
      {/* 1. Profile Hero & Target Score Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-surface)] to-[var(--bg-card)] border border-[var(--border-main)] p-6 sm:p-8 md:p-10 shadow-sm">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-blue)]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* User Info */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-2xl sm:text-3xl font-mono shadow-md shrink-0 hover:scale-105 transition-transform duration-300">
              {user ? user.fullName.charAt(0).toUpperCase() : "G"}
            </div>
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--text-main)] tracking-tight">
                  {user ? user.fullName : "Guest Candidate"}
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono animate-pop-in">
                  {user ? "Personalized Account" : "Guest Mode"}
                </span>
                {user?.priorityWeakness && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Focus: {user.priorityWeakness}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono">
                {user?.email || "Sign in to permanently sync and safeguard your progress"}
              </p>
              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] pt-1 flex-wrap font-medium">
                <span className="flex items-center gap-1.5">
                  <Flame size={14} className="text-amber-500 fill-amber-500 animate-live-pulse" />
                  <strong className="text-[var(--text-main)] font-mono">
                    {stats?.realStreak || 1}
                  </strong>{" "}
                  Day Streak
                </span>
                {daysUntilExam !== null && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[var(--accent-blue)]" />
                    <strong className="text-[var(--text-main)] font-mono">{daysUntilExam}</strong>{" "}
                    days to exam
                  </span>
                )}
                {user?.dailyGoalMinutes && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-emerald-500" />
                    Daily Goal:{" "}
                    <strong className="text-[var(--text-main)] font-mono">
                      {user.dailyGoalMinutes}m
                    </strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Score Goals & Edit Profile CTA */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex items-center gap-3 shadow-2xs hover:scale-105 transition-transform duration-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Target size={20} className="animate-pop-in" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider block font-mono">
                  Target Score
                </span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {user?.targetSatScore || 1550}+
                </span>
              </div>
            </div>

            {user ? (
              <button
                onClick={openOnboarding}
                className="px-4 py-3 rounded-2xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--border-hover)] text-xs font-semibold text-[var(--text-main)] flex items-center gap-2 transition-all duration-150 active:scale-95 shadow-2xs cursor-pointer"
              >
                <Sliders size={14} />
                <span>Adjust Goals</span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal("register")}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer animate-glow-pulse"
              >
                <User size={14} />
                <span>Create Free Account</span>
              </button>
            )}

            <Link
              href="/mock"
              className="px-4 py-3 rounded-2xl bg-[var(--accent-blue)]/10 hover:bg-[var(--accent-blue)]/20 border border-[var(--accent-blue)]/30 text-xs font-semibold text-[var(--accent-blue)] flex items-center gap-2 transition-all duration-150 active:scale-95"
            >
              <FileCheck2 size={14} />
              <span>Take Full Mock</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key High-Level Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Questions Solved */}
        <div className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2 shadow-2xs card-interactive">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Questions Solved
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-mono">
              {stats?.totalSolved || 0}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              / {stats?.totalQuestions || 1847}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.min(
                  100,
                  stats?.totalQuestions
                    ? ((stats.totalSolved || 0) / stats.totalQuestions) * 100
                    : 0
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Overall Accuracy */}
        <div className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2 shadow-2xs card-interactive">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Accuracy Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {overallAccuracy}%
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              ({stats?.totalCorrect || 0} correct)
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${overallAccuracy}%` }}
            />
          </div>
        </div>

        {/* Projected Math Score */}
        <div className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2 shadow-2xs card-interactive">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Math Projected
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Calculator size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {stats?.math?.projectedScore || 700}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">/ 800</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] font-mono">
            {stats?.math?.accuracy || 0}% accuracy • {stats?.math?.attempted || 0} solved
          </p>
        </div>

        {/* Projected Verbal Score */}
        <div className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2 shadow-2xs card-interactive">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Reading & Writing
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <GraduationCap size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">
              {stats?.verbal?.projectedScore || 680}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">/ 800</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] font-mono">
            {stats?.verbal?.accuracy || 0}% accuracy • {stats?.verbal?.attempted || 0} solved
          </p>
        </div>
      </div>

      {/* 3. Difficulty Breakdown Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
            <BarChart3 size={18} className="text-[var(--accent-blue)]" />
            <span>Difficulty Breakdown & Mastery</span>
          </h2>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            Based on College Board official tier ratings
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(stats?.difficultyBreakdown || [
            { difficulty: "Easy", attempted: 0, total: 420, accuracy: 0 },
            { difficulty: "Medium", attempted: 0, total: 860, accuracy: 0 },
            { difficulty: "Hard", attempted: 0, total: 567, accuracy: 0 },
          ]).map((diff: DifficultyItem) => {
            const isEasy = diff.difficulty === "Easy";
            const isMed = diff.difficulty === "Medium";
            const isHard = diff.difficulty === "Hard";

            const colorClass = isEasy
              ? "text-emerald-500"
              : isMed
              ? "text-amber-500"
              : "text-rose-500";
            const barBgClass = isEasy
              ? "bg-emerald-500"
              : isMed
              ? "bg-amber-500"
              : "bg-rose-500";
            const borderBadge = isEasy
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              : isMed
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
              : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";

            return (
              <div
                key={diff.difficulty}
                className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-3.5 shadow-2xs card-interactive"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${borderBadge}`}>
                    {diff.difficulty} Questions
                  </span>
                  <span className="text-sm font-bold text-[var(--text-main)] font-mono">
                    {diff.accuracy}% Accuracy
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
                    <span>Solved: {diff.attempted}</span>
                    <span>Total Bank: {diff.total}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[var(--bg-surface)] overflow-hidden">
                    <div
                      className={`h-full ${barBgClass} rounded-full transition-all duration-700 ease-out`}
                      style={{
                        width: `${Math.min(
                          100,
                          diff.total > 0 ? (diff.attempted / diff.total) * 100 : 0
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--border-main)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span>Correct: {diff.correct || 0}</span>
                  <span className="font-mono">
                    {diff.total > 0 ? Math.round((diff.attempted / diff.total) * 100) : 0}% covered
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Domain Level Mastery Radar / Bars */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
            <BrainCircuit size={18} className="text-indigo-500" />
            <span>SAT Domain Mastery Breakdown</span>
          </h2>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            College Board 8 Tested Core Domains
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Math Domains */}
          <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-4 shadow-2xs card-interactive">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
              <div className="flex items-center gap-2">
                <Calculator size={16} className="text-[var(--accent-blue)]" />
                <h3 className="font-bold text-sm text-[var(--text-main)]">
                  Math Section Domains
                </h3>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {stats?.math?.total || 583} Questions
              </span>
            </div>

            <div className="space-y-3.5">
              {(stats?.domainMasteryList || [])
                .filter((d: any) => d.section === "MATH")
                .map((domain: any) => (
                  <div key={domain.domain} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--text-main)] truncate max-w-[220px]">
                        {domain.domain}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                            domain.accuracy >= 80
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : domain.accuracy >= 60
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
                          }`}
                        >
                          {domain.accuracy}%
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)] font-mono">
                          {domain.attempted}/{domain.total}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${domain.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Reading & Writing Domains */}
          <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-4 shadow-2xs card-interactive">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-purple-500" />
                <h3 className="font-bold text-sm text-[var(--text-main)]">
                  Reading & Writing Domains
                </h3>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {stats?.verbal?.total || 1264} Questions
              </span>
            </div>

            <div className="space-y-3.5">
              {(stats?.domainMasteryList || [])
                .filter((d: any) => d.section === "READING_WRITING")
                .map((domain: any) => (
                  <div key={domain.domain} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--text-main)] truncate max-w-[220px]">
                        {domain.domain}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                            domain.accuracy >= 80
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : domain.accuracy >= 60
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : "bg-[var(--bg-surface)] text-[var(--text-muted)]"
                          }`}
                        >
                          {domain.accuracy}%
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)] font-mono">
                          {domain.attempted}/{domain.total}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${domain.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Solved Questions Activity & History */}
      <div className="space-y-4 pt-4 border-t border-[var(--border-main)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <Clock size={18} className="text-emerald-500" />
              <span>Recently Solved Questions Log</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Review your answers, verify accuracy, or jump back in to re-attempt
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by question text..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-blue)] transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
            <button
              onClick={() => setSectionFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sectionFilter === "ALL"
                  ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xs font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              All Sections
            </button>
            <button
              onClick={() => setSectionFilter("MATH")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sectionFilter === "MATH"
                  ? "bg-[var(--bg-card)] text-blue-600 dark:text-blue-400 shadow-2xs font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Math Only
            </button>
            <button
              onClick={() => setSectionFilter("READING_WRITING")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sectionFilter === "READING_WRITING"
                  ? "bg-[var(--bg-card)] text-purple-600 dark:text-purple-400 shadow-2xs font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Reading & Writing
            </button>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === "ALL"
                  ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xs font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter("CORRECT")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === "CORRECT"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-2xs font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Correct
            </button>
            <button
              onClick={() => setStatusFilter("INCORRECT")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === "INCORRECT"
                  ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 shadow-2xs font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Incorrect / Needs Review
            </button>
          </div>
        </div>

        {/* Activity Table / Cards */}
        {filteredActivity.length > 0 ? (
          <div className="space-y-2.5">
            {filteredActivity.map((act) => {
              const isCorrect = act.status === "CORRECT";
              const targetRoute = act.section === "MATH" ? "/math" : "/verbal";

              return (
                <div
                  key={act.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/50 hover:translate-x-1 hover:shadow-sm transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs group"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isCorrect
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {isCorrect ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        <span>{isCorrect ? "Correct" : "Needs Review"}</span>
                      </span>

                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-main)] font-mono">
                        {act.section === "MATH" ? "Math" : "Verbal"}
                      </span>

                      <span className="text-[11px] font-medium text-[var(--accent-blue)]">
                        {act.domain}
                      </span>

                      <span
                        className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                          act.difficulty === "Easy"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : act.difficulty === "Medium"
                            ? "bg-amber-500/10 text-amber-500"
                            : "bg-rose-500/10 text-rose-500"
                        }`}
                      >
                        {act.difficulty}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-main)] font-medium line-clamp-2 leading-relaxed">
                      {act.prompt.replace(/\$[^$]+\$/g, "[math formula]")}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)] font-mono pt-0.5">
                      <span>
                        Your answer: <strong className="text-[var(--text-main)]">Choice {act.user_choice}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Correct: <strong className="text-emerald-500">Choice {act.correct_answer}</strong>
                      </span>
                      {act.time_spent > 0 && (
                        <>
                          <span>•</span>
                          <span>{act.time_spent}s spent</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{new Date(act.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <Link
                      href={`${targetRoute}?q=${act.question_id}`}
                      className="px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--accent-blue)]/10 text-xs font-semibold text-[var(--text-main)] hover:text-[var(--accent-blue)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/30 flex items-center gap-1.5 transition-all duration-150 active:scale-95 shadow-2xs group-hover:border-[var(--accent-blue)]/50"
                    >
                      <span>Re-Attempt</span>
                      <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-dashed border-[var(--border-main)] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto">
              <BookOpen size={24} />
            </div>
            <h3 className="text-sm font-bold text-[var(--text-main)]">
              No Solved Questions Matching Filters
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              Practice questions from the Math or Reading & Writing banks to start building your
              real-time performance history!
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href="/math"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Go to Math Bank
              </Link>
              <Link
                href="/verbal"
                className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-semibold text-[var(--text-main)] transition-all"
              >
                Go to Verbal Bank
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
