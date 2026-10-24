"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import {
  Trophy,
  Flame,
  Award,
  Globe,
  MapPin,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  User,
  CheckCircle2,
  Filter,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface LeaderboardCandidate {
  rank: number;
  id: string;
  name: string;
  email: string;
  country: string;
  city: string;
  score: number;
  solved: number;
  correct: number;
  streak: number;
  targetScore: number;
  isCurrentUser: boolean;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"GLOBAL" | "UZBEKISTAN">("GLOBAL");
  const [candidates, setCandidates] = useState<LeaderboardCandidate[]>([]);
  const [totalCandidates, setTotalCandidates] = useState<number>(0);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Fetch user stats
  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, [user]);

  // 2. Fetch authentic database leaderboard
  useEffect(() => {
    setLoading(true);
    const url = activeTab === "UZBEKISTAN" ? "/api/leaderboard?region=UZBEKISTAN" : "/api/leaderboard";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data.leaderboard || []);
        setTotalCandidates(data.totalCandidates || (data.leaderboard ? data.leaderboard.length : 0));
        if (data.currentUserRank) {
          setCurrentUserRank(data.currentUserRank);
        }
      })
      .catch((err) => console.error("Error loading leaderboard:", err))
      .finally(() => setLoading(false));
  }, [activeTab, user]);

  const displayRank =
    activeTab === "GLOBAL"
      ? (currentUserRank || stats?.globalRank || 1)
      : (currentUserRank || stats?.countryRank || 1);

  return (
    <div className="w-full space-y-8 pb-16 animate-fade-in max-w-6xl mx-auto">
      {/* 1. Header & Live Contest Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-[var(--bg-card)] to-blue-500/10 border border-[var(--border-main)] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono">
              <Trophy size={13} className="text-amber-500" />
              <span>AUTHENTIC SAT RANKINGS & TELEMETRY</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-main)] tracking-tight">
              Live Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl">
              Real-time standings computed directly from verified student practice questions and mock exam telemetry. Zero simulated data.
            </p>
          </div>

          {/* Weekly Sprint Card */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2.5 max-w-sm shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                Season 1 Open
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono">
                Live Now
              </span>
            </div>
            <div className="text-xs font-bold text-[var(--text-main)]">
              Vespera SAT Mastery Cup: Climb to 1550+
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Solve daily questions and complete full adaptive mock tests to boost your standing.
            </p>
            <Link
              href="/practice"
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold text-center block shadow-xs transition-transform active:scale-95"
            >
              Start Practice Session
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Current User Rank Banner */}
      <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg font-mono shrink-0 shadow-sm">
            {user ? user.fullName.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-[var(--text-main)]">
                {user ? user.fullName : "Your Standing"}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono">
                {user ? "Verified Candidate" : "Guest"}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Solved: <strong>{stats?.totalSolved || 0}</strong> questions • Projected / Mock Score:{" "}
              <strong>{stats?.compositeScore || stats?.userMockStats?.highest_score || 800}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] font-mono block">
              {activeTab === "GLOBAL" ? "Global Rank" : "National Rank"}
            </span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
              #{displayRank}
            </span>
          </div>
          <Link
            href="/profile"
            className="px-4 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-semibold text-[var(--text-main)] transition-all"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* 3. Filter Tabs (Global vs Uzbekistan) */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="inline-flex items-center p-1 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)]">
          <button
            onClick={() => setActiveTab("GLOBAL")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "GLOBAL"
                ? "bg-[var(--accent-blue)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Globe size={14} />
            <span>Global Standings ({totalCandidates})</span>
          </button>
          <button
            onClick={() => setActiveTab("UZBEKISTAN")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "UZBEKISTAN"
                ? "bg-[var(--accent-blue)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <MapPin size={14} />
            <span>Uzbekistan Candidates</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Real database telemetry • 0 simulated entries</span>
        </div>
      </div>

      {/* 4. Leaderboard Table */}
      <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-main)] text-[var(--text-muted)] font-mono bg-[var(--bg-surface)]/50">
                <th className="py-3 px-5 font-bold uppercase tracking-wider w-16 text-center">Rank</th>
                <th className="py-3 px-5 font-bold uppercase tracking-wider">Candidate</th>
                <th className="py-3 px-5 font-bold uppercase tracking-wider">
                  {activeTab === "GLOBAL" ? "Country" : "Region / City"}
                </th>
                <th className="py-3 px-5 font-bold uppercase tracking-wider text-center">Solved Qs</th>
                <th className="py-3 px-5 font-bold uppercase tracking-wider text-center">Streak</th>
                <th className="py-3 px-5 font-bold uppercase tracking-wider text-right">SAT Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-main)] text-[var(--text-main)]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[var(--text-muted)] font-mono">
                    <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
                    <p>Loading live candidate telemetry...</p>
                  </td>
                </tr>
              ) : candidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[var(--text-muted)] font-mono space-y-2">
                    <Trophy className="mx-auto text-amber-500 opacity-40" size={32} />
                    <p className="font-bold text-sm text-[var(--text-main)]">No candidates recorded yet</p>
                    <p className="text-xs">Solve practice questions to claim Rank #1!</p>
                  </td>
                </tr>
              ) : (
                candidates.map((leader) => {
                  const badgeColor =
                    leader.rank === 1
                      ? "bg-amber-500 text-white"
                      : leader.rank === 2
                      ? "bg-slate-300 text-slate-800"
                      : leader.rank === 3
                      ? "bg-amber-700 text-white"
                      : "bg-[var(--bg-surface)] text-[var(--text-muted)]";

                  return (
                    <tr
                      key={leader.id || leader.rank}
                      className={`transition-colors ${
                        leader.isCurrentUser
                          ? "bg-blue-500/10 hover:bg-blue-500/15 font-semibold"
                          : "hover:bg-[var(--bg-surface)]/60"
                      }`}
                    >
                      <td className="py-4 px-5 text-center">
                        <span
                          className={`w-7 h-7 rounded-xl font-bold font-mono inline-flex items-center justify-center text-xs shadow-2xs ${badgeColor}`}
                        >
                          {leader.rank}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs font-mono shadow-2xs shrink-0">
                            {leader.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm text-[var(--text-main)]">
                              {leader.name}
                            </span>
                            {leader.isCurrentUser && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white font-mono">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-[var(--text-muted)] font-medium">
                        {activeTab === "GLOBAL" ? leader.country : leader.city || leader.country}
                      </td>
                      <td className="py-4 px-5 text-center font-mono font-semibold">
                        {leader.solved}
                      </td>
                      <td className="py-4 px-5 text-center font-mono">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[11px]">
                          <Flame size={12} className="fill-current text-amber-500" />
                          {leader.streak}d
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">
                        {leader.score}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Early Season Notice */}
      <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <Zap size={15} className="text-amber-500 shrink-0" />
          <span>
            Rankings recalibrate dynamically with every question answered, accuracy percentage, and full mock score.
          </span>
        </div>
        <Link
          href="/mock"
          className="text-blue-600 dark:text-blue-400 font-bold hover:underline shrink-0"
        >
          Take Full Mock Exam →
        </Link>
      </div>
    </div>
  );
}
