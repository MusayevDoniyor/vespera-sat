import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers } from "lucide-react";
import SATashkentVault from "@/components/SATashkentVault";
import { SATASHKENT_LIBRARY } from "@/lib/satashkent-data";

export const metadata: Metadata = {
  title: "Digital SAT Masterclass Vault & Archive (61 Books) | Vespera SAT",
  description:
    "Exhaustive 61-book archive: SAT Reading & Writing Professor IV (1,474 pages), College Board Question Banks, August 2026 Predictions, SAT Tashkent archives, Gramilliy grammar bible, Vocabook 3.0, Math Hard Books 1.0 & 2.0, English Elite, Elbek SAT, and 4,000+ real exam questions.",
};

export default function SATashkentPage() {
  return (
    <div className="w-full space-y-6 pb-16 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
        <Link
          href="/"
          className="hover:text-[var(--text-main)] flex items-center gap-1 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Dashboard</span>
        </Link>
        <span>/</span>
        <Link
          href="/curriculum"
          className="hover:text-[var(--text-main)] transition-colors"
        >
          Curriculum Map
        </Link>
        <span>/</span>
        <span className="text-[var(--accent-blue)] font-bold">
          Digital SAT Materials Vault ({SATASHKENT_LIBRARY.length} Books)
        </span>
      </div>

      {/* Main SATashkent Vault Hub */}
      <SATashkentVault />
    </div>
  );
}
