"use client";

import React, { useState } from "react";
import {
  Target,
  Calculator,
  BookOpen,
  Award,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  X,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import VesperaLogo from "./VesperaLogo";

export default function OnboardingModal() {
  const { user, isOnboardingOpen, closeOnboarding, updateProfile } = useAuth();
  useBodyScrollLock(isOnboardingOpen);

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Form State initialized from user profile or sensible defaults
  const [targetSatScore, setTargetSatScore] = useState<number>(user?.targetSatScore || 1550);
  const [mathLevel, setMathLevel] = useState<string>(user?.mathLevel || "intermediate");
  const [englishLevel, setEnglishLevel] = useState<string>(user?.englishLevel || "intermediate");
  const [ieltsScore, setIeltsScore] = useState<string>(user?.ieltsScore || "7.5");
  const [hasIelts, setHasIelts] = useState<boolean>(Boolean(user?.ieltsScore));
  const [currentSatScore, setCurrentSatScore] = useState<string>(
    user?.currentSatScore ? String(user.currentSatScore) : ""
  );
  const [hasPriorSat, setHasPriorSat] = useState<boolean>(Boolean(user?.currentSatScore));
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(user?.dailyGoalMinutes || 45);
  const [examDate, setExamDate] = useState<string>(user?.examDate || "August 2026");
  const [priorityWeakness, setPriorityWeakness] = useState<string>(
    user?.priorityWeakness || "Math 0 to 800 & Desmos Speed Lab"
  );

  if (!isOnboardingOpen) return null;

  const handleFinish = async () => {
    setSubmitting(true);
    try {
      await updateProfile({
        targetSatScore,
        mathLevel,
        englishLevel,
        ieltsScore: hasIelts ? ieltsScore.trim() : null,
        currentSatScore: hasPriorSat && currentSatScore ? parseInt(currentSatScore, 10) : null,
        dailyGoalMinutes,
        examDate,
        priorityWeakness,
        onboardingCompleted: true,
      });
      closeOnboarding();
    } catch (err) {
      console.error("Failed to complete onboarding:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl shadow-2xl p-6 sm:p-9 my-auto transition-all animate-scale-up">
        {/* Close Button */}
        <button
          onClick={closeOnboarding}
          className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-main)] transition-colors"
          title="Skip or Close"
        >
          <X size={18} />
        </button>

        {/* Progress Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[var(--border-main)] mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 shadow-sm">
              <VesperaLogo size={28} />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-blue)]">
                Personalized Onboarding • Step {step} of 4
              </span>
              <h2 className="text-base sm:text-lg font-black text-[var(--text-main)]">
                {step === 1 && "Define Your Target SAT Benchmark"}
                {step === 2 && "Self-Assess Your Math & Verbal Strengths"}
                {step === 3 && "Standardized Test Baseline (Optional)"}
                {step === 4 && "Daily Study Commitment & Priorities"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-7 h-1.5 rounded-full transition-all ${
                  step === i
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 w-9"
                    : step > i
                    ? "bg-emerald-500"
                    : "bg-[var(--border-main)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Target Score & Exam Window */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                <Target size={16} className="text-[var(--accent-blue)]" />
                <span>What is your ultimate SAT Composite Score Goal?</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { score: 1400, label: "Competitive", rank: "Top 7%" },
                  { score: 1500, label: "Ivy League Tier", rank: "Top 2%" },
                  { score: 1550, label: "Elite Scholar", rank: "Top 1% (Recommended)" },
                  { score: 1600, label: "Perfect Score", rank: "Top 0.1%" },
                ].map((item) => (
                  <button
                    key={item.score}
                    type="button"
                    onClick={() => setTargetSatScore(item.score)}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-1.5 ${
                      targetSatScore === item.score
                        ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] text-[var(--accent-blue)] shadow-md ring-2 ring-[var(--accent-blue)]/20"
                        : "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-muted)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <span className="text-xl font-black font-mono text-[var(--text-main)]">
                      {item.score}+
                    </span>
                    <span className="text-xs font-semibold">{item.label}</span>
                    <span className="text-[10px] font-mono text-[var(--accent-green)] font-bold">
                      {item.rank}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                <Calendar size={16} className="text-indigo-500" />
                <span>When are you planning to sit for the official Digital SAT?</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  "May 2026",
                  "June 2026",
                  "August 2026",
                  "October 2026",
                  "November 2026",
                  "December 2026",
                ].map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setExamDate(date)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      examDate === date
                        ? "bg-indigo-500/15 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-mono shadow-sm"
                        : "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Math & English Proficiency */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                <Calculator size={16} className="text-[var(--accent-blue)]" />
                <span>Your Math Proficiency Level</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: "beginner",
                    title: "Beginner",
                    desc: "Need core formulas, basic arithmetic, and terminology in Uzbek/English.",
                  },
                  {
                    id: "intermediate",
                    title: "Intermediate",
                    desc: "Know standard algebra; struggle with high-speed pacing & quadratic vertices.",
                  },
                  {
                    id: "advanced",
                    title: "Advanced (650 - 730)",
                    desc: "Strong fundamentals; need circle geometry and hard nonlinear systems.",
                  },
                  {
                    id: "target_800",
                    title: "Target 800 Elite",
                    desc: "Flawless score target; focus exclusively on 8-second Desmos hacks & Module 2 traps.",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMathLevel(item.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      mathLevel === item.id
                        ? "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)] shadow-sm ring-1 ring-[var(--accent-blue)]"
                        : "bg-[var(--bg-surface)] border-[var(--border-main)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[var(--text-main)]">{item.title}</span>
                      {mathLevel === item.id && (
                        <CheckCircle2 size={14} className="text-[var(--accent-blue)]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                <BookOpen size={16} className="text-emerald-500" />
                <span>Your Reading & Writing Proficiency Level</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: "beginner",
                    title: "Foundations",
                    desc: "Grammar conventions & clause boundaries need review.",
                  },
                  {
                    id: "intermediate",
                    title: "Intermediate",
                    desc: "Strong comprehension; need speed on transitions & vocabulary.",
                  },
                  {
                    id: "advanced",
                    title: "Advanced (700+)",
                    desc: "Aiming for perfection on poetry inference & rhetorical synthesis.",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEnglishLevel(item.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      englishLevel === item.id
                        ? "bg-emerald-500/10 border-emerald-500 shadow-sm ring-1 ring-emerald-500"
                        : "bg-[var(--bg-surface)] border-[var(--border-main)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[var(--text-main)]">{item.title}</span>
                      {englishLevel === item.id && (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Prior Standardized Test Baseline (Optional) */}
        {step === 3 && (
          <div className="space-y-6">
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              If you have previously taken IELTS or SAT, entering your score allows Vespera to
              calculate your exact score trajectory and pinpoint whether Math or Verbal needs higher
              weekly focus. Both are completely optional.
            </p>

            {/* IELTS Score */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                  <Award size={16} className="text-purple-500" />
                  <span>Do you have an IELTS score?</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHasIelts(false)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      !hasIelts
                        ? "bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-main)] shadow-sm"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    Not taken yet
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasIelts(true)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      hasIelts
                        ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 shadow-sm"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    Yes, I have
                  </button>
                </div>
              </div>

              {hasIelts && (
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {["6.5", "7.0", "7.5", "8.0", "8.5", "9.0"].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setIeltsScore(score)}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all ${
                        ieltsScore === score
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                      }`}
                    >
                      Band {score}
                    </button>
                  ))}
                  <input
                    type="text"
                    placeholder="Custom (e.g. 7.5)"
                    value={ieltsScore}
                    onChange={(e) => setIeltsScore(e.target.value)}
                    className="w-32 px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs text-[var(--text-main)] font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}
            </div>

            {/* Previous SAT Score */}
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                  <Target size={16} className="text-amber-500" />
                  <span>Have you taken the Digital SAT before?</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHasPriorSat(false)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      !hasPriorSat
                        ? "bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-main)] shadow-sm"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    First time
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasPriorSat(true)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      hasPriorSat
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-sm"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    Yes, I have
                  </button>
                </div>
              </div>

              {hasPriorSat && (
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {["1150", "1250", "1350", "1420", "1490"].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setCurrentSatScore(score)}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all ${
                        currentSatScore === score
                          ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                          : "bg-[var(--bg-card)] border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="e.g. 1380"
                    min={400}
                    max={1600}
                    value={currentSatScore}
                    onChange={(e) => setCurrentSatScore(e.target.value)}
                    className="w-32 px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs text-[var(--text-main)] font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Daily Commitment & Priority Focus */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                <Clock size={16} className="text-blue-500" />
                <span>Daily Practice Commitment</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    minutes: 20,
                    label: "Steady Pacing",
                    desc: "10-15 targeted drill questions daily. Great for busy schedules.",
                  },
                  {
                    minutes: 45,
                    label: "Optimal Mastery",
                    desc: "25 questions + AI error recall. Recommended for 1550+ goal.",
                  },
                  {
                    minutes: 90,
                    label: "Intensive Sprint",
                    desc: "50 questions + deep Desmos speed drills. Rapid score jump.",
                  },
                ].map((item) => (
                  <button
                    key={item.minutes}
                    type="button"
                    onClick={() => setDailyGoalMinutes(item.minutes)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      dailyGoalMinutes === item.minutes
                        ? "bg-blue-500/10 border-blue-500 shadow-sm ring-1 ring-blue-500"
                        : "bg-[var(--bg-surface)] border-[var(--border-main)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-extrabold font-mono text-[var(--text-main)]">
                        {item.minutes} min/day
                      </span>
                      {dailyGoalMinutes === item.minutes && (
                        <CheckCircle2 size={14} className="text-blue-500" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-[var(--accent-blue)] block mb-1">
                      {item.label}
                    </span>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
                <Zap size={16} className="text-amber-500" />
                <span>Your Top Priority Area to Conquer</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "Math 0 to 800 & Desmos Speed Lab",
                  "Hard Module 2 Traps & Circle Geometry",
                  "Reading Transitions & Boundaries (Verbal 5-Sec Kill)",
                  "Comprehensive Balanced All-Round Mastery",
                ].map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setPriorityWeakness(area)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                      priorityWeakness === area
                        ? "bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm"
                        : "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="mt-8 pt-5 border-t border-[var(--border-main)] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-main)] flex items-center gap-2 transition-all shadow-sm"
            >
              <ArrowLeft size={15} />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20"
            >
              <span>Continue</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting}
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Personalizing Platform...</span>
                </span>
              ) : (
                <>
                  <span>Complete & Launch Dashboard</span>
                  <Sparkles size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
