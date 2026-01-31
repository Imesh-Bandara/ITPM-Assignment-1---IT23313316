#!/usr/bin/env node

// run-tests.js - Optimized Playwright test runner

const { spawn } = require('child_process');

console.log('🚀 Starting optimized Playwright tests...');
console.log('⚡ Fast execution with visible browser actions');
console.log('🔧 Running with performance optimizations');
console.log('');

// Run playwright test with optimized settings
const testProcess = spawn('npx', ['playwright', 'test', '--headed'], {
  stdio: 'inherit',
  shell: true
});

testProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ All tests passed!');
    console.log('📊 View detailed report: npx playwright show-report');
  } else {
    console.log(`⚠️  Tests completed with exit code: ${code}`);
    console.log('📊 Check the report for details: npx playwright show-report');
  }
});

testProcess.on('error', (error) => {
  console.error('❌ Error running tests:', error);
});