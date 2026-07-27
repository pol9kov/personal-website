import type { Page } from "@playwright/test";

/**
 * The theme control is a dropdown (Light / Dark / System), not a two-state
 * toggle: clicking the icon opens a menu, the choice is a second click. Tests
 * that clicked once and expected the theme to flip were asserting against a UI
 * that no longer exists.
 */
export async function setTheme(page: Page, choice: "Light" | "Dark" | "System") {
  await page.locator('button[aria-label="Toggle theme"]').click();
  await page.getByRole("button", { name: choice, exact: true }).click();
  await page.waitForTimeout(150);
}
