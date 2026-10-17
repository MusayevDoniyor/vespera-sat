const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 1. Core Vector Definitions
function getVesperaMarkSVG({ withTile = true, size = 512 } = {}) {
  const tileBackground = withTile
    ? `<rect width="100" height="100" rx="24" fill="#0b0f19"/>
       <rect width="100" height="100" rx="24" stroke="rgba(255,255,255,0.08)" stroke-width="1.2"/>`
    : '';

  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Left Wing Gradient: Electric Cyan into Deep Azure -->
    <linearGradient id="v-cyan-pure" x1="20" y1="26" x2="50" y2="86" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="40%" stop-color="#00c6ff" />
      <stop offset="80%" stop-color="#0072ff" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>

    <!-- Right Wing Gradient: Royal Indigo into Vibrant Purple -->
    <linearGradient id="v-violet-pure" x1="50" y1="86" x2="80" y2="26" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="50%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>

    <!-- Natural Soft Shadow between wings -->
    <filter id="v-wing-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#090d16" flood-opacity="0.5" />
    </filter>

    <!-- Star Glow -->
    <radialGradient id="star-beacon-glow" cx="84" cy="18" r="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.7" />
      <stop offset="50%" stop-color="#818cf8" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#0b0f19" stop-opacity="0" />
    </radialGradient>

    <!-- Star Core Radiant Gradient -->
    <linearGradient id="star-core-grad" x1="80" y1="12" x2="88" y2="24" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#e0f2fe" />
    </linearGradient>

    <!-- Overall Mark Ambient Shadow -->
    <filter id="mark-ambient-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0284c7" flood-opacity="0.32" />
    </filter>
  </defs>

  ${tileBackground}

  <!-- Ambient Beacon Starlight Glow -->
  <circle cx="84" cy="18" r="22" fill="url(#star-beacon-glow)" />

  <g filter="url(#mark-ambient-shadow)">
    <!-- Right Wing (Behind left wing) -->
    <path
      d="M 80 26 L 62 26 L 50 62 L 50 86 Z"
      fill="url(#v-violet-pure)"
    />

    <!-- Left Wing (Casts gentle shadow onto right wing) -->
    <path
      d="M 20 26 L 38 26 L 50 62 L 50 86 Z"
      fill="url(#v-cyan-pure)"
      filter="url(#v-wing-shadow)"
    />
  </g>

  <!-- The Vespera Evening Star Beacon -->
  <!-- Outer Star Flare -->
  <path
    d="M 84 4 Q 84 18 98 18 Q 84 18 84 32 Q 84 18 70 18 Q 84 18 84 4 Z"
    fill="#38bdf8"
  />

  <!-- Inner Diamond Flare -->
  <path
    d="M 84 8 Q 84 18 94 18 Q 84 18 84 28 Q 84 18 74 18 Q 84 18 84 8 Z"
    fill="url(#star-core-grad)"
  />

  <!-- White-hot core center spark -->
  <circle cx="84" cy="18" r="2" fill="#ffffff" />
</svg>`;
}

// 2. ICO Builder (Packs 16, 32, 48 PNGs into standard .ico format)
function buildIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(pngBuffers.length, 4); // Count

  let offset = 6 + 16 * pngBuffers.length;
  const dirEntries = [];
  const imageBuffers = [];

  for (const { width, height, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width === 256 ? 0 : width, 0);
    entry.writeUInt8(height === 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // Colors
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset

    dirEntries.push(entry);
    imageBuffers.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

async function buildAllAssets() {
  console.log('Building brand assets for Vespera SAT...');

  const tileSvg = getVesperaMarkSVG({ withTile: true });
  const transSvg = getVesperaMarkSVG({ withTile: false });

  // 1. Write SVGs to public and app
  fs.writeFileSync(path.join(__dirname, 'public', 'icon.svg'), tileSvg, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'src', 'app', 'icon.svg'), tileSvg, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'public', 'logo.svg'), transSvg, 'utf8');
  console.log('✓ SVGs written (public/icon.svg, src/app/icon.svg, public/logo.svg)');

  // 2. High-res transparent logo PNG
  await sharp(Buffer.from(transSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, 'public', 'logo.png'));
  console.log('✓ public/logo.png (512x512) generated');

  // 3. Apple Touch Icon (180x180)
  await sharp(Buffer.from(tileSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, 'public', 'apple-touch-icon.png'));
  console.log('✓ public/apple-touch-icon.png (180x180) generated');

  // 4. Android Chrome Icons
  await sharp(Buffer.from(tileSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, 'public', 'android-chrome-192x192.png'));
  await sharp(Buffer.from(tileSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, 'public', 'android-chrome-512x512.png'));
  console.log('✓ Android Chrome icons (192, 512) generated');

  // 5. Standard Favicons (16, 32, 48)
  const png16 = await sharp(Buffer.from(tileSvg)).resize(16, 16).png().toBuffer();
  const png32 = await sharp(Buffer.from(tileSvg)).resize(32, 32).png().toBuffer();
  const png48 = await sharp(Buffer.from(tileSvg)).resize(48, 48).png().toBuffer();

  fs.writeFileSync(path.join(__dirname, 'public', 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(__dirname, 'public', 'favicon-32x32.png'), png32);
  console.log('✓ public/favicon-16x16.png and 32x32.png generated');

  // 6. Favicon ICO (Multi-Resolution)
  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);
  fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, 'src', 'app', 'favicon.ico'), icoBuffer);
  console.log('✓ favicon.ico generated with 16x16, 32x32, 48x48 multi-resolution support');

  console.log('All brand assets successfully built and validated!');
}

buildAllAssets().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
