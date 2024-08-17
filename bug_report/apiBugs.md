# Benefits Dashboard Bugs Report

Below are the bugs found during API testing:
1. [GET and DELETE with non-existing id gives 200 status code and empty response body](#bug-1-get-and-delete-with-non-existing-id-gives-200-status-code-and-empty-response-body)
2. [PUT is allowed on the deleted record and salary turns to 0](#bug-2-put-request-allowed-on-deleted-record-resulting-in-salary-is-set-to-0)
3. [SALARY can be changed with PUT request](#bug-3-salary-can-be-changed-with-put-request)
4. [GET with invalid id gives 500 status code instead of 400](#bug-4-get-with-invalid-id-gives-500-status-code-instead-of-400)
5. [Expiration date allowed in POST requests](#bug-5-expiration-date-allowed-in-post-requests)
6. [Expiration date allowed in PUT requests](#bug-6-expiration-date-allowed-in-put-requests)
7. [Dependents is misspelled in JSON response](#bug-7-dependents-is-misspelled-in-json-response)
---
## Bug 1: GET and DELETE with non-existing id gives 200 status code and empty response body.

**Priority:** High

**Description:**
When sending GET or DELETE requests with a non-existing employee ID, the API returns a 200 status code and an empty response body. The expected behavior is a 404 status code indicating that the resource was not found.

**Steps to reproduce:**

1. Send a POST request to the endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees
2. Add headers - "Content-Type": "application/json" and "Authorization": "Basic VGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
3. Add the following JSON object to the request body:
  {
    "firstName": "Priya",
    "lastName": "Sherke",
    "dependants": 23
    }
4. Save id from the response body.
5. Send a DELETE request to the endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/{{id}} (replace {{id}} with the saved ID from step 4).
6. Add headers - "Authorization": "Basic VGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
7. Send the request.
8. Send a GET request to the same endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/{{id}}.
9. Add the same headers as above.

**Expected result:** The GET and DELETE requests should return a 404 status code and an error message indicating that the employee with the provided ID does not exist.

**Actual result:** The GET and DELETE requests return a 200 status code with an empty response body.

**Attachments:**

![](APIBug1.gif)

---
## Bug 2: PUT Request Allowed on Deleted Record, Resulting in Salary is Set to 0

**Priority:** High

**Description:**
When a PUT request is sent to update a deleted employee record, the API allows the update, and the employee's salary is incorrectly set to 0. The expected behavior is for the request to return a 404 status code indicating that the record no longer exists.

**Steps to reproduce:**

1. Send a POST request to the endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees.
2. Add headers - "Content-Type": "application/json" and "Authorization": "Basic VGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
3. Add the following JSON object to the request body:
  {
    "firstName": "Priya",
    "lastName": "Sherke",
    "dependants": 23
    }
4. Save id from the response body.
5. Send a DELETE request to the endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/{{id}} (replace {{id}} with the saved ID from step 4).
6. Add headers - "Authorization": "Basic VGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
7. Send the request.
8. Send a PUT request to the same endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/{{id}}.
9. Add headers - "Authorization": "Basic VVGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
10. Send the request.

**Expected result:** The PUT request should return a 404 status code and an error message indicating that the record does not exist because it has been deleted.

**Actual result:** The PUT request is allowed, and the employee's salary is incorrectly reset to 0 in the response.

**Attachments:**

![](APIBug2.gif)

---
## Bug 3: Salary can be changed with PUT Request.

**Priority:** High

**Description:**
The salary value, which is supposed to be 52000 based on predefined rules, can be manually changed through a PUT request. 

**Steps to reproduce:**

1. Send a POST request to the endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees.
2. Add headers - "Content-Type": "application/json" and "Authorization": "Basic VGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
3. Add the following JSON object to the request body:
  {
    "firstName": "Priya",
    "lastName": "Sherke",
    "dependants": 23
    }
4. Save id from the response body.
5. Send a PUT request to the same endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/{{id}}.
6. Add headers - "Authorization": "Basic VVGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
7. Add the following JSON object to the request body:
  {
    "firstName": "Priya",
    "lastName": "Sherke",
    "dependants": 5,
    "salary": 87000,
    }
8. Send the request.

**Expected result:** The salary field should be immutable and should not be altered by a direct PUT request. Any attempt to update the salary should be ignored or result in an error response.

**Actual result:** The salary is successfully updated to the value provided in the PUT request, overriding the predefined rules.

**Attachments:**

![](APIBug3.gif)

---
## Bug 4: GET with invalid id gives 500 status code instead of 400.

**Priority:** High

**Description:**
When sending a GET request to retrieve an employee using an invalid ID, the API returns a 500 Internal Server Error status code. This is incorrect behavior as the API should return a 400 Bad Request status code indicating that the ID is invalid or does not exist.

**Steps to reproduce:**

1. Send a GET request to retrieve an employee using an invalid ID: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/6gvfygh.
2. Add header - "Authorization": "Basic VGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
3. Send the request.

**Expected result:** The API should return a 400 status code with an appropriate error message indicating that the ID is invalid or does not exist.

**Actual result:** The API returns a 500 status code, which indicates a server error rather than a client error, leading to confusion about the actual issue.

**Attachments:**

![](APIBug4.gif)

---
## Bug 5: Expiration date allowed in POST requests.

**Priority:** High

**Description:**
When sending a POST request to create a new employee, including an expiration field in the request body, the API accepts the field and creates a new record with it. The expiration field should either be ignored or cause the request to be rejected.

**Steps to reproduce:**

1. Send a POST request to the endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees.
2. Add headers - "Content-Type": "application/json" and "Authorization": "Basic VGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
3. Add the following JSON object to the request body:
  {
    "firstName": "Priya",
    "lastName": "Sherke",
    "dependants": 23,
    "expiration":"2023-10-20T10:59:36+00:00"
    }
4. Send the request.

**Expected result:** The request should be rejected or the expiration field should be ignored.

**Actual result:** The expiration field successfully creates a new record with this field included.

**Attachments:**

![](APIBug5.gif)

---
## Bug 6: Expiration date allowed in PUT requests.

**Priority:** High

**Description:**
The expiration field is incorrectly modifiable through a PUT request, even though it should be immutable.

**Steps to reproduce:**

1. Send a GET request to the endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees.
2. Add headers - "Content-Type": "application/json" and "Authorization": "Basic VGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
3. Add the following JSON object to the request body:
  {
    "firstName": "Priya",
    "lastName": "Sherke",
    "dependants": 23
    }
4. Send the Request.
4. Save id from the response body.
5. Send a PUT request to the same endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/{{id}}.
6. Add headers - "Authorization": "Basic VVGVzdFVzZXI0MTk6TnokcGx7fSQ2MXNp"
7. Add the following JSON object to the request body:
  {
    "firstName": "Priya",
    "lastName": "Sherke",
    "dependants": 5,
    "expiration": 2021-10-20T10:59:36+00:00
    }
8. Send the request.

**Expected result:** The expiration field should be immutable and should not be alterable by a PUT request. Any attempt to update this field should be ignored or result in an error response.

**Actual result:** The expiration field is successfully updated through the PUT request.

**Attachments:**

![](APIBug6.gif)

---
## Bug 7: Dependents is mispelled in JSON response.

**Priority:** Medium

**Description:**
The field "dependents" is misspelled in the JSON response from the API. It is incorrectly displayed as "dependants."

**Steps to reproduce:**

1. Send a GET request to the endpoint: https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/{{id}}.
2. Add the necessary headers, if required.
3. Observe the JSON response.

**Expected result:** The field name should be "dependents."

**Actual result:** The field name is incorrectly spelled as "dependants."

**Attachments:**

![](APIBug7.png)
