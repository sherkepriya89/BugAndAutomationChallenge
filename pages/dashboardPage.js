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
        const tableRow = this.table.locator('tr', { hasText: name });
        const id = await (tableRow.locator('td').nth(0)).textContent();
        return id;
    }

    async checkNewRecordFirstName(id, name) {
        const tableRow = this.table.locator('tr', { hasText: id });
        await expect(tableRow.locator('td').nth(2)).toHaveText(name);
    }

    async checkNewRecordLastName(id, lastname) {
        const tableRow = this.table.locator('tr', { hasText: id });
        await expect(tableRow.locator('td').nth(1)).toHaveText(lastname);
    }

    async checkNewRecordDependant(id, dependantNum) {
        const tableRow = this.table.locator('tr', { hasText: id });
        await expect(tableRow.locator('td').nth(3)).toHaveText(String(dependantNum));
    }

    async checkNewRecordSalary(id) {
        const tableRow = this.table.locator('tr', { hasText: id });
        await expect(tableRow.locator('td').nth(4)).toHaveText(String((salaryPerPaycheck * paychecksPerYear).toFixed(2)));
    }

    async checkNewRecordGrossPay(id) {
        const tableRow = this.table.locator('tr', { hasText: id });
        await expect(tableRow.locator('td').nth(5)).toHaveText(String(salaryPerPaycheck.toFixed(2)));
    }

    async checkNewRecordBenefitsCost(id, dependantNum) {
        const benefitsCost = await this.calcBenefitsCost(dependantNum);
        const tableRow = this.table.locator('tr', { hasText: id });
        await expect(tableRow.locator('td').nth(6)).toHaveText(String(benefitsCost));
    }

    async checkNewRecordNetPay(id, dependantNum) {
        const netPayPerPaycheck = await this.calcnetPayPerPaycheck(dependantNum);
        const tableRow = this.table.locator('tr', { hasText: id });
        await expect(tableRow.locator('td').nth(7)).toHaveText(String(netPayPerPaycheck));
    }

    async checkBenefitsCost(name, dependantNum) {
        const benefitsCost = await this.calcBenefitsCost(dependantNum);
        const tableRow = this.table.locator('tr', { hasText: name });
        await expect(tableRow.locator('td').nth(6)).toHaveText(String(benefitsCost));
    }

    async checkRecordNetPay(name, dependantNum) {
        const netPayPerPaycheck = await this.calcnetPayPerPaycheck(dependantNum);
        const tableRow = this.table.locator('tr', { hasText: name });
        await expect(tableRow.locator('td').nth(7)).toHaveText(String(netPayPerPaycheck));
    }

    async calcBenefitsCost(dependantNum) {
        return ((employeeBenefitsCost + (dependentBenefitsCost * dependantNum)) / paychecksPerYear).toFixed(2);
    }

    async calcnetPayPerPaycheck(dependantNum) {
        return ((salaryPerPaycheck) - ((employeeBenefitsCost + (dependentBenefitsCost * dependantNum)) / paychecksPerYear)).toFixed(2);
    }

    async clickUpdateRecordButton(id) {
        const tableRow = this.table.locator('tr', { hasText: id });
        await tableRow.locator('.fa-edit').click();
    }

    async clickDeleteRecordButton(id) {
        const tableRow = this.table.locator('tr', { hasText: id });
        await tableRow.locator('.fa-times').click();
    }

    async checkDeletedRecord(id) {
        await this.page.waitForTimeout(500);
        await this.table.locator('tr').forEach(async (row) => {
            await expect(row.locator('td')).not.toContainText(id);
        });
    }

    async checkDashboardPageElements() {
        await expect(this.page).toHaveURL(`/Prod/Benefits/`);
        await expect(this.logo).toHaveAttribute('href', '/Prod/Benefits');
        await expect(this.logOutButton).toHaveAttribute('href', '/Prod/Account/LogOut');
        await expect(this.copyright).toHaveText('© 2024 - Paylocity');
    }

    async clickUpdateRandomRecord() {
        const tableRows = await this.table.locator('tr').count();
        const randomRow = faker.datatype.int({
            min: 0,
            max: tableRows - 1,
        });
        const row = this.table.locator('tr').nth(randomRow);
        await row.locator('.fa-edit').click();
    }
};
