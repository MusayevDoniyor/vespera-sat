"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DesmosCalculator from "./DesmosCalculator";
import AICopilotModal from "./AICopilotModal";
import { ThemeProvider } from "./ThemeContext";
import { SidebarProvider, useSidebar } from "./SidebarContext";

function AppShellContent({ children }: { children: React.ReactNode }) {
  const [isDesmosOpen, setIsDesmosOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotContext, setCopilotContext] = useState<{ question?: string; domain?: string } | null>(null);
  const { isCollapsed } = useSidebar();

  useEffect(() => {
    const handleOpenCopilot = (e: any) => {
      if (e.detail?.question || e.detail?.domain) {
        setCopilotContext({ question: e.detail.question, domain: e.detail.domain });
      }
      setIsCopilotOpen(true);
    };
    window.addEventListener("vespera_open_copilot", handleOpenCopilot);
    return () => window.removeEventListener("vespera_open_copilot", handleOpenCopilot);
  }, []);

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
          className="flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 overflow-y-auto transition-all duration-300"
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
        onClearContext={() => setCopilotContext(null)}
      />
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppShellContent>{children}</AppShellContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}
