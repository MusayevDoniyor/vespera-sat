"use client";

import React, { useEffect, useState, useMemo, useRef, Suspense } from "react";
import QuestionCard from "@/components/QuestionCard";
import DesmosCalculator from "@/components/DesmosCalculator";
import VisualTopicDiagram from "@/components/VisualTopicDiagram";
import TopicStudyModal from "@/components/TopicStudyModal";
import { OFFICIAL_TOPICS_DATA } from "@/lib/curriculum-data";
import {
  Calculator,
  Sparkles,
  Filter,
  SplitSquareVertical,
  ArrowLeft,
  Eye,
  EyeOff,
  BookOpen,
  FileText,
  AlertTriangle,
  ChevronRight,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

const MATH_DOMAINS = [
  {
    key: "ALL",
    label: "All Math Questions",
    topics: [],
  },
  {
    key: "Algebra",
    label: "1. Algebra",
    topics: ["ALG-01", "ALG-02", "ALG-03", "ALG-04"],
  },
  {
    key: "Advanced Math",
    label: "2. Advanced Math",
    topics: ["ADV-01", "ADV-02", "ADV-03", "ADV-04", "ADV-05"],
  },
  {
    key: "Problem Solving & Data Analysis",
    label: "3. Data Analysis",
    topics: ["DAT-01", "DAT-02", "DAT-03", "DAT-04"],
  },
  {
    key: "Geometry & Trigonometry",
    label: "4. Geometry & Trig",
    topics: ["GEO-01", "GEO-02", "GEO-03", "GEO-04"],
  },
];

function MathContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const urlTopic = searchParams.get("topic");

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [isSplitDesmos, setIsSplitDesmos] = useState(true);
  const [showVisualGuide, setShowVisualGuide] = useState(false);
  const [activeEquation, setActiveEquation] = useState<string>("");
  const [studyModalTopic, setStudyModalTopic] = useState<string | null>(null);

  // Sync from URL parameter
  useEffect(() => {
    if (urlTopic && OFFICIAL_TOPICS_DATA[urlTopic]) {
      const topicData = OFFICIAL_TOPICS_DATA[urlTopic];
      setSelectedDomain(topicData.domain);
      setSelectedTopic(urlTopic);
    }
  }, [urlTopic]);

  const cacheRef = useRef<Record<string, any[]>>({});

  // Fetch questions
  useEffect(() => {
    let url = "/api/questions?section=MATH&limit=200";
    if (selectedTopic !== "ALL") {
      url += `&topicCode=${encodeURIComponent(selectedTopic)}`;
    } else if (selectedDomain !== "ALL") {
      url += `&domain=${encodeURIComponent(selectedDomain)}`;
    }
    if (selectedDifficulty !== "ALL") {
      url += `&difficulty=${encodeURIComponent(selectedDifficulty)}`;
    }

    if (cacheRef.current[url]) {
      setQuestions(cacheRef.current[url]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const list = data.questions || [];
        cacheRef.current[url] = list;
        setQuestions(list);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error loading math questions:", err);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [selectedDomain, selectedTopic, selectedDifficulty]);

  // Active domain's topics
  const currentDomainTopics = useMemo(() => {
    if (selectedDomain === "ALL") {
      return Object.keys(OFFICIAL_TOPICS_DATA).filter(
        (code) => OFFICIAL_TOPICS_DATA[code].section === "MATH"
      );
    }
    const found = MATH_DOMAINS.find((d) => d.key === selectedDomain);
    return found ? found.topics : [];
  }, [selectedDomain]);

  const activeTopicData = selectedTopic !== "ALL" ? OFFICIAL_TOPICS_DATA[selectedTopic] : null;

  const recommendedDifficulty = useMemo(() => {
    if (!user) return "Hard";
    if (user.mathLevel === "target_800" || user.mathLevel === "advanced") return "Hard";
    if (user.mathLevel === "beginner") return "Easy";
    return "Medium";
  }, [user]);

  const isRecommendedActive = selectedDifficulty.toLowerCase() === recommendedDifficulty.toLowerCase();

  return (
    <div className="space-y-8 pb-16">
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
            <span className="text-xs font-bold text-[var(--accent-blue)] uppercase tracking-wider font-mono">
              Target 800 Math Blueprint
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-3">
            <Calculator className="text-[var(--accent-blue)]" size={28} />
            <span>SAT Math Mastery Studio</span>
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 max-w-2xl leading-relaxed">
            First-principles conceptual foundations, College Panda curricula, topic-level drills, and high-speed Desmos shortcuts.
          </p>
        </div>

        {/* View Switches */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowVisualGuide(!showVisualGuide)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showVisualGuide
                ? "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] shadow-sm"
                : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
            }`}
          >
            {showVisualGuide ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>Visual Laboratory</span>
          </button>

          <button
            onClick={() => setIsSplitDesmos(!isSplitDesmos)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isSplitDesmos
                ? "bg-[var(--accent-green)]/15 text-[var(--accent-green)] border-[var(--accent-green)]/40 shadow-sm"
                : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
            }`}
          >
            <SplitSquareVertical size={15} />
            <span>Desmos Split-View</span>
          </button>
        </div>
      </div>

      {/* User Personalized Track Banner */}
      {user && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-transparent border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-blue)] animate-ping" />
            <span className="text-xs font-bold text-[var(--text-main)]">
              Personalized Track:{" "}
              <span className="text-[var(--accent-blue)] font-black uppercase font-mono">
                {user.mathLevel.replace("_", " ")}
              </span>{" "}
              (Target: {user.mathLevel === "target_800" ? "800 Flawless" : "750+"})
            </span>
            <span className="text-xs text-[var(--text-muted)] hidden md:inline">
              • Calibrated for your {user.targetSatScore || 1550}+ composite goal
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isRecommendedActive) {
                  setSelectedDifficulty("ALL");
                } else {
                  setSelectedDifficulty(recommendedDifficulty);
                }
              }}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 shadow-sm ${
                isRecommendedActive
                  ? "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] shadow-md"
                  : "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-[var(--accent-blue)] text-[var(--accent-blue)]"
              }`}
            >
              <Sparkles size={12} />
              <span>
                {isRecommendedActive
                  ? `Active: ${recommendedDifficulty} Track (Click to Show All)`
                  : `Recommended For My Level (${recommendedDifficulty})`}
              </span>
            </button>
            {selectedDifficulty !== "ALL" && (
              <button
                onClick={() => setSelectedDifficulty("ALL")}
                className="text-[11px] font-bold px-2.5 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                title="Reset difficulty filter"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>
      )}

      {/* Visual Diagrams Guide (Toggleable) */}
      {showVisualGuide && (
        <VisualTopicDiagram topicType="slope_intercept" />
      )}

      {/* Domain Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {MATH_DOMAINS.map((d) => (
            <button
              key={d.key}
              onClick={() => {
                setSelectedDomain(d.key);
                setSelectedTopic("ALL");
              }}
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all border ${
                selectedDomain === d.key
                  ? "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] shadow-sm"
                  : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Sub-Topic Granular Filter Bar */}
        <div className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-[10px] uppercase font-mono font-bold text-[var(--text-muted)] pl-1 shrink-0">
            Topics ({currentDomainTopics.length}):
          </span>

          <button
            onClick={() => setSelectedTopic("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTopic === "ALL"
                ? "bg-[var(--accent-blue)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-main)]"
            }`}
          >
            All {selectedDomain === "ALL" ? "Math" : selectedDomain} Topics
          </button>

          {currentDomainTopics.map((code) => {
            const meta = OFFICIAL_TOPICS_DATA[code];
            const isSelected = selectedTopic === code;

            return (
              <button
                key={code}
                onClick={() => setSelectedTopic(code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[var(--accent-blue)] text-white shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-main)]"
                }`}
              >
                <span className="font-mono text-[10px]">{code}</span>
                <span>•</span>
                <span>{meta ? meta.title_en : code}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Workout / Difficulty Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] uppercase font-mono font-bold text-[var(--text-muted)] shrink-0">
              Workout Mode:
            </span>
            <button
              onClick={() => setSelectedDifficulty("ALL")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                selectedDifficulty === "ALL"
                  ? "bg-[var(--accent-blue)] text-white shadow-sm font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-card)] border border-[var(--border-main)]"
              }`}
            >
              All Levels
            </button>
            <button
              onClick={() => setSelectedDifficulty("Easy")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                selectedDifficulty.toLowerCase() === "easy"
                  ? "bg-emerald-600 text-white shadow-sm font-bold"
                  : "text-emerald-500 hover:text-emerald-400 bg-emerald-950/20 border border-emerald-500/30"
              }`}
            >
              Foundations (Easy)
            </button>
            <button
              onClick={() => setSelectedDifficulty("Medium")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                selectedDifficulty.toLowerCase() === "medium"
                  ? "bg-amber-600 text-white shadow-sm font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-card)] border border-[var(--border-main)]"
              }`}
            >
              Standard (Medium)
            </button>
            <button
              onClick={() => setSelectedDifficulty("Hard")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedDifficulty.toLowerCase() === "hard"
                  ? "bg-red-600 text-white shadow-sm font-bold"
                  : "text-red-400 hover:text-red-300 bg-red-950/20 border border-red-500/30"
              }`}
            >
              <span>🔥</span>
              <span>Hard (Target 800)</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[var(--text-muted)]">
            <strong className="text-[var(--text-main)]">{questions.length}</strong> authentic math questions loaded
          </div>
        </div>
      </div>

      {/* Active Topic Study Banner (when specific topic is selected) */}
      {activeTopicData && (
        <div className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-mono">
                {activeTopicData.code} • {activeTopicData.domain}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono">
                ★ {activeTopicData.yieldTier}
              </span>
            </div>
            <h3 className="text-base font-black text-[var(--text-main)]">
              {activeTopicData.title_en}
            </h3>
            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
              <FileText size={13} className="text-[var(--accent-blue)]" />
              <span>{activeTopicData.collegePandaChapter}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setStudyModalTopic(activeTopicData.code)}
              className="px-4 py-2 rounded-xl bg-[var(--accent-blue)] text-white text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <BookOpen size={14} />
              <span>Deep-Dive Theory & Traps</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions + Desmos Layout */}
      <div className={`grid gap-8 ${isSplitDesmos ? "grid-cols-1 lg:grid-cols-12 items-start" : "grid-cols-1 w-full max-w-5xl mx-auto"}`}>
        {/* Questions Column */}
        <div className={`${isSplitDesmos ? "lg:col-span-7" : "w-full"} space-y-8`}>
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-mono">
              Showing {questions.length} questions {selectedTopic !== "ALL" ? `for ${selectedTopic}` : `in ${selectedDomain}`}
            </span>
            {selectedTopic !== "ALL" && (
              <button
                onClick={() => setSelectedTopic("ALL")}
                className="text-[var(--accent-blue)] hover:underline"
              >
                Clear topic filter
              </button>
            )}
          </div>

          {loading ? (
            <div className="p-12 text-center text-[var(--text-muted)] text-sm bg-[var(--bg-card)] rounded-2xl border border-[var(--border-main)]">
              <div className="w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Loading Math problem set...
            </div>
          ) : questions.length === 0 ? (
            <div className="p-10 text-center space-y-3 bg-[var(--bg-card)] rounded-3xl border border-[var(--border-main)] shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-xl font-bold">
                🔍
              </div>
              <h3 className="font-bold text-sm text-[var(--text-main)]">
                No questions found matching this filter
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                No questions match the current combination of topic and difficulty. Click below to view all questions.
              </p>
              <button
                onClick={() => {
                  setSelectedDifficulty("ALL");
                  setSelectedTopic("ALL");
                  setSelectedDomain("ALL");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-blue)] text-white text-xs font-bold hover:opacity-95 transition-opacity shadow-sm"
              >
                <span>Reset All Filters & View All Questions</span>
              </button>
            </div>
          ) : (
            questions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                onOpenDesmosWithEquation={(eq) => setActiveEquation(eq)}
              />
            ))
          )}
        </div>

        {/* Desmos Side Panel */}
        {isSplitDesmos && (
          <div className="lg:col-span-5 hidden lg:block sticky top-20 self-start">
            <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1 font-semibold text-[var(--accent-green)]">
                <Sparkles size={13} /> Live Desmos Graphing Panel
              </span>
              <span className="text-[11px] font-mono">Split-view</span>
            </div>
            <DesmosCalculator initialEquation={activeEquation} />
          </div>
        )}
      </div>

      {/* Study Modal */}
      {studyModalTopic && (
        <TopicStudyModal
          topicCode={studyModalTopic}
          onClose={() => setStudyModalTopic(null)}
          onLaunchVisualDiagram={() => setShowVisualGuide(true)}
        />
      )}
    </div>
  );
}

export default function MathZeroToHeroPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-[var(--text-muted)]">
          <div className="w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Loading Math Studio...
        </div>
      }
    >
      <MathContent />
    </Suspense>
  );
}
