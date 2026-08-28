import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
await page.setViewportSize({ width: 1440, height: 1200 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

// scroll to GROWTH section
await page.evaluate(() => {
  const headings = Array.from(document.querySelectorAll('h2'));
  const target = headings.find(h => h.textContent?.includes('관객을 위해'));
  target?.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(1200);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-sis515-Desktop------/c5db5519-fe4a-422e-bfef-b70ff4a50932/scratchpad/growth-desktop.png' });

await page.setViewportSize({ width: 390, height: 900 });
await page.evaluate(() => {
  const headings = Array.from(document.querySelectorAll('h2'));
  const target = headings.find(h => h.textContent?.includes('관객을 위해'));
  target?.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(1200);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-sis515-Desktop------/c5db5519-fe4a-422e-bfef-b70ff4a50932/scratchpad/growth-mobile.png' });

await browser.close();
