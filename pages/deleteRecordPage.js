const { expect } = require('@playwright/test');

exports.DeleteRecordPage = class DeleteRecordPage {
    constructor(page) {
        this.page = page;
        this.modal = page.locator('div.modal-content:has-text("Delete Employee")');
        this.modalTitle = this.modal.locator(".modal-title");
        this.deleteButton = this.modal.locator("#deleteEmployee");
        this.cancelButton = this.modal.locator('button:has-text("Cancel")');
        this.closeButton = this.modal.locator(".close");
        this.confirmationText = page.locator(".modal-body");
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

    async deleteRecord() {
        await this.deleteButton.click({ force: true });
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickClose() {
        await this.closeButton.click();
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

    async verifyConfirmationText(firstName, lastName) {
        await this.confirmationText.toHaveText("Delete employee record for "
            + firstName + lastName);
    }


}