# SE302 Automated Tests Project

This repository contains the project for the SE302 course (Software Testing and Maintenance). The purpose of the project was to write automation tests for a website using Playwright. The website that these tests are written for is TestAutomationPractice (https://testautomationpractice.blogspot.com/).

### Dependencies
- Node.js
- npm

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/harunbandic/SE302-Project.git
   cd SE302-Project
````

2. Initialize the project:

   ```bash
   npm init
   ```
3. Install Playwright:

   ```bash
   npm install @playwright/test
   npx playwright install
   ```

### Run Tests

* Run all tests

  ```bash
  npx playwright test
  ```

* Open Playwright HTML report

  ```bash
  npx playwright show-report
  ```

```