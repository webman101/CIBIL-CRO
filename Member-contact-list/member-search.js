$(document).ready(function(){
    $('input.search-input').on('blur', function(){
        $(this).parents().eq(1).removeClass('focused');
     }).on('focus', function(){
       $(this).parents().eq(1).addClass('focused');
     });

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
          
          /* console.log('matches', matches); */
      
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
});
