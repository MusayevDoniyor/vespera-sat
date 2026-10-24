const { Pool } = require("pg");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 20000,
});

// 1. Nested Similar Triangles PQR and PST
const svgNestedTriangles = `<svg viewBox="0 0 380 250" class="w-full max-w-[360px] h-auto text-[var(--text-main)]" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="190,35 45,215 335,215" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
  <line x1="117.5" y1="125" x2="262.5" y2="125" stroke="#0ea5e9" stroke-width="2.5" stroke-linecap="round" />
  <circle cx="190" cy="35" r="4.5" fill="#0ea5e9" stroke="white" stroke-width="1.5" />
  <circle cx="45" cy="215" r="4.5" fill="#0ea5e9" stroke="white" stroke-width="1.5" />
  <circle cx="335" cy="215" r="4.5" fill="#0ea5e9" stroke="white" stroke-width="1.5" />
  <circle cx="117.5" cy="125" r="4" fill="#0ea5e9" stroke="white" stroke-width="1.5" />
  <circle cx="262.5" cy="125" r="4" fill="#0ea5e9" stroke="white" stroke-width="1.5" />
  <path d="M 103,142 A 22 22 0 0 0 135,125" stroke="#f59e0b" stroke-width="2" fill="none" />
  <text x="148" y="118" font-size="13" font-weight="700" fill="#f59e0b" font-family="system-ui">42°</text>
  <text x="190" y="22" font-size="15" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">P</text>
  <text x="96" y="122" font-size="14" font-weight="700" fill="currentColor" text-anchor="end" font-family="system-ui">S</text>
  <text x="280" y="122" font-size="14" font-weight="700" fill="currentColor" text-anchor="start" font-family="system-ui">T</text>
  <text x="30" y="230" font-size="15" font-weight="700" fill="currentColor" text-anchor="end" font-family="system-ui">Q</text>
  <text x="350" y="230" font-size="15" font-weight="700" fill="currentColor" text-anchor="start" font-family="system-ui">R</text>
</svg>`;

// 2. Coordinate Plane Line g passing through (-10, 12) and (0, 1)
const svgLineGCoordinate = `<svg viewBox="0 0 440 330" class="w-full max-w-[420px] h-auto text-[var(--text-main)]" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="coordGrid" width="18" height="18" patternUnits="userSpaceOnUse">
      <path d="M 18 0 L 0 0 0 18" fill="none" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />
    </pattern>
    <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" />
    </marker>
  </defs>
  <rect x="20" y="10" width="400" height="300" fill="url(#coordGrid)" />
  <line x1="25" y1="270" x2="385" y2="270" stroke="currentColor" stroke-width="2" marker-end="url(#arr)" />
  <line x1="310" y1="300" x2="310" y2="15" stroke="currentColor" stroke-width="2" marker-end="url(#arr)" />
  
  <text x="395" y="274" font-size="14" font-weight="700" fill="currentColor" font-family="system-ui">x</text>
  <text x="310" y="10" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">y</text>
  <text x="296" y="286" font-size="12" font-weight="600" fill="currentColor" text-anchor="end" font-family="system-ui">O</text>

  <text x="58" y="288" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" font-family="system-ui">-14</text>
  <text x="94" y="288" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" font-family="system-ui">-12</text>
  <text x="130" y="288" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" font-family="system-ui">-10</text>
  <text x="166" y="288" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" font-family="system-ui">-8</text>
  <text x="202" y="288" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" font-family="system-ui">-6</text>
  <text x="238" y="288" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" font-family="system-ui">-4</text>
  <text x="274" y="288" font-size="11" font-weight="600" fill="currentColor" text-anchor="middle" font-family="system-ui">-2</text>

  <text x="300" y="238" font-size="11" font-weight="600" fill="currentColor" text-anchor="end" font-family="system-ui">2</text>
  <text x="300" y="202" font-size="11" font-weight="600" fill="currentColor" text-anchor="end" font-family="system-ui">4</text>
  <text x="300" y="166" font-size="11" font-weight="600" fill="currentColor" text-anchor="end" font-family="system-ui">6</text>
  <text x="300" y="130" font-size="11" font-weight="600" fill="currentColor" text-anchor="end" font-family="system-ui">8</text>
  <text x="300" y="94" font-size="11" font-weight="600" fill="currentColor" text-anchor="end" font-family="system-ui">10</text>
  <text x="300" y="58" font-size="11" font-weight="600" fill="currentColor" text-anchor="end" font-family="system-ui">12</text>
  <text x="300" y="22" font-size="11" font-weight="600" fill="currentColor" text-anchor="end" font-family="system-ui">14</text>

  <line x1="85" y1="6" x2="350" y2="295" stroke="#2563eb" stroke-width="2.8" stroke-linecap="round" />
  
  <circle cx="130" cy="54" r="5" fill="#2563eb" stroke="white" stroke-width="2" />
  <text x="120" y="44" font-size="11" font-weight="700" fill="#2563eb" text-anchor="end" font-family="system-ui">(-10, 12)</text>
  
  <circle cx="310" cy="252" r="5" fill="#2563eb" stroke="white" stroke-width="2" />
  <text x="325" y="256" font-size="11" font-weight="700" fill="#2563eb" font-family="system-ui">(0, 1)</text>

  <rect x="70" y="20" width="60" height="22" rx="6" fill="#2563eb" fill-opacity="0.1" stroke="#2563eb" stroke-width="1" />
  <text x="100" y="35" font-size="12" font-weight="700" fill="#2563eb" text-anchor="middle" font-family="system-ui">Line g</text>
</svg>`;

// 3. Hollow Steel Pipe Cylinder
const svgHollowPipe = `<svg viewBox="0 0 340 300" class="w-full max-w-[320px] h-auto text-[var(--text-main)]" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 100,75 L 100,235 A 60 20 0 0 0 220,235 L 220,75" stroke="currentColor" stroke-width="2.2" fill="currentColor" fill-opacity="0.04" />
  <path d="M 100,235 A 60 20 0 0 1 220,235" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.4" />
  
  <ellipse cx="160" cy="75" rx="60" ry="20" stroke="currentColor" stroke-width="2.2" fill="none" />
  <ellipse cx="160" cy="75" rx="46" ry="15" stroke="#0284c7" stroke-width="2" fill="currentColor" fill-opacity="0.08" />

  <line x1="245" y1="75" x2="245" y2="235" stroke="#64748b" stroke-width="1.5" />
  <line x1="238" y1="75" x2="252" y2="75" stroke="#64748b" stroke-width="1.5" />
  <line x1="238" y1="235" x2="252" y2="235" stroke="#64748b" stroke-width="1.5" />
  <text x="258" y="160" font-size="12" font-weight="600" fill="#64748b" font-family="system-ui">height</text>

  <line x1="100" y1="42" x2="220" y2="42" stroke="#64748b" stroke-width="1.5" />
  <line x1="100" y1="36" x2="100" y2="48" stroke="#64748b" stroke-width="1.5" />
  <line x1="220" y1="36" x2="220" y2="48" stroke="#64748b" stroke-width="1.5" />
  <text x="160" y="34" font-size="12" font-weight="600" fill="#64748b" text-anchor="middle" font-family="system-ui">outside diameter</text>

  <line x1="82" y1="62" x2="108" y2="72" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arr)" />
  <text x="75" y="58" font-size="11" font-weight="600" fill="#f59e0b" text-anchor="end" font-family="system-ui">wall thickness</text>
</svg>`;

// 4. Parallel lines a, b with intersecting transversals
const svgParallelTransversals = `<svg viewBox="0 0 380 260" class="w-full max-w-[360px] h-auto text-[var(--text-main)]" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="130" y1="20" x2="130" y2="235" stroke="currentColor" stroke-width="2.5" />
  <line x1="240" y1="20" x2="240" y2="235" stroke="currentColor" stroke-width="2.5" />
  
  <text x="130" y="250" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">a</text>
  <text x="240" y="250" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">b</text>

  <line x1="50" y1="60" x2="330" y2="215" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" />
  <text x="338" y="222" font-size="13" font-weight="700" fill="#3b82f6" font-family="system-ui">e</text>

  <line x1="50" y1="215" x2="330" y2="60" stroke="#10b981" stroke-width="2" stroke-linecap="round" />
  <text x="338" y="65" font-size="13" font-weight="700" fill="#10b981" font-family="system-ui">c</text>

  <text x="110" y="96" font-size="13" font-weight="700" fill="currentColor" text-anchor="end" font-family="system-ui">v°</text>
  <text x="100" y="196" font-size="13" font-weight="700" fill="currentColor" text-anchor="end" font-family="system-ui">w°</text>
  <text x="185" y="125" font-size="13" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">y°</text>
  <text x="260" y="96" font-size="13" font-weight="700" fill="currentColor" text-anchor="start" font-family="system-ui">x°</text>
  <text x="222" y="196" font-size="13" font-weight="700" fill="currentColor" text-anchor="end" font-family="system-ui">z°</text>
</svg>`;

// 5. Bow-tie Triangles between Parallel Lines (pred_desmos_18, pred_shoks_29)
const svgBowTieLines = `<svg viewBox="0 0 380 230" class="w-full max-w-[360px] h-auto text-[var(--text-main)]" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="30" y1="55" x2="340" y2="55" stroke="currentColor" stroke-width="2" />
  <line x1="30" y1="175" x2="340" y2="175" stroke="currentColor" stroke-width="2" />
  <text x="350" y="60" font-size="14" font-weight="700" fill="currentColor" font-family="system-ui">m</text>
  <text x="350" y="180" font-size="14" font-weight="700" fill="currentColor" font-family="system-ui">n</text>

  <line x1="120" y1="175" x2="260" y2="55" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" />
  <line x1="220" y1="175" x2="130" y2="55" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" />

  <circle cx="185" cy="119" r="4.5" fill="#3b82f6" stroke="white" stroke-width="1.5" />
  <text x="200" y="124" font-size="14" font-weight="700" fill="currentColor" font-family="system-ui">B</text>

  <circle cx="120" cy="175" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />
  <text x="120" y="196" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">A</text>
  <circle cx="220" cy="175" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />
  <text x="220" y="196" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">C</text>

  <circle cx="130" cy="55" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />
  <text x="130" y="42" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">D</text>
  <circle cx="260" cy="55" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />
  <text x="260" y="42" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">E</text>
</svg>`;

// 6. Hourglass Triangles LMR and PQR (q_cb120_p07_2, q_june_2026_085)
const svgHourglassLMR = `<svg viewBox="0 0 380 230" class="w-full max-w-[360px] h-auto text-[var(--text-main)]" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,115 110,45 180,115" stroke="currentColor" stroke-width="2.2" fill="currentColor" fill-opacity="0.04" stroke-linejoin="round" />
  <polygon points="180,115 320,115 250,205" stroke="currentColor" stroke-width="2.2" fill="currentColor" fill-opacity="0.04" stroke-linejoin="round" />
  
  <line x1="50" y1="115" x2="320" y2="115" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
  <line x1="110" y1="45" x2="250" y2="205" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />

  <line x1="50" y1="115" x2="110" y2="45" stroke="#0ea5e9" stroke-width="2.5" />
  <line x1="320" y1="115" x2="250" y2="205" stroke="#0ea5e9" stroke-width="2.5" />

  <circle cx="180" cy="115" r="4.5" fill="#0ea5e9" stroke="white" stroke-width="1.5" />
  <text x="180" y="102" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">R</text>

  <circle cx="50" cy="115" r="4" fill="#0ea5e9" stroke="white" stroke-width="1.5" />
  <text x="38" y="120" font-size="14" font-weight="700" fill="currentColor" text-anchor="end" font-family="system-ui">L</text>

  <circle cx="110" cy="45" r="4" fill="#0ea5e9" stroke="white" stroke-width="1.5" />
  <text x="110" y="32" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">M</text>

  <circle cx="320" cy="115" r="4" fill="#0ea5e9" stroke="white" stroke-width="1.5" />
  <text x="332" y="120" font-size="14" font-weight="700" fill="currentColor" text-anchor="start" font-family="system-ui">Q</text>

  <circle cx="250" cy="205" r="4" fill="#0ea5e9" stroke="white" stroke-width="1.5" />
  <text x="250" y="222" font-size="14" font-weight="700" fill="currentColor" text-anchor="middle" font-family="system-ui">P</text>
</svg>`;

// 7. Lines l and m with transversals AD, BE (q_cb120_p11_3)
const svgLinesLMTransversals = `<svg viewBox="0 0 380 250" class="w-full max-w-[360px] h-auto text-[var(--text-main)]" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="80" y1="230" x2="190" y2="25" stroke="currentColor" stroke-width="2.2" />
  <line x1="180" y1="230" x2="290" y2="25" stroke="currentColor" stroke-width="2.2" />
  <text x="195" y="20" font-size="14" font-weight="700" fill="currentColor" font-family="system-ui">ℓ</text>
  <text x="295" y="20" font-size="14" font-weight="700" fill="currentColor" font-family="system-ui">m</text>

  <line x1="140" y1="118" x2="233" y2="160" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" />
  <line x1="167" y1="68" x2="200" y2="200" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" />

  <path d="M 134,130 L 146,135 L 152,123" stroke="#2563eb" stroke-width="1.5" fill="none" />

  <circle cx="178" cy="135" r="4.5" fill="#2563eb" stroke="white" stroke-width="1.5" />
  <text x="190" y="132" font-size="13" font-weight="700" fill="currentColor" font-family="system-ui">C</text>

  <circle cx="140" cy="118" r="4" fill="#2563eb" stroke="white" stroke-width="1.5" />
  <text x="126" y="120" font-size="13" font-weight="700" fill="currentColor" text-anchor="end" font-family="system-ui">A</text>

  <circle cx="167" cy="68" r="4" fill="#2563eb" stroke="white" stroke-width="1.5" />
  <text x="155" y="70" font-size="13" font-weight="700" fill="currentColor" text-anchor="end" font-family="system-ui">B</text>

  <circle cx="233" cy="160" r="4" fill="#2563eb" stroke="white" stroke-width="1.5" />
  <text x="245" y="165" font-size="13" font-weight="700" fill="currentColor" text-anchor="start" font-family="system-ui">D</text>

  <circle cx="200" cy="200" r="4" fill="#2563eb" stroke="white" stroke-width="1.5" />
  <text x="212" y="210" font-size="13" font-weight="700" fill="currentColor" text-anchor="start" font-family="system-ui">E</text>
</svg>`;

async function applyFixes() {
  const client = await pool.connect();
  try {
    console.log("Beginning question bank precision fixes...");
    await client.query("BEGIN;");

    // 1. Fix pred_isat_m1_05: prompt cleanup, svg attach, full explanation
    await client.query(
      `UPDATE vespera.questions
       SET prompt = $1,
           diagram_svg = $2,
           explanation_en = $3,
           explanation_uz = $4
       WHERE id = 'pred_isat_m1_05'`,
      [
        "In the figure shown, triangle $PQR$ is similar to triangle $PST$. The measure of angle $PST$ is $42^\\circ$, and $QR = 12(ST)$. What is the measure of angle $PQR$?",
        svgNestedTriangles,
        "Because $\\triangle PQR$ is similar to $\\triangle PST$ ($\\triangle PQR \\sim \\triangle PST$), their corresponding angles are congruent regardless of any scale factor between corresponding side lengths. Angle $PQR$ corresponds to angle $PST$. Therefore, the measure of $\\angle PQR$ equals the measure of $\\angle PST = 42^\\circ$. The side length multiplier $12$ only affects linear dimensions, not angle measures. Choice C is correct.",
        "$\\triangle PQR$ va $\\triangle PST$ o'xshash uchburchaklar bo'lgani uchun ($\\triangle PQR \\sim \\triangle PST$), ularning mos burchaklari teng bo'ladi. $\\angle PQR$ burchak $\\angle PST$ burchakka mos keladi. Demak, $\\angle PQR$ ning gradus o'lchovi $\\angle PST = 42^\\circ$ ga teng. Tomonlar nisbati $12$ burchak o'lchamiga ta'sir qilmaydi. To'g'ri javob: C.",
      ]
    );
    console.log("Fixed pred_isat_m1_05");

    // 2. Fix q_cb120_p39_2: correct answer 300, clean explanation, svg attach
    await client.query(
      `UPDATE vespera.questions
       SET correct_answer = '300',
           diagram_svg = $1,
           explanation_en = $2,
           explanation_uz = $3
       WHERE id = 'q_cb120_p39_2'`,
      [
        svgLineGCoordinate,
        "First, determine the equation of line $g$ from the given graph. The line passes through $(-10, 12)$ and $(0, 1)$. The slope is $m = \\frac{1 - 12}{0 - (-10)} = -\\frac{11}{10}$. Since the y-intercept is $1$, the equation is $y = -\\frac{11}{10}x + 1$, which in standard form is $11x + 10y = 10$. For the linear system to have infinitely many solutions, line $k$ ($165x + py = w$) must represent the exact same line. Multiplying $11x + 10y = 10$ by $15$ yields $165x + 150y = 150$. Comparing coefficients gives $p = 150$ and $w = 150$. Thus, $p + w = 150 + 150 = 300$.",
        "Grafikdan $g$ to'g'ri chiziq $(-10, 12)$ va $(0, 1)$ nuqtalardan o'tishini ko'ramiz. Qiyaligi: $m = \\frac{1 - 12}{0 - (-10)} = -\\frac{11}{10}$. $y$-kesishmasi $1$ bo'lgani uchun tenglama $y = -\\frac{11}{10}x + 1$, ya'ni $11x + 10y = 10$. Sistema cheksiz ko'p yechimga ega bo'lishi uchun $165x + py = w$ tenglama $11x + 10y = 10$ bilan aynan bir xil bo'lishi kerak. Tenglamani $15$ ga ko'paytiramiz: $165x + 150y = 150$. Bundan $p = 150$ va $w = 150$ ekanligi kelib chiqadi. Demak, $p + w = 150 + 150 = 300$.",
      ]
    );
    console.log("Fixed q_cb120_p39_2");

    // 3. Fix pred_shoks_08: prompt text alignment and hollow cylinder svg
    await client.query(
      `UPDATE vespera.questions
       SET prompt = $1,
           diagram_svg = $2,
           explanation_en = $3,
           explanation_uz = $4
       WHERE id = 'pred_shoks_08'`,
      [
        "In the figure, a hollow steel pipe is in the shape of a right circular cylinder. The steel pipe has an outside diameter of $48$ inches, a wall thickness of $\\frac{3}{8}$ inches, and a height of $138$ inches. Which of the following is closest to the volume, in cubic inches, of the wall of this steel pipe?",
        svgHollowPipe,
        "The outside diameter is $48$ inches, so the outer radius is $R = 48/2 = 24$ inches. The wall thickness is $\\frac{3}{8} = 0.375$ inches, giving an inner radius $r = 24 - 0.375 = 23.625$ inches. The volume of the cylindrical wall shell is $V = \\pi(R^2 - r^2)h = \\pi(24^2 - 23.625^2) \\times 138 = \\pi(576 - 558.140625) \\times 138 = \\pi(17.859375) \\times 138 \\approx 7,743.4\\text{ cubic inches}$. Therefore, Choice D (7,743) is correct.",
        "Tashqi diametr $48$ dyuym, demak tashqi radius $R = 24$ dyuym. Devor qalinligi $\\frac{3}{8} = 0.375$ dyuym bo'lgani uchun ichki radius $r = 24 - 0.375 = 23.625$ dyuym bo'ladi. Silindr devorining hajmi $V = \\pi(R^2 - r^2)h = \\pi(24^2 - 23.625^2) \\times 138 \\approx 7,743\\text{ kub dyuym}$. To'g'ri javob: D.",
      ]
    );
    console.log("Fixed pred_shoks_08");

    // 4. Fix pred_aug_m2_15: parallel lines and transversals svg
    await client.query(
      `UPDATE vespera.questions SET diagram_svg = $1 WHERE id = 'pred_aug_m2_15'`,
      [svgParallelTransversals]
    );
    console.log("Fixed pred_aug_m2_15");

    // 5. Fix pred_desmos_18 & pred_shoks_29: bow-tie parallel lines svg
    await client.query(
      `UPDATE vespera.questions SET diagram_svg = $1 WHERE id IN ('pred_desmos_18', 'pred_shoks_29')`,
      [svgBowTieLines]
    );
    console.log("Fixed pred_desmos_18 & pred_shoks_29");

    // 6. Fix q_cb120_p07_2 & q_june_2026_085: hourglass similar triangles svg
    await client.query(
      `UPDATE vespera.questions SET diagram_svg = $1 WHERE id IN ('q_cb120_p07_2', 'q_june_2026_085')`,
      [svgHourglassLMR]
    );
    console.log("Fixed q_cb120_p07_2 & q_june_2026_085");

    // 7. Fix q_cb120_p11_3: lines l, m transversals AD, BE svg
    await client.query(
      `UPDATE vespera.questions SET diagram_svg = $1 WHERE id = 'q_cb120_p11_3'`,
      [svgLinesLMTransversals]
    );
    console.log("Fixed q_cb120_p11_3");

    // 8. Clean control characters \x0c in all prompts and explanations
    await client.query(`
      UPDATE vespera.questions
      SET prompt = REPLACE(prompt, E'\\x0crac', '\\frac'),
          explanation_en = REPLACE(REPLACE(explanation_en, E'\\x0crac', '\\frac'), E'\\x0c', ''),
          explanation_uz = REPLACE(REPLACE(explanation_uz, E'\\x0crac', '\\frac'), E'\\x0c', '')
      WHERE prompt LIKE E'%\\x0c%' OR explanation_en LIKE E'%\\x0c%' OR explanation_uz LIKE E'%\\x0c%';
    `);
    console.log("Cleaned all \\x0c control characters in database");

    // 9. Standardize raw unescaped currency amounts ($120.00, $1.50, $575, $701.40, $1.03, $0.56)
    await client.query(`
      UPDATE vespera.questions
      SET prompt = REPLACE(REPLACE(REPLACE(prompt, '$120.00', '\\$120.00'), '$1.50', '\\$1.50'), '$1,966.50', '\\$1,966.50')
      WHERE id = 'pred_shoks_03';

      UPDATE vespera.questions
      SET prompt = REPLACE(prompt, '$575', '\\$575')
      WHERE id = 'pred_isat_m1_04';

      UPDATE vespera.questions
      SET prompt = REPLACE(REPLACE(REPLACE(prompt, '$1.03', '\\$1.03'), '$0.56', '\\$0.56'), '$701.40', '\\$701.40')
      WHERE id = 'pred_aug_m2_17';
    `);
    console.log("Standardized currency dollar escapes");

    await client.query("COMMIT;");
    console.log("ALL PRECISION QUESTION BANK FIXES APPLIED SUCCESSFULLY! 🚀");
  } catch (err) {
    await client.query("ROLLBACK;");
    console.error("Error applying fixes:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

applyFixes();
