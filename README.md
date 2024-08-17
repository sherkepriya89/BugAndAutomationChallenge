# BugAndAutomationChallenge

This project uses [Playwright](https://playwright.dev/) for automated testing of both UI and API functionalities. The tests are written in JavaScript and leverage the [Faker](https://www.npmjs.com/package/faker) library to generate test data along with negative test data in utils/data.json file.

## Project Structure

The tests are organized into two main categories:

- **UI Tests:** Located in `tests/uiTests`
- **API Tests:** Located in `tests/apiTests`

### UI Tests

The UI tests cover various user interface scenarios such as form submissions, navigation, and UI element validations. Playwright’s Page Object Model (POM) is used to encapsulate page interactions, making the tests more maintainable.

### API Tests

API tests focus on validating the behavior of the application’s endpoints. Common scenarios include verifying status codes, response payloads, and ensuring correct error handling.

## Prerequisites

- Node.js (v14 or above)
- Playwright (`@playwright/test`)
- Faker (`faker`)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name.git
   cd your-repo-name