/* validation */
const form = document.getElementById("newsletterForm");
const email = document.getElementById("nl-email");
const name = document.getElementById("nl-name");
let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
// let pattern = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$/;

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

//save data
async function saveData() {
  let submit = form.querySelector('.newsletter-subscribe-button')
  try{
  submit.classList.add('loading')

  // getting tokens
  let config = {
      method: "GET",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      }
  }
  let response = await fetch("https://atlasls-za-test.sd.demo.truelink.com/CreditView/mobile/entry1_0.page?tl.partner=CIBILMKT", config)
  let data = await response.json();
  console.log("get successful", data);
  console.log("visitToken", data.ud.ResponseDetails.visitToken)
  console.log("csrfToken", data.ud.ResponseDetails.csrfToken)

  // use token to save email
  //body: "visitToken="+data.ud.ResponseDetails.visitToken+"&requestToken=+"+data.ud.ResponseDetails.csrfToken+"+&tl.email-address="+ email.value + input_name +"&DestinationPage=mobile/redirect1_0",

  let input_name = name.value.trim() != '' ? "&tl.first-name="+ name.value : "";
  let config2 = {
      method: "POST",
      body: `tl.email-address=${email.value}${input_name}&requestToken=${data.ud.ResponseDetails.csrfToken}&visitToken=${data.ud.ResponseDetails.visitToken}`,
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      }
  }
  console.log(config2)
  response = await fetch("https://atlasls-za-test.sd.demo.truelink.com/CreditView/mobile/redirect1_0.page?action=MARKETING_CUSTOMER&tl.partner=CIBILMKT", config2)
  data = await response.json();
  console.log("post successful", data)
  submit.classList.add('success')
  }
  catch(err){
    console.error(err);
    submit.classList.add('error')
  }
  finally{
    submit.classList.remove('loading')
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
    // form.submit();
    saveData();
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
