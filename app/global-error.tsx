"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global error boundary for the root layout
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs
 *
 * This handles errors in the root layout itself.
 * Must include its own <html> and <body> tags.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: "#0a0a0a",
            color: "#fafafa",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "32rem",
            }}
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.875rem",
                color: "#a1a1aa",
                marginBottom: "1.5rem",
              }}
            >
              {error.digest ? `Error: ${error.digest}` : "Critical Error"}
            </p>

            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              Application Error
            </h1>

            <p
              style={{
                color: "#a1a1aa",
                marginBottom: "2rem",
                lineHeight: 1.6,
              }}
            >
              A critical error occurred in the application. Please try
              refreshing the page or contact support if the problem persists.
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => reset()}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#fafafa",
                  color: "#0a0a0a",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                type="button"
              >
                Try again
              </button>
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "transparent",
                  color: "#fafafa",
                  border: "1px solid #27272a",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                type="button"
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
