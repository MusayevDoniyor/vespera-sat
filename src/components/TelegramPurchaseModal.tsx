"use client";

import React, { useState, useMemo } from "react";
import {
  X,
  Send,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import Portal from "./Portal";

interface TelegramPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  billingCycle?: "MONTHLY" | "QUARTERLY";
  user: {
    id?: string;
    fullName?: string;
    email?: string;
  } | null;
  telegramUsername?: string;
}

export default function TelegramPurchaseModal({
  isOpen,
  onClose,
  billingCycle = "MONTHLY",
  user,
  telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_ADMIN || "MusayevDoniyor",
}: TelegramPurchaseModalProps) {
  const [copied, setCopied] = useState(false);
  const [cycle, setCycle] = useState<"MONTHLY" | "QUARTERLY">(billingCycle);

  const priceUsd = cycle === "QUARTERLY" ? "$11.99" : "$4.99";
  const priceUzs = cycle === "QUARTERLY" ? "~145,000 UZS" : "~60,000 UZS";
  const planPeriodText = cycle === "QUARTERLY" ? "3 Oylik (Save 20%)" : "1 Oylik";

  const formattedMessage = useMemo(() => {
    const today = new Date().toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const candidateName = user?.fullName || "Yangi O'quvchi";
    const candidateEmail = user?.email || "Belgilanmagan";
    const candidateId = user?.id ? user.id.slice(-8) : "Mehmon";

    return `👋 Assalomu alaykum Doniyor aka / Vespera SAT Admin!

Men Vespera Pro Champion obunasini rasmiylashtirmoqchiman.

📋 Buyurtma Tafsilotlari:
• Tarif: Vespera Pro Champion (${planPeriodText})
• Narxi: ${priceUsd} (${priceUzs})
• O'quvchi: ${candidateName}
• Email: ${candidateEmail}
• Hisob ID: ${candidateId}
• Sana: ${today}

💳 To'lov Usullari:
• Click / Payme / UzCard / Humo
• Visa / Mastercard

Iltimos, to'lov uchun karta raqami yoki hisob ma'lumotlarini bersangiz. Chekni yuborishim bilanoq mening profilimga Pro litsenziyani faollashtirib bersangiz minnatdor bo'lardim. Rahmat!`;
  }, [cycle, user, priceUsd, priceUzs, planPeriodText]);

  // Clean username (remove leading @ if present)
  const cleanUsername = telegramUsername.replace(/^@/, "");
  const telegramUrl = `https://t.me/${cleanUsername}?text=${encodeURIComponent(formattedMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-2xl p-6 sm:p-8 space-y-6 animate-scale-up"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="space-y-2 text-center sm:text-left pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold font-mono">
              <MessageCircle size={13} className="text-blue-500" />
              <span>TELEGRAM ORQALI TO'LOV VA FAOLLASHTIRISH</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-main)] tracking-tight">
              Vespera Pro Tarifini Faollashtirish
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              To'lovni amalga oshirish uchun administratorga Telegram orqali quyidagi tayyor xabar bilan yozing. Click, Payme yoki karta orqali to'langach, Pro 5 daqiqa ichida hisobingizga biriktiriladi!
            </p>
          </div>

          {/* Plan Duration Switcher */}
          <div className="p-1 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] grid grid-cols-2 gap-1">
            <button
              onClick={() => setCycle("MONTHLY")}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                cycle === "MONTHLY"
                  ? "bg-[var(--accent-blue)] text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              1 Oylik • $4.99 (~60,000 UZS)
            </button>
            <button
              onClick={() => setCycle("QUARTERLY")}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                cycle === "QUARTERLY"
                  ? "bg-[var(--accent-blue)] text-white shadow-xs"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              <span>3 Oylik • $11.99</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-mono">
                -20%
              </span>
            </button>
          </div>

          {/* Formatted Message Preview Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--text-muted)] font-mono flex items-center gap-1">
                <span>Yuboriladigan tayyor xabar matni:</span>
              </span>
              <button
                onClick={handleCopy}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500" />
                    <span className="text-emerald-500">Nusxa olindi!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Nusxa olish</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] p-4 text-xs font-mono text-[var(--text-main)] whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto selection:bg-blue-500/20">
              {formattedMessage}
            </div>
          </div>

          {/* Payment Methods Badges */}
          <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-main)] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono block">
              Qo'llab-quvvatlanadigan to'lov usullari:
            </span>
            <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-[var(--text-main)]">
              <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-main)] text-blue-500 font-bold">
                Click
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-main)] text-emerald-500 font-bold">
                Payme
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-main)]">
                UzCard / Humo
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-main)]">
                Visa / Mastercard
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#229ED9] hover:bg-[#1E88E5] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 group cursor-pointer"
            >
              <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Telegram orqali xabar yuborish (@{cleanUsername})</span>
              <ExternalLink size={13} className="opacity-70" />
            </a>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-main)] text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copied ? "Matn nusxalandi!" : "Xabar matnidan nusxa olish"}</span>
            </button>
          </div>

          <div className="text-center text-[10px] text-[var(--text-muted)] font-mono flex items-center justify-center gap-2">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span>To'lov cheki tasdiqlangach, litsenziya darhol hisobingizga yuklanadi</span>
          </div>
        </div>
      </div>
    </Portal>
  );
}
