$(document).ready(function() {
    $('.base-plan').click(function(e) {
        e.preventDefault();
        $('.base-plan').removeClass('border-right-0');
        $('.base-standard').removeClass('border-right-0');


    });
    $('.base-standard').click(function(e) {
        e.preventDefault();
        $('.base-plan').addClass('border-right-0');
        $('.base-standard').removeClass('border-right-0');

    });
    $('.base-premium').click(function(e) {
        e.preventDefault();
        $('.base-plan').removeClass('border-right-0');
        $('.base-standard').addClass('border-right-0');
    });
});