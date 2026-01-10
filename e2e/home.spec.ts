import { expect, test } from "@playwright/test";

const ACME_INC_REGEX = /Acme Inc/;
const BUILD_SOMETHING_REGEX = /Build Something Amazing/i;
const HOME_REGEX = /home/i;
const FEATURES_HEADING_REGEX = /Why Choose This Template/i;
const CTA_HEADING_REGEX = /Ready to Start Building/i;
const FEATURES_LINK_REGEX = /features/i;
const TOGGLE_THEME_REGEX = /toggle theme/i;
const DARK_REGEX = /dark/;
const SKIP_CONTENT_REGEX = /skip to content/i;
const MENU_REGEX = /menu/i;

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have correct title", async ({ page }) => {
    await expect(page).toHaveTitle(ACME_INC_REGEX);
  });

  test("should display hero section", async ({ page }) => {
    const heroTitle = page.getByRole("heading", {
      name: BUILD_SOMETHING_REGEX,
    });
    await expect(heroTitle).toBeVisible();
  });

  test("should display navigation", async ({ page }) => {
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();

    // Check logo is present
    const logo = header.getByRole("link", { name: HOME_REGEX });
    await expect(logo).toBeVisible();
  });

  test("should display features section", async ({ page }) => {
    const featuresHeading = page.getByRole("heading", {
      name: FEATURES_HEADING_REGEX,
    });
    await expect(featuresHeading).toBeVisible();
  });

  test("should display CTA section", async ({ page }) => {
    const ctaHeading = page.getByRole("heading", {
      name: CTA_HEADING_REGEX,
    });
    await expect(ctaHeading).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    const featuresLink = page
      .getByRole("link", { name: FEATURES_LINK_REGEX })
      .first();
    await expect(featuresLink).toHaveAttribute("href", "/features");
  });

  test("should display footer", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
  });
});

test.describe("Theme Toggle", () => {
  test("should toggle between light and dark mode", async ({ page }) => {
    await page.goto("/");

    // Find theme toggle button
    const themeToggle = page.getByRole("button", { name: TOGGLE_THEME_REGEX });
    await expect(themeToggle).toBeVisible();

    // Click to change theme
    await themeToggle.click();

    // Verify the html element has the dark class (or check theme attribute)
    const html = page.locator("html");
    await expect(html).toHaveClass(DARK_REGEX);

    // Toggle back
    await themeToggle.click();
    await expect(html).not.toHaveClass(DARK_REGEX);
  });
});

test.describe("Accessibility", () => {
  test("should have skip to content link", async ({ page }) => {
    await page.goto("/");

    // Focus on the skip link (it should become visible)
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: SKIP_CONTENT_REGEX });
    await expect(skipLink).toBeFocused();
  });

  test("should have accessible headings hierarchy", async ({ page }) => {
    await page.goto("/");

    // Check that h1 exists
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });
});

test.describe("Responsive Design", () => {
  test("should show mobile menu on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Mobile menu button should be visible
    const mobileMenuButton = page.getByRole("button", { name: MENU_REGEX });
    await expect(mobileMenuButton).toBeVisible();

    // Click to open mobile menu
    await mobileMenuButton.click();

    // Navigation should be visible in the sheet
    const mobileNav = page.getByRole("dialog");
    await expect(mobileNav).toBeVisible();
  });
});
