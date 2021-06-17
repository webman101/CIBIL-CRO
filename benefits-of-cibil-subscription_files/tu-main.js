/* GTM Hack  for Local Testing:
	Uncomment the dataLayer variable to kill GTM errors on local files
	DO NOT CHECK IN UNCOMMENTED!!!!!!
*/
//var dataLayer = {push:function(){}};

/* ---- Global Variables ---- */
var saveFlag = false;
var mqXs = 'screen and (max-width:767px)';
var mqSm = 'screen and (min-width:768px)';
var mqSmRange = 'screen and (min-width:768px) and (max-width:991px)';
var mqMd = 'screen and (min-width:992px)';
var mqMdRange = 'screen and (min-width:992px) and (max-width:1199px)';
var mqLg = 'screen and (min-width:1200px)';

var isFeatureChartPresent = false;
/**
 * Closure to add in Blocking UI functionality to jQuery
 * @param  {object} $ jQuery
 */
(function($) {

	/**
	 * jQuery plugin for Blocking UI
	 * @param {object} _options Blocking options
	 */
	$.fn.Block = function(_options) {
		/*var options = _options || {};
		var icon = ' ' + options.icon ||  '';
		var iconSize = ' ' + options.iconSize || '';
		var animateIcon = options.animateIcon || false;*/
		var inProgress = '<div class="formBlocker inProgress">' +
			'<i class="fa fa-fw fa-spinner fa-spin fa-3x"></i>' +
			'<div class="progressMessage">'+$.validator.messages.submission.loading+'</div>' +
			'</div>';

		return this.each(function() {
			var $this = $(this);
			if (!$this.data('blocked')) {
				$this.data('blocked', true).closest('section, .col-lg-10, .insightSubscribeWrapper, .emailRightColumnWrapper, .emailWrapper').append(inProgress);
			}
		});
	};

	/**
	 * Removes the Blocking UI and edits the data as well
	 */
	$.fn.UnBlock = function() {
		return this.each(function() {
			$(this)
				.data('blocked', false)
				.css('position', '')
				.siblings('.element-blocker').remove();
		});
	};
})(jQuery);

/* ---- General Common Functions ---- */
function closePopover() {
	$('.popover').hide();
}

function showHideTabs(tab, cssClass) {
	$('#applicationTabs .' + cssClass).removeClass(cssClass);
	$('#' + tab + 'Tab').addClass(cssClass);
}


/* ---- Navigation Functions ---- */

/* ---- Main Nav ---- */
function toggleMobileMenu() {
	$('.activeSubNav').removeClass('activeSubNav');
	$('.openSubNav').slideUp(300);
	$('body').toggleClass('mobileMenuOpen');
}

function initHeaderMenus() {
	var $header = $('#headerMain');
	if($header.length > 0) {
		var headerOffset = 0;
		var $specialtyNav = $('.specialtyNav');
		var resizeTimer;
	
		$('.toggleMenu', $header).unbind('click');
		$('.toggleMenu', $header).on('click', toggleMenuHandler);
		if (Modernizr.mq(mqXs) || Modernizr.mq(mqSmRange)) {
			$('.dtToggle', $header).off('click', prodSolSubNavHandler);
		} else {
			$('.dtToggle', $header).off('click', toggleMenuHandler);
			$('.dtToggle', $header).on('click', prodSolSubNavHandler);
			headerOffset = 61;
		}
		if($specialtyNav.length === 0) {
			$header.affix({
				offset: {
					top: headerOffset
				}
			});
		}
	
		$(window).resize(function() {
			clearTimeout(resizeTimer);
	
			//we have to give a buffer so that items can resize before we recalculate
			resizeTimer = setTimeout(function() {
				var affixTop = 0;
	
				if (Modernizr.mq(mqMd)) {
					affixTop = 61;
				}
	
				$header.data('bs.affix').options.offset = affixTop;
			}, 250);
		});
	
		$('body').on('click', function(_evt) {
			var $header = $('#headerMain');
			if($header.length>0) {
				if (!jQuery.contains($header.get(0), _evt.target)) {
					closeMenu(_evt);
				}
			}
		});
	}
}

function closeMenu(_evt) {
	var whichMenu = $(_evt.currentTarget).data('target');
	var alreadyOpen = $('#' + whichMenu).hasClass('openSubNav');
	var openChoice = $('.activeSubNav');
	$('.openSubNav').slideUp(300, function() {
		openChoice.removeClass('activeSubNav');
	}).removeClass('openSubNav');
}

function toggleMenuHandler(_evt) {
	var whichMenu = $(_evt.currentTarget).data('target');
	var alreadyOpen = $('#' + whichMenu).hasClass('openSubNav');
	var openChoice = $('.activeSubNav');
	$('.openSubNav').slideUp(300, function() {
		openChoice.removeClass('activeSubNav');
	}).removeClass('openSubNav');

	if (!alreadyOpen) {
		$(this).addClass('activeSubNav');
		$('#' + whichMenu).slideDown(function() {
			$('body').one('click', function(_evt) {

			});
		}).addClass('openSubNav');
	}
}

function initMobileMenuScroll() {
	if (Modernizr.mq(mqXs) || Modernizr.mq(mqSmRange)) {
		$('#mobileMainNav').on('scroll', mobileNavTargetHandler);
	} else {
		$('#mobileMainNav').off('scroll', mobileNavTargetHandler);
	}
}

function mobileNavTargetHandler() {
	if ($('#mobileMainNav').scrollTop() > 0) {
		$('#targetNav').addClass('targetShadowed');
	} else {
		$('#targetNav').removeClass('targetShadowed');
	}
}

function initMainNavMoreInfo() {
	if (Modernizr.mq(mqXs)) {
		$('.subNav a').not('.noMoreInfo').off('mouseover', mainNavMoreHandler);
		$('.spSubHead').off('click', prodSolSubNavHandler);
	} else {
		$('.subNav a').not('.noMoreInfo').on('mouseover', mainNavMoreHandler);
		$('.spSubHead').on('click', prodSolSubNavHandler);
	}
}

function mainNavMoreHandler() {
	var moreInfoId = $(this).text().replace(/^[^a-z]*|[^a-z0-9-_:.]/ig, '') + 'SubNavMoreInfo';
	$('.subNavMoreInfo li:visible').hide();
	$('#' + moreInfoId).show();
}

function prodSolSubNavHandler() {
	$('#solutionsAndProductsSubNav .subNavMoreInfo').hide();
	$('.subNavMoreInfo li:visible').hide();
	$('.spSubHead').removeClass('active').next().hide();
	$(this).addClass('active').next().show().next().show();
	return false;
}

/* ---- Search Box functions ---- */
function showSearchField() {
	$(".targetNavLinks, .blue-bar").hide();
	$(".searchBox").show();
	$(".searchField").val("").focus();
	$("#targetNav").after("<div id='mobileFade' class='srchFade'></div>");
}

function hideSearchField() {
	$(".targetNavLinks, .blue-bar").show();
	$(".searchBox").hide();
	$(".srchFade").remove();
}

/* ---- Sticky Nav ---- */

/**
 *	This closure returns a stickyNav object that is self contained 
 * @param {jQuery} This takes the jQuery object 
 * @returns {object} returns a StickyNav factory object Object
 */
var stickyNav = (function(jQuery) {
	var src,
		template,
		templateHasLoaded = new $.Deferred();

	// sets a promise that will create the template once when the document is loaded
	$.when($.ready).then(function(data, textStatus, jqXHR) {
		var stickyNav = $('#stickyNavItem');
		if (stickyNav.length > 0) {
			src = stickyNav.html().replace(/[\u200B]/g, '');
			template = Handlebars.compile(src);
			templateHasLoaded.resolve();
		} else {
			templateHasLoaded.fail();
		}
	});

	/* Constructor for the StickyNav object
	 *
	 * waits for the document and the template to be ready */
	$.when($.ready, templateHasLoaded).then(function(data, textStatus, jqXHR) {

		var headingsData = [];

		//generate the array from the headings
		$('.navHeading').each(function(_idx, _item) {
			headingsData.push({ name: $(_item).data('nav'), id: $(_item).prop('id') });
		});

		//put the data into the template and generate the items
		var listItems = template(headingsData);

		//put the list items into the container
		$('.stickyNav').html(listItems);

		//activate scrollspy on the container
		var scrollSpyTarget = '#' + $('.stickyNav').parent().prop('id');
		$('body').scrollspy({ target: scrollSpyTarget });
	});

	return stickyNav;

})(jQuery);

function buildStickyNav(navHolder) {
	var headings,
		body;

	//get a list of all the headings
	headings = $('.navHeading');

	//save a reference to the body
	body = $('body');

	//stickyNav($('#'+navHolder), headings, body);	
}

/* ---- Side Nav ---- */

function sideNav(liObj) {
	$('.mainSideNav').children().removeClass('active');
	/*if (!Modernizr.mq(mqXs)) {
		$(liObj).addClass('active');
	}*/
	$(liObj).addClass('active');
	var subNav = $(liObj).data('subnav');
	$('.sideNavSubNav:visible').each(function(index, element) {
		var eId = '#' + $(element).attr('id');
		$(element).removeClass('subActive').slideUp(500);
	});
	$(subNav).not(':visible').addClass('subActive').slideDown(500);

}

function selectsubNavItem(subNavItemObj) {
	$(subNavItemObj).parent().siblings().removeClass('activeItem');
	$(subNavItemObj).parent().addClass('activeItem');
}


/* ---- Footer Nav ---- */
$(document).ready(function(){
	if (Modernizr.mq(mqXs)) {
		$('.headerFooter').removeClass('active').attr('aria-expanded', false);
		if (window.location.hostname == 'tu-pvw.transunion.com' || window.location.hostname == 'www.transunion.com' || window.location.hostname == 'www.tlo.com' || window.location.hostname == 'www.drivershistory.com') {
			if ($('#footerLink3').length) {
				$("#footerLink3").addClass('active').attr('aria-expanded', true);
			}
		}
	}
});

function footerAccordion(toggleLink) {
	var contentID = $(toggleLink).data('target');
	if (Modernizr.mq(mqXs)) {
		if ($(toggleLink).hasClass('active')) {
			$(contentID).slideUp(500);
			$(toggleLink).removeClass('active').attr('aria-expanded', false);
		} else {
			$('.headerFooter').removeClass('active').attr('aria-expanded', false);
			$(toggleLink).addClass('active').attr('aria-expanded', true);
			$('.footerContent').filter(':visible').slideUp(500);
			$(contentID).slideDown(500);
		}
	}
}

/*
function goToSection(navElement) {
	//$('#' + navElement).siblings().removeClass('active');
	//$('#' + navElement).addClass('active');
	var targetId = $('#' + navElement + ' > a').attr('href');
	var scrollTarget = $(targetId).offset().top - 130;
	$('body, html').animate({
						scrollTop: scrollTarget
					}, 500);
	//$('body, html').scrollTop(scrollTarget);
}
*/


// Removes leading whitespaces
function LTrim(value) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}
// Removes ending whitespaces
function RTrim(value) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}
// Removes leading and ending whitespaces
function trim(value) {
	return LTrim(RTrim(value));
}


/* ---- Functions to mark changes ona  page and ask people if they want to save ---- */
function setChangeSaveFlag() {
	saveFlag = true;
}

function checkChangeSaveFlag() {
	if (saveFlag === true) {}
}


/* ---- Function for the Products & Solutions Filter drop down ---- */
function filterComponents(whichProds, selectedObj, selectedObjText) {
	if (selectedObj == 'AllCategory') {
		$('#' + whichProds + ' .solutionsContainer').children().show();
	} else {
		$('#' + whichProds + ' .solutionsContainer').children().hide();
		$('#' + whichProds + ' .solutionsContainer').children("." + selectedObj).show();
	}
//	$('#' + whichProds + ' .filterDropdown').text(selectedObjText);
//	hideContentList(whichProds);
//	$('#' + whichProds + ' .filterDropdown').blur();
	var resultsNum = $('#' + whichProds + ' .solutionsContainer').children().filter(":visible").length;
	$('#' + whichProds + ' .resultsNum').html(resultsNum);
}

//function hideContentList(whichProds) {
//	$('#' + whichProds + ' .filterList').hide();
//}


/* ---- Functions for the Insights & Events ---- */
/* ---- Filter drop down ---- */
function filterInsightsEvents(whichEvents, selectedObj, selectedObjText, dropdownType, listType) {
	$('#' + whichEvents + ' .nonFeature').children().children().hide();
	$('#' + whichEvents + ' .nonFeature').children().children("." + selectedObj).show();
	hideInsightsEventsList(whichEvents, listType);
	$('#' + whichEvents + ' .' + dropdownType).blur();
}

function hideInsightsEventsList(whichEvents, listType) {
	$('#' + whichEvents + ' .' + listType).hide();
}
/* ---- Load More ---- */
function loadHiddenInsights() {
	$('.nonFeatureWrapper:hidden').show();
}


/* ---- Functions for the List Module ---- */
function filterSearch(liObj, whichList) {
	$('#' + whichList + ' .mainSideNav').children().removeClass('active');
	if (!Modernizr.mq(mqXs)) {
		$(liObj).addClass('active');
	}
	if (Modernizr.mq(mqXs)) {
		hideSearchList(whichList);
		$('#' + whichList + ' .refine').blur();
	}
}

function hideSearchList(whichList) {
	$('#' + whichList + ' .mainSideNav').hide();
}

/* ---- Function to get ellipsis when max char exceeds on searchDescription ---- */
function showEllipsis() {
	$('.searchDescription').each(function(index, element) {
		var descriptionText = $(element).text();
		if (descriptionText.length > 120) {
			descriptionText = descriptionText.substr(0, 117) + "...";
			$(element).text(descriptionText);
		}
	});
}

/* ---- Functions for contact form ---- */
function fieldLevelValidation() {
	$('.optionalField').on('keyup blur change', function() {
		if ($(this).val().length > 0) {
			$(this).addClass('checkValid');
			$(this).valid();
		} else {
			$(this).removeClass('checkValid');
			$(this).removeClass('valid');
		}
		toggleSubmitButton('formID');
	});
	$('.checkValid').on('keyup blur change', function() {
		$(this).valid();


		var $form = $(this).closest('form');
		toggleSubmitButton($form);
	});
}

function toggleSubmitButton(_$form) {
	var validFlag = true;

	$(' .checkValid', _$form).each(function(index, element) {
		if ($(element).hasClass('optionalField') && !$(element).hasClass('valid')) {
			validFlag = false;
		} else if (!$(element).hasClass('valid')) {
			validFlag = false;
		}
	});
	if (validFlag) {
		$(' .submitButton', _$form).prop('disabled', false);
	} else {
		$('.submitButton', _$form).prop('disabled', 'disabled');
	}
}

/**
 * Converts form submission to ajax call that looks for success or failure
 * Also adds a blocking element into the form that can be used to show info
 * @param  {object} _evt Form submission event
 */
function submitForm(_evt) {
	//prevent the default submit
	_evt.preventDefault();

	var $form = $(_evt.currentTarget);
	var submission = $.Deferred();

	var successMessage = '<div class="formMessage successMessage">' +
		'<i class="fa fa-fw fa-check-circle-o fa-3x"></i>' +
		'<div class="messageContent">'+$.validator.messages.submission.success+'</div>' +
		'</div>'; //Thanks! We\'ll get back to you soon.

	var failureMessage = '<div class="formMessage failureMessage">' +
		'<i class="fa fa-fw fa-exclamation-circle fa-3x"></i>' +
		'<div class="messageContent">'+$.validator.messages.submission.failed+'</div>' +
		'</div>';

	var reCaptchaMessage = '<div class="alert alert-warning"><span class="fa tufa-alert fa-2x alertIcon"></span>'+$.validator.messages.submission.recaptchaFailure+'</div>';

	var persMessage = '<div class="formMessage personalMessage">' +
		'<i class="fa fa-fw tufa-info-circle fa-3x"></i>' +
		'<div class="messageContent">' +
		$.validator.messages.submission.personalMessage +
		'</div>' +
		'</div>';

	/* Form field filtering */

	var comment = '';
	if ($('.commentsLength', $form).length > 0) {
		comment = $('.commentsLength', $form).val().toLowerCase().replace(/[$.,!]/g, '');
	}
	var filters = [
		'1795',
		'1799',
		'19',
		'1995',
		'1999',
		'2995',
		'2999',
		'cancel',
		'cancelled',
		'court order',
		'death',
		'deceased',
		'deduct',
		'dispute',
		'free credit report',
		'freeze',
		'freezelift',
		'http',
		'my child',
		'my credit',
		'my daughter',
		'my son',
		'racist',
		'scam',
		'scammed',
		'scammer',
		'stolen',
		'trial',
		'unfreeze',
		'unsubscribe',
		'victim'
	];
	var reg = new RegExp(filters.join('|'), 'i');

	if (!$form.data('blocked')) {
		$form.Block();
	}

	if (comment.match(reg)) {
		$form
			.data('blocked', false)
			.closest('section, .col-lg-10, .insightSubscribeWrapper, .emailRightColumnWrapper, .emailWrapper')
			.append(persMessage);
		$form.hide();
		$form.closest('section, .col-lg-10, .insightSubscribeWrapper, .emailRightColumnWrapper, .emailWrapper').children('.inProgress').hide();
	} else {
		$.ajax({
			type: "POST",
			url: $form.attr('action'),
			data: $form.serialize(),
			success: function(_data) {

				/* tag manager function for form submission */
				TagManagerPush('form', 'Form Submit', $form.attr('id'), $form.data('formtype'));
				
				/* trim function to remove all newlines, spaces and tabs */
				_data = $.trim(_data);
				
				if (_data === 'Success') {
					submission.resolve();
				} else if (_data === 'Failure') {
					submission.reject();
				} else if (_data === 'Invalid') {
					submission.reject('reCaptcha');
				} else {
					submission.reject();
				}
			},
			error: function() {
				submission.reject();

				/* tag manager function for form errors */
				TagManagerPush('form', 'Form Error', $form.attr('id'), $form.data('formtype'));
			},
			dataType: 'text'
		});
	}

	$.when(submission).done(function() {
		$form
			.data('blocked', false)
			.closest('section, .col-lg-10, .insightSubscribeWrapper, .emailRightColumnWrapper, .emailWrapper')
			.append(successMessage);
		$form.prop('disabled', true).hide();
		$form[0].reset();
	}).fail(function(data) {
		if (data === 'reCaptcha') {
			$form
				.data('blocked', false)
				.prepend(reCaptchaMessage);
		} else {
			$form
				.data('blocked', false)
				.closest('section, .col-lg-10, .insightSubscribeWrapper, .emailRightColumnWrapper, .emailWrapper')
				.append(failureMessage);
			$form.hide();
		}
	}).always(function() {
		$form.closest('section, .col-lg-10, .insightSubscribeWrapper, .emailRightColumnWrapper, .emailWrapper').children('.inProgress').hide();
	});
}

/*set up the form submission listener */
$(document).ready(function() {
	
	//loop through all the forms and set up submit handlers
	$('form[data-formtype^="contact"]').each(function() {
		
		if ($("#first_name") && $("#elqCustomerGUID") && $("#uniqueformid")) {
		  $('#first_name').on("keyup", function(){
			 $("input[name=uniqueformid]").val($('#elqCustomerGUID').val());
		   });
		};
		
		var $this = $(this);

		$this.on('submit', submitForm);

	});
	//when the user selects an option on the healthcare business type, depending on selected value it displays additional business need field or not. Also depending on the option selected from business type display different options in the business need depending if it's hospital over 150 beds or Payer option
	$("select[name='healthcareBusinessType']").on('change', function() {
		var HCBusType = getDropdownValues('healthcareBusinessType');
		if (HCBusType.includes('Hospital or Health System')) {
			$('.businessneed, .hospitalsOver150').removeClass('hidden');
			$(' .healthcarePayer').addClass('hidden');
			$(" select[name='businessneed']")
				.prop('aria-required', true)
				.addClass('required');
		} else if (HCBusType.indexOf('Healthcare Payer / Commercial Health Plan / MCO') > -1) {
			$(' .businessneed,  .healthcarePayer').removeClass('hidden');
			$(' .hospitalsOver150').addClass('hidden');
			$(" select[name='businessneed']")
				.prop('aria-required', true)
				.addClass('required');
		} else {
			$(' .businessneed').addClass('hidden');
			$(" select[name='businessneed']")
				.prop('aria-required', false)
				.removeClass('required');
		}
	});

	//looking for value submitted in the industry dropdown and display additional field
	$("select[name='industry-dropdown']").on('change', function() {
		var formIndustry = getDropdownValues('industry-dropdown');
		if (formIndustry.indexOf('Healthcare') > -1) {
			$('.additionalFields, .healthcareBusinessType').removeClass('hidden');
			$('.rsunitsowned').addClass('hidden');
			$("select[name='healthcareBusinessType']")
				.prop('aria-required', true)
				.addClass('required checkValid error');
		} else if (formIndustry.indexOf('Property Management') > -1) {
			$('.additionalFields, .rsunitsowned').removeClass('hidden');
			$('.healthcareBusinessType, .businessneed').addClass('hidden');
			$("select[name='rsunitsowned']")
				.prop('aria-required', true)
				.addClass('required checkValid error');
		} else {
			$('.additionalFields, .healthcareBusinessType, .businessneed, .rsunitsowned').addClass('hidden');
			$("select[name='healthcareBusinessType']")
				.prop('aria-required', false)
				.removeClass('required');
		}
	});	
 $("select[name='srg-industry-dropdown']").on('change', function () {
        var SRGBusTypeValue = getDropdownValues('srg-industry-dropdown');

        console.log(SRGBusTypeValue);
        if (SRGBusTypeValue.indexOf('Real Estate / Financial / Brokerage') > -1) {
          $('#business-need').removeClass("hidden");
          $("select[name='businessNeed']").removeClass("hidden");
			$("select[name='businessNeed']").prop('aria-required', true).addClass('required checkValid error');
            console.log(SRGBusTypeValue);
        } else if (SRGBusTypeValue.indexOf('Unclaimed Property Locator Services') > -1) {
			  	$('#00N30000003pOH9').val('Oil & Gas / Energy');
				console.log(SRGBusTypeValue);
		}else {
            $('#business-need').addClass("hidden");
          $("select[name='businessNeed']").addClass("hidden");
			$("select[name='businessNeed']").prop('aria-required', false).removeClass('required checkValid error');
			$('#00N30000003pOH9').val('');
        }
    });

});
	
	//used for hidden fields on .com form

function getDropdownValues(fieldName) {
	var dropdownValues = [];
	var x = document.getElementsByName(fieldName);
	for (var i = 0; i < x.length; i++) {
		dropdownValues.push(x[i].value);
	}
	return dropdownValues;
}
/**
 * Tag Manager Functions
 */

/**
 * Pushes the tag manager data object to the dataLayer
 * @param {String} _event    
 * @param {String} _category 
 * @param {String} _action   
 * @param {String} _label    
 */
function TagManagerPush(_event, _category, _action, _label) {
	var obj;

	obj = {
		'event': _event,
		gaEvent: {
			'category': _category,
			'action': _action,
			'label': _label,
		},
	};

	//console.log(JSON.stringify(obj));

	dataLayer.push(obj);
}

/**
 * Sets up a timer that looks for addthis and sets listeners once it is loaded
 */
(function() {
	var addThisTimer = setInterval(function() {
		if (typeof addthis !== 'undefined') {
			clearInterval(addThisTimer);

			//once add this has been loaded wait for the addthis.ready listener
			addthis.addEventListener('addthis.ready', function() {

				//whenever a page is shared the event is sent to the tagManager
				addthis.addEventListener('addthis.menu.share', function(_evt) {
					TagManagerPush('social', 'Social Share', _evt.data.service, _evt.data.url);
				});
			});
		}
	}, 100);
})();

/**
* Gets parameter value from URL
* @param {String} name parameter name
* @param {String} url
*/
function getParameterByName(name, url) {

	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));

}

/**
 * Sets hidden field value from url parameter
 * @param {String} sourceParam form field to be set
 */
function setHiddenSource(sourceParam, formField) {
    //Initialize parameter from URL and field to be set
	if (window.location.href.indexOf('utm') < 0 && window.location.href.indexOf('itm') > -1) {
		var itmParam = sourceParam.replace('utm', 'itm');
		var parameterValue = getParameterByName(itmParam);
	} else {
		var parameterValue = getParameterByName(sourceParam);
	}
    var parameterField = '#' + formField;
    
    //Get stored value if parameter doesn't exist
	if (!parameterValue) { 
		parameterValue = getCookie(sourceParam);
	}

	//If parameter is in URL and field exists - populate field
	if (parameterValue !== null && $(parameterField).length) {
		$(parameterField).val(parameterValue);

	}
}

/**
* Sets hidden field value from url parameter
* @param {String} sourceParam form field to be set
*/
function storeParameterByName(paramName){
    var paramValue = getParameterByName(paramName);
    if(paramValue){
        setCookie(paramName, paramValue, 30);
    }
}

/**
* Sets cookie
* @param {String} cname name of cookie
* @param {String} cvalue value of cookie
* @param {String} exdays time for cookie to expire
*/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/**
* Gets cookie
* @param {String} cname name of cookie
* @returns {String} cookie
*/
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

$(document).ready(function() {
	//check if there are any contact forms 
	var $contactForms = $('form[data-formtype="contact"]');

	//adding in the one time form start event
	if ($contactForms.length > 0) {

		//one time click listener for Form Start tag
		$(document).one('click', 'form[data-formtype^="contact"] input, form[data-formtype^="contact"] textarea, form[data-formtype^="contact"] select', function(_evt) {
			var $input,
				$form,
				obj;

			$input = $(_evt.currentTarget);
			$form = $input.closest('form');

			TagManagerPush('form', 'Form Start', $form.attr('id'), $form.data('formtype'));

		});

		//adding in the click listener to the inputs for Form tracking tag
		$(document).on('click', 'form[data-formtype^="contact"] input, form[data-formtype^="contact"] textarea, form[data-formtype^="contact"] select', function(_evt) {
			var $input,
				$form,
				obj;

			$input = $(_evt.currentTarget);
			$form = $input.closest('form');

			TagManagerPush('form', 'Form Tracking', $form.attr('id'), $input.attr('name'));
		});

		//Add hidden fields here that should be populated - only if form present
		setHiddenSource('utmsource', 'utmsource');
        setHiddenSource('utm_medium', 'utmmedium');
		setHiddenSource('utmkeyword', 'utmkeyword');
	}

	//Store parameter in cookie - applies to every page
	storeParameterByName("utm_source");
	storeParameterByName("utm_medium");
	storeParameterByName("utm_keyword");

	/* Business login tag manager stuffs */
	$('#bizLoginNav').on('click', 'li', function(_evt) {
		var obj,
			appName;

		appName = $(_evt.currentTarget).find('a').text();

		TagManagerPush('login', 'businesslogin', appName, 'Home');
	});

	/* Scroll information */
	var prevHeight = 0,
		$modules = $('.wrapper'),
		lastId;

	$(window).scroll(function() {
		var fromTop = $(this).scrollTop(),
			body = document.body,
			html = document.documentElement,
			height = Math.max(body.scrollHeight, body.offsetHeight,
				html.clientHeight, html.scrollHeight, html.offsetHeight);

		var currentHeight = Math.floor((fromTop / (height - screen.height)) * 10) * 10;

		if (prevHeight < currentHeight) {

			prevHeight = currentHeight;

			TagManagerPush('scroll', 'Max Scroll', location.href, (currentHeight - 9) + '-' + (currentHeight));

		}


		fromTop += (screen.height / 2);

		var cur = $modules.map(function() {

			if ($(this).offset().top + ($(this).height() / 2) < fromTop) {
				return this;
			}
		});

		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur ? cur.id : "";
		if (lastId !== id && cur !== "") {
			lastId = id;
			TagManagerPush('scroll', 'Page Scroll', 'module', id);
		}
	});
	
	// Mixed Media wall functions
	
	// Autoplays youtube video on open
	$('#mixedMediaVideoModalYouTube').on('shown.bs.modal', function (e) {
		var iFrameSRC = $('#mixedMediaVideoModalYouTube iframe').attr('src');
		$('#mixedMediaVideoModalYouTube iframe').attr('src', iFrameSRC + '&autoplay=1');
	});
	
	// Stops youtube video and removes autoplay on close
	$('#mixedMediaVideoModalYouTube').on('hidden.bs.modal', function (e) {
		var iFrameSRC = $('#mixedMediaVideoModalYouTube iframe').attr('src');
		iFrameSRC = iFrameSRC.slice(0, -11);
		$('#mixedMediaVideoModalYouTube iframe').attr('src', iFrameSRC);
	});
	
	// Resets brightcove video when modal is closed 
	$('#mixedMediaVideoModalBrightCove').on('hidden.bs.modal', function (e) {
		var iFrameSRC = $('#mixedMediaVideoModalBrightCove iframe').attr('src');
		$('#mixedMediaVideoModalBrightCove iframe').attr('src', iFrameSRC);
	});

});


/* ---- Main Contact Form ---- */
function enableContactForm() {
	$('.contactForm').show();
	$('.consumerPicker').hide();
}

/* ---- Function to add touch events to carousels ---- */
function enableCarouselTouchEvents() {
	if ($('.carousel-inner').length > 0) {
		$(".carousel-inner").swipe({
			//Generic swipe handler for all directions
			swipeRight: function(event, direction, distance, duration, fingerCount) {
				$(this).parent().carousel('prev');
			},
			swipeLeft: function() {
				$(this).parent().carousel('next');
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold: 30
		});
	}
}

/* ---- Form handlers ---- */
function labelMove(whichLabel) {
	$(whichLabel).removeClass('inForm');
	//$('#' + $(whichLabel).attr('for')).focus();
}

/* ---- Set the state of various elements, i.e. navigations on Media Query state change and onload ---- */
function checkMediaQueryState() {
	resetNavigation();
	carouselFunctions();
	initMobileMenuScroll();
	initMainNavMoreInfo();
	initHeaderMenus();
}

/* ---- Navigation media query reset ---- */
function resetNavigation() {
	if (Modernizr.mq(mqXs)) {
		$('.footerContent:visible').hide();
		if (window.location.hostname == 'tu-pvw.transunion.com' || window.location.hostname == 'www.transunion.com' || window.location.hostname == 'www.tlo.com' || window.location.hostname == 'www.drivershistory.com') {
			if ($('#footerContent3').length) {
				$('#footerContent3').not(':visible').show();
			}
		}
		//$('.sideNavContainer .mainSideNav:visible').hide();
		$('#solutionsAndProductsSubNav').show();
		$('#solutionsNavContent, #productsNavContent').hide();
	} else if (Modernizr.mq(mqSmRange)) {
		$('#solutionsAndProductsSubNav').show();
		$('#solutionsNavContent, #productsNavContent').hide();
	} else {
		$('body').removeClass('mobileMenuOpen');
		$('#targetNav').removeClass('targetShadowed');
		$('.footerContent').not(':visible').show();
		//$('.sideNavContainer .mainSideNav').not(':visible').show();
		$('#solutionsAndProductsSubNav').hide();
		$('#solutionsNavContent').show();
		hideSearchField();
	}
}

/* ---- Carousel media query reset ---- 
 * Carousel functions is run onload and on window resize. It will turn 
 * on and off the carousel functionality toggling between displaying the items 
 * as a banner or a carousel. ---- */
function carouselFunctions() {
	var $carousels = $('.responsive-carousel');

	if (Modernizr.mq(mqXs)) {
		//removes all but one of the active items and one of the active indicators
		$carousels.each(function(_idx, _carousel) {
			$(_carousel).find('.active + .active')
				.removeClass('active');
			$(_carousel).carousel({ interval: 7500 });
		});
	} else {
		//adds active to all the carousel items so they all display
		$carousels.each(function(_idx, _carousel) {
			$(_carousel).find('.item').addClass('active');
		});
	}

}

/**
 * Creates a click listener for all anchor tags that have a href=#'something'
 */
function addPageScrollAnimation() {
	//Creates the on click listener for the body that catches an clicks on <a> tags 
	$('body').on('click', 'a[href*=#]:not([href=#])', function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
		}
	});
}

/* ---- Looks for SVG Support and if not found replaces src attribute with PNG ---- */
function checkSVGSupport() {
	if (!Modernizr.svg) {
		var newSrc;
		$("img[src$='.svg']").each(function(index, element) {
			newSrc = $(element).attr('src').slice(0, -3) + 'png';
		}).attr("src", newSrc);
	}
}


/* ---- Scripts Initiated by Page Load ---- */
$(document).ready(function() {
	initializeAffixTop();
	initializeAffixBottom();
	fieldLevelValidation();

	$('.inForm').each(function(index, element) {
		var $parentDiv = $(element).closest('div');
		var fieldId = $(element).attr('for');
		var $field = $('#' + fieldId, $parentDiv);
		$field.on('input click keypress change focus', function(event) {
			labelMove(element);
		});
	});

	$('#searchContact #searchBox').bind('click keypress change focus', function(event) {
		if ($(this).val().length) {
			$('#searchContact .clearBtn').show();
		} else {
			$('#searchContact .clearBtn').hide();
		}
	});

	$('.searchBox .searchField').bind('click keypress change focus', function(event) {
		if ($(this).val().length) {
			$('.searchBox .clearBtn').show();
		} else {
			$('.searchBox .clearBtn').hide();
		}
	});

	$('.clearBtn').click(function() {
		$(this).hide();
	});
	
	$("#productsSolutionsSelect").change(function() {
		filterComponents('productsSolutionsComponent', $(this).val(), $('#productsSolutionsSelect option:selected').text());
	});

	/* ---- Various state checks such as carousels and navigations
			are assigned to the window resize event and also run once at dom load ---- */
	$(window).resize(function() {
		checkMediaQueryState();
	});
	checkMediaQueryState();

	/* If Hero or Blue Box Carousel is present, enable */
	if ($('.carousel.tabContentFeature, .carousel.heroWrapper, .carousel.contentFeature').length) {
    	$('.carousel.tabContentFeature, .carousel.heroWrapper, .carousel.contentFeature').carousel({
			interval: 7500
		})
	}

	enableCarouselTouchEvents();
	addPageScrollAnimation();
	initMobileMenuScroll();
	initMainNavMoreInfo();
	showEllipsis();
	initHeaderMenus();
	checkSVGSupport();
});

/* ---- Functions to Affix elements to the top and bottom of the screen using Bootstraps affix function ---- */

/**
 * Initializes all the setAffixTops and changes their offsets accordingly
 */
function initializeAffixTop() {
	$('.pageTitle', '#specialtyNavComponent').on('click', function(_evt) {
		$(_evt.target).closest('section').toggleClass('open');
		window.location = '#specialtyNavComponent';
	});

	$('.careers-side-nav a', '#specialtyNavComponent').on('click', function(_evt){
		var li = $(_evt.target).closest('li');
		var $children = li.find('li');

		//remove active class from all siblings
		li.siblings().removeClass('active');
		$children.removeClass('active');
		if($children.length > 0 ){
			_evt.preventDefault();
		}
		li.toggleClass('active');
	});

	$('body').on('click', function(_evt){
		var $nav = $('#specialtyNavComponent');
		if ($nav.length > 0) {
			if (!jQuery.contains($nav.get(0), _evt.target)) {
				var results = $nav.find('li');
				results.removeClass('active');
			}
		}
	});

	$('.specialtyNav.setAffixTop, .specialtyNav-menu.setAffixTop').each(function(index, element) {
		var affixTop = $(element).offset().top,
			resizeTimer;

		$(element).parent().height($(element).outerHeight());

		//fixes an issue with offset 0 causing it to switch between states constantly
		if (affixTop <= 0) { affixTop = 1; }

		$(element).affix({
			offset: {
				top: $(element).offset().top,
				bottom: calcFooterOffset()
			}
		});

		$(element)
			.on('affixed.bs.affix', function() {
				$(element).css('position', '');
			})
			.on('affixed-top.bs.affix', function() {
				$(element).css('position', '');
			})
			.on('affixed-bottom.bs.affix', function() {
				$(element).css('position', '');
			});

		$(window).resize(function() {
			//$(element).off('affix');

			clearTimeout(resizeTimer);

			//we have to give a buffer so that items can resize before we recalculate
			resizeTimer = setTimeout(function() {

				var affixTop = $(element).offset().top;

				$(element).parent().height($(element).outerHeight());

				//fixes an issue with offset 0 causing it to switch between states constantly
				if (affixTop <= 0) { affixTop = 1; }

				if ($(element).data('bs.affix')) {
					$(element).data('bs.affix').options.offset.top = affixTop;
					$(element).data('bs.affix').options.offset.bottom = calcFooterOffset();

				}

				$(element).affix('checkPosition');
			}, 250);
		});
	});

	$('.titleContent.setAffixTop, .contentNav.setAffixTop').each(function(index, element) {
		var affixTop = $(element).offset().top,
			resizeTimer;

		affixTop += $(element).hasClass('specialtyNav') ? calcHeaderOffset() : 0;

		$(element).parent().height($(element).outerHeight());

		affixTop -= calcHeaderOffset();

		//fixes an issue with offset 0 causing it to switch between states constantly
		if (affixTop <= 0) { affixTop = 1; }

		$(element).affix({
			offset: {
				top: affixTop,
				bottom: calcFooterOffset()
			}
		});

		$(element)
			.on('affixed.bs.affix', function() {
				$(element).css('position', '');
			})
			.on('affixed-top.bs.affix', function() {
				$(element).css('position', '');
			})
			.on('affixed-bottom.bs.affix', function() {
				$(element).css('position', '');
			});

		$(window).resize(function() {
			//$(element).off('affix');

			clearTimeout(resizeTimer);

			//we have to give a buffer so that items can resize before we recalculate
			resizeTimer = setTimeout(function() {

				var affixTop = $(element).offset().top;

				affixTop += $(element).hasClass('specialtyNav') ? calcHeaderOffset() : 0;

				$(element).parent().height($(element).outerHeight());

				affixTop -= calcHeaderOffset();

				//fixes an issue with offset 0 causing it to switch between states constantly
				if (affixTop <= 0) { affixTop = 1; }

				if ($(element).data('bs.affix')) {
					$(element).data('bs.affix').options.offset.top = affixTop;
					$(element).data('bs.affix').options.offset.bottom = calcFooterOffset();

				}

				$(element).affix('checkPosition');
			}, 250);
		});
	});


	$('.mainSideNav.articleSideNav').each(function(index, element) {
		//set the css top value
		$(element).css('top', '');

		var affixTop = $(element).parent().offset().top,
			resizeTimer,
			headerOffset = 0,
			titleOffset = 0;

		//calculate the heights of the 
		var $row = $(element).closest('.row');
		$row.css('min-height', ($row.height() + 100) + 'px');

		headerOffset = calcHeaderOffset();

		if (!Modernizr.mq(mqMd) || !$(element).hasClass('listSideNav')) {
			titleOffset = calcTitleOffset();
		}

		affixTop -= titleOffset;
		affixTop -= headerOffset;

		//fixes an issue with offset 0 causing it to switch between states constantly
		//if(affixTop <= 0){affixTop = 1;}

		//set the css top value
		$(element).css('top', titleOffset + headerOffset);

		$(element).affix({
			offset: {
				top: affixTop,
				bottom: calcFooterOffset()
			}
		});

		//resize functionality for the mainSideNav
		$(window).resize(function() {

			//remove the open from the parent
			$(element).parent().removeClass('open');

			//set the css top value
			$(element).css('top', '');

			$(element).removeClass('affix affix-top affix-bottom');

			clearTimeout(resizeTimer);

			//we have to give a buffer so that items can resize before we recalculate
			resizeTimer = setTimeout(function() {

				var affixTop = $(element).parent().offset().top,
					titleOffset = 0,
					headerOffset = 0;

				//$(element).parent().height($(element).outerHeight());
				headerOffset = calcHeaderOffset();

				if (!Modernizr.mq(mqMd) || !$(element).hasClass('listSideNav')) {
					titleOffset = calcTitleOffset();
				}

				affixTop -= headerOffset;
				affixTop -= titleOffset;

				//fixes an issue with offset 0 causing it to switch between states constantly
				//if(affixTop <= 0){affixTop = 1;}

				//set the css top value
				$(element).css('top', titleOffset + headerOffset);

				if ($(element).data('bs.affix')) {
					$(element).data('bs.affix').options.offset.top = affixTop;
					$(element).data('bs.affix').options.offset.bottom = calcFooterOffset();
				}
			}, 250);

			$(element).affix('checkPosition');
		});
	});

	$('.mainSideNav.listSideNav').each(function(index, element) {
		//set the css top value
		$(element).css('top', '');

		var affixTop = $(element).parent().offset().top,
			resizeTimer,
			headerOffset = 0,
			titleOffset = 0;

		//calculate the heights of the 
		var $row = $(element).closest('.row');
		$row.css('min-height', ($row.height() + 100) + 'px');

		headerOffset = calcHeaderOffset();

		if (!Modernizr.mq(mqMd)) {
			titleOffset = calcTitleOffset();
		}

		affixTop -= titleOffset;
		affixTop -= headerOffset;

		//fixes an issue with offset 0 causing it to switch between states constantly
		//if(affixTop <= 0){affixTop = 1;}

		//set the css top value
		$(element).css('top', titleOffset + headerOffset);

		$(element).affix({
			offset: {
				top: affixTop,
				bottom: calcFooterOffset()
			}
		});

		//resize functionality for the mainSideNav
		$(window).resize(function() {

			//remove the open from the parent
			$(element).parent().removeClass('open');

			//set the css top value
			$(element).css('top', '');

			$(element).removeClass('affix affix-top affix-bottom');

			clearTimeout(resizeTimer);

			//we have to give a buffer so that items can resize before we recalculate
			resizeTimer = setTimeout(function() {

				var affixTop = $(element).parent().offset().top,
					titleOffset = 0,
					headerOffset = 0;

				//$(element).parent().height($(element).outerHeight());
				headerOffset = calcHeaderOffset();

				if (!Modernizr.mq(mqMd) || !$(element).hasClass('listSideNav')) {
					titleOffset = calcTitleOffset();
				}

				affixTop -= headerOffset;
				affixTop -= titleOffset;

				//fixes an issue with offset 0 causing it to switch between states constantly
				//if(affixTop <= 0){affixTop = 1;}

				//set the css top value
				$(element).css('top', titleOffset + headerOffset);

				if ($(element).data('bs.affix')) {
					$(element).data('bs.affix').options.offset.top = affixTop;
					$(element).data('bs.affix').options.offset.bottom = calcFooterOffset();
				}
			}, 250);

			$(element).affix('checkPosition');
		});
	});
}

/**
 * Calculates the header offset based on screen size
 */
function calcTitleOffset() {
	//set the changes based on screen size
	var result = 57;
	if (Modernizr.mq(mqLg)) {
		result = 100;
	}

	return result;
}

/**
 * Calculates the header offset based on screen size
 */
function calcHeaderOffset() {
	//set the changes based on screen size
	var result = 51;
	if (Modernizr.mq(mqMd)) {
		result = 64;
	}

	return result;
}

/**
 * Calculates the header offset based on screen size
 */
function calcFooterOffset() {
	//set the changes based on screen size
	var result = 0;
	if (Modernizr.mq(mqMd)) {
		result = 440;
	}

	return result;
}

function initializeAffixBottom() {
	$('.setAffixBottom').each(function(index, element) {
		$(element).parent().height($(element).outerHeight());
		var affixBottom = $(window).height() - $(element).offset().top - $(element).outerHeight();
		$(element).affix({
			offset: {
				bottom: affixBottom
			}
		});
	});
}


/* Side nav */
//runs once when the document is ready and sets up the sideNav and
$(document).ready(function() {

	$('.sideNavContainer.articleSideNavContainer li').on('click', function(_evt) {
		var $li = $(_evt.delegateTarget);

		//remove all the sibling and child active classes
		$li.siblings('li').removeClass('active');

		if ($li.hasClass('active')) {
			$li.find('li').removeClass('active');

			_evt.stopPropagation();
		} else {
			$li.addClass('active');
			_evt.stopPropagation();
		}

	});

	$('.sideNavContainer.articleSideNavContainer li').on('click', sideNavToggle);

	$('#pageTitle').on('click', sideNavToggle);
});

function sideNavToggle(_evt) {
	var $sideNavContainers = $('.mainSideNav[id$="xs"]').closest('.sideNavContainer');

	if (!Modernizr.mq(mqMd)) {
		$sideNavContainers.each(function() {
			var scrollTop = $(window).scrollTop();

			if (scrollTop + 1 < $(this).height()) {

				$('html, body').animate({ scrollTop: scrollTop - $(this).height() }, 0);
				sideNavClose(this);
			} else {
				$('html, body').animate({ scrollTop: $("#articlestickyComponent").offset().top }, 250);
				sideNavOpen(this);
			}
		});
	} else {
		sideNavClose($sideNavContainers);
	}
}

function sideNavOpen(_sideNav) {
	if (!Modernizr.mq(mqMd)) {

		$(_sideNav).each(function(_index) {
			$(this).addClass('open');
		});
	}
}

function sideNavClose(_sideNav) {

	if (!Modernizr.mq(mqMd)) {

		$(_sideNav).each(function(_index) {
			$(this).removeClass('open');
		});
	} else {
		$(_sideNav).children('.affix, .affix-top, .affix-bot').affix('checkPosition');
	}
}


/**
 * Recaptcha injectors and validation
 */
var recaptchaDef = new $.Deferred();

function recaptchaValidate($input, response) {
	$input.addClass('valid');
	toggleSubmitButton($input.closest('form'));
}

function recaptchaOnload() {
	recaptchaDef.resolve();
}

$.when(recaptchaDef).then(function() {
	$('[id^=g-recaptcha-]').each(function(_index, _item) {
		var id = $(_item).attr('id');
		grecaptcha.render(id, {
			sitekey: '6LeNQhATAAAAAKypLuGEOOJTo4Bl0CFw9-J8Nywe',
			callback: recaptchaValidate.bind(null, $(_item))
		});
	});
});


/* Product Feature Component Rollover Script */
$(document).ready(function() {
	if($('.productFeatureWrapper')) {
		$('.feature').mouseenter(function() {
			$('.feature').removeClass('active');
			$(this).addClass('active');
		});
	}
});

/* Add Flexibility suport to older IE */
/*$(document).ready(function() {
	if ($('html').hasClass('oldie')){
		var $flexies = $('.flexify');
		if($flexies.length > 0) {
			alert('Flexies exist!');
			$flexies.each(function(index, el) {
				flexibility(el);
			});
		}
	}
});*/


/**
 * Swaps the Business And Personal links at the top of the page
 */
/*$(document).ready(function(){
	var $container = $('#targetNav');
	var animating = false;



	$container.on('click', '.swappable', function (_evt) {

	    if (animating) {
	        return;
	    }

	    var clickedDiv = $(_evt.target).closest('.swappable'),
	        prevDiv = clickedDiv.prev('.swappable'),
	        distance = clickedDiv.width();

	    if (prevDiv.length) {
	        animating = true;
	        $.when(clickedDiv.animate({
	            left: -distance
	        }, 600),
	        prevDiv.animate({
	            left: distance
	        }, 600)).done(function () {
	            prevDiv.css('left', '0px');
	            clickedDiv.css('left', '0px');
	            clickedDiv.insertBefore(prevDiv);
	            animating = false;
	        });
	    }
	});
});*/

// Immersive Video Banner for Personal Homepage

$(document).ready(function () {
	//play button click function 
	$(".immersive-play").click(function() {
		if ($(".immersive-play").hasClass("autoplay-hero")) {
			$(".immersive-background.hidden-lg .full-video").css('display','block');
			$(".immersive-background.hidden-lg #video-container").hide();
			$(".immersive-play").hide();
			$(".immersive-close").show();
		}
	});

	//close icon in top right click function
	$(".tufa-declined").click(function() {
		if ($(".immersive-play").hasClass("autoplay-hero")) {
			$(".immersive-background.hidden-lg .full-video").css('display','none');
			$(".immersive-background.hidden-lg #video-container").show();
			$(".immersive-play").show();	
			$(".immersive-close").hide();
		}
	});
});

// Data Pass - Payment options
function paymentOptions(linkObj) {
	$('#paymentTabs li').removeClass('active');
	$(linkObj).parent().addClass('active');
		
	if ($(linkObj).parent().hasClass("creditCard")) {
		$("#creditCard").css('display','block');
		$("#paypal").css('display','none');
	}
	if	($(linkObj).parent().hasClass("paypal")) {
		$("#paypal").css('display','block');
		$("#creditCard").css('display','none');
	}
}

// Data Pass - Other Survey Field
function otherFieldshow() {
	$('#otherTextfield').removeClass('hide');
}

function otherFieldhide() {
	$('#otherTextfield').addClass('hide');
}

// FinTech - Products - Show more button
function showMore(linkObj) {
	$('.more-products').removeClass('hidden');
	$('.more-products').addClass('all-products');
	$('#showMorebtn').hide();
}

// FinTech - Tabbed Hero accordion
function toggleMenu(ID, action) {	
    $(".subComponent .subComponentContent").hide();
    $(".grayBorderWrapper").show();
	$(".tabNav, .grayBorderWrapper").removeClass("closedState");
	$("#grayBorderWrapper"+ ID +", #subComponentContent" + ID).toggle();
	$(".heroContentTop, .heroContentTop .primaryHeadline").css("color", "black");
	$(".heroImage, .mobileHeroImage").css("background-image", "none");
	$(".heroTabbed .hero").addClass("hideImage");
	$(".heroTabbed .hero .heroContent").css("text-shadow", "none");
	$("#tabbedHeroComponent").addClass("animateComponent");
	if (Modernizr.mq(mqXs)) {
		$("html, body").animate({scrollTop: 200}, 200);		
	}
	if (Modernizr.mq(mqLg)) {
		$("html, body").animate({scrollTop: 510}, 900);
		$(".subComponent").css("min-height", "0");
		$("#subComponentContent" + ID).parent().css("min-height", "1110px");
		if (action == 'click') {
			if (!$("#tabbedHeroComponent").hasClass("animateComponent")) {
				$(".subComponent .subComponentContent .yellowBorder").css({"border-color": "#fcd800", "top": "-4px", "height": "1050px"});
				$(".subComponent .subComponentContent .whiteInfoBox").css("opacity", "1");				
			}
		}
	}	
}

// FinTech - Testimonials tabs
function showsectionContent(sectionID) {
	$("#testimonials .subComponentContent").hide();
	$( "." + sectionID ).show();
	$( ".sectionsCarousel .subComponent" ).removeClass('selected');
	$( "#" + sectionID ).addClass('selected');
	if (sectionID == "section1") {
		$("#divider1").hide();
		$("#divider2, #divider3").show();
	}
	else if (sectionID == "section2") {
		$("#divider1, #divider2").hide();
		$("#divider3").show();
	}
	else if (sectionID == "section3") {
		$("#divider2, #divider3").hide();
		$("#divider1").show();
	}
	else if (sectionID == "section4") {
		$("#divider3").hide();
		$("#divider1, #divider2").show();
	}
}

$(window).scroll(function(){
	// FinTech - Up button
	//--------------------
	
	var upBtn = "<a href='javascript:' class='up_button' title='Back to Top' onkeypress='backToTop();' onClick='backToTop();'>" +
					"<span class='fa-stack fa-lg'>" +
					"<i class='fa fa-stop fa-stack-2x'></i>" +
					"<i class='fa fa-arrow-up fa-stack-1x fa-inverse'></i>" +
					"</span>" +
					"<span class='visually-hidden'>Go Back to Top</span>" +
				"</a>";
	if ($(".up_button").length == 0) {
		$("#globalFooter").append(upBtn);
	}
    if ($(this).scrollTop() > 1) {
        $(".up_button").fadeIn(200);		
	} else {
        $(".up_button").fadeOut(200); 
	}
	
	// FinTech Component Animation on Scroll
	//--------------------------------------
	
	//if ($("#tabbedHeroComponent").visible()) {		
//		if($('.subComponentContent').css('display') == 'none') {
//			toggleMenu('1', 'scroll');
//		}
//		$("#tabbedHeroComponent").addClass("animateComponent");
//	}
	if ($("#featureAnimatedComponent").visible(false, true)) {		
		if (isFeatureChartPresent == false) {
			setTimeout(function() { featureCharts(); }, 200);
			isFeatureChartPresent = true;
		}
		setTimeout(function() { $("#featureAnimatedComponent").addClass("animateComponent"); }, 200);
	}
	if ($("#insightsModuleComponent").visible(true)) {
		setTimeout(function() { $("#insightsModuleComponent").addClass("animateComponent"); }, 2500);		
	}
	if ($("#homepageBlueRailComponent").visible()) {
		$("#homepageBlueRailComponent").addClass("animateComponent");
	}
	if ($("#testimonials").visible(true)) {
		setTimeout(function() { $("#testimonials").addClass("animateComponent"); }, 1500);		
	} 
	if ($("#productsSolutionsComponent").visible(true)) {
		setTimeout(function() { $("#productsSolutionsComponent").addClass("animateComponent"); }, 1500);		

	}
});

function backToTop() {
	$("html, body").animate({scrollTop: 0}, 200);	
}

$(document).ready(function() {
	// FinTech Component Animation on Load
	//------------------------------------
	
	if ($("#featureAnimatedComponent").visible(false, true)) {		
		if (isFeatureChartPresent == false) {
			setTimeout(function() { featureCharts(); }, 200);
			isFeatureChartPresent = true;
		}
		setTimeout(function() { $("#featureAnimatedComponent").addClass("animateComponent"); }, 200);
	}
	if ($("#insightsModuleComponent").visible(true)) {
		setTimeout(function() { $("#insightsModuleComponent").addClass("animateComponent"); }, 2500);		
	}	
	if ($("#testimonials").visible(true)) {
		setTimeout(function() { $("#testimonials").addClass("animateComponent"); }, 1500);		
	} 
	if ($("#productsSolutionsComponent").visible(true)) {
		setTimeout(function() { $("#productsSolutionsComponent").addClass("animateComponent"); }, 1500);		
	}
});

// Reengagement Banner for Consumer / Credit Education
//----------------------------------------------------

$(document).ready(function(){
    $(".hideBanner").click(function(){
        $("#engagement").hide();
    });
});


// Consumer Offer Code Modifier
//----------------------------------------------------

$(document).ready(function(){
	$("a[href^='https://membership.tui.transunion.com/'][href*='3BM10175']").each(function(){
		this.href = this.href.replace('3BM10175', '3BM10246');
	})
});

// Contact us popup functions
//---------------------------------
function invokePopup()
{
  $('#contactUsModal').modal();
}

//pagination

function setPrevPage()
{
	var url = window.location.href;
	var b = url.substring(url.indexOf("=")+1);
	
	if (b >= 2) {
		var c = b - 1;
		window.location.search = '?Page=' + c;
	} else {
		return true;
	}
}
function setNextPage()
{
	var url = window.location.href;
	var b = url.substring(url.indexOf("=")+1);
	
	if (isNaN(b)){
		window.location.search = '?Page=2'
		return true;
	} else {
		var c = parseFloat(b) + 1;
		window.location.search = '?Page=' + c;
	} 
}