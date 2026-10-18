import bluebookExamsData from "./bluebook-exams-data.json";

export interface BluebookQuestion {
  id: string;
  section: "READING_WRITING" | "MATH";
  module: 1 | 2;
  tier?: "standard" | "hard" | "easy";
  domain: string;
  skill: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prompt: string;
  passage?: string | null;
  type: "multiple_choice" | "spr"; // Student Produced Response (Grid-in)
  options?: string[]; // e.g. ["A) ...", "B) ...", "C) ...", "D) ..."]
  correctAnswer: string; // "A" | "B" | "C" | "D" or numeric string like "14" or "7/2"
  explanationEn: string;
  explanationUz: string;
  desmosTrick?: string | null;
  referenceFormula?: string | null;
  diagramPreset?: string | null;
  diagramSvg?: string | null;
}

export interface BluebookExamForm {
  id: string;
  title: string;
  formCode: string;
  descriptionUz: string;
  badge: string;
  totalQuestions: number;
  rwTimingMinutes: number; // 32 min per module
  mathTimingMinutes: number; // 35 min per module
  rwModule1: BluebookQuestion[];
  rwModule2Hard: BluebookQuestion[];
  rwModule2Easy: BluebookQuestion[];
  mathModule1: BluebookQuestion[];
  mathModule2Hard: BluebookQuestion[];
  mathModule2Easy: BluebookQuestion[];
}

export const BLUEBOOK_EXAMS: BluebookExamForm[] = bluebookExamsData as unknown as BluebookExamForm[];
