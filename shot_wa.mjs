import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 2000, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
await page.goto("http://localhost:3000/create", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1200);
await page.screenshot({
  path: "/private/tmp/claude-501/-Users-sis515-Desktop------/dec15cb0-3bc0-455d-b2ac-dbde56983b08/scratchpad/workarea_rounded.png",
  clip: { x: 0, y: 700, width: 2000, height: 200 }
});
console.log("ERRORS:", JSON.stringify(errors));
await browser.close();
