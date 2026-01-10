import { describe, expect, it } from "vitest";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { render } from "@/lib/test-utils";

describe("Card", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(
      <Card data-testid="card">Card content</Card>
    );
    const card = getByTestId("card");

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-size", "default");
  });

  it("applies small size correctly", () => {
    const { getByTestId } = render(
      <Card data-testid="card" size="sm">
        Card content
      </Card>
    );
    const card = getByTestId("card");

    expect(card).toHaveAttribute("data-size", "sm");
  });

  it("merges custom className", () => {
    const { getByTestId } = render(
      <Card className="custom-class" data-testid="card">
        Card content
      </Card>
    );
    const card = getByTestId("card");

    expect(card.className).toContain("custom-class");
    expect(card.className).toContain("rounded-2xl");
  });
});

describe("CardHeader", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <CardHeader data-testid="header">Header content</CardHeader>
    );
    const header = getByTestId("header");

    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("data-slot", "card-header");
  });
});

describe("CardTitle", () => {
  it("renders correctly", () => {
    const { getByText } = render(<CardTitle>Card Title</CardTitle>);
    const title = getByText("Card Title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("data-slot", "card-title");
    expect(title.className).toContain("font-medium");
  });
});

describe("CardDescription", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <CardDescription>Card Description</CardDescription>
    );
    const description = getByText("Card Description");

    expect(description).toBeInTheDocument();
    expect(description).toHaveAttribute("data-slot", "card-description");
    expect(description.className).toContain("text-muted-foreground");
  });
});

describe("CardAction", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <CardAction data-testid="action">Action</CardAction>
    );
    const action = getByTestId("action");

    expect(action).toBeInTheDocument();
    expect(action).toHaveAttribute("data-slot", "card-action");
  });
});

describe("CardContent", () => {
  it("renders correctly", () => {
    const { getByText } = render(<CardContent>Content here</CardContent>);
    const content = getByText("Content here");

    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("data-slot", "card-content");
  });
});

describe("CardFooter", () => {
  it("renders correctly", () => {
    const { getByText } = render(<CardFooter>Footer content</CardFooter>);
    const footer = getByText("Footer content");

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("data-slot", "card-footer");
  });
});

describe("Card composition", () => {
  it("renders a complete card correctly", () => {
    const { getByText, getByTestId } = render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Main content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(getByTestId("card")).toBeInTheDocument();
    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Description")).toBeInTheDocument();
    expect(getByText("Action")).toBeInTheDocument();
    expect(getByText("Main content")).toBeInTheDocument();
    expect(getByText("Footer")).toBeInTheDocument();
  });
});
