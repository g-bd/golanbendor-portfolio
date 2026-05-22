const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');

async function generateFavicons() {
  const logoPath = path.join(publicDir, 'chrome tab logo.png');

  // Generate favicon-32x32.png
  await sharp(logoPath)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Created favicon-32x32.png');

  // Generate favicon-16x16.png
  await sharp(logoPath)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('Created favicon-16x16.png');

  // Generate apple-touch-icon.png (180x180)
  await sharp(logoPath)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // Generate favicon.ico (multi-size ICO) - use 32x32 PNG as base
  // For simplicity, we'll just copy the 32x32 as favicon.ico
  // (browsers accept PNG disguised as .ico)
  await sharp(logoPath)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created favicon.ico');
}

async function generateOGImage() {
  const profilePath = path.join(publicDir, 'profile1.jpg');
  const outputPath = path.join(publicDir, 'og-image.jpg');

  // Create a 1200x630 dark background with profile image positioned nicely
  const bgColor = { r: 10, g: 10, b: 18 }; // #0a0a12

  // First, resize profile to fit height of 630, maintaining aspect ratio
  const profileResized = await sharp(profilePath)
    .resize({ height: 630, withoutEnlargement: true })
    .toBuffer();

  const profileMeta = await sharp(profileResized).metadata();

  // Create the composite OG image
  // Position profile on the right side
  const profileLeft = Math.max(1200 - profileMeta.width - 50, 600);

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: bgColor
    }
  })
  .composite([
    {
      input: profileResized,
      left: profileLeft,
      top: 0
    }
  ])
  .jpeg({ quality: 90 })
  .toFile(outputPath);

  console.log('Created og-image.jpg (1200x630)');
}

async function main() {
  try {
    console.log('Generating SEO assets...\n');
    await generateFavicons();
    await generateOGImage();
    console.log('\nAll SEO assets generated successfully!');
  } catch (error) {
    console.error('Error generating assets:', error);
    process.exit(1);
  }
}

main();
