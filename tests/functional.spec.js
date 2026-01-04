
import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

test.describe('Functional tests - Form, Table, Alerts', () => {

  test('TC01 - Valid form submit with all fields filled', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await main.fillBasicForm({
      name: 'Fikret Tester',
      email: 'fikret@example.com',
      phone: '123456789',
      address: 'Sarajevo, Bosnia'
    });
    await main.selectGender('Male');
    await main.selectDays(['Monday', 'Wednesday']);
    await main.selectCountry('Germany');
    await main.selectColors(['red', 'green']);

    await main.submitForm();

    
    await expect(page).toHaveTitle(/Automation Testing Practice/i);
  });

  test('TC02 - Form - invalid email format is rejected', async ({ page }) => {
  const main = new MainPage(page);
  await main.goto();

  await main.fillBasicForm({
    name: 'Test User',
    email: 'not-an-email',
    phone: '123456789',
    address: 'Some address'
  });

  const oldURL = page.url();
  await main.submitForm();
  await page.waitForTimeout(1000);
  const newURL = page.url();

  expect(newURL).toBe(oldURL);
});

  test('TC03 - Form - required name field left empty', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await main.fillBasicForm({
      name: '',
      email: 'valid@example.com',
      phone: '123456789',
      address: 'Some address'
    });
    await main.submitForm();

    const nameIsInvalid = await main.nameInput.evaluate((el) => el.matches(':invalid'));
    expect(nameIsInvalid).toBeTruthy();
  });

  test('TC04 - Gender selection - Female can be selected and Male is not', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await main.selectGender('Female');

    await expect(main.femaleRadio).toBeChecked();
    await expect(main.maleRadio).not.toBeChecked();
  });

  test('TC05 - Days checkboxes - multiple days can be selected', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    const days = ['Sunday', 'Tuesday', 'Friday'];
    await main.selectDays(days);

    for (const d of days) {
      await expect(main.dayCheckbox(d)).toBeChecked();
    }
  });

  test('TC06 - Country dropdown - select India', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await main.selectCountry('India');

    await expect(main.countrySelect).toHaveValue(/india/i);
  });

  test('TC07 - Colors multiselect - multiple colors selected', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    const selectedColors = ['red', 'blue', 'green'];
    await main.selectColors(selectedColors);

    const selectedOptions = await main.colorsSelect.evaluate((el) =>
      Array.from(el.selectedOptions).map((o) => o.textContent.trim())
    );

    const expectedLabels = ['Red', 'Blue', 'Green'];
    for (const label of expectedLabels) {
      expect(selectedOptions).toContain(label);
    }
  });

  test('TC08 - Country dropdown contains India option', async ({ page }) => {
  const main = new MainPage(page);
  await main.goto();

  const options = await main.countrySelect.evaluate((el) =>
    Array.from(el.options).map((o) => o.textContent.trim())
  );

  expect(options.length).toBeGreaterThan(3);

  expect(options).toContain('India');
});



  test('TC09 - Static web table - price of "Learn Selenium" is 300', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    const price = await main.getBookPrice('Learn Selenium');
    expect(price.trim()).toBe('300');
  });

  test('TC10 - Confirm dialog appears and can be accepted', async ({ page }) => {
  const main = new MainPage(page);
  await main.goto();

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('confirm');
    await dialog.accept();
  });

  await main.triggerSimpleAlert();

  await expect(page).toHaveTitle(/Automation Testing Practice/i);
});
});