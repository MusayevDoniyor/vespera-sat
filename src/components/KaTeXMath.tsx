"use client";

import React, { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface KaTeXMathProps {
  content?: string;
  mathText?: string;
  className?: string;
}

export default function KaTeXMath({ content, mathText, className = "" }: KaTeXMathProps) {
  const actualContent = content ?? mathText ?? "";
  const renderedContent = useMemo(() => {
    if (!actualContent) return "";

    let text = actualContent;
    const tokens: { id: string; html: string }[] = [];
    const saveToken = (html: string) => {
      const id = `%%%VKATEX_${tokens.length}_${Math.random().toString(36).slice(2, 7)}%%%`;
      tokens.push({ id, html });
      return id;
    };

    // 1. Currency fixes ($45, $1,500, etc.)
    text = text.replace(/\$\s*\\+\$\s*([0-9.,{}]+)\s*\$/g, (_, val) => {
      const cleanVal = val.replace(/[{}]/g, "");
      return `&#36;${cleanVal}`;
    });

    text = text.replace(/\\+\$\s*([0-9.,{}]+)\s*\$/g, (_, val) => {
      const cleanVal = val.replace(/[{}]/g, "");
      return `&#36;${cleanVal}`;
    });

    text = text.replace(/\\+\$\s*([0-9.,{}]+)/g, (_, val) => {
      const cleanVal = val.replace(/[{}]/g, "");
      return `&#36;${cleanVal}`;
    });

    // 2. Block math: $$ ... $$
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, equation) => {
      try {
        const rendered = katex.renderToString(equation.trim(), {
          displayMode: true,
          throwOnError: false,
          output: "html",
          strict: false,
        });
        return saveToken(`<div class="my-4 py-3.5 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/60 overflow-x-auto text-center shadow-xs flex items-center justify-center">${rendered}</div>`);
      } catch (e) {
        return `$$${equation}$$`;
      }
    });

    // 3. LaTeX environments like \begin{cases} ... \end{cases}
    text = text.replace(/\\begin\{([a-zA-Z*]+)\}[\s\S]+?\\end\{\1\}/g, (equation) => {
      try {
        const rendered = katex.renderToString(equation.trim(), {
          displayMode: true,
          throwOnError: false,
          output: "html",
          strict: false,
        });
        return saveToken(`<div class="my-4 py-3.5 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/60 overflow-x-auto text-center shadow-xs flex items-center justify-center">${rendered}</div>`);
      } catch (e) {
        return equation;
      }
    });

    // 4. Inline math: $ ... $
    text = text.replace(/(?<!\$)\$(?!\$)([^\$\n]+?)\$(?!\$)/g, (_, equation) => {
      try {
        const rendered = katex.renderToString(equation.trim(), {
          displayMode: false,
          throwOnError: false,
          output: "html",
          strict: false,
        });
        return saveToken(`<span class="inline-block px-1 align-baseline font-medium">${rendered}</span>`);
      } catch (e) {
        return `$${equation}$`;
      }
    });

    // 5. Fallback math commands if no $ exists in raw content
    if (!actualContent.includes("$") && tokens.length === 0) {
      const hasMathCommands = /\\(frac|sqrt|pm|approx|cdot|times|le|ge|degree|alpha|beta|theta|pi|div)\b/.test(text);
      const hasExponentOrSub = /(\w+)\^(\([^)]+\)|\w+)|(\w+)_(\w+)/.test(text);

      if (hasMathCommands || hasExponentOrSub) {
        try {
          const normalizedForKaTeX = text.replace(/\^(\(([^)]+)\))/g, "^{$2}");
          const html = katex.renderToString(normalizedForKaTeX.trim(), {
            displayMode: false,
            throwOnError: false,
            output: "html",
            strict: false,
          });
          if (!html.includes("katex-error")) {
            return `<span class="inline-block px-0.5 align-baseline font-medium">${html}</span>`;
          }
        } catch (e) {
          // Fall back to plain text
        }
      }
    }

    // 6. Markdown Tables
    const tableRegex = /(?:^|\n)(\|[^\n]+\|\r?\n\|[-:\s|]+\|\r?\n(?:\|[^\n]+\|\r?\n?)+)/g;
    text = text.replace(tableRegex, (match, tableContent) => {
      const lines = tableContent.trim().split(/\r?\n/);
      if (lines.length < 2) return match;

      const parseLine = (line: string): string[] =>
        line
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((cell: string) => cell.trim());

      const headers = parseLine(lines[0]);
      const alignSpecs = parseLine(lines[1]);
      const alignments = alignSpecs.map((spec: string) => {
        if (spec.startsWith(":") && spec.endsWith(":")) return "text-center";
        if (spec.endsWith(":")) return "text-right";
        return "text-left";
      });

      const rows: string[][] = lines.slice(2).map(parseLine);

      let html = '<div class="my-5 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs"><table class="w-full text-left text-xs sm:text-sm border-collapse"><thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold border-b border-slate-200 dark:border-slate-700"><tr>';
      headers.forEach((h: string, idx: number) => {
        const align = alignments[idx] || "text-left";
        html += `<th class="py-3 px-4 ${align}">${h}</th>`;
      });
      html += '</tr></thead><tbody class="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">';
      rows.forEach((row: string[]) => {
        html += '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">';
        row.forEach((cell: string, idx: number) => {
          const align = alignments[idx] || "text-left";
          html += `<td class="py-3 px-4 ${align}">${cell}</td>`;
        });
        html += '</tr>';
      });
      html += '</tbody></table></div>';
      return '\n\n' + html + '\n\n';
    });

    // 7. Markdown Headings (h2, h3, h4)
    text = text.replace(/^###\s+(.+)$/gm, '<h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-6 mb-2.5 tracking-tight flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">$1</h3>');
    text = text.replace(/^####\s+(.+)$/gm, '<h4 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">$1</h4>');
    text = text.replace(/^##\s+(.+)$/gm, '<h2 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-7 mb-3 tracking-tight border-b border-slate-200 dark:border-slate-800 pb-2.5">$1</h2>');

    // 8. Markdown Blockquotes
    text = text.replace(/^>\s+(.+)$/gm, '<blockquote class="my-3.5 p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/20 border-l-4 border-blue-600 dark:border-blue-500 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium shadow-xs">$1</blockquote>');

    // 9. Markdown Formatting: Inline code `code`
    text = text.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[11px] text-blue-700 dark:text-blue-300 font-semibold">$1</code>');

    // 10. Markdown Formatting: Bold **text**
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');

    // 11. Markdown Formatting: Italic *text*
    text = text.replace(/(?<!\*)\*(?!\*)([^\*\n]+?)(?<!\*)\*(?!\*)/g, '<em class="italic text-slate-800 dark:text-slate-200">$1</em>');

    // 12. Sub-bullets (indented with 2+ spaces or tabs)
    text = text.replace(/^[ \t]{2,}[-*•]\s+(.+)$/gm, '<div class="flex items-start gap-2 my-1 pl-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0 mt-1.5"></span><span class="flex-1">$1</span></div>');

    // 13. Top-level Numbered list items
    text = text.replace(/^(\d+)\.\s+(.+)$/gm, '<div class="flex items-start gap-2.5 my-2 pl-1"><span class="w-5 h-5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center text-[11px] font-bold font-mono shrink-0 mt-0.5">$1</span><span class="flex-1 text-slate-800 dark:text-slate-200 leading-relaxed">$2</span></div>');

    // 14. Top-level Bullet list items
    text = text.replace(/^[-*•]\s+(.+)$/gm, '<div class="flex items-start gap-2.5 my-1.5 pl-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-2"></span><span class="flex-1 text-slate-800 dark:text-slate-200 leading-relaxed">$1</span></div>');

    // 15. Normalize newlines: Convert double newlines to paragraph spacing, single newlines to <br /> where not inside block tags
    text = text.replace(/\n\n+/g, '<div class="h-2.5"></div>');
    text = text.replace(/(?<!>)\n(?!<)/g, '<br />');

    // 16. Restore KaTeX tokens safely (pure HTML without touching any internal SVG <path> d attributes)
    for (const token of tokens) {
      text = text.split(token.id).join(token.html);
    }

    // 17. Clean up any redundant <br /> tags directly touching block elements
    text = text.replace(/<br \/>\s*(<(?:div|table|blockquote|h[1-6]))/g, "$1");
    text = text.replace(/(<\/(?:div|table|blockquote|h[1-6])>)\s*<br \/>/g, "$1");

    return text;
  }, [actualContent]);

  return (
    <div
      className={`katex-wrapper leading-relaxed text-slate-900 dark:text-slate-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}
