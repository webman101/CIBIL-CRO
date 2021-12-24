$(document).ready(function() {
    $('.base-plan').click(function(e) {
        e.preventDefault();
        $('.base-plan').removeClass('border-right-0');
        $('.base-standard').removeClass('border-right-0');
        $('.base-standard').addClass('border-left-0');


    });
    $('.base-standard').click(function(e) {
        e.preventDefault();

        $('.base-plan').addClass('border-right-0');
        $('.base-standard').removeClass('border-right-0');

    });
    $('.base-premium').click(function(e) {
        e.preventDefault();
        $('.base-plan').removeClass('border-right-0');
        $('.base-standard').addClass('border-right-0 border-left-1');
        $('.base-standard').removeClass('border-left-0');


    });
});



// var password = document.getElementById("password"),
//     confirm_password = document.getElementById("confirm_password");

// function validatePassword() {
//     if (password.value != confirm_password.value) {
//         confirm_password.setCustomValidity("Passwords Don't Match");
//     } else {
//         confirm_password.setCustomValidity('');
//     }
// }

// password.onchange = validatePassword;
// confirm_password.onkeyup = validatePassword;
$(document).ready(function() {

    // /* --------------------------------- */
    // $('[data-pwmatch]').keyup(function() {

    //     if (!$('[data-pwmatch="NewPW"]').attr("data-pwmatch-length")) { var pwlength = '8'; } else { var pwlength = $('[data-pwmatch="NewPW"]').attr("data-pwmatch-length"); }



    //     if ($('[data-pwmatch="NewPW"]').val().length > pwlength - 1 && $('[data-pwmatch="NewPW"]').val() == $('[data-pwmatch="ConfirmPW"]').val()) {
    //         $('[data-pwmatch="submit"]').attr('disabled', false);
    //         $('#PasswordMatch').text('true');
    //         $('#PasswordMatch').css('color', 'green');
    //     } else {
    //         $('[data-pwmatch="submit"]').attr('disabled', true);
    //         $('#PasswordMatch').text('false');
    //         $('#PasswordMatch').css('color', 'red');
    //     }
    //     var MatchPW = $('#PasswordMatch').val();

    // });

    /* ------------------------------------------------------ */
});

$("input.append-onclick").change(function() {
    $('[data-pwmatch="submit"]').attr('disabled', false);
});


$("input").keyup(function() {
    if ($('.password').val() && $('.passwords').val()) {
        $('[data-pwmatch="submit"]').attr('disabled', false);
    } else {
        $('[data-pwmatch="submit"]').attr('disabled', true);
    }
});