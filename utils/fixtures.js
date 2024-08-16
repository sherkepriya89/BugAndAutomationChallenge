const base = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/dashboardPage');
const { AddEmployeePage } = require('../pages/addEmployeePage');
const { UpdateRecordPage } = require('../pages/updateRecordPage');

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

});
exports.expect = base.expect;