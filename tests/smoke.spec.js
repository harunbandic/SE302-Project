import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

test.describe('Smoke tests - Test Automation Practice', () => {
  test('SM01 - Home page loads and has correct title', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await expect(page).toHaveTitle(/Automation Testing Practice/i);
  });

  test('SM02 - Form elements are visible', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await expect(main.nameInput).toBeVisible();
    await expect(main.emailInput).toBeVisible();
    await expect(main.phoneInput).toBeVisible();
    await expect(main.addressTextarea).toBeVisible();
  });

  test('SM03 - Static web table is visible', async ({ page }) => {
  const main = new MainPage(page);
  await main.goto();

  await expect(main.tableHeaderRow).toBeVisible();
  await expect(main.tableHeaderRow).toContainText('BookName');
  await expect(main.tableHeaderRow).toContainText('Author');
  await expect(main.tableHeaderRow).toContainText('Subject');
  await expect(main.tableHeaderRow).toContainText('Price');
});

  test('SM04 - Dynamic button START is visible', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await expect(main.dynamicStartButton).toBeVisible();
  });

  test('SM05 - Simple Alert button is visible', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await expect(main.simpleAlertButton).toBeVisible();
  });
});