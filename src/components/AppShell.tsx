"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DesmosCalculator from "./DesmosCalculator";
import AICopilotModal from "./AICopilotModal";
import { ThemeProvider } from "./ThemeContext";
import { SidebarProvider, useSidebar } from "./SidebarContext";
import { AuthProvider } from "./AuthContext";
import AuthModal from "./AuthModal";
import OnboardingModal from "./OnboardingModal";

function AppShellContent({ children }: { children: React.ReactNode }) {
  const [isDesmosOpen, setIsDesmosOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotContext, setCopilotContext] = useState<{
    question?: string;
    domain?: string;
    userChoice?: string | null;
    correctChoice?: string | null;
    options?: string[] | string | null;
    explanationUz?: string | null;
    explanationEn?: string | null;
    desmosTrick?: string | null;
    autoDiagnose?: boolean;
  } | null>(null);
  const { isCollapsed } = useSidebar();

  useEffect(() => {
    const handleOpenCopilot = (e: any) => {
      if (e.detail) {
        setCopilotContext({
          question: e.detail.question,
          domain: e.detail.domain,
          userChoice: e.detail.userChoice,
          correctChoice: e.detail.correctChoice,
          options: e.detail.options,
          explanationUz: e.detail.explanationUz,
          explanationEn: e.detail.explanationEn,
          desmosTrick: e.detail.desmosTrick,
          autoDiagnose: e.detail.autoDiagnose,
        });
      }
      setIsCopilotOpen(true);
    };
    window.addEventListener("vespera_open_copilot", handleOpenCopilot);
    return () => window.removeEventListener("vespera_open_copilot", handleOpenCopilot);
  }, []);

  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isExamPage = pathname?.startsWith("/mock/exam/");
  const isMentorPage = pathname === "/mentor";

  if (isAuthPage || isExamPage || isMentorPage) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-[var(--bg-main)] text-[var(--text-main)] transition-colors">
        {children}
        <AuthModal />
        <OnboardingModal />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-main)] text-[var(--text-main)] transition-colors">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Navbar
          onToggleDesmos={() => setIsDesmosOpen(!isDesmosOpen)}
          isDesmosOpen={isDesmosOpen}
        />
        <main
          className={`flex-1 w-full mx-auto ${
            pathname === "/mentor"
              ? "p-0 h-full overflow-hidden flex flex-col"
              : "max-w-[1780px] px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-6 md:py-8 overflow-y-auto"
          }`}
        >
          {children}
        </main>
      </div>

      {/* Floating Desmos Calculator */}
      {isDesmosOpen && (
        <DesmosCalculator
          isFloating={true}
          onClose={() => setIsDesmosOpen(false)}
        />
      )}

      {/* AI Copilot Mentor Modal */}
      <AICopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        contextQuestion={copilotContext?.question}
        topicDomain={copilotContext?.domain}
        userChoice={copilotContext?.userChoice}
        correctChoice={copilotContext?.correctChoice}
        options={copilotContext?.options}
        explanationUz={copilotContext?.explanationUz}
        explanationEn={copilotContext?.explanationEn}
        desmosTrick={copilotContext?.desmosTrick}
        autoDiagnose={copilotContext?.autoDiagnose}
        onClearContext={() => setCopilotContext(null)}
      />

      {/* Authentication & Personalization Modals */}
      <AuthModal />
      <OnboardingModal />
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <AppShellContent>{children}</AppShellContent>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
