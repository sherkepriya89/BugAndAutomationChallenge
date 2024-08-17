const { test } = require('../../utils/fixtures.js');

test.describe('Dashboard Test Suite', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goToLoginPage(process.env.URL);
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);
    });
    test('Verify the link for the dashboard page is correct', async ({ dashboardPage }) => {
        await dashboardPage.checkDashboardPageLink();
    });

    test('Verify title link for the dashboard page is present', async ({ dashboardPage }) => {
        await dashboardPage.checkDashboardPageTitleLink();
    });

    test('Verify log out button', async ({ dashboardPage, loginPage }) => {
        await dashboardPage.checkLogoutButton();
        await loginPage.checkLoginPageLink();
    });

    test('Verify footer for the dashboard page', async ({ dashboardPage }) => {
        await dashboardPage.checkDashboardPageFooter();
    });
});
