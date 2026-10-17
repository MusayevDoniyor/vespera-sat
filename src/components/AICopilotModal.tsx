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
} from "lucide-react";
import KaTeXMath from "./KaTeXMath";
import VesperaLogo from "./VesperaLogo";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

interface AICopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextQuestion?: string;
  topicDomain?: string;
  onClearContext?: () => void;
}

export default function AICopilotModal({
  isOpen,
  onClose,
  contextQuestion,
  topicDomain,
  onClearContext,
}: AICopilotModalProps) {
  useBodyScrollLock(isOpen);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-1",
      sender: "bot",
      text: `Hello Doniyor! I am your **Vespera SAT AI Mentor**.\n\nWhether you need a **10-second Desmos shortcut** to bypass algebraic calculation, or want an **intuitive visual analogy** tailored to your *IELTS 7.5 (Reading 9.0)* profile, ask me anything!`,
      timestamp: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

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
        }),
      });

      const data = await res.json();
      const botResponse: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text:
          data.answer ||
          "I encountered an error retrieving the explanation. Please try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-err-" + Date.now(),
          sender: "bot",
          text: "⚠️ Network connectivity issue while contacting AI Mentor. Please check connection and retry.",
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
        text: `Chat cleared. Ready for your next SAT problem, Desmos shortcut, or concept explanation!`,
        timestamp: "Just now",
      },
    ]);
  };

  const quickPrompts = [
    { label: "⚡ 10-s Desmos Hack", query: "How can I solve this in Desmos in under 10 seconds?" },
    { label: "🔍 Trap Analysis", query: "What is the classic College Board trap on this question?" },
    { label: "💡 Intuitive Analogy", query: "Explain this using an intuitive visual analogy for an IELTS 9.0 reader" },
    { label: "📖 Verbal Boundaries", query: "What are the core sentence boundary and transition rules for 780+ Verbal?" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-hidden">
      <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl w-full max-w-2xl h-[650px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl transition-all my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[var(--bg-surface)] border-b border-[var(--border-main)] shrink-0">
          <div className="flex items-center gap-3">
            <VesperaLogo size={32} />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-[var(--text-main)] tracking-wide">
                  VESPERA AI MENTOR
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-green)]/15 text-[var(--accent-green)] font-bold font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-ping"></span>
                  Active Copilot
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">
                1-on-1 Autonomous SAT Math & Verbal Strategy Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearChat}
              title="Reset Conversation"
              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--border-main)] transition-colors"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={onClose}
              title="Close Mentor (Esc)"
              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--border-main)] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Active Context Banner (If triggered from a question) */}
        {contextQuestion && (
          <div className="px-6 py-2 bg-[var(--accent-blue)]/10 border-b border-[var(--accent-blue)]/20 flex items-center justify-between text-xs text-[var(--accent-blue)] shrink-0">
            <div className="flex items-center gap-2 truncate">
              <Compass size={14} className="shrink-0" />
              <span className="font-bold shrink-0">Active Problem Context:</span>
              <span className="truncate opacity-80">{contextQuestion}</span>
            </div>
            {onClearContext && (
              <button
                onClick={onClearContext}
                className="text-[10px] underline hover:opacity-100 ml-2 font-mono shrink-0"
              >
                Clear
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
                <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[84%]`}>
                  {/* Sender & Timestamp Header */}
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[11px] font-bold text-[var(--text-muted)]">
                      {isUser ? "Doniyor (You)" : "Vespera AI Mentor"}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono opacity-60">
                      {m.timestamp}
                    </span>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`relative group p-4 sm:p-4.5 rounded-2xl leading-relaxed text-xs sm:text-sm shadow-sm transition-all ${
                      isUser
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-tr-sm"
                        : "bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-main)] rounded-tl-sm"
                    }`}
                  >
                    <KaTeXMath content={m.text} />

                    {/* Copy Action Button */}
                    {!isUser && (
                      <div className="mt-3 pt-2.5 border-t border-[var(--border-main)]/50 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                        <span className="font-mono text-[10px] opacity-70">
                          Digital SAT Strategy Guide
                        </span>
                        <button
                          onClick={() => handleCopy(m.id, m.text)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--border-main)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-main)]"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check size={12} className="text-[var(--accent-green)]" />
                              <span className="text-[var(--accent-green)] font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy explanation</span>
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
              <div className="flex items-center gap-1 py-1.5 px-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-main)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-bounce"></span>
                <span className="ml-2 font-medium text-[11px]">Mentor is synthesizing guidance...</span>
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
              placeholder="Ask mentor anything (e.g. Desmos hack, formula intuition, trap breakdown)..."
              className="w-full bg-[var(--bg-surface)] border border-[var(--border-main)] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent-blue)] focus:ring-2 focus:ring-[var(--accent-blue)]/15 transition-all"
            />
          </div>

          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            title="Send Message (Enter)"
            className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:hover:brightness-100 transition-all shadow-md shadow-blue-500/20 shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
