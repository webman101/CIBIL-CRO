
$(document).ready(function() {

    $('.screen1').addClass('d-block');
    $('.screen1 .next').click(function() {
        $('.screen1').removeClass('d-block');

        $('.screen2').addClass('d-block');
    });
    $('.screen2 .next').click(function() {
        $('.screen2').removeClass('d-block');

        $('.screen3').addClass('d-block');
    });
    $('.back-2-screen-1').click(function() {
        $('.screen2,.screen3').removeClass('d-block');
        $('.screen1').addClass('d-block');
    });
    $('.back-2-screen-2').click(function() {
        $('.screen1,.screen3').removeClass('d-block');
        $('.screen2').addClass('d-block');
    });
});

$('.open-popup').click(function() {
    $('.exit-intent-popup').addClass('vissible');
});

$('.close-tab').click(function() {
    $('.exit-intent-popup').removeClass('vissible');
});


 $(".abc").change(function(){
    if ($('.abc:checked').length > 0) {
        $('.screen1 .next').removeClass('disabled');
    }
    else{
                $('.screen1 .next').addClass('disabled');
    }
 });
 $(".abc2").change(function(){
    if ($('.screen2 .abc2:checked').length > 0) {
        $('.screen2 .next').removeClass('disabled');
    }
    else{
                $('.screen2 .next').addClass('disabled');
    }
 });
 $(".screen3 .abc").change(function(){
    if ($('.screen3 .abc:checked').length > 0) {
        $('.screen3 .next').removeClass('disabled');
    }
    else{
                $('.screen3 .next').addClass('disabled');
    }
 });