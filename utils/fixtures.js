const base = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/dashboardPage');
const { AddEmployeePage } = require('../pages/addEmployeePage');
const { UpdateRecordPage } = require('../pages/updateRecordPage');
const { DeleteRecordPage } = require('../pages/deleteRecordPage');

exports.test = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    addEmployeePage: async ({ page }, use) => {
        await use(new AddEmployeePage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    updateRecordPage: async ({ page }, use) => {
        await use(new UpdateRecordPage(page));
    },
    deleteRecordPage: async ({ page }, use) => {
        await use(new DeleteRecordPage(page));
    },

});
exports.expect = base.expect;