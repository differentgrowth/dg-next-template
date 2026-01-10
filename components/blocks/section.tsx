import type { ReactNode } from "react";

import { BlockHeader, BlockWrapper } from "@/components/blocks/block-wrapper";
import { cn } from "@/lib/utils";

interface Props {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
  contentWidth?: "sm" | "md" | "lg" | "full";
}

const contentWidths = {
  sm: "max-w-2xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  full: "max-w-none",
};

export function Section({
  id,
  title,
  eyebrow,
  subtitle,
  children,
  className,
  centered = false,
  contentWidth = "lg",
}: Props) {
  return (
    <BlockWrapper
      className={cn("relative", className)}
      id={id}
      spacing="lg"
      width="xl"
    >
      {/* Decorative gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl dark:bg-primary/3"
      />

      <div className="relative">
        {title ? (
          <BlockHeader
            align={centered ? "center" : "left"}
            className="mb-10 md:mb-14"
            eyebrow={eyebrow}
            subtitle={subtitle}
            title={title}
          />
        ) : null}

        {children ? (
          <div
            className={cn(
              contentWidths[contentWidth],
              centered ? "mx-auto text-center" : null
            )}
          >
            {children}
          </div>
        ) : null}
      </div>
    </BlockWrapper>
  );
}
