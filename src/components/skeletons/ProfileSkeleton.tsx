"use client";

import React from "react";
import Skeleton from "./Skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto w-full">
      {/* User Header Profile Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 w-full md:w-auto">
          {/* Avatar Skeleton */}
          <Skeleton className="w-20 h-20 rounded-2xl shrink-0" />
          <div className="space-y-2.5 flex-1">
            <div className="flex items-center gap-3">
              <Skeleton className="w-44 h-6 rounded-lg" />
              <Skeleton className="w-24 h-5 rounded-full" />
            </div>
            <Skeleton className="w-56 h-4 rounded-md" />
            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="w-28 h-6 rounded-lg" />
              <Skeleton className="w-32 h-6 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Skeleton className="w-32 h-10 rounded-xl" />
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="w-24 h-3.5 rounded" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
            <Skeleton className="w-20 h-7 rounded-lg" />
            <Skeleton className="w-28 h-3 rounded" />
          </div>
        ))}
      </div>

      {/* Difficulty Split & Domain Mastery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Difficulty Card */}
        <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <Skeleton className="w-36 h-5 rounded-md" />
            <Skeleton className="w-16 h-4 rounded" />
          </div>
          <div className="space-y-4 pt-2">
            {[1, 2, 3].map((d) => (
              <div key={d} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="w-20 h-3.5 rounded" />
                  <Skeleton className="w-12 h-3.5 rounded" />
                </div>
                <Skeleton className="w-full h-2.5 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Domain Mastery 2-column on lg */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <Skeleton className="w-44 h-5 rounded-md" />
            <Skeleton className="w-20 h-4 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[1, 2, 3, 4].map((dm) => (
              <div
                key={dm}
                className="p-4 rounded-2xl bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)] space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="w-28 h-4 rounded" />
                  <Skeleton className="w-10 h-4 rounded" />
                </div>
                <Skeleton className="w-full h-2 rounded-full" />
                <Skeleton className="w-24 h-3 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solved Questions History Table Skeleton */}
      <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 w-full sm:w-auto">
            <Skeleton className="w-48 h-5 rounded-md" />
            <Skeleton className="w-64 h-3.5 rounded" />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Skeleton className="w-24 h-9 rounded-xl" />
            <Skeleton className="w-24 h-9 rounded-xl" />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="p-4 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-surface)]/30 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <Skeleton className="w-7 h-7 rounded-lg shrink-0" />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <Skeleton className="w-3/4 h-4 rounded" />
                  <Skeleton className="w-1/3 h-3 rounded" />
                </div>
              </div>
              <Skeleton className="w-20 h-6 rounded-lg shrink-0 hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
