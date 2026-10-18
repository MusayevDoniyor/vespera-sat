"use client";

import { useEffect } from "react";

/**
 * Robust hook to lock background scrolling when a modal or lightbox is open.
 * Disables scrolling on document.documentElement, document.body, and the <main> container,
 * preventing any background movement and ensuring the modal remains rigidly centered in the viewport.
 */
export function useBodyScrollLock(isLocked: boolean = true) {
  useEffect(() => {
    if (!isLocked || typeof document === "undefined") return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const mainEl = document.querySelector("main");
    const originalMainOverflow = mainEl ? mainEl.style.overflow : "";

    // Lock background scrolling
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (mainEl) {
      mainEl.style.overflow = "hidden";
    }

    // Prevent touchmove on background when modal is open on mobile devices
    const preventTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[role="dialog"]')) {
        return; // Allow modal internal scrolling
      }
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      if (mainEl) {
        mainEl.style.overflow = originalMainOverflow;
      }
      document.removeEventListener("touchmove", preventTouch);
    };
  }, [isLocked]);
}
