//////////////
// let digitValidate = function(ele) {
//     ele.value = ele.value.replace(/[^0-9]/g, '');
// }
// var elems = document.querySelectorAll(".widget.hover");
// let tabChange = function(val) {
//     let ele = document.querySelectorAll('input');
//     if (ele[val - 1].value != '') {
//         ele[val].focus();
//         ele.classList.add("mystyle");

//     } else if (ele[val - 1].value == '') {
//         ele[val - 2].focus()
//     }
// }

$('.span-link').click(function() {
    $('.otp-form').find('input').val('');
    $('#otp-btn').addClass('disabled');

});

$('.otp').click(function(e) {
    $('.otp.input-focus').removeClass('input-focus');
    $(this).addClass('input-focus');
});

$(".otp").keyup(function() {
    if (this.value.length == this.maxLength) {
        $(this).removeClass('input-focus').next('.otp').focus().addClass('input-focus');
    } else {
        $(this).removeClass('input-focus').prev('.otp').focus().addClass('input-focus');

    }
});

$('.otp').keyup(function(e) {
    if ($(this).val() != '') {
        $(this).addClass('disabled');

        $('#otp-btn').removeClass('disabled');
    } else {
        $('#otp-btn').addClass('disabled');

    }
});



$('#pincode').keyup(function(e) {
    if ($(this).val() != '') {
        $("#loan-button").attr("href", "https://ajency.github.io/CIBIL-CRO/checkout-flow/checkout")
        $('#loan-button').removeClass('disabled');
    }
});


// duplicate user
$('.dp-user').keyup(function(e) {
    if ($(this).val() != '') {
        $('#user-btn').removeClass('disabled');
    }
});

$('.loan-input-1').keyup(function(e) {
    if ($(this).val() != '') {
        $('.loan-input-2').removeClass('disabled-input');
        $('.flex-otp-label .span-quest-1').removeClass('disabled-input');
    }
});
$('.loan-input-2').keyup(function(e) {
    if ($(this).val() != '') {
        $('.loan-input-3').removeClass('disabled-input');
        $('.flex-otp-label .span-quest-2').removeClass('disabled-input');

        $('#loan-button').removeClass('disabled');

    }
});




$('#radio1,#radio2,#radio3,#radio4,#radio5,#radio6,#radio7,#radio8').change(function() {
    if ($(this).prop('checked')) {
        $('#verify-mobile-btn').removeClass('disabled');
    } else {

        $('#verify-mobile-btn').addClass('disabled');

    }
});
// if ($('#radio-1').prop('checked', true))
//     $('.verification-questions input[type=radio]').each(function() {
//         $(this).prop('checked', true)
//     });
// if ($('div:not(:has(:radio:checked))').length) {
//     $('#verify-mobile-btn').addClass('disabled');
// } else {
//     $('#verify-mobile-btn').removeClass('disabled');

// }

var variable = "x"
$("select option:contains('State" + variable + "')").attr("disabled", "disabled");
$("select#xul").prop("selectedIndex", -1)
$(".password-eye").on('click', function(e) {
    $('.slash-eye').toggleClass('hide-eye');
});


$(".password-eye").click(function() {

    $('.slash-eye').toggleClass("fa-eye-slashed");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});


$('.plans-radio-col').click(function(e) {
    $('.plans-radio-col').removeClass('active');
    $(this).addClass('active');
});




$('.plans-list').click(function(e) {
    $('.upgrade-link').show();

    var onemon = $(this).attr("value");
    $('.price').text('₹' + onemon)
    $('.plan-value p').text('₹' + onemon)


});
$('#12mon.plans-list').click(function(e) {
    $('.upgrade-link').hide();
});

$('.plans-list').click(function(e) {
    var month = $(this).attr("data-nobet");
    $('.month-change').text(month)
    $('.base-none').show();
    $('.base-none').removeClass('hide');


});
$('.plans-list').click(function(e) {
    var month = $(this).attr("data-name");
    $('.plan-nam').text(month)
});


$('.1mon').click(function() {
    $('.base-none').hide();
    $('.base-none').addClass('hide');

});
// var emailid = $('#emailId').val();
// if (emailid) {
//     if (!IsEmail(emailid)) {
//         $('#emailId').parent().addClass("error");
//         $('#emailId').parent().find('.input-error').text('Please enter a valid email id.');
//         validate = false;
//     } else if (emailid == 'test@test.com') {
//         $('#emailId').parent().addClass("error");
//         $('#emailId').parent().find('.input-error').text('Account with this email id already exists');
//         validate = false;
//     } else {
//         $('#emailId').parent().removeClass("error");
//     }
// }

$('#address').keyup(function(e) {
    e.preventDefault();
    if ($('#address').val().length !== 0) {

    }
});

// $('.standard-plan-check input').prop('checked', true);
// $('.standard-plan-check-2 input').prop('checked', true);


var discount = 0;
$(document).ready(function() {
    $('.plans-radio-row .plans-list').on('change', function() {
        $('.plans-list').not(this).prop('checked', false);
        let value = $('.plans-radio-row input:checkbox[name=radio-group]:checked').val();
        if (value == null) {
            $("#plans-title").html('Free Annual CIBIL Score & Report');
            $(".plans-block-header").removeClass('premium');
            $("#plans-subtitle").text('One-time access to your CIBIL Score & Report');
            $("#plans-price").text("");
            $(".u-text").text("Upgrade Now");
        } else {
            $("#plans-title").html($('.plans-radio-row input:checkbox[name=radio-group]:checked').data('title'));
            $(".plans-block-header").addClass('premium');
            $("#plans-subtitle").text($('.plans-radio-row input:checkbox[name=radio-group]:checked').data('subtitle'));
            $("#plans-price").text("₹" + value);
            $(".u-text").text("Change Plan");
        }
    });
});
$('#xul option').each(function() {
    $(this).click(function(e) {
        e.preventDefault();
        if (this.selected) {
            alert('this option is selected');
        }

    });
});


$('.toggle-code-input').slideUp();

$('.toggle-code-input-2').slideDown();
$('.arrow-img-2').addClass('rotate', 1000);


$('.arrow-img-1').click(function(e) {
    e.preventDefault();
    $('.toggle-code-input-1').slideToggle(350);
    $(this).toggleClass('rotate', 1000);
});
$('.arrow-img-2').click(function(e) {
    e.preventDefault();
    $('.toggle-code-input-2').slideToggle(350);
    $(this).toggleClass('rotate', 1000);
});



$('.radio-set-1').change(function() {
    if ($(this).prop('checked')) {
        alert()
    } else {

        $('#verify-mobile-btn').addClass('disabled');

    }
});

$(function() {
    $(".custom-radio").change(function() {
        var check = true;
        $(".custom-radio input").each(function() {
            var name = $(this).attr("name");
            if ($(".custom-radio input:radio[name=" + name + "]:checked").length == 0) {
                check = false;
            }
        });

        if (check) {
            $('#verify-mobile-btn').removeClass('disabled');
            $("a").attr("href", "https://ajency.github.io/CIBIL-CRO/checkout-flow/checkout")
        } else {
            $('#verify-mobile-btn').addClass('disabled');
        }
    });
});
// $('#plans-block-content').slideUp();

// $('.upgrade-link').click(function(e) {
//     e.preventDefault();
//     $(this).toggleClass('Hide');
//     if ($('.upgrade-link.hide')) {
//         $(this).text('Hide Plans');
//     }
//     else{
//         $(this).text('Upgrade Plans');

//     }
//     $('#plans-block-content').slideToggle(300);


// });
$('.plans-block-content-22').slideUp();
$('.plans-block-mobile').slideUp();


$(".upgrade-link").click(function(e) {
    e.preventDefault();

    $(".plans-block-content-22").slideToggle("slow");
    $('.plans-block-mobile').slideToggle();

    $(this).toggleClass("active");

    if ($(this).text() == "Hide Plans")
        $(this).text("Upgrade Plans")
    else
        $(this).text("Hide Plans");

});
if (window.matchMedia("(max-width: 768px)").matches) {
    $('.standard-plan-check input').prop('checked', true);
}
if (window.matchMedia("(min-width: 769px)").matches) {
  $('.standard-plan-check-2 input').prop('checked', true);

}
$('.slick-dots').hide();