"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import QuestionCard from "@/components/QuestionCard";
import VisualTopicDiagram from "@/components/VisualTopicDiagram";
import TopicStudyModal from "@/components/TopicStudyModal";
import { OFFICIAL_TOPICS_DATA } from "@/lib/curriculum-data";
import {
  BookOpen,
  Sparkles,
  Filter,
  CheckCircle2,
  ArrowLeft,
  Award,
  Layers,
  Zap,
  Eye,
  EyeOff,
  BookmarkCheck,
  FileText,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const VERBAL_DOMAINS = [
  {
    key: "ALL",
    label: "All Verbal Questions",
    topics: [],
  },
  {
    key: "Expression of Ideas",
    label: "1. Rhetorical Synthesis & Transitions",
    topics: ["ENG-TRA", "ENG-SYN"],
  },
  {
    key: "Standard English Conventions",
    label: "2. Boundaries, Semicolons & Grammar",
    topics: ["ENG-BOU", "ENG-MOD", "ENG-AGR"],
  },
  {
    key: "Craft and Structure",
    label: "3. Words in Context & Purpose",
    topics: ["ENG-WIC", "ENG-PUR", "ENG-CRO"],
  },
  {
    key: "Information and Ideas",
    label: "4. Evidence & Inferences",
    topics: ["ENG-CID", "ENG-CDE", "ENG-INF"],
  },
];

function VerbalContent() {
  const searchParams = useSearchParams();
  const urlTopic = searchParams.get("topic");

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [showVisualGuide, setShowVisualGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<"questions" | "transitions" | "boundaries">("questions");
  const [studyModalTopic, setStudyModalTopic] = useState<string | null>(null);

  // Sync from URL parameter
  useEffect(() => {
    if (urlTopic && OFFICIAL_TOPICS_DATA[urlTopic]) {
      const topicData = OFFICIAL_TOPICS_DATA[urlTopic];
      setSelectedDomain(topicData.domain);
      setSelectedTopic(urlTopic);
    }
  }, [urlTopic]);

  // Fetch questions
  useEffect(() => {
    let url = "/api/questions?section=READING_WRITING&limit=200";
    if (selectedTopic !== "ALL") {
      url += `&topicCode=${encodeURIComponent(selectedTopic)}`;
    } else if (selectedDomain !== "ALL") {
      url += `&domain=${encodeURIComponent(selectedDomain)}`;
    }
    if (selectedDifficulty !== "ALL") {
      url += `&difficulty=${encodeURIComponent(selectedDifficulty)}`;
    }

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading verbal questions:", err);
        setLoading(false);
      });
  }, [selectedDomain, selectedTopic, selectedDifficulty]);

  // Active domain's topics
  const currentDomainTopics = useMemo(() => {
    if (selectedDomain === "ALL") {
      return Object.keys(OFFICIAL_TOPICS_DATA).filter(
        (code) => OFFICIAL_TOPICS_DATA[code].section === "READING_WRITING"
      );
    }
    const found = VERBAL_DOMAINS.find((d) => d.key === selectedDomain);
    return found ? found.topics : [];
  }, [selectedDomain]);

  const activeTopicData = selectedTopic !== "ALL" ? OFFICIAL_TOPICS_DATA[selectedTopic] : null;

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
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider font-mono">
              Target 780+ SAT Verbal
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-3">
            <BookOpen className="text-purple-600 dark:text-purple-400" size={28} />
            <span>SAT Reading & Writing Accelerator</span>
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 max-w-2xl leading-relaxed">
            First-principles grammar models, rhetorical logic connectors, high-register vocabulary, and topic-specific practice drills.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap shrink-0">
          <button
            onClick={() => setShowVisualGuide(!showVisualGuide)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showVisualGuide
                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
            }`}
          >
            {showVisualGuide ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>Visual RW Models</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-600 dark:text-purple-400 font-semibold font-mono">
            <Award size={15} />
            <span>Target 780+ Composite</span>
          </div>
        </div>
      </div>

      {/* Visual RW Diagram Showcase (Toggleable) */}
      {showVisualGuide && (
        <VisualTopicDiagram topicType="rhetorical_transitions" />
      )}

      {/* Reading & Writing Masterclass Strategy Ribbon */}
      <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
          <div className="flex items-center gap-2.5">
            <BookmarkCheck size={18} className="text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm font-bold text-[var(--text-main)]">
              Digital SAT Verbal Golden Rules & Trap Elimination
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab("questions")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "questions"
                  ? "bg-purple-600 text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
              }`}
            >
              Practice
            </button>
            <button
              onClick={() => setActiveTab("transitions")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "transitions"
                  ? "bg-purple-600 text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
              }`}
            >
              Transitions Vault
            </button>
            <button
              onClick={() => setActiveTab("boundaries")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "boundaries"
                  ? "bg-purple-600 text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
              }`}
            >
              Grammar Boundaries
            </button>
          </div>
        </div>

        {activeTab === "transitions" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-1 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400 block font-mono">
                1. Continuation
              </span>
              <p className="text-[11px] text-[var(--text-muted)]">
                Next sentence agrees, elaborates, or reinforces:
              </p>
              <div className="font-mono text-[11px] text-[var(--text-main)] font-semibold">
                Furthermore, Moreover, Indeed, Similarly, In fact
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 block font-mono">
                2. Contrast
              </span>
              <p className="text-[11px] text-[var(--text-muted)]">
                Next sentence reverses, limits, or contradicts:
              </p>
              <div className="font-mono text-[11px] text-[var(--text-main)] font-semibold">
                However, Nevertheless, In contrast, Conversely, Yet
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-mono">
                3. Causation
              </span>
              <p className="text-[11px] text-[var(--text-muted)]">
                Direct logical effect or result:
              </p>
              <div className="font-mono text-[11px] text-[var(--text-main)] font-semibold">
                Therefore, Consequently, Thus, As a result, Hence
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1.5">
              <span className="font-bold text-purple-600 dark:text-purple-400 block font-mono">
                4. Exemplification
              </span>
              <p className="text-[11px] text-[var(--text-muted)]">
                Concrete specimen or proof:
              </p>
              <div className="font-mono text-[11px] text-[var(--text-main)] font-semibold">
                For example, Specifically, For instance, To illustrate
              </div>
            </div>
          </div>
        )}

        {activeTab === "boundaries" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
              <span className="font-bold text-purple-600 dark:text-purple-400 block font-mono">
                Period ≡ Semicolon
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                On the Digital SAT, a Period ( . ) and a Semicolon ( ; ) are 100% grammatically equivalent. If two choices only differ by a period vs semicolon, <strong>eliminate both instantly</strong>!
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
              <span className="font-bold text-rose-500 block font-mono">
                Comma Splice Trap
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Two complete sentences (Independent Clauses) can <strong>NEVER</strong> be joined by a lone comma: <code className="text-rose-500 font-bold font-mono">IC , IC</code> is always 100% incorrect on the SAT.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-mono">
                The 4 Legal Joins
              </span>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Only 4 ways to join two sentences: <strong>1)</strong> IC . IC <strong>2)</strong> IC ; IC <strong>3)</strong> IC , FANBOYS IC <strong>4)</strong> IC : Explanation.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Domain Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {VERBAL_DOMAINS.map((d) => (
            <button
              key={d.key}
              onClick={() => {
                setSelectedDomain(d.key);
                setSelectedTopic("ALL");
              }}
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all border ${
                selectedDomain === d.key
                  ? "bg-purple-600 text-white font-bold border-purple-600 shadow-sm"
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
            RW Topics ({currentDomainTopics.length}):
          </span>

          <button
            onClick={() => setSelectedTopic("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTopic === "ALL"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)] border border-[var(--border-main)]"
            }`}
          >
            All {selectedDomain === "ALL" ? "Verbal" : selectedDomain} Topics
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
                    ? "bg-purple-600 text-white shadow-sm"
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

        {/* Quick Focus Drill / Workout Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] uppercase font-mono font-bold text-[var(--text-muted)] shrink-0">
              Focus Drills:
            </span>
            <button
              onClick={() => {
                setSelectedTopic("ALL");
                setSelectedDomain("ALL");
                setSelectedDifficulty("ALL");
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                selectedTopic === "ALL" && selectedDifficulty === "ALL"
                  ? "bg-purple-600 text-white shadow-sm font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-card)] border border-[var(--border-main)]"
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => {
                setSelectedTopic("ENG-WIC");
                setSelectedDomain("Craft and Structure");
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedTopic === "ENG-WIC"
                  ? "bg-emerald-600 text-white shadow-sm font-bold"
                  : "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50"
              }`}
            >
              <span>📚</span>
              <span>Vocabook 3.0 Words in Context</span>
            </button>
            <button
              onClick={() => {
                setSelectedTopic("ENG-AGR");
                setSelectedDomain("Standard English Conventions");
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedTopic === "ENG-AGR"
                  ? "bg-purple-600 text-white shadow-sm font-bold"
                  : "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 hover:bg-purple-100 dark:hover:bg-purple-950/50"
              }`}
            >
              <span>⚡</span>
              <span>Gramilliy 3x1 Agreement</span>
            </button>
            <button
              onClick={() => setSelectedDifficulty(selectedDifficulty === "Hard" ? "ALL" : "Hard")}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedDifficulty === "Hard"
                  ? "bg-rose-600 text-white shadow-sm font-bold"
                  : "text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 hover:bg-rose-100 dark:hover:bg-rose-950/50"
              }`}
            >
              <span>🔥</span>
              <span>SATashkent Hard Workout (Target 780+)</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[var(--text-muted)]">
            <strong className="text-[var(--text-main)]">{questions.length}</strong> authentic RW questions loaded
          </div>
        </div>
      </div>

      {/* Active Topic Study Banner (when specific topic is selected) */}
      {activeTopicData && (
        <div className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono">
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
              <FileText size={13} className="text-purple-600 dark:text-purple-400" />
              <span>{activeTopicData.collegePandaChapter}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setStudyModalTopic(activeTopicData.code)}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <BookOpen size={14} />
              <span>Deep-Dive Theory & Traps</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-8">
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span className="font-mono">
            Showing {questions.length} questions {selectedTopic !== "ALL" ? `for ${selectedTopic}` : `in ${selectedDomain}`}
          </span>
          {selectedTopic !== "ALL" && (
            <button
              onClick={() => setSelectedTopic("ALL")}
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Clear topic filter
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center text-[var(--text-muted)] text-sm bg-[var(--bg-card)] rounded-2xl border border-[var(--border-main)]">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            Loading Reading & Writing questions...
          </div>
        ) : questions.length === 0 ? (
          <div className="p-12 text-center text-[var(--text-muted)] bg-[var(--bg-card)] rounded-2xl border border-[var(--border-main)]">
            No questions found for this topic filter.
          </div>
        ) : (
          questions.map((q) => <QuestionCard key={q.id} question={q} />)
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

export default function VerbalAcceleratorPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-[var(--text-muted)]">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Loading Reading & Writing Studio...
        </div>
      }
    >
      <VerbalContent />
    </Suspense>
  );
}
