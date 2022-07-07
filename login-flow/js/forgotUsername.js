/* validation start */
const forgotUsernameForm = document.getElementById('forgotUsernameForm');
const mobileno = document.getElementById('mobileno');
const email = document.getElementById('email');
let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

// messages
const mobilenoErrorMessage = "Please enter your mobile number.";
const mobilenoInvalidError = "Please enter a valid mobile mobile number.";
const emailErrorMessage = "Please enter your email address.";
const emailInvalidError = "Please enter a valid email address.";

//Show error
let totalErrors = 0;
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'input-row error';
    const small = formControl.querySelector('.error-message');
    small.innerText = message;
    totalErrors++;
}

//show success
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'input-row success';
    totalErrors = 0;
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

/* container */
$(window).on("load resize", function (e) {
  let HeaderContainer = $(".header-container").width();
  let formSection = $(".loginFlow-form-section").outerWidth();

  let totalMargin = (formSection - HeaderContainer) / 2;

  let fullRightPanel = $(".loginFlow-form-section .right-panel");
  /* fullRightPanel.css("padding-right", totalMargin); */

  let footerText = $(".footer-text");
  let footerAlign = (fullRightPanel.innerWidth()/2) - (footerText.width()/2) ;
  footerText.css("left", footerAlign);
});
