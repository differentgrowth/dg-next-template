import type { Route } from "next";

import Link from "next/link";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { BlockWrapper } from "@/components/blocks/block-wrapper";
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

export function CallToAction({
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: Props) {
  return (
    <BlockWrapper className={cn("relative", className)} spacing="lg" width="lg">
      {/* Background */}
      <div className="relative overflow-hidden rounded-2xl border border-foreground/5 bg-muted/30 px-8 py-16 text-center shadow-depth backdrop-blur-sm md:px-16 md:py-20">
        {/* Decorative elements */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-20 -left-20 size-64 opacity-30 blur-orb blur-orb-primary" />
          <div className="absolute -right-20 -bottom-20 size-64 opacity-20 blur-orb blur-orb-secondary" />
          <div className="grain absolute inset-0" />
        </div>

        <div className="relative z-10">
          <h2 className="text-balance font-bold text-2xl sm:text-3xl lg:text-4xl">
            {title}
          </h2>

          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {primaryCta?.href ? (
                <Link
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "shadow-primary-lg"
                  )}
                  href={primaryCta.href as Route}
                >
                  {primaryCta.label}
                </Link>
              ) : null}

              {secondaryCta?.href ? (
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "group"
                  )}
                  href={secondaryCta.href as Route}
                >
                  {secondaryCta.label}
                  <HugeiconsIcon
                    className="ml-2 size-4 transition-transform group-hover:translate-x-1"
                    icon={ArrowRight01Icon}
                  />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </BlockWrapper>
  );
}
