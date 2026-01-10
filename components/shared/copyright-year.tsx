"use client";

import { Suspense } from "react";

/**
 * Inner component that renders the current year.
 */
function Year() {
  return <>{new Date().getFullYear()}</>;
}

/**
 * Client component to display the current year.
 * Wrapped in Suspense for cacheComponents compatibility.
 */
export function CopyrightYear() {
  return (
    <Suspense fallback={<span>2025</span>}>
      <Year />
    </Suspense>
  );
}
