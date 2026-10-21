"use client";

import React, { useState, useMemo, useDeferredValue } from "react";
import KaTeXMath from "./KaTeXMath";
import {
  SAT_MATH_TERMINOLOGY,
  SAT_MATH_CATEGORIES,
  MathTerm,
} from "@/lib/math-terminology";
import {
  Search,
  BookOpen,
  Calculator,
  Sparkles,
  Layers,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function MathDictionary() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTerms = useMemo(() => {
    return SAT_MATH_TERMINOLOGY.filter((item) => {
      // 1. Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // 2. Search query filter (matches English term, Uzbek translation, or definition)
      if (deferredSearch.trim()) {
        const query = deferredSearch.toLowerCase().trim();
        const matchTerm = item.term.toLowerCase().includes(query);
        const matchUzbek = item.uzbek.toLowerCase().includes(query);
        const matchDefEn = item.definitionEn.toLowerCase().includes(query);
        const matchDefUz = item.definitionUz.toLowerCase().includes(query);
        const matchPhrasing = item.satPhrasing.toLowerCase().includes(query);
        return matchTerm || matchUzbek || matchDefEn || matchDefUz || matchPhrasing;
      }

      return true;
    });
  }, [selectedCategory, deferredSearch]);

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] text-xs font-bold font-mono uppercase tracking-wider mb-2">
              <BookOpen size={14} />
              <span>Official SAT Math Vocabulary & Operations Guide</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tight">
              SAT Math Terminology & Formulas Dictionary
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed mt-1">
              Complete reference guide for all mathematical operations, phrases, algebraic invariants, and geometric terminology used on the official College Board Digital SAT.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              {filteredTerms.length} / {SAT_MATH_TERMINOLOGY.length} Terms
            </span>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            size={18}
          />
          <input
            type="text"
            placeholder="Search any math term or operation (e.g., 'slope', 'reciprocal', 'sum', 'vertex', 'discriminant')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-sm focus:outline-none focus:border-[var(--accent-blue)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-main)]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {SAT_MATH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-[var(--accent-blue)] text-white shadow-sm"
                  : "bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)]"
              }`}
            >
              <span>{cat.labelEn}</span>
              <span className="opacity-70 text-[10px] ml-1.5 font-mono">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-3">
          <HelpCircle className="mx-auto text-[var(--text-muted)]" size={36} />
          <p className="text-sm font-bold text-[var(--text-main)]">
            No math terms matched "{searchQuery}"
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Try searching for common terms like "slope", "reciprocal", "sum", "qoldiq", or reset the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--accent-blue)] text-white shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/50 transition-all shadow-[var(--shadow-sm)] flex flex-col justify-between space-y-4"
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-black text-[var(--text-main)] tracking-tight flex items-baseline gap-2">
                      <span>{t.term}</span>
                      {t.phonetic && (
                        <span className="text-xs font-mono font-normal text-[var(--text-muted)]">
                          {t.phonetic}
                        </span>
                      )}
                    </h3>
                    <div className="text-sm font-bold text-[var(--accent-blue)] mt-0.5">
                      🇺🇿 {t.uzbek}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase font-mono shrink-0 bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-main)]">
                    {t.category}
                  </span>
                </div>

                {/* Definitions */}
                <div className="space-y-2 mt-3 pt-3 border-t border-[var(--border-main)] text-xs leading-relaxed">
                  <div className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-main)]">Definition:</strong> {t.definitionEn}
                  </div>
                  <div className="text-[var(--text-muted)] italic">
                    <strong className="text-[var(--text-main)] not-italic">Uzbek Translation:</strong> {t.definitionUz}
                  </div>
                </div>
              </div>

              {/* SAT Phrasing & Formula */}
              <div className="space-y-3 pt-3 border-t border-[var(--border-main)]">
                {/* College Board prompt phrasing */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <div className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                    <Lightbulb size={13} />
                    <span>How College Board uses this in questions:</span>
                  </div>
                  <p className="text-[11px] text-amber-900 dark:text-amber-200/90 leading-relaxed">
                    {t.satPhrasing}
                  </p>
                </div>

                {/* Formula / Invariant Box */}
                <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0">Model:</span>
                  <div className="text-xs font-mono overflow-x-auto text-[var(--text-main)]">
                    <KaTeXMath content={t.exampleFormula} />
                  </div>
                </div>

                {/* Desmos tip if present */}
                {t.desmosTip && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-300 flex items-center gap-2 font-mono">
                    <Calculator size={13} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.desmosTip}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
