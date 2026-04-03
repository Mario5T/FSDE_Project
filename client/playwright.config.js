const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:5000'
  },
  webServer: [
    {
      command: 'cd ../server && npx prisma migrate deploy && npm start',
      url: 'http://127.0.0.1:3001/api/health',
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
      env: {
        DATABASE_URL: 'file:./e2e.db',
        JWT_SECRET: 'playwright-secret'
      }
    },
    {
      command: 'npm run dev',
      url: 'http://127.0.0.1:5000',
      reuseExistingServer: !process.env.CI,
      timeout: 120000
    }
  ]
});