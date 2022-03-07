
$(document).ready(function () {
    
    function closeNav(){
        $('.hamburger-slide-js').removeClass('active');
        $('header .overlay').removeClass('visible');
    }

    $('.hamburger').click(function() {
        $('.hamburger-slide-js').toggleClass('active');
        $('header .overlay').toggleClass('visible');
    })

    $( window ).resize(function() {
        closeNav();
    })

    $('header .overlay, .list-link, .header-nav .primary-btn').click(function(){
        closeNav();
    })

    $('.article-slider-js').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
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
                    // centerMode: true,
                    // centerPadding: '50px',
                }
            }
        ]
    })

    $('#article-left').click(function(){
        $('.article-slider-js').slick('slickPrev')
    })

    $('#article-right').click(function(){
        $('.article-slider-js').slick('slickNext')
    })

    $('.video-list-item').click(function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active')
        let videoId = $(this).attr('data-toggle')
        console.log(videoId)
        $('.video-wrap').hide().removeClass('play-video')
        $('.video-wrap iframe').removeAttr('src')
        $('#video'+videoId).show()
    })

    $('.video-wrap').click(function(){
        $(this).addClass('play-video')
        videoSrc = $(this).find('iframe').attr('data-src')
        console.log("src",videoSrc)
        $(this).find('iframe').attr('src', videoSrc);
    })

    // $('#process-slick').slick({
    //     infinite: false,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     dots: false,
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: {
    //                 slidesToShow: 2
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 1,
    //                 centerMode: true,
    //                 centerPadding: '50px',
    //             }
    //         }
    //     ]
    // })

    // $('#icon-slick').slick({
    //     infinite: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     dots: false,
    //     variableWidth: true,
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: {
    //                 slidesToShow: 2
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 1,
    //                 centerMode: true,
    //                 centerPadding: '20px',
    //             }
    //         }
    //     ]
    // })

    // let bannerGif = $('.banner-gif').attr('lsrc');
    // $('.banner-gif').attr('src',bannerGif);
    // $('.banner-gif').show()
});

// $(window).on("load resize",function(e){
//     var bgHeight = $(".hero-section.new .right-side .main-title").innerHeight();
//     $(".hero-section.new .right-side .gif-container .bg-element").css("height",bgHeight);

//     var videoSecHeight = $(".video-section .video-section-wrapper").innerHeight();
//     var videoContainerTop = (videoSecHeight - 419)/2;
//     $(".video-section .video-section-wrapper .video-container").css("top",videoContainerTop);
// });
