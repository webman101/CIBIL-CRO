/* check if user is new or existing */

const user = localStorage.getItem("loggedInUser");
if (user) {
  $(".title #LoginTitle").html("Welcome back");
  $(".subtitle").html("login to access your CIBIL Score & Report");
  $(".title .icon-welcome").show();
} else {
  $(".title .icon-login").show();
  $(".title #LoginTitle").html("Login");
  localStorage.setItem("loggedInUser", "True"); // Remove this line from here & paste it inside your login fucntion.
}

/* validation */
const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');

/* messages */
const usernameErrorMessage = "Please enter the username of your account.";
const passwordErrorMessage = "Please enter a password.";

//Show input error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'input-row error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'input-row success';
}

//checkRequired fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.field.value.trim() === ''){
          showError(input.field, input.message);
        }else {
            showSucces(input.field);
        }
    });
}

/* submitForm */
function checkValidation(inputFields) {
  if( (inputFields[0].value.trim() != '') && (inputFields[1].value.trim() != '') ){
    form.submit();
  }

}

function validateForm(){
  checkRequired([ {"field":username, "message":usernameErrorMessage},{"field":password, "message":passwordErrorMessage} ]);
  username.addEventListener("change", function(){
    checkRequired([ {"field":username, "message":usernameErrorMessage} ]);
  });
  password.addEventListener("change", function(){
    checkRequired([ {"field":password, "message":passwordErrorMessage} ]);
  });
}

//Event Listeners
form.addEventListener('submit',function(e) {
  e.preventDefault();
  validateForm();
  checkValidation([ username, password]);
});
/* validation end */

/* container */
$(window).on("load resize", function (e) {
  let HeaderContainer = $(".header-container").width();
  let formSection = $(".login-form-section").outerWidth();

  let totalMargin = (formSection - HeaderContainer) / 2;

  let fullRightPanel = $(".login-form-section .right-panel");
  /* fullRightPanel.css("padding-right", totalMargin); */

  let footerText = $(".footer-text");
  let footerAlign = (fullRightPanel.width()/2) - (footerText.width()/2) ;
  /* footerText.css("left", footerAlign); */
});
