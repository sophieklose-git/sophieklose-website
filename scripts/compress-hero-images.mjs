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
    { file: 'public/images/sophiepicture.jpg', maxWidth: 1200, jpegQuality: 82 }
];

for (const { file, maxWidth, jpegQuality } of IMAGES) {
    const abs = resolve(file);
    const before = statSync(abs).size;
    const buf = readFileSync(abs);

    // Re-encode as compressed JPEG (overwrite in place).
    const jpegOut = await sharp(buf).resize({ width: maxWidth, withoutEnlargement: true }).jpeg({ quality: jpegQuality, mozjpeg: true }).toBuffer();
    writeFileSync(abs, jpegOut);

    // Also emit a WebP sibling.
    const webpPath = abs.replace(/\.jpe?g$/i, '.webp');
    const webpOut = await sharp(buf).resize({ width: maxWidth, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer();
    writeFileSync(webpPath, webpOut);

    const afterJpeg = statSync(abs).size;
    const afterWebp = statSync(webpPath).size;
    const pct = ((1 - afterJpeg / before) * 100).toFixed(0);
    console.log(`${file}: ${(before / 1024).toFixed(0)} KB → JPG ${(afterJpeg / 1024).toFixed(0)} KB (-${pct}%), WebP ${(afterWebp / 1024).toFixed(0)} KB`);
}
