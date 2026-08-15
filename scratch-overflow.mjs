import { chromium, devices } from '@playwright/test';
const url = process.argv[2] || 'https://egor-polyakov.vercel.app/ru';
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['iPhone 13'] });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
const report = await page.evaluate(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const out = [];
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    if (r.right > vw + 1 || r.left < -1) {
      out.push({ tag: el.tagName.toLowerCase(), cls: String(el.className || '').slice(0, 80), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width), txt: (el.textContent || '').trim().slice(0, 40) });
    }
  }
  return { vw, docScrollWidth: de.scrollWidth, bodyScrollWidth: document.body.scrollWidth, n: out.length, overflowers: out.slice(0, 25) };
});
console.log(JSON.stringify(report, null, 2));
await browser.close();
