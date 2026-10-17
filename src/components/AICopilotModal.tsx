"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  User,
  Copy,
  Check,
  RotateCcw,
  Calculator,
  Compass,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Zap,
} from "lucide-react";
import KaTeXMath from "./KaTeXMath";
import VesperaLogo from "./VesperaLogo";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import { useAuth } from "./AuthContext";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  source?: string;
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

  const getGreeting = () => {
    if (user) {
      const mathTarget = user.mathLevel === "target_800" ? "800 Elite" : "750+";
      const ieltsClause = user.ieltsScore
        ? ` Leveraging your **IELTS ${user.ieltsScore}** baseline, we're optimizing Verbal and accelerating Math.`
        : "";
      return `👋 Hello, ${user.fullName}! I am your personal **Vespera SAT AI Mentor**.\n\nPersonalized for your **${user.targetSatScore || 1550}+** composite target (Math **${mathTarget}**).${ieltsClause}\n\nAsk me to diagnose any mistake, show 10-second Desmos shortcuts, or reveal College Board trap answers!`;
    }
    return `👋 Hello! I am your personal **Vespera SAT AI Mentor**.\n\nTargeting a **1550+** composite score on the Digital SAT. Ask me to diagnose any mistake, show 10-second Desmos shortcuts, or reveal College Board trap answers!`;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-1",
      sender: "bot",
      text: getGreeting(),
      timestamp: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastDiagnosedKey, setLastDiagnosedKey] = useState<string | null>(null);

  // Update greeting when user changes
  useEffect(() => {
    if (user) {
      setMessages((prev) => {
        if (prev.length === 1 && prev[0].id === "initial-1") {
          return [{ ...prev[0], text: getGreeting() }];
        }
        return prev;
      });
    }
  }, [user]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Listen for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-diagnose when triggered from an incorrect answer
  useEffect(() => {
    if (isOpen && autoDiagnose && userChoice && correctChoice) {
      const diagKey = `${contextQuestion}_${userChoice}_${correctChoice}`;
      if (lastDiagnosedKey !== diagKey) {
        setLastDiagnosedKey(diagKey);
        handleSend(
          `I selected option [${userChoice}], but the correct answer is [${correctChoice}]. Why is my answer wrong, which College Board trap did I fall into, and how do I solve this in 10 seconds?`
        );
      }
    }
  }, [isOpen, autoDiagnose, userChoice, correctChoice, contextQuestion]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || inputText;
    if (!q.trim() || isLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMessage: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: q,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
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
      const botResponse: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text:
          data.answer ||
          "Sorry, an error occurred while retrieving the explanation. Please try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-err-" + Date.now(),
          sender: "bot",
          text: "⚠️ Connection issue with AI Mentor. Please check your connection and try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
        text: `Chat reset. Ready for your next SAT question, Desmos speed hack, or concept breakdown!`,
        timestamp: "Just now",
      },
    ]);
  };

  const handleOpenDesmos = () => {
    window.dispatchEvent(new CustomEvent("vespera_desmos_load", { detail: { latex: "y = 2x + 4" } }));
  };

  const quickPrompts = [
    { label: "💡 Why is my choice wrong?", query: "Why is my selected option incorrect, and what College Board trap did I fall into?" },
    { label: "⚡ 10s Desmos Hack", query: "How do I solve this question in Desmos in under 10 seconds without doing manual algebra?" },
    { label: "🔍 College Board Trap", query: "What specific trick or misdirection is the College Board testing in this question?" },
    { label: "🧠 Intuitive Analogy", query: "Give me an intuitive, real-world analogy to understand this concept without memorizing formulas." },
    { label: "📖 Core SAT Rule", query: "What grammar or mathematical principle does this question test?" },
  ];

  const hasMistakeContext = userChoice && correctChoice && userChoice !== correctChoice;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-hidden animate-fadeIn">
      <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl w-full max-w-2xl h-[680px] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl transition-all my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[var(--bg-surface)] border-b border-[var(--border-main)] shrink-0">
          <div className="flex items-center gap-3">
            <VesperaLogo size={32} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-[var(--text-main)] tracking-wide">
                  VESPERA AI COPILOT
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-green)]/15 text-[var(--accent-green)] font-bold font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-ping"></span>
                  Socratic SAT Engine
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">
                Personal 1550+ SAT Mentor (Desmos Speedhacks & Trap Taxonomy)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearChat}
              title="Clear Conversation"
              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--border-main)] transition-colors"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={onClose}
              title="Close (Esc)"
              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--border-main)] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Active Context Banner */}
        {contextQuestion && (
          <div
            className={`px-6 py-2.5 border-b flex items-center justify-between text-xs shrink-0 ${
              hasMistakeContext
                ? "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"
                : "bg-[var(--accent-blue)]/10 border-[var(--accent-blue)]/20 text-[var(--accent-blue)]"
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              {hasMistakeContext ? (
                <AlertTriangle size={15} className="shrink-0 text-rose-500" />
              ) : (
                <Compass size={15} className="shrink-0" />
              )}
              <span className="font-bold shrink-0">
                {hasMistakeContext ? "Error Context:" : "Active Question:"}
              </span>
              {hasMistakeContext && (
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 shrink-0">
                  Your choice: [{userChoice}] ❌ → Correct: [{correctChoice}] ✅
                </span>
              )}
              <span className="truncate opacity-80">{contextQuestion}</span>
            </div>
            {onClearContext && (
              <button
                onClick={onClearContext}
                className="text-[10px] underline hover:opacity-100 ml-2 font-mono shrink-0"
              >
                Tozalash
              </button>
            )}
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto overscroll-contain space-y-5">
          {messages.map((m) => {
            const isUser = m.sender === "user";

            return (
              <div
                key={m.id}
                className={`flex gap-3 text-sm ${isUser ? "justify-end" : "justify-start"}`}
              >
                {/* Bot Avatar */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                    <VesperaLogo size={20} />
                  </div>
                )}

                {/* Message Bubble Container */}
                <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[85%]`}>
                  {/* Sender & Timestamp Header */}
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[11px] font-bold text-[var(--text-muted)]">
                      {isUser ? "Doniyor (Siz)" : "Vespera AI Mentor"}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono opacity-60">
                      {m.timestamp}
                    </span>
                    {m.source && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono border border-[var(--border-main)]">
                        {m.source}
                      </span>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`relative group p-4 sm:p-5 rounded-2xl leading-relaxed text-xs sm:text-sm shadow-sm transition-all ${
                      isUser
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-tr-sm"
                        : "bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-main)] rounded-tl-sm"
                    }`}
                  >
                    <KaTeXMath content={m.text} />

                    {/* Footer Actions */}
                    {!isUser && (
                      <div className="mt-3.5 pt-2.5 border-t border-[var(--border-main)]/60 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleOpenDesmos}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/20 hover:bg-[var(--accent-green)]/20 transition-all font-semibold text-[10px]"
                          >
                            <Calculator size={11} />
                            <span>Desmos'da Sinash</span>
                          </button>
                        </div>
                        <button
                          onClick={() => handleCopy(m.id, m.text)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--border-main)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-main)]"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check size={12} className="text-[var(--accent-green)]" />
                              <span className="text-[var(--accent-green)] font-semibold">Nusxalandi!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Nusxa olish</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
                    <User size={16} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] pl-11">
              <div className="flex items-center gap-1.5 py-2 px-3.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-bounce"></span>
                <span className="ml-2 font-medium text-[11px]">AI Copilot analyzing problem...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel */}
        <div className="px-5 py-2.5 bg-[var(--bg-surface)] border-t border-[var(--border-main)] flex items-center gap-2 overflow-x-auto text-xs scrollbar-none shrink-0">
          <span className="text-[var(--text-muted)] font-semibold text-[11px] whitespace-nowrap flex items-center gap-1">
            <Lightbulb size={13} className="text-amber-500" />
            Quick Prompts:
          </span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p.query)}
              disabled={isLoading}
              className="px-3 py-1 rounded-full bg-[var(--bg-card)] hover:bg-[var(--accent-blue)]/10 text-[var(--text-main)] hover:text-[var(--accent-blue)] border border-[var(--border-main)] hover:border-[var(--accent-blue)]/30 whitespace-nowrap transition-all text-[11px] font-medium shadow-2xs disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[var(--bg-card)] border-t border-[var(--border-main)] flex items-center gap-3 shrink-0">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything (e.g. why B is wrong, 10s Desmos shortcut, College Board trap)..."
              className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/15 transition-all"
            />
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            title="Send (Enter)"
            className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:hover:brightness-100 transition-all shadow-md shadow-blue-500/20 shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
