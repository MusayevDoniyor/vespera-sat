/**
 * Vespera Adaptive Intelligence & Personalization Engine
 * Powers Bayesian score estimation, adaptive question recommendations,
 * spaced repetition (SM-2) scheduling, and diagnostic placement.
 */

export interface ScorePrediction {
  composite: number;
  math: number;
  verbal: number;
  scoreRange: { low: number; high: number };
  confidence: "calibrating" | "moderate" | "high";
  readinessIndex: number; // 0 - 100%
}

export interface DomainMastery {
  domain: string;
  section: "MATH" | "READING_WRITING";
  attempted: number;
  correct: number;
  accuracy: number;
  status: "Mastered" | "Proficient" | "Needs Focus" | "Untested";
  recommendedUnitSlug: string;
  recommendedUnitTitle: string;
}

export interface DailyMission {
  id: string;
  title: string;
  subtitle: string;
  type: "diagnostic" | "weakness" | "review" | "curriculum";
  targetUrl: string;
  targetCount: number;
  completedCount: number;
  isCompleted: boolean;
  badge: string;
}

/**
 * Maps each SAT domain to its primary Khan Academy unit
 */
export const DOMAIN_TO_UNIT_MAP: Record<string, { slug: string; title: string }> = {
  "Algebra": {
    slug: "unit-06-medium-algebra",
    title: "Unit 6: Medium: Algebra"
  },
  "Advanced Math": {
    slug: "unit-08-medium-adv-math",
    title: "Unit 8: Medium: Advanced Math"
  },
  "Problem Solving & Data Analysis": {
    slug: "unit-07-medium-psda",
    title: "Unit 7: Medium: PSDA"
  },
  "Problem Solving and Data Analysis": {
    slug: "unit-07-medium-psda",
    title: "Unit 7: Medium: PSDA"
  },
  "Geometry & Trigonometry": {
    slug: "unit-09-medium-geom-trig",
    title: "Unit 9: Medium: Geometry & Trig"
  },
  "Geometry and Trigonometry": {
    slug: "unit-09-medium-geom-trig",
    title: "Unit 9: Medium: Geometry & Trig"
  },
  "Information and Ideas": {
    slug: "unit-03-foundations-psda",
    title: "Reading: Information & Evidence"
  },
  "Craft and Structure": {
    slug: "unit-01-about-sat",
    title: "Reading: Words in Context & Structure"
  },
  "Expression of Ideas": {
    slug: "unit-02-foundations-algebra",
    title: "Writing: Transitions & Synthesis"
  },
  "Standard English Conventions": {
    slug: "unit-02-foundations-algebra",
    title: "Writing: Boundaries & Agreement"
  }
};

/**
 * Calculates a robust, Bayesian-adjusted SAT predicted score.
 * Unlike a naive accuracy * 600 multiplier, this factors in sample size shrinkage:
 * - Few attempts (e.g. < 15): Shrinks estimate toward user's baseline/profile level with wider confidence interval.
 * - Many attempts (e.g. 50+): Weight shifts strictly to empirical accuracy with narrow confidence interval.
 */
export function calculateAdaptiveScore(params: {
  mathAttempted: number;
  mathCorrect: number;
  verbalAttempted: number;
  verbalCorrect: number;
  mathLevel?: string;
  englishLevel?: string;
  currentSatScore?: number | null;
  targetSatScore?: number;
  mockHighestScore?: number;
}): ScorePrediction {
  const {
    mathAttempted,
    mathCorrect,
    verbalAttempted,
    verbalCorrect,
    mathLevel = "intermediate",
    englishLevel = "intermediate",
    currentSatScore = null,
    targetSatScore = 1550,
    mockHighestScore = 0
  } = params;

  // Determine prior baseline from self-reported profile
  let priorMath = 550;
  if (mathLevel === "beginner") priorMath = 480;
  else if (mathLevel === "intermediate") priorMath = 600;
  else if (mathLevel === "advanced" || mathLevel === "target_800") priorMath = 720;

  let priorVerbal = 550;
  if (englishLevel === "beginner") priorVerbal = 480;
  else if (englishLevel === "intermediate") priorVerbal = 600;
  else if (englishLevel === "advanced" || englishLevel === "native") priorVerbal = 700;

  if (currentSatScore && currentSatScore >= 400 && currentSatScore <= 1600) {
    priorMath = Math.round(currentSatScore * 0.52);
    priorVerbal = Math.round(currentSatScore * 0.48);
  }

  // Bayesian pseudo-counts (equivalent to 12 prior observations)
  const priorWeight = 12;
  const priorMathAccuracy = (priorMath - 200) / 600;
  const posteriorMathAccuracy =
    (mathCorrect + priorWeight * priorMathAccuracy) / (mathAttempted + priorWeight);

  const priorVerbalAccuracy = (priorVerbal - 200) / 600;
  const posteriorVerbalAccuracy =
    (verbalCorrect + priorWeight * priorVerbalAccuracy) / (verbalAttempted + priorWeight);

  // Scaled Section Scores (200 - 800, rounded to nearest 10)
  let projectedMath = Math.round((200 + posteriorMathAccuracy * 600) / 10) * 10;
  projectedMath = Math.min(800, Math.max(200, projectedMath));

  let projectedVerbal = Math.round((200 + posteriorVerbalAccuracy * 600) / 10) * 10;
  projectedVerbal = Math.min(800, Math.max(200, projectedVerbal));

  // If mock exam score is higher and valid, factor it in
  if (mockHighestScore >= 600) {
    const mockComposite = mockHighestScore;
    const currentEst = projectedMath + projectedVerbal;
    const blended = Math.round((currentEst * 0.7 + mockComposite * 0.3) / 10) * 10;
    projectedMath = Math.round((blended * 0.52) / 10) * 10;
    projectedVerbal = blended - projectedMath;
  }

  const composite = projectedMath + projectedVerbal;

  // Confidence margin based on total question volume
  const totalAttempted = mathAttempted + verbalAttempted;
  let margin = 90;
  let confidence: "calibrating" | "moderate" | "high" = "calibrating";

  if (totalAttempted >= 50) {
    margin = 30;
    confidence = "high";
  } else if (totalAttempted >= 15) {
    margin = 50;
    confidence = "moderate";
  }

  const low = Math.max(400, Math.round((composite - margin) / 10) * 10);
  const high = Math.min(1600, Math.round((composite + margin) / 10) * 10);

  // Readiness Index: Progress toward target score
  const baseline = 800;
  const progressRatio = Math.max(0, Math.min(1, (composite - baseline) / (targetSatScore - baseline)));
  const coverageRatio = Math.min(1, totalAttempted / 100);
  const readinessIndex = Math.round((progressRatio * 0.75 + coverageRatio * 0.25) * 100);

  return {
    composite,
    math: projectedMath,
    verbal: projectedVerbal,
    scoreRange: { low, high },
    confidence,
    readinessIndex
  };
}

/**
 * 8 Authentic Diagnostic Benchmark Questions (4 Math, 4 Verbal)
 * Spans all core College Board domains for quick 5-min placement.
 */
export const DIAGNOSTIC_BENCHMARK_QUESTIONS = [
  {
    id: "diag_math_01",
    section: "MATH",
    domain: "Algebra",
    topicCode: "ALG-01",
    difficulty: "Medium",
    prompt: "If $4(2x - 3) = 2x + 18$, what is the value of $3x - 2$?",
    options: ["A. 11", "B. 13", "C. 15", "D. 17"],
    correctAnswer: "B",
    explanation: "$8x - 12 = 2x + 18 \\implies 6x = 30 \\implies x = 5$. Then $3(5) - 2 = 13$."
  },
  {
    id: "diag_math_02",
    section: "MATH",
    domain: "Advanced Math",
    topicCode: "ADV-02",
    difficulty: "Hard",
    prompt: "For what value of $c$ does the equation $2x^2 - 8x + c = 0$ have exactly one real solution?",
    options: ["A. 4", "B. 8", "C. 12", "D. 16"],
    correctAnswer: "B",
    explanation: "For 1 solution, $\\Delta = b^2 - 4ac = 0 \\implies (-8)^2 - 4(2)(c) = 0 \\implies 64 - 8c = 0 \\implies c = 8$."
  },
  {
    id: "diag_math_03",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    topicCode: "DAT-03",
    difficulty: "Medium",
    prompt: "A survey of 500 voters had a margin of error of 4%. To reduce the margin of error to 2% under identical conditions, how many voters must be surveyed?",
    options: ["A. 1,000", "B. 1,500", "C. 2,000", "D. 4,000"],
    correctAnswer: "C",
    explanation: "$MoE \\propto 1/\\sqrt{n}$. Halving error requires multiplying sample size by $2^2 = 4 \\implies 500 \\times 4 = 2,000$."
  },
  {
    id: "diag_math_04",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    topicCode: "GEO-04",
    difficulty: "Medium",
    prompt: "A circle has equation $(x - 3)^2 + (y + 5)^2 = 36$. If angle $A$ and angle $B$ are acute angles in a right triangle with $\\sin(A) = \\frac{5}{13}$, what is $\\cos(B)$?",
    options: ["A. 5/13", "B. 12/13", "C. 5/12", "D. 13/5"],
    correctAnswer: "A",
    explanation: "In a right triangle, complementary acute angles satisfy $\\cos(B) = \\sin(A) = 5/13$."
  },
  {
    id: "diag_rw_01",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    topicCode: "ENG-WIC",
    difficulty: "Medium",
    prompt: "The composer’s early symphonies adhered strictly to classical form, but her later compositions were remarkably ______: daring harmonies and fluid rhythms replaced traditional structure.\n\nWhich choice completes the text with the most logical and precise word?",
    options: ["A. conventional", "B. idiosyncratic", "C. redundant", "D. derivative"],
    correctAnswer: "B",
    explanation: "'Daring harmonies and fluid rhythms' contrasting with 'classical form' means the work became unique and peculiar ('idiosyncratic')."
  },
  {
    id: "diag_rw_02",
    section: "READING_WRITING",
    domain: "Information and Ideas",
    topicCode: "ENG-INF",
    difficulty: "Hard",
    prompt: "Ecologists observed that when wolves were reintroduced into Yellowstone, elk avoided grazing along open riverbanks. As a result, willow stands regenerated, and songbird populations increased dramatically. This sequence demonstrates that ______\n\nWhich choice most logically completes the text?",
    options: [
      "A. wolves directly consume willow stands when elk populations decline.",
      "B. the presence of an apex predator can initiate trophic cascades that alter entire plant and animal communities.",
      "C. elk populations are entirely incapable of surviving alongside carnivores.",
      "D. songbird populations increase whenever water levels rise in river valleys."
    ],
    correctAnswer: "B",
    explanation: "The text describes an apex predator (wolves) changing prey behavior (elk), causing vegetation (willows) and other species (songbirds) to recover — a textbook trophic cascade."
  },
  {
    id: "diag_rw_03",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topicCode: "ENG-BOU",
    difficulty: "Medium",
    prompt: "Marine biologist Sylvia Earle has spent thousands of hours underwater ______ her pioneering deep-sea explorations have inspired generations of ocean conservationists.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "A. exploring,",
      "B. exploring; and",
      "C. exploring; moreover,",
      "D. exploring, however"
    ],
    correctAnswer: "C",
    explanation: "Two independent clauses must be joined with a semicolon. Semicolon + conjunctive adverb ('exploring; moreover,') correctly links the clauses."
  },
  {
    id: "diag_rw_04",
    section: "READING_WRITING",
    domain: "Expression of Ideas",
    topicCode: "ENG-TRA",
    difficulty: "Medium",
    prompt: "Solar panels convert sunlight directly into electricity with zero operational emissions. ______, their manufacturing process requires energy-intensive extraction of rare earth elements.\n\nWhich choice completes the text with the most logical transition?",
    options: ["A. Furthermore", "B. For instance", "C. Nevertheless", "D. Consequently"],
    correctAnswer: "C",
    explanation: "Sentence 1 presents a clean benefit (zero emissions); sentence 2 presents a drawback (energy-intensive extraction). 'Nevertheless' expresses the necessary contrast."
  }
];

/**
 * Evaluates diagnostic answers and generates baseline SAT score & recommendations
 */
export function evaluateDiagnostic(answers: Record<string, string>): {
  totalCorrect: number;
  mathCorrect: number;
  verbalCorrect: number;
  estimatedScore: number;
  estimatedMath: number;
  estimatedVerbal: number;
  weakestSection: "MATH" | "READING_WRITING";
  recommendedFirstUnit: { slug: string; title: string };
  domainBreakdown: Record<string, { correct: boolean; domain: string }>;
} {
  let mathCorrect = 0;
  let verbalCorrect = 0;
  const domainBreakdown: Record<string, { correct: boolean; domain: string }> = {};

  for (const q of DIAGNOSTIC_BENCHMARK_QUESTIONS) {
    const isCorrect = answers[q.id] === q.correctAnswer;
    domainBreakdown[q.id] = { correct: isCorrect, domain: q.domain };
    if (isCorrect) {
      if (q.section === "MATH") mathCorrect++;
      else verbalCorrect++;
    }
  }

  const estimatedMath = Math.round((350 + mathCorrect * 110) / 10) * 10;
  const estimatedVerbal = Math.round((350 + verbalCorrect * 110) / 10) * 10;
  const estimatedScore = estimatedMath + estimatedVerbal;

  const weakestSection = mathCorrect <= verbalCorrect ? "MATH" : "READING_WRITING";
  const recommendedFirstUnit =
    weakestSection === "MATH"
      ? { slug: "unit-06-medium-algebra", title: "Unit 6: Medium: Algebra" }
      : { slug: "unit-01-about-sat", title: "Reading & Writing: Foundations" };

  return {
    totalCorrect: mathCorrect + verbalCorrect,
    mathCorrect,
    verbalCorrect,
    estimatedScore,
    estimatedMath,
    estimatedVerbal,
    weakestSection,
    recommendedFirstUnit,
    domainBreakdown
  };
}

/**
 * Builds the 3 personalized Daily Missions tailored to user goals and progress
 */
export function buildPersonalizedMissions(params: {
  userTargetScore?: number;
  dueReviewsCount: number;
  weakestDomain?: string;
  hasTakenDiagnostic: boolean;
  todayQuestionsSolved?: number;
}): DailyMission[] {
  const {
    userTargetScore = 1550,
    dueReviewsCount = 0,
    weakestDomain = "Algebra",
    hasTakenDiagnostic = false,
    todayQuestionsSolved = 0
  } = params;

  const targetUnit = DOMAIN_TO_UNIT_MAP[weakestDomain] || {
    slug: "unit-06-medium-algebra",
    title: "Unit 6: Medium: Algebra"
  };

  const missions: DailyMission[] = [];

  // Mission 1: Diagnostic or Weakness Drill
  if (!hasTakenDiagnostic) {
    missions.push({
      id: "mission_diag",
      title: "5-Min Diagnostic Assessment",
      subtitle: "Calibrate your baseline score and reveal your priority growth topics.",
      type: "diagnostic",
      targetUrl: "#diagnostic-modal",
      targetCount: 8,
      completedCount: 0,
      isCompleted: false,
      badge: "Target 1550+ Calibrator"
    });
  } else {
    missions.push({
      id: "mission_weakness",
      title: `Weakness Drill: ${weakestDomain}`,
      subtitle: `Target your lowest accuracy area with authentic College Board questions.`,
      type: "weakness",
      targetUrl: `/curriculum/units/${targetUnit.slug}`,
      targetCount: 5,
      completedCount: Math.min(5, todayQuestionsSolved),
      isCompleted: todayQuestionsSolved >= 5,
      badge: "Target High Yield"
    });
  }

  // Mission 2: Spaced Repetition Error Review
  if (dueReviewsCount > 0) {
    missions.push({
      id: "mission_sm2_review",
      title: "Spaced Repetition Error Vault",
      subtitle: `You have ${dueReviewsCount} mistake${dueReviewsCount > 1 ? "s" : ""} scheduled for SM-2 active recall today.`,
      type: "review",
      targetUrl: "/error-log",
      targetCount: dueReviewsCount,
      completedCount: 0,
      isCompleted: false,
      badge: "Active Recall SM-2"
    });
  } else {
    missions.push({
      id: "mission_speed_drill",
      title: "10-Sec Desmos Speed Drill",
      subtitle: "Practice 5 instant-solve questions to build cognitive speed.",
      type: "review",
      targetUrl: "/desmos",
      targetCount: 5,
      completedCount: Math.min(5, todayQuestionsSolved),
      isCompleted: todayQuestionsSolved >= 5,
      badge: "Speedrun 800"
    });
  }

  // Mission 3: Curriculum Mastery
  missions.push({
    id: "mission_curriculum",
    title: `Master ${targetUnit.title}`,
    subtitle: `Read high-yield chapters and conquer the 10-Question Target Practice Quiz.`,
    type: "curriculum",
    targetUrl: `/curriculum/units/${targetUnit.slug}`,
    targetCount: 1,
    completedCount: 0,
    isCompleted: false,
    badge: "Textbook Chapter"
  });

  return missions;
}
