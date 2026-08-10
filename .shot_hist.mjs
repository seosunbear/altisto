import { chromium } from 'playwright';
const OUT = '/private/tmp/claude-501/-Users-sis515-Desktop------/fbe17adb-7c53-40cc-97a0-68d8df38fe1e/scratchpad';
const browser = await chromium.launch();
for (const [name, width, height] of [['desk', 1440, 1100], ['mob', 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);
  const s = await page.evaluate(() => {
    const el = [...document.querySelectorAll('h2')].find(h => h.textContent.includes('걸어온')).closest('section');
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top + window.scrollY), height: Math.round(r.height) };
  });
  for (let y = Math.max(0, s.top - 900); y < s.top + s.height; y += 400) {
    await page.evaluate(v => window.scrollTo(0, v), y);
    await page.waitForTimeout(500);
  }
  await page.evaluate(v => window.scrollTo(0, v), s.top - 30);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/hist_${name}.png` });
  const a = await page.evaluate(() => {
    const sec = [...document.querySelectorAll('h2')].find(h => h.textContent.includes('걸어온')).closest('section');
    const h2 = sec.querySelector('h2').getBoundingClientRect();
    const tl = sec.querySelector('ol').getBoundingClientRect();
    return { h2Center: Math.round(h2.left + h2.width / 2), tlLeft: Math.round(tl.left),
             tlCenter: Math.round(tl.left + tl.width / 2), vw: window.innerWidth };
  });
  console.log(name, JSON.stringify(a));
  await page.close();
}
await browser.close();
