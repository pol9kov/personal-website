import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers/theme";

test.describe("Dark Mode Visual Test", () => {
  test("should show visual difference between light and dark mode", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    await page.screenshot({ path: "tests/screenshots/light-mode.png", fullPage: true });

    await setTheme(page, "Dark");
    await page.waitForTimeout(350);

    await page.screenshot({ path: "tests/screenshots/dark-mode.png", fullPage: true });

    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
