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
  