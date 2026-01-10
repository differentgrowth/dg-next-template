import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium text-sm no-underline outline-none transition-all duration-200 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg active:translate-y-0 active:shadow-sm",
        destructive:
          "bg-destructive text-white shadow-md hover:-translate-y-0.5 hover:bg-destructive/90 hover:shadow-lg focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-sm hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:shadow-md dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:-translate-y-0.5 hover:bg-secondary/80 hover:shadow-md",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        linkHover1:
          "relative text-foreground decoration-foreground after:absolute after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:text-primary hover:after:origin-bottom-right hover:after:scale-x-0",
        linkHover2:
          "relative text-foreground decoration-foreground after:absolute after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:text-primary hover:after:origin-bottom-left hover:after:scale-x-100",
      },
      size: {
        default: "h-11 px-5 has-[>svg]:px-4",
        sm: "h-10 rounded-md px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-lg px-8 text-base has-[>svg]:px-5",
        xl: "h-14 rounded-xl px-10 text-base has-[>svg]:px-6",
        icon: "size-11",
        iconSm: "size-10",
        iconLg: "size-12",
        iconXs: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    ref?: React.RefObject<HTMLButtonElement | null>;
  };

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      {...props}
    />
  );
}

export { Button, buttonVariants };
