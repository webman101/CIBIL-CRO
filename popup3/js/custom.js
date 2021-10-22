$(document).ready(function () {
$('.plans-radio-col').click(function (e) { 
    e.preventDefault();
    $('.active').removeClass('active');
 $(this).addClass('active');
});
});