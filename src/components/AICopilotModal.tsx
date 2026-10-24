"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X,
  Send,
  User,
  Copy,
  Check,
  RotateCcw,
  Lightbulb,
  AlertTriangle,
  Compass,
  Sparkles,
  ChevronRight,
  Brain,
  Zap,
  Target,
  BookOpen,
  Maximize2,
  Minimize2,
  ExternalLink,
} from "lucide-react";
import KaTeXMath from "./KaTeXMath";
import VesperaLogo from "./VesperaLogo";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import Portal from "./Portal";
import { useAuth } from "./AuthContext";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  source?: string;
  model?: string;
  isTyping?: boolean;
}

export interface AICopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextQuestion?: string;
  topicDomain?: string;
  userChoice?: string | null;
  correctChoice?: string | null;
  options?: string[] | string | null;
  explanationUz?: string | null;
  explanationEn?: string | null;
  desmosTrick?: string | null;
  autoDiagnose?: boolean;
  onClearContext?: () => void;
}

const QUICK_PROMPTS = [
  { icon: <AlertTriangle size={12} />, label: "Why wrong?", query: "Why is my selected option incorrect? Which exact College Board trap did I fall into?" },
  { icon: <Zap size={12} />, label: "10s Desmos", query: "How do I solve this in Desmos in under 10 seconds? Give me exact inputs." },
  { icon: <Target size={12} />, label: "CB Trap", query: "What specific psychological trick or misdirection is College Board engineering in this question?" },
  { icon: <Brain size={12} />, label: "Analogy", query: "Give me a sharp, real-world analogy to understand this concept without memorizing formulas." },
  { icon: <BookOpen size={12} />, label: "Core Rule", query: "What fundamental SAT rule or principle does this question test? Give me the golden rule." },
];

function SourceBadge({ source, model }: { source?: string; model?: string }) {
  if (!source) return null;
  const isGemini = source?.toLowerCase().includes("gemini");
  const isGPT = source?.toLowerCase().includes("gpt") || source?.toLowerCase().includes("openai");
  const isOffline = model === "offline";

  return (
    <span
      className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full border font-mono ${
        isGemini
          ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
          : isGPT
          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
          : isOffline
          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
          : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-main)]"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isGemini ? "bg-blue-500" : isGPT ? "bg-emerald-500" : "bg-amber-500"
        } ${isOffline ? "" : "animate-pulse"}`}
      />
      {source}
    </span>
  );
}

function TypingDots() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
        <Sparkles size={14} className="text-white animate-spin" />
      </div>
      <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-xs space-y-2 min-w-[220px]">
        <div className="flex items-center gap-1.5 pb-0.5">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
        </div>
        <div className="h-3 w-44 rounded skeleton" />
        <div className="h-2.5 w-28 rounded skeleton" />
      </div>
    </div>
  );
}

const ModalInputBar = React.memo(function ModalInputBar({
  onSend,
  isLoading,
}: {
  onSend: (text: string) => void;
  isLoading: boolean;
}) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = inputText.trim();
    if (!q || isLoading) return;
    onSend(q);
    setInputText("");
  };

  return (
    <div className="px-4 py-3.5 bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 flex items-center gap-3 shrink-0">
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Ask anything — paste a question, concept, or mistake..."
          className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 focus:bg-white dark:focus:bg-slate-800 transition-all pr-12 font-medium"
          disabled={isLoading}
        />
        {inputText && (
          <button
            onClick={() => setInputText("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <button
        onClick={() => handleSubmit()}
        disabled={!inputText.trim() || isLoading}
        title="Send (Enter)"
        className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center active:scale-95 disabled:opacity-30 transition-all shadow-sm shrink-0 cursor-pointer disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send size={15} />
        )}
      </button>
    </div>
  );
});

export default function AICopilotModal({
  isOpen,
  onClose,
  contextQuestion,
  topicDomain,
  userChoice,
  correctChoice,
  options,
  explanationUz,
  explanationEn,
  desmosTrick,
  autoDiagnose,
  onClearContext,
}: AICopilotModalProps) {
  const { user } = useAuth();
  useBodyScrollLock(isOpen);

  const getGreeting = useCallback((): string => {
    const name = user?.fullName?.split(" ")[0] || "Scholar";
    const score = user?.targetSatScore || 1550;
    const ielts = user?.ieltsScore ? ` Your **IELTS ${user.ieltsScore}** gives you a strong verbal foundation — let's push Math to **800**.` : "";
    return `👋 **Hello, ${name}!** I'm your personal **Vespera SAT AI Mentor**.

Personalized for your **${score}+ composite** target.${ielts}

I can help you with:
- 🎯 **Mistake diagnosis** — exactly which College Board trap you fell into
- ⚡ **Desmos 10-second hacks** — bypass all manual algebra
- 🔍 **Trap taxonomy** — never fall for the same trick twice
- 🧠 **First-principles concepts** — deep intuition, not memorization

**Ask me anything — paste a question, type a concept, or hit a Quick Prompt below.**`;
  }, [user]);

  const [messages, setMessages] = useState<Message[]>([
    { id: "init-1", sender: "bot", text: getGreeting(), timestamp: "Just now" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastDiagnosedKey, setLastDiagnosedKey] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

  // Update greeting when user loads
  useEffect(() => {
    if (user) {
      setMessages((prev) => {
        if (prev.length === 1 && prev[0].id === "init-1") {
          return [{ ...prev[0], text: getGreeting() }];
        }
        return prev;
      });
    }
  }, [user, getGreeting]);

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Auto-diagnose on wrong answer
  useEffect(() => {
    if (isOpen && autoDiagnose && userChoice && correctChoice) {
      const key = `${contextQuestion}_${userChoice}_${correctChoice}`;
      if (lastDiagnosedKey !== key) {
        setLastDiagnosedKey(key);
        handleSend(
          `I chose option [${userChoice}] but the correct answer is [${correctChoice}]. Diagnose my exact mistake, name the College Board trap, and show me the 10-second solution.`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, autoDiagnose, userChoice, correctChoice, contextQuestion]);

  if (!isOpen) return null;

  const handleSend = async (textToSend: string) => {
    const q = textToSend.trim();
    if (!q || isLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { id: "u-" + Date.now(), sender: "user", text: q, timestamp: timeStr };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionPrompt: contextQuestion,
          userQuestion: q,
          topicDomain,
          userChoice,
          correctChoice,
          options,
          explanationUz,
          explanationEn,
          desmosTrick,
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
        text: data.answer || "Sorry, no response received. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
        model: data.model,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "bot",
          text: "⚠️ **Connection error.** Please check your internet connection and try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          source: "Error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "reset-" + Date.now(),
        sender: "bot",
        text: "🔄 **Chat cleared.** Ready for your next question, Desmos hack, or concept deep-dive!",
        timestamp: "Just now",
      },
    ]);
  };

  const hasMistakeContext = userChoice && correctChoice && userChoice !== correctChoice;

  return (
    <Portal>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Vespera AI Mentor"
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md animate-fadeIn ${
          isFullscreen ? "p-0" : "p-2 sm:p-5"
        }`}
        onClick={(e) => { if (e.target === e.currentTarget && !isFullscreen) onClose(); }}
      >
        <div
          className={`bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-2xl transition-all ${
            isFullscreen
              ? "w-screen h-screen rounded-none border-none"
              : "rounded-3xl w-full sm:max-w-4xl h-[94vh] sm:h-[820px] max-h-[96vh]"
          }`}
        >

          {/* ── HEADER ── */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/90 dark:bg-[#161f30] border-b border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <VesperaLogo size={32} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">
                    Vespera AI Mentor
                  </h3>
                  <span className="hidden sm:flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    SAT Expert
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Digital SAT · Desmos Hacks · Trap Taxonomy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Link to Full Page Studio */}
              <Link
                href="/mentor"
                onClick={onClose}
                title="Open Dedicated Full-Page Studio"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              >
                <span>Full Page</span>
                <ExternalLink size={13} />
              </Link>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Expand"}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              {/* Clear Chat */}
              <button
                onClick={handleClearChat}
                title="Clear chat"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw size={15} />
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                title="Close (Esc)"
                className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-500/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── CONTEXT BANNER ── */}
          {contextQuestion && (
            <div
              className={`px-5 py-2.5 border-b flex items-center justify-between gap-3 text-xs shrink-0 ${
                hasMistakeContext
                  ? "bg-rose-500/8 border-rose-500/15 text-rose-600 dark:text-rose-400"
                  : "bg-blue-500/8 border-blue-500/15 text-blue-600 dark:text-blue-400"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {hasMistakeContext ? (
                  <AlertTriangle size={14} className="shrink-0 text-rose-500" />
                ) : (
                  <Compass size={14} className="shrink-0" />
                )}
                <span className="font-bold shrink-0">
                  {hasMistakeContext ? "Mistake Context:" : "Active Question:"}
                </span>
                {hasMistakeContext && (
                  <span className="font-mono text-[10px] bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded shrink-0">
                    [{userChoice}] ❌ → [{correctChoice}] ✅
                  </span>
                )}
                <span className="truncate opacity-75">{contextQuestion}</span>
              </div>
              {onClearContext && (
                <button
                  onClick={onClearContext}
                  className="text-[10px] underline underline-offset-2 font-semibold shrink-0 opacity-70 hover:opacity-100"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {/* ── MESSAGE THREAD ── */}
          <div className="flex-1 px-5 py-5 overflow-y-auto overscroll-contain space-y-6 scroll-smooth">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div key={m.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
                  {/* Bot avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <Sparkles size={14} className="text-white" />
                    </div>
                  )}

                  <div className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"} max-w-[88%]`}>
                    {/* Meta row */}
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                        {isUser ? (user?.fullName?.split(" ")[0] || "You") : "Vespera AI"}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] opacity-50 font-mono">{m.timestamp}</span>
                      {!isUser && <SourceBadge source={m.source} model={m.model} />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`relative group rounded-2xl leading-relaxed text-[13px] shadow-sm ${
                        isUser
                          ? "bg-blue-600 text-white px-4 py-3 rounded-tr-sm font-medium shadow-md shadow-blue-500/20"
                          : "bg-white dark:bg-[#1e293b] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 px-5 py-4 rounded-tl-sm"
                      }`}
                    >
                      {isUser ? (
                        <div className="text-white font-medium whitespace-pre-wrap leading-relaxed select-text text-sm">
                          {m.text}
                        </div>
                      ) : (
                        <KaTeXMath content={m.text} />
                      )}

                      {/* Bot bubble footer */}
                      {!isUser && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center justify-end">
                          <button
                            onClick={() => handleCopy(m.id, m.text)}
                            className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                          >
                            {copiedId === m.id ? (
                              <>
                                <Check size={12} className="text-emerald-500" />
                                <span className="text-emerald-500 font-semibold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User avatar */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <User size={14} className="text-white" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isLoading && <TypingDots />}

            <div ref={messagesEndRef} />
          </div>

          {/* ── QUICK PROMPTS ── */}
          <div className="px-5 py-2.5 bg-slate-50 dark:bg-[#161f30] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
              <Lightbulb size={11} className="text-amber-500" />
              Quick:
            </span>
            {QUICK_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p.query)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800/90 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600/40 whitespace-nowrap transition-all text-[11px] font-medium disabled:opacity-40 shadow-xs shrink-0"
              >
                <span className="opacity-60">{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>

          {/* ── INPUT BAR (ISOLATED COMPONENT - ZERO KEYSTROKE DELAY) ── */}
          <ModalInputBar onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>
    </Portal>
  );
}
