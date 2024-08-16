const { test, expect } = require('@playwright/test');
require('dotenv').config();

let employeeId;
const requestBody = {
    firstName: "Priya",
    lastName: "Sherke",
    dependants: 10
};
const baseUrl = `${process.env.API_URL}/employees`;
const headers = {
    'Authorization': `Basic ${process.env.TOKEN}`,
    'Content-Type': 'application/json'
};


// Before each test, ensure we have an employee ID
test.beforeEach(async ({ request }) => {
    if (!employeeId) {
        const response = await request.post(baseUrl, { data: requestBody, headers });
        const responseBody = await response.json();
        employeeId = responseBody.id;
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
            id: employeeId,
            firstName: "New",
            lastName: "User Edit"
        };
        const response = await request.post(baseUrl, { data: updatedData, headers });
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
            id: employeeId,
            firstName: "User",
            lastName: "Edit"
        };
        const response = await request.post(baseUrl, { data: updatedData, headers });
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

    test('Update employee with invalid ID', async ({ request }) => {
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
});
