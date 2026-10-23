"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Target,
  Clock,
  TrendingUp,
  AlertTriangle,
  Award,
  Zap,
  ArrowRight,
  BookOpen,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  BarChart3,
  Compass
} from "lucide-react";

export interface DomainMasteryItem {
  domain: string;
  section: "MATH" | "READING_WRITING";
  shortCode: string;
  slug: string;
  total: number;
  attempted: number;
  correct: number;
  accuracy: number;
  status: "Mastered" | "Proficient" | "Needs Focus" | "Untested";
  estimatedPointLoss: number;
}

export interface PaceMetric {
  avgSeconds: number;
  targetSeconds: number;
  status: "optimal" | "rushing" | "slow";
  deltaSeconds: number;
  totalLogged: number;
}

interface StudentRadarAnalyticsProps {
  domainMasteryList?: DomainMasteryItem[];
  paceStats?: {
    math: PaceMetric;
    verbal: PaceMetric;
  };
  mockHistory?: Array<{
    id: string;
    title: string;
    score: number;
    math_score: number;
    reading_score: number;
    completed_at: string;
  }>;
  compositeScore?: number;
  targetScore?: number;
}

export default function StudentRadarAnalytics({
  domainMasteryList = [],
  paceStats,
  mockHistory = [],
  compositeScore = 400,
  targetScore = 1550,
}: StudentRadarAnalyticsProps) {
  const [filterMode, setFilterMode] = useState<"ALL" | "MATH" | "VERBAL">("ALL");
  const [hoveredDomain, setHoveredDomain] = useState<DomainMasteryItem | null>(null);

  // Fallback domains if database is still building telemetry
  const domains: DomainMasteryItem[] = useMemo(() => {
    if (domainMasteryList && domainMasteryList.length > 0) {
      if (filterMode === "MATH") {
        return domainMasteryList.filter((d) => d.section === "MATH");
      }
      if (filterMode === "VERBAL") {
        return domainMasteryList.filter((d) => d.section === "READING_WRITING");
      }
      return domainMasteryList;
    }

    // Default template domains
    const defaults: DomainMasteryItem[] = [
      { domain: "Algebra", section: "MATH", shortCode: "ALG", slug: "unit-06-medium-algebra", total: 175, attempted: 0, correct: 0, accuracy: 0, status: "Untested", estimatedPointLoss: 0 },
      { domain: "Advanced Math", section: "MATH", shortCode: "ADV", slug: "unit-08-medium-adv-math", total: 175, attempted: 0, correct: 0, accuracy: 0, status: "Untested", estimatedPointLoss: 0 },
      { domain: "Problem Solving & Data Analysis", section: "MATH", shortCode: "DAT", slug: "unit-07-medium-psda", total: 88, attempted: 0, correct: 0, accuracy: 0, status: "Untested", estimatedPointLoss: 0 },
      { domain: "Geometry & Trigonometry", section: "MATH", shortCode: "GEO", slug: "unit-09-medium-geom-trig", total: 145, attempted: 0, correct: 0, accuracy: 0, status: "Untested", estimatedPointLoss: 0 },
      { domain: "Craft and Structure", section: "READING_WRITING", shortCode: "CAS", slug: "unit-01-about-sat", total: 439, attempted: 0, correct: 0, accuracy: 0, status: "Untested", estimatedPointLoss: 0 },
      { domain: "Information and Ideas", section: "READING_WRITING", shortCode: "IAI", slug: "unit-03-foundations-psda", total: 329, attempted: 0, correct: 0, accuracy: 0, status: "Untested", estimatedPointLoss: 0 },
      { domain: "Standard English Conventions", section: "READING_WRITING", shortCode: "SEC", slug: "unit-02-foundations-algebra", total: 269, attempted: 0, correct: 0, accuracy: 0, status: "Untested", estimatedPointLoss: 0 },
      { domain: "Expression of Ideas", section: "READING_WRITING", shortCode: "EOI", slug: "unit-02-foundations-algebra", total: 227, attempted: 0, correct: 0, accuracy: 0, status: "Untested", estimatedPointLoss: 0 },
    ];

    if (filterMode === "MATH") return defaults.filter((d) => d.section === "MATH");
    if (filterMode === "VERBAL") return defaults.filter((d) => d.section === "READING_WRITING");
    return defaults;
  }, [domainMasteryList, filterMode]);

  // SVG Radar Geometry calculations
  const size = 380;
  const center = size / 2;
  const radius = 135;
  const numAxes = domains.length;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (index * 2 * Math.PI) / numAxes - Math.PI / 2;
    const r = radius * Math.max(0.05, Math.min(1, valueRatio));
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Polygon path string generator
  const buildPolygonPath = (values: number[]) => {
    return (
      values
        .map((val, idx) => {
          const pt = getCoordinates(idx, val);
          return `${idx === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
        })
        .join(" ") + " Z"
    );
  };

  // 1500+ Target Benchmark polygon (85% everywhere)
  const targetBenchmarkPath = buildPolygonPath(domains.map(() => 0.85));

  // User's actual accuracy polygon (defaulting to 0.1 for untested domains to keep shape visible)
  const userPolygonPath = buildPolygonPath(
    domains.map((d) => (d.attempted > 0 ? d.accuracy / 100 : 0.08))
  );

  // Identify highest point loss / primary score leak
  const primaryScoreLeak = useMemo(() => {
    const tested = domains.filter((d) => d.attempted > 0);
    if (tested.length === 0) {
      return domains[0]; // fallback
    }
    return [...tested].sort((a, b) => b.estimatedPointLoss - a.estimatedPointLoss)[0];
  }, [domains]);

  return (
    <div className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] p-6 md:p-8 shadow-sm space-y-8">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[var(--border-main)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono uppercase tracking-wider mb-2">
            <Compass size={14} className="text-blue-500 animate-spin-slow" />
            <span>Diagnostic Radar & Performance Studio</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tight">
            Digital SAT Multi-Domain Mastery Radar
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 max-w-2xl leading-relaxed">
            Multi-axis diagnostic telemetry mapping your real empirical accuracy across all 8 College Board domains against the 1500+ benchmark.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] self-start lg:self-auto text-xs">
          <button
            onClick={() => setFilterMode("ALL")}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              filterMode === "ALL"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            All 8 Domains
          </button>
          <button
            onClick={() => setFilterMode("MATH")}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              filterMode === "MATH"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            Math (4 Domains)
          </button>
          <button
            onClick={() => setFilterMode("VERBAL")}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              filterMode === "VERBAL"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            Reading & Writing (4)
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Chart on Left, Diagnostics & Pacing on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radar SVG Visualizer */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full overflow-visible drop-shadow-md select-none"
            >
              <defs>
                <linearGradient id="userRadarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
                </linearGradient>
                <radialGradient id="radarCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </radialGradient>
              </defs>

              {/* Center Glow */}
              <circle cx={center} cy={center} r={radius} fill="url(#radarCenterGlow)" />

              {/* Concentric Guide Rings (25%, 50%, 75%, 100%) */}
              {[0.25, 0.5, 0.75, 1.0].map((ratio) => (
                <polygon
                  key={ratio}
                  points={domains
                    .map((_, i) => {
                      const pt = getCoordinates(i, ratio);
                      return `${pt.x},${pt.y}`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray={ratio < 1.0 ? "3,3" : "none"}
                  className="text-slate-300 dark:text-slate-700/60"
                />
              ))}

              {/* Radius Axes radiating from center */}
              {domains.map((_, idx) => {
                const pt = getCoordinates(idx, 1.0);
                return (
                  <line
                    key={idx}
                    x1={center}
                    y1={center}
                    x2={pt.x}
                    y2={pt.y}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-slate-300 dark:text-slate-700/60"
                  />
                );
              })}

              {/* 1500+ Target Benchmark polygon (Dotted Cyan) */}
              <path
                d={targetBenchmarkPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                className="opacity-70"
              />

              {/* User Actual Polygon */}
              <path
                d={userPolygonPath}
                fill="url(#userRadarGradient)"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Interactive Vertex Dots */}
              {domains.map((dom, idx) => {
                const ratio = dom.attempted > 0 ? dom.accuracy / 100 : 0.08;
                const pt = getCoordinates(idx, ratio);
                const isHovered = hoveredDomain?.domain === dom.domain;

                return (
                  <g
                    key={dom.domain}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredDomain(dom)}
                    onMouseLeave={() => setHoveredDomain(null)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 8 : 5}
                      fill={dom.attempted === 0 ? "#94a3b8" : dom.accuracy >= 85 ? "#10b981" : dom.accuracy >= 65 ? "#3b82f6" : "#f59e0b"}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-all duration-150 drop-shadow-sm"
                    />
                  </g>
                );
              })}

              {/* Axis Labels outside perimeter */}
              {domains.map((dom, idx) => {
                const pt = getCoordinates(idx, 1.22);
                const isHovered = hoveredDomain?.domain === dom.domain;

                return (
                  <text
                    key={`label_${dom.domain}`}
                    x={pt.x}
                    y={pt.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-tight transition-all cursor-pointer ${
                      isHovered
                        ? "fill-blue-600 dark:fill-blue-400 font-black scale-110"
                        : "fill-slate-600 dark:fill-slate-400"
                    }`}
                    onMouseEnter={() => setHoveredDomain(dom)}
                    onMouseLeave={() => setHoveredDomain(null)}
                  >
                    {dom.shortCode}
                  </text>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredDomain && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl bg-[var(--bg-card)]/95 backdrop-blur-md border border-blue-500/40 shadow-xl text-center pointer-events-none transition-all z-10 w-48">
                <span className="text-[10px] font-mono uppercase text-[var(--accent-blue)] font-bold block">
                  {hoveredDomain.shortCode} • {hoveredDomain.section === "MATH" ? "Math" : "Verbal"}
                </span>
                <span className="text-xs font-bold text-[var(--text-main)] block truncate">
                  {hoveredDomain.domain}
                </span>
                <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono mt-1">
                  {hoveredDomain.attempted > 0 ? `${hoveredDomain.accuracy}%` : "Untested"}
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                  {hoveredDomain.attempted > 0
                    ? `${hoveredDomain.correct}/${hoveredDomain.attempted} Correct`
                    : "0 Questions Attempted"}
                </span>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)] mt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500/80 inline-block" />
              <span>Your Accuracy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b-2 border-dashed border-emerald-500 inline-block" />
              <span>1500+ Goal (85%)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Speed & Pace Tracking + Critical Score Leak */}
        <div className="lg:col-span-6 space-y-5">
          {/* ⚡ SPEED & PACING TELEMETRY CARD */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                  <Clock size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-main)]">
                    Exam Pacing & Speed Telemetry
                  </h3>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    Time spent per question vs College Board benchmark
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                Live Calibrated
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Math Pace Gauge */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[var(--text-main)]">Math Speed</span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    Target: 95s / Q
                  </span>
                </div>
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  {paceStats?.math?.avgSeconds || 92}
                  <span className="text-xs font-normal text-[var(--text-muted)] ml-1">sec/question</span>
                </div>
                <div className="w-full bg-[var(--bg-surface)] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{
                      width: `${Math.min(100, Math.max(10, ((paceStats?.math?.avgSeconds || 92) / 120) * 100))}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                  {paceStats?.math?.avgSeconds && paceStats.math.avgSeconds <= 95
                    ? "✓ Optimal speed: +3s surplus buffer per problem"
                    : "Tip: Use Desmos ~ regression to save 20s"}
                </span>
              </div>

              {/* Reading & Writing Pace Gauge */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[var(--text-main)]">Verbal Speed</span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    Target: 71s / Q
                  </span>
                </div>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {paceStats?.verbal?.avgSeconds || 68}
                  <span className="text-xs font-normal text-[var(--text-muted)] ml-1">sec/question</span>
                </div>
                <div className="w-full bg-[var(--bg-surface)] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full"
                    style={{
                      width: `${Math.min(100, Math.max(10, ((paceStats?.verbal?.avgSeconds || 68) / 95) * 100))}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                  {paceStats?.verbal?.avgSeconds && paceStats.verbal.avgSeconds <= 71
                    ? "✓ Controlled pacing: ready for 54 Questions"
                    : "Tip: Apply 3x1 elimination on grammar boundaries"}
                </span>
              </div>
            </div>
          </div>

          {/* 🎯 PRIMARY SCORE LEAK & INSTANT REMEDIATION CARD */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle size={13} />
                <span>Highest Yield Opportunity</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300">
                Score Leak: ~{primaryScoreLeak?.estimatedPointLoss || 40} pts
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-[var(--text-main)]">
                {primaryScoreLeak?.domain || "Advanced Math"}
              </h4>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Empirical accuracy is currently{" "}
                <strong className="text-amber-600 dark:text-amber-400 font-mono">
                  {primaryScoreLeak?.accuracy || 0}%
                </strong>
                . Closing this gap represents an immediate{" "}
                <strong className="text-[var(--text-main)] font-mono">
                  +{primaryScoreLeak?.estimatedPointLoss || 40} point
                </strong>{" "}
                composite score boost on your target exam.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <Link
                href={
                  primaryScoreLeak?.section === "MATH"
                    ? `/math?domain=${encodeURIComponent(primaryScoreLeak.domain)}`
                    : `/verbal?domain=${encodeURIComponent(primaryScoreLeak.domain)}`
                }
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
              >
                <span>Drill {primaryScoreLeak?.domain} Now</span>
                <ArrowRight size={13} />
              </Link>

              <Link
                href={`/curriculum/units/${primaryScoreLeak?.slug || "unit-06-medium-algebra"}`}
                className="px-3.5 py-2 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] font-semibold text-xs transition"
              >
                <span>Study Unit First</span>
              </Link>
            </div>
          </div>

          {/* 📊 MOCK EXAM SCORE TRAJECTORY RIBBON */}
          {mockHistory && mockHistory.length > 0 ? (
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] font-bold block">
                  Latest Mock Exam Form
                </span>
                <span className="text-xs font-bold text-[var(--text-main)] block truncate max-w-xs">
                  {mockHistory[0].title}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-muted)] block">
                  RW: {mockHistory[0].reading_score} • Math: {mockHistory[0].math_score}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {mockHistory[0].score}
                </span>
                <Link
                  href={`/mock/results/${mockHistory[0].id}`}
                  className="p-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 transition"
                  title="View detailed AI analysis"
                >
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[var(--text-main)]">
                  No Mock Exam Attempts Yet
                </span>
                <span className="text-[11px] text-[var(--text-muted)] block">
                  Take your first 134-minute adaptive exam to calibrate your radar.
                </span>
              </div>
              <Link
                href="/mock"
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shrink-0"
              >
                Start Practice Test 1
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 8 Domains Grid List with Mastery Badges */}
      <div className="pt-4 border-t border-[var(--border-main)] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-500" />
            <span>8 College Board Domain Breakdown & Curriculum Alignment</span>
          </h3>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {domains.length} Domains Indexed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {domains.map((dom) => {
            const badgeColor =
              dom.status === "Mastered"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : dom.status === "Proficient"
                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                : dom.status === "Needs Focus"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                : "bg-slate-500/10 text-slate-500 border-slate-500/20";

            return (
              <div
                key={dom.domain}
                className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[var(--text-muted)]">
                      {dom.shortCode}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${badgeColor}`}>
                      {dom.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[var(--text-main)] mt-1 truncate" title={dom.domain}>
                    {dom.domain}
                  </h4>
                </div>

                <div className="space-y-1 pt-1 border-t border-[var(--border-main)]">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <span className="text-[var(--text-muted)] text-[11px]">Accuracy:</span>
                    <span className="font-bold text-[var(--text-main)]">
                      {dom.attempted > 0 ? `${dom.accuracy}%` : "0%"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                    <span>{dom.correct}/{dom.attempted || 0} solved</span>
                    <span>{dom.total} in bank</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <Link
                    href={
                      dom.section === "MATH"
                        ? `/math?domain=${encodeURIComponent(dom.domain)}`
                        : `/verbal?domain=${encodeURIComponent(dom.domain)}`
                    }
                    className="flex-1 py-1 px-2 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-bold text-[11px] text-center transition border border-[var(--border-main)] hover:border-[var(--accent-blue)]/30"
                  >
                    Drill
                  </Link>
                  <Link
                    href={`/curriculum/units/${dom.slug}`}
                    className="p-1 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition border border-[var(--border-main)]"
                    title="Open Khan Academy unit curriculum"
                  >
                    <BookOpen size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
