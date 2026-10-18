import { SATVocabWord, SAT_650_VOCABULARY } from "./sat-vocab-data";

export type RecallRating = "again" | "hard" | "good" | "easy";

export interface VocabProgressItem {
  wordId: number;
  status: "new" | "learning" | "mastered";
  intervalDays: number; // Days until next review
  easeFactor: number;   // SM-2 multiplier (default 2.5)
  repetitions: number;  // Consecutive successful recalls
  lastReviewedAt: string | null;
  nextReviewAt: string; // ISO date string
  starred: boolean;
  history: {
    date: string;
    rating: RecallRating;
  }[];
}

export interface VocabStats {
  totalWords: number;
  masteredCount: number;
  learningCount: number;
  newCount: number;
  dueTodayCount: number;
  starredCount: number;
  streakDays: number;
}

const STORAGE_KEY = "vespera_vocab_progress_v1";
const STREAK_KEY = "vespera_vocab_streak_v1";

export function loadVocabProgress(): Record<number, VocabProgressItem> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load vocab progress from localStorage:", e);
    return {};
  }
}

export function saveVocabProgress(data: Record<number, VocabProgressItem>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save vocab progress to localStorage:", e);
  }
}

export function getWordProgress(wordId: number): VocabProgressItem {
  const all = loadVocabProgress();
  if (all[wordId]) return all[wordId];

  // Default initial item
  return {
    wordId,
    status: "new",
    intervalDays: 0,
    easeFactor: 2.5,
    repetitions: 0,
    lastReviewedAt: null,
    nextReviewAt: new Date().toISOString(),
    starred: false,
    history: []
  };
}

/**
 * SuperMemo SM-2 Spaced Repetition calculation
 */
export function recordVocabReview(wordId: number, rating: RecallRating): VocabProgressItem {
  const all = loadVocabProgress();
  const current = all[wordId] || getWordProgress(wordId);

  const now = new Date();
  let { intervalDays, easeFactor, repetitions } = current;
  let status: "new" | "learning" | "mastered" = current.status;

  if (rating === "again") {
    repetitions = 0;
    intervalDays = 0;
    status = "learning";
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else if (rating === "hard") {
    repetitions = Math.max(1, repetitions);
    intervalDays = Math.max(1, Math.round(intervalDays * 1.2));
    status = "learning";
    easeFactor = Math.max(1.3, easeFactor - 0.15);
  } else if (rating === "good") {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 3;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitions += 1;
    status = repetitions >= 3 ? "mastered" : "learning";
  } else if (rating === "easy") {
    if (repetitions === 0) {
      intervalDays = 4;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor * 1.3);
    }
    repetitions += 1;
    status = "mastered";
    easeFactor += 0.15;
  }

  // Calculate next review timestamp
  const nextDate = new Date(now.getTime());
  if (intervalDays === 0) {
    // 10 minutes later in current session
    nextDate.setMinutes(nextDate.getMinutes() + 10);
  } else {
    nextDate.setDate(nextDate.getDate() + intervalDays);
  }

  const updated: VocabProgressItem = {
    ...current,
    status,
    intervalDays,
    easeFactor: Math.round(easeFactor * 100) / 100,
    repetitions,
    lastReviewedAt: now.toISOString(),
    nextReviewAt: nextDate.toISOString(),
    history: [
      ...(current.history || []),
      { date: now.toISOString(), rating }
    ].slice(-20) // Keep last 20 reviews
  };

  all[wordId] = updated;
  saveVocabProgress(all);
  updateStreak();
  return updated;
}

export function toggleVocabStar(wordId: number): boolean {
  const all = loadVocabProgress();
  const current = all[wordId] || getWordProgress(wordId);
  const newStarred = !current.starred;

  all[wordId] = {
    ...current,
    starred: newStarred
  };
  saveVocabProgress(all);
  return newStarred;
}

export function getVocabStats(): VocabStats {
  const all = loadVocabProgress();
  const now = new Date();

  let masteredCount = 0;
  let learningCount = 0;
  let dueTodayCount = 0;
  let starredCount = 0;

  for (const w of SAT_650_VOCABULARY) {
    const item = all[w.id];
    if (item) {
      if (item.status === "mastered") masteredCount++;
      else if (item.status === "learning") learningCount++;

      if (item.starred) starredCount++;

      if (new Date(item.nextReviewAt) <= now) {
        dueTodayCount++;
      }
    }
  }

  const newCount = SAT_650_VOCABULARY.length - (masteredCount + learningCount);
  const streakDays = getStreakDays();

  return {
    totalWords: SAT_650_VOCABULARY.length,
    masteredCount,
    learningCount,
    newCount: Math.max(0, newCount),
    dueTodayCount,
    starredCount,
    streakDays
  };
}

export function getDueWords(customList?: SATVocabWord[]): SATVocabWord[] {
  const pool = customList || SAT_650_VOCABULARY;
  const all = loadVocabProgress();
  const now = new Date();

  return pool.filter((w) => {
    const item = all[w.id];
    if (!item) return true; // Brand new words are due
    return new Date(item.nextReviewAt) <= now;
  });
}

function updateStreak(): void {
  if (typeof window === "undefined") return;
  try {
    const today = new Date().toISOString().split("T")[0];
    const raw = localStorage.getItem(STREAK_KEY);
    let streakData = { count: 1, lastDate: today };

    if (raw) {
      streakData = JSON.parse(raw);
      if (streakData.lastDate === today) {
        return; // already updated today
      }
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (streakData.lastDate === yesterdayStr) {
        streakData.count += 1;
      } else {
        streakData.count = 1;
      }
      streakData.lastDate = today;
    }
    localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
  } catch (e) {
    // ignore
  }
}

function getStreakDays(): number {
  if (typeof window === "undefined") return 1;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return 1;
    const data = JSON.parse(raw);
    return data.count || 1;
  } catch {
    return 1;
  }
}
