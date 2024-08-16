const { test, expect } = require('../../utils/fixtures.js');
const { faker } = require('@faker-js/faker');

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const dependantNum = faker.number.int({ min: 0, max: 32 });

test.describe('Dashboard Test Suite', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goToLoginPage(process.env.URL);
        await loginPage.validLogin(process.env.USERNAME, process.env.PASSWORD);
    });


});
