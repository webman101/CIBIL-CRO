/* check if user is new or existing */
const user = localStorage.getItem("loggedInUser");
if (user) {
  $(".loginFlow-form-section .title #LoginTitle").html("Welcome back");
  $(".loginFlow-form-section #LoginSubtitle").html("login to access your CIBIL Score & Report");
  $(".loginFlow-form-section .title .icon-welcome").show();
} else {
  $(".loginFlow-form-section .title .icon-login").show();
  $(".loginFlow-form-section .title #LoginTitle").html("Login");
  localStorage.setItem("loggedInUser", "True"); // Remove this line from here & paste it inside your login fucntion.
}

/* validation start */
const loginForm = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');

// messages
const usernameErrorMessage = "Please enter the username of your account.";
const passwordErrorMessage = "Please enter a password.";

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
        loginForm.submit();
      }
}

//Event Listeners
loginForm.addEventListener('submit',function(e) {
  e.preventDefault();
  checkValidations([ {"field":username, "message":usernameErrorMessage},{"field":password, "message":passwordErrorMessage} ]);
});

/* display form errors | Use this code to display form errors */
  // $(".from-errors" ).show("fast");
/* show form errors | end */

/* validation end */