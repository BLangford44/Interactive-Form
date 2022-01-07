
/*
JOB FIELD SECTION
*/

const nameField = document.getElementById('name'); // Name Input Field
nameField.focus(); // Focus on form loading

const jobRoleSelector = document.getElementById('title'); //Job Role Selector
const otherJobRoleField = document.getElementById('other-job-role'); // Other Job Role Field
otherJobRoleField.style.display = 'none'; // Hide 'Other Job Role' field unless "Other" selected in "Job Role" field

/*
Change Event:
- Will display Other Job Field if 'other' is selected from Job Role selector
- Will remove from display if Job Role changed to something other than 'other'
*/

jobRoleSelector.addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'other') {
        otherJobRoleField.style.display = '';
    } else {
        otherJobRoleField.style.display = 'none';
    }; // End If Statement
}); // End Event Listener

/*
'T-SHIRT INFO' SECTION
*/

const designMenu = document.getElementById('design'); // Design Menu Selector
const colorMenu = document.getElementById('color'); // Color Menu Selector
colorMenu.disabled = true; //Color menu disabled unless a design is chosen
const colorOptions = colorMenu.children //Color Menu Options

/*
Change Event:
- Will enable color menu
- Will loop over color options and only allow user to select a color that is available for the design chosen
*/

designMenu.addEventListener('change', (event) => {

    const designFieldVal = event.target.value;

    // Enabled Color Select Menu
    colorMenu.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        let colorChild = colorOptions[i];
        let dataTheme = colorChild.getAttribute('data-theme');

        if (designFieldVal === dataTheme) {
            colorChild.hidden = false;
            colorChild.selected = true;

        } else {
            colorChild.hidden = true;
            colorChild.selected = false;
        }; // End IF statment
    }; //End For Loop
}); // End Event Listener


/*
'REGISTER FOR ACTIVITIES' SECTION
*/

const register = document.getElementById('activities'); // Register for Activities Field Set
const totalPElement = document.getElementById('activities-cost'); // Total cose paragraph element
let totalCost = 0; // Variable to store the running total for activities selected

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

    totalPElement.innerHTML = `$${totalCost}`; // Change HTML of the 'totalPElement' element to reflect new price
}); // End Event Listener


/*
Activity Box Accessibility Features
- Add focus class to any box that is selected and remove focus class when box blurs
*/

const activityBoxes = document.querySelectorAll("input[type='checkbox']") //Store all Activities options

// Loop through all activites to check for focus/blur status
activityBoxes.forEach((checkbox) => {
    let checkParent = checkbox.parentElement;

    // Add focus class to parent element
    checkbox.addEventListener('focus', () => checkParent.classList.add('focus'));
    // Remove focus class from parent element)
    checkbox.addEventListener('blur', () => checkParent.classList.remove('focus'));

});// End forEach 


/*
    Click Event:
    - Disable checkbox if other activity w/ same Date and Time checked
    - Enable all options once conflicting option de-selected
*/

register.addEventListener('click', (event) => {
    const elementClicked = event.target;
    const type = elementClicked.type
    let matchArr = []; // Empty array to store activities that match date/time

    if (type === 'checkbox') { //Filter for only checkbox items

        const dateAndTime = elementClicked.getAttribute('data-day-and-time'); //Get date and time

        // Create Array of Checkboxes with matching date and time
        activityBoxes.forEach((box) => {
            if (box.getAttribute('data-day-and-time') === dateAndTime) {
                matchArr.push(box)
            };
        }); // End forEach

        const isItemChecked = matchArr.reduce((isChecked, box) => { //Test to see if box is already checked
            if (box.checked) {
                return true
            } else {
                return isChecked
            }
        }, false); // End Reduce

        // Re-activate Boxes if option unchecked
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
    }; // End if Statement
});


/*

PAYMENT INFO SECTION

*/

const payWith = document.getElementById('payment'); // Pay With Select Element

// Payment Option Divs
const creditCard = document.getElementById('credit-card'); // Credit Card
payWith.children[1].selected = true; // Select credit card option by default

const paypal = document.getElementById('paypal'); // Paypal 
paypal.hidden = true; // Hide Paypal

const bitcoin = document.getElementById('bitcoin'); // Bitcoin
bitcoin.hidden = true; // Hide Bitcoin

/*
Change Event:
- Will show/hide payment info based on the payment method selected
*/

payWith.addEventListener('change', (event) => {

    let changedElement = event.target;
    let selectedOptionIndex = changedElement.options.selectedIndex;
    let selectedOption = changedElement.children[selectedOptionIndex].value;

    creditCard.hidden = selectedOption !== creditCard.id; //Hide credit card if not selected
    paypal.hidden = selectedOption !== paypal.id; // Hide paypal if not selected
    bitcoin.hidden = selectedOption !== bitcoin.id; // Hide BTC if not selected
});

/*
FORM VALIDATION Functions
*/

// Name field not blank
function validateName(nameValue) {

    let validationObject = {};

    if (nameValue === '') {
        nameField.nextElementSibling.textContent = "Name field cannot be blank"; // Change error message
        return false
        
    } else if (/[0-9]+/.test(nameValue)) {

        nameField.nextElementSibling.textContent = "Name field cannot contain numbers"; // Change error message
        return false
    }

    return true
}

// Validate Email Address
function validateEmail(email) {
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

// Validate Zip Code (5 digit numbers) | Only if credit card selected
function validateZip(zipCode) {
    return /^[0-9]{5}$/.test(zipCode)
}
// Validate CVV Number (3 digit number) | Only if credit card selecteda
function validateCVV(cvvNumber) {
    return /^[0-9]{3}$/.test(cvvNumber)
}


/* Format Form inputs based on whether text/numbers entered are valid

isValid = bool
elementToFormat = HTML Element

*/
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
Real Time Validation Functions
*/

/*
Function:
- Show/Hide error message based on validation result
*/

function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
        element.style.display = "inherit";
    } else {
        element.style.display = "none";
    }
}

function createRealTimeListener(validator) {
    return e => {
        const text = e.target.value;
        const valid = validator(text);
        const showTip = text !== "" && !valid;
        const tooltip = e.target.nextElementSibling;
        showOrHideTip(showTip, tooltip);
    };
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
    event.preventDefault(); // Prevent form from submitting w/ invalid entries

    // Validate User Inputs
    const isNameValid = validateName(nameField.value); // Validate Name 
    const isEmailValid = validateEmail(emailAddress.value); // Validate Email Address
    const isActivitySelected = isItemChecked(activitiesBox.children); // Validate one activity selected
    const isValidCc = validateCC(ccNumber.value) // Validate CC Number
    const isValidZip = validateZip(zipCode.value); // Validate zip
    const isValidCvv = validateCVV(cvvNumber.value); // Validate cvv value

    // Add 'valid'/'not-valid' classes based on whether inputs are validated true/false
    formatValidationHTML(isNameValid, nameField);
    formatValidationHTML(isEmailValid, emailAddress);
    formatValidationHTML(isActivitySelected, activitiesBox);
    formatValidationHTML(isValidCc, ccNumber);
    formatValidationHTML(isValidZip, zipCode);
    formatValidationHTML(isValidCvv, cvvNumber);

    //Credit card selected
    const ccNotSelected = document.getElementById('payment').value !== 'credit-card'

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
        event.preventDefault(); // Prevent form from submitting w/ invalid entries
    };// End If Statement
});

// Real time form validation event listeners
emailAddress.addEventListener("input", createRealTimeListener(validateEmail));
ccNumber.addEventListener("input", createRealTimeListener(validateCC));
zipCode.addEventListener("input", createRealTimeListener(validateZip));
cvvNumber.addEventListener("input", createRealTimeListener(validateCVV));