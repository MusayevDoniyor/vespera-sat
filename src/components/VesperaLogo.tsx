"use client";

import React from "react";
import { useTheme } from "./ThemeContext";

interface VesperaLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  variant?: "mark" | "tile" | "gradient" | "monochrome";
  themeOverride?: "light" | "dark" | "auto";
}

/**
 * Vespera SAT Sovereign Emblem
 * Prestigious, mature academic insignia with 100% transparent background.
 * Deep Academic Cobalt & Midnight Navy with Platinum Diamond Beacon.
 * Zero gaudy/candy colors.
 */
export function VesperaLogoComponent({
  size = 36,
  className = "",
  showWordmark = false,
  variant = "mark",
  themeOverride = "auto",
}: VesperaLogoProps) {
  const idPrefix = React.useId().replace(/:/g, "_");
  const isTile = variant === "tile";

  // Access current theme safely with fallback
  let currentTheme: "light" | "dark" = "dark";
  try {
    const themeContext = useTheme();
    if (themeOverride === "auto") {
      currentTheme = themeContext?.theme || "dark";
    } else {
      currentTheme = themeOverride;
    }
  } catch {
    currentTheme = themeOverride === "light" ? "light" : "dark";
  }

  const isDark = currentTheme === "dark";

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Precision Vector Emblem (Theme-Adaptive SVG with Pure Alpha Transparency) */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105 select-none"
      >
        <defs>
          {/* Left Wing Gradient (Executive Academic Cobalt into Deep Midnight) */}
          <linearGradient
            id={`${idPrefix}-wing-left`}
            x1="16"
            y1="26"
            x2="46"
            y2="86"
            gradientUnits="userSpaceOnUse"
          >
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="40%" stopColor="#2563eb" />
                <stop offset="80%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="40%" stopColor="#1d4ed8" />
                <stop offset="80%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#172554" />
              </>
            )}
          </linearGradient>

          {/* Right Wing Gradient (Sovereign Sapphire into Deep Obsidian Navy) */}
          <linearGradient
            id={`${idPrefix}-wing-right`}
            x1="46"
            y1="86"
            x2="76"
            y2="26"
            gradientUnits="userSpaceOnUse"
          >
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#0f172a" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#1d4ed8" />
                <stop offset="50%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#090d16" />
              </>
            )}
          </linearGradient>

          {/* Natural Soft Shadow between overlapping wings */}
          <filter id={`${idPrefix}-wing-shadow`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="2"
              dy="2"
              stdDeviation="2.8"
              floodColor={isDark ? "#050811" : "#0f172a"}
              floodOpacity={isDark ? 0.6 : 0.25}
            />
          </filter>

          {/* Beacon Radial Ambient Glow */}
          <radialGradient
            id={`${idPrefix}-beacon-glow`}
            cx="80"
            cy="18"
            r="22"
            gradientUnits="userSpaceOnUse"
          >
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
              </>
            )}
          </radialGradient>

          {/* Platinum Star Core Gradient */}
          <linearGradient
            id={`${idPrefix}-star-core`}
            x1="76"
            y1="12"
            x2="84"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={isDark ? "#f8fafc" : "#f1f5f9"} />
          </linearGradient>

          {/* Overall Mark Ambient Shadow */}
          <filter id={`${idPrefix}-ambient-shadow`} x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation={isDark ? 5 : 4}
              floodColor={isDark ? "#020617" : "#0f172a"}
              floodOpacity={isDark ? 0.35 : 0.16}
            />
          </filter>
        </defs>

        {/* Squircle Tile Background (Only if explicitly requested via variant='tile') */}
        {isTile && (
          <>
            <rect
              width="100"
              height="100"
              rx="24"
              fill={isDark ? "#0f1422" : "#ffffff"}
              filter={!isDark ? "drop-shadow(0 2px 8px rgba(15, 23, 42, 0.08))" : undefined}
            />
            <rect
              width="100"
              height="100"
              rx="24"
              stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.08)"}
              strokeWidth="1.2"
            />
          </>
        )}

        {/* Ambient Beacon Starlight Glow */}
        <circle cx="80" cy="18" r="22" fill={`url(#${idPrefix}-beacon-glow)`} />

        <g filter={`url(#${idPrefix}-ambient-shadow)`}>
          {/* Right Wing (Behind left wing, optical balance X=46..76) */}
          <path
            d="M 76 26 L 58 26 L 46 64 L 46 86 Z"
            fill={`url(#${idPrefix}-wing-right)`}
          />

          {/* Left Wing (Casts gentle shadow onto right wing, optical balance X=16..46) */}
          <path
            d="M 16 26 L 34 26 L 46 64 L 46 86 Z"
            fill={`url(#${idPrefix}-wing-left)`}
            filter={`url(#${idPrefix}-wing-shadow)`}
          />

          {/* Architectural Seam Line */}
          <path
            d="M 46 64 L 46 86"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </g>

        {/* The Vespera Evening Star Beacon (Balanced apex at cx=80, cy=18) */}
        {/* Outer Star Flare */}
        <path
          d="M 80 4 Q 80 18 94 18 Q 80 18 80 32 Q 80 18 66 18 Q 80 18 80 4 Z"
          fill={isDark ? "#3b82f6" : "#1d4ed8"}
        />

        {/* Inner Diamond Flare */}
        <path
          d="M 80 8 Q 80 18 90 18 Q 80 18 80 28 Q 80 18 70 18 Q 80 18 80 8 Z"
          fill={`url(#${idPrefix}-star-core)`}
        />

        {/* Center Spark */}
        <circle cx="80" cy="18" r="2" fill="#ffffff" />
      </svg>

      {/* Typography Wordmark (Optional) */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-sm font-extrabold tracking-[0.18em] text-[var(--text-main)] font-sans">
              VESPERA
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 font-mono">
              SAT
            </span>
          </div>
          <span className="text-[9px] text-[var(--text-muted)] font-mono tracking-wider uppercase mt-0.5">
            Digital SAT Suite
          </span>
        </div>
      )}
    </div>
  );
}

export default React.memo(VesperaLogoComponent);
