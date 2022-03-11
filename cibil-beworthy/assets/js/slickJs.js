
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

    // $('.icon-list-js').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: false,
    //     mobileFirst: true,
    //     arrows: false,
    //     dots: false,
    //     infinite: false,
    //     responsive: [
    //         {
    //             breakpoint: 490,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2
    //             }
    //         },
    //         {
    //             breakpoint: 991,
    //             settings: "unslick"
    //         }
    //     ]
    // })

    $('.home header .header-nav .list-link').click(function(e){
        e.preventDefault();
        let selector = $(this).attr('href');
        $('html, body').stop().animate({
            scrollTop: $(""+selector).offset().top - 100
        }, 0,'swing');
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
        // console.log(videoId)
        $('.video-wrap').hide().removeClass('play-video')
        $('.video-wrap iframe').removeAttr('src')
        $('#video'+videoId).show()
    })

    $('.video-wrap').click(function(){
        $(this).addClass('play-video')
        videoSrc = $(this).find('iframe').attr('data-src')
        // console.log("src",videoSrc)
        $(this).find('iframe').attr('src', videoSrc);
    })

    // quiz

    const valueJSON = {
        '1' : 'c',
        '2' : 'b',
        '3' : 'b',
        '4' : 'a',
        '5' : 'b',
        '6' : 'a',
        '7' : 'b',
        '8' : 'e'

    }

    function randomSort(a, b) {  
        return 0.5 - Math.random();
    }
    var numberArray = [1,2,3,4,5,6,7,8];
    var randomOrder = numberArray.sort(randomSort);
    var totalQuestion = 5;
    // console.log(randomOrder)
    var counterArray = 0;
    var correctCount = 0;

    $('.strat-quiz-btn').click(function(e){
        e.preventDefault();
        $('.start-card').hide()
        let progress = ((counterArray+1)/(totalQuestion))*100;
        $('.quiz-progress .bar').css('width',progress+'%')
        let questionText = 'Question '+(counterArray+1)+'/'+totalQuestion;
        $('[data-card='+randomOrder[counterArray]+'] .question-number').text(questionText)
        $('[data-card='+randomOrder[counterArray]+']').show()
        counterArray = counterArray+1 ;
    })

    $('.proceed-next').click(function(e){
        e.preventDefault();
        $('.quiz-card').hide()
        if(counterArray == (totalQuestion)){
            // let result = (correctCount/counterArray)*100;
            // console.log('result',result)
            console.log(correctCount)
            if(correctCount <= 2){
                $('#scholar').show()
                $('.shareLink:not(.clipboard)').each(function(){
                  $(this).attr('href', $(this).attr('href')+'?medal=newbie%23quiz' )
                })
            }
            else if(correctCount <= 4){
                $('#rockstar').show()
                $('.shareLink:not(.clipboard)').each(function(){
                    $(this).attr('href', $(this).attr('href')+'?medal=bluff%23quiz' )
                })
            }
            else{
                $('#master').show()
                $('.shareLink:not(.clipboard)').each(function(){
                    $(this).attr('href', $(this).attr('href')+'?medal=rockstar%23quiz' )
                })
            }
        }else{
            let progress = ((counterArray+1)/(totalQuestion))*100;
            $('.quiz-progress .bar').css('width',progress+'%')
            let questionText = 'Question '+(counterArray+1)+'/'+totalQuestion;
            $('[data-card='+randomOrder[counterArray]+'] .question-number').text(questionText)
            $('[data-card='+randomOrder[counterArray]+']').show()
            counterArray = counterArray+1;
        }
    })

    $('.option').click(function(){
        $(this).siblings().css('pointer-events','none')
        let parentCard = $(this).closest('.quiz-card');
        let questionNumber = parentCard.attr('data-card')
        let optionNumber = $(this).attr('data-value');
        if(valueJSON[questionNumber] == optionNumber){
            correctCount = correctCount+1;
            $(this).addClass('correct')
        }
        else{
            $(this).siblings('[data-value='+valueJSON[questionNumber]+']').addClass('correct')
            $(this).addClass('wrong')
        }
        // console.log(valueJSON[questionNumber])
        parentCard.find('.proceed-next').removeClass('disabled');
        parentCard.find('.card-details').show()
    })

    var urlPath = window.location.href
    console.log('before clip: ',urlPath)
    urlPath = urlPath.replace(/html.*$/i, "") + "html";
    console.log('after clip: ',urlPath)
    let clipBoardPath = urlPath;
    if ($('#quiz').length > 0){
        clipBoardPath = clipBoardPath+'#quiz';
        // urlPath = urlPath+'%23quiz';
    }
    let facebookPath = 'https://www.facebook.com/sharer/sharer.php?u='+urlPath;
    let twitterPath = 'https://twitter.com/intent/tweet?text='+urlPath;
    let linkedInPath = 'https://www.linkedin.com/shareArticle?mini=true&url='+urlPath+'&title=&summary=&source=';
    
    $('.shareLink.facebook').attr('href', facebookPath)
    $('.shareLink.twitter').attr('href', twitterPath)
    $('.shareLink.linkedIn').attr('href', linkedInPath)

    $('.shareLink.clipboard').click(function(e){
        e.preventDefault();
        navigator.clipboard.writeText(clipBoardPath)
        $(this).find('.copyTooltip').show()
        setTimeout(function(){$('.copyTooltip').hide()},1000)
    })

});

//Dynamic share
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let value = params.medal;
if(value!= null){
    var metaImage = document.createElement('meta');
    metaImage.setAttribute("property","og:image");
    metaImage.content = `https://ajency.github.io/CIBIL-CRO/cibil-beworthy/assets/img/${value}.jpg`;
    document.getElementsByTagName('head')[0].appendChild(metaImage);

    var metaTweetImage = document.createElement('meta');
    metaTweetImage.setAttribute("name","twitter:image");
    metaTweetImage.content = `https://ajency.github.io/CIBIL-CRO/cibil-beworthy/assets/img/${value}.jpg`;
    document.getElementsByTagName('head')[0].appendChild(metaTweetImage);
}