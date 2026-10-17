import { NextResponse } from "next/server";

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
    } = body;

    const userQ = (userQuestion || "").trim();
    const lowerQ = userQ.toLowerCase();
    const isUzbek =
      /[a-z]*['`ʻʼ][a-z]*|bo['`ʻʼ]yicha|qanday|qiling|uchun|bilan|nega|xato|kerak|salom|tushuntir|qadam|bosing|javob/i.test(
        userQ
      ) || (!/[a-z]/.test(userQ) && lowerQ.length > 0) || !userQ;

    // Check for API Keys in environment
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    const openAIKey = process.env.OPENAI_API_KEY;

    let systemPrompt = `You are Vespera SAT AI Mentor, an elite, world-class Digital SAT tutor designed to help Doniyor achieve a 1550+ SAT score (IELTS 7.5, Reading 9.0 background, scaling Math from zero to 800).
Rules:
1. Always be supportive, highly structured, analytical, and laser-focused on College Board SAT test mechanics.
2. If the user speaks Uzbek, respond in fluent, natural Uzbek with accurate SAT terminology. If English, respond in English.
3. When analyzing mistakes, do NOT just recite the formula. Explain:
   - Stage 1 (Trap Analysis): Exactly why the student's chosen choice is tempting, and the exact College Board trap family (e.g. Partial Answer, Sign Flip, Reading Out-of-Scope, Comma Splice).
   - Stage 2 (First-Principles Intuition): A clean, intuitive mental model or real-world analogy.
   - Stage 3 (10-Second Desmos Shortcut): The exact lines to type into the Desmos calculator to bypass manual algebra in 10-15 seconds.
   - Stage 4 (Golden Mnemonic / Invariant): A single memorable rule to prevent repeat errors.
4. Format math expressions in clean LaTeX syntax: $inline$ or $$display$$. Use bolding and clear lists.`;

    // 1. TRY LIVE GEMINI API IF KEY AVAILABLE
    if (geminiKey && geminiKey.trim() !== "") {
      try {
        const promptText = `
Context Information:
- Current SAT Topic / Domain: ${topicDomain}
- Question Prompt: ${questionPrompt || "N/A"}
- Available Options: ${Array.isArray(options) ? options.join(" | ") : options || "N/A"}
- Student's Selected Answer: ${userChoice || "Not specified"}
- Correct Answer: ${correctChoice || "Not specified"}
- Official Explanation (UZ): ${explanationUz || "N/A"}
- Official Explanation (EN): ${explanationEn || "N/A"}
- Desmos Speedhack: ${desmosTrick || "N/A"}

Student's Query: "${userQ || "Nega mening javobim xato bo'ldi va buni qanday to'g'ri yechish kerak?"}"

Please provide a structured, Socratic, and actionable SAT explanation.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
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
                temperature: 0.3,
                maxOutputTokens: 1200,
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
              source: "gemini-1.5-flash",
              timestamp: new Date().toISOString(),
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Live Gemini API call failed, falling back to cognitive heuristics:", geminiErr);
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
                content: `Context: Question: ${questionPrompt}, User Choice: ${userChoice}, Correct: ${correctChoice}, Options: ${options}, Query: ${userQ}`,
              },
            ],
            temperature: 0.3,
          }),
        });

        if (openAIRes.ok) {
          const openAIData = await openAIRes.json();
          const generatedText = openAIData.choices?.[0]?.message?.content;
          if (generatedText) {
            return NextResponse.json({
              answer: generatedText,
              source: "gpt-4o-mini",
              timestamp: new Date().toISOString(),
            });
          }
        }
      } catch (openAiErr) {
        console.warn("OpenAI API call failed, falling back to cognitive engine:", openAiErr);
      }
    }

    // 3. COGNITIVE HEURISTIC ENGINE (100% RELIABLE FALLBACK)
    // Runs when no API key is provided or network/rate-limit occurs.
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
      isUzbek,
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
// COGNITIVE HEURISTIC ENGINE
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
  isUzbek,
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
  isUzbek: boolean;
}): string {
  const qLower = userQuestion.toLowerCase();
  const promptLower = questionPrompt.toLowerCase();

  // SCENARIO A: User is specifically diagnosing why their choice was wrong
  if (userChoice && correctChoice && userChoice.toUpperCase() !== correctChoice.toUpperCase()) {
    const wrong = userChoice.toUpperCase();
    const right = correctChoice.toUpperCase();

    if (isUzbek) {
      return `### 💡 AI Xatolik Diagnostikasi: Nega [${wrong}] xato va to'g'ri javob [${right}]?

> [!WARNING]
> **Siz tanlagan javob:** \`Variant ${wrong}\` ❌  
> **Rasmiy to'g'ri javob:** \`Variant ${right}\` ✅

---

#### 1. 🔍 Nega ${wrong} varianti sizni chalg'itdi (Tuzoq Tahlili)?
College Board tuzuvchilari variantlar orasiga ataylab **chala yechim** yoki **ishora xatosi** bilan chiqadigan sonlarni kiritadi:
* **"Chala Yechim" Tuzog'i:** Ko'pchilik talabalar tenglamani yechib $x$ ning qiymatini topishadi (bu aynan siz tanlagan **${wrong}** variantidagi son bo'lishi mumkin). Biroq savol shartida $x$ emas, balki boshqa ifoda (masalan, $2x + 6$, perimetr, yoki burchak tangensi) so'ralgan bo'ladi!
* **Belgi va Qavs Tuzog'i:** Manfiy ishoraga bo'lishda tengsizlik ishorasi teskarisiga o'zgarishi yoki qavs ochishdagi $-(-a) = +a$ qoidasi e'tibordan chetda qolgan bo'lishi mumkin.

---

#### 2. 🟢 To'g'ri Yechim Mantiqi (Intuitiv Qadamlar):
${explanationUz ? explanationUz : explanationEn || "Savol shartidagi asosiy mantiqiy bog'liqlikni qadam-baqadam tekshiring."}

---

#### 3. ⚡ 10 Soniyalik Desmos Cheat-Code:
${
  desmosTrick
    ? `**Ushbu savol uchun Desmos tezkor hiylasi:**\n${desmosTrick}`
    : `1. Tenglamaning chap va o'ng qismini alohida qatorga kiriting: \`y_1 = \\text{chap qism}\` va \`y_2 = \\text{o'ng qism}\`.\n2. Kulrang kesishish nuqtasiga bosing — $x$ koordinatasi sizga to'g'ridan-to'g'ri yechimni beradi!\n3. Parametrli tenglamalarda **Slider** yarating va to'g'ri keluvchi variantni toping.`
}

---

#### 4. 🎯 Xotirada Saqlash Uchun Oltin Qoida:
> **"Har doim savol oxiridagi oxirgi gapni qayta o'qing: SAT sizdan aynan nimani so'ramoqda?"**`;
    } else {
      return `### 💡 AI Error Diagnosis: Why Choice [${wrong}] is Wrong & Choice [${right}] is Correct

> [!WARNING]
> **Your Selection:** \`Choice ${wrong}\` ❌  
> **Official Correct Answer:** \`Choice ${right}\` ✅

---

#### 1. 🔍 The College Board Distractor Anatomy (Why ${wrong} was chosen):
College Board psychometricians deliberately engineered choice **${wrong}** around a predictable mistake:
* **The Partial Solver Trap:** You likely executed the first 80% of the algebra correctly and derived $x$. Choice ${wrong} matched your intermediate value! However, the final question prompt asked for an altered expression (e.g. $2x + 6$, perimeter, or $\\tan(A)$).
* **Sign Inversion Slip:** In algebraic manipulation, forgetting that division by a negative flips inequality signs, or dropping a negative inside parentheses.

---

#### 2. 🟢 Step-by-Step Resolution:
${explanationEn || explanationUz || "Follow the invariant principles of this topic to reach the definitive answer."}

---

#### 3. ⚡ 10-Second Desmos Shortcut:
${
  desmosTrick
    ? `**Desmos Bypass:**\n${desmosTrick}`
    : `1. Split the equation: Type \`y = \\text{LHS}\` on line 1 and \`y = \\text{RHS}\` on line 2.\n2. Click the gray dot at the intersection — the $x$-coordinate is your exact solution without manual calculations.\n3. For functions, inspect vertex and intercepts directly on the graph.`
}

---

#### 4. 🎯 Master Takeaway:
> **"Always underline the final line of the prompt before selecting your answer: What is the exact target quantity?"**`;
    }
  }

  // SCENARIO B: Greetings
  if (/^(hi|hello|hey|salom|assalomu alaykum|qalaysiz|boshla|start)\b/i.test(qLower)) {
    if (isUzbek) {
      return `👋 **Assalomu alaykum, Doniyor!**

Men sizning shaxsiy **Vespera SAT AI Mentor**ingizman. Sizning **IELTS 7.5 (Reading 9.0)** bazangiz SAT Verbal uchun ajoyib poydevor hisoblanadi. Asosiy maqsadimiz — **Matematikani 0 dan 800 gacha** ko'tarish va Desmos orqali vaqtni 3 barobar tejash.

Mendan quyidagilarni so'rashingiz mumkin:
1. **⚡ 10 soniyalik Desmos Hacklari:** Har qanday tenglama yoki funksiyani qo'lda hisoblamasdan Desmos'da yechish yo'llari.
2. **💡 Intuitiv Tushuntirish:** Formulalarni yodlamasdan, mantiqiy vizual modellar orqali tushunish.
3. **🔍 College Board Tuzoqlari:** Nega chalg'ituvchi variantlar tanlanib qolishi va ulardan qanday saqlanish.
4. **🎯 Joriy Masala Yechimi:** Istalgan savol shartini tashlang, qadamma-qadam tahlil qilamiz!`;
    } else {
      return `👋 **Hello Doniyor! Welcome to Vespera AI Mentor.**

Leveraging your **IELTS 7.5 (Reading 9.0)** foundation, we are targeting a **1550+ composite** with laser focus on scaling **Math from Zero to 800**.

Feel free to ask me anything:
1. **⚡ 10-Second Desmos Hacks:** Instant graphic shortcuts to bypass lengthy manual algebra.
2. **💡 Intuitive Visual Analogies:** Deep conceptual models that stick without mindless memorization.
3. **🔍 College Board Trap Breakdown:** Why tempting distractor choices fool students and how to spot them.
4. **🎯 Question Dissection:** Paste any problem or ask about the current question on your screen!`;
    }
  }

  // SCENARIO C: Desmos inquiries
  if (
    qLower.includes("desmos") ||
    qLower.includes("grafik") ||
    qLower.includes("kalkulyator") ||
    qLower.includes("hack") ||
    qLower.includes("10 second") ||
    qLower.includes("tez yech")
  ) {
    if (questionPrompt && (promptLower.includes("=") || promptLower.includes("x") || promptLower.includes("f(x)"))) {
      if (isUzbek) {
        return `⚡ **Joriy Masala Uchun 10 Soniyalik Desmos Hacki:**

1. **Tenglamani to'g'ridan-to'g'ri kiriting:** Tenglamaning chap va o'ng tomonini alohida qatorga yozing: \`y_1 = \\text{chap tomon}\` va \`y_2 = \\text{o'ng tomon}\`.
2. **Kesishtirish nuqtasiga bosing:** Desmos ikkala grafik kesishtirgan nuqtada kulrang halqa ko'rsatadi. Uning $x$ koordinatasi — sizning to'g'ridan-to'g'ri javobingiz!
3. **Vertex (Cho'qqi) savollarida:** Funksiyani shunchaki $f(x)$ deb kiriting va egri chiziqning eng yuqori yoki eng quyi burilish nuqtasini bosing. Desmos $(h, k)$ koordinatasini darhol chiqaradi.
4. **Slider usuli:** Agar formulada noma'lum parametr ($a$, $b$, $k$) bo'lsa, Desmos *"add slider"* tugmasini taklif qiladi. Uni bosing va parametrlarni moslang!

${desmosTrick ? `\n💡 **Ushbu savol bo'yicha maxsus ko'rsatma:** ${desmosTrick}` : ""}`;
      } else {
        return `⚡ **10-Second Desmos Hack for this Problem:**

1. **Direct Split Entry:** Type the left-hand side as line 1 (\`y = \\text{LHS}\`) and right-hand side as line 2 (\`y = \\text{RHS}\`).
2. **Click the Intersection Dot:** Desmos displays an interactive gray dot at every intersection. The $x$-coordinate is your exact solution!
3. **Vertex & Extreme Points:** Enter quadratic $f(x)$ directly. Desmos automatically marks the peak or valley with coordinates $(h, k)$.
4. **Regression Hack for Systems:** When points are given, create a table in Desmos with \`+\` and type \`y_1 ~ m x_1 + b\` or \`y_1 ~ a x_1^2 + b x_1 + c\` to solve unknown constants instantly!

${desmosTrick ? `\n💡 **Specific Problem Advice:** ${desmosTrick}` : ""}`;
      }
    }
  }

  // SCENARIO D: General Question Analysis
  if (questionPrompt) {
    if (isUzbek) {
      return `### 🎯 Savolning Qadamma-Qadam Tahlili:

**Mavzu / Domen:** \`${topicDomain}\`

${explanationUz ? `#### 1. Mantiqiy Yechim:\n${explanationUz}` : ""}
${explanationEn ? `\n#### 2. Rasmiy SAT Formulasi:\n${explanationEn}` : ""}
${desmosTrick ? `\n#### 3. ⚡ Desmos Hack:\n${desmosTrick}` : ""}

---
💬 **Savolingiz bo'lsa:** Ushbu masalaning qaysi bosqichi tushunarsiz tuyuldi? Qayta boshqacha usulda tushuntirib berishim mumkin!`;
    } else {
      return `### 🎯 Question Breakdown:

**Domain:** \`${topicDomain}\`

${explanationEn ? `#### 1. Step-by-Step Logic:\n${explanationEn}` : ""}
${explanationUz ? `\n#### 2. Conceptual Overview:\n${explanationUz}` : ""}
${desmosTrick ? `\n#### 3. ⚡ Desmos Shortcut:\n${desmosTrick}` : ""}

---
💬 **Need clarification?** Tell me which step feels unclear and we will unpack it together!`;
    }
  }

  // SCENARIO E: Default intelligent guidance
  if (isUzbek) {
    return `💡 **Doniyor uchun SAT Master Maslahati:**

1. **75 Soniyalik Qoida:** Digital SAT dagi har bir masala 1 daqiqa 15 soniyada yechilishi uchun mo'ljallangan. Agar algebraik hisob-kitob 90 soniyadan oshib ketsa, demak Desmos yoki mantiqiy qisqartma yo'li bor.
2. **Desmos'dan foydalanish:** Funksiyalar, tenglamalar sistemasi, burchaklar va statistik jadvallarni har doim Desmos'ga kiritib tekshiring.
3. **Tuzoqlar:** Savol oxiridagi topshiriqni har doim qalam bilan belgilang. $x$ emas, $x + 5$ so'ralgan bo'lishi mumkin!

Istalgan savol matnini bu yerga yozing yoki ekrandagi masalani muhokama qilamiz!`;
  } else {
    return `💡 **Master SAT Strategy for 1550+:**

1. **The 75-Second Rule:** Every Digital SAT problem is engineered for resolution in under 75 seconds. If manual calculation stretches beyond 90 seconds, you are bypassing an intended Desmos shortcut.
2. **Desmos Exploitation:** Systems, quadratics, circle equations, and regressions should almost always be inspected graphically first.
3. **Distractor Spotting:** Always underline the exact quantity sought in the final question sentence.

Paste any problem or question text for immediate interactive dissection!`;
  }
}
