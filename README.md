```md
# SE302 Project – Automated Web Tests (Playwright)

This repository contains an automated web testing project developed for the **SE302 Software Engineering** course.  
The tests are implemented using **Playwright** and organized with the **Page Object Model (POM)** design pattern.

---

## Application Under Test (AUT)

- Website: https://testautomationpractice.blogspot.com/

The AUT contains common UI components such as:
- input form fields
- radio buttons and checkboxes
- dropdown menus and multi-select
- static web table
- JavaScript dialogs (confirm)

---

## Technologies

- Playwright
- JavaScript (Node.js)
- Page Object Model (POM)
- Microsoft Edge (msedge)

---

## Project Structure

```

SE302-Project/
│
├── pages/
│   └── MainPage.js
│
├── tests/
│   ├── smoke.spec.js
│   └── functional.spec.js
│
├── playwright.config.js
├── package.json
├── .gitignore
└── README.md

````

---

## Test Suite

A total of **15 automated test cases** were implemented:

### Smoke Tests (5)
- SM01 — Home page loads and has correct title  
- SM02 — Form elements are visible  
- SM03 — Static web table header is visible  
- SM04 — Dynamic START button is visible  
- SM05 — Simple Alert button is visible  

### Functional Tests (10)
- TC01 — Valid form submission (all fields + selections)  
- TC02 — Invalid email rejected (negative case)  
- TC03 — Missing required Name field validation (negative case)  
- TC04 — Gender radio selection  
- TC05 — Multiple checkbox days selection  
- TC06 — Country dropdown selection (India)  
- TC07 — Colors multiselect (Red, Blue, Green)  
- TC08 — Country dropdown contains “India” option  
- TC09 — Static table data validation (Learn Selenium price = 300)  
- TC10 — Confirm dialog appears and can be accepted  

---

## How to Run

### 1) Install dependencies
```bash
npm install
````

### 2) Install Playwright browsers (first time only)

```bash
npx playwright install
```

### 3) Run all tests

```bash
npx playwright test
```

### 4) Run tests in UI mode

```bash
npx playwright test --ui
```

### 5) Open the HTML report

```bash
npx playwright show-report
```

---

## Evidence / Reporting

Playwright generates an **HTML report** after execution.
The project is configured to keep:

* screenshots on failure
* video on failure
* trace on first retry

---

## Notes

* The project follows the **POM structure**: all locators and page actions are stored inside `pages/MainPage.js`.
* Test files inside `tests/` contain only test logic and assertions.
