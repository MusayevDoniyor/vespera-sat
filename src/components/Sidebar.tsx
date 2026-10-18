"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Calculator,
  BookOpen,
  Sparkles,
  Repeat,
  FileCheck2,
  GitBranch,
  Flame,
  Award,
  PanelLeftClose,
  PanelLeftOpen,
  GraduationCap,
  LogIn,
  LogOut,
  Sliders,
  User,
} from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "./AuthContext";
import VesperaLogo from "./VesperaLogo";

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user, openAuthModal, openOnboarding, logout } = useAuth();
  const [realStreak, setRealStreak] = useState<number>(0);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.realStreak !== undefined) {
          setRealStreak(data.realStreak);
        }
      })
      .catch(() => {});
  }, [user]);

  interface NavItem {
    label: string;
    subtitle: string;
    href: string;
    icon: any;
    badge?: string;
    badgeColor?: string;
    matchSubpaths?: boolean;
  }

  interface NavGroup {
    title: string;
    stepNumber?: string;
    items: NavItem[];
  }

  const navGroups: NavGroup[] = [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          subtitle: "Target score & stats",
          href: "/",
          icon: Compass,
        },
      ],
    },
    {
      title: "1. Learn Theory",
      stepNumber: "Step 1",
      items: [
        {
          label: "13 Units Textbook",
          subtitle: "Theory, lessons & quizzes",
          href: "/curriculum",
          icon: BookOpen,
          badge: "13 Units",
          badgeColor: "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
          matchSubpaths: true,
        },
        {
          label: "Desmos Speed Lab",
          subtitle: "Graphing bypass hacks",
          href: "/desmos",
          icon: Sparkles,
          badge: "Desmos",
          badgeColor: "bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
        },
      ],
    },
    {
      title: "2. Practice Bank",
      stepNumber: "Step 2",
      items: [
        {
          label: "Math Question Bank",
          subtitle: "0 → 800 adaptive drills",
          href: "/math",
          icon: Calculator,
          badge: "Math",
          badgeColor: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
        },
        {
          label: "Reading & Writing Bank",
          subtitle: "Grammar & vocabulary",
          href: "/verbal",
          icon: GraduationCap,
          badge: "Verbal",
          badgeColor: "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
        },
      ],
    },
    {
      title: "3. Full Simulation",
      stepNumber: "Step 3",
      items: [
        {
          label: "Bluebook Simulator",
          subtitle: "134-min adaptive mock test",
          href: "/mock",
          icon: FileCheck2,
          badge: "Exam",
          badgeColor: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        },
      ],
    },
    {
      title: "4. Review & Vault",
      stepNumber: "Step 4",
      items: [
        {
          label: "AI Error Notebook",
          subtitle: "Review mistake traps",
          href: "/error-log",
          icon: Repeat,
          badge: "Review",
          badgeColor: "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
        },
        {
          label: "41 Prep Books Vault",
          subtitle: "Free offline PDFs & guides",
          href: "/satashkent",
          icon: Award,
          badge: "41 Books",
          badgeColor: "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
        },
      ],
    },
  ];

  return (
    <aside
      className={`h-screen max-h-screen sticky top-0 overflow-hidden bg-[var(--bg-card)] border-r border-[var(--border-main)] flex flex-col justify-between py-5 select-none shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-30 shadow-[var(--shadow-xs)] ${
        isCollapsed ? "w-20 px-3" : "w-72 px-4"
      }`}
    >
      <div className="flex-1 flex flex-col justify-start overflow-y-auto scrollbar-none space-y-4">
        {/* Header & Brand with Collapse Toggle */}
        <div className="flex items-center justify-between px-2">
          {!isCollapsed ? (
            <>
              <Link href="/" className="flex items-center gap-3 px-1 group min-w-0">
                <VesperaLogo size={36} className="shrink-0 group-hover:scale-105 transition-transform" />
                <div className="min-w-0 truncate">
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-sm font-extrabold text-[var(--text-main)] tracking-wider truncate">
                      VESPERA
                    </h1>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 font-mono shrink-0">
                      SAT
                    </span>
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] font-medium truncate">
                    Autonomous Suite
                  </p>
                </div>
              </Link>

              <button
                onClick={toggleSidebar}
                title="Collapse Sidebar (Ctrl+B)"
                className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-main)] transition-colors shrink-0"
              >
                <PanelLeftClose size={17} />
              </button>
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-2">
              <Link
                href="/"
                title="Vespera SAT"
                className="p-1 rounded-2xl hover:bg-[var(--bg-surface)] transition-all flex items-center justify-center"
              >
                <VesperaLogo size={34} />
              </Link>
              <button
                onClick={toggleSidebar}
                title="Expand Sidebar (Ctrl+B)"
                className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-main)] transition-colors mt-1"
              >
                <PanelLeftOpen size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Sections Organized by Study Phase */}
        <div className="space-y-4 pt-1">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!isCollapsed ? (
                <div className="flex items-center justify-between px-3 pt-1.5 pb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    {group.title}
                  </span>
                  {group.stepNumber && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                      {group.stepNumber}
                    </span>
                  )}
                </div>
              ) : (
                <div className="h-px bg-[var(--border-main)] my-2 mx-1 opacity-50" />
              )}

              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.matchSubpaths
                    ? pathname === item.href || pathname.startsWith(`${item.href}/`)
                    : pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={isCollapsed ? `${item.label} • ${item.subtitle}` : undefined}
                      className={`flex items-center rounded-xl transition-all duration-150 ${
                        isCollapsed
                          ? "w-11 h-11 mx-auto justify-center"
                          : "gap-2.5 px-2.5 py-2"
                      } ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 shadow-xs"
                          : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border border-transparent"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <Icon size={15} />
                      </div>

                      {!isCollapsed && (
                        <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                          <div className="min-w-0">
                            <span className="text-xs font-bold block truncate leading-tight">
                              {item.label}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate leading-tight font-medium">
                              {item.subtitle}
                            </span>
                          </div>
                          {item.badge && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border font-mono shrink-0 select-none ${
                                item.badgeColor ||
                                "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Refined Student Profile & Target Pill */}
      <div className="pt-4 border-t border-[var(--border-main)] shrink-0">
        {!isCollapsed ? (
          user ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xs font-mono shadow-sm shrink-0">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 truncate">
                    <span className="text-xs font-bold text-[var(--text-main)] block truncate">
                      {user.fullName}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] block font-mono truncate">
                      {user.ieltsScore
                        ? `IELTS ${user.ieltsScore}`
                        : user.currentSatScore
                        ? `SAT ${user.currentSatScore}`
                        : `${user.mathLevel.replace("_", " ").toUpperCase()}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={openOnboarding}
                    title="Customize SAT Goals & Level"
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-colors"
                  >
                    <Sliders size={14} />
                  </button>
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div
                  onClick={openOnboarding}
                  className="px-3 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-center justify-between text-xs flex-1 cursor-pointer hover:border-[var(--border-hover)] transition-all group"
                  title="Click to adjust target score"
                >
                  <span className="text-[var(--text-muted)] font-medium flex items-center gap-1.5 truncate">
                    <Award size={13} className="text-emerald-500 shrink-0" />
                    Target
                  </span>
                  <span className="font-extrabold text-[var(--accent-green)] font-mono group-hover:scale-105 transition-transform">
                    {user.targetSatScore || 1550}+
                  </span>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-600 dark:text-amber-400 font-mono shrink-0">
                  <Flame size={13} className="fill-current text-amber-500" />
                  <span>{realStreak > 0 ? `${realStreak}d` : "1d"}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <Link
                href="/register"
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
              >
                <LogIn size={14} />
                <span>Sign In / Register</span>
              </Link>
              <div className="flex items-center justify-between px-1 text-[11px] text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  Guest Mode
                </span>
                <span className="font-mono text-[var(--accent-green)] font-bold">1550+ Goal</span>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center gap-2">
            {user ? (
              <button
                onClick={openOnboarding}
                title={`${user.fullName} • Goal: ${user.targetSatScore || 1550}+ • Click to edit profile`}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xs font-mono shadow-sm hover:scale-105 transition-transform"
              >
                {user.fullName.charAt(0).toUpperCase()}
              </button>
            ) : (
              <Link
                href="/login"
                title="Sign In / Register to Vespera"
                className="w-9 h-9 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent-blue)]/15 text-[var(--text-muted)] hover:text-[var(--accent-blue)] flex items-center justify-center border border-[var(--border-main)] transition-all"
              >
                <LogIn size={15} />
              </Link>
            )}
            <div
              title={`${realStreak > 0 ? realStreak : 1} Day Streak`}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 cursor-pointer"
            >
              <Flame size={13} className="fill-current" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
