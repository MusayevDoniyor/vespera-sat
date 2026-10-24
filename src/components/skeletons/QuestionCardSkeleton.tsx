"use client";

import React from "react";
import Skeleton from "./Skeleton";

interface QuestionCardSkeletonProps {
  count?: number;
  compact?: boolean;
}

export default function QuestionCardSkeleton({
  count = 1,
  compact = false,
}: QuestionCardSkeletonProps) {
  const items = Array.from({ length: count });

  return (
    <div className="space-y-6 w-full">
      {items.map((_, idx) => (
        <div
          key={idx}
          className={`rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm ${
            compact ? "p-5 md:p-6 space-y-4" : "p-6 md:p-8 space-y-6"
          }`}
        >
          {/* Header Metadata Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Skeleton className="w-16 h-6 rounded-lg" />
              <Skeleton className="w-20 h-6 rounded-lg" />
              <Skeleton className="w-24 h-6 rounded-lg hidden sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-xl" />
            </div>
          </div>

          {/* Question Prompt Skeleton Lines */}
          <div className="space-y-2.5 pt-1">
            <Skeleton className="w-11/12 h-4 rounded-md" />
            <Skeleton className="w-full h-4 rounded-md" />
            <Skeleton className="w-4/5 h-4 rounded-md" />
            <Skeleton className="w-2/5 h-4 rounded-md" />
          </div>

          {/* Diagram / Math Formula Placeholder */}
          {!compact && (
            <div className="p-4 rounded-2xl bg-[var(--bg-surface)]/40 border border-[var(--border-subtle)] flex flex-col items-center justify-center gap-2 py-8">
              <Skeleton className="w-48 h-5 rounded-md" />
              <Skeleton className="w-64 h-3.5 rounded-md" />
            </div>
          )}

          {/* 4 Option Cards Skeleton */}
          <div className="space-y-3 pt-2">
            {["A", "B", "C", "D"].map((letter, optIdx) => (
              <div
                key={letter}
                className="p-3.5 md:p-4 rounded-2xl border border-[var(--border-main)]/80 bg-[var(--bg-surface)]/30 flex items-center gap-3.5"
              >
                <div className="w-7 h-7 rounded-lg bg-[var(--bg-surface-hover)] border border-[var(--border-main)] flex items-center justify-center shrink-0 text-xs font-bold text-[var(--text-muted)] opacity-60">
                  {letter}
                </div>
                <div className="flex-1 space-y-1.5">
                  <Skeleton
                    className={`h-3.5 rounded ${
                      optIdx === 0
                        ? "w-3/5"
                        : optIdx === 1
                        ? "w-4/5"
                        : optIdx === 2
                        ? "w-2/3"
                        : "w-1/2"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Bar */}
          <div className="pt-2 flex items-center justify-between gap-4 border-t border-[var(--border-subtle)]">
            <Skeleton className="w-32 h-10 rounded-xl" />
            <Skeleton className="w-24 h-4 rounded-md hidden sm:block" />
          </div>
        </div>
      ))}
    </div>
  );
}
