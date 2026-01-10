import { describe, expect, it, vi } from "vitest";

import { Button, buttonVariants } from "@/components/ui/button";
import { render, setup } from "@/lib/test-utils";

const CLICK_ME_REGEX = /click me/i;

describe("Button", () => {
  it("renders correctly with default props", () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole("button", { name: CLICK_ME_REGEX });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const { user, getByRole } = setup(
      <Button onClick={handleClick}>Click me</Button>
    );

    await user.click(getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", async () => {
    const handleClick = vi.fn();
    const { user, getByRole } = setup(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );
    const button = getByRole("button");

    expect(button).toBeDisabled();
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  describe("variants", () => {
    it("applies default variant classes", () => {
      const { getByRole } = render(<Button>Default</Button>);
      const button = getByRole("button");

      expect(button.className).toContain("bg-primary");
    });

    it("applies destructive variant classes", () => {
      const { getByRole } = render(
        <Button variant="destructive">Destructive</Button>
      );
      const button = getByRole("button");

      expect(button.className).toContain("bg-destructive");
    });

    it("applies outline variant classes", () => {
      const { getByRole } = render(<Button variant="outline">Outline</Button>);
      const button = getByRole("button");

      expect(button.className).toContain("border");
      expect(button.className).toContain("bg-background");
    });

    it("applies secondary variant classes", () => {
      const { getByRole } = render(
        <Button variant="secondary">Secondary</Button>
      );
      const button = getByRole("button");

      expect(button.className).toContain("bg-secondary");
    });

    it("applies ghost variant classes", () => {
      const { getByRole } = render(<Button variant="ghost">Ghost</Button>);
      const button = getByRole("button");

      expect(button.className).toContain("hover:bg-accent");
    });

    it("applies link variant classes", () => {
      const { getByRole } = render(<Button variant="link">Link</Button>);
      const button = getByRole("button");

      expect(button.className).toContain("underline-offset-4");
    });
  });

  describe("sizes", () => {
    it("applies default size classes", () => {
      const { getByRole } = render(<Button>Default</Button>);
      const button = getByRole("button");

      expect(button.className).toContain("h-11");
    });

    it("applies small size classes", () => {
      const { getByRole } = render(<Button size="sm">Small</Button>);
      const button = getByRole("button");

      expect(button.className).toContain("h-10");
    });

    it("applies large size classes", () => {
      const { getByRole } = render(<Button size="lg">Large</Button>);
      const button = getByRole("button");

      expect(button.className).toContain("h-12");
    });

    it("applies icon size classes", () => {
      const { getByRole } = render(<Button size="icon">Icon</Button>);
      const button = getByRole("button");

      expect(button.className).toContain("size-11");
    });
  });

  describe("custom className", () => {
    it("merges custom classes correctly", () => {
      const { getByRole } = render(
        <Button className="custom-class">Custom</Button>
      );
      const button = getByRole("button");

      expect(button.className).toContain("custom-class");
      expect(button.className).toContain("bg-primary"); // Still has default variant
    });
  });
});

describe("buttonVariants", () => {
  it("generates correct class string for default variant", () => {
    const classes = buttonVariants();
    expect(classes).toContain("bg-primary");
    expect(classes).toContain("h-11");
  });

  it("generates correct class string for specified variant and size", () => {
    const classes = buttonVariants({ variant: "outline", size: "lg" });
    expect(classes).toContain("border");
    expect(classes).toContain("h-12");
  });

  it("accepts custom className", () => {
    const classes = buttonVariants({ className: "my-custom-class" });
    expect(classes).toContain("my-custom-class");
  });
});
