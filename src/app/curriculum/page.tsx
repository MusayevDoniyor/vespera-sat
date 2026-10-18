"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  GitBranch,
  Sparkles,
  ArrowRight,
  BookOpen,
  Search,
  FileText,
  Calculator,
  ChevronDown,
  ChevronUp,
  Layers,
  Award,
  AlertTriangle,
  Target,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import TopicStudyModal from "@/components/TopicStudyModal";
import SATashkentVault from "@/components/SATashkentVault";
import MathDictionary from "@/components/MathDictionary";
import KhanAcademyUnitsView from "@/components/KhanAcademyUnitsView";
import { OFFICIAL_TOPICS_DATA } from "@/lib/curriculum-data";

// Fallback initial dataset to guarantee 0ms instant render without network delay
const INITIAL_TOPICS = Object.values(OFFICIAL_TOPICS_DATA).map((meta, idx) => ({
  id: meta.code,
  code: meta.code,
  section: meta.section,
  domain: meta.domain,
  title_en: meta.title_en,
  title_uz: meta.title_uz,
  description_en: meta.description_en,
  description_uz: meta.description_uz,
  formula_sheet: meta.formulas.map((f) => `${f.name}: ${f.latex}`).join(" | "),
  question_count: meta.section === "MATH" ? 8 : 7,
  mastered_count: 0,
  sort_order: idx + 1,
}));

export default function CurriculumPage() {
  const [topics, setTopics] = useState<any[]>(INITIAL_TOPICS);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<"ALL" | "MATH" | "READING_WRITING">("ALL");
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);
  const [studyModalTopicCode, setStudyModalTopicCode] = useState<string | null>(null);
  const [mainView, setMainView] = useState<"khan" | "topics" | "dictionary" | "satashkent">("khan");

  // Fetch live stats and counts from database in background
  useEffect(() => {
    fetch("/api/topics")
      .then((res) => res.json())
      .then((data) => {
        if (data.topics && data.topics.length > 0) {
          setTopics(data.topics);
        }
      })
      .catch((err) => {
        console.error("Error refreshing curriculum counts:", err);
      });
  }, []);

  const mathCount = useMemo(
    () => topics.filter((t) => t.section === "MATH").length,
    [topics]
  );
  const rwCount = useMemo(
    () => topics.filter((t) => t.section === "READING_WRITING").length,
    [topics]
  );

  const handleSelectSection = (sec: "ALL" | "MATH" | "READING_WRITING") => {
    setActiveSection(sec);
    setSelectedDomain("ALL");
    setMainView("topics"); // Always switch to topics grid when a section tab is clicked
  };

  // Extract unique domains for active section
  const availableDomains = useMemo(() => {
    const dSet = new Set<string>();
    topics.forEach((t) => {
      if (activeSection === "ALL" || t.section === activeSection) {
        dSet.add(t.domain);
      }
    });
    return Array.from(dSet);
  }, [topics, activeSection]);

  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      // 1. Primary Section Filter
      if (activeSection !== "ALL" && t.section !== activeSection) {
        return false;
      }

      // 2. Domain Filter
      if (selectedDomain !== "ALL" && t.domain !== selectedDomain) {
        return false;
      }

      // 3. Search Query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const meta = OFFICIAL_TOPICS_DATA[t.code];
      const panda = meta?.collegePandaChapter?.toLowerCase() || "";

      return (
        t.code.toLowerCase().includes(q) ||
        t.domain.toLowerCase().includes(q) ||
        t.title_en.toLowerCase().includes(q) ||
        (t.title_uz && t.title_uz.toLowerCase().includes(q)) ||
        (t.description_en && t.description_en.toLowerCase().includes(q)) ||
        (t.formula_sheet && t.formula_sheet.toLowerCase().includes(q)) ||
        panda.includes(q)
      );
    });
  }, [topics, activeSection, selectedDomain, searchQuery]);

  return (
    <div className="w-full space-y-8 pb-16 animate-fade-in">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-main)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-[var(--accent-blue)] uppercase tracking-wider font-mono">
              College Board Taxonomy
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              28 Official Domains & Chapters
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-3">
            <GitBranch className="text-[var(--accent-blue)]" size={28} />
            <span>Digital SAT Curriculum & Formula Vault</span>
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 max-w-2xl leading-relaxed">
            Exhaustive first-principles breakdown of all 28 official topics, College Panda chapter mapping, College Board trap taxonomy, and Desmos bypass speedhacks.
          </p>
        </div>

        {/* Section Filter Tabs */}
        <div
          role="tablist"
          aria-label="Section Filters"
          className="flex items-center gap-1.5 bg-[var(--bg-card)] p-1.5 rounded-2xl border border-[var(--border-main)] text-xs shadow-sm shrink-0"
        >
          <button
            role="tab"
            aria-selected={activeSection === "ALL"}
            aria-label={`All topics (${topics.length})`}
            onClick={() => handleSelectSection("ALL")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeSection === "ALL"
                ? "bg-[var(--accent-blue)] text-white shadow-sm font-black"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
            }`}
          >
            <span>All</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
              {topics.length}
            </span>
          </button>

          <button
            role="tab"
            aria-selected={activeSection === "MATH"}
            aria-label={`Math topics (${mathCount})`}
            onClick={() => handleSelectSection("MATH")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeSection === "MATH"
                ? "bg-[var(--accent-blue)] text-white shadow-sm font-black"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
            }`}
          >
            <Calculator size={14} />
            <span>Math</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
              {mathCount}
            </span>
          </button>

          <button
            role="tab"
            aria-selected={activeSection === "READING_WRITING"}
            aria-label={`Reading and Writing topics (${rwCount})`}
            onClick={() => handleSelectSection("READING_WRITING")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeSection === "READING_WRITING"
                ? "bg-purple-600 text-white shadow-sm font-black"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
            }`}
          >
            <BookOpen size={14} />
            <span>Reading & Writing</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
              {rwCount}
            </span>
          </button>
        </div>
      </header>

      {/* Primary Vault Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-semibold shadow-sm overflow-x-auto scrollbar-none">
        <button
          onClick={() => setMainView("khan")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            mainView === "khan"
              ? "bg-[var(--accent-blue)] text-white shadow-sm font-bold"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
          }`}
        >
          <Award size={15} />
          <span>🎓 Khan Academy 13-Units Curriculum</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-mono font-bold">
            13 Units
          </span>
        </button>

        <button
          onClick={() => setMainView("topics")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            mainView === "topics"
              ? "bg-[var(--accent-blue)] text-white shadow-sm font-bold"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
          }`}
        >
          <GitBranch size={15} />
          <span>28 Official Domains & Formula Taxonomy</span>
        </button>

        <button
          onClick={() => setMainView("dictionary")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            mainView === "dictionary"
              ? "bg-emerald-600 text-white shadow-sm font-bold"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
          }`}
        >
          <BookOpen size={15} />
          <span>📘 SAT Math Terminology & Operations Dictionary</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
            82 Terms
          </span>
        </button>

        <Link
          href="/satashkent"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 border border-purple-500/20"
        >
          <GraduationCap size={15} />
          <span>🇺🇿 Digital SAT Masterclass & Materials Vault (54 Books) →</span>
        </Link>
      </div>

      {mainView === "khan" ? (
        <KhanAcademyUnitsView />
      ) : mainView === "satashkent" ? (
        <SATashkentVault />
      ) : mainView === "dictionary" ? (
        <MathDictionary />
      ) : (
        <>
          {/* Domain Secondary Filter Bar & Search */}
      <div className="p-4 md:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] shrink-0">
              <Layers size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wide">
                Direct College Panda & Bluebook Integration
              </h4>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                Every topic maps directly to College Panda Math Ch 1–20 and College Board Digital SAT question criteria.
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[260px] md:w-80">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search topic code, chapter, or trap..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
            />
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[var(--border-main)] scrollbar-none text-xs">
          <button
            onClick={() => setSelectedDomain("ALL")}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedDomain === "ALL"
                ? "bg-[var(--accent-blue)] text-white shadow-sm font-semibold"
                : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)]"
            }`}
          >
            All Domains
          </button>
          {availableDomains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedDomain === dom
                  ? "bg-[var(--accent-blue)] text-white shadow-sm font-semibold"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)]"
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      {loading ? (
        <div className="p-16 text-center text-[var(--text-muted)] bg-[var(--bg-card)] rounded-3xl border border-[var(--border-main)]">
          <div className="w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Loading curriculum database...
        </div>
      ) : filteredTopics.length === 0 ? (
        <div className="p-12 text-center text-[var(--text-muted)] bg-[var(--bg-card)] rounded-3xl border border-[var(--border-main)]">
          No topics matched "{searchQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-start gap-6">
          {filteredTopics.map((t) => {
            const isMath = t.section === "MATH";
            const meta = OFFICIAL_TOPICS_DATA[t.code];
            const isFormulaExpanded = expandedFormula === t.id;

            return (
              <div
                key={t.id}
                className="p-6 md:p-7 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/50 transition-all flex flex-col shadow-sm group"
              >
                <div>
                  {/* Top Metadata Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                          isMath
                            ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20"
                            : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                        }`}
                      >
                        {t.code} • {t.domain}
                      </span>

                      {meta?.yieldTier && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono ${
                            meta.yieldTier === "HIGHEST YIELD"
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                              : meta.yieldTier === "HIGH YIELD"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                          }`}
                        >
                          ★ {meta.yieldTier}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-[var(--text-muted)] font-mono">
                      {t.question_count || 0} questions
                    </span>
                  </div>

                  {/* Title & English Description */}
                  <h3 className="font-black text-base text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors mb-0.5">
                    {t.title_en}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] mb-3 font-medium line-clamp-2">
                    {t.description_en || meta?.description_en || `${t.domain} • Digital SAT Suite`}
                  </p>

                  {/* College Panda Chapter Pill */}
                  {meta?.collegePandaChapter && (
                    <div className="mb-2 p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                      <FileText size={13} className="text-[var(--accent-blue)] shrink-0" />
                      <span className="font-mono truncate">
                        <strong className="text-[var(--text-main)]">Curriculum: </strong>
                        {meta.collegePandaChapter}
                      </span>
                    </div>
                  )}

                  {/* SATashkent Mapping Pill */}
                  <div className="mb-3.5 p-2 rounded-xl bg-purple-500/5 border border-purple-500/20 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-mono">
                      <GraduationCap size={13} className="shrink-0" />
                      <span className="font-semibold">SATashkent:</span>
                      <span className="text-[var(--text-muted)] truncate max-w-[190px] sm:max-w-[240px]">
                        {isMath
                          ? "Cheat Sheet & Math Hard Book"
                          : "Gramilliy & SAToplam 2.0"}
                      </span>
                    </div>
                    <button
                      onClick={() => setMainView("satashkent")}
                      className="text-[10px] font-bold text-purple-600 dark:text-purple-400 hover:underline shrink-0"
                    >
                      Vault →
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--text-muted)] mb-3.5 leading-relaxed">
                    {t.description_en || t.description_uz}
                  </p>

                  {/* Formula Sheet Callout */}
                  {t.formula_sheet && (
                    <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] mb-3">
                      <div className="flex items-center justify-between font-mono text-[11px] font-bold text-[var(--accent-blue)] mb-1">
                        <span className="flex items-center gap-1.5">
                          <BookOpen size={13} />
                          <span>Core Formulas & Rules</span>
                        </span>
                        <button
                          onClick={() => setExpandedFormula(isFormulaExpanded ? null : t.id)}
                          className="text-[var(--text-muted)] hover:text-[var(--text-main)] text-[10px] flex items-center gap-0.5"
                        >
                          <span>{isFormulaExpanded ? "Collapse" : "Expand"}</span>
                          {isFormulaExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                      </div>
                      <p
                        className={`text-[11px] text-[var(--text-muted)] leading-relaxed font-mono ${
                          !isFormulaExpanded ? "line-clamp-2" : ""
                        }`}
                      >
                        {t.formula_sheet}
                      </p>
                    </div>
                  )}

                  {/* Traps Preview Badge */}
                  {meta?.traps && meta.traps.length > 0 && (
                    <div className="mb-3 p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium text-[11px]">
                        <AlertTriangle size={13} className="shrink-0" />
                        <span>{meta.traps.length} SAT Traps Documented</span>
                      </div>
                      <button
                        onClick={() => setStudyModalTopicCode(t.code)}
                        className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline font-mono"
                      >
                        Inspect Traps →
                      </button>
                    </div>
                  )}

                  {/* Desmos Tips */}
                  {(t.desmos_tips_en || t.desmos_tips) && (
                    <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] flex items-start gap-2 mb-3">
                      <Sparkles size={13} className="text-[var(--accent-green)] shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed">
                        <strong className="text-[var(--accent-green)]">Desmos: </strong>
                        {t.desmos_tips_en || t.desmos_tips}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 mt-auto border-t border-[var(--border-main)] flex items-center justify-between gap-3">
                  <button
                    onClick={() => setStudyModalTopicCode(t.code)}
                    className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-main)] hover:text-[var(--accent-blue)] transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <BookOpen size={13} className="text-[var(--accent-blue)]" />
                    <span>Deep-Dive Theory</span>
                  </button>

                  <Link
                    href={
                      isMath
                        ? `/math?topic=${encodeURIComponent(t.code)}`
                        : `/verbal?topic=${encodeURIComponent(t.code)}`
                    }
                    className="text-xs font-bold text-[var(--accent-blue)] hover:underline flex items-center gap-1"
                  >
                    <span>Practice ({t.question_count || 0})</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
        </>
      )}

      {/* Topic Study Modal */}
      {studyModalTopicCode && (
        <TopicStudyModal
          topicCode={studyModalTopicCode}
          onClose={() => setStudyModalTopicCode(null)}
          onLaunchVisualDiagram={(key) => {
            // Can route to visual diagram or open in math/verbal
            window.location.href = `/math?topic=${encodeURIComponent(studyModalTopicCode)}`;
          }}
        />
      )}
    </div>
  );
}
