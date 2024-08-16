const { test, expect } = require('../../utils/fixtures.js');
const dataSet = JSON.parse(JSON.stringify(require('../../utils/data.json')));
const { faker } = require('@faker-js/faker');

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const dependantNum = faker.number.int({ min: 0, max: 32 });
let id;


test.describe('Add Employee Test Suite', () => {

    test.beforeEach(async ({ loginPage, dashboardPage, addEmployeePage }) => {
        await loginPage.goToLoginPage(process.env.URL);
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);
        await dashboardPage.clickOnAddEmployeeButton();
        await addEmployeePage.addNewRecord(firstName, lastName, dependantNum);
        id = await dashboardPage.getNewRecordID(firstName);
    });

    test('Verify the first name of the newly added employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordFirstName(id, firstName);
    });

    test('Verify the last name of the newly added employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordLastName(id, lastName);
    });

    test('Verify the number of dependants for the newly added employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordDependant(id, dependantNum);
    });

    test('Verify the salary of the newly added employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordSalary(id);
    });

    test('Verify the gross pay of the newly added employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordGrossPay(id);
    });

    test('Verify the benefits cost for the newly added employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordBenefitsCost(id, dependantNum);
    });

    test('Verify the net pay of the newly added employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordNetPay(id, dependantNum);
    });

});

test.describe('Add Employee Modal Test Suite', () => {

    test.beforeEach(async ({ loginPage, dashboardPage }) => {
        await loginPage.goToLoginPage(process.env.URL);
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);
        await dashboardPage.clickOnAddEmployeeButton();
    });

    test('Verify add employee modal title', async ({ addEmployeePage }) => {
        await addEmployeePage.verifyModalTitle("Add Employee");
    });

    test('Verify cancel button for add employee modal title', async ({ addEmployeePage }) => {
        await addEmployeePage.verifyCancelButton();
    });

    test('Verify close button for add employee modal title', async ({ addEmployeePage }) => {
        await addEmployeePage.verifyCloseButton();
    });

});

test.describe('Negative Add Employee Modal Test Suite', () => {

    test.beforeEach(async ({ loginPage, dashboardPage }) => {
        await loginPage.goToLoginPage(process.env.URL);
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);
        await dashboardPage.clickOnAddEmployeeButton();
    });

    test('Verify first name maximum characters shows error', async ({ addEmployeePage, page }) => {
        // Added a new record from the data.json file
        await addEmployeePage.addNewRecord(
            dataSet.firstMax.firstName,
            dataSet.firstMax.lastName,
            dataSet.firstMax.dependants
        );

        // Checking if the error message is visible
        expect(await page.locator(`text=${dataSet.firstMax.errorMessage}`).isVisible()).toBe(true);
    });

    test('Verify last name maximum characters shows error', async ({ addEmployeePage, page }) => {
        // Added a new record from the data.json file
        await addEmployeePage.addNewRecord(
            dataSet.lastMax.firstName,
            dataSet.lastMax.lastName,
            dataSet.lastMax.dependants
        );

        // Checking if the error message is visible
        expect(await page.locator(`text=${dataSet.lastMax.errorMessage}`).isVisible()).toBe(true);
    });

    test('Verify more than 32 or less than 0 dependants shows error', async ({ addEmployeePage, page }) => {
        // Added a new record from the data.json file
        await addEmployeePage.addNewRecord(
            dataSet.dependantsMax.firstName,
            dataSet.dependantsMax.lastName,
            dataSet.dependantsMax.dependants
        );

        // Checking if the error message is visible
        expect(await page.locator(`text=${dataSet.dependantsMax.errorMessage}`).isVisible()).toBe(true);
    });

    test('Verify empty first name shows error', async ({ addEmployeePage, page }) => {
        // Added a new record from the data.json file
        await addEmployeePage.addNewRecord(
            dataSet.firstEmpty.firstName,
            dataSet.firstEmpty.lastName,
            dataSet.firstEmpty.dependants
        );

        // Checking if the error message is visible
        expect(await page.locator(`text=${dataSet.firstEmpty.errorMessage}`).isVisible()).toBe(true);
    });

    test('Verify empty last name shows error', async ({ addEmployeePage, page }) => {
        // Added a new record from the data.json file
        await addEmployeePage.addNewRecord(
            dataSet.lastEmpty.firstName,
            dataSet.lastEmpty.lastName,
            dataSet.lastEmpty.dependants
        );

        // Checking if the error message is visible
        expect(await page.locator(`text=${dataSet.lastEmpty.errorMessage}`).isVisible()).toBe(true);
    });

    test('Verify empty dependants shows error', async ({ addEmployeePage, page }) => {
        // Added a new record from the data.json file
        await addEmployeePage.addNewRecord(
            dataSet.dependantsEmpty.firstName,
            dataSet.dependantsEmpty.lastName,
            dataSet.dependantsEmpty.dependants
        );

        // Checking if the error message is visible
        expect(await page.locator(`text=${dataSet.dependantsEmpty.errorMessage}`).isVisible()).toBe(true);
    });

});
