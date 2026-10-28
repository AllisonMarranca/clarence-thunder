/* ALTERNATE flyer design (not the one on the site). Renders wine-tasting-flyer.html
   to wine-tasting-flyer-redesign.jpg / .pdf.   Run:  node assets/flyers/render-flyer.js */
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

(async () => {
  const root = path.resolve(__dirname, "..", "..");
  const src = "file://" + path.join(__dirname, "wine-tasting-flyer.html");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 850, height: 1100 }, deviceScaleFactor: 2 });
  await page.goto(src, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  const jpg = path.join(__dirname, "wine-tasting-flyer-redesign.jpg");
  await page.screenshot({ path: jpg, type: "jpeg", quality: 90, fullPage: false });

  await page.pdf({
    path: path.join(__dirname, "wine-tasting-flyer-redesign.pdf"),
    width: "8.5in", height: "11in", printBackground: true, preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  await browser.close();
  console.log("wrote", jpg, "and wine-tasting-flyer.pdf");
})().catch((e) => { console.error(e); process.exit(1); });
