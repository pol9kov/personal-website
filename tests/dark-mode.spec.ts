import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers/theme";

test.describe("Dark Mode", () => {
  test("should switch between dark and light from the theme menu", async ({ page }) => {
    await page.goto("/en");

    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    await expect(page.locator('button[aria-label="Toggle theme"]')).toBeVisible();

    await setTheme(page, "Dark");
    await expect(html).toHaveClass(/dark/);

    await setTheme(page, "Light");
    await expect(html).not.toHaveClass(/dark/);
  });
});
