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

  const coreNav = [
    {
      label: "Dashboard",
      href: "/",
      icon: Compass,
    },
    {
      label: "SAT Math (0 → 800)",
      href: "/math",
      icon: Calculator,
    },
    {
      label: "Reading & Writing",
      href: "/verbal",
      icon: BookOpen,
    },
    {
      label: "Desmos Speed Lab",
      href: "/desmos",
      icon: Sparkles,
    },
  ];

  const practiceNav = [
    {
      label: "SAT Tashkent Vault",
      href: "/satashkent",
      icon: GraduationCap,
      badge: "41 Books",
    },
    {
      label: "Curriculum Map",
      href: "/curriculum",
      icon: GitBranch,
    },
    {
      label: "Error Log & Recall",
      href: "/error-log",
      icon: Repeat,
    },
    {
      label: "Bluebook Simulator",
      href: "/mock",
      icon: FileCheck2,
    },
  ];

  return (
    <aside
      className={`h-screen max-h-screen sticky top-0 overflow-hidden bg-[var(--bg-card)] border-r border-[var(--border-main)] flex flex-col justify-between py-5 select-none shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-30 shadow-[var(--shadow-xs)] ${
        isCollapsed ? "w-20 px-3" : "w-72 px-6"
      }`}
    >
      <div className="flex-1 flex flex-col justify-start overflow-y-auto scrollbar-none space-y-6">
        {/* Header & Brand with Collapse Toggle */}
        <div className="flex items-center justify-between">
          {!isCollapsed ? (
            <>
              <Link href="/" className="flex items-center gap-3 px-1 group min-w-0">
                <VesperaLogo size={38} className="shrink-0 group-hover:scale-105 transition-transform" />
                <div className="min-w-0 truncate">
                  <div className="flex items-center gap-1.5">
                    <h1 className="text-base font-extrabold text-[var(--text-main)] tracking-wider truncate">
                      VESPERA
                    </h1>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 font-mono shrink-0">
                      SAT
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] font-medium truncate">
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
                <VesperaLogo size={36} />
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

        {/* Navigation Sections */}
        <div className="space-y-6">
          {/* Core Navigation */}
          <div>
            {!isCollapsed ? (
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-3 mb-2.5 block font-mono opacity-70">
                Core Curriculum
              </span>
            ) : (
              <div className="h-px bg-[var(--border-main)] my-2 mx-1 opacity-60" />
            )}

            <nav className="space-y-1.5">
              {coreNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    className={`flex items-center rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                      isCollapsed
                        ? "w-11 h-11 mx-auto justify-center"
                        : "gap-3.5 px-3.5 py-2.5"
                    } ${
                      isActive
                        ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/25 shadow-[var(--shadow-sm)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-transparent"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`shrink-0 ${
                        isActive ? "text-[var(--accent-blue)]" : "text-[var(--text-muted)]"
                      }`}
                    />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Practice & Tools */}
          <div>
            {!isCollapsed ? (
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider px-3 mb-2.5 block font-mono opacity-70">
                Practice & Recall
              </span>
            ) : (
              <div className="h-px bg-[var(--border-main)] my-2 mx-1 opacity-60" />
            )}

            <nav className="space-y-1.5">
              {practiceNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={isCollapsed ? item.label : undefined}
                    className={`flex items-center rounded-xl text-sm font-semibold transition-all ${
                      isCollapsed
                        ? "w-11 h-11 mx-auto justify-center"
                        : "gap-3.5 px-3.5 py-2.5"
                    } ${
                      isActive
                        ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/25 shadow-sm"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-transparent"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`shrink-0 ${
                        isActive ? "text-[var(--accent-blue)]" : "text-[var(--text-muted)]"
                      }`}
                    />
                    {!isCollapsed && (
                      <div className="flex items-center justify-between flex-1 min-w-0">
                        <span className="truncate">{item.label}</span>
                        {"badge" in item && item.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/25 font-mono shrink-0">
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
              <button
                onClick={() => openAuthModal("register")}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
              >
                <LogIn size={14} />
                <span>Sign In / Register</span>
              </button>
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
              <button
                onClick={() => openAuthModal("login")}
                title="Sign In / Register to Vespera"
                className="w-9 h-9 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent-blue)]/15 text-[var(--text-muted)] hover:text-[var(--accent-blue)] flex items-center justify-center border border-[var(--border-main)] transition-all"
              >
                <LogIn size={15} />
              </button>
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
