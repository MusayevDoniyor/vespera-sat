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

    // Check for API Keys in environment
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const openAIKey = process.env.OPENAI_API_KEY;

    const studentName = userProfile?.fullName || "Scholar";
    const targetScore = userProfile?.targetSatScore || 1550;
    const mathGoal = userProfile?.mathLevel === "target_800" ? "800 Elite" : "750+";
    const englishContext = userProfile?.ieltsScore
      ? `IELTS ${userProfile.ieltsScore} baseline`
      : `${userProfile?.englishLevel || "Intermediate"} Verbal profile`;

    let systemPrompt = `You are Vespera SAT AI Mentor, an elite, world-class Digital SAT master tutor personalized for ${studentName}.
Target Composite Score: ${targetScore}+ (Math: ${mathGoal}, Verbal: ${englishContext}).

Core Mission:
Deliver crystal-clear, high-yield, pedagogically brilliant explanations that teach the student not just HOW to solve the problem, but WHY the answer works, the exact College Board traps to avoid, and how to execute with maximum velocity using Desmos or elimination.

Pedagogical Structure Guidelines:
1. 🎯 Direct Solution (First Principles):
   - Break down the core mathematical or grammatical rule step-by-step.
   - Explain the reasoning behind each step clearly and concisely.
   - Format all math using clean LaTeX syntax: $inline$ for inline terms (e.g. $x = 4$, $y = mx + b$) and $$display$$ for major formulas or equations.
2. ⚡ The Desmos 10-Second SpeedHack (for Math topics):
   - Give the EXACT lines to type into Desmos (e.g. Line 1: \`...\`, Line 2: \`...\`).
   - Describe what clickable grey dot, slider, regression (~), or visual feature gives the answer instantly without manual algebra.
3. ⚠️ College Board Trap Analysis:
   - If the student made a mistake or chose a specific option, diagnose precisely WHY that choice was engineered by test makers (e.g. Partial Solver Trap, Sign Flip Trap, False Equivalency, Domain Constraint).
   - If no mistake was made, explain why common distractors are tempting and how to immediately eliminate them.
4. 🧠 Golden Takeaway Rule:
   - Provide a single, memorable, high-yield rule or mnemonic to lock this concept in memory for test day.

Tone & Style:
- Professional, encouraging, academic, and deeply knowledgeable of Digital SAT adaptive test mechanics.
- Use markdown formatting with clear bold headings (###, ####), bullet points, and GitHub-style callouts (> [!TIP], > [!WARNING], > [!IMPORTANT]).
- Keep all explanations strictly in English.`;

    // 1. TRY LIVE GEMINI API (GEMINI 3.8 / 3.6 / 3.5 FLASH) IF KEY AVAILABLE
    if (geminiKey && geminiKey.trim() !== "") {
      const candidateModels = [
        "gemini-3.8-flash",
        "gemini-3.6-flash",
        "gemini-3.5-flash",
        "gemini-3.7-flash",
        "gemini-2.5-flash",
      ];
      
      const promptText = `
Context Information:
- Current SAT Domain: ${topicDomain}
- Question Prompt: ${questionPrompt || "N/A"}
- Available Options: ${Array.isArray(options) ? options.join(" | ") : options || "N/A"}
- Student's Selected Option: ${userChoice || "Not specified"}
- Correct Answer: ${correctChoice || "Not specified"}
- Official Explanation: ${explanationEn || explanationUz || "N/A"}
- Desmos Speedhack: ${desmosTrick || "N/A"}

Student Query: "${userQ || "Why is my answer wrong and how can I solve this in 10 seconds?"}"

Please provide a structured, Socratic, and actionable SAT explanation in English tailored for ${studentName} targeting ${targetScore}+.`;

      for (const model of candidateModels) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    role: "user",
                    parts: [{ text: `${systemPrompt}\n\n${promptText}` }],
                  },
                ],
                generationConfig: {
                  temperature: 0.2,
                  maxOutputTokens: 1500,
                },
              }),
            }
          );

          if (geminiRes.ok) {
            const geminiData = await geminiRes.json();
            const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (generatedText) {
              return NextResponse.json({
                answer: generatedText,
                source: model,
                timestamp: new Date().toISOString(),
              });
            }
          } else {
            const errData = await geminiRes.json().catch(() => ({}));
            console.warn(`Gemini API returned ${geminiRes.status} for model ${model}:`, errData);
          }
        } catch (geminiErr) {
          console.warn(`Live Gemini API call failed for ${model}:`, geminiErr);
        }
      }
    }

    // 2. TRY OPENAI API IF KEY AVAILABLE
    if (openAIKey && openAIKey.trim() !== "") {
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
              {
                role: "user",
                content: `Topic: ${topicDomain}
Question: ${questionPrompt}
Options: ${Array.isArray(options) ? options.join(" | ") : options}
Selected: ${userChoice} | Correct: ${correctChoice}
Explanation: ${explanationEn || explanationUz}
Desmos: ${desmosTrick}
Student Query: "${userQ}"`,
              },
            ],
            temperature: 0.3,
            max_tokens: 1200,
          }),
        });

        if (openAIRes.ok) {
          const openAIData = await openAIRes.json();
          const generatedText = openAIData.choices?.[0]?.message?.content;
          if (generatedText) {
            return NextResponse.json({
              answer: generatedText,
              source: "openai-gpt-4o-mini",
              timestamp: new Date().toISOString(),
            });
          }
        }
      } catch (openAiErr) {
        console.warn("Live OpenAI API call failed, falling back to cognitive engine:", openAiErr);
      }
    }

    // 3. VESPERA HIGH-PRECISION DETERMINISTIC COGNITIVE ENGINE
    const answer = generateCognitiveExplanation({
      questionPrompt,
      userQuestion: userQ,
      topicDomain,
      userChoice,
      correctChoice,
      options,
      explanationUz,
      explanationEn,
      desmosTrick,
      userProfile,
    });

    return NextResponse.json({
      answer,
      source: "vespera-cognitive-engine",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("AI Copilot error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI explanation: " + error.message },
      { status: 500 }
    );
  }
}

// =========================================================================
// COGNITIVE HEURISTIC ENGINE (100% ENGLISH & PERSONALIZED)
// =========================================================================
function generateCognitiveExplanation({
  questionPrompt,
  userQuestion,
  topicDomain,
  userChoice,
  correctChoice,
  options,
  explanationUz,
  explanationEn,
  desmosTrick,
  userProfile,
}: {
  questionPrompt: string;
  userQuestion: string;
  topicDomain: string;
  userChoice?: string | null;
  correctChoice?: string | null;
  options?: any;
  explanationUz?: string | null;
  explanationEn?: string | null;
  desmosTrick?: string | null;
  userProfile?: UserProfileData | null;
}): string {
  const qLower = userQuestion.toLowerCase();
  const promptLower = questionPrompt.toLowerCase();
  const studentName = userProfile?.fullName || "Scholar";
  const targetScore = userProfile?.targetSatScore || 1550;

  // SCENARIO A: Diagnosing why user's selected choice is wrong
  if (userChoice && correctChoice && userChoice.toUpperCase() !== correctChoice.toUpperCase()) {
    const wrong = userChoice.toUpperCase();
    const right = correctChoice.toUpperCase();

    return `### 💡 AI Error Diagnosis: Why Choice [${wrong}] is Wrong & Choice [${right}] is Correct

> [!WARNING]
> **Your Selection:** \`Choice ${wrong}\` ❌  
> **Official Correct Answer:** \`Choice ${right}\` ✅

---

#### 1. 🔍 The College Board Distractor Anatomy (Why ${wrong} was tempting):
College Board psychometricians deliberately engineered choice **${wrong}** around a predictable mistake pattern:
* **The Partial Solver Trap:** You likely executed the first 80% of the algebra correctly and derived an intermediate variable (e.g. solving for $x$). Choice ${wrong} matches that intermediate value! However, the final question prompt asked for an altered expression (such as $2x + 6$, the perimeter, or $\\tan(A)$).
* **Sign Inversion & Parentheses Trap:** A common slip when dividing by a negative number (flipping inequalities) or dropping a negative sign during distribution $-(-a) = +a$.

---

#### 2. 🟢 Step-by-Step Resolution:
${explanationEn || explanationUz || "Apply first-principles reasoning to isolate the target quantity directly."}

---

#### 3. ⚡ 10-Second Desmos Shortcut:
${
  desmosTrick
    ? `**Desmos Speedhack:**\n${desmosTrick}`
    : `1. Split the equation: Type \`y = \\text{LHS}\` on line 1 and \`y = \\text{RHS}\` on line 2.\n2. Click the gray dot at the intersection — the $x$-coordinate is your exact solution without manual calculations.\n3. For functions, inspect vertex and intercepts directly on the graph.`
}

---

#### 4. 🎯 Master Invariant:
> **"Always underline the final line of the prompt before picking your answer: What is the exact target quantity?"**`;
  }

  // SCENARIO B: Greetings
  if (/^(hi|hello|hey|salom|start|help|greetings)\b/i.test(qLower)) {
    const ieltsClause = userProfile?.ieltsScore
      ? ` With your **IELTS ${userProfile.ieltsScore}** baseline, your Reading comprehension is already strong — our top priority is locking in an **800 in Math**.`
      : "";

    return `👋 **Hello ${studentName}! Welcome to your personal Vespera AI Mentor.**

Personalized for your **${targetScore}+** target composite score on the Digital SAT.${ieltsClause}

Here is how I can accelerate your prep:
1. **⚡ 10-Second Desmos Hacks:** Instant graphical shortcuts to bypass lengthy manual algebra.
2. **💡 First-Principles Intuition:** Deep conceptual models that stick without mindless memorization.
3. **🔍 College Board Trap Breakdown:** Why tempting distractor choices fool students and how to spot them.
4. **🎯 Question Dissection:** Paste any problem or ask about the current question on your screen!`;
  }

  // SCENARIO C: Desmos inquiries
  if (
    qLower.includes("desmos") ||
    qLower.includes("graph") ||
    qLower.includes("calculator") ||
    qLower.includes("hack") ||
    qLower.includes("10 second") ||
    qLower.includes("speed")
  ) {
    if (questionPrompt && (promptLower.includes("=") || promptLower.includes("x") || promptLower.includes("f(x)"))) {
      return `⚡ **10-Second Desmos Hack for this Problem:**

1. **Direct Split Entry:** Type the left-hand side as line 1 (\`y = \\text{LHS}\`) and right-hand side as line 2 (\`y = \\text{RHS}\`).
2. **Click the Intersection Dot:** Desmos displays an interactive gray dot at every intersection. The $x$-coordinate is your exact solution!
3. **Vertex & Extreme Points:** Enter quadratic $f(x)$ directly. Desmos automatically marks the peak or valley with coordinates $(h, k)$.
4. **Regression Hack for Systems:** When coordinates are given, create a table in Desmos with \`+\` and type \`y_1 ~ m x_1 + b\` or \`y_1 ~ a x_1^2 + b x_1 + c\` to solve unknown constants in 5 seconds!

${desmosTrick ? `\n💡 **Specific Problem Advice:** ${desmosTrick}` : ""}`;
    }
  }

  // SCENARIO D: General Question Analysis
  if (questionPrompt) {
    return `### 🎯 Question Breakdown:

**Domain:** \`${topicDomain}\`

${explanationEn ? `#### 1. Step-by-Step Logic:\n${explanationEn}` : ""}
${explanationUz ? `\n#### 2. Conceptual Overview:\n${explanationUz}` : ""}
${desmosTrick ? `\n#### 3. ⚡ Desmos Shortcut:\n${desmosTrick}` : ""}

---
💬 **Need clarification?** Ask about any specific step and we will unpack it together!`;
  }

  // SCENARIO E: Default intelligent guidance
  return `💡 **Master Strategy for ${studentName} Targeting ${targetScore}+:**

1. **The 75-Second Rule:** Every Digital SAT problem is engineered for resolution in under 75 seconds. If manual calculation stretches beyond 90 seconds, you are bypassing an intended Desmos shortcut.
2. **Desmos Exploitation:** Systems, quadratics, circle equations, and regressions should almost always be inspected graphically first.
3. **Distractor Spotting:** Always underline the exact quantity sought in the final question sentence.

Paste any problem or question text for immediate interactive dissection!`;
}
