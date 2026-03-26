const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  { src: 'public/images/highly-20polished-203d-20v.png', dist: 'public/images/logo-optimized.webp', width: 120 },
  { src: 'public/images/dsc6349-20copy.jpg', dist: 'public/images/upholstery-before-after.webp', width: 800 },
];

async function optimize() {
  for (const img of images) {
    try {
      await sharp(img.src)
        .resize(img.width)
        .webp({ quality: 80 })
        .toFile(img.dist);
      const oldSize = fs.statSync(img.src).size;
      const newSize = fs.statSync(img.dist).size;
      console.log(`Optimized ${img.src} -> ${img.dist}`);
      console.log(`Size reduced from ${(oldSize / 1024).toFixed(2)}KB to ${(newSize / 1024).toFixed(2)}KB (${((1 - newSize / oldSize) * 100).toFixed(2)}% reduction)`);
    } catch (err) {
      console.error(`Failed to optimize ${img.src}: ${err.message}`);
    }
  }
}

optimize();
