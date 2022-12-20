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