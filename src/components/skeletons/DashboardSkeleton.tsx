"use client";

import React from "react";
import Skeleton from "./Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Welcome Banner Skeleton */}
      <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-24 h-6 rounded-full" />
            <Skeleton className="w-32 h-6 rounded-full" />
          </div>
          <Skeleton className="w-80 h-8 rounded-xl" />
          <Skeleton className="w-full h-4 rounded-md" />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Skeleton className="w-36 h-11 rounded-xl" />
          <Skeleton className="w-36 h-11 rounded-xl" />
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 md:p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-3.5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="w-24 h-3.5 rounded" />
              <Skeleton className="w-9 h-9 rounded-xl" />
            </div>
            <Skeleton className="w-24 h-8 rounded-lg" />
            <Skeleton className="w-32 h-3.5 rounded" />
          </div>
        ))}
      </div>

      {/* Two-column layout: Daily High-Yield Workout & Domain Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Questions (2 cols) */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <Skeleton className="w-56 h-6 rounded-lg" />
              <Skeleton className="w-72 h-3.5 rounded" />
            </div>
            <Skeleton className="w-24 h-8 rounded-xl" />
          </div>

          {/* Question preview skeleton */}
          <div className="p-5 rounded-2xl bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)] space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-16 h-5 rounded" />
              <Skeleton className="w-14 h-5 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-4/5 h-4 rounded" />
              <Skeleton className="w-2/3 h-4 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <Skeleton className="w-full h-10 rounded-xl" />
              <Skeleton className="w-full h-10 rounded-xl" />
              <Skeleton className="w-full h-10 rounded-xl" />
              <Skeleton className="w-full h-10 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Domain Mastery Bars (1 col) */}
        <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 shadow-sm">
          <div className="space-y-1.5">
            <Skeleton className="w-40 h-5 rounded-md" />
            <Skeleton className="w-48 h-3.5 rounded" />
          </div>

          <div className="space-y-4 pt-2">
            {[1, 2, 3, 4].map((d) => (
              <div key={d} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="w-28 h-3.5 rounded" />
                  <Skeleton className="w-10 h-3.5 rounded" />
                </div>
                <Skeleton className="w-full h-2 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
