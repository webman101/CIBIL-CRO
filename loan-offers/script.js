function openPopup(popupId){
    $('#'+popupId).addClass('show')
}
function closePopup(popupId){
    $('#'+popupId).removeClass('show')
}

window.addEventListener('DOMContentLoaded', (event) => {
    $('.popup').click(function(e){
        if(e.target == this){
            closePopup($(this).attr('id'))
        }
    })
});

function customSelectInput(element){
    $('.custom-select-input').not($(element)).removeClass('opened');
    $('.custom-select-input').not($(element)).find('.custom-select-options').hide('fast');
    $(element).toggleClass('opened')
    $(element).find('.custom-select-options').toggle('fast');
}

function customSelectTab(element){
    $(element).siblings().removeClass("selected")
    $(element).addClass('selected')
    $(element).parents('.custom-select-input').find('.custom-select-value').html($(element).html())
    $('.tab-panel').removeClass('active');
    $($(element).data('target')).addClass('active');
    $('.tab').removeClass('active');
    $('.tab[data-target="'+$(element).data('target')+'"]').addClass('active');
}

function selectTab(element){
    // $(element).siblings().removeClass("active")
    // $(element).addClass('active')
    // $('.tab-panel').removeClass('active');
    // $($(element).data('target')).addClass('active');
    // $('.tab').removeClass('active');
    // $('.tab[data-target="'+$(element).data('target')+'"]').addClass('active');
    $('.custom-select-options>span[data-target="'+$(element).data('target')+'"]').click()
}