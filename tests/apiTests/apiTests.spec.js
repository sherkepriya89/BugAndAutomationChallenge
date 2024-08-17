const { test, expect } = require('@playwright/test');
require('dotenv').config();
const dataSet = require('../../utils/data.json');
const crypto = require('crypto'); // Ensure crypto module is required if used

let employeeId;
const baseUrl = `${process.env.API_URL}/employees`;
const headers = {
    'Authorization': `Basic ${process.env.TOKEN}`,
    'Content-Type': 'application/json'
};

const requestBody = {
    firstName: "Priya",
    lastName: "Sherke",
    dependents: 10
};

// Utility function to create a new employee and save the ID
async function createEmployee(request) {
    const response = await request.post(baseUrl, { data: requestBody, headers });
    const responseBody = await response.json();
    return responseBody.id;
}

// Before each test, ensure we have an employee ID
test.beforeEach(async ({ request }) => {
    if (!employeeId) {
        employeeId = await createEmployee(request);
    }
});

// Test Suite for API Status Code
test.describe('API Status Code Test Suite', () => {
    test('Get employee list', async ({ request }) => {
        const response = await request.get(baseUrl, { headers });
        expect(response.status()).toBe(200);
    });

    test('Verify create employee status code', async ({ request }) => {
        const response = await request.post(baseUrl, { data: requestBody, headers });
        expect(response.status()).toBe(201); // Status code for successful creation
    });

    test('Update employee details', async ({ request }) => {
        const updatedData = {
            firstName: "New",
            lastName: "User Edit"
        };
        const response = await request.post(baseUrl, { data: { id: employeeId, ...updatedData }, headers });
        expect(response.status()).toBe(200);
    });

    test('Get specific employee by ID', async ({ request }) => {
        const response = await request.get(`${baseUrl}/${employeeId}`, { headers });
        expect(response.status()).toBe(200);
    });

    test('Delete specific employee by ID', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/${employeeId}`, { headers });
        expect(response.status()).toBe(200);
    });
});

// Test Suite for API Response Validation
test.describe('API Response Validation Test Suite', () => {
    test('Get employee list', async ({ request }) => {
        const response = await request.get(baseUrl, { headers });
        const employees = await response.json();
        expect(Array.isArray(employees)).toBeTruthy();
        expect(employees.length).toBeGreaterThan(0);
    });

    test('Create employee and save ID from response', async ({ request }) => {
        const response = await request.post(baseUrl, { data: requestBody, headers });
        const responseBody = await response.json();
        employeeId = responseBody.id;
        expect(responseBody).toHaveProperty('id');
    });

    test('Update employee details', async ({ request }) => {
        const updatedData = {
            firstName: "User",
            lastName: "Edit"
        };
        const response = await request.post(baseUrl, { data: { id: employeeId, ...updatedData }, headers });
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('firstName', updatedData.firstName);
        expect(responseBody).toHaveProperty('lastName', updatedData.lastName);
    });

    test('Get specific employee by ID', async ({ request }) => {
        const response = await request.get(`${baseUrl}/${employeeId}`, { headers });
        const employee = await response.json();
        expect(employee).toHaveProperty('id', employeeId);
        expect(employee).toHaveProperty('firstName');
        expect(employee).toHaveProperty('lastName');
    });

    test('Delete specific employee by ID', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/${employeeId}`, { headers });
        const responseBody = await response.text();
        expect(responseBody).toBe('');
    });
});

// Test Suite for API Negative Scenarios
test.describe('API Negative Test Suite', () => {
    test('Get employee with invalid ID', async ({ request }) => {
        const invalidEmployeeId = crypto.randomUUID(); // Generating a random UUID
        const response = await request.get(`${baseUrl}/${invalidEmployeeId}`, { headers });
        expect(response.status()).toBe(404);
        const errorResponse = await response.json();
        expect(errorResponse).toHaveProperty('errorMessage');
    });

    test('Edit employee with invalid ID', async ({ request }) => {
        const invalidEmployeeId = crypto.randomUUID();
        const updatedData = {
            id: invalidEmployeeId,
            firstName: "New",
            lastName: "User Edit"
        };
        const response = await request.post(baseUrl, { data: updatedData, headers });
        expect(response.status()).toBe(400);
    });

    test('Delete employee with invalid ID', async ({ request }) => {
        const invalidEmployeeId = crypto.randomUUID();
        const response = await request.delete(`${baseUrl}/${invalidEmployeeId}`, { headers });
        expect(response.status()).toBe(400);
        const responseBody = await response.text();
        expect(responseBody).toBe('');
    });

    test('Create employee with invalid first name', async ({ request }) => {
        const { firstMax } = dataSet;
        const response = await request.post(baseUrl, {
            data: {
                firstName: firstMax.firstName,
                lastName: firstMax.lastName,
                dependants: firstMax.dependants
            },
            headers
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(firstMax.status);
        expect(responseBody).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    errorMessage: firstMax.errorMessage
                })
            ])
        );
    });

    test('Create employee with invalid last name', async ({ request }) => {
        const { lastMax } = dataSet;
        const response = await request.post(baseUrl, {
            data: {
                firstName: lastMax.firstName,
                lastName: lastMax.lastName,
                dependants: lastMax.dependants
            },
            headers
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(lastMax.status);
        expect(responseBody).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    errorMessage: lastMax.errorMessage
                })
            ])
        );
    });

    test('Create employee with invalid dependents', async ({ request }) => {
        const { dependantsMax } = dataSet;
        const response = await request.post(baseUrl, {
            data: {
                firstName: dependantsMax.firstName,
                lastName: dependantsMax.lastName,
                dependants: dependantsMax.dependants
            },
            headers
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(dependantsMax.status);
        expect(responseBody).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    errorMessage: dependantsMax.errorMessage
                })
            ])
        );
    });
});
