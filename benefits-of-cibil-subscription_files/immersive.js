$(document).ready(function () {
	
if ( $( "#immersiveComponent" ).length != 0) {		
//if CTA button exists and so does play button
if ( $( "#immersiveComponent .immersive-play" ).length )  {
	 $( ".immersive-button").addClass('vid-button');
 }

//play button click function 
	$("#immersiveComponent .immersive-play").click(function() {
		//used to hide mobile image div as to not have 2 videos loaded 
		$("div > #immersiveComponent .immersive-background.hidden-lg").addClass("hide-mobile");
		
// if statement replaces the existing HTML with the video player - hides all other pieces and video plays 	
   if ($(".immersive-play").hasClass("click")) {
	    $("#immersiveComponent .immersive-background").html( "<div class='full-video'><div style='display: block; position: relative; max-width: 100%;'><div style='padding-top: 56.25%;'><video data-video-id='"+dataVideoID+"' data-account='"+dataAccount+"' data-player='"+dataPlayer+"' data-embed='default' class='video-js' controls style='width: 100%; height: 630px; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;'></video><script src='//players.brightcove.net/"+dataAccount+"/"+dataPlayer+"_default/index.min.js'></script></div></div></div>" ).removeClass("hidden-xs");
	$(".hide-mobile").css('display','none').html(""); 	
	$(".immersive-play").hide();
	$(".immersive-headline").hide();
	$(".immersive-search").hide();
	$(".immersive-button").hide();
	$(".immersive-close").show();
	$("#immersiveComponent .immersive-background").addClass('transparent');	
   }

//else if the looping video background is selected  
   if ($(".immersive-play").hasClass("autoplay")) {
	    $("#immersiveComponent .immersive-background").append( "<div class='full-video'><div style='display: block; position: relative; max-width: 100%;'><div style='padding-top: 56.25%;'><video data-video-id='"+dataVideoID+"' data-account='"+dataAccount+"' data-player='"+dataPlayer+"' data-embed='default' class='video-js' controls style='width: 100%; height: 630px; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;'></video><script src='//players.brightcove.net/"+dataAccount+"/"+dataPlayer+"_default/index.min.js'></script></div></div></div>" ).removeClass("hidden-xs");
	$(".hide-mobile").css('display','none').html(""); 	
	$("#video-container").hide();
	if ( $( ".careers-video-container" ).length != 0) {
		$(".careers-video-container").hide();
	}
	$(".immersive-play").hide();
	$(".immersive-headline").hide();
	$(".immersive-search").hide();
	$(".immersive-button").hide();
	$(".immersive-close").show();
	$("#immersiveComponent .immersive-background").addClass('transparent');
   }   

//youtube code
// if statement replaces the existing HTML with the video player - hides all other pieces and video plays 	
   if ($(".immersive-play").hasClass("click-yt")) {
	    $("#immersiveComponent .immersive-background").html( "<div class='full-video'><div style='display: block; position: relative; max-width: 100%;'><iframe src='"+youtubeVideoURL+"?autoplay=1' frameborder='0' width='100%' height='630'></iframe></div></div>" ).removeClass("hidden-xs");
	$(".hide-mobile").css('display','none').html(""); 
	$(".immersive-play").hide();
	$(".immersive-headline").hide();
	$(".immersive-search").hide();
	$(".immersive-button").hide();
	$(".immersive-close").show();
	$("#immersiveComponent .immersive-background").addClass('transparent');	
   }

//else if the looping video background is selected  
   if ($(".immersive-play").hasClass("autoplay-yt")) {
	    $("#immersiveComponent .immersive-background").append( "<div class='full-video'><div style='display: block; position: relative; max-width: 100%;'><iframe src='"+youtubeVideoURL+"?autoplay=1' frameborder='0' width='100%' height='630'></iframe></div></div>" ).removeClass("hidden-xs");
	$(".hide-mobile").css('display','none').html(""); 
	$("#video-container").hide();
	if ( $( ".careers-video-container" ).length != 0) {
		$(".careers-video-container").hide();
	}
	$(".immersive-play").hide();
	$(".immersive-headline").hide();
	$(".immersive-search").hide();
	$(".immersive-button").hide();
	$(".immersive-close").show();
	$("#immersiveComponent .immersive-background").addClass('transparent');
   }   
	      
});


//for close icon in top right
$(".tufa-declined").click(function() {
	
	if ($(".immersive-play").hasClass("click") || $(".immersive-play").hasClass("click-yt")) {
   $("#immersiveComponent .immersive-background").html("");
	$(".immersive-play").show();
	$(".immersive-headline").show();
	$(".immersive-search").show();
	$(".immersive-button").show();
	$(".immersive-close").hide();
	$("#immersiveComponent .immersive-background").removeClass("transparent").addClass("hidden-xs");
	$("div > #immersiveComponent .immersive-background.hidden-lg").css('display','').removeClass("hide-mobile hidden-xs");

	}
	
	if  ($(".immersive-play").hasClass("autoplay") || $(".immersive-play").hasClass("autoplay-yt")) {
	$(".full-video").html("");
	$("#video-container").show();
	if ( $( ".careers-video-container" ).length != 0) {
		$(".careers-video-container").show();
	}
	$(".immersive-play").show();
	$(".immersive-headline").show();
	$(".immersive-search").show();
	$(".immersive-button").show();
	$(".immersive-close").hide();
	$("#immersiveComponent .immersive-background").removeClass("transparent").addClass("hidden-xs");
	$("div > #immersiveComponent .immersive-background.hidden-lg").css('display','').removeClass("hide-mobile hidden-xs");

	}
});

//job search bar javascript code for static/click, looping video, and static image
$(".immersive-searchbar #jobSearchBox").bind("click keypress change focus", function() {
        if ($(this).val().length) {
            $(".immersive-searchbar .clearBtn").show();
        } else {
            $(".immersive-searchbar .clearBtn").hide();
        }
    });

$("#jobSearchBox").bind("click keypress change focus", function() {
        if ($(this).val().length) {
            $(".immersive-searchbar .clearBtn").show();
        } else {
            $(".immersive-searchbar .clearBtn").hide();
        }
    });
   
    $(".clearBtn").click(function(evt) {
        $(this).hide();
		evt.stopPropagation();
    });
}
//end of immersive hero component	

//if statement is used to prevent errors on pages where this code is not used (ie - insights/events. The error is caused because videojs is not defined when brightcove video is not on page. Show work on all other pages when necessary.)	
if (typeof videojs !== 'undefined') {
//this code is used for herotabbed Immersive component - allows for jump to times/text, and population of chapter list at bottom of component. It also allows for fullscreen on play button click and fullscreen on mobile to be landscape.

// initialize heroTabbed player, this is the video id we added in the video tag. IT MUST MATCH or this code will not work.
if ( $( "#tabbed-video" ).length != 0) {	
 var player = videojs('tabbed-video');
 
 //this code is used to play captioning of video automatically
		 player.on("play", function () {
		  //If you want to start English as the caption automatically
		  player.textTracks()[1].mode = "showing";
		});

//time to jump to and chapter text that appears as chapter navigation



  /* Removed, markers are provided dynamically from Tabbing Hero DCR
   var markers = [
         {
            time: 9.5,
            text: "Chapter 1: <br /> In consectetur felis nibh, vel blandit nulla iaculis vitae. Donec ante tortor, placerat quis tincidunt ut, placerat vel dolor."
         },
         {
            time: 16,
            text: "Chapter 2: <br />In consectetur felis nibh, vel blandit nulla iaculis vitae. Donec ante tortor, placerat quis tincidunt ut, placerat vel dolor."
         },
         {
            time: 23.6,
            text: "Chapter 3: <br /> In consectetur felis nibh, vel blandit nulla iaculis vitae. Donec ante tortor, placerat quis tincidunt ut, placerat vel dolor."
         },
         {
            time: 28,
            text: "Chapter 4: <br /> In consectetur felis nibh, vel blandit nulla iaculis vitae. Donec ante tortor, placerat quis tincidunt ut, placerat vel dolor."
         },
         {
            time: 60,
            text: "Chapter 5:<br /> In consectetur felis nibh, vel blandit nulla iaculis vitae. Donec ante tortor, placerat quis tincidunt ut, placerat vel dolor. "
         }
      ];

*/

   //load the marker plugin
   player.markers({
      markerTip:{
         display: true,
         text: function(marker){
            return marker.text;
         }
      },
      onMarkerReached: function(marker, newMarkerIndex) {
		  
		  //code used to indicate current chapter
		  if (($('#marker-list li')[newMarkerIndex]) !== newMarkerIndex) {
			  $($('#marker-list li')[newMarkerIndex]).addClass('active');	 
		  }
       		console.log(marker);
			
			//code used to remove active class of any non-active chapters
			$($('#marker-list li')[newMarkerIndex]).prevAll().removeClass('active');
      },
      markers: markers
   });

//code necessary to populate the chapters at bottom of video - added into #marker-list
   $(document).ready(function(){
      // insert marker list
      for(var i =0; i < markers.length; i++){
         var item = $("<li data-index='"+i+"'><a>"+markers[i].text+"</a></li>");
         $("#marker-list").append(item);
      }

      // set up click event for navigating chapters of video
      $("#marker-list li").click(function(){
         var index = $(this).data("index");

         player.currentTime(markers[index].time);
		 
		$('#marker-list li').prevAll().removeClass('active');
		  $('#marker-list li').nextAll().removeClass('active');
		//  $(this).addClass('active');
      });

		//used to make play button play full screen on click
		$('.tabbed-play-button').on('click', function() {
			player.requestFullscreen();
			player.play();
			player.muted(false);
		});

		//used for fullscreen playback
		  player.on('fullscreenchange', function(evt) {
			if (player.isFullscreen()) {
			  // when in full screen the volume turns on	  
			 player.muted(false);

			 
			//	if ( window.matchMedia("(orientation: portrait)").matches ) {
			//		$(player).append('<div data-role="popup" id="popupVideo" data-overlay-theme="b" data-theme="a" data-tolerance="15,15" class="ui-content"></div>');  
					// window.confirm("Best viewed in landscape mode");
				//	$('video').css('transform', 'rotate(-90deg)', 'transform-origin', 'left-top', 'width','100vh', 'overflow-x','hidden', 'position','absolute', 'top', '100%', 'left','0');
			//	}
			
			 //force landscape mode for video on fullscreen on mobile
		//	  window.lockOrientation("landscape");
			 screen.orientation.lock("landscape");
			 screen.lockOrientation("landscape");
			 screen.msLockOrientation.lock("landscape");
			 screen.mozLockOrientation.lock("landscape");
			
			} else {
			  // mute video at all times
			  player.muted(true);
			}
		  });

   });	
}
}
}); //end document.ready
//ends heroTabbed JS 

//if statement is used to prevent errors on pages where this code is not used (ie - insights/events. The error is caused because videojs is not defined when brightcove video is not on page. Show work on all other pages when necessary.)	
if (typeof videojs !== 'undefined') {
// initialize testimonial player, this is the video id we added in the video tage for testimonials tag. IT MUST MATCH or this code will not work. This is separate from previous player in the case that testimonials component and heroTabbed are used on same page. 
	 if ( $( "#testimonial-video" ).length != 0) {
		var testimonialPlayer = videojs('testimonial-video');

			//used to make testimonial play button play full screen on click
			$('.testimonial-play').on('click', function() {
				testimonialPlayer.requestFullscreen();
				testimonialPlayer.play();
				testimonialPlayer.muted(false);
			});

			//used for fullscreen playback
			  testimonialPlayer.on('fullscreenchange', function(evt) {
				if (testimonialPlayer.isFullscreen()) {
				  // when in full screen the volume turns on	  
				 testimonialPlayer.muted(false);

				 //force landscape mode for video on fullscreen on mobile
				 screen.orientation.lock("landscape");
				 screen.lockOrientation("landscape");
				 screen.msLockOrientation.lock("landscape");
				 screen.mozLockOrientation.lock("landscape");

				} else {
				  // mute video at all times
				  testimonialPlayer.muted(true);
				}
			  });
	 }
	
	// initialize players for tabbed case study and demo for Insights
	if ( $( "#casestudy1-video" ).length != 0) {
	 var casestudy1Player = videojs('casestudy1-video');

			//used to make play button play full screen on click
			$('.casestudy1-play').on('click', function() {
				casestudy1Player.requestFullscreen();
				casestudy1Player.play();
				casestudy1Player.muted(false);
			});

			//used for fullscreen playback
			  casestudy1Player.on('fullscreenchange', function(evt) {
				if (casestudy1Player.isFullscreen()) {
				  // when in full screen the volume turns on	  
				 casestudy1Player.muted(false);

				 //force landscape mode for video on fullscreen on mobile
				 screen.orientation.lock("landscape");
				 screen.lockOrientation("landscape");
				 screen.msLockOrientation.lock("landscape");
				 screen.mozLockOrientation.lock("landscape");

				} else {
				  // mute video at all times
				  casestudy1Player.muted(true);
				}
			  });
	}

	if ( $( "#casestudy2-video" ).length != 0) {
	var casestudy2Player = videojs('casestudy2-video');

			//used to make play button play full screen on click
			$('.casestudy2-play').on('click', function() {
				casestudy2Player.requestFullscreen();
				casestudy2Player.play();
				casestudy2Player.muted(false);
			});

			//used for fullscreen playback
			  casestudy2Player.on('fullscreenchange', function(evt) {
				if (casestudy2Player.isFullscreen()) {
				  // when in full screen the volume turns on	  
				 casestudy2Player.muted(false);

				 //force landscape mode for video on fullscreen on mobile
				 screen.orientation.lock("landscape");
				 screen.lockOrientation("landscape");
				 screen.msLockOrientation.lock("landscape");
				 screen.mozLockOrientation.lock("landscape");

				} else {
				  // mute video at all times
				  casestudy2Player.muted(true);
				}
			  });
	}
}
