Below is the report for the UI bugs found during testing of Benefits Dashboard.
1) First Name and Last Name are incorrectly displayed.
2) The benefits page can be accessed without username and passwordif the url is known.
3) If there is an error occured on the page, all the employees on the dashboard page are not shown.
4)UI does not show any error when trying to add dependents more than 32 or less than 0
5)There is no error message when first name last name and dependents are kept blank.
6)If there is any inactivity on the page for more than 10 mins, and tried to send some request it says unauthorized but you are on the same page. if the page is refreshed, the log off button disappears.
7) If tried to add first and last name (cross site scripting) it shows empty first and last name.
8) All special characters are allowed in the first and last name.
9) No error message for decimals, other characters in dependents field.
10) Clicking Enter or Return on mac should click the add button.
11) Clicking add button quickly multiple times adds the employees multiple times.
12) Edit Employee window says Add Employee.
13) Resizing the window does not resize the table border.
14)When dev tools is open and page is refreshed, the employees disappear.
15)When dev tools is open and page is refreshed, if tried to add an employee, it gives unauthorized error.
16) If the application is open in two browser, if you update the name in one browser and dependents in other, the update is not displayed correctly on firefox even after it is refreshed.
17) Cancel button color does not changes when hovered over.
18)pUTTING iNCORRECT USERNAME AND PASSWORD GIVES different page instead of showing errors.
19) Users are sorted using ids not first or last name.
20) There is no limit logging attempts.