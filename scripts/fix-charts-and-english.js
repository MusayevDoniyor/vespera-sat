const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'src', 'lib', 'bluebook-exams-data.json');
const rawData = fs.readFileSync(dataFilePath, 'utf8');
const exams = JSON.parse(rawData);

// 1. Professional English Exam Descriptions
const examEnglishDescriptions = {
  'bluebook-official-1': 'Official College Board Practice Test 1. Full 2-stage Multistage Adaptive Testing (MST) routing with authentic Reading & Writing and Math modules.',
  'bluebook-official-2': 'Official College Board Practice Test 2. Authentic 2-stage adaptive examination covering Reading & Writing and Advanced Math problem sets.',
  'satashkent-october-real': 'SAT Tashkent - October Real Exam Form. Authentic exam recreation based on verified recalled questions from recent international Digital SAT administrations.',
  'bluebook-official-3': 'Official College Board Practice Test 3. High-precision Reading & Writing passages and rigorous Advanced Math problem sets.',
  'bluebook-official-4': 'Official College Board Practice Test 4. The latest official practice test featuring rapid Desmos algebraic shortcuts and authentic scoring.',
  'satashkent-english-elite': 'English Elite — Recalled Monthly Exam Form. Specialized Verbal mock curated from high-yield 750+ Reading & Writing question banks.',
  'satashkent-hard-math-800': 'SAT Hard Math 800 Challenge Form. Designed for 750–800 aspirants: Discriminant traps, circle coordinate geometry, and Desmos speed tactics.'
};

// SVG Generators for the 18 Quantitative questions
function makeBarChartSvg({ title, yAxisLabel, yMax, yStep, categories, series, height = 260, width = 480 }) {
  const padL = 55;
  const padR = 25;
  const padT = 35;
  const padB = 60;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  // Y-ticks
  const numSteps = Math.round(yMax / yStep);
  let yTicks = '';
  for (let i = 0; i <= numSteps; i++) {
    const val = i * yStep;
    const y = padT + chartH - (val / yMax) * chartH;
    yTicks += `
      <line x1="${padL}" y1="${y}" x2="${padL + chartW}" y2="${y}" stroke="currentColor" stroke-opacity="0.12" stroke-dasharray="2 2" />
      <text x="${padL - 8}" y="${y + 4}" font-size="10" font-family="monospace" fill="currentColor" opacity="0.65" text-anchor="end">${val}</text>
    `;
  }

  // X-groups & bars
  const numCats = categories.length;
  const catWidth = chartW / numCats;
  const numSeries = series.length;
  const barGap = 3;
  const groupPad = catWidth * 0.15;
  const usableWidth = catWidth - 2 * groupPad;
  const barWidth = Math.max(8, (usableWidth - (numSeries - 1) * barGap) / numSeries);

  let bars = '';
  let catLabels = '';

  categories.forEach((cat, cIdx) => {
    const groupX = padL + cIdx * catWidth + groupPad;
    const catCenterX = padL + (cIdx + 0.5) * catWidth;
    catLabels += `<text x="${catCenterX}" y="${padT + chartH + 18}" font-size="11" font-weight="600" font-family="sans-serif" fill="currentColor" opacity="0.9" text-anchor="middle">${cat}</text>`;

    series.forEach((s, sIdx) => {
      const val = s.data[cIdx];
      const barH = Math.max(2, (val / yMax) * chartH);
      const bx = groupX + sIdx * (barWidth + barGap);
      const by = padT + chartH - barH;
      bars += `
        <rect x="${bx}" y="${by}" width="${barWidth}" height="${barH}" rx="3" fill="${s.color}" opacity="0.9" />
        <text x="${bx + barWidth / 2}" y="${by - 4}" font-size="9" font-family="monospace" font-weight="700" fill="${s.color}" text-anchor="middle">${val}%</text>
      `;
    });
  });

  // Legend
  let legend = '';
  if (numSeries > 1) {
    const legXStart = padL;
    const legY = padT + chartH + 42;
    series.forEach((s, idx) => {
      const lx = legXStart + idx * 140;
      legend += `
        <g transform="translate(${lx}, ${legY})">
          <rect x="0" y="0" width="10" height="10" rx="2" fill="${s.color}" />
          <text x="14" y="9" font-size="10" font-family="sans-serif" fill="currentColor" opacity="0.85">${s.name}</text>
        </g>
      `;
    });
  }

  return `
    <svg viewBox="0 0 ${width} ${height}" class="w-full max-w-lg h-auto select-none font-sans" xmlns="http://www.w3.org/2000/svg">
      <text x="${width / 2}" y="18" font-size="12" font-weight="700" font-family="sans-serif" fill="currentColor" text-anchor="middle">${title}</text>
      <text x="${padL - 10}" y="${padT - 10}" font-size="9" font-family="sans-serif" fill="currentColor" opacity="0.7">${yAxisLabel}</text>
      ${yTicks}
      <line x1="${padL}" y1="${padT + chartH}" x2="${padL + chartW}" y2="${padT + chartH}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5" />
      ${bars}
      ${catLabels}
      ${legend}
    </svg>
  `.trim();
}

// 18 Hand-Curated Clean Question Presets with High-Res Visual SVGs & Tables
const chartFixes = {
  // 1. Ondo State Female Farmers (User specifically flagged)
  'cb_403fb4e4': {
    prompt: `Geographer Adebayo Oluwole Eludoyin and his colleagues surveyed small-scale farmers in three locations in Ondo State, Nigeria—which has mountainous terrain in the north, an urbanized center, and coastal terrain in the south—to learn more about their practices, like the types of crops they mainly cultivated. In some regions, female farmers were found to be especially prominent in the cultivation of specific types of crops and even constituted the majority of farmers who cultivated those crops; for instance, ______\n\nWhich choice most effectively uses data from the graph to complete the example?`,
    svg: makeBarChartSvg({
      title: 'Percentage of Ondo State Small-Scale Farmers Who Are Female',
      yAxisLabel: 'Female Farmers (%)',
      yMax: 60,
      yStep: 10,
      categories: ['North Ondo', 'Central Ondo', 'South Ondo'],
      series: [
        { name: 'Cereals', color: '#3b82f6', data: [35, 36, 35] },
        { name: 'Root crops', color: '#f59e0b', data: [33, 20, 28] },
        { name: 'Non-root veg', color: '#10b981', data: [57, 48, 54] }
      ]
    })
  },

  // 2. Individuals Reporting Directly to CEOs
  'cb_645fd11a': {
    prompt: `Considering a large sample of companies, economics experts Maria Guadalupe, Julie Wulf, and Raghuram Rajan assessed the number of managers and leaders from different departments who reported directly to a chief executive officer (CEO). According to the researchers, the findings suggest that across the years analyzed, there was a growing interest among CEOs in connecting with more departments in their companies.\n\nWhich choice best describes data from the graph that support the researchers' conclusion?`,
    svg: makeBarChartSvg({
      title: 'Average Number of Individuals Reporting Directly to CEOs',
      yAxisLabel: 'Individuals Reporting to CEO',
      yMax: 8,
      yStep: 2,
      categories: ['1991–1995', '1996–2001', '2001–2008'],
      series: [
        { name: 'Managers', color: '#3b82f6', data: [1.8, 2.4, 2.5] },
        { name: 'Department leaders', color: '#8b5cf6', data: [4.5, 5.8, 6.8] }
      ]
    })
  },

  // 3. Economic Policy Uncertainty in UK
  'cb_702eb7e3': {
    prompt: `High levels of public uncertainty about which economic policies a country will adopt can make planning difficult for businesses, but measures of such uncertainty have not tended to be very detailed. Recently, however, economist Sandile Hlatshwayo analyzed trends in news reports to derive measures not only for general economic policy uncertainty but also for uncertainty related to specific areas of economic policy, like tax or trade policy. One revelation of her work is that a general measure may not fully reflect uncertainty about specific areas of policy, as in the case of the United Kingdom, where general economic policy uncertainty ______\n\nWhich choice most effectively uses data from the graph to illustrate the claim?`,
    svg: makeBarChartSvg({
      title: 'Economic Policy Uncertainty in the United Kingdom, 2005–2010',
      yAxisLabel: 'Uncertainty Index (higher = more)',
      yMax: 200,
      yStep: 50,
      categories: ['2005', '2006', '2007', '2008', '2009', '2010'],
      series: [
        { name: 'Tax / spending', color: '#ef4444', data: [90, 85, 80, 120, 185, 110] },
        { name: 'Trade policy', color: '#3b82f6', data: [140, 110, 90, 75, 60, 40] },
        { name: 'General economy', color: '#10b981', data: [95, 90, 85, 115, 140, 120] }
      ]
    })
  },

  // 4. Eggs Eaten by Cane Toad Tadpoles (Table)
  'cb_80fd9454': {
    prompt: `Native to Latin America, the cane toad was introduced to Australia in the 1930s. In recent decades, tadpoles in the Australian population have been shown to consume eggs of their own species. A 2022 study showed that when presented with cane toad eggs as well as eggs of native Australian amphibians, cane toad tadpoles disproportionately consumed eggs of their own species. This behavior results from their attraction to bufadienolide, a chemical produced by the eggs of cane toads but not by the eggs of native amphibians. However, using data from this study, a student wishes to argue that the presence of bufadienolide doesn't entirely explain the cane toad tadpoles' preference for certain eggs over others.\n\nWhich choice best describes data from the table that support the student's argument?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-left">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Percentage of Available Eggs Eaten by Cane Toad Tadpoles</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2.5 border-b border-[var(--border-main)]">Amphibian species (common name)</th>
              <th class="p-2.5 border-b border-[var(--border-main)] text-center">% Eggs Eaten</th>
              <th class="p-2.5 border-b border-[var(--border-main)] text-center">Native to Australia</th>
              <th class="p-2.5 border-b border-[var(--border-main)] text-center">Produces bufadienolide</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2">Little red tree frog</td><td class="p-2 text-center font-bold text-blue-500">1%</td><td class="p-2 text-center">Yes</td><td class="p-2 text-center">No</td></tr>
            <tr class="bg-amber-500/10"><td class="p-2 font-bold">Cane toad</td><td class="p-2 text-center font-bold text-amber-500">90%</td><td class="p-2 text-center font-bold text-rose-500">No</td><td class="p-2 text-center font-bold text-emerald-500">Yes</td></tr>
            <tr><td class="p-2">Short-footed frog</td><td class="p-2 text-center font-bold text-blue-500">7%</td><td class="p-2 text-center">Yes</td><td class="p-2 text-center">No</td></tr>
            <tr><td class="p-2">Striped burrowing frog</td><td class="p-2 text-center font-bold text-blue-500">10%</td><td class="p-2 text-center">Yes</td><td class="p-2 text-center">No</td></tr>
            <tr><td class="p-2">Dainty green tree frog</td><td class="p-2 text-center font-bold text-blue-500">1%</td><td class="p-2 text-center">Yes</td><td class="p-2 text-center">No</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 5. Additional Electricity Wind Turbines
  'cb_a9040290': {
    prompt: `Electric companies that use wind turbines rely on weather forecasts to predict the maximum amount of power, in megawatt-hours (MWh), they can generate using wind so that they can determine how much they'll need to generate from other sources. When winds are stronger than they were forecast to be, however, the predicted maximum amount of electricity wind turbines could generate will be too low. For example, the graph shows that for the West region, the winds were ______\n\nWhich choice most effectively uses data from the graph to complete the example?`,
    svg: makeBarChartSvg({
      title: 'Amount of Additional Electricity Wind Turbines Could Generate (Stronger Winds)',
      yAxisLabel: 'Electricity (thousands of MWh)',
      yMax: 200,
      yStep: 50,
      categories: ['West', 'Midwest'],
      series: [
        { name: 'Additional Electricity', color: '#06b6d4', data: [150, 80] }
      ]
    })
  },

  // 6. Swiss Glacier Inventory
  'cb_a9ac31e4': {
    prompt: `To monitor changes to glaciers in Switzerland, the government periodically measures them for features like total area of ice and mean ice thickness, which are then reported in the Swiss Glacier Inventory. These measurements can be used to compare the glaciers. For example, the Gorner glacier had ______\n\nWhich choice most effectively uses data from the graph to complete the example?`,
    svg: makeBarChartSvg({
      title: 'Glacier Area of Three Glaciers in the 2016 Swiss Glacier Inventory',
      yAxisLabel: 'Area (square km)',
      yMax: 50,
      yStep: 10,
      categories: ['Gorner', 'Fiescher', 'Unterraar'],
      series: [
        { name: 'Glacier Area', color: '#3b82f6', data: [41, 30, 22] }
      ]
    })
  },

  // 7. Time Spent Reading London Museums (Table)
  'cb_ab94d40a': {
    prompt: `Researchers recently conducted an experiment to understand how we use rankings to make decisions. They created a fictitious travel website describing five museums in London. Then, they invited two groups of participants, who had never visited the museums, to review the site and select the museum they would be most likely to visit. Meanwhile, the researchers tracked the amount of time each participant spent reading about each museum. For one group, the website ranked each museum, titling the page "The Top 5 Museums in London." For the other group, the museums and their descriptions were not ranked. The researchers concluded that when reviewing ranked lists, we tend to focus on the top-ranked option.\n\nWhich choice best describes data in the table that support the researchers' conclusion?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-left">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Time Participants Spent Reading about Five London Museums</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2.5 border-b border-[var(--border-main)]">Museum Name</th>
              <th class="p-2.5 border-b border-[var(--border-main)] text-center">Ranking</th>
              <th class="p-2.5 border-b border-[var(--border-main)] text-center">% Time (with ranking)</th>
              <th class="p-2.5 border-b border-[var(--border-main)] text-center">% Time (without ranking)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr class="bg-blue-500/10 font-bold"><td class="p-2">British Museum</td><td class="p-2 text-center text-amber-500">1</td><td class="p-2 text-center text-blue-500">36%</td><td class="p-2 text-center">18%</td></tr>
            <tr><td class="p-2">National Gallery</td><td class="p-2 text-center">2</td><td class="p-2 text-center">21%</td><td class="p-2 text-center">20%</td></tr>
            <tr><td class="p-2">Natural History Museum</td><td class="p-2 text-center">3</td><td class="p-2 text-center">13%</td><td class="p-2 text-center">22%</td></tr>
            <tr><td class="p-2">Tate Modern</td><td class="p-2 text-center">4</td><td class="p-2 text-center">16%</td><td class="p-2 text-center">17%</td></tr>
            <tr><td class="p-2">Victoria and Albert Museum</td><td class="p-2 text-center">5</td><td class="p-2 text-center">14%</td><td class="p-2 text-center">23%</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 8. Cantaloupe Yield
  'cb_1db1a9a6': {
    prompt: `To test the effects of a nitrogen fertilizer on cantaloupe production, researchers grew cantaloupe plants and harvested their fruit over three years. In each year, half the plants were grown using a nitrogen fertilizer, and the other half were grown using a control fertilizer that contained no nitrogen. The researchers concluded that the nitrogen fertilizer increases cantaloupe yield.\n\nWhich choice best describes data in the graph that support the researchers' conclusion?`,
    svg: makeBarChartSvg({
      title: 'Cantaloupe Yield: Control vs. Nitrogen Fertilizer',
      yAxisLabel: 'Yield (pounds per acre)',
      yMax: 45,
      yStep: 10,
      categories: ['2017', '2018', '2019'],
      series: [
        { name: 'Control', color: '#64748b', data: [18, 22, 20] },
        { name: 'Nitrogen fertilizer', color: '#10b981', data: [34, 38, 36] }
      ]
    })
  },

  // 9. Suggestions for Improving a University
  'cb_23e2421a': {
    prompt: `Gabrielle Adams and colleagues reviewed suggestions for improving a university that had been submitted to the university's president. They coded each suggestion as additive (the idea suggested adding something new to the university), subtractive (the idea suggested removing something from the university), neither additive nor subtractive, or invalid (the idea was not comprehensible). The data illustrated people's tendency to overlook the possibility of removing things to achieve improvements: ______\n\nWhich choice most effectively uses data in the graph to complete the statement?`,
    svg: makeBarChartSvg({
      title: 'Suggestions for Improving a University by Suggestion Type',
      yAxisLabel: 'Number of Suggestions',
      yMax: 600,
      yStep: 100,
      categories: ['Additive', 'Neither', 'Subtractive', 'Invalid'],
      series: [
        { name: 'Count', color: '#6366f1', data: [575, 175, 80, 360] }
      ]
    })
  },

  // 10. Rotor Diameters of Wind Turbines
  'cb_2df730d0': {
    prompt: `All other things being equal, the larger a wind turbine's rotor diameter (the diameter of the imaginary circle swept by the turbine's rotating blades), the greater amount of energy the turbine can generate. In a research paper on wind power, a student claims that in the United States, the amount of energy generated per newly installed turbine increased substantially between 2011 and 2021.\n\nWhich choice best describes data in the graph that support the student's claim?`,
    svg: makeBarChartSvg({
      title: 'Rotor Diameters of Newly Installed Wind Turbines (US, 2011 vs 2021)',
      yAxisLabel: 'Percent of Turbines (%)',
      yMax: 100,
      yStep: 20,
      categories: ['<100 m', '100–115 m', '115–130 m', '>130 m'],
      series: [
        { name: 'Year 2011', color: '#94a3b8', data: [78, 22, 0, 0] },
        { name: 'Year 2021', color: '#3b82f6', data: [2, 10, 30, 58] }
      ]
    })
  },

  // 11. Metal Content of Plants with Kanamycin
  'cb_742fd8ba': {
    prompt: `Many plants lose their leaf color when exposed to kanamycin, an antibiotic produced by some soil microorganisms. Spelman College biologist Mentewab Ayalew and her colleagues hypothesized that plants' response to kanamycin exposure involves altering their uptake of metals, such as iron and zinc. The researchers grew two groups of seedlings of the plant Arabidopsis thaliana, half of which were exposed to kanamycin and half of which were a control group without exposure to kanamycin, and measured the plants' metal content five days after germination.\n\nWhich choice best describes data in the graph that support Ayalew and her colleagues' hypothesis?`,
    svg: makeBarChartSvg({
      title: 'Metal Content of Plants with and without Kanamycin Exposure',
      yAxisLabel: 'Metal content (ppm)',
      yMax: 700,
      yStep: 100,
      categories: ['Without Kanamycin', 'With Kanamycin'],
      series: [
        { name: 'Zinc (Zn)', color: '#06b6d4', data: [310, 190] },
        { name: 'Iron (Fe)', color: '#f59e0b', data: [620, 260] }
      ]
    })
  },

  // 12. Evron Quarry Artifacts Temperatures
  'cb_7edfb2c5': {
    prompt: `Flint artifacts dating to 800,000 to 1,000,000 years ago have been recovered from the Evron Quarry in Israel. Likely created by the hominin Homo erectus, the artifacts have no visual features suggesting that they were exposed to fire, leading some scholars to conclude that these hominins had not acquired control of fire. But Zane Stepka and colleagues recently used a new method to determine whether these artifacts had been exposed to temperatures above 400°C (the typical temperature campfires reach) and concluded that the hominins who inhabited the site may have had control of fire.\n\nWhich choice best describes data in the graph that support the team's conclusion?`,
    svg: makeBarChartSvg({
      title: 'Estimated Temperatures to which Evron Quarry Artifacts Were Exposed',
      yAxisLabel: 'Temperature (°C)',
      yMax: 700,
      yStep: 100,
      categories: ['L5_239', 'K5_106', 'K3_18', 'K3_9'],
      series: [
        { name: 'Exposed Temp', color: '#ef4444', data: [550, 250, 650, 320] }
      ]
    })
  },

  // 13. Energy Conservation Actions (Table)
  'cb_84136d69': {
    prompt: `In a survey of public perceptions of energy use, researcher Shahzeen Attari and her team asked respondents to name the most effective action ordinary people can take to conserve energy. The team categorized each action as either an efficiency or a curtailment and found that respondents tended to name curtailments more often than they did efficiencies. For example, 19.6% of respondents stated that the most effective way to conserve energy is to turn off the lights, while only ______\n\nWhich choice most effectively uses data from the table to complete the text?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-left">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Five Responses to Survey about Actions to Conserve Energy</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2.5 border-b border-[var(--border-main)]">Action</th>
              <th class="p-2.5 border-b border-[var(--border-main)] text-center">Category</th>
              <th class="p-2.5 border-b border-[var(--border-main)] text-center">% Selecting Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2">Turn off lights</td><td class="p-2 text-center text-amber-500">Curtailment</td><td class="p-2 text-center font-bold text-blue-500">19.6%</td></tr>
            <tr><td class="p-2">Use bike / transit instead of car</td><td class="p-2 text-center text-amber-500">Curtailment</td><td class="p-2 text-center font-bold text-blue-500">12.9%</td></tr>
            <tr><td class="p-2">Change thermostat setting</td><td class="p-2 text-center text-amber-500">Curtailment</td><td class="p-2 text-center font-bold text-blue-500">6.3%</td></tr>
            <tr class="bg-emerald-500/10 font-bold"><td class="p-2">Use efficient light bulbs</td><td class="p-2 text-center text-emerald-500">Efficiency</td><td class="p-2 text-center text-emerald-500 font-bold">3.6%</td></tr>
            <tr class="bg-emerald-500/10"><td class="p-2">Use efficient cars / hybrids</td><td class="p-2 text-center text-emerald-500">Efficiency</td><td class="p-2 text-center font-bold">2.8%</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 14. Seed Germination with H2S Treatment
  'cb_8a584241': {
    prompt: `In high concentrations, hydrogen sulfide (H₂S) is typically toxic to many plants. Frederick D. Dooley and colleagues wanted to understand what effects low doses of H₂S might have on plant growth. They treated bean, corn, wheat, and pea seeds with various concentrations (measured in micromoles per liter) of H₂S and tracked the germination of those seeds along with the germination of untreated seeds. Treatment with particular concentrations of H₂S was associated with accelerated germination: for example, ______\n\nWhich choice most effectively uses data from the graph to complete the statement?`,
    svg: makeBarChartSvg({
      title: 'Seed Germination Rate with and without H₂S Treatment',
      yAxisLabel: 'Seeds Germinated (%)',
      yMax: 100,
      yStep: 20,
      categories: ['24 hours', '48 hours', '72 hours', '168 hours'],
      series: [
        { name: 'Untreated', color: '#64748b', data: [5, 50, 58, 65] },
        { name: '10 µmol/L H₂S', color: '#10b981', data: [8, 72, 85, 95] },
        { name: '500 µmol/L H₂S', color: '#ef4444', data: [2, 40, 75, 92] }
      ]
    })
  },

  // 15. Hours of Sunshine in Alaska
  'cb_8a668840': {
    prompt: `A student is researching monthly hours of sunshine in different cities in Alaska. When comparing trends in Anchorage and Fairbanks, the student concludes that the two cities show a similar pattern in the monthly hours of sunshine from April to September.\n\nWhich choice best describes data from the graph that support the student's conclusion?`,
    svg: makeBarChartSvg({
      title: 'Monthly Hours of Sunshine in Anchorage and Fairbanks, Alaska',
      yAxisLabel: 'Hours of Sunshine',
      yMax: 350,
      yStep: 50,
      categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      series: [
        { name: 'Anchorage', color: '#3b82f6', data: [220, 280, 310, 260, 190, 140] },
        { name: 'Fairbanks', color: '#f59e0b', data: [250, 310, 340, 290, 210, 150] }
      ]
    })
  },

  // 16. Median Marriage Ages 1900–2000
  'cb_53c6c179': {
    prompt: `A sociology student is reading an essay on the median age of first marriage in Western countries throughout the twentieth century. The author of the essay cites factors common to these countries that the author believes caused an increase in the median age of first marriage, such as new technologies that shortened the time needed for domestic chores, making two-person households less necessary and living alone more viable. The student asserts that beyond these factors there must be additional ones specific to particular Western countries that influenced the increase of age at first marriage.\n\nWhich choice most effectively uses data from the graph that support the student's assertion?`,
    svg: makeBarChartSvg({
      title: 'Median Ages of First Marriage for Men and Women, 1900–2000',
      yAxisLabel: 'Median Marriage Age (Years)',
      yMax: 35,
      yStep: 5,
      categories: ['1950', '1970', '1990', '2000'],
      series: [
        { name: 'Men (England & Wales)', color: '#3b82f6', data: [25.8, 24.6, 28.2, 30.5] },
        { name: 'Men (United States)', color: '#10b981', data: [22.8, 23.2, 26.1, 26.8] }
      ]
    })
  },

  // 17. Urban Population of Algeria, France, Japan, Nigeria
  'cb_a2b0fc3b': {
    prompt: `The share of the world's population living in cities has increased dramatically since 1970, but this change has not been uniform. France and Japan, for example, were already heavily urbanized in 1970, with 70% or more of the population living in cities. The main contributors to the world's urbanization since 1970 have been countries like Algeria, whose population went from ______\n\nWhich choice most effectively uses data from the graph to complete the assertion?`,
    svg: makeBarChartSvg({
      title: 'Urban Population Percentage by Country (1970 vs 2020)',
      yAxisLabel: 'Urban Population (%)',
      yMax: 100,
      yStep: 20,
      categories: ['Algeria', 'France', 'Japan', 'Nigeria'],
      series: [
        { name: '1970', color: '#94a3b8', data: [40, 72, 72, 18] },
        { name: '2020', color: '#3b82f6', data: [73, 81, 92, 52] }
      ]
    })
  },

  // 18. Spider Population Count
  'cb_b30a2613': {
    prompt: `To investigate the effect of lizard predation on spider populations, a student in a biology class placed spiders in two enclosures, one with lizards and one without, and tracked the number of spiders in the enclosures for 30 days. The student concluded that the reduction in the spider population count in the enclosure with lizards by day 30 was entirely attributable to the presence of the lizards.\n\nWhich choice best describes data from the graph that weaken the student's conclusion?`,
    svg: makeBarChartSvg({
      title: 'Spider Population Count Over 30 Days (With vs Without Lizards)',
      yAxisLabel: 'Spider Count',
      yMax: 100,
      yStep: 20,
      categories: ['Day 1', 'Day 10', 'Day 20', 'Day 30'],
      series: [
        { name: 'Without lizards', color: '#3b82f6', data: [85, 75, 60, 40] },
        { name: 'With lizards', color: '#ef4444', data: [85, 40, 25, 15] }
      ]
    })
  }
};

let cleanedOptionCount = 0;
let appliedChartCount = 0;

exams.forEach(exam => {
  // Update description to English
  if (examEnglishDescriptions[exam.id]) {
    exam.descriptionUz = examEnglishDescriptions[exam.id];
  }

  ['rwModule1', 'rwModule2Hard', 'rwModule2Easy', 'mathModule1', 'mathModule2Hard', 'mathModule2Easy'].forEach(modKey => {
    (exam[modKey] || []).forEach(q => {
      // 1. Clean options from trailing PDF metadata
      if (q.options && Array.isArray(q.options)) {
        q.options = q.options.map(opt => {
          if (typeof opt === 'string' && (/Assessment\s+SAT|-- \d+ of \d+ --/i.test(opt))) {
            cleanedOptionCount++;
            return opt.replace(/\n*Assessment\s+SAT[\s\S]*?-- \d+ of \d+ --\s*$/i, '').trim();
          }
          return opt;
        });
      }

      // 2. Apply Chart Fix if question is in chartFixes
      if (chartFixes[q.id]) {
        appliedChartCount++;
        q.prompt = chartFixes[q.id].prompt;
        q.diagramSvg = chartFixes[q.id].svg;
      }
    });
  });
});

fs.writeFileSync(dataFilePath, JSON.stringify(exams, null, 2), 'utf8');

console.log('Successfully updated bluebook-exams-data.json!');
console.log('Cleaned options with metadata:', cleanedOptionCount);
console.log('Applied chart fixes to questions:', appliedChartCount);
