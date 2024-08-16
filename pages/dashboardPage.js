const { expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
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

    async checkNewRecordDependant(id, dependantNum) {
        await this.checkNewRecordField(id, 3, String(dependantNum));
    }

    async checkNewRecordSalary(id) {
        const salary = (salaryPerPaycheck * paychecksPerYear).toFixed(2);
        await this.checkNewRecordField(id, 4, salary);
    }

    async checkNewRecordGrossPay(id) {
        await this.checkNewRecordField(id, 5, salaryPerPaycheck.toFixed(2));
    }

    async checkNewRecordBenefitsCost(id, dependantNum) {
        const benefitsCost = this.calculateBenefitsCost(dependantNum);
        await this.checkNewRecordField(id, 6, benefitsCost);
    }

    async checkNewRecordNetPay(id, dependantNum) {
        const netPay = this.calculateNetPayPerPaycheck(dependantNum);
        await this.checkNewRecordField(id, 7, netPay);
    }

    async checkBenefitsCost(name, dependantNum) {
        const benefitsCost = this.calculateBenefitsCost(dependantNum);
        await this.checkNewRecordField(name, 6, benefitsCost);
    }

    async checkRecordNetPay(name, dependantNum) {
        const netPay = this.calculateNetPayPerPaycheck(dependantNum);
        await this.checkNewRecordField(name, 7, netPay);
    }

    calculateBenefitsCost(dependantNum) {
        return ((employeeBenefitsCost + (dependentBenefitsCost * dependantNum)) / paychecksPerYear).toFixed(2);
    }

    calculateNetPayPerPaycheck(dependantNum) {
        return (salaryPerPaycheck - (employeeBenefitsCost + (dependentBenefitsCost * dependantNum)) / paychecksPerYear).toFixed(2);
    }

    async clickUpdateRecord(id) {
        await this.table.locator('tr', { hasText: id }).locator('.fa-edit').click();
    }

    async clickDeleteRecordButton(id) {
        await this.table.locator('tr', { hasText: id }).locator('.fa-times').click();
    }

    async checkDeletedRecord(id) {
        await this.page.waitForTimeout(500);
        const rows = this.table.locator('tr');
        for (let i = 0; i < await rows.count(); i++) {
            const row = rows.nth(i);
            await expect(row.locator('td')).not.toContainText(id);
        }
    }

    async checkDashboardPageElements() {
        await expect(this.page).toHaveURL(`/Prod/Benefits/`);
        await expect(this.logo).toHaveAttribute('href', '/Prod/Benefits');
        await expect(this.logOutButton).toHaveAttribute('href', '/Prod/Account/LogOut');
        await expect(this.copyright).toHaveText('© 2024 - Paylocity');
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
};
