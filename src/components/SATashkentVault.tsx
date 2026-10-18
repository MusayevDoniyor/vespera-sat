"use client";

import React, { useState, useEffect, useMemo, useRef, useDeferredValue, startTransition } from "react";
import KaTeXMath from "./KaTeXMath";
import Pagination from "./Pagination";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import Portal from "./Portal";
import {
  SATASHKENT_LIBRARY,
  SATASHKENT_CHEAT_SHEET_DATA,
  SATashkentBook,
} from "@/lib/satashkent-data";
import {
  VOCABOOK_CARDS,
  VOCABOOK_QUIZ_QUESTIONS,
  VocabCard,
  VocabQuizQuestion,
} from "@/lib/satashkent-vocab";
import {
  BookOpen,
  FileText,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Search,
  Download,
  GraduationCap,
  Calculator,
  Compass,
  Zap,
  RotateCcw,
  Check,
  X,
  HelpCircle,
  Bookmark,
  Shuffle,
} from "lucide-react";

export default function SATashkentVault() {
  const [activeTab, setActiveTab] = useState<
    "books" | "cheatsheet" | "gramilliy3x1" | "vocabook" | "roadmap"
  >("books");
  const [categoryFilter, setCategoryFilter] = useState<
    "ALL" | "Math" | "Reading & Writing" | "Full System"
  >("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const [activeCheatSection, setActiveCheatSection] = useState<number>(0);
  const [selectedBook, setSelectedBook] = useState<SATashkentBook | null>(null);
  useBodyScrollLock(!!selectedBook);

  // Vocabook 3.0 Studio State
  const [vocabSubTab, setVocabSubTab] = useState<"flashcards" | "lexicon" | "quiz">("flashcards");
  const [vocabSearch, setVocabSearch] = useState("");
  const deferredVocabSearch = useDeferredValue(vocabSearch);
  const [vocabPosFilter, setVocabPosFilter] = useState("ALL");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [showQuizScore, setShowQuizScore] = useState(false);

  // Books Pagination state
  const [booksPage, setBooksPage] = useState(1);
  const [booksPageSize, setBooksPageSize] = useState(12);
  const booksTopRef = useRef<HTMLDivElement>(null);

  // Vocab Pagination state
  const [vocabPage, setVocabPage] = useState(1);
  const [vocabPageSize, setVocabPageSize] = useState(12);
  const vocabTopRef = useRef<HTMLDivElement>(null);

  // Dynamic category counts across all 54 materials
  const categoryCounts = useMemo(() => {
    const counts = {
      ALL: SATASHKENT_LIBRARY.length,
      Math: 0,
      "Reading & Writing": 0,
      "Full System": 0,
    };
    for (const b of SATASHKENT_LIBRARY) {
      if (counts[b.category] !== undefined) {
        counts[b.category]++;
      }
    }
    return counts;
  }, []);

  const filteredBooks = useMemo(() => {
    return SATASHKENT_LIBRARY.filter((b) => {
      if (categoryFilter !== "ALL" && b.category !== categoryFilter) return false;
      if (!deferredSearch.trim()) return true;
      const q = deferredSearch.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.keyTopics.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [categoryFilter, deferredSearch]);

  // Reset page when filter changes
  useEffect(() => {
    setBooksPage(1);
  }, [categoryFilter, deferredSearch]);

  useEffect(() => {
    setVocabPage(1);
  }, [deferredVocabSearch, vocabPosFilter]);

  const totalFilteredBooks = filteredBooks.length;
  const totalBooksPages = Math.max(1, Math.ceil(totalFilteredBooks / booksPageSize));
  const paginatedBooks = filteredBooks.slice((booksPage - 1) * booksPageSize, booksPage * booksPageSize);

  const handleBooksPageChange = (newPage: number) => {
    startTransition(() => {
      setBooksPage(newPage);
    });
    requestAnimationFrame(() => {
      if (booksTopRef.current) {
        const top = booksTopRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  const handleBooksPageSizeChange = (newSize: number) => {
    startTransition(() => {
      setBooksPageSize(newSize);
      setBooksPage(1);
    });
    requestAnimationFrame(() => {
      if (booksTopRef.current) {
        const top = booksTopRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  const handleCategoryFilterChange = (cat: "ALL" | "Math" | "Reading & Writing" | "Full System") => {
    startTransition(() => {
      setCategoryFilter(cat);
      setBooksPage(1);
    });
  };

  const handleTabChange = (tab: "books" | "cheatsheet" | "gramilliy3x1" | "vocabook" | "roadmap") => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  const filteredVocabCards = useMemo(() => {
    return VOCABOOK_CARDS.filter((c) => {
      if (vocabPosFilter !== "ALL" && c.partOfSpeech !== vocabPosFilter) return false;
      if (!deferredVocabSearch.trim()) return true;
      const q = deferredVocabSearch.toLowerCase();
      return (
        c.word.toLowerCase().includes(q) ||
        c.definition.toLowerCase().includes(q) ||
        c.antonyms.toLowerCase().includes(q)
      );
    });
  }, [deferredVocabSearch, vocabPosFilter]);

  const totalVocabPages = Math.max(1, Math.ceil(filteredVocabCards.length / vocabPageSize));
  const paginatedVocabCards = filteredVocabCards.slice((vocabPage - 1) * vocabPageSize, vocabPage * vocabPageSize);

  const handleVocabPageChange = (newPage: number) => {
    startTransition(() => {
      setVocabPage(newPage);
    });
    requestAnimationFrame(() => {
      if (vocabTopRef.current) {
        const top = vocabTopRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  const handleVocabPageSizeChange = (newSize: number) => {
    startTransition(() => {
      setVocabPageSize(newSize);
      setVocabPage(1);
    });
    requestAnimationFrame(() => {
      if (vocabTopRef.current) {
        const top = vocabTopRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  return (
    <div className="w-full space-y-8 pb-16 text-[var(--text-main)]">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-surface)] to-[var(--accent-blue)]/5 border border-[var(--border-main)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] font-mono border border-[var(--accent-blue)]/30">
              🇺🇿 NATIONAL & OFFICIAL DIGITAL SAT REPOSITORY
            </span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              54 Authentic Textbooks & 2,500+ Real Questions
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--text-main)] flex items-center gap-3">
            <GraduationCap className="text-[var(--accent-blue)]" size={32} />
            <span>Digital SAT Masterclass & Materials Vault</span>
          </h2>

          <p className="text-xs text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
            Exhaustive 54-volume national and official repository: College Board Educator Question Banks (940 & 1,090 pages), SAT Tashkent archives (Gramilliy 3x1, Vocabook 3.0, 20 Modular Math books, Hardbooks 1.0 & 2.0), English Elite, Atlas Agora, Elbek SAT, 650 Real Exam Words (@DSATuz), @satmath_1, and Wiley Math.
          </p>
        </div>

        {/* Global Statistics Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0 text-center font-mono">
          <div className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
            <div className="text-xl font-black text-[var(--accent-blue)]">{SATASHKENT_LIBRARY.length}</div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Textbooks</div>
          </div>
          <div className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
            <div className="text-xl font-black text-[var(--accent-green)]">2,500+</div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Real Questions</div>
          </div>
          <div className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
            <div className="text-xl font-black text-purple-600 dark:text-purple-400">445+</div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Vocab Pgs</div>
          </div>
          <div className="p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm">
            <div className="text-xl font-black text-amber-600 dark:text-amber-400">100%</div>
            <div className="text-[10px] text-[var(--text-muted)] uppercase">Digital SAT</div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-semibold overflow-x-auto scrollbar-none shadow-sm">
        <button
          onClick={() => handleTabChange("books")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "books"
              ? "bg-[var(--accent-blue)] text-white shadow-sm font-bold"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
          }`}
        >
          <BookOpen size={15} />
          <span>Textbook Library ({SATASHKENT_LIBRARY.length})</span>
        </button>

        <button
          onClick={() => handleTabChange("cheatsheet")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "cheatsheet"
              ? "bg-[var(--accent-blue)] text-white shadow-sm font-bold"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
          }`}
        >
          <Calculator size={15} />
          <span>Interactive Math Cheat Sheet (6-Pages)</span>
        </button>

        <button
          onClick={() => handleTabChange("gramilliy3x1")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "gramilliy3x1"
              ? "bg-purple-600 text-white shadow-sm font-bold"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
          }`}
        >
          <Zap size={15} />
          <span>Gramilliy 3x1 Elimination Masterclass</span>
        </button>

        <button
          onClick={() => handleTabChange("vocabook")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "vocabook"
              ? "bg-emerald-600 text-white shadow-sm font-bold"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
          }`}
        >
          <Sparkles size={15} />
          <span>Vocabook 3.0 Studio (420 Pages)</span>
        </button>

        <button
          onClick={() => handleTabChange("roadmap")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
            activeTab === "roadmap"
              ? "bg-amber-600 text-white shadow-sm font-bold"
              : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
          }`}
        >
          <Compass size={15} />
          <span>All-in-One 4-Stage Roadmap</span>
        </button>
      </div>

      {/* TAB 1: TEXTBOOK LIBRARY */}
      {activeTab === "books" && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)]">
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <button
                onClick={() => handleCategoryFilterChange("ALL")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  categoryFilter === "ALL"
                    ? "bg-[var(--accent-blue)] text-white font-bold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
                }`}
              >
                All ({categoryCounts.ALL})
              </button>
              <button
                onClick={() => handleCategoryFilterChange("Math")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  categoryFilter === "Math"
                    ? "bg-[var(--accent-blue)] text-white font-bold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
                }`}
              >
                Math ({categoryCounts.Math} Books)
              </button>
              <button
                onClick={() => handleCategoryFilterChange("Reading & Writing")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  categoryFilter === "Reading & Writing"
                    ? "bg-purple-600 text-white font-bold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
                }`}
              >
                Reading & Writing ({categoryCounts["Reading & Writing"]} Books)
              </button>
              <button
                onClick={() => handleCategoryFilterChange("Full System")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  categoryFilter === "Full System"
                    ? "bg-amber-600 text-white font-bold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
                }`}
              >
                Full System & Tests ({categoryCounts["Full System"]} Books)
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="text"
                placeholder="Search all 54 books, bibles & question banks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
              />
            </div>
          </div>

          {/* Top Pagination Control */}
          {totalFilteredBooks > booksPageSize && (
            <div ref={booksTopRef}>
              <Pagination
                currentPage={booksPage}
                totalPages={totalBooksPages}
                totalItems={totalFilteredBooks}
                pageSize={booksPageSize}
                onPageChange={handleBooksPageChange}
                onPageSizeChange={handleBooksPageSizeChange}
                pageSizeOptions={[8, 12, 24]}
                itemName="textbooks & sources"
              />
            </div>
          )}

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 items-start">
            {paginatedBooks.map((book) => {
              const isMath = book.category === "Math";
              const isRW = book.category === "Reading & Writing";

              return (
                <div
                  key={book.id}
                  className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/50 transition-all shadow-sm flex flex-col group h-full"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono ${
                        isMath
                          ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]"
                          : isRW
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {book.badge}
                    </span>

                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {book.pages} pages
                    </span>
                  </div>

                  <h3 className="font-black text-base text-[var(--text-main)] group-hover:text-[var(--accent-blue)] transition-colors mb-1">
                    {book.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-mono mb-3 truncate">
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] font-bold shrink-0">
                      {book.targetScore}
                    </span>
                    <span className="shrink-0">•</span>
                    <span className="truncate">{book.filename}</span>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
                    {book.description}
                  </p>

                  <div className="space-y-1.5 mb-5 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                      Curriculum Coverage:
                    </div>
                    {book.keyTopics.slice(0, 3).map((topic, i) => (
                      <div
                        key={i}
                        className="text-[11px] text-[var(--text-main)] flex items-start gap-1.5 leading-snug"
                      >
                        <CheckCircle2
                          size={12}
                          className="text-[var(--accent-green)] shrink-0 mt-0.5"
                        />
                        <span className="line-clamp-1">{topic}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-[11px] text-[var(--text-muted)] mb-4 leading-relaxed line-clamp-2">
                    <strong className="text-[var(--text-main)] block mb-0.5 font-mono text-[10px] uppercase">
                      Signature Tactic:
                    </strong>
                    {book.signatureMethod}
                  </div>

                  <div className="pt-3 border-t border-[var(--border-main)] mt-auto flex items-center justify-between gap-2">
                    <a
                      href={`/api/materials/${encodeURIComponent(book.filename)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] hover:bg-emerald-600 hover:text-white border border-[var(--border-main)] text-[11px] font-mono text-[var(--text-muted)] transition-colors flex items-center gap-1.5"
                      title="Open full PDF"
                    >
                      <BookOpen size={12} />
                      <span>Read PDF</span>
                    </a>
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="text-xs font-bold text-[var(--accent-blue)] hover:underline flex items-center gap-1"
                    >
                      <span>Inspect Details</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination Control */}
          {totalFilteredBooks > booksPageSize && (
            <Pagination
              currentPage={booksPage}
              totalPages={totalBooksPages}
              totalItems={totalFilteredBooks}
              pageSize={booksPageSize}
              onPageChange={handleBooksPageChange}
              onPageSizeChange={handleBooksPageSizeChange}
              pageSizeOptions={[8, 12, 24]}
              itemName="textbooks & sources"
            />
          )}
        </div>
      )}

      {/* TAB 2: INTERACTIVE MATH CHEAT SHEET (6 PAGES) */}
      {activeTab === "cheatsheet" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] flex items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wide font-mono">
                Source: SAT Math Cheat Sheet.pdf (6 Pages)
              </h4>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                Exact mathematical formulas, transformation laws, and geometry invariants distilled for fast retrieval.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-[var(--accent-blue)] bg-[var(--accent-blue)]/10 px-3 py-1 rounded-lg">
              Official SATashkent Formula Vault
            </div>
          </div>

          {/* Cheat Sheet Domain Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {SATASHKENT_CHEAT_SHEET_DATA.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCheatSection(idx)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all border ${
                  activeCheatSection === idx
                    ? "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)] shadow-sm"
                    : "bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-main)] hover:text-[var(--text-main)]"
                }`}
              >
                <span>{sec.title}</span>
                <span className="ml-2 text-[10px] opacity-75 font-mono">({sec.weight})</span>
              </button>
            ))}
          </div>

          {/* Active Cheat Sheet Section Content */}
          <div className="space-y-4">
            {SATASHKENT_CHEAT_SHEET_DATA[activeCheatSection].rules.map((rule, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[var(--text-main)] font-mono">
                    #{idx + 1} {rule.name}
                  </h4>
                  <span className="text-[10px] font-mono text-[var(--accent-blue)] uppercase font-bold">
                    SATashkent Core Invariant
                  </span>
                </div>

                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {rule.description}
                </p>

                {rule.formula && (
                  <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-center overflow-x-auto">
                    <KaTeXMath content={`$$${rule.formula}$$`} />
                  </div>
                )}

                {rule.tips && (
                  <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] space-y-1 font-mono leading-relaxed whitespace-pre-line">
                    <strong className="text-[var(--accent-green)] block mb-1">
                      💡 Exam Key Points:
                    </strong>
                    {rule.tips}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GRAMILLIY 3X1 ELIMINATION MASTERCLASS */}
      {activeTab === "gramilliy3x1" && (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-purple-500/5 border border-purple-500/20 space-y-4">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-xs font-bold uppercase">
              <Zap size={16} />
              <span>SATashkent Gramilliy Chapter V: Signature Elimination Architecture</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[var(--text-main)]">
              The 3x1 Tactic for Standard English Conventions
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-3xl">
              In Digital SAT Writing, question designers construct 3 answer choices that share the exact same structural defect, while exactly 1 choice follows valid Standard English conventions. Recognizing this pattern allows elimination in under 15 seconds.
            </p>
          </div>

          {/* 3 Step Protocol */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-mono font-black flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-bold text-sm text-[var(--text-main)]">
                Start Backwards (Q27 to Q1)
              </h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Transitions (Q20–24) and Rhetorical Synthesis (Q25–27) require more critical thinking. Tackling them first builds momentum and leaves straightforward grammar questions for when time is tighter.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-mono font-black flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-bold text-sm text-[var(--text-main)]">
                Structure First, Meaning Second
              </h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Never pick punctuation based on "how it sounds." First identify Independent vs Dependent clauses. If two clauses are independent, a lone comma is 100% illegal (Comma Splice). Semicolon or Period is mandatory.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-mono font-black flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-bold text-sm text-[var(--text-main)]">
                Find the 3x1 Outlier
              </h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Scan the 4 choices together:
                <br />• 3 plural verbs vs 1 singular verb $\implies$ Singular is the answer!
                <br />• 3 active verbs vs 1 passive verb $\implies$ Passive is the answer!
                <br />• 3 run-ons/comma splices vs 1 semicolon $\implies$ Semicolon is the answer!
              </p>
            </div>
          </div>

          {/* Authentic Real Example from Gramilliy */}
          <div className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-4">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-mono uppercase">
              Authentic Example from Gramilliy (Page 35)
            </span>

            <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] leading-relaxed font-mono">
              "Kizomba, a genre of dance that originated in Angola, has become an international ______ 2022, the Indian dance duo defeated performers from around the world to win the annual Olympiads of Kizomba."
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                A) phenomenon in (Run-on / Fragment) ✕
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                B) phenomenon and in (Fragment) ✕
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold">
                ✓ C) phenomenon. In (Correct: Independent Clause delimiter)
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                D) phenomenon, in (Comma Splice) ✕
              </div>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              <strong>Gramilliy Analysis:</strong> Choices A, B, and D all fail to create the mandatory clause boundary before the independent clause beginning with '2022, the Indian dance duo...'. Only choice C provides the period delimiter.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: ALL-IN-ONE 4-STAGE ROADMAP */}
      {activeTab === "roadmap" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
            <h3 className="text-lg font-black text-[var(--text-main)]">
              SATashkent Systematic Preparation Syllabus (All-in-One Methodology)
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Recommended chronological sequence from the official SATashkent All-in-One roadmap to progress from diagnostic baseline to 1500+:
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[var(--accent-blue)] text-white font-black flex items-center justify-center font-mono shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-sm text-[var(--text-main)]">
                  Phase 1: Build Your Foundation with SATashkent Books
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Start with the core textbooks: <strong>Mathbook 2.0 / 3.0</strong> for math, <strong>Gramilliy</strong> for English grammar, and <strong>Vocabook 3.0</strong> for high-yield vocabulary. Focus on conceptual clarity before speed.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black flex items-center justify-center font-mono shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-sm text-[var(--text-main)]">
                  Phase 2: Domain-Specific Massive Question Volume
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Drill through <strong>SAToplam Reading (846 questions)</strong> and <strong>SAToplam Writing (973 questions)</strong>. Solve questions by specific domain (Boundaries, Transitions, Main Ideas) to reach automaticity.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white font-black flex items-center justify-center font-mono shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-sm text-[var(--text-main)]">
                  Phase 3: Hard Sets for Target 800
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Work through <strong>Math Hard Book</strong> and <strong>Math Hardbook 2.0</strong>. Master Desmos shortcuts for multi-parameter systems and nonlinear geometry.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[var(--accent-green)] text-white font-black flex items-center justify-center font-mono shrink-0">
                4
              </div>
              <div>
                <h4 className="font-bold text-sm text-[var(--text-main)]">
                  Phase 4: Exam-Season Prediction & Variant Analysis
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Before the test, review <strong>SATakror</strong> (multi-version archives) and <strong>English Elite Book</strong> to identify the latest question templates, high-frequency transitions, and adaptive test behavior.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VOCABOOK 3.0 WORDS IN CONTEXT STUDIO */}
      {activeTab === "vocabook" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Info Banner */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-[var(--bg-card)] to-[var(--bg-surface)] border border-emerald-500/25 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono border border-emerald-500/30 uppercase">
                  420-Page Lexicon Synthesizer
                </span>
                <span className="text-[var(--text-muted)]">•</span>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  College Panda 400 + Ivy Global + SATashkent Real Words
                </span>
              </div>
              <h3 className="text-2xl font-black text-[var(--text-main)] flex items-center gap-3">
                <Sparkles className="text-emerald-600 dark:text-emerald-400" size={26} />
                <span>Vocabook 3.0 Interactive Mastery Studio</span>
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-2 max-w-2xl leading-relaxed">
                Words in Context accounts for ~18% of Reading & Writing questions. Master subtle connotative shade, context clues, and high-frequency exam traps through active-recall flashcard drills, full lexical search, and diagnostic context quizzes.
              </p>
            </div>

            {/* Sub-tab Switcher */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] shrink-0 self-start md:self-auto font-mono text-xs">
              <button
                onClick={() => setVocabSubTab("flashcards")}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                  vocabSubTab === "flashcards"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                Flashcard Drill
              </button>
              <button
                onClick={() => setVocabSubTab("lexicon")}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                  vocabSubTab === "lexicon"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                Vault Lexicon ({VOCABOOK_CARDS.length})
              </button>
              <button
                onClick={() => setVocabSubTab("quiz")}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
                  vocabSubTab === "quiz"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
              >
                Context Quiz (12 Qs)
              </button>
            </div>
          </div>

          {/* SUBTAB 1: FLASHCARD DRILL */}
          {vocabSubTab === "flashcards" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Card <strong className="text-[var(--text-main)]">{activeCardIndex + 1}</strong> of{" "}
                    <strong className="text-[var(--text-main)]">{VOCABOOK_CARDS.length}</strong>
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono">
                    {VOCABOOK_CARDS[activeCardIndex]?.partOfSpeech}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const next = (activeCardIndex - 1 + VOCABOOK_CARDS.length) % VOCABOOK_CARDS.length;
                      setActiveCardIndex(next);
                      setCardFlipped(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-bold text-[var(--text-main)] transition-all"
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={() => {
                      const rand = Math.floor(Math.random() * VOCABOOK_CARDS.length);
                      setActiveCardIndex(rand);
                      setCardFlipped(false);
                    }}
                    className="p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all"
                    title="Randomize Card"
                  >
                    <Shuffle size={14} />
                  </button>

                  <button
                    onClick={() => {
                      const next = (activeCardIndex + 1) % VOCABOOK_CARDS.length;
                      setActiveCardIndex(next);
                      setCardFlipped(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    Next Card →
                  </button>
                </div>
              </div>

              {/* The Interactive Flippable Flashcard */}
              <div
                onClick={() => setCardFlipped(!cardFlipped)}
                className="cursor-pointer min-h-[360px] p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-surface)] to-[var(--bg-card)] border-2 border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Background watermarked text */}
                <div className="absolute right-6 bottom-4 text-7xl md:text-9xl font-black text-emerald-500/5 select-none pointer-events-none font-mono">
                  {VOCABOOK_CARDS[activeCardIndex]?.word.slice(0, 3).toUpperCase()}
                </div>

                {/* Card Top */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono uppercase">
                      Vocabook 3.0
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">
                      Click anywhere to {cardFlipped ? "flip back" : "reveal definition & answer"}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{cardFlipped ? "Viewing Back" : "Click to Flip"}</span>
                    <RotateCcw size={14} className={cardFlipped ? "rotate-180 transition-transform" : ""} />
                  </div>
                </div>

                {/* Card Body */}
                {!cardFlipped ? (
                  <div className="my-8 space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                        Target Word:
                      </span>
                      <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] tracking-tight mt-1">
                        {VOCABOOK_CARDS[activeCardIndex]?.word}
                      </h2>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] space-y-2">
                      <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <Bookmark size={13} />
                        <span>Active Recall Challenge: Fill the Blank</span>
                      </div>
                      <p className="text-sm md:text-base text-[var(--text-main)] leading-relaxed italic">
                        &ldquo;
                        {VOCABOOK_CARDS[activeCardIndex]?.exampleSentence.replace(
                          new RegExp(`\\b${VOCABOOK_CARDS[activeCardIndex]?.word}\\b`, "i"),
                          "__________"
                        )}
                        &rdquo;
                      </p>
                    </div>

                    <p className="text-xs text-[var(--text-muted)]">
                      Tip: Can you articulate the exact definition and 2 antonyms before flipping?
                    </p>
                  </div>
                ) : (
                  <div className="my-6 space-y-5 animate-in fade-in duration-200">
                    <div className="flex items-baseline gap-3">
                      <h2 className="text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                        {VOCABOOK_CARDS[activeCardIndex]?.word}
                      </h2>
                      <span className="text-xs font-mono text-[var(--text-muted)] italic">
                        ({VOCABOOK_CARDS[activeCardIndex]?.partOfSpeech})
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)]">
                      <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider font-mono mb-1">
                        Exact Definition
                      </div>
                      <p className="text-sm font-semibold text-[var(--text-main)] leading-relaxed">
                        {VOCABOOK_CARDS[activeCardIndex]?.definition}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)]">
                      <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider font-mono mb-1">
                        Context Sentence
                      </div>
                      <p className="text-xs text-[var(--text-main)] leading-relaxed italic">
                        &ldquo;{VOCABOOK_CARDS[activeCardIndex]?.exampleSentence}&rdquo;
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)]">
                        <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-mono mb-0.5">
                          Antonyms & Opposites
                        </div>
                        <div className="text-xs text-[var(--text-muted)] font-mono">
                          {VOCABOOK_CARDS[activeCardIndex]?.antonyms}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/20">
                        <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-mono mb-0.5">
                          Digital SAT Context Note
                        </div>
                        <div className="text-xs text-[var(--text-muted)] leading-snug">
                          {VOCABOOK_CARDS[activeCardIndex]?.satContext}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Bottom */}
                <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
                  <span>Source: Vocabook 3.0 (Page {activeCardIndex * 15 + 10})</span>
                  <span>Press Space / Click to Flip</span>
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 2: FULL LEXICON VAULT */}
          {vocabSubTab === "lexicon" && (
            <div className="space-y-6">
              {/* Search & POS Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)]">
                <div className="relative w-full sm:w-72">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  />
                  <input
                    type="text"
                    value={vocabSearch}
                    onChange={(e) => setVocabSearch(e.target.value)}
                    placeholder="Search words or definitions..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {["ALL", "adjective", "noun", "verb"].map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setVocabPosFilter(pos)}
                      className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                        vocabPosFilter === pos
                          ? "bg-emerald-600 text-white font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-main)] bg-[var(--bg-surface)]"
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Pagination Control */}
              {filteredVocabCards.length > vocabPageSize && (
                <div ref={vocabTopRef}>
                  <Pagination
                    currentPage={vocabPage}
                    totalPages={totalVocabPages}
                    totalItems={filteredVocabCards.length}
                    pageSize={vocabPageSize}
                    onPageChange={handleVocabPageChange}
                    onPageSizeChange={handleVocabPageSizeChange}
                    pageSizeOptions={[12, 24, 36]}
                    itemName="vocabulary words"
                  />
                </div>
              )}

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedVocabCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] hover:border-emerald-500/40 transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-lg font-black text-[var(--text-main)] tracking-tight">
                          {card.word}
                        </h4>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 uppercase">
                          {card.partOfSpeech}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[var(--text-main)] mt-1.5 leading-relaxed">
                        {card.definition}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-muted)] italic leading-relaxed">
                      &ldquo;{card.exampleSentence}&rdquo;
                    </div>

                    <div className="space-y-1.5 pt-1 text-[11px]">
                      <div className="flex items-baseline gap-1.5 text-[var(--text-muted)]">
                        <strong className="text-rose-600 dark:text-rose-400 font-mono uppercase text-[10px]">
                          Antonyms:
                        </strong>
                        <span className="font-mono">{card.antonyms}</span>
                      </div>
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400/90 leading-snug">
                        <strong className="font-mono uppercase text-[10px] text-emerald-700 dark:text-emerald-400">
                          SAT Context:
                        </strong>{" "}
                        {card.satContext}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Pagination Control */}
              {filteredVocabCards.length > vocabPageSize && (
                <Pagination
                  currentPage={vocabPage}
                  totalPages={totalVocabPages}
                  totalItems={filteredVocabCards.length}
                  pageSize={vocabPageSize}
                  onPageChange={handleVocabPageChange}
                  onPageSizeChange={handleVocabPageSizeChange}
                  pageSizeOptions={[12, 24, 36]}
                  itemName="vocabulary words"
                />
              )}
            </div>
          )}

          {/* SUBTAB 3: DIAGNOSTIC CONTEXT QUIZ (12 QS) */}
          {vocabSubTab === "quiz" && (
            <div className="space-y-6">
              {/* Quiz Status Bar */}
              <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono font-black flex items-center justify-center">
                    {Object.keys(quizAnswers).length}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-main)]">
                      Words in Context Diagnostic Drill
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                      Answered: {Object.keys(quizAnswers).length} of {VOCABOOK_QUIZ_QUESTIONS.length} Questions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {Object.keys(quizAnswers).length > 0 && (
                    <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                      Score:{" "}
                      {
                        VOCABOOK_QUIZ_QUESTIONS.filter(
                          (q) => quizAnswers[q.id] === q.correctAnswer
                        ).length
                      }{" "}
                      / {VOCABOOK_QUIZ_QUESTIONS.length}
                    </div>
                  )}

                  <button
                    onClick={() => setQuizAnswers({})}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all"
                  >
                    <RotateCcw size={13} />
                    <span>Reset Quiz</span>
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {VOCABOOK_QUIZ_QUESTIONS.map((q, idx) => {
                  const userAnswer = quizAnswers[q.id];
                  const isAnswered = userAnswer !== undefined;
                  const isCorrect = userAnswer === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`p-6 rounded-3xl bg-[var(--bg-card)] border transition-all space-y-4 ${
                        isAnswered
                          ? isCorrect
                            ? "border-emerald-500/40 shadow-sm"
                            : "border-rose-500/40 shadow-sm"
                          : "border-[var(--border-main)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                          QUESTION {idx + 1} • WORDS IN CONTEXT
                        </span>
                        {isAnswered && (
                          <span
                            className={`text-xs font-mono font-bold flex items-center gap-1 ${
                              isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                            }`}
                          >
                            {isCorrect ? (
                              <>
                                <Check size={14} /> Correct (+1)
                              </>
                            ) : (
                              <>
                                <X size={14} /> Incorrect (Key: {q.correctAnswer})
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-[var(--text-main)] font-medium leading-relaxed">
                        {q.prompt}
                      </p>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt) => {
                          const letter = opt.charAt(0);
                          const isSelected = userAnswer === letter;
                          const isOptionCorrect = letter === q.correctAnswer;

                          let btnStyle = "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-main)] hover:border-emerald-500/50";
                          if (isAnswered) {
                            if (isOptionCorrect) {
                              btnStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold";
                            } else if (isSelected) {
                              btnStyle = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300";
                            } else {
                              btnStyle = "bg-[var(--bg-surface)] border-[var(--border-main)] text-[var(--text-muted)] opacity-60";
                            }
                          }

                          return (
                            <button
                              key={opt}
                              onClick={() => {
                                setQuizAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: letter,
                                }));
                              }}
                              className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isAnswered && isOptionCorrect && (
                                <Check size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                              )}
                              {isAnswered && isSelected && !isOptionCorrect && (
                                <X size={14} className="text-rose-600 dark:text-rose-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Block */}
                      {isAnswered && (
                        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-1.5 text-xs animate-in fade-in duration-200">
                          <div className="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-[11px] flex items-center gap-1.5">
                            <Sparkles size={13} />
                            <span>Target Word: {q.targetWord} • Detailed Analysis</span>
                          </div>
                          <p className="text-[var(--text-muted)] leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Book Detail Modal */}
      {selectedBook && (
        <Portal>
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-hidden"
            onClick={() => setSelectedBook(null)}
          >
            <div
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl p-6 md:p-8 space-y-5 shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-mono uppercase">
                    {selectedBook.badge} • {selectedBook.targetScore}
                  </span>
                  <h3 className="text-xl font-black text-[var(--text-main)] mt-1">
                    {selectedBook.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                    File: {selectedBook.filename} ({selectedBook.pages} pages)
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {selectedBook.description}
              </p>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider font-mono">
                  Key Topics & Chapters in this Book:
                </h5>
                <div className="space-y-1.5">
                  {selectedBook.keyTopics.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-main)] flex items-center gap-2"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-[var(--accent-green)] shrink-0"
                      />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-xs text-[var(--text-muted)] leading-relaxed">
                <strong className="text-[var(--text-main)] block mb-1 font-mono uppercase text-[10px]">
                  Recommended Study Approach:
                </strong>
                {selectedBook.signatureMethod}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`/api/materials/${encodeURIComponent(selectedBook.filename)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <BookOpen size={14} />
                  <span>Open Original PDF ({selectedBook.pages} pages)</span>
                </a>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-main)] text-xs font-bold transition-all shadow-sm"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
