const { test, expect } = require('../../utils/fixtures.js');
const dataSet = require('../../utils/data.json');


test.describe('Login Test Suite', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage(process.env.URL);
  });

  test('Login: Verify error message when tried to login without username and password', async ({ loginPage }) => {
    await loginPage.performLogin(dataSet.emptyLogin.username, dataSet.emptyLogin.password);
    await loginPage.loginPageError(dataSet.emptyLogin.errorMessage);
  });

  test('Login: Should display error when logging in without username', async ({ loginPage }) => {
    await loginPage.performLogin(dataSet.emptyLogin.username, process.env.PASSWORD);
    await loginPage.loginPageError(dataSet.emptyUsername.errorMessage);
  });

  test('Login: Should display error when logging in without password', async ({ loginPage }) => {
    await loginPage.performLogin(process.env.USERNAME, dataSet.emptyLogin.password);
    await loginPage.loginPageError(dataSet.emptyPassword.errorMessage);
  });

  test('Login: Verify error message with incorrect username', async ({ loginPage }) => {
    await loginPage.performLogin(dataSet.incorrectUsername.username, process.env.PASSWORD);
    await loginPage.loginPageError(dataSet.incorrectUsername.errorMessage);
  });

  test('Login: Verify error message with incorrect password', async ({ loginPage }) => {
    await loginPage.performLogin(process.env.USERNAME, dataSet.incorrectPassword.password);
    await loginPage.loginPageError(dataSet.incorrectPassword.errorMessage);
  });


  test('Login: Verify error message with incorrect username and password', async ({ loginPage }) => {
    await loginPage.performLogin(dataSet.incorrectUsername, dataSet.incorrectPassword.password);
    await loginPage.loginPageError(dataSet.incorrectPassword.errorMessage);
  });

  test('Login: Verify login with correct credentials', async ({ loginPage }) => {
    await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);

  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
