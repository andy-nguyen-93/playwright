# Playwright

Playwright is a framework for Web Testing and Automation. Test cases in this project are created based on [SauceDemo](https://www.saucedemo.com)

## Installation

- Install [NodeJS](https://nodejs.org/en)
- Clone the repository

```Shell
git clone https://github.com/andy-nguyen-93/playwright.git
```

- Run the init command.

```Shell
# Run from your project's root directory
npm install
```

## Extensions (VSCode)

- Playwright Test for VSCode
- Playwright Test Snippets
- Playwright Runner
- ESLint

## Test Cases

```Shell
# Run from your project's root directory
npx playwright test {filename}
```

- LOGIN-01. Validate that user cannot login without username and password - (Use Codegen)
- LOGIN-02. Validate that user cannot login without username - (Add BaseURL)
- LOGIN-03. Validate that user cannot login without password - (Add PageObject)
- LOGIN-04. Validate that user cannot login with invalid user and valid password - (Add Enums)
- LOGIN-05. Validate that user cannot login with valid user and invalid password - (Add Base Page)
- LOGIN-06. Validate that user cannot login with invalid user and invalid password - (Add ESLint)
- LOGIN-07. Validate that locked out user cannot login to the system - (Add GitHub Actions)
- LOGIN-08. Validate that valid users can login to the system - (Use .json data)
- INVENTORY-01. Validate that standard user can buy all items - (Handle Multiple Elements)
- INVENTORY-02. Validate that standard user can buy a single item - (Add BeforeEach and FakerJS)
- INVENTORY-03. Validate that valid users can buy a single item - (Parameterize Tests)
- SERIAL-01_04. Test cases about behaviors of problem user - (Serialize Tests)
- NL-01. Validate that user cannot access to inventory page without authentication - (Add GlobalSetup)
- NL-02. Validate that user cannot access certain pages without authentication - (Add Allure Report)
- NL-03. Validate that standard user can logout - (Use Fixture)
- NL-04. Accessibility Testing - (Use AxeBuilder)
- NL-05. Visual Testing - (Compare Snapshot)
- NL-06. Performance Testing - (Use CDPSession)
- API-01. Validate that About link is working - (API Test)
