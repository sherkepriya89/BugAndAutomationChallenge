const { expect } = require('@playwright/test');

exports.AddEmployeePage = class AddEmployeePage {
    constructor(page) {
        this.page = page;
        this.modal = page.locator('div.modal-content:has-text("Add Employee")');
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.dependents = page.locator("#dependants");
        this.addButton = this.modal.locator("#updateEmployee");
        this.cancelButton = this.modal.locator('button:has-text("Cancel")');
        this.closeButton = page.locator(".close");
    }

    async verifyModalIsVisible() {
        await expect(this.modal).toBeVisible();
    }

    async verifyModalIsHidden() {
        await expect(this.modal).toBeHidden();
    }

    async enterFirstname(firstname) {
        await this.firstName.fill(firstname);
    }

    async enterLastname(lastName) {
        await this.lastName.fill(lastName);
    }

    async enterDependants(dependants) {
        await this.dependants.fill(dependants.toString());
    }

    async updateEmployee() {
        await this.updateButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickClose() {
        await this.closeButton.click();
    }

    async updateRecord(firstname, lastname, dependants) {
        await this.enterFirstname(firstname);
        await this.enterLastname(lastname);
        await this.enterDependents(dependants);
        await this.updateEmployee();

    }
}