"use client";

import type { Route } from "next";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Home01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

interface Props {
  navigation: readonly {
    readonly id: string;
    readonly label: string;
    readonly href: string;
  }[];
  className?: string;
}

export function MobileNavbar({ navigation, className }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "text-foreground",
          className
        )}
      >
        <HugeiconsIcon aria-hidden="true" icon={Menu01Icon} />
        <span className="sr-only">Open navigation menu</span>
      </SheetTrigger>

      <SheetContent
        className="flex w-[85vw] max-w-sm flex-col px-4"
        side="right"
      >
        <SheetHeader>
          <SheetTitle>{SITE_CONFIG.NAME}</SheetTitle>
        </SheetHeader>

        <ScrollArea className="-mx-2 my-4 grow px-2">
          <div className="flex flex-col gap-2">
            <MobileLink
              aria-disabled={pathname === "/"}
              aria-label="home"
              className={cn(
                buttonVariants({
                  variant: pathname === "/" ? "default" : "outline",
                }),
                "justify-start"
              )}
              href="/"
              onOpenChange={setOpen}
            >
              <HugeiconsIcon aria-hidden="true" icon={Home01Icon} />
              Home
            </MobileLink>

            <Separator />

            {navigation.map(({ id, label, href }) => (
              <MobileLink
                className={cn(
                  buttonVariants({
                    variant: pathname === href ? "default" : "outline",
                  }),
                  "justify-start"
                )}
                href={href}
                key={id}
                onOpenChange={setOpen}
              >
                {label}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  href: string;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-disabled"?: boolean;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  "aria-label": ariaLabel,
  "aria-disabled": ariaDisabled,
}: MobileLinkProps) {
  return (
    <Link
      aria-disabled={ariaDisabled}
      aria-label={ariaLabel}
      className={className}
      href={href as Route}
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </Link>
  );
}
