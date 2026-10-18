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
  description?: string;
  descriptionEn?: string;
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

export function getRwDisplayContent(q: {
  section?: string;
  passage?: string | null;
  prompt: string;
  options?: string[];
}): { passage: string; prompt: string } {
  if (q.passage && q.passage.trim().length > 0) {
    return {
      passage: q.passage.trim(),
      prompt: q.prompt.trim(),
    };
  }

  const text = (q.prompt || "").trim();

  // Student notes
  const studentMatch = text.match(/\n?(The (?:student|researcher) wants to[\s\S]*?(?:Which|What)[\s\S]*?\?)\s*$/i);
  if (studentMatch && studentMatch.index !== undefined) {
    return {
      passage: text.substring(0, studentMatch.index).trim(),
      prompt: studentMatch[1].trim(),
    };
  }

  // Common stems
  const stemPatterns = [
    /\n\s*((?:Which|What) choice completes the text with the most logical transition\?)\s*$/i,
    /\n\s*((?:Which|What) choice completes the text with the most logical and precise word or phrase\?)\s*$/i,
    /\n\s*((?:Which|What) choice completes the text so that it conforms to the conventions of Standard English\?)\s*$/i,
    /\n\s*((?:Which|What) choice best describes the function of[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice best describes the overall structure[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice best states the main (?:idea|purpose)[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice best summarizes the text\?)\s*$/i,
    /\n\s*((?:Which|What) choice best describes the relationship[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice most effectively uses data from[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice most effectively uses information from[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) finding(?:, if true,)? would most (?:strongly|directly) (?:support|weaken)[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) finding from the [^\n\?]+, if true, would most (?:strongly|directly) (?:support|weaken)[\s\S]*?\?)\s*$/i,
    /\n\s*(As used in the text, (?:what|which) does the word[\s\S]*?\?)\s*$/i,
    /\n\s*(Based on the texts?,[\s\S]*?\?)\s*$/i,
    /\n\s*(According to the text,[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) quotation from[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice[\s\S]*?\?)\s*$/i,
    /\n\s*(What does the text most strongly suggest[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) [^\n\?]+\?)\s*$/i,
  ];

  for (const pat of stemPatterns) {
    const match = text.match(pat);
    if (match && match.index !== undefined) {
      return {
        passage: text.substring(0, match.index).trim(),
        prompt: match[1].trim(),
      };
    }
  }

  if (text.includes("______") || text.includes("_______")) {
    const isTransition = (q.options || []).some((o) =>
      /^(A\s+)?(However|Therefore|Furthermore|Consequently|In addition|Previously|Meanwhile|For example|Thus|Similarly)/i.test(
        o
      )
    );
    return {
      passage: text,
      prompt: isTransition
        ? "Which choice completes the text with the most logical transition?"
        : "Which choice completes the text so that it conforms to the conventions of Standard English?",
    };
  }

  const lastQMark = text.lastIndexOf("?");
  if (lastQMark !== -1) {
    const prevNewline = text.lastIndexOf("\n", lastQMark);
    if (prevNewline !== -1) {
      return {
        passage: text.substring(0, prevNewline).trim(),
        prompt: text.substring(prevNewline).trim(),
      };
    }
  }

  return {
    passage: text,
    prompt: "Which choice best answers the question based on the text?",
  };
}

