var slickOptions = {
  vertical: true,
  verticalSwiping: true,
  slidesToScroll: 1,
    centerMode: true,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false
};

$(".queries-carousel")
  .on("init", function () {
    $(".slick-current").prev().addClass("query-prev");
    $(".slick-current").next().addClass("query-next");
    $(".slick-current").addClass("query-current");
  })
  .on("beforeChange", function () {
    $(".slick-current").prev().removeClass("query-prev");
    $(".slick-current").next().removeClass("query-next");
    $(".slick-current").removeClass("query-current");
  })
  .on("afterChange", function () {
    $(".slick-current").prev().addClass("query-prev");
    $(".slick-current").next().addClass("query-next");
    $(".slick-current").addClass("query-current");
  });

  $(".queries-carousel").slick(slickOptions);

