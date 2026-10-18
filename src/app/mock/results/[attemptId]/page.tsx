"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RotateCcw, AlertCircle, Sparkles } from "lucide-react";
import MockResultsView from "@/components/mock/MockResultsView";
import { getAttemptReport, MockAttemptReport } from "@/lib/mock-storage";

export default function MockResultsPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = (params?.attemptId as string) || "";

  const [report, setReport] = useState<MockAttemptReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!attemptId) return;

    // Load from local report store
    const localReport = getAttemptReport(attemptId);
    if (localReport) {
      setReport(localReport);
      setLoading(false);
      return;
    }

    // Fallback: fetch from /api/stats to see if there is matching attempt
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.mockHistory && Array.isArray(data.mockHistory)) {
          const match = data.mockHistory.find(
            (m: any) => m.id === attemptId || attemptId.includes(m.id)
          );
          if (match) {
            const fallback = getAttemptReport(match.id);
            if (fallback) {
              setReport(fallback);
              setLoading(false);
              return;
            }
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Loading AI Exam Analysis & Score Report...
          </span>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[var(--text-main)]">
            Exam Report Not Found
          </h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            We couldn't locate a stored attempt report for ID: <code className="font-mono text-xs text-[var(--text-main)]">{attemptId}</code>.
          </p>
          <div className="pt-2">
            <Link
              href="/mock"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Exam Lobby</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <MockResultsView
        report={report}
        onRetake={() => router.push(`/mock/exam/${report.examId}`)}
      />
    </div>
  );
}
