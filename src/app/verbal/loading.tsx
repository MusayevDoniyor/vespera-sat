import React from "react";
import QuestionCardSkeleton from "@/components/skeletons/QuestionCardSkeleton";
import Skeleton from "@/components/skeletons/Skeleton";

export default function VerbalLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-36 h-6 rounded-full" />
            <Skeleton className="w-24 h-6 rounded-full" />
          </div>
          <Skeleton className="w-80 h-8 rounded-xl" />
          <Skeleton className="w-96 h-4 rounded-md" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Skeleton className="w-24 h-10 rounded-xl shrink-0" />
          <Skeleton className="w-32 h-10 rounded-xl shrink-0" />
          <Skeleton className="w-28 h-10 rounded-xl shrink-0" />
          <Skeleton className="w-28 h-10 rounded-xl shrink-0" />
        </div>

        {/* Question Cards Skeleton */}
        <QuestionCardSkeleton count={3} />
      </div>
    </div>
  );
}
