var discount = 0;
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
            $("#plans-title").html('CIBIL '+$('.plans-radio-row input:checkbox[name=radio-group]:checked').data('title'));
            $(".plans-block-header").addClass('premium');
            $("#plans-subtitle").text($('.plans-radio-row input:checkbox[name=radio-group]:checked').data('subtitle'));
            $("#plans-price").text("₹"+value);
            $(".u-text").text("Change Plan");
        }        
    }); 

    $('#purchase-plans-radio .plans-list').on('change', function() {
        $('.plans-list').not(this).prop('checked', false);
        let value = $('#purchase-plans-radio input:checkbox[name=radio-group]:checked').val();
        if(value == null) {
            $("#plans-title").html('CIBIL Free Plan');
            $("#p-name").html('CIBIL Free Plan');
            $(".plans-block-header").removeClass('premium');
            $("#plans-subtitle").text('One-time score. Does not update.');  
            $("#p-subtitle").text('One-time score. Does not update.');  
            $("#plans-price").text("");
            $("#p-price").text("");
            $("#t-price").text("");
            $("#t-price-m").text("");
            $(".u-text").text("Upgrade Now");
            $(".price-block-descount").hide();
        } else {
            $("#plans-title").html('CIBIL '+$('#purchase-plans-radio input:checkbox[name=radio-group]:checked').data('title'));
            $("#p-name").html('CIBIL '+$('#purchase-plans-radio input:checkbox[name=radio-group]:checked').data('title'));
            $(".plans-block-header").addClass('premium');
            $("#plans-subtitle").text($('#purchase-plans-radio input:checkbox[name=radio-group]:checked').data('subtitle'));
            $("#p-subtitle").text($('#purchase-plans-radio input:checkbox[name=radio-group]:checked').data('subtitle'));
            $("#plans-price").text("₹"+value);
            $("#p-price").text("₹"+value);
            $("#t-price").text("₹"+(value-discount));
            $("#t-price-m").text("₹"+(value-discount));
            $(".u-text").text("Change Plan");
            $(".price-block-descount").show();
        }        
    }); 

    $('.signup-block .form-group input[type="text"],.signup-block .form-group input[type="email"],.signup-block .form-group input[type="password"], .form-group input[type="number"]').each(function () {
        if (!$(this).val()) {
            $(this).parent().removeClass("valid");
        } else {
            $(this).parent().addClass("valid");
        }
    });  
    
    $(document).on('blur change', '.signup-block .form-group input[type="text"],.signup-block .form-group input[type="email"],.signup-block .form-group input[type="password"], .form-group input[type="number"]', function () {
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


    // Sign up js

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
            $('#pin-code').parent().find('.input-error').text('PIN code is required');
            validate = false;
        }

        var pass = $("#password").val();
        let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(pattern.test(pass)){
            $('#password').parent().removeClass("error");
        }
        else{
            $('#password').parent().addClass("error");
            $('#password').parent().find('.input-error').text('The password should contain at least 8 characters and include an uppercase, a lowercase, a number & a special character.');
            validate = false;
        }

        var url = '/CIBIL-CRO/signup/otp-email';

        if (validate) {
            window.location.href = url;
        }
    });

    // OTP verification email js 

    $('.signup-block').on('click', '#verify-btn', function (e) {
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

        var otp_number = $('#otp_field').val();
        if (otp_number) {
            if (isNaN(otp_number)) {
                $('#otp_field').parent().addClass("error");
                $('#otp_field').parent().find('.input-error').text('Only numeric values supported');
                validate = false;
            } else if (otp_number.length != 6) {
                $('#otp_field').parent().addClass("error");
                $('#otp_field').parent().find('.input-error').text('Enter a 6 digit OTP sent to mobile');
                validate = false;
            } else if (otp_number != '111111') {
                $('#otp_field').parent().addClass("error");
                $('#otp_field').parent().find('.input-error').text('OTP is invalid');
                validate = false;
            } else {
                $('#otp_field').parent().removeClass("error");
                $('.otp-field-wrap .verify-otp').removeClass("d-none");
            }
        } else {
            $('#otp_field').parent().addClass("error");
            $('#otp_field').parent().find('.input-error').text('OTP cannot be blank');
            validate = false;
        }

        var url = '/CIBIL-CRO/signup/signup-additional-info';

        if (validate) {
            window.location.href = url;
        }
    });


    // OTP verification mobile js 

    $('.signup-block').on('click', '#verify-mobile-btn', function (e) {
        e.preventDefault();
        var validate = true;
        $('.signup-block .req-field input').each(function () {
            if (!$(this).val()) {
                validate = false;
                $(this).parent().addClass('error');
            }
        });

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

        var otp_number = $('#otp_field').val();
        if (otp_number) {
            if (isNaN(otp_number)) {
                $('#otp_field').parent().addClass("error");
                $('#otp_field').parent().find('.input-error').text('Only numeric values supported');
                validate = false;
            } else if (otp_number.length != 6) {
                $('#otp_field').parent().addClass("error");
                $('#otp_field').parent().find('.input-error').text('Enter a 6 digit OTP sent to mobile');
                validate = false;
            } else if (otp_number != '111111') {
                $('#otp_field').parent().addClass("error");
                $('#otp_field').parent().find('.input-error').text('OTP is invalid');
                validate = false;
            } else {
                $('#otp_field').parent().removeClass("error");
                $('.otp-field-wrap .verify-otp').removeClass("d-none");
            }
        } else {
            $('#otp_field').parent().addClass("error");
            $('#otp_field').parent().find('.input-error').text('OTP cannot be blank');
            validate = false;
        }

        var url = '/CIBIL-CRO/signup/signup-additional-info';

        if (validate) {
            window.location.href = url;
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
    
    $('.edit-email').on('click', function ( e ) {  
        var url = '/CIBIL-CRO/signup/signup-page'; 
        window.location.href = url;
        // var num = $('.otp-form #emailId').val();      
        // $(this).addClass('hide');
        // $(this).parent().removeClass('prefilled');
        // $('.otp-form #emailId').attr("readonly", false);
        // $('.otp-form #emailId').focus().val('').val(num); 
    }); 

    $('.edit-mobile').on('click', function ( e ) {   
        var url = '/CIBIL-CRO/signup/signup-page';
        window.location.href = url;
        // var num = $('.otp-form #mobile-number').val();      
        // $(this).addClass('hide');
        // $(this).parent().removeClass('prefilled');
        // $('.otp-form #mobile-number').attr("readonly", false);
        // $('.otp-form #mobile-number').focus().val('').val(num); 
    }); 

    $('#acceptQBtn').on('click', function (e) {
        var validate = true;
        var url = '/CIBIL-CRO/signup/complete-purchase';
        if (validate) {
            window.location.href = url;
        }
    });

    $(".otp-form #mobile-number").blur(function(){
        $('.edit-mobile').removeClass('hide').addClass('show');
        $(this).parent().addClass('prefilled');
        $('.otp-form #mobile-number').attr("readonly", true);
    });

    $(".otp-form #emailId").blur(function(){
        $('.edit-email').removeClass('hide').addClass('show');
        $(this).parent().addClass('prefilled');
        $('.otp-form #emailId').attr("readonly", true);
    });

    $("#to-top").click(function() {
        // $('html, body').animate({
        //     scrollTop: $(".plans-block").offset().top - 70
        // }, 500);
        $("html, body").animate({ scrollTop: 0 }, "slow");
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
var verify_validate = true;
    $('input[name=radio_step1],input[name=radio_step2],input[name=radio_step3],input[name=radio_step4],input[name=radio_step5]').on('change', function () {
        validate_verify_yourself();
    });

function validate_verify_yourself() {
    var names = [];
    var verify_validate = true;

    $('.account-info input:radio').each(function () {
        var rname = $(this).attr('name');
        if ($.inArray(rname, names) == -1) names.push(rname);
    });

    $.each(names, function (i, name) {
        if ($('input[name="' + name + '"]:checked').length == 0) {
            verify_validate = false;
        }
    });

    if (verify_validate) {
        $('.button-yellow').removeClass('disabled');
        $('.button-yellow').attr("disabled", false);
    }
}

$('#applyCouponCode').click(function(){
    discount = 120;
    if($('#coupon_code').val() != ''){
        $('#t-price span').text(Number($('#t-price span').text()) - discount);
        $('#t-price-m span').text(Number($('#t-price-m span').text()) - discount);
        $('.promocode-wrapper--inner').removeClass('hide');
        $('.form-group-container').hide();
        $('.price-block-descount').removeClass('hide');
    }
   else{
        $('#coupon_code').parent().addClass("error");
        $('.price-block-descount').addClass('hide');
   }
});

$('#acceptQBtn1').on('click', function (e) {
    var validate = true;
    var url = '/CIBIL-CRO/signup/pair-device.html';
    if (validate) {
        window.location.href = url;
    }
});

// $(document).ready(function() {

//     checked = $("input[type=text]") > length == 0;
//     $('#accept-btn').addClass('disabled');
//     console.log('hey');

// });


    // if( !$('input').val() ) {
    //       $('#accept-btn').addClass('disabled');
    // };







    $('.credit-card-button').addClass('disabled');

    $('.card-input-2,.card-input-3').blur(function()          //whenever you click off an input element
    {                   
        if( $(this).val() ) {                      //if it is blank. 
            $('.credit-card-button').removeClass('disabled');
        }
        else if("#input:empty") {
            $('.credit-card-button').addClass('disabled');

        }
    });
    $(".password-eye").click(function() {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });
      
      $('#verify-btn').addClass('disabled');

      $('.form-control-otp').blur(function()          //whenever you click off an input element
      {                   
          if( $(this).val() ) {                      //if it is blank. 
            $('#verify-btn').removeClass('disabled');
          }
          else if("#input:empty") {
            $('#verify-btn').addClass('disabled');
  
          }
      });
    //   if( !$('.form-control-otp').val()) { 
    //     $('#verify-btn').addClass('disabled');
    //    }
    //    else {
    //     $('#verify-btn').removeClass('disabled');
    //    }