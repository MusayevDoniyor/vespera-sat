"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, RotateCcw, Maximize2, Minimize2, Move, Sparkles } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface DesmosCalculatorProps {
  onClose?: () => void;
  isFloating?: boolean;
  initialEquation?: string;
}

declare global {
  interface Window {
    Desmos?: any;
    vesperaCalculator?: any;
  }
}

export default function DesmosCalculator({
  onClose,
  isFloating = false,
  initialEquation,
}: DesmosCalculatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFormula, setActiveFormula] = useState<string>("");
  const { theme } = useTheme();

  // Movable & Resizable state for floating mode
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 760, height: 620 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;

    const initCalculator = () => {
      if (containerRef.current && window.Desmos && !calculatorRef.current) {
        calculatorRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
          keypad: true,
          graphpaper: true,
          expressions: true,
          settingsMenu: true,
          zoomButtons: true,
          border: false,
          invertedColors: theme === "dark",
        });
        window.vesperaCalculator = calculatorRef.current;
        setIsLoaded(true);

        if (initialEquation) {
          calculatorRef.current.setExpression({ id: "init_exp", latex: initialEquation });
          setActiveFormula(initialEquation);
        }
      }
    };

    if (!window.Desmos) {
      script = document.createElement("script");
      script.src =
        "https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
      script.async = true;
      script.onload = initCalculator;
      document.body.appendChild(script);
    } else {
      initCalculator();
    }

    const handleDesmosLoad = (e: CustomEvent) => {
      const latex = e.detail?.latex;
      if (latex && calculatorRef.current) {
        calculatorRef.current.setBlank();
        calculatorRef.current.setExpression({ id: "auto_inject", latex });
        setActiveFormula(latex);
      }
    };

    window.addEventListener("vespera_desmos_load" as any, handleDesmosLoad);

    return () => {
      window.removeEventListener("vespera_desmos_load" as any, handleDesmosLoad);
      if (calculatorRef.current) {
        calculatorRef.current.destroy();
        calculatorRef.current = null;
        window.vesperaCalculator = null;
      }
    };
  }, [initialEquation, theme]);

  // Dragging handler
  const handleMouseDownHeader = (e: React.MouseEvent) => {
    if (!isFloating || isExpanded) return;
    if ((e.target as HTMLElement).closest("button")) return;

    e.preventDefault();
    setIsDragging(true);

    const currentX = position?.x ?? (window.innerWidth - size.width - 24);
    const currentY = position?.y ?? (window.innerHeight - size.height - 24);
    const startMouseX = e.clientX;
    const startMouseY = e.clientY;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startMouseX;
      const deltaY = moveEvent.clientY - startMouseY;

      const newX = Math.max(10, Math.min(window.innerWidth - size.width - 10, currentX + deltaX));
      const newY = Math.max(10, Math.min(window.innerHeight - 80, currentY + deltaY));
      setPosition({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Resize handler (bottom-right handle)
  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startMouseX = e.clientX;
    const startMouseY = e.clientY;
    const startW = size.width;
    const startH = size.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newW = Math.max(480, Math.min(window.innerWidth - 40, startW + (moveEvent.clientX - startMouseX)));
      const newH = Math.max(380, Math.min(window.innerHeight - 40, startH + (moveEvent.clientY - startMouseY)));
      setSize({ width: newW, height: newH });
      calculatorRef.current?.resize();
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      calculatorRef.current?.resize();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const insertFormula = (latex: string, id: string) => {
    if (calculatorRef.current) {
      calculatorRef.current.setExpression({ id, latex });
      setActiveFormula(latex);
    }
  };

  const handleReset = () => {
    if (calculatorRef.current) {
      calculatorRef.current.setBlank();
      setActiveFormula("");
    }
  };

  useEffect(() => {
    if (calculatorRef.current) {
      setTimeout(() => {
        calculatorRef.current?.resize();
      }, 60);
    }
  }, [isExpanded, size]);

  return (
    <div
      style={
        isFloating && !isExpanded
          ? position
            ? {
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
              }
            : {
                width: `${size.width}px`,
                height: `${size.height}px`,
              }
          : undefined
      }
      className={`flex flex-col bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl overflow-hidden shadow-2xl transition-all ${
        isFloating
          ? isExpanded
            ? "fixed inset-6 sm:inset-10 z-50 ring-2 ring-black/15 dark:ring-white/15"
            : `fixed z-50 ${!position ? "bottom-6 right-6" : ""} ring-1 ring-black/10 dark:ring-white/10`
          : isExpanded
          ? "w-full h-[840px]"
          : "w-full h-[640px]"
      }`}
    >
      {/* Draggable Bluebook Header */}
      <div
        onMouseDown={handleMouseDownHeader}
        title={isFloating && !isExpanded ? "Click and drag to move window anywhere on screen" : undefined}
        className={`flex items-center justify-between px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-main)] select-none ${
          isFloating && !isExpanded ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          {isFloating && (
            <Move size={14} className="text-[var(--text-muted)] cursor-grab active:cursor-grabbing" />
          )}
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          <span className="text-xs font-bold text-[var(--text-main)] tracking-tight">
            Desmos Graphing Calculator
          </span>
          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[var(--border-main)] text-[var(--text-muted)] font-mono">
            Official Bluebook Tool
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Restore Size" : "Maximize Workstation"}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors"
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            onClick={handleReset}
            title="Clear Graph"
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-colors"
          >
            <RotateCcw size={14} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              title="Close"
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-500 hover:bg-[var(--bg-card)] transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Subtle Formula Shortcut Strip */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-card)] border-b border-[var(--border-main)] overflow-x-auto text-xs scrollbar-none">
        <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
          <Sparkles size={11} className="text-[var(--accent-blue)]" /> Shortcuts:
        </span>
        <button
          onClick={() => insertFormula("y = mx + b", "linear")}
          className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--accent-blue)]/10 text-[var(--text-muted)] hover:text-[var(--accent-blue)] text-[11px] font-mono border border-[var(--border-main)] whitespace-nowrap transition-colors"
        >
          y = mx + b
        </button>
        <button
          onClick={() => insertFormula("y = a(x - h)^2 + k", "vertex")}
          className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--accent-blue)]/10 text-[var(--text-muted)] hover:text-[var(--accent-blue)] text-[11px] font-mono border border-[var(--border-main)] whitespace-nowrap transition-colors"
        >
          y = a(x - h)² + k
        </button>
        <button
          onClick={() => insertFormula("(x - h)^2 + (y - k)^2 = r^2", "circle")}
          className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--accent-blue)]/10 text-[var(--text-muted)] hover:text-[var(--accent-blue)] text-[11px] font-mono border border-[var(--border-main)] whitespace-nowrap transition-colors"
        >
          Circle (r²)
        </button>
        <button
          onClick={() => insertFormula("y = a(1 + r)^t", "exp_growth")}
          className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--accent-blue)]/10 text-[var(--text-muted)] hover:text-[var(--accent-blue)] text-[11px] font-mono border border-[var(--border-main)] whitespace-nowrap transition-colors"
        >
          y = a(1+r)ᵗ
        </button>
        <button
          onClick={() => insertFormula("y_1 \\sim mx_1 + b", "regression")}
          className="px-2 py-0.5 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--accent-blue)]/10 text-[var(--text-muted)] hover:text-[var(--accent-blue)] text-[11px] font-mono border border-[var(--border-main)] whitespace-nowrap transition-colors"
        >
          y₁ ~ mx₁ + b
        </button>
      </div>

      {/* Main Desmos Graph Canvas */}
      <div className="relative flex-1 w-full bg-[var(--bg-card)] min-h-[300px]">
        <div ref={containerRef} className="w-full h-full" />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-card)]/80 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
              <div className="w-6 h-6 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin"></div>
              <span>Connecting Official Desmos Engine...</span>
            </div>
          </div>
        )}

        {/* Diagonal Resize Grip (Floating mode only) */}
        {isFloating && !isExpanded && (
          <div
            onMouseDown={handleMouseDownResize}
            title="Click and drag to resize Desmos freely"
            className="absolute bottom-1 right-1 w-5 h-5 cursor-se-resize flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-blue)] select-none z-20"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <circle cx="8" cy="8" r="1.2" />
              <circle cx="8" cy="4" r="1.2" />
              <circle cx="4" cy="8" r="1.2" />
              <circle cx="8" cy="0" r="1.2" />
              <circle cx="4" cy="4" r="1.2" />
              <circle cx="0" cy="8" r="1.2" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
