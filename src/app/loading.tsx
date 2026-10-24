import React from "react";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] p-4 md:p-8">
      <DashboardSkeleton />
    </div>
  );
}
