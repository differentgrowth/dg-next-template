# Project Plan

> Opinionated roadmap to evolve this starter template into a comprehensive, production-grade foundation.

## Current Phase

### Phase 1: Essential UI Components

_Expand the component library with commonly needed primitives._

- [ ] T001 - Add `Tabs` component (Base UI tabs primitive)
- [ ] T002 - Add `Tooltip` component with accessible positioning
- [ ] T003 - Add `Avatar` component with fallback initials
- [ ] T004 - Add `Switch` toggle component
- [ ] T005 - Add `Checkbox` and `Radio` components
- [ ] T006 - Add `Progress` and `Spinner` loading indicators
- [ ] T007 - Add `Skeleton` loading placeholder component
- [ ] T008 - Add `Accordion` collapsible sections component
- [ ] T009 - Add `Breadcrumb` navigation component
- [ ] T010 - Add `Pagination` component

### Phase 2: Forms & Data Patterns

_Demonstrate modern Next.js patterns for data handling._

- [ ] T011 - Create `Form` wrapper with server action integration
- [ ] T012 - Add `useFormStatus` hook examples in form components
- [ ] T013 - Create example contact form page with validation (Zod)
- [ ] T014 - Add toast notifications for form success/error states
- [ ] T015 - Create `FormField` compound component (label + input + error)
- [ ] T016 - Add example API route with input validation
- [ ] T017 - Demonstrate optimistic UI pattern with `useOptimistic`

### Phase 3: Content Pages & Layouts

_Add essential pages every client project needs._

- [ ] T018 - Create `/features` page with feature detail cards
- [ ] T019 - Create `/pricing` page with pricing table component
- [ ] T020 - Create `/about` page with team section
- [ ] T021 - Create `/contact` page with contact form
- [ ] T022 - Create `/privacy` legal page with prose styling
- [ ] T023 - Create `/terms` legal page
- [ ] T024 - Add `Prose` component for markdown/legal content styling
- [ ] T025 - Create reusable `PageHeader` component for inner pages

### Phase 4: Blog/Content System

_Simple, file-based content system using MDX._

- [ ] T026 - Install and configure `@next/mdx` or `next-mdx-remote`
- [ ] T027 - Create `/blog` index page with post listing
- [ ] T028 - Create `/blog/[slug]` dynamic route for posts
- [ ] T029 - Add MDX components (code blocks, callouts, images)
- [ ] T030 - Create sample blog posts demonstrating MDX features
- [ ] T031 - Add blog post metadata (date, author, tags, reading time)
- [ ] T032 - Add RSS feed generation at `/feed.xml`

### Phase 5: Authentication Patterns

_Provide auth scaffolding without locking into a provider._

- [ ] T033 - Create auth UI components (login form, signup form)
- [ ] T034 - Add protected route layout pattern
- [ ] T035 - Create user dropdown menu component
- [ ] T036 - Document auth integration points for Auth.js/Clerk/etc
- [ ] T037 - Add example middleware for route protection

### Phase 6: Developer Experience

_Improve development workflow and documentation._

- [ ] T038 - Add Storybook for component development/documentation
- [ ] T039 - Create stories for all UI components
- [ ] T040 - Add visual regression testing with Chromatic or Percy
- [ ] T041 - Create component documentation with usage examples
- [ ] T042 - Add `plop` generators for new components/pages
- [ ] T043 - Create VS Code snippets for common patterns

### Phase 7: Testing & Quality

_Expand test coverage and add CI automation._

- [ ] T044 - Add unit tests for all UI components
- [ ] T045 - Add E2E tests for critical user flows
- [ ] T046 - Configure Lighthouse CI for performance budgets
- [ ] T047 - Add accessibility testing with axe-core in E2E tests
- [ ] T048 - Create GitHub Actions workflow for CI (lint, test, build)
- [ ] T049 - Add Codecov or similar for coverage reporting
- [ ] T050 - Add bundle size tracking in CI

### Phase 8: Performance & SEO

_Optimize for production deployments._

- [ ] T051 - Add JSON-LD structured data components
- [ ] T052 - Create reusable `<SEO>` component for per-page metadata
- [ ] T053 - Add `generateStaticParams` examples for static generation
- [ ] T054 - Demonstrate ISR (Incremental Static Regeneration) pattern
- [ ] T055 - Add image optimization guidelines and `next/image` examples
- [ ] T056 - Configure `@vercel/speed-insights` or Web Vitals tracking
- [ ] T057 - Add preconnect/prefetch hints for external resources

## Backlog

_Ideas for future consideration._

- [ ] B001 - Add i18n setup with `next-intl`
- [ ] B002 - Create dashboard layout with sidebar navigation
- [ ] B003 - Add data table component with sorting/filtering
- [ ] B004 - Create chart components (line, bar, pie) with Recharts
- [ ] B005 - Add file upload component with drag-and-drop
- [ ] B006 - Create command palette (cmd+k) component
- [ ] B007 - Add Docker configuration for self-hosting
- [ ] B008 - Create Terraform/Pulumi for infrastructure-as-code
- [ ] B009 - Add Sentry error tracking integration
- [ ] B010 - Create admin/CMS patterns
- [ ] B011 - Add PWA support with next-pwa
- [ ] B012 - Create email templates with React Email

## Completed

_Tasks moved here after phase completion._

---

## Task Format Reference

- `[ ]` Todo
- `[~]` In Progress
- `[x]` Done
- `[!]` Blocked

**Priority Tags:**
- Tasks are ordered by priority within each phase
- Complete phases sequentially (Phase 1 before Phase 2)
- Backlog items can be pulled into phases as needed

**Example:** `- [ ] T001 - Implement user authentication`
