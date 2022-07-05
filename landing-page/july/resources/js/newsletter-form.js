/* validation */
const form = document.getElementById("newsletterForm");
const email = document.getElementById("nl-email");
let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

/* messages */
let emailRequiredMessage = "This field is required";
let emailInvalidMessage = "Please Enter Valid Email Address";

//Show input error messages
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "input-container error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//show success
function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = "input-container success";
}

// check valid email
function emailValidation() {
  if (email.value.match(pattern)) {
    return true;
  } else {
    showError(email, emailInvalidMessage);
    return false;
  }
}

//checkRequired fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.field.value.trim() === "") {
      showError(input.field, input.message);
    } else {
      showSucces(input.field);
      emailValidation();
    }
  });
}

/* submitForm */
function checkValidation(inputFields) {
  if (inputFields[0].value.trim() != "" && emailValidation() === true ) {
    form.submit();
  }
}

function validateForm() {
  checkRequired([{ field: email, message: emailRequiredMessage }]);
  email.addEventListener("change", function () {
    checkRequired([{ field: email, message: emailRequiredMessage }]);
  });
}

//Event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
  checkValidation([email]);
});
/* validation end */
