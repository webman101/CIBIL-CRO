/* youtube player */

$(".youtube-link").click(function (e) {
  e.preventDefault();
  let youtubeLink = $(this).attr("href");
  $("#youtube-video").attr("src", youtubeLink);
  $(".modal-popup").toggleClass("opened");
});
$(".close-btn").click(function () {
  $(".modal-popup").toggleClass("opened");
});
var player;

function onYouTubePlayerAPIReady() {
  player = new YT.Player("youtube-video", {
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  $(".close-btn").click(function () {
    player.stopVideo();
  });
  $(".youtube-link").click(function () {
    player.playVideo();
  });
}

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/* youtube player end */

/* validation start */
const contactForm = document.getElementById('credit-vision-form');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const companyName = document.getElementById('companyName');
const designation = document.getElementById('designation');
const emailId = document.getElementById('emailId');
const phoneNo = document.getElementById('phoneNo');

const mobilenoInvalidError = "Please enter a valid phone number.";
const emailInvalidError = "Please enter a valid email address.";

/* patterns */
let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;

// messages
const requiredErrorMessage = "This field is required.";

//Show error
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'input-container error';
    const small = formControl.querySelector('.error-message');
    small.innerText = message;
}

//show success
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'input-container success';
}

// check valid email
function emailValidation(input) {
  $errorDivId = input.field.id;
  if (emailId.value.match(emailPattern)) {
    $("#" + $errorDivId ).next().hide("medium");
    showSucces(emailId);
    return true;
  } else {
    $("#" + $errorDivId ).next().show("medium");
    showError(emailId, emailInvalidError);
    return false;
  }
}

// check valid phone
function phoneValidation(input) {
  $errorDivId = input.field.id;
  if (phoneNo.value.match(phonePattern)) {
    $("#" + $errorDivId ).next().hide("medium");
    showSucces(phoneNo);
    return true;
  } else {
    $("#" + $errorDivId ).next().show("medium");
    showError(phoneNo, mobilenoInvalidError);
    return false;
  }
}

//only numbers
$("#phoneNo").keypress(function (e) {
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
      if (inputId === "phoneNo"){
        phoneValidation(input);
      }
      else if(inputId === "emailId"){
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
      let totalErrors = $('.input-container.error').length;
      /* console.log("total errors:", totalErrors); */
      if(!(totalErrors > 0)){
        $recaptcha = $_POST['g-recaptcha-response'];
        $res = reCaptcha($recaptcha);
        if($res['success']){
          contactForm.submit();
        }else{
          console.log("Please check the recaptcha!");
        }
      }
}

//Event Listeners
contactForm.addEventListener('submit',function(e) {
  e.preventDefault();
  checkValidations([ 
    {"field":firstName, "message":"Please enter your first name."},
    {"field":lastName, "message":"Please enter your last name."},
    {"field":companyName, "message":"Please enter company name."},
    {"field":designation, "message":"Please enter your designation."},
    {"field":emailId, "message":"Please enter your email address."},
    {"field":phoneNo, "message":"Please enter your phone number."}
  ]);
});

/* validation end */