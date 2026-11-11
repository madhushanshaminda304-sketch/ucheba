const { chromium } = require('playwright');
const fs = require('fs');

async function capture() {
  fs.mkdirSync('.pipeline/before', { recursive: true });
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  // Desktop
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const desktopPage = await desktopContext.newPage();
  console.log('Navigating desktop...');
  try {
    await desktopPage.goto('https://www.ucheba.ru/', { waitUntil: 'domcontentloaded', timeout: 25000 });
    await desktopPage.waitForTimeout(3000);
    await desktopPage.screenshot({ path: '.pipeline/before/home_desktop_1440.png', fullPage: false });
    console.log('Saved .pipeline/before/home_desktop_1440.png');
  } catch (e) {
    console.error('Desktop error:', e.message);
  }

  // Mobile
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();
  console.log('Navigating mobile...');
  try {
    await mobilePage.goto('https://www.ucheba.ru/', { waitUntil: 'domcontentloaded', timeout: 25000 });
    await mobilePage.waitForTimeout(3000);
    await mobilePage.screenshot({ path: '.pipeline/before/home_mobile_375.png', fullPage: false });
    console.log('Saved .pipeline/before/home_mobile_375.png');
  } catch (e) {
    console.error('Mobile error:', e.message);
  }

  await browser.close();
  console.log('Done capturing screenshots!');
}

capture().catch(console.error);
