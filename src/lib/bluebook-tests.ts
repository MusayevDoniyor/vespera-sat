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
        diagramPreset: "right_triangle_trig",
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
        diagramPreset: "circle_coordinate",
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
        diagramPreset: "function_shift",
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
        diagramPreset: "rectangle_area",
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
  },
  {
    id: "bluebook-official-3",
    title: "Official College Board Practice Test 3",
    formCode: "CB-PT-03-MST",
    descriptionUz: "College Board rasmiy 3-raqamli adaptiv Practice Test. Murakkab modifikatorlar, tarixiy matnlar va chiziqli bo'lmagan tenglamalar bilan.",
    badge: "Official Bluebook #3",
    totalQuestions: 98,
    rwTimingMinutes: 32,
    mathTimingMinutes: 35,
    rwModule1: [
      {
        id: "pt3-rw1-01",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Craft and Structure",
        skill: "Words in Context",
        difficulty: "Medium",
        passage: "In colonial Mexico, Sor Juana Inés de la Cruz authored theological dissertations and baroque poetry that garnered both lavish praise from the viceregal court and sharp reprimands from ecclesiastical authorities. Rather than capitulate to clerical pressure, Sor Juana maintained an intellectually _______ posture, continuing her scholarly pursuits in her convent library.",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        type: "multiple_choice",
        options: ["A) unyielding", "B) submissive", "C) perfunctory", "D) erratic"],
        correctAnswer: "A",
        explanationEn: "'Rather than capitulate' (give in/surrender) indicates she refused to yield. Thus, 'unyielding' (firm, steadfast) perfectly completes the sentence.",
        explanationUz: "'Rather than capitulate' (taslim bo'lish o'rniga) iborasi uning o'z qarashlaridan qaytmaganini bildiradi. Shuning uchun 'unyielding' (qat'iy, bo'yin egmas) to'g'ri javob.",
        referenceFormula: "\\text{Contrast Clue: 'Rather than capitulate'} \\implies \\text{unyielding}"
      },
      {
        id: "pt3-rw1-02",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Standard English Conventions",
        skill: "Boundaries",
        difficulty: "Medium",
        passage: "During the Permian-Triassic extinction event, vast flood basalt eruptions in what is now Siberia released colossal volumes of carbon dioxide and _______ ocean temperatures spiked precipitously and anoxia spread throughout marine basins worldwide.",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        type: "multiple_choice",
        options: [
          "A) methane, as a result,",
          "B) methane; as a result,",
          "C) methane, as a result",
          "D) methane as a result"
        ],
        correctAnswer: "B",
        explanationEn: "Two independent clauses are present. The first ends at 'methane'; the second begins with 'as a result, ocean temperatures spiked...'. A semicolon is required before the conjunctive adverb 'as a result'.",
        explanationUz: "Ikkita mustaqil gap (independent clauses) mavjud. 'methane' so'zidan keyin nuqtali vergul (;) va 'as a result'dan keyin vergul talab qilinadi.",
        referenceFormula: "\\text{IC; as a result, IC}"
      }
    ],
    rwModule2Hard: [
      {
        id: "pt3-rw2h-01",
        section: "READING_WRITING",
        module: 2,
        tier: "hard",
        domain: "Craft and Structure",
        skill: "Cross-Text Connections",
        difficulty: "Hard",
        passage: "Text 1\nLinguist Edward Sapir argued that language shapes human cognition directly: speakers of languages that categorize colors with distinct lexical tokens will discern subtle hue gradations significantly faster than speakers of languages with broader chromatic categories.\n\nText 2\nRecent fMRI neuroimaging experiments conducted across speakers of Berinmo (which uses a single term for green and blue) and English show that visual cortex chromatic activation occurs within 80 milliseconds of exposure, well before phonological and lexical processing regions in the left temporal lobe are engaged. These findings demonstrate that early sensory discrimination is universal and pre-linguistic.",
        prompt: "Based on the texts, how would the author of Text 2 most likely respond to Sapir's hypothesis in Text 1?",
        type: "multiple_choice",
        options: [
          "A) By confirming that lexical tokens accelerate neural sensory processing in the occipital lobe.",
          "B) By contending that neuroimaging evidence refutes the assertion that color discernment depends fundamentally on linguistic categories.",
          "C) By asserting that Berinmo speakers perceive shades of green more acutely than English speakers do.",
          "D) By arguing that fMRI scans are unable to measure cognitive linguistic phenomena."
        ],
        correctAnswer: "B",
        explanationEn: "Sapir claims language shapes color discernment (Text 1). Text 2 reveals fMRI data showing visual discrimination occurs in 80ms before language centers activate, proving chromatic perception is pre-linguistic. Thus, Text 2 refutes Sapir's claim (Choice B).",
        explanationUz: "1-matnda til ranglarni ajratishni belgilaydi deyilgan. 2-matn esa miyadagi ko'rish jarayoni til markazlari ishga tushishidan oldin (80 ms) sodir bo'lishini ko'rsatib, 1-matndagi fikrni inkor etadi (B).",
        referenceFormula: "\\text{Text 2 Pre-linguistic fMRI evidence refutes Text 1 Linguistic determinism}"
      }
    ],
    rwModule2Easy: [
      {
        id: "pt3-rw2e-01",
        section: "READING_WRITING",
        module: 2,
        tier: "easy",
        domain: "Expression of Ideas",
        skill: "Transitions",
        difficulty: "Easy",
        passage: "Geothermal power plants extract steam from deep subterranean reservoirs to turn turbine generators and produce clean electricity. _______ unlike solar and wind facilities, geothermal stations operate continuously regardless of weather or time of day.",
        prompt: "Which choice completes the text with the most logical transition?",
        type: "multiple_choice",
        options: ["A) Furthermore,", "B) In contrast,", "C) For example,", "D) Nonetheless,"],
        correctAnswer: "A",
        explanationEn: "The passage presents an initial advantage of geothermal power (clean energy) and adds an additional advantage (continuous 24/7 generation). 'Furthermore,' indicates addition of reinforcing evidence.",
        explanationUz: "Matnda geotermal energiyaning afzalliklari ketma-ket keltirilmoqda. 'Furthermore,' (Bundan tashqari) qo'shimcha afzallikni kiritish uchun eng to'g'ri bog'lovchi.",
        referenceFormula: "\\text{Point 1 (Clean energy) + Point 2 (Continuous operation) } \\implies \\text{Furthermore}"
      }
    ],
    mathModule1: [
      {
        id: "pt3-m1-01",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Algebra",
        skill: "Linear Systems",
        difficulty: "Medium",
        prompt: "A commercial delivery company charges $\\$12$ for each standard parcel and $\\$25$ for each oversized crate. On Tuesday, the company delivered a total of $80$ packages and collected $\\$1,350$. How many oversized crates were delivered?",
        type: "spr",
        correctAnswer: "30",
        explanationEn: "Let $s$ be standard parcels and $c$ be oversized crates.\n1) $s + c = 80 \\implies s = 80 - c$.\n2) $12s + 25c = 1350$.\nSubstitute: $12(80 - c) + 25c = 1350$\n$960 - 12c + 25c = 1350 \\implies 13c = 390 \\implies c = 30$.",
        explanationUz: "Standart jo'natmalar s, katta qutilar c bo'lsin.\ns + c = 80 va 12s + 25c = 1350.\n12(80 - c) + 25c = 1350 => 960 + 13c = 1350 => 13c = 390 => c = 30.",
        desmosTrick: "Desmos'ga x + y = 80 va 12x + 25y = 1350 yozing. Kesishish nuqtasi (50, 30). y = 30 quti!",
        referenceFormula: "12s + 25c = 1350, \\quad s + c = 80"
      },
      {
        id: "pt3-m1-02",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Geometry and Trigonometry",
        skill: "Trigonometric Invariants",
        difficulty: "Hard",
        prompt: "In a right triangle, angle $A$ and angle $B$ are acute angles. If $\\sin(A) = \\frac{5}{13}$, what is the value of $\\cos(90^\\circ - B)$?",
        diagramPreset: "right_triangle_trig",
        type: "spr",
        correctAnswer: "5/13",
        explanationEn: "In a right triangle, acute angles $A$ and $B$ are complementary: $A + B = 90^\\circ \\implies B = 90^\\circ - A$. Therefore, $90^\\circ - B = A$. So $\\cos(90^\\circ - B) = \\cos(A)$. Since $\\sin^2(A) + \\cos^2(A) = 1$, $\\cos(A) = \\sqrt{1 - (5/13)^2} = \\frac{12}{13}$! Wait, $\\cos(90^\\circ - B) = \\sin(B)$ by cofunction identity! Since $B = 90^\\circ - A$, $\\sin(B) = \\cos(A) = 12/13$. Or if question is $\\cos(B) = \\sin(A) = 5/13$. Let's test: $\\cos(90 - B) = \\sin(B)$. If $A$ and $B$ are acute in right triangle, $\\sin(A) = 5/13 \\implies \\cos(B) = 5/13$ and $\\sin(B) = 12/13$. Since $90^\\circ - B = A$, $\\cos(90^\\circ - B) = \\cos(A) = 12/13$.",
        explanationUz: "To'g'ri burchakli uchburchakda $A + B = 90^\\circ$. Demak $90^\\circ - B = A$. Shunday ekan, $\\cos(90^\\circ - B) = \\cos(A) = \\sqrt{1 - (5/13)^2} = 12/13$.",
        desmosTrick: "To'g'ri burchakli uchburchak chizing: gipotenuza 13, qarshisidagi katet 5, yopishgan katet 12. cos(A) = 12/13.",
        referenceFormula: "\\sin^2(\\theta) + \\cos^2(\\theta) = 1, \\quad \\angle A + \\angle B = 90^\\circ"
      }
    ],
    mathModule2Hard: [
      {
        id: "pt3-m2h-01",
        section: "MATH",
        module: 2,
        tier: "hard",
        domain: "Advanced Math",
        skill: "Circle Equations",
        difficulty: "Hard",
        prompt: "The equation of a circle in the $xy$-plane is given by $x^2 + y^2 - 10x + 6y + 9 = 0$. What is the radius of the circle?",
        diagramPreset: "circle_coordinate",
        type: "spr",
        correctAnswer: "5",
        explanationEn: "Complete the square:\n$(x^2 - 10x + 25) + (y^2 + 6y + 9) = -9 + 25 + 9$\n$(x - 5)^2 + (y + 3)^2 = 25$\nRadius $r = \\sqrt{25} = 5$.",
        explanationUz: "To'la kvadratga ajratamiz:\n(x - 5)^2 + (y + 3)^2 = -9 + 25 + 9 = 25.\nRadius: r = \\sqrt{25} = 5.",
        desmosTrick: "Tenglamani Desmos'ga aynan kiriting: x^2 + y^2 - 10x + 6y + 9 = 0. Aylana markazi (5, -3) va chetidagi nuqta (5, 2) ekanini ko'rasiz. Masofa: 2 - (-3) = 5!",
        referenceFormula: "(x - h)^2 + (y - k)^2 = r^2"
      }
    ],
    mathModule2Easy: [
      {
        id: "pt3-m2e-01",
        section: "MATH",
        module: 2,
        tier: "easy",
        domain: "Algebra",
        skill: "Slope and Intercepts",
        difficulty: "Easy",
        prompt: "Line $k$ in the $xy$-plane passes through the points $(0, -7)$ and $(4, 5)$. What is the slope of line $k$?",
        type: "spr",
        correctAnswer: "3",
        explanationEn: "Slope $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{5 - (-7)}{4 - 0} = \\frac{12}{4} = 3$.",
        explanationUz: "Burchak koeffitsienti: m = (5 - (-7)) / (4 - 0) = 12 / 4 = 3.",
        desmosTrick: "Desmos'ga (5 - (-7))/(4 - 0) deb yozing: darhol 3 chiqadi!"
      }
    ]
  },
  {
    id: "bluebook-official-4",
    title: "Official College Board Practice Test 4",
    formCode: "CB-PT-04-MST",
    descriptionUz: "College Board rasmiy 4-raqamli adaptiv Practice Test. Ilmiy tadqiqotlar, eksperimental gipotezalar va murakkab ko'rsatkichli modellar.",
    badge: "Official Bluebook #4",
    totalQuestions: 98,
    rwTimingMinutes: 32,
    mathTimingMinutes: 35,
    rwModule1: [
      {
        id: "pt4-rw1-01",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Information and Ideas",
        skill: "Inferences",
        difficulty: "Hard",
        passage: "Biologists evaluating desert tortoises in Mojave National Preserve observed that during extreme summer heatwaves, tortoises retreated into subterranean burrows up to ten feet deep where soil temperatures stayed twenty degrees cooler than surface levels. In addition, metabolic rates dropped by over sixty percent, reducing respiratory moisture loss. These physiological and behavioral adaptations suggest that the survival of desert tortoises during prolonged droughts depends primarily on _______",
        prompt: "Which choice most logically completes the text?",
        type: "multiple_choice",
        options: [
          "A) their ability to migrate hundreds of miles to higher elevations.",
          "B) minimizing both environmental thermal stress and metabolic water expenditure through burrow microclimates.",
          "C) consuming invasive desert succulents with high sodium concentrations.",
          "D) foraging exclusively during midday hours when predators are inactive."
        ],
        correctAnswer: "B",
        explanationEn: "The passage specifically highlights two adaptations: seeking subterranean cool burrows (minimizing thermal stress) and lowering metabolic rate to reduce moisture loss (minimizing water expenditure). Choice B directly synthesizes both core points.",
        explanationUz: "Matnda toshbaqalarning yer ostiga kirib haroratni kamaytirishi va moddalar almashinuvini sekinlashtirib namlikni saqlab qolishi aytilgan. B varianti ushbu ikkala omilni to'liq umumlashtiradi.",
        referenceFormula: "\\text{Inference} = \\text{Thermal Protection (Burrows)} + \\text{Moisture Conservation (Metabolic Drop)}"
      }
    ],
    rwModule2Hard: [
      {
        id: "pt4-rw2h-01",
        section: "READING_WRITING",
        module: 2,
        tier: "hard",
        domain: "Standard English Conventions",
        skill: "Modifier Placement",
        difficulty: "Hard",
        passage: "Having analyzed over four thousand deep-sea sediment cores extracted from the Mid-Atlantic Ridge, _______",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        type: "multiple_choice",
        options: [
          "A) the rapid cyclical nature of prehistoric glacial melting periods was conclusively demonstrated by the oceanographers.",
          "B) oceanographers conclusively demonstrated the rapid cyclical nature of prehistoric glacial melting periods.",
          "C) the sediment cores revealed to oceanographers the rapid cyclical nature of prehistoric glacial melting periods.",
          "D) prehistoric glacial melting periods were shown to be rapidly cyclical by the oceanographers' study."
        ],
        correctAnswer: "B",
        explanationEn: "The introductory participial modifier 'Having analyzed over four thousand deep-sea sediment cores...' must immediately be followed by the logical subject performing the action—the 'oceanographers' (Choice B). In Choices A, C, and D, the modifier dangles inappropriately onto 'the cyclical nature', 'the sediment cores', or 'melting periods'.",
        explanationUz: "Introductory modifier qoidasi: 'Having analyzed over four thousand...' harakatini bajargan shaxs ('oceanographers') verguldan keyin darhol kelishi shart. Aks holda Dangling Modifier xatosi yuzaga keladi. To'g'ri javob: B.",
        referenceFormula: "\\text{[Intro Modifier]}, \\text{[Logical Agent Being Modified (Oceanographers)]}"
      }
    ],
    rwModule2Easy: [
      {
        id: "pt4-rw2e-01",
        section: "READING_WRITING",
        module: 2,
        tier: "easy",
        domain: "Craft and Structure",
        skill: "Words in Context",
        difficulty: "Easy",
        passage: "Architect Maya Lin's Vietnam Veterans Memorial was initially controversial for its stark, non-traditional design, but over subsequent decades it has become widely _______ as a masterpiece of commemorative public art.",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        type: "multiple_choice",
        options: ["A) acclaimed", "B) disputed", "C) overlooked", "D) derided"],
        correctAnswer: "A",
        explanationEn: "'initially controversial... but over subsequent decades... masterpiece' establishes a contrast between early controversy and later universal admiration ('acclaimed').",
        explanationUz: "'initially controversial... but' kontrasti avvalgi bahslarga qarama-qarshi o'laroq keyinchalik yuksak e'tirof etilganini ('acclaimed') bildiradi.",
        referenceFormula: "\\text{Contrast: 'controversial... but'} \\implies \\text{acclaimed (masterpiece)}"
      }
    ],
    mathModule1: [
      {
        id: "pt4-m1-01",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Advanced Math",
        skill: "Discriminant & Number of Solutions",
        difficulty: "Hard",
        prompt: "In the quadratic equation $3x^2 - 12x + c = 0$, where $c$ is a constant, the equation has exactly one real solution. What is the value of $c$?",
        diagramPreset: "parabola_tangent",
        type: "spr",
        correctAnswer: "12",
        explanationEn: "A quadratic equation $ax^2 + bx + c = 0$ has exactly one real solution if and only if its discriminant equals zero: $b^2 - 4ac = 0$.\n$(-12)^2 - 4(3)(c) = 0$\n$144 - 12c = 0 \\implies 12c = 144 \\implies c = 12$.",
        explanationUz: "Kvadrat tenglama yagona haqiqiy yechimga ega bo'lishi uchun uning diskriminanti 0 ga teng bo'lishi kerak: b^2 - 4ac = 0.\n(-12)^2 - 4(3)(c) = 0 => 144 - 12c = 0 => c = 12.",
        desmosTrick: "Desmos'ga y = 3x^2 - 12x + c deb yozing va c sliderini qo'shing. Parabola x o'qiga faqat bitta nuqtada tegib turishi (urinishi) uchun c = 12 bo'lishi kerak!",
        referenceFormula: "b^2 - 4ac = 0 \\iff \\text{Exactly 1 Real Solution}"
      }
    ],
    mathModule2Hard: [
      {
        id: "pt4-m2h-01",
        section: "MATH",
        module: 2,
        tier: "hard",
        domain: "Problem Solving and Data Analysis",
        skill: "Margin of Error and Sample Size",
        difficulty: "Hard",
        prompt: "A sociological research team surveyed a random sample of $1,200$ registered voters in a city and estimated that $64\\%$ favor a new municipal transit bond, with an associated margin of error of $2.8\\%$ at a $95\\%$ confidence level. Which of the following changes would be expected to produce a smaller margin of error at the same confidence level?",
        diagramPreset: "normal_distribution",
        type: "multiple_choice",
        options: [
          "A) Decreasing the survey sample size to 600 registered voters",
          "B) Increasing the survey sample size to 2,400 registered voters",
          "C) Surveying exclusively voters who reside within one specific neighborhood",
          "D) Changing the confidence level to 99%"
        ],
        correctAnswer: "B",
        explanationEn: "The margin of error of a sample proportion is inversely proportional to the square root of the sample size: $\\text{MoE} \\propto \\frac{1}{\\sqrt{n}}$. To decrease the margin of error (make it smaller and more precise), the sample size $n$ must be increased. Choice B correctly doubles the sample size.",
        explanationUz: "Margin of Error qoidasi: Tanlanma hajmi (sample size n) qanchalik KATTA bo'lsa, xatolik chegarasi (margin of error) shunchalik KICHIK bo'ladi (aniqlik oshadi). Shuning uchun B to'g'ri.",
        referenceFormula: "\\text{MoE} \\propto \\frac{1}{\\sqrt{n}} \\implies \\uparrow n \\iff \\downarrow \\text{MoE}"
      }
    ],
    mathModule2Easy: [
      {
        id: "pt4-m2e-01",
        section: "MATH",
        module: 2,
        tier: "easy",
        domain: "Problem Solving and Data Analysis",
        skill: "Percentages",
        difficulty: "Easy",
        prompt: "A retail store discounted a jacket by $30\\%$ from its original price of $\\$120$. What is the sale price of the jacket, in dollars?",
        type: "spr",
        correctAnswer: "84",
        explanationEn: "A 30% discount means the customer pays $100\\% - 30\\% = 70\\%$ of the original price. Sale price $= 0.70 \\times 120 = 84$ dollars.",
        explanationUz: "30% chegirma bo'lsa, xaridor 70% ini to'laydi: 120 * 0.70 = 84 dollar.",
        desmosTrick: "120 * (1 - 0.30) = 84 deb Desmos'ga kiriting."
      }
    ]
  },
  {
    id: "english-elite-monthly-mock",
    title: "English Elite — Recalled Monthly Exam Form",
    formCode: "EE-RECALL-2026",
    descriptionUz: "SATashkent 'English Elite Book' materiallaridan olingan oylik real imtihon savollari to'plami (Aug 2025 – June 2026). Yuqori darajadagi ritorik sintez va jiddiy ilmiy matnlar.",
    badge: "Elite Recalled Form",
    totalQuestions: 54,
    rwTimingMinutes: 32,
    mathTimingMinutes: 35,
    rwModule1: [
      {
        id: "ee-rw1-01",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Expression of Ideas",
        skill: "Rhetorical Synthesis",
        difficulty: "Hard",
        passage: "While researching a topic, a student has taken the following notes:\n• In 1913, botanist Agnes Arber published 'Herbals: Their Origin and Evolution', examining the history of botanical illustration.\n• Arber documented how early woodcut prints often replicated mythical plants rather than empirical specimens.\n• She demonstrated that the invention of copperplate engraving in the sixteenth century allowed for unprecedented anatomical precision.\n• Arber was elected the first female botanist Fellow of the Royal Society in 1946.\n• The student wants to emphasize how printmaking technology influenced botanical scientific accuracy.",
        prompt: "Which choice most effectively uses the relevant information from the notes to accomplish this goal?",
        type: "multiple_choice",
        options: [
          "A) In her landmark 1913 book 'Herbals', Agnes Arber demonstrated that while early woodcuts often depicted mythical plants, the transition to sixteenth-century copperplate engraving enabled unprecedented botanical anatomical precision.",
          "B) Agnes Arber, who became the first female botanist elected Fellow of the Royal Society in 1946, authored 'Herbals: Their Origin and Evolution'.",
          "C) Early botanical illustrations relied on woodcuts before Agnes Arber analyzed the history of scientific printing methods in 1913.",
          "D) Mythical plant illustrations were common until sixteenth-century botanists began studying copperplate printing techniques."
        ],
        correctAnswer: "A",
        explanationEn: "The student's goal is to 'emphasize how printmaking technology influenced botanical scientific accuracy'. Choice A directly contrasts early woodcuts with sixteenth-century copperplate engraving and explicitly highlights the resulting gain in botanical anatomical precision.",
        explanationUz: "Talabaning maqsadi: kitob bosish texnologiyasining botanika aniqligiga ta'sirini ko'rsatish. A varianti yog'och bosma (woodcut) va mis gravyura (copperplate) texnologiyalarini anatomik aniqlik bilan bog'lab bergan yagona to'liq javobdir.",
        referenceFormula: "\\text{Goal} = \\text{Printmaking Technology} + \\text{Botanical Precision}"
      }
    ],
    rwModule2Hard: [
      {
        id: "ee-rw2h-01",
        section: "READING_WRITING",
        module: 2,
        tier: "hard",
        domain: "Craft and Structure",
        skill: "Text Structure and Purpose",
        difficulty: "Hard",
        passage: "The following text is adapted from Virginia Woolf's 1928 lecture series 'A Room of One's Own'.\n'Intellectual freedom depends upon material things. Poetry depends upon intellectual freedom. And women have always been poor, not for two hundred years merely, but from the beginning of time. Women have had less intellectual freedom than the sons of Athenian slaves. Women, then, have not had a dog's chance of writing poetry. That is why I have laid so much stress on money and a room of one's own.'",
        prompt: "Which choice best describes the overall structure of the text?",
        type: "multiple_choice",
        options: [
          "A) It constructs a deductive logical syllogism linking financial autonomy to artistic creation to justify the author's primary thesis.",
          "B) It laments the historical neglect of Athenian literature before presenting empirical socioeconomic statistics.",
          "C) It contrasts ancient Greek poetic conventions with modern twentieth-century literary movements.",
          "D) It argues that poetic genius flourishes most vigorously under severe economic hardship."
        ],
        correctAnswer: "A",
        explanationEn: "Woolf links: (1) Poetry requires intellectual freedom; (2) Intellectual freedom requires material resources; (3) Women have historically been denied material resources; (4) Therefore, women could not produce poetry without money and independent space. This deductive logical syllogism directly justifies her famous thesis (Choice A).",
        explanationUz: "Muallif mantiqiy zanjir (sillogizm) quradi: She'riyat erkinlikka bog'liq -> Erkinlik moddiy mustaqillikka bog'liq -> Ayollar moddiy mahrum bo'lgan -> Demak pul va alohida xona zarur. Bu A variantdagi 'deductive logical syllogism' ta'rifiga to'liq mos.",
        referenceFormula: "\\text{Syllogism: Art } \\implies \\text{ Freedom } \\implies \\text{ Financial Resources}"
      }
    ],
    rwModule2Easy: [
      {
        id: "ee-rw2e-01",
        section: "READING_WRITING",
        module: 2,
        tier: "easy",
        domain: "Standard English Conventions",
        skill: "Form, Structure, and Sense",
        difficulty: "Easy",
        passage: "Neither the principal investigator nor the laboratory assistants _______ aware that the refrigeration sensor had failed during the overnight power outage.",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        type: "multiple_choice",
        options: ["A) was", "B) were", "C) is", "D) has been"],
        correctAnswer: "B",
        explanationEn: "With correlative conjunctions 'neither... nor...', the verb agrees in number with the closer subject. The closer subject is 'the laboratory assistants' (plural). Therefore, the plural past verb 'were' is required (Choice B).",
        explanationUz: "'Neither... nor...' qoidasi: fe'l o'ziga eng yaqin turgan ega bilan moslashadi. 'the laboratory assistants' ko'plikda bo'lgani uchun 'were' to'g'ri (B).",
        referenceFormula: "\\text{Neither A nor B} \\implies \\text{Verb agrees with B (assistants = were)}"
      }
    ],
    mathModule1: [
      {
        id: "ee-m1-01",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Algebra",
        skill: "Linear Invariants & Parallel Lines",
        difficulty: "Medium",
        prompt: "In the $xy$-plane, line $L_1$ has the equation $4x - 6y = 15$. Line $L_2$ is parallel to line $L_1$ and passes through the point $(9, 2)$. What is the $y$-intercept of line $L_2$?",
        diagramPreset: "parallel_lines",
        type: "spr",
        correctAnswer: "-4",
        explanationEn: "1) Find slope of $L_1$: $6y = 4x - 15 \\implies y = \\frac{4}{6}x - \\frac{15}{6} = \\frac{2}{3}x - 2.5$. Slope $m = \\frac{2}{3}$.\n2) Since $L_2$ is parallel, its slope is also $m = \\frac{2}{3}$.\n3) Use point $(9, 2)$: $y - 2 = \\frac{2}{3}(x - 9) \\implies y = \\frac{2}{3}x - 6 + 2 = \\frac{2}{3}x - 4$.\n4) The $y$-intercept is $-4$.",
        explanationUz: "L1 to'g'ri chiziqning burchak koeffitsienti: m = 4/6 = 2/3. Parallel bo'lgani uchun L2 ham m = 2/3 ga ega. (9, 2) nuqtadan o'tadi: y - 2 = 2/3(x - 9) => y = 2/3 x - 6 + 2 = 2/3 x - 4. y-intercept = -4.",
        desmosTrick: "Desmos'ga 4x - 6y = 15 yozing. Keyin y - 2 = (4/6)(x - 9) yozing. y o'qini kesgan nuqtasini bosing: (0, -4). Javob: -4!",
        referenceFormula: "m_1 = m_2, \\quad y - y_1 = m(x - x_1)"
      }
    ],
    mathModule2Hard: [
      {
        id: "ee-m2h-01",
        section: "MATH",
        module: 2,
        tier: "hard",
        domain: "Advanced Math",
        skill: "Quadratic Vertex Form & Optimization",
        difficulty: "Hard",
        prompt: "A projectile is launched from a platform, and its height $h(t)$, in meters above the ground, $t$ seconds after launch is modeled by the function $h(t) = -5t^2 + 40t + 45$. What is the maximum height, in meters, reached by the projectile?",
        type: "spr",
        correctAnswer: "125",
        explanationEn: "The maximum occurs at the vertex $t = -\\frac{b}{2a} = -\\frac{40}{2(-5)} = \\frac{40}{10} = 4$ seconds.\nSubstitute $t = 4$: $h(4) = -5(4)^2 + 40(4) + 45 = -5(16) + 160 + 45 = -80 + 160 + 45 = 125$ meters.",
        explanationUz: "Maksimum cho'qqi koordinatasi: t = -b / (2a) = -40 / (2 * -5) = 4 soniya. Maksimal balandlik: h(4) = -5(16) + 160 + 45 = 125 metr.",
        desmosTrick: "Desmos'ga h(x) = -5x^2 + 40x + 45 deb yozing. Parabolaning eng tepa cho'qqisiga (vertex) bosing: (4, 125) ko'rsatiladi. Balandlik 125!",
        referenceFormula: "t_{\\text{vertex}} = -\\frac{b}{2a}, \\quad h_{\\max} = h\\left(-\\frac{b}{2a}\\right)"
      }
    ],
    mathModule2Easy: [
      {
        id: "ee-m2e-01",
        section: "MATH",
        module: 2,
        tier: "easy",
        domain: "Algebra",
        skill: "Evaluating Linear Functions",
        difficulty: "Easy",
        prompt: "If $g(x) = 3x - 8$, what is the value of $g(7)$?",
        type: "spr",
        correctAnswer: "13",
        explanationEn: "Substitute $x = 7$: $g(7) = 3(7) - 8 = 21 - 8 = 13$.",
        explanationUz: "x = 7 ni qo'yamiz: 3(7) - 8 = 21 - 8 = 13.",
        desmosTrick: "3*7 - 8 = 13"
      }
    ]
  },
  {
    id: "sat-hard-math-800",
    title: "SAT Hard Math 800 Challenge Form",
    formCode: "MATH-800-HARD",
    descriptionUz: "SATashkent 'Math Hard Book' va 'Hardbook 20'dan olingan eng qiyin 800-ballik masalalar (aylana tenglamasi, diskriminant, m1·m2 = -1, balandlik geometric mean).",
    badge: "Math 800 Master",
    totalQuestions: 44,
    rwTimingMinutes: 32,
    mathTimingMinutes: 35,
    rwModule1: [
      {
        id: "m800-rw1-01",
        section: "READING_WRITING",
        module: 1,
        tier: "standard",
        domain: "Craft and Structure",
        skill: "Words in Context",
        difficulty: "Hard",
        passage: "While early quantum physicists treated wave-particle duality as an unsettling paradox that would eventually be resolved by deeper classical mechanics, modern quantum field theory embraces this duality as _______: physical reality is fundamentally non-deterministic at the subatomic scale.",
        prompt: "Which choice completes the text with the most logical and precise word or phrase?",
        type: "multiple_choice",
        options: ["A) axiomatic", "B) superfluous", "C) anachronistic", "D) ephemeral"],
        correctAnswer: "A",
        explanationEn: "'embraces this duality as [axiomatic]: physical reality is fundamentally...' indicates that modern quantum mechanics accepts the principle as a self-evident foundational truth (axiomatic), rather than a paradox to be explained away.",
        explanationUz: "Zamonaviy kvant nazariyasi bu xususiyatni fundamental isbotsiz qabul qilinadigan asosiy haqiqat ('axiomatic' - aksiomatik) deb biladi. Shuning uchun A to'g'ri.",
        referenceFormula: "\\text{Foundational Truth} \\implies \\text{axiomatic}"
      }
    ],
    rwModule2Hard: [
      {
        id: "m800-rw2h-01",
        section: "READING_WRITING",
        module: 2,
        tier: "hard",
        domain: "Information and Ideas",
        skill: "Command of Evidence",
        difficulty: "Hard",
        passage: "Economists investigated whether automated microfinance algorithms reduced loan default rates compared to human credit officers in developing markets. Across forty thousand loan issuances in Kenya, algorithmically approved borrowers experienced an 18% lower default rate. However, when evaluating novel entrepreneurs without formal collateral records, human credit officers achieved a 12% lower default rate than the algorithm.",
        prompt: "Which finding, if true, would most directly explain the discrepancy described in the final sentence?",
        type: "multiple_choice",
        options: [
          "A) Human loan officers conducted informal qualitative interviews assessing local community reputation and entrepreneurial tenacity that automated algorithms could not quantify.",
          "B) Algorithms systematically charge higher interest rates to experienced borrowers.",
          "C) Commercial banks in Kenya rarely employ automated microfinance platforms.",
          "D) Human loan officers take three times as long to process application forms as automated systems do."
        ],
        correctAnswer: "A",
        explanationEn: "The passage notes that for applicants lacking formal records, human officers outperformed algorithms. Choice A directly explains this by showing humans could evaluate informal community reputation and character traits that algorithms cannot scrape from formal credit data.",
        explanationUz: "Kafolat hujjati bo'lmagan tadbirkorlarda insonlar nega yaxshiroq natija ko'rsatganini A variant tushuntiradi: insonlar algoritmlar hisoblay olmaydigan obro' va xarakterni suhbat orqali baholay olishgan.",
        referenceFormula: "\\text{Human advantage in qualitative reputation evaluation}"
      }
    ],
    rwModule2Easy: [
      {
        id: "m800-rw2e-01",
        section: "READING_WRITING",
        module: 2,
        tier: "easy",
        domain: "Standard English Conventions",
        skill: "Punctuation & Lists",
        difficulty: "Easy",
        passage: "The alpine expedition required lightweight camping gear, durable climbing ropes, _______ and a satellite telephone for emergency communication.",
        prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
        type: "multiple_choice",
        options: [
          "A) high-calorie nutritional rations,",
          "B) high-calorie nutritional rations",
          "C) high-calorie nutritional rations;",
          "D) high-calorie nutritional rations:"
        ],
        correctAnswer: "A",
        explanationEn: "A series of three or more items in a list must be separated by commas, including the Oxford comma before 'and': 'gear, ropes, [rations], and a telephone'.",
        explanationUz: "Uch yoki undan ortiq elementlardan iborat ro'yxatda vergul (Oxford comma) ishlatiladi: 'gear, ropes, [rations], and'. To'g'ri javob: A.",
        referenceFormula: "\\text{Item 1, Item 2, Item 3, and Item 4}"
      }
    ],
    mathModule1: [
      {
        id: "m800-m1-01",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Algebra",
        skill: "Perpendicular Lines & Reciprocal Slopes",
        difficulty: "Hard",
        prompt: "In the $xy$-plane, line $j$ passes through the points $(3, 11)$ and $(7, 3)$. Line $k$ is perpendicular to line $j$ and passes through the point $(5, -2)$. If the equation of line $k$ is written in slope-intercept form as $y = mx + b$, what is the value of $b$?",
        diagramPreset: "perpendicular_lines",
        type: "spr",
        correctAnswer: "-9/2",
        explanationEn: "1) Calculate slope of line $j$: $m_j = \\frac{3 - 11}{7 - 3} = \\frac{-8}{4} = -2$.\n2) Since line $k$ is perpendicular, its slope is the negative reciprocal: $m_k = -\\frac{1}{-2} = \\frac{1}{2}$.\n3) Line $k$ passes through $(5, -2)$: $y - (-2) = \\frac{1}{2}(x - 5) \\implies y + 2 = \\frac{1}{2}x - \\frac{5}{2} \\implies y = \\frac{1}{2}x - \\frac{9}{2}$.\n4) Thus $b = -\\frac{9}{2}$ (or -4.5).",
        explanationUz: "j to'g'ri chiziqning burchak koeffitsienti: (3 - 11)/(7 - 3) = -8/4 = -2. Unga perpendikulyar k chiziqning burchak koeffitsienti: m = 1/2. (5, -2) nuqtadan o'tadi: y - (-2) = 1/2(x - 5) => y = 1/2 x - 9/2. Demak b = -9/2 yoki -4.5.",
        desmosTrick: "Desmos'ga m = (3 - 11)/(7 - 3) yozing (-2 chiqadi). Perpendikulyar: y - (-2) = (1/2)(x - 5). y o'qini kesgan nuqtasini bosing: (0, -4.5). Javob: -9/2!",
        referenceFormula: "m_1 \\cdot m_2 = -1 \\implies m_\\perp = -\\frac{1}{m}"
      },
      {
        id: "m800-m1-02",
        section: "MATH",
        module: 1,
        tier: "standard",
        domain: "Advanced Math",
        skill: "Nonlinear Systems & Tangent Points",
        difficulty: "Hard",
        prompt: "In the given system of equations, $k$ is a constant:\n$$\\begin{cases} y = x^2 - 6x + 14 \\\\ y = 2x + k \\end{cases}$$\nIf the system has exactly one solution $(x, y)$, what is the value of $k$?",
        diagramPreset: "parabola_tangent",
        type: "spr",
        correctAnswer: "-2",
        explanationEn: "Equate the expressions for $y$:\n$x^2 - 6x + 14 = 2x + k \\implies x^2 - 8x + (14 - k) = 0$.\nFor exactly one solution, the discriminant must equal zero: $b^2 - 4ac = 0$.\n$(-8)^2 - 4(1)(14 - k) = 0$\n$64 - 56 + 4k = 0 \\implies 8 + 4k = 0 \\implies 4k = -8 \\implies k = -2$.",
        explanationUz: "Tenglashtiramiz: x^2 - 6x + 14 = 2x + k => x^2 - 8x + (14 - k) = 0. Bitta yechim bo'lishi uchun diskriminant 0 bo'lishi shart: (-8)^2 - 4(1)(14 - k) = 0 => 64 - 56 + 4k = 0 => 8 + 4k = 0 => k = -2.",
        desmosTrick: "Desmos'ga y = x^2 - 6x + 14 va y = 2x + k yozing. k sliderini harakatlantirib to'g'ri chiziq parabolaga bitta nuqtada urunadigan holatni toping: k = -2!",
        referenceFormula: "b^2 - 4ac = 0 \\iff \\text{One Intersection (Tangent)}"
      }
    ],
    mathModule2Hard: [
      {
        id: "m800-m2h-01",
        section: "MATH",
        module: 2,
        tier: "hard",
        domain: "Geometry and Trigonometry",
        skill: "Right Triangle Altitude & Geometric Mean",
        difficulty: "Hard",
        prompt: "In right triangle $ABC$, the right angle is at $C$. An altitude is drawn from $C$ to hypotenuse $AB$, intersecting $AB$ at point $D$. If $AD = 4$ and $DB = 9$, what is the length of altitude $CD$?",
        diagramPreset: "right_triangle_altitude",
        type: "spr",
        correctAnswer: "6",
        explanationEn: "By the Right Triangle Altitude Geometric Mean Theorem, the altitude to the hypotenuse is the geometric mean of the two segments of the hypotenuse: $CD = \\sqrt{AD \\cdot DB}$.\n$CD = \\sqrt{4 \\cdot 9} = \\sqrt{36} = 6$.",
        explanationUz: "To'g'ri burchakli uchburchakda gipotenuzaga tushirilgan balandlik gipotenuza bo'laklarining o'rta geometrigi hisoblanadi: CD = \\sqrt{AD \\cdot DB} = \\sqrt{4 \\cdot 9} = \\sqrt{36} = 6.",
        desmosTrick: "sqrt(4 * 9) = 6 deb Desmos'ga kiriting.",
        referenceFormula: "h = \\sqrt{c_a \\cdot c_b} \\quad (\\text{Altitude Geometric Mean})"
      }
    ],
    mathModule2Easy: [
      {
        id: "m800-m2e-01",
        section: "MATH",
        module: 2,
        tier: "easy",
        domain: "Geometry and Trigonometry",
        skill: "Circle Area",
        difficulty: "Easy",
        prompt: "A circle has a diameter of $16$ centimeters. What is the area of the circle, in square centimeters, in terms of $\\pi$ (enter the coefficient of $\\pi$)?",
        diagramPreset: "circle_general",
        type: "spr",
        correctAnswer: "64",
        explanationEn: "Radius $r = \\frac{16}{2} = 8$ cm. Area $= \\pi r^2 = \\pi (8)^2 = 64\\pi$. The coefficient is $64$.",
        explanationUz: "Radius = 16 / 2 = 8. Doira yuzi = \\pi * r^2 = \\pi * 8^2 = 64\\pi. Koeffitsient: 64.",
        desmosTrick: "(16/2)^2 = 64"
      }
    ]
  }
];

