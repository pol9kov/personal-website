import { test, expect } from "@playwright/test";
import { setTheme } from "./helpers/theme";

test.describe("Dark Mode E2E", () => {
  test("complete dark mode user journey", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);
    await expect(page.locator('button[aria-label="Toggle theme"]')).toBeVisible();

    await setTheme(page, "Dark");
    await expect(html).toHaveClass(/dark/);

    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(html).toHaveClass(/dark/);

    await setTheme(page, "Light");
    await expect(html).not.toHaveClass(/dark/);

    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
  });

  test("dark mode works across all sections", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");

    await setTheme(page, "Dark");
    await expect(page.locator("html")).toHaveClass(/dark/);

    const sections = [
      { selector: "header", name: "Header" },
      { selector: 'section:has(h1:text("Egor Polyakov"))', name: "Hero" },
      { selector: 'section:has(h2:text("Skills"))', name: "Skills" },
    ];

    for (const section of sections) {
      await expect(page.locator(section.selector).first()).toBeVisible();
    }
  });
});
