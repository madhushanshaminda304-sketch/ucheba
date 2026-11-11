// batch_screens.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const targets = [
    { url: 'http://localhost:3005/school/school-hse-lyceum', path: '.pipeline/after/school-detail-desktop.png', width: 1440, height: 900 },
    { url: 'http://localhost:3005/for-teachers', path: '.pipeline/after/for-teachers-desktop.png', width: 1440, height: 900 },
    { url: 'http://localhost:3005/courses', path: '.pipeline/after/courses-desktop.png', width: 1440, height: 900 },
    { url: 'http://localhost:3005/master', path: '.pipeline/after/master-desktop.png', width: 1440, height: 900 },
    { url: 'http://localhost:3005/mba', path: '.pipeline/after/mba-desktop.png', width: 1440, height: 900 },
    { url: 'http://localhost:3005/abroad', path: '.pipeline/after/abroad-desktop.png', width: 1440, height: 900 },
    { url: 'http://localhost:3005/profile', path: '.pipeline/after/profile-desktop.png', width: 1440, height: 900 },
    { url: 'http://localhost:3005/search?q=МГУ', path: '.pipeline/after/search-desktop.png', width: 1440, height: 900 },
    { url: 'http://localhost:3005/ege/mathematics', path: '.pipeline/after/ege-mathematics-desktop.png', width: 1440, height: 900 },
    { url: 'http://localhost:3005/school', path: '.pipeline/after/school-mobile.png', width: 375, height: 812 },
    { url: 'http://localhost:3005/for-teachers', path: '.pipeline/after/for-teachers-mobile.png', width: 375, height: 812 },
    { url: 'http://localhost:3005/profile', path: '.pipeline/after/profile-mobile.png', width: 375, height: 812 }
  ];

  for (const t of targets) {
    const page = await browser.newPage({ viewport: { width: t.width, height: t.height } });
    try {
      await page.goto(t.url, { waitUntil: 'networkidle', timeout: 10000 });
      await page.screenshot({ path: t.path, fullPage: false });
      console.log(`Saved: ${t.path}`);
    } catch (e) {
      console.error(`Failed ${t.url}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
})();
