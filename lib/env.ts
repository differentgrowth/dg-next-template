import { z } from "zod";

/**
 * Server-side environment variables schema
 * These are only available on the server
 */
const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Database (uncomment when needed)
  // DATABASE_URL: z.string().url(),

  // Authentication (uncomment when needed)
  // AUTH_SECRET: z.string().min(32),
  // AUTH_URL: z.string().url().optional(),

  // Third-party APIs (uncomment when needed)
  // STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  // RESEND_API_KEY: z.string().startsWith("re_"),
});

/**
 * Client-side environment variables schema
 * These are exposed to the browser (prefixed with NEXT_PUBLIC_)
 */
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),

  // Analytics (uncomment when needed)
  // NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  // NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
});

/**
 * Combined schema for all environment variables
 */
const envSchema = serverSchema.merge(clientSchema);

/**
 * Validate and parse environment variables
 * Throws an error with details if validation fails
 */
function validateEnv() {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // Add other env vars here as you uncomment them in the schema
  });

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );

    throw new Error(
      `Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)}`
    );
  }

  return parsed.data;
}

/**
 * Validated environment variables
 * Import this instead of using process.env directly
 *
 * @example
 * ```ts
 * import { env } from "@/lib/env";
 *
 * console.log(env.NEXT_PUBLIC_APP_URL);
 * ```
 */
export const env = validateEnv();

/**
 * Type for the validated environment
 */
export type Env = z.infer<typeof envSchema>;
