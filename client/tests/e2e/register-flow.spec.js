const { test, expect } = require('@playwright/test');

test('visitor can register and reach the dashboard', async ({ page }) => {
  const email = `e2e-${Date.now()}@snacksafari.test`;

  await page.goto('/register');
  await page.locator('#register-name').fill('E2E User');
  await page.locator('#register-email').fill(email);
  await page.locator('#register-password').fill('secret123');
  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole('heading', { name: /Welcome back, E2E User/i })).toBeVisible();

  await page.getByRole('navigation').getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('/');
});