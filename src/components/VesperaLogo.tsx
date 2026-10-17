"use client";

import React from "react";

interface VesperaLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  variant?: "gradient" | "monochrome" | "glow";
}

export default function VesperaLogo({
  size = 36,
  className = "",
  showWordmark = false,
  variant = "gradient",
}: VesperaLogoProps) {
  const idPrefix = React.useId().replace(/:/g, "_");

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Precision Vector Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Main Cosmic Gradient */}
          <linearGradient
            id={`${idPrefix}-vespera-grad`}
            x1="10"
            y1="10"
            x2="90"
            y2="90"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#2563eb" />
            <stop offset="70%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>

          {/* Accent Gold/Cyan Core */}
          <linearGradient
            id={`${idPrefix}-core-grad`}
            x1="30"
            y1="25"
            x2="70"
            y2="75"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Ambient Outer Glow */}
          <radialGradient
            id={`${idPrefix}-glow`}
            cx="50"
            cy="50"
            r="45"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#6366f1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          {/* Subtle Bevel Shadow */}
          <filter id={`${idPrefix}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1e3a8a" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Outer Glow Halo */}
        <circle cx="50" cy="50" r="44" fill={`url(#${idPrefix}-glow)`} />

        {/* Hexagonal Shield Container with Chamfered Corners */}
        <rect
          x="12"
          y="12"
          width="76"
          height="76"
          rx="22"
          fill={`url(#${idPrefix}-vespera-grad)`}
          filter={`url(#${idPrefix}-shadow)`}
        />

        {/* Precision Geometric Grid Inlay */}
        <path
          d="M 12 36 L 88 36 M 12 64 L 88 64 M 36 12 L 36 88 M 64 12 L 64 88"
          stroke="#ffffff"
          strokeOpacity="0.08"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Celestial Orbital Ring (Tilted Ellipse) */}
        <ellipse
          cx="50"
          cy="50"
          rx="32"
          ry="14"
          transform="rotate(-28 50 50)"
          stroke="#ffffff"
          strokeOpacity="0.35"
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />

        {/* The "V" Apex Glyph & Evening Star Constellation */}
        {/* Left Wing of V */}
        <path
          d="M 28 32 L 50 72 L 44 72 L 24 32 Z"
          fill="#ffffff"
          fillOpacity="0.95"
        />

        {/* Right Wing of V (Gradated Depth) */}
        <path
          d="M 72 32 L 50 72 L 56 72 L 76 32 Z"
          fill="#ffffff"
          fillOpacity="0.75"
        />

        {/* Central Guiding Diamond Star (Vespera Evening Beacon) */}
        <path
          d="M 50 22 L 54 36 L 68 40 L 54 44 L 50 58 L 46 44 L 32 40 L 46 36 Z"
          fill="#ffffff"
        />

        {/* Inner Core Starlight Ping */}
        <circle cx="50" cy="40" r="3.5" fill="#38bdf8" />
        <circle cx="50" cy="40" r="1.5" fill="#ffffff" />
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
