import { test, expect } from "@playwright/test";

test.describe("Dark Mode Visual Test", () => {
  test("should show visual difference between light and dark mode", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Take screenshot in light mode
    await page.screenshot({
      path: "tests/screenshots/light-mode.png",
      fullPage: true
    });

    // Click theme toggle
    const themeButton = page.locator('button[aria-label="Toggle theme"]');
    await themeButton.click();
    await page.waitForTimeout(500);

    // Take screenshot in dark mode
    await page.screenshot({
      path: "tests/screenshots/dark-mode.png",
      fullPage: true
    });

    // Verify dark class is present
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);
  });
});
