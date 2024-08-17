const { test } = require('../../utils/fixtures.js');
const { faker } = require('@faker-js/faker');

const generateRandomData = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dependentNum: faker.number.int({ min: 0, max: 32 }),
    };
};

test.describe('Delete Record Test Suite', () => {
    let randomData;
    let id;

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goToLoginPage(process.env.URL);
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);
        randomData = generateRandomData();
    });

    test('Verify the record is deleted', async ({ dashboardPage, addEmployeePage, deleteRecordPage }) => {
        await dashboardPage.clickOnAddEmployeeButton();
        await addEmployeePage.addNewRecord(randomData.firstName, randomData.lastName, randomData.dependentNum);
        id = await dashboardPage.getNewRecordID(randomData.firstName);
        await dashboardPage.clickDeleteRecordButton(id);
        await deleteRecordPage.deleteRecord();
        await dashboardPage.checkDeletedRecord(id);
    });

    test('Verify delete record modal title', async ({ dashboardPage, deleteRecordPage }) => {
        await dashboardPage.clickDeleteRandomRecord();
        await deleteRecordPage.verifyModalTitle("Delete Employee");
    });

    test('Verify cancel button for delete record modal', async ({ dashboardPage, deleteRecordPage }) => {
        await dashboardPage.clickDeleteRandomRecord();
        await deleteRecordPage.verifyCancelButton();
    });

    test('Verify close button for delete record modal', async ({ dashboardPage, deleteRecordPage }) => {
        await dashboardPage.clickDeleteRandomRecord();
        await deleteRecordPage.verifyCloseButton();
    });
});
