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
const emailInvalidError = "The email address you have entered is invalid. Please try again.";

//Show error
let totalErrors = 0;
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'input-row error';
    const small = formControl.querySelector('small');
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
function emailValidation() {
  if (email.value.match(emailPattern)) {
    showSucces(email);
    return true;
  } else {
    showError(email, emailInvalidError);
    return false;
  }
}

// check valid phone
function phoneValidation() {
  if (mobileno.value.match(phonePattern)) {
    showSucces(mobileno);
    return true;
  } else {
    showError(mobileno, mobilenoInvalidError);
    return false;
  }
}

//check for errors
function validateForm(input){
  // check for required fields
  if(input.field.value.trim() === ''){
    showError(input.field, input.message);
  }else {
      showSucces(input.field);
      //check validations
      let inputId = input.field.id;
      if (inputId === "mobileno"){
        phoneValidation();
      }
      else if(inputId === "email"){
        emailValidation();
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
