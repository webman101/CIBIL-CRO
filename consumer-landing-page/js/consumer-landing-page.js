//features slider
var slickOptions = {
  infinite: true,
  slidesToScroll: 1,
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

let dropdown = $('.js-dropdown');
let list = $('.js-dropdown-list');
let link = $('.js-link');
link.click(function(e) {
  e.preventDefault();
  list.slideToggle(200);
  $(this).parent().toggleClass("open");
});
list.find('li').click(function() {
  let text = $(this).html();
  let planLink = $(this).attr('data-link');
  link.html(text);
  dropdown.next().attr("href", planLink);
  list.slideToggle(200);
  console.log(planLink);
});