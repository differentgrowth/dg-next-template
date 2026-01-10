# Different Growth — Next.js Template

Production-ready Next.js 16 starter template with React 19, Tailwind CSS 4, and opinionated defaults for building high-quality client projects.

## Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS 4 + Base UI primitives
- **Linting**: Biome via Ultracite (zero-config, fast)
- **Testing**: Vitest + React Testing Library + Playwright
- **Type Safety**: TypeScript 5 with strict mode

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test:run

# Build for production
pnpm build
```

## Project Structure

```
app/                    # Pages and routing
components/
  blocks/              # Page sections (hero, features, cta)
  brand/               # Logo and brand assets
  layout/              # Header, footer, navigation
  ui/                  # Base components (button, card, input)
config/
  site.ts              # Site metadata and branding
  navigation.ts        # Navigation links
lib/
  env.ts               # Environment validation (Zod)
  utils.ts             # Utilities (cn helper)
e2e/                    # End-to-end tests
```

## Customize

1. **Branding**: Update `config/site.ts` with client details
2. **Navigation**: Edit `config/navigation.ts`
3. **Logo**: Replace `components/brand/logo.tsx`
4. **Colors**: Modify CSS variables in `app/globals.css`

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm lint` | Check code quality |
| `pnpm lint:fix` | Auto-fix issues |
| `pnpm test` | Unit tests (watch) |
| `pnpm test:run` | Unit tests (once) |
| `pnpm test:e2e` | E2E tests |

## Environment

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Variables are validated at build time via `lib/env.ts`.

## Deployment

Optimized for Vercel. Push to `main` to deploy.

```bash
pnpm build  # Verify build locally first
```

## Documentation

See `CLAUDE.md` for detailed architecture and coding standards.

---

Built by [Different Growth](https://differentgrowth.com)
