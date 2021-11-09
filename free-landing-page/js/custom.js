$(document).ready(function() {
    $('#interstitial-modal1 .show-slideup').on('click', function(e) {
        e.preventDefault();
        $('.custom-slildeup').addClass('up');
        $('.custom-backdrop').addClass('up');
    });
    $(".plans-radio-row input[name='radio-group-1']").on('click', function() {
        if ($('.plans-radio-row input:radio[name=radio-group-1]:checked').val() == "1M550RM") {
            $('.1monthstrikeout').addClass('crossed');
        } else {
            $('.1monthstrikeout').removeClass('crossed');
        }
    });
    $(".plans-radio-row input[name='radio-group']").on('click', function() {
        if ($('.plans-radio-row input:radio[name=radio-group]:checked').val() == "1M550RM") {
            $('.1monthtrikeout').addClass('crossed');
        } else {
            $('.1monthtrikeout').removeClass('crossed');
        }
    });
    $('.custom-slildeup').on('click', function(event) {
        var $target = $(event.target);
        if (!$target.closest('.block-option').length &&
            $('.block-option').is(":visible")) {
            $('.custom-slildeup').removeClass('up');
            $('.custom-backdrop').removeClass('up');
        }
    });
    if ($('#switcher-1').prop('checked')) {
        $("#upgrade").hide();
        $("#free").show();
    } else {
        $("#upgrade").show();
        $("#free").hide();
    }
    $('#switcher-1').change(function() {
        if ($('#switcher-1').prop('checked')) {
            $("#upgrade").hide();
            $("#free").show();
        } else {
            $("#upgrade").show();
            $("#free").hide();
        }
    });
    $(".plans-radio-row input[name='radio-group']").on('change', function() {
        $("#upgrade-link").attr("href", "https://myscore.cibil.com/CreditView/enrollShort.page?enterprise=CIBIL&offer=" + $('.plans-radio-row input:radio[name=radio-group]:checked').val());
    });
    $(".plans-radio-row input[name='radio-group-1']").on('change', function() {
        $("#upgrade-btn").attr("href", "https://myscore.cibil.com/CreditView/enrollShort.page?enterprise=CIBIL&offer=" + $('.plans-radio-row input:radio[name=radio-group-1]:checked').val());
    });
    $(".custom-slildeup input[name='flexRadioDefault']").on('change', function() {
        $("#upgrade-btn-mobile").attr("href", "https://myscore.cibil.com/CreditView/enrollShort.page?enterprise=CIBIL&offer=" + $('.custom-slildeup input:radio[name=flexRadioDefault]:checked').val());
    });
    $('#myTabs li').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $('#interstitial-modal1').on('show.bs.modal', function() {
        $('#12monthsc').prop('checked', true);
    });
    $('#interstitial-modal2').on('show.bs.modal', function() {
        $('#1month').prop('checked', true);
    });
    $('.review-slider').slick({
        dots: true,
        center: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-custom-arrow slick-prev"></div>',
        nextArrow: '<div class="slick-custom-arrow slick-next"></div>',
        responsive: [{
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $('.score-slider').slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    if ($(window).width() < 992) {
        $('.report-slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<div class="slick-custom-arrow slick-prev"></div>',
            nextArrow: '<div class="slick-custom-arrow slick-next"></div>',
        });
    }
    if ($(window).width() < 768) {
        $('.myths-slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
        $('.plans-row').slick({
            arrows: true,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<div class="slick-custom-arrow slick-prev"></div>',
            nextArrow: '<div class="slick-custom-arrow slick-next"></div>',
        });
    }
    $(".steps-action button").click(function() {
        if ($(window).width() < 992) {
            $('html, body').animate({
                scrollTop: $(".features-mobile-section").offset().top
            }, 2000);
        } else {
            $('html, body').animate({
                scrollTop: $(".features-section").offset().top - 170
            }, 2000);
        }
    });
    $(".desktop-click").click(function() {
        $('html, body').animate({
            scrollTop: $("#fs").offset().top - 200
        }, 2000);
    });


    // Timer js
    let countDownDate = new Date("july 5, 2021 15:37:25").getTime();
    let x = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $("#days").html(days + "<span class='fw-400'>Days</span>");
        $("#hours").html(hours + "<span class='fw-400'>Hours</span>");
        $("#minutes").html(minutes + "<span class='fw-400'>Minutes</span>");
        $("#seconds").html(seconds + "<span class='fw-400'>Seconds</span>");

        if (distance < 0) {
            clearInterval(x);
            $("#timer-wrap").html("<span class='fw-rg-600'>PROMO EXPIRED</span>")
        }

    }, 1000);
});

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

// if (window.location.href === "http://127.0.0.1:5502/landing-page/new-landingpage.html") {
//     $('.base-plan').addClass('yellow-tag-active');
// }
// if (window.location.href === "https://www.cibil.com/select-plan") {
//     $('.base-plan').addClass('yellow-tag-active');
// }
// if (window.location.href === "http://127.0.0.1:5502/landing-page/new-landingpage.html") {
//     $('.base-plan').addClass('yellow-tag-active');
// }


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


$('.quest-popup').click(function(e) {
    e.preventDefault();
    $('.tooltip-show').toggleClass('ttol-show');
});





$(document).mouseup(function(e) {
    var container = $(".quest-popup");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('.tooltip-show').removeClass('ttol-show');
    }
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