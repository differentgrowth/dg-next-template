# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start development server (http://localhost:3000)
pnpm build            # Production build
pnpm build:analyze    # Build with bundle analyzer
pnpm start            # Start production server
pnpm lint             # Check code with Biome (linting + formatting)
pnpm lint:fix         # Auto-fix linting and formatting issues
pnpm format           # Format code with Ultracite

# Testing
pnpm test             # Run unit tests in watch mode
pnpm test:run         # Run unit tests once
pnpm test:coverage    # Run tests with coverage report
pnpm test:e2e         # Run E2E tests (headless)
pnpm test:e2e:headed  # Run E2E tests with browser visible
pnpm test:e2e:ui      # Run E2E tests with Playwright UI
```

## Linting & Formatting

This project uses **Ultracite** with **Biome** for linting and formatting:

- Biome config in `biome.jsonc` extends ultracite presets for Next.js + React
- Pre-commit hook automatically formats staged files via Husky
- Run `pnpm lint:fix` or `pnpm format` before committing to fix issues

## Architecture

This is a Next.js 16 project using the App Router with React 19 and Tailwind CSS 4.

### Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx           # Root layout with ThemeProvider, Header, Footer
  page.tsx             # Homepage
  globals.css          # Global styles with theme variables

components/
  brand/               # Brand components (logo, mark)
  blocks/              # Page building blocks (hero, section, features, cta)
  layout/              # Layout components (header, footer, mobile-navbar)
  providers/           # Context providers (theme-provider)
  shared/              # Shared components (mode-toggle)
  ui/                  # Base UI components (button, card, input, etc.)

config/
  site.ts              # Site configuration (name, URL, description)
  navigation.ts        # Navigation links configuration

lib/
  utils.ts             # Utility functions (cn helper)
  env.ts               # Environment variable validation (Zod)
  test-utils.tsx       # Testing utilities

e2e/                    # E2E tests (Playwright)
public/                 # Static assets
```

### UI Components

- **Component library**: Base UI (`@base-ui/react`) primitives with custom styling
- **Styling**: Tailwind CSS 4 with CSS variables for theming (OKLCH color space)
- **Icons**: Hugeicons (`@hugeicons/react` with `@hugeicons/core-free-icons`)
- **Utilities**: `cn()` helper in `lib/utils.ts` combines `clsx` and `tailwind-merge`
- **Variants**: Components use `class-variance-authority` (cva) for variant management
- **Toast**: `sonner` for toast notifications
- **Themes**: `next-themes` for dark mode support

### Path Aliases

```
@/components  -> ./components
@/lib         -> ./lib
@/config      -> ./config
@/hooks       -> ./hooks
```

### Component Pattern

UI components in `components/ui/` follow this pattern:
- Built on Base UI primitives (not Radix)
- Styled with Tailwind using cva for variants
- Export both component and variants (e.g., `Button` and `buttonVariants`)
- Use `data-slot` attributes for styling hooks

### Block Components

Block components in `components/blocks/` are page-level building blocks:
- `Hero` - Hero section with title, description, and CTAs
- `Section` - Content section with optional eyebrow, title, and subtitle
- `Features` - Feature grid with cards
- `CallToAction` - CTA section with background effects
- `BlockWrapper` / `BlockHeader` - Utility components for consistent spacing

### Theming

CSS variables defined in `app/globals.css` using OKLCH color space:

**Core tokens:**
- `--primary`, `--primary-foreground` - Primary brand color
- `--secondary`, `--secondary-foreground` - Secondary color
- `--background`, `--foreground` - Base colors
- `--muted`, `--muted-foreground` - Muted/subtle colors
- `--accent`, `--accent-foreground` - Accent colors
- `--destructive` - Error/danger color
- `--border`, `--input`, `--ring` - UI element colors

**Custom utilities:**
- `.grain` - Noise texture overlay
- `.glow-primary` - Glow effect using primary color
- `.bg-gradient-mesh` - Multi-layer gradient background
- `.shadow-depth` / `.shadow-depth-lg` - Layered shadows
- `.shadow-primary` / `.shadow-primary-lg` / `.shadow-primary-xl` - Primary-tinted shadows
- `.blur-orb-primary` / `.blur-orb-secondary` - Decorative blur orbs
- `.card-shine` - Interactive shine effect on hover
- `.stagger-children` - Staggered fade-in animation for children

### Getting Started

1. Update `config/site.ts` with your site details
2. Update `config/navigation.ts` with your navigation links
3. Replace the logo in `components/brand/logo.tsx`
4. Customize colors in `app/globals.css` (see THEME COLORS section)
5. Build your pages using the block components

### Dark Mode

Dark mode is handled by `next-themes`. The theme toggle is in the header and respects system preference by default.

## Testing

### Unit & Component Tests (Vitest)

Uses **Vitest** with **React Testing Library** for fast unit and component testing.

```
vitest.config.ts      # Vitest configuration
vitest.setup.tsx      # Test setup (mocks, globals)
lib/test-utils.tsx    # Custom render with providers

components/ui/__tests__/  # Component tests
lib/__tests__/            # Utility tests
```

**Key patterns:**
- Use `setup()` from `lib/test-utils` for user interaction tests
- Mocks are pre-configured for `next/navigation`, `next/image`, and `next-themes`
- Tests use `data-slot` attributes for reliable element selection

**Example:**
```tsx
import { setup } from "@/lib/test-utils";

const { user, getByRole } = setup(<Button>Click</Button>);
await user.click(getByRole("button"));
```

### E2E Tests (Playwright)

Uses **Playwright** for cross-browser E2E testing.

```
playwright.config.ts  # Playwright configuration
e2e/                  # E2E test files
  home.spec.ts       # Homepage tests
```

**Features:**
- Tests run against Chromium, Firefox, and WebKit
- Mobile viewport testing (iPhone, Pixel)
- Auto-starts dev server before tests
- Screenshots on failure, traces on retry

**First time setup:**
```bash
pnpm exec playwright install  # Install browsers
```

## Environment Variables

Environment variables are validated with **Zod** in `lib/env.ts`.

```bash
# Copy and configure
cp .env.example .env.local
```

**Usage:**
```ts
import { env } from "@/lib/env";

console.log(env.NEXT_PUBLIC_APP_URL);
```

Add new variables to both `.env.example` and the schema in `lib/env.ts`.

## Next.js Configuration

Configuration in `next.config.ts` includes:

- **Experimental features**: `cacheComponents`, `browserDebugInfoInTerminal`, `turbopackFileSystemCacheForDev`
- **Security headers**: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Image optimization**: AVIF/WebP formats, responsive sizes
- **IE redirect**: Redirects IE users to `/ie-incompatible.html`
- **Bundle analyzer**: Run `pnpm build:analyze` to analyze bundle

## SEO & Metadata

- `app/robots.ts` - Robots.txt configuration
- `app/sitemap.ts` - Dynamic sitemap generation
- `app/opengraph-image.tsx` - Dynamic OG image for social sharing
- Metadata in `app/layout.tsx` uses values from `config/site.ts`

## Error Handling

- `app/error.tsx` - Error boundary for route segments
- `app/not-found.tsx` - Custom 404 page
- `app/global-error.tsx` - Root layout error boundary
- `app/loading.tsx` - Loading state while fetching

## Analytics & Monitoring

- **Vercel Analytics**: Auto-configured, component in layout
- **Instrumentation**: `instrumentation.ts` for server-side logging
- Extend `onRequestError` for error tracking integration (e.g., Sentry)
