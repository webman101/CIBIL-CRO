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

  $(".youtube-link").click(function(e){
      e.preventDefault();
      let youtubeLink = $(this).attr("href");
      $("#youtube-video").attr("src",youtubeLink);
      $(".modal-popup").toggleClass("opened");
  });
  $(".close-btn").click(function(){
    $(".modal-popup").toggleClass("opened");
  });


  // global variable for the player
var player;

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
    // create the global player from the specific iframe (#video)
    player = new YT.Player('youtube-video', {
        events: {
            // call this function when player is ready to use
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {

    // bind events
    $(".close-btn").click(function(){
        player.stopVideo();
    });
    $(".youtube-link").click(function(){
        player.playVideo();
    });
}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/* youtube player end */