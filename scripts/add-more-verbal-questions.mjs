import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://kaizo:2009@localhost:5432/vespera",
});

async function addVerbal() {
  const client = await pool.connect();
  try {
    const extraQuestions = [
      {
        id: "q_eng_cid_02",
        topic_code: "ENG-CID",
        section: "READING_WRITING",
        domain: "Information and Ideas",
        difficulty: "Hard",
        prompt: "Which choice best describes the main idea of the passage?",
        passage: "Prior to the widespread adoption of mechanical HVAC systems, early twentieth-century pavilion hospitals were architecturally designed with tall windows, lofty ceilings, and open cross-ventilating corridors to maximize the continuous exchange of outdoor air. Epidemiological retrospectives reveal that this natural airflow significantly reduced nosocomial bacterial transmission rates among recuperating patients. Rather than viewing historical architecture merely through aesthetic lenses, contemporary biomedical engineers are now re-evaluating passive aerodynamic ventilation to reduce energy consumption in modern clinical wards.",
        options: JSON.stringify([
          "A. Early twentieth-century hospital architecture inadvertently accelerated bacterial infection rates due to temperature fluctuations.",
          "B. Historical passive hospital ventilation effectively curbed infection rates, inspiring modern engineers to reconsider natural airflow designs.",
          "C. Mechanical HVAC systems have proved universally superior to all historical architectural air filtration methods.",
          "D. Pavilion hospitals were abandoned solely due to astronomical construction and heating costs.",
        ]),
        correct_answer: "B",
        explanation_en: "1. The passage outlines how historical pavilion hospitals used natural airflow to suppress bacterial transmission, and how modern engineers are now revisiting these principles.\n2. Choice B accurately captures both the historical finding and its modern relevance.\n3. Choice A contradicts the text; choices C and D make claims not supported by the passage.",
        explanation_uz: "1. Matnda 20-asr boshlaridagi tabiiy havo oqimiga asoslangan kasalxonalar infeksiya tarqalishini kamaytirgani va hozirgi muhandislar bu usulni qayta o'rganayotgani aytilgan.\n2. B variant matnning asosiy g'oyasini to'liq ifodalaydi.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Main Idea} = \\text{Historical Discovery} + \\text{Modern Re-application}",
      },
      {
        id: "q_eng_cde_02",
        topic_code: "ENG-CDE",
        section: "READING_WRITING",
        domain: "Information and Ideas",
        difficulty: "Hard",
        prompt: "Which finding, if true, would most directly undermine the archaeologist's hypothesis that Roman glass workshops in Alexandria were the sole producers of cobalt-blue cameo glassware during the first century CE?",
        passage: "Archaeologist Dr. Marcus Thorne asserts that high-status cobalt-blue cameo vessels recovered throughout the Roman Empire originated exclusively from elite artisanal workshops operating in Alexandria during the first century CE, citing the city's unique access to Nubian mineral reserves.",
        options: JSON.stringify([
          "A. First-century kilns containing identical cobalt slag and discarded cameo glass molds were unearthed at a Roman workshop site in Aquileia, Italy.",
          "B. Historical shipping manifests confirm that Alexandrian merchants exported untreated silica sand across the Mediterranean basin.",
          "C. Spectrometric analysis revealed that third-century Roman glassware contained lower concentrations of cobalt than first-century glassware.",
          "D. Alexandrian cameo glass was priced considerably higher than unpigmented utilitarian glassware.",
        ]),
        correct_answer: "A",
        explanation_en: "1. Thorne's hypothesis claims Alexandria was the 'sole' (exclusive) producer of cobalt cameo glass in the first century CE.\n2. Finding identical kilns, cobalt slag, and cameo molds in Aquileia, Italy from the exact same period proves that production occurred outside Alexandria, directly undermining the exclusivity claim.\n3. Choices B, C, and D do not refute Alexandria's alleged monopoly.",
        explanation_uz: "1. Gipoteza: faqat Aleksandriyada ishlab chiqarilgan deb da'vo qiladi.\n2. Agar Italiyaning Akvileyasida ham aynan o'sha 1-asrga oid qoliplar va xomashyo qoldiqlari topilsa, demak faqat Aleksandriyada emasligi isbotlanadi va gipoteza puchga chiqadi (A variant).",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Weaken Monopoly Hypothesis} \\iff \\text{Evidence of Alternative Production Site}",
      },
      {
        id: "q_eng_inf_02",
        topic_code: "ENG-INF",
        section: "READING_WRITING",
        domain: "Information and Ideas",
        difficulty: "Medium",
        prompt: "Which choice most logically completes the text?",
        passage: "Neuroscientists examining memory consolidation found that subjects who slept for eight uninterrupted hours following a spatial navigation task demonstrated a 34% increase in recall accuracy compared to subjects who remained awake. Functional neuroimaging of the sleeping subjects revealed sharp-wave ripple activity in the hippocampus that mirrored neural firing patterns recorded during the learning task itself. Because these ripples were completely absent in sleep-deprived subjects, researchers conclude that _______",
        options: JSON.stringify([
          "A. hippocampus ripple activity during sleep plays an indispensable functional role in replaying and consolidating spatial memories.",
          "B. spatial navigation requires significantly more neural energy than linguistic recall tasks.",
          "C. sleep deprivation improves sensory alertness during subsequent task performance.",
          "D. sharp-wave ripples are triggered exclusively by physical exhaustion rather than learning.",
        ]),
        correct_answer: "A",
        explanation_en: "1. The study found ripple activity in the hippocampus during sleep mirrored the learning activity, and sleep-deprived subjects lacked these ripples and scored 34% worse.\n2. Therefore, ripple activity during sleep directly facilitates memory replay and consolidation.\n3. Choice A is the direct logical deduction.",
        explanation_uz: "1. Uyqu paytida miyadagi to'lqinlar o'rganish jarayonini qayta takrorlagan va bu to'lqinlar xotirani mustahkamlagan.\n2. A variant buni to'g'ri xulosalaydi.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Neural Replay during Sleep} \\implies \\text{Memory Consolidation}",
      },
      {
        id: "q_eng_wic_02",
        topic_code: "ENG-WIC",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        difficulty: "Hard",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        passage: "While philosophical treatises of the Enlightenment era often employed _______ arguments dense with esoteric terminology and circular rhetoric, Voltaire favored sharp satirical narratives written in plain vernacular to disseminate reformist ideals.",
        options: JSON.stringify(["A. convoluted", "B. transparent", "C. succinct", "D. lucid"]),
        correct_answer: "A",
        explanation_en: "1. The contrast compares Enlightenment treatises ('dense with esoteric terminology and circular rhetoric') with Voltaire's 'plain vernacular' and 'sharp' narratives.\n2. The missing word must mean intricate, tangled, or excessively complicated.\n3. 'Convoluted' means extremely complex and difficult to follow.\n4. 'Transparent', 'succinct', and 'lucid' mean clear or brief, which are antonyms.",
        explanation_uz: "1. 'dense with esoteric terminology and circular rhetoric' (murakkab, chalkash va aylanma) so'zlariga mos so'z kerak.\n2. 'Convoluted' so'zi o'ta chalkash, chigal ma'nosini bildiradi.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Context Clue: Dense, Circular Rhetoric } \\iff \\text{ Convoluted}",
      },
      {
        id: "q_eng_pur_02",
        topic_code: "ENG-PUR",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        difficulty: "Medium",
        prompt: "Which choice best describes the function of the second sentence within the overall text?",
        passage: "Many economists anticipated that the introduction of automated checkout kiosks would cause immediate widespread layoffs across the retail grocery sector. However, empirical labor surveys over the subsequent five-year period revealed that overall employment levels in stores with automated kiosks remained steady, as companies redirected workers toward inventory logistics and customer assistance. Consequently, technological automation expanded operational capacity rather than terminating frontline personnel.",
        options: JSON.stringify([
          "A. It introduces empirical counter-evidence that contradicts the forecast described in the preceding sentence.",
          "B. It proposes a mathematical equation to measure store productivity metrics.",
          "C. It laments the degradation of interpersonal communication in modern retail supermarkets.",
          "D. It offers historical anecdotes regarding the invention of barcode scanners.",
        ]),
        correct_answer: "A",
        explanation_en: "1. Sentence 1 presents an expectation: kiosks would cause widespread layoffs.\n2. Sentence 2 begins with 'However' and presents data showing employment remained steady.\n3. Therefore, sentence 2 introduces empirical counter-evidence that directly refutes the initial forecast (Choice A).",
        explanation_uz: "1. 1-gapda avtomatlashtirish ish o'rinlarini qisqartiradi degan bashorat aytilgan.\n2. 2-gap 'However...' bilan boshlanib, real ma'lumotlar bu bashorat noto'g'ri chiqqanini ko'rsatgan.\n3. A variant buni to'g'ri ifodalaydi.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Function: Counter-Evidence Refuting Initial Premise}",
      },
      {
        id: "q_eng_cro_02",
        topic_code: "ENG-CRO",
        section: "READING_WRITING",
        domain: "Craft and Structure",
        difficulty: "Hard",
        prompt: "Based on the texts, how would the author of Text 2 view the economic interpretation presented in Text 1 regarding Emperor Diocletian's monetary reforms?",
        passage: "Text 1\nHistorian Arthur Gibbon contends that Emperor Diocletian's Edict on Maximum Prices in 301 CE was a visionary stabilization measure that successfully protected common Roman citizens from greedy merchant cartels by legally capping prices on over one thousand daily commodities.\n\nText 2\nEconomic papyri and archaeological numismatic evidence from Roman Egypt demonstrate that Diocletian's price ceilings immediately triggered disastrous supply shortages. Producers withheld grain from open markets rather than selling below production cost, sparking an aggressive black market where real food prices escalated fourfold. The price caps accelerated economic collapse rather than mitigating inflation.",
        options: JSON.stringify([
          "A. As a well-meaning policy whose devastating unintended consequences were driven by basic market supply dynamics.",
          "B. As the sole factor responsible for the eventual fall of the Western Roman Empire.",
          "C. As an unmitigated success that permanently eradicated price gouging across the empire.",
          "D. As a policy that had virtually zero impact on commercial agricultural transactions.",
        ]),
        correct_answer: "A",
        explanation_en: "1. Text 1 praises Diocletian's price caps as a visionary protection against cartels.\n2. Text 2 provides evidence that price caps caused shortages, hoarding, black markets, and higher prices.\n3. Text 2 would view the policy as having catastrophic unintended consequences caused by producers refusing to sell at artificial caps (Choice A).",
        explanation_uz: "1. 1-matn narx cheklovlarini maqtaydi. 2-matn esa bu cheklovlar taqchillik va qora bozorni keltirib chiqarganini dalillar bilan ko'rsatadi.\n2. A variant 2-muallif nuqtai nazarini xolis va to'g'ri ifodalaydi.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Intent vs Unintended Market Consequences}",
      },
      {
        id: "q_eng_tra_02",
        topic_code: "ENG-TRA",
        section: "READING_WRITING",
        domain: "Expression of Ideas",
        difficulty: "Medium",
        prompt: "Which choice completes the text with the most logical transition?",
        passage: "Constructing an orbital telescope requires extraordinary capital investments and decades of meticulous engineering validation. _______ the profound scientific revelations garnered from observing deep-field galactic formations justify these astronomical expenditures.",
        options: JSON.stringify(["A. Furthermore,", "B. Nevertheless,", "C. In other words,", "D. For example,"]),
        correct_answer: "B",
        explanation_en: "1. Sentence 1 concedes a huge drawback (extraordinary capital investment and decades of difficult work).\n2. Sentence 2 counters that the profound scientific value makes it worthwhile.\n3. This requires a contrast/concession transition word: 'Nevertheless,' (Choice B).\n4. 'Furthermore' (addition), 'In other words' (restatement), and 'For example' (exemplification) do not signal the concession-to-benefit contrast.",
        explanation_uz: "1. 1-gapda juda qimmat va uzoq vaqt talab qilishi (qiyinchilik) aytilgan. 2-gapda esa olingan kashfiyotlar bu xarajatlarni to'liq oqlashi aytilgan.\n2. Zidlovchi bog'lovchi kerak: 'Nevertheless,' (Shunga qaramay).",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Concession } \\implies \\text{Nevertheless } \\implies \\text{Counter-Justification}",
      },
      {
        id: "q_eng_syn_02",
        topic_code: "ENG-SYN",
        section: "READING_WRITING",
        domain: "Expression of Ideas",
        difficulty: "Medium",
        prompt: "The student wants to introduce Henrietta Swan Leavitt's key astronomical contribution to an audience unfamiliar with variable stars. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
        passage: "While researching a topic, a student has taken the following notes:\n• Henrietta Swan Leavitt was an American astronomer working at Harvard College Observatory in the early 1900s.\n• She examined photographic glass plates of the Small Magellanic Cloud.\n• She discovered a direct mathematical relationship between the period of a Cepheid variable star's brightness fluctuations and its intrinsic luminosity.\n• Her period-luminosity relation became the 'standard candle' astronomers used to measure interstellar and intergalactic distances.",
        options: JSON.stringify([
          "A. Working at Harvard College Observatory, American astronomer Henrietta Swan Leavitt discovered a relationship between a Cepheid star's pulsation period and its brightness, providing astronomers with a benchmark to calculate cosmic distances.",
          "B. Henrietta Swan Leavitt studied photographic glass plates of the Small Magellanic Cloud in the early 1900s.",
          "C. In the early 1900s, photographic glass plates were standard tools utilized by female human computers at Harvard.",
          "D. Measuring interstellar distances had long puzzled astronomers until twentieth-century computational techniques emerged.",
        ]),
        correct_answer: "A",
        explanation_en: "1. Prompt goal: 'introduce Henrietta Swan Leavitt's key astronomical contribution to an audience unfamiliar with variable stars'.\n2. Choice A clearly identifies Leavitt, explains what she discovered (period-luminosity relationship), and why it matters (benchmark to measure cosmic distances).\n3. Choices B, C, and D fail to introduce her fundamental discovery and its broad astronomical significance.",
        explanation_uz: "1. Maqsad: Henrietta Leavittning asosiy ilmiy hissasini yangi o'quvchiga tanishtirish.\n2. A variant uning kashfiyotini (davr va yorqinlik bog'liqligi) hamda uning olam masofalarini o'lchashdagi ahamiyatini to'liq ifodalaydi.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Goal: Introduce Person + Specific Discovery + Real-World Impact}",
      },
      {
        id: "q_eng_bou_02",
        topic_code: "ENG-BOU",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        difficulty: "Hard",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        passage: "During their field survey of the Sonoran Desert, botanists documented an astonishing physiological adaptation in saguaro _______ deep pleats along the trunk expand like an accordion to absorb and store metric tons of flash-flood rainwater.",
        options: JSON.stringify([
          "A. cacti; where",
          "B. cacti, that",
          "C. cacti:",
          "D. cacti",
        ]),
        correct_answer: "C",
        explanation_en: "1. The clause preceding the punctuation is an independent clause: 'During their field survey of the Sonoran Desert, botanists documented an astonishing physiological adaptation in saguaro cacti'.\n2. What follows is an explanation specifying the exact nature of this adaptation ('deep pleats along the trunk expand like an accordion...').\n3. Under Standard English rules, a colon (:) is used after an independent clause to introduce an explanation, example, or elaboration.\n4. Choice C is correct.",
        explanation_uz: "1. Birinchi qism to'liq mustaqil gap. Undan keyin esa o'sha kaktusning moslashuvi nimadan iborat ekani tushuntirilgan.\n2. Ingliz tili qoidasiga ko'ra, to'liq gapdan keyin tushuntirish kelsa ikki nuqta (:) qo'yiladi. To'g'ri javob: C.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{[Independent Sentence]} : \\text{[Direct Explanation or Elaboration]}",
      },
      {
        id: "q_eng_mod_02",
        topic_code: "ENG-MOD",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        difficulty: "Medium",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        passage: "Having meticulously analyzed the stellar spectrograms for anomalous absorption bands, _______ published in an international astrophysics journal.",
        options: JSON.stringify([
          "A. the team of researchers compiled their empirical findings and",
          "B. the empirical findings were compiled by the research team and",
          "C. an international publication was prepared by the researchers and",
          "D. the absorption bands were documented by the team and",
        ]),
        correct_answer: "A",
        explanation_en: "1. Introductory modifier: 'Having meticulously analyzed the stellar spectrograms for anomalous absorption bands, ...'\n2. Who analyzed the spectrograms? The researchers did! The findings (B), publication (C), and absorption bands (D) cannot analyze spectrograms.\n3. The logical subject ('the team of researchers') must immediately follow the comma. Choice A is correct.",
        explanation_uz: "1. 'Spektrogrammalarni sinchkovlik bilan tekshirib chiqqach,...' - bu ishni tadqiqotchilar jamoasi qilgan.\n2. Verguldan keyin darhol 'the team of researchers' kelishi shart. To'g'ri javob: A.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{[Intro Modifier]}, \\text{[Logical Agent / Subject Performing Action]}",
      },
      {
        id: "q_eng_agr_02",
        topic_code: "ENG-AGR",
        section: "READING_WRITING",
        domain: "Standard English Conventions",
        difficulty: "Hard",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        passage: "Neither the lead climatologist nor the computational modelers _______ capable of predicting the exact path of the atmospheric river with absolute certainty.",
        options: JSON.stringify(["A. was", "B. were", "C. is", "D. has been"]),
        correct_answer: "B",
        explanation_en: "1. Subject structure: 'Neither [Climatologist, singular] nor [the computational modelers, plural]'.\n2. Correlative Conjunction Rule ('neither... nor', 'either... or'): The verb must agree with the subject CLOSER to the verb.\n3. The closer subject is 'the computational modelers' (plural).\n4. A plural past verb is required: 'were' (Choice B).\n5. 'Was' and 'is' are singular and violate the proximity rule.",
        explanation_uz: "1. 'Neither ... nor ...' (Na u, na bu) bog'lovchisida fe'l o'ziga eng yaqin turgan egaga moslashadi.\n2. Fe'lga eng yaqin turgan ega: 'the computational modelers' (ko'plikda).\n3. Ko'plikdagi fe'l: 'were'. To'g'ri javob: B.",
        desmos_latex: null,
        desmos_trick: null,
        reference_formula: "\\text{Neither A nor B } + \\text{ Verb agrees with B}",
      },
    ];

    for (const q of extraQuestions) {
      await client.query(
        `INSERT INTO questions (id, topic_code, section, domain, difficulty, prompt, passage, options, correct_answer, explanation_uz, explanation_en, desmos_trick, reference_formula, desmos_latex)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
         ON CONFLICT (id) DO UPDATE SET
           topic_code = EXCLUDED.topic_code,
           section = EXCLUDED.section,
           domain = EXCLUDED.domain,
           difficulty = EXCLUDED.difficulty,
           prompt = EXCLUDED.prompt,
           passage = EXCLUDED.passage,
           options = EXCLUDED.options,
           correct_answer = EXCLUDED.correct_answer,
           explanation_uz = EXCLUDED.explanation_uz,
           explanation_en = EXCLUDED.explanation_en,
           desmos_trick = EXCLUDED.desmos_trick,
           reference_formula = EXCLUDED.reference_formula,
           desmos_latex = EXCLUDED.desmos_latex;`,
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
          q.reference_formula,
          q.desmos_latex,
        ]
      );
    }

    console.log("✅ 11 Extra Verbal questions successfully added!");

    const finalSummary = await client.query(`
      SELECT t.section, count(q.id) as total_questions, count(DISTINCT t.code) as total_topics
      FROM topics t
      LEFT JOIN questions q ON q.topic_code = t.code
      GROUP BY t.section;
    `);
    console.table(finalSummary.rows);

    await client.end();
  } catch (err) {
    console.error("Error adding verbal questions:", err);
    process.exit(1);
  }
}

addVerbal();
