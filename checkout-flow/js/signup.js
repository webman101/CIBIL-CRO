//////////////
let digitValidate = function(ele) {
    ele.value = ele.value.replace(/[^0-9]/g, '');
}
var elems = document.querySelectorAll(".widget.hover");
let tabChange = function(val) {
    let ele = document.querySelectorAll('input');
    if (ele[val - 1].value != '') {
        ele[val].focus()
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
