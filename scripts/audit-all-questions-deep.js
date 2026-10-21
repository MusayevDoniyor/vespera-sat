const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

// Auto diagram preset logic from QuestionDiagram.tsx
function getAutoDiagramPreset(prompt, domain) {
  if (!prompt) return null;
  const p = prompt.toLowerCase();
  if (
    p.includes("altitude is drawn from c to hypotenuse") ||
    (p.includes("altitude") && p.includes("hypotenuse")) ||
    (p.includes("ad = 4") && p.includes("db = 9"))
  ) {
    return "right_triangle_altitude";
  }
  if (
    (p.includes("right triangle") || p.includes("triangle abc")) &&
    (p.includes("sin(a)") || p.includes("tan(a)") || p.includes("cos(") || p.includes("acute angles"))
  ) {
    return "right_triangle_trig";
  }
  if (
    (p.includes("x^2 + y^2") || p.includes("circle in the xy-plane") || p.includes("circle equation")) &&
    (p.includes("radius") || p.includes("center"))
  ) {
    return "circle_coordinate";
  }
  if (
    p.includes("g(x) = f(x - 3)") ||
    p.includes("graph of g(x)") ||
    p.includes("transformation occurred") ||
    (p.includes("shifted") && p.includes("graph"))
  ) {
    return "function_shift";
  }
  if (p.includes("perpendicular") && (p.includes("line") || p.includes("slope") || p.includes("reciprocal"))) {
    return "perpendicular_lines";
  }
  if (
    (p.includes("line l_1") || p.includes("line l1") || p.includes("parallel")) &&
    (p.includes("y-intercept") || p.includes("slope") || p.includes("4x - 6y"))
  ) {
    return "parallel_lines";
  }
  if (
    (p.includes("exactly one real solution") || p.includes("exactly one solution") || p.includes("tangent")) &&
    (p.includes("3x^2") || p.includes("quadratic") || p.includes("x^2 - 6x") || p.includes("discriminant"))
  ) {
    return "parabola_tangent";
  }
  if (p.includes("rectangle has a width of n") || (p.includes("rectangle") && p.includes("area of 120"))) {
    return "rectangle_area";
  }
  if (p.includes("diameter of 16") || (p.includes("circle has a diameter") && p.includes("area"))) {
    return "circle_general";
  }
  if (p.includes("margin of error") || p.includes("confidence level") || p.includes("registered voters")) {
    return "normal_distribution";
  }
  if (p.includes("box plot") || p.includes("interquartile") || (p.includes("median") && p.includes("quartile"))) {
    return "box_plot";
  }
  return null;
}

// Patterns that strongly imply an external graphic/figure/diagram is referenced
const FIGURE_REGEX = /\b(in the figure( above| below| shown)?|shown in the (figure|graph|table|scatterplot)|the figure (shows|above|below)|the graph (shows|above|below|of f|of g)|the scatterplot (shows|above|below)|the table (shows|above|below)|according to the (figure|graph|table|scatterplot)|based on the (figure|graph|table)|the bar graph|the box plot|the histogram)\b/i;

function auditSingleQuestion(q, sourceName) {
  const issues = [];
  const fullText = `${q.prompt || ''} ${q.passage || ''}`;
  const prompt = (q.prompt || '').trim();
  const passage = (q.passage || '').trim();

  // 1. Diagram / Figure Reference Audit
  const mentionsFigure = FIGURE_REGEX.test(fullText);
  const hasSvg = !!(q.diagram_svg || q.diagramSvg);
  const hasPreset = !!(q.diagram_preset || q.diagramPreset || getAutoDiagramPreset(fullText, q.domain));
  const hasTableHtml = /<table[\s\S]*?<\/table>/i.test(fullText) || /\|[\s\S]*?\|[\s\S]*?\|/.test(fullText);
  const hasInlineSvg = /<svg[\s\S]*?<\/svg>/i.test(fullText);

  let visualPresent = hasSvg || hasPreset || hasTableHtml || hasInlineSvg;

  // Strict figure references where the question cannot be solved without seeing the visual:
  const strictFigureRegex = /\b(in the figure shown|shown in the figure|the figure above shows|figure shown above|in the figure,|shown above,|shown in the graph|the graph above shows|graph shown above|according to the table|the table above shows|based on the table above|the bar graph above|the scatterplot above)\b/i;
  const strictlyRequiresVisual = strictFigureRegex.test(fullText);

  if (strictlyRequiresVisual && !visualPresent) {
    issues.push({
      type: 'MISSING_DIAGRAM',
      severity: 'HIGH',
      detail: 'Explicitly references a figure/graph/table but no diagram_svg, preset, or table HTML found.',
    });
  } else if (mentionsFigure && !visualPresent) {
    // Check if it's purely a "the graph of y = ax^2 + bx + c" algebra question
    const isPureAlgebraicGraphMention = /the graph of (?:the equation|the linear|f\(x\)|y\s*=|[a-z]\(x\))/i.test(fullText) && !/shown|above|below|figure/i.test(fullText);
    if (!isPureAlgebraicGraphMention) {
      issues.push({
        type: 'POSSIBLE_MISSING_DIAGRAM',
        severity: 'MEDIUM',
        detail: 'Mentions graph/scatterplot/table without attached visual or preset.',
      });
    }
  }

  // 2. Options Audit
  let options = [];
  try {
    options = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
  } catch (e) {
    issues.push({
      type: 'INVALID_OPTIONS_JSON',
      severity: 'HIGH',
      detail: `Options failed JSON parse: ${e.message}`,
    });
  }

  const isGridIn = q.type === 'grid_in' || (Array.isArray(options) && options.length === 0) || q.is_grid_in;
  if (!isGridIn) {
    if (!Array.isArray(options) || options.length < 4) {
      issues.push({
        type: 'FEWER_THAN_4_OPTIONS',
        severity: 'HIGH',
        detail: `Expected 4 options for MC, got ${Array.isArray(options) ? options.length : 0}.`,
      });
    } else if (options.length > 4) {
      issues.push({
        type: 'MORE_THAN_4_OPTIONS',
        severity: 'MEDIUM',
        detail: `Got ${options.length} options.`,
      });
    }

    if (Array.isArray(options)) {
      options.forEach((opt, oIdx) => {
        if (!opt || String(opt).trim() === '') {
          issues.push({
            type: 'EMPTY_OPTION',
            severity: 'HIGH',
            detail: `Option at index ${oIdx} is empty.`,
          });
        }
      });
    }
  }

  // 3. Correct Answer Audit
  const ca = (q.correct_answer || q.correctAnswer || '').trim();
  if (!ca) {
    issues.push({
      type: 'MISSING_CORRECT_ANSWER',
      severity: 'CRITICAL',
      detail: 'No correct answer provided.',
    });
  } else if (!isGridIn && Array.isArray(options) && options.length >= 4) {
    const validLetters = ['A', 'B', 'C', 'D'];
    const isLetter = validLetters.includes(ca.toUpperCase());
    const matchesOption = options.some(opt => {
      const cleanOpt = String(opt).replace(/^[A-D][\.\)]\s*/, '').trim();
      return cleanOpt.toLowerCase() === ca.toLowerCase() || String(opt).trim().toLowerCase() === ca.toLowerCase();
    });
    if (!isLetter && !matchesOption) {
      issues.push({
        type: 'CORRECT_ANSWER_MISMATCH',
        severity: 'HIGH',
        detail: `Correct answer "${ca}" is not in ['A','B','C','D'] nor matches any option text.`,
      });
    }
  }

  // 4. Prompt & Passage Integrity
  if (!prompt || prompt.length < 15) {
    issues.push({
      type: 'SHORT_PROMPT',
      severity: 'HIGH',
      detail: `Prompt is suspiciously short (${prompt ? prompt.length : 0} chars).`,
    });
  }

  if (q.section === 'READING_WRITING') {
    if (!passage && prompt.length < 100) {
      issues.push({
        type: 'MISSING_RW_PASSAGE',
        severity: 'MEDIUM',
        detail: 'Reading/Writing question with no passage and short prompt.',
      });
    }
  }

  // 5. OCR Artifacts / Broken formatting
  if (/--\s*\d+\s*of\s*\d+\s*--/i.test(fullText) || /QUESTION\s+\d+\s+OF\s+\d+/i.test(fullText)) {
    issues.push({
      type: 'OCR_PAGE_ARTIFACT',
      severity: 'LOW',
      detail: 'Contains page header/footer OCR noise.',
    });
  }
  if (fullText.includes('[object Object]') || fullText.includes('undefined') || fullText.includes('NaN')) {
    issues.push({
      type: 'CORRUPTED_STRING_ARTIFACT',
      severity: 'HIGH',
      detail: 'Contains "[object Object]", "undefined", or "NaN".',
    });
  }

  // 6. LaTeX formatting check (unbalanced single dollar signs)
  const noCode = fullText.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  const dollars = (noCode.match(/(?<!\\)\$/g) || []).length;
  if (dollars % 2 !== 0) {
    issues.push({
      type: 'UNBALANCED_LATEX_DOLLARS',
      severity: 'MEDIUM',
      detail: `Odd count of '$' signs (${dollars}), may cause KaTeX render failure.`,
    });
  }

  // 7. Explanations Audit
  const expEn = (q.explanation_en || q.explanationEn || '').trim();
  const expUz = (q.explanation_uz || q.explanationUz || '').trim();
  if (!expEn) {
    issues.push({
      type: 'MISSING_EXPLANATION_EN',
      severity: 'MEDIUM',
      detail: 'English explanation is missing.',
    });
  }
  if (!expUz) {
    issues.push({
      type: 'MISSING_EXPLANATION_UZ',
      severity: 'LOW',
      detail: 'Uzbek explanation is missing.',
    });
  }

  return {
    id: q.id,
    source: sourceName,
    section: q.section,
    domain: q.domain,
    difficulty: q.difficulty,
    promptSnippet: prompt.slice(0, 80),
    mentionsFigure,
    strictlyRequiresVisual,
    hasVisual: visualPresent,
    issues,
  };
}

async function runAudit() {
  console.log('======================================================');
  console.log('🔍 VESPERA SAT: COMPREHENSIVE QUESTION & DIAGRAM AUDIT');
  console.log('======================================================\n');

  // 1. Audit Mock Exams Data (src/lib/bluebook-exams-data.json)
  const examsPath = path.join(__dirname, '..', 'src', 'lib', 'bluebook-exams-data.json');
  const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));
  console.log(`Loaded ${exams.length} mock exams from bluebook-exams-data.json.`);

  const mockQuestions = [];
  exams.forEach(exam => {
    ['rwModule1', 'rwModule2Hard', 'rwModule2Easy', 'mathModule1', 'mathModule2Hard', 'mathModule2Easy'].forEach(modKey => {
      (exam[modKey] || []).forEach(q => {
        mockQuestions.push({
          ...q,
          examId: exam.id,
          moduleKey: modKey,
        });
      });
    });
  });
  console.log(`Total questions across all mock exam modules: ${mockQuestions.length}`);

  const mockAuditResults = mockQuestions.map(q => auditSingleQuestion(q, `Mock:${q.examId}:${q.moduleKey}`));

  // 2. Audit Database (vespera.questions)
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const dbRes = await pool.query(`
    SELECT 
      q.id,
      q.section,
      q.domain,
      q.topic_code,
      q.difficulty,
      q.prompt,
      q.passage,
      q.options,
      q.correct_answer,
      q.explanation_uz,
      q.explanation_en,
      q.desmos_trick,
      q.diagram_svg,
      q.diagram_preset
    FROM vespera.questions q
    ORDER BY q.id;
  `);
  console.log(`Loaded ${dbRes.rows.length} questions from PostgreSQL vespera.questions.`);
  const dbAuditResults = dbRes.rows.map(q => auditSingleQuestion(q, 'Database:vespera.questions'));
  await pool.end();

  // Aggregate issues
  function summarizeResults(results, label) {
    const total = results.length;
    const withStrictVisual = results.filter(r => r.strictlyRequiresVisual);
    const withVisual = results.filter(r => r.hasVisual);
    const missingStrictVisual = results.filter(r => r.strictlyRequiresVisual && !r.hasVisual);
    const possibleMissingVisual = results.filter(r => r.issues.some(i => i.type === 'POSSIBLE_MISSING_DIAGRAM'));
    const invalidOptions = results.filter(r => r.issues.some(i => i.type.includes('OPTION')));
    const missingCorrectAnswer = results.filter(r => r.issues.some(i => i.type.includes('CORRECT_ANSWER')));
    const unbalancedLatex = results.filter(r => r.issues.some(i => i.type === 'UNBALANCED_LATEX_DOLLARS'));
    const missingExpEn = results.filter(r => r.issues.some(i => i.type === 'MISSING_EXPLANATION_EN'));
    const missingExpUz = results.filter(r => r.issues.some(i => i.type === 'MISSING_EXPLANATION_UZ'));

    console.log(`\n------------------------------------------------------`);
    console.log(`📊 ${label} Summary (${total} questions)`);
    console.log(`------------------------------------------------------`);
    console.log(`Strictly requires visual diagram/table : ${withStrictVisual.length}`);
    console.log(`Visual diagram/table present           : ${withVisual.length}`);
    console.log(`CRITICAL MISSING DIAGRAMS              : ${missingStrictVisual.length}`);
    console.log(`Possible missing diagrams              : ${possibleMissingVisual.length}`);
    console.log(`Options issues                         : ${invalidOptions.length}`);
    console.log(`Correct answer issues                  : ${missingCorrectAnswer.length}`);
    console.log(`Unbalanced LaTeX ($)                   : ${unbalancedLatex.length}`);
    console.log(`Missing English explanation            : ${missingExpEn.length}`);
    console.log(`Missing Uzbek explanation              : ${missingExpUz.length}`);

    return {
      total,
      missingStrictVisual,
      possibleMissingVisual,
      invalidOptions,
      missingCorrectAnswer,
      unbalancedLatex,
      missingExpEn,
      missingExpUz,
    };
  }

  const mockSummary = summarizeResults(mockAuditResults, 'Mock Exams (bluebook-exams-data.json)');
  const dbSummary = summarizeResults(dbAuditResults, 'Database Bank (vespera.questions)');

  // Save audit report to JSON
  const auditReport = {
    timestamp: new Date().toISOString(),
    mockSummary: {
      total: mockSummary.total,
      missingStrictVisualCount: mockSummary.missingStrictVisual.length,
      missingStrictVisualList: mockSummary.missingStrictVisual,
      possibleMissingVisualList: mockSummary.possibleMissingVisual,
      invalidOptionsList: mockSummary.invalidOptions,
      missingCorrectAnswerList: mockSummary.missingCorrectAnswer,
    },
    dbSummary: {
      total: dbSummary.total,
      missingStrictVisualCount: dbSummary.missingStrictVisual.length,
      missingStrictVisualList: dbSummary.missingStrictVisual,
      possibleMissingVisualList: dbSummary.possibleMissingVisual,
      invalidOptionsList: dbSummary.invalidOptions,
      missingCorrectAnswerList: dbSummary.missingCorrectAnswer,
      unbalancedLatexList: dbSummary.unbalancedLatex,
      missingExpUzCount: dbSummary.missingExpUz.length,
    }
  };

  const reportPath = path.join(__dirname, '..', 'materials', 'question_audit_deep_report.json');
  fs.mkdirSync(path.join(__dirname, '..', 'materials'), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2), 'utf8');
  console.log(`\nDetailed deep audit report saved to: ${reportPath}`);
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
