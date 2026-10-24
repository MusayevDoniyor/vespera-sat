"use client";

import React from "react";
import Skeleton from "./Skeleton";

export default function MockResultSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Exam Result Header Skeleton */}
        <div className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <Skeleton className="w-32 h-6 rounded-full mx-auto md:mx-0" />
            <Skeleton className="w-64 h-8 rounded-xl mx-auto md:mx-0" />
            <Skeleton className="w-48 h-4 rounded mx-auto md:mx-0" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <Skeleton className="w-28 h-12 rounded-2xl mb-2" />
              <Skeleton className="w-20 h-4 rounded" />
            </div>
          </div>
        </div>

        {/* Section Score Split: Reading & Writing vs Math */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="w-40 h-5 rounded" />
              <Skeleton className="w-16 h-7 rounded-lg" />
            </div>
            <Skeleton className="w-full h-3 rounded-full" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Skeleton className="w-full h-12 rounded-xl" />
              <Skeleton className="w-full h-12 rounded-xl" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="w-32 h-5 rounded" />
              <Skeleton className="w-16 h-7 rounded-lg" />
            </div>
            <Skeleton className="w-full h-3 rounded-full" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Skeleton className="w-full h-12 rounded-xl" />
              <Skeleton className="w-full h-12 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Question Review Section Skeleton */}
        <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="w-48 h-6 rounded-lg" />
            <Skeleton className="w-32 h-9 rounded-xl" />
          </div>
          <div className="space-y-4 pt-2">
            {[1, 2, 3, 4].map((q) => (
              <div
                key={q}
                className="p-4 rounded-2xl bg-[var(--bg-surface)]/40 border border-[var(--border-subtle)] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                  <div className="space-y-1.5">
                    <Skeleton className="w-60 h-4 rounded" />
                    <Skeleton className="w-32 h-3 rounded" />
                  </div>
                </div>
                <Skeleton className="w-20 h-6 rounded-full shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
