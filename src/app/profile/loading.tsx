import React from "react";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] p-4 md:p-8">
      <ProfileSkeleton />
    </div>
  );
}
