/* validation start */
const forgotUsernameForm = document.getElementById('forgotUsernameForm');
const mobileno = document.getElementById('mobileno');
const email = document.getElementById('email');
let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;

// messages
const mobilenoErrorMessage = "Please enter your mobile number.";
const mobilenoInvalidError = "Please enter a valid mobile mobile number.";
const emailErrorMessage = "Please enter your email address.";
const emailInvalidError = "Please enter a valid email address.";

//Show error
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'input-row error';
    const small = formControl.querySelector('.error-message');
    small.innerText = message;
}

//show success
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'input-row success';
}

// check valid email
function emailValidation(input) {
  $errorDivId = input.field.id;
  if (email.value.match(emailPattern)) {
    $("#" + $errorDivId ).next().hide("medium");
    showSucces(email);
    return true;
  } else {
    $("#" + $errorDivId ).next().show("medium");
    showError(email, emailInvalidError);
    return false;
  }
}

// check valid phone
function phoneValidation(input) {
  $errorDivId = input.field.id;
  if (mobileno.value.match(phonePattern)) {
    $("#" + $errorDivId ).next().hide("medium");
    showSucces(mobileno);
    return true;
  } else {
    $("#" + $errorDivId ).next().show("medium");
    showError(mobileno, mobilenoInvalidError);
    return false;
  }
}

//only numbers
$("#mobileno").keypress(function (e) {
  if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
   return false;
 }
});

//check for errors
function validateForm(input){
  $errorDivId = input.field.id;
  // check for required fields
  if(input.field.value.trim() === ''){
    showError(input.field, input.message);
    $("#" + $errorDivId ).next().show("medium");
  }else {
      showSucces(input.field);
      $("#" + $errorDivId ).next().hide("medium");
      //check validations
      let inputId = input.field.id;
      if (inputId === "mobileno"){
        phoneValidation(input);
      }
      else if(inputId === "email"){
        emailValidation(input);
      }
      else{}
  }
}

//check required fields
function checkValidations(inputArr) {
    inputArr.forEach(function(input){
      validateForm(input);
        input.field.addEventListener("change", function(){
          validateForm(input);
        });
    });
      // check for the errors
      let totalErrors = $('.input-row.error').length;
      /* console.log("total errors:", totalErrors); */
      if(!(totalErrors > 0)){
        forgotUsernameForm.submit();
      }
}

//Event Listeners
forgotUsernameForm.addEventListener('submit',function(e) {
  e.preventDefault();
  checkValidations([ {"field":mobileno, "message":mobilenoErrorMessage},{"field":email, "message":emailErrorMessage} ]);
});

/* validation end */