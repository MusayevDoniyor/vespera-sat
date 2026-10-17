import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://kaizo:2009@localhost:5432/vespera",
});

const newQuestions = [
  // ==========================================
  // READING & WRITING: EASY (FOUNDATIONAL)
  // ==========================================
  {
    id: "q_eng_wic_easy_01",
    topic_code: "ENG-WIC",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    difficulty: "Easy",
    prompt: "As used in the text, what does the word 'lucid' most nearly mean?",
    passage: "Professor Ramirez was renowned among her peers for converting convoluted quantum mechanics proofs into lucid explanations that even first-year undergraduates could comprehend with ease.",
    options: JSON.stringify([
      "A. clear and readily understood",
      "B. highly technical and specialized",
      "C. emotionally persuasive",
      "D. radiant and brightly illuminated"
    ]),
    correct_answer: "A",
    explanation_en: "1. The context states that first-year students could comprehend her explanations 'with ease' despite quantum mechanics being convoluted.\n2. Therefore, 'lucid' means clear, plain, and readily intelligible (Choice A).\n3. Choices B, C, and D do not fit the contextual meaning of clear communication.",
    explanation_uz: "1. Kontekstda hatto 1-kurs talabalari ham tushunishi oson bo'lgani aytilgan.\n2. Demak, 'lucid' so'zi ravshan, oson tushunarli ma'nosini bildiradi (A variant).",
    desmos_trick: null,
    reference_formula: "\\text{Context Clue: 'comprehend with ease'} \\implies \\text{lucid = clear}"
  },
  {
    id: "q_eng_wic_easy_02",
    topic_code: "ENG-WIC",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    difficulty: "Easy",
    prompt: "Which choice completes the text with the most logical and precise word?",
    passage: "Although several engineers cautioned that the wooden footbridge was structurally unsound, local municipal authorities dismissed their concerns, claiming the structure was sufficiently _______ to endure another winter.",
    options: JSON.stringify([
      "A. fragile",
      "B. robust",
      "C. ornamental",
      "D. precarious"
    ]),
    correct_answer: "B",
    explanation_en: "1. The word 'Although' contrasts the engineers' warning that the bridge was 'unsound' with the authorities' claim that it could endure another winter.\n2. Authorities therefore claimed it was sturdy or strong. 'Robust' means strong and healthy or vigorously sturdy (Choice B).\n3. Fragile (A) and precarious (D) mean weak/unstable, contradicting the contrast; ornamental (C) means decorative.",
    explanation_uz: "1. 'Although' qarama-qarshilik bildiradi: muhandislar ko'prik zaif deyishdi, ammo hokimiyat yana bir qishga chidash bera oladigan darajada mustahkam ('robust') deb hisobladi (B variant).",
    desmos_trick: null,
    reference_formula: "\\text{Contrast: 'unsound'} \\iff \\text{opposed by 'robust (strong)'}"
  },
  {
    id: "q_eng_agr_easy_01",
    topic_code: "ENG-AGR",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    difficulty: "Easy",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    passage: "The discovery of fossilized dinosaur eggs across multiple excavation sites in the Gobi Desert _______ paleontologists with critical evidence regarding Cretaceous nesting behaviors.",
    options: JSON.stringify([
      "A. provides",
      "B. provide",
      "C. have provided",
      "D. are providing"
    ]),
    correct_answer: "A",
    explanation_en: "1. Identify the subject: The subject is 'The discovery' (singular noun), not 'eggs' or 'sites' which are objects of prepositional phrases.\n2. A singular subject requires the singular verb 'provides' (Choice A).\n3. 'Provide', 'have provided', and 'are providing' are all plural verb forms.",
    explanation_uz: "1. Ega: 'The discovery' (birlikda). 'of fossilized dinosaur eggs...' bu aniqlovchi birikma xolos.\n2. Birlikdagi ega birlikdagi fe'lni oladi: 'provides' (A variant).",
    desmos_trick: null,
    reference_formula: "\\text{Singular Subject: 'The discovery'} \\rightarrow \\text{Singular Verb: 'provides'}"
  },
  {
    id: "q_eng_bou_easy_01",
    topic_code: "ENG-BOU",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    difficulty: "Easy",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    passage: "Astronomers have documented thousands of exoplanets beyond our solar _______ few exhibit atmospheric signatures capable of supporting liquid surface water.",
    options: JSON.stringify([
      "A. system, however,",
      "B. system; however,",
      "C. system however",
      "D. system, but"
    ]),
    correct_answer: "B",
    explanation_en: "1. Two independent clauses: 'Astronomers have documented thousands of exoplanets...' and 'few exhibit atmospheric signatures...'\n2. When linking two independent clauses with a conjunctive adverb like 'however', standard English requires a semicolon before 'however' and a comma after it: '; however,' (Choice B).\n3. Choice A creates a comma splice.",
    explanation_uz: "1. Ikkita mustaqil gap (independent clauses) 'however' orqali bog'langanda, oldiga nuqta-vergul (;), ketidan vergul (,) qo'yiladi: '; however,' (B variant).\n2. A variant comma splice (vergul xatosi) hosil qiladi.",
    desmos_trick: null,
    reference_formula: "\\text{Clause 1} + \\text{; however,} + \\text{Clause 2}"
  },
  {
    id: "q_eng_tra_easy_01",
    topic_code: "ENG-TRA",
    section: "READING_WRITING",
    domain: "Expression of Ideas",
    difficulty: "Easy",
    prompt: "Which choice completes the text with the most logical transition?",
    passage: "In 1800, Italian physicist Alessandro Volta invented the voltaic pile, the earliest electrical battery capable of producing a continuous direct current. _______, scientists were constrained to studying transient static charges produced by friction machines.",
    options: JSON.stringify([
      "A. Beforehand",
      "B. Consequently",
      "C. For instance",
      "D. In addition"
    ]),
    correct_answer: "A",
    explanation_en: "1. The first sentence describes Volta's invention in 1800 producing continuous direct current.\n2. The second sentence describes the state of science prior to that milestone (scientists were restricted to transient static charges).\n3. 'Beforehand' (Choice A) correctly signals this chronological relationship.\n4. 'Consequently' would imply an outcome, which is logically backward.",
    explanation_uz: "1. 1-gap: 1800-yilda Volta batareyani ixtiro qildi. 2-gap: Undan oldin esa olimlar faqat statik zaryadlar bilan cheklangan edi.\n2. Vaqt ketma-ketligini 'Beforehand' (undan oldin) ko'rsatadi (A variant).",
    desmos_trick: null,
    reference_formula: "\\text{Chronological Shift: Past Condition} \\implies \\text{'Beforehand'}"
  },
  {
    id: "q_eng_cid_easy_01",
    topic_code: "ENG-CID",
    section: "READING_WRITING",
    domain: "Information and Ideas",
    difficulty: "Easy",
    prompt: "Which choice best describes the main idea of the text?",
    passage: "Honeybees communicate the location of distant floral nectar patches using an intricate dance known as the 'waggle dance.' By adjusting the angle of their body relative to gravity and modulating the duration of abdominal vibrations, returning foragers convey both the precise direction and distance to floral resources. This behavioral choreography enables colonies to forage efficiently across hundreds of square kilometers.",
    options: JSON.stringify([
      "A. Honeybee colonies depend primarily on visual landmarks rather than biological signals to navigate to hives.",
      "B. The waggle dance is a sophisticated communication method that conveys both the direction and distance of food sources.",
      "C. Foraging honeybees vibrate their abdomens exclusively to maintain hive temperature during winter months.",
      "D. Honeybees are the only insect species known to exhibit cooperative foraging behavior."
    ]),
    correct_answer: "B",
    explanation_en: "1. The passage explains that honeybees use the waggle dance to convey direction and distance of nectar sources, enabling efficient foraging.\n2. Choice B directly summarizes this central thesis.\n3. Choices A and C make contradictory claims; Choice D makes an unsupported extreme generalization ('only insect species').",
    explanation_uz: "1. Butun matn asalarilarning 'waggle dance' orqali ozuqa yo'nalishi va masofasini aniq xabar qilishini tushuntiradi.\n2. B variant bu asosiy fikrni to'liq aks ettiradi.",
    desmos_trick: null,
    reference_formula: "\\text{Central Idea} = \\text{Waggle Dance as Direction + Distance Transmission}"
  },
  {
    id: "q_eng_syn_easy_01",
    topic_code: "ENG-SYN",
    section: "READING_WRITING",
    domain: "Expression of Ideas",
    difficulty: "Easy",
    prompt: "The student wants to emphasize a difference between the two telescope designs. Which choice most effectively uses the relevant information from the notes to accomplish this goal?",
    passage: "While researching astronomical observatories, a student took the following notes:\n• Refracting telescopes utilize glass lenses to bend and focus incoming starlight.\n• Reflecting telescopes utilize curved mirrors to collect and focus incoming starlight.\n• Refracting designs suffer from chromatic aberration, where different colors focus at different points.\n• Reflecting designs eliminate chromatic aberration because all light wavelengths reflect identically off mirrored surfaces.",
    options: JSON.stringify([
      "A. While refracting telescopes use glass lenses that cause chromatic aberration, reflecting telescopes utilize mirrors that completely avoid this optical distortion.",
      "B. Both refracting and reflecting telescopes were historically engineered to gather starlight from distant astronomical phenomena.",
      "C. Reflecting telescopes are utilized in modern astrophysics due to their large curved mirrors.",
      "D. Chromatic aberration occurs whenever incoming wavelengths of visible light pass through refracting glass components."
    ]),
    correct_answer: "A",
    explanation_en: "1. The goal is to 'emphasize a difference between the two telescope designs'.\n2. Choice A explicitly compares both designs, contrasting refracting (lenses, chromatic aberration) with reflecting (mirrors, eliminates aberration).\n3. Choice B highlights a similarity; Choices C and D focus on only one telescope or defect.",
    explanation_uz: "1. Vazifa: ikkala teleskop turi o'rtasidagi farqni ta'kidlash.\n2. A variant ikkalasini to'g'ridan-to'g'ri taqqoslaydi: linzali (refracting) teleskop rang buzilishini keltirib chiqaradi, ko'zguli (reflecting) esa bundan holi.",
    desmos_trick: null,
    reference_formula: "\\text{Goal: Contrast A vs B} \\implies \\text{'While A..., B...' structure}"
  },

  // ==========================================
  // READING & WRITING: MEDIUM
  // ==========================================
  {
    id: "q_eng_cde_med_01",
    topic_code: "ENG-CDE",
    section: "READING_WRITING",
    domain: "Information and Ideas",
    difficulty: "Medium",
    prompt: "Which finding, if true, would most directly support the botanist's hypothesis?",
    passage: "Botanist Dr. Elena Rostova hypothesizes that certain subalpine perennial wildflowers synthesize anthocyanin pigments in their petals primarily to protect reproductive organs against ultraviolet-B (UV-B) radiation damage at high elevations, rather than to attract pollinating insects.",
    options: JSON.stringify([
      "A. Wildflower petals grown under artificial UV-B shielded greenhouses produced 80% fewer anthocyanins but retained identical pollination visit rates from local bumblebees.",
      "B. Bumblebees preferentially visited wildflower blossoms exhibiting high anthocyanin pigmentation over blossoms lacking pigmentation in lowland meadows.",
      "C. Subalpine wildflowers bloom two weeks earlier in spring than related lowland wildflower species.",
      "D. Anthocyanin synthesis requires significant metabolic expenditure of carbohydrates during vegetative growth."
    ]),
    correct_answer: "A",
    explanation_en: "1. Hypothesis: Anthocyanin is for UV-B defense, NOT for pollinator attraction.\n2. Finding A shows: removing UV-B drastically drops anthocyanin production (confirming UV-B dependency), while bee pollination remained unchanged (proving it is NOT for attracting pollinators).\n3. This directly confirms both aspects of Dr. Rostova's hypothesis.",
    explanation_uz: "1. Gipoteza: rang pigmenti hasharot jalb qilish uchun emas, balki UV-B nurlaridan himoyalanish uchun kerak.\n2. A variantda UV-B nurlari to'silganda pigment 80% kamaygani, ammo ari tashrifi o'zgarmagani aytilgan — bu gipotezani to'liq isbotlaydi.",
    desmos_trick: null,
    reference_formula: "\\text{Support Hypothesis} \\implies \\text{UV-Shield reduces anthocyanin, pollination unaffected}"
  },
  {
    id: "q_eng_inf_med_01",
    topic_code: "ENG-INF",
    section: "READING_WRITING",
    domain: "Information and Ideas",
    difficulty: "Medium",
    prompt: "Which choice most logically completes the text?",
    passage: "Urban microclimate researchers observed that asphalt pavement surfaces in metropolitan centers absorb up to 95% of incoming solar irradiance, releasing stored thermal energy overnight. In contrast, adjacent public parks lined with deciduous canopy trees remain up to 7°C cooler during twilight hours due to evapotranspiration and solar shading. Therefore, urban planners seeking to mitigate the nocturnal heat island effect should _______",
    options: JSON.stringify([
      "A. prioritize expanding contiguous urban tree canopies and green infrastructure over dark impermeable pavements.",
      "B. replace existing deciduous trees with artificial reflective canopies made of solar-absorbent silicone.",
      "C. restrict public park access during peak daylight hours to minimize anthropogenic heat dissipation.",
      "D. convert municipal green spaces into high-density commercial roadways to equalize heat storage."
    ]),
    correct_answer: "A",
    explanation_en: "1. The text establishes that asphalt retains excessive night heat while trees cool the environment through shade and evapotranspiration.\n2. To mitigate night heat islands, planners should expand tree canopy and vegetation over heat-retaining pavements (Choice A).\n3. Other choices contradict the premise or propose absurd interventions.",
    explanation_uz: "1. Matnda asfalt issiqlikni saqlab qolishi, daraxtzor bog'lar esa kechasi 7 darajagacha salqinroq tutishi isbotlangan.\n2. Xulosa: shahar issiqlik orollarini yumshatish uchun daraxtzorlar va yashil maydonlarni ko'paytirish kerak (A variant).",
    desmos_trick: null,
    reference_formula: "\\text{Premise: Trees cool by 7°C} \\implies \\text{Conclusion: Expand urban canopy}"
  },
  {
    id: "q_eng_mod_med_01",
    topic_code: "ENG-MOD",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    difficulty: "Medium",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    passage: "Having analyzed over ten thousand ice core samples collected across the Antarctic ice sheet, _______",
    options: JSON.stringify([
      "A. the climatologists established an unbroken chronology of prehistoric atmospheric greenhouse gas levels.",
      "B. an unbroken chronology of prehistoric atmospheric greenhouse gas levels was established by the climatologists.",
      "C. atmospheric greenhouse gas levels were charted into an unbroken chronology by research expeditions.",
      "D. the Antarctic ice sheet revealed an unbroken chronology of atmospheric greenhouse gas levels."
    ]),
    correct_answer: "A",
    explanation_en: "1. Modifier Rule: The introductory participial phrase 'Having analyzed over ten thousand ice core samples...' must immediately be followed by the logical subject performing the action of analyzing.\n2. 'The climatologists' (Choice A) were the ones analyzing ice cores.\n3. In choices B, C, and D, 'chronology', 'gas levels', or 'the Antarctic ice sheet' are incorrectly modified as if they analyzed ice cores.",
    explanation_uz: "1. 'Having analyzed...' (tahlil qilgach) sifatdosh birikmasidan so'ng darhol shu ishni bajargan shaxs/guruh, ya'ni iqlimshunoslar ('the climatologists') kelishi shart.\n2. B, C, D variantlarda 'chronology' yoki 'ice sheet' muz parchalarini tahlil qilolmaydi (Dangling modifier xatosi). To'g'ri javob: A.",
    desmos_trick: null,
    reference_formula: "\\text{Modifier: [Action]} \\rightarrow \\text{Subject: [Agent performing action]}"
  },

  // ==========================================
  // READING & WRITING: HARD (UPPER ADAPTIVE MODULE)
  // ==========================================
  {
    id: "q_eng_cro_hard_01",
    topic_code: "ENG-CRO",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    difficulty: "Hard",
    prompt: "Based on the texts, how would the author of Text 2 most likely respond to the assertion in Text 1 regarding the dating of the megalithic stone circle?",
    passage: "Text 1\nArchaeologist Brian Cowley argues that the newly unearthed megalithic circle at Cairnford was constructed synchronously during a single rapid decade in 2400 BCE. He points to charcoal samples recovered beneath the three central trilithon stones, all of which returned identical radiocarbon dates.\n\nText 2\nWhile Cowley's radiometric data from Cairnford are technically accurate, his conclusion regarding monolithic construction overlooks stratigraphic complexity. In sedimentary soil environments, downward bioturbation by burrowing fauna frequently translocates organic particulates beneath heavyweight megaliths centuries after their erection. Multiple construction phases spanning several generations remain completely plausible.",
    options: JSON.stringify([
      "A. By arguing that Cowley's radiocarbon analysis utilized obsolete laboratory equipment that produces false dates.",
      "B. By suggesting that the charcoal recovered beneath the stones may have been deposited after the monument's initial construction via soil disturbance.",
      "C. By agreeing that the monument was erected within a single decade but disputing that the date was 2400 BCE.",
      "D. By asserting that megalithic stone circles were never used for ritual gatherings in Neolithic Europe."
    ]),
    correct_answer: "B",
    explanation_en: "1. Text 2 explicitly points out that 'downward bioturbation by burrowing fauna frequently translocates organic particulates beneath heavyweight megaliths centuries after their erection.'\n2. This means the charcoal could have been pushed under the stones long after construction due to biological disturbance in the soil (Choice B).\n3. Text 2 acknowledges the dates are 'technically accurate', eliminating A. It rejects the single-decade claim, eliminating C. Choice D is unrelated.",
    explanation_uz: "1. 2-matnda muallif tuproqdagi chuvalchang va kemiruvchilar ('bioturbation') yog'och ko'mirlarini yillar o'tib toshlar tagiga surib yuborgan bo'lishi mumkinligini ta'kidlaydi.\n2. Demak, ko'mir toshlar o'rnatilgandan ancha keyin tushgan bo'lishi mumkin (B variant).",
    desmos_trick: null,
    reference_formula: "\\text{Bioturbation argument} \\implies \\text{Subsurface carbon deposited post-construction}"
  },
  {
    id: "q_eng_pur_hard_01",
    topic_code: "ENG-PUR",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    difficulty: "Hard",
    prompt: "Which choice best describes the function of the underlined portion in the text as a whole?",
    passage: "In 1915, Albert Einstein completed his general theory of relativity, postulating that gravity is not a Newtonian pulling force exerted instantaneously across void space, but rather the geometric curvature of spacetime deformed by mass and energy. When British astrophysicist Arthur Eddington observed the 1919 solar eclipse, he documented that starlight grazing the sun deflected exactly 1.75 arcseconds. By confirming this precise relativistic prediction, Eddington elevated Einstein from a respected theoretical physicist into a global scientific icon.",
    options: JSON.stringify([
      "A. It outlines the historical trajectory that transformed an unverified hypothesis into globally celebrated scientific paradigm.",
      "B. It concedes that Newtonian gravitational mechanics remains superior to general relativity in celestial navigation.",
      "C. It refutes Eddington's empirical observations by demonstrating systematic astronomical measurement error.",
      "D. It explains the specific mathematical formulas Einstein utilized to calculate spacetime curvature tensors."
    ]),
    correct_answer: "A",
    explanation_en: "1. The text begins with Einstein's 1915 theory, details Eddington's 1919 eclipse verification, and concludes with Einstein's elevation to global renown.\n2. The passage demonstrates how an abstract theoretical hypothesis was empirically verified and transformed into a celebrated scientific reality (Choice A).\n3. Choices B, C, and D are factually inaccurate based on the text.",
    explanation_uz: "1. Matn Eynshteynning nazariyasidan boshlanib, 1919-yildagi amaliy sinov va uning dunyo miqyosidagi tan olinishiga olib kelgan tarixiy jarayonni bayon qiladi.\n2. A variant matnning umumiy ritorik maqsadini to'g'ri ifodalaydi.",
    desmos_trick: null,
    reference_formula: "\\text{Function: Theoretical hypothesis} \\rightarrow \\text{Empirical confirmation} \\rightarrow \\text{Global icon}"
  },

  // ==========================================
  // MATH: EASY (MODULE 1 & 2 FOUNDATIONS)
  // ==========================================
  {
    id: "q_math_alg_easy_02",
    topic_code: "ALG-01",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Easy",
    prompt: "If $4x - 7 = 25$, what is the value of $2x + 5$?",
    passage: null,
    options: JSON.stringify([
      "A. 13",
      "B. 16",
      "C. 21",
      "D. 32"
    ]),
    correct_answer: "C",
    explanation_en: "1. Solve for $x$:\n$$4x - 7 = 25 \\implies 4x = 32 \\implies x = 8$$\n2. Substitute $x = 8$ into the expression $2x + 5$:\n$$2(8) + 5 = 16 + 5 = 21$$\n3. Correct Choice: C.\nDesmos hack: Enter `4x - 7 = 25` to get $x = 8$, then evaluate `2(8) + 5`.",
    explanation_uz: "1. Tenglamani yechamiz: $4x - 7 = 25 \\Rightarrow 4x = 32 \\Rightarrow x = 8$.\n2. So'ralgan ifodaga qo'yamiz: $2(8) + 5 = 16 + 5 = 21$.\n3. To'g'ri javob: C.",
    desmos_trick: "4x - 7 = 25 deb kiriting, vertikal chiziq ustiga bosib x=8 ni oling, keyin 2(8)+5 ni hisoblang.",
    reference_formula: "4x - 7 = 25 \\implies x = 8 \\implies 2x + 5 = 21"
  },
  {
    id: "q_math_dat_easy_01",
    topic_code: "DAT-02",
    section: "MATH",
    domain: "Problem Solving & Data Analysis",
    difficulty: "Easy",
    prompt: "A digital tablet originally priced at $\\$450$ is discounted by $20\\%$. If a sales tax of $8\\%$ is applied to the discounted price, what is the final purchase price?",
    passage: null,
    options: JSON.stringify([
      "A. $360.00",
      "B. $388.80",
      "C. $396.00",
      "D. $414.00"
    ]),
    correct_answer: "B",
    explanation_en: "1. Calculate discounted price:\n$$\\text{Discounted Price} = 450 \\times (1 - 0.20) = 450 \\times 0.80 = 360$$\n2. Apply $8\\%$ sales tax to the discounted price:\n$$\\text{Final Price} = 360 \\times (1 + 0.08) = 360 \\times 1.08 = 388.80$$\n3. Correct Choice: B.",
    explanation_uz: "1. 20% chegirma: $450 \\times 0.80 = 360$.\n2. 8% soliq qo'shilishi: $360 \\times 1.08 = 388.80$.\n3. To'g'ri javob: B.",
    desmos_trick: "Desmosga: 450 * 0.8 * 1.08 deb kiriting -> 388.8 chiqadi.",
    reference_formula: "\\text{Final} = \\text{Original} \\times (1 - d) \\times (1 + t)"
  },
  {
    id: "q_math_geo_easy_01",
    topic_code: "GEO-01",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    difficulty: "Easy",
    prompt: "A rectangular garden has a perimeter of $56$ meters. If the length of the garden is $6$ meters longer than the width, what is the area of the garden, in square meters?",
    passage: null,
    options: JSON.stringify([
      "A. 160",
      "B. 175",
      "C. 187",
      "D. 280"
    ]),
    correct_answer: "C",
    explanation_en: "1. Perimeter formula: $2(L + W) = 56 \\implies L + W = 28$.\n2. Given $L = W + 6$:\n$$(W + 6) + W = 28 \\implies 2W = 22 \\implies W = 11$$\n3. Length: $L = 11 + 6 = 17$.\n4. Area: $A = L \\times W = 17 \\times 11 = 187$ square meters (Choice C).",
    explanation_uz: "1. Perimetr: $2(L + W) = 56 \\Rightarrow L + W = 28$.\n2. $L = W + 6$ bo'lsa: $2W + 6 = 28 \\Rightarrow W = 11$, $L = 17$.\n3. Maydon: $A = 17 \\times 11 = 187$.\n4. To'g'ri javob: C.",
    desmos_trick: "Desmosga: x + y = 28 va x - y = 6 kiriting. Kesisgan nuqta (17, 11). 17*11 = 187.",
    reference_formula: "\\text{Perimeter} = 2(L + W), \\quad \\text{Area} = L \\times W"
  },

  // ==========================================
  // MATH: MEDIUM
  // ==========================================
  {
    id: "q_math_adv_med_01",
    topic_code: "ADV-02",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Medium",
    prompt: "The function $f(x) = -2(x - 4)^2 + 18$ is graphed in the $xy$-plane. What is the sum of the $x$-intercepts of the graph?",
    passage: null,
    options: JSON.stringify([
      "A. 4",
      "B. 8",
      "C. 9",
      "D. 18"
    ]),
    correct_answer: "B",
    explanation_en: "1. Fast Vertex Symmetry: The vertex of $f(x)$ is at $(h, k) = (4, 18)$.\n2. Parabola is symmetric about its axis of symmetry $x = 4$.\n3. For any symmetric parabola with two roots $r_1$ and $r_2$, the axis of symmetry is the midpoint: $\\frac{r_1 + r_2}{2} = 4 \\implies r_1 + r_2 = 8$.\n4. Alternatively, solve $-2(x-4)^2 + 18 = 0 \\implies (x-4)^2 = 9 \\implies x - 4 = \\pm 3 \\implies x = 1$ and $x = 7$. Sum: $1 + 7 = 8$.\n5. Correct Choice: B.",
    explanation_uz: "1. Parabola cho'qqisi: $(4, 18)$. Simmetriya o'qi: $x = 4$.\n2. Ikkala ildizning o'rtasi $4$ bo'lgani sababli, ularning yig'indisi har doim $2 \\times 4 = 8$ bo'ladi!\n3. Desmosda: y = -2(x-4)^2 + 18 deb yozsangiz, x o'qini 1 va 7 da kesib o'tadi. $1 + 7 = 8$. To'g'ri javob: B.",
    desmos_trick: "y = -2(x - 4)^2 + 18 deb yozing. x-intercept nuqtalariga bosing: (1,0) va (7,0). 1 + 7 = 8.",
    reference_formula: "\\text{Sum of roots} = 2h = 2(4) = 8"
  },
  {
    id: "q_math_geo_med_01",
    topic_code: "GEO-04",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    difficulty: "Medium",
    prompt: "In the $xy$-plane, the graph of the equation $x^2 + y^2 - 10x + 6y + 9 = 0$ is a circle. What is the radius of the circle?",
    passage: null,
    options: JSON.stringify([
      "A. 3",
      "B. 4",
      "C. 5",
      "D. 25"
    ]),
    correct_answer: "C",
    explanation_en: "1. Complete the square for $x$ and $y$:\n$$(x^2 - 10x + 25) + (y^2 + 6y + 9) = -9 + 25 + 9$$\n$$(x - 5)^2 + (y + 3)^2 = 25$$\n2. Since $r^2 = 25$, the radius is $r = \\sqrt{25} = 5$.\n3. Correct Choice: C.\nDesmos hack: Type `x^2 + y^2 - 10x + 6y + 9 = 0`. Center is at $(5, -3)$ and circle passes through $(5, 2)$, distance = 5.",
    explanation_uz: "1. To'la kvadratga ajratamiz:\n$(x-5)^2 - 25 + (y+3)^2 - 9 + 9 = 0 \\Rightarrow (x-5)^2 + (y+3)^2 = 25$.\n2. $r^2 = 25 \\Rightarrow r = 5$.\n3. To'g'ri javob: C.",
    desmos_trick: "x^2 + y^2 - 10x + 6y + 9 = 0 ni to'g'ridan-to'g'ri Desmosga yozing. Markaz (5, -3), tepasidagi nuqta (5, 2) -> radius 5.",
    reference_formula: "(x-h)^2 + (y-k)^2 = r^2"
  },

  // ==========================================
  // MATH: HARD (UPPER ADAPTIVE MODULE - 750+ TIER)
  // ==========================================
  {
    id: "q_math_adv_hard_01",
    topic_code: "ADV-05",
    section: "MATH",
    domain: "Advanced Math",
    difficulty: "Hard",
    prompt: "In the system of equations below, $k$ is a constant:\n$$\\begin{cases} y = 3x^2 - 12x + 7 \\\\ y = 6x + k \\end{cases}$$\nIf the system has exactly one real solution $(x, y)$, what is the value of $k$?",
    passage: null,
    options: JSON.stringify([
      "A. -20",
      "B. -13",
      "C. 7",
      "D. 34"
    ]),
    correct_answer: "A",
    explanation_en: "1. Equate the two expressions for $y$:\n$$3x^2 - 12x + 7 = 6x + k \\implies 3x^2 - 18x + (7 - k) = 0$$\n2. Exactly one real solution means the quadratic discriminant must equal zero ($D = b^2 - 4ac = 0$):\n$$(-18)^2 - 4(3)(7 - k) = 0$$\n$$324 - 12(7 - k) = 0 \\implies 324 = 12(7 - k)$$\n$$27 = 7 - k \\implies k = 7 - 27 = -20$$\n3. Correct Choice: A.\nDesmos hack: Type `y = 3x^2 - 12x + 7` and `y = 6x + k`. Add slider for $k$. Slide until the line is tangent to the parabola at exactly one contact point $\\rightarrow k = -20$.",
    explanation_uz: "1. Tenglashtiramiz: $3x^2 - 18x + (7 - k) = 0$.\n2. Aniq bitta yechimga ega bo'lishi uchun Diskriminant $0$ bo'lishi shart ($b^2 - 4ac = 0$):\n$(-18)^2 - 4(3)(7 - k) = 0 \\Rightarrow 324 - 12(7 - k) = 0 \\Rightarrow 27 = 7 - k \\Rightarrow k = -20$.\n3. To'g'ri javob: A.",
    desmos_trick: "Desmosga y = 3x^2 - 12x + 7 va y = 6x + k kiriting. k slaydida urinma bo'lguncha suring -> k = -20.",
    reference_formula: "b^2 - 4ac = 0 \\iff \\text{Exactly one intersection point (Tangency)}"
  },
  {
    id: "q_math_geo_hard_01",
    topic_code: "GEO-03",
    section: "MATH",
    domain: "Geometry & Trigonometry",
    difficulty: "Hard",
    prompt: "In a right triangle $ABC$ with right angle at $C$, $\\sin(A) = \\frac{4}{5}$. If the length of hypotenuse $AB$ is $35$, what is the area of triangle $ABC$?",
    passage: null,
    options: JSON.stringify([
      "A. 147",
      "B. 294",
      "C. 420",
      "D. 588"
    ]),
    correct_answer: "B",
    explanation_en: "1. In right triangle $ABC$, $\\sin(A) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} = \\frac{BC}{AB} = \\frac{4}{5}$.\n2. Given $AB = 35$:\n$$BC = 35 \\times \\frac{4}{5} = 28$$\n3. This is a scaled $3-4-5$ Pythagorean triple (multiplier = $7$).\n4. Therefore, the adjacent leg $AC = 3 \\times 7 = 21$.\n5. Area of right triangle:\n$$\\text{Area} = \\frac{1}{2} \\times AC \\times BC = \\frac{1}{2} \\times 21 \\times 28 = 21 \\times 14 = 294$$\n6. Correct Choice: B.",
    explanation_uz: "1. $\\sin(A) = 4/5$, gipotenuza $35$ bo'lsa, qarshisidagi katet $BC = 35 \\times (4/5) = 28$.\n2. Bu mashhur $3-4-5$ uchburchagining 7 ga ko'paytirilgan holati: $21 - 28 - 35$.\n3. Ikkinchi katet $AC = 21$.\n4. Uchburchak yuzi: $S = \\frac{1}{2} \\times 21 \\times 28 = 294$.\n5. To'g'ri javob: B.",
    desmos_trick: "Desmosga: 0.5 * (35 * (3/5)) * (35 * (4/5)) deb kiriting -> darhol 294 chiqadi.",
    reference_formula: "\\text{Area} = \\frac{1}{2}ab, \\quad \\sin^2(A) + \\cos^2(A) = 1"
  },
  {
    id: "q_math_alg_hard_01",
    topic_code: "ALG-03",
    section: "MATH",
    domain: "Algebra",
    difficulty: "Hard",
    prompt: "The system of equations below has no solution:\n$$\\begin{cases} ax + 6y = 14 \\\\ 4x + 3y = 9 \\end{cases}$$\nWhat is the value of the constant $a$?",
    passage: null,
    options: JSON.stringify([
      "A. 2",
      "B. 4",
      "C. 8",
      "D. 12"
    ]),
    correct_answer: "C",
    explanation_en: "1. A system of linear equations has NO SOLUTION if and only if the lines are parallel with different $y$-intercepts.\n2. Parallel lines have equal slopes: $\\frac{a}{4} = \\frac{6}{3} = 2 \\implies a = 8$.\n3. Check intercepts: $14 / 6 = 7/3 \\neq 9/3 = 3$, so they are distinct parallel lines.\n4. Correct Choice: C.\nDesmos hack: Enter `ax + 6y = 14` and `4x + 3y = 9`. Use slider for $a$. The lines become parallel when $a = 8$.",
    explanation_uz: "1. Chiziqli tenglamalar sistemasi yechimga ega bo'lmasligi uchun to'g'ri chiziqlar parallel bo'lishi shart.\n2. Koeffitsiyentlar nisbati teng bo'ladi: $\\frac{a}{4} = \\frac{6}{3} = 2 \\Rightarrow a = 8$.\n3. To'g'ri javob: C.",
    desmos_trick: "Desmosga: ax + 6y = 14 va 4x + 3y = 9 deb yozing. a slaydida parallel bo'lgan qiymatni toping -> a = 8.",
    reference_formula: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2} \\iff \\text{No Solution (Parallel)}"
  }
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log("Seeding adaptive ecosystem question bank...");
    let added = 0;
    for (const q of newQuestions) {
      await client.query(
        `
        INSERT INTO questions (
          id, topic_code, section, domain, difficulty, prompt, passage,
          options, correct_answer, explanation_uz, explanation_en,
          desmos_trick, reference_formula
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (id) DO UPDATE SET
          prompt = EXCLUDED.prompt,
          passage = EXCLUDED.passage,
          options = EXCLUDED.options,
          correct_answer = EXCLUDED.correct_answer,
          explanation_uz = EXCLUDED.explanation_uz,
          explanation_en = EXCLUDED.explanation_en,
          desmos_trick = EXCLUDED.desmos_trick,
          reference_formula = EXCLUDED.reference_formula;
      `,
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
        ]
      );
      added++;
    }
    console.log(`Successfully seeded ${added} questions.`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
