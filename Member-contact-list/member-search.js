$(document).ready(function(){
    $('input.search-input').on('blur', function(){
        $(this).parents().eq(1).removeClass('focused');
     }).on('focus', function(){
       $(this).parents().eq(1).addClass('focused');
     });


/* Search */
var banksApi = "banks.json";
$.getJSON(banksApi, function(data){
    var banks = data;
    /* console.log(banks); */

    var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str.value)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
};
$('.search-bar .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'banks',
  display: 'value',
  limit: 100,
  source: substringMatcher(banks),
  templates: {
    suggestion: function(data) {
        return '<p>' + data.value + '</p>';
    }
  }
});
});

/* Table */
  $('#members-table').DataTable( {
      "ajax": 'members.json',
      "columns": [
        { "searchable": false },
        { "searchable": false },
        { "searchable": false },
        { "searchable": false },
        { "searchable": false },
        null
      ]
  } );

function emptyField(){
  $('#search-input').val("");
  $('.dataTables_filter input[type=search]').val("");
}

function ShowResult(){
  $('.default-section').hide();
  $('.members-table-section').hide();
  if ($("#members-table td").hasClass("dataTables_empty") ) {
    $('.members-table-section').hide();
    $('.error-section').show();
  }
  else{
    $('.error-section').hide();
    $('.members-table-section #members-table tbody tr td:last-child').css("display", "none");
    $("#members-table tbody br").replaceWith("<div class='dot'></div>");
    $('.members-table-section').show();
  }
}

function closeKeyboard(){
  $('.dataTables_filter input[type=search]').blur();
  $('#search-input').blur();
}

/* hide */
$('.members-table-section').css("display", "none");
$('.error-section').css("display", "none");
$('.members-table-section .hide-column').css("display", "none");
$('.members-table-section .dataTables_wrapper .row:first-child').css("display", "none");
$('.members-table-section .dataTables_wrapper .row:last-child').css("display", "none");
$('.members-table-section #members-table tbody tr td:last-child').css("display", "none");
$('.close-btn').fadeOut(300);


$('#search-input').keyup(function() {
  $('.dataTables_filter input[type=search]').keyup();
  $('.dataTables_filter input[type=search]').val($(this).val());
  $('.close-btn').fadeIn(300);
});

$('.typeahead').on('typeahead:selected', function(evt, item) {
  /* console.log(item.bank_name); */
  $('.dataTables_filter input[type=search]').val(item.bank_name);
  $('.dataTables_filter input[type=search]').keyup();
  ShowResult();
  closeKeyboard();
});

$('#search-input').on('keypress',function(e) {
  if(e.which == 13) {
    ShowResult();
    $('.members-table-section').hide();
    closeKeyboard();
    $('.error-section').show();
  }
});

$('#search-input').keyup(function(){
  if($(this).val() == ""){
    $('.close-btn').fadeOut(300);
    $('.members-table-section').hide();
    $('.error-section').hide();
    $('.default-section').show();
  }
});

$('.close-btn').click( function(){
  emptyField();
  ShowResult();
  if($('#search-input').val() == ""){
    $('.close-btn').fadeOut(300);
    $('.members-table-section').hide();
    $('.error-section').hide();
    $('.default-section').show();
  }
});

});
