$(document).ready(function(){
    $('input.search-input').on('blur', function(){
        $(this).parents().eq(1).removeClass('focused');
     }).on('focus', function(){
       $(this).parents().eq(1).addClass('focused');
     });


/* Search */
var banksApi = "bank-members.json"; // add your json file path

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

$.getJSON(banksApi, function(data){
    var banks = data;
    /* console.log("banks: ", banks); */

    var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
      /* console.log(cb); */

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
      /* console.log(q); */
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array

      $.each(strs.data, function(i, str) {
        /* console.log("str 5 :", str[5]); */
        if (substrRegex.test(str[5])) {
          matches.push(str[5]);
        }
      });

      var matches1 = matches.filter(unique).map(e =>{
        return ({value: e})
      });

      console.log(matches1);

      cb(matches1);
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
      "ajax": 'bank-members.json', // add your json file path
      "columns": [
        { "searchable": false },
        { "searchable": false },
        { "searchable": false },
        { "searchable": false },
        { "searchable": false },
        null
      ]
  } );

function defaultState(){
  $('.members-table-section').hide();
  $('.error-section').hide();
  $('.default-section').show();
}

function emptyField(){
  $('#search-input').val("");
  $('.dataTables_filter input[type=search]').val("");
}

function noMemberData(){
  var noMenmberData = $("#members-table tbody tr:first-child td:first-child");
  if (noMenmberData.html()){
    ShowResult();
    closeKeyboard();
    /* console.log("table has data!"); */
  }
  else{
    $('.members-table-section').hide();
    $('.default-section').hide();
    $('.error-section').show();
   /*  console.log("No data!"); */
  }
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
  $('.dataTables_filter input[type=search]').val(item.value);
  $('.dataTables_filter input[type=search]').keyup();
  noMemberData();
});

$('#search-input').on('keypress',function(e) {
  defaultState();
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
