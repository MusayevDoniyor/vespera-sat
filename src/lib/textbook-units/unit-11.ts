import { KhanFullUnit } from "../khan-textbook-units";

export const UNIT_11_ADVANCED_PSDA: KhanFullUnit = {
  id: "unit-11-advanced-psda",
  unitNumber: 11,
  title: "Unit 11: Advanced: Problem Solving & Data Analysis",
  slug: "unit-11-advanced-psda",
  tier: "Advanced",
  domain: "Problem Solving and Data Analysis",
  topicCode: "DAT-04",
  estimatedHours: "4 hours",
  description: "Nonlinear regression modeling (exponential vs quadratic scatterplots), comparing standard deviations without calculating, stratified and cluster sampling methods, confidence level interpretations, and compound interest models.",
  overviewSummary: "At the Advanced tier of Data Analysis, questions test your ability to model non-linear phenomena, inspect standard deviations visually without calculation, identify subtle sampling flaws, and evaluate compound growth dynamics under exponential conditions.",
  sections: [
    {
      id: "sec-u11-nonlinear-regression",
      title: "1. Non-Linear Regression: Linear vs. Quadratic vs. Exponential Models",
      readTime: "9 min read",
      summary: "How to instantly identify whether a table or scatterplot represents a linear, quadratic, or exponential relationship.",
      diagramType: "scatterplot-residuals",
      contentMarkdown: `### The Rate-of-Change Diagnostic Test
When given a table of values $(x, y)$ where $x$ increases by a constant step (e.g., $+1$ or $+5$):

1. **Linear Relationship ($y = mx + b$):**
   - **First Differences are CONSTANT:** Subtract consecutive $y$-values: $y_{n+1} - y_n = \\text{constant } m$.
   - The rate of change is constant.
2. **Quadratic Relationship ($y = ax^2 + bx + c$):**
   - **Second Differences are CONSTANT:** Take the differences of the first differences: $\\Delta(\\Delta y) = 2a = \\text{constant}$.
   - The rate of change itself increases or decreases at a constant linear rate.
3. **Exponential Relationship ($y = a \\cdot b^x$):**
   - **Ratios are CONSTANT:** Divide consecutive $y$-values: $\\frac{y_{n+1}}{y_n} = \\text{constant multiplier } b$.
   - The value changes by a **fixed percentage** in each equal time interval.

#### Summary Diagnostic Table:
| Model Type | Formula | Diagnostic Invariant |
|---|---|---|
| **Linear** | $y = mx + b$ | Equal additions: $y$ increases by a fixed amount per unit $x$ |
| **Quadratic** | $y = ax^2 + bx + c$ | Parabolic symmetry; second differences are constant |
| **Exponential** | $y = a(1 + r)^x$ | Equal multiplications: $y$ scales by a fixed factor $b = (1+r)$ |`,
      keyTakeaways: [
        "If y values increase by equal differences, it is linear.",
        "If y values increase by equal percentage multipliers/ratios, it is exponential.",
        "In Desmos, use regression: y1 ~ a*b^(x1) for exponential or y1 ~ a*x1^2 + b*x1 + c for quadratic."
      ],
      desmosExample: {
        title: "Desmos Exponential Regression",
        expression: "y_1 ~ a*b^{x_1}",
        tip: "Enter table data into x1 and y1. Type 'y1 ~ a*b^(x1)' to fit an exponential model and get parameter b."
      }
    },
    {
      id: "sec-u11-standard-deviation-inspection",
      title: "2. Standard Deviation Comparison by Visual Inspection",
      readTime: "8 min read",
      summary: "Comparing the spread of histograms and dotplots without performing any arithmetic.",
      contentMarkdown: `### The Principle of Dispersion
Standard deviation ($\\sigma$) measures the **typical distance of data values from the mean**:
$$\\sigma = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}$$
The Digital SAT will **NEVER** ask you to compute standard deviation by hand with the full formula. Instead, they test your ability to compare two distributions visually!

#### Visual Inspection Rules:
1. **Spread from Center:**
   - A dataset where values are clustered tightly around the middle has a **SMALL** standard deviation.
   - A dataset where values are spread out toward the outer extremes (shoulders/tails) has a **LARGE** standard deviation.
2. **Frequency at Extremes:**
   - If Dataset A has peaks at the center (e.g. at 5) and few values at 1 and 9, $\\sigma_A$ is small.
   - If Dataset B is U-shaped (many values at 1 and 9, few in middle), $\\sigma_B$ is much larger, even if both have the same mean of 5!
3. **Shift Invariance:**
   - Adding or subtracting a constant to every value in a dataset shifts the distribution along the number line, but **leaves standard deviation completely unchanged**!`,
      keyTakeaways: [
        "Standard deviation measures spread away from the mean, not the height of the bars.",
        "Data clustered near the center has smaller standard deviation than data pushed toward the edges.",
        "Shifting all data points by +c does not change standard deviation."
      ]
    },
    {
      id: "sec-u11-sampling-bias",
      title: "3. Advanced Sampling Methods & Bias Types",
      readTime: "8 min read",
      summary: "Understanding stratified sampling, cluster sampling, and identifying selection, voluntary response, and non-response bias.",
      contentMarkdown: `### Sampling Methodologies
1. **Simple Random Sample (SRS):** Every individual in the population has an equal chance of being selected.
2. **Stratified Random Sample:** The population is divided into distinct subgroups (strata) based on a characteristic (e.g., grade level: 9th, 10th, 11th, 12th), and a random sample is drawn from **every stratum**. This guarantees proportional representation.
3. **Cluster Sample:** The population is divided into naturally occurring clusters (e.g., classrooms, city blocks). A few clusters are selected at random, and **every individual in those chosen clusters** is surveyed.

#### Common Sources of Statistical Bias:
- **Voluntary Response Bias:** Asking people to text in or visit a website. Only those with strong (often negative) opinions participate.
- **Convenience Sampling:** Surveying people who are easy to reach (e.g., shoppers leaving a bookstore on a Tuesday morning).
- **Undercoverage:** A portion of the population is systematically excluded from the sampling frame.
- **Non-Response Bias:** People chosen for the sample refuse to respond or cannot be contacted, and their characteristics differ systematically from respondents.`,
      keyTakeaways: [
        "Only random sampling allows unbiased inferences about the population.",
        "Stratified sampling ensures representation across critical sub-groups.",
        "Voluntary response surveys (polls on websites or social media) are fundamentally biased and invalid."
      ]
    },
    {
      id: "sec-u11-compound-growth",
      title: "4. Compound Interest & Continuous Growth Models",
      readTime: "9 min read",
      summary: "Mastering A = P(1 + r/k)^(kt) and identifying compounding frequency parameters.",
      contentMarkdown: `### The Compound Growth Equation
$$A = P \\left(1 + \\frac{r}{k}\\right)^{kt}$$
- **$P$:** Principal (initial amount at $t = 0$).
- **$r$:** Annual interest rate expressed as a decimal ($5\\% = 0.05$).
- **$k$:** Compounding frequency per year:
  - Annually: $k = 1$
  - Semi-annually: $k = 2$
  - Quarterly: $k = 4$
  - Monthly: $k = 12$
  - Daily: $k = 365$
- **$t$:** Time in years.
- **$kt$:** Total number of compounding periods elapsed.

#### Effective Growth Factor per Period:
The base of the exponent $\\left(1 + \\frac{r}{k}\\right)$ represents the growth factor for **one individual compounding period**.
If an investment of $\\$1,000$ compounds quarterly at $8\\%$:
$$A = 1000 \\left(1 + \\frac{0.08}{4}\\right)^{4t} = 1000 (1.02)^{4t}$$
Every quarter (3 months), the account grows by $2\\%$.

#### Doubling Time (Rule of 70 / 72):
$$\\text{Doubling Time } T \\approx \\frac{70}{\\text{Growth rate in percent } r}$$
Example: At $7\\%$ annual growth, money doubles in approximately $\\frac{70}{7} = 10$ years.`,
      keyTakeaways: [
        "Identify the compounding frequency k to determine both the rate per period (r/k) and total periods (kt).",
        "Quarterly means k = 4, monthly means k = 12.",
        "In Desmos, evaluate compound growth by typing the full expression with parentheses."
      ],
      desmosExample: {
        title: "Compound Growth Calculator",
        expression: "A(t) = 5000 * (1 + 0.06/12)^{12*t}",
        tip: "Type the function A(t). Evaluate A(5) to find the balance after 5 years compounded monthly."
      }
    }
  ],
  speedHacks: [
    {
      title: "Constant Ratio Exponential Test",
      trigger: "Table of values: asked which model best fits",
      shortcut: "Check ratio y2 / y1 and y3 / y2. If ratio is constant, function is strictly exponential.",
      example: "y = 12, 18, 27 => 18/12 = 1.5, 27/18 = 1.5 => Exponential with base 1.5"
    },
    {
      title: "Standard Deviation Outlier Rule",
      trigger: "Comparison of standard deviations of two histograms",
      shortcut: "Histogram with more values away from the center has higher standard deviation.",
      example: "U-shaped has higher std dev than bell-shaped with same range and mean"
    },
    {
      title: "Rule of 70 for Doubling Time",
      trigger: "Prompt asks approximate years for quantity to double at r% growth",
      shortcut: "Years = 70 / (percentage rate r).",
      example: "Growing at 5% per year => doubles in approx 70 / 5 = 14 years"
    }
  ],
  practiceQuestions: [
    {
      id: "u11_q01",
      questionNumber: 1,
      prompt: "The table shows the population $P$ of a bacteria colony measured every 2 hours:\n\n| Hours ($t$) | Population ($P$) |\n|---|---|\n| 0 | 400 |\n| 2 | 600 |\n| 4 | 900 |\n| 6 | 1,350 |\n\nWhich equation best models this population growth?",
      options: [
        "A. P = 400 + 100t",
        "B. P = 400(1.5)^{t/2}",
        "C. P = 400(1.5)^t",
        "D. P = 400(2.25)^t"
      ],
      correctAnswer: "B",
      explanation: "1. Notice the ratio between consecutive population values:\n$$\\frac{600}{400} = 1.5, \\quad \\frac{900}{600} = 1.5, \\quad \\frac{1350}{900} = 1.5$$\nThe population multiplies by $1.5$ every 2 hours.\n2. Since the time step is $\\Delta t = 2$ hours, the exponent must be $\\frac{t}{2}$ so that when $t = 2$, the exponent is $1$.\n3. Therefore, $P(t) = 400(1.5)^{t/2}$.",
      satTrap: "Picking Choice C with exponent $t$. If the exponent were $t$, at $t = 2$ the population would be $400(1.5)^2 = 900$, missing the $t = 2$ value of 600!",
      desmosTrick: "Plot points (0, 400), (2, 600), (4, 900) and test Choice B and C against the points.",
      referenceFormula: "P(t) = P_0 \\cdot b^{t/k}"
    },
    {
      id: "u11_q02",
      questionNumber: 2,
      prompt: "Two datasets, each containing 50 test scores between 0 and 100, have the same mean of 75. Dataset A has scores clustered tightly between 70 and 80. Dataset B has scores distributed widely between 50 and 100. Which of the following must be true?",
      options: [
        "A. The median of Dataset A must equal the median of Dataset B.",
        "B. The standard deviation of Dataset A is less than the standard deviation of Dataset B.",
        "C. The range of Dataset A is greater than the range of Dataset B.",
        "D. The standard deviation of Dataset A is greater than the standard deviation of Dataset B."
      ],
      correctAnswer: "B",
      explanation: "Standard deviation measures how spread out data points are from their mean.\n- In Dataset A, all scores lie close to the mean (within 5 points of 75), meaning deviations $(x_i - \\bar{x})$ are small $\\implies$ smaller standard deviation.\n- In Dataset B, scores are spread up to 25 points away from 75 $\\implies$ larger standard deviation.\nTherefore, the standard deviation of Dataset A is strictly less than that of Dataset B.",
      satTrap: "Thinking equal means imply equal standard deviations. Standard deviation depends purely on dispersion/spread, not the center value!",
      referenceFormula: "\\sigma_A < \\sigma_B \\iff \\text{Dataset A is more tightly clustered}"
    },
    {
      id: "u11_q03",
      questionNumber: 3,
      prompt: "An investor deposits $2,500 into an account that earns an annual interest rate of 4.8%, compounded monthly. Which expression represents the account balance, in dollars, after $t$ years?",
      options: [
        "A. 2500(1 + 0.048)^t",
        "B. 2500(1 + 0.004)^t",
        "C. 2500(1.004)^{12t}",
        "D. 2500(1.048)^{12t}"
      ],
      correctAnswer: "C",
      explanation: "Apply the compound interest formula: $A = P\\left(1 + \\frac{r}{k}\\right)^{kt}$.\n- $P = 2500$\n- $r = 0.048$\n- Monthly compounding means $k = 12$.\n- Monthly rate: $\\frac{r}{k} = \\frac{0.048}{12} = 0.004$.\n- Base: $1 + 0.004 = 1.004$.\n- Exponent: $kt = 12t$.\nTherefore, $A = 2500(1.004)^{12t}$.",
      satTrap: "Choice D uses $1.048$ inside the base with exponent $12t$, which compounds 4.8% every month (over 70% per year!).",
      referenceFormula: "A = P\\left(1 + \\frac{r}{k}\\right)^{kt}"
    },
    {
      id: "u11_q04",
      questionNumber: 4,
      prompt: "A high school principal wants to survey student opinions about cafeteria food. She randomly selects 25 students from each of the 9th, 10th, 11th, and 12th grade rosters to form a sample of 100 students. What sampling method did the principal use?",
      options: [
        "A. Simple random sampling",
        "B. Stratified random sampling",
        "C. Systematic sampling",
        "D. Voluntary response sampling"
      ],
      correctAnswer: "B",
      explanation: "The population of students was first divided into non-overlapping subgroups (strata) based on grade level (9th, 10th, 11th, 12th).\nThen, a random sample was drawn from EACH stratum (25 from each grade).\nThis is the textbook definition of **Stratified Random Sampling**.",
      satTrap: "Calling it Simple Random Sampling (Choice A). In an SRS of 100 students from the whole school, you might randomly get 40 seniors and only 10 freshmen. Stratification GUARANTEES exactly 25 from each grade.",
      referenceFormula: "\\text{Stratified Sampling: Population divided into strata} \\to \\text{random sample from each}"
    },
    {
      id: "u11_q05",
      questionNumber: 5,
      prompt: "A polling organization surveys a random sample of 1,200 eligible voters in a city and calculates a 95% confidence interval for the proportion who support building a new library as $(0.58, 0.64)$. Which of the following is the most accurate interpretation of the 95% confidence level?",
      options: [
        "A. There is a 95% probability that between 58% and 64% of the 1,200 sampled voters support the library.",
        "B. Exactly 95% of all eligible voters in the city support the library.",
        "C. If the polling organization were to take many random samples of 1,200 voters and construct a confidence interval from each, about 95% of those intervals would capture the true population proportion.",
        "D. 95% of the voters surveyed voted in favor of the library."
      ],
      correctAnswer: "C",
      explanation: "The confidence level describes the long-run success rate of the estimation process.\nA 95% confidence level means that if the same sampling and interval construction method is repeated many times, approximately 95% of the resulting intervals will capture the true population parameter.\nChoice A is incorrect because the sample proportion is fixed and known (0.61); probability applies to the method, not the already-computed interval.",
      satTrap: "Claiming there is a 95% chance that the true parameter lies in this specific interval. In frequentist statistics, the true parameter is a fixed constant, not a random variable.",
      referenceFormula: "\\text{Confidence Level} = \\text{Long-run capture rate of the procedure}"
    },
    {
      id: "u11_q06",
      questionNumber: 6,
      prompt: "The value of a new sports car depreciates by 15% each year. If the purchase price was $40,000, which equation models the value $V(t)$, in dollars, after $t$ years?",
      options: [
        "A. V(t) = 40,000(0.15)^t",
        "B. V(t) = 40,000(0.85)^t",
        "C. V(t) = 40,000 - 6,000t",
        "D. V(t) = 40,000(1.15)^{-t}"
      ],
      correctAnswer: "B",
      explanation: "Depreciation of 15% per year means the car retains $100\\% - 15\\% = 85\\%$ of its value each year.\nThe decay factor is $b = 1 - r = 1 - 0.15 = 0.85$.\nTherefore, the model is $V(t) = 40,000(0.85)^t$.",
      satTrap: "Using 0.15 as the base (Choice A). That would mean the car loses 85% of its value in year 1 and is worth only 15%!",
      referenceFormula: "V(t) = P(1 - r)^t"
    },
    {
      id: "u11_q07",
      questionNumber: 7,
      prompt: "A dataset consists of 20 numbers with a standard deviation of 8. If every number in the dataset is increased by 15, what will be the standard deviation of the resulting dataset?",
      options: ["A. 8", "B. 15", "C. 23", "D. 120"],
      correctAnswer: "A",
      explanation: "Adding a constant to every data point shifts the entire distribution to the right by 15 units.\nThe distances between individual data points and their new mean remain **completely unchanged**.\nTherefore, the standard deviation remains exactly 8.",
      satTrap: "Adding 15 to the standard deviation ($8 + 15 = 23$, Choice C). Standard deviation is measure of spread; addition has zero effect on spread!",
      referenceFormula: "\\sigma(X + c) = \\sigma(X)"
    },
    {
      id: "u11_q08",
      questionNumber: 8,
      prompt: "A company tracks the quarterly sales of a software product. In Quarter 1, sales were $50,000. In Quarter 2, sales were $60,000. In Quarter 3, sales were $72,000. In Quarter 4, sales were $86,400. Which type of model best fits this data?",
      options: [
        "A. Linear with a slope of 10,000",
        "B. Quadratic with a positive leading coefficient",
        "C. Exponential with a growth factor of 1.20",
        "D. Exponential with a growth factor of 0.20"
      ],
      correctAnswer: "C",
      explanation: "Check the ratio between consecutive quarters:\n$$\\frac{60,000}{50,000} = 1.20$$\n$$\\frac{72,000}{60,000} = 1.20$$\n$$\\frac{86,400}{72,000} = 1.20$$\nThe ratio between consecutive terms is constant at $1.20$, representing a $20\\%$ growth each quarter.\nThis is strictly an **exponential model with a growth factor of 1.20**.",
      satTrap: "Choice D states the growth factor is 0.20. The growth RATE is 0.20 (20%), but the growth FACTOR (multiplier) is $1 + 0.20 = 1.20$!",
      referenceFormula: "\\text{Growth Factor } b = 1 + r"
    },
    {
      id: "u11_q09",
      questionNumber: 9,
      prompt: "A local radio station asks listeners to call in and vote on whether the city should build a new stadium. Of the 850 callers, 78% voted against the stadium. What is the most significant flaw in this study?",
      options: [
        "A. The sample size of 850 callers is too small to draw any conclusions.",
        "B. The study suffered from voluntary response bias, as listeners with strong negative opinions were more likely to call.",
        "C. The margin of error was calculated incorrectly.",
        "D. Call-in polls are only valid if callers are under the age of 30."
      ],
      correctAnswer: "B",
      explanation: "A call-in poll relies entirely on voluntary participation.\nPeople who feel strongly motivated (especially those angry or opposed to the project) will take the time to call in, while the general community does not participate.\nThis is a classic example of **voluntary response bias**, and the results cannot be generalized to the city's population.",
      satTrap: "Thinking 850 people is too small. In a proper random sample, 850 people provides a margin of error around 3%! The issue is NOT sample size; it is SELECTION BIAS.",
      referenceFormula: "\\text{Voluntary Response} \\implies \\text{Invalid Non-Representative Sample}"
    },
    {
      id: "u11_q10",
      questionNumber: 10,
      prompt: "An invasive aquatic plant covers 50 square meters of a lake. The area covered doubles every 6 days. What equation gives the area $A(d)$, in square meters, covered by the plant after $d$ days?",
      options: [
        "A. A(d) = 50(2)^{6d}",
        "B. A(d) = 50(2)^{d/6}",
        "C. A(d) = 50 + 2^{d/6}",
        "D. A(d) = 50(6)^{d/2}"
      ],
      correctAnswer: "B",
      explanation: "The base is 2 because the area doubles.\nThe doubling period is 6 days, so the exponent must be $\\frac{d}{6}$.\n- At $d = 0$: $A(0) = 50(2)^0 = 50$.\n- At $d = 6$: $A(6) = 50(2)^1 = 100$ (doubled!).\n- At $d = 12$: $A(12) = 50(2)^2 = 200$.\nTherefore, $A(d) = 50(2)^{d/6}$.",
      satTrap: "Using $6d$ in the exponent (Choice A). At $d = 6$, $50(2)^{36}$, which would be billions of square meters!",
      referenceFormula: "A(t) = A_0 \\cdot 2^{t / T_{\\text{double}}}"
    }
  ],
  prevUnitId: "unit-10-advanced-algebra",
  nextUnitId: "unit-12-advanced-adv-math"
};
