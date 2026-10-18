"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Hash } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  itemName?: string;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  itemName = "questions",
  className = "",
}: PaginationProps) {
  const [jumpInput, setJumpInput] = useState("");

  if (totalItems <= 0) return null;

  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate intelligent page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | "ellipsis-left" | "ellipsis-right")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 4) {
      pages.push("ellipsis-left");
    }

    // Calculate middle window
    const startWindow = Math.max(2, currentPage - 1);
    const endWindow = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startWindow; i <= endWindow; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("ellipsis-right");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(jumpInput, 10);
    if (!isNaN(target) && target >= 1 && target <= totalPages) {
      onPageChange(target);
      setJumpInput("");
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm text-xs ${className}`}
      aria-label="Pagination Navigation"
    >
      {/* Left: Item Counter & Page Size Selector */}
      <div className="flex flex-wrap items-center gap-3 text-[var(--text-muted)] w-full sm:w-auto justify-between sm:justify-start">
        <span className="font-mono">
          Showing <strong className="text-[var(--text-main)] font-semibold">{startItem.toLocaleString()}</strong>–
          <strong className="text-[var(--text-main)] font-semibold">{endItem.toLocaleString()}</strong> of{" "}
          <strong className="text-[var(--accent-blue)] font-bold">{totalItems.toLocaleString()}</strong> {itemName}
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 pl-2 border-l border-[var(--border-main)]">
            <span className="text-[11px] font-mono text-[var(--text-muted)]">Per page:</span>
            <div className="inline-flex rounded-lg bg-[var(--bg-surface)] p-0.5 border border-[var(--border-main)]">
              {pageSizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => onPageSizeChange(size)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                    pageSize === size
                      ? "bg-[var(--accent-blue)] text-white shadow-xs"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Page Navigation Buttons */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          title="First page"
          className="p-1.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronsLeft size={14} />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          title="Previous page"
          className="px-2.5 py-1.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 font-semibold"
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline text-[11px]">Prev</span>
        </button>

        {/* Page Number Pills */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) => {
            if (p === "ellipsis-left" || p === "ellipsis-right") {
              return (
                <span
                  key={`${p}-${idx}`}
                  className="px-1 text-[var(--text-muted)] font-mono text-xs select-none"
                >
                  …
                </span>
              );
            }

            const isActive = p === currentPage;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                aria-current={isActive ? "page" : undefined}
                className={`min-w-[28px] h-7 px-2 rounded-lg font-mono text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[var(--accent-blue)] text-white shadow-sm ring-1 ring-[var(--accent-blue)]/50"
                    : "border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          title="Next page"
          className="px-2.5 py-1.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 font-semibold"
        >
          <span className="hidden sm:inline text-[11px]">Next</span>
          <ChevronRight size={14} />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          title="Last page"
          className="p-1.5 rounded-lg border border-[var(--border-main)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronsRight size={14} />
        </button>

        {/* Direct Jump Input if > 5 pages */}
        {totalPages > 5 && (
          <form onSubmit={handleJumpSubmit} className="hidden md:flex items-center gap-1 ml-2 pl-2 border-l border-[var(--border-main)]">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              placeholder={`${currentPage}/${totalPages}`}
              aria-label="Jump to page"
              className="w-14 px-1.5 py-1 rounded-md bg-[var(--bg-surface)] border border-[var(--border-main)] text-[11px] font-mono text-center text-[var(--text-main)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-blue)]"
            />
            <button
              type="submit"
              className="px-2 py-1 rounded-md bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] hover:bg-[var(--accent-blue)] hover:text-white text-[11px] font-bold font-mono transition-colors"
            >
              Go
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
