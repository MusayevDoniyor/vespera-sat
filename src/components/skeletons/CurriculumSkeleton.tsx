"use client";

import React from "react";
import Skeleton from "./Skeleton";

export default function CurriculumSkeleton({ count = 8 }: { count?: number }) {
  const items = Array.from({ length: count });

  return (
    <div className="space-y-8 w-full">
      {/* Search & Filter Bar Skeleton */}
      <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col md:flex-row gap-4 items-center justify-between">
        <Skeleton className="w-full md:w-80 h-10 rounded-xl" />
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Skeleton className="w-20 h-9 rounded-xl shrink-0" />
          <Skeleton className="w-24 h-9 rounded-xl shrink-0" />
          <Skeleton className="w-28 h-9 rounded-xl shrink-0" />
        </div>
      </div>

      {/* Grid of Unit / Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-start gap-6">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="p-6 md:p-7 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col space-y-5 shadow-sm"
          >
            {/* Top Badge & Code */}
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="w-20 h-6 rounded-lg" />
              <Skeleton className="w-16 h-5 rounded-full" />
            </div>

            {/* Title & Description Lines */}
            <div className="space-y-2">
              <Skeleton className="w-4/5 h-5 rounded-md" />
              <Skeleton className="w-full h-3.5 rounded" />
              <Skeleton className="w-3/4 h-3.5 rounded" />
            </div>

            {/* Mastery Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <Skeleton className="w-16 h-3 rounded" />
                <Skeleton className="w-10 h-3 rounded" />
              </div>
              <Skeleton className="w-full h-2 rounded-full" />
            </div>

            {/* Bottom Action Buttons */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
              <Skeleton className="w-24 h-9 rounded-xl" />
              <Skeleton className="w-28 h-9 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
