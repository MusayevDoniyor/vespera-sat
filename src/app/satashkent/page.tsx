import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers } from "lucide-react";
import SATashkentVault from "@/components/SATashkentVault";

export const metadata: Metadata = {
  title: "SAT Tashkent Masterclass Vault & Archive | Vespera SAT",
  description:
    "Exhaustive 41-book archive, Gramilliy grammar bible, Vocabook 3.0 (420 pages), Math Hard Books 1.0 & 2.0, Wiley Math Bible, and 1,819+ real exam questions from SAT Tashkent.",
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
          SAT Tashkent Archive
        </span>
      </div>

      {/* Main SATashkent Vault Hub */}
      <SATashkentVault />
    </div>
  );
}
