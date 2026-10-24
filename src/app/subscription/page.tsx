"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Shield,
  HelpCircle,
  ArrowRight,
  Clock,
  BookOpen,
  Award,
  Flame,
  BrainCircuit,
  FileCheck2,
  Lock,
  ChevronDown,
  RefreshCw,
  Gift,
  CheckCircle2,
} from "lucide-react";
import TelegramPurchaseModal from "@/components/TelegramPurchaseModal";

export default function SubscriptionPage() {
  const { user, openAuthModal } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "QUARTERLY">("MONTHLY");
  const [subData, setSubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);

  useEffect(() => {
    fetchSub();
  }, [user]);

  const fetchSub = async () => {
    try {
      const res = await fetch("/api/subscription");
      const data = await res.json();
      if (data?.subscription) {
        setSubData(data.subscription);
      }
    } catch (err) {
      console.error("Failed to load subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanAction = async (targetPlan: "PRO" | "FREE") => {
    if (!user) {
      openAuthModal("register");
      return;
    }

    setIsUpgrading(true);
    setActionMessage(null);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: targetPlan === "PRO" ? "UPGRADE_PRO" : "DOWNGRADE_FREE",
          billingCycle,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(data.message);
        await fetchSub();
      } else {
        setActionMessage(data.error || "Failed to update subscription.");
      }
    } catch (err: any) {
      setActionMessage(err.message || "Network error. Please try again.");
    } finally {
      setIsUpgrading(false);
    }
  };

  const isPro = subData?.isPro || subData?.plan === "PRO";

  const faqs = [
    {
      q: "Why is Vespera so much more affordable than TopTierPrep ($4.99 vs $14–$24)?",
      a: "TopTierPrep charges $13.99 to $23.99/month while locking free users to only 1 mock exam and 0 custom questions. Vespera is an open-access, AI-first mission built for Central Asian and global students. Our lean cloud architecture on Neon and Gemini 1.5 Pro allows us to offer 5 full exams free every month, and complete unlimited Pro for just $4.99/mo (approx. 55,000 UZS).",
    },
    {
      q: "What happens if I use all 5 free mock exams this month?",
      a: "Your mock exams quota resets automatically at the start of your next 30-day cycle. You can still practice all 1,847 Math & Verbal questions, read all 13 textbook units, and review your Error Notebook completely free without any limits.",
    },
    {
      q: "Can I cancel my Pro subscription anytime?",
      a: "Yes, absolutely! You can cancel anytime with 1 click directly from your dashboard or profile page. You keep full Pro access until the end of your billing cycle, and no further charges will occur.",
    },
    {
      q: "Which payment methods are supported?",
      a: "We support Visa, Mastercard, American Express, Apple Pay, Google Pay, as well as local Uzbekistan payment gateways (Click, Payme, UzCard, Humo). All transactions are encrypted via 256-bit bank-grade SSL.",
    },
    {
      q: "Will I lose my progress, bookmarks, or error notebook if I downgrade?",
      a: "Never! All your solved questions, SM-2 spaced repetition error logs, notes, and vocabulary cards remain 100% saved in your account forever.",
    },
  ];

  return (
    <div className="w-full space-y-10 pb-20 animate-fade-in max-w-6xl mx-auto">
      {/* 1. Page Header */}
      <div className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono">
          <Sparkles size={14} className="text-blue-500" />
          <span>TRANSPARENT & GENEROUS SAT PRICING</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-main)] tracking-tight">
          Supercharge Your SAT Score. <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Without Overpaying.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
          Unlike platforms that stingily lock you out, Vespera gives you 5 free full-length exams
          and all 1,847 official questions for $0. Unlock unlimited AI and mocks for just $4.99/mo.
        </p>

        {/* Billing Cycle Switcher */}
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-xs mt-3">
          <button
            onClick={() => setBillingCycle("MONTHLY")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              billingCycle === "MONTHLY"
                ? "bg-[var(--accent-blue)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("QUARTERLY")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              billingCycle === "QUARTERLY"
                ? "bg-[var(--accent-blue)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <span>3 Months</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-mono">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center justify-between gap-3 animate-fade-in max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-blue-500" />
            <span>{actionMessage}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 2. Current Plan Status & Monthly Quotas Tracker */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-surface)] to-[var(--bg-card)] border border-[var(--border-main)] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-main)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                Current Plan Status
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full font-mono ${
                  isPro
                    ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                }`}
              >
                {isPro ? "PRO CHAMPION ACTIVE ⚡" : "FREE TIER ACTIVE"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              {isPro
                ? "You have unlimited access to all adaptive mock exams, Gemini AI Socratic Tutor, and PDF vault."
                : "Your Free plan includes unlimited question bank access, 5 full exams monthly, and 20 daily AI queries."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/mock"
              className="px-4 py-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-main)] flex items-center gap-2 transition-all shadow-2xs"
            >
              <FileCheck2 size={14} />
              <span>Take Full Exam</span>
            </Link>
            {!isPro ? (
              <button
                onClick={() => setIsTelegramModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Upgrade via Telegram • $4.99</span>
              </button>
            ) : (
              <button
                onClick={() => handlePlanAction("FREE")}
                disabled={isUpgrading}
                className="px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-500 border border-[var(--border-main)] text-xs font-semibold transition-all cursor-pointer"
              >
                Manage / Downgrade
              </button>
            )}
          </div>
        </div>

        {/* Allowance Progress Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-6">
          {/* 1. First-time Exams */}
          <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2">
            <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono block truncate">
              Full Exams / Mo
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-[var(--text-main)] font-mono">
                {isPro ? "Unlimited" : `${subData?.firstTimeExamsUsed || 0} / 5`}
              </span>
              {!isPro && (
                <span className="text-[10px] text-emerald-500 font-mono font-bold">
                  {Math.max(0, 5 - (subData?.firstTimeExamsUsed || 0))} left
                </span>
              )}
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{
                  width: isPro
                    ? "100%"
                    : `${Math.min(100, ((subData?.firstTimeExamsUsed || 0) / 5) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* 2. Retake Credits */}
          <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2">
            <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono block truncate">
              Retake Credits / Mo
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-[var(--text-main)] font-mono">
                {isPro ? "Unlimited" : `${subData?.retakeCreditsUsed || 0} / 5`}
              </span>
              {!isPro && (
                <span className="text-[10px] text-blue-500 font-mono font-bold">
                  {Math.max(0, 5 - (subData?.retakeCreditsUsed || 0))} left
                </span>
              )}
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{
                  width: isPro
                    ? "100%"
                    : `${Math.min(100, ((subData?.retakeCreditsUsed || 0) / 5) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* 3. Official Question Bank */}
          <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2">
            <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono block truncate">
              Question Bank
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                1,847 / 1,847
              </span>
              <span className="text-[10px] text-emerald-500 font-mono font-bold">100% Free</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-full" />
            </div>
          </div>

          {/* 4. Daily AI Queries */}
          <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2">
            <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono block truncate">
              Daily AI Tutor
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-[var(--text-main)] font-mono">
                {isPro ? "Unlimited" : `${subData?.aiQueriesToday || 0} / 20`}
              </span>
              {!isPro && (
                <span className="text-[10px] text-purple-500 font-mono font-bold">
                  {Math.max(0, 20 - (subData?.aiQueriesToday || 0))} left
                </span>
              )}
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{
                  width: isPro
                    ? "100%"
                    : `${Math.min(100, ((subData?.aiQueriesToday || 0) / 20) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* 5. Daily Vocab Words */}
          <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2">
            <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono block truncate">
              New Vocab Words
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-[var(--text-main)] font-mono">
                {isPro ? "Unlimited" : `${subData?.vocabWordsToday || 0} / 15`}
              </span>
              {!isPro && (
                <span className="text-[10px] text-amber-500 font-mono font-bold">
                  {Math.max(0, 15 - (subData?.vocabWordsToday || 0))} left
                </span>
              )}
            </div>
            <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface)] overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{
                  width: isPro
                    ? "100%"
                    : `${Math.min(100, ((subData?.vocabWordsToday || 0) / 15) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Pricing Cards (Free vs Pro) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* FREE PLAN */}
        <div className="p-7 sm:p-9 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 flex flex-col justify-between shadow-2xs relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                Vespera Free Tier
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-500/10 text-[var(--text-muted)] font-mono">
                Free Forever
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[var(--text-main)] font-mono">
                $0
              </span>
              <span className="text-xs sm:text-sm text-[var(--text-muted)] font-mono">/ month</span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Generous, fully capable SAT prep. Includes complete question banks and realistic monthly exam quotas so no student is ever left behind.
            </p>

            <div className="pt-4 space-y-3 border-t border-[var(--border-main)]">
              {[
                "1,847 Official Math & Verbal Questions (Unlimited 100% Free)",
                "5 Full-Length Adaptive Bluebook Mock Exams every month",
                "5 Exam Retake Credits every month",
                "20 AI Socratic Copilot queries every day",
                "15 new SAT vocabulary words/day with SM-2 spaced repetition",
                "All 13 Khan Academy pedagogical textbook units",
                "Online access to all 61 SATashkent PDF repository books",
                "Weekly SAT sprint contests and Global/Country rankings",
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-main)]">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => !isPro ? {} : handlePlanAction("FREE")}
              disabled={!isPro || isUpgrading}
              className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all text-center ${
                !isPro
                  ? "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-main)] cursor-default"
                  : "bg-[var(--bg-surface)] hover:bg-slate-200 dark:hover:bg-slate-800 text-[var(--text-main)] border border-[var(--border-main)]"
              }`}
            >
              {!isPro ? "Current Active Plan" : "Switch to Free Tier"}
            </button>
          </div>
        </div>

        {/* PRO CHAMPION PLAN */}
        <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-blue-900/10 via-[var(--bg-card)] to-indigo-900/10 border-2 border-[var(--accent-blue)] space-y-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
          {/* Best Value Badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider py-1.5 px-5 rounded-bl-2xl font-mono shadow-sm">
            Most Popular • 75% Cheaper than TopTier
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                Vespera Pro Champion
              </span>
              <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[var(--text-main)] font-mono">
                {billingCycle === "MONTHLY" ? "$4.99" : "$3.99"}
              </span>
              <span className="text-xs sm:text-sm text-[var(--text-muted)] font-mono">
                / month {billingCycle === "QUARTERLY" && "(billed $11.99 / 3 mos)"}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Full unlimited access for high-achievers targeting 1550+. No limits on exams, AI explanations, or downloads.
            </p>

            <div className="pt-4 space-y-3 border-t border-[var(--border-main)]">
              {[
                "Everything in Free, plus:",
                "UNLIMITED Full-Length Adaptive Bluebook Mock Exams",
                "UNLIMITED Retake Credits on all past exam attempts",
                "UNLIMITED Gemini 1.5 Pro Socratic AI Tutor queries",
                "UNLIMITED SAT Vocab words + native audio pronunciation",
                "1-Click Offline PDF direct downloads for all 61 textbooks",
                "Predictive Score Interval Analytics (e.g. 1540–1580 range)",
                "All-access entry to cash & scholarship Prize Contests",
                "Priority 24/7 Question Flagging & Mentor review",
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-main)]">
                  <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span className={idx === 0 ? "font-bold text-[var(--text-main)]" : ""}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 space-y-2">
            <button
              onClick={() => isPro ? handlePlanAction("FREE") : setIsTelegramModalOpen(true)}
              disabled={isUpgrading}
              className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all text-center shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                isPro
                  ? "bg-emerald-600 text-white hover:bg-emerald-500"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white active:scale-95"
              }`}
            >
              {isUpgrading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : isPro ? (
                <>
                  <Check size={14} />
                  <span>Pro Plan Active (Click to Downgrade)</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Upgrade to Pro • Telegram Checkout</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-[var(--text-muted)] font-mono">
              Direct activation via Telegram admin • Click, Payme, Cards
            </p>
          </div>
        </div>
      </div>

      {/* 4. Comparison Table (Feature-by-Feature Matrix) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-main)]">
            Subscription Feature Comparison
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            See exactly what is included in Vespera Free vs Pro compared to traditional expensive prep platforms.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-main)] text-[var(--text-muted)] font-mono">
                <th className="py-3 px-4 font-bold uppercase tracking-wider">Feature</th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider text-center">Free Tier</th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider text-center text-blue-600 dark:text-blue-400">
                  Vespera Pro ($4.99)
                </th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider text-center text-slate-400">
                  TopTierPrep ($14–$24)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-main)] text-[var(--text-main)]">
              {[
                {
                  f: "College Board Official Question Bank",
                  free: "1,847 Qs (Unlimited)",
                  pro: "1,847 Qs (Unlimited)",
                  other: "Unlimited",
                },
                {
                  f: "Full-Length Adaptive Mock Exams",
                  free: "5 takes / month",
                  pro: "Unlimited",
                  other: "1 take / mo (Free) or 20 (Pro)",
                },
                {
                  f: "Exam Retake Credits",
                  free: "5 credits / month",
                  pro: "Unlimited",
                  other: "0 on Free (10 on Pro)",
                },
                {
                  f: "AI Socratic Copilot (Gemini 1.5 Pro)",
                  free: "20 queries / day",
                  pro: "Unlimited queries",
                  other: "Severely limited on Free",
                },
                {
                  f: "SAT Vocabulary Studio & SM-2 Flashcards",
                  free: "15 new words / day",
                  pro: "Unlimited + Audio",
                  other: "5 words / day",
                },
                {
                  f: "13 Khan Academy Textbook Units",
                  free: "Full Access",
                  pro: "Full Access",
                  other: "Not Available",
                },
                {
                  f: "Official SATashkent 61 PDF Vault",
                  free: "Full Online Reading",
                  pro: "Online + Offline Download",
                  other: "Not Available",
                },
                {
                  f: "Predictive Score Interval Analytics",
                  free: "Section Projected (200-800)",
                  pro: "Full Predictive Range",
                  other: "Elite Tier only ($23.99)",
                },
                {
                  f: "Price / Month",
                  free: "$0 Forever",
                  pro: "$4.99 / mo",
                  other: "$13.99 – $23.99 / mo",
                },
              ].map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[var(--bg-surface)]/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold">{row.f}</td>
                  <td className="py-3.5 px-4 text-center font-mono">{row.free}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                    {row.pro}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-[var(--text-muted)]">
                    {row.other}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Frequently Asked Questions Accordion */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
            <HelpCircle size={20} className="text-blue-500" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Have questions about billing, cancellations, or features? We're here to help.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-[var(--text-main)]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform duration-200 text-[var(--text-muted)] ${
                      isOpen ? "rotate-180 text-[var(--accent-blue)]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-main)] pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Security & Support Footer Note */}
      <div className="text-center text-xs text-[var(--text-muted)] space-y-2 pt-4 font-mono">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Lock size={12} className="text-emerald-500" />
            256-Bit SSL Encrypted Checkout
          </span>
          <span>•</span>
          <span>Pay via Visa, Mastercard, Click, or Payme</span>
          <span>•</span>
          <span>Instant 1-Click Cancellation</span>
        </div>
        <p>Vespera Education Technologies. Built for students worldwide.</p>
      </div>

      <TelegramPurchaseModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        billingCycle={billingCycle}
        user={user}
      />
    </div>
  );
}
