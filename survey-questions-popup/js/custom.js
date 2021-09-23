// $(document).ready(function($) {

//     $("#register-form").validate({
//         rules: {
//             name: "required",
//             number: {
//                 required: true,
//                 minlength: 10
//             },
//             city: "required",
//             gender: "required"

//         },
//         messages: {
//             name: "Please enter your Name",
//             number: {
//                 required: "Please enter your Number",
//                 minlength: "Your Number must be at 10 characters long"
//             },
//             city: "Please enter your city",
//             gender: "This field is required"
//         },
//         errorPlacement: function(error, element) {
//             if (element.is(":radio")) {
//                 error.appendTo(element.parents('.form-group'));
//             } else { // This is the default behavior 
//                 error.insertAfter(element);
//             }
//         },
//         submitHandler: function(form) {
//             form.submit();
//         }

//     });
// });



// const mouseEvent = e => {
//     if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
//         document.removeEventListener('mouseout', mouseEvent);

//         document.querySelector('.exit-intent-popup').classList.add('visible');
//     }
// };

// document.addEventListener('mouseout', mouseEvent);


// const exit = e => {
//     if (e.target.className === 'close-tab') {
//         document.querySelector('.exit-intent-popup').classList.remove('visible');
//     }
// };

// document.querySelector('.exit-intent-popup').addEventListener('click', exit);


// // $('#popup-name').on('change', function() {
// //     if ($(this).val() !== "") {

// //     }
// // });
// // if($("#html").prop('checked') == true){
// //     $('#submit').removeClass('disabled');
// // }

//  $('#html').on('change', function() {
//     if ($("#html").is(":checked")) {
//         $('#submit').removeClass('disabled');
//     }
//     else{
//         $('#submit').addClass('disabled');

//     }
//  });
$(document).ready(function() {

    $('.screen1').addClass('d-block');
    $('.screen1 .next').click(function() {
        $('.screen1').removeClass('d-block');
        $('.next').addClass('disabled');

        $('.screen2').addClass('d-block');
    });
    $('.screen2 .next').click(function() {
        $('.screen2').removeClass('d-block');
        $('.next').addClass('disabled');

        $('.screen3').addClass('d-block');
    });
    $('.back-2-screen-1').click(function() {
        $('.screen2,.screen3').removeClass('d-block');
        $('.screen1').addClass('d-block');
    });
    $('.back-2-screen-2').click(function() {
        $('.screen1,.screen3').removeClass('d-block');
        $('.screen2').addClass('d-block');
    });
});

$('.open-popup').click(function() {
    $('.exit-intent-popup').addClass('vissible');
});

$('.close-tab').click(function() {
    $('.exit-intent-popup').removeClass('vissible');
});

// $(".abc").change(function(){
//     if ($('.abc:checked').length == $('.abc').length) {
//     alert();
//     }
// });

 $(".abc").change(function(){
    if ($('.abc:checked').length > 0) {
        $('.next').removeClass('disabled');
    }
 });