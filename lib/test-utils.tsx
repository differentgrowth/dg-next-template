import type { RenderOptions, RenderResult } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

interface WrapperProps {
  children: ReactNode;
}

/**
 * Custom render function that wraps components with all necessary providers.
 * Extend this wrapper as you add more providers to your app.
 */
function AllProviders({ children }: WrapperProps) {
  return <>{children}</>;
}

/**
 * Custom render function that includes all providers.
 * Use this instead of @testing-library/react's render.
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult {
  return render(ui, { wrapper: AllProviders, ...options });
}

/**
 * Setup function that returns render result and user event instance.
 * Preferred way to test user interactions.
 *
 * @example
 * ```tsx
 * const { user, getByRole } = setup(<Button>Click me</Button>);
 * await user.click(getByRole('button'));
 * ```
 */
function setup(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return {
    user: userEvent.setup(),
    ...customRender(ui, options),
  };
}

// Re-export everything from testing-library
// biome-ignore lint/performance/noBarrelFile: Test utilities need to re-export testing-library
export * from "@testing-library/react";

// Override render with custom render
export { customRender as render, setup };
