"use client";

import React, { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface KaTeXMathProps {
  content: string;
  className?: string;
}

export default function KaTeXMath({ content, className = "" }: KaTeXMathProps) {
  const renderedContent = useMemo(() => {
    if (!content) return "";

    let text = content;

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

    // 2. Block math: $$ ... $$ (Strictly output HTML only to prevent duplicate MathML)
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, equation) => {
      try {
        return `<div class="my-3 py-1.5 overflow-x-auto text-center">${katex.renderToString(
          equation.trim(),
          { displayMode: true, throwOnError: false, output: "html" }
        )}</div>`;
      } catch (e) {
        return `$$${equation}$$`;
      }
    });

    // 3. LaTeX environments like \begin{cases} ... \end{cases}
    text = text.replace(/\\begin\{([a-zA-Z*]+)\}[\s\S]+?\\end\{\1\}/g, (equation) => {
      try {
        return `<div class="my-3 py-1.5 overflow-x-auto text-center">${katex.renderToString(
          equation.trim(),
          { displayMode: true, throwOnError: false, output: "html" }
        )}</div>`;
      } catch (e) {
        return equation;
      }
    });

    // 4. Inline math: $ ... $ (Strictly output HTML only to prevent duplicate MathML)
    text = text.replace(/(?<!\$)\$(?!\$)([^\$]+?)\$(?!\$)/g, (_, equation) => {
      try {
        return `<span class="inline-block px-0.5 align-baseline">${katex.renderToString(
          equation.trim(),
          { displayMode: false, throwOnError: false, output: "html" }
        )}</span>`;
      } catch (e) {
        return `$${equation}$`;
      }
    });

    // 5. Fallback math commands if no $ exists in raw content
    if (!content.includes("$")) {
      const hasMathCommands = /\\(frac|sqrt|pm|approx|cdot|times|le|ge|degree|alpha|beta|theta|pi|div)\b/.test(text);
      const hasExponentOrSub = /(\w+)\^(\([^)]+\)|\w+)|(\w+)_(\w+)/.test(text);

      if (hasMathCommands || hasExponentOrSub) {
        try {
          const normalizedForKaTeX = text.replace(/\^(\(([^)]+)\))/g, "^{$2}");
          const html = katex.renderToString(normalizedForKaTeX.trim(), {
            displayMode: false,
            throwOnError: false,
            output: "html",
          });
          if (!html.includes("katex-error")) {
            return `<span class="inline-block px-0.5 align-baseline">${html}</span>`;
          }
        } catch (e) {
          // Fall back to plain text
        }
      }
    }

    // 6. Markdown Formatting: Inline code `code`
    text = text.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[var(--bg-main)]/80 border border-[var(--border-main)] font-mono text-[11px] text-[var(--accent-blue)] font-semibold">$1</code>');

    // 7. Markdown Formatting: Bold **text**
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-[var(--text-main)]">$1</strong>');

    // 8. Markdown Formatting: Italic *text*
    text = text.replace(/(?<!\*)\*(?!\*)([^\*\n]+?)(?<!\*)\*(?!\*)/g, '<em class="italic">$1</em>');

    // 9. Markdown Formatting: Numbered list items (e.g. 1. Step description)
    text = text.replace(/^(\s*)(\d+)\.\s+(.+)$/gm, (_, indent, num, itemText) => {
      return `<div class="flex items-start gap-2.5 my-2 pl-1"><span class="w-5 h-5 rounded-md bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] flex items-center justify-center text-[11px] font-bold font-mono shrink-0 mt-0.5">${num}</span><span class="flex-1">${itemText}</span></div>`;
    });

    // 10. Markdown Formatting: Bullet list items (e.g. - item or * item)
    text = text.replace(/^(\s*)[-*•]\s+(.+)$/gm, (_, indent, itemText) => {
      return `<div class="flex items-start gap-2.5 my-1.5 pl-1"><span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] shrink-0 mt-2"></span><span class="flex-1">${itemText}</span></div>`;
    });

    // 11. Normalize newlines: Convert double newlines to paragraph spacing, single newlines to <br /> where not inside block tags
    text = text.replace(/\n\n+/g, '<div class="h-2.5"></div>');
    text = text.replace(/(?<!>)\n(?!<)/g, '<br />');

    return text;
  }, [content]);

  return (
    <div
      className={`katex-wrapper leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}
