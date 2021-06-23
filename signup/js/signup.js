$(document).ready(function() {
    $('.plans-radio-row .plans-list').on('change', function() {
        $('.plans-list').not(this).prop('checked', false);
        let value = $('.plans-radio-row input:checkbox[name=radio-group]:checked').val();
        if(value == null) {
            $("#plans-title").text('CIBIL Free Plan');
            $("#plans-subtitle").text('One-time score. Does not update.');  
            $("#plans-price").text("");
            $(".u-text").text("Upgrade Now");
        } else {
            $("#plans-title").text($('.plans-radio-row input:checkbox[name=radio-group]:checked').data('title'));
            $("#plans-subtitle").text($('.plans-radio-row input:checkbox[name=radio-group]:checked').data('subtitle'));
            $("#plans-price").text("₹"+value);
            $(".u-text").text("Change Plan");
        }        
    }); 
})