$(document).ready(function(){
    $('input.search-input').on('blur', function(){
        $(this).parents().eq(1).removeClass('focused');
     }).on('focus', function(){
       $(this).parents().eq(1).addClass('focused');
     });


/* Search */
var banksApi = "banks.json";
$.getJSON(banksApi, function(data){
    /* console.log(data); */

    var substringMatcher = function(strs) {
        /* console.log('strs', strs); */
        return function findMatches(q, cb) {
          /* console.log('q', q); */
          var matches, substringRegex;
      
          // an array that will be populated with substring matches
          matches = [];
         /*  console.log('matches', matches); */
      
          // regex used to determine if a string contains the substring `q`
          substrRegex = new RegExp(q, 'i');
      
          // iterate through the pool of strings and for any string that
          // contains the substring `q`, add it to the `matches` array
          $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
              matches.push(str);
            }
          });
          
         /*  console.log('matches', matches); */
      
          cb(matches);
        };
      };
      
      var banks = data.banks;
      
      $('.search-bar .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'banks',
        limit: 5,
        source: substringMatcher(banks)
      });
});

/* Table */
  $('#members-table').DataTable( {
      "ajax": 'members.json',
      "columns": [
        null,
        { "searchable": false },
        { "searchable": false },
        { "searchable": false },
        { "searchable": false },
        null
      ]
  } );

 $('#search-input').keyup(function() {
    $('.dataTables_filter input[type=search]').keyup();
    $('.dataTables_filter input[type=search]').val($(this).val());
});

function ErrorMessage(){
  if ($("#members-table td").hasClass("dataTables_empty") ) {
    $('.members-table-section').hide();
    $('.error-section').show();
  } else{
    $('.error-section').hide();
  }
}

/* hide */
$('.members-table-section').css("display", "none");
$('.error-section').css("display", "none");
$('.members-table-section .hide-column').css("display", "none");
$('.members-table-section .dataTables_wrapper .row:first-child').css("display", "none");
$('.members-table-section .dataTables_wrapper .row:last-child').css("display", "none");
$('.members-table-section #members-table tbody tr td:last-child').css("display", "none");

$('#search-input').keypress(function(){
  $('.default-section').hide();
  $('.members-table-section').show();
  $('.members-table-section #members-table tbody tr td:last-child').css("display", "none");
});

$('#search-input').keyup(function(){
  if($(this).val() == ""){
    $('.members-table-section').hide();
    $('.default-section').show();
    $('.members-table-section #members-table tbody tr td:last-child').css("display", "none");
  }
});

$('.typeahead').on('typeahead:selected', function(evt, item) {
  $('.dataTables_filter input[type=search]').val(item);
  $('.dataTables_filter input[type=search]').keyup();
  ErrorMessage();
});

$(".tt-menu .tt-suggestion").on('click touchstart', function (){
  console.log("Clicked!");
});

$('#search-input').keyup(function() {
  $("#members-table tbody br").replaceWith("<div class='dot'></div>");
  ErrorMessage();
});

});
