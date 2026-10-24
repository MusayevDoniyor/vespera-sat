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
} from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  country: string;
  score: number;
  solved: number;
  streak: number;
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"GLOBAL" | "UZBEKISTAN">("GLOBAL");
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, [user]);

  const globalLeaders: LeaderboardEntry[] = [
    { rank: 1, name: "Azizbek Rakhmatov", country: "Uzbekistan", score: 1590, solved: 1812, streak: 42 },
    { rank: 2, name: "David Kim", country: "United States", score: 1580, solved: 1750, streak: 35 },
    { rank: 3, name: "Malika Yusupova", country: "Uzbekistan", score: 1570, solved: 1680, streak: 28 },
    { rank: 4, name: "Arjun Sharma", country: "India", score: 1560, solved: 1610, streak: 31 },
    { rank: 5, name: "Javokhir Aliev", country: "Uzbekistan", score: 1560, solved: 1590, streak: 21 },
    { rank: 6, name: "Sophie Chen", country: "Canada", score: 1550, solved: 1530, streak: 19 },
    { rank: 7, name: "Bekzod Karimov", country: "Uzbekistan", score: 1550, solved: 1490, streak: 24 },
    { rank: 8, name: "Lucas Müller", country: "Germany", score: 1540, solved: 1420, streak: 15 },
    { rank: 9, name: "Dilnoza Khasanova", country: "Uzbekistan", score: 1540, solved: 1390, streak: 18 },
    { rank: 10, name: "Ethan Wright", country: "United States", score: 1530, solved: 1350, streak: 14 },
  ];

  const uzbekistanLeaders: LeaderboardEntry[] = [
    { rank: 1, name: "Azizbek Rakhmatov", country: "Tashkent", score: 1590, solved: 1812, streak: 42 },
    { rank: 2, name: "Malika Yusupova", country: "Samarkand", score: 1570, solved: 1680, streak: 28 },
    { rank: 3, name: "Javokhir Aliev", country: "Tashkent", score: 1560, solved: 1590, streak: 21 },
    { rank: 4, name: "Bekzod Karimov", country: "Bukhara", score: 1550, solved: 1490, streak: 24 },
    { rank: 5, name: "Dilnoza Khasanova", country: "Fergana", score: 1540, solved: 1390, streak: 18 },
    { rank: 6, name: "Shakhzod Tursunov", country: "Namangan", score: 1530, solved: 1320, streak: 16 },
    { rank: 7, name: "Madina Umarova", country: "Tashkent", score: 1520, solved: 1280, streak: 22 },
    { rank: 8, name: "Otabek Mirzayev", country: "Andijan", score: 1510, solved: 1240, streak: 12 },
    { rank: 9, name: "Farrukh Nabiyev", country: "Navoiy", score: 1500, solved: 1190, streak: 14 },
    { rank: 10, name: "Sevara Karimova", country: "Khorezm", score: 1490, solved: 1150, streak: 17 },
  ];

  const currentList = activeTab === "GLOBAL" ? globalLeaders : uzbekistanLeaders;

  const userRankGlobal = stats?.globalRank || 128;
  const userRankCountry = stats?.countryRank || 43;
  const displayRank = activeTab === "GLOBAL" ? userRankGlobal : userRankCountry;

  return (
    <div className="w-full space-y-8 pb-16 animate-fade-in max-w-6xl mx-auto">
      {/* 1. Header & Live Contest Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-[var(--bg-card)] to-blue-500/10 border border-[var(--border-main)] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono">
              <Trophy size={13} className="text-amber-500" />
              <span>LIVE SAT COMPETITION & RANKINGS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-main)] tracking-tight">
              Contest Leaderboards
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl">
              Track your standing across global and national test-takers. Solve questions and take full mock exams to climb the leaderboard!
            </p>
          </div>

          {/* Weekly Sprint Card */}
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2.5 max-w-sm shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                Upcoming Contest
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono">
                Free Entry
              </span>
            </div>
            <div className="text-xs font-bold text-[var(--text-main)]">
              Vespera SAT Sprint #14: 1550+ Mastery Cup
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)] font-mono">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                This Saturday
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                2h 14m
              </span>
            </div>
            <Link
              href="/mock"
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold text-center block shadow-xs transition-transform active:scale-95"
            >
              Prepare for Contest
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
                {user ? user.fullName : "Your Profile"}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono">
                {user ? "Registered Candidate" : "Guest"}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Solved: <strong>{stats?.totalSolved || 0}</strong> questions • Composite Score:{" "}
              <strong>{stats?.compositeScore || 900}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] font-mono block">
              {activeTab === "GLOBAL" ? "Global Rank" : "Uzbekistan Rank"}
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
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "GLOBAL"
                ? "bg-[var(--accent-blue)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <Globe size={14} />
            <span>Global Standings</span>
          </button>
          <button
            onClick={() => setActiveTab("UZBEKISTAN")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "UZBEKISTAN"
                ? "bg-[var(--accent-blue)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            <MapPin size={14} />
            <span>Uzbekistan Top 50</span>
          </button>
        </div>

        <div className="text-xs text-[var(--text-muted)] font-mono">
          Updated in real-time based on verified practice & mock attempts
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
              {currentList.map((leader) => {
                const isTop3 = leader.rank <= 3;
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
                    key={leader.rank}
                    className="hover:bg-[var(--bg-surface)]/60 transition-colors"
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
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs font-mono shadow-2xs">
                          {leader.name.charAt(0)}
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-[var(--text-main)]">
                          {leader.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-[var(--text-muted)] font-medium">
                      {leader.country}
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
