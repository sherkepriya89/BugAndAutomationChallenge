const { test, expect } = require('../../utils/fixtures.js');
const dataSet = JSON.parse(JSON.stringify(require('../../utils/data.json')));

const errorText1 = `There were one or more problems that prevented you from logging in:
The Username field is required.
The Password field is required.`;

const errorText2 = `There were one or more problems that prevented you from logging in:
The Password field is required.`;

const errorText3 = `There were one or more problems that prevented you from logging in:
The Username field is required.`;

const errorText4 = `There were one or more problems that prevented you from logging in:
The specified username or password is incorrect.`;

const emptyField = " ";
const incorrectUsername = "TestUser123";
const incorrectPassword = "123";

test.describe('Login Test Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage(process.env.URL);
  });

  test('Login: Verify error message when tried to login without username and password', async ({ loginPage }) => {
    await loginPage.performLogin(emptyField, emptyField);
    await loginPage.loginPageError(errorText1);
  });

  test('Login: Should display error when logging in without username', async ({ loginPage }) => {
    await loginPage.performLogin(emptyField, process.env.PASSWORD);
    await loginPage.loginPageError(errorText3);
  });

  test('Login: Should display error when logging in without password', async ({ loginPage }) => {
    await loginPage.performLogin(process.env.USERNAME, emptyField);
    await loginPage.loginPageError(errorText2);
  });

  test('Login: Verify error message with incorrect username', async ({ loginPage }) => {
    await loginPage.performLogin(incorrectUsername, process.env.PASSWORD);
    await loginPage.loginPageError(errorText1);
  });

  test('Login: Verify error message with incorrect password', async ({ loginPage }) => {
    await loginPage.performLogin(process.env.USERNAME, incorrectPassword);
    await loginPage.loginPageError(errorText4);
  });


  test('Login: Verify error message with incorrect username and password', async ({ loginPage }) => {
    await loginPage.performLogin(incorrectUsername, incorrectPassword);
    await loginPage.loginPageError(errorText1);
  });

  test('Login: Verify login with correct credentials', async ({ loginPage }) => {
    await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);

  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
