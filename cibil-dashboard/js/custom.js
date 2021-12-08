$(function() {

    var activeIndex = $('.active-tab').index(),
        $contentlis = $('.tabs-content li'),
        $tabslis = $('.tabs li');

    // Show content of active tab on loads
    $contentlis.eq(activeIndex).show();

    $('.tabs').on('click', 'li', function(e) {
        var $current = $(e.currentTarget),
            index = $current.index();

        $tabslis.removeClass('active-tab');
        $current.addClass('active-tab');
        $contentlis.hide().eq(index).show();
    });
});

$('.for-overlay .button-icon').click(function(e) {
    e.preventDefault();
    $(this).closest('.for-overlay').children('.overlay-card').removeClass('d-none');
});
$('.for-overlay .closeovelay').click(function(e) {
    e.preventDefault();
    $(this).closest('.for-overlay').children('.overlay-card').addClass('d-none');
});