const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'src', 'lib', 'bluebook-exams-data.json');
const exams = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// Helper for bar chart SVG
function makeBarChartSvg({ title, yAxisLabel, yMax, yStep, categories, series, height = 260, width = 480 }) {
  const padL = 60;
  const padR = 25;
  const padT = 35;
  const padB = 60;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const numSteps = Math.round(yMax / yStep);
  let yTicks = '';
  for (let i = 0; i <= numSteps; i++) {
    const val = i * yStep;
    const y = padT + chartH - (val / yMax) * chartH;
    const displayVal = val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val;
    yTicks += `
      <line x1="${padL}" y1="${y}" x2="${padL + chartW}" y2="${y}" stroke="currentColor" stroke-opacity="0.12" stroke-dasharray="2 2" />
      <text x="${padL - 8}" y="${y + 4}" font-size="10" font-family="monospace" fill="currentColor" opacity="0.65" text-anchor="end">${displayVal}</text>
    `;
  }

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
      const displayVal = val >= 1000 ? `${Math.round(val / 1000)}k` : val;
      bars += `
        <rect x="${bx}" y="${by}" width="${barWidth}" height="${barH}" rx="3" fill="${s.color}" opacity="0.9" />
        <text x="${bx + barWidth / 2}" y="${by - 4}" font-size="9" font-family="monospace" font-weight="700" fill="${s.color}" text-anchor="middle">${displayVal}</text>
      `;
    });
  });

  let legend = '';
  if (numSeries > 1) {
    const legXStart = padL;
    const legY = padT + chartH + 42;
    series.forEach((s, idx) => {
      const lx = legXStart + idx * 130;
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

const additionalTableFixes = {
  // 1. Employment by Sector in France and United States, 1800-2012 (User reported)
  'cb_3fc06a91': {
    prompt: `Over the past two hundred years, the percentage of the population employed in the agricultural sector has declined in both France and the United States, while employment in the service sector (which includes jobs in retail, consulting, real estate, etc.) has risen. However, this transition happened at very different rates in the two countries. This can be seen most clearly by comparing the employment by sector in both countries in ______\n\nWhich choice most effectively uses data from the table to complete the statement?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Employment by Sector in France and the United States, 1800–2012 (% of total employment)</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th rowspan="2" class="p-2 border border-[var(--border-main)]">Year</th>
              <th colspan="3" class="p-2 border border-[var(--border-main)] text-blue-500 font-bold">France</th>
              <th colspan="3" class="p-2 border border-[var(--border-main)] text-emerald-500 font-bold">United States</th>
            </tr>
            <tr>
              <th class="p-1.5 border border-[var(--border-main)] font-normal text-[9px]">Agriculture</th>
              <th class="p-1.5 border border-[var(--border-main)] font-normal text-[9px]">Manufacturing</th>
              <th class="p-1.5 border border-[var(--border-main)] font-normal text-[9px]">Services</th>
              <th class="p-1.5 border border-[var(--border-main)] font-normal text-[9px]">Agriculture</th>
              <th class="p-1.5 border border-[var(--border-main)] font-normal text-[9px]">Manufacturing</th>
              <th class="p-1.5 border border-[var(--border-main)] font-normal text-[9px]">Services</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2 font-bold">1800</td><td>64%</td><td>22%</td><td>14%</td><td>68%</td><td>18%</td><td>13%</td></tr>
            <tr class="bg-blue-500/10 font-bold"><td class="p-2">1900</td><td>43%</td><td>29%</td><td>28%</td><td>41%</td><td>28%</td><td>31%</td></tr>
            <tr class="bg-blue-500/10 font-bold"><td class="p-2">1950</td><td class="text-amber-500">32%</td><td>33%</td><td class="text-blue-500">35%</td><td class="text-rose-500 font-bold">14%</td><td>33%</td><td class="text-emerald-500 font-bold">53%</td></tr>
            <tr><td class="p-2 font-bold">2012</td><td>3%</td><td>21%</td><td>76%</td><td>2%</td><td>18%</td><td>80%</td></tr>
          </tbody>
        </table>
        <p class="text-[10px] text-[var(--text-muted)] italic mt-1.5 text-center">Note: Rows in table may not add up to 100% due to rounding.</p>
      </div>
    `
  },

  // 2. Clamshell Tools Found at Different Levels in Neanderthal Cave (ID 1)
  'cb_6a6bbac3': {
    prompt: `Studying tools unearthed at a cave site on the western coast of Italy, archaeologist Paola Villa and colleagues have determined that prehistoric Neanderthal groups fashioned them from shells of clams that they harvested from the seafloor while wading or diving or that washed up on the beach. Clamshells become thin and eroded as they wash up on the beach, while those on the seafloor are smooth and sturdy, so the research team suspects that Neanderthals prized the tools made with seafloor shells. However, the team also concluded that those tools were likely more challenging to obtain, noting that ______\n\nWhich choice most effectively uses data from the table to support the research team's conclusion?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Number and Origin of Clamshell Tools Found at Different Levels Below the Surface in Neanderthal Cave</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2.5 border border-[var(--border-main)]">Depth Below Surface (m)</th>
              <th class="p-2.5 border border-[var(--border-main)] text-blue-500 font-bold">Collected from Beach</th>
              <th class="p-2.5 border border-[var(--border-main)] text-amber-500 font-bold">Harvested from Seafloor</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2 font-bold">2–3</td><td>7</td><td>0</td></tr>
            <tr class="bg-blue-500/10 font-bold"><td class="p-2">3–4</td><td class="text-blue-600 dark:text-blue-400">99</td><td class="text-amber-600 dark:text-amber-400">33</td></tr>
            <tr><td class="p-2 font-bold">4–5</td><td>2</td><td>0</td></tr>
            <tr><td class="p-2 font-bold">5–6</td><td>18</td><td>7</td></tr>
            <tr><td class="p-2 font-bold">6–7</td><td>1</td><td>0</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 3. Nucleobase Concentrations from Murchison Meteorite
  'cb_7a1877be': {
    prompt: `Employing high-performance liquid chromatography—a process that uses pressurized water to separate material into its component molecules—astrochemist Yashiro Oba and colleagues analyzed two samples of the Murchison meteorite that landed in Australia as well as soil from the landing zone of the meteorite to determine the concentrations of various organic molecules. By comparing the relative concentrations of types of molecules known as nucleobases in the Murchison meteorite with those in the soil, the team concluded that there is evidence that the nucleobases in the Murchison meteorite formed in space and are not the result of contamination on Earth.\n\nWhich choice best describes data from the table that support the team's conclusion?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Nucleobase Concentrations from Murchison Meteorite and Soil Samples (Parts per Billion)</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2 border border-[var(--border-main)]">Nucleobase</th>
              <th class="p-2 border border-[var(--border-main)] text-blue-500 font-bold">Meteorite Sample 1</th>
              <th class="p-2 border border-[var(--border-main)] text-blue-500 font-bold">Meteorite Sample 2</th>
              <th class="p-2 border border-[var(--border-main)] text-amber-500 font-bold">Soil Sample</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr class="bg-emerald-500/10 font-bold"><td class="p-2 text-left">Isoguanine</td><td>0.5</td><td>0.04</td><td class="text-rose-500 font-semibold">Not detected</td></tr>
            <tr class="bg-emerald-500/10 font-bold"><td class="p-2 text-left">Purine</td><td>0.2</td><td>0.02</td><td class="text-rose-500 font-semibold">Not detected</td></tr>
            <tr><td class="p-2 text-left">Xanthine</td><td>39</td><td>3</td><td>1</td></tr>
            <tr><td class="p-2 text-left">Adenine</td><td>15</td><td>1</td><td>40</td></tr>
            <tr><td class="p-2 text-left">Hypoxanthine</td><td>24</td><td>1</td><td>2</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 4. Effects of Mycorrhizal Fungi on 3 Plant Species
  'cb_9452092c': {
    prompt: `Mycorrhizal fungi in soil benefits many plants, substantially increasing the mass of some. A student conducted an experiment to illustrate this effect. The student chose three plant species for the experiment, including two that are mycorrhizal hosts (species known to benefit from mycorrhizal fungi) and one nonmycorrhizal species (a species that doesn't benefit from and may even be harmed by mycorrhizal fungi). The student then grew several plants from each species both in soil containing mycorrhizal fungi and in soil that had been treated to kill mycorrhizal and other fungi. After several weeks, the student measured the plants' average mass and was surprised to discover that ______\n\nWhich choice most effectively uses data from the table to complete the statement?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Effects of Mycorrhizal Fungi on 3 Plant Species</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2 border border-[var(--border-main)]">Plant species</th>
              <th class="p-2 border border-[var(--border-main)]">Mycorrhizal host</th>
              <th class="p-2 border border-[var(--border-main)] text-emerald-500 font-bold">Mass in Soil with Fungi (g)</th>
              <th class="p-2 border border-[var(--border-main)] text-slate-500 font-bold">Mass in Treated Soil (g)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2 font-bold text-left">Corn</td><td class="text-emerald-500 font-semibold">Yes</td><td>15.1</td><td>3.8</td></tr>
            <tr><td class="p-2 font-bold text-left">Marigold</td><td class="text-emerald-500 font-semibold">Yes</td><td>10.2</td><td>2.4</td></tr>
            <tr class="bg-amber-500/10 font-bold"><td class="p-2 font-bold text-left">Broccoli</td><td class="text-rose-500 font-semibold">No</td><td class="text-emerald-600 dark:text-emerald-400">7.5</td><td class="text-slate-600 dark:text-slate-400">7.0</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 5. Clamshell Tools Found at Different Depths (ID 2)
  'cb_af125459': {
    prompt: `Two kinds of clamshell tools used by Neanderthals were dug up in a cave on the western coast of Italy. Archaeologist Paola Villa and her colleagues studied the tools and determined that Neanderthals either collected clams that had washed onto the beach or harvested clams from the seafloor and then sharpened the shells to make tools. The highest number of tools made from clamshells that were collected from the beach was found at a depth of ______\n\nWhich choice most effectively uses data from the table to complete the text?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Number and Origin of Clamshell Tools Found at Different Depths Below Cave Surface</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2.5 border border-[var(--border-main)]">Depth Below Surface (m)</th>
              <th class="p-2.5 border border-[var(--border-main)] text-blue-500 font-bold">Beach Clamshells Collected</th>
              <th class="p-2.5 border border-[var(--border-main)] text-amber-500 font-bold">Seafloor Clamshells Harvested</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2 font-bold">2–3</td><td>7</td><td>0</td></tr>
            <tr class="bg-blue-500/15 font-bold"><td class="p-2">3–4</td><td class="text-blue-600 dark:text-blue-400 text-sm">99</td><td class="text-amber-600 dark:text-amber-400">33</td></tr>
            <tr><td class="p-2 font-bold">4–5</td><td>2</td><td>0</td></tr>
            <tr><td class="p-2 font-bold">5–6</td><td>18</td><td>7</td></tr>
            <tr><td class="p-2 font-bold">6–7</td><td>1</td><td>0</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 6. Banks of Provo River Downstream of Jordanelle Dam
  'cb_d83c3d54': {
    prompt: `The Jordanelle Dam was built on the Provo River in Utah in 1992. Earth scientist Adriana E. Martinez and colleagues tracked changes to the environment on the banks of the river downstream of the dam, including how much grass and forest cover were present. They concluded that the dam changed the flow of the river in ways that benefited grass plants but didn't benefit trees.\n\nWhich choice best describes data from the graph that support Martinez and colleagues' conclusion?`,
    svg: makeBarChartSvg({
      title: 'Characteristics of the Banks of the Provo River Downstream of Jordanelle Dam',
      yAxisLabel: 'Area (sq meters)',
      yMax: 140000,
      yStep: 20000,
      categories: ['1987', '1993', '2006'],
      series: [
        { name: 'Grass cover', color: '#10b981', data: [58000, 85000, 125000] },
        { name: 'Bare soil', color: '#f59e0b', data: [70000, 45000, 25000] },
        { name: 'Forest cover', color: '#3b82f6', data: [75000, 65000, 55000] }
      ]
    })
  },

  // 7. Robots in Different Occupations
  'cb_dd349efc': {
    prompt: `Georgia Tech roboticists De'Aira Bryant and Ayanna Howard, along with ethicist Jason Borenstein, were interested in people's perceptions of robots' competence. They recruited participants and asked them how likely they think it is that a robot could do the work required in various occupations. Participants' evaluations varied widely depending on which occupation was being considered; for example, ______\n\nWhich choice most effectively uses data from the table to complete the example?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Participants' Evaluation of Likelihood That Robots Can Work Effectively in Occupations</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2 border border-[var(--border-main)] text-left">Occupation</th>
              <th class="p-2 border border-[var(--border-main)] text-rose-500 font-bold">Unlikely (%)</th>
              <th class="p-2 border border-[var(--border-main)] text-slate-500 font-bold">Neutral (%)</th>
              <th class="p-2 border border-[var(--border-main)] text-emerald-500 font-bold">Likely (%)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr class="bg-emerald-500/10 font-bold"><td class="p-2 text-left font-bold">Tour guide</td><td>10%</td><td>8%</td><td class="text-emerald-600 dark:text-emerald-400">82%</td></tr>
            <tr><td class="p-2 text-left">TV news anchor</td><td>24%</td><td>9%</td><td>67%</td></tr>
            <tr><td class="p-2 text-left">Teacher</td><td>37%</td><td>16%</td><td>47%</td></tr>
            <tr><td class="p-2 text-left">Firefighter</td><td>62%</td><td>9%</td><td>30%</td></tr>
            <tr class="bg-rose-500/10 font-bold"><td class="p-2 text-left font-bold">Surgeon</td><td class="text-rose-600 dark:text-rose-400">74%</td><td>9%</td><td class="text-rose-600 dark:text-rose-400">16%</td></tr>
          </tbody>
        </table>
        <p class="text-[10px] text-[var(--text-muted)] italic mt-1.5 text-center">Note: Rows in table may not add up to 100% due to rounding.</p>
      </div>
    `
  },

  // 8. Nitrate and Phosphate Concentrations in Seawater
  'cb_e1546fd6': {
    prompt: `After a volcanic eruption spilled lava into North Pacific Ocean waters, a dramatic increase of diatoms (a kind of phytoplankton) near the surface occurred. Scientists assumed the diatoms were thriving on nutrients such as phosphate from the lava, but analysis showed these nutrients weren't present near the surface in forms diatoms can consume. However, there was an abundance of usable nitrate, a nutrient usually found in much deeper water and almost never found in lava. Microbial oceanographer Sonya Dyhrman and colleagues believe that as the lava plunged nearly 300 meters below the surface it dislodged pockets of this nutrient, releasing it to float upward, given that ______\n\nWhich choice most effectively uses data from the table to complete the statement?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Average Nitrate and Phosphate Concentrations in Seawater after Volcanic Eruption</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th rowspan="2" class="p-2 border border-[var(--border-main)]">Nutrient (µmol/L)</th>
              <th colspan="2" class="p-2 border border-[var(--border-main)] text-rose-500 font-bold">Lava-Affected Area</th>
              <th colspan="2" class="p-2 border border-[var(--border-main)] text-blue-500 font-bold">Outside Lava Area</th>
            </tr>
            <tr>
              <th class="p-1.5 border border-[var(--border-main)] font-normal text-[9px]">5–45 m</th>
              <th class="p-1.5 border border-[var(--border-main)] font-normal text-[9px]">75–125 m</th>
              <th class="p-1.5 border border-[var(--border-main)] font-normal text-[9px]">5–45 m</th>
              <th class="p-1.5 border border-[var(--border-main)] font-normal text-[9px]">75–125 m</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr class="bg-blue-500/10 font-bold"><td class="p-2 text-left font-bold">Nitrate</td><td class="text-blue-600 font-bold">3.1</td><td class="text-blue-600 font-bold">0.4</td><td>≤0.03</td><td>≤0.01</td></tr>
            <tr><td class="p-2 text-left font-bold">Phosphate</td><td>0.17</td><td>0.09</td><td>0.14</td><td>0.06</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 9. Infrared Beam Breaks by Mice Treated with CNO or Saline
  'cb_e2829dd7': {
    prompt: `To investigate the influence of certain estrogen-responsive neurons on energy expenditure, biologist Stephanie Correa et al. treated female and male mice with either saline solution or clozapine-N-oxide (CNO), which activates the neurons. Monitoring the activity levels of the mice by measuring how frequently the animals broke infrared beams crossing their enclosures, Correa et al. found that the mice in their study showed sex-specific differences in response to neuron activation: ______\n\nWhich choice most effectively uses data from the graph to complete the assertion?`,
    svg: makeBarChartSvg({
      title: 'Activity Levels (Infrared Beam Breaks) of Mice by Treatment and Sex',
      yAxisLabel: 'Beam Breaks (Count)',
      yMax: 1500,
      yStep: 250,
      categories: ['Females', 'Males'],
      series: [
        { name: 'Saline (Control)', color: '#64748b', data: [450, 400] },
        { name: 'CNO (Neuron Activated)', color: '#ec4899', data: [1350, 580] }
      ]
    })
  },

  // 10. Singer Sewing Machine Sales
  'cb_df34b586': {
    prompt: `By the early 1900s, the Singer Corporation, a US sewing machine manufacturer founded in 1851, began to see rapidly increasing sales abroad, particularly in Russia, Germany, and the United Kingdom. These markets were responsible for the bulk of Singer's overseas sales, but demand for the company's machines in other countries also grew significantly in the early twentieth century. For instance, sales of their sewing machines in ______\n\nWhich choice most effectively uses data from the graph to complete the example?`,
    svg: makeBarChartSvg({
      title: 'Singer Sewing Machine Sales in Four Countries, 1903–1918',
      yAxisLabel: 'Machines Sold',
      yMax: 60000,
      yStep: 10000,
      categories: ['1903', '1908', '1913', '1918'],
      series: [
        { name: 'The Philippines', color: '#3b82f6', data: [5000, 10000, 35000, 52000] },
        { name: 'Australia', color: '#f59e0b', data: [22000, 24000, 25000, 26000] },
        { name: 'New Zealand', color: '#10b981', data: [8000, 8500, 9000, 8800] }
      ]
    })
  },

  // 11. Corn-Related Vocabulary in Southeastern Languages
  'cb_35ec767c': {
    prompt: `In Caddo, a language from what is now the US Southeast, vocabulary pertaining to corn cultivation resembles equivalent vocabulary in the Totozoquean language family in Mexico. This resemblance is perhaps attributable to cultural contact: such words could have entered Caddo through the intermediary of the neighboring but unrelated Chitimacha language, concurrent with the dissemination of corn itself from Mexico into the Southeast after 700 CE. That the vocabulary pertaining to domestic crops accompanies them as they diffuse into new regions is an established phenomenon globally. Crops may also be decoupled from vocabulary altogether: corn cultivation became ubiquitous among the Southeastern tribes, yet ______\n\nWhich choice most effectively uses data from the table to complete the statement?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-left">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Corn-Related Vocabulary in Various Southeastern Languages</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2 border border-[var(--border-main)]">Language family</th>
              <th class="p-2 border border-[var(--border-main)]">Word (language)</th>
              <th class="p-2 border border-[var(--border-main)] text-center">Translation</th>
              <th class="p-2 border border-[var(--border-main)] text-center">Totozoquean Origin?</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2 font-bold">Muskogean</td><td>tanchi' (Chickasaw); tanchi (Choctaw); vce (Muscogee)</td><td class="text-center">corn</td><td class="text-center text-rose-500 font-bold">No</td></tr>
            <tr><td class="p-2 font-bold">Iroquoian</td><td>se-lu (Cherokee)</td><td class="text-center">corn</td><td class="text-center text-rose-500 font-bold">No</td></tr>
            <tr class="bg-emerald-500/10 font-bold"><td class="p-2">Caddoan</td><td>-k'as- (Caddo)</td><td class="text-center">dried corn</td><td class="text-center text-emerald-500 font-bold">Yes</td></tr>
            <tr class="bg-emerald-500/10 font-bold"><td class="p-2">Chitimacha</td><td>k'asma (Chitimacha)</td><td class="text-center">corn</td><td class="text-center text-emerald-500 font-bold">Yes</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 12. Ecosystem Services Affected by Invasive Species
  'cb_56f477fb': {
    prompt: `To assess the impact of invasive species on ecosystems in Africa, Benis N. Egoh and colleagues reviewed government reports from those nations about how invasive species are undermining ecosystem services (aspects of the ecosystem on which residents depend). The services were sorted into three categories: provisioning (material resources from the ecosystem), regulating (natural processes such as cleaning the air or water), and cultural (nonmaterial benefits of ecosystems). Egoh and her team assert that countries in each region reported effects on provisioning services and that provisioning services represent the majority of the reported services.\n\nWhich choice best describes data from the table that support Egoh and colleagues' assertion?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Distribution of Ecosystem Services Affected by Invasive Species by Service Type</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2 border border-[var(--border-main)] text-left">Region</th>
              <th class="p-2 border border-[var(--border-main)] text-emerald-500 font-bold">Provisioning (75% Overall)</th>
              <th class="p-2 border border-[var(--border-main)] text-blue-500 font-bold">Regulating (21% Overall)</th>
              <th class="p-2 border border-[var(--border-main)] text-amber-500 font-bold">Cultural (4% Overall)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2 text-left font-bold">West</td><td class="text-emerald-600 font-bold">73%</td><td>27%</td><td>0%</td></tr>
            <tr><td class="p-2 text-left font-bold">North</td><td class="text-emerald-600 font-bold">88%</td><td>12%</td><td>0%</td></tr>
            <tr><td class="p-2 text-left font-bold">South</td><td class="text-emerald-600 font-bold">79%</td><td>14%</td><td>7%</td></tr>
            <tr><td class="p-2 text-left font-bold">East</td><td class="text-emerald-600 font-bold">83%</td><td>6%</td><td>11%</td></tr>
            <tr class="bg-amber-500/10 font-bold"><td class="p-2 text-left font-bold">Central</td><td class="text-emerald-600 font-bold">33%</td><td>67%</td><td>0%</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 13. Credited Film Output of Indigenous Figures
  'cb_5cf5c0d3': {
    prompt: `Some researchers studying Indigenous actors and filmmakers in the United States have turned their attention to the early days of cinema, particularly the 1910s and 1920s, when people like James Young Deer, Dark Cloud, Edwin Carewe, and Lillian St. Cyr (known professionally as Red Wing) were involved in one way or another with numerous films. In fact, so many films and associated records for this era have been lost that counts of those four figures' output should be taken as bare minimums rather than totals; it's entirely possible, for example, that ______\n\nWhich choice most effectively uses data from the table to complete the example?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-left">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Credited Film Output of James Young Deer, Dark Cloud, Edwin Carewe, and Lillian St. Cyr</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2 border border-[var(--border-main)]">Individual</th>
              <th class="p-2 border border-[var(--border-main)] text-center">Years active</th>
              <th class="p-2 border border-[var(--border-main)]">Number of films known and commonly credited</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2 font-bold">James Young Deer</td><td class="text-center font-mono">1909–1924</td><td>33 (actor), 35 (director), 10 (writer)</td></tr>
            <tr><td class="p-2 font-bold">Dark Cloud</td><td class="text-center font-mono">1910–1920</td><td>35 (actor), 1 (writer)</td></tr>
            <tr class="bg-blue-500/10 font-bold"><td class="p-2 font-bold">Edwin Carewe</td><td class="text-center font-mono">1912–1934</td><td>47 (actor), <span class="text-blue-500 font-bold">58 (director)</span>, 20 (producer), 4 (writer)</td></tr>
            <tr class="bg-amber-500/10 font-bold"><td class="p-2 font-bold">Lillian St. Cyr (Red Wing)</td><td class="text-center font-mono">1908–1921</td><td><span class="text-amber-500 font-bold">66 (actor)</span></td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 14. Tadpole Body Mass and Toxin Production
  'cb_2c06139b': {
    prompt: `Ecologist Veronika Bókony and colleagues investigated within-species competition among common toads (Bufo bufo), a species that secretes various unpleasant-tasting toxins called bufadienolides in response to threats. The researchers tested B. bufo tadpoles' responses to different levels of competition by creating ponds with different tadpole population densities but a fixed amount of food. Based on analysis of the tadpoles after three weeks, the researchers concluded that increased competition drove bufadienolide production at the expense of growth.\n\nWhich choice uses data from the table to most effectively support the researchers' conclusion?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Tadpole Body Mass and Toxin Production after Three Weeks in Ponds</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2 border border-[var(--border-main)]">Density</th>
              <th class="p-2 border border-[var(--border-main)] text-blue-500 font-bold">Body Mass (mg)</th>
              <th class="p-2 border border-[var(--border-main)]">Distinct Toxins</th>
              <th class="p-2 border border-[var(--border-main)]">Total Toxin (ng)</th>
              <th class="p-2 border border-[var(--border-main)] text-amber-500 font-bold">Concentration (ng/mg)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2 font-bold">Low</td><td class="text-blue-500 font-bold">258.97</td><td>22.08</td><td>4,664.99</td><td class="text-amber-500">171.43</td></tr>
            <tr><td class="p-2 font-bold">Medium</td><td class="text-blue-500 font-bold">254.56</td><td>21.65</td><td>5,525.72</td><td class="text-amber-500">230.10</td></tr>
            <tr class="bg-rose-500/10 font-bold"><td class="p-2 font-bold">High</td><td class="text-rose-500 font-bold">193.87</td><td>22.69</td><td>5,815.51</td><td class="text-rose-500 font-bold">374.22</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 15. Speech Rate and Information Conveyed
  'cb_94978129': {
    prompt: `A group of researchers working in Europe, Asia, and Oceania conducted a study to determine how quickly different Eurasian languages are typically spoken (in syllables per second) and how much information they can effectively convey (in bits per second). They found that, although languages vary widely in the speed at which they are spoken, the amount of information languages can effectively convey tends to vary much less. Thus, they claim that two languages with very different spoken rates can nonetheless convey the same amount of information in a given amount of time.\n\nWhich choice best describes data from the table that support the researchers' claim?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Approximate Rates of Speech and Information Conveyed for Five Languages</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2 border border-[var(--border-main)] text-left">Language</th>
              <th class="p-2 border border-[var(--border-main)] text-blue-500 font-bold">Rate of Speech (syllables/sec)</th>
              <th class="p-2 border border-[var(--border-main)] text-emerald-500 font-bold">Information Rate (bits/sec)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr><td class="p-2 text-left font-bold">Serbian</td><td>7.2</td><td>39.1</td></tr>
            <tr class="bg-blue-500/10 font-bold"><td class="p-2 text-left">Spanish</td><td class="text-blue-500 font-bold">7.7</td><td class="text-emerald-500 font-bold">42.0</td></tr>
            <tr class="bg-emerald-500/10 font-bold"><td class="p-2 text-left">Vietnamese</td><td class="text-blue-500 font-bold">5.3</td><td class="text-emerald-500 font-bold">42.5</td></tr>
            <tr><td class="p-2 text-left font-bold">Thai</td><td>4.7</td><td>33.8</td></tr>
            <tr><td class="p-2 text-left font-bold">Hungarian</td><td>5.9</td><td>34.6</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  // 16. Cosmic Dust Ablation Rates
  'cb_55df0275': {
    prompt: `Earth's atmosphere is bombarded by cosmic dust originating from several sources: short-period comets (SPCs), particles from the asteroid belt (ASTs), Halley-type comets (HTCs), and Oort cloud comets (OCCs). Some of the dust's material vaporizes in the atmosphere in a process called ablation, and the faster the particles move, the higher the rate of ablation. Astrophysicist Juan Diego Carrillo-Sánchez led a team that calculated average ablation rates for elements in the dust (such as iron and potassium) and showed that material in slower-moving SPC or AST dust has a lower rate than the same material in faster-moving HTC or OCC dust. For example, whereas the average ablation rate for iron from AST dust is 28%, the average rate for ______\n\nWhich choice most effectively uses data from the table to complete the example?`,
    svg: `
      <div class="w-full overflow-x-auto text-xs font-sans">
        <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden text-center">
          <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center">Ablation Rates for Three Elements in Cosmic Dust, by Dust Source</caption>
          <thead class="bg-[var(--bg-surface)] text-[var(--text-muted)] font-mono text-[10px] uppercase">
            <tr>
              <th class="p-2 border border-[var(--border-main)] text-left">Element</th>
              <th class="p-2 border border-[var(--border-main)]">SPC</th>
              <th class="p-2 border border-[var(--border-main)] text-amber-500 font-bold">AST</th>
              <th class="p-2 border border-[var(--border-main)] text-blue-500 font-bold">HTC</th>
              <th class="p-2 border border-[var(--border-main)] text-purple-500 font-bold">OCC</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--border-main)] font-mono text-[11px]">
            <tr class="bg-blue-500/10 font-bold"><td class="p-2 text-left font-bold">Iron</td><td>20%</td><td class="text-amber-500">28%</td><td class="text-blue-500 text-sm">90%</td><td>98%</td></tr>
            <tr><td class="p-2 text-left font-bold">Potassium</td><td>44%</td><td>74%</td><td>97%</td><td>100%</td></tr>
            <tr><td class="p-2 text-left font-bold">Sodium</td><td>45%</td><td>75%</td><td>99%</td><td>100%</td></tr>
          </tbody>
        </table>
      </div>
    `
  }
};

let appliedCount = 0;

exams.forEach(exam => {
  ['rwModule1', 'rwModule2Hard', 'rwModule2Easy', 'mathModule1', 'mathModule2Hard', 'mathModule2Easy'].forEach(modKey => {
    (exam[modKey] || []).forEach(q => {
      if (additionalTableFixes[q.id]) {
        appliedCount++;
        q.prompt = additionalTableFixes[q.id].prompt;
        q.diagramSvg = additionalTableFixes[q.id].svg;
      }
    });
  });
});

fs.writeFileSync(dataFilePath, JSON.stringify(exams, null, 2), 'utf8');

console.log('Successfully applied all 16 table/chart fixes!');
console.log('Updated question instances across all exam modules:', appliedCount);
