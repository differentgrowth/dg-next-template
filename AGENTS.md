# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start development server (http://localhost:3000)
pnpm build            # Production build
pnpm build:analyze    # Build with bundle analyzer (ANALYZE=true)
pnpm start            # Start production server
pnpm lint             # Check code with Biome
pnpm format           # Format code with Ultracite
pnpm check            # Biome check with auto-fix (--write --unsafe)

# Testing
pnpm test             # Run unit tests in watch mode
pnpm test:run         # Run unit tests once
pnpm test:coverage    # Run tests with coverage report
pnpm test:e2e         # Run E2E tests (headless)
pnpm test:e2e:headed  # Run E2E tests with browser visible
pnpm test:e2e:ui      # Run E2E tests with Playwright UI
```

## Architecture

Next.js 16 project using the App Router with React 19 and Tailwind CSS 4.

### Key Directories

- `app/` - Next.js App Router pages, layouts, and metadata (robots.ts, sitemap.ts, opengraph-image.tsx)
- `components/ui/` - Base UI components built on `@base-ui/react` primitives (not Radix)
- `components/blocks/` - Page building blocks (Hero, Section, Features, CallToAction)
- `components/layout/` - Header, Footer, mobile-navbar
- `config/site.ts` - Site configuration (name, URL, description, social links)
- `config/navigation.ts` - Navigation links
- `lib/env.ts` - Environment variable validation with Zod
- `e2e/` - Playwright E2E tests

### UI Components

- Built on **Base UI** (`@base-ui/react`) primitives, not Radix
- Styled with Tailwind using `class-variance-authority` (cva) for variants
- Export both component and variants (e.g., `Button` and `buttonVariants`)
- Use `data-slot` attributes for styling hooks
- Icons from Hugeicons (`@hugeicons/react`)
- `cn()` helper in `lib/utils.ts` combines `clsx` and `tailwind-merge`

### Theming

CSS variables in `app/globals.css` use **OKLCH color space**:
- Core tokens: `--primary`, `--secondary`, `--background`, `--foreground`, `--muted`, `--accent`, `--destructive`
- Custom utilities: `.grain`, `.glow-primary`, `.bg-gradient-mesh`, `.shadow-depth`, `.blur-orb-primary`, `.card-shine`, `.stagger-children`
- Dark mode via `next-themes` (toggle in header, respects system preference)

### Path Aliases

`@/*` maps to `./` (e.g., `@/components`, `@/lib`, `@/config`)

## Linting & Formatting

Uses **Ultracite** with **Biome** for linting and formatting:
- Config in `biome.jsonc` extends ultracite presets for Next.js + React
- Pre-commit hook via Husky automatically checks staged files
- Run `pnpm format` or `pnpm check` before committing

## Testing

### Unit Tests (Vitest)

```tsx
import { setup } from "@/lib/test-utils";

const { user, getByRole } = setup(<Button>Click</Button>);
await user.click(getByRole("button"));
```

- Mocks pre-configured for `next/navigation`, `next/image`, `next-themes`
- Tests use `data-slot` attributes for element selection

### E2E Tests (Playwright)

```bash
pnpm exec playwright install  # First time setup - install browsers
```

- Tests in `e2e/` directory
- Runs against Chromium, Firefox, WebKit + mobile viewports
- Auto-starts dev server before tests

## Environment Variables

Validated with Zod in `lib/env.ts`:

```bash
cp .env.example .env.local
```

```ts
import { env } from "@/lib/env";
console.log(env.NEXT_PUBLIC_APP_URL);
```

Add new variables to both `.env.example` and schema in `lib/env.ts`.

## Next.js Configuration

Key settings in `next.config.ts`:
- Security headers: CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy
- Image optimization: AVIF/WebP formats
- IE redirect to `/ie-incompatible.html`
- Experimental: `cacheComponents`, `turbopackFileSystemCacheForDev`
