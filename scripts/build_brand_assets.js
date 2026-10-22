const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Root directories
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const appDir = path.join(rootDir, 'src', 'app');

/**
 * Generates the perfected Vespera Vector Emblem SVG.
 * Completely transparent background, precision optical centering (X center ~ 50),
 * crisp jewel-tone gradients, and radiant Evening Star beacon.
 */
function getVesperaMarkSVG({ theme = 'universal', size = 512 } = {}) {
  // Color ramps based on theme target
  // universal: rich saturated jewel tones that pop on BOTH pure white (#ffffff) and pure dark (#090d16)
  // dark: luminous electric cyan-violet
  // light: deep sapphire azure to royal violet with contrast boost
  let cyanStop0 = '#00f2fe';
  let cyanStop40 = '#00c6ff';
  let cyanStop80 = '#0072ff';
  let cyanStop100 = '#1d4ed8';

  let violetStop0 = '#3b82f6';
  let violetStop50 = '#6366f1';
  let violetStop100 = '#a855f7';

  let starFlare = '#38bdf8';
  let starCoreStop100 = '#e0f2fe';
  let ambientShadowColor = '#0284c7';
  let ambientOpacity = 0.32;
  let wingShadowColor = '#090d16';
  let wingShadowOpacity = 0.55;

  if (theme === 'light') {
    cyanStop0 = '#0284c7';
    cyanStop40 = '#0ea5e9';
    cyanStop80 = '#2563eb';
    cyanStop100 = '#1d4ed8';

    violetStop0 = '#2563eb';
    violetStop50 = '#4f46e5';
    violetStop100 = '#7c3aed';

    starFlare = '#0284c7';
    starCoreStop100 = '#bae6fd';
    ambientShadowColor = '#0f172a';
    ambientOpacity = 0.16;
    wingShadowColor = '#0f172a';
    wingShadowOpacity = 0.22;
  } else if (theme === 'universal') {
    // Saturated so it holds deep punch against white and brilliant glow against black
    cyanStop0 = '#00e5ff';
    cyanStop40 = '#00b0ff';
    cyanStop80 = '#0066ff';
    cyanStop100 = '#1e40af';

    violetStop0 = '#2979ff';
    violetStop50 = '#651fff';
    violetStop100 = '#9c27b0';

    starFlare = '#00b0ff';
    starCoreStop100 = '#e1f5fe';
    ambientShadowColor = '#0052cc';
    ambientOpacity = 0.28;
    wingShadowColor = '#0b0f19';
    wingShadowOpacity = 0.45;
  }

  const id = `vespera-${theme}`;

  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Left Wing Gradient: Electric Cyan into Deep Sapphire -->
    <linearGradient id="${id}-cyan" x1="16" y1="26" x2="46" y2="86" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${cyanStop0}" />
      <stop offset="40%" stop-color="${cyanStop40}" />
      <stop offset="80%" stop-color="${cyanStop80}" />
      <stop offset="100%" stop-color="${cyanStop100}" />
    </linearGradient>

    <!-- Right Wing Gradient: Royal Indigo into Vibrant Purple -->
    <linearGradient id="${id}-violet" x1="46" y1="86" x2="76" y2="26" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${violetStop0}" />
      <stop offset="50%" stop-color="${violetStop50}" />
      <stop offset="100%" stop-color="${violetStop100}" />
    </linearGradient>

    <!-- Natural Soft Shadow between overlapping wings -->
    <filter id="${id}-wing-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="2" dy="2" stdDeviation="2.8" flood-color="${wingShadowColor}" flood-opacity="${wingShadowOpacity}" />
    </filter>

    <!-- Ambient Beacon Starlight Glow -->
    <radialGradient id="${id}-star-glow" cx="80" cy="18" r="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${starFlare}" stop-opacity="${theme === 'light' ? 0.35 : 0.75}" />
      <stop offset="50%" stop-color="#818cf8" stop-opacity="${theme === 'light' ? 0.08 : 0.22}" />
      <stop offset="100%" stop-color="${starFlare}" stop-opacity="0" />
    </radialGradient>

    <!-- Star Core Radiant Gradient -->
    <linearGradient id="${id}-star-core" x1="76" y1="12" x2="84" y2="24" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="${starCoreStop100}" />
    </linearGradient>

    <!-- Overall Mark Ambient Shadow for physical surface lift -->
    <filter id="${id}-ambient-shadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="${ambientShadowColor}" flood-opacity="${ambientOpacity}" />
    </filter>
  </defs>

  <!-- Ambient Beacon Starlight Glow (completely transparent background, no box!) -->
  <circle cx="80" cy="18" r="22" fill="url(#${id}-star-glow)" />

  <g filter="url(#${id}-ambient-shadow)">
    <!-- Right Wing (Behind left wing, optically balanced at X=46..76) -->
    <path
      d="M 76 26 L 58 26 L 46 64 L 46 86 Z"
      fill="url(#${id}-violet)"
    />

    <!-- Left Wing (Casts gentle drop shadow onto right wing, X=16..46) -->
    <path
      d="M 16 26 L 34 26 L 46 64 L 46 86 Z"
      fill="url(#${id}-cyan)"
      filter="url(#${id}-wing-shadow)"
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
  <circle cx="80" cy="18" r="2.2" fill="#ffffff" />
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
  console.log('✨ Building pure transparent, high-res brand assets for Vespera SAT...');

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
  // Universal: works on both dark and light
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

  // Dark variant (for dark UI / presentations)
  await sharp(Buffer.from(darkSvg))
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'logo-dark.png'));
  console.log('✓ public/logo-dark.png (512x512 transparent) generated');

  // Light variant (for light UI / white presentations)
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

  console.log('🎉 All brand assets built successfully with 100% alpha transparency and NO background boxes!');
}

buildAllBrandAssets().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
