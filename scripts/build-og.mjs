#!/usr/bin/env node
/**
 * Builds public/og-default.jpg — the social preview image.
 *
 * 1200×630 JPEG (Facebook/WhatsApp/Twitter/LinkedIn/Slack/iMessage standard).
 * Background = hero photo cropped on the "attention" area + dark gradient.
 * Foreground = brand eyebrow + wordmark + tagline rendered via SVG overlay.
 *
 * Run:    npm run build-og
 *
 * After deploy, validate with:
 *   - https://www.opengraph.xyz/url/
 *   - https://cards-dev.twitter.com/validator
 *   - Send link to yourself via WhatsApp Web (cache 7d, append ?v=N to refresh)
 */

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "public/images/hero.jpg");
const OUT = path.join(ROOT, "public/og-default.jpg");
const WIDTH = 1200;
const HEIGHT = 630;

// Brand tokens
const GOLD = "#C49A5A";
const BONE = "#F0EDE8";

const overlay = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#0D1117" stop-opacity="0.20"/>
      <stop offset="55%"  stop-color="#0D1117" stop-opacity="0.60"/>
      <stop offset="100%" stop-color="#0D1117" stop-opacity="0.94"/>
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="url(#shade)"/>

  <!-- Eyebrow -->
  <text x="64" y="470"
        font-family="Helvetica,Arial,sans-serif"
        font-size="20" letter-spacing="6"
        fill="${GOLD}" font-weight="600">
    ORYZON · CAEN · CALVADOS
  </text>

  <!-- Wordmark -->
  <text x="64" y="555"
        font-family="Georgia,'Times New Roman',serif"
        font-size="76" fill="${BONE}" font-weight="500"
        letter-spacing="-1">
    Votre maison,<tspan font-style="italic" fill="${GOLD}"> sur mesure.</tspan>
  </text>

  <!-- Tagline right -->
  <text x="${WIDTH - 64}" y="555"
        font-family="Georgia,'Times New Roman',serif"
        font-size="26" font-style="italic"
        fill="${BONE}" fill-opacity="0.80"
        text-anchor="end">
    +30 ans de métier · Réalité virtuelle
  </text>

  <!-- Divider -->
  <line x1="64" y1="595" x2="${WIDTH - 64}" y2="595"
        stroke="${GOLD}" stroke-width="1" stroke-opacity="0.55"/>
</svg>`;

await sharp(SOURCE)
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true, progressive: true })
  .toFile(OUT);

const fs = await import("node:fs/promises");
const size = (await fs.stat(OUT)).size;
console.log(`✓ ${path.relative(ROOT, OUT)} — ${WIDTH}×${HEIGHT} — ${(size / 1024).toFixed(0)} KB`);
