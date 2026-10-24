"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export interface FullUserProfile {
  id: string;
  email: string;
  fullName: string;
  mathLevel: string;
  englishLevel: string;
  ieltsScore: string | null;
  currentSatScore: number | null;
  targetSatScore: number;
  examDate: string | null;
  dailyGoalMinutes: number;
  weeklyGoalHours: number;
  preferredStudyTime: string;
  practiceMode: string;
  difficultyMode: string;
  showDesmos: boolean;
  showAiExplanations: boolean;
  includeVocabReview: boolean;
  priorityWeakness: string | null;
  onboardingCompleted: boolean;
  createdAt?: string;
}

interface AuthContextType {
  user: FullUserProfile | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: "login" | "register";
  isOnboardingOpen: boolean;
  openAuthModal: (mode?: "login" | "register") => void;
  closeAuthModal: () => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    password: string;
    fullName?: string;
    mathLevel?: string;
    englishLevel?: string;
    ieltsScore?: string | null;
    currentSatScore?: number | null;
    targetSatScore?: number;
    examDate?: string | null;
    dailyGoalMinutes?: number;
    priorityWeakness?: string | null;
    onboardingCompleted?: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<FullUserProfile>) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FullUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
        // If user is logged in but hasn't completed onboarding, prompt onboarding
        if (data.user && !data.user.onboardingCompleted) {
          setIsOnboardingOpen(true);
        } else if (!data.user) {
          // If unauthenticated, auto-open registration modal on initial visit
          if (typeof window !== "undefined") {
            const path = window.location.pathname;
            if (!path.startsWith("/login") && !path.startsWith("/register")) {
              setAuthModalMode("register");
              setIsAuthModalOpen(true);
            }
          }
        }
      } else {
        setUser(null);
        if (typeof window !== "undefined") {
          const path = window.location.pathname;
          if (!path.startsWith("/login") && !path.startsWith("/register")) {
            setAuthModalMode("register");
            setIsAuthModalOpen(true);
          }
        }
      }
    } catch (err) {
      console.error("Failed to load user profile:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const openAuthModal = useCallback((mode: "login" | "register" = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const openOnboarding = useCallback(() => {
    setIsOnboardingOpen(true);
  }, []);

  const closeOnboarding = useCallback(() => {
    setIsOnboardingOpen(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }

      setUser(data.user);
      setIsAuthModalOpen(false);

      if (!data.user.onboardingCompleted) {
        setIsOnboardingOpen(true);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  }, []);

  const register = useCallback(async (userData: {
    email: string;
    password: string;
    fullName?: string;
    mathLevel?: string;
    englishLevel?: string;
    ieltsScore?: string | null;
    currentSatScore?: number | null;
    targetSatScore?: number;
    examDate?: string | null;
    dailyGoalMinutes?: number;
    priorityWeakness?: string | null;
    onboardingCompleted?: boolean;
  }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }

      setUser(data.user);
      setIsAuthModalOpen(false);

      // Open onboarding wizard if not marked complete
      if (!data.user.onboardingCompleted) {
        setIsOnboardingOpen(true);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setIsOnboardingOpen(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<FullUserProfile>) => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) {
        return { success: false, error: resData.error || "Failed to update profile" };
      }
      setUser(resData.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      isAuthModalOpen,
      authModalMode,
      isOnboardingOpen,
      openAuthModal,
      closeAuthModal,
      openOnboarding,
      closeOnboarding,
      login,
      register,
      logout,
      updateProfile,
      refreshUser,
    }),
    [
      user,
      loading,
      isAuthModalOpen,
      authModalMode,
      isOnboardingOpen,
      openAuthModal,
      closeAuthModal,
      openOnboarding,
      closeOnboarding,
      login,
      register,
      logout,
      updateProfile,
      refreshUser,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
