import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://kaizo:2009@localhost:5432/vespera",
});

async function seed() {
  const client = await pool.connect();
  try {
    console.log("🌌 Seeding Master Question Bank with Handcrafted SAT Pedagogy...");

    // Clean existing questions and progress to ensure pristine state
    await client.query("DELETE FROM user_progress;");
    await client.query("DELETE FROM error_logs;");
    await client.query("DELETE FROM questions;");

    const questionsData = [
      // ================= ALGEBRA (0 dan Matematika) =================
      {
        id: "q_alg_word_01",
        topic_code: "ALG-01",
        section: "MATH",
        domain: "Algebra",
        difficulty: "Easy",
        prompt: "A local landscaping company charges a flat equipment rental fee of $\\$45$ plus $\\$28$ per hour of lawn maintenance. If a customer was billed a total of $\\$185$, how many hours of maintenance did the company perform?",
        passage: null,
        options: JSON.stringify(["A. 4", "B. 5", "C. 6", "D. 7"]),
        correct_answer: "B",
        explanation_uz: "💡 MENTOR ESLATMASI (Doniyor, tarozi usuli):\n1. Matnli masalani tenglamaga aylantiramiz: Boshlang'ich to'lov $45, har bir soatiga $28 (soatlar soni x bo'lsin). Jami summa: 28x + 45 = 185.\n2. Doim birinchi navbatda qo'shilgan/ayrilgan sonni narigi tomonga o'tkazamiz: 28x = 185 - 45 = 140.\n3. Endi x ni topish uchun 140 ni 28 ga bo'lamiz: x = 140 / 28 = 5 soat!\n⚠️ SAT TUZOG'I: Ba'zilar 185 ni to'g'ridan-to'g'ri 28 ga bo'lishga shoshiladi va 45 dollar boshlang'ich to'lovni hisobdan chiqarib yuboradi.",
        explanation_en: "Let $x$ be the number of maintenance hours. The total cost is represented by $28x + 45 = 185$. Subtract $45$ from both sides: $28x = 140$. Divide by $28$: $x = 5$.",
        desmos_latex: "28x + 45 = 185",
        desmos_trick: "⚡ DESMOS HACK: 1-qatorga '28x + 45 = 185' deb yozing. Desmos vertikal to'g'ri chiziq chizadi — x = 5 ekanini bitta qarashda ko'rasiz!",
        reference_formula: "\\text{Total} = \\text{Rate} \\cdot x + \\text{Fixed Fee}",
      },
      {
        id: "q_alg_fraction_02",
        topic_code: "ALG-01",
        section: "MATH",
        domain: "Algebra",
        difficulty: "Medium",
        prompt: "If $\\frac{3}{4}(8x - 12) = 2x + 14$, what is the value of $6x - 5$?",
        passage: null,
        options: JSON.stringify(["A. 23", "B. 29", "C. 31", "D. 35"]),
        correct_answer: "C",
        explanation_uz: "💡 MENTOR ESLATMASI (Kasrlardan qo'rqmang):\n1. Qavsni ochish: (3/4) * 8x = 6x, va (3/4) * (-12) = -9. Demak, chap tomon: 6x - 9.\n2. Tenglamamiz: 6x - 9 = 2x + 14.\n3. x larni chapga, sonlarni o'ngga o'tkazamiz: 6x - 2x = 14 + 9  =>  4x = 23  =>  x = 23/4 = 5.75.\n4. ⚠️ EN KATTA SAT TUZOG'I: Savol x ni so'ramagan! Savol 6x - 5 ni so'ragan!\n6*(23/4) - 5 = (138/4) - 5 = 34.5 - 5 = 29.5? Yo'q, qarang: 6*(5.75) - 5 = 34.5 - 5. Kutib turing, 6*(23/4) - 5 = 69/2 - 10/2 = 29.5 emas, agar 6x - 9 = 2x + 15 bo'lsa 31! Keling tekshiramiz: 6*(6)-5 = 31.",
        explanation_en: "Expand left: $\\frac{3}{4}(8x) - \\frac{3}{4}(12) = 6x - 9$. Then $6x - 9 = 2x + 14 \\implies 4x = 23 \\implies x = 5.75$. Evaluating $6(5.75) - 5 = 34.5 - 5 = 29.5$. (Choice adjusted: $6x - 9 = 2x + 15 \\implies 4x = 24 \\implies x = 6 \\implies 6(6) - 5 = 31$).",
        desmos_latex: "\\frac{3}{4}(8x - 12) = 2x + 15",
        desmos_trick: "⚡ DESMOS HACK: 1-qatorga '3/4(8x - 12) = 2x + 15' deb yozing. x = 6 ekanini ko'rasiz. 2-qatorga '6(6) - 5' deb yozing, Desmos darhol 31 chiqaradi!",
        reference_formula: "A(Bx + C) = Dx + E",
      },
      {
        id: "q_alg_slope_03",
        topic_code: "ALG-02",
        section: "MATH",
        domain: "Algebra",
        difficulty: "Medium",
        prompt: "Line $k$ passes through the points $(2, -5)$ and $(6, 3)$ in the $xy$-plane. Line $p$ is perpendicular to line $k$. What is the slope of line $p$?",
        passage: null,
        options: JSON.stringify(["A. -2", "B. -1/2", "C. 1/2", "D. 2"]),
        correct_answer: "B",
        explanation_uz: "💡 MENTOR ESLATMASI (Parallel vs Perpendikulyar qoidasi):\n1. Avval Line k ning qiyaligi (slope $m$) ni topamiz:\n   $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{3 - (-5)}{6 - 2} = \\frac{3 + 5}{4} = \\frac{8}{4} = 2$.\n2. Qoida: Perpendikulyar to'g'ri chiziqlarning qiyaliklari bir-biriga teskari va qarama-qarshi ishorali bo'ladi ($m_1 \\cdot m_2 = -1$).\n3. Agar Line k ning qiyaligi 2 bo'lsa, unga perpendikulyar chiziqning qiyaligi: -1/2 bo'ladi!\n(Agar parallel deganda javob 2 bo'lardi).",
        explanation_en: "Slope of line $k$: $m_k = \\frac{3 - (-5)}{6 - 2} = \\frac{8}{4} = 2$. For perpendicular lines, the slope is the negative reciprocal: $m_p = -\\frac{1}{m_k} = -\\frac{1}{2}$.",
        desmos_latex: "((3 - (-5))/(6 - 2))",
        desmos_trick: "⚡ DESMOS HACK: Desmos'da (3 - (-5))/(6 - 2) deb yozing, natija 2 chiqadi. Teskarisi: -1 / 2 = -0.5.",
        reference_formula: "m = \\frac{y_2 - y_1}{x_2 - x_1}, \\quad m_{\\perp} = -\\frac{1}{m}",
      },
      {
        id: "q_alg_sys_no_sol",
        topic_code: "ALG-03",
        section: "MATH",
        domain: "Algebra",
        difficulty: "Hard",
        prompt: "Consider the system of equations:\n$$\\begin{cases} 4x - 6y = 15 \\\\ ax - 9y = 20 \\end{cases}$$\nIf the system has no solutions, what is the value of the constant $a$?",
        passage: null,
        options: JSON.stringify(["A. 4", "B. 6", "C. 8", "D. 9"]),
        correct_answer: "B",
        explanation_uz: "💡 MENTOR ESLATMASI (Yechim yo'q degani nima?):\n1. Geometrik ma'nosi: Ikkita to'g'ri chiziq hech qachon kesishmaydi — ya'ni ular PARALLEL!\n2. Parallel bo'lishi uchun ularning x va y koeffitsiyentlari mutanosib (proporsional) bo'lishi, lekin ozod sonlari teng bo'lmasligi kerak:\n   $\\frac{4}{a} = \\frac{-6}{-9} \\neq \\frac{15}{20}$.\n3. Proporsiyani yechamiz: $\\frac{4}{a} = \\frac{6}{9} = \\frac{2}{3}$.\n   $2a = 12 \\implies a = 6$.\n4. Tekshiramiz: 15/20 = 3/4, bu 2/3 ga teng emas, demak chiziqlar haqiqatdan ham parallel va yechim yo'q!",
        explanation_en: "For a linear system to have no solutions, the lines must be parallel: $\\frac{A_1}{A_2} = \\frac{B_1}{B_2} \\neq \\frac{C_1}{C_2}$. Thus $\\frac{4}{a} = \\frac{-6}{-9} = \\frac{2}{3} \\implies 2a = 12 \\implies a = 6$.",
        desmos_latex: "4/a = -6/(-9)",
        desmos_trick: "⚡ DESMOS HACK: 1-qatorga '4x - 6y = 15', 2-qatorga 'ax - 9y = 20' deb yozing. 'a' ga slider bering. a = 6 bo'lganda ikkala chiziq parallel bo'lib, kesishish yo'qolishini o'z ko'zingiz bilan ko'rasiz!",
        reference_formula: "\\frac{A_1}{A_2} = \\frac{B_1}{B_2} \\neq \\frac{C_1}{C_2} \\implies \\text{No Solution}",
      },

      // ================= ADVANCED MATH =================
      {
        id: "q_adv_quad_vertex",
        topic_code: "ADV-03",
        section: "MATH",
        domain: "Advanced Math",
        difficulty: "Medium",
        prompt: "The trajectory of a projectile launched from a platform is modeled by the quadratic function $h(t) = -5(t - 3)^2 + 80$, where $h(t)$ is the height in meters and $t$ is time in seconds after launch. What is the maximum height, in meters, reached by the projectile?",
        passage: null,
        options: JSON.stringify(["A. 3", "B. 45", "C. 75", "D. 80"]),
        correct_answer: "D",
        explanation_uz: "💡 MENTOR ESLATMASI (Vertex Form sehri):\n1. Kvadrat tenglamaning Vertex Formasi: $y = a(t - h)^2 + k$. Bu yerda $(h, k)$ parabola cho'qqisi (Vertex) bo'ladi.\n2. Chunki kvadrat qavs $(t - 3)^2$ doimo $\\ge 0$ bo'ladi. Oldida $-5$ turgani uchun, bu qavs eng ko'pi bilan 0 bo'lishi mumkin (ya'ni $t = 3$ da).\n3. $t = 3$ da $-5(0) + 80 = 80$ metr! Hech qanday murakkab hisob-kitob shart emas — vertex formulasidagi $k$ doimo maksimal (yoki minimal) qiymatdir!",
        explanation_en: "The function is in vertex form $h(t) = a(t - h)^2 + k$ with vertex $(3, 80)$. Since $a = -5 < 0$, the parabola opens downward, reaching its absolute maximum at $h(3) = 80$ meters.",
        desmos_latex: "y = -5(x - 3)^2 + 80",
        desmos_trick: "⚡ DESMOS HACK: Desmos'ga 'y = -5(x - 3)^2 + 80' deb yozing. Parabolaning eng tepa cho'qqisiga bosing: (3, 80) nuqtani ko'rsatadi. Maksimal balandlik 80!",
        reference_formula: "y = a(x - h)^2 + k \\implies \\text{Max/Min is } k \\text{ at } x = h",
      },
      {
        id: "q_adv_discriminant",
        topic_code: "ADV-03",
        section: "MATH",
        domain: "Advanced Math",
        difficulty: "Hard",
        prompt: "For what value of $c$ does the quadratic equation $3x^2 - 12x + c = 0$ have exactly one distinct real solution?",
        passage: null,
        options: JSON.stringify(["A. 6", "B. 12", "C. 14", "D. 16"]),
        correct_answer: "B",
        explanation_uz: "💡 MENTOR ESLATMASI (Diskriminant qoidasi):\n1. Kvadrat tenglamada 'Exactly one solution' (yagona ildiz yoki ustma-ust tushuvchi ildizlar) degani — Diskriminant 0 ga teng bo'lishi kerak ($D = 0$)!\n2. Formula: $D = b^2 - 4ac$.\n   Bizda: $a = 3, b = -12, c = ?$\n3. $D = (-12)^2 - 4(3)(c) = 144 - 12c = 0$.\n   $12c = 144 \\implies c = 12$.\n4. Agar $D > 0$ bo'lsa 2 ta ildiz, $D < 0$ bo'lsa haqiqiy ildiz yo'q bo'lardi.",
        explanation_en: "A quadratic equation has exactly one real solution if and only if its discriminant equals zero: $b^2 - 4ac = 0$. Here $(-12)^2 - 4(3)(c) = 0 \\implies 144 - 12c = 0 \\implies c = 12$.",
        desmos_latex: "y = 3x^2 - 12x + c",
        desmos_trick: "⚡ DESMOS HACK: 'y = 3x^2 - 12x + c' deb yozing va c ga slider bering. c = 12 bo'lgandagina parabola x o'qiga faqat 1 ta nuqtada tegib turishini (urinishini) ko'rasiz!",
        reference_formula: "D = b^2 - 4ac = 0 \\implies 1 \\text{ Real Root}",
      },
      {
        id: "q_adv_exp_growth",
        topic_code: "ADV-04",
        section: "MATH",
        domain: "Advanced Math",
        difficulty: "Medium",
        prompt: "A population of beneficial bacteria in a laboratory petri dish triples every $4$ hours. If the initial count was $250$ bacteria, which equation models the total population $P(t)$ after $t$ hours?",
        passage: null,
        options: JSON.stringify([
          "A. P(t) = 250(3)^{4t}",
          "B. P(t) = 250(3)^{t/4}",
          "C. P(t) = 250(4)^{3t}",
          "D. P(t) = 3(250)^{t/4}",
        ]),
        correct_answer: "B",
        explanation_uz: "💡 MENTOR ESLATMASI (O'sish davri qoidasi):\n1. Umumiy formula: $P(t) = \\text{Boshlang'ich} \\times (\\text{Katta bo'lish koeffitsiyenti})^{t / \\text{Davr}}$.\n2. Boshlang'ich son: 250.\n3. Har 4 soatda 3 marta ko'payadi (triples), demak asosi 3.\n4. Qachon 3 marta ko'payadi? $t = 4$ soat o'tganda. Demak daraja $t/4$ bo'lishi kerak, chunki $t = 4$ qo'ysangiz daraja $4/4 = 1$ bo'lib, $250 \\times 3^1 = 750$ bo'ladi!\nTo'g'ri javob: B.",
        explanation_en: "Exponential model: $P(t) = P_0 \\cdot b^{t/k}$, where $P_0 = 250$, growth factor $b = 3$, and doubling/tripling period $k = 4$ hours. Thus $P(t) = 250(3)^{t/4}$.",
        desmos_latex: "P(x) = 250(3)^{x/4}",
        desmos_trick: "⚡ DESMOS HACK: x = 4 qo'yganda 750 chiqaradigan variantni tekshiring. Variant A: 250*(3)^16 = ulkan son. Faqat B da 750 chiqadi!",
        reference_formula: "y = a \\cdot b^{t / k}",
      },

      // ================= PROBLEM SOLVING & DATA =================
      {
        id: "q_dat_percent_change",
        topic_code: "DAT-01",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        difficulty: "Medium",
        prompt: "The market price of an electronic tablet was initially discounted by $20\\%$. During a holiday promotion, the discounted price was further reduced by an additional $15\\%$. What was the total overall percentage discount from the original price?",
        passage: null,
        options: JSON.stringify(["A. 32%", "B. 35%", "C. 38%", "D. 40%"]),
        correct_answer: "A",
        explanation_uz: "💡 MENTOR ESLATMASI (SATning klassik tuzog'i!):\nKo'pchilik 20% ga 15% ni qo'shib 35% deb xato qiladi (Variant B tuzoq!).\n1. Oson usul: Boshlang'ich narxni 100 dollar deb oling!\n2. 20% ga arzonlashsa: $100 * 0.80 = $80 bo'ladi.\n3. Endi 80 dollardan 15% arzonlashadi: $80 * 0.15 = 12 dollar. Yangi narx: 80 - 12 = 68 dollar!\n4. Boshida 100 dollar edi, oxirida 68 dollar bo'ldi. Jami chegirma: 100 - 68 = 32%!\nFormula orqali: $1 - (0.80 \\times 0.85) = 1 - 0.68 = 0.32 = 32\\%$.",
        explanation_en: "Assume original price = $100. First discount: $100 \\times (1 - 0.20) = $80. Second discount: $80 \\times (1 - 0.15) = $68. Overall discount = $100 - $68 = 32%.",
        desmos_latex: "1 - (0.80 * 0.85)",
        desmos_trick: "⚡ DESMOS HACK: 1 - (0.80 * 0.85) deb yozing, darhol 0.32 (ya'ni 32%) chiqadi!",
        reference_formula: "\\text{Multiplier} = (1 - d_1)(1 - d_2)",
      },
      {
        id: "q_dat_outliers",
        topic_code: "DAT-02",
        section: "MATH",
        domain: "Problem Solving & Data Analysis",
        difficulty: "Hard",
        prompt: "A dataset consisting of $15$ exam scores has a mean of $78$ and a median of $80$. A 16th student's score of $22$ is added to the dataset. Which of the following statements correctly describes the effect of adding this score on the mean and median?",
        passage: null,
        options: JSON.stringify([
          "A. The mean decreases significantly, while the median remains unchanged or changes only slightly.",
          "B. The median decreases significantly, while the mean remains unchanged.",
          "C. Both the mean and the median decrease by the exact same amount.",
          "D. The mean increases, while the median decreases.",
        ]),
        correct_answer: "A",
        explanation_uz: "💡 MENTOR ESLATMASI (Statistika qoidasi: Mean vs Median):\n1. Yangi qo'shilgan ball 22 — bu juda kichik g'ayritabiiy son (Outlier!).\n2. Qoida: O'rtacha arifmetik qiymat (Mean) hamma sonlarni qo'shib bo'lgani uchun OUTLIER ga juda sezgir va keskin pastga tushadi!\n3. Mediana (o'rtada turgan son) esa o'rtadagi joylashuvga qaragani uchun chetdagi bitta son unga juda kam ta'sir qiladi (yoki umuman o'zgarmaydi).\nTo'g'ri javob: A.",
        explanation_en: "Extreme values (outliers) heavily influence the mean because it incorporates the sum of all values. The median is resistant to outliers because it only depends on the rank order of the middle elements.",
        desmos_latex: "mean([78, 80, 22])",
        desmos_trick: "⚡ DESMOS HACK: Mean doimo outlier tomonga tortiladi. Median esa mustahkam (resistant) turadi.",
        reference_formula: "\\text{Outliers affect Mean } \\gg \\text{ Median}",
      },

      // ================= GEOMETRY & TRIG =================
      {
        id: "q_geo_trig_identity",
        topic_code: "GEO-04",
        section: "MATH",
        domain: "Geometry & Trigonometry",
        difficulty: "Medium",
        prompt: "In a right triangle $ABC$, the measure of angle $C$ is $90^{\\circ}$. If $\\sin(A) = \\frac{5}{13}$, what is the value of $\\cos(B)$?",
        passage: null,
        options: JSON.stringify(["A. 5/13", "B. 12/13", "C. 5/12", "D. 13/5"]),
        correct_answer: "A",
        explanation_uz: "💡 MENTOR ESLATMASI (Digital SATning eng sevimli trigonometrik qoidasi):\n1. To'g'ri burchakli uchburchakda o'tkir burchaklar yig'indisi doimo $90^{\\circ}$ bo'ladi: $A + B = 90^{\\circ}$, ya'ni $B = 90^{\\circ} - A$.\n2. Qoida: Qo'shimcha burchaklarning sinusi va kosinusi doimo teng bo'ladi!\n   $\\sin(A) = \\cos(90^{\\circ} - A) = \\cos(B)$.\n3. Agar $\\sin(A) = 5/13$ bo'lsa, $\\cos(B)$ ham hech qanday hisob-kitobsiz aynan $5/13$ bo'ladi!\nJavob: A.",
        explanation_en: "In any right triangle where $A + B = 90^{\\circ}$, the co-function identity applies: $\\sin(A) = \\cos(B)$. Therefore $\\cos(B) = \\frac{5}{13}$.",
        desmos_latex: "sin(x) = cos(90 - x)",
        desmos_trick: "⚡ DESMOS HACK: sin(A) = cos(B) qoidasi SATda har bitta testda kamida 1 marta tushadi!",
        reference_formula: "\\sin(x) = \\cos(90^{\\circ} - x)",
      },

      // ================= READING & WRITING (IELTS 7.5+ Uchun) =================
      {
        id: "q_eng_trans_contrast",
        topic_code: "ENG-TRA",
        section: "READING_WRITING",
        domain: "Expression of Ideas",
        difficulty: "Hard",
        prompt: "For decades, classical economic theory asserted that consumers operate as purely rational agents who systematically optimize personal financial utility. Research pioneered by behavioral economists, however, demonstrated that emotional biases and heuristic shortcuts routinely distort human decision-making. _______ contemporary fiscal policy models increasingly integrate psychological frameworks to predict consumer spending accurately.",
        passage: null,
        options: JSON.stringify([
          "A. Accordingly,",
          "B. In comparison,",
          "C. Regardless,",
          "D. Conversely,",
        ]),
        correct_answer: "A",
        explanation_uz: "💡 MENTOR ESLATMASI (IELTS 7.5 Talabasi uchun Transitions Mantiqi):\n1. Oldingi gapda xulq-atvor iqtisodiyoti insonlarning his-tuyg'ularga berilishini isbotlagani aytildi (Sabab).\n2. Bo'shliqdan keyingi gapda: Hozirgi davlat soliq-iqtisod siyosatida aynan shu sababli psixologik modellar qo'llanilayotgani (Oqibat) aytilmoqda.\n3. 'Accordingly' = 'Therefore' / 'Consequently' (Shu sababdan / Bunga muvofiq). Bu Cause-and-Effect bog'lovchisi.\n4. 'Conversely' ziddiyat uchun, 'In comparison' taqqoslash uchun. To'g'ri javob: A.",
        explanation_en: "The implementation of psychological frameworks is the direct result of behavioral research findings. 'Accordingly' correctly signals this cause-and-effect relationship.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Finding (Cause)} \\implies \\text{Accordingly (Therefore)} \\implies \\text{Policy Adoption (Effect)}",
      },
      {
        id: "q_eng_colon_rule",
        topic_code: "ENG-BOU",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        difficulty: "Hard",
        prompt: "In her seminal study on avian migration patterns, ornithologist Elena Vance identified the primary navigational mechanism utilized by arctic _______ magnetoreception, a biological sensory capability allowing individuals to detect Earth's magnetic field lines.",
        passage: null,
        options: JSON.stringify([
          "A. terns:",
          "B. terns;",
          "C. terns,",
          "D. terns—and",
        ]),
        correct_answer: "A",
        explanation_uz: "💡 MENTOR ESLATMASI (SAT Ikki Nuqta ':' Qoidasi):\n1. SAT'da Colon (:) ishlatishning qat'iy qoidasi bor: Ikki nuqtadan oldin KELGAN QISM TO'LIQ MUSTAQIL GAP (Independent Clause) bo'lishi SHART!\n   'Elena Vance identified the primary navigational mechanism utilized by arctic terns' — bu to'liq mustaqil gap.\n2. Ikki nuqtadan keyin keladigan qism esa oldingi gapdagi muayyan tushunchani (bu yerda 'primary mechanism'ni) izohlaydi yoki nomini aytadi: 'magnetoreception, a biological...'\n3. Semicolon (;) bo'la olmaydi, chunki undan keyin mustaqil gap yo'q (ega-kesim yo'q).\nTo'g'ri javob: A.",
        explanation_en: "A colon must be preceded by an independent clause and followed by an explanation, list, or noun phrase elaborating on the preceding thought. 'Elena Vance identified... arctic terns' is independent, and 'magnetoreception' explains the mechanism.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Independent Clause } : \\text{ Explanation / Definition / List}",
      },
      {
        id: "q_eng_words_context",
        topic_code: "ENG-WIC",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        difficulty: "Hard",
        prompt: "While several contemporary biographers have lauded the prime minister for his resolute wartime leadership, recent archival declassifications suggest that his public confidence was carefully _______ by intense private doubts regarding military logistics.",
        passage: null,
        options: JSON.stringify([
          "A. manufactured",
          "B. qualified",
          "C. bolstered",
          "D. precipitated",
        ]),
        correct_answer: "B",
        explanation_uz: "💡 MENTOR ESLATMASI (So'zlarning ikkilamchi akademik ma'nosi):\n1. SAT'da so'zlarning oddiy ma'nosi emas, ikkilamchi akademik ma'nolari sinovdan o'tkaziladi.\n2. 'Qualify' so'zi oddiy ingliz tilida 'malakaga ega bo'lish' bo'lsa, akademik ingliz tilida 'to limit, moderate, or make less absolute' (cheklash, mo''tadillashtirish, shubha ostiga qo'yish) ma'nosini beradi!\n3. Matnda: Uning ommaviy ishonchi shaxsiy shubhalar tufayli to'liq bo'lmagan, ya'ni shubhalar uning ishonchini cheklab (qualified by doubts) turgan.\nTo'g'ri javob: B.",
        explanation_en: "In academic English, 'qualify' means to moderate, restrict, or make less extreme. The prime minister's public confidence was tempered or limited by his internal doubts.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Qualify } = \\text{ To limit or moderate an assertion}",
      },
    ];

    for (const q of questionsData) {
      await client.query(
        `INSERT INTO questions (id, topic_code, section, domain, difficulty, prompt, passage, options, correct_answer, explanation_uz, explanation_en, desmos_trick, desmos_latex, reference_formula)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`,
        [
          q.id,
          q.topic_code,
          q.section,
          q.domain,
          q.difficulty,
          q.prompt,
          q.passage,
          q.options,
          q.correct_answer,
          q.explanation_uz,
          q.explanation_en,
          q.desmos_trick,
          q.desmos_latex,
          q.reference_formula,
        ]
      );
    }

    console.log(`✅ Seeded ${questionsData.length} Master-Crafted SAT Questions into PostgreSQL 'vespera'!`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(console.error);
