import { test, expect } from '@playwright/test';

test.describe('e2e', () => {
  test('is the main page the same?', async ({ page }) => {
    await page.goto('127.0.0.1:3000/');
    await expect(page).toHaveScreenshot();
  });
});
