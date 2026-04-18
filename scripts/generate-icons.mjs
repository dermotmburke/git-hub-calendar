#!/usr/bin/env node
// Run once to generate PWA icons: node scripts/generate-icons.mjs

import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'public', 'icons');

mkdirSync(OUT, { recursive: true });

function makeSquareSVG(size, bg, fg, paddingRatio = 0.1) {
  const pad = size * paddingRatio;
  const viewW = 1860;
  const viewH = 400;
  const scale = (size - 2 * pad) / viewW;
  const ty = size / 2 - (viewH * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <g transform="translate(${pad}, ${ty}) scale(${scale})">
    <rect x="25"   y="50"  width="260" height="85"  fill="${fg}"/>
    <rect x="25"   y="50"  width="85"  height="300" fill="${fg}"/>
    <rect x="25"   y="265" width="260" height="85"  fill="${fg}"/>
    <rect x="200"  y="189" width="85"  height="161" fill="${fg}"/>
    <rect x="130"  y="189" width="155" height="85"  fill="${fg}"/>
    <rect x="335"  y="50"  width="260" height="139" fill="${fg}"/>
    <rect x="335"  y="265" width="260" height="85"  fill="${fg}"/>
    <rect x="422"  y="50"  width="85"  height="300" fill="${fg}"/>
    <rect x="645"  y="50"  width="260" height="85"  fill="${fg}"/>
    <rect x="645"  y="50"  width="85"  height="300" fill="${fg}"/>
    <rect x="645"  y="265" width="260" height="85"  fill="${fg}"/>
    <rect x="820"  y="189" width="85"  height="161" fill="${fg}"/>
    <rect x="750"  y="189" width="155" height="85"  fill="${fg}"/>
    <rect x="955"  y="50"  width="85"  height="300" fill="${fg}"/>
    <rect x="1130" y="50"  width="85"  height="300" fill="${fg}"/>
    <rect x="955"  y="131" width="260" height="139" fill="${fg}"/>
    <rect x="1265" y="50"  width="85"  height="300" fill="${fg}"/>
    <rect x="1440" y="50"  width="85"  height="300" fill="${fg}"/>
    <rect x="1265" y="211" width="260" height="139" fill="${fg}"/>
    <rect x="1575" y="50"  width="85"  height="300" fill="${fg}"/>
    <rect x="1575" y="50"  width="260" height="85"  fill="${fg}"/>
    <rect x="1575" y="158" width="260" height="85"  fill="${fg}"/>
    <rect x="1575" y="265" width="260" height="85"  fill="${fg}"/>
    <rect x="1750" y="50"  width="85"  height="193" fill="${fg}"/>
    <rect x="1750" y="158" width="85"  height="192" fill="${fg}"/>
    <rect x="1825" y="184" width="10"  height="26"  fill="${bg}"/>
  </g>
</svg>`;
}

async function generate() {
  const standardSizes = [72, 96, 128, 144, 152, 192, 384, 512];
  for (const size of standardSizes) {
    await sharp(Buffer.from(makeSquareSVG(size, '#000000', '#ffffff')))
      .png()
      .toFile(join(OUT, `icon-${size}x${size}.png`));
    console.log(`icon-${size}x${size}.png`);
  }

  // Maskable icons need 18% padding so content stays within the safe zone
  for (const size of [192, 512]) {
    await sharp(Buffer.from(makeSquareSVG(size, '#000000', '#ffffff', 0.18)))
      .png()
      .toFile(join(OUT, `icon-maskable-${size}x${size}.png`));
    console.log(`icon-maskable-${size}x${size}.png`);
  }

  // Apple touch icon
  await sharp(Buffer.from(makeSquareSVG(180, '#000000', '#ffffff')))
    .png()
    .toFile(join(OUT, 'apple-touch-icon.png'));
  console.log('apple-touch-icon.png');

  // Small favicons
  for (const size of [32, 16]) {
    await sharp(Buffer.from(makeSquareSVG(size, '#000000', '#ffffff')))
      .png()
      .toFile(join(OUT, `favicon-${size}x${size}.png`));
    console.log(`favicon-${size}x${size}.png`);
  }

  console.log('\nDone — all icons in public/icons/');
}

generate().catch(console.error);
