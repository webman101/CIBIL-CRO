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
    $('.custom-radio input[type=radio]').change(function(){
        let parent = $(this).parents('.filter-value');
        $(parent).siblings().removeClass('selected')
        $(parent).addClass('selected')
        $(parent).parents('.sortBody').toggle('fast');
    })
    $('.sortTab__M .head').click(function(e){
        if(e.target == this){
            $(this).parent('.sortTab__M').toggleClass('opened')
            $(this).parent('.sortTab__M').find('.sortBody').toggle('fast');
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
    $('.custom-select-options>span[data-target="'+$(element).data('target')+'"]').click()
}