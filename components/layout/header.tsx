import type { Route } from "next";

import Link from "next/link";

import { Logo, LogoMark } from "@/components/brand/logo";
import { MobileNavbar } from "@/components/layout/mobile-navbar";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { MAIN_NAVIGATION } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 py-3 transition-all duration-300">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 border-border/30 border-b bg-background/70 backdrop-blur-xl backdrop-saturate-150" />

      {/* Gradient line accent at bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"
      />

      <div className="container relative">
        <div
          className={cn(
            "flex flex-row items-center justify-between gap-3 rounded-xl border border-foreground/5 bg-background/60 p-2 shadow-depth backdrop-blur-sm",
            "md:h-14 md:px-3"
          )}
        >
          {/* Logo */}
          <Link
            className={cn(
              "group relative rounded-lg p-2 transition-all duration-200",
              "hover:bg-primary/5",
              "md:px-3 md:py-2",
              "max-md:border max-md:border-input/50 max-md:shadow-sm"
            )}
            href="/"
          >
            <Logo className="hidden transition-transform duration-200 group-hover:scale-[1.02] md:flex" />
            <LogoMark className="transition-transform duration-200 group-hover:scale-105 md:hidden" />
          </Link>

          <div className="flex grow items-center justify-end gap-2">
            {/* Desktop navigation */}
            <nav className="hidden flex-row items-center justify-end gap-1 md:flex lg:gap-2">
              {MAIN_NAVIGATION.map(({ id, label, href }) => (
                <Link
                  className={cn(
                    buttonVariants({ variant: "linkHover2" }),
                    "px-3 py-2 font-medium text-sm transition-colors"
                  )}
                  href={href as Route}
                  key={id}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Mobile navbar */}
            <MobileNavbar
              className="border-input/50 bg-background text-base shadow-sm transition-all duration-200 hover:bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              navigation={MAIN_NAVIGATION}
            />

            {/* Theme toggle */}
            <ModeToggle className="transition-all duration-200 hover:bg-primary/5 md:size-10 md:[&>svg]:size-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
