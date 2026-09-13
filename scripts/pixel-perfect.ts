import { chromium } from "playwright";
import fs from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const SCREENSHOTS_DIR = "screenshots";

const FIGMA_PATH = `${SCREENSHOTS_DIR}/figma.png`;
const WEBSITE_PATH = `${SCREENSHOTS_DIR}/website.png`;
const OVERLAY_PATH = `${SCREENSHOTS_DIR}/overlay.png`;

const PIXELMATCH_THRESHOLD = 0.1;

const SIMILARITY_GOOD = 98;
const SIMILARITY_OK = 90;

const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function colorForSimilarity(similarity: number): string {
  if (similarity >= SIMILARITY_GOOD) return c.green;
  if (similarity >= SIMILARITY_OK) return c.yellow;
  return c.red;
}

function flattenOnWhite(png: PNG): void {
  for (let i = 0; i < png.width * png.height; i++) {
    const idx = i * 4;
    const alpha = png.data[idx + 3];

    if (alpha < 255) {
      const opacity = alpha / 255;

      png.data[idx] = Math.round(png.data[idx] * opacity + 255 * (1 - opacity));

      png.data[idx + 1] = Math.round(
        png.data[idx + 1] * opacity + 255 * (1 - opacity),
      );

      png.data[idx + 2] = Math.round(
        png.data[idx + 2] * opacity + 255 * (1 - opacity),
      );
    }

    png.data[idx + 3] = 255;
  }
}

function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

if (!fs.existsSync(FIGMA_PATH)) {
  console.error(`${c.red}Error:${c.reset} ${FIGMA_PATH} not found`);
  process.exit(1);
}

console.log("Taking screenshot...");

const browser = await chromium.launch();

const page = await browser.newPage({
  viewport: {
    width: 1440,
    height: 900,
  },
  deviceScaleFactor: 1,
});

await page.goto("http://localhost:5173", {
  waitUntil: "networkidle",
});

await page.screenshot({
  path: WEBSITE_PATH,
  fullPage: true,
});

await browser.close();

const figma = PNG.sync.read(fs.readFileSync(FIGMA_PATH));

const website = PNG.sync.read(fs.readFileSync(WEBSITE_PATH));

flattenOnWhite(figma);
flattenOnWhite(website);

const width = Math.min(figma.width, website.width);

const height = Math.min(figma.height, website.height);

const figmaCrop = new PNG({
  width,
  height,
});

const websiteCrop = new PNG({
  width,
  height,
});

PNG.bitblt(figma, figmaCrop, 0, 0, width, height, 0, 0);

PNG.bitblt(website, websiteCrop, 0, 0, width, height, 0, 0);

const pixelmatchDiff = new PNG({
  width,
  height,
});

const differentPixels = pixelmatch(
  figmaCrop.data,
  websiteCrop.data,
  pixelmatchDiff.data,
  width,
  height,
  {
    threshold: PIXELMATCH_THRESHOLD,
  },
);

const totalPixels = width * height;

const similarity = ((totalPixels - differentPixels) / totalPixels) * 100;

const overlay = new PNG({
  width,
  height,
});

for (let i = 0; i < width * height; i++) {
  const idx = i * 4;

  const figLum = luminance(
    figmaCrop.data[idx],
    figmaCrop.data[idx + 1],
    figmaCrop.data[idx + 2],
  );

  const webLum = luminance(
    websiteCrop.data[idx],
    websiteCrop.data[idx + 1],
    websiteCrop.data[idx + 2],
  );

  overlay.data[idx] = figLum;
  overlay.data[idx + 1] = webLum;
  overlay.data[idx + 2] = webLum;
  overlay.data[idx + 3] = 255;
}

fs.writeFileSync(OVERLAY_PATH, PNG.sync.write(overlay));

const simColor = colorForSimilarity(similarity);

console.log("");
console.log(`${c.bold}PIXEL PERFECT RESULT${c.reset}`);
console.log("");
console.log(`Size:       ${width}x${height}`);
console.log(`Different:  ${differentPixels.toLocaleString("en-US")} px`);
console.log(
  `Similarity: ${simColor}${c.bold}${similarity.toFixed(2)}%${c.reset}`,
);
console.log(`Overlay:    ${OVERLAY_PATH}`);
console.log("");
