/**
 * Instrumentation file for Next.js
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 *
 * This file is used to set up monitoring, logging, and other instrumentation
 * that runs when the Next.js server starts.
 */

export function register() {
  // Server-side instrumentation
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Import server-only instrumentation
    // await import("./instrumentation-node");

    console.log("📊 Server instrumentation initialized");

    // Example: Initialize error tracking (e.g., Sentry)
    // const Sentry = await import("@sentry/nextjs");
    // Sentry.init({
    //   dsn: process.env.SENTRY_DSN,
    //   tracesSampleRate: 1.0,
    // });

    // Example: Initialize logging service
    // const pino = await import("pino");
    // global.logger = pino.default({
    //   level: process.env.LOG_LEVEL || "info",
    // });
  }

  // Edge runtime instrumentation
  if (process.env.NEXT_RUNTIME === "edge") {
    console.log("📊 Edge instrumentation initialized");
  }
}

/**
 * Called when an error is caught during rendering
 */
export function onRequestError(
  error: { digest: string } & Error,
  request: {
    path: string;
    method: string;
    headers: { [key: string]: string };
  },
  context: {
    routerKind: "Pages Router" | "App Router";
    routePath: string;
    routeType: "render" | "route" | "action" | "middleware";
    renderSource:
      | "react-server-components"
      | "react-server-components-payload"
      | "server-rendering";
    revalidateReason: "on-demand" | "stale" | undefined;
    renderType: "dynamic" | "dynamic-resume";
  }
) {
  // Log the error with context
  console.error("Request error:", {
    digest: error.digest,
    message: error.message,
    path: request.path,
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
  });

  // Example: Report to error tracking service
  // Sentry.captureException(error, {
  //   extra: {
  //     path: request.path,
  //     method: request.method,
  //     ...context,
  //   },
  // });
}
