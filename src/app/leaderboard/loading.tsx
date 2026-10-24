import React from "react";
import Skeleton from "@/components/skeletons/Skeleton";

export default function LeaderboardLoading() {
  return (
    <div className="w-full space-y-8 pb-16 animate-fade-in max-w-6xl mx-auto">
      <Skeleton className="h-40 rounded-3xl w-full" />
      <Skeleton className="h-20 rounded-2xl w-full" />
      <div className="flex justify-between items-center">
        <Skeleton className="w-64 h-10 rounded-2xl" />
        <Skeleton className="w-44 h-5 rounded-md" />
      </div>
      <div className="space-y-3">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-2xl w-full" />
        ))}
      </div>
    </div>
  );
}
