$(document).ready(function($) {

    $("#register-form").validate({
        rules: {
            name: "required",
            number: {
                required: true,
                minlength: 10
            },
            city: "required",
            gender: "required"

        },
        messages: {
            name: "Please enter your Name",
            number: {
                required: "Please enter your Number",
                minlength: "Your Number must be at 10 characters long"
            },
            city: "Please enter your city",
            gender: "This field is required"
        },
        errorPlacement: function(error, element) {
            if (element.is(":radio")) {
                error.appendTo(element.parents('.form-group'));
            } else { // This is the default behavior 
                error.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            form.submit();
        }

    });
});



const mouseEvent = e => {
    if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
        document.removeEventListener('mouseout', mouseEvent);

        document.querySelector('.exit-intent-popup').classList.add('visible');
    }
};

document.addEventListener('mouseout', mouseEvent);


const exit = e => {
    if (e.target.className === 'close-tab') {
        document.querySelector('.exit-intent-popup').classList.remove('visible');
    }
};

document.querySelector('.exit-intent-popup').addEventListener('click', exit);


// $('#popup-name').on('change', function() {
//     if ($(this).val() !== "") {
      
//     }
// });
// if($("#html").prop('checked') == true){
//     $('#submit').removeClass('disabled');
// }

 $('#html').on('change', function() {
    if ($("#html").is(":checked")) {
        $('#submit').removeClass('disabled');
    }
    else{
        $('#submit').addClass('disabled');

    }
 });