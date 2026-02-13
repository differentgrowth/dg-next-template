import type { NextConfig } from "next";

import bundleAnalyzer from "@next/bundle-analyzer";

/**
 * Bundle analyzer wrapper
 * Run with: ANALYZE=true pnpm build
 */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * Content Security Policy
 * Customize based on your needs (analytics, fonts, images, etc.)
 */
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  /**
   * Redirects
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects
   */
  async redirects() {
    return [
      {
        source: "/:path((?!ie-incompatible.html$).*)",
        has: [
          {
            type: "header",
            key: "user-agent",
            value: "(.*Trident.*)",
          },
        ],
        destination: "/ie-incompatible.html",
        permanent: false,
      },
    ];
  },
  /**
   * Image optimization
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/images
   */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  /**
   * Security headers
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
    ];
  },

  /**
   * Powered by header (disabled for security)
   */
  poweredByHeader: false,

  /**
   * Strict mode for React
   */
  reactStrictMode: true,

  /**
   * Compression (disable if using reverse proxy like nginx/cloudflare)
   */
  compress: true,

  /**
   * Enable type checking for Link and Router.push, etc.
   */
  typedRoutes: true,

  // Enable component-level caching for improved performance
  // Components can use `use cache` directive for granular caching
  cacheComponents: true,

  /**
   * Experimental features
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/experimental
   */
  experimental: {
    // Show browser debug info in terminal (file paths, line numbers)
    browserDebugInfoInTerminal: true,

    // Enable Turbopack file system cache for faster dev rebuilds
    turbopackFileSystemCacheForDev: true,
    // Enable Turbopack file system cache for faster build rebuilds
    turbopackFileSystemCacheForBuild: true,
  },
};

export default withBundleAnalyzer(nextConfig);
