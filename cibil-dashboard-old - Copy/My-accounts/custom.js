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


// $("input").keyup(function() {
//     if ($('.password').val() && $('.passwords').val()) {
//         $('[data-pwmatch="submit"]').attr('disabled', false);
//     } else {
//         $('[data-pwmatch="submit"]').attr('disabled', true);
//     }
// });



$(function() {
    var regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    $('.password').on('keyup', function(updateCount) {
        $('.message').hide();
        regExp.test($(this).val()) ? $('.password').val() && $('.passwords').val() && $('.message').hide() && $('[data-pwmatch="submit"]').attr('disabled', false) : $('.message').show() && $('[data-pwmatch="submit"]').attr('disabled', true);
    });

});


$('.password').keyup(updateCount);

function updateCount() {
    var cs = $(this).val().length;
    console.log(cs);
    if (cs < 8) {
        console.log('Please enter 8-15 characters using at least one letter and number');
    } else {
        console.log('more than 8');

    }
}

$("input.append-onclick").change(function() {
    if ($('#2').prop('checked') || $('#3').prop('checked')) {
        $('[data-pwmatch="submit"]').attr('disabled', false);
    }
    else{
        $('[data-pwmatch="submit"]').attr('disabled', true);
    }
});