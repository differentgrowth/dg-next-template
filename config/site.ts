import { env } from "@/lib/env";

/**
 * Site configuration
 *
 * Update these values to match your project.
 */
export const SITE_CONFIG = {
  /** Site name - appears in the header and metadata */
  NAME: "Acme Inc",

  /** Site description - used for SEO */
  DESCRIPTION: "A modern web application built with Next.js",

  /** Site URL - your production domain (validated from env) */
  URL: env.NEXT_PUBLIC_APP_URL,

  /** Contact email */
  EMAIL: "hello@example.com",

  /** Contact phone (optional) */
  PHONE: "+1 (555) 000-0000",

  /** Logo path - relative to public folder */
  LOGO: "/logo.svg",

  /** Company founding year */
  FOUNDING_YEAR: 2024,

  /** Company location */
  ADDRESS: {
    CITY: "San Francisco",
    REGION: "CA",
    COUNTRY: "US",
    COUNTRY_NAME: "United States",
  },

  /** Social media links */
  SOCIAL: {
    TWITTER: "https://twitter.com/acmeinc",
    GITHUB: "https://github.com/acmeinc",
    LINKEDIN: "https://linkedin.com/company/acmeinc",
  },
} as const;
