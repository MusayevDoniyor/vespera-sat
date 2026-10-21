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
  Lightbulb,
  AlertTriangle,
  Zap,
  Target,
  BookOpen,
  Brain,
  Calculator,
  Compass,
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import KaTeXMath from "@/components/KaTeXMath";
import VesperaLogo from "@/components/VesperaLogo";
import { useAuth } from "@/components/AuthContext";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  source?: string;
  model?: string;
}

const SAT_MODES = [
  {
    id: "desmos",
    title: "⚡ Desmos Speedhacks",
    desc: "10-second graphical shortcuts without manual algebra",
    prompt: "Show me the 10-second Desmos speedhack for this type of problem. Give me the exact inputs line-by-line and describe which intersection or gray dot to inspect.",
    icon: Zap,
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "trap",
    title: "⚠️ College Board Trap Taxonomy",
    desc: "Dissect psychometric distractors & false equivalencies",
    prompt: "What is the psychological trap engineered into this question by the College Board? Why are the wrong options tempting and how do I eliminate them in 5 seconds?",
    icon: Target,
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
  },
  {
    id: "first_principles",
    title: "🧠 First-Principles Intuition",
    desc: "Deep visual understanding without formula memorization",
    prompt: "Explain the underlying concept from first principles using an intuitive real-world analogy so I never forget it on test day.",
    icon: Brain,
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "grammar",
    title: "📖 Grammar & Sentence Boundaries",
    desc: "Semicolons, colons, dashes & rhetorical transitions",
    prompt: "Break down the Standard English Conventions or transition logic here. Explain independent vs dependent clause boundaries and punctuation invariants.",
    icon: BookOpen,
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "full_dissect",
    title: "🎯 4-Stage Question Dissection",
    desc: "Direct Solution, Desmos Hack, Trap Analysis, Golden Rule",
    prompt: "Dissect this problem using the 4-part Vespera Master format: 1. Direct Solution, 2. 10s Desmos Hack, 3. College Board Trap Analysis, 4. Golden Rule.",
    icon: Layers,
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
];

const QUICK_PROMPTS = [
  "How to solve systems of equations in Desmos in under 10 seconds?",
  "What is the discriminant rule for finding number of solutions in quadratics?",
  "How do I distinguish semicolons (;) from colons (:) on Digital SAT?",
  "What is the 3x1 elimination tactic for Standard English Conventions?",
  "How to find the minimum or maximum value of a quadratic instantly in Desmos?",
  "Explain the difference between 'however' and 'nevertheless' transitions.",
];

function SourceBadge({ source, model }: { source?: string; model?: string }) {
  if (!source) return null;
  const isGemini = source.toLowerCase().includes("gemini");
  const isGPT = source.toLowerCase().includes("gpt");

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border font-mono ${
        isGemini
          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
          : isGPT
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isGemini ? "bg-blue-500" : isGPT ? "bg-emerald-500" : "bg-amber-500"
        } animate-pulse`}
      />
      {source}
    </span>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fadeIn">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 mt-1">
        <Sparkles size={16} className="text-white" />
      </div>
      <div className="flex items-center gap-2 py-3.5 px-5 rounded-2xl rounded-tl-sm bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
        <span className="ml-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          Vespera SAT AI is synthesizing first principles...
        </span>
      </div>
    </div>
  );
}

export default function MentorPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState("Digital SAT Comprehensive");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getGreeting = useCallback((): string => {
    const name = user?.fullName?.split(" ")[0] || "Scholar";
    const target = user?.targetSatScore || 1550;
    const mathGoal = user?.mathLevel === "target_800" ? "800 Elite" : "750+";
    const ielts = user?.ieltsScore
      ? ` Leveraging your **IELTS ${user.ieltsScore}** reading mastery, our primary focus is locking in Math **${mathGoal}**.`
      : "";

    return `👋 **Welcome to your Dedicated Vespera SAT AI Studio, ${name}!**

Personalized for your **${target}+ Composite Target** (Math: **${mathGoal}**).${ielts}

### How I operate:
- ⚡ **10-Second Desmos Speedhacks:** Instant graphical solutions for quadratics, systems, circles & regressions.
- ⚠️ **College Board Trap Breakdown:** Precise identification of Partial Solver, Sign Inversion, and Distractor Traps.
- 🧠 **First-Principles Models:** Why rules exist so you can reconstruct them under exam pressure.
- 🎯 **Bluebook Question Dissection:** Paste any question or text directly below.

Select a preset mode on the left or ask anything below to begin.`;
  }, [user]);

  useEffect(() => {
    // Load from localStorage or set initial
    const saved = localStorage.getItem("vespera_mentor_chat_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      } catch {}
    }
    setMessages([
      {
        id: "init-studio-1",
        sender: "bot",
        text: getGreeting(),
        timestamp: "Just now",
        source: "Gemini Flash (Live)",
      },
    ]);
  }, [getGreeting]);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem("vespera_mentor_chat_v1", JSON.stringify(messages.slice(-30)));
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
          topicDomain: selectedTopic,
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
        text: data.answer || "No response received. Please try again.",
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
          text: "⚠️ **Connection issue.** Please check your connection and try asking again.",
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
    localStorage.removeItem("vespera_mentor_chat_v1");
    setMessages([
      {
        id: "reset-" + Date.now(),
        sender: "bot",
        text: "🔄 **Workspace refreshed.** What SAT topic or question are we tackling today?",
        timestamp: "Just now",
        source: "Gemini Flash (Live)",
      },
    ]);
  };

  const handleOpenDesmos = (equation?: string) => {
    window.dispatchEvent(
      new CustomEvent("vespera_desmos_load", {
        detail: { latex: equation || "y = 2x^2 - 4x + 1" },
      })
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)] max-w-[1720px] mx-auto gap-4 sm:gap-6 overflow-hidden">
      {/* ── LEFT SIDEBAR: MODES & PRESETS ── */}
      <aside className="hidden lg:flex lg:w-80 xl:w-96 flex-col gap-4 shrink-0 overflow-y-auto scrollbar-none pb-4">
        {/* Profile Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-bold">
              {user?.fullName?.charAt(0) || "D"}
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                {user?.fullName || "Scholar Doniyor"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Target: <span className="font-bold text-blue-600 dark:text-blue-400">{user?.targetSatScore || 1550}+ Composite</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Math Goal</span>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">
                {user?.mathLevel === "target_800" ? "800 Elite" : "750+"}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">AI Engine</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Gemini Live
              </span>
            </div>
          </div>
        </div>

        {/* SAT Presets */}
        <div className="flex-1 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Lightbulb size={13} className="text-amber-500" />
              Socratic SAT Modes
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              5 Presets
            </span>
          </div>

          <div className="space-y-2.5 flex-1">
            {SAT_MODES.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleSend(mode.prompt)}
                  disabled={isLoading}
                  className="w-full text-left p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-300 dark:hover:border-blue-700/50 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className={`p-1.5 rounded-lg border ${mode.color}`}>
                      <Icon size={14} />
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {mode.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug pl-8">
                    {mode.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Quick links to tools */}
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
            <Link
              href="/desmos"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-[11px] transition-colors"
            >
              <Calculator size={13} />
              Desmos Lab
            </Link>
            <Link
              href="/error-log"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-[11px] transition-colors"
            >
              <RotateCcw size={13} />
              Error Log
            </Link>
          </div>
        </div>
      </aside>

      {/* ── MAIN STUDIO CHAT CANVAS ── */}
      <main className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden min-w-0">
        {/* Studio Top Navbar */}
        <header className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white shrink-0">
              <Sparkles size={20} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Vespera SAT AI Studio
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Full-Page Mode
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
                First-principles Socratic coach · Desmos speedhacks · College Board trap taxonomy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleOpenDesmos()}
              title="Launch Floating Desmos"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-colors"
            >
              <Calculator size={14} className="text-emerald-500" />
              <span>Desmos</span>
            </button>
            <button
              onClick={handleClear}
              title="Clear Conversation"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </header>

        {/* Message Thread */}
        <div className="flex-1 p-5 sm:p-7 overflow-y-auto overscroll-contain space-y-6 scroll-smooth bg-slate-50/30 dark:bg-slate-950/20">
          {messages.map((m) => {
            const isUser = m.sender === "user";

            return (
              <div
                key={m.id}
                className={`flex gap-3.5 ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                {/* Bot Avatar */}
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/20 mt-1">
                    <Sparkles size={16} />
                  </div>
                )}

                <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"} max-w-[90%] md:max-w-[85%]`}>
                  {/* Meta Info */}
                  <div className="flex items-center gap-2 px-1 text-xs">
                    <span className="font-bold text-slate-600 dark:text-slate-400">
                      {isUser ? (user?.fullName?.split(" ")[0] || "You") : "Vespera AI Mentor"}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                      {m.timestamp}
                    </span>
                    {!isUser && <SourceBadge source={m.source} model={m.model} />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-5 leading-relaxed text-sm shadow-sm transition-all ${
                      isUser
                        ? "bg-blue-600 text-white rounded-tr-sm font-medium shadow-md shadow-blue-500/20"
                        : "bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-tl-sm w-full"
                    }`}
                  >
                    {isUser ? (
                      <div className="text-white font-medium whitespace-pre-wrap leading-relaxed select-text text-sm sm:text-base">
                        {m.text}
                      </div>
                    ) : (
                      <>
                        <KaTeXMath content={m.text} />

                        {/* Bot Bubble Actions */}
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                          <button
                            onClick={() => handleOpenDesmos()}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all font-semibold text-[11px]"
                          >
                            <Calculator size={12} />
                            <span>Test in Desmos</span>
                          </button>

                          <button
                            onClick={() => handleCopy(m.id, m.text)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          >
                            {copiedId === m.id ? (
                              <>
                                <Check size={13} className="text-emerald-500" />
                                <span className="text-emerald-500 font-semibold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} />
                                <span>Copy Markdown</span>
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
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md mt-1 font-bold">
                    <User size={16} />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel */}
        <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400 whitespace-nowrap">
            <Lightbulb size={12} className="text-amber-500" />
            Quick:
          </span>
          {QUICK_PROMPTS.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-300 text-xs font-medium whitespace-nowrap transition-all shadow-2xs shrink-0 disabled:opacity-40"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Composer */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-3"
          >
            <div className="flex-1 relative">
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
                rows={2}
                placeholder="Paste any Digital SAT question, ask for a 10s Desmos hack, or describe a mistake (Enter to send, Shift+Enter for newline)..."
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 focus:bg-white dark:focus:bg-slate-800 transition-all resize-none font-medium pr-10"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              title="Send (Enter)"
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:hover:brightness-100 transition-all shadow-lg shadow-blue-500/25 shrink-0"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-400 dark:text-slate-500">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">Shift+Enter</kbd> for new line</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">● 100% English & Socratic Models</span>
          </div>
        </div>
      </main>
    </div>
  );
}
