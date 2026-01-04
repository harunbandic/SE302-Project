export class MainPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://testautomationpractice.blogspot.com/';

    this.nameInput = page.locator('input[name="name"], input#name');
    this.emailInput = page.locator('input[name="email"], input#email');
    this.phoneInput = page.locator('input[name="phone"], input#phone');

    this.addressTextarea = page.locator('textarea[name="address"], textarea#address, textarea.form-control');

    this.maleRadio = page.getByRole('radio', { name: 'Male', exact: true });
    this.femaleRadio = page.getByRole('radio', { name: 'Female', exact: true });

    this.dayCheckbox = (day) =>
      this.page.getByText(day, { exact: true }).locator('..').locator('input[type="checkbox"]');

    this.countrySelect = page.locator('select#country, select[name="country"]');
    this.colorsSelect = page.locator('select#colors');

    this.submitButton = page.getByText('Submit', { exact: true }).first();

    this.datePicker1 = page.getByPlaceholder('mm/dd/yyyy').first();

    this.staticTableRow = (bookName) =>
      this.page.locator('table').locator('tr', { hasText: bookName });
    this.tableHeaderRow = this.page.locator('table').locator('tr').first();


    this.dynamicStartButton = page.getByText('START', { exact: true });

    this.simpleAlertButton = page
      .getByText('Simple Alert')
      .locator('xpath=following::button[1]');
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  async fillBasicForm({ name, email, phone, address }) {
    if (name)  await this.nameInput.fill(name);
    if (email) await this.emailInput.fill(email);
    if (phone) await this.phoneInput.fill(phone);

    if (address) {
      const handle = await this.addressTextarea.elementHandle({ timeout: 1000 }).catch(() => null);
      if (handle) {
        await this.addressTextarea.fill(address);
      } else {
        console.warn('Address textarea not found – skipping address fill.');
      }
    }
  }

  async selectGender(gender) {
    if (!gender) return;
    const g = gender.toLowerCase();
    if (g === 'male') {
      await this.maleRadio.check();
    } else if (g === 'female') {
      await this.femaleRadio.check();
    }
  }

  async selectDays(daysArray) {
    if (!daysArray) return;
    for (const day of daysArray) {
      await this.dayCheckbox(day).check();
    }
  }

  async selectCountry(country) {
    if (!country) return;
    await this.countrySelect.selectOption({ label: country });
  }

  async selectColors(colorsArray) {
    if (!colorsArray || colorsArray.length === 0) return;
    await this.colorsSelect.selectOption(colorsArray);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async setDatePicker1(dateString) {
    await this.datePicker1.fill('');
    await this.datePicker1.fill(dateString);
  }

  async getBookPrice(bookName) {
    const row = this.staticTableRow(bookName);
    const priceCell = row.locator('td').nth(3);
    return priceCell.innerText();
  }

  async triggerSimpleAlert() {
    await this.simpleAlertButton.click();
  }

  async clickDynamicStart() {
    await this.dynamicStartButton.click();
  }
}