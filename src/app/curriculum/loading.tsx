import React from "react";
import CurriculumSkeleton from "@/components/skeletons/CurriculumSkeleton";
import Skeleton from "@/components/skeletons/Skeleton";

export default function CurriculumLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-3">
          <Skeleton className="w-32 h-6 rounded-full" />
          <Skeleton className="w-80 h-8 rounded-xl" />
          <Skeleton className="w-96 h-4 rounded-md" />
        </div>
        <CurriculumSkeleton count={8} />
      </div>
    </div>
  );
}
