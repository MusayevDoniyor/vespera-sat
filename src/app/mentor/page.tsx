"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  User,
  Copy,
  Check,
  RotateCcw,
  Zap,
  Target,
  BookOpen,
  Brain,
  Calculator,
  ArrowUp,
  X,
} from "lucide-react";
import KaTeXMath from "@/components/KaTeXMath";
import { useAuth } from "@/components/AuthContext";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  source?: string;
  model?: string;
}

const STARTER_CARDS = [
  {
    icon: Zap,
    title: "10s Desmos Speedhacks",
    desc: "Bypass manual algebra on quadratics, systems & regressions",
    prompt: "Show me the top 3 Desmos speedhacks every student targeting 750+ Math must know on test day, with exact inputs and shortcuts.",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Target,
    title: "College Board Traps",
    desc: "Dissect Partial Solver, Sign Flip & False Equivalency distractors",
    prompt: "Explain the anatomy of College Board distractor traps: why do test-makers design 'almost correct' choices, and how do I spot them instantly?",
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
  {
    icon: BookOpen,
    title: "Grammar & Boundaries",
    desc: "Semicolons vs colons, dashes & rhetorical transitions",
    prompt: "What is the foolproof clause boundary flowchart for distinguishing commas, semicolons, colons, and em-dashes on Digital SAT Reading & Writing?",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Brain,
    title: "First-Principles Models",
    desc: "Build permanent conceptual intuition without memorization",
    prompt: "Explain circle equations and completing the square using an intuitive first-principles visual analogy so I never forget the formula.",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
];

export default function MentorPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history from localStorage or start fresh
  useEffect(() => {
    const saved = localStorage.getItem("vespera_mentor_chat_zen_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch {}
    }
  }, []);

  // Save on updates
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem("vespera_mentor_chat_zen_v1", JSON.stringify(messages.slice(-30)));
      } catch {}
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = (overrideText || inputText).trim();
    if (!textToSend || isLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuestion: textToSend,
          topicDomain: "Digital SAT Comprehensive",
          userProfile: user
            ? {
                fullName: user.fullName,
                mathLevel: user.mathLevel,
                englishLevel: user.englishLevel,
                targetSatScore: user.targetSatScore,
                ieltsScore: user.ieltsScore,
                currentSatScore: user.currentSatScore,
                dailyGoalMinutes: user.dailyGoalMinutes,
                examDate: user.examDate,
                priorityWeakness: user.priorityWeakness,
              }
            : null,
        }),
      });

      const data = await res.json();
      const botMsg: Message = {
        id: "b-" + Date.now(),
        sender: "bot",
        text: data.answer || "No response received. Please try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source || "Gemini Flash",
        model: data.model,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "bot",
          text: "⚠️ **Connection issue.** Please check your internet connection and try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          source: "Error",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    localStorage.removeItem("vespera_mentor_chat_zen_v1");
    setMessages([]);
    setInputText("");
  };

  const handleOpenDesmos = (equation?: string) => {
    window.dispatchEvent(
      new CustomEvent("vespera_desmos_load", {
        detail: { latex: equation || "y = 2x^2 - 4x + 1" },
      })
    );
  };

  const hasMessages = messages.length > 0;
  const userName = user?.fullName?.split(" ")[0] || "Scholar";

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-main)] overflow-hidden">
      {/* ── TOP MINIMAL APP BAR ── */}
      <header className="h-14 border-b border-[var(--border-main)] px-4 sm:px-8 flex items-center justify-between shrink-0 bg-[var(--bg-card)]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <Sparkles size={16} />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-extrabold text-[var(--text-main)] tracking-tight">
              AI Mentor Studio
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Gemini 2.5 Flash
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenDesmos()}
            title="Open Desmos Floating Calculator"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface)] hover:bg-emerald-500/10 text-xs font-semibold text-[var(--text-main)] hover:text-emerald-600 dark:hover:text-emerald-400 border border-[var(--border-main)] hover:border-emerald-500/30 transition-colors shadow-xs"
          >
            <Calculator size={14} className="text-emerald-500" />
            <span className="hidden sm:inline">Desmos</span>
          </button>

          {hasMessages && (
            <button
              onClick={handleClear}
              title="Clear conversation"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-main)] transition-colors"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          )}
        </div>
      </header>

      {/* ── CHAT SCROLL CANVAS ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-6 scroll-smooth">
        <div className="max-w-3xl xl:max-w-4xl mx-auto w-full">
          {/* EMPTY STATE: ZEN WELCOME WITH 4 CARDS */}
          {!hasMessages ? (
            <div className="pt-10 sm:pt-16 pb-12 flex flex-col items-center text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25 mb-6">
                <Sparkles size={32} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] tracking-tight mb-2.5">
                How can I help you master the SAT today, {userName}?
              </h2>
              <p className="text-sm text-[var(--text-muted)] max-w-lg mb-10 leading-relaxed font-medium">
                Ask any question, paste a Bluebook problem, diagnose a mistake, or pick a high-yield concept below.
              </p>

              {/* 4 Clean Starter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
                {STARTER_CARDS.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSend(card.prompt)}
                      disabled={isLoading}
                      className="p-5 rounded-2xl bg-[var(--bg-card)] hover:bg-[var(--bg-surface)] border border-[var(--border-main)] hover:border-blue-500/40 transition-all text-left group shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className={`p-2 rounded-xl border ${card.color}`}>
                          <Icon size={16} />
                        </span>
                        <span className="text-sm font-extrabold text-[var(--text-main)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {card.title}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-1">
                        {card.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* CONVERSATION THREAD */
            <div className="space-y-8 pb-32">
              {messages.map((m) => {
                const isUser = m.sender === "user";

                return (
                  <div
                    key={m.id}
                    className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
                  >
                    {/* Bot Avatar */}
                    {!isUser && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                        <Sparkles size={15} />
                      </div>
                    )}

                    <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"} max-w-[92%] sm:max-w-[85%]`}>
                      {/* Meta header */}
                      <div className="flex items-center gap-2 px-1 text-xs text-[var(--text-muted)]">
                        <span className="font-bold text-[var(--text-main)]">
                          {isUser ? userName : "Vespera AI"}
                        </span>
                        <span className="text-[10px] opacity-60 font-mono">{m.timestamp}</span>
                        {!isUser && m.source && (
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)]">
                            {m.source}
                          </span>
                        )}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`rounded-2xl p-5 leading-relaxed text-sm transition-all ${
                          isUser
                            ? "bg-blue-600 text-white rounded-tr-sm font-medium shadow-md shadow-blue-500/20"
                            : "bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-main)] rounded-tl-sm w-full shadow-xs"
                        }`}
                      >
                        {isUser ? (
                          <div className="text-white font-medium whitespace-pre-wrap leading-relaxed select-text text-sm sm:text-base">
                            {m.text}
                          </div>
                        ) : (
                          <>
                            <KaTeXMath content={m.text} />

                            {/* Bot Actions */}
                            <div className="mt-4 pt-3 border-t border-[var(--border-main)]/60 flex items-center justify-between text-xs text-[var(--text-muted)]">
                              <button
                                onClick={() => handleOpenDesmos()}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all font-semibold text-[11px]"
                              >
                                <Calculator size={12} />
                                <span>Desmos</span>
                              </button>

                              <button
                                onClick={() => handleCopy(m.id, m.text)}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-main)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-main)]"
                              >
                                {copiedId === m.id ? (
                                  <>
                                    <Check size={13} className="text-emerald-500" />
                                    <span className="text-emerald-500 font-semibold">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={13} />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* User Avatar */}
                    {isUser && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                        <User size={15} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-4 animate-fadeIn">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                    <Sparkles size={15} />
                  </div>
                  <div className="flex items-center gap-2 py-3.5 px-5 rounded-2xl rounded-tl-sm bg-[var(--bg-card)] border border-[var(--border-main)] shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                    <span className="ml-2 text-xs font-semibold text-[var(--text-muted)]">
                      Analyzing with SAT first principles...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* ── FLOATING ZEN INPUT BAR AT BOTTOM ── */}
      <footer className="p-4 sm:p-6 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)] to-transparent shrink-0">
        <div className="max-w-3xl xl:max-w-4xl mx-auto w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-lg hover:border-blue-500/40 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all p-2 pl-5"
          >
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              placeholder="Ask anything or paste a question (Enter to send)..."
              className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-[var(--text-main)] placeholder:text-[var(--text-muted)] resize-none py-2 font-medium"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              title="Send (Enter)"
              className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-[var(--bg-surface)] text-white disabled:text-[var(--text-muted)] flex items-center justify-center transition-all shadow-md shadow-blue-500/20 disabled:shadow-none shrink-0"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowUp size={18} strokeWidth={2.5} />
              )}
            </button>
          </form>

          <p className="text-center text-[11px] text-[var(--text-muted)] mt-2 font-medium">
            Vespera AI Mentor · Structured Socratic reasoning for 1550+ Digital SAT
          </p>
        </div>
      </footer>
    </div>
  );
}
