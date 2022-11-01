//banner slider
$(".banner-slider").slick({
  arrows: false,
  dots: true,
  appendDots: ".cibil-slick-dots",
});

//faq
$(".panel-collapse").on("show.bs.collapse", function () {
  $(this).prev().addClass("show");
  $(this).addClass("show");
});
$(".panel-collapse").on("hide.bs.collapse", function () {
  $(this).prev().removeClass("show");
  $(this).removeClass("show");
});
