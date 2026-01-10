import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerWidth = "sm" | "md" | "lg" | "xl" | "full";
type SpacingSize = "none" | "sm" | "md" | "lg" | "xl";

interface Props {
  children: ReactNode;
  className?: string;
  /** Element id for anchor links */
  id?: string;
  /** Container max-width */
  width?: ContainerWidth;
  /** Vertical padding size */
  spacing?: SpacingSize;
  /** Whether to add a top border */
  borderTop?: boolean;
  /** Whether to add a bottom border */
  borderBottom?: boolean;
  /** HTML element to render as */
  as?: "section" | "div" | "article" | "aside";
}

const containerWidths: Record<ContainerWidth, string> = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

const spacingStyles: Record<SpacingSize, string> = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16 lg:py-20",
  lg: "py-16 md:py-20 lg:py-24",
  xl: "py-20 md:py-24 lg:py-32",
};

export function BlockWrapper({
  children,
  className,
  id,
  width = "xl",
  spacing = "lg",
  borderTop = false,
  borderBottom = false,
  as: Component = "section",
}: Props) {
  return (
    <Component
      className={cn(
        spacingStyles[spacing],
        borderTop ? "border-border border-t" : null,
        borderBottom ? "border-border border-b" : null,
        className
      )}
      id={id}
    >
      <div className={cn("container", containerWidths[width])}>{children}</div>
    </Component>
  );
}

/** Consistent block header with eyebrow, title, and optional subtitle */
interface BlockHeaderProps {
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  align?: "left" | "center";
  className?: string;
}

export function BlockHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: BlockHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-12",
        align === "center" ? "text-center" : null,
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 font-medium text-primary text-sm uppercase tracking-wider">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance font-bold text-2xl text-foreground leading-tight sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-3xl text-lg text-muted-foreground lg:text-xl",
            align === "center" ? "mx-auto" : null
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
