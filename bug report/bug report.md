# Benefits Dashboard UI Bugs Report

## Table of Contents
1. [First Name and Last Name are incorrectly displayed](#bug-1-first-name-and-last-name-are-incorrectly-displayed)
2. [Employees Table Displays Empty When Developer Tools Are Open and Page is Refreshed](#bug-2-employees-table-displays-empty-when-developer-tools-are-open-and-page-is-refreshed-logout-button-disappears-on-second-refresh)
3. [No Error Displayed When Adding More Than 32 or Less Than 0 Dependents (Form Fails Silently)](#bug-3-no-error-displayed-when-adding-more-than-32-or-less-than-0-dependents-form-fails-silently)
4. [The benefits page can be accessed without username and password if the url is known](#the-benefits-page-can-be-accessed-without-username-and-password-if-the-url-is-known)
5. [If developer tool is open, the dashboard page shows empty employees table](#if-developer-tool-is-open-the-dashboard-page-shows-empty-employees-table)
6. [UI does not show any error when trying to add dependents more than 32 or less than 0](#ui-does-not-show-any-error-when-trying-to-add-dependents-more-than-32-or-less-than-0)
7. [All special characters are allowed in the first and last name](#all-special-characters-are-allowed-in-the-first-and-last-name)
8. [There is no error message when first name last name and dependents are kept blank](#there-is-no-error-message-when-first-name-last-name-and-dependents-are-kept-blank)
9. [If tried to add first and last name with <> it shows empty first and last name after saving](#if-tried-to-add-first-and-last-name-with-it-shows-empty-first-and-last-name-after-saving)
10. [No error message for decimals, other characters in dependents field](#no-error-message-for-decimals-other-characters-in-dependents-field)
11. [Clicking Enter or Return on mac should click the add button](#clicking-enter-or-return-on-mac-should-click-the-add-button)
12. [Clicking add button quickly multiple times adds the employees multiple times](#clicking-add-button-quickly-multiple-times-adds-the-employees-multiple-times)
13. [Edit Employee window says Add Employee](#edit-employee-window-says-add-employee)
14. [Resizing the window does not resize the table border](#resizing-the-window-does-not-resize-the-table-border)
15. [If the application is open in two browser, if you update the name in one browser and dependents in other, the update is not displayed correctly on firefox even after it is refreshed](#if-the-application-is-open-in-two-browser-if-you-update-the-name-in-one-browser-and-dependents-in-other-the-update-is-not-displayed-correctly-on-firefox-even-after-it-is-refreshed)
16. [Cancel button color does not change when hovered over](#cancel-button-color-does-not-change-when-hovered-over)
17. [Putting incorrect username and password gives different page instead of showing errors](#putting-incorrect-username-and-password-gives-different-page-instead-of-showing-errors)
18. [No option to sort the users](#no-option-to-sort-the-users)
19. [There is no limit to logging attempts](#there-is-no-limit-to-logging-attempts)

---

## Bug 1: First Name and Last Name are incorrectly displayed

**Priority:** High

**Description:**

The first name and last name are reversed in the employee table. The first name shows under last name column and last name shows under first name.

**Steps to reproduce:**

1. Navigate to <https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login>
2. Log in with valid credentials.
3. Click on "Add Employee" button.
4. Fill in First Name, Last Name, and Dependants.
5. Click "Add" button.

**Expected result:** The Employee table should display data accurately, with each column's content matching its respective header.

**Actual result:** The First Name and Last Name columns are swapped. The "First Name" column contains the Last Name, and the "Last Name" column contains the First Name.

**Attachments:**

![](Bug1.gif)

---

## Bug 2: Employees Table Displays Empty When Developer Tools Are Open and Page is Refreshed (Logout Button Disappears on Second Refresh)

**Priority:** High

**Description:**

When the browser's developer tools are open and the dashboard page is refreshed, the Employees table appears empty even if there are employees added. Additionally, refreshing the page a second time causes the logout button to disappear.

**Steps to Reproduce:**

1. Navigate to <https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login>
2. Log in with valid credentials.
3. Open the browser's developer tools by right-clicking and clicking Inspect.
4. Refresh the dashboard page.
5. Observe the Employees table.
6. Refresh the page again.
7. Observe the disappearance of the logout button.

**Expected Result:**

- The Employees table should display all employee records as expected, regardless of whether the developer tools are open, or the page is refreshed.
- The logout button should remain visible after refreshing the page.

**Actual Result:**

- The Employees table is empty when the page is refreshed with the developer tools open, even though employees have been added.
- Refreshing the page a second time causes the logout button to disappear.

**Attachments:**

![](Bug2.gif)

---

## Bug 3: No Error Displayed When Adding More Than 32 or Less Than 0 Dependents (Form Fails Silently)

**Priority:** High

**Description:**

The UI does not show any error or validation message when attempting to add more than 32 or less than 0 dependents while adding a new employee. The form fails silently after clicking the "Add" button, leaving the user confused as no feedback is provided. The issue is only noticeable when checking the API call.

**Steps to Reproduce:**

1. Navigate to <https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login>
2. Log in with valid credentials.
3. Click on the "Add Employee" button.
4. Fill in the First Name and Last Name fields.
5. Enter a number greater than 32 or less than 0 in the Dependents field.
6. Click the "Add" button.

**Expected Result:**

The system should display an error message indicating that the number of dependents must be between 0 and 32. The user should receive clear feedback when the input is invalid.

**Actual Result:**

The "Add" button does not trigger any action. The form remains unchanged, and no error or validation message is shown. The user is left unsure of what went wrong until inspecting the API call.

**Attachments:**

![](Bug3.gif)

---

*Continue with the remaining bugs in a similar format...*
