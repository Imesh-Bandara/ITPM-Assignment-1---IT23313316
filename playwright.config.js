// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 45000, // Increased timeout for reliable execution
  retries: 0, // Each test runs once: pass or fail only (no retries, no skipped)

  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Balanced speed and visibility
    slowMo: 300, // Slightly slower for better reliability
    launchOptions: {
      args: [
        '--start-maximized',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
      ]
    },
  },
  
  // Run tests one by one in order (single worker, no parallel)
  workers: 1,
  fullyParallel: false,

  reporter: [['html'], ['list']],
});