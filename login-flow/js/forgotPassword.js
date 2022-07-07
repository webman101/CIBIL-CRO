/* validation start */
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const username = document.getElementById('username');

// messages
const passwordErrorMessage = "Please enter a username.";

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
        forgotPasswordForm.submit();
      }
}

//Event Listeners
forgotPasswordForm.addEventListener('submit',function(e) {
  e.preventDefault();
  checkValidations([ {"field":username, "message":passwordErrorMessage} ]);
});

/* validation end */
