const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.logo = page.locator("#logo");
        this.error = page.locator(".text-danger");
        this.username = page.locator("#Username");
        this.password = page.locator("#Password");
        this.login = page.getByText("Log in");
    }
    async goToLoginPage(url) {
        await this.page.goto(url);
    }

    async checkLoginPageLink() {
        const expectedPath = '/Account/LogIn';
        const currentUrl = this.page.url();
        await expect(currentUrl).toContain(expectedPath);
    }

    async enterUsername(username) {
        await this.username.fill(username);
    }

    async enterPassword(password) {
        await this.password.fill(password);
    }

    async clickLogin() {
        await this.login.click();
    }

    async performLogin(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async loginPageError(text) {
        await this.error.waitFor({ state: 'visible' });
        expect(await this.error).toHaveText(text);
    }

}