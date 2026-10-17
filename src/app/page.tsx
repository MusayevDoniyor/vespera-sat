"use client";

import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import VisualTopicDiagram from "@/components/VisualTopicDiagram";
import VesperaLogo from "@/components/VesperaLogo";
import { useAuth } from "@/components/AuthContext";

export default function DashboardPage() {
  const { user, openAuthModal, openOnboarding } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState<number | null>(0);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
        setLoading(false);
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

  // 25 Integrated Source Materials
  const materialsList = [
    { name: "1. Exponents and Radicals.pdf", topic: "ADV-01 / ADV-04", pages: 4, type: "College Panda" },
    { name: "2. Percent.pdf", topic: "DAT-02", pages: 6, type: "College Panda" },
    { name: "3. Exponential and Linear Growth.pdf", topic: "ADV-03", pages: 6, type: "College Panda" },
    { name: "4. Rates.pdf", topic: "DAT-01", pages: 6, type: "College Panda" },
    { name: "5. Ratio and Proportion.pdf", topic: "DAT-01", pages: 5, type: "College Panda" },
    { name: "6. Ratio and Proportions.pdf", topic: "DAT-01", pages: 4, type: "College Panda" },
    { name: "7. Constructing Models.pdf", topic: "ALG-01 / ALG-02", pages: 6, type: "College Panda" },
    { name: "8. Manipulating and Solving equations.pdf", topic: "ALG-01 / ADV-01", pages: 9, type: "College Panda" },
    { name: "9. More Equation Solving strategies.pdf", topic: "ALG-03", pages: 6, type: "College Panda" },
    { name: "10. Systems of Equations.pdf", topic: "ALG-03 / ADV-05", pages: 8, type: "College Panda" },
    { name: "11. Inequalities.pdf", topic: "ALG-04", pages: 6, type: "College Panda" },
    { name: "12. Word Problems.pdf", topic: "ALG-01 / ADV-02", pages: 7, type: "College Panda" },
    { name: "13. Min/Max Word Problems.pdf", topic: "ADV-02", pages: 7, type: "College Panda" },
    { name: "14. Lines.pdf", topic: "ALG-02", pages: 5, type: "College Panda" },
    { name: "15. Interpreting Linear Models.pdf", topic: "ALG-02 / DAT-04", pages: 6, type: "College Panda" },
    { name: "16. Functions.pdf", topic: "ADV-02 / ADV-03", pages: 9, type: "College Panda" },
    { name: "17. Quadratics.pdf", topic: "ADV-02", pages: 6, type: "College Panda" },
    { name: "18. Synthetic division.pdf", topic: "ADV-01", pages: 4, type: "College Panda" },
    { name: "19. Complex Numbers.pdf", topic: "ADV-01", pages: 3, type: "College Panda" },
    { name: "20. Absolute Value.pdf", topic: "ALG-01", pages: 5, type: "College Panda" },
    { name: "Trigonometric Identities.pdf", topic: "GEO-03", pages: 2, type: "Reference Handbook" },
    { name: "digital-sat-sample-questions.pdf", topic: "Full Exam Spec", pages: 19, type: "Official College Board" },
    { name: "SAT_October_2026_All_Version.pdf", topic: "Hard/Easy Modules", pages: 66, type: "Recent Test Bank" },
    { name: "Bluebook 4 official Digital SAT tests.pdf", topic: "Tests #1–4", pages: 440, type: "Official Bluebook" },
    { name: "OFFICIAL DIGITAL SAT BOOK.pdf", topic: "Complete Spec", pages: 440, type: "Official Bluebook" },
    // SAT Tashkent Official Curriculum Materials (14 Books)
    { name: "Gramilliy.pdf", topic: "ENG-BOU / ENG-AGR / 3x1 Tactics", pages: 58, type: "SAT Tashkent Grammar Bible" },
    { name: "SAT Math Cheat Sheet.pdf", topic: "ALG-01-04 / ADV-01-05 / GEO", pages: 6, type: "SAT Tashkent Formula Vault" },
    { name: "Vocabook 30.pdf", topic: "ENG-WIC (Vocabulary)", pages: 420, type: "SAT Tashkent Mega Vocab" },
    { name: "Math Hard Book.pdf", topic: "Target 800 Hard Math", pages: 96, type: "SAT Tashkent Hard Problems" },
    { name: "Math Hardbook 20.pdf", topic: "Target 800 (+130 Real Exam Qs)", pages: 125, type: "SAT Tashkent Hard Problems" },
    { name: "SAToplam Reading Book.pdf", topic: "ENG-CID / CDE / INF / WIC", pages: 555, type: "SAT Tashkent 846 Real Qs" },
    { name: "SAToplam Writing Book.pdf", topic: "ENG-BOU / AGR / TRA / SYN", pages: 344, type: "SAT Tashkent 973 Real Qs" },
    { name: "English Elite Book.pdf", topic: "Real Monthly Tests 2025-2026", pages: 85, type: "SAT Tashkent Exam Forms" },
    { name: "Atlas Agora writing.pdf", topic: "Rhetorical Writing Masterclass", pages: 79, type: "SAT Tashkent Agora Strategy" },
    { name: "SAT Mathbook 20.pdf", topic: "Real Exam Math Archive", pages: 384, type: "SAT Tashkent Real Exam Math" },
    { name: "Mathbook 30.pdf", topic: "Real Exam Math 2025-2026", pages: 133, type: "SAT Tashkent Real Exam Math" },
    { name: "SAT Math Problem Solving and Data Analysis Revision file.pdf", topic: "DAT-01-04 (149 Bluebook Sets)", pages: 149, type: "SAT Tashkent Data Revision" },
    { name: "SATakror.pdf", topic: "Multi-Version Real Exam Variants", pages: 103, type: "SAT Tashkent Variant Bank" },
    { name: "All in One.pdf", topic: "4-Stage Preparation Syllabus", pages: 5, type: "SAT Tashkent Master Roadmap" },
    { name: "facts-and-formulas-0.pdf", topic: "All Math Domains / Fast Formula Vault", pages: 6, type: "Erik the Red SAT Math" },
    { name: "jerry-phd-bobrowdale-ma-johnson-joe-ma-skinner-mastering-sat-math.pdf", topic: "Comprehensive SAT Math Bible (All Domains)", pages: 312, type: "Wiley SAT Math Guide" },
  ];

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
              <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-live-pulse"></span>
              Digital SAT Suite
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-main)] tracking-tight flex flex-wrap items-center gap-3">
              <span>{user ? `Welcome back, ${user.fullName}!` : "Welcome to Vespera"}</span>
              <span
                onClick={user ? openOnboarding : () => openAuthModal("register")}
                className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-mono font-bold tracking-wider uppercase cursor-pointer hover:opacity-90 transition-opacity"
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
                  Complete Digital SAT preparation with <strong className="text-[var(--text-main)]">212 authentic questions</strong>, 16 visual models, and Desmos speed hacks. Create an account to save your progress and customize your study plan.
                </>
              )}
            </p>

            {user ? (
              <div className="pt-1 flex items-center gap-3">
                <button
                  onClick={openOnboarding}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-main)] transition-colors shadow-sm"
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
              <div className="pt-1 flex items-center gap-3">
                <button
                  onClick={() => openAuthModal("register")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
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
                {stats ? (stats.compositeScore || (stats.math.projectedScore + stats.verbal.projectedScore)) : "400"}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] block font-mono mt-1">/ 1600 Points</span>
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
                {user?.targetSatScore && user.targetSatScore >= 1550 ? "Top 1% Rank" : "Competitive"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Telemetry & Inventory Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-[var(--shadow-sm)] card-hover">
          <span className="text-[11px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Question Bank
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[var(--text-main)]">
              {stats?.totalQuestions || 212}
            </span>
            <span className="text-xs font-semibold text-[var(--accent-blue)] font-mono">Problems</span>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] mt-1 block">
            {stats?.math ? `${stats.math.total || 118} Math • ${stats.verbal?.total || 94} Verbal` : "118 Math • 94 Verbal"}
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
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 font-mono">Topics</span>
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
            SATashkent + Panda + Bluebook + Bobrow
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
                  <span className="text-[10px] font-bold uppercase font-mono text-purple-600 dark:text-purple-400 block mb-1">
                    Step 1 • Terminology
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors">
                    Math Terminology Dictionary
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    Over 100 mathematical operations, arithmetic terms, and algebraic concepts translated into Uzbek.
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
                    Interactive drill questions with step-by-step bilingual explanations and Desmos verification.
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
                className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-purple-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase font-mono text-purple-600 dark:text-purple-400 block mb-1">
                    Hard Module 2 • Book 2.0
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--text-main)] group-hover:text-purple-500 transition-colors">
                    SATashkent Hard Book 2.0
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    The 145 most punishing 800-gatekeeper problems collected from real 2024-2025 Digital SAT administrations.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
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

      {/* SAT Tashkent Masterclass & 41-Book Archive Showcase Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-purple-500/10 via-[var(--bg-card)] to-[var(--accent-blue)]/10 border border-purple-500/25 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-mono uppercase">
              🇺🇿 Official SAT Tashkent Curriculum Hub
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              41 Textbooks • 1,819+ Real Questions • 420-Page Vocabook
            </span>
          </div>
          <h3 className="text-2xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-2.5">
            <GraduationCap className="text-purple-600 dark:text-purple-400" size={28} />
            <span>SAT Tashkent Masterclass Vault & Primary Archives</span>
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-2xl leading-relaxed">
            The national standard in SAT prep: Gramilliy grammar bible with 3x1 elimination tactics, 20 modular math textbooks, Vocabook 3.0 with interactive active-recall flashcards, and authentic real test questions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/satashkent"
            className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <span>Explore 41 Books & Studio</span>
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
        <div className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col justify-between hover:border-[var(--accent-purple)]/40 transition-all duration-200 shadow-[var(--shadow-sm)] card-hover">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <BookOpen size={22} />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold font-mono">
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
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {stats?.verbal?.projectedScore ?? 200} / 800
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-[var(--text-muted)] font-mono">
              <span>{stats?.verbal?.attempted > 0 ? `${stats.verbal.correct}/${stats.verbal.attempted} correct (${stats.verbal.accuracy}%)` : "0 attempts • Official 200 baseline"}</span>
              <span>Baseline: 200</span>
            </div>
            <div className="w-full bg-[var(--bg-surface)] rounded-full h-2 overflow-hidden">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{
                  width: `${stats ? Math.min(100, Math.max(0, ((stats.verbal.projectedScore - 200) / 600) * 100)) : 0}%`,
                }}
              ></div>
            </div>
            <Link
              href="/verbal"
              className="flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400 hover:translate-x-1 transition-transform pt-1"
            >
              <span>Practice Verbal ({stats?.verbal?.total || 94}+ Questions)</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Spaced Repetition Card */}
        <div className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col justify-between hover:border-[var(--accent-rose)]/40 transition-all duration-200 shadow-[var(--shadow-sm)] card-hover">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
                <Repeat size={22} />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500 font-semibold font-mono">
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
              <span className="font-bold text-rose-500">
                {stats?.dueReviewsCount || 0} questions
              </span>
            </div>
            <div className="w-full bg-[var(--bg-surface)] rounded-full h-2 overflow-hidden">
              <div
                className="bg-rose-500 h-2 rounded-full"
                style={{ width: `${stats?.dueReviewsCount ? 100 : 0}%` }}
              ></div>
            </div>
            <Link
              href="/error-log"
              className="flex items-center justify-between text-xs font-semibold text-rose-500 hover:translate-x-1 transition-transform pt-1"
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
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono">
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
                    <span className={`font-bold ${pct >= 80 ? "text-emerald-500" : pct > 0 ? "text-purple-600" : "text-[var(--text-muted)]"}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full bg-[var(--bg-card)] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-purple-600 h-1.5 rounded-full transition-all"
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
                <span>Integrated Study Materials Vault (41 Primary PDF Sources & Books)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono">
                  100% Indexed
                </span>
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                All {stats?.totalQuestions || 212}+ practice problems, 7 official Bluebook mock exam forms, formula cheat-sheets, and 16 visual models are synthesized from College Panda, Bluebook, October SAT, and all 41 primary SAT Tashkent textbooks and authoritative references.
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
                href={`/api/materials/${encodeURIComponent(m.name)}`}
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
    </div>
  );
}
