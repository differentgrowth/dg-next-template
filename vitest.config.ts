import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.tsx"],
    include: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/e2e/**", "**/.next/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "vitest.setup.ts",
        "**/*.d.ts",
        "**/*.config.*",
        "**/e2e/**",
        ".next/",
      ],
    },
    css: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
});
