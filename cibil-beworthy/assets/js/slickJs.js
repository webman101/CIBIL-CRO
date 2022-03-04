
$(document).ready(function () {

    $('.hamburger').click(function() {
        $('.hamburger-slide-js').toggleClass('active');
        $('header .overlay').toggleClass('visible');
    })

    $( window ).resize(function() {
        $('.hamburger-slide-js').removeClass('active');
        $('header .overlay').removeClass('visible');
    })

    $('.article-slider-js').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '50px',
                }
            }
        ]
    })

    $('#process-slick').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '50px',
                }
            }
        ]
    })

    $('#icon-slick').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '20px',
                }
            }
        ]
    })

    let bannerGif = $('.banner-gif').attr('lsrc');
    $('.banner-gif').attr('src',bannerGif);
    $('.banner-gif').show()
});

$(window).on("load resize",function(e){
    var bgHeight = $(".hero-section.new .right-side .main-title").innerHeight();
    $(".hero-section.new .right-side .gif-container .bg-element").css("height",bgHeight);

    var videoSecHeight = $(".video-section .video-section-wrapper").innerHeight();
    var videoContainerTop = (videoSecHeight - 419)/2;
    $(".video-section .video-section-wrapper .video-container").css("top",videoContainerTop);
});
