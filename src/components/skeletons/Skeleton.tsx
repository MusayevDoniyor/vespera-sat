"use client";

import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "shimmer" | "pulse";
}

export default function Skeleton({
  className = "",
  variant = "shimmer",
  ...props
}: SkeletonProps) {
  const baseClasses =
    variant === "shimmer"
      ? "skeleton"
      : "animate-pulse bg-[var(--bg-surface)]";

  return (
    <div
      className={`${baseClasses} ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
