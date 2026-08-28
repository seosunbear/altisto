import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 1200 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

const data = await page.evaluate(() => {
  const grids = document.querySelectorAll('.grid');
  const grid = Array.from(grids).find(g => g.textContent?.includes('운영 서비스 수'));
  const svg = document.querySelector('svg[viewBox="0 0 1200 500"]');
  const gridRect = grid?.getBoundingClientRect();
  const svgRect = svg?.getBoundingClientRect();
  const wrapper = svg?.closest('[aria-hidden]');
  const wrapperRect = wrapper?.getBoundingClientRect();
  return {
    gridBottom: gridRect?.bottom,
    svgRect: svgRect && { top: svgRect.top, bottom: svgRect.bottom, left: svgRect.left, right: svgRect.right, width: svgRect.width, height: svgRect.height },
    wrapperRect: wrapperRect && { top: wrapperRect.top, bottom: wrapperRect.bottom },
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
