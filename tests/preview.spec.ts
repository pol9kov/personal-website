import { test, expect } from "@playwright/test";

/**
 * This branch is the live rework preview: the maintenance redirect stays only
 * on production main. Here the site itself must render — and the resume PDFs,
 * whose links are already out in live applications, must keep serving.
 */

test.describe("Rework preview", () => {
  test("root serves the home page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Egor Polyakov" }),
    ).toBeVisible();
  });

  test("resume PDFs keep serving", async ({ request }) => {
    for (const lang of ["en", "ru", "es"]) {
      const res = await request.get(`/resume-${lang}.pdf`);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("pdf");
    }
  });
});
