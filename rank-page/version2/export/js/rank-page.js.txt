//banner slider
$('.banner-slider').slick({
    arrows: false,
    dots: true,
    appendDots: '.cibil-slick-dots'
});

//faq
$('.panel-collapse').on('show.bs.collapse', function () {
    console.log($(this).prev().addClass("show"));
  });
  $('.panel-collapse').on('hide.bs.collapse', function () {
    console.log($(this).prev().removeClass("show"));
  });