import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questionPrompt, userQuestion, topicDomain, currentExplanation } = body;

    const userQ = (userQuestion || "").trim();
    const lowerQ = userQ.toLowerCase();
    const isUzbek = /[a-z]*['`ʻʼ][a-z]*|bo['`ʻʼ]yicha|qanday|qiling|uchun|bilan|nega|xato|kerak|salom|tushuntir|qadam|bosing/i.test(userQ) || (!/[a-z]/.test(userQ) && lowerQ.length > 0);

    let answer = "";

    // 1. GREETINGS & INTRODUCTIONS
    if (/^(hi|hello|hey|salom|assalomu alaykum|qalaysiz|start|boshla)\b/i.test(lowerQ) && lowerQ.length < 25) {
      if (isUzbek) {
        answer = `👋 **Assalomu alaykum, Doniyor!**

Men sizning shaxsiy **Vespera SAT AI Mentor**ingizman. Sizning **IELTS 7.5 (Reading 9.0)** bazangiz SAT Verbal uchun ajoyib poydevor hisoblanadi. Asosiy maqsadimiz — **Matematikani 0 dan 800 gacha** ko'tarish va Desmos orqali vaqtni 3 barobar tejash.

Mendan quyidagilarni so'rashingiz mumkin:
1. **⚡ 10 soniyalik Desmos Hacklari:** Har qanday tenglama yoki funksiyani qo'lda hisoblamasdan Desmos'da yechish yo'llari.
2. **💡 Intuitiv Tushuntirish:** Formulalarni yodlamasdan, mantiqiy vizual modellar orqali tushunish.
3. **🔍 College Board Tuzoqlari:** Nega chalg'ituvchi variantlar tanlanib qolishi va ulardan qanday saqlanish.
4. **🎯 Joriy Masala Yechimi:** Istalgan savol shartini tashlang, qadamma-qadam tahlil qilamiz!`;
      } else {
        answer = `👋 **Hello Doniyor! Welcome to Vespera AI Mentor.**

Leveraging your **IELTS 7.5 (Reading 9.0)** foundation, we are targeting a **1550+ composite** with laser focus on scaling **Math from Zero to 800**.

Feel free to ask me anything:
1. **⚡ 10-Second Desmos Hacks:** Instant graphic shortcuts to bypass lengthy manual algebra.
2. **💡 Intuitive Visual Analogies:** Deep conceptual models that stick without mindless memorization.
3. **🔍 College Board Trap Breakdown:** Why tempting distractor choices fool students and how to spot them.
4. **🎯 Question Dissection:** Paste any problem or ask about the current question on your screen!`;
      }
    }

    // 2. DESMOS SHORTCUTS & HACKS
    else if (lowerQ.includes("desmos") || lowerQ.includes("grafik") || lowerQ.includes("calculator") || lowerQ.includes("kalkulyator") || lowerQ.includes("hack") || lowerQ.includes("10 second") || lowerQ.includes("tez yech")) {
      if (questionPrompt && (questionPrompt.includes("=") || questionPrompt.includes("x"))) {
        // Context-aware Desmos hack
        if (isUzbek) {
          answer = `⚡ **Joriy Masala Uchun 10 Soniyalik Desmos Hacki:**

1. **Tenglamani to'g'ridan-to'g'ri kiriting:** Tenglamaning chap va o'ng tomonini alohida qatorga yozing: \`y_1 = \\text{chap tomon}\` va \`y_2 = \\text{o'ng tomon}\`.
2. **Kesishtirish nuqtasiga bosing:** Desmos ikkala grafik kesishtirgan nuqtada kulrang halqa ko'rsatadi. Uning $x$ koordinatasi — sizning to'g'ridan-to'g'ri javobingiz!
3. **Vertex (Cho'qqi) savollarida:** Funksiyani shunchaki $f(x)$ deb kiriting va egri chiziqning eng yuqori yoki eng quyi burilish nuqtasini bosing. Desmos $(h, k)$ koordinatasini darhol chiqaradi.
4. **Slider usuli:** Agar formulada noma'lum parametr ($a$, $b$, $k$) bo'lsa, Desmos *"add slider"* tugmasini taklif qiladi. Uni bosing va parametrlarni moslang!`;
        } else {
          answer = `⚡ **10-Second Desmos Hack for this Problem:**

1. **Direct Split Entry:** Type the left-hand side as line 1 (\`y = \\text{LHS}\`) and right-hand side as line 2 (\`y = \\text{RHS}\`).
2. **Click the Intersection Dot:** Desmos displays an interactive gray dot at every intersection. The $x$-coordinate is your exact solution!
3. **Vertex & Extreme Points:** Enter quadratic $f(x)$ directly. Desmos automatically marks the peak or valley with coordinates $(h, k)$. Maximum/minimum value is always $k$.
4. **Regression Hack for Systems:** When points are given, create a table in Desmos with \`+\` and type \`y_1 ~ m x_1 + b\` or \`y_1 ~ a x_1^2 + b x_1 + c\` to solve unknown constants instantly!`;
        }
      } else {
        if (isUzbek) {
          answer = `⚡ **Digital SAT Uchun Eng Kuchli 4 ta Desmos Hacki:**

1. **Tenglamalar tizimi (Systems of Equations):**
   Ikkala tenglamani ham o'zgartirmasdan Desmos'ga kiriting (masalan, $3x - 2y = 12$ va $y = 2x - 5$). Kesishtirish nuqtasiga bosing — $(x, y)$ darhol chiqadi.
2. **Tenglamaning yechimlari soni (Number of Solutions):**
   - Agar chiziqlar parallel bo'lsa $\\rightarrow$ **No solution** ($0$ ta yechim).
   - Agar bitta nuqtada kesishsa $\\rightarrow$ **Exactly 1 solution** ($1$ ta yechim).
   - Agar ustma-ust tushsa $\\rightarrow$ **Infinitely many solutions** (Cheksiz yechim).
3. **Regression Hack (\`~\` belgisi):**
   Agar jadval berilgan bo'lsa, Desmos'da jadval oching ($x_1, y_1$) va pastki qatorga \`y_1 ~ m x_1 + b\` yozing. Desmos $m$ (qiyalik) va $b$ ($y$-kesma) ni $0.001$ soniyada hisoblab beradi!
4. **Noma'lum koeffitsiyentlar (Slider):**
   Variantlardagi sonlarni birma-bir hisoblab o'tirmang — slider yarating va grafik berilgan shartga to'g'ri kelguncha suring!`;
        } else {
          answer = `⚡ **Top 4 Digital SAT Desmos Super-Hacks:**

1. **System of Equations Intersection:**
   Never do manual substitution or elimination. Type both equations directly into Desmos as given (e.g. $3x - 2y = 12$ and $y = 2x - 5$). Click the gray intersection dot to read $(x, y)$ immediately.
2. **Number of Solutions Visualizer:**
   - Parallel lines $\\rightarrow$ **No solution** (Slopes equal, y-intercepts different).
   - Single intersection point $\\rightarrow$ **Exactly 1 solution**.
   - Coinciding overlapping lines $\\rightarrow$ **Infinitely many solutions**.
3. **Table Regression Hack (\`~\` tilde):**
   Add a table with given points $(x_1, y_1)$, then type \`y_1 ~ m x_1 + b\` (linear) or \`y_1 ~ a(x_1 - h)^2 + k\` (vertex). Desmos solves all parameters instantly with $r^2 = 1$.
4. **Slider Matching:**
   Type the equation with a constant $k$ and activate the slider. Drag $k$ until the curve passes through the required coordinate!`;
        }
      }
    }

    // 3. TRAP ANALYSIS & WHY WRONG
    else if (lowerQ.includes("trap") || lowerQ.includes("tuzoq") || lowerQ.includes("nega") || lowerQ.includes("xato") || lowerQ.includes("why") || lowerQ.includes("wrong")) {
      if (isUzbek) {
        answer = `🔍 **College Board SAT Tuzoqlari Tahlili:**

SAT tuzuvchilari variantlar orasiga ataylab quyidagi 3 xil chalg'ituvchini qo'shishadi:

1. **"Chala Yechim" Tuzog'i (Partial Answer Trap):**
   Talaba $x$ ni to'g'ri topadi (masalan $x = 4$). Variantlar orasida $4$ turadi! Lekin savol oxirida $2x + 3$ yoki $x - 7$ so'ralgan bo'ladi. Har doim savol oxiridagi oxirgi gapni qayta o'qing!
2. **"Ishora va Qavs" Tuzog'i (Sign Flip Trap):**
   Tengsizlikda manfiy songa bo'lganda belgi o'zgarishi ($< \\rightarrow >$), yoki $-(x - 3) = -x + 3$ bo'lishi kerak bo'lgan joyda $-x - 3$ deb yuborish.
3. **Verbal Tuzog'i (Plausible but Unmentioned):**
   Variantdagi gap hayotiy haqiqat bo'lishi mumkin, lekin matnda (passage) unga to'g'ridan-to'g'ri dalil yo'q. Faqat matnda yozilgan qat'iy faktga ishoning!`;
      } else {
        answer = `🔍 **College Board Distractor Anatomy:**

College Board psychometricians deliberately design the 3 incorrect options around predictable student errors:

1. **The Partial Solver Trap:**
   You execute 90% of the algebra correctly and find $x = 4$. Choice A proudly says $4$. But the final question prompt asked for $3x - 5$! Always underline the actual target variable before bubbling.
2. **The Sign & Inequality Trap:**
   Forgetting that dividing or multiplying by a negative number flips the inequality symbol ($a < b \\implies -a > -b$).
3. **Verbal Out-of-Scope Trap:**
   An answer choice that sounds highly sophisticated and scientifically true in real life, but is NOT explicitly corroborated by the passage lines. On SAT Reading, 100% of the answer must be proven by passage text.`;
      }
    }

    // 4. INTUITIVE ANALOGIES & MENTAL MODELS
    else if (lowerQ.includes("analogy") || lowerQ.includes("o'xshatish") || lowerQ.includes("tushuntir") || lowerQ.includes("intuition") || lowerQ.includes("noldan") || lowerQ.includes("concept")) {
      if (isUzbek) {
        answer = `💡 **Doniyor uchun Intuitiv Mantiqiy Model:**

Matematika bu quruq formulalar to'plami emas, balki oddiy mantiq:

1. **"Tarozi Qoidasi" (Algebra Tenglamalari):**
   Tenglama ($=$) bu ikkala tomoni muvozanatda turgan palla tarozi. Chap pallaga nima qilsangiz ($+5$, $\\times 2$, $\\sqrt{}$), o'ng pallaga ham xuddi shuni qilishingiz shart. Muvozanat hech qachon buzilmasligi kerak!
2. **"Quti Modeli" (O'zgaruvchi $x$):**
   $x$ — bu ichida son yashiringan quti. Agar $3x + 4 = 19$ bo'lsa, demak 3 ta quti va 4 dona tanga jami 19 ga teng. 4 tangani olib tashlasangiz, 3 ta quti 15 bo'ladi. Har bir qutida 5 bor ($x = 5$)!
3. **Qiyalik (Slope $m$ = $\\frac{\\Delta y}{\\Delta x}$):**
   Bu shunchaki tog'ga chiqish tikligi. Har $1$ qadam o'ngga yursangiz, necha metr tepaga ko'tarilasiz? Agar $m = 3$ bo'lsa, har bir gorizontal qadamda 3 barobar balandlaysiz.`;
      } else {
        answer = `💡 **Intuitive Mental Model for High-Scorers:**

Rather than memorizing abstract algebraic steps, use these visual analogies:

1. **The Two-Pan Balance (Equations):**
   An equal sign ($=$) is an antique balance scale. Whatever operation you execute on the left pan ($+7$, $\\div 3$, squaring), you must mirror identically on the right pan to preserve equilibrium.
2. **The Mystery Box Metaphor ($x$):**
   A variable $x$ is simply an opaque box containing an unknown number of coins. If $4x + 6 = 26$, removing the 6 free coins leaves $4$ identical boxes equal to $20$ coins. Each box holds $5$ coins ($x = 5$).
3. **Slope as Vertical Return ($m = \\frac{\\Delta y}{\\Delta x}$):**
   Slope is simply the staircase steepness: how many feet do you ascend vertically for every 1 step you take horizontally?`;
      }
    }

    // 5. READING & WRITING (VERBAL) GUIDANCE
    else if (lowerQ.includes("verbal") || lowerQ.includes("reading") || lowerQ.includes("writing") || lowerQ.includes("transition") || lowerQ.includes("boundary") || lowerQ.includes("comma") || lowerQ.includes("ielts")) {
      if (isUzbek) {
        answer = `📖 **SAT Reading & Writing: 780+ Ballik Master-Strategiya:**

Sizning **IELTS Reading 9.0** darajangiz SAT matnlarini oson tahlil qilish imkonini beradi. Biroq SAT o'ziga xos 3 ta qoidaga ega:

1. **Transitions (Bog'lovchilar) — 3 ta Asosiy Oila:**
   - **Davomiylik (Continuance):** *Furthermore, In addition, Specifically, For instance* (Fikrni kuchaytiradi).
   - **Zidlik (Contrast):** *However, Nevertheless, In contrast, Nonetheless* (Yo'nalishni 180° buradi).
   - **Natija (Cause/Effect):** *Therefore, Consequently, As a result, Thus* (Mantiqiy xulosa).
2. **Boundaries (Gap chegaralari) — Qat'iy Qoida:**
   Mustaqil gap (Independent Clause) bilan mustaqil gapni shunchaki vergul bilan ulab bo'lmaydi (*Comma Splice* xatosi)! Faqat:
   - Nuqta (\`.\`)
   - Nuqtali vergul (\`;\`)
   - Vergul + FANBOYS (*For, And, Nor, But, Or, Yet, So*)
3. **Rhetorical Synthesis (Notes savollari):**
   Butun matnni o'qimang! Savol oxiridagi topshiriqni toping (masalan, *"wants to emphasize the contrast between..."*). Variantlar orasidan faqat shu shartni bajargan bittasini tanlang!`;
      } else {
        answer = `📖 **SAT Reading & Writing: Strategy for IELTS 9.0 Readers:**

With your top-tier vocabulary and comprehension, target **780+** by mastering College Board's mechanical grammar constraints:

1. **Transition Word Categories:**
   - **Continuance / Elaboration:** *Furthermore, Additionally, Specifically, For example* (Same trajectory).
   - **Contrast / Reversal:** *However, Conversely, Nevertheless, In contrast* (180° direction change).
   - **Causation / Consequence:** *Therefore, Consequently, Accordingly, Thus* (Direct causal payoff).
2. **Sentence Boundary Axiom:**
   Never link two independent clauses with only a comma (*Comma Splice*). Valid joins:
   - Period: \`[IC]. [IC]\`
   - Semicolon: \`[IC]; [IC]\`
   - Comma + FANBOYS: \`[IC], and [IC]\`
   - Colon: \`[IC]: [Explanation/List]\`
3. **Rhetorical Synthesis (Student Notes):**
   Ignore 80% of the bulleted notes! Jump directly to the final sentence asking for the student's goal (e.g. *"The student wants to introduce the discovery to an audience unfamiliar with..."*). Select the single choice directly addressing that objective.`;
      }
    }

    // 6. DEFAULT INTELLIGENT SAT RESPONSE
    else {
      if (isUzbek) {
        answer = `💡 **Doniyor uchun SAT Tahlili va Maslahat:**

Siz bergan savol bo'yicha:
1. **Asosiy Qonun:** SAT imtihonida har bir savol 1 daqiqa 15 soniyada yechilishi uchun mo'ljallangan. Agar algebraik yechim 2 daqiqadan oshsa, demak siz qisqaroq mantiqiy yo'lni yoki **Desmos** imkoniyatini o'tkazib yubordingiz.
2. **Sonlar bilan Sinash (Plugging In):** Murakkab algebraik ifodalarda $x = 100$ yoki $x = 2$ qo'yib variantlarni tekshirish ko'pincha qo'lda yechishdan ancha xavfsizroqdir.
3. **Desmos'ga yuklash:** Agar bu funksiya yoki tenglama bo'lsa, darhol ekrandagi Desmos oynasini oching va grafik koordinatalarini tekshiring!

Qo'shimcha savolingiz bo'lsa yoki savoldagi aniq formulani tushunish kerak bo'lsa, bemalol yozing!`;
      } else {
        answer = `💡 **Expert SAT Solution Guidance:**

Regarding your query:
1. **The 75-Second Rule:** Every SAT problem is engineered for resolution in under 75 seconds. If manual algebra exceeds 90 seconds, a high-speed shortcut or Desmos visualization was intended by the test designers.
2. **Back-solving & Smart Numbers:** When algebraic manipulation looks daunting, test clean numbers ($x = 2$ or $x = 100$) into the question and answer choices.
3. **Desmos Rapid Validation:** Use the interactive Desmos panel to plot expressions and read intercepts, maximums, and intersection points immediately.

Feel free to paste the exact equation or question text for step-by-step breakdown!`;
      }
    }

    return NextResponse.json({
      answer,
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
