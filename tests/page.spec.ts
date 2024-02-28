import { test, expect } from '@playwright/test';

test.describe('e2e', () => {
  test('is the main page the same?', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveScreenshot();
  });
});
