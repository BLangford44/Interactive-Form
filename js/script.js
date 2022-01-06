

/*

JOB FIELD SECTION

*/

const nameField = document.getElementById('name'); // Name Field
nameField.focus(); //Focus on form loading

const otherJobRoleField = document.getElementById('other-job-role'); // Other Job Role Field
otherJobRoleField.style.display = 'none'; // Hide 'Other Job Role' field unless "Other" selected in "Job Role" field

const jobRoleSelector = document.getElementById('title'); //Job Role Selector

/*
Change Event:
- Will display Other Job Field if 'other' is selected from Job Role selector
- Will remove from display if Job Role changed to something other than 'other'
*/

jobRoleSelector.addEventListener('change', (event) => {

    const fieldChanged = event.target;
    const selectedValue = fieldChanged.value;

    if (selectedValue === 'other') {
        otherJobRoleField.style.display = '';
    } else {
        otherJobRoleField.style.display = 'none';
    }; // End If Statement
}); // End Event Listener

/*

'T-SHIRT INFO' SECTION

*/

// Color Menu Element
const colorMenu = document.getElementById('color');
colorMenu.disabled = true;

const colorOptions = colorMenu.children
// Design Menu Element
const designMenu = document.getElementById('design');

/*
Change Event:
- Will display Other Job Field if 'other' is selected from Job Role selector
- Will remove from display if Job Role changed to something other than 'other'
*/

designMenu.addEventListener('change', (event) => {
    const fieldChanged = event.target;

    // Enabled Color Select Menu
    colorMenu.disabled = false;

    // Loop over children of Color Select
    for (let i = 0; i < colorOptions.length; i++) {

        let colorChild = colorOptions[i];
        let designFieldVal = fieldChanged.value;
        let dataTheme = colorChild.getAttribute('data-theme');

        if (designFieldVal === dataTheme) {
            colorChild.hidden = false;
            colorChild.selected = true;

        } else {
            colorChild.hidden = true;
            colorChild.selected = false;
        }; // End IF statment
    } // End For Loop
}); // End Event Listener

/*

'REGISTER FOR ACTIVITIES' SECTION

*/

// Register for Activities Field Set
const register = document.getElementById('activities');

// Total paragraph element
const totalPElement = document.getElementById('activities-cost');
let totalCost = 0;

/*
Change Event:
- Will Calculate the cost of all activities selected and changed the p element to the total value
*/

register.addEventListener('change', (event) => {

    let changedElement = event.target
    let cost = +changedElement.getAttribute('data-cost');
    let isChecked = changedElement.checked;

    if (isChecked) {
        totalCost += cost; // Add cost of checked activity to total
    } else {
        totalCost -= cost; // Subtract unchecked activity from total
    }; //End if statement

    totalPElement.innerHTML = `$${totalCost}`; // Change HTML of the activities-cost element to reflect new price
}); // End Event Listener

/*
Activity Box Accessibility Features
*/

const activityBoxes = document.querySelectorAll("input[type='checkbox']")


activityBoxes.forEach((checkbox) => {

    let checkParent = checkbox.parentElement;

    /*
    Focus/Blur Event:
    - Will Add/Remove the 'focus' class form the checkboxes depending on focus/blur
    */

    // Add focus class to parent element
    checkbox.addEventListener('focus', () => checkParent.classList.add('focus'));
    // Remove focus class from parent element)
    checkbox.addEventListener('blur', () => checkParent.classList.remove('focus'));

});// Add focus class to parent element


/*
    Click Event:
    - Disable checkbox if other activity w/ same Date and Time checked
    */

register.addEventListener('click', (event) => {
    const elementClicked = event.target;
    const type = elementClicked.type
    let matchArr = [];

    if (type === 'checkbox') {
        const dateAndTime = elementClicked.getAttribute('data-day-and-time');

        // Create Array of Matching Checkboxes
        activityBoxes.forEach((box) => {
            if (box.getAttribute('data-day-and-time') === dateAndTime) {
                matchArr.push(box)
            };
        });

        const isItemChecked = matchArr.reduce((isChecked, box) => {
            if (box.checked) {
                return true
            } else {
                return isChecked
            }

        }, false);

        if (isItemChecked) {

            matchArr.forEach((box) => {
                if (box.checked !== true) {
                    box.disabled = true;
                }
            });
        } else {
            matchArr.forEach((box) => {
                box.removeAttribute('disabled')
            });
        }
    };
});


/*

PAYMENT INFO SECTION

*/

// Pay With Select Element
const payWith = document.getElementById('payment');

// Payment Option Divs
const creditCard = document.getElementById('credit-card'); // Credit Card
payWith.children[1].selected = true; // Credit Card Options selected by default

const paypal = document.getElementById('paypal'); // Paypal 
paypal.hidden = true; // Hide Paypal

const bitcoin = document.getElementById('bitcoin'); // Bitcoin
bitcoin.hidden = true; // Hide Bitcoin

/*
Change Event:
- 
*/

payWith.addEventListener('change', (event) => {

    let changedElement = event.target;
    let selectedOptionIndex = changedElement.options.selectedIndex;
    let selectedOption = changedElement.children[selectedOptionIndex].value;

    if (selectedOption === creditCard.id) {

        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;

    } else if (selectedOption === paypal.id) {
        creditCard.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;
    } else {
        creditCard.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    };
});



/*

FORM VALIDATION

*/

/**
*
* VALIDATORS
*  
*/

// Validate Name - Can only contain letters a-z
function validateName(nameValue) {
    return nameValue !== '';
}

// Validate Email Address
function isValidEmail(email) {
    return /^[^@]*@[^@.]*\.[a-z]+$/i.test(email);
}
// Check for Activities - At least one activity checked
function isItemChecked(activities) {
    for (let i = 0; i < activities.length; i++) { // Loop through all activities
        let activityChild = activities[i].children[0].checked // Get each input field
        if (activityChild) {
            return true // If input is checked, return true
        }; // End if statement
    }; //End For Loop
    return false
}

// Validate CC only accepts number (13-16 digit numbers) | Only if credit card selected

function validateCC(ccNumber) {
    return /^[0-9]{13,16}$/.test(ccNumber);
}

// Validate CC only accepts number (13-16 digit numbers) | Only if credit card selected

function validateZip(zipNumber) {
    return /^[0-9]{5}$/.test(zipNumber)
}

// Validate cvv value (3 digits only)
function validateCVV(cvvNumber) {
    return /^[0-9]{3}$/.test(cvvNumber);
}

function formatValidationHTML(isValid, elementToFormat) {

    if (isValid) {
        elementToFormat.parentElement.classList.add('valid');
        elementToFormat.parentElement.classList.remove('not-valid');
        elementToFormat.parentElement.lastElementChild.hidden = true;
        showOrHideTip(false, elementToFormat.nextElementSibling)

    } else {
        elementToFormat.parentElement.classList.add('not-valid');
        elementToFormat.parentElement.classList.remove('valid');
        elementToFormat.parentElement.lastElementChild.hidden = false;
        showOrHideTip(true, elementToFormat.nextElementSibling)
    }
}

/*

Form Submit Event:

*/
const form = document.querySelector('form');
const activitiesBox = document.getElementById('activities-box');
const emailAddress = document.getElementById('email');
const ccNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvNumber = document.getElementById('cvv');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting w/ invalid name

    // Validate User Inputs
    const isNameValid = validateName(nameField.value); // Validate Name 
    const isEmailValid = isValidEmail(emailAddress.value); // Validate Email Address
    const isActivitySelected = isItemChecked(activitiesBox.children); // Validate one activity selected
    const isValidCc = validateCC(ccNumber.value); // Validate CC Number
    const isValidZip = validateZip(zipCode.value); // Validate zip
    const isValidCvv = validateCVV(cvvNumber.value); // Validate cvv value

    // Add 'valid'/'not-valid' class based on whether inputs are validated true/false
    formatValidationHTML(isNameValid, nameField);
    formatValidationHTML(isEmailValid, emailAddress);
    formatValidationHTML(isActivitySelected, activitiesBox);
    formatValidationHTML(isValidCc, ccNumber);
    formatValidationHTML(isValidZip, zipCode);
    formatValidationHTML(isValidCvv, cvvNumber);

    //Credit card selected
    const ccNotSelected = document.getElementById('payment').value !== 'credit-card'

    // Prevent Form from Resetting
    if (isNameValid &&
        isEmailValid &&
        isActivitySelected &&
        ccNotSelected) {

        // Place code for accepting BTC and Paypal here

    } else if (isNameValid &&
        isEmailValid &&
        isActivitySelected &&
        isValidCc &&
        isValidCvv &&
        isValidZip) {

        // Place code for accepting credit cards here

    } else {
        event.preventDefault(); // Prevent form from submitting w/ invalid name
    };// End If Statement
});

// /*
// Real Time Validation

// */

function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
        element.style.display = "inherit";
    } else {
        element.style.display = "none";
    }
}


function createListener(validator) {
    return e => {
        const text = e.target.value;
        const valid = validator(text);
        const showTip = text !== "" && !valid;
        const tooltip = e.target.nextElementSibling;
        showOrHideTip(showTip, tooltip);
    };
}

// Real time form validation
emailAddress.addEventListener("input", createListener(isValidEmail));
ccNumber.addEventListener("input", createListener(validateCC));
zipCode.addEventListener("input", createListener(validateZip));
cvvNumber.addEventListener("input", createListener(validateCVV));