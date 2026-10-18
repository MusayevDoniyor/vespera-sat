"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, BookMarked, Sparkles, Sun, Moon, X, PanelLeft, LogIn, User } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "./AuthContext";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import Portal from "./Portal";

interface NavbarProps {
  onToggleDesmos?: () => void;
  isDesmosOpen?: boolean;
}

export default function Navbar({ onToggleDesmos, isDesmosOpen }: NavbarProps) {
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  useBodyScrollLock(showFormulaSheet);
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { user, openAuthModal, openOnboarding } = useAuth();

  return (
    <>
      <header className="h-16 px-3 sm:px-6 md:px-10 bg-[var(--bg-card)]/80 backdrop-blur-xl border-b border-[var(--border-main)] flex items-center justify-between sticky top-0 z-40 transition-colors shadow-[var(--shadow-xs)]">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Trigger */}
          <button
            onClick={toggleMobileSidebar}
            title="Open Menu"
            aria-label="Open Navigation Menu"
            className="md:hidden p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] transition-colors shadow-sm"
          >
            <PanelLeft size={16} />
          </button>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="hidden md:flex p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] transition-colors shadow-sm"
          >
            <PanelLeft size={16} />
          </button>

          <span className="hidden sm:flex text-xs font-semibold px-3 py-1 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-live-pulse"></span>
            Digital SAT Suite
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
            className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)] transition-colors shadow-sm shrink-0"
          >
            {theme === "dark" ? (
              <Sun size={15} className="text-amber-400" />
            ) : (
              <Moon size={15} className="text-indigo-600" />
            )}
          </button>

          {/* AI Mentor Copilot Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("vespera_open_copilot"))}
            title="AI Mentor Copilot"
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl bg-[var(--accent-blue)]/10 hover:bg-[var(--accent-blue)]/20 text-xs font-semibold text-[var(--accent-blue)] border border-[var(--accent-blue)]/30 transition-all shadow-sm shrink-0"
          >
            <Sparkles size={14} className="shrink-0" />
            <span className="hidden sm:inline">AI Mentor</span>
          </button>

          {/* Official Formula Sheet Button */}
          <button
            onClick={() => setShowFormulaSheet(true)}
            title="Official Reference Sheet"
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-main)] border border-[var(--border-main)] transition-colors shadow-sm shrink-0"
          >
            <BookMarked size={14} className="text-amber-500 shrink-0" />
            <span className="hidden md:inline">Reference</span>
          </button>

          {/* Quick Desmos Calculator Toggle */}
          {onToggleDesmos && (
            <button
              onClick={onToggleDesmos}
              title="Live Desmos Calculator"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors shadow-sm shrink-0 ${
                isDesmosOpen
                  ? "bg-[var(--accent-green)]/15 text-[var(--accent-green)] border-[var(--accent-green)]/40"
                  : "bg-[var(--bg-card)] text-[var(--accent-blue)] border-[var(--border-main)] hover:bg-[var(--bg-surface)]"
              }`}
            >
              <Calculator size={14} className="shrink-0" />
              <span className="hidden sm:inline">Desmos</span>
              {isDesmosOpen && <span className="text-[10px] ml-0.5 font-bold font-mono hidden sm:inline">Active</span>}
            </button>
          )}

          {/* User Account / Sign In Pill */}
          {user ? (
            <button
              onClick={openOnboarding}
              title={`Personalized as ${user.fullName} • Goal: ${user.targetSatScore || 1550}+`}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-[var(--border-hover)] transition-all shadow-sm text-xs font-bold shrink-0"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center text-[10px] font-mono shrink-0">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline text-[var(--text-main)] max-w-[90px] truncate">
                {user.fullName}
              </span>
              <span className="text-[10px] font-mono text-[var(--accent-green)] font-bold hidden sm:inline">
                {user.targetSatScore || 1550}+
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold transition-all shadow-sm shadow-blue-500/20 shrink-0"
            >
              <LogIn size={13} />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
        </div>
      </header>

      {/* Official SAT Math Reference Formula Sheet Modal */}
      {showFormulaSheet && (
        <Portal>
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-hidden"
            onClick={() => setShowFormulaSheet(false)}
          >
          <div
            className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-6 md:p-8 space-y-6 relative text-[var(--text-main)] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-4">
              <div>
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                  <BookMarked className="text-amber-500" />
                  Official Digital SAT Math Formula & Reference Sheet
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Provided at the top of every Digital SAT Math Section. All formulas below are valid for entire Math section.
                </p>
              </div>
              <button
                onClick={() => setShowFormulaSheet(false)}
                className="p-2 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Geometry Invariants & Formulas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                <span className="font-bold text-[var(--accent-blue)] block font-mono text-[11px] uppercase tracking-wide">
                  1. Circle Formulas
                </span>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Area:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">A = π r²</code>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Circumference:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">C = 2 π r</code>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Arc Length:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">s = r θ</code> (where θ is in radians)
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Sector Area:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">A = (1/2) r² θ</code>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                <span className="font-bold text-[var(--accent-blue)] block font-mono text-[11px] uppercase tracking-wide">
                  2. Triangle Geometry & Trigonometry
                </span>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Area:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">A = (1/2) b h</code>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Pythagorean Theorem:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">a² + b² = c²</code>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Special 30°-60°-90°:</strong> Sides in ratio <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">x : x√3 : 2x</code>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Special 45°-45°-90°:</strong> Sides in ratio <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">x : x : x√2</code>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                <span className="font-bold text-[var(--accent-blue)] block font-mono text-[11px] uppercase tracking-wide">
                  3. 3D Solid Volumes
                </span>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Rectangular Prism:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">V = l w h</code>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Right Cylinder:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">V = π r² h</code>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Sphere:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">V = (4/3) π r³</code>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Cone:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">V = (1/3) π r² h</code>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • <strong>Pyramid:</strong> <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">V = (1/3) l w h</code>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                <span className="font-bold text-[var(--accent-blue)] block font-mono text-[11px] uppercase tracking-wide">
                  4. Universal Degree & Radian Invariants
                </span>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • Number of degrees in a circle = <strong>360°</strong>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • Number of radians in a circle = <strong>2π</strong>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • Sum of angles in a triangle = <strong>180°</strong>
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  • Cofunction identity: <code className="bg-[var(--bg-card)] px-1.5 py-0.5 rounded border border-[var(--border-main)]">sin(x) = cos(90° - x)</code>
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border-main)] flex justify-end">
              <button
                onClick={() => setShowFormulaSheet(false)}
                className="px-5 py-2 rounded-xl bg-[var(--accent-blue)] text-white text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Close Sheet
              </button>
            </div>
          </div>
        </div>
      </Portal>
    )}
    </>
  );
}
