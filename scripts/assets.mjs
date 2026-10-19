import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const artwork = await readFile("public/mammoth-mark.svg", "utf8");
const mark = (x, y, width, height) =>
  artwork.replace(
    "<svg ",
    `<svg x="${x}" y="${y}" width="${width}" height="${height}" `,
  );
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#faf6ee"/>${mark(3, 7, 58, 50)}</svg>`;
const wordmark = (dark = false) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="72" viewBox="0 0 340 72"><rect width="78" height="72" rx="8" fill="#faf6ee"/>${mark(3, 4, 72, 62)}<text x="89" y="38" font-family="Arial,sans-serif" font-size="34" font-weight="700" letter-spacing="-1.3" fill="${dark ? "#f6f0e4" : "#1c2241"}">Mammoth</text><text x="91" y="58" font-family="Arial,sans-serif" font-size="11" letter-spacing="5" fill="${dark ? "#e8d2a9" : "#806130"}">ENGINE</text></svg>`;
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#faf6ee"/>${mark(76, 48, 88, 72)}<text x="181" y="97" font-family="Arial,sans-serif" font-size="34" font-weight="700" fill="#1c2241">Mammoth Engine</text><path d="M80 145h1040M80 540h1040" stroke="#ded4c2"/><text x="80" y="290" font-family="Arial,sans-serif" font-size="94" font-weight="600" letter-spacing="-5" fill="#1c2241">Big ideas.</text><text x="80" y="400" font-family="Arial,sans-serif" font-size="94" font-weight="600" letter-spacing="-5" fill="#806130">Solid ground.</text><text x="85" y="478" font-family="Arial,sans-serif" font-size="23" fill="#65605a">MongoDB compatible. Built in Go. Yours to build on.</text>${mark(778, 188, 342, 300)}<text x="80" y="582" font-family="monospace" font-size="17" fill="#65605a">MAMMOTHENGINE.COM</text><text x="1120" y="582" font-family="monospace" font-size="14" text-anchor="end" fill="#806130">THE UNTAMED DOCUMENT ENGINE</text></svg>`;
await writeFile("public/favicon.svg", icon);
await writeFile("public/mammoth-logo.svg", wordmark());
await writeFile("public/mammoth-logo-dark.svg", wordmark(true));
await writeFile("public/social.svg", social);
await sharp(Buffer.from(icon))
  .resize(180, 180)
  .png()
  .toFile("public/apple-touch-icon.png");
const socialPng = await sharp(Buffer.from(social)).png().toBuffer();
await Promise.all([
  writeFile("public/og.png", socialPng),
  writeFile("public/social.png", socialPng),
]);
