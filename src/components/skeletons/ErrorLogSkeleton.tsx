"use client";

import React from "react";
import Skeleton from "./Skeleton";

export default function ErrorLogSkeleton({ count = 2 }: { count?: number }) {
  const items = Array.from({ length: count });

  return (
    <div className="space-y-6 w-full">
      {/* Filter Tabs Skeleton */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Skeleton className="w-32 h-10 rounded-xl shrink-0" />
        <Skeleton className="w-28 h-10 rounded-xl shrink-0" />
        <Skeleton className="w-24 h-10 rounded-xl shrink-0" />
      </div>

      {/* Spaced Repetition Error Cards */}
      {items.map((_, idx) => (
        <div
          key={idx}
          className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 shadow-sm relative overflow-hidden"
        >
          {/* Top SM-2 Spaced Repetition Ribbon */}
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2.5">
              <Skeleton className="w-24 h-6 rounded-lg" />
              <Skeleton className="w-20 h-6 rounded-lg" />
              <Skeleton className="w-28 h-6 rounded-lg hidden sm:block" />
            </div>
            <Skeleton className="w-20 h-6 rounded-full" />
          </div>

          {/* Question Prompt Skeleton */}
          <div className="space-y-2.5">
            <Skeleton className="w-11/12 h-4 rounded" />
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-3/4 h-4 rounded" />
          </div>

          {/* Options Skeleton */}
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4].map((opt) => (
              <div
                key={opt}
                className="p-3.5 rounded-2xl border border-[var(--border-main)]/70 bg-[var(--bg-surface)]/20 flex items-center gap-3.5"
              >
                <Skeleton className="w-7 h-7 rounded-lg shrink-0" />
                <Skeleton className="w-1/2 h-3.5 rounded" />
              </div>
            ))}
          </div>

          {/* Bottom Retake & Ease Status */}
          <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
            <Skeleton className="w-32 h-10 rounded-xl" />
            <Skeleton className="w-28 h-4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
