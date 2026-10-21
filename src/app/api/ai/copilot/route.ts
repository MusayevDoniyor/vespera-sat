import { NextResponse } from "next/server";

interface UserProfileData {
  fullName?: string;
  mathLevel?: string;
  englishLevel?: string;
  targetSatScore?: number;
  ieltsScore?: string | null;
  currentSatScore?: number | null;
  dailyGoalMinutes?: number;
  examDate?: string | null;
  priorityWeakness?: string | null;
}

interface CopilotPayload {
  questionPrompt?: string;
  userQuestion?: string;
  topicDomain?: string;
  userChoice?: string | null;
  correctChoice?: string | null;
  options?: string[] | string | null;
  explanationUz?: string | null;
  explanationEn?: string | null;
  desmosTrick?: string | null;
  userProfile?: UserProfileData | null;
}

// Working Gemini models (latest stable)
const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-3.8-flash",
  "gemini-2.5-pro",
  "gemini-pro-latest",
];

export async function POST(request: Request) {
  try {
    const body: CopilotPayload = await request.json();
    const {
      questionPrompt = "",
      userQuestion = "",
      topicDomain = "Digital SAT",
      userChoice,
      correctChoice,
      options,
      explanationUz,
      explanationEn,
      desmosTrick,
      userProfile,
    } = body;

    const userQ = (userQuestion || "").trim();

    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const openAIKey = process.env.OPENAI_API_KEY;

    const studentName = userProfile?.fullName || "Scholar";
    const targetScore = userProfile?.targetSatScore || 1550;
    const mathGoal = userProfile?.mathLevel === "target_800" ? "800 Elite" : "750+";
    const ieltsContext = userProfile?.ieltsScore
      ? `IELTS ${userProfile.ieltsScore} baseline (strong comprehension)`
      : `${userProfile?.englishLevel || "Intermediate"} English level`;

    const systemPrompt = `You are **Vespera SAT AI Mentor** — an elite, world-class Digital SAT coach and Socratic tutor, exclusively personalized for ${studentName}.

**Student Profile:**
- Target Composite: **${targetScore}+**
- Math Goal: **${mathGoal}** 
- Verbal Profile: **${ieltsContext}**
${userProfile?.examDate ? `- Exam Date: **${userProfile.examDate}**` : ""}
${userProfile?.priorityWeakness ? `- Priority Weakness: **${userProfile.priorityWeakness}**` : ""}

**Your Teaching Philosophy:**
You teach through *first principles* — never just stating answers, but building deep, transferable intuition. You are concise, sharp, and never waste words. You think like the College Board psychometrician who *wrote* the trap, so you can dismantle it instantly.

**Mandatory Response Format** (always use this 4-section structure when explaining a question):

### 🎯 Direct Solution
Break down the core rule step-by-step. Use LaTeX: $inline$ for terms (e.g. $x = 4$) and $$display$$ for equations.

### ⚡ 10-Second Desmos Hack *(Math questions only)*
Give EXACT Desmos inputs line-by-line. Explain which gray dot / slider / intersection to click.

### ⚠️ College Board Trap Analysis  
Name and dissect the exact trap type (Partial Solver, Sign Flip, False Equivalency, Domain Constraint, etc.). Explain WHY the wrong choice was engineered to be tempting.

### 🧠 Golden Rule
One sharp, memorable takeaway rule for test day. Bold it.

**Style Rules:**
- Always respond in **English only** (no Uzbek)
- Use markdown: **bold** for key terms, \`code\` for Desmos inputs, > [!TIP] / > [!WARNING] / > [!IMPORTANT] for callouts
- Be encouraging but direct — like a world-class Olympiad coach
- For non-question chats (greetings, concepts, strategy): skip the 4-section format and be conversational but brilliant`;

    const userPrompt = `**SAT Domain:** ${topicDomain}
**Question:** ${questionPrompt || "General question (no specific question context)"}
**Answer Choices:** ${Array.isArray(options) ? options.join(" | ") : options || "N/A"}
**Student's Choice:** ${userChoice || "Not specified"}
**Correct Answer:** ${correctChoice || "Not specified"}
**Official Explanation:** ${explanationEn || explanationUz || "N/A"}
**Desmos Hint:** ${desmosTrick || "N/A"}

**Student Query:** "${userQ || "Explain this question and diagnose my mistake."}"`;

    // === 1. GEMINI API (primary) ===
    if (geminiKey?.trim()) {
      for (const model of GEMINI_MODELS) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                system_instruction: {
                  parts: [{ text: systemPrompt }],
                },
                contents: [
                  {
                    role: "user",
                    parts: [{ text: userPrompt }],
                  },
                ],
                generationConfig: {
                  temperature: 0.25,
                  maxOutputTokens: 1800,
                  topP: 0.9,
                },
                safetySettings: [
                  { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                  { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                  { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                  { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                ],
              }),
            }
          );

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text?.trim()) {
              return NextResponse.json({
                answer: text,
                source: `Gemini ${model}`,
                model,
                timestamp: new Date().toISOString(),
              });
            }
          } else {
            const err = await geminiRes.json().catch(() => ({}));
            console.warn(`[Gemini] ${model} → ${geminiRes.status}:`, err?.error?.message || err);
          }
        } catch (e) {
          console.warn(`[Gemini] ${model} failed:`, e);
        }
      }
    }

    // === 2. OPENAI API (fallback) ===
    if (openAIKey?.trim()) {
      try {
        const openAIRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAIKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.25,
            max_tokens: 1800,
          }),
        });

        if (openAIRes.ok) {
          const data = await openAIRes.json();
          const text = data.choices?.[0]?.message?.content;
          if (text?.trim()) {
            return NextResponse.json({
              answer: text,
              source: "GPT-4o Mini",
              model: "gpt-4o-mini",
              timestamp: new Date().toISOString(),
            });
          }
        }
      } catch (e) {
        console.warn("[OpenAI] fallback failed:", e);
      }
    }

    // === 3. DETERMINISTIC COGNITIVE ENGINE (last resort) ===
    const answer = buildFallbackResponse({
      questionPrompt,
      userQuestion: userQ,
      topicDomain,
      userChoice,
      correctChoice,
      explanationEn,
      explanationUz,
      desmosTrick,
      userProfile,
    });

    return NextResponse.json({
      answer,
      source: "Vespera Cognitive Engine",
      model: "offline",
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("[Copilot] Unhandled error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI explanation." },
      { status: 500 }
    );
  }
}

// ============================================================
// FALLBACK DETERMINISTIC ENGINE
// ============================================================
function buildFallbackResponse({
  userQuestion,
  topicDomain,
  userChoice,
  correctChoice,
  explanationEn,
  explanationUz,
  desmosTrick,
  userProfile,
}: {
  questionPrompt: string;
  userQuestion: string;
  topicDomain: string;
  userChoice?: string | null;
  correctChoice?: string | null;
  explanationEn?: string | null;
  explanationUz?: string | null;
  desmosTrick?: string | null;
  userProfile?: UserProfileData | null;
}): string {
  const studentName = userProfile?.fullName || "Scholar";
  const targetScore = userProfile?.targetSatScore || 1550;
  const qLower = userQuestion.toLowerCase();

  // Greeting
  if (/^(hi|hello|hey|start|help)/.test(qLower)) {
    return `👋 **Hello, ${studentName}!** I'm your Vespera SAT AI Mentor, targeting **${targetScore}+** for you.

> [!IMPORTANT]
> **AI is currently in offline mode.** Live Gemini responses require a valid GEMINI_API_KEY in your environment.

Here's what I can help you with:
- 🎯 **Mistake diagnosis** — why your choice was wrong & which trap you hit
- ⚡ **Desmos speedhacks** — solve in 10 seconds graphically  
- 🔍 **College Board trap patterns** — never fall for the same trick twice
- 🧠 **Concept deep-dives** — first principles, not just formulas

Ask me anything!`;
  }

  // Error diagnosis
  if (userChoice && correctChoice && userChoice.toUpperCase() !== correctChoice.toUpperCase()) {
    const W = userChoice.toUpperCase();
    const R = correctChoice.toUpperCase();
    return `### 💡 Error Diagnosis: [${W}] → [${R}]

> [!WARNING]
> **You chose:** \`${W}\` ❌ — **Correct:** \`${R}\` ✅

### 🎯 Direct Solution
${explanationEn || explanationUz || `Apply first principles: isolate exactly what the question asks for in the *final sentence*.`}

### ⚡ 10-Second Desmos Hack
${desmosTrick || `1. Enter both sides of the equation as separate \`y =\` lines\n2. Click the **gray intersection dot** — that's your answer\n3. For quadratics, the vertex coordinates appear automatically`}

### ⚠️ College Board Trap Analysis
Choice **${W}** is a **Partial Solver Trap** — it matches an intermediate calculation step (solving for $x$ when the question asks for $2x+3$, for example). College Board engineers this deliberately.

**How to avoid it:** Always re-read the *last sentence* of the question before selecting.

### 🧠 Golden Rule
> **"Underline the final target quantity before you start solving — never answer what you think was asked."**`;
  }

  // General fallback
  return `### 🎯 SAT Mentor Response — ${topicDomain}

${explanationEn || explanationUz || "No official explanation available for this question."}

${desmosTrick ? `### ⚡ Desmos Shortcut\n${desmosTrick}` : ""}

---

> [!TIP]
> **Pro Tip for ${studentName}:** On every ${topicDomain} problem, ask yourself: *"What is the College Board testing here — the concept, or a trap based on a predictable mistake?"*

Ask a more specific question for a deeper breakdown!`;
}
