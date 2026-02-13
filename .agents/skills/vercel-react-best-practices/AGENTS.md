# React + Next.js Standards (Different Growth)

**Version 2.0.0**  
Different Growth Engineering  
February 2026

## Purpose

This file defines the default engineering behavior for agents working on this Next.js template.

Use it as the operational policy. Use `rules/*.md` for deep examples and implementation details.

## Project Baseline

- Framework: Next.js 16 App Router + React 19
- Styling: Tailwind CSS 4 + OKLCH design tokens
- UI primitives: `@base-ui/react` (not Radix)
- Package manager: `pnpm`
- Quality tools: Biome/Ultracite + Vitest + Playwright

## Different Growth Defaults (Opinionated)

1. Server-first architecture: default to Server Components; add `"use client"` only for browser APIs, local interactive state, or event handlers.
2. Waterfall avoidance first: start independent async work immediately; await late.
3. Bundle discipline: avoid barrel imports and eagerly loaded heavy libraries.
4. Explicit UX loading states: use Suspense boundaries and transitions intentionally.
5. Stable design system usage: prefer existing `components/ui` patterns, `cva` variants, and `data-slot` hooks.
6. Strong safety rails: typed env in `lib/env.ts`, no secret access on client, secure route patterns.
7. Small, reviewable changes: one concern per commit, one behavior per PR when possible.

## Performance Rule Priority

When multiple improvements are possible, apply in this order:

1. Eliminating Waterfalls (**CRITICAL**)
2. Bundle Size Optimization (**CRITICAL**)
3. Server-Side Performance (**HIGH**)
4. Client-Side Data Fetching (**MEDIUM-HIGH**)
5. Re-render Optimization (**MEDIUM**)
6. Rendering Performance (**MEDIUM**)
7. JavaScript Performance (**LOW-MEDIUM**)
8. Advanced Patterns (**LOW**)

## Rule Index (Load Specific Files As Needed)

### 1) Eliminating Waterfalls

- `rules/async-defer-await.md`
- `rules/async-parallel.md`
- `rules/async-dependencies.md`
- `rules/async-api-routes.md`
- `rules/async-suspense-boundaries.md`

### 2) Bundle Size Optimization

- `rules/bundle-barrel-imports.md`
- `rules/bundle-dynamic-imports.md`
- `rules/bundle-defer-third-party.md`
- `rules/bundle-conditional.md`
- `rules/bundle-preload.md`

### 3) Server-Side Performance

- `rules/server-auth-actions.md`
- `rules/server-dedup-props.md`
- `rules/server-cache-lru.md`
- `rules/server-serialization.md`
- `rules/server-parallel-fetching.md`
- `rules/server-cache-react.md`
- `rules/server-after-nonblocking.md`

### 4) Client-Side Data Fetching

- `rules/client-event-listeners.md`
- `rules/client-passive-event-listeners.md`
- `rules/client-swr-dedup.md`
- `rules/client-localstorage-schema.md`

### 5) Re-render Optimization

- `rules/rerender-defer-reads.md`
- `rules/rerender-simple-expression-in-memo.md`
- `rules/rerender-memo-with-default-value.md`
- `rules/rerender-memo.md`
- `rules/rerender-dependencies.md`
- `rules/rerender-derived-state.md`
- `rules/rerender-functional-setstate.md`
- `rules/rerender-lazy-state-init.md`
- `rules/rerender-transitions.md`

### 6) Rendering Performance

- `rules/rendering-animate-svg-wrapper.md`
- `rules/rendering-content-visibility.md`
- `rules/rendering-hoist-jsx.md`
- `rules/rendering-svg-precision.md`
- `rules/rendering-hydration-no-flicker.md`
- `rules/rendering-activity.md`
- `rules/rendering-conditional-render.md`
- `rules/rendering-usetransition-loading.md`

### 7) JavaScript Performance

- `rules/js-batch-dom-css.md`
- `rules/js-index-maps.md`
- `rules/js-cache-property-access.md`
- `rules/js-cache-function-results.md`
- `rules/js-cache-storage.md`
- `rules/js-combine-iterations.md`
- `rules/js-length-check-first.md`
- `rules/js-early-exit.md`
- `rules/js-hoist-regexp.md`
- `rules/js-min-max-loop.md`
- `rules/js-set-map-lookups.md`
- `rules/js-tosorted-immutable.md`

### 8) Advanced Patterns

- `rules/advanced-event-handler-refs.md`
- `rules/advanced-use-latest.md`

## Conventional Commits (Required)

All commits in this template should follow Conventional Commits.

### Format

`<type>(<scope>): <subject>`

Examples:
- `feat(app): add marketing hero split test variant`
- `fix(ui): prevent dialog focus trap regression`
- `perf(server): parallelize dashboard data fetching`

### Allowed Types

- `feat`: new user-facing behavior
- `fix`: bug fix
- `perf`: measurable performance improvement
- `refactor`: internal code change without behavior change
- `docs`: documentation only
- `style`: formatting or non-functional style-only changes
- `test`: tests added/updated
- `build`: build tooling or dependencies
- `ci`: CI pipeline/workflow changes
- `chore`: maintenance work
- `revert`: revert a previous commit

### Recommended Scopes for This Repo

- `app`
- `components`
- `ui`
- `layout`
- `lib`
- `config`
- `styles`
- `e2e`
- `test`
- `deps`
- `tooling`
- `docs`

### Subject Rules

- Imperative mood (`add`, `fix`, `remove`, `optimize`)
- Lowercase start
- No trailing period
- Keep concise (target <= 72 chars)

### Breaking Changes

Use `!` in the header and include a `BREAKING CHANGE:` footer.

Example:

```text
feat(config)!: rename public app url environment variable

BREAKING CHANGE: NEXT_PUBLIC_SITE_URL replaced by NEXT_PUBLIC_APP_URL
```

### Commit Body and Footers

Use body for rationale, tradeoffs, and migration notes.  
Use footers for issue references (for example `Refs: #123`).

### Commit Granularity

- Do not mix unrelated concerns in one commit.
- Separate `refactor` from `feat`/`fix` when practical.
- Keep formatting-only changes isolated (`style`/`chore`).

## Definition of Done (Before Commit)

Run relevant checks before finalizing changes:

```bash
pnpm lint
pnpm test:run
pnpm build
```

When touching E2E flows, also run:

```bash
pnpm test:e2e
```

If a check is intentionally skipped, state why in the PR description.

## PR Expectations

1. Explain what changed and why.
2. Call out performance impact if applicable (waterfall, bundle, or render).
3. Include screenshots for visible UI changes.
4. Note any env/schema/config migration.
5. Keep PR scope focused and reviewable.

## Anti-Patterns to Reject

- Sequential awaits for independent network calls
- New client components when server rendering is sufficient
- Barrel imports that increase bundle size
- Unbounded client-side effects with broad dependencies
- Large commits with mixed concerns and unclear intent

## Operating Note for Agents

Start with the smallest high-impact change that follows the rule priority.  
Prefer direct, deterministic fixes over broad rewrites.
