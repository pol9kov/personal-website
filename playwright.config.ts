import { defineConfig, devices } from "@playwright/test";

// A dedicated port, not Next's default 3000. `reuseExistingServer` adopts
// whatever already answers on the URL, and on the build box 3000 is Grafana —
// the suite then ran against a stranger's page and failed every locator with
// "element(s) not found", which is how a broken pre-commit gate reads as a
// broken site.
const E2E_PORT = process.env.E2E_PORT ?? "3210";

/**
 * Playwright configuration for browser testing
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Locally this used to be 0, and that made the pre-commit gate a dice roll:
  // `npm test` runs against `next dev`, which compiles each route on its FIRST
  // request, so whichever spec happens to touch a cold route can blow the 5s
  // expect timeout. Observed 2026-07-27 on one unchanged tree: three runs in a
  // row failed 2, then 0, then 1 test — a different set each time. One retry
  // costs a few seconds and removes the cold-compile flake without hiding a
  // real regression (a genuine break fails both attempts).
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: `http://localhost:${E2E_PORT}`,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Run dev server before starting tests */
  webServer: {
    command: `npm run dev -- --port ${E2E_PORT}`,
    url: `http://localhost:${E2E_PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
