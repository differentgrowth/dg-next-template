import { CallToAction } from "@/components/blocks/cta";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";
import { Section } from "@/components/blocks/section";

const features = [
  {
    id: "feature-1",
    title: "Lightning Fast",
    description:
      "Built on Next.js 16 with React 19 for optimal performance. Server components and streaming make your app blazing fast.",
  },
  {
    id: "feature-2",
    title: "Beautiful Design",
    description:
      "Carefully crafted UI components with Tailwind CSS. Dark mode support and smooth animations out of the box.",
  },
  {
    id: "feature-3",
    title: "Developer Experience",
    description:
      "TypeScript, ESLint, and a well-organized codebase. Everything you need to start building right away.",
  },
  {
    id: "feature-4",
    title: "Production Ready",
    description:
      "SEO optimized, accessible, and following best practices. Deploy with confidence to Vercel or any platform.",
  },
];

export default function Home() {
  return (
    <>
      <Hero
        description="A modern, production-ready template built with Next.js 16, React 19, Tailwind CSS, and Base UI. Start building beautiful web applications today."
        primaryCta={{ label: "Get Started", href: "/features" }}
        secondaryCta={{ label: "Learn More", href: "/about" }}
        title="Build Something Amazing"
      />

      <Features
        columns={4}
        eyebrow="Features"
        features={features}
        subtitle="Everything you need to build modern web applications with confidence."
        title="Why Choose This Template?"
      />

      <Section
        centered
        contentWidth="md"
        eyebrow="Technology"
        title="Built with Modern Tools"
      >
        <p className="text-lg text-muted-foreground">
          This template leverages the latest web technologies to provide an
          exceptional developer experience and outstanding performance for your
          users.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <TechBadge>Next.js 16</TechBadge>
          <TechBadge>React 19</TechBadge>
          <TechBadge>TypeScript</TechBadge>
          <TechBadge>Tailwind CSS 4</TechBadge>
          <TechBadge>Base UI</TechBadge>
        </div>
      </Section>

      <CallToAction
        description="Clone the repository and start building your next project in minutes."
        primaryCta={{ label: "Get Started", href: "/features" }}
        secondaryCta={{ label: "View on GitHub", href: "https://github.com" }}
        title="Ready to Start Building?"
      />
    </>
  );
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-foreground/10 bg-muted/50 px-4 py-2 font-medium text-sm">
      {children}
    </span>
  );
}
