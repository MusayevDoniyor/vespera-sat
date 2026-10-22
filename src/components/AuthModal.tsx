"use client";

import React, { useState } from "react";
import { Mail, Lock, User, Sparkles, X, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";
import VesperaLogo from "./VesperaLogo";
import Portal from "./Portal";

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal, login, register } = useAuth();
  useBodyScrollLock(isAuthModalOpen);

  const [mode, setMode] = useState<"login" | "register">(authModalMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync mode with context state when modal opens
  React.useEffect(() => {
    setMode(authModalMode);
    setError(null);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || "Unable to sign in. Please verify your credentials.");
        }
      } else {
        const res = await register({
          email,
          password,
          fullName: fullName.trim() || undefined,
        });
        if (!res.success) {
          setError(res.error || "Unable to create your account. Please try again.");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Portal>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Account Authentication"
        className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md overflow-hidden animate-fade-in"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeAuthModal();
        }}
      >
      <div className="relative w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl shadow-2xl p-6 sm:p-8 my-auto transition-all animate-scale-up">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-main)] transition-colors"
          title="Close (ESC)"
        >
          <X size={18} />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <VesperaLogo size={48} className="mb-1" />
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text-main)] tracking-tight">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
            {mode === "login"
              ? "Access your saved practice tests, error log, and study roadmap."
              : "Track your progress and personalize your SAT prep."}
          </p>
        </div>

        {/* Tab Toggle: Sign In vs Sign Up */}
        <div className="grid grid-cols-2 p-1 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-main)] mb-6">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === "login"
                ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm border border-[var(--border-main)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError(null);
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              mode === "register"
                ? "bg-[var(--bg-card)] text-[var(--text-main)] shadow-sm border border-[var(--border-main)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2.5 animate-shake">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-main)] flex items-center justify-between">
                <span>Your Name / Nickname</span>
                <span className="text-[10px] text-[var(--text-muted)] font-normal">Optional</span>
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <input
                  type="text"
                  placeholder="e.g. Doniyor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-main)]">Email Address</label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="email"
                required
                placeholder="scholar@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-main)]">Password</label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--bg-surface)] border border-[var(--border-main)] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] transition-all font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </span>
            ) : mode === "login" ? (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
    </Portal>
  );
}
