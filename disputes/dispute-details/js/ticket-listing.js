/* filter */

var checkedItem = $("input[name='status']:checked").closest('.dropdown-radio');
var defaultChecked = checkedItem.text();
$('.dropdown').find('button .dropdown-text').text(defaultChecked);

checkedItem.parents().eq(1).addClass('active');

$('.dropdown-radio').find('input').change(function() {
    var dropdown = $(this).closest('.dropdown');
    var radioname = $(this).attr('name');
    var checked = 'input[name=' + radioname + ']:checked';
    
    //update the text
    var checkedtext = $(checked).closest('.dropdown-radio').text();
    dropdown.find('button .dropdown-text').text( checkedtext );
    
    $('.dropdown-menu li').removeClass('active');
    var activeItem = $(checked).closest('.dropdown-radio');
    activeItem.parents().eq(1).addClass('active');

    //retrieve the checked value
    var thisvalue = dropdown.find( checked ).val();

    //change tab
    $('#'+thisvalue).trigger( "click" );
  });

  /* tooltip */
  var tooltip_trigger = $(".tooltip-toggle");
  var tooltipBoxId = tooltip_trigger.attr("tooltip-target");
  var tooltip_box = $(tooltipBoxId);
  var tooltip_box_arrow = $(".tooltip-box .tooltip-box__wraper:before");

  let calculatePosition = () => {
    let topPosition = tooltip_trigger.position().top;
    let leftPosition =  tooltip_trigger.position().left;
    let elHeight = tooltip_trigger.height()*2.2;
    let elWidth = tooltip_trigger.width()*70/100;
    if ( (leftPosition-elWidth) < 0 ){
      tooltip_box.css({"top":topPosition+elHeight, "left":leftPosition});
      $('head').append('<style>.tooltip-box .tooltip-box__wraper:before{left: '+ leftPosition +'px;}</style>');
    } else{
      tooltip_box.css({"top":topPosition+elHeight, "left":leftPosition-elWidth});
    }
  }

  let showTooltip = () => {
    tooltip_box.removeClass("hide");
    tooltip_box.addClass("show");
  }

  let hideTooltip = () => {
    tooltip_box.removeClass("show");
    tooltip_box.addClass("hide");
  }

  tooltip_trigger.mouseover(function(){
    calculatePosition();
    showTooltip();
  });
  tooltip_trigger.mouseout(function(){
    hideTooltip();
  });

  /* timeline dropdown */
  var dropdownToggler = $(".dropdown-head");
  dropdownToggler.click(function(){
    $(this).next().toggle('medium');
    $(this).parent().toggleClass("show");
  });