/* Renders the flyer variations (wine-tasting-flyer-v*.html) to JPG + PDF, in the dark
   site look and a white-background "-print" version of each.
   Run:  node assets/flyers/render-flyer.js            (all)
         node assets/flyers/render-flyer.js v2         (one)
   Letter size, 8.5 x 11 in. Needs Node + Playwright (npm i playwright). */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

(async () => {
  const only = process.argv[2];
  const variants = fs.readdirSync(__dirname).filter((f) => /^wine-tasting-flyer-v\d+\.html$/.test(f))
    .filter((f) => !only || f.includes(only + ".html"));
  const browser = await chromium.launch();
  for (const file of variants) {
    for (const theme of ["dark", "light"]) {
      const base = file.replace(/\.html$/, "") + (theme === "light" ? "-print" : "");
      const page = await browser.newPage({ viewport: { width: 850, height: 1100 }, deviceScaleFactor: 2 });
      await page.goto("file://" + path.join(__dirname, file) + (theme === "light" ? "?theme=light" : ""), { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(__dirname, base + ".jpg"), type: "jpeg", quality: 90 });
      await page.pdf({ path: path.join(__dirname, base + ".pdf"), width: "8.5in", height: "11in", printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
      await page.close();
      console.log("rendered", base);
    }
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
