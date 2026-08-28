import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
console.log('f\tgapL\tgapB\tΔ/step');
let prev = null;
for (let f = 0; f <= 0.301; f += 0.01) {
  await page.evaluate((y) => window.scrollTo(0, y), f * 2300);
  await page.waitForTimeout(170);
  const d = await page.evaluate(() => {
    const h2 = [...document.querySelectorAll('h2')].find(h => h.textContent?.includes('콘텐츠 그 이상의'));
    const block = h2.closest('div.absolute.left-0');
    const clip = h2.parentElement.parentElement;
    const r = h2.getBoundingClientRect();
    return { l: r.left, bot: r.bottom, bl: block.getBoundingClientRect().left, cb: clip.getBoundingClientRect().bottom };
  });
  const dv = prev === null ? 0 : d.bot - prev; prev = d.bot;
  console.log(`${f.toFixed(2)}\t${(d.l-d.bl).toFixed(1)}\t${(d.cb-d.bot).toFixed(0)}\t${dv.toFixed(1)}${Math.abs(f-0.05)<0.004?'   <= 5% 놓는 지점':''}`);
}
await browser.close();
