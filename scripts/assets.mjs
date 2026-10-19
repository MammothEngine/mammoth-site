import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const mark =
  '<g fill="none" stroke="#0369a1" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0"/></g>';
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">${mark}</svg>`;
const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="52" viewBox="0 0 260 52"><g transform="translate(4 6) scale(1.25)">${mark}</g><text x="55" y="35" font-family="Arial,sans-serif" font-size="31" font-weight="600" letter-spacing="-1.5" fill="#252329">mammoth<tspan fill="#0369a1">.</tspan></text></svg>`;
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#faf9f6"/><g transform="translate(80 65) scale(1.5)">${mark}</g><text x="143" y="107" font-family="Arial,sans-serif" font-size="37" font-weight="600" fill="#252329">mammoth.</text><path d="M80 145h1040M80 540h1040" stroke="#dfdce4"/><text x="80" y="290" font-family="Arial,sans-serif" font-size="98" font-weight="600" letter-spacing="-5" fill="#252329">Big ideas.</text><text x="80" y="400" font-family="Arial,sans-serif" font-size="98" font-weight="600" letter-spacing="-5" fill="#0369a1">Solid ground.</text><text x="85" y="478" font-family="Arial,sans-serif" font-size="25" fill="#6c6971">MongoDB compatible. Built in Go. Yours to build on.</text><g transform="translate(840 230) scale(6)">${mark}</g><text x="80" y="582" font-family="monospace" font-size="17" fill="#6c6971">MAMMOTHENGINE.COM</text></svg>`;
await writeFile("public/favicon.svg", icon);
await writeFile("public/mammoth-logo.svg", logo);
await writeFile("public/social.svg", social);
await sharp(Buffer.from(icon))
  .resize(180, 180)
  .png()
  .toFile("public/apple-touch-icon.png");
await sharp(Buffer.from(social)).png().toFile("public/social.png");
