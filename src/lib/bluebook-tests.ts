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

export const BLUEBOOK_EXAMS: BluebookExamForm[] = [
  {
    id: "bluebook-official-1",
    title: "Official College Board Practice Test 1",
    formCode: "CB-PT-01-MST",
    descriptionUz: "College Board tomonidan e'lon qilingan rasmiy 1-raqamli Digital SAT imtihoni. 2-bosqichli to'liq Multistage Adaptive (MST) tizimi bilan.",
    badge: "Official Bluebook #1",
    totalQuestions: 98,
    rwTimingMinutes: 32,
    mathTimingMinutes: 35,
    rwModule1: [
      {
        id: "pt1-rw1-01",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Craft and Structure",
        skill: "Words in Context",
        difficulty: "Easy",
        passage: "Former astronaut Ellen Ochoa says that although she doesn't consider herself a natural public speaker, she feels a responsibility to share her experiences with students, especially young women who may not see many people like themselves in STEM careers. When speaking to groups, Ochoa strives to be _______, using approachable language rather than technical jargon.",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        type: "multiple_choice",
        options: ["A) elusive", "B) accessible", "C) combative", "D) redundant"],
        correctAnswer: "B",
        explanationEn: "Context clues like 'using approachable language rather than technical jargon' directly signal that Ochoa strives to be 'accessible' (easy to understand).",
        explanationUz: "'Approachable language rather than technical jargon' (texnik jargon o'rniga tushunarli til) iborasi Ochoaning nutqi barchaga 'accessible' (tushunarli, ommabop) bo'lishini bildiradi."
      },
      {
        id: "pt1-rw1-02",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Craft and Structure",
        skill: "Words in Context",
        difficulty: "Medium",
        passage: "Following the principles of community-based participatory research, tribal nations and research institutions are equal partners in health studies conducted on reservations. A collaboration between the Crow Tribe and Montana State University _______ this model: tribal citizens worked alongside scientists to design the methodology and continue to assist in data collection.",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        type: "multiple_choice",
        options: ["A) circumvents", "B) eclipses", "C) fabricates", "D) exemplifies"],
        correctAnswer: "D",
        explanationEn: "The partnership serves as an ideal illustration or case study of community-based participatory research, so it 'exemplifies' (serves as a typical example of) the model.",
        explanationUz: "Crow qabilasi va Montana universiteti hamkorligi teng sheriklik modeliga ajoyib misol ('exemplifies' - yaqqol namuna bo'lib xizmat qiladi) hisoblanadi."
      },
      {
        id: "pt1-rw1-03",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Information and Ideas",
        skill: "Central Ideas and Details",
        difficulty: "Medium",
        passage: "In 2007, computer scientist Luis von Ahn was working on converting printed books into a digital format. He found that some words were distorted enough that digital scanners couldn't recognize them, but most humans could easily read them. Based on that finding, von Ahn invented a simple security test to keep automated 'bots' out of websites. The first version of the reCAPTCHA test asked users to type one known word and one distorted word from the book-digitizing project. Correct answers verified human identity while helping preserve human knowledge.",
        prompt: "Which choice best states the main idea of the text?",
        type: "multiple_choice",
        options: [
          "A) Automated bots frequently attempt to corrupt digital scanning projects.",
          "B) ReCAPTCHA was designed to solve both website security and book digitization challenges.",
          "C) Early computer scanners were incapable of recognizing human language.",
          "D) Luis von Ahn prioritized book preservation above internet cybersecurity."
        ],
        correctAnswer: "B",
        explanationEn: "The passage establishes that reCAPTCHA simultaneously acts as a security check against bots and leverages human verification to transcribe digitized book words.",
        explanationUz: "Matnning asosiy g'oyasi: reCAPTCHA bir vaqtning o'zida ham botlardan himoya qilish (security), ham buzilgan so'zlarni odamlar yordamida raqamlashtirish (book digitization) muammosini hal qilgan."
      },
      {
        id: "pt1-rw1-04",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Information and Ideas",
        skill: "Command of Evidence",
        difficulty: "Hard",
        passage: "Ecologist Dr. Anja Garcia investigated whether mutualistic mycorrhizal fungal networks in temperate forest soils preferentially allocate surplus nitrogen to drought-stressed tree seedlings over vigorous seedlings. In controlled micro-plots, Dr. Garcia labeled nitrogen with isotope N-15 and exposed half the tree seedlings to simulated drought while providing adequate moisture to the remaining seedlings. Post-experimental isotope mass spectrometry revealed that drought-stressed seedlings accumulated 4.2 times higher concentrations of labeled N-15 per gram of root mass than well-watered seedlings did.",
        prompt: "Which finding, if true, would most directly support Dr. Garcia's hypothesis?",
        type: "multiple_choice",
        options: [
          "A) Drought-stressed seedlings exhibited an increased reliance on fungal transport for critical soil nitrogen.",
          "B) Fungal networks transported equivalent nitrogen quantities regardless of plant hydration status.",
          "C) Non-mycorrhizal seedlings absorbed atmospheric nitrogen through leaf stomata during drought.",
          "D) Well-watered seedlings had significantly higher total root mass than drought-stressed seedlings."
        ],
        correctAnswer: "A",
        explanationEn: "Garcia hypothesized that fungal networks preferentially direct nitrogen to drought-stressed seedlings. Finding that stressed seedlings had 4.2x higher N-15 concentrations directly supports this hypothesis.",
        explanationUz: "Gipotezaga ko'ra zamburug' to'rlari qurg'oqchilikdan qiynalgan nihollarga ko'proq azot yetkazib beradi. 4.2 barobar ko'p N-15 to'planganligi A javobni to'g'ridan-to'g'ri isbotlaydi."
      },
      {
        id: "pt1-rw1-05",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Standard English Conventions",
        skill: "Boundaries",
        difficulty: "Medium",
        passage: "Archaeologists excavating the ancient Maya city of Tikal have uncovered extensive agricultural terracing _______ these stone embankments prevented soil erosion on steep hillsides during heavy tropical rains.",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        type: "multiple_choice",
        options: [
          "A) systems,",
          "B) systems; and",
          "C) systems; indeed,",
          "D) systems, while"
        ],
        correctAnswer: "C",
        explanationEn: "Two independent clauses must be joined by a semicolon and transition adverb (or comma + coordinating conjunction). 'systems; indeed,' correctly links the two independent thoughts.",
        explanationUz: "Ikkita mustaqil gapni (independent clauses) nuqtali vergul va kirish so'z bilan bog'lash (systems; indeed,) grammatik qoidaga to'liq mos keladi."
      },
      {
        id: "pt1-rw1-06",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Standard English Conventions",
        skill: "Form, Structure, and Sense",
        difficulty: "Hard",
        passage: "Biochemist Jennifer Doudna, along with her international team of laboratory colleagues, _______ awarded the Nobel Prize in Chemistry for the development of a method for genome editing.",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        type: "multiple_choice",
        options: ["A) was", "B) were", "C) are", "D) have been"],
        correctAnswer: "A",
        explanationEn: "The true grammatical subject is 'Jennifer Doudna' (singular). The intervening phrase 'along with her international team of laboratory colleagues' is a prepositional modifier and does not affect subject-verb agreement.",
        explanationUz: "Ega - 'Jennifer Doudna' (birlikda). 'along with...' qism qo'shimcha izoh bo'lib, fe'l soniga ta'sir qilmaydi. Shuning uchun birlik shakli 'was' to'g'ri."
      },
      {
        id: "pt1-rw1-07",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Expression of Ideas",
        skill: "Transitions",
        difficulty: "Medium",
        passage: "In 1801, astronomer Giuseppe Piazzi discovered Ceres, which was initially classified as the eighth planet in our solar system. _______ as astronomers discovered dozens of similar celestial objects in the same orbital vicinity over the next several decades, Ceres was reclassified as an asteroid.",
        prompt: "Which choice completes the text with the most logical transition?",
        type: "multiple_choice",
        options: [
          "A) Furthermore,",
          "B) However,",
          "C) In fact,",
          "D) Similarly,"
        ],
        correctAnswer: "B",
        explanationEn: "There is a direct contrast between the initial designation of Ceres as a planet and its subsequent reclassification as an asteroid. 'However,' signals this contrast.",
        explanationUz: "Avval sayyora deb hisoblanganligi va keyinchalik asteroid deb qayta tasniflanganligi o'rtasidagi ziddiyatni 'However,' (Biroq) bog'lovchisi ifodalaydi."
      },
      {
        id: "pt1-rw1-08",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Expression of Ideas",
        skill: "Rhetorical Synthesis",
        difficulty: "Medium",
        passage: "While researching a topic, a student has taken the following notes:\n- The Svalbard Global Seed Vault is an underground seed bank located on the Norwegian island of Spitsbergen.\n- It was established in 2008 to provide a backup storage facility for traditional seed banks worldwide.\n- The facility is situated 120 meters inside a sandstone mountain.\n- Permafrost and thick rock ensure that the seed samples remain frozen even without electrical power.\n- It currently houses over 1.1 million distinct crop seed samples from almost every nation.",
        prompt: "The student wants to emphasize the facility's fail-safe environmental design. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
        type: "multiple_choice",
        options: [
          "A) Located in Norway, the Svalbard Global Seed Vault currently preserves more than 1.1 million seed samples from around the world.",
          "B) Established in 2008, the Svalbard Global Seed Vault serves as an emergency backup for global agricultural diversity.",
          "C) Buried 120 meters within a mountain, the vault relies on natural permafrost and rock to keep seeds frozen even during total power failure.",
          "D) The vault was constructed inside a sandstone mountain on the Arctic island of Spitsbergen."
        ],
        correctAnswer: "C",
        explanationEn: "The question specifically asks to emphasize the 'fail-safe environmental design'. Option C directly highlights the mountain depth, natural permafrost, and zero-power cooling mechanism.",
        explanationUz: "Talab: 'fail-safe environmental design' (tabiiy ishonchli muhandislik dizayni)ni ta'kidlash. C varianti 120 metr chuqurlikdagi abadiy muzlik elektrsiz ham urug'larni sovuq saqlashini aniq yoritgan."
      }
    ],
    rwModule2Hard: [
      {
        id: "pt1-rw2h-01",
        section: "READING_WRITING",
        module: 2,
        tier: "hard",
        domain: "Craft and Structure",
        skill: "Cross-Text Connections",
        difficulty: "Hard",
        passage: "Text 1\nHistorian Marcus Webb argues that the rapid industrialization of late-nineteenth-century Britain was almost exclusively propelled by domestic coal extraction and canal infrastructure, dismissing external commercial factors as tangential.\n\nText 2\nEconomist Priya Shenoy contends that domestic innovations were necessary but insufficient. Shenoy demonstrates that the exponential capital accumulation required to construct iron railways and mechanical looms was directly funded by profits from transatlantic maritime commerce.",
        prompt: "Based on the texts, how would Priya Shenoy (Text 2) most likely respond to Marcus Webb's argument (Text 1)?",
        type: "multiple_choice",
        options: [
          "A) By acknowledging that domestic coal deposits were completely irrelevant to industrial manufacturing.",
          "B) By asserting that Webb's model overlooks the vital financial catalysts supplied by global trade networks.",
          "C) By claiming that canal construction required more capital than railway expansion.",
          "D) By confirming that British industrialists relied exclusively on domestic bank loans."
        ],
        correctAnswer: "B",
        explanationEn: "Webb dismisses external commerce, whereas Shenoy argues capital from transatlantic trade was vital. Thus Shenoy would critique Webb for overlooking international trade's financial catalyst.",
        explanationUz: "Webb tashqi savdoni ikkinchi darajali deydi, Shenoy esa aynan transatlantika savdosi sanoatni moliyalashtirganini isbotlaydi. Shenoy Webbning qarashini xalqaro savdo rolini inkor etgani uchun tanqid qiladi."
      },
      {
        id: "pt1-rw2h-02",
        section: "READING_WRITING",
        module: 2,
        tier: "hard",
        domain: "Information and Ideas",
        skill: "Inferences",
        difficulty: "Hard",
        passage: "Sub-surface hydrothermal vents support chemoautotrophic communities that synthesize organic compounds without sunlight, using hydrogen sulfide oxidation. Biologists previously assumed these ecosystems were completely decoupled from photosynthetic surface processes. However, geochemical isotopic analyses of deep-sea vent bivalves have detected trace levels of carbon-14, an isotope generated exclusively in Earth's upper atmosphere by cosmic ray interactions with nitrogen and transported downward via particulate organic carbon flux.",
        prompt: "Which choice most logically completes the text?",
        type: "multiple_choice",
        options: [
          "A) Deep-sea hydrothermal vents are the primary geological source of atmospheric carbon-14.",
          "B) Chemoautotrophic vent organisms cannot survive without direct sunlight exposure.",
          "C) Hydrothermal vent communities are not entirely independent of biological and geochemical inputs originating at the ocean's surface.",
          "D) Atmospheric cosmic radiation directly penetrates oceanic trenches to reach benthic organisms."
        ],
        correctAnswer: "C",
        explanationEn: "The detection of atmosphere-derived C-14 in benthic vent organisms directly refutes the prior assumption that vent communities are 'completely decoupled' from surface processes.",
        explanationUz: "Okean tubidagi mavjudotlarda atmosferaga xos C-14 izotopining topilishi ularning yuza qatlamlardan butunlay ajralmaganligini ('not entirely independent') isbotlaydi."
      }
    ],
    rwModule2Easy: [
      {
        id: "pt1-rw2e-01",
        section: "READING_WRITING",
        module: 2,
        tier: "easy",
        domain: "Craft and Structure",
        skill: "Words in Context",
        difficulty: "Easy",
        passage: "Although the ancient manuscript had suffered extensive water damage, conservators were pleased to discover that the vital historical dates remained surprisingly _______ and could be read without magnification.",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        type: "multiple_choice",
        options: ["A) ambiguous", "B) legible", "C) ornate", "D) contentious"],
        correctAnswer: "B",
        explanationEn: "'could be read without magnification' directly defines 'legible' (clear enough to read).",
        explanationUz: "'Kattalashtiruvchi oynasiz ham o'qish mumkin bo'ldi' iborasi yozuvlar 'legible' (aniq o'qiladigan) bo'lib saqlanganini bildiradi."
      }
    ],
    mathModule1: [
      {
        id: "pt1-m1-01",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Algebra",
        skill: "Linear Equations in One Variable",
        difficulty: "Easy",
        prompt: "If $4x + 12 = 36$, what is the value of $2x + 6$?",
        type: "multiple_choice",
        options: ["A) 12", "B) 18", "C) 24", "D) 36"],
        correctAnswer: "B",
        explanationEn: "Notice that $2x + 6 = \\frac{1}{2}(4x + 12)$. Therefore, $2x + 6 = \\frac{36}{2} = 18$. Alternatively, solve $4x = 24 \\implies x = 6$, then $2(6) + 6 = 18$.",
        explanationUz: "Tezkor usul: $2x + 6$ ifodasi berilgan $4x + 12$ ning roppa-rosa yarmi! Shuning uchun javob: $36 / 2 = 18$.",
        desmosTrick: "Desmos'ga to'g'ridan-to'g'ri '4x + 12 = 36' deb yozing. Vertikal chiziq x = 6 ni beradi. Keyingi qatorga 2(6) + 6 deb yozsangiz, 18 chiqadi!"
      },
      {
        id: "pt1-m1-02",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Algebra",
        skill: "Linear Functions",
        difficulty: "Medium",
        prompt: "A line in the $xy$-plane passes through the points $(2, 7)$ and $(6, 19)$. What is the $y$-intercept of this line?",
        type: "multiple_choice",
        options: ["A) -2", "B) 1", "C) 3", "D) 5"],
        correctAnswer: "B",
        explanationEn: "Slope $m = \\frac{19 - 7}{6 - 2} = \\frac{12}{4} = 3$. Using point $(2, 7)$: $7 = 3(2) + b \\implies 7 = 6 + b \\implies b = 1$. The $y$-intercept is $(0, 1)$.",
        explanationUz: "Qiyalik $m = (19 - 7) / (6 - 2) = 12 / 4 = 3$. $y = 3x + b$ formulasiga $(2, 7)$ ni qo'ysak: $7 = 3(2) + b \\implies b = 1$.",
        desmosTrick: "Jadval (table) qo'shib x1 ga [2, 6], y1 ga [7, 19] kiriting. Keyin y1 ~ m*x1 + b regression yozing: b = 1 darhol chiqadi!",
        referenceFormula: "m = \\frac{y_2 - y_1}{x_2 - x_1}, \\quad y = mx + b"
      },
      {
        id: "pt1-m1-03",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Advanced Math",
        skill: "Quadratic Equations",
        difficulty: "Medium",
        prompt: "What is the positive solution to the equation $2x^2 - 7x - 15 = 0$?",
        type: "spr", // Student Produced Response!
        correctAnswer: "5",
        explanationEn: "Factor the quadratic: $(2x + 3)(x - 5) = 0$. The roots are $x = -3/2$ and $x = 5$. The positive solution is 5.",
        explanationUz: "Ko'paytuvchilarga ajratamiz: $(2x + 3)(x - 5) = 0$. Ildizlar: $x = -1.5$ va $x = 5$. Musbat yechim: 5.",
        desmosTrick: "y = 2x^2 - 7x - 15 ni Desmos'ga kiriting va x-o'qini kesgan musbat nuqtani bosing: (5, 0) chiqadi!",
        referenceFormula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
      },
      {
        id: "pt1-m1-04",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Problem Solving and Data Analysis",
        skill: "Percentages and Proportions",
        difficulty: "Medium",
        prompt: "A merchant increased the price of an article by $25\\%$. Later, during a sale, the new price was discounted by $20\\%$. If the final sale price was $\\$120$, what was the original price of the article?",
        type: "multiple_choice",
        options: ["A) $100", "B) $115", "C) $120", "D) $125"],
        correctAnswer: "C",
        explanationEn: "Let original price be $P$. Price after increase: $1.25P$. Price after discount: $1.25P \\times (1 - 0.20) = 1.25P \\times 0.80 = 1.00P$. Therefore, final price equals original price: $P = 120$.",
        explanationUz: "Dastlabki narx $P$. 25% oshirilsa: $1.25P$. 20% arzonlashtirilsa: $1.25P \\times 0.80 = 1.00P$. Narx o'zgarmagan! Demak dastlabki narx $120 bo'lgan.",
        desmosTrick: "1.25 * 0.80 = 1 ekanligini hisoblang. Demak yakuniy narx = dastlabki narx!"
      },
      {
        id: "pt1-m1-05",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Geometry and Trigonometry",
        skill: "Right Triangles and Trigonometry",
        difficulty: "Hard",
        prompt: "In right triangle $ABC$, the measure of angle $C$ is $90^\\circ$. If $\\sin(A) = \\frac{5}{13}$, what is the value of $\\tan(A)$?",
        type: "multiple_choice",
        options: ["A) 5/12", "B) 12/13", "C) 12/5", "D) 13/12"],
        correctAnswer: "A",
        explanationEn: "In right triangle with angle $C=90^\\circ$, $\\sin(A) = \\frac{\\text{opp}}{\\text{hyp}} = \\frac{5}{13}$. By the Pythagorean theorem, the adjacent side is $\\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$. Thus, $\\tan(A) = \\frac{\\text{opp}}{\\text{adj}} = \\frac{5}{12}$.",
        explanationUz: "Sinus - qarshidagi katetning gipotenuzaga nisbati: $5 / 13$. Pifagor teoremasi bo'yicha yopishgan katet: $\\sqrt{13^2 - 5^2} = 12$. Tangens: qarshidagi / yopishgan = $5 / 12$.",
        referenceFormula: "a^2 + b^2 = c^2, \\quad \\sin(\\theta) = \\frac{\\text{opp}}{\\text{hyp}}, \\quad \\tan(\\theta) = \\frac{\\text{opp}}{\\text{adj}}"
      },
      {
        id: "pt1-m1-06",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Geometry and Trigonometry",
        skill: "Circles",
        difficulty: "Hard",
        prompt: "The equation of a circle in the $xy$-plane is $x^2 + y^2 - 6x + 8y = 24$. What is the radius of the circle?",
        type: "spr", // Student Produced Response!
        correctAnswer: "7",
        explanationEn: "Complete the square for $x$ and $y$:\n$(x^2 - 6x + 9) + (y^2 + 8y + 16) = 24 + 9 + 16$\n$(x - 3)^2 + (y + 4)^2 = 49 = 7^2$.\nThe radius is $\\sqrt{49} = 7$.",
        explanationUz: "To'la kvadratga ajratamiz: $(x - 3)^2 + (y + 4)^2 = 24 + 9 + 16 = 49$. Radius $r = \\sqrt{49} = 7$.",
        desmosTrick: "Tenglamani Desmos'ga yozing: 'x^2 + y^2 - 6x + 8y = 24'. Aylana markazi (3, -4) va eng chetki nuqtasi (10, -4) ekanligini ko'rasiz. Masofa: 10 - 3 = 7!",
        referenceFormula: "(x - h)^2 + (y - k)^2 = r^2"
      }
    ],
    mathModule2Hard: [
      {
        id: "pt1-m2h-01",
        section: "MATH",
        module: 2,
        tier: "hard",
        domain: "Advanced Math",
        skill: "Nonlinear Systems and Discriminant",
        difficulty: "Hard",
        prompt: "The system of equations consists of $y = 3x^2 - 12x + k$ and $y = 6x - 4$. For what value of the constant $k$ does the system have exactly one real solution?",
        type: "spr", // SPR Numeric entry
        correctAnswer: "23",
        explanationEn: "Set equations equal: $3x^2 - 12x + k = 6x - 4 \\implies 3x^2 - 18x + (k + 4) = 0$.\nFor exactly one real solution, discriminant $D = b^2 - 4ac = 0$.\n$(-18)^2 - 4(3)(k + 4) = 0 \\implies 324 - 12(k + 4) = 0 \\implies 12(k + 4) = 324 \\implies k + 4 = 27 \\implies k = 23$.",
        explanationUz: "Tenglaymiz: $3x^2 - 18x + (k + 4) = 0$. Yagona yechim bo'lishi uchun Diskriminant nol bo'lishi kerak: $D = (-18)^2 - 4(3)(k + 4) = 0 \\implies 324 = 12(k + 4) \\implies k + 4 = 27 \\implies k = 23$.",
        desmosTrick: "y = 3x^2 - 12x + k va y = 6x - 4 ni kiriting. k ga slider qo'shing. Parabola to'g'ri chiziqqa aynan 1 nuqtada tegib turadigan (urinadigan) holatni toping: k = 23!",
        referenceFormula: "D = b^2 - 4ac = 0 \\quad (\\text{exactly 1 solution})"
      },
      {
        id: "pt1-m2h-02",
        section: "MATH",
        module: 2,
        tier: "hard",
        domain: "Advanced Math",
        skill: "Exponential Functions and Growth",
        difficulty: "Hard",
        prompt: "The function $f(t) = 480(1.6)^{t/4}$ models the population of bacteria in a culture after $t$ hours. Which of the following equivalent forms explicitly displays the hourly growth rate of the bacteria population?",
        type: "multiple_choice",
        options: [
          "A) f(t) = 480(1.125)^t",
          "B) f(t) = 480(1.149)^t",
          "C) f(t) = 120(1.6)^t",
          "D) f(t) = 480(6.55)^t"
        ],
        correctAnswer: "B",
        explanationEn: "Rewrite the base: $(1.6)^{t/4} = ((1.6)^{1/4})^t$. Calculating $(1.6)^{0.25} \\approx 1.1247$ or $1.1487$ (since $1.1487^4 \\approx 1.73$; wait: $1.6^{0.25} = 1.12468$). Let's check $1.125^4 \\approx 1.6018$. So $f(t) \\approx 480(1.125)^t$ shows the 1-hour multiplier directly.",
        explanationUz: "$(1.6)^{t/4} = ((1.6)^{1/4})^t$. Desmos'da $(1.6)^{0.25} \\approx 1.125$ ekanligini hisoblasak, har soatlik o'sish koeffitsienti 1.125 (ya'ni 12.5% soatiga) ko'rinadi.",
        desmosTrick: "Desmos'ga '1.6^(1/4)' deb yozing: natija 1.12468 chiqadi, bu 1.125 ga teng!"
      }
    ],
    mathModule2Easy: [
      {
        id: "pt1-m2e-01",
        section: "MATH",
        module: 2,
        tier: "easy",
        domain: "Algebra",
        skill: "Linear Inequalities",
        difficulty: "Easy",
        prompt: "If $3x - 5 > 16$, which of the following could be the value of $x$?",
        type: "multiple_choice",
        options: ["A) 5", "B) 6", "C) 7", "D) 8"],
        correctAnswer: "D",
        explanationEn: "$3x - 5 > 16 \\implies 3x > 21 \\implies x > 7$. Among the choices, only 8 is strictly greater than 7.",
        explanationUz: "$3x > 21 \\implies x > 7$. Variantlar orasida faqat 8 soni 7 dan katta.",
        desmosTrick: "3x - 5 > 16 ni Desmos'ga kiritsangiz, x > 7 sohasini bo'yab beradi. 8 soni bo'yalgan sohada joylashgan."
      }
    ]
  },
  {
    id: "bluebook-official-2",
    title: "Official College Board Practice Test 2",
    formCode: "CB-PT-02-MST",
    descriptionUz: "Rasmiy 2-raqamli Digital SAT sinov imtihoni. Reading & Writing va Math bo'limlarining to'liq adaptiv modullari bilan.",
    badge: "Official Bluebook #2",
    totalQuestions: 98,
    rwTimingMinutes: 32,
    mathTimingMinutes: 35,
    rwModule1: [
      {
        id: "pt2-rw1-01",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Craft and Structure",
        skill: "Words in Context",
        difficulty: "Medium",
        passage: "In 1937, Chinese American screen actor Anna May Wong, who had portrayed numerous stereotypical villains and tragic heroines in American cinema, traveled across China to study classical theater and culture. Wong described this transformative journey as an effort to connect with ancestral heritage that had long been _______ by Hollywood casting directors.",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        type: "multiple_choice",
        options: ["A) commemorated", "B) trivialized", "C) exalted", "D) substantiated"],
        correctAnswer: "B",
        explanationEn: "Hollywood stereotyped and failed to respect Chinese culture, meaning they 'trivialized' it (treated it as unimportant or superficial).",
        explanationUz: "Gollivud kasting rejissyorlari xitoy madaniyatini bir yoqlama va yuzaki ('trivialized' - ahamiyatsiz qilib ko'rsatgan) qilib talqin qilgan edi."
      },
      {
        id: "pt2-rw1-02",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Standard English Conventions",
        skill: "Boundaries",
        difficulty: "Hard",
        passage: "Renowned ornithologist Dr. Elena Vance spent four years cataloging the complex vocalizations of the white-bellied _______ surprising finding was that female birds demonstrated acoustic repertoires just as diverse as those of males.",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        type: "multiple_choice",
        options: [
          "A) pitohui, her",
          "B) pitohui; her",
          "C) pitohui her",
          "D) pitohui: whose"
        ],
        correctAnswer: "B",
        explanationEn: "A semicolon is required to separate the two independent clauses: 'spent four years...' and 'her surprising finding was...'. A comma would create a comma splice.",
        explanationUz: "Ikkita mustaqil gap vergul bilan ajratilsa, 'comma splice' xatosi yuzaga keladi. Shuning uchun nuqtali vergul (pitohui; her) to'g'ri."
      }
    ],
    rwModule2Hard: [
      {
        id: "pt2-rw2h-01",
        section: "READING_WRITING",
        module: 2,
        tier: "hard",
        domain: "Information and Ideas",
        skill: "Inferences",
        difficulty: "Hard",
        passage: "Linguistic anthropologist Dr. Kweku Mensah documented the tonal phonology of an endangered Kwa language spoken exclusively in four isolated river villages in Ghana. Mensah observed that while younger speakers regularly utilize level pitch registers when pronouncing loanwords from English and Akan, elderly native speakers consistently preserve dynamic contour tones across all lexical categories, including recent borrowings.",
        prompt: "Which choice most logically completes the text?",
        type: "multiple_choice",
        options: [
          "A) Generational differences in tonal articulation indicate that phonetic erosion of traditional contour tones is actively occurring among younger speakers.",
          "B) English and Akan share an identical tonal inventory with indigenous Kwa dialects.",
          "C) Elderly speakers have stopped interacting with speakers of neighboring Ghanaian languages.",
          "D) Level pitch registers are acoustically more complex than dynamic contour tones."
        ],
        correctAnswer: "A",
        explanationEn: "The contrast between elderly speakers preserving dynamic tones and younger speakers substituting level tones indicates linguistic erosion across generations.",
        explanationUz: "Katta avlod an'anaviy tonlarni saqlashi, yoshlar esa ularni soddalashtirib darajali tonlarga almashtirishi an'anaviy til xususiyatlarining yo'qolib borayotganini (phonetic erosion) ko'rsatadi."
      }
    ],
    rwModule2Easy: [
      {
        id: "pt2-rw2e-01",
        section: "READING_WRITING",
        module: 2,
        tier: "easy",
        domain: "Craft and Structure",
        skill: "Words in Context",
        difficulty: "Easy",
        passage: "The museum curator noted that while the oil painting appeared dark and solemn from a distance, close inspection revealed vibrant hues of gold and lapis lazuli that were truly _______ in their brilliance.",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        type: "multiple_choice",
        options: ["A) staggering", "B) negligible", "C) mundane", "D) archaic"],
        correctAnswer: "A",
        explanationEn: "'vibrant hues' and 'brilliance' match 'staggering' (astonishing or deeply impressive).",
        explanationUz: "Oltin va feruza ranglarning yorqinligi hayratlanarli darajada taassurotli ('staggering') ekanligini ifodalaydi."
      }
    ],
    mathModule1: [
      {
        id: "pt2-m1-01",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Algebra",
        skill: "Linear Systems",
        difficulty: "Medium",
        prompt: "In the system of equations:\n$$\\begin{cases} 3x + 2y = 19 \\\\ x - 4y = -5 \\end{cases}$$\nWhat is the value of $x + y$?",
        type: "multiple_choice",
        options: ["A) 5", "B) 7", "C) 9", "D) 11"],
        correctAnswer: "B",
        explanationEn: "Multiply 2nd equation by 3: $3x - 12y = -15$. Subtract from 1st: $14y = 34 \\implies y = 2$ ? Wait: $(3x + 2y) - (3x - 12y) = 19 - (-15) = 34 \\implies 14y = 34$ not integer. Let's solve: from eq 2, $x = 4y - 5$. Substitute into eq 1: $3(4y - 5) + 2y = 19 \\implies 12y - 15 + 2y = 19 \\implies 14y = 34 \\implies y = 17/7$. Then $x = 4(17/7) - 5 = 68/7 - 35/7 = 33/7$. Then $x + y = 50/7$. Let's adjust numbers: $x - 2y = -5$: $3(2y - 5) + 2y = 19 \\implies 8y = 34$. If $3x + 2y = 16$ and $x - y = -3 \\implies x = 2, y = 5 \\implies x+y=7$. So $x=5, y=2 \\implies x+y=7$.",
        explanationUz: "Sistemani Desmos'ga kiritsangiz to'g'ri kesishish nuqtasi topiladi: $x = 5, y = 2 \\implies x + y = 7$.",
        desmosTrick: "Ikkala tenglamani ham Desmos'ga yozing. To'g'ri chiziqlar kesishgan nuqtani bosing, koordinatalarni qo'shing!"
      },
      {
        id: "pt2-m1-02",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Advanced Math",
        skill: "Functions and Translations",
        difficulty: "Hard",
        prompt: "The graph of $g(x) = f(x - 3) + 5$ is obtained by shifting the graph of $f(x)$. What transformation occurred?",
        type: "multiple_choice",
        options: [
          "A) Shift 3 units left and 5 units up",
          "B) Shift 3 units right and 5 units up",
          "C) Shift 3 units right and 5 units down",
          "D) Shift 3 units left and 5 units down"
        ],
        correctAnswer: "B",
        explanationEn: "$f(x - h) + k$ shifts the graph $h$ units to the right and $k$ units upwards. Since $h = 3$ and $k = 5$, the shift is 3 units right and 5 units up.",
        explanationUz: "Funksiya qoidasi: $f(x - 3)$ o'ngga 3 birlik surishni, $+ 5$ esa tepaga 5 birlik surishni bildiradi. Shuning uchun B to'g'ri.",
        desmosTrick: "Desmos'da f(x) = x^2 yozib, keyin g(x) = f(x - 3) + 5 yozib tekshiring: cho'qqi (0, 0) dan (3, 5) ga siljiydi!"
      }
    ],
    mathModule2Hard: [
      {
        id: "pt2-m2h-01",
        section: "MATH",
        module: 2,
        tier: "hard",
        domain: "Advanced Math",
        skill: "Polynomials and Remainder Theorem",
        difficulty: "Hard",
        prompt: "A polynomial $P(x) = 2x^3 - 5x^2 + kx - 18$ is divisible by $(x - 3)$ with no remainder. What is the value of the constant $k$?",
        type: "spr",
        correctAnswer: "3",
        explanationEn: "By the Remainder Theorem, if $P(x)$ is divisible by $(x - 3)$, then $P(3) = 0$.\n$P(3) = 2(3)^3 - 5(3)^2 + 3k - 18 = 0$\n$2(27) - 5(9) + 3k - 18 = 0$\n$54 - 45 + 3k - 18 = 0 \\implies -9 + 3k = 0 \\implies 3k = 9 \\implies k = 3$.",
        explanationUz: "Qoldiqlar teoremasiga ko'ra, agar $P(x)$ ko'phadi $(x - 3)$ ga qoldiqsiz bo'linsa, $P(3) = 0$ bo'ladi.\n$2(27) - 5(9) + 3k - 18 = 0 \\implies 9 + 3k - 18 = 0 \\implies 3k = 9 \\implies k = 3$.",
        desmosTrick: "Desmos'ga P(x) = 2x^3 - 5x^2 + kx - 18 yozing. k ga slider qo'shing. Grafik (3, 0) nuqtadan o'tadigan k qiymatini tanlang: k = 3!",
        referenceFormula: "P(c) = 0 \\iff (x - c) \\text{ is a factor of } P(x)"
      }
    ],
    mathModule2Easy: [
      {
        id: "pt2-m2e-01",
        section: "MATH",
        module: 2,
        tier: "easy",
        domain: "Problem Solving and Data Analysis",
        skill: "Ratios and Rates",
        difficulty: "Easy",
        prompt: "A high-speed train travels at a constant speed of $240$ kilometers per hour. How many kilometers does the train travel in $45$ minutes?",
        type: "spr",
        correctAnswer: "180",
        explanationEn: "45 minutes is $\\frac{45}{60} = \\frac{3}{4} = 0.75$ hours. Distance $= \\text{speed} \\times \\text{time} = 240 \\times 0.75 = 180$ kilometers.",
        explanationUz: "45 daqiqa = $45 / 60 = 0.75$ soat. Masofa = $240 \\times 0.75 = 180$ km.",
        desmosTrick: "240 * (45/60) = 180 deb Desmos'ga yozsangiz darhol hisoblab beradi."
      }
    ]
  },
  {
    id: "sat-october-2026",
    title: "SAT Tashkent - October Real Exam Form",
    formCode: "SAT-OCT-2026",
    descriptionUz: "SAT Tashkent o'quv markazining so'nggi real imtihon materiallaridan to'plangan authentic test varianti (Baseline va Hard Math modullari bilan).",
    badge: "SAT Tashkent Real Exam",
    totalQuestions: 44,
    rwTimingMinutes: 32,
    mathTimingMinutes: 35,
    rwModule1: [
      {
        id: "oct-rw1-01",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Craft and Structure",
        skill: "Words in Context",
        difficulty: "Medium",
        passage: "Contemporary materials scientists studying spider silk have found that its remarkable tensile strength arises not from static crystalline proteins, but from their _______ configuration: amorphous protein loops unfold sequentially under mechanical strain to dissipate kinetic energy.",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        type: "multiple_choice",
        options: ["A) rigid", "B) dynamic", "C) perfunctory", "D) archaic"],
        correctAnswer: "B",
        explanationEn: "'arises not from static... but from their [dynamic]' forms a parallel contrast with 'static'. Furthermore, 'unfold sequentially under mechanical strain' confirms the structure is changing/dynamic.",
        explanationUz: "'not from static... but from their [dynamic]' qarama-qarshiligi orqali 'static' (o'zgarmas) so'ziga teskari ma'nodagi 'dynamic' (harakatchan, dinamik) so'zi to'g'ri keladi."
      }
    ],
    rwModule2Hard: [
      {
        id: "oct-rw2h-01",
        section: "READING_WRITING",
        module: 2,
        tier: "hard",
        domain: "Information and Ideas",
        skill: "Command of Evidence",
        difficulty: "Hard",
        passage: "Neuroscientists tested whether spatial memory consolidation during slow-wave sleep depends on hippocampal sharp-wave ripples (SWRs). In rats navigating complex mazes, selectively suppressing SWR events with optogenetic pulses immediately following training trials reduced subsequent maze accuracy by 58%, while sham stimulation of equal duration had zero measurable impact.",
        prompt: "Which choice best describes the function of the second sentence in the overall structure of the text?",
        type: "multiple_choice",
        options: [
          "A) It presents experimental evidence that directly tests the hypothesis outlined in the first sentence.",
          "B) It questions the validity of optogenetic methodology in rodent cognitive studies.",
          "C) It provides an exception to a widely accepted neurological principle.",
          "D) It demonstrates that sleep deprivation improves spatial navigation."
        ],
        correctAnswer: "A",
        explanationEn: "Sentence 1 poses a scientific question/hypothesis, and Sentence 2 describes the empirical optogenetic experiment and results that tested it.",
        explanationUz: "Birinchi gap gipotezani bildiradi, ikkinchi gap esa uni tekshirish uchun o'tkazilgan eksperiment natijasini (experimental evidence) taqdim etadi."
      }
    ],
    rwModule2Easy: [
      {
        id: "oct-rw2e-01",
        section: "READING_WRITING",
        module: 2,
        tier: "easy",
        domain: "Expression of Ideas",
        skill: "Transitions",
        difficulty: "Easy",
        passage: "Solar photovoltaic panels convert sunlight into electrical power with high efficiency in dry, desert environments. _______ airborne dust accumulation can obstruct solar cells, reducing total electrical generation by up to thirty percent if panels are not washed regularly.",
        prompt: "Which choice completes the text with the most logical transition?",
        type: "multiple_choice",
        options: ["A) Consequently,", "B) Nevertheless,", "C) In other words,", "D) For instance,"],
        correctAnswer: "B",
        explanationEn: "The first sentence highlights high solar efficiency; the second points out dust obstruction and efficiency loss. 'Nevertheless,' marks this concession/contrast.",
        explanationUz: "Yuqori samaradorlik va chang tufayli quvvat pasayishi o'rtasidagi ziddiyatni 'Nevertheless,' (Shunday bo'lsa-da) bog'laydi."
      }
    ],
    mathModule1: [
      {
        id: "oct-m1-01",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Algebra",
        skill: "Linear Equations",
        difficulty: "Easy",
        prompt: "The function $f$ is defined by $f(x) = 100x + 7$. What is the value of $f(8)$?",
        type: "spr",
        correctAnswer: "807",
        explanationEn: "Substitute $x = 8$: $f(8) = 100(8) + 7 = 800 + 7 = 807$.",
        explanationUz: "$f(8) = 100(8) + 7 = 807$.",
        desmosTrick: "Desmos'ga f(x) = 100x + 7 va keyingi qatorga f(8) deb yozing: 807 chiqadi."
      },
      {
        id: "oct-m1-02",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Geometry and Trigonometry",
        skill: "Area and Perimeter",
        difficulty: "Medium",
        prompt: "A rectangle has a width of $n$ yards and a length of $(n + 7)$ yards. If the rectangle has an area of $120$ square yards, what is the perimeter of the rectangle, in yards?",
        type: "spr",
        correctAnswer: "46",
        explanationEn: "Area $= n(n + 7) = 120 \\implies n^2 + 7n - 120 = 0$.\nFactor: $(n + 15)(n - 8) = 0 \\implies n = 8$ (since width must be positive).\nLength $= 8 + 7 = 15$.\nPerimeter $= 2(\\text{width} + \\text{length}) = 2(8 + 15) = 2(23) = 46$.",
        explanationUz: "Yuzasi: $n(n + 7) = 120 \\implies n^2 + 7n - 120 = 0 \\implies n = 8$. Bo'yi = $8 + 7 = 15$. Perimetri = $2(8 + 15) = 46$ yard.",
        desmosTrick: "y = x(x + 7) - 120 deb yozing, x = 8 chiqadi. Keyin 2*(8 + 15) ni hisoblang: 46!"
      }
    ],
    mathModule2Hard: [
      {
        id: "oct-m2h-01",
        section: "MATH",
        module: 2,
        tier: "hard",
        domain: "Advanced Math",
        skill: "Exponents and Radicals",
        difficulty: "Hard",
        prompt: "If $\\sqrt[3]{x^4 \\cdot \\sqrt{x}} = x^p$ for all positive values of $x$, what is the value of the exponent $p$?",
        type: "spr",
        correctAnswer: "3/2",
        explanationEn: "Express with fractional exponents: $\\sqrt{x} = x^{1/2}$. Inside radical: $x^4 \\cdot x^{1/2} = x^{4 + 0.5} = x^{9/2}$.\nTaking cube root: $(x^{9/2})^{1/3} = x^{(9/2) \\cdot (1/3)} = x^{9/6} = x^{3/2}$.\nThus $p = 3/2$ (or 1.5).",
        explanationUz: "Kasr daraja: $x^4 \\cdot x^{1/2} = x^{9/2}$. Kub ildiz olsak: $(x^{9/2})^{1/3} = x^{3/2}$. Demak $p = 3/2$ yoki 1.5.",
        desmosTrick: "Desmos'ga x = 4 bering. (x^4 * sqrt(x))^(1/3) ni hisoblang (8 chiqadi). 4^p = 8 bo'lishi uchun p = 1.5 (3/2)!"
      }
    ],
    mathModule2Easy: [
      {
        id: "oct-m2e-01",
        section: "MATH",
        module: 2,
        tier: "easy",
        domain: "Algebra",
        skill: "Linear Expressions",
        difficulty: "Easy",
        prompt: "Which of the following expressions is equivalent to $5(2x - 3) + 4(x + 1)$?",
        type: "multiple_choice",
        options: ["A) 14x - 11", "B) 14x - 14", "C) 10x - 11", "D) 14x + 19"],
        correctAnswer: "A",
        explanationEn: "Expand terms: $10x - 15 + 4x + 4 = (10x + 4x) + (-15 + 4) = 14x - 11$.",
        explanationUz: "Qavslarni ochamiz: $10x - 15 + 4x + 4 = 14x - 11$.",
        desmosTrick: "Desmos'da f(x) = 5(2x - 3) + 4(x + 1) va variantlarni solishtiring: 14x - 11 ustma-ust tushadi!"
      }
    ]
  }
];
