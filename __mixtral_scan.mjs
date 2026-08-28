import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

// find the mixtral section (has 콘텐츠 그 이상의)
const info = await page.evaluate(() => {
  const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.textContent?.includes('콘텐츠 그 이상의'));
  const section = h2?.closest('section');
  const rect = section?.getBoundingClientRect();
  return {
    top: rect ? rect.top + window.scrollY : null,
  };
});
console.log('section top', info.top);

await page.evaluate((top) => window.scrollTo(0, top), info.top);
await page.waitForTimeout(300);

// pin end = +2300 per code, scroll additional amounts and screenshot text position
const steps = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1700, 2000, 2300];
for (const s of steps) {
  await page.evaluate((args) => window.scrollTo(0, args.top + args.s), { top: info.top, s });
  await page.waitForTimeout(150);
  await page.screenshot({ path: `/private/tmp/claude-501/-Users-sis515-Desktop------/65651754-0541-4252-b3bb-13df1bb30758/scratchpad/mix_${s}.png` });
}

await browser.close();
