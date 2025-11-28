import { test, expect } from "@playwright/test";

test.describe("Mobile Navigation", () => {
  test("should show hamburger menu on mobile viewport", async ({ page }) => {
    // Set mobile viewport (iPhone 12)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');
    const desktopNav = page.locator("nav.hidden.md\\:block");

    // Hamburger should be visible on mobile
    await expect(hamburgerButton).toBeVisible();

    // Desktop navigation should be hidden
    await expect(desktopNav).not.toBeVisible();
  });

  test("should toggle mobile menu when clicking hamburger", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000");

    const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');

    // Initially menu should be closed
    await expect(hamburgerButton).toHaveAttribute("aria-expanded", "false");
    const menuBefore = page.locator('nav:has(a:text("Home"))').last();
    await expect(menuBefore).not.toBeVisible();

    // Click to open menu
    await hamburgerButton.click();
    await page.waitForTimeout(100);

    // Menu should be open
    await expect(hamburgerButton).toHaveAttribute("aria-expanded", "true");
    const menuAfter = page.locator('nav:has(a:text("Home"))').last();
    await expect(menuAfter).toBeVisible();

    // Click to close menu
    await hamburgerButton.click();
    await page.waitForTimeout(100);

    // Menu should be closed
    await expect(hamburgerButton).toHaveAttribute("aria-expanded", "false");
  });

  test("should close mobile menu when clicking navigation link", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000");

    const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');

    // Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(100);
    await expect(hamburgerButton).toHaveAttribute("aria-expanded", "true");

    // Click on "About Me" link in mobile menu
    const aboutLink = page
      .locator('nav:has(a:text("Home"))')
      .last()
      .locator('a:text("About Me")');
    await aboutLink.click();

    // Menu should close automatically
    await page.waitForTimeout(100);
    await expect(hamburgerButton).toHaveAttribute("aria-expanded", "false");
  });

  test("should show desktop navigation on desktop viewport", async ({
    page,
  }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');
    const desktopNav = page.locator("nav.hidden.md\\:block");

    // Desktop navigation should be visible
    await expect(desktopNav).toBeVisible();

    // Hamburger should be hidden on desktop
    await expect(hamburgerButton).not.toBeVisible();
  });

  test("complete mobile navigation journey", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto("http://localhost:3000");

    const hamburgerButton = page.locator('button[aria-label="Toggle menu"]');

    // 1. Verify hamburger is visible
    await expect(hamburgerButton).toBeVisible();

    // 2. Open menu
    await hamburgerButton.click();
    await page.waitForTimeout(100);

    // 3. Verify all navigation items are present
    const mobileMenu = page.locator('nav:has(a:text("Home"))').last();
    await expect(mobileMenu.locator('a:text("Home")')).toBeVisible();
    await expect(mobileMenu.locator('a:text("About Me")')).toBeVisible();
    await expect(mobileMenu.locator('a:text("Case Studies")')).toBeVisible();
    await expect(mobileMenu.locator('a:text("Resume")')).toBeVisible();

    // 4. Click navigation and verify menu closes
    await mobileMenu.locator('a:text("Resume")').click();
    await page.waitForTimeout(100);
    await expect(hamburgerButton).toHaveAttribute("aria-expanded", "false");

    console.log("✅ Complete mobile navigation journey passed!");
  });
});
