"use client";

import React, { useEffect, useState, useMemo, useRef, Suspense } from "react";
import QuestionCard from "@/components/QuestionCard";
import VisualTopicDiagram from "@/components/VisualTopicDiagram";
import TopicStudyModal from "@/components/TopicStudyModal";
import Pagination from "@/components/Pagination";
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
  BrainCircuit,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { isMathDomain, isVerbalDomain } from "@/lib/curriculum-data";

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
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const urlTopic = searchParams.get("topic");

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [showVisualGuide, setShowVisualGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<"questions" | "transitions" | "boundaries" | "professor">("questions");
  const [studyModalTopic, setStudyModalTopic] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const questionsTopRef = useRef<HTMLDivElement>(null);

  const urlDomain = searchParams.get("domain");
  const urlAdaptive = searchParams.get("adaptive") === "true";
  const [isAdaptiveMode, setIsAdaptiveMode] = useState(false);

  // Sync from URL parameter with strict section validation
  useEffect(() => {
    if (urlDomain) {
      if (isMathDomain(urlDomain)) {
        // Domain belongs to Math! Forward to Math Lab immediately
        router.replace(`/math?domain=${encodeURIComponent(urlDomain)}${urlAdaptive ? "&adaptive=true" : ""}`);
        return;
      }
      if (isVerbalDomain(urlDomain)) {
        setSelectedDomain(urlDomain);
      } else {
        setSelectedDomain("ALL");
      }
      setSelectedTopic("ALL");
      setPage(1);
    }
    if (urlTopic && OFFICIAL_TOPICS_DATA[urlTopic]) {
      const topicData = OFFICIAL_TOPICS_DATA[urlTopic];
      if (topicData.section === "MATH") {
        router.replace(`/math?topic=${encodeURIComponent(urlTopic)}${urlAdaptive ? "&adaptive=true" : ""}`);
        return;
      }
      setSelectedDomain(topicData.domain);
      setSelectedTopic(urlTopic);
      setPage(1);
    }
    if (urlAdaptive) {
      setIsAdaptiveMode(true);
    }
  }, [urlTopic, urlDomain, urlAdaptive, router]);

  const cacheRef = useRef<Record<string, { questions: any[]; pagination: any }>>({});

  // Reset page when filters change
  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain);
    setSelectedTopic("ALL");
    setPage(1);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setPage(1);
  };

  const handleDifficultySelect = (diff: string) => {
    setSelectedDifficulty(diff);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    questionsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
    questionsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Fetch questions
  useEffect(() => {
    let url = `/api/questions?section=READING_WRITING&page=${page}&limit=${pageSize}`;
    if (selectedTopic !== "ALL") {
      url += `&topicCode=${encodeURIComponent(selectedTopic)}`;
    } else if (selectedDomain !== "ALL") {
      url += `&domain=${encodeURIComponent(selectedDomain)}`;
    }
    if (selectedDifficulty !== "ALL") {
      url += `&difficulty=${encodeURIComponent(selectedDifficulty)}`;
    }

    if (cacheRef.current[url]) {
      setQuestions(cacheRef.current[url].questions);
      if (cacheRef.current[url].pagination) {
        setPaginationInfo(cacheRef.current[url].pagination);
      }
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const list = data.questions || [];
        const pag = data.pagination || {
          total: list.length,
          page,
          limit: pageSize,
          totalPages: Math.max(1, Math.ceil(list.length / pageSize)),
          hasNextPage: false,
          hasPrevPage: false,
        };
        cacheRef.current[url] = { questions: list, pagination: pag };
        setQuestions(list);
        setPaginationInfo(pag);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error loading verbal questions:", err);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [selectedDomain, selectedTopic, selectedDifficulty, page, pageSize]);

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

  const recommendedDifficulty = useMemo(() => {
    if (!user) return "Hard";
    if (user.ieltsScore || user.englishLevel === "advanced" || user.englishLevel === "native_fluent") return "Hard";
    if (user.englishLevel === "beginner") return "Easy";
    return "Medium";
  }, [user]);

  const isRecommendedActive = selectedDifficulty.toLowerCase() === recommendedDifficulty.toLowerCase();

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
            <span className="text-xs font-bold text-[var(--accent-blue)] uppercase tracking-wider font-mono">
              Target 780+ SAT Verbal
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-3">
            <BookOpen className="text-[var(--accent-blue)]" size={28} />
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
                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]"
            }`}
          >
            {showVisualGuide ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>Visual RW Models</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] font-semibold font-mono">
            <Award size={15} className="text-[var(--accent-blue)]" />
            <span>Target 780+ Composite</span>
          </div>

          <Link
            href="/vocab"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition"
          >
            <BrainCircuit size={15} />
            <span>650 Vocab Studio (SM-2)</span>
          </Link>

          <a
            href="/api/materials/Reading%20Writing%20Professor%20IV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-main)] shadow-sm hover:border-[var(--accent-blue)] transition"
            title="Open 1,474-page SAT Reading & Writing Professor IV (Built for 800)"
          >
            <BookOpen size={15} className="text-[var(--accent-blue)]" />
            <span>Professor IV (1,845 Qs)</span>
          </a>
        </div>
      </div>

      {/* Adaptive Mode Banner */}
      {isAdaptiveMode && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span className="font-bold text-[var(--text-main)]">
              🎯 Adaptive Weakness Drill Active:
            </span>
            <span className="text-[var(--text-muted)]">
              Targeting your lowest-scoring Verbal domain from Practice Test 1 (<strong className="text-[var(--accent-blue)]">{isVerbalDomain(selectedDomain) ? selectedDomain : "Reading & Writing"}</strong>).
            </span>
          </div>
          <button
            onClick={() => {
              setIsAdaptiveMode(false);
              setSelectedDomain("ALL");
              setPage(1);
            }}
            className="text-xs font-mono font-bold text-[var(--accent-blue)] hover:underline whitespace-nowrap self-start sm:self-auto"
          >
            Reset to All Verbal
          </button>
        </div>
      )}

      {/* User Personalized Track Banner */}
      {user && (
        <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-blue)]" />
            <span className="text-xs font-bold text-[var(--text-main)]">
              Personalized Track:{" "}
              <span className="text-[var(--accent-blue)] font-black uppercase font-mono">
                {user.ieltsScore ? `IELTS ${user.ieltsScore} Fast-Track` : `${user.englishLevel} Track`}
              </span>
            </span>
            <span className="text-xs text-[var(--text-muted)] hidden md:inline">
              • {user.ieltsScore ? "Advanced comprehension verified; prioritize College Board trap distractors & rhetorical synthesis" : "Focus on sentence boundaries, modifiers, and transitions"}
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
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-[var(--bg-card)] border-[var(--border-main)] hover:border-[var(--accent-blue)] text-[var(--text-main)]"
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

      {/* Visual RW Diagram Showcase (Toggleable) */}
      {showVisualGuide && (
        <VisualTopicDiagram topicType="rhetorical_transitions" />
      )}

      {/* Reading & Writing Masterclass Strategy Ribbon */}
      <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-3">
          <div className="flex items-center gap-2.5">
            <BookmarkCheck size={18} className="text-[var(--accent-blue)]" />
            <h3 className="text-sm font-bold text-[var(--text-main)]">
              Digital SAT Verbal Golden Rules & Trap Elimination
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab("questions")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "questions"
                  ? "bg-blue-600 text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
              }`}
            >
              Practice
            </button>
            <button
              onClick={() => setActiveTab("transitions")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "transitions"
                  ? "bg-blue-600 text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
              }`}
            >
              Transitions Vault
            </button>
            <button
              onClick={() => setActiveTab("boundaries")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "boundaries"
                  ? "bg-blue-600 text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
              }`}
            >
              Grammar Boundaries
            </button>
            <button
              onClick={() => setActiveTab("professor")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "professor"
                  ? "bg-blue-600 text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
              }`}
            >
              Professor IV: 800 Guide
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

            <div className="p-3.5 rounded-2xl bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 space-y-1.5">
              <span className="font-bold text-[var(--accent-blue)] block font-mono">
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
              <span className="font-bold text-[var(--accent-blue)] block font-mono">
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

        {activeTab === "professor" && (
          <div className="space-y-4 text-xs pt-1 animate-in fade-in duration-200">
            {/* Header / Guide banner */}
            <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-mono uppercase">
                    Built for 800 · 1,845 Questions · 1,474 Pages
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">Easy → Medium → Hard</span>
                </div>
                <h4 className="text-sm font-black text-[var(--text-main)]">
                  SAT Reading & Writing Professor IV — Methodology & 800 Blueprint
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed max-w-2xl">
                  &ldquo;Doing questions is not what improves you. Analysing them afterwards is. Twenty questions studied properly beat two hundred rushed through.&rdquo;
                </p>
              </div>

              <a
                href="/api/materials/Reading%20Writing%20Professor%20IV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 self-start md:self-auto"
              >
                <BookOpen size={14} />
                <span>Open Complete 1,474-Page PDF</span>
              </a>
            </div>

            {/* Core 3-Column Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Pillar 1: Roadmaps */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                <span className="font-bold text-[var(--accent-blue)] block font-mono text-[11px] uppercase">
                  1. The Score Roadmaps
                </span>
                <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1 font-mono text-[11px]">
                  <div className="text-[var(--accent-blue)] font-bold">Aiming for 700+:</div>
                  <div className="text-[var(--text-muted)]">Professor I → Professor IV</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-1 font-mono text-[11px]">
                  <div className="text-[var(--accent-blue)] font-bold">Aiming for 800:</div>
                  <div className="text-[var(--text-muted)]">Prof I → Prof IV → Prof II → Prof III</div>
                </div>
                <p className="text-[10px] text-[var(--text-muted)] italic">
                  Complete each book before moving to the next.
                </p>
              </div>

              {/* Pillar 2: 5-Step Routine */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                <span className="font-bold text-amber-600 dark:text-amber-400 block font-mono text-[11px] uppercase">
                  2. The 5-Step Analytical Routine
                </span>
                <ol className="space-y-1 text-[11px] text-[var(--text-muted)] list-decimal list-inside leading-snug">
                  <li><strong className="text-[var(--text-main)]">Answer</strong> timed under real conditions.</li>
                  <li><strong className="text-[var(--text-main)]">Overview:</strong> Write short summary in own words.</li>
                  <li><strong className="text-[var(--text-main)]">Why Key:</strong> Explain why right choice is right.</li>
                  <li><strong className="text-[var(--text-main)]">Why Traps:</strong> Explain why other 3 are wrong.</li>
                  <li><strong className="text-[var(--text-main)]">Say Out Loud:</strong> Verbalize the rule.</li>
                </ol>
              </div>

              {/* Pillar 3: 4 Meta-Methods */}
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block font-mono text-[11px] uppercase">
                  3. Four Methods, Not Ten
                </span>
                <div className="space-y-1 text-[11px] text-[var(--text-muted)]">
                  <div><strong>Block 1:</strong> Words in Context · Main Idea · Purpose</div>
                  <div><strong>Block 2:</strong> Rhetorical Function · Text Structure</div>
                  <div><strong>Block 3:</strong> Claims · Quantitative Graphs & Tables</div>
                  <div><strong>Block 4:</strong> Specific Detail · Cross-Text · Inference</div>
                </div>
                <p className="text-[10px] text-[var(--text-muted)]">
                  13 question types organized strictly: Easy → Medium → Hard.
                </p>
              </div>
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
              onClick={() => handleDomainSelect(d.key)}
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all border ${
                selectedDomain === d.key
                  ? "bg-blue-600 text-white font-bold border-blue-600 shadow-sm"
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
            onClick={() => handleTopicSelect("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTopic === "ALL"
                ? "bg-blue-600 text-white shadow-sm"
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
                onClick={() => handleTopicSelect(code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm"
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
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                selectedTopic === "ALL" && selectedDifficulty === "ALL"
                  ? "bg-blue-600 text-white shadow-sm font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-card)] border border-[var(--border-main)]"
              }`}
            >
              All Questions
            </button>
            <button
              onClick={() => {
                setSelectedTopic("ENG-WIC");
                setSelectedDomain("Craft and Structure");
                setPage(1);
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
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedTopic === "ENG-AGR"
                  ? "bg-blue-600 text-white shadow-sm font-bold"
                  : "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/30 hover:bg-blue-100 dark:hover:bg-blue-950/50"
              }`}
            >
              <span>⚡</span>
              <span>Gramilliy 3x1 Agreement</span>
            </button>
            <button
              onClick={() => handleDifficultySelect(selectedDifficulty === "Hard" ? "ALL" : "Hard")}
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
            <strong className="text-[var(--text-main)]">{paginationInfo.total > 0 ? paginationInfo.total.toLocaleString() : questions.length}</strong> authentic RW questions available
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
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <BookOpen size={14} />
              <span>Deep-Dive Theory & Traps</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div ref={questionsTopRef} className="space-y-6 pt-2">
        {/* Top Pagination Control */}
        {paginationInfo.total > 0 && (
          <Pagination
            currentPage={page}
            totalPages={paginationInfo.totalPages}
            totalItems={paginationInfo.total}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            itemName="verbal questions"
          />
        )}

        <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span className="font-mono">
            Page {page} of {paginationInfo.totalPages} • Showing {questions.length} questions {selectedTopic !== "ALL" ? `for ${selectedTopic}` : `in ${selectedDomain}`}
          </span>
          {selectedTopic !== "ALL" && (
            <button
              onClick={() => handleTopicSelect("ALL")}
              className="text-[var(--accent-blue)] hover:underline"
            >
              Clear topic filter
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center text-[var(--text-muted)] text-sm bg-[var(--bg-card)] rounded-2xl border border-[var(--border-main)]">
            <div className="w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            Loading Reading & Writing questions (Page {page})...
          </div>
        ) : questions.length === 0 ? (
          <div className="p-10 text-center space-y-3 bg-[var(--bg-card)] rounded-3xl border border-[var(--border-main)] shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] flex items-center justify-center mx-auto text-xl font-bold">
              🔍
            </div>
            <h3 className="font-bold text-sm text-[var(--text-main)]">
              No questions found matching this filter
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              No questions match the current combination of topic and difficulty. Click below to view all Reading & Writing questions.
            </p>
            <button
              onClick={() => {
                handleDifficultySelect("ALL");
                handleTopicSelect("ALL");
                handleDomainSelect("ALL");
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-opacity shadow-sm"
            >
              <span>Reset All Filters & View All Questions</span>
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {questions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>

            {/* Bottom Pagination Control */}
            <Pagination
              currentPage={page}
              totalPages={paginationInfo.totalPages}
              totalItems={paginationInfo.total}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              itemName="verbal questions"
            />
          </>
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
          <div className="w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Loading Reading & Writing Studio...
        </div>
      }
    >
      <VerbalContent />
    </Suspense>
  );
}
