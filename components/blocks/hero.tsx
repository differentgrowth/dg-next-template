import type { Route } from "next";

import Link from "next/link";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaLink {
  label: string;
  href: Route | string;
}

interface Props {
  title: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  className?: string;
}

export function Hero({
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: Props) {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:py-32 lg:py-40">
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="mask-[linear-gradient(to_bottom,black_80%,transparent_95%)] pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="grain absolute inset-0" />
      </div>

      <div className={cn("container relative z-10", className)}>
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <h1 className="text-balance font-bold text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Description */}
          {description ? (
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              {description}
            </p>
          ) : null}

          {/* CTAs */}
          {primaryCta || secondaryCta ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {primaryCta?.href ? (
                <Link
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "group relative overflow-hidden shadow-primary-lg transition-all duration-300 hover:shadow-primary-xl"
                  )}
                  href={primaryCta.href as Route}
                >
                  <span className="relative z-10">{primaryCta.label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                  />
                </Link>
              ) : null}

              {secondaryCta?.href ? (
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "group transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                  )}
                  href={secondaryCta.href as Route}
                >
                  {secondaryCta.label}
                  <HugeiconsIcon
                    className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1"
                    icon={ArrowRight01Icon}
                  />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="mask-[linear-gradient(to_bottom,black_80%,transparent_95%)] pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-32 right-0 size-96 opacity-30 blur-orb blur-orb-primary" />
        <div className="absolute -bottom-32 left-0 size-80 opacity-25 blur-orb blur-orb-secondary" />
      </div>
    </section>
  );
}
