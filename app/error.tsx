"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for route segments
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error
 */
export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="space-y-6">
        {/* Error code */}
        <p className="font-mono text-muted-foreground text-sm">
          {error.digest ? `Error: ${error.digest}` : "Error"}
        </p>

        {/* Heading */}
        <h1 className="font-bold text-4xl tracking-tight sm:text-5xl">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-md text-muted-foreground">
          An unexpected error occurred. Our team has been notified and is
          working on a fix.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button onClick={() => reset()}>Try again</Button>
          <Button onClick={() => window.location.reload()} variant="outline">
            Refresh page
          </Button>
        </div>

        {/* Error details in development */}
        {process.env.NODE_ENV === "development" && (
          <details className="mx-auto mt-8 max-w-2xl text-left">
            <summary className="cursor-pointer text-muted-foreground text-sm hover:text-foreground">
              Error details
            </summary>
            <pre className="mt-4 overflow-auto rounded-lg bg-muted p-4 font-mono text-xs">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
