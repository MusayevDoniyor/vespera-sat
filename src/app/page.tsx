"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  BookOpen,
  Sparkles,
  Repeat,
  TrendingUp,
  Award,
  ArrowRight,
  Target,
  CheckCircle2,
  AlertCircle,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sliders,
  HelpCircle,
  FileText,
  GraduationCap,
  LogIn,
  Calendar,
  Clock,
  Compass,
  BrainCircuit,
} from "lucide-react";
import VisualTopicDiagram from "@/components/VisualTopicDiagram";
import VesperaLogo from "@/components/VesperaLogo";
import { useAuth } from "@/components/AuthContext";
import DiagnosticPlacementModal from "@/components/DiagnosticPlacementModal";
import QuestionCard from "@/components/QuestionCard";
import StudentRadarAnalytics from "@/components/analytics/StudentRadarAnalytics";
import { isMathDomain, isVerbalDomain } from "@/lib/curriculum-data";
import { fetchWithDeduplication } from "@/lib/api-cache";
import { SATASHKENT_LIBRARY } from "@/lib/satashkent-data";

export default function DashboardPage() {
  const { user, openAuthModal, openOnboarding } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [recFilter, setRecFilter] = useState<"ALL" | "MATH" | "READING_WRITING">("ALL");
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState<number | null>(0);

  // Personalized Exam Countdown
  const examCountdown = React.useMemo(() => {
    if (!user?.examDate || user.examDate.toLowerCase().includes("later")) return null;
    const parts = user.examDate.trim().split(" ");
    if (parts.length < 2) return null;
    const monthName = parts[0];
    const year = parseInt(parts[1], 10);
    const monthNames = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december"
    ];
    const monthIdx = monthNames.indexOf(monthName.toLowerCase());
    if (monthIdx === -1 || isNaN(year)) return null;

    const targetDate = new Date(year, monthIdx, 1);
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    return {
      daysLeft: diffDays,
      weeksLeft: Math.ceil(diffDays / 7),
      targetMonth: `${monthName} ${year}`,
    };
  }, [user?.examDate]);

  // Personalized Score Gap
  const scoreGap = React.useMemo(() => {
    if (!user?.targetSatScore) return null;
    const current = user.currentSatScore || 0;
    const target = user.targetSatScore;
    const gap = current > 0 ? target - current : null;
    return {
      current,
      target,
      gap: gap !== null && gap > 0 ? gap : null,
    };
  }, [user?.targetSatScore, user?.currentSatScore]);

  // Projected Study Hours
  const dailyHoursRemaining = React.useMemo(() => {
    if (!examCountdown || !user?.dailyGoalMinutes) return null;
    const totalMinutes = examCountdown.daysLeft * user.dailyGoalMinutes;
    return Math.round(totalMinutes / 60);
  }, [examCountdown, user?.dailyGoalMinutes]);

  useEffect(() => {
    fetchWithDeduplication("/api/stats")
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
        setLoading(false);
      });

    fetchWithDeduplication("/api/recommendations")
      .then((data) => {
        setRecommendations(data);
      })
      .catch((err) => {
        console.error("Failed to fetch recommendations:", err);
      });
  }, [user]);

  // Top 6 YouTube / 800-Scorer Speedrun Strategies
  const masterclassHacks = [
    {
      title: "1. The Desmos Regression Table Hack",
      badge: "8-Second Solve",
      tag: "Algebra & Advanced Math",
      summary:
        "Whenever given a table of (x, y) values or asked to find an exponential or quadratic model, never solve manually.",
      strategy:
        "Click '+' -> Table in Desmos. Enter the given coordinates into x1 and y1. On line 2, type 'y1 ~ mx1 + b' (linear) or 'y1 ~ a(x1 - h)^2 + k' (quadratic) or 'y1 ~ ab^(x1)' (exponential). Desmos calculates the exact constants m, b, a, h, k instantly with r^2 = 1!",
      example: "October SAT Table problem: instantly outputs a = 16, b = 2 in under 6 seconds.",
    },
    {
      title: "2. The Constant Slider Intersect Trick",
      badge: "Nonlinear Bypass",
      tag: "Systems & Discriminants",
      summary:
        "When a question asks 'for what value of constant c does the system have 1 solution or 0 solutions?'.",
      strategy:
        "Type the two equations directly into Desmos with variable 'c'. Click 'add slider c'. Slide 'c' until the line is tangent to the curve (1 solution) or completely separates (0 solutions). Look at the exact slider value!",
      example: "y = 2x^2 - 8x + c and y = 0: slide c until the parabola apex touches the x-axis at c = 8.",
    },
    {
      title: "3. The Semicolon = Period Elimination Rule",
      badge: "Verbal 5-Second Kill",
      tag: "Reading & Writing Conventions",
      summary:
        "Standard English Conventions questions testing punctuation between clauses.",
      strategy:
        "If two multiple-choice options are identical except one uses a period (.) and the other uses a semicolon (;), BOTH ARE 100% WRONG. A period and semicolon perform the identical grammatical function on the SAT. Eliminate both immediately!",
      example: "Choice A: '...discovery. It...' vs Choice B: '...discovery; it...'. Strike through both choices instantly.",
    },
    {
      title: "4. The Co-Function Complementary Angle Sum",
      badge: "Trigonometry Shortcut",
      tag: "Geometry & Trig",
      summary: "Questions in the form sin(Expression A) = cos(Expression B).",
      strategy:
        "Never convert to unit circle triangles. The Co-Function Theorem dictates that the two acute angles must add up to 90 degrees: Expression A + Expression B = 90. Solve as a simple linear equation in Desmos in 5 seconds!",
      example: "sin(3x - 12) = cos(2x + 7) => (3x - 12) + (2x + 7) = 90 => 5x - 5 = 90 => x = 19.",
    },
    {
      title: "5. The Dangling Modifier Anchor Rule",
      badge: "Grammar Trap Buster",
      tag: "Standard English Conventions",
      summary: "Sentences beginning with an introductory -ing or -ed participial phrase.",
      strategy:
        "Ask yourself: 'WHO or WHAT is performing the action in the introductory phrase?'. That exact agent MUST be the very first noun immediately following the comma. If it is an invention, a team's book, or a passive noun, it is a dangling modifier trap!",
      example: "'Pioneering the study of DNA, Rosalind Franklin [NOT Franklin's images] produced...'",
    },
    {
      title: "6. The Parabola Vertex Midpoint Shortcut",
      badge: "Quadratic Speedrun",
      tag: "Advanced Math",
      summary: "Finding the maximum or minimum of factored quadratics like g(x) = (24 - 2x)(10 + 2x).",
      strategy:
        "Do not expand into standard form! Find the two x-intercepts by setting factors to zero: x1 = 12, x2 = -5. The vertex x-coordinate is always the exact midpoint: x = (x1 + x2)/2 = (12 - 5)/2 = 3.5. Saves 45 seconds of tedious algebra.",
      example: "October SAT Math 11: maximum occurs at x = 3.5 without multiplying out.",
    },
  ];

  // Fully synchronized study materials list mapped from SATASHKENT_LIBRARY (61 Books)
  const materialsList = useMemo(() => {
    return SATASHKENT_LIBRARY.map((b) => ({
      name: b.filename,
      topic: b.keyTopics[0] || b.targetScore,
      pages: b.pages,
      type: b.badge,
    }));
  }, []);

  return (
    <div className="w-full space-y-8 pb-16 animate-fade-in">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] p-8 md:p-10 shadow-[var(--shadow-md)]">
        {/* Subtle Watermark Emblem */}
        <div className="absolute -right-6 -bottom-6 pointer-events-none opacity-[0.06] dark:opacity-[0.12] select-none">
          <VesperaLogo size={260} variant="mark" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] text-xs font-semibold border border-[var(--accent-blue)]/20 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Digital SAT Suite
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-main)] tracking-tight flex flex-wrap items-center gap-3">
              <span>{user ? `Welcome back, ${user.fullName}!` : "Welcome to Vespera"}</span>
              <span
                onClick={user ? openOnboarding : () => openAuthModal("register")}
                className="text-xs px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold tracking-wider uppercase cursor-pointer transition-colors shadow-sm"
                title="Click to edit score target"
              >
                Target {user?.targetSatScore || 1550}+
              </span>
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xl leading-relaxed">
              {user ? (
                user.ieltsScore ? (
                  <>
                    Personalized for your <strong className="text-[var(--text-main)]">IELTS {user.ieltsScore}</strong> profile: tailored focus on catapulting <strong className="text-[var(--accent-blue)]">Math to {user.mathLevel === "target_800" ? "800" : "800"}</strong> and mastering Desmos strategies for a <strong className="text-[var(--accent-green)]">{user.targetSatScore || 1550}+</strong> score before {user.examDate ? (user.examDate.includes("Later") ? "your target exam" : user.examDate) : "exam day"}.
                  </>
                ) : (
                  <>
                    Personalized for your <strong className="text-[var(--text-main)]">{user.mathLevel.replace("_", " ")}</strong> Math & <strong className="text-[var(--text-main)]">{user.englishLevel}</strong> Verbal profile: daily commitment of <strong className="text-[var(--accent-blue)]">{user.dailyGoalMinutes} min/day</strong> targeting <strong className="text-[var(--accent-green)]">{user.targetSatScore || 1550}+</strong> before {user.examDate ? (user.examDate.includes("Later") ? "your target exam" : user.examDate) : "exam day"}.
                  </>
                )
              ) : (
                <>
                  Complete Digital SAT preparation with <strong className="text-[var(--text-main)]">{stats?.totalQuestions || 1847}+ authentic questions</strong> ({stats?.math?.total || 583} Math & {stats?.verbal?.total || 1264} Verbal), {stats?.totalMockExams || 9} full-length adaptive practice tests, 13 interactive textbook units, 16 visual models, and Desmos speed hacks. Start with our 5-minute diagnostic or create an account to customize your study plan.
                </>
              )}
            </p>

            {user ? (
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsDiagnosticOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <Target size={13} />
                  <span>{user.currentSatScore ? "Recalibrate Diagnostic" : "5-Min Diagnostic"}</span>
                </button>
                <button
                  onClick={openOnboarding}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-semibold text-[var(--text-main)] transition-colors shadow-sm cursor-pointer"
                >
                  <Sliders size={13} className="text-[var(--accent-blue)]" />
                  <span>Edit Goals</span>
                </button>
                {user.priorityWeakness && (
                  <span className="text-xs text-[var(--text-muted)] font-mono hidden sm:inline">
                    Priority: <span className="text-[var(--accent-blue)] font-bold">{user.priorityWeakness}</span>
                  </span>
                )}
              </div>
            ) : (
              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsDiagnosticOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <Target size={14} />
                  <span>5-Min Diagnostic Test</span>
                </button>
                <button
                  onClick={() => openAuthModal("register")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <LogIn size={14} />
                  <span>Get Started Free</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 bg-[var(--bg-surface)] p-5 rounded-2xl border border-[var(--border-main)] shadow-inner shrink-0">
            <div className="text-center px-4 border-r border-[var(--border-main)]">
              <span className="text-xs text-[var(--text-muted)] block font-medium mb-1">Projected Score</span>
              <span className="text-3xl font-black text-[var(--accent-green)]">
                {recommendations?.scorePrediction?.composite || (stats ? (stats.compositeScore || (stats.math.projectedScore + stats.verbal.projectedScore)) : "400")}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] block font-mono mt-1">
                {recommendations?.scorePrediction?.scoreRange
                  ? `Est: ${recommendations.scorePrediction.scoreRange.low}–${recommendations.scorePrediction.scoreRange.high}`
                  : "/ 1600 Points"}
              </span>
            </div>
            <div
              onClick={user ? openOnboarding : () => openAuthModal("login")}
              className="text-center px-4 cursor-pointer group"
              title="Click to adjust goal"
            >
              <span className="text-xs text-[var(--text-muted)] block font-medium mb-1">Goal Score</span>
              <span className="text-3xl font-black text-[var(--accent-blue)] group-hover:scale-105 transition-transform">
                {user?.targetSatScore || 1550}+
              </span>
              <span className="text-[11px] text-[var(--accent-green)] font-semibold block font-mono mt-1">
                {recommendations?.scorePrediction?.readinessIndex !== undefined
                  ? `${recommendations.scorePrediction.readinessIndex}% Ready`
                  : (user?.targetSatScore && user.targetSatScore >= 1550 ? "Top 1% Rank" : "Competitive")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 TODAY'S PERSONALIZED ADAPTIVE MISSIONS */}
      <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-main)]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono">
              <Zap size={14} className="text-amber-500" />
              <span>Adaptive Engine • Calibrated Daily</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[var(--text-main)] tracking-tight">
              Today's Personalized Study Missions
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Targeted algorithmically based on your {user?.targetSatScore || 1550}+ goal, {user?.examDate || "target exam"} timeline, and empirical error rate.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs font-mono">
              <span>🔥</span>
              <span>{stats?.realStreak || 0} Day Streak</span>
            </div>

            <button
              onClick={() => setIsDiagnosticOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-main)] transition-colors shadow-sm"
            >
              <Target size={14} className="text-blue-500" />
              <span>Placement Test</span>
            </button>
          </div>
        </div>

        {/* 3 Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mission 1: Weakness / Diagnostic */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
                  {recommendations?.dailyMissions?.[0]?.badge || "Priority Target"}
                </span>
                <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
                  Mission 1
                </span>
              </div>
              <h4 className="text-base font-bold text-[var(--text-main)]">
                {recommendations?.dailyMissions?.[0]?.title || `Weakness Drill: ${recommendations?.weakestDomain || "Algebra"}`}
              </h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {recommendations?.dailyMissions?.[0]?.subtitle || "Target your lowest accuracy topic with authentic College Board questions."}
              </p>
            </div>

            {recommendations?.dailyMissions?.[0]?.type === "diagnostic" ? (
              <button
                onClick={() => setIsDiagnosticOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>Take 5-Min Diagnostic</span>
                <ArrowRight size={13} />
              </button>
            ) : (
              <Link
                href={recommendations?.dailyMissions?.[0]?.targetUrl || "/curriculum"}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
              >
                <span>Start Weakness Drill</span>
                <ArrowRight size={13} />
              </Link>
            )}
          </div>

          {/* Mission 2: Spaced Repetition Error Review */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-slate-400/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20">
                  {recommendations?.dailyMissions?.[1]?.badge || "Active Recall"}
                </span>
                <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
                  Mission 2
                </span>
              </div>
              <h4 className="text-base font-bold text-[var(--text-main)]">
                {recommendations?.dailyMissions?.[1]?.title || "Spaced Repetition Error Review"}
              </h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {recommendations?.dailyMissions?.[1]?.subtitle || "Overcome test traps and prevent score regression with SM-2 spaced recall."}
              </p>
            </div>

            <Link
              href={recommendations?.dailyMissions?.[1]?.targetUrl || "/error-log"}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
            >
              <span>{recommendations?.dueReviewsCount > 0 ? "Review Due Errors" : "Launch Speed Drill"}</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mission 3: Curriculum Mastery */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-slate-400/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {recommendations?.dailyMissions?.[2]?.badge || "Textbook Masterclass"}
                </span>
                <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
                  Mission 3
                </span>
              </div>
              <h4 className="text-base font-bold text-[var(--text-main)]">
                {recommendations?.dailyMissions?.[2]?.title || "Daily Textbook Unit"}
              </h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {recommendations?.dailyMissions?.[2]?.subtitle || "Study first principles, KaTeX formulas, and conquer the 10-Question Target Practice Quiz."}
              </p>
            </div>

            <Link
              href={recommendations?.dailyMissions?.[2]?.targetUrl || "/curriculum"}
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
            >
              <span>Study Chapter</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* 🧭 MULTI-DOMAIN DIAGNOSTIC MASTERY RADAR & SPEED TELEMETRY */}
      <StudentRadarAnalytics
        domainMasteryList={stats?.domainMasteryList}
        paceStats={stats?.paceStats}
        mockHistory={stats?.mockHistory}
        compositeScore={stats?.compositeScore}
        targetScore={user?.targetSatScore || 1550}
      />

      {/* 🎯 ADAPTIVE RECOMMENDED QUESTIONS SECTION */}
      {recommendations?.recommendedQuestions?.length > 0 && (
        <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-main)] pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 text-xs font-bold font-mono mb-2">
                <Target size={14} className="text-[var(--accent-blue)]" />
                <span>AI Adaptive Engine • Personalized Question Feed</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[var(--text-main)] tracking-tight">
                Recommended Practice Questions For You
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] mt-1 max-w-3xl leading-relaxed">
                {recommendations?.latestMock ? (
                  <>
                    Calibrated to your recent <strong>{recommendations.latestMock.title}</strong> (Score: <strong>{recommendations.latestMock.score}</strong>). We prioritized foundational questions targeting your lowest scoring areas: <strong className="text-[var(--accent-blue)]">{recommendations.weakestDomain}</strong> and <strong className="text-indigo-500">{recommendations.weakestVerbalDomain || "Expression of Ideas"}</strong>.
                  </>
                ) : (
                  <>
                    Personalized questions selected by the Bayesian adaptive engine targeting your lowest mastery domains.
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-center">
              <button
                onClick={() => setRecFilter("ALL")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition font-mono ${
                  recFilter === "ALL"
                    ? "bg-[var(--accent-blue)] text-white shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)]"
                }`}
              >
                All ({recommendations?.recommendedQuestions?.length || 0})
              </button>
              <button
                onClick={() => setRecFilter("MATH")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition font-mono ${
                  recFilter === "MATH"
                    ? "bg-[var(--accent-blue)] text-white shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)]"
                }`}
              >
                Math
              </button>
              <button
                onClick={() => setRecFilter("READING_WRITING")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition font-mono ${
                  recFilter === "READING_WRITING"
                    ? "bg-[var(--accent-blue)] text-white shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)]"
                }`}
              >
                Reading & Writing
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {recommendations.recommendedQuestions
              .filter((q: any) => recFilter === "ALL" || q.section === recFilter)
              .slice(0, 4)
              .map((q: any) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  onAnswerSubmitted={() => {
                    fetch("/api/stats").then((r) => r.json()).then((d) => setStats(d));
                    fetch("/api/recommendations").then((r) => r.json()).then((d) => setRecommendations(d));
                  }}
                />
              ))}
          </div>

          {/* Quick links to full practice suites */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--border-main)] text-xs">
            <span className="text-[var(--text-muted)]">
              Want more questions? Over 1,180 authentic questions available with Desmos speed tricks:
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                href={`/math?domain=${encodeURIComponent((recommendations?.weakestMathDomain && isMathDomain(recommendations.weakestMathDomain)) ? recommendations.weakestMathDomain : "Algebra")}&adaptive=true`}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>Drill {(recommendations?.weakestMathDomain && isMathDomain(recommendations.weakestMathDomain)) ? recommendations.weakestMathDomain : "Algebra"} in Math Lab</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href={`/verbal?domain=${encodeURIComponent((recommendations?.weakestVerbalDomain && isVerbalDomain(recommendations.weakestVerbalDomain)) ? recommendations.weakestVerbalDomain : "Expression of Ideas")}&adaptive=true`}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>Drill {(recommendations?.weakestVerbalDomain && isVerbalDomain(recommendations.weakestVerbalDomain)) ? recommendations.weakestVerbalDomain : "Expression of Ideas"} in Verbal Lab</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 SAT 1550+ MASTER STUDY ROADMAP: WHERE TO BEGIN */}
      <div className="p-6 md:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-800 dark:text-blue-300 text-xs font-bold font-mono mb-2">
              <Compass size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Recommended 4-Step Pathway</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Where Do I Begin? Your 1550+ Study Roadmap
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Follow this battle-tested 4-step framework used by 800-scorers to progress from foundational concepts to exam-day mastery.
            </p>
          </div>
        </div>

        {/* The 4 Roadmap Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* STEP 1 */}
          <Link
            href="/curriculum"
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300">
                  Step 1 • Learn
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors font-mono">
                  13 Units
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <span>13 Units Textbook</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Study foundational theory from zero with SVG diagrams, first principles, and 10-question target quizzes.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
              <span>Open Textbook</span>
              <ArrowRight size={13} />
            </div>
          </Link>

          {/* STEP 2 */}
          <Link
            href="/desmos"
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-[var(--accent-blue)] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">
                  Step 2 • Speed
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-[var(--accent-blue)] transition-colors font-mono">
                  Desmos Lab
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[var(--accent-blue)] transition-colors flex items-center gap-1.5">
                <span>Desmos Speed Lab</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Bypass 60% of manual algebra using 10-second regression (~), slider intercepts, and vertical line root finders.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[var(--accent-blue)] group-hover:translate-x-0.5 transition-transform">
              <span>Launch Speed Lab</span>
              <ArrowRight size={13} />
            </div>
          </Link>

          {/* STEP 3 */}
          <Link
            href="/math"
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  Step 3 • Practice
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors font-mono">
                  Question Bank
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                <span>Domain Question Bank</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Drill Math & Verbal questions by domain and difficulty (Easy / Medium / Hard) with live AI step-by-step mentoring.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              <span>Start Drilling</span>
              <ArrowRight size={13} />
            </div>
          </Link>

          {/* STEP 4 */}
          <Link
            href="/mock"
            className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-amber-500 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300">
                  Step 4 • Test
                </span>
                <span className="text-xs font-bold text-slate-400 group-hover:text-amber-600 transition-colors font-mono">
                  Simulation
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors flex items-center gap-1.5">
                <span>Bluebook Simulator</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Take timed, authentic 134-minute adaptive tests with official Module 1 & 2 routing, then review misses in your Error Notebook.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
              <span>Take Mock Test</span>
              <ArrowRight size={13} />
            </div>
          </Link>
        </div>

        {/* 🧠 650 SAT Real Exam Words in Context Studio Banner */}
        <div className="p-5 md:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <BrainCircuit size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  Must-Know Real Exam Recall
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">• 650 High-Frequency Words</span>
              </div>
              <h4 className="text-base font-bold text-[var(--text-main)] mt-0.5">
                SAT Words in Context Studio & SM-2 Spaced Repetition
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 max-w-2xl leading-relaxed">
                Master the exact 650 vocabulary words that have repeatedly appeared in Official Digital SAT forms since March 2023 with interactive 3D flashcards, native audio pronunciation, and speed MCQ drills.
              </p>
            </div>
          </div>
          <Link
            href="/vocab"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-sm flex items-center justify-center gap-1.5 shrink-0 self-stretch sm:self-auto cursor-pointer"
          >
            <span>Launch Vocab Studio</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Personalized Study Command Center */}
      {user && (
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-main)]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <Target size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono uppercase">
                    Personalized Command Center
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    Profile: {user.fullName}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[var(--text-main)] mt-0.5">
                  Your Custom Digital SAT Blueprint
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={openOnboarding}
                className="px-3.5 py-1.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs font-bold text-[var(--accent-blue)] flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Sliders size={13} />
                <span>Adjust Goals</span>
              </button>
            </div>
          </div>

          {/* Metric Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* 1. Exam Target & Countdown */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <Calendar size={12} className="text-indigo-500" />
                <span>Target Exam</span>
              </span>
              <div className="text-base sm:text-lg font-black text-[var(--text-main)] truncate">
                {user.examDate || "Flexible"}
              </div>
              <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono font-bold mt-1 block">
                {examCountdown ? `${examCountdown.daysLeft} days remaining` : "Self-paced schedule"}
              </span>
            </div>

            {/* 2. Score Target & Delta */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <Award size={12} className="text-emerald-500" />
                <span>Score Goal</span>
              </span>
              <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                {user.targetSatScore || 1550}+
              </div>
              <span className="text-[11px] text-[var(--text-muted)] font-mono mt-1 block">
                {scoreGap?.gap ? `+${scoreGap.gap} pts from baseline (${scoreGap.current})` : "Top 1% National Rank"}
              </span>
            </div>

            {/* 3. Daily Study Pace */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <Clock size={12} className="text-[var(--accent-blue)]" />
                <span>Daily Practice</span>
              </span>
              <div className="text-base sm:text-lg font-black text-[var(--text-main)]">
                {user.dailyGoalMinutes || 45} min/day
              </div>
              <span className="text-[11px] text-[var(--text-muted)] font-mono mt-1 block">
                {dailyHoursRemaining ? `~${dailyHoursRemaining} study hours left` : "Consistent daily drills"}
              </span>
            </div>

            {/* 4. Priority Track */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 mb-1">
                <Sparkles size={12} className="text-amber-500" />
                <span>Primary Track</span>
              </span>
              <div className="text-xs sm:text-sm font-bold text-[var(--text-main)] truncate">
                {user.mathLevel === "target_800"
                  ? "Math 800 Elite Track"
                  : user.mathLevel === "beginner"
                  ? "Math Foundations Track"
                  : "Algebra & Pacing Track"}
              </div>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-mono font-bold mt-1 block">
                {user.ieltsScore ? `IELTS ${user.ieltsScore} Reading Base` : `${user.englishLevel} English`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Platform Telemetry & Inventory Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-[var(--shadow-sm)] card-hover">
          <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Question Bank
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[var(--text-main)]">
              {stats?.totalQuestions || 1847}
            </span>
            <span className="text-xs font-semibold text-[var(--accent-blue)] font-mono">Problems</span>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
            {stats?.math ? `${stats.math.total} Math • ${stats.verbal?.total} Verbal` : "583 Math • 1,264 Verbal"}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-[var(--shadow-sm)] card-hover">
          <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Visual Models
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[var(--text-main)]">16</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">Figures</span>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
            11 Math • 5 Reading & Writing
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-[var(--shadow-sm)] card-hover">
          <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Curriculum Taxonomy
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[var(--text-main)]">{stats?.totalTopics || 29}</span>
            <span className="text-xs font-semibold text-[var(--accent-blue)] font-mono">Topics</span>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
            100% Complete Coverage
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-[var(--shadow-sm)] card-hover">
          <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Source Materials
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[var(--text-main)]">{materialsList.length}</span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 font-mono">Books/PDFs</span>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
            Vespera SAT Masterclass Library
          </span>
        </div>
      </div>

      {/* Personalized Study Roadmap Card */}
      <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-[var(--shadow-sm)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[var(--border-main)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 shadow-sm">
              <Zap size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 font-mono uppercase">
                  Adaptive AI Roadmap
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  {user ? `${user.fullName}'s Study Focus` : "Recommended Study Path"}
                </span>
              </div>
              <h3 className="text-lg font-black text-[var(--text-main)] mt-0.5">
                {user?.mathLevel === "beginner"
                  ? "Math Foundations & Formula Vault"
                  : user?.mathLevel === "target_800"
                  ? "Desmos Speedrun & Hard Module 2"
                  : "High-Yield Algebra & Quadratic Pacing"}
              </h3>
            </div>
          </div>

          <button
            onClick={user ? openOnboarding : () => openAuthModal("register")}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-bold text-[var(--accent-blue)] flex items-center gap-1.5 transition-colors"
          >
            <Sliders size={13} />
            <span>Edit Track</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {user?.mathLevel === "beginner" ? (
            <>
              <Link
                href="/math"
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase font-mono text-[var(--accent-blue)] block mb-1">
                    Step 1 • Terminology
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                    Math Terminology Dictionary
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    Over 100 mathematical operations, arithmetic terms, and algebraic concepts with College Board definitions.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[var(--accent-blue)]">
                  <span>Open Dictionary</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/satashkent"
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase font-mono text-emerald-600 dark:text-emerald-400 block mb-1">
                    Step 2 • Formulas
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-emerald-500 transition-colors">
                    Erik the Red Formula Sheet
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    6-page condensed formula reference covering every tested geometric, algebraic, and statistic law.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Study Cheat Sheet</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/math"
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase font-mono text-[var(--accent-blue)] block mb-1">
                    Step 3 • Foundations Drill
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                    Heart of Algebra & Radicals
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    Interactive drill questions with step-by-step Socratic explanations and Desmos verification.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[var(--accent-blue)]">
                  <span>Start Practice (0 → 650)</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </>
          ) : user?.mathLevel === "target_800" ? (
            <>
              <Link
                href="/desmos"
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase font-mono text-[var(--accent-blue)] block mb-1">
                    Hack 1 • Desmos Speedrun
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                    Regression Table Cheat (~)
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    Solve any coordinate table or quadratic model in 8 seconds with zero manual arithmetic.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[var(--accent-blue)]">
                  <span>Master Desmos Hacks</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/satashkent"
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase font-mono text-[var(--accent-blue)] block mb-1">
                    Hard Module 2 • Book 2.0
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                    Vespera 800 Gatekeeper Problemset
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    The 145 most punishing 800-gatekeeper problems collected from real 2024-2025 Digital SAT administrations.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[var(--accent-blue)]">
                  <span>View Hard Book 2.0</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/mock"
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase font-mono text-emerald-600 dark:text-emerald-400 block mb-1">
                    Simulation • Bluebook
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-emerald-500 transition-colors">
                    Practice Test 7 Adaptive Exam
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    Full Bluebook test simulation with authentic College Board UI, countdown timer, and automated scoring.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Launch Simulator</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/desmos"
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase font-mono text-[var(--accent-blue)] block mb-1">
                    Core Skill • Speed
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                    Constant Sliders & Systems
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    Bypass lengthy discriminant and substitution algebra by sliding constants directly in Desmos.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[var(--accent-blue)]">
                  <span>Practice Speed Hacks</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/verbal"
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-amber-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase font-mono text-amber-600 dark:text-amber-400 block mb-1">
                    Verbal • 5-Sec Rule
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-amber-500 transition-colors">
                    Punctuation & Semicolon Elimination
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    Instantly eliminate duplicate period and semicolon options on Standard English Conventions questions.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <span>Explore Verbal Hacks</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/error-log"
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-rose-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase font-mono text-rose-600 dark:text-rose-400 block mb-1">
                    Active Recall • SM-2
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-rose-500 transition-colors">
                    Spaced Repetition Error Vault
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    Re-test questions you missed until mastery is locked into permanent memory. Zero repeat mistakes.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                  <span>Open Error Log</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Digital SAT Masterclass & 61-Book Archive Showcase Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-mono uppercase">
              🇺🇿 National & Official Curriculum Hub
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              {materialsList.length} Textbooks • 4,000+ Real Questions • 445+ Vocab Pages
            </span>
          </div>
          <h3 className="text-2xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-2.5">
            <GraduationCap className="text-[var(--accent-blue)]" size={28} />
            <span>Digital SAT Masterclass Vault & Authentic Archives</span>
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-2xl leading-relaxed">
            The complete national standard in SAT prep: SAT Reading & Writing Professor IV (1,474 pages & 1,845 questions), Official College Board Question Banks, Gramilliy grammar bible with 3x1 elimination, 20 modular math textbooks, Vocabook 3.0, August 2026 Predictions, English Elite, and real exam test recalls.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/satashkent"
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <span>Explore {materialsList.length} Books & Vault</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Target & Readiness Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Math Zero-to-Hero Card */}
        <div className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col justify-between hover:border-[var(--accent-blue)]/40 transition-all duration-200 shadow-[var(--shadow-sm)] card-hover">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] flex items-center justify-center font-bold">
                <Calculator size={22} />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-semibold font-mono">
                0 → 800 Track
              </span>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">Zero-to-Hero Math</h3>
            <p className="text-xs text-[var(--text-muted)] mb-5 leading-relaxed">
              Build rock-solid mathematical foundations from scratch using visual balance scales, Cartesian models, and 10s Desmos bypasses.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[var(--border-main)]">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[var(--text-muted)]">Projected Math:</span>
              <span className="font-bold text-[var(--accent-blue)]">
                {stats?.math?.projectedScore ?? 200} / 800
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-[var(--text-muted)] font-mono">
              <span>{stats?.math?.attempted > 0 ? `${stats.math.correct}/${stats.math.attempted} correct (${stats.math.accuracy}%)` : "No attempts yet"}</span>
              <span>Baseline: 200</span>
            </div>
            <div className="w-full bg-[var(--bg-surface)] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[var(--accent-blue)] h-2 rounded-full transition-all"
                style={{
                  width: `${stats ? Math.min(100, Math.max(0, ((stats.math.projectedScore - 200) / 600) * 100)) : 0}%`,
                }}
              ></div>
            </div>
            <Link
              href="/math"
              className="flex items-center justify-between text-xs font-semibold text-[var(--accent-blue)] hover:translate-x-1 transition-transform pt-1"
            >
              <span>Practice Math ({stats?.math?.total || 118}+ Questions)</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Verbal IELTS 7.5 Accelerator Card */}
        <div className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col justify-between hover:border-[var(--accent-blue)]/40 transition-all duration-200 shadow-[var(--shadow-sm)] card-hover">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] flex items-center justify-center font-bold">
                <BookOpen size={22} />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] font-semibold font-mono">
                780+ Verbal
              </span>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">Verbal Accelerator</h3>
            <p className="text-xs text-[var(--text-muted)] mb-5 leading-relaxed">
              Targeted high-yield focus: eliminate subtle SAT trap answers in logical transitions, sentence boundary conventions, and rhetorical synthesis.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[var(--border-main)]">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[var(--text-muted)]">Projected Verbal:</span>
              <span className="font-bold text-[var(--accent-blue)]">
                {stats?.verbal?.projectedScore ?? 200} / 800
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-[var(--text-muted)] font-mono">
              <span>{stats?.verbal?.attempted > 0 ? `${stats.verbal.correct}/${stats.verbal.attempted} correct (${stats.verbal.accuracy}%)` : "0 attempts • Official 200 baseline"}</span>
              <span>Baseline: 200</span>
            </div>
            <div className="w-full bg-[var(--bg-surface)] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[var(--accent-blue)] h-2 rounded-full transition-all"
                style={{
                  width: `${stats ? Math.min(100, Math.max(0, ((stats.verbal.projectedScore - 200) / 600) * 100)) : 0}%`,
                }}
              ></div>
            </div>
            <Link
              href="/verbal"
              className="flex items-center justify-between text-xs font-semibold text-[var(--accent-blue)] hover:translate-x-1 transition-transform pt-1"
            >
              <span>Practice Verbal ({stats?.verbal?.total || 94}+ Questions)</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Spaced Repetition Card */}
        <div className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col justify-between hover:border-[var(--accent-blue)]/40 transition-all duration-200 shadow-[var(--shadow-sm)] card-hover">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Repeat size={22} />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold font-mono">
                SM-2 Engine
              </span>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">AI Error Log & Recall</h3>
            <p className="text-xs text-[var(--text-muted)] mb-5 leading-relaxed">
              Missed problems are scheduled at optimal memory consolidation intervals (24h, 72h, 7 days) to achieve permanent retention.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[var(--border-main)]">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">Due For Review Today:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {stats?.dueReviewsCount || 0} questions
              </span>
            </div>
            <div className="w-full bg-[var(--bg-surface)] rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-2 rounded-full"
                style={{ width: `${stats?.dueReviewsCount ? 100 : 0}%` }}
              ></div>
            </div>
            <Link
              href="/error-log"
              className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400 hover:translate-x-1 transition-transform pt-1"
            >
              <span>Open Error Log Queue</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Domain Readiness Diagnostic Grid */}
      <div className="p-7 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[var(--accent-blue)] uppercase tracking-wider font-mono">
              Diagnostics & Telemetry
            </span>
            <h3 className="text-xl font-black text-[var(--text-main)] tracking-tight mt-1">
              8-Domain Competency Matrix
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Live breakdown of questions attempted, mastered, and remaining across all Digital SAT testing domains.
            </p>
          </div>

          <Link
            href="/curriculum"
            className="text-xs font-semibold text-[var(--accent-blue)] hover:underline flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>View 28-Topic Map</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-4">
          {/* Math Domains */}
          {(stats?.math?.domains || []).map((d: any) => {
            const attempted = d.attempted || 0;
            const pct = attempted > 0 ? Math.round((d.correct / attempted) * 100) : 0;
            return (
              <div
                key={d.domain}
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-mono">
                      MATH
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--text-main)]">
                      {d.correct}/{attempted} Correct
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[var(--text-main)] truncate" title={d.domain}>
                    {d.domain}
                  </h4>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono block mt-0.5">
                    {d.total} Questions in Bank
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-[var(--border-main)] space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[var(--text-muted)]">Accuracy:</span>
                    <span className={`font-bold ${pct >= 80 ? "text-emerald-500" : pct > 0 ? "text-[var(--accent-blue)]" : "text-[var(--text-muted)]"}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full bg-[var(--bg-card)] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[var(--accent-blue)] h-1.5 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Verbal Domains */}
          {(stats?.verbal?.domains || []).map((d: any) => {
            const attempted = d.attempted || 0;
            const pct = attempted > 0 ? Math.round((d.correct / attempted) * 100) : 0;
            return (
              <div
                key={d.domain}
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-mono">
                      VERBAL
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--text-main)]">
                      {d.correct}/{attempted} Correct
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[var(--text-main)] truncate" title={d.domain}>
                    {d.domain}
                  </h4>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono block mt-0.5">
                    {d.total} Questions in Bank
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-[var(--border-main)] space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-[var(--text-muted)]">Accuracy:</span>
                    <span className={`font-bold ${pct >= 80 ? "text-emerald-500" : pct > 0 ? "text-[var(--accent-blue)]" : "text-[var(--text-muted)]"}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full bg-[var(--bg-card)] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[var(--accent-blue)] h-1.5 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* YouTube / 800-Scorer Speedrun Masterclass Section */}
      <div className="p-7 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Zap size={14} /> 800-Scorer Masterclass Playbook
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              Top YouTube & Tutor Strategies
            </span>
          </div>
          <h3 className="text-xl font-black text-[var(--text-main)] tracking-tight">
            Game-Changing Digital SAT Speedrun Shortcuts
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
            Proven bypass heuristics taught by leading SAT tutors (PrepPros, Tutorllini, Scalar Learning) to save 15+ minutes per section and avoid College Board traps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
          {masterclassHacks.map((hack, idx) => {
            const isSelected = activeStrategy === idx;
            return (
              <div
                key={hack.title}
                onClick={() => setActiveStrategy(isSelected ? null : idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--bg-surface)] border-[var(--accent-blue)] shadow-sm"
                    : "bg-[var(--bg-surface)]/60 border-[var(--border-main)] hover:border-[var(--accent-blue)]/40 hover:bg-[var(--bg-surface)]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono">
                    {hack.badge}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    {hack.tag}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[var(--text-main)] mb-1 flex items-center justify-between">
                  <span>{hack.title}</span>
                  {isSelected ? <ChevronUp size={16} className="text-[var(--accent-blue)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                </h4>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
                  {hack.summary}
                </p>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-[var(--border-main)] space-y-2 text-xs animate-in fade-in duration-200">
                    <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-[11px] leading-relaxed text-[var(--text-main)] font-mono">
                      <strong className="text-[var(--accent-blue)] block font-sans mb-1 font-bold">Execution Blueprint:</strong>
                      {hack.strategy}
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono">
                      <strong>Exam Proof: </strong>{hack.example}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Materials Provenance Vault Accordion */}
      <div className="p-6 md:p-7 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setMaterialsOpen(!materialsOpen)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] shrink-0">
              <Layers size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
                <span>Integrated Study Materials Vault ({materialsList.length} Primary PDF Sources & Books)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-mono">
                  100% Indexed
                </span>
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                All {stats?.totalBankQuestions || stats?.totalQuestions || 1847}+ practice problems, {stats?.totalMockExams || 9} full-length adaptive mock exam forms, formula cheat-sheets, and 16 visual models are synthesized from the Vespera Masterclass Curriculum and all {materialsList.length} indexed primary textbooks and authoritative references.
              </p>
            </div>
          </div>

          <button className="p-2 rounded-xl bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)] transition-colors">
            {materialsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {materialsOpen && (
          <div className="mt-5 pt-5 border-t border-[var(--border-main)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 items-start gap-3 animate-in fade-in duration-200">
            {materialsList.map((m) => (
              <a
                key={m.name}
                href={`/materials/${encodeURIComponent(m.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/50 transition-all text-xs flex flex-col justify-between group shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-mono">
                    {m.type}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono flex items-center gap-1 group-hover:text-[var(--accent-blue)]">
                    <span>{m.pages} pgs</span>
                    <ExternalLink size={10} />
                  </span>
                </div>
                <span className="font-bold text-[var(--text-main)] text-xs truncate group-hover:text-[var(--accent-blue)] transition-colors" title={m.name}>
                  {m.name}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono mt-1">
                  Target: {m.topic}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Visual Intuition Hub on Dashboard */}
      <div className="space-y-4 pt-4">
        <div>
          <span className="text-xs font-bold text-[var(--accent-blue)] uppercase tracking-wider font-mono">
            Conceptual Visual Laboratory
          </span>
          <h2 className="text-2xl font-bold text-[var(--text-main)] tracking-tight mt-1">
            First-Principles Geometric & Verbal Derivations (16 Research Models)
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Publication-grade College Board reference models with interactive parameter sandboxes and 10s Desmos bypasses.
          </p>
        </div>
        <VisualTopicDiagram topicType="slope_intercept" />
      </div>

      {/* 5-Min Diagnostic Placement Test Modal */}
      <DiagnosticPlacementModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        onCompleted={() => {
          // Refresh recommendations and stats
          fetch("/api/stats").then((r) => r.json()).then((d) => setStats(d));
          fetch("/api/recommendations").then((r) => r.json()).then((d) => setRecommendations(d));
        }}
      />
    </div>
  );
}
