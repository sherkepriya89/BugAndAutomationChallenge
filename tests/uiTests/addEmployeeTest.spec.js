const { test, expect } = require('../../utils/fixtures.js');
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

});
