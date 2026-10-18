"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

/**
 * Universal React Portal component that renders modal dialogs directly into document.body.
 * This guarantees that `position: fixed; inset: 0` always attaches to the actual browser viewport (window),
 * preventing ancestor transforms, transitions, or scrolling containers from distorting the modal's
 * vertical center or causing the modal to appear midway down a tall page.
 */
export default function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}
