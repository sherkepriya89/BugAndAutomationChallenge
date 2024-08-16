const { test, expect } = require('../../utils/fixtures.js');
const { faker } = require('@faker-js/faker');
import LoginPage from './pages/LoginPage'; // Import your page objects
import DashboardPage from './pages/DashboardPage';
import AddEmployeePage from './pages/AddEmployeePage';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const dependantNum = faker.number.int({ min: 0, max: 32 });
let context;
let page;
let loginPage;
let dashboardPage;
let addEmployeePage;
let id;

test.describe('Update Record Test Suite', () => {

    test.beforeAll(async ({ browser }) => {
        // Manually create a new browser context and page
        context = await browser.newContext();
        page = await context.newPage();

        // Instantiate your page objects
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        addEmployeePage = new AddEmployeePage(page);

        // Go to the login page and perform login
        await loginPage.goToLoginPage(process.env.URL);
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);

        // Add a new employee record
        await dashboardPage.clickOnAddEmployeeButton();
        await addEmployeePage.addNewRecord(firstName, lastName, dependantNum);

        // Get the ID of the newly added record
        id = await dashboardPage.getNewRecordID(firstName);
        console.log(id);
    });
});


test('Verify the first name of the newly added employee', async ({ dashboardPage }) => {
    await dashboardPage.checkNewRecordFirstName(firstName);
});

test('Verify the last name of the newly added employee', async ({ dashboardPage }) => {
    await dashboardPage.checkNewRecordLastName(firstName, lastName);
});

test('Verify the number of dependants for the newly added employee', async ({ dashboardPage }) => {
    await dashboardPage.checkNewRecordDependant(firstName, dependantNum);
});

test('Verify the salary of the newly added employee', async ({ dashboardPage }) => {
    await dashboardPage.checkNewRecordSalary(firstName);
});

test('Verify the gross pay of the newly added employee', async ({ dashboardPage }) => {
    await dashboardPage.checkNewRecordGrossPay(firstName);
});

test('Verify the benefits cost for the newly added employee', async ({ dashboardPage }) => {
    await dashboardPage.checkNewRecordBenefitsCost(firstName, dependantNum);
});

test('Verify the net pay of the newly added employee', async ({ dashboardPage }) => {
    await dashboardPage.checkNewRecordNetPay(firstName, dependantNum);
});

test.afterAll(async () => {
    // Close the context after all tests are completed
    await context.close();
});
