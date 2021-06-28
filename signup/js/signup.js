$(document).ready(function() {
    $('.plans-radio-row .plans-list').on('change', function() {
        $('.plans-list').not(this).prop('checked', false);
        let value = $('.plans-radio-row input:checkbox[name=radio-group]:checked').val();
        if(value == null) {
            $("#plans-title").html('CIBIL Free Plan');
            $(".plans-block-header").removeClass('premium');
            $("#plans-subtitle").text('One-time score. Does not update.');  
            $("#plans-price").text("");
            $(".u-text").text("Upgrade Now");
        } else {
            $("#plans-title").html('CIBIL '+$('.plans-radio-row input:checkbox[name=radio-group]:checked').data('title')+' <span>(Upgrade)</span');
            $(".plans-block-header").addClass('premium');
            $("#plans-subtitle").text($('.plans-radio-row input:checkbox[name=radio-group]:checked').data('subtitle'));
            $("#plans-price").text("₹"+value);
            $(".u-text").text("Change Plan");
        }        
    }); 

    $('.signup-block .form-group input[type="text"],.signup-block .form-group input[type="email"],.signup-block .form-group input[type="password"]').each(function () {
        if (!$(this).val()) {
            $(this).parent().removeClass("valid");
        } else {
            $(this).parent().addClass("valid");
        }
    });  
    
    $(document).on('blur change', '.signup-block .form-group input[type="text"],.signup-block .form-group input[type="email"],.signup-block .form-group input[type="password"]', function () {
        if (!$(this).val()) {
            $(this).parent().removeClass("valid");
        } else {
            $(this).parent().addClass("valid");
        }
    });

    $("#flip").click(function(){
        $(this).toggleClass("opened");
        $("#collapseExample").toggleClass("d-block");
    });


    $('.signup-block').on('click', '#accept-btn', function (e) {
        e.preventDefault();
        var validate = true;
        $('.signup-block .req-field input').each(function () {
            if (!$(this).val()) {
                validate = false;
                $(this).parent().addClass('error');
            }
        });

        var emailid = $('#emailId').val();
        if (emailid) {
            if (!IsEmail(emailid)) {
                $('#emailId').parent().addClass("error");
                $('#emailId').parent().find('.input-error').text('Please enter a valid email id.');
                validate = false;
            } else if (emailid == 'test@test.com') {
                $('#emailId').parent().addClass("error");
                $('#emailId').parent().find('.input-error').text('Account with this email id already exists');
                validate = false;
            } else {
                $('#emailId').parent().removeClass("error");
            }
        }


        if(!$('#first-name').val()){
            $('#first-name').parent().addClass('error');
        } else {
            $('#first-name').parent().removeClass('error'); 
        }

        if(!$('#last-name').val()){
            $('#last-name').parent().addClass('error');
        } else {
            $('#last-name').parent().removeClass('error'); 
        }

        var number = $('#mobile-number').val();
        if (number) {
            if (isNaN(number)) {
                $('#mobile-number').parent().addClass("error");
                $('#mobile-number').parent().find('.input-error').text('Only numeric values supported');
                validate = false;
            } else if (number.length != 10) {
                $('#mobile-number').parent().addClass("error");
                $('#mobile-number').parent().find('.input-error').text('Enter a 10 digit mobile number');
                validate = false;
            } else if (number == '9999999999') {
                $('#mobile-number').parent().addClass("error");
                $('#mobile-number').parent().find('.input-error').text('Account with this mobile no. already exists');
                validate = false;
            } else {
                $('#mobile-number').parent().removeClass("error");
            }
        } else {
            $(this).parent().addClass("error");
            $(this).parent().find('.input-error').text('Mobile number cannot be blank');
            validate = false;
        }

        var pincode = $('#pin-code').val();
        if (pincode) {
            if (isNaN(pincode)) {
                $('#pin-code').parent().addClass("error");
                $('#pin-code').parent().find('.input-error').text('Only numeric values supported');
                validate = false;
            } else {
                $('#pin-code').parent().removeClass("error");
            }
        } else {
            $('#pin-code').parent().addClass("error");
            $('#pin-code').parent().find('.input-error').text('PIN Code is required');
            validate = false;
        }

        var pass = $("#password").val();
        let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(pattern.test(pass)){
            $('#password').parent().removeClass("error");
        }
        else{
            $('#password').parent().addClass("error");
            $('#password').parent().find('.input-error').text('The password should contain at least 8 characters and include an Uppercase, a Lowercase, a Number & a Special character.');
            validate = false;
        }

    });

    $('.language-switcher-list .language-switcher-item').on('click', function ( e ) {
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        var activetext = $(this).text().split(' ')[0];
        $('.language-switcher-trigger span').html(activetext);
    });

    $('.show-password').on('click', function ( e ) {
        var password = $("#password");
        if (password.attr('type') == 'password') {
            password.attr("type", "text");
        } else {
            password.attr("type", "password");
        }        
    });    

});


function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}