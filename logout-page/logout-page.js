    /* Slider start */
    $(".myths-n-facts-slider").slick({
        dots: true,
        arrows:false,
        speed: 500,
        responsive: [
            {
            breakpoint: 768,
                settings: {
                    dots:false
                }
            }
        ]
    });
    /* slider end */

/* copy link */
  var copyButton = document.querySelector('#clipboard');
  var copyInput = document.querySelector('.copy');
  copyButton.addEventListener('click', function(e) {
    e.preventDefault();
	let copiedLink = copyInput.value;
    var text = copyInput.select();
    document.execCommand('copy');
	copyButton.classList.add("copied");
 	setTimeout(function(){
            copyButton.classList.remove("copied");
    }, 1000);
  });

  copyInput.addEventListener('click', function() {
    this.select();
  });
  /* copy link end */


/* youtube player */

/*   $(".youtube-link").click(function(e){
      e.preventDefault();
      let youtubeLink = $(this).attr("href");
      $("#youtube-video").attr("src",youtubeLink);
      $(".modal-popup").toggleClass("opened");
  });
  $(".close-btn").click(function(){
    $(".modal-popup").toggleClass("opened");
  });
var player;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('youtube-video', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {

    $(".close-btn").click(function(){
        player.stopVideo();
    });
    $(".youtube-link").click(function(){
        player.playVideo();
    });
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); */

/* youtube player end */