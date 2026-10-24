"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface ThemeToggleButtonProps {
  className?: string;
  iconSize?: number;
  showLabel?: boolean;
}

/**
 * Isolated Theme Toggle Button.
 * Subscribes to ThemeContext independently so parent page/layout components
 * NEVER need to re-render when switching themes.
 * Zero-lag render (<1ms) with smooth icon transition.
 */
function ThemeToggleButtonComponent({
  className = "p-2 sm:p-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] active:scale-95 text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)] transition-colors duration-150 shadow-sm shrink-0 flex items-center justify-center cursor-pointer select-none",
  iconSize = 15,
  showLabel = false,
}: ThemeToggleButtonProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
      className={className}
    >
      <span className="relative w-4 h-4 flex items-center justify-center overflow-hidden pointer-events-none">
        <Sun
          size={iconSize}
          className={`text-amber-400 absolute transition-transform duration-200 ease-out transform ${
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
          }`}
        />
        <Moon
          size={iconSize}
          className={`text-indigo-600 dark:text-indigo-400 absolute transition-transform duration-200 ease-out transform ${
            !isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
          }`}
        />
      </span>
      {showLabel && (
        <span className="ml-2 text-xs font-semibold">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}

export default React.memo(ThemeToggleButtonComponent);
