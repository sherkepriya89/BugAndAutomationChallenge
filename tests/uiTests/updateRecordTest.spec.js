const { test } = require('../../utils/fixtures.js');
const { faker } = require('@faker-js/faker');
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const dependentNum = faker.number.int({ min: 0, max: 32 });
let id;
const newFirstName = faker.person.firstName();
const newLastName = faker.person.lastName();
const newDependentNum = faker.number.int({
    'min': 0,
    'max': 32
});

test.describe('Update Employee Test Suite', () => {
    test.beforeEach(async ({ loginPage, dashboardPage, addEmployeePage, updateRecordPage }) => {
        await loginPage.goToLoginPage(process.env.URL);
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);
        await dashboardPage.clickOnAddEmployeeButton();
        await addEmployeePage.addNewRecord(firstName, lastName, dependentNum);
        id = await dashboardPage.getNewRecordID(firstName);
        await dashboardPage.clickUpdateRecord(id);
        await updateRecordPage.updateRecord(newFirstName, newLastName, newDependentNum);
    });

    test('Verify the first name of the updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordFirstName(id, newFirstName);
    });

    test('Verify the last name of the updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordLastName(id, newLastName);
    });

    test('Verify the number of dependents for updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordDependent(id, newDependentNum);
    });

    test('Verify the salary of the updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordSalary(id);
    });

    test('Verify the gross pay of the updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordGrossPay(id);
    });

    test('Verify the benefits cost updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordBenefitsCost(id, dependentNum);
    });

    test('Verify the net pay updated employee', async ({ dashboardPage }) => {
        await dashboardPage.checkNewRecordNetPay(id, dependentNum);
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
