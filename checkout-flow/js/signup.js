//////////////
let digitValidate = function(ele) {
    ele.value = ele.value.replace(/[^0-9]/g, '');
}
var elems = document.querySelectorAll(".widget.hover");
let tabChange = function(val) {
    let ele = document.querySelectorAll('input');
    if (ele[val - 1].value != '') {
        ele[val].focus();
        ele.classList.add("mystyle");

    } else if (ele[val - 1].value == '') {
        ele[val - 2].focus()
    }
}

$('.otp-6').keyup(function(e) {
    if ($(this).val() != '') {
        $('#otp-btn').removeClass('disabled');
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

if ($('#radio5').prop('checked')) {
    alert('YES');

}


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
$(".password-eye").on('click', function (e) {
    $('.slash-eye').toggleClass('hide-eye');
    });
    