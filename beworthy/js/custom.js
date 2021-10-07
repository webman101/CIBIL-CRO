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


const accordionBtns = document.querySelectorAll(".accordion");

accordionBtns.forEach((accordion) => {
    accordion.onclick = function() {
        this.classList.toggle("is-open");

        let content = this.nextElementSibling;
        console.log(content);

        if (content.style.maxHeight) {
            //this is if the accordion is open
            content.style.maxHeight = null;
        } else {
            //if the accordion is currently closed
            content.style.maxHeight = content.scrollHeight + "px";
            console.log(content.style.maxHeight);
        }
    };
});

$('.banner-slider').slick({
    arrows: false,
    dots: true,
    center: true,
    autoplay: true,
    autoplaySpeed: 4000,

});


if (window.matchMedia("(max-width: 768px)").matches) {
    /* the viewport is less than 768 pixels wide */
    $('.mobile-slider').slick({
        arrows: false,
        dots: true,
        center: true,
        autoplay: true,
        autoplaySpeed: 4000,

    });
}


if (window.matchMedia("(max-width: 768px)").matches) {
    /* the viewport is less than 768 pixels wide */
    $('.mobile-slider-2').slick({
        arrows: false,
        dots: true,
        center: true,
        autoplay: true,
        autoplaySpeed: 4000,

    });
}

if ($(".banner-slider").hasClass("slick-initialized")) {
    $(".preload").hide();
  }