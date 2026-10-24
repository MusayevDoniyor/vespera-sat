"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import { loadVocabProgress } from "@/lib/vocab-storage";
import TelegramPurchaseModal from "@/components/TelegramPurchaseModal";
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
  CreditCard,
  Lock,
  Globe,
  MapPin,
  Bookmark,
  MessageSquare,
  Send,
  Upload,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
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

interface FeedbackReportItem {
  id: string;
  type: string;
  question_id?: string;
  title: string;
  description: string;
  image_url?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

export default function ProfilePage() {
  const { user, openOnboarding, openAuthModal, updateProfile } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [subData, setSubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);

  // Saved Content Counters
  const [savedWordsCount, setSavedWordsCount] = useState<number>(0);
  const [savedQuestionsCount, setSavedQuestionsCount] = useState<number>(0);

  // Filters for recent activity
  const [sectionFilter, setSectionFilter] = useState<"ALL" | "MATH" | "READING_WRITING">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "CORRECT" | "INCORRECT">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Study Goals Form State
  const [targetScore, setTargetScore] = useState<number>(1550);
  const [examDate, setExamDate] = useState<string>("");
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState<number>(120);
  const [weeklyGoalHours, setWeeklyGoalHours] = useState<number>(12);
  const [preferredTime, setPreferredTime] = useState<string>("Evening");
  const [isSavingGoals, setIsSavingGoals] = useState(false);
  const [goalsSavedMsg, setGoalsSavedMsg] = useState(false);

  // Learning Preferences State
  const [practiceMode, setPracticeMode] = useState<string>("timed");
  const [difficultyMode, setDifficultyMode] = useState<string>("adaptive");
  const [showDesmos, setShowDesmos] = useState<boolean>(true);
  const [showAiExplanations, setShowAiExplanations] = useState<boolean>(true);
  const [includeVocabReview, setIncludeVocabReview] = useState<boolean>(true);
  const [prefsSavedMsg, setPrefsSavedMsg] = useState(false);

  // Password Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Feedback & Support State
  const [feedbackTab, setFeedbackTab] = useState<"SUBMIT" | "MY_REPORTS">("SUBMIT");
  const [feedbackType, setFeedbackType] = useState<string>("GENERAL");
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackDesc, setFeedbackDesc] = useState("");
  const [feedbackImage, setFeedbackImage] = useState("");
  const [feedbackReports, setFeedbackReports] = useState<FeedbackReportItem[]>([]);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmittedMsg, setFeedbackSubmittedMsg] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch main stats
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

    // 2. Fetch subscription status
    fetch("/api/subscription")
      .then((res) => res.json())
      .then((data) => {
        if (data?.subscription) setSubData(data.subscription);
      })
      .catch(() => {});

    // 3. Fetch past feedback reports
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        if (data?.reports) setFeedbackReports(data.reports);
      })
      .catch(() => {});

    // 4. Calculate local saved content
    try {
      const vocabData = loadVocabProgress();
      const starredOrLearning = Object.values(vocabData).filter(
        (w) => w.starred || w.status === "learning" || w.status === "mastered"
      ).length;
      setSavedWordsCount(starredOrLearning);

      const bookmarksRaw = localStorage.getItem("vespera_bookmarks");
      if (bookmarksRaw) {
        const arr = JSON.parse(bookmarksRaw);
        if (Array.isArray(arr)) setSavedQuestionsCount(arr.length);
      }
    } catch {}
  }, [user]);

  // Sync user values into forms when user loads
  useEffect(() => {
    if (user) {
      setTargetScore(user.targetSatScore || 1550);
      setExamDate(user.examDate || "");
      setDailyGoalMinutes(user.dailyGoalMinutes || 120);
      setWeeklyGoalHours(user.weeklyGoalHours || 12);
      setPreferredTime(user.preferredStudyTime || "Evening");
      setPracticeMode(user.practiceMode || "timed");
      setDifficultyMode(user.difficultyMode || "adaptive");
      setShowDesmos(user.showDesmos !== false);
      setShowAiExplanations(user.showAiExplanations !== false);
      setIncludeVocabReview(user.includeVocabReview !== false);
    }
  }, [user]);

  // Save Study Goals
  const handleSaveGoals = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal("register");
      return;
    }
    setIsSavingGoals(true);
    setGoalsSavedMsg(false);
    await updateProfile({
      targetSatScore: targetScore,
      examDate: examDate || null,
      dailyGoalMinutes,
      weeklyGoalHours,
      preferredStudyTime: preferredTime,
    });
    setIsSavingGoals(false);
    setGoalsSavedMsg(true);
    setTimeout(() => setGoalsSavedMsg(false), 3000);
  };

  // Toggle Learning Preferences with instant save
  const handlePreferenceChange = async (key: string, value: any) => {
    if (key === "practiceMode") setPracticeMode(value);
    if (key === "difficultyMode") setDifficultyMode(value);
    if (key === "showDesmos") setShowDesmos(value);
    if (key === "showAiExplanations") setShowAiExplanations(value);
    if (key === "includeVocabReview") setIncludeVocabReview(value);

    if (user) {
      setPrefsSavedMsg(true);
      await updateProfile({ [key]: value });
      setTimeout(() => setPrefsSavedMsg(false), 2000);
    }
  };

  // Save / Set Password
  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal("register");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ text: "Password must be at least 6 characters.", error: true });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: "New passwords do not match.", error: true });
      return;
    }

    setIsSavingPassword(true);
    setPasswordMsg(null);
    try {
      const res = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordMsg({ text: data.message || "Password updated successfully!", error: false });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMsg({ text: data.error || "Failed to update password.", error: true });
      }
    } catch (err: any) {
      setPasswordMsg({ text: err.message || "Network error.", error: true });
    } finally {
      setIsSavingPassword(false);
    }
  };

  // Submit Feedback / Question Flag
  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackTitle.trim() || !feedbackDesc.trim()) return;

    setIsSubmittingFeedback(true);
    setFeedbackSubmittedMsg(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: feedbackType,
          title: feedbackTitle,
          description: feedbackDesc,
          imageUrl: feedbackImage || null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedbackSubmittedMsg("Thank you! Your feedback has been submitted.");
        setFeedbackTitle("");
        setFeedbackDesc("");
        setFeedbackImage("");
        // Reload feedback reports list
        fetch("/api/feedback")
          .then((r) => r.json())
          .then((d) => {
            if (d?.reports) setFeedbackReports(d.reports);
          });
      } else {
        setFeedbackSubmittedMsg(data.error || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      setFeedbackSubmittedMsg(err.message || "Network error.");
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

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

  if (loading) {
    return (
      <div className="w-full space-y-8 pb-16 animate-fade-in max-w-7xl mx-auto">
        <ProfileSkeleton />
      </div>
    );
  }

  const isPro = subData?.isPro || subData?.plan === "PRO";

  return (
    <div className="w-full space-y-8 pb-20 animate-fade-in max-w-7xl mx-auto">
      {/* 1. Profile Hero & Core Quick Stats */}
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
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full font-mono ${
                    isPro
                      ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                  }`}
                >
                  {isPro ? "PRO ACTIVE ⚡" : "FREE TIER"}
                </span>
                {user?.priorityWeakness && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    Focus: {user.priorityWeakness}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-mono">
                {user?.email || "Sign in to permanently safeguard your data & sync across devices"}
              </p>
              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] pt-1 flex-wrap font-medium">
                <span className="flex items-center gap-1.5">
                  <Flame size={14} className="text-amber-500 fill-amber-500" />
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
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-emerald-500" />
                  Daily Goal:{" "}
                  <strong className="text-[var(--text-main)] font-mono">
                    {Math.round((user?.dailyGoalMinutes || 120) / 60)} Hours
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Score Goals & Upgrade CTA */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Target size={20} />
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

            {!isPro ? (
              <button
                onClick={() => setIsTelegramModalOpen(true)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Upgrade to Pro ($4.99)</span>
              </button>
            ) : (
              <Link
                href="/subscription"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all duration-150 active:scale-95"
              >
                <Sparkles size={14} />
                <span>Manage Pro Subscription</span>
              </Link>
            )}
          </div>
        </div>

        {/* 4 Stat Badges (Streak, Tests, Solved, Vocab) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[var(--border-main)]">
          <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] font-mono block">
              Streak
            </span>
            <div className="flex items-center gap-1.5">
              <Flame size={16} className="text-amber-500 fill-amber-500" />
              <span className="text-lg font-black text-[var(--text-main)] font-mono">
                {stats?.realStreak || 1} Days
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] font-mono block">
              Tests
            </span>
            <div className="flex items-center gap-1.5">
              <FileCheck2 size={16} className="text-blue-500" />
              <span className="text-lg font-black text-[var(--text-main)] font-mono">
                {stats?.userMockStats?.total_exams || 0} Taken
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] font-mono block">
              Solved
            </span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span className="text-lg font-black text-[var(--text-main)] font-mono">
                {stats?.totalSolved || 0} Qs
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1">
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] font-mono block">
              Vocab
            </span>
            <div className="flex items-center gap-1.5">
              <BrainCircuit size={16} className="text-purple-500" />
              <span className="text-lg font-black text-[var(--text-main)] font-mono">
                {savedWordsCount} Words
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Performance Snapshot & Country Rankings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/leaderboard"
          className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-blue-500/40 space-y-2 shadow-2xs card-interactive group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono flex items-center gap-1.5">
              <Globe size={14} className="text-blue-500" />
              Global Standing
            </span>
            <ArrowUpRight
              size={15}
              className="text-[var(--text-muted)] group-hover:text-blue-500 transition-colors"
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[var(--text-main)] font-mono">
              #{stats?.globalRank || 128}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              out of 14,200 candidates worldwide
            </span>
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
            Top 2.5% global tier • Click to view full leaderboard
          </p>
        </Link>

        <Link
          href="/leaderboard"
          className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-amber-500/40 space-y-2 shadow-2xs card-interactive group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono flex items-center gap-1.5">
              <MapPin size={14} className="text-amber-500" />
              Country Rank (Uzbekistan)
            </span>
            <ArrowUpRight
              size={15}
              className="text-[var(--text-muted)] group-hover:text-amber-500 transition-colors"
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
              #{stats?.countryRank || 43}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              out of 3,180 national scholars
            </span>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
            Qualified for Vespera SAT Sprint #14 Prize Contest
          </p>
        </Link>
      </div>

      {/* 3. Subscription & Credits Usage Widget (Inspired by TopTierPrep but Generous!) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-[var(--accent-blue)]" />
              <h2 className="text-lg font-bold text-[var(--text-main)]">
                Subscription & Plan Credits
              </h2>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Track your monthly allowances, test limits, and daily tool usage
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full font-mono ${
                isPro
                  ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              }`}
            >
              {isPro ? "PRO ACTIVE" : "FREE ACTIVE"}
            </span>
            <Link
              href="/subscription"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono"
            >
              <span>Compare monthly plan limits</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono block">
              Full Exams / Mo
            </span>
            <span className="text-lg font-black text-[var(--text-main)] font-mono">
              {isPro ? "Unlimited" : `${subData?.firstTimeExamsUsed || 0} / 5`}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] block font-mono">
              {isPro ? "Full access" : `${Math.max(0, 5 - (subData?.firstTimeExamsUsed || 0))} exams left`}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono block">
              Retake Credits
            </span>
            <span className="text-lg font-black text-[var(--text-main)] font-mono">
              {isPro ? "Unlimited" : `${subData?.retakeCreditsUsed || 0} / 5`}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] block font-mono">
              {isPro ? "Full access" : `${Math.max(0, 5 - (subData?.retakeCreditsUsed || 0))} credits left`}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono block">
              Question Bank
            </span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
              1,847 / 1,847
            </span>
            <span className="text-[10px] text-emerald-500 block font-mono font-bold">
              100% Unlimited
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono block">
              New Words Today
            </span>
            <span className="text-lg font-black text-[var(--text-main)] font-mono">
              {isPro ? "Unlimited" : `${subData?.vocabWordsToday || 0} / 15`}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] block font-mono">
              {isPro ? "Full studio" : "15 new words/day"}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono block">
              Daily AI Tutor
            </span>
            <span className="text-lg font-black text-[var(--text-main)] font-mono">
              {isPro ? "Unlimited" : `${subData?.aiQueriesToday || 0} / 20`}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] block font-mono">
              {isPro ? "Gemini 1.5 Pro" : "20 queries/day"}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Saved Content Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
          <Bookmark size={18} className="text-amber-500" />
          <span>Saved Content Hub</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/vocab"
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-purple-500/40 space-y-2 card-interactive shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                Saved Words
              </span>
              <BrainCircuit size={16} className="text-purple-500" />
            </div>
            <div className="text-2xl font-black text-[var(--text-main)] font-mono">
              {savedWordsCount}
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Vocab flashcards actively practicing via SM-2
            </p>
          </Link>

          <Link
            href="/error-log"
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-rose-500/40 space-y-2 card-interactive shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                Redo Questions
              </span>
              <RotateCcw size={16} className="text-rose-500" />
            </div>
            <div className="text-2xl font-black text-[var(--text-main)] font-mono">
              {stats?.redoQuestionsCount || stats?.dueReviewsCount || 0}
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Mistakes scheduled for active recall review
            </p>
          </Link>

          <Link
            href="/math"
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-blue-500/40 space-y-2 card-interactive shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                Saved Questions
              </span>
              <Bookmark size={16} className="text-blue-500" />
            </div>
            <div className="text-2xl font-black text-[var(--text-main)] font-mono">
              {savedQuestionsCount || stats?.savedQuestionsCount || 0}
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Bookmarked challenging questions to revisit
            </p>
          </Link>
        </div>
      </div>

      {/* 5. Account Information & Password Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Details & Google Connection */}
        <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
            <h3 className="font-bold text-base text-[var(--text-main)] flex items-center gap-2">
              <Shield size={18} className="text-blue-500" />
              <span>Account Credentials</span>
            </h3>
            <span className="text-xs font-mono text-[var(--text-muted)]">OAuth & Identity</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[var(--text-muted)] block mb-1 font-mono">
                Full Name
              </label>
              <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs font-semibold text-[var(--text-main)]">
                {user?.fullName || "Not set yet"}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--text-muted)] block mb-1 font-mono">
                Email Address
              </label>
              <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs font-mono text-[var(--text-main)]">
                {user?.email || "guest@vespera.edu"}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  G
                </div>
                <div>
                  <div className="text-xs font-bold text-[var(--text-main)]">Google Authentication</div>
                  <div className="text-[10px] text-[var(--text-muted)] font-mono">
                    Google account connected & verified
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono">
                Connected
              </span>
            </div>
          </div>
        </div>

        {/* Set / Change Password */}
        <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
            <h3 className="font-bold text-base text-[var(--text-main)] flex items-center gap-2">
              <Lock size={18} className="text-indigo-500" />
              <span>Password Security</span>
            </h3>
            <span className="text-xs font-mono text-[var(--text-muted)]">Direct Login</span>
          </div>

          <form onSubmit={handleSavePassword} className="space-y-3.5">
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              You can set or update your password to allow direct email/password login in addition to Google Sign-In.
            </p>

            <div>
              <label className="text-[11px] font-bold text-[var(--text-muted)] block mb-1 font-mono">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] outline-none focus:border-[var(--accent-blue)]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[var(--text-muted)] block mb-1 font-mono">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] outline-none focus:border-[var(--accent-blue)]"
              />
            </div>

            {passwordMsg && (
              <div
                className={`text-xs p-2.5 rounded-xl font-medium ${
                  passwordMsg.error
                    ? "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                    : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                }`}
              >
                {passwordMsg.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSavingPassword || !newPassword}
              className="w-full py-2.5 rounded-xl bg-[var(--accent-blue)] hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50"
            >
              {isSavingPassword ? "Saving Password..." : "Save Password"}
            </button>
          </form>
        </div>
      </div>

      {/* 6. Study Goals & Targets */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
          <div>
            <h3 className="font-bold text-base text-[var(--text-main)] flex items-center gap-2">
              <Target size={18} className="text-emerald-500" />
              <span>Study Goals & Diagnostics</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Customize your target score, exam dates, and daily study schedule
            </p>
          </div>

          {goalsSavedMsg && (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 font-mono">
              <Check size={14} />
              Goals Saved!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveGoals} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="text-xs font-bold text-[var(--text-muted)] block mb-1 font-mono">
              Target SAT Score
            </label>
            <input
              type="number"
              min={800}
              max={1600}
              step={10}
              value={targetScore}
              onChange={(e) => setTargetScore(parseInt(e.target.value, 10))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-main)] font-mono outline-none focus:border-[var(--accent-blue)]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--text-muted)] block mb-1 font-mono">
              Target Exam Date
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] font-mono outline-none focus:border-[var(--accent-blue)]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--text-muted)] block mb-1 font-mono">
              Daily Goal
            </label>
            <select
              value={dailyGoalMinutes}
              onChange={(e) => setDailyGoalMinutes(parseInt(e.target.value, 10))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] outline-none focus:border-[var(--accent-blue)] cursor-pointer"
            >
              <option value={45}>45 Minutes</option>
              <option value={60}>1 Hour</option>
              <option value={90}>1.5 Hours</option>
              <option value={120}>2 Hours (Recommended)</option>
              <option value={180}>3 Hours (Intensive)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--text-muted)] block mb-1 font-mono">
              Weekly Goal
            </label>
            <select
              value={weeklyGoalHours}
              onChange={(e) => setWeeklyGoalHours(parseInt(e.target.value, 10))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] outline-none focus:border-[var(--accent-blue)] cursor-pointer"
            >
              <option value={6}>6 Hours / Week</option>
              <option value={10}>10 Hours / Week</option>
              <option value={12}>12 Hours / Week (Standard)</option>
              <option value={18}>18 Hours / Week (High Yield)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--text-muted)] block mb-1 font-mono">
              Preferred Study Time
            </label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] outline-none focus:border-[var(--accent-blue)] cursor-pointer"
            >
              <option value="Morning">Morning (6 AM - 12 PM)</option>
              <option value="Afternoon">Afternoon (12 PM - 6 PM)</option>
              <option value="Evening">Evening (6 PM - 11 PM)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isSavingGoals}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs active:scale-95 disabled:opacity-60"
            >
              {isSavingGoals ? "Saving..." : "Update Study Goals"}
            </button>
          </div>
        </form>
      </div>

      {/* 7. Learning Preferences Toggles */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)]">
          <div>
            <h3 className="font-bold text-base text-[var(--text-main)] flex items-center gap-2">
              <Sliders size={18} className="text-purple-500" />
              <span>Learning & Testing Preferences</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Personalize test timers, Desmos calculator visibility, and AI explanations
            </p>
          </div>

          {prefsSavedMsg && (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 font-mono animate-fade-in">
              <Check size={14} />
              Saved!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Practice Mode */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-main)]">Practice Mode</span>
              <span className="text-[10px] font-bold text-blue-500 font-mono uppercase">
                {practiceMode}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Enforce strict College Board question timers or untimed deep learning.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => handlePreferenceChange("practiceMode", "timed")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  practiceMode === "timed"
                    ? "bg-[var(--accent-blue)] text-white shadow-2xs"
                    : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-main)]"
                }`}
              >
                Timed
              </button>
              <button
                type="button"
                onClick={() => handlePreferenceChange("practiceMode", "untimed")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  practiceMode === "untimed"
                    ? "bg-[var(--accent-blue)] text-white shadow-2xs"
                    : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-main)]"
                }`}
              >
                Untimed
              </button>
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-main)]">Difficulty Level</span>
              <span className="text-[10px] font-bold text-purple-500 font-mono uppercase">
                {difficultyMode}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Adaptive dynamic difficulty or focus exclusively on 700+ Hard items.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => handlePreferenceChange("difficultyMode", "adaptive")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  difficultyMode === "adaptive"
                    ? "bg-purple-600 text-white shadow-2xs"
                    : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-main)]"
                }`}
              >
                Adaptive
              </button>
              <button
                type="button"
                onClick={() => handlePreferenceChange("difficultyMode", "hard_only")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  difficultyMode === "hard_only"
                    ? "bg-purple-600 text-white shadow-2xs"
                    : "bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-main)]"
                }`}
              >
                Hard Only
              </button>
            </div>
          </div>

          {/* Desmos Calculator */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-main)]">Desmos Calculator</span>
              <button
                type="button"
                onClick={() => handlePreferenceChange("showDesmos", !showDesmos)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  showDesmos ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    showDesmos ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              {showDesmos ? "Desmos quick toggle always visible" : "Desmos collapsed by default"}
            </p>
          </div>

          {/* AI Explanations */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-main)]">AI Socratic Explanations</span>
              <button
                type="button"
                onClick={() => handlePreferenceChange("showAiExplanations", !showAiExplanations)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  showAiExplanations ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    showAiExplanations ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              {showAiExplanations ? "Automatically available on answers" : "On-demand click only"}
            </p>
          </div>

          {/* Vocab Review in Practice */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-main)]">Include Vocab Review</span>
              <button
                type="button"
                onClick={() => handlePreferenceChange("includeVocabReview", !includeVocabReview)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                  includeVocabReview ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    includeVocabReview ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              {includeVocabReview ? "Include SM-2 words in daily widgets" : "Disabled"}
            </p>
          </div>
        </div>
      </div>

      {/* 8. Domain Mastery Breakdown & Difficulty */}
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

      {/* 9. Feedback, Support & Question Flagging (Directly from TopTier spec) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[var(--border-main)]">
          <div>
            <h3 className="font-bold text-base text-[var(--text-main)] flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-500" />
              <span>Feedback & Candidate Support</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Report a bug, flag a question for review, or share a feature request
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
            <button
              onClick={() => setFeedbackTab("SUBMIT")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                feedbackTab === "SUBMIT"
                  ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              Submit Ticket
            </button>
            <button
              onClick={() => setFeedbackTab("MY_REPORTS")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                feedbackTab === "MY_REPORTS"
                  ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-2xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <span>My Reports</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-600 font-mono">
                {feedbackReports.length}
              </span>
            </button>
          </div>
        </div>

        {feedbackTab === "SUBMIT" ? (
          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            {feedbackSubmittedMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{feedbackSubmittedMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { type: "GENERAL", label: "General Feedback" },
                { type: "QUESTION_FLAG", label: "Flag a Question" },
                { type: "BUG", label: "Report a Bug" },
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setFeedbackType(item.type)}
                  className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    feedbackType === item.type
                      ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]"
                      : "border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-muted)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-[var(--text-muted)] font-mono">
                  Short summary of your feedback
                </label>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  {feedbackTitle.length}/200
                </span>
              </div>
              <input
                type="text"
                maxLength={200}
                value={feedbackTitle}
                onChange={(e) => setFeedbackTitle(e.target.value)}
                placeholder="e.g. Question q_cb120_p39 explanation typo or Desmos formula tip..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] outline-none focus:border-[var(--accent-blue)]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-bold text-[var(--text-muted)] font-mono">
                  Describe your feedback in detail
                </label>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  {feedbackDesc.length}/5000
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={5000}
                value={feedbackDesc}
                onChange={(e) => setFeedbackDesc(e.target.value)}
                placeholder="Describe your feedback, expected behavior, or suggest an improvement..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] outline-none focus:border-[var(--accent-blue)] resize-y"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-[var(--text-muted)] font-mono">
                JPEG, PNG, WebP or GIF — screenshot proof supported
              </span>
              <button
                type="submit"
                disabled={isSubmittingFeedback || !feedbackTitle.trim() || !feedbackDesc.trim()}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                <Send size={14} />
                <span>{isSubmittingFeedback ? "Submitting..." : "Submit Report"}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            {feedbackReports.length > 0 ? (
              feedbackReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-main)]">{report.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        report.status === "RESOLVED"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono pt-1">
                    <span>Type: {report.type}</span>
                    <span>{new Date(report.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[var(--text-muted)]">
                No past feedback reports submitted yet.
              </div>
            )}
          </div>
        )}
      </div>

      {/* 10. Recently Solved Questions Log */}
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
              Practice questions from the Math or Reading & Writing banks to start building your real-time performance history!
            </p>
          </div>
        )}
      </div>

      <TelegramPurchaseModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
        user={user}
      />
    </div>
  );
}
