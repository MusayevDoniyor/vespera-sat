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
  Flame,
  Award,
  PanelLeftClose,
  PanelLeftOpen,
  GraduationCap,
  LogIn,
  LogOut,
  Sliders,
  User,
  X,
  BrainCircuit,
  Zap,
} from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "./AuthContext";
import VesperaLogo from "./VesperaLogo";
import Portal from "./Portal";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { fetchWithDeduplication } from "@/lib/api-cache";
import { SATASHKENT_LIBRARY } from "@/lib/satashkent-data";

function SidebarComponent() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar, isMobileOpen, closeMobileSidebar } = useSidebar();
  const { user, openAuthModal, openOnboarding, logout } = useAuth();
  useBodyScrollLock(isMobileOpen);
  const [realStreak, setRealStreak] = useState<number>(0);

  useEffect(() => {
    fetchWithDeduplication("/api/stats")
      .then((data) => {
        if (data?.realStreak !== undefined) {
          setRealStreak(data.realStreak);
        }
      })
      .catch(() => {});
  }, [user]);

  // Close mobile drawer on route change
  useEffect(() => {
    closeMobileSidebar();
  }, [pathname]);

  interface NavItem {
    label: string;
    href: string;
    icon: any;
    matchSubpaths?: boolean;
    badge?: string;
  }

  interface NavSection {
    title?: string;
    items: NavItem[];
  }

  const sections: NavSection[] = [
    {
      items: [
        { label: "Dashboard", href: "/", icon: Compass },
        { label: "Profile & Analytics", href: "/profile", icon: User },
      ],
    },
    {
      title: "Practice & Tests",
      items: [
        { label: "Math Bank", href: "/math", icon: Calculator, badge: "580+" },
        { label: "Reading & Writing", href: "/verbal", icon: GraduationCap, badge: "1.2k" },
        { label: "13 Units Textbook", href: "/curriculum", icon: BookOpen, matchSubpaths: true, badge: "13" },
        { label: "Adaptive Mock Exam", href: "/mock", icon: FileCheck2, badge: "PRO" },
      ],
    },
    {
      title: "Tools & Vault",
      items: [
        { label: "Error Notebook", href: "/error-log", icon: Repeat },
        { label: "Desmos Speed Lab", href: "/desmos", icon: Zap },
        { label: "SAT Vocab (650)", href: "/vocab", icon: BrainCircuit, badge: "SM-2" },
        { label: "Official PDF Vault", href: "/satashkent", icon: Award },
      ],
    },
  ];

  const renderContent = (isMobile = false) => {
    const collapsed = isMobile ? false : isCollapsed;

    return (
      <div className="flex-1 flex flex-col justify-between h-full">
        <div className="flex-1 flex flex-col justify-start overflow-y-auto scrollbar-none space-y-4">
          {/* Header & Brand with Collapse / Close Toggle */}
          <div className="flex items-center justify-between px-2 pt-1 pb-1">
            {!collapsed ? (
              <>
                <Link
                  href="/"
                  onClick={() => isMobile && closeMobileSidebar()}
                  className="flex items-center gap-2.5 group min-w-0"
                >
                  <VesperaLogo size={32} className="shrink-0 group-hover:scale-105 transition-transform" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-extrabold text-[var(--text-main)] tracking-wider">
                        VESPERA
                      </span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
                        SAT
                      </span>
                    </div>
                  </div>
                </Link>

                {isMobile ? (
                  <button
                    onClick={closeMobileSidebar}
                    aria-label="Close menu"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                  >
                    <X size={18} />
                  </button>
                ) : (
                  <button
                    onClick={toggleSidebar}
                    title="Collapse Sidebar (Ctrl+B)"
                    aria-label="Collapse Sidebar"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                  >
                    <PanelLeftClose size={16} />
                  </button>
                )}
              </>
            ) : (
              <div className="w-full flex flex-col items-center gap-2">
                <Link
                  href="/"
                  title="Vespera SAT"
                  aria-label="Vespera SAT Home"
                  className="p-1 rounded-xl hover:bg-[var(--bg-surface)] transition-all flex items-center justify-center"
                >
                  <VesperaLogo size={32} />
                </Link>
                <button
                  onClick={toggleSidebar}
                  title="Expand Sidebar (Ctrl+B)"
                  aria-label="Expand Sidebar"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-0.5"
                >
                  <PanelLeftOpen size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Clean, Streamlined Navigation */}
          <div className="space-y-4">
            {sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                {section.title && !collapsed && (
                  <div className="px-2.5 pt-2 pb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                      {section.title}
                    </span>
                  </div>
                )}
                {section.title && collapsed && (
                  <div className="h-px bg-[var(--border-main)] my-2 mx-2 opacity-50" />
                )}

                <nav className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.matchSubpaths
                      ? pathname === item.href || pathname.startsWith(`${item.href}/`)
                      : pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => isMobile && closeMobileSidebar()}
                        title={collapsed ? item.label : undefined}
                        className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                          isActive
                            ? "bg-[var(--accent-blue)] text-white shadow-sm font-semibold"
                            : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] hover:translate-x-1"
                        } ${collapsed ? "justify-center" : ""}`}
                      >
                        <Icon
                          size={17}
                          className={`shrink-0 transition-all duration-200 ${
                            isActive
                              ? "text-white"
                              : "text-[var(--text-muted)] group-hover:text-[var(--text-main)] group-hover:scale-110"
                          }`}
                        />

                        {!collapsed && (
                          <div className="flex-1 flex items-center justify-between min-w-0">
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full font-mono shrink-0 ${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
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

        {/* User Profile Card & Quick Goal */}
        <div className="pt-3 border-t border-[var(--border-main)] mt-auto shrink-0">
          {!collapsed ? (
            user ? (
              <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Link
                      href="/profile"
                      onClick={() => isMobile && closeMobileSidebar()}
                      title="View Profile & Full Analytics"
                      className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-sm transition-transform hover:scale-105"
                    >
                      {user.fullName.charAt(0).toUpperCase()}
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => isMobile && closeMobileSidebar()}
                      title="View Profile & Full Analytics"
                      className="min-w-0 group"
                    >
                      <div className="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors truncate">
                        {user.fullName}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)] truncate font-mono">
                        {user.email}
                      </div>
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      if (isMobile) closeMobileSidebar();
                    }}
                    title="Sign Out"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <div
                    onClick={() => {
                      openOnboarding();
                      if (isMobile) closeMobileSidebar();
                    }}
                    className="px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] flex items-center justify-between text-xs flex-1 cursor-pointer hover:border-[var(--border-hover)] transition-all group"
                    title="Click to adjust target score & preferences"
                  >
                    <span className="text-[var(--text-muted)] font-medium flex items-center gap-1.5 truncate">
                      <Award size={13} className="text-emerald-500 shrink-0" />
                      Target
                    </span>
                    <span className="font-extrabold text-[var(--accent-green)] font-mono group-hover:scale-105 transition-transform">
                      {user.targetSatScore || 1550}+
                    </span>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => isMobile && closeMobileSidebar()}
                    title={`${realStreak > 0 ? realStreak : 1} Day Streak • Click to view analytics`}
                    className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-xs font-semibold text-amber-600 dark:text-amber-400 font-mono shrink-0 transition-colors"
                  >
                    <Flame size={13} className="fill-current text-amber-500" />
                    <span>{realStreak > 0 ? `${realStreak}d` : "1d"}</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <Link
                  href="/register"
                  onClick={() => isMobile && closeMobileSidebar()}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <LogIn size={14} />
                  <span>Sign In / Register</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => isMobile && closeMobileSidebar()}
                  className="flex items-center justify-between px-1 text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    Guest Profile
                  </span>
                  <span className="font-mono text-[var(--accent-green)] font-bold">1550+ Goal</span>
                </Link>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center gap-2">
              {user ? (
                <Link
                  href="/profile"
                  title={`${user.fullName} • Goal: ${user.targetSatScore || 1550}+ • View Profile`}
                  className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs font-mono shadow-sm hover:scale-105 transition-transform"
                >
                  {user.fullName.charAt(0).toUpperCase()}
                </Link>
              ) : (
                <Link
                  href="/login"
                  title="Sign In / Register to Vespera"
                  className="w-9 h-9 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--accent-blue)]/15 text-[var(--text-muted)] hover:text-[var(--accent-blue)] flex items-center justify-center border border-[var(--border-main)] transition-all"
                >
                  <LogIn size={15} />
                </Link>
              )}
              <Link
                href="/profile"
                title={`${realStreak > 0 ? realStreak : 1} Day Streak • View Profile`}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:scale-105 transition-transform"
              >
                <Flame size={13} className="fill-current" />
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside
        className={`hidden md:flex h-screen max-h-screen sticky top-0 overflow-hidden bg-[var(--bg-card)] border-r border-[var(--border-main)] flex-col justify-between py-4 select-none shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-30 shadow-[var(--shadow-xs)] ${
          isCollapsed ? "w-20 px-3" : "w-64 px-3"
        }`}
      >
        {renderContent(false)}
      </aside>

      {/* Mobile Overlay Drawer */}
      {isMobileOpen && (
        <Portal>
          <div className="fixed inset-0 w-screen h-screen z-50 md:hidden flex animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
              onClick={closeMobileSidebar}
              className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />
            {/* Drawer Content */}
            <aside
              role="dialog"
              aria-modal="true"
              className="relative w-72 max-w-[85vw] h-full bg-[var(--bg-card)] border-r border-[var(--border-main)] flex flex-col justify-between py-4 px-3 select-none shadow-2xl z-10 animate-in slide-in-from-left duration-200 overflow-y-auto"
            >
              {renderContent(true)}
            </aside>
          </div>
        </Portal>
      )}
    </>
  );
}

export default React.memo(SidebarComponent);
