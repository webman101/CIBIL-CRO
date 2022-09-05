//features slider
var slickOptions = {
  infinite: true,
  slidesToScroll: 1,
  initialSlide: 1,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  dots: false,
  responsive: [
    {
        breakpoint: 9999,
        settings: "unslick"
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
      },
    },
  ],
};

$(".features-slider").slick(slickOptions);

//blogs slider
$(".blogs-slider").slick(slickOptions);