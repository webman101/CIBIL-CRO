$(function() {

    var activeIndex = $('.active-tab').index(),
        $contentlis = $('.tabs-content li'),
        $tabslis = $('.tabs li');

    // Show content of active tab on loads
    $contentlis.eq(activeIndex).show();

    $('.tabs').on('click', 'li', function(e) {
        var $current = $(e.currentTarget),
            index = $current.index();

        $tabslis.removeClass('active-tab');
        $current.addClass('active-tab');
        $contentlis.hide().eq(index).show();
    });
});

$('.for-overlay .button-icon').click(function(e) {
    e.preventDefault();
    $(this).closest('.for-overlay').children('.overlay-card').removeClass('d-none');
});
$('.for-overlay .closeovelay').click(function(e) {
    e.preventDefault();
    $(this).closest('.for-overlay').children('.overlay-card').addClass('d-none');
});


$(document).ready(function() {
    // Show the first tab and hide the rest
    $('#largetabs-nav li:first-child').addClass('active');
    $('.tab-content').hide();
    $('.tab-content:first').show();

    // Click function
    $('#largetabs-nav li').click(function() {
        $('#largetabs-nav li').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').hide();

        var activeTab = $(this).find('a').attr('href');
        $(activeTab).fadeIn();
        return false;
    });
});


// $(".price").after('<span>₹</span>');
$('.modal-toggle1').on('click', function(e) {
    e.preventDefault();
    $('.modal1').toggleClass('is-visible');
    $('body').toggleClass('overflow-hidden');
});
$('.close-modal').on('click', function(e) {
    e.preventDefault();
    $('.modal1').removeClass('is-visible');
    $('body').removeClass('overflow-hidden');

});



$('.modal-toggle2').on('click', function(e) {
    e.preventDefault();
    $('.modal2').toggleClass('is-visible');
    $('body').removeClass('overflow-hidden');
});
$('.close-modal').on('click', function(e) {
    e.preventDefault();
    $('.modal2').removeClass('is-visible');
    $('body').removeClass('overflow-hidden');

});


$(document).mouseup(function(e) {
    var container = $(".dd-input");

    if (!container.is(e.target) // if clicked outside
        &&
        container.has(e.target).length === 0) {
        container.hide();
        $(".dd-input").prop("checked", false); //to uncheck
    }
});
$('.benefits-outer').slideUp();

$('.offer-details').click(function(e) {
    e.preventDefault();
    // $(this).next().filter('.benefits-outer').slideToggle();
    $(this).toggleClass('reverse-arrow')

    $(this).closest('.itemsBox').siblings('.benefits-outer').slideToggle();
    // $('.benefits-outer').slideDOwn();
});
$('.offer-details').click(function(e) {
    e.preventDefault();
    // $(this).next().filter('.benefits-outer').slideToggle();

    $(this).toggleClass('reverse-arrow')
    $(this).closest('.mobile-grid').siblings('.benefits-outer').slideToggle();
    // $('.benefits-outer').slideDOwn();
});
var options = {
    valueNames: ['name', 'Amount', 'percent', 'annual-fees']
};

var userList = new List('users', options);


function getBank(el) {
    bank = $(el).attr('bank');
    alert(bank);
    $('.compare-price').text(bank);
}


// function extraTicketAttachment(el) {

//     if ($('input.append-onclick').is(':checked')) {
//         jQuery(".offer-to-compare .compare-grouped").prepend('<div class="ms-0 filled"><img src="img/comparebajaj.svg" alt="" class="offer-image" width="52px"><span class="compare-price">₹8,00,000</span><img src="img/times.svg" alt="" class="times"></div>')

//     }

//     // bank = $(el).attr('bank');
//     // alert(bank);
//     // $('.compare-price').text(bank);
// }

// function extraTicketAttachmenthdfc(el) {
//     if ($('input.append-onclick').is(':checked')) {

//         jQuery(".offer-to-compare .compare-grouped").prepend('<div class="ms-0 filled"><img src="img/hdfc.png" alt="" class="offer-image" width="52px"><span class="compare-price">₹8,00,000</span><img src="img/times.svg" alt="" class="times"></div>')
//     }

//     // bank = $(el).attr('bank');
//     // alert(bank);
//     // $('.compare-price').text(bank);
// }

//  function extraTicketAttachmentaditya(el) {
//      if ($('input.append-onclick').is(':checked')) {
//          jQuery(".offer-to-compare .compare-grouped").prepend('<div class="ms-0 filled"><img src="img/aditya.png" alt="" class="offer-image" width="52px"><span class="compare-price">₹8,00,000</span><img src="img/times.svg" alt="" class="times"></div>')
//      }

//  }


// // $(document).on("click", ".compare-button", function() {
// //     if ($('input.append-onclick').prop('checked', false)) {

// //         $(this).closest('.itemsBox').;
// //     }
// // });

$('.compare-message').hide();


// $("input.append-onclick").change(function() {
//     $(this).closest(".itemsBox").addClass('d-block', this.checked);
//     $('.compare-message').show();
// });

$("input.append-onclick").change(function() {
    $(this).closest(".itemsBox").find('.compare-row').hide();
    $('.compare-message').show();
});



$(document).on("click", ".times", function() {
    $(this).parent().hide();
    // jQuery(".offer-to-compare .compare-grouped").append('<div class="ms-0 blanked" style="border: 1px dashed #006685;box-sizing: border-box;border-radius: 4px;"></div>')

    // $("input").prop("checked", false); //to uncheck
});

$('.compare-button').click(function(e) {
    e.preventDefault();

    $(".itemsBox").addClass('hide-it');

    $('.slider-container-hide').hide();
});


(function($) {
    "use strict";

    $.fn.numericFlexboxSorting = function(options) {
        const settings = $.extend({
            elToSort: ".boxes .mobile-grid"
                // ,elToSort: ".boxes li"

        }, options);

        const $select = this;
        const ascOrder = (a, b) => a - b;
        const descOrder = (a, b) => b - a;

        $select.on("change", () => {
            const selectedOption = $select.find(".radio-input:checked").attr("data-sort");
            sortColumns(settings.elToSort, selectedOption);
        });

        function sortColumns(el, opt) {
            const attr = "data-" + opt.split(":")[0];
            const sortMethod = (opt.includes("asc")) ? ascOrder : descOrder;
            const sign = (opt.includes("asc")) ? "" : "-";

            const sortArray = $(el).map((i, el) => $(el).attr(attr)).sort(sortMethod);

            for (let i = 0; i < sortArray.length; i++) {
                $(el).filter(`[${attr}="${sortArray[i]}"]`).css("order", sign + sortArray[i]);
            }
        }

        return $select;
    };
})(jQuery);

// call the plugin
$(".b-select").numericFlexboxSorting();





$('.sorttoggle').slideUp();
$('.sort-tab').click(function(e) {
    e.preventDefault();
    $('.sorttoggle').slideToggle();
    $('.sort-tab').toggleClass('reversearrow');
});






$(document).on("click", ".radio-input", function() {

    var arnvh = $(this).closest(".sorttoggle1").children(".sorttitle").text();

    $('.sort-tab span').text('Sorted by: ' + arnvh);

});


var sho = $("#tab1 .list>div").length;
$('.numb').text(sho);



var arrowToggle = document.querySelector('.toggle-arrow')
    // var accordionContent = document.querySelector('.report-accordion-content')






var accItem = document.getElementsByClassName('accordionItem');
var accHD = document.getElementsByClassName('accordionItemHeading');



for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}

function toggleItem() {
    var itemClass = this.parentNode.className;
    for (i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close';
    }
    if (itemClass == 'accordionItem close') {
        this.parentNode.className = 'accordionItem open';
    }

}




var tab; // заголовок вкладки
var tabContent; // блок содержащий контент вкладки


window.onload = function() {
    tabContent = document.getElementsByClassName('reporttabContent');
    tab = document.getElementsByClassName('reporttab');
    hideTabsContent(1);
}

document.getElementById('reporttabs').onclick = function(event) {
    var target = event.target;
    if (target.className == 'reporttab') {
        for (var i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
}

function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add("hide");
        tab[i].classList.remove('whiteborder');
    }
}

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}


$('.tabgroup > div').hide();
$('.tabgroup > div:first-of-type').show();
$('.hitabs a').click(function(e) {
    e.preventDefault();
    var $this = $(this),
        tabgroup = '#' + $this.parents('.hitabs').data('tabgroup'),
        others = $this.closest('li').siblings().children('a'),
        target = $this.attr('href');
    others.removeClass('active');
    $this.addClass('active');
    $(tabgroup).children('div').hide();
    $(target).show();

})




if ($(window).width() < 480 || $(window).height() < 480) {


    $(".report-page-tabs").on("click", ".init", function() {
        $(this).closest(".report-page-tabs").children('li:not(.init)').toggle();
    $('.report-page-tabs').toggleClass('reverse');

    });

    var allOptions = $(".report-page-tabs").children('li:not(.init)');

    $(".report-page-tabs").on("click", "li:not(.init)", function() {
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $(".report-page-tabs").children('.init').html($(this).html());
        allOptions.toggle();
    });

}