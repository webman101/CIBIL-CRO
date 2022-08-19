$(document).ready(function () {
  $(".loginFlow-btn").prop("disabled", true);

  /* validation start */
  const passwordResetForm = document.getElementById("passwordResetForm");
  const newPassword = document.getElementById("new-confirm-password");
  const confirmPassword = document.getElementById("confirm-password");

  // messages
  const PasswordErrorMessage = "This field needs to match the one above it.";

  $("#confirm-password").keyup(function () {
    $("input[type='password']").keyup(function () {
        var pw1_data = $("#new-password").val();
        var pw2_data = $("#confirm-password").val();

        if (pw1_data != pw2_data ) {
            $("#confirm-password").siblings(".error-message").show("medium");
          $("#confirm-password").next().text(PasswordErrorMessage);
          $(".loginFlow-btn").prop("disabled", true);
        } else if (pw1_data == pw2_data) {
            $("#confirm-password").siblings(".error-message").hide("medium");
            $(".loginFlow-btn").prop("disabled", false);
        }
        else{}

        if (pw1_data == '' && pw2_data == ''){
            $("#confirm-password").siblings(".error-message").hide("medium");
            $(".loginFlow-btn").prop("disabled", true);
        }
      });
  });

  //Event Listeners
  passwordResetForm.addEventListener("submit", function (e) {
    passwordResetForm.submit();
  });

  /* validation end */
});
