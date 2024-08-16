const { expect } = require('@playwright/test');

exports.AddEmployeePage = class AddEmployeePage {
    constructor(page) {
        this.page = page;
        this.modal = page.locator("#employeeModal");
        this.modalTitle = this.modal.locator('.modal-title');
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.dependents = page.locator("#dependants");
        this.addButton = this.modal.locator("#addEmployee");
        this.cancelButton = this.modal.locator('button:has-text("Cancel")');
        this.closeButton = page.locator(".close");
    }

    async verifyModalIsVisible() {
        await expect(this.modal).toBeVisible();
    }


    async verifyModalTitle(text) {
        await this.modalTitle.waitFor({ state: 'visible' });
        await (expect(this.modalTitle).toHaveText(text));
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

    async enterDependents(dependents) {
        await this.dependents.fill(dependents.toString());
    }

    async addEmployee() {
        await this.addButton.click({ force: true });
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickClose() {
        await this.closeButton.click();
    }

    async addNewRecord(firstname, lastname, dependents) {
        await this.verifyModalIsVisible();
        await this.enterFirstname(firstname);
        await this.enterLastname(lastname);
        await this.enterDependents(dependents);
        await this.addEmployee();

    }
}