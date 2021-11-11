$(document).on('keyup', function(evt) {
    if (evt.keyCode == 27) {
        $('.custom-slildeup').removeClass('up');
        $('.custom-backdrop').removeClass('up');
    }
});


if ($('#1month').prop('checked', true)) {
    $('.1monthtrikeout').addClass('crossed');
};
if ($('.plans-radio-row input:radio[name=radio-group]:checked')) {
    $('#upgrade-link').attr("href", "https://myscore.cibil.com/CreditView/enrollShort.page?enterprise=CIBIL&offer=1M550RM");
};




$('#12monthsc').prop('checked', false);
$('#1monthc').prop('checked', true);
if ($('.plans-radio-row input:radio[id=1monthc]:checked')) {

    $('#upgrade-btn').attr("href", "https://myscore.cibil.com/CreditView/enrollShort.page?enterprise=CIBIL&offer=1M550RM");
}

$(document).ready(function() {
    let url = window.location.href;
    if (url.includes('?v1')) {
        $('.custom-column-2').addClass('plan-active');
        $('.custom-column-3,.custom-column-4').removeClass('plan-active');
        $('.base-plan').click();
        $('.base-plan').addClass('yellow-tag-active');


    } else if (url.includes('?v2')) {
        $('.custom-column-3').addClass('plan-active');
        $('.custom-column-2,.custom-column-4').removeClass('plan-active');
        $('.base-standard').click();
        $('.base-standard').addClass('yellow-tag-active');


    } else if (url.includes('?v3')) {
        $('.custom-column-4').addClass('plan-active');
        $('.custom-column-2,.custom-column-3').removeClass('plan-active');
        $('.base-premium').click();
        $('.base-premium').addClass('yellow-tag-active');
    }
});
$(document).ready(function() {
    let url = window.location.href;
    if (url.includes('?v1')) {
        $('.plans-card.basic').addClass('plan-active');
        $('.plans-card.premium,.plans-card.standard').removeClass('plan-active');
        $('.plans-row').slick('slickGoTo', 0)

    } else if (url.includes('?v2')) {
        $('.plans-card.standard').addClass('plan-active');
        $('.plans-card.basic,.plans-card.premium').removeClass('plan-active');
        $('.plans-row').slick('slickGoTo', 1);
        $('.base-standard').addClass('yellow-tag-active');

    } else if (url.includes('?v3')) {
        $('.plans-card.premium').addClass('plan-active');
        $('.plans-card.basic,.plans-card.standard').removeClass('plan-active');
        $('.plans-row').slick('slickGoTo', 2);
        $('.base-premium').addClass('yellow-tag-active');

    }
});

$(document).ready(function() {
    if ($('.plan-select-handle').text() === 'Basic' || $('.plan-select-handle').text() === 'basic') {
        $('.custom-column-2').addClass('plan-active');
        $('.custom-column-3,.custom-column-4').removeClass('plan-active');
        $('.base-plan').click();
        $('.base-plan').addClass('yellow-tag-active');
    } else if ($('.plan-select-handle').text() === 'standard' || $('.plan-select-handle').text() === 'Standard') {
        $('.custom-column-3').addClass('plan-active');
        $('.custom-column-2,.custom-column-4').removeClass('plan-active');
        $('.base-standard').click();
        $('.base-standard').addClass('yellow-tag-active');
    } else if ($('.plan-select-handle').text() === 'premium' || $('.plan-select-handle').text() === 'Premium') {
        $('.custom-column-4').addClass('plan-active');
        $('.custom-column-2,.custom-column-3').removeClass('plan-active');
        $('.base-premium').click();
        $('.base-premium').addClass('yellow-tag-active');
    }
});
$(document).ready(function() {
    if ($('.plan-select-handle').text() === 'Basic' || $('.plan-select-handle').text() === 'basic') {
        $('.plans-card.basic').addClass('plan-active');
        $('.plans-card.premium,.plans-card.standard').removeClass('plan-active');
        $('.plans-row').slick('slickGoTo', 0)
    } else if ($('.plan-select-handle').text() === 'standard' || $('.plan-select-handle').text() === 'Standard') {
        $('.base-plan').removeClass('yellow-tag-active');
        $('.plans-card.standard').addClass('plan-active');
        $('.plans-card.basic,.plans-card.premium').removeClass('plan-active');
        $('.plans-row').slick('slickGoTo', 1);
        $('.base-standard').addClass('yellow-tag-active');
    } else if ($('.plan-select-handle').text() === 'premium' || $('.plan-select-handle').text() === 'Premium') {
        $('.base-plan').removeClass('yellow-tag-active');

        $('.plans-card.premium').addClass('plan-active');
        $('.plans-card.basic,.plans-card.standard').removeClass('plan-active');
        $('.plans-row').slick('slickGoTo', 2);
        $('.base-premium').addClass('yellow-tag-active');

    }
});




$('.col-1-active').addClass('active');

$('.popop3 .plans-radio-col').click(function(e) {
    e.preventDefault();
    $('.active').removeClass('active');
    $(this).addClass('active');
});



$(".quest-popup").hover(function() {
    $('.tooltip-show').toggleClass("ttol-show");
});


$('.basic-plan-hide').addClass('hide');
$(".btn-2").attr("href", "https://myscore.cibil.com/CreditView/enrollShort.page?enterprise=CIBIL&amp;offer=1M550RM")

$('.col-1-active').click(function(e) {
    e.preventDefault();
    $(".btn-2").attr("href", "https://myscore.cibil.com/CreditView/enrollShort.page?enterprise=CIBIL&amp;offer=1M550RM")
    $('.base-plan-coupon .yellow-strip').removeClass('hide');

    $('.basic-plan-hide').addClass('hide');

});
$('.col-2-active').click(function(e) {
    e.preventDefault();

    $(".btn-2").attr("href", "https://myscore.cibil.com/CreditView/enrollShort.page?enterprise=CIBIL&amp;offer=6M800RM")

    $('.basic-plan-hide').removeClass('hide');
    $('.base-plan-coupon .yellow-strip').addClass('hide');
});
$('.col-3-active').click(function(e) {
    e.preventDefault();

    $(".btn-2").attr("href", "https://myscore.cibil.com/CreditView/enrollShort.page?enterprise=CIBIL&amp;offer=1Y1200RM")

    $('.basic-plan-hide').removeClass('hide');
    $('.base-plan-coupon .yellow-strip').addClass('hide');


});