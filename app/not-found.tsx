import type { Metadata, Route } from "next";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="space-y-6">
        {/* Error code */}
        <p className="font-mono text-muted-foreground text-sm">404</p>

        {/* Heading */}
        <h1 className="font-bold text-4xl tracking-tight sm:text-5xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-md text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The
          page might have been removed, renamed, or doesn&apos;t exist.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link className={cn(buttonVariants())} href="/">
            Go home
          </Link>
          <Link
            className={cn(buttonVariants({ variant: "outline" }))}
            href={"/contact" as Route}
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
