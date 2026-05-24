// One-time hero image compression. Run with: node scripts/compress-hero-images.mjs
// Re-encodes the heaviest JPGs at lower quality and produces WebP siblings.
// Keeps the .jpg (so existing content references still work) but at smaller size.
import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const IMAGES = [
    { file: 'public/images/seerose.jpg', maxWidth: 1600, jpegQuality: 80 },
    { file: 'public/images/zebra2.jpg', maxWidth: 1600, jpegQuality: 80 },
    { file: 'public/images/elephants.jpg', maxWidth: 1600, jpegQuality: 80 },
    { file: 'public/images/sophiepicture.jpg', maxWidth: 1200, jpegQuality: 82 },
    { file: 'public/images/the-stoic-challenge.png', maxWidth: 600, jpegQuality: 85 }
];

for (const { file, maxWidth, jpegQuality } of IMAGES) {
    const abs = resolve(file);
    const before = statSync(abs).size;
    const buf = readFileSync(abs);
    const isJpeg = /\.jpe?g$/i.test(file);

    // For JPEGs, re-encode at the target quality (overwrite in place).
    // For PNGs (e.g. book covers), leave the original alone — it's usually already small.
    if (isJpeg) {
        const jpegOut = await sharp(buf).resize({ width: maxWidth, withoutEnlargement: true }).jpeg({ quality: jpegQuality, mozjpeg: true }).toBuffer();
        writeFileSync(abs, jpegOut);
    }

    // Always emit a WebP sibling for <picture> source.
    const webpPath = abs.replace(/\.(jpe?g|png)$/i, '.webp');
    const webpOut = await sharp(buf).resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer();
    writeFileSync(webpPath, webpOut);

    const afterOriginal = statSync(abs).size;
    const afterWebp = statSync(webpPath).size;
    const pct = ((1 - afterOriginal / before) * 100).toFixed(0);
    const label = isJpeg ? 'JPG' : 'PNG (untouched)';
    console.log(`${file}: ${(before / 1024).toFixed(0)} KB → ${label} ${(afterOriginal / 1024).toFixed(0)} KB (-${pct}%), WebP ${(afterWebp / 1024).toFixed(0)} KB`);
}
