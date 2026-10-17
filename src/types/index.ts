export type SectionType = "MATH" | "READING_WRITING";

export interface Topic {
  id: string;
  section: SectionType;
  domain: string;
  code: string;
  titleUz: string;
  titleEn: string;
  descriptionUz: string;
  desmosTips?: string | null;
  order: number;
}

export interface Question {
  id: string;
  topicId: string;
  section: SectionType;
  domain: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prompt: string;
  passage?: string | null;
  options: string; // JSON array of options
  correctAnswer: string;
  explanationUz: string;
  explanationEn: string;
  desmosTrick?: string | null;
  referenceFormula?: string | null;
  topic?: Topic;
  progress?: UserProgress[];
}

export interface UserProgress {
  id: string;
  questionId: string;
  status: "CORRECT" | "INCORRECT" | "BOOKMARKED";
  userChoice?: string | null;
  timeSpent: number;
  notes?: string | null;
  updatedAt: string;
}

export interface ErrorLogItem {
  id: string;
  questionId: string;
  question: Question;
  mistakeType: "CONCEPT_GAP" | "CALCULATION_SLIP" | "MISREAD_QUESTION" | "DESMOS_MISSED";
  notes?: string | null;
  stage: "STAGE_1_DAY" | "STAGE_3_DAYS" | "STAGE_7_DAYS" | "MASTERED";
  nextReviewAt: string;
  isResolved: boolean;
  createdAt: string;
}

export interface MockExamResult {
  id: string;
  title: string;
  section: string;
  score: number;
  mathScore?: number | null;
  readingScore?: number | null;
  totalQuestions: number;
  correctCount: number;
  timeSpent: number;
  completedAt: string;
}
