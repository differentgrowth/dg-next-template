# Different Growth Next.js Template - Project Context

> Production-ready Next.js 16 starter template with React 19, Tailwind CSS 4, and opinionated defaults for client projects.

## Project Overview

This is a **starter template** designed by Different Growth for building high-quality client web applications. It provides a complete foundation with pre-configured tooling, component library, theming system, and testing infrastructure.

The template emphasizes **developer experience** and **production readiness** out of the box. It includes a full component library built on Base UI primitives, a flexible theming system using CSS custom properties with OKLCH colors, and comprehensive testing with both unit tests (Vitest) and E2E tests (Playwright).

Target users are development teams starting new client projects who need a solid foundation without spending time on boilerplate configuration.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.9 (strict mode) |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Components | Base UI primitives (`@base-ui/react`) |
| Icons | Hugeicons (`@hugeicons/react`) |
| Linting | Biome via Ultracite |
| Unit Testing | Vitest + React Testing Library |
| E2E Testing | Playwright |
| Package Manager | pnpm |
| Hosting | Vercel (optimized) |

## Architecture

### Directory Structure

```
app/                    # Next.js App Router pages and layouts
  layout.tsx           # Root layout with providers
  page.tsx             # Homepage
  globals.css          # Global styles + theme variables
  error.tsx            # Error boundary
  not-found.tsx        # 404 page

components/
  blocks/              # Page sections (Hero, Features, CTA, Section)
  brand/               # Logo and brand components
  layout/              # Header, Footer, MobileNavbar
  providers/           # Context providers (ThemeProvider)
  shared/              # Shared utilities (ModeToggle)
  ui/                  # Base components (Button, Card, Input, etc.)

config/
  site.ts              # Site metadata, branding, contact info
  navigation.ts        # Navigation links configuration

lib/
  env.ts               # Environment validation (Zod schemas)
  utils.ts             # Utilities (cn helper)
  test-utils.tsx       # Testing utilities with providers

e2e/                   # Playwright E2E tests
public/                # Static assets
```

### Key Patterns

- **Server Components by default** - Use client components only when needed
- **Base UI primitives** - Components built on `@base-ui/react`, not Radix
- **CVA for variants** - Use `class-variance-authority` for component variants
- **Typed routes** - Next.js typed routes enabled for Link/Router type safety
- **Env validation** - All environment variables validated with Zod at build time
- **`data-slot` attributes** - Used for styling hooks and test selectors

## Project Conventions

### File Organization

- Components use PascalCase filenames matching component name
- One component per file (exception: tightly coupled sub-components)
- Tests colocated in `__tests__` directories
- Config files at project root

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with `use` prefix | `useTheme.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | SCREAMING_SNAKE | `SITE_CONFIG` |
| CSS Variables | kebab-case | `--primary-foreground` |

### Code Patterns

- Use `cn()` helper from `lib/utils.ts` for conditional classes
- Export both component and variants (e.g., `Button` and `buttonVariants`)
- Use `as const` assertions for configuration objects
- Prefer explicit return types on exported functions

### Component Pattern

```tsx
// Standard UI component structure
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("base-classes", {
  variants: { variant: { default: "...", outline: "..." } },
  defaultVariants: { variant: "default" },
});

function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export { Button, buttonVariants };
```

## Development

### Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (localhost:3000) |
| `pnpm build` | Production build |
| `pnpm build:analyze` | Build with bundle analyzer |
| `pnpm start` | Start production server |
| `pnpm lint` | Check code with Biome |
| `pnpm format` | Auto-fix with Ultracite |
| `pnpm test` | Unit tests (watch mode) |
| `pnpm test:run` | Unit tests (single run) |
| `pnpm test:coverage` | Tests with coverage |
| `pnpm test:e2e` | E2E tests (headless) |
| `pnpm test:e2e:headed` | E2E tests (visible browser) |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APP_URL` | Production URL | No (defaults to localhost:3000) |
| `NODE_ENV` | Environment mode | No (defaults to development) |

Add new variables to both the Zod schema in `lib/env.ts` and document here.

### Customization Checklist

1. Update `config/site.ts` with client details (name, URL, contact)
2. Update `config/navigation.ts` with site navigation
3. Replace logo in `components/brand/logo.tsx`
4. Customize colors in `app/globals.css` (THEME COLORS section)
5. Build pages using block components from `components/blocks/`

## Theming

CSS variables in `app/globals.css` use **OKLCH color space** for perceptually uniform colors.

**Core tokens:**
- `--primary` / `--primary-foreground` - Brand color
- `--secondary` / `--secondary-foreground` - Secondary color
- `--background` / `--foreground` - Base colors
- `--muted` / `--muted-foreground` - Subtle colors
- `--accent` / `--accent-foreground` - Accent colors
- `--destructive` - Error/danger color
- `--border`, `--input`, `--ring` - UI element colors

**Custom utilities:**
- `.grain` - Noise texture overlay
- `.glow-primary` - Glow effect
- `.bg-gradient-mesh` - Multi-layer gradient
- `.shadow-depth` / `.shadow-primary` - Layered shadows
- `.card-shine` - Interactive shine effect
- `.stagger-children` - Staggered fade-in animation

## Related Documents

| Document | Purpose |
|----------|---------|
| `AGENTS.md` | Project context (this file) |
| `CLAUDE.md` | Symlink to AGENTS.md |
| `README.md` | Quick start guide |
| `PLAN.md` | Project roadmap and tasks |
| `PROGRESS.md` | Session history |

## Testing

### Unit Tests (Vitest)

```tsx
import { setup } from "@/lib/test-utils";

const { user, getByRole } = setup(<Button>Click</Button>);
await user.click(getByRole("button"));
```

- Use `setup()` helper for user interaction tests
- Tests use `data-slot` attributes for element selection
- Mocks pre-configured for `next/navigation`, `next/image`, `next-themes`

### E2E Tests (Playwright)

```bash
pnpm exec playwright install  # First time setup
pnpm test:e2e                 # Run tests
```

- Cross-browser: Chromium, Firefox, WebKit
- Mobile viewport testing included
- Auto-starts dev server

## Security

The Next.js config includes production security headers:
- Content Security Policy (CSP)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (camera, microphone, geolocation disabled)

---

## Ultracite Code Standards

This project uses **Ultracite** for linting and formatting via Biome.

### Quick Reference

```bash
pnpm format        # Auto-fix issues
pnpm lint          # Check for issues
```

### Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**.

**Type Safety:**
- Explicit types for function parameters and return values
- Prefer `unknown` over `any`
- Use const assertions for immutable values
- Leverage type narrowing over type assertions

**Modern JavaScript/TypeScript:**
- Arrow functions for callbacks
- `for...of` over `.forEach()` and indexed loops
- Optional chaining (`?.`) and nullish coalescing (`??`)
- Template literals over string concatenation
- `const` by default, `let` when needed, never `var`

**React & JSX:**
- Function components only
- Hooks at top level, never conditionally
- Complete dependency arrays
- Unique `key` props (prefer IDs over indices)
- Semantic HTML and ARIA for accessibility

**Error Handling:**
- No `console.log`, `debugger`, `alert` in production
- Throw `Error` objects with descriptive messages
- Early returns over nested conditionals

**Performance:**
- Avoid spread in loop accumulators
- Top-level regex literals
- Specific imports over namespace imports
- Avoid barrel files
- Use Next.js `<Image>` component

**Framework-Specific:**
- Server Components for async data fetching
- React 19: ref as prop (no forwardRef)
- Next.js `<Image>` for all images

---

Most issues are auto-fixable. Run `pnpm format` before committing.
