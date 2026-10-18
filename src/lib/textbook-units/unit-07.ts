import { KhanFullUnit } from "../khan-textbook-units";

export const UNIT_07_MEDIUM_PSDA: KhanFullUnit = {
  id: "unit-07-medium-psda",
  unitNumber: 7,
  title: "Unit 7: Medium: Problem Solving & Data Analysis",
  slug: "unit-07-medium-psda",
  tier: "Medium",
  domain: "Problem Solving and Data Analysis",
  topicCode: "DAT-03",
  estimatedHours: "3.5 hours",
  description: "Two-way contingency tables, conditional probability with restricted sub-populations, margin of error sample scaling, scatterplot regression lines of best fit, residuals, and observational studies vs. randomized experiments.",
  overviewSummary: "Data analysis on the Digital SAT is not just about computing averages — it requires rigorous conditional logic, sample size scaling, residual interpretations, and strict distinction between correlation and causation. This chapter equips you with the exact statistical frameworks tested on the exam.",
  sections: [
    {
      id: "sec-u7-conditional-probability",
      title: "1. Two-Way Tables & The Restricted Sub-Population Invariant",
      readTime: "8 min read",
      summary: "Master conditional probability P(A|B) and avoid the #1 trap: selecting the wrong denominator from two-way tables.",
      diagramType: "two-way-conditional",
      contentMarkdown: `### The Golden Rule of Two-Way Tables
Whenever you see a frequency table, the single most critical decision is: **What is the denominator?**

#### Identifying the Restricted Universe:
1. **Unconditional Probability (Entire Population):**
   - Phrasing: *"If a person is selected at random from the entire survey..."*
   - **Denominator:** The grand total in the bottom-right corner ($N$).
2. **Conditional Probability (Restricted Universe):**
   - Phrasing: *"Given that the person tested positive..."*
   - Phrasing: *"Among the students who play an instrument..."*
   - Phrasing: *"Of the adults who prefer brand X..."*
   - **Denominator:** The total of that **specific row or column ONLY**!

#### The Conditional Formula:
$$P(A \\mid B) = \\frac{\\text{Count}(A \\text{ and } B)}{\\text{Total Count of Condition } B}$$

#### Trap Example:
| | Coffee | Tea | Total |
|---|---|---|---|
| Students | 30 | 50 | 80 |
| Teachers | 45 | 15 | 60 |
| Total | 75 | 65 | 140 |

> *"If a teacher is selected at random, what is the probability that they prefer tea?"*

- **Wrong Approach:** $\\frac{15}{140}$ or $\\frac{15}{65}$.
- **Correct Approach:** The condition is *"If a teacher is selected"*. The restricted universe is Teachers ($60$).
  $$P(\\text{Tea} \\mid \\text{Teacher}) = \\frac{15}{60} = \\frac{1}{4} = 0.25$$`,
      keyTakeaways: [
        "Read the conditional cue words: 'given that', 'among those who', 'of the...', 'if a [group member] is chosen'.",
        "The restricted condition dictates your denominator. Never default to the grand total.",
        "Desmos can simplify any fraction instantly by clicking the fraction button next to the calculation result."
      ],
      desmosExample: {
        title: "Desmos Quick Fraction Reduction",
        expression: "15 / 60",
        tip: "Type 15/60 and click the small square fraction icon on the left to reduce to 1/4."
      }
    },
    {
      id: "sec-u7-margin-of-error",
      title: "2. Margin of Error & The Inverse Square Root Scaling Law",
      readTime: "8 min read",
      summary: "Understand what margin of error represents, how confidence intervals are constructed, and how sample size changes affect precision.",
      contentMarkdown: `### What Margin of Error Actually Means
When a survey states: *"48% of voters support candidate A, with a margin of error of $\\pm 3\\%$ at a 95% confidence level"*:
- It means we can be 95% confident that the **true population proportion** lies in the interval:
  $$48\\% - 3\\% \\le p \\le 48\\% + 3\\% \\implies [45\\%, 51\\%]$$
- It does **NOT** mean there was a calculation mistake or bias. Margin of error arises purely from **sampling variability** (taking a sample rather than census).

#### The Inverse Square Root Law:
The margin of error ($MoE$) is inversely proportional to the square root of the sample size ($n$):
$$MoE \\propto \\frac{1}{\\sqrt{n}}$$

#### Critical Scaling Scenarios:
- **To cut the Margin of Error in HALF ($\\times \\frac{1}{2}$):** You must multiply the sample size by $2^2 = \\mathbf{4}$!
- **To cut the Margin of Error by a third ($\\times \\frac{1}{3}$):** You must multiply the sample size by $3^2 = \\mathbf{9}$!
- **To cut the Margin of Error by a fourth ($\\times \\frac{1}{4}$):** You must multiply the sample size by $4^2 = \\mathbf{16}$!

> **College Board Rule:** A larger sample size **decreases** margin of error (increases precision). It does NOT change whether the sampling method itself was biased!`,
      keyTakeaways: [
        "Margin of error defines a confidence interval: Estimate +/- MoE.",
        "Halving the margin of error requires quadrupling (4x) the sample size.",
        "Increasing sample size only reduces random sampling variation; it CANNOT fix selection bias or leading questions."
      ]
    },
    {
      id: "sec-u7-scatterplots-residuals",
      title: "3. Scatterplots, Lines of Best Fit & Residual Analysis",
      readTime: "9 min read",
      summary: "Interpret slopes and intercepts in regression models, and calculate residuals (observed minus predicted).",
      diagramType: "scatterplot-residuals",
      contentMarkdown: `### Interpreting the Regression Line $\\hat{y} = mx + b$
On the SAT, the line of best fit represents a **statistical model**, not exact individual data points.

#### In Context:
- **Slope ($m$):** The *predicted/estimated* change in $y$ for each 1-unit increase in $x$.
  - Always look for the word *"estimated"*, *"predicted"*, or *"on average"* in the answer choices!
- **$y$-intercept ($b$):** The predicted value of $y$ when $x = 0$ (if $x = 0$ is physically meaningful).

#### The Residual Invariant:
A residual is the vertical distance between an actual observed data point and the model's prediction:
$$\\text{Residual} = y_{\\text{observed}} - \\hat{y}_{\\text{predicted}}$$

- **Positive Residual ($y - \\hat{y} > 0$):** The actual point lies **ABOVE** the line of best fit (the model underestimated).
- **Negative Residual ($y - \\hat{y} < 0$):** The actual point lies **BELOW** the line of best fit (the model overestimated).
- **Zero Residual ($y - \\hat{y} = 0$):** The actual point lies exactly on the line.

#### College Board Trap:
> If the line of best fit is $\\hat{y} = 2.4x + 15$, and a data point has $x = 10$ and $y = 42$, what is the residual?
- Predicted: $\\hat{y} = 2.4(10) + 15 = 24 + 15 = 39$.
- Observed: $y = 42$.
- $\\text{Residual} = 42 - 39 = +3$.`,
      keyTakeaways: [
        "Residual = Actual (data point) - Predicted (line of best fit).",
        "A point above the line has a positive residual; below the line has a negative residual.",
        "Slope interpretations must include 'estimated' or 'predicted' — never absolute claims."
      ],
      desmosExample: {
        title: "Desmos Linear Regression",
        expression: "y_1 ~ m*x_1 + b",
        tip: "In a Desmos table with x1 and y1, type 'y1 ~ m*x1 + b' to generate the exact slope, intercept, and residual plot e1."
      }
    },
    {
      id: "sec-u7-skew-mean-median",
      title: "4. Outlier Sensitivity: Mean vs. Median in Skewed Distributions",
      readTime: "8 min read",
      summary: "Learn how extreme outliers pull the mean while leaving the median resilient.",
      contentMarkdown: `### Measures of Center Under Outliers
- **Mean (Arithmetic Average):** Highly sensitive to extreme values. Every value affects the calculation.
- **Median (Middle Value):** Resistant / robust to extreme values. Outliers do not affect the middle rank.
- **Standard Deviation:** Measures spread around the mean. Larger spread / extreme values increase standard deviation.

#### The Skewness Rules:
1. **Symmetric Distribution (Bell-shaped):**
   $$\\text{Mean} \\approx \\text{Median}$$
2. **Right-Skewed (Positive Skew, tail stretches to the right / high values):**
   - High outliers pull the mean up!
   $$\\text{Mean} > \\text{Median}$$
3. **Left-Skewed (Negative Skew, tail stretches to the left / low values):**
   - Low outliers pull the mean down!
   $$\\text{Mean} < \\text{Median}$$

#### Range vs. Interquartile Range (IQR):
- **Range:** $\\text{Max} - \\text{Min}$ (severely inflated by outliers).
- **IQR:** $Q_3 - Q_1$ (captures the middle 50% of data, unaffected by extreme outliers).`,
      keyTakeaways: [
        "Right-skewed distributions have Mean > Median; left-skewed distributions have Mean < Median.",
        "The median is robust against outliers; the mean is heavily pulled in the direction of the tail.",
        "Adding a value greater than the current mean increases the mean; adding a value less than the mean decreases it."
      ]
    },
    {
      id: "sec-u7-study-design-causation",
      title: "5. Study Design: Random Selection vs. Random Assignment",
      readTime: "8 min read",
      summary: "The definitive two-by-two framework for determining generalizability and causality.",
      contentMarkdown: `### The Two Dimensions of Scientific Rigor
The College Board tests your conceptual understanding of statistical validity through two distinct experimental mechanisms:

#### 1. Random Selection (Sampling) $\\implies$ Generalizability
- **What it is:** Participants are chosen randomly from a broader population (e.g., random digit dialing of all registered nurses in Ohio).
- **What it allows:** You can generalize findings to the **entire population from which the sample was drawn**.
- **Limitation:** You CANNOT generalize to groups not sampled (e.g. nurses outside Ohio or doctors).

#### 2. Random Assignment (Treatment Groups) $\\implies$ Cause-and-Effect
- **What it is:** Participants are randomly allocated to a treatment group or a control group.
- **What it allows:** You can infer **cause and effect** (causation) because confounding variables are balanced between groups.
- **Limitation:** An **observational study** (where subjects choose their own behavior, e.g. smokers vs non-smokers) can **NEVER** prove causation — only correlation or association!

#### The Decision Matrix:
| | Random Assignment? YES | Random Assignment? NO |
|---|---|---|
| **Random Selection? YES** | Generalize to population **AND** conclude cause-and-effect | Generalize to population, but **ONLY correlation/association** |
| **Random Selection? NO** | Conclude cause-and-effect, but **ONLY for the volunteers in the study** | Cannot generalize, and **cannot conclude causation** |`,
      keyTakeaways: [
        "Random selection allows generalization to the target population.",
        "Random assignment allows cause-and-effect conclusions.",
        "Observational studies can ONLY establish correlation, never causation."
      ]
    }
  ],
  speedHacks: [
    {
      title: "Two-Way Table Conditional Denominator",
      trigger: "Probability question with 'given that', 'among', or 'of the'",
      shortcut: "Find the condition word, restrict your denominator to that exact row or column total immediately.",
      example: "'Given that the voter is independent' => denominator = total of independent column"
    },
    {
      title: "Sample Size MoE Quadrupling Rule",
      trigger: "Question asks how sample size must change to halve margin of error",
      shortcut: "Square the factor: (1/2)^(-2) = 4. Sample must be multiplied by 4.",
      example: "MoE cuts from 4% to 2% (half) => sample n multiplies by 4"
    },
    {
      title: "Residual Shortcut",
      trigger: "Residual of a point on a scatterplot",
      shortcut: "Residual = Actual y-value minus Predicted y-value on line.",
      example: "Data point at (5, 12), line at x=5 gives y=10 => Residual = 12 - 10 = +2"
    }
  ],
  practiceQuestions: [
    {
      id: "u7_q01",
      questionNumber: 1,
      prompt: "A hospital survey recorded the blood types of 200 patients:\n\n| Blood Type | Male | Female | Total |\n|---|---|---|---|\n| Type A | 35 | 45 | 80 |\n| Type B | 20 | 25 | 45 |\n| Type AB | 10 | 15 | 25 |\n| Type O | 25 | 25 | 50 |\n| Total | 90 | 110 | 200 |\n\nIf a female patient is selected at random, what is the probability that she has Type A blood?",
      options: ["A. 45/200", "B. 45/110", "C. 45/80", "D. 80/200"],
      correctAnswer: "B",
      explanation: "The condition specifies: 'If a female patient is selected at random'.\nThis restricts the universe to Female patients: total Female = 110.\nAmong females, Type A = 45.\nTherefore, $P(\\text{Type A} \\mid \\text{Female}) = \\frac{45}{110} = \\frac{9}{22}$.",
      satTrap: "Dividing by 200 (grand total) or 80 (Type A total). The condition is 'female patient', so denominator is 110.",
      desmosTrick: "Type 45/110 into Desmos, click the fraction icon to see 9/22.",
      referenceFormula: "P(A \\mid B) = \\frac{\\text{Count}(A \\text{ and } B)}{\\text{Count}(B)}"
    },
    {
      id: "u7_q02",
      questionNumber: 2,
      prompt: "A survey of 900 likely voters found that 54% favor a proposed park expansion, with a margin of error of 3.2%. The survey director wants to conduct a new survey with a margin of error of 1.6%. Assuming all other sampling conditions remain identical, approximately how many voters must be surveyed?",
      options: ["A. 1,800", "B. 2,700", "C. 3,600", "D. 7,200"],
      correctAnswer: "C",
      explanation: "The margin of error is being halved: from 3.2% to 1.6% (factor of $\\frac{1}{2}$).\nBecause margin of error is inversely proportional to the square root of sample size ($MoE \\propto 1/\\sqrt{n}$):\nTo divide $MoE$ by 2, $n$ must be multiplied by $2^2 = 4$.\nNew sample size $\\approx 900 \\cdot 4 = 3,600$ voters.",
      satTrap: "Doubling the sample size to 1,800. Margin of error uses a SQUARE ROOT relationship, so halving error requires 4x the sample!",
      desmosTrick: "Type 900 * (3.2 / 1.6)^2 = 900 * 4 = 3600."
    },
    {
      id: "u7_q03",
      questionNumber: 3,
      prompt: "The line of best fit for a set of data is $\\hat{y} = -1.8x + 42.5$. For the data point $(8, 26)$, what is the residual?",
      options: ["A. -2.1", "B. -1.8", "C. 1.8", "D. -2.1"],
      correctAnswer: "D",
      explanation: "1. Predicted value from line: $\\hat{y} = -1.8(8) + 42.5 = -14.4 + 42.5 = 28.1$.\n2. Observed value from data point: $y = 26$.\n3. $\\text{Residual} = y_{\\text{observed}} - \\hat{y}_{\\text{predicted}} = 26 - 28.1 = -2.1$.",
      satTrap: "Doing predicted minus observed ($28.1 - 26 = +2.1$). Residual is ALWAYS Observed minus Predicted ($y - \\hat{y}$).",
      desmosTrick: "In Desmos: type '26 - (-1.8 * 8 + 42.5)' => output is -2.1."
    },
    {
      id: "u7_q04",
      questionNumber: 4,
      prompt: "A dataset of 15 employee salaries at a tech startup has a mean of $85,000 and a median of $82,000. The CEO, whose salary is $450,000, is added to the dataset. Which of the following statements must be true regarding the new dataset of 16 employees?",
      options: [
        "A. The mean and median will increase by the same dollar amount.",
        "B. The mean will increase significantly, while the median will change very little.",
        "C. The standard deviation will decrease because sample size increased.",
        "D. The median will become greater than the new mean."
      ],
      correctAnswer: "B",
      explanation: "The CEO salary of $450,000 is an extreme high outlier compared to the original mean of $85,000.\n- The mean will increase substantially: $(15 \\cdot 85,000 + 450,000)/16 = $107,812.50$.\n- The median will only shift slightly between the 8th and 9th values of the ordered list.\nTherefore, the mean increases significantly while the median remains resilient.",
      satTrap: "Thinking that adding more data points always decreases standard deviation. An extreme outlier vastly INCREASES standard deviation!",
      desmosTrick: "Notice that 450,000 is more than 5 times the mean, creating an intense right skew where Mean > Median."
    },
    {
      id: "u7_q05",
      questionNumber: 5,
      prompt: "A researcher wants to study the effect of a new fertilizer on plant growth. She randomly selects 200 tomato plants from a commercial nursery and randomly assigns 100 to receive the new fertilizer and 100 to receive standard fertilizer. After 6 weeks, the plants with the new fertilizer grew significantly taller. Which of the following conclusions is best supported?",
      options: [
        "A. The new fertilizer causes increased growth in all plant species worldwide.",
        "B. The new fertilizer caused increased growth in tomato plants from this nursery, but the results cannot be generalized to all tomato plants.",
        "C. There is an association between the fertilizer and plant growth, but causation cannot be established.",
        "D. The fertilizer will cause the same growth in indoor house plants."
      ],
      correctAnswer: "B",
      explanation: "Evaluate the two design criteria:\n1. Random Assignment was used (plants randomly divided into treatment and control groups) -> Causation CAN be concluded!\n2. Plants were selected ONLY from this specific commercial nursery -> Generalization is restricted to tomato plants from this nursery!\nTherefore, choice B is the precise, valid scientific conclusion.",
      satTrap: "Choice C claims causation cannot be established. False! Random assignment DOES establish causation. Choice A overgeneralizes to all plants worldwide.",
      referenceFormula: "\\text{Random Assignment} \\implies \\text{Causal Conclusion}"
    },
    {
      id: "u7_q06",
      questionNumber: 6,
      prompt: "In a scatterplot showing the relationship between study hours ($x$) and exam score ($y$), the line of best fit has an equation of $\\hat{y} = 6.5x + 48$. Which of the following is the best interpretation of the number 6.5 in this context?",
      options: [
        "A. The exact exam score of a student who studies 0 hours.",
        "B. For each additional hour of study, the student's score will increase by exactly 6.5 points.",
        "C. For each additional hour of study, the predicted exam score increases by 6.5 points.",
        "D. The maximum number of hours a student can study is 6.5."
      ],
      correctAnswer: "C",
      explanation: "In a statistical model, the slope represents the *predicted* or *estimated* change in the dependent variable for each 1-unit increase in the independent variable.\nChoice B uses the absolute word 'exactly', which is invalid for a statistical model. Choice C correctly uses 'predicted'.",
      satTrap: "Choosing B because it omits the word 'predicted'. Statistical regression lines NEVER predict exact deterministic outcomes.",
      referenceFormula: "m = \\frac{\\Delta \\hat{y}}{\\Delta x} = \\text{Predicted change in } y \\text{ per unit } x"
    },
    {
      id: "u7_q07",
      questionNumber: 7,
      prompt: "A bag contains 12 red marbles, 18 blue marbles, and 10 green marbles. If two marbles are drawn at random without replacement, what is the probability that both marbles are red?",
      options: ["A. 9/100", "B. 33/390", "C. 11/130", "D. 3/10"],
      correctAnswer: "C",
      explanation: "Total marbles = 12 + 18 + 10 = 40.\n1. Probability first marble is red: $P(R_1) = \\frac{12}{40}$.\n2. Probability second marble is red without replacement: $P(R_2 \\mid R_1) = \\frac{11}{39}$.\n3. Joint probability: $\\frac{12}{40} \\cdot \\frac{11}{39} = \\frac{3}{10} \\cdot \\frac{11}{39} = \\frac{1}{10} \\cdot \\frac{11}{13} = \\frac{11}{130}$.",
      satTrap: "Failing to account for 'without replacement' and calculating $(12/40) * (12/40) = 9/100$ (Choice A).",
      desmosTrick: "Type '(12/40) * (11/39)' in Desmos. Hit fraction icon => 11/130."
    },
    {
      id: "u7_q08",
      questionNumber: 8,
      prompt: "The heights (in inches) of 8 basketball players are: 72, 74, 75, 77, 78, 80, 81, 83. If a 9th player of height 81 inches joins the team, which of the following will decrease?",
      options: ["A. The mean", "B. The median", "C. The range", "D. None of the above"],
      correctAnswer: "D",
      explanation: "Calculate original statistics:\nOriginal mean = $(72 + 74 + 75 + 77 + 78 + 80 + 81 + 83)/8 = 620/8 = 77.5$.\nOriginal median = average of 4th and 5th terms (77 and 78) = 77.5.\nOriginal range = $83 - 72 = 11$.\nNew player has height 81 inches:\n- Since $81 > 77.5$, the new mean INCREASES ($701/9 \\approx 77.89$).\n- The new median is the 5th value of 9 sorted values: 78 (INCREASES from 77.5 to 78).\n- Range remains $83 - 72 = 11$ (UNCHANGED).\nNone of the statistics decrease!",
      satTrap: "Assuming that adding another 81 inch player lowers standard deviation or decreases the median. Verify numerically!",
      desmosTrick: "Use Desmos stats: 'mean([72, 74, 75, 77, 78, 80, 81, 83])' and compare with 9 players."
    },
    {
      id: "u7_q09",
      questionNumber: 9,
      prompt: "A political poll with a sample of 1,600 registered voters reports that 52% plan to vote for Candidate Miller, with a margin of error of 2.5% at a 95% confidence level. Which of the following is a plausible value for the true percentage of all registered voters who plan to vote for Candidate Miller?",
      options: ["A. 48.5%", "B. 51.0%", "C. 55.0%", "D. 56.5%"],
      correctAnswer: "B",
      explanation: "Construct the 95% confidence interval:\n$$\\text{Estimate} \\pm \\text{MoE} = 52\\% \\pm 2.5\\% = [49.5\\%, 54.5\\%]$$\nOnly values strictly inside $[49.5\\%, 54.5\\%]$ are plausible.\n- 48.5% is below 49.5%.\n- 51.0% is inside $[49.5\\%, 54.5\\%]$ (Plausible!).\n- 55.0% and 56.5% are above 54.5%.",
      satTrap: "Adding and subtracting incorrectly: $52 - 2.5 = 49.5$, $52 + 2.5 = 54.5$. 51.0% is clearly in the interval.",
      referenceFormula: "\\text{Confidence Interval} = [\\hat{p} - MoE, \\; \\hat{p} + MoE]"
    },
    {
      id: "u7_q10",
      questionNumber: 10,
      prompt: "A dataset has a standard deviation of 4.2. If every number in the dataset is multiplied by 3 and then increased by 10, what is the standard deviation of the new dataset?",
      options: ["A. 4.2", "B. 12.6", "C. 14.2", "D. 22.6"],
      correctAnswer: "B",
      explanation: "Rules of transformation on measures of spread (standard deviation and range):\n1. Adding or subtracting a constant shifts all data points equally and has **ZERO effect** on spread ($+10$ does nothing to standard deviation!).\n2. Multiplying or dividing by a constant $k$ scales the standard deviation by $|k|$.\nTherefore, the new standard deviation $= 3 \\cdot 4.2 = 12.6$.",
      satTrap: "Adding 10 to the standard deviation ($12.6 + 10 = 22.6$, Choice D). Standard deviation measures SPREAD between points; shifting all points by 10 does not change the distances between them!",
      referenceFormula: "\\sigma(kX + c) = |k| \\cdot \\sigma(X)"
    }
  ],
  prevUnitId: "unit-06-medium-algebra",
  nextUnitId: "unit-08-medium-adv-math"
};
