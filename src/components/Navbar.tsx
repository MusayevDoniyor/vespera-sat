"use client";

import React, { useState, useCallback } from "react";
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

/**
 * Isolated Theme Toggle button.
 * Subscribes to ThemeContext independently so the parent Navbar
 * NEVER needs to re-render when the user switches themes.
 * Zero-lag render (<1ms) with smooth micro-animation.
 */
const ThemeToggleButton = React.memo(function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
      className="p-2 sm:p-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] active:scale-95 text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)] transition-all duration-150 shadow-sm shrink-0 flex items-center justify-center cursor-pointer select-none"
    >
      <span className="relative w-4 h-4 flex items-center justify-center overflow-hidden pointer-events-none">
        <Sun
          size={15}
          className={`text-amber-400 absolute transition-all duration-200 ease-out transform ${
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
          }`}
        />
        <Moon
          size={15}
          className={`text-indigo-600 absolute transition-all duration-200 ease-out transform ${
            !isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
          }`}
        />
      </span>
    </button>
  );
});

function NavbarComponent({ onToggleDesmos, isDesmosOpen }: NavbarProps) {
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  useBodyScrollLock(showFormulaSheet);
  const { isCollapsed, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { user, openAuthModal, openOnboarding } = useAuth();

  return (
    <>
      <header className="h-16 px-3 sm:px-6 md:px-10 bg-[var(--bg-card)]/80 backdrop-blur-xl border-b border-[var(--border-main)] flex items-center justify-between sticky top-0 z-40 shadow-[var(--shadow-xs)]">
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
          {/* Isolated Fast Theme Toggle */}
          <ThemeToggleButton />

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
            <Link
              href="/profile"
              title={`Personalized as ${user.fullName} • Goal: ${user.targetSatScore || 1550}+ • View Profile & Analytics`}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-[var(--border-hover)] transition-all shadow-sm text-xs font-bold shrink-0"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline text-[var(--text-main)] max-w-[90px] truncate">
                {user.fullName}
              </span>
              <span className="text-[10px] font-mono text-[var(--accent-green)] font-bold hidden sm:inline">
                {user.targetSatScore || 1550}+
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-sm shrink-0"
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
            aria-label="Official SAT Reference Formula Sheet"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowFormulaSheet(false);
            }}
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl shadow-2xl p-6 md:p-8 animate-scale-up">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-main)] mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20">
                      College Board Reference
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      Embedded in every Bluebook exam
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-[var(--text-main)] mt-1">
                    Digital SAT Math Reference Formulas
                  </h2>
                </div>
                <button
                  onClick={() => setShowFormulaSheet(false)}
                  className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-main)] transition-colors"
                  title="Close Formula Sheet (ESC)"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 2D Geometric Formulas */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-3">
                    2D Geometry: Area & Circumference
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Circle */}
                    <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                      <span className="text-xs font-bold text-[var(--accent-blue)] font-mono">Circle</span>
                      <div className="font-mono text-sm space-y-1">
                        <div><strong className="text-[var(--text-main)]">A</strong> = πr²</div>
                        <div><strong className="text-[var(--text-main)]">C</strong> = 2πr</div>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        r is radius, C is circumference.
                      </p>
                    </div>

                    {/* Rectangle */}
                    <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                      <span className="text-xs font-bold text-[var(--accent-green)] font-mono">Rectangle</span>
                      <div className="font-mono text-sm space-y-1">
                        <div><strong className="text-[var(--text-main)]">A</strong> = lw</div>
                        <div><strong className="text-[var(--text-main)]">P</strong> = 2l + 2w</div>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        l is length, w is width.
                      </p>
                    </div>

                    {/* Triangle */}
                    <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                      <span className="text-xs font-bold text-[var(--accent-purple)] font-mono">Triangle</span>
                      <div className="font-mono text-sm space-y-1">
                        <div><strong className="text-[var(--text-main)]">A</strong> = ½bh</div>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        b is base, h is perpendicular height.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Triangle & Special Triangles */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-3">
                    Right Triangles & Pythagorean Theorem
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Pythagorean */}
                    <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                      <span className="text-xs font-bold text-[var(--accent-rose)] font-mono">Pythagorean</span>
                      <div className="font-mono text-sm">
                        <strong className="text-[var(--text-main)]">a² + b² = c²</strong>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        c is hypotenuse, a and b are legs.
                      </p>
                    </div>

                    {/* Special Right Triangle 45-45-90 */}
                    <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                      <span className="text-xs font-bold text-amber-500 font-mono">45° - 45° - 90°</span>
                      <div className="font-mono text-sm space-y-0.5">
                        <div>Legs: <strong className="text-[var(--text-main)]">x, x</strong></div>
                        <div>Hypotenuse: <strong className="text-[var(--text-main)]">x√2</strong></div>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        Isosceles right triangle.
                      </p>
                    </div>

                    {/* Special Right Triangle 30-60-90 */}
                    <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                      <span className="text-xs font-bold text-[var(--accent-blue)] font-mono">30° - 60° - 90°</span>
                      <div className="font-mono text-sm space-y-0.5">
                        <div>Short: <strong className="text-[var(--text-main)]">x</strong> (opp 30°)</div>
                        <div>Long: <strong className="text-[var(--text-main)]">x√3</strong> (opp 60°)</div>
                        <div>Hyp: <strong className="text-[var(--text-main)]">2x</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3D Solids: Volume */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono mb-3">
                    3D Geometry: Volume Formulas
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Rectangular Solid */}
                    <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                      <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono">Rectangular Prism</span>
                      <div className="font-mono text-xs font-bold text-[var(--text-main)] mt-1">
                        V = lwh
                      </div>
                    </div>

                    {/* Cylinder */}
                    <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                      <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono">Right Cylinder</span>
                      <div className="font-mono text-xs font-bold text-[var(--text-main)] mt-1">
                        V = πr²h
                      </div>
                    </div>

                    {/* Sphere */}
                    <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                      <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono">Sphere</span>
                      <div className="font-mono text-xs font-bold text-[var(--text-main)] mt-1">
                        V = ⁴⁄₃πr³
                      </div>
                    </div>

                    {/* Cone */}
                    <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                      <span className="text-[11px] font-bold text-[var(--text-muted)] font-mono">Right Cone</span>
                      <div className="font-mono text-xs font-bold text-[var(--text-main)] mt-1">
                        V = ⅓πr²h
                      </div>
                    </div>
                  </div>
                </div>

                {/* Essential Rules Reference */}
                <div className="p-4 rounded-xl bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/20">
                  <h4 className="text-xs font-bold text-[var(--accent-blue)] uppercase tracking-wider font-mono mb-2">
                    Official College Board Reference Notes
                  </h4>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1.5 list-disc list-inside">
                    <li>The number of degrees of arc in a circle is <strong className="text-[var(--text-main)] font-mono">360°</strong>.</li>
                    <li>The number of radians of arc in a circle is <strong className="text-[var(--text-main)] font-mono">2π</strong>.</li>
                    <li>The sum of the measures in degrees of the angles of a triangle is <strong className="text-[var(--text-main)] font-mono">180°</strong>.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

export default React.memo(NavbarComponent);
