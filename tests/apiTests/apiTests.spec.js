const { test, expect } = require('@playwright/test');

test.describe('Employee API Test Suite', () => {
    const baseURL = 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic VGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp', // Replace {{token}} with the actual token or use environment variables.
    };

    // GET Request: Get All Employees
    test('Get All Employees', async ({ request }) => {
        const response = await request.get(baseURL, { headers });

        // Assertions
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
    });

    // GET Request: Get Employee by ID
    test('Get Employee by ID', async ({ request }) => {
        const employeeId = `1731b4ed-b36b-474d-8c05-1a0eb9bc661c`; // Set a valid employee ID
        const response = await request.get(`${baseURL}/${employeeId}`, { headers });

        // Assertions
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id', employeeId);
        expect(responseBody).toHaveProperty('firstName');
        expect(responseBody).toHaveProperty('lastName');
    });

    // POST Request: Add New Employee
    test('Add New Employee', async ({ request }) => {
        const response = await request.post(baseURL, {
            headers,
            data: {
                firstName: 'John',
                lastName: 'Doe',
                dependants: 3
            },
        });

        // Assertions
        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');
        expect(responseBody.firstName).toBe('John');
        expect(responseBody.lastName).toBe('Doe');
        expect(responseBody.dependants).toBe(3);
    });

    // POST Request: Add Employee - Invalid Data
    test('Add Employee - Invalid Data', async ({ request }) => {
        const response = await request.post(baseURL, {
            headers,
            data: {
                firstName: '', // Invalid first name
                lastName: 'Doe',
                dependants: 3
            },
        });

        // Assertions
        expect(response.status()).toBe(400); // Expecting a Bad Request due to invalid data
        const responseBody = await response.json();
        expect(responseBody.message).toContain('FirstName is required');
    });

    // DELETE Request: Delete Employee by ID
    test('Delete Employee by ID', async ({ request }) => {
        const employeeId = 1; // Set a valid employee ID
        const response = await request.delete(`${baseURL}/${employeeId}`, { headers });

        // Assertions
        expect(response.status()).toBe(204); // Expecting No Content status on successful deletion
    });

    // DELETE Request: Delete Employee with Invalid ID
    test('Delete Employee - Invalid ID', async ({ request }) => {
        const invalidEmployeeId = 99999; // Set an invalid employee ID
        const response = await request.delete(`${baseURL}/${invalidEmployeeId}`, { headers });

        // Assertions
        expect(response.status()).toBe(404); // Expecting Not Found status for invalid ID
        const responseBody = await response.json();
        expect(responseBody.message).toContain('Employee not found');
    });

    const { test, expect, request } = require('@playwright/test');

    test.describe('Employee API Tests', () => {

        const baseURL = 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic {{token}}',  // Replace {{token}} with the actual token or use environment variables.
        };

        // Test Case: Add Employee with Invalid Last Name
        test('Add Employee - Invalid lastName', async ({ request }) => {
            const response = await request.post(baseURL, {
                headers,
                data: {
                    "firstName": "New",
                    "lastName": "Employee The field LastName must be a string with a maximum length of 50",
                    "dependants": 7
                },
            });

            // Assertions
            expect(response.status()).toBe(400);
            const responseBody = await response.json();
            expect(responseBody.message).toContain('LastName must be a string with a maximum length of 50');
        });

        // Test Case: Add Employee with Invalid First Name
        test('Add Employee - Invalid firstName', async ({ request }) => {
            const response = await request.post(baseURL, {
                headers,
                data: {
                    "firstName": "New - The field FirstName must be a string with a maximum length of 50",
                    "lastName": "Employee",
                    "dependants": 7
                },
            });

            // Assertions
            expect(response.status()).toBe(400);
            const responseBody = await response.json();
            expect(responseBody.message).toContain('FirstName must be a string with a maximum length of 50');
        });

        // Test Case: Add Employee with Invalid Dependants
        test('Add Employee - Invalid dependants', async ({ request }) => {
            const response = await request.post(baseURL, {
                headers,
                data: {
                    "firstName": "New",
                    "lastName": "Employee",
                    "dependants": "abc"
                },
            });

            // Assertions
            expect(response.status()).toBe(400);
            const responseBody = await response.json();
            expect(responseBody.message).toContain('Dependants must be a valid number');
        });

        // Test Case: Add Employee with Excessive Dependants
        test('Add Employee - Invalid dependants Num', async ({ request }) => {
            const response = await request.post(baseURL, {
                headers,
                data: {
                    "firstName": "New",
                    "lastName": "Employee",
                    "dependants": 33
                },
            });

            // Assertions
            expect(response.status()).toBe(400);
            const responseBody = await response.json();
            expect(responseBody.message).toContain('Dependants must be within allowed range');
        });
    });

});
