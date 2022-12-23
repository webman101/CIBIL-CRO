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
        $(parent).parents('.sortTab__M').toggleClass('opened')
    })
    $('.sortTab__M .head').click(function(e){
        if(e.target == this){
            $(this).parent('.sortTab__M').toggleClass('opened')
            $(this).parent('.sortTab__M').find('.sortBody').toggle('fast');
        }
    })
    $('.sortOption').click(function(){
        let reverse = false
        if($(this).attr('reverse')){
          reverse = true
          $(this).removeAttr('reverse')
        }
        else{
          $(this).attr('reverse',true)
        }
        sortData($(this), $(this).attr('target'), reverse)
    })
    $('.sortTab__M .filter-value input[type=radio]').change(function(){
        let reverse = false
        if($(this).attr('reverse')){
          reverse = true
        }
        sortData($(this), $(this).val(), reverse)
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

function sortData(element, target, reverse){
    let offers = $(element).parents('.tab-panel').find('.offerCards .offerCard').get();
    console.log('offers', offers)
    offers.sort((a, b) => {
      let nameA, nameB;
      if(target == 'partner' || target == "type"){
        nameA = $(a).attr(target).toUpperCase();
        nameB = $(b).attr(target).toUpperCase();
      }
      else{
        nameA = parseInt($(a).attr(target).replace(/\D/g,''));
        nameB = parseInt($(b).attr(target).replace(/\D/g,''));
      }
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    if(reverse){
      offers.reverse()
    }
    $(offers).each(function(i,e){
      $(this).css('order',i)
    })
  
}