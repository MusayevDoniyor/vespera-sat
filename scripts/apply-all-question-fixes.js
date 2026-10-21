const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

// Helper to generate SVG Bar Chart
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
    const displayVal = val >= 1000 ? `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k` : val;
    yTicks += `
      <line x1="${padL}" y1="${y}" x2="${padL + chartW}" y2="${y}" stroke="currentColor" stroke-opacity="0.12" stroke-dasharray="2 2" />
      <text x="${padL - 8}" y="${y + 4}" font-size="10" font-family="monospace" fill="currentColor" opacity="0.65" text-anchor="end">${displayVal}</text>
    `;
  }

  const numCats = categories.length;
  const catWidth = chartW / numCats;
  const numSeries = series.length;
  const barGap = 3;
  const groupPad = catWidth * 0.12;
  const usableWidth = catWidth - 2 * groupPad;
  const barWidth = Math.max(7, (usableWidth - (numSeries - 1) * barGap) / numSeries);

  let bars = '';
  let catLabels = '';

  categories.forEach((cat, cIdx) => {
    const groupX = padL + cIdx * catWidth + groupPad;
    const catCenterX = padL + (cIdx + 0.5) * catWidth;
    catLabels += `<text x="${catCenterX}" y="${padT + chartH + 18}" font-size="10" font-weight="600" font-family="sans-serif" fill="currentColor" opacity="0.9" text-anchor="middle">${cat}</text>`;

    series.forEach((s, sIdx) => {
      const val = s.data[cIdx];
      const barH = Math.max(2, (val / yMax) * chartH);
      const bx = groupX + sIdx * (barWidth + barGap);
      const by = padT + chartH - barH;
      const displayVal = val >= 1000 ? `${Math.round(val / 1000)}k` : val;
      bars += `
        <rect x="${bx}" y="${by}" width="${barWidth}" height="${barH}" rx="3" fill="${s.color}" opacity="0.9" />
        <text x="${bx + barWidth / 2}" y="${by - 4}" font-size="8.5" font-family="monospace" font-weight="700" fill="${s.color}" text-anchor="middle">${displayVal}</text>
      `;
    });
  });

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
    <svg viewBox="0 0 ${width} ${height}" class="w-full max-w-[480px] h-auto my-2 text-[var(--text-main)]" xmlns="http://www.w3.org/2000/svg">
      <text x="${width / 2}" y="18" font-size="12" font-weight="700" font-family="sans-serif" fill="currentColor" text-anchor="middle">${title}</text>
      <text transform="rotate(-90)" x="${-(padT + chartH / 2)}" y="16" font-size="10" font-family="sans-serif" fill="currentColor" opacity="0.75" text-anchor="middle">${yAxisLabel}</text>
      ${yTicks}
      <line x1="${padL}" y1="${padT + chartH}" x2="${padL + chartW}" y2="${padT + chartH}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5" />
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5" />
      ${bars}
      ${catLabels}
      ${legend}
    </svg>
  `.trim();
}

// Helper to generate SVG Line Chart
function makeLineChartSvg({ title, yAxisLabel, yMax, yStep, categories, points, height = 260, width = 480 }) {
  const padL = 60;
  const padR = 25;
  const padT = 35;
  const padB = 55;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const numSteps = Math.round(yMax / yStep);
  let yTicks = '';
  for (let i = 0; i <= numSteps; i++) {
    const val = i * yStep;
    const y = padT + chartH - (val / yMax) * chartH;
    const displayVal = val >= 1000 ? `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)}k` : val;
    yTicks += `
      <line x1="${padL}" y1="${y}" x2="${padL + chartW}" y2="${y}" stroke="currentColor" stroke-opacity="0.12" stroke-dasharray="2 2" />
      <text x="${padL - 8}" y="${y + 4}" font-size="10" font-family="monospace" fill="currentColor" opacity="0.65" text-anchor="end">${displayVal}</text>
    `;
  }

  const numCats = categories.length;
  const stepX = chartW / (numCats - 1);

  let pathD = '';
  let dots = '';
  let catLabels = '';

  categories.forEach((cat, idx) => {
    const cx = padL + idx * stepX;
    const val = points[idx];
    const cy = padT + chartH - (val / yMax) * chartH;
    if (idx === 0) {
      pathD += `M ${cx} ${cy}`;
    } else {
      pathD += ` L ${cx} ${cy}`;
    }
    dots += `
      <circle cx="${cx}" cy="${cy}" r="4" fill="#3b82f6" stroke="#ffffff" stroke-width="1.5" />
      <text x="${cx}" y="${cy - 8}" font-size="9" font-family="monospace" font-weight="700" fill="#2563eb" text-anchor="middle">${val}</text>
    `;
    catLabels += `<text x="${cx}" y="${padT + chartH + 18}" font-size="10" font-family="sans-serif" fill="currentColor" opacity="0.85" text-anchor="middle">${cat}</text>`;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" class="w-full max-w-[480px] h-auto my-2 text-[var(--text-main)]" xmlns="http://www.w3.org/2000/svg">
      <text x="${width / 2}" y="18" font-size="12" font-weight="700" font-family="sans-serif" fill="currentColor" text-anchor="middle">${title}</text>
      <text transform="rotate(-90)" x="${-(padT + chartH / 2)}" y="16" font-size="10" font-family="sans-serif" fill="currentColor" opacity="0.75" text-anchor="middle">${yAxisLabel}</text>
      ${yTicks}
      <line x1="${padL}" y1="${padT + chartH}" x2="${padL + chartW}" y2="${padT + chartH}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5" />
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5" />
      <path d="${pathD}" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      ${dots}
      ${catLabels}
    </svg>
  `.trim();
}

// Helper to generate clean HTML Table
function makeHtmlTable({ caption, headers, rows }) {
  const ths = headers.map(h => `<th class="px-3 py-2 border border-[var(--border-main)] text-left font-mono font-bold uppercase text-[10.5px] bg-[var(--bg-surface)] text-[var(--text-muted)]">${h}</th>`).join('');
  const trs = rows.map((r, rIdx) => {
    const tds = r.map((cell, cIdx) => `<td class="px-3 py-2 border border-[var(--border-main)] ${cIdx === 0 ? 'font-medium text-[var(--text-main)]' : 'text-center font-mono text-[var(--text-secondary)]'}">${cell}</td>`).join('');
    const rowBg = rIdx % 2 === 1 ? 'bg-[var(--bg-surface)]/40' : 'bg-[var(--bg-card)]';
    return `<tr class="${rowBg}">${tds}</tr>`;
  }).join('');

  return `
    <div class="w-full overflow-x-auto text-xs font-sans my-2">
      <table class="w-full border-collapse border border-[var(--border-main)] rounded-xl overflow-hidden shadow-xs">
        <caption class="font-bold text-xs pb-2 text-[var(--text-main)] text-center tracking-wide">${caption}</caption>
        <thead><tr>${ths}</tr></thead>
        <tbody>${trs}</tbody>
      </table>
    </div>
  `.trim();
}

// -------------------------------------------------------------
// DEFINITION OF ALL 31 TARGET FIXES
// -------------------------------------------------------------
const FIXES = {
  // MATH GEOMETRY: Triangle CAE and Triangle CBD
  'q_real_sep2026_16': {
    diagram_svg: `
      <svg viewBox="0 0 380 230" class="w-full max-w-[360px] h-auto text-[var(--text-main)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="190,25 60,195 320,195" stroke="currentColor" stroke-width="2.5" class="fill-[var(--bg-card)]/40" />
        <line x1="125" y1="110" x2="255" y2="110" stroke="#3b82f6" stroke-width="2.5" />
        <path d="M 185,106 L 195,110 L 185,114" fill="#3b82f6" stroke="#3b82f6" stroke-width="1" />
        <path d="M 185,191 L 195,195 L 185,199" fill="currentColor" stroke="currentColor" stroke-width="1" />
        <path d="M 145,110 A 20 20 0 0 1 133,121" fill="none" stroke="#f59e0b" stroke-width="2" />
        <text x="145" y="130" class="text-xs font-bold fill-amber-500 font-mono">57°</text>
        <path d="M 85,195 A 25 25 0 0 1 73,178" fill="none" stroke="#10b981" stroke-width="2" />
        <text x="88" y="185" class="text-xs font-bold fill-emerald-500 font-mono">?°</text>
        <text x="190" y="18" text-anchor="middle" class="text-sm font-bold fill-[var(--text-main)]">C</text>
        <text x="110" y="112" text-anchor="end" class="text-sm font-bold fill-blue-500">B</text>
        <text x="270" y="112" text-anchor="start" class="text-sm font-bold fill-blue-500">D</text>
        <text x="45" y="202" text-anchor="end" class="text-sm font-bold fill-emerald-500">A</text>
        <text x="335" y="202" text-anchor="start" class="text-sm font-bold fill-[var(--text-main)]">E</text>
        <text x="190" y="150" text-anchor="middle" class="text-[11px] font-bold fill-blue-500 font-mono">
          BD ∥ AE ⇒ △CAE ∼ △CBD (Scale: AE = 25·BD)
        </text>
      </svg>
    `.trim()
  },

  // 10 CHART QUESTIONS
  'cb_e441da80': {
    passage: `Investigative journalists research and report about fraud, corruption, public hazards, and more. The graph shows the number of investigative articles published in the Albuquerque Journal newspaper from 2010 to 2019. According to an analyst, although the number of investigative articles published in this newspaper has varied significantly over the period shown, the number overall has fallen since 2010.`,
    diagram_svg: makeLineChartSvg({
      title: 'Investigative Articles Published in the Albuquerque Journal (2010–2019)',
      yAxisLabel: 'Number of articles',
      yMax: 1750,
      yStep: 250,
      categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
      points: [1000, 1200, 1350, 1600, 1400, 1100, 950, 1000, 750, 500]
    })
  },

  'cb_8af28416': {
    passage: `Organic farming is a method of growing food that tries to reduce environmental harm by using natural forms of pest control and avoiding fertilizers made with synthetic materials. Organic farms are still a small fraction of the total farms in the United States, but they have been becoming more popular. According to the US Department of Agriculture, in 2016 California had between 2,600 and 2,800 organic farms and ______`,
    diagram_svg: makeBarChartSvg({
      title: 'US States with Greatest Number of Organic Farms in 2016',
      yAxisLabel: 'Number of organic farms',
      yMax: 2800,
      yStep: 400,
      categories: ['California', 'Wisconsin', 'New York', 'Pennsylvania', 'Iowa', 'Washington'],
      series: [{ name: 'Farms', color: '#10b981', data: [2700, 1300, 1100, 800, 700, 700] }]
    })
  },

  'cb_30c3aa98': {
    passage: `Copper had been mined in the US for thousands of years, but large-scale commercial mining of copper took off starting in the late 1800s. This was due to several factors. Technological advancements in the mining industry led to improvements in the production of copper. This helped the country keep up with the growing number of people wanting to buy copper starting in the 1890s. At the same time, the growth of the railroad system made the transportation of copper in large batches much easier. Several states saw rapid growth in the production of this resource, for example: ______`,
    diagram_svg: makeBarChartSvg({
      title: 'Copper Production for Three States, 1889–1909',
      yAxisLabel: 'Millions of pounds',
      yMax: 400,
      yStep: 100,
      categories: ['1889', '1902', '1909'],
      series: [
        { name: 'Montana', color: '#3b82f6', data: [100, 290, 310] },
        { name: 'Arizona', color: '#f59e0b', data: [30, 130, 290] },
        { name: 'Michigan', color: '#10b981', data: [90, 170, 230] }
      ]
    })
  },

  'cb_1703403b': {
    passage: `A student is presenting average monthly rainfall totals in various Puerto Rican cities for a science class. During the presentation, the student notes that in September ______`,
    diagram_svg: makeBarChartSvg({
      title: 'Average September Rainfall in Select Puerto Rican Cities (1981–2010)',
      yAxisLabel: 'Rainfall (inches)',
      yMax: 14,
      yStep: 2,
      categories: ['Rincón', 'Isabela', 'San Sebastián', 'Ponce'],
      series: [{ name: 'September Rainfall', color: '#06b6d4', data: [6.1, 6.0, 10.9, 5.8] }]
    })
  },

  'cb_02848335': {
    passage: `Perovskite solar cells convert light into electricity more efficiently than earlier kinds of solar cells, and manufacturing advances have recently made them commercially attractive. One limitation of the cells, however, has to do with their electron transport layer (ETL), through which absorbed electrons must pass. Often the ETL is applied through a process called spin coating, but such ETLs are fairly inefficient at converting input power to output power. André Taylor and colleagues tested a novel spray coating method for applying the ETL. The team produced ETLs of various thicknesses and concluded that spray coating holds promise for improving the power conversion efficiency of ETLs in perovskite solar cells.`,
    diagram_svg: makeBarChartSvg({
      title: 'Power Conversion Efficiency of Solar Cells by ETL Method',
      yAxisLabel: 'Efficiency (%)',
      yMax: 18,
      yStep: 2,
      categories: ['Spray coating', 'Spin coating'],
      series: [
        { name: 'Lowest performing', color: '#f59e0b', data: [14.8, 10.4] },
        { name: 'Highest performing', color: '#3b82f6', data: [15.7, 13.1] }
      ]
    })
  },

  'cb_37a49687': {
    passage: `Mangroves are trees or bushes that grow on the coastlines of seas and rivers. Areas with mangroves are great places for young fish since they help keep these fish fed and protected while they grow. To study the importance of mangroves to young fish, researchers Mohamed A. Abu El-Regal and Nesreen K. Ibrahim collected and identified young fish from three different mangrove sites in the Egyptian Red Sea. They collected fish in the winter, spring, and autumn of 2010, collecting a total of 269 fish from 21 different species. For some species, more fish were collected in the winter than the other two seasons, for instance: ______`,
    diagram_svg: makeBarChartSvg({
      title: 'Young Fish Collected at Red Sea Mangrove Sites (2010)',
      yAxisLabel: 'Number of individual young fish',
      yMax: 40,
      yStep: 10,
      categories: ['Winter', 'Spring', 'Fall'],
      series: [
        { name: 'Common silver-biddy', color: '#3b82f6', data: [38, 12, 10] },
        { name: 'Red Sea goatfish', color: '#ef4444', data: [22, 28, 8] },
        { name: 'Milkfish', color: '#10b981', data: [25, 6, 0] }
      ]
    })
  },

  'cb_5d453dcc': {
    passage: `Economists Kerwin Kofi Charles and Melvin Stephens Jr. investigated a variety of factors that influence voter turnout in the United States. Using survey data that revealed whether respondents voted in national elections and how knowledgeable respondents are about politics, Charles and Stephens claim that the likelihood of voting is driven in part by potential voters’ confidence in their assessments of candidates—essentially, the more informed voters are about politics, the more confident they are at evaluating whether candidates share their views, and thus the more likely they are to vote.`,
    diagram_svg: makeBarChartSvg({
      title: 'Probability of Voting by Political Orientation (1=Dem, 4=Ind, 7=Rep)',
      yAxisLabel: 'Probability of voting (%)',
      yMax: 100,
      yStep: 20,
      categories: ['1', '2', '3', '4', '5', '6', '7'],
      series: [
        { name: 'Low information', color: '#94a3b8', data: [62, 56, 52, 44, 53, 58, 64] },
        { name: 'High information', color: '#3b82f6', data: [88, 82, 78, 71, 79, 84, 91] }
      ]
    })
  },

  'cb_be19faa1': {
    passage: `Urbanization, industrialization, and the warming climate create thermal pollution (excess heat) in the shallow subsurface soil. Susanne A. Benz and colleagues analyzed thousands of sites on three continents under one scenario in which surface temperature remains at the current level and under another in which the surface reaches the maximum plausible temperature. They then categorized each site according to the percentage of local home heating needs that could be met using this excess subsurface heat. The team concluded that if surface temperature approaches the maximum plausible level, the percentage of sites where thermal pollution could feasibly contribute to meeting home heating needs will increase.`,
    diagram_svg: makeBarChartSvg({
      title: 'Home Heating Needs Met with Subsurface Thermal Pollution',
      yAxisLabel: '% of sites analyzed',
      yMax: 90,
      yStep: 15,
      categories: ['0%', 'Up to 25%', 'More than 25%'],
      series: [
        { name: 'Current surface temp', color: '#3b82f6', data: [84, 8, 8] },
        { name: 'Max plausible temp', color: '#f59e0b', data: [18, 38, 44] }
      ]
    })
  },

  'cb_ccb1ab92': {
    passage: `Research suggests that REM sleep in animals is homeostatically regulated: animals compensate for periods of REM sleep deprivation by increasing subsequent REM sleep. When on land, fur seals get enough REM sleep, but during the weeks they’re in the water, they get almost none. In a study of fur seals’ sleep habits, researchers recorded the REM sleep (as a percentage of baseline) of fur seals once they had returned to land. They concluded that REM sleep may not be homeostatically regulated in fur seals, citing as evidence the fact that the seals in the study ______`,
    diagram_svg: makeBarChartSvg({
      title: 'Fur Seal REM Sleep on Land after Extended Period in Water',
      yAxisLabel: 'REM sleep (% of baseline)',
      yMax: 180,
      yStep: 20,
      categories: ['Day 1', 'Day 2'],
      series: [
        { name: 'Seal A', color: '#3b82f6', data: [165, 145] },
        { name: 'Seal B', color: '#10b981', data: [130, 98] },
        { name: 'Seal C', color: '#f59e0b', data: [120, 102] }
      ]
    })
  },

  'cb_d5b9ed0d': {
    passage: `To understand how expressions of anger in reviews of products affect readers of those reviews, business scholar Dezhi Yin and colleagues measured study participants’ responses to three versions of the same negative review—a control review expressing no anger, a review expressing a high degree of anger, and a review expressing a low degree of anger. Reviewing the data, a student concludes that the mere presence of anger in a review may not negatively affect readers’ perceptions of the review, but a high degree of anger in a review does worsen readers’ perceptions of the review.`,
    diagram_svg: makeBarChartSvg({
      title: 'Participants’ Mean Ratings Across Three Review Conditions',
      yAxisLabel: 'Mean rating (1–7 scale)',
      yMax: 7,
      yStep: 1,
      categories: ['Review helpfulness', 'Product attitude'],
      series: [
        { name: 'No anger (control)', color: '#3b82f6', data: [4.8, 4.2] },
        { name: 'Low anger', color: '#10b981', data: [5.2, 3.9] },
        { name: 'High anger', color: '#ef4444', data: [3.4, 3.6] }
      ]
    })
  },

  // 20 TABLE QUESTIONS
  'cb_24c1b7e4': {
    passage: `Economist Steve H. Hanke has shown that divided US Congresses—which occur when one party holds the majority in the House of Representatives and another holds the majority in the Senate—tend to accompany reductions in total federal outlays (spending) relative to gross domestic product (GDP), which Hanke interprets to reflect decreases in government size. Hanke calculated the percentage point change in total outlays (encompassing nondefense and defense outlays) for consecutive US Congresses. Hanke has pointed to his calculations as evidence that a divided Congress may be a “necessary but not sufficient condition” for a decrease in government size to occur.`,
    diagram_svg: makeHtmlTable({
      caption: 'Percentage Point Changes in US Federal Outlays Relative to GDP by Congressional Status',
      headers: ['Period', 'Congressional status', 'Change in total outlays', 'Change in nondefense', 'Change in defense'],
      rows: [
        ['1981–1988', 'divided', '−0.4', '−1.3', '0.9'],
        ['1975–1976', 'divided', '2.7', '3.0', '−0.3'],
        ['1977–1980', 'undivided', '0.3', '0.6', '−0.3'],
        ['1964–1968', 'undivided', '1.9', '1.4', '0.5'],
        ['1969–1974', 'divided', '−1.8', '2.1', '−3.9']
      ]
    })
  },

  'cb_014b3394': {
    passage: `When hibernating, Alaska marmots and Arctic ground squirrels enter a state called torpor, which minimizes the energy their bodies need to function. Often a hibernating animal will temporarily come out of torpor (called an arousal episode) and its metabolic rate will rise, burning more of the precious energy the animal needs to survive the winter. Alaska marmots hibernate in groups and therefore burn less energy keeping warm during these episodes than they would if they were alone. A researcher hypothesized that because Arctic ground squirrels hibernate alone, they would likely exhibit longer bouts of torpor and shorter arousal episodes than Alaska marmots.`,
    diagram_svg: makeHtmlTable({
      caption: 'Torpor Bouts and Arousal Episodes for Alaska Marmots and Arctic Ground Squirrels (2008–2011)',
      headers: ['Feature', 'Alaska marmots', 'Arctic ground squirrels'],
      rows: [
        ['Torpor bouts', '12', '10.5'],
        ['Duration per bout', '13.81 days', '16.77 days'],
        ['Arousal episodes', '11', '9.5'],
        ['Duration per episode', '21.2 hours', '14.2 hours']
      ]
    })
  },

  'cb_01c1d9ee': {
    passage: `Swahili is estimated to be the first language of up to 15 million people worldwide. It’s also an officially recognized language in Tanzania, Kenya, and the Democratic Republic of the Congo, which means these countries use Swahili in government documents and proceedings. But even in countries where almost everyone speaks Swahili, for many it isn’t their first language but is instead their second, third, or even fourth language.`,
    diagram_svg: makeHtmlTable({
      caption: 'Swahili Speakers in Three African Countries',
      headers: ['Country', 'Approximate number of speakers (millions)', 'Estimated % of population'],
      rows: [
        ['Democratic Republic of the Congo', '22', '25%'],
        ['Kenya', '55', '100%'],
        ['Tanzania', '61', '100%']
      ]
    })
  },

  'cb_0b96fa93': {
    passage: `For a school project, a forestry student needs to recommend a maple tree that is native to North America and won’t grow more than 60 feet in height. Based on the characteristics of five common maple trees, she has decided to select a ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Maximum Height of Maple Trees When Fully Grown',
      headers: ['Tree type', 'Maximum height (feet)', 'Native to North America'],
      rows: [
        ['Sugar maple', '75', 'yes'],
        ['Silver maple', '70', 'yes'],
        ['Red maple', '60', 'yes'],
        ['Japanese maple', '25', 'no'],
        ['Norway maple', '50', 'no']
      ]
    })
  },

  'cb_145da981': {
    passage: `Digital paywalls restrict access to online content to those with a paid subscription. In an investigation of the effect of paywalls on newspaper company revenues for print and digital subscriptions and advertising, Doug J. Chung and colleagues compared actual outcomes (with a paywall) to control estimates (without a paywall). The researchers concluded that introducing a paywall is generally more beneficial for larger newspapers, which have high circulation and tend to offer a substantial amount of unique online content.`,
    diagram_svg: makeHtmlTable({
      caption: 'Effect of Paywall Introduction on Newspaper Companies’ Revenues',
      headers: ['Newspaper', 'Total revenue change (US dollars in thousands)', 'Percentage change (%)', 'Newspaper size'],
      rows: [
        ['Los Angeles Times', '93,966', '12.5%', 'large'],
        ['The New York Times', '235,788', '20%', 'large'],
        ['The Denver Post', '−3,765', '−1%', 'small'],
        ['Sun Sentinel', '−24,899', '−11.9%', 'small'],
        ['Chicago Tribune', '94,492', '19%', 'large']
      ]
    })
  },

  'cb_38e79659': {
    passage: `Huge international exhibitions known as world’s fairs have been held since 1851, but the United States hasn’t hosted one since 1984. Architecture expert Mina Chow argues that this is because some people think the events are too expensive and not popular enough. For example, the 1984 World’s Fair cost &#36;350 million and had only ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Attendance and Cost of Hosting for Past Four US World’s Fairs',
      headers: ['World’s fairs held in the US', 'Cost (in US dollars)', 'Number of visitors'],
      rows: [
        ['Century 21 Exposition (1962)', '&#36;47 million', '9.60 million'],
        ['HemisFair ’68', '&#36;156 million', '6.40 million'],
        ['1984 World’s Fair', '&#36;350 million', '7.35 million'],
        ['Expo ’74', '&#36;78 million', '5.60 million']
      ]
    })
  },

  'cb_4042ff0b': {
    passage: `Nan Gao and her team conducted multiple surveys to determine participants’ levels of comfort in a room where the temperature was regulated by a commercial climate control system. Participants filled out surveys several times a day to indicate their level of comfort on a scale from −3 (very cold) to +3 (very hot), with 0 indicating neutral (neither warm nor cool), and to indicate how they would prefer the temperature to be adjusted. The table shows three participants’ responses in one of the surveys. According to the table, all three participants wanted the room to be cooler, ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Comfort Ratings and Temperature-Adjustment Preferences from One Survey',
      headers: ['Participant', 'Comfort rating (−3 to +3)', 'Preferred temperature adjustment'],
      rows: [
        ['20', '−2', 'Cooler'],
        ['1', '+1', 'Cooler'],
        ['21', '+1', 'Cooler']
      ]
    })
  },

  'cb_46e45728': {
    passage: `Wildlife researcher Dana L. Karelus and her colleagues tracked the movements of female and male adult mountain lions over three seasons: the cold-dry season, the hot-dry season, and the monsoon season. They found that the least amount of travel per day occurred in ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Daily Distance Traveled by Adult Mountain Lions in Three Seasons',
      headers: ['Season', 'Kilometers per day (adult females)', 'Kilometers per day (adult males)'],
      rows: [
        ['cold-dry', '9.28', '15.81'],
        ['monsoon', '12.64', '18.93'],
        ['hot-dry', '12.48', '18.87']
      ]
    })
  },

  'cb_5ff1ba73': {
    passage: `Guilds—local associations of artisans and merchants in the same industry—were widespread in France from the medieval period until the late eighteenth century. But guilds were much more numerous relative to the population in some cities than in others: for example, ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Guilds in French Cities in the Late Eighteenth Century',
      headers: ['City', 'Date', 'Inhabitants', 'Number of guilds', 'Inhabitants per guild'],
      rows: [
        ['Paris', '1766', '600,000', '133', '4,511'],
        ['Bordeaux', '1762', '80,000', '49', '1,633'],
        ['Rouen', '1775', '74,000', '112', '661'],
        ['Lyon', '1789', '143,000', '72', '1,986']
      ]
    })
  },

  'cb_75e07a4d': {
    passage: `To make sure they got the nutrition they needed while in space, the astronauts of NASA’s Gemini missions were given menus for three meals a day (meals A, B, and C) on a four-day rotating schedule. Looking at the sample of food items from these menus, a student notes that on day 1, the menu included ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Sample of Food Items from Gemini Mission Menus',
      headers: ['Food item', 'Day', 'Meal'],
      rows: [
        ['Sugar cookie cubes', '1', 'B'],
        ['Chicken and vegetables', '2', 'B'],
        ['Shrimp cocktail', '4', 'C'],
        ['Hot cocoa', '3', 'A']
      ]
    })
  },

  'cb_9debe79a': {
    passage: `The Navajo Nation has the largest land area of any tribal nation in the United States: over 27,000 square miles in the Southwest. Because this area is so huge and its communities are located at various elevations, the people of the Navajo Nation can experience different climate conditions depending on where they live. For example, in July, ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Average Temperatures in July in Four Locations in the Navajo Nation',
      headers: ['Location', 'Average highest temp (°F)', 'Average lowest temp (°F)'],
      rows: [
        ['Teec Nos Pos', '94°', '65°'],
        ['Cameron', '99°', '65°'],
        ['Ramah', '83°', '50°'],
        ['Tuba City', '83°', '50°']
      ]
    })
  },

  'cb_b2e54b50': {
    passage: `Researcher Xiaolu Jia and colleagues monitored individuals’ velocity and the surrounding crowd density as a group of study participants walked through a space and navigated around an obstacle. Participants rated how congested it seemed before the obstacle, after the obstacle, and overall, and the researchers correlated those ratings with velocity and density. (Correlations range from −1 to 1, with greater distance from 0 indicating greater strength). The researchers concluded that the correlations with velocity are stronger than those with density.`,
    diagram_svg: makeHtmlTable({
      caption: 'Correlations Between Congestion Ratings and Crowd Features',
      headers: ['Crowd feature', 'Before obstacle', 'After obstacle', 'Overall'],
      rows: [
        ['Density', '0.8592', '0.7308', '0.7447'],
        ['Velocity', '−0.9357', '−0.9518', '−0.8587']
      ]
    })
  },

  'cb_c4bee178': {
    passage: `Like Earth, some dwarf planets in the solar system have exactly one moon. Two examples of such dwarf planets are ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Moons of Dwarf Planets',
      headers: ['Dwarf planet name', 'Number of moons', 'Name of moons'],
      rows: [
        ['Haumea', '2', 'Hi‘iaka, Namaka'],
        ['Ceres', '0', 'N/A'],
        ['Makemake', '1', 'MK 2'],
        ['Eris', '1', 'Dysnomia'],
        ['Pluto', '5', 'Charon, Nix, Kerberos, Styx, Hydra']
      ]
    })
  },

  'cb_cbecb873': {
    passage: `Some whale species practice lunge feeding, in which they lunge toward prey with their mouths open at wide angles, collect the prey and the surrounding water, and then filter out the water through baleen plates in their mouths. Although the volume of water engulfed increases with whales’ body length, the surface area of whales’ baleen plates, which influences the rate at which water can be filtered, does not increase with body length to the same degree, which helps explain why ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Body Length, Filter Time, and Lunges per Dive for Four Whale Species',
      headers: ['Whale species', 'Typical adult body length (m)', 'Average filter time (sec)', 'Lunges per dive (>50m)'],
      rows: [
        ['fin', '18–22', '31.30', '3.95'],
        ['humpback', '11–17', '17.12', '6.28'],
        ['minke', '7–10', '8.88', '7.48'],
        ['blue', '24–34', '60.27', '4.02']
      ]
    })
  },

  'cb_ccf414c9': {
    passage: `E-books became an increasingly popular means of reading in the United States in the 2000s and 2010s, though that popularity was concentrated in titles that, like those in most fiction genres, are meant to be read straight through from beginning to end. For books in nonfiction genres that do not tell stories and require the reader to flip back and forth through a volume, e-books were significantly less commercially successful. This can be seen by comparing ______`,
    diagram_svg: makeHtmlTable({
      caption: 'E-book Sales as % of Total Unit Sales by Genre (2006, 2011, 2016)',
      headers: ['Genre', '2006', '2011', '2016'],
      rows: [
        ['science fiction and fantasy', '0.6%', '27.7%', '36.7%'],
        ['cookbooks', '0%', '2.9%', '10.5%'],
        ['travel guides', '0%', '5.5%', '24.6%'],
        ['romance', '0.3%', '40.6%', '56.2%']
      ]
    })
  },

  'cb_cf7491c1': {
    passage: `“Hot Jupiters” are gas planets that have a mass of at least 0.25 Jupiters (meaning that their mass is at least 25% of that of Jupiter) and an orbital period of less than 10 days (meaning that they complete one orbit around their star in less than 10 days), while “warm Jupiters” are gas planets that meet the same mass criterion but have orbital periods of more than 10 days. In 2021, Michigan State University astronomer Joseph Rodriguez and colleagues announced the discovery of five new gas exoplanets and asserted that four are hot Jupiters and one is a warm Jupiter.`,
    diagram_svg: makeHtmlTable({
      caption: 'Characteristics of Five Recently Discovered Gas Exoplanets',
      headers: ['Exoplanet designation', 'Mass (Jupiters)', 'Radius (Jupiters)', 'Orbital period (days)', 'Distance from Sun (parsecs)'],
      rows: [
        ['TOI-640 b', '0.88', '1.771', '5.003', '340'],
        ['TOI-1601 b', '0.99', '1.239', '5.331', '336'],
        ['TOI-628 b', '6.33', '1.060', '3.409', '178'],
        ['TOI-1478 b', '0.85', '1.060', '10.180', '153'],
        ['TOI-1333 b', '2.37', '1.396', '4.720', '200']
      ]
    })
  },

  'cb_d102706f': {
    passage: `The largest tyrannosaurids—the family of carnivorous dinosaurs that includes Tarbosaurus, Albertosaurus, and, most famously, Tyrannosaurus rex—are thought to have had the strongest bites of any land animals in Earth’s history. Determining the bite force of extinct animals can be difficult, however, and paleontologists Paul Barrett and Emily Rayfield have suggested that an estimate of dinosaur bite force may be significantly influenced by the methodology used in generating that estimate.`,
    diagram_svg: makeHtmlTable({
      caption: 'Estimates of Tyrannosaurid Bite Force Across Studies',
      headers: ['Study', 'Year', 'Estimation method', 'Approximate bite force (N)'],
      rows: [
        ['Cost et al.', '2019', 'muscular and skeletal modeling', '35,000–63,000'],
        ['Gignac and Erickson', '2017', 'tooth-bone interaction analysis', '8,000–34,000'],
        ['Meers', '2002', 'body-mass scaling', '183,000–235,000'],
        ['Bates and Falkingham', '2012', 'muscular and skeletal modeling', '35,000–57,000']
      ]
    })
  },

  'cb_df9c5a1d': {
    passage: `Alicia Montesinos-Navarro, Isabelle Storer, and Rocío Perez-Barrales recently examined several plots within a diverse plant community in southeast Spain. The researchers calculated that if individual plants were randomly distributed on this particular landscape, only about 15% would be with other plants in patches of vegetation. They counted the number of juvenile plants of five species growing in patches of vegetation and the number growing alone on bare ground and compared those numbers to what would be expected if the plants were randomly distributed. Based on these results, they claim that plants of these species that grow in close proximity to other plants gain an advantage at an early developmental stage.`,
    diagram_svg: makeHtmlTable({
      caption: 'Juvenile Plants on Bare Ground vs. Patches of Vegetation',
      headers: ['Species', 'Bare ground', 'Patches of vegetation', 'Total', '% in patches of vegetation'],
      rows: [
        ['T. moroderi', '9', '13', '22', '59.1%'],
        ['T. libanitis', '83', '120', '203', '59.1%'],
        ['H. syriacim', '95', '106', '201', '52.7%'],
        ['H. squamatum', '218', '321', '539', '59.6%'],
        ['H. stoechas', '11', '12', '23', '52.2%']
      ]
    })
  },

  'cb_f452410b': {
    passage: `The table shows data from paleontologist Angélica Torices and colleagues’ 2021 study of two sets of dinosaur tracks preserved in a fossilized lake bed in Spain. The tracks, referred to as La Torre 6A and La Torre 6B, were left by two individual theropods (dinosaurs that walked on two legs). The team’s findings suggest that of the two theropods, the one that left the La Torre 6B tracks had a higher maximum mean speed, ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Footprint Analysis for Two Sets of Theropod Tracks',
      headers: ['Tracks', 'Estimated footprint length (cm)', 'Average stride length (m)', 'Estimated mean speed (m/s)'],
      rows: [
        ['La Torre 6A', '32.8', '5.23', '6.5–10.3'],
        ['La Torre 6B', '28.9', '5.57', '8.8–12.4']
      ]
    })
  },

  'cb_faaf484f': {
    passage: `A city’s Parks and Recreation department is interested in providing residents with more opportunities for bicycling in their neighborhoods. They’re considering adding more bike paths and conducted a survey to understand where demand for more bike paths is highest. The survey indicated the highest level of demand, with 88 percent of the residents interested in adding more bike paths, is in the city’s ______`,
    diagram_svg: makeHtmlTable({
      caption: 'Residents of City Areas in Favor of Adding More Bike Paths',
      headers: ['City Area', 'Residents in favor of more bike paths (%)'],
      rows: [
        ['North East', '12%'],
        ['North Central', '26%'],
        ['North West', '46%'],
        ['South West', '88%'],
        ['South Central', '33%']
      ]
    })
  },

  // 2 VOCAB / CONVENTIONS FIXES (ESCAPE UNCLOSED DOLLARS)
  'cb_3118ca93': {
    passage: `The fashion resale market, in which consumers purchase secondhand clothing from stores and online sellers, generated nearly &#36;30 billion globally in 2019. Expecting to see continued growth, some analysts ______ that revenues will more than double by 2028.`
  },

  'cb_983d33fa': {
    passage: `In 1637, the price of tulips skyrocketed in Amsterdam, with single bulbs of rare varieties selling for up to the equivalent of &#36;200,000 in today’s US dollars. Some historians ______ that this “tulip mania” was the first historical instance of an asset bubble, which occurs when investors drive prices to highs not supported by actual demand.`
  }
};

async function applyFixes() {
  console.log('Applying all 33 targeted fixes...');

  // 1. Update PostgreSQL vespera.questions
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    let dbUpdated = 0;
    for (const [id, fix] of Object.entries(FIXES)) {
      const updates = [];
      const values = [];
      let idx = 1;

      if (fix.passage !== undefined) {
        updates.push(`passage = $${idx++}`);
        values.push(fix.passage);
      }
      if (fix.diagram_svg !== undefined) {
        updates.push(`diagram_svg = $${idx++}`);
        values.push(fix.diagram_svg);
      }
      if (fix.diagram_preset !== undefined) {
        updates.push(`diagram_preset = $${idx++}`);
        values.push(fix.diagram_preset);
      }

      if (updates.length > 0) {
        values.push(id);
        const query = `UPDATE vespera.questions SET ${updates.join(', ')} WHERE id = $${idx}`;
        const res = await client.query(query, values);
        if (res.rowCount > 0) dbUpdated += res.rowCount;
      }
    }
    await client.query('COMMIT');
    console.log(`Successfully updated ${dbUpdated} rows in PostgreSQL vespera.questions.`);
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('PostgreSQL update error:', e);
    throw e;
  } finally {
    client.release();
    await pool.end();
  }

  // 2. Update Mock Exams JSON (bluebook-exams-data.json)
  const examsPath = path.join(__dirname, '..', 'src', 'lib', 'bluebook-exams-data.json');
  const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));
  let mockUpdated = 0;

  exams.forEach(exam => {
    ['rwModule1', 'rwModule2Hard', 'rwModule2Easy', 'mathModule1', 'mathModule2Hard', 'mathModule2Easy'].forEach(modKey => {
      (exam[modKey] || []).forEach(q => {
        const fix = FIXES[q.id];
        if (fix) {
          if (fix.passage !== undefined) q.passage = fix.passage;
          if (fix.diagram_svg !== undefined) q.diagramSvg = fix.diagram_svg;
          if (fix.diagram_preset !== undefined) q.diagramPreset = fix.diagram_preset;
          mockUpdated++;
        }
      });
    });
  });

  fs.writeFileSync(examsPath, JSON.stringify(exams, null, 2), 'utf8');
  console.log(`Successfully updated ${mockUpdated} question instances in bluebook-exams-data.json.`);

  // 3. Update Master Export JSON (exported_all_questions.json)
  const exportPath = path.join(__dirname, 'exported_all_questions.json');
  if (fs.existsSync(exportPath)) {
    const exported = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
    let exportUpdated = 0;
    exported.forEach(q => {
      const fix = FIXES[q.id];
      if (fix) {
        if (fix.passage !== undefined) q.passage = fix.passage;
        if (fix.diagram_svg !== undefined) q.diagramSvg = fix.diagram_svg;
        if (fix.diagram_preset !== undefined) q.diagramPreset = fix.diagram_preset;
        exportUpdated++;
      }
    });
    fs.writeFileSync(exportPath, JSON.stringify(exported, null, 2), 'utf8');
    console.log(`Successfully updated ${exportUpdated} questions in exported_all_questions.json.`);
  }

  console.log('\nAll fixes successfully applied across DB, Mock Exams, and Master Bank!');
}

applyFixes().catch(err => {
  console.error('Fix script failed:', err);
  process.exit(1);
});
