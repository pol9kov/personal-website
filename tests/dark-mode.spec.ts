import { test, expect } from "@playwright/test";

test.describe("Dark Mode", () => {
  test("should toggle dark mode when clicking theme button", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Check initial state (should be light mode)
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    // Find and click theme toggle button
    const themeButton = page.locator('button[aria-label="Toggle theme"]');
    await expect(themeButton).toBeVisible();
    await themeButton.click();

    // Wait a bit for state to update
    await page.waitForTimeout(100);

    // Check that dark class was added
    await expect(html).toHaveClass(/dark/);

    // Click again to toggle back
    await themeButton.click();
    await page.waitForTimeout(100);

    // Should be back to light mode
    await expect(html).not.toHaveClass(/dark/);
  });
});
