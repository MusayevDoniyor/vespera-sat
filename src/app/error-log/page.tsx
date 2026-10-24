"use client";

import React, { useEffect, useState, useRef } from "react";
import QuestionCard from "@/components/QuestionCard";
import Pagination from "@/components/Pagination";
import ErrorLogSkeleton from "@/components/skeletons/ErrorLogSkeleton";
import { Repeat, CheckCircle2, ArrowLeft, Clock, ShieldCheck, Flame } from "lucide-react";
import Link from "next/link";

export default function ErrorLogPage() {
  const [errors, setErrors] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"due" | "all">("due");

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const errorsTopRef = useRef<HTMLDivElement>(null);

  const fetchErrors = () => {
    setLoading(true);
    fetch(`/api/error-log?filter=${filter}`)
      .then((res) => res.json())
      .then((data) => {
        setErrors(data.errors || []);
        setSummary(data.summary || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading errors:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setPage(1);
    fetchErrors();
  }, [filter]);

  const totalErrors = errors.length;
  const totalPages = Math.max(1, Math.ceil(totalErrors / pageSize));
  const paginatedErrors = errors.slice((page - 1) * pageSize, page * pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    errorsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
    errorsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full space-y-8 pb-16 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-main)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href="/"
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] text-xs flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider font-mono">
              SM-2 Active Recall Engine
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-3">
            <Repeat className="text-rose-500" size={28} />
            <span>Spaced Repetition Error Log</span>
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 max-w-2xl leading-relaxed">
            Incorrect questions are automatically scheduled at optimal intervals (24h, 72h, 7d) based on Ebbinghaus memory retention curves.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2 bg-[var(--bg-card)] p-1.5 rounded-2xl border border-[var(--border-main)] text-xs shadow-sm shrink-0">
          <button
            onClick={() => setFilter("due")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
              filter === "due"
                ? "bg-rose-500 text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            Due Today ({summary?.due_count || 0})
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
              filter === "all"
                ? "bg-[var(--accent-blue)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            All Errors ({summary?.total_errors || 0})
          </button>
        </div>
      </div>

      {/* SM-2 Stages Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 md:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
          <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
            <Clock size={13} className="text-rose-500" /> Stage 1 (24h)
          </span>
          <span className="text-3xl font-black text-[var(--text-main)] mt-2 block">
            {summary?.stage_1_count || 0}
          </span>
          <span className="text-[11px] text-[var(--text-muted)] mt-1 block">Initial Recall</span>
        </div>

        <div className="p-5 md:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
          <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
            <Clock size={13} className="text-amber-500" /> Stage 2 (72h)
          </span>
          <span className="text-3xl font-black text-[var(--text-main)] mt-2 block">
            {summary?.stage_3_count || 0}
          </span>
          <span className="text-[11px] text-[var(--text-muted)] mt-1 block">Consolidation</span>
        </div>

        <div className="p-5 md:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
          <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
            <Clock size={13} className="text-[var(--accent-blue)]" /> Stage 3 (7 Days)
          </span>
          <span className="text-3xl font-black text-[var(--text-main)] mt-2 block">
            {summary?.stage_7_count || 0}
          </span>
          <span className="text-[11px] text-[var(--text-muted)] mt-1 block">Long-Term Storage</span>
        </div>

        <div className="p-5 md:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
          <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5 font-medium">
            <ShieldCheck size={13} className="text-[var(--accent-green)]" /> Mastered
          </span>
          <span className="text-3xl font-black text-[var(--accent-green)] mt-2 block">
            {summary?.mastered_count || 0}
          </span>
          <span className="text-[11px] text-[var(--accent-green)] mt-1 block font-semibold">Permanently Retained</span>
        </div>
      </div>

      {/* Questions Queue */}
      <div ref={errorsTopRef} className="space-y-6">
        {totalErrors > pageSize && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalErrors}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            itemName="error items"
          />
        )}

        {loading ? (
          <ErrorLogSkeleton count={3} />
        ) : errors.length === 0 ? (
          <div className="p-12 text-center text-[var(--text-muted)] bg-[var(--bg-card)] rounded-2xl border border-[var(--border-main)] shadow-sm">
            <CheckCircle2 size={44} className="text-[var(--accent-green)] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[var(--text-main)] mb-1">
              {filter === "due"
                ? "All scheduled reviews are complete for today!"
                : "No errors recorded in the database yet."}
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mt-1 leading-relaxed">
              As you practice Math and Verbal questions, any missed problems will automatically enter the spaced repetition queue for systematic recall.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {paginatedErrors.map((err) => (
                <div key={err.id} className="relative">
                  <div className="absolute top-3.5 right-4 z-10">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 font-mono">
                      {err.stage === "STAGE_1_DAY"
                        ? "24h Recall"
                        : err.stage === "STAGE_3_DAYS"
                        ? "72h Recall"
                        : "7-Day Recall"}
                    </span>
                  </div>
                  <QuestionCard
                    question={{
                      id: err.question_id,
                      section: err.section,
                      domain: err.domain,
                      difficulty: err.difficulty,
                      prompt: err.prompt,
                      passage: err.passage,
                      options: err.options,
                      correct_answer: err.correct_answer,
                      explanation_uz: err.explanation_uz,
                      explanation_en: err.explanation_en,
                      desmos_trick: err.desmos_trick,
                      topic_title_uz: err.topic_title_uz,
                    }}
                    onAnswerSubmitted={() => {
                      fetchErrors();
                    }}
                  />
                </div>
              ))}
            </div>

            {totalErrors > pageSize && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalErrors}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                itemName="error items"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
