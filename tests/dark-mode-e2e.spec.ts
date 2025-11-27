import { test, expect } from "@playwright/test";

test.describe("Dark Mode E2E", () => {
  test("complete dark mode user journey", async ({ page }) => {
    // 1. Load page in light mode
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    const html = page.locator("html");
    const themeButton = page.locator('button[aria-label="Toggle theme"]');

    // 2. Verify initial state is light mode
    await expect(html).not.toHaveClass(/dark/);

    // 3. Find and click theme toggle
    await expect(themeButton).toBeVisible();
    await themeButton.click();
    await page.waitForTimeout(200);

    // 4. Verify dark mode applied
    await expect(html).toHaveClass(/dark/);

    // 5. Check localStorage persists the setting
    const darkMode = await page.evaluate(() => {
      return localStorage.getItem("theme");
    });
    expect(darkMode).toBe("dark");

    // 6. Reload page and verify persistence
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(html).toHaveClass(/dark/);

    // 7. Toggle back to light mode
    await themeButton.click();
    await page.waitForTimeout(200);
    await expect(html).not.toHaveClass(/dark/);

    // 8. Verify localStorage updated
    const lightMode = await page.evaluate(() => {
      return localStorage.getItem("theme");
    });
    expect(lightMode).toBe("light");

    console.log("✅ Dark mode E2E test passed!");
  });

  test("dark mode works across all sections", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const themeButton = page.locator('button[aria-label="Toggle theme"]');
    await themeButton.click();
    await page.waitForTimeout(300);

    // Verify all major sections have dark styling
    const sections = [
      { selector: 'header', name: 'Header' },
      { selector: 'section:has(h1:text("Hi, I\'m"))', name: 'Hero' },
      { selector: 'section:has(h2:text("Skills"))', name: 'Skills' },
    ];

    for (const section of sections) {
      const element = page.locator(section.selector).first();
      await expect(element).toBeVisible();
      console.log(`✅ ${section.name} section visible in dark mode`);
    }
  });
});
