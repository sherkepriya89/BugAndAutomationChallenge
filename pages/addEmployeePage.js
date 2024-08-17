const { expect } = require('@playwright/test');

exports.AddEmployeePage = class AddEmployeePage {
    constructor(page) {
        this.page = page;
        this.modal = page.locator("#employeeModal"); //Add Employee window
        this.modalTitle = this.modal.locator('.modal-title'); //Add Employee Window Title
        this.firstName = page.locator("#firstName"); //First Name field
        this.lastName = page.locator("#lastName"); //Last name Field
        this.dependents = page.locator("#dependants"); //Dependents Field
        this.addButton = this.modal.locator("#addEmployee"); //Add button on Add Employee Window
        this.cancelButton = this.modal.locator('button:has-text("Cancel")'); //Cancel Button on Add Employee Window
        this.closeButton = this.modal.locator(".close"); //Close Button on Add Employee Window
    }

    //To check if the Add Employee window is visible
    async verifyModalIsVisible() {
        await expect(this.modal).toBeVisible();
    }
    //To check if the Add Employee window Title is visible and correct
    async verifyModalTitle(text) {
        await this.modalTitle.waitFor({ state: 'visible' });
        await (expect(this.modalTitle).toHaveText(text));
    }

    //To check if the Add Employee window Title is hidden after clicking close or cancel or adding record
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

    //To click add button on add employee window
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

    async verifyCloseButton() {
        await this.verifyModalIsVisible();
        await this.clickCancel();
        await this.verifyModalIsHidden();

    }

    async verifyCancelButton() {
        await this.verifyModalIsVisible();
        await this.clickClose();
        await this.verifyModalIsHidden();

    }

}