import React from "react";
import ErrorLogSkeleton from "@/components/skeletons/ErrorLogSkeleton";
import Skeleton from "@/components/skeletons/Skeleton";

export default function ErrorLogLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-32 h-6 rounded-full" />
            <Skeleton className="w-24 h-6 rounded-full" />
          </div>
          <Skeleton className="w-80 h-8 rounded-xl" />
          <Skeleton className="w-96 h-4 rounded-md" />
        </div>
        <ErrorLogSkeleton count={3} />
      </div>
    </div>
  );
}
