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
    // Имена с ведущим подчёркиванием — файл встаёт первым в загрузках
    // (Егор, 2026-08-15). Старые пути /resume-*.pdf сняты без редиректов.
    for (const lang of ["EN", "RU", "ES"]) {
      const res = await request.get(`/_Yegor_Polyakov_Resume_${lang}.pdf`);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("pdf");
    }
  });
});
