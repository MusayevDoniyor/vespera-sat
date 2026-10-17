"use client";

import React from "react";

interface VesperaLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  variant?: "tile" | "mark" | "gradient" | "monochrome";
}

export default function VesperaLogo({
  size = 36,
  className = "",
  showWordmark = false,
  variant = "tile",
}: VesperaLogoProps) {
  const idPrefix = React.useId().replace(/:/g, "_");
  const isMarkOnly = variant === "mark" || variant === "monochrome";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Precision Vector Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105 select-none"
      >
        <defs>
          {/* Left Wing Gradient: Electric Cyan into Deep Azure */}
          <linearGradient
            id={`${idPrefix}-cyan-grad`}
            x1="20"
            y1="26"
            x2="50"
            y2="86"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="40%" stopColor="#00c6ff" />
            <stop offset="80%" stopColor="#0072ff" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>

          {/* Right Wing Gradient: Royal Indigo into Vibrant Purple */}
          <linearGradient
            id={`${idPrefix}-violet-grad`}
            x1="50"
            y1="86"
            x2="80"
            y2="26"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Natural Soft Shadow between wings */}
          <filter id={`${idPrefix}-wing-shadow`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#090d16" floodOpacity="0.5" />
          </filter>

          {/* Beacon Radial Ambient Glow */}
          <radialGradient
            id={`${idPrefix}-beacon-glow`}
            cx="84"
            cy="18"
            r="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0b0f19" stopOpacity="0" />
          </radialGradient>

          {/* Star Core Radiant Gradient */}
          <linearGradient
            id={`${idPrefix}-star-core`}
            x1="80"
            y1="12"
            x2="88"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>

          {/* Overall Mark Ambient Shadow */}
          <filter id={`${idPrefix}-ambient-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0284c7" floodOpacity="0.32" />
          </filter>
        </defs>

        {/* Optional Obsidian Squircle Tile Background */}
        {!isMarkOnly && (
          <>
            <rect width="100" height="100" rx="24" fill="#0b0f19" />
            <rect
              width="100"
              height="100"
              rx="24"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.2"
            />
          </>
        )}

        {/* Ambient Beacon Starlight Glow */}
        <circle cx="84" cy="18" r="22" fill={`url(#${idPrefix}-beacon-glow)`} />

        <g filter={`url(#${idPrefix}-ambient-shadow)`}>
          {/* Right Wing (Behind left wing) */}
          <path
            d="M 80 26 L 62 26 L 50 62 L 50 86 Z"
            fill={`url(#${idPrefix}-violet-grad)`}
          />

          {/* Left Wing (Casts gentle shadow onto right wing) */}
          <path
            d="M 20 26 L 38 26 L 50 62 L 50 86 Z"
            fill={`url(#${idPrefix}-cyan-grad)`}
            filter={`url(#${idPrefix}-wing-shadow)`}
          />
        </g>

        {/* The Vespera Evening Star Beacon (4-Point Geometric Diamond Star) */}
        {/* Outer Star Flare */}
        <path
          d="M 84 4 Q 84 18 98 18 Q 84 18 84 32 Q 84 18 70 18 Q 84 18 84 4 Z"
          fill="#38bdf8"
        />

        {/* Inner Diamond Flare */}
        <path
          d="M 84 8 Q 84 18 94 18 Q 84 18 84 28 Q 84 18 74 18 Q 84 18 84 8 Z"
          fill={`url(#${idPrefix}-star-core)`}
        />

        {/* White-hot core center spark */}
        <circle cx="84" cy="18" r="2" fill="#ffffff" />
      </svg>

      {/* Typography Wordmark (Optional) */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-base font-black tracking-[0.16em] text-[var(--text-main)] font-sans">
              VESPERA
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20 font-mono">
              SAT
            </span>
          </div>
          <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-wider uppercase mt-0.5">
            Autonomous Suite
          </span>
        </div>
      )}
    </div>
  );
}
