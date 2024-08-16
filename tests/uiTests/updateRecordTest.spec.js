const { test } = require('../../utils/fixtures.js');
const { faker } = require('@faker-js/faker');
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const dependantNum = faker.number.int({ min: 0, max: 32 });
let id;
const newFirstName = faker.person.firstName();
const newLastName = faker.person.lastName();
const newDependantNum = faker.number.int({
    'min': 0,
    'max': 32
});

test.describe('Update Employee Test Suite', () => {
    test.beforeEach(async ({ loginPage, dashboardPage, addEmployeePage, updateRecordPage }) => {
        await loginPage.goToLoginPage(process.env.URL);
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);
        await dashboardPage.clickOnAddEmployeeButton();
        await addEmployeePage.addNewRecord(firstName, lastName, dependantNum);
        id = await dashboardPage.getNewRecordID(firstName);
        await dashboardPage.clickUpdateRecord(id);
        await updateRecordPage.updateRecord(newFirstName, newLastName, newDependantNum);
    });

    test('Verify the first name of the updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordFirstName(id, newFirstName);
    });

    test('Verify the last name of the updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordLastName(id, newLastName);
    });

    test('Verify the number of dependants for updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordDependant(id, newDependantNum);
    });

    test('Verify the salary of the updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordSalary(id);
    });

    test('Verify the gross pay of the updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordGrossPay(id);
    });

    test('Verify the benefits cost updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordBenefitsCost(id, dependantNum);
    });

    test('Verify the net pay updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordNetPay(id, dependantNum);
    });
});

test.describe('Update Modal Test Suite', () => {

    test.beforeEach(async ({ loginPage, dashboardPage }) => {
        await loginPage.goToLoginPage(process.env.URL);
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);
        await dashboardPage.clickUpdateRandomRecord();
    });

    test('Verify update employee modal title', async ({ updateRecordPage }) => {
        await updateRecordPage.verifyModalTitle("Update Employee");
    });

    test('Verify cancel button for update employee modal title', async ({ updateRecordPage }) => {
        await updateRecordPage.verifyCancelButton();
    });

    test('Verify close button for update employee modal title', async ({ updateRecordPage }) => {
        await updateRecordPage.verifyCloseButton();
    });

});
