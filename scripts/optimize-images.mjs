#!/usr/bin/env node
/**
 * Idempotent image optimizer.
 *
 * - Backs up originals to public/images/.original/ on first run.
 * - Re-encodes from the backup on every run → never degrades further.
 * - JPG: max 2400px wide, mozjpeg q82, progressive.
 * - PNG: max 1800px wide, palette mode + max compression.
 * - WebP source files: leaves untouched if < 100KB (logos), else recompresses.
 *
 * Usage:
 *   node scripts/optimize-images.mjs                 # process public/images
 *   node scripts/optimize-images.mjs path/to/dir     # process custom dir
 *   node scripts/optimize-images.mjs --dry           # report only
 */

import sharp from "sharp";
import { readdir, mkdir, copyFile, stat, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const srcDir = args.find((a) => !a.startsWith("--")) ?? "public/images";
const backupDir = path.join(srcDir, ".original");

const RULES = {
  ".jpg":  { maxWidth: 2400, encode: (img) => img.jpeg({ quality: 82, mozjpeg: true, progressive: true }) },
  ".jpeg": { maxWidth: 2400, encode: (img) => img.jpeg({ quality: 82, mozjpeg: true, progressive: true }) },
  ".png":  { maxWidth: 1800, encode: (img) => img.png({ quality: 80, compressionLevel: 9, palette: true }) },
  ".webp": { maxWidth: 1800, encode: (img) => img.webp({ quality: 82 }), skipIfUnder: 100 * 1024 },
};

const fmt = (n) => (n / 1024).toFixed(0).padStart(5) + " KB";
const exists = (p) => access(p, constants.F_OK).then(() => true, () => false);

async function processFile(name) {
  const ext = path.extname(name).toLowerCase();
  const rule = RULES[ext];
  if (!rule) return null;

  const srcPath = path.join(srcDir, name);
  const backupPath = path.join(backupDir, name);

  // Backup if not already backed up
  if (!(await exists(backupPath))) {
    if (!dry) await copyFile(srcPath, backupPath);
  }

  const origStat = await stat(backupPath).catch(() => stat(srcPath));
  if (rule.skipIfUnder && origStat.size < rule.skipIfUnder) {
    return { name, before: origStat.size, after: origStat.size, skipped: true };
  }

  const sourcePath = (await exists(backupPath)) ? backupPath : srcPath;
  const meta = await sharp(sourcePath).metadata();
  const targetWidth = Math.min(meta.width ?? rule.maxWidth, rule.maxWidth);

  let pipeline = sharp(sourcePath).rotate(); // honor EXIF orientation
  if ((meta.width ?? 0) > rule.maxWidth) {
    pipeline = pipeline.resize({ width: targetWidth });
  }
  pipeline = rule.encode(pipeline);

  if (dry) {
    return { name, before: origStat.size, after: null, targetWidth };
  }

  const buffer = await pipeline.toBuffer();
  await sharp(buffer).toFile(srcPath);
  const newStat = await stat(srcPath);
  return { name, before: origStat.size, after: newStat.size, targetWidth };
}

async function main() {
  if (!dry) await mkdir(backupDir, { recursive: true });

  const entries = await readdir(srcDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => e.name);

  console.log(`\n${dry ? "DRY RUN — " : ""}Optimizing ${files.length} files in ${srcDir}\n`);
  console.log("file".padEnd(38) + "before".padStart(10) + "after".padStart(10) + "saved".padStart(10));
  console.log("-".repeat(68));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const name of files) {
    try {
      const r = await processFile(name);
      if (!r) continue;
      const after = r.after ?? r.before;
      const saved = r.before - after;
      totalBefore += r.before;
      totalAfter += after;
      const tag = r.skipped ? " (skip)" : r.targetWidth ? ` ${r.targetWidth}px` : "";
      console.log(
        name.padEnd(38) +
          fmt(r.before).padStart(10) +
          fmt(after).padStart(10) +
          fmt(saved).padStart(10) +
          tag,
      );
    } catch (err) {
      console.error(`  ✗ ${name}: ${err.message}`);
    }
  }

  console.log("-".repeat(68));
  console.log(
    "total".padEnd(38) +
      fmt(totalBefore).padStart(10) +
      fmt(totalAfter).padStart(10) +
      fmt(totalBefore - totalAfter).padStart(10),
  );
  console.log(
    `\nReduction: ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`,
  );
  if (!dry) console.log(`Originals preserved in ${backupDir}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
