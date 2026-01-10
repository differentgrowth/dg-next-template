import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

/**
 * Logo component
 *
 * Replace this with your actual logo SVG or image.
 * This is a placeholder that displays the site name.
 */
export function Logo({ className }: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Replace with your logo SVG */}
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
        <span className="font-bold text-primary-foreground text-sm">A</span>
      </div>
      <span className="font-semibold text-lg">Acme</span>
    </div>
  );
}

/**
 * Logo mark (icon only)
 *
 * For use in compact spaces like mobile navigation.
 */
export function LogoMark({ className }: Props) {
  return (
    <div
      className={cn(
        "flex size-8 items-center justify-center rounded-lg bg-primary",
        className
      )}
    >
      <span className="font-bold text-primary-foreground text-sm">A</span>
    </div>
  );
}
