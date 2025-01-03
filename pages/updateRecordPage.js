const { expect } = require('@playwright/test');

exports.UpdateRecordPage = class UpdateRecordPage {
    constructor(page) {
        this.page = page;
        this.modal = page.locator('div.modal-content:has-text("Add Employee")');
        this.modalTitle = this.modal.locator('.modal-title');
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.dependents = page.locator("#dependants");
        this.updateButton = this.modal.locator("#updateEmployee");
        this.cancelButton = this.modal.locator('button:has-text("Cancel")');
        this.closeButton = this.modal.locator(".close");
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

    async updateEmployee() {
        await this.updateButton.click({ force: true });
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickClose() {
        await this.closeButton.click();
    }

    async updateRecord(firstname, lastname, dependents) {
        await this.enterFirstname(firstname);
        await this.enterLastname(lastname);
        await this.enterDependents(dependents);
        await this.updateEmployee();

    }
    async verifyCloseButton() {
        await this.verifyModalIsVisible();
        await this.clickClose();
        await this.verifyModalIsHidden();

    }

    async verifyCancelButton() {
        await this.verifyModalIsVisible();
        await this.clickCancel();
        await this.verifyModalIsHidden();

    }
}