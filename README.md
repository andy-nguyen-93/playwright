# Playwright

Playwright is a framework for Web Testing and Automation. Test cases in this project are created based on [SauceDemo](https://www.saucedemo.com)

## Installation

- Install [NodeJS](https://nodejs.org/en)
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
- INVENTORY-01. Validate that standard user can buy all items - (Handle Multiple Elements)
- INVENTORY-02. Validate that standard user can buy a single item - (Add BeforeEach and FakerJS)
- INVENTORY-03. Validate that valid users can buy a single item - (Parameterize Tests)
- SERIAL-01_04. Test cases about behaviors of problem user - (Serialize Tests)
