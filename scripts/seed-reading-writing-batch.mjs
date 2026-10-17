import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://kaizo:2009@localhost:5432/vespera",
});

const rwQuestions = [
  // --- ENG-CRO: Cross-Text Connections (SAToplam Reading Book) ---
  {
    id: "q_satoplam_rw_cro_01",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    topic_code: "ENG-CRO",
    difficulty: "Hard",
    prompt: "Text 1\nHistorians have long argued that early medieval iron bloomery technology was fundamentally inefficient, yielding low-grade wrought iron that required labor-intensive forging to expel trapped slag impurities. Consequently, the scale of military armament production in ninth-century Scandinavia was presumed to have been severely constrained by metallurgical limitations.\n\nText 2\nRecent trace-element spectrometry of eighth- and ninth-century spearheads discovered near Hedeby reveals an extraordinarily homogeneous crystalline matrix with slag inclusions under 1.2% by volume. These findings demonstrate that Norse metallurgists possessed sophisticated thermal control techniques—manipulating blast furnace airflow via dual-chambered bellows—capable of producing high-carbon steel comparable to crucible iron from Damascus.\n\nBased on the texts, how would the author of Text 2 most likely respond to the historical consensus described in Text 1?",
    options: JSON.stringify([
      "A. By acknowledging that while forging was labor-intensive, it nonetheless produced superior weapons.",
      "B. By contending that physical evidence contradicts the assumption that metallurgical limitations curtailed weapon production quality.",
      "C. By arguing that Hedeby was an atypical trade emporium that imported all of its steel from the Near East.",
      "D. By suggesting that Scandinavian smiths prioritized spearhead aesthetics over structural durability."
    ]),
    correct_answer: "B",
    explanation_en: "Text 1 states that medieval bloomery was presumed 'fundamentally inefficient' and 'severely constrained' armament production. Text 2 presents physical archaeological findings (trace-element spectrometry) showing Norse metallurgists had sophisticated thermal control producing high-carbon steel with minimal slag. Thus, the author of Text 2 directly challenges the traditional consensus cited in Text 1 by showing physical evidence contradicts the presumed limitations (Choice B). Source: SAToplam Reading Book.",
    explanation_uz: "1-matnda qadimgi temirchilik texnologiyasi past sifatli bo'lgan deb taxmin qilingan. 2-matn esa eng yangi spektral tahlillar orqali Skandinaviya temirchilari yuqori uglerodli po'lat ishlab chiqarganini isbotlaydi. Demak, 2-matn muallifi 1-matndagi an'anaviy taxminni rad etadi (B). Manba: SAToplam Reading Book.",
    desmos_trick: "Cross-text synthesis: identify the core claim in Text 1 (inefficient metallurgy), then identify how Text 2 refutes it with empirical spectrometry data.",
    desmos_latex: null,
    reference_formula: "Text 2 Evidence contradicts Text 1 Consensus"
  },
  {
    id: "q_satoplam_rw_cro_02",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    topic_code: "ENG-CRO",
    difficulty: "Hard",
    prompt: "Text 1\nClassical economic theory posits that consumer choices are governed by utility maximization: individuals systematically weigh marginal costs against expected benefits before arriving at an equilibrium decision. When faced with an expanding array of product options, rational consumers should experience greater welfare, as the probability of locating an optimal match increases monotonically.\n\nText 2\nPsychologist Barry Schwartz and behavioral economists have documented that extensive choice menus frequently induce 'choice paralysis' and elevated post-purchase regret. When subject to hundreds of permutations, the cognitive burden of evaluating marginal trade-offs overwhelms executive working memory, causing individuals to either abandon the purchase entirely or report diminished satisfaction with their ultimate selection.\n\nBased on the texts, how does Text 2 complicate the perspective advanced in Text 1?",
    options: JSON.stringify([
      "A. It establishes that consumers are incapable of understanding basic pricing mechanisms.",
      "B. It demonstrates that expanding choice sets can paradoxically decrease consumer welfare by imposing excessive cognitive burdens.",
      "C. It proves that utility maximization applies exclusively to non-commercial financial decisions.",
      "D. It confirms that consumers invariably select the lowest-priced alternative when confused."
    ]),
    correct_answer: "B",
    explanation_en: "Text 1 asserts that more choices monotonically increase consumer welfare under rational utility maximization. Text 2 introduces empirical behavioral evidence that extensive choices cause 'choice paralysis', regret, and cognitive overload, leading to diminished satisfaction. Hence, Text 2 shows that expanding choice sets paradoxically decreases welfare (Choice B). Source: SAToplam Reading Book.",
    explanation_uz: "1-matn tanlov ko'p bo'lsa inson manfaati oshadi deb ta'kidlaydi. 2-matn esa psixologik tadqiqotlar asosida ortiqcha tanlov inson miyasini charchatib, qoniqishni pasaytirishini (paradoks) ko'rsatadi (B). Manba: SAToplam Reading Book.",
    desmos_trick: "Identify paradox: Text 1 says 'more options = more welfare', Text 2 shows 'more options = cognitive overload and lower satisfaction'.",
    desmos_latex: null,
    reference_formula: "Paradox of Choice Heuristic"
  },

  // --- ENG-CDE: Command of Evidence (SAToplam Reading Book) ---
  {
    id: "q_satoplam_rw_cde_01",
    section: "READING_WRITING",
    domain: "Information and Ideas",
    topic_code: "ENG-CDE",
    difficulty: "Hard",
    prompt: "In paleoclimatological studies, the ratio of stable carbon isotopes (delta-13C) trapped in ancient ice core bubbles serves as an indicator of terrestrial biomass productivity. Ecologist Dr. Elena Vance hypothesized that the Younger Dryas cooling event (approx. 12,900 years ago) triggered an abrupt, global contraction of peatlands and boreal forests, which in turn caused a sudden positive shift in atmospheric delta-13C values due to diminished photosynthetic discrimination.\n\nWhich finding from Antarctic and Greenland ice core analyses, if true, would most directly support Dr. Vance's hypothesis?",
    options: JSON.stringify([
      "A. Ice samples dated to 14,000 years ago exhibit stable carbon isotope ratios identical to modern pre-industrial benchmarks.",
      "B. Methane concentrations in Greenland ice cores increased by 25% during the apex of the Younger Dryas interval.",
      "C. High-resolution Antarctic ice cores dated to 12,900 years ago display a rapid, statistically significant spike in delta-13C coincident with pollen-record evidence of boreal forest retreat.",
      "D. Marine sediment cores from the North Atlantic show an increase in ice-rafted debris between 13,500 and 12,000 years ago."
    ]),
    correct_answer: "C",
    explanation_en: "Dr. Vance's hypothesis specifically claims that the Younger Dryas (12,900 years ago) triggered a forest contraction causing an abrupt positive shift (spike) in atmospheric delta-13C. Choice C directly provides this exact empirical finding: a rapid spike in delta-13C at 12,900 years ago accompanied by pollen evidence of forest retreat. Source: SAToplam Reading Book.",
    explanation_uz: "Doktor Vens gipotezasi 12,900 yil avval delta-13C qiymatida keskin ijobiy sakrash bo'lganini taxmin qiladi. C varianti aynan shu 12,900 yillik qatlamda delta-13C sakrashi va o'rmonlar qisqarishi qayd etilganini tasdiqlovchi to'g'ridan-to'g'ri dalildir.",
    desmos_trick: "Evidence matching: link hypothesis mechanism (12,900 yr, forest retreat, delta-13C spike) directly to Choice C.",
    desmos_latex: null,
    reference_formula: "Empirical Hypothesis Verification"
  },
  {
    id: "q_satoplam_rw_cde_02",
    section: "READING_WRITING",
    domain: "Information and Ideas",
    topic_code: "ENG-CDE",
    difficulty: "Hard",
    prompt: "Marine biologist Dr. Kevin Patel studied the symbiotic relationship between hydrothermal vent tube worms (*Riftia pachyptila*) and chemosynthetic sulfur-oxidizing bacteria. Because hydrothermal vent plumes vary widely in hydrogen sulfide (H2S) concentration, Patel hypothesized that tube worm colony density is limited not by spatial seabed area, but strictly by the ambient flux rate of dissolved sulfur compounds available for bacterial nourishment.\n\nWhich finding, if true, would most strongly support Patel's hypothesis?",
    options: JSON.stringify([
      "A. Vent sites with expansive basaltic terrain but low hydrothermal sulfur venting maintain sparse, stunted tube worm colonies.",
      "B. Tube worm colonies reproduce primarily during seasonal shifts in ocean surface temperatures.",
      "C. Predators such as vent crabs and zoarcid fish feed exclusively on the exposed red plumes of adult worms.",
      "D. Hydrothermal vent water temperatures remain constant at 350°C regardless of geographic depth."
    ]),
    correct_answer: "A",
    explanation_en: "Patel's hypothesis asserts that tube worm density is NOT limited by seabed area, but STRICTLY by dissolved sulfur flux. Choice A demonstrates that even when seabed area is expansive ('expansive basaltic terrain'), low sulfur flux results in sparse, stunted colonies—directly isolating sulfur flux as the true limiting factor. Source: SAToplam Reading Book.",
    explanation_uz: "Patel koloniyaning zichligi joy (maydon) kattaligiga emas, balki sulfid oqimiga bog'liq degan gipotezani ilgari surdi. A varianti keng maydon bo'lsa ham, sulfid kam bo'lsa qurtlar siyrak va nimjon bo'lishini ko'rsatib, gipotezani to'liq tasdiqlaydi.",
    desmos_trick: "Control variable analysis: large area + low sulfur = small population proves sulfur is the independent constraint.",
    desmos_latex: null,
    reference_formula: "Limiting Factor Isolation"
  },

  // --- ENG-INF: Logical Inferences (SAToplam Reading Book) ---
  {
    id: "q_satoplam_rw_inf_01",
    section: "READING_WRITING",
    domain: "Information and Ideas",
    topic_code: "ENG-INF",
    difficulty: "Hard",
    prompt: "During prolonged droughts, vascular plants transport water through xylem conduits under severe negative pressure (tension). If this water column tension exceeds the mechanical threshold of the vessel walls or the air-seeding threshold of pit membranes, cavitation occurs: microscopic air bubbles enter the conduit, causing an acoustic shockwave and forming an embolism that blocks fluid transport. Botanist Dr. Aris Thorne discovered that Mediterranean maquis shrubs subjected to intense thermal stress emit distinct ultrasonic acoustic clicks that multiply exponentially just prior to branch desiccation. Because surviving shrubs rapidly synthesize low-molecular-weight xylem surfactants that stabilize the liquid-vapor interface, Thorne concluded that ______\n\nWhich choice most logically completes the text?",
    options: JSON.stringify([
      "A. acoustic emissions are caused exclusively by the physical fracturing of lignin in bark tissues rather than cavitation.",
      "B. the biochemical production of surfactants functions as an adaptive defense against runaway xylem embolism during critical drought stress.",
      "C. Mediterranean maquis shrubs will permanently replace all broadleaf forest ecosystems within twenty years.",
      "D. plants with larger xylem vessels are immune to drought-induced cavitation acoustic emissions."
    ]),
    correct_answer: "B",
    explanation_en: "The text explains: 1) Cavitation produces acoustic clicks due to embolism blocking water transport; 2) Surfactants stabilize the liquid-vapor interface; 3) Surviving shrubs synthesize these surfactants just as clicks multiply. Logically, the surfactants serve to stabilize the interface and prevent lethal, runaway embolisms (Choice B). Source: SAToplam Reading Book.",
    explanation_uz: "Matnda qurg'oqchilikda kavitatsiya pufakchalari suv oqimini to'sib qo'yishi, lekin omon qolgan butalar suyuqlik yuzasini barqarorlashtiruvchi surfaktantlar ishlab chiqarishi aytiladi. Mantiqiy xulosa: bu moddalar halokatli emboliyaning oldini oluvchi himoya mexanizmidir (B).",
    desmos_trick: "Inference anchor: match the survival mechanism (surfactants stabilize interface) to prevention of catastrophic embolism.",
    desmos_latex: null,
    reference_formula: "Logical Embolism Prevention Invariant"
  },

  // --- ENG-WIC: Words in Context (Vocabook 3.0 & English Elite Book) ---
  {
    id: "q_vocabook_rw_wic_01",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    topic_code: "ENG-WIC",
    difficulty: "Hard",
    prompt: "In observational astronomy, Fast Radio Bursts (FRBs) represent exceptionally ______ phenomena: lasting a mere few milliseconds, these colossal pulses of coherent radio emission discharge more energy than the Sun generates over several decades before vanishing entirely into cosmic silence.",
    options: JSON.stringify([
      "A. immutable",
      "B. ephemeral",
      "C. perfunctory",
      "D. mundane"
    ]),
    correct_answer: "B",
    explanation_en: "The colon introduces the clue: 'lasting a mere few milliseconds... before vanishing entirely'. 'Ephemeral' means lasting for a very short time; fleeting or transient. 'Immutable' means unchangeable; 'perfunctory' means carried out with minimal effort; 'mundane' means ordinary. Only 'ephemeral' matches (Choice B). Source: Vocabook 3.0 (Page 42, Set 4).",
    explanation_uz: "Matnda portlash bir necha millisekund davom etishi ('lasting a mere few milliseconds') va darhol g'oyib bo'lishi aytilgan. Bu juda qisqa umr ko'ruvchi, o'tkinchi degan ma'nodagi 'ephemeral' so'ziga to'liq mos keladi (B). Manba: Vocabook 3.0.",
    desmos_trick: "Context clue: 'lasting a mere few milliseconds... vanishing entirely' = ephemeral (fleeting).",
    desmos_latex: null,
    reference_formula: "Contextual Connotation Matching"
  },
  {
    id: "q_vocabook_rw_wic_02",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    topic_code: "ENG-WIC",
    difficulty: "Hard",
    prompt: "Recognizing that uncoordinated monetary tightening could ______ an acute liquidity crisis across emerging markets, central bank governors convened an emergency multilateral summit to synchronize overnight lending rate adjustments.",
    options: JSON.stringify([
      "A. precipitate",
      "B. mitigate",
      "C. belie",
      "D. vacillate"
    ]),
    correct_answer: "A",
    explanation_en: "The governors convened because uncoordinated tightening could cause or bring about a crisis. 'Precipitate' as a verb means to cause (an event, typically undesirable) to happen suddenly, unexpectedly, or prematurely. 'Mitigate' means to alleviate/lessen; 'belie' means to contradict; 'vacillate' means to waver. Only 'precipitate' fits (Choice A). Source: Vocabook 3.0 (Page 88, Set 8).",
    explanation_uz: "Hukumat vakillari shoshilinch yig'ilish o'tkazishdi, chunki noaniq choralar inqirozni keltirib chiqarishi (boshlab berishi) mumkin edi. 'Precipitate' - kutilmagan salbiy hodisani tezlashtirish/keltirib chiqarish deganidir (A). Manba: Vocabook 3.0.",
    desmos_trick: "Cause-effect verb: 'uncoordinated tightening could [cause/bring about] crisis' = precipitate.",
    desmos_latex: null,
    reference_formula: "High-Register Vocabulary Trigger"
  },
  {
    id: "q_vocabook_rw_wic_03",
    section: "READING_WRITING",
    domain: "Craft and Structure",
    topic_code: "ENG-WIC",
    difficulty: "Hard",
    prompt: "Excavating the subterranean chambers of Pompeii required ______ attention to detail: archaeologists meticulously brushed away cubic centimeters of volcanic ash with camel-hair tools to preserve the fragile plaster casts of ancient organic remains.",
    options: JSON.stringify([
      "A. fastidious",
      "B. capricious",
      "C. dogmatic",
      "D. reticent"
    ]),
    correct_answer: "A",
    explanation_en: "The clue is 'meticulously brushed away cubic centimeters... with camel-hair tools to preserve'. 'Fastidious' means very attentive to and concerned about accuracy and detail; meticulous. 'Capricious' means whimsical/unpredictable; 'dogmatic' means rigidly opinionated; 'reticent' means reserved/uncommunicative. Only 'fastidious' fits (Choice A). Source: Vocabook 3.0 (Page 112, Set 11).",
    explanation_uz: "Arxeologlar santimetrlab kulni yumshoq cho'tka bilan o'ta ehtiyotkorlik bilan tozalashgan. 'Fastidious' - mayda detallargacha nihoyatda sinchkov, ehtiyotkor demakdir (A). Manba: Vocabook 3.0.",
    desmos_trick: "Synonym matching: 'meticulous brushing with camel-hair tools' = fastidious attention.",
    desmos_latex: null,
    reference_formula: "Contextual Synonym Matching"
  },

  // --- ENG-BOU: Boundaries & Punctuation (Gramilliy & SAToplam Writing) ---
  {
    id: "q_gramilliy_rw_bou_01",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-BOU",
    difficulty: "Hard",
    prompt: "Astrophysicist Dr. Subrahmanyan Chandrasekhar determined that a white dwarf star exceeding 1.44 solar masses cannot support itself against gravitational ______ inevitably collapse into a neutron star or black hole.",
    options: JSON.stringify([
      "A. collapse; it will",
      "B. collapse, it will",
      "C. collapse it will",
      "D. collapse: and it will"
    ]),
    correct_answer: "A",
    explanation_en: "'Dr. Subrahmanyan Chandrasekhar determined that a white dwarf star exceeding 1.44 solar masses cannot support itself against gravitational collapse' is an independent clause, and 'it will inevitably collapse...' is a second independent clause. Joining two independent clauses requires either a semicolon (;) or a comma + coordinating conjunction. Choice B is a comma splice. Choice C is a run-on. Choice D uses a colon followed unnecessarily by 'and'. Choice A correctly joins the independent clauses with a semicolon. Source: Gramilliy (Chapter III, Page 22).",
    explanation_uz: "Ikkita to'liq mustaqil gap (independent clause) mavjud. Ularni faqat vergul bilan bog'lab bo'lmaydi (comma splice). Semicolon (nuqtali vergul) ikkita mustaqil gapni to'g'ri ajratadi (A). Manba: Gramilliy.",
    desmos_trick: "3x1 Tactic from Gramilliy: Eliminate comma splice (B), run-on (C), and colon+and (D). Semicolon (A) is the sole valid boundary.",
    desmos_latex: null,
    reference_formula: "Independent Clause + Semicolon + Independent Clause"
  },
  {
    id: "q_gramilliy_rw_bou_02",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-BOU",
    difficulty: "Hard",
    prompt: "During the late nineteenth century, botanist George Washington Carver revolutionized Southern agriculture by introducing an innovative method of crop ______ farmers alternating soil-depleting cotton with nitrogen-fixing peanuts and sweet potatoes to restore mineral balance.",
    options: JSON.stringify([
      "A. rotation;",
      "B. rotation:",
      "C. rotation,",
      "D. rotation"
    ]),
    correct_answer: "B",
    explanation_en: "The clause preceding the punctuation is an independent clause ('botanist George Washington Carver revolutionized Southern agriculture by introducing an innovative method of crop rotation'). What follows is an explanatory noun phrase with a participial modifier explaining what the innovative method was ('farmers alternating soil-depleting cotton...'). A colon (:) is the correct punctuation to introduce an explanation, elaboration, or definition following a complete independent clause (Choice B). Source: Gramilliy (Chapter III, Page 25).",
    explanation_uz: "Oldingi qism mustaqil to'liq gap. Undan keyin esa o'sha usul nimadan iborat ekanligi tushuntirilmoqda. Mustaqil gapdan keyin izoh yoki tafsilot berish uchun ikki nuqta (:) ishlatiladi (B). Manba: Gramilliy.",
    desmos_trick: "Colon specification rule: Complete Independent Clause + Colon (:) + Elaboration/Explanation.",
    desmos_latex: null,
    reference_formula: "Independent Clause : Elaboration"
  },
  {
    id: "q_gramilliy_rw_bou_03",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-BOU",
    difficulty: "Hard",
    prompt: "In 1952, Rosalind Franklin obtained Photo 51—an extraordinary X-ray diffraction image of paracrystalline ______ revealed the distinctive B-form helical structure of the genetic code.",
    options: JSON.stringify([
      "A. DNA—that",
      "B. DNA; that",
      "C. DNA, that",
      "D. DNA that"
    ]),
    correct_answer: "A",
    explanation_en: "The phrase 'an extraordinary X-ray diffraction image of paracrystalline DNA' is a non-essential appositive modifier set off by an opening em-dash ('Photo 51—...'). To preserve structural symmetry, parenthetical insertions opened with an em-dash MUST be closed with a matching em-dash before the main verb continues: 'DNA—that revealed...' (Choice A). Source: Gramilliy (Chapter III, Page 29).",
    explanation_uz: "Gap ichida ajratilgan izoh (appositive) bitta tire (—) bilan boshlangan. Agar qo'shimcha izoh tire bilan ochilsa, u xuddi shunday mos tire bilan yopilishi shart (A). Manba: Gramilliy.",
    desmos_trick: "Em-dash symmetry: If an insertion begins with an em-dash, it must conclude with an em-dash.",
    desmos_latex: null,
    reference_formula: "Word — Appositive — Verb"
  },

  // --- ENG-MOD: Modifier Placement (Gramilliy & SAToplam Writing) ---
  {
    id: "q_gramilliy_rw_mod_01",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-MOD",
    difficulty: "Hard",
    prompt: "Having painstakingly decoded the complex phonetic syllabary of the Bronze Age Linear B script in 1952, ______ conclusively proved that the Mycenaean administrative records were composed in an archaic dialect of Greek.",
    options: JSON.stringify([
      "A. the discovery by architect and linguist Michael Ventris",
      "B. Michael Ventris's scholarly publication",
      "C. architect and linguist Michael Ventris",
      "D. the decipherment achieved by Michael Ventris"
    ]),
    correct_answer: "C",
    explanation_en: "The introductory participial phrase 'Having painstakingly decoded...' modifies the agent who did the decoding. That agent must be the subject immediately following the comma. 'The discovery' (A), 'publication' (B), and 'decipherment' (D) cannot decode ancient script—only the human person, 'architect and linguist Michael Ventris' (Choice C), can perform the action. Any other choice produces a dangling modifier trap. Source: Gramilliy (Chapter IV, Page 34).",
    explanation_uz: "Dangling modifier qoidasi: 'Having painstakingly decoded...' (matnni ochgach) harakatini kim bajargan? Kashfiyot yoki maqola emas, balki odam — Maykl Ventris! Verguldan keyin bevosita shaxs kelishi shart (C). Manba: Gramilliy.",
    desmos_trick: "Gramilliy Anchor Rule: Ask 'Who decoded?'. The answer MUST be the first noun immediately following the comma.",
    desmos_latex: null,
    reference_formula: "Introductory Participial Phrase, True Agent + Verb"
  },
  {
    id: "q_gramilliy_rw_mod_02",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-MOD",
    difficulty: "Hard",
    prompt: "Preserved for millennia beneath the hyper-arid soils of Chile's Atacama Desert, ______ display intact epidermal tissues, intricate braided textiles, and mineral-based facial pigments.",
    options: JSON.stringify([
      "A. archaeologists were astonished to discover that the Chinchorro mummies",
      "B. the Chinchorro mummies",
      "C. the preservation of the Chinchorro mummies",
      "D. radioactive carbon dating of the Chinchorro mummies"
    ]),
    correct_answer: "B",
    explanation_en: "The introductory modifier 'Preserved for millennia beneath the hyper-arid soils...' describes what was preserved. Archaeologists (A) were not preserved for millennia, nor was 'the preservation' (C) or 'dating' (D). The entities preserved beneath the desert were 'the Chinchorro mummies' (Choice B). Source: SAToplam Writing Book (Page 84, Q112).",
    explanation_uz: "Atakama cho'lida ming yillar davomida saqlanib qolgan narsa nima? Arxeologlar emas, balki Chinchorro mumiyolari! Demak verguldan keyin mumiya so'zi kelishi kerak (B). Manba: SAToplam Writing Book.",
    desmos_trick: "Dangling modifier check: Match 'Preserved for millennia' directly to 'the Chinchorro mummies'.",
    desmos_latex: null,
    reference_formula: "Past Participial Phrase, Subject Entity + Verb"
  },

  // --- ENG-AGR: Form, Structure, Sense (Gramilliy & SAToplam Writing) ---
  {
    id: "q_satoplam_rw_agr_01",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-AGR",
    difficulty: "Hard",
    prompt: "Spanning across more than two hundred square kilometers of the high Andean plateau ______ the enigmatic geoglyphs of the Nazca lines, which depict stylized animals, geometric spirals, and straight trapezoids etched into iron-oxide desert pavement.",
    options: JSON.stringify([
      "A. is",
      "B. was",
      "C. are",
      "D. has been"
    ]),
    correct_answer: "C",
    explanation_en: "This sentence employs inverted syntax where the prepositional/participial phrase ('Spanning across...') precedes the verb. The true grammatical subject comes AFTER the verb: 'the enigmatic geoglyphs of the Nazca lines'. Because 'geoglyphs' is a plural noun, the verb must also be plural: 'are' (Choice C). Choices A, B, and D are all singular verbs. Source: SAToplam Writing Book (Page 142, Q198).",
    explanation_uz: "Gap inversiya qilingan (tartibi o'zgargan). Asosiy ega fe'ldan keyin kelgan: 'the enigmatic geoglyphs' (ko'plikda). Ko'plikdagi ega uchun ko'plikdagi fe'l 'are' kerak (C). Manba: SAToplam Writing Book.",
    desmos_trick: "Inverted syntax trap: locate the true delayed subject after the verb ('geoglyphs' = plural -> are).",
    desmos_latex: null,
    reference_formula: "Inverted Prepositional Phrase + Plural Verb + Plural Subject"
  },
  {
    id: "q_satoplam_rw_agr_02",
    section: "READING_WRITING",
    domain: "Standard English Conventions",
    topic_code: "ENG-AGR",
    difficulty: "Hard",
    prompt: "Neither the principal investigator nor the postdoctoral research fellows ______ that the automated chromatography sensors had experienced voltage drift during the titration run.",
    options: JSON.stringify([
      "A. was aware",
      "B. were aware",
      "C. is aware",
      "D. has been aware"
    ]),
    correct_answer: "B",
    explanation_en: "In correlative constructions using 'neither... nor', the verb must agree with the subject closest to it (the rule of proximity). Here, the closest subject is 'the postdoctoral research fellows', which is plural. Therefore, the past-tense plural verb 'were aware' (Choice B) is grammatically required. Source: Gramilliy (Chapter IV, Page 38).",
    explanation_uz: "'Neither... nor' qoidasida fe'l o'ziga eng yaqin turgan ega bilan moslashadi. Fe'lga eng yaqin turgan so'z 'postdoctoral research fellows' (ko'plikda). Shuning uchun ko'plikdagi 'were aware' to'g'ri (B). Manba: Gramilliy.",
    desmos_trick: "Proximity rule: 'neither A nor B' -> verb agrees strictly with B ('fellows' = plural).",
    desmos_latex: null,
    reference_formula: "Neither A nor B (plural) + Plural Verb"
  },

  // --- ENG-TRA: Transitions (SAToplam Writing & Atlas Agora) ---
  {
    id: "q_satoplam_rw_tra_01",
    section: "READING_WRITING",
    domain: "Expression of Ideas",
    topic_code: "ENG-TRA",
    difficulty: "Hard",
    prompt: "In classical Newtonian mechanics, time flows uniformly and independently of the relative motion between an observer and an observed reference frame. In Einsteinian special relativity, ______ time intervals dilate as relative velocity approaches the speed of light, demonstrating that temporal measurements are inherently observer-dependent.",
    options: JSON.stringify([
      "A. conversely,",
      "B. for instance,",
      "C. consequently,",
      "D. furthermore,"
    ]),
    correct_answer: "A",
    explanation_en: "Sentence 1 states that Newtonian mechanics views time as uniform and independent of motion. Sentence 2 introduces Einsteinian relativity where time intervals dilate and are observer-dependent. This is a direct conceptual contrast between two opposing physics paradigms. 'Conversely' signals this sharp contrast (Choice A). Source: SAToplam Writing Book (Page 210, Q340).",
    explanation_uz: "Birinchi gapda Nyuton fizikasida vaqt mutlaq va o'zgarmas deyilgan. Ikkinchi gapda esa Eynshteyn fizikasida vaqt tezlikka qarab o'zgarishi aytilgan. Bu ikki qarash o'rtasida qarama-qarshilik (kontrast) mavjud, shuning uchun 'conversely' (aksincha) to'g'ri (A). Manba: SAToplam Writing Book.",
    desmos_trick: "Transition logic: Idea 1 (uniform time) vs Idea 2 (dilating time) = contrast -> conversely.",
    desmos_latex: null,
    reference_formula: "Contrast Transition Logic (Newtonian vs Relativistic)"
  },
  {
    id: "q_satoplam_rw_tra_02",
    section: "READING_WRITING",
    domain: "Expression of Ideas",
    topic_code: "ENG-TRA",
    difficulty: "Hard",
    prompt: "The architectural restoration team discovered that traditional lime mortar allowed moisture to evaporate freely through masonry joints, preventing internal hydraulic pressure from cracking heritage limestone blocks. ______ modern impermeable Portland cement traps subterranean dampness inside the stone matrix, accelerating irreversible winter spalling and structural decay.",
    options: JSON.stringify([
      "A. Likewise,",
      "B. By contrast,",
      "C. Accordingly,",
      "D. In addition,"
    ]),
    correct_answer: "B",
    explanation_en: "Sentence 1 describes the beneficial breathing properties of traditional lime mortar. Sentence 2 describes modern Portland cement that traps moisture and accelerates decay. The relationship is a direct contrast between the behaviors of the two materials. 'By contrast' correctly expresses this opposition (Choice B). Source: Atlas Agora Writing (Page 44).",
    explanation_uz: "1-gapda an'anaviy ohak qorishmasi namlikni chiqarib toshni asrashi aytilgan. 2-gapda esa zamonaviy sement namlikni ichkarida qamab, toshni yorib yuborishi keltirilgan. Bu qarama-qarshilik bo'lgani sababli 'By contrast' to'g'ri (B). Manba: Atlas Agora Writing.",
    desmos_trick: "Contrast transition: Traditional mortar (allows evaporation) vs Modern cement (traps moisture) = By contrast.",
    desmos_latex: null,
    reference_formula: "Material Comparison Contrast"
  },

  // --- ENG-SYN: Rhetorical Synthesis (SAToplam Writing Book) ---
  {
    id: "q_satoplam_rw_syn_01",
    section: "READING_WRITING",
    domain: "Expression of Ideas",
    topic_code: "ENG-SYN",
    difficulty: "Hard",
    prompt: "While researching an exoplanet, a student took the following notes:\n• WASP-121b is a 'hot Jupiter' exoplanet orbiting an F-type star approximately 850 light-years from Earth.\n• Its orbital period is exceptionally brief, completing one full revolution in approximately 30.6 hours.\n• Its upper atmospheric temperature reaches an estimated 2,500 Kelvin (over 2,200°C).\n• Spectroscopic analysis by the Hubble Space Telescope detected gaseous heavy metals in the atmosphere.\n• Specifically, vaporized iron and magnesium were observed escaping into space rather than condensing into clouds.\n\nThe student wants to emphasize the extreme atmospheric temperature of WASP-121b. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    options: JSON.stringify([
      "A. Orbiting its host star in just 30.6 hours, WASP-121b is located approximately 850 light-years away from Earth.",
      "B. Because WASP-121b experiences extreme upper atmospheric temperatures exceeding 2,500 Kelvin, heavy metals like iron and magnesium exist as escaping vapor rather than condensing into clouds.",
      "C. Hubble Space Telescope spectroscopic analysis was utilized to detect gaseous elements in the exoplanet's atmosphere.",
      "D. WASP-121b is categorized by astronomers as a 'hot Jupiter' exoplanet with a 30.6-hour orbital revolution."
    ]),
    correct_answer: "B",
    explanation_en: "The student's specific goal is to 'emphasize the extreme atmospheric temperature'. Choice B directly highlights the temperature ('exceeding 2,500 Kelvin') and its extreme physical consequence (iron and magnesium vaporizing into gas instead of clouds). No other option centers on the temperature. Source: SAToplam Writing Book (Page 312, Q489).",
    explanation_uz: "Talabaning asosiy maqsadi: sayyoraning ekstremal haroratini ta'kidlash. B varianti 2500 Kelvindan yuqori harorat tufayli temir va magniy kabi og'ir metallar bulutga aylanmay, bug'lanib ketayotganini aniq ko'rsatib, harorat ta'sirini ochib beradi (B). Manba: SAToplam Writing Book.",
    desmos_trick: "Rhetorical synthesis target: isolate the exact student goal in the prompt ('extreme atmospheric temperature') and find the choice that directly centers it.",
    desmos_latex: null,
    reference_formula: "Goal Matching Strategy"
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log(`Starting upsert of ${rwQuestions.length} Reading & Writing questions...`);
    let inserted = 0;

    const query = `
      INSERT INTO questions (
        id, section, domain, topic_code, difficulty,
        prompt, options, correct_answer, explanation_en, explanation_uz,
        desmos_trick, desmos_latex, reference_formula
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (id) DO UPDATE SET
        section = EXCLUDED.section,
        domain = EXCLUDED.domain,
        topic_code = EXCLUDED.topic_code,
        difficulty = EXCLUDED.difficulty,
        prompt = EXCLUDED.prompt,
        options = EXCLUDED.options,
        correct_answer = EXCLUDED.correct_answer,
        explanation_en = EXCLUDED.explanation_en,
        explanation_uz = EXCLUDED.explanation_uz,
        desmos_trick = EXCLUDED.desmos_trick,
        desmos_latex = EXCLUDED.desmos_latex,
        reference_formula = EXCLUDED.reference_formula;
    `;

    for (const q of rwQuestions) {
      await client.query(query, [
        q.id,
        q.section,
        q.domain,
        q.topic_code,
        q.difficulty,
        q.prompt,
        q.options,
        q.correct_answer,
        q.explanation_en,
        q.explanation_uz,
        q.desmos_trick,
        q.desmos_latex,
        q.reference_formula,
      ]);
      inserted++;
    }

    console.log(`Successfully upserted ${inserted} Reading & Writing questions.`);
    const total = await client.query("SELECT COUNT(*)::int as count FROM questions");
    const sections = await client.query("SELECT section, COUNT(*)::int as count FROM questions GROUP BY section");
    console.log(`Total questions in database now: ${total.rows[0].count}`);
    console.log("Sections Distribution:", sections.rows);
  } catch (err) {
    console.error("Error seeding Reading & Writing batch:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
