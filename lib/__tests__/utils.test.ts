import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    const result = cn("foo", "bar");
    expect(result).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    const result = cn("foo", false, "baz");
    expect(result).toBe("foo baz");
  });

  it("handles undefined and null values", () => {
    const result = cn("foo", undefined, null, "bar");
    expect(result).toBe("foo bar");
  });

  it("handles arrays of classes", () => {
    const result = cn(["foo", "bar"], "baz");
    expect(result).toBe("foo bar baz");
  });

  it("handles objects with boolean values", () => {
    const result = cn("base", { active: true, disabled: false });
    expect(result).toBe("base active");
  });

  it("resolves Tailwind conflicts correctly", () => {
    // tailwind-merge should resolve conflicting classes
    const result = cn("p-4", "p-6");
    expect(result).toBe("p-6");
  });

  it("resolves complex Tailwind conflicts", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("preserves non-conflicting classes", () => {
    const result = cn("p-4", "m-4", "p-6");
    expect(result).toBe("m-4 p-6");
  });

  it("handles responsive variants correctly", () => {
    const result = cn("p-4", "md:p-6", "p-8");
    expect(result).toBe("md:p-6 p-8");
  });

  it("handles empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("handles single class", () => {
    const result = cn("single");
    expect(result).toBe("single");
  });

  it("trims whitespace", () => {
    const result = cn("foo", "bar");
    expect(result).toBe("foo bar");
  });
});
