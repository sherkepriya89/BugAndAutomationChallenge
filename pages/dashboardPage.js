const { expect } = require('@playwright/test');
const salaryPerPaycheck = 2000;
const paychecksPerYear = 26;
const employeeBenefitsCost = 1000;
const dependentBenefitsCost = 500;

exports.DashboardPage = class DashboardPage {
    constructor(page) {
        this.page = page;
        this.addEmployeeButton = page.locator('#add');
        this.logo = page.locator('.navbar-brand');
        this.logOutButton = page.locator('text=Log Out');
        this.copyright = page.locator('footer > div');
        this.table = page.locator('tbody');
        this.tableRow = page.locator('tbody tr');
        this.modal = page.locator('div.modal-content:has-text("Add Employee")');
    }

    async goToDashboardPage(url) {
        await this.page.goto(url);
    }

    async checkDashboardPageLink() {
        const expectedPath = '/Prod/Benefits';
        const currentUrl = this.page.url();
        await expect(currentUrl).toContain(expectedPath);
    }

    async checkDashboardPageTitleLink() {
        await expect(this.logo).toHaveAttribute('href', `/Prod/Benefits`);
    }

    async checkLogoutButton() {
        await expect(this.logOutButton).toHaveAttribute('href', '/Prod/Account/LogOut');
        await this.logOutButton.click();
    }

    async checkDashboardPageFooter() {
        await expect(this.copyright).toHaveText('© 2024 - Paylocity');
    }

    //Add Employee Methods
    async clickOnAddEmployeeButton() {
        await this.tableRow.first().waitFor({ state: 'visible' });
        await this.addEmployeeButton.click();
    }

    async getNewRecordID(name) {
        return this.table.locator('tr', { hasText: name }).locator('td').nth(0).textContent();
    }

    async checkNewRecordField(id, index, expectedText) {
        const tableRow = this.table.locator('tr', { hasText: id });
        await expect(tableRow.locator('td').nth(index)).toHaveText(expectedText);
    }

    async checkNewRecordFirstName(id, name) {
        await this.checkNewRecordField(id, 2, name);
    }

    async checkNewRecordLastName(id, lastname) {
        await this.checkNewRecordField(id, 1, lastname);
    }

    async checkNewRecordDependent(id, dependentNum) {
        await this.checkNewRecordField(id, 3, String(dependentNum));
    }

    async checkNewRecordSalary(id) {
        const salary = (salaryPerPaycheck * paychecksPerYear).toFixed(2);
        await this.checkNewRecordField(id, 4, salary);
    }

    async checkNewRecordGrossPay(id) {
        await this.checkNewRecordField(id, 5, salaryPerPaycheck.toFixed(2));
    }

    async checkNewRecordBenefitsCost(id, dependentNum) {
        const benefitsCost = this.calculateBenefitsCost(dependentNum);
        await this.checkNewRecordField(id, 6, benefitsCost);
    }

    async checkNewRecordNetPay(id, dependentNum) {
        const netPay = this.calculateNetPayPerPaycheck(dependentNum);
        await this.checkNewRecordField(id, 7, netPay);
    }

    async checkBenefitsCost(name, dependentNum) {
        const benefitsCost = this.calculateBenefitsCost(dependentNum);
        await this.checkNewRecordField(name, 6, benefitsCost);
    }

    async checkRecordNetPay(name, dependentNum) {
        const netPay = this.calculateNetPayPerPaycheck(dependentNum);
        await this.checkNewRecordField(name, 7, netPay);
    }

    calculateBenefitsCost(dependentNum) {
        return ((employeeBenefitsCost + (dependentBenefitsCost * dependentNum)) / paychecksPerYear).toFixed(2);
    }

    calculateNetPayPerPaycheck(dependentNum) {
        return (salaryPerPaycheck - (employeeBenefitsCost + (dependentBenefitsCost * dependentNum)) / paychecksPerYear).toFixed(2);
    }

    //Update Record Methods
    async clickUpdateRecord(id) {
        await this.table.locator('tr', { hasText: id }).locator('.fa-edit').click();
    }

    async clickUpdateRandomRecord() {
        await this.tableRow.first().waitFor({ state: 'visible' });
        const tableRowsCount = await this.tableRow.count();

        if (tableRowsCount === 0) {
            throw new Error('No rows available to select for update.');
        }

        const index = tableRowsCount === 1 ? 0 : Math.floor(Math.random() * tableRowsCount);
        await this.tableRow.nth(index).locator('.fa-edit').click();
    }

    //Delete Record Methods
    async clickDeleteRecordButton(id) {
        await this.table.locator('tr', { hasText: id }).locator('.fa-times').click();
    }

    async checkDeletedRecord(id) {
        await this.page.waitForTimeout(5000);
        const rows = this.table.locator('tr');
        for (let i = 0; i < await rows.count(); i++) {
            const row = rows.nth(i);
            const cells = row.locator('td');
            const cellTexts = await cells.allTextContents();
            const isIdPresent = cellTexts.some(text => text.includes(id));
            if (isIdPresent) {
                throw new Error(`Record with id ${id} is still present in the table.`);
            }
        }
    }

    async clickDeleteRandomRecord() {
        await this.tableRow.first().waitFor({ state: 'visible' });
        const tableRowsCount = await this.tableRow.count();

        if (tableRowsCount === 0) {
            throw new Error('No rows available to select for delete.');
        }

        const index = tableRowsCount === 1 ? 0 : Math.floor(Math.random() * tableRowsCount);
        await this.tableRow.nth(index).locator('.fa-times').click();
    }
};
