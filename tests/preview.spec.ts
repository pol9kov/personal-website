import { test, expect } from "@playwright/test";

/**
 * Maintenance-mode contract (Egor, 2026-08-10). While the copy rewrite is in
 * progress the site serves ONLY the stub — and the resume PDFs, whose links
 * are already out in live applications. The previous navigation/dark-mode
 * suites describe the full site and return with it (git history holds them).
 */

test.describe("Maintenance mode", () => {
  test("root redirects to the stub", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/maintenance$/);
    await expect(page.getByText("actively rewritten")).toBeVisible();
    await expect(page.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/resume-en.pdf",
    );
  });

  test("locale and inner pages redirect too", async ({ page }) => {
    for (const path of ["/ru", "/about", "/imperia-os"]) {
      await page.goto(path);
      await expect(page).toHaveURL(/\/maintenance$/);
    }
  });

  test("resume PDFs keep serving", async ({ request }) => {
    for (const lang of ["en", "ru", "es"]) {
      const res = await request.get(`/resume-${lang}.pdf`);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("pdf");
    }
  });
});
