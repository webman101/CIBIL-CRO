/* login title */

const user = localStorage.getItem("loggedInUser");
if (user) {
  $(".title #LoginTitle").html("Welcome back");
  $(".title .icon").show();
} else {
  $(".title #LoginTitle").html("Login");
  localStorage.setItem("loggedInUser", "True");
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

//show success colour
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

//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit',function(e) {
    e.preventDefault();
    checkRequired([ {"field":username, "message":usernameErrorMessage},{"field":password, "message":passwordErrorMessage} ]);
    username.addEventListener("change", function(){
      checkRequired([ {"field":username, "message":usernameErrorMessage} ]);
    });
    password.addEventListener("change", function(){
      checkRequired([ {"field":password, "message":passwordErrorMessage} ]);
    });
});

/* container */
$(window).on("load resize", function (e) {
  let HeaderContainer = $(".header-container").width();
  let formSection = $(".login-form-section").outerWidth();

  let totalMargin = (formSection - HeaderContainer) / 2;

  let fullRightPanel = $(".login-form-section .right-panel");
  fullRightPanel.css("padding-right", totalMargin);

  let footerText = $(".footer-text");
  let footerAlign = (fullRightPanel.width()/2) - (footerText.width()/2) ;
  footerText.css("left", footerAlign);
});
