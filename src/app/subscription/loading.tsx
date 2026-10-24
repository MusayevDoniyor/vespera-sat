import React from "react";
import Skeleton from "@/components/skeletons/Skeleton";

export default function SubscriptionLoading() {
  return (
    <div className="w-full space-y-10 pb-20 animate-fade-in max-w-6xl mx-auto">
      {/* Header skeleton */}
      <div className="text-center space-y-4 pt-4 flex flex-col items-center">
        <Skeleton className="w-44 h-7 rounded-full" />
        <Skeleton className="w-96 max-w-full h-11 rounded-xl" />
        <Skeleton className="w-80 max-w-full h-5 rounded-md" />
        <Skeleton className="w-60 h-10 rounded-2xl" />
      </div>

      {/* Usage card skeleton */}
      <div className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="w-40 h-5 rounded-md" />
            <Skeleton className="w-72 h-4 rounded-sm" />
          </div>
          <Skeleton className="w-36 h-10 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl w-full" />
          ))}
        </div>
      </div>

      {/* Tier cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-[460px] rounded-3xl w-full" />
        <Skeleton className="h-[460px] rounded-3xl w-full" />
      </div>
    </div>
  );
}
