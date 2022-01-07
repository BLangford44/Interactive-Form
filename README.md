# Interactive-Form
## Introduction:
This project is an interactive registration form for a Full Stack Conference.


## Technologies Used
* HTML - provided by Treehouse
* CSS - provided by Treehouse 
* JaveScript - Written by Brandon Langford
* Regular Expressions

## Features
### Basic Info
* "Name:" is a required field and form will not submit if this input is blank.  Input validates in real time and will show an error message to the user if form is submitted while field is blank.
* Name field will display: "Name field cannot be blank" if input is left blank.
* Name field will display: "Name field cannot contain numbers" if input contains any numbers or special characters
*  "Email Address:" is a required field.  Code uses Regex to validate email address format and will not allow submission without a validated email.
* "Other job role?" input field will appear when "Other" selected from "Job Role" Selector

### T-Shirt Info
* Color selector enabled and returns custom selector options based on the t-shirt design selected.

### Register for Activites
* User must select at least one activity before form may be submitted.  If user submits form with no activity selected, the user will be shown an error message.
* Total will update based upon the costs of the activities selected.
* Code will prevent the user from selecting multiple activites that have conflicting time/dates.

### Payment Info
* Input fields update based on the selected payment method.  
* If Credit Card is selected: Card Number, Zip Code, and CVV become required fields. These fields will show an error message to the user if the form is submitted with an invalid input.
* Card Number, Zip Code, and CVV will validate entries in real time and show error messages to user.
* If the "Registration" button is clicked while a required input is invalid, form will not submit, and will show the user an error message.

