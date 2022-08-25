//vertical carousel
var slickOptions = {
  vertical: true,
  infinite: true,
  verticalSwiping: true,
  slidesToScroll: 1,
  centerMode: true,
  initialSlide: 1,
  speed: 400,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  centerPadding: "70px",
  responsive: [
    {
      breakpoint: 992,
      settings: {
        centerMode: false,
      },
    },
  ],
};

$(".queries-carousel")
  .on("init", function () {
    $(".slick-current").prev().addClass("query-prev");
    $(".slick-current").next().addClass("query-next");
    $(".slick-current").addClass("query-current");
    $data_score = $(".slick-current").attr("data-score");
    $data_oldscore = $(".slick-current").attr("data-oldscore");
    updateScore($data_score, $data_oldscore);
  })
  .on("beforeChange", function () {
    $(".slick-current").prev().removeClass("query-prev");
    $(".slick-current").next().removeClass("query-next");
    $(".slick-current").removeClass("query-current");
    $data_score = $(".slick-current").attr("data-score");
    $(".slick-current").next().attr("data-oldscore", $data_score);
  })
  .on("afterChange", function () {
    $(".slick-current").prev().addClass("query-prev");
    $(".slick-current").next().addClass("query-next");
    $(".slick-current").addClass("query-current");
    $data_score = $(".slick-current").attr("data-score");
    $data_oldscore = $(".slick-current").attr("data-oldscore");
    updateScore($data_score, $data_oldscore);
  });

$(".queries-carousel").slick(slickOptions);

// score bar
function updateScore($data_score, $data_oldscore) {
  $(".score-bar").each(function () {
    var $bar = $(this).find(".bar");
    var $pointer = $(this).find(".score-pointer img");
    $(this).find(".cibil-score").text($data_score);
    var $val = $(this).find(".cibil-score");
    var perc = parseInt($val.text(), 10);

    //console.log("old=" + $data_score, "new=" + $data_oldscore);

    $({ p: $data_oldscore }).animate(
      { p: perc },
      {
        duration: 800,
        easing: "swing",
        step: function (p) {
          $bar.css({
            transform:
              "rotate(" + Math.ceil(45 + ((p * 100) / 900) * 1.8) + "deg)",
          });
          $pointer.css({
            transform: "rotate(" + Math.ceil(((p * 100) / 900) * 1.8) + "deg)",
          });
          $val.text(p | 0);
        },
      }
    );
  });
}
