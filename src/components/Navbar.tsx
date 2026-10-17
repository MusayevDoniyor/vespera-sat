"use client";

import React, { useState } from "react";
import { Calculator, BookMarked, Sparkles, Sun, Moon, X, PanelLeft } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useSidebar } from "./SidebarContext";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

interface NavbarProps {
  onToggleDesmos?: () => void;
  isDesmosOpen?: boolean;
}

export default function Navbar({ onToggleDesmos, isDesmosOpen }: NavbarProps) {
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);
  useBodyScrollLock(showFormulaSheet);
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <>
      <header className="h-16 px-6 md:px-10 bg-[var(--bg-card)]/80 backdrop-blur-xl border-b border-[var(--border-main)] flex items-center justify-between sticky top-0 z-40 transition-colors shadow-[var(--shadow-xs)]">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
            className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] transition-colors shadow-sm"
          >
            <PanelLeft size={16} />
          </button>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-live-pulse"></span>
            Digital SAT Autonomous Suite
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)] transition-colors shadow-sm"
          >
            {theme === "dark" ? (
              <Sun size={16} className="text-amber-400" />
            ) : (
              <Moon size={16} className="text-indigo-600" />
            )}
          </button>

          {/* AI Mentor Copilot Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("vespera_open_copilot"))}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--accent-blue)]/10 hover:bg-[var(--accent-blue)]/20 text-xs font-semibold text-[var(--accent-blue)] border border-[var(--accent-blue)]/30 transition-all shadow-sm"
          >
            <Sparkles size={15} />
            <span>AI Mentor</span>
          </button>

          {/* Official Formula Sheet Button */}
          <button
            onClick={() => setShowFormulaSheet(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-main)] border border-[var(--border-main)] transition-colors shadow-sm"
          >
            <BookMarked size={15} className="text-amber-500" />
            <span>Reference Sheet</span>
          </button>

          {/* Quick Desmos Calculator Toggle */}
          {onToggleDesmos && (
            <button
              onClick={onToggleDesmos}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors shadow-sm ${
                isDesmosOpen
                  ? "bg-[var(--accent-green)]/15 text-[var(--accent-green)] border-[var(--accent-green)]/40"
                  : "bg-[var(--bg-card)] text-[var(--accent-blue)] border-[var(--border-main)] hover:bg-[var(--bg-surface)]"
              }`}
            >
              <Calculator size={15} />
              <span>Desmos</span>
              {isDesmosOpen && <span className="text-[10px] ml-0.5 font-bold font-mono">Active</span>}
            </button>
          )}
        </div>
      </header>

      {/* Official CollegeBoard SAT Formula Sheet Modal */}
      {showFormulaSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden animate-in fade-in duration-150">
          <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain p-6 shadow-2xl text-[var(--text-main)] my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-main)]">
              <div className="flex items-center gap-2">
                <BookMarked className="text-[var(--accent-blue)]" size={20} />
                <h3 className="text-base font-bold text-[var(--text-main)]">
                  Official College Board Digital SAT Math Reference Sheet
                </h3>
              </div>
              <button
                onClick={() => setShowFormulaSheet(false)}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-6 text-sm">
              {/* Area & Circumference */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-blue)] mb-3 font-mono">
                  1. 2D Area & Circumference Formulas
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">Circle Area</p>
                    <p className="font-bold mt-1 text-[var(--text-main)]">A = π r²</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">Circumference</p>
                    <p className="font-bold mt-1 text-[var(--text-main)]">C = 2 π r</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">Rectangle</p>
                    <p className="font-bold mt-1 text-[var(--text-main)]">A = l · w</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">Triangle</p>
                    <p className="font-bold mt-1 text-[var(--text-main)]">A = ½ b · h</p>
                  </div>
                </div>
              </div>

              {/* Pythagorean Theorem & Special Right Triangles */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-green)] mb-3 font-mono">
                  2. Right Triangles & Special Proportions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">Pythagorean Theorem</p>
                    <p className="font-bold mt-1 text-[var(--text-main)]">a² + b² = c²</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">30° - 60° - 90°</p>
                    <p className="font-bold mt-1 text-[var(--accent-blue)]">x, x√3, 2x</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">45° - 45° - 90°</p>
                    <p className="font-bold mt-1 text-[var(--accent-green)]">x, x, x√2</p>
                  </div>
                </div>
              </div>

              {/* 3D Volumes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-3 font-mono">
                  3. 3D Volume Formulas
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">Rectangular Prism</p>
                    <p className="font-bold mt-1 text-[var(--text-main)]">V = l · w · h</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">Right Cylinder</p>
                    <p className="font-bold mt-1 text-[var(--text-main)]">V = π r² h</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">Sphere</p>
                    <p className="font-bold mt-1 text-[var(--text-main)]">V = ⁴⁄₃ π r³</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)]">
                    <p className="text-[var(--text-muted)] text-[11px] font-sans">Right Cone</p>
                    <p className="font-bold mt-1 text-[var(--text-main)]">V = ⅓ π r² h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-main)] flex justify-end">
              <button
                onClick={() => setShowFormulaSheet(false)}
                className="px-4 py-2 rounded-xl bg-[var(--accent-blue)] text-white font-semibold text-xs hover:bg-[var(--accent-blue)]/90 transition-colors shadow-sm"
              >
                Close Reference Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
