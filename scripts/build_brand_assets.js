const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Root directories
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const appDir = path.join(rootDir, 'src', 'app');

/**
 * Generates the prestigious, publication-grade Vespera Vector Emblem SVG.
 * 100% transparent background, precision optical centering (X center ~ 50).
 * Serious, mature, sovereign palette: Deep Academic Cobalt & Midnight Navy + Platinum Crystalline Beacon.
 * Absolutely NO gaudy neon cyans or candy purples.
 */
function getVesperaMarkSVG({ theme = 'universal', size = 512 } = {}) {
  // Executive Academic Palette
  let wingLeftStop0 = '#3b82f6';
  let wingLeftStop40 = '#2563eb';
  let wingLeftStop80 = '#1d4ed8';
  let wingLeftStop100 = '#1e3a8a';

  let wingRightStop0 = '#2563eb';
  let wingRightStop50 = '#1e40af';
  let wingRightStop100 = '#0f172a';

  let starFlare = '#3b82f6';
  let starCoreStop100 = '#f8fafc';
  let ambientShadowColor = '#0b1120';
  let ambientOpacity = 0.35;
  let wingShadowColor = '#050811';
  let wingShadowOpacity = 0.6;

  if (theme === 'light') {
    wingLeftStop0 = '#2563eb';
    wingLeftStop40 = '#1d4ed8';
    wingLeftStop80 = '#1e40af';
    wingLeftStop100 = '#172554';

    wingRightStop0 = '#1d4ed8';
    wingRightStop50 = '#1e3a8a';
    wingRightStop100 = '#090d16';

    starFlare = '#1d4ed8';
    starCoreStop100 = '#f1f5f9';
    ambientShadowColor = '#0f172a';
    ambientOpacity = 0.18;
    wingShadowColor = '#0f172a';
    wingShadowOpacity = 0.3;
  } else if (theme === 'universal') {
    // High-contrast executive cobalt & deep obsidian navy
    wingLeftStop0 = '#3b82f6';
    wingLeftStop40 = '#2563eb';
    wingLeftStop80 = '#1d4ed8';
    wingLeftStop100 = '#172554';

    wingRightStop0 = '#2563eb';
    wingRightStop50 = '#1e3a8a';
    wingRightStop100 = '#0a0f1d';

    starFlare = '#2563eb';
    starCoreStop100 = '#f8fafc';
    ambientShadowColor = '#020617';
    ambientOpacity = 0.28;
    wingShadowColor = '#020617';
    wingShadowOpacity = 0.5;
  }

  const id = `vespera-${theme}`;

  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Left Wing Gradient: Academic Cobalt into Deep Midnight Navy -->
    <linearGradient id="${id}-wing-left" x1="16" y1="26" x2="46" y2="86" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${wingLeftStop0}" />
      <stop offset="40%" stop-color="${wingLeftStop40}" />
      <stop offset="80%" stop-color="${wingLeftStop80}" />
      <stop offset="100%" stop-color="${wingLeftStop100}" />
    </linearGradient>

    <!-- Right Wing Gradient: Sovereign Deep Sapphire into Architectural Obsidian -->
    <linearGradient id="${id}-wing-right" x1="46" y1="86" x2="76" y2="26" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${wingRightStop0}" />
      <stop offset="50%" stop-color="${wingRightStop50}" />
      <stop offset="100%" stop-color="${wingRightStop100}" />
    </linearGradient>

    <!-- Natural Soft Shadow between overlapping wings -->
    <filter id="${id}-wing-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="2" dy="2" stdDeviation="2.8" flood-color="${wingShadowColor}" flood-opacity="${wingShadowOpacity}" />
    </filter>

    <!-- Ambient Beacon Starlight Glow (Subtle, Refined) -->
    <radialGradient id="${id}-star-glow" cx="80" cy="18" r="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${starFlare}" stop-opacity="${theme === 'light' ? 0.3 : 0.6}" />
      <stop offset="60%" stop-color="${starFlare}" stop-opacity="0.1" />
      <stop offset="100%" stop-color="${starFlare}" stop-opacity="0" />
    </radialGradient>

    <!-- Platinum Diamond Star Core -->
    <linearGradient id="${id}-star-core" x1="76" y1="12" x2="84" y2="24" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="${starCoreStop100}" />
    </linearGradient>

    <!-- Overall Mark Ambient Shadow for physical surface lift -->
    <filter id="${id}-ambient-shadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="${ambientShadowColor}" flood-opacity="${ambientOpacity}" />
    </filter>
  </defs>

  <!-- Ambient Beacon Starlight Glow (completely transparent background) -->
  <circle cx="80" cy="18" r="22" fill="url(#${id}-star-glow)" />

  <g filter="url(#${id}-ambient-shadow)">
    <!-- Right Wing (Behind left wing, optical balance X=46..76) -->
    <path
      d="M 76 26 L 58 26 L 46 64 L 46 86 Z"
      fill="url(#${id}-wing-right)"
    />

    <!-- Left Wing (Casts gentle shadow onto right wing, X=16..46) -->
    <path
      d="M 16 26 L 34 26 L 46 64 L 46 86 Z"
      fill="url(#${id}-wing-left)"
      filter="url(#${id}-wing-shadow)"
    />

    <!-- Architectural Bevel Seam Line (Precision Diamond Highlight) -->
    <path
      d="M 46 64 L 46 86"
      stroke="rgba(255, 255, 255, 0.35)"
      stroke-width="0.8"
      stroke-linecap="round"
    />
  </g>

  <!-- The Vespera Evening Star Beacon (Balanced apex at cx=80, cy=18) -->
  <!-- Outer Star Flare -->
  <path
    d="M 80 4 Q 80 18 94 18 Q 80 18 80 32 Q 80 18 66 18 Q 80 18 80 4 Z"
    fill="${starFlare}"
  />

  <!-- Inner Diamond Flare -->
  <path
    d="M 80 8 Q 80 18 90 18 Q 80 18 80 28 Q 80 18 70 18 Q 80 18 80 8 Z"
    fill="url(#${id}-star-core)"
  />

  <!-- White-hot diamond spark center -->
  <circle cx="80" cy="18" r="2" fill="#ffffff" />
</svg>`;
}

// Packs 16, 32, 48 PNGs into standard .ico format
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

async function buildAllBrandAssets() {
  console.log('🏛️ Building mature, prestigious academic brand assets for Vespera SAT...');

  const universalSvg = getVesperaMarkSVG({ theme: 'universal' });
  const darkSvg = getVesperaMarkSVG({ theme: 'dark' });
  const lightSvg = getVesperaMarkSVG({ theme: 'light' });

  // 1. Write standalone SVGs (100% transparent, 0 background boxes)
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), universalSvg, 'utf8');
  fs.writeFileSync(path.join(appDir, 'icon.svg'), universalSvg, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), universalSvg, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'logo-dark.svg'), darkSvg, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'logo-light.svg'), lightSvg, 'utf8');
  console.log('✓ SVGs written (public/icon.svg, src/app/icon.svg, public/logo.svg, logo-dark.svg, logo-light.svg)');

  // 2. High-res Transparent PNGs (512x512)
  await sharp(Buffer.from(universalSvg))
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('✓ public/logo.png (512x512 transparent) generated');

  await sharp(Buffer.from(universalSvg))
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'icon.png'));
  console.log('✓ public/icon.png (512x512 transparent) generated');

  // Dark variant
  await sharp(Buffer.from(darkSvg))
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'logo-dark.png'));
  console.log('✓ public/logo-dark.png (512x512 transparent) generated');

  // Light variant
  await sharp(Buffer.from(lightSvg))
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'logo-light.png'));
  console.log('✓ public/logo-light.png (512x512 transparent) generated');

  // 3. Apple Touch Icon (180x180 transparent PNG)
  await sharp(Buffer.from(universalSvg))
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ public/apple-touch-icon.png (180x180 transparent) generated');

  // 4. Android Chrome Icons (192, 512 transparent PNGs)
  await sharp(Buffer.from(universalSvg))
    .resize(192, 192)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  await sharp(Buffer.from(universalSvg))
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('✓ public/android-chrome-*.png generated');

  // 5. Favicons (16x16, 32x32)
  const png16 = await sharp(Buffer.from(universalSvg)).resize(16, 16).png().toBuffer();
  const png32 = await sharp(Buffer.from(universalSvg)).resize(32, 32).png().toBuffer();
  const png48 = await sharp(Buffer.from(universalSvg)).resize(48, 48).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  console.log('✓ public/favicon-16x16.png and 32x32.png generated');

  // 6. Multi-resolution ICO (16, 32, 48)
  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('✓ favicon.ico generated (public/favicon.ico and src/app/favicon.ico)');

  console.log('🎉 Mature, prestigious brand assets successfully built with 0 gaudy candy colors!');
}

buildAllBrandAssets().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
