function initValidation() {
	$(document).on('change', '.fieldGroup', function() {
		validateFieldGroup($(this).get());
	});
}

function validate(formSelector) {
	return $(formSelector).validate();
}

jQuery.extend(jQuery.validator.defaults, {
    errorElement: 'span'
});

jQuery.extend(jQuery.validator.messages, {
	'required': 'A value is required',
	'numericRequired': 'A value is required',
	'remote': 'Invalid value',
	'email': 'Invalid email address',
	'url': 'Invalid URL',
	'date': 'Invalid date',
	'dateISO': 'Invalid date (ISO)',
	'number': 'Invalid number',
	'digits': 'Value should contain only digits',
	'creditcard': 'Invalid credit card number',
	'equalTo': 'Please enter the same value again',
	'accept': 'Invalid extension',
	'maxlength': jQuery.validator.format('Value must be no more than {0} characters'),
	'minlength': jQuery.validator.format('Value must have at least {0} digits'),
	'rangelength': jQuery.validator.format('Value must be between {0} and {1} characters long'),
	'range': jQuery.validator.format('Value must be between {0} and {1}'),
	'max': jQuery.validator.format('Value must be less than or equal to {0}'),
	'min': jQuery.validator.format('Value must be greater than or equal to {0}'),
	'unique': jQuery.validator.format('Value should be non-existing in DB'),
	'ValidPhone': 'Invalid Phone Number',
	'minPhlength': 'Value must be of 10 Digit.',
	'lettersonlyValidator': 'Please enter only letters',
	'alphaNumSpecial': 'Please enter only letters, numbers or accepted special characters',
	'alphaSpecial': 'Please enter only letters or accepted special characters',
	'alphaAddressSpecial': 'Please enter only letters, numbers or accepted special characters',
	'alphaCitySpecial': 'Please enter only letters or accepted special characters',
	'ValidEmail': 'Invalid email address',
	'alphaNum': 'Please enter only letters or numbers',

	'submission': {
		'success': 'Thanks! We\'ll get back to you soon.',
		'failed': 'We\'re sorry, your request failed. Please try again in a little while.',
		'loading': 'Please wait a moment, we are processing your request.',
		'recaptchaFailure': ' Sorry, we’re having trouble completing your request. Please check that all the required form fields have been completed and try again.',
		'personalMessage': '<p>Hi there, it looks like you might need help with a consumer issue.</p><p>Please visit our <a href="customer-support/main">customer support page</a> which has more information on all your consumer credit questions.</p><p>If you don’t find what you’re looking for, please give us a call at 1-855-681-3196.</p>'
	}

});

// Determine if any field with a class type is present in the form
function isFieldGroupClassPresent(element, className) {
	var rtValue = false;
	$(element).closest("form").find("." + className).each(function() {
		if ($(this).val().trim().length) {
			rtValue = true;
			return false;
		}
		return true;
	});
	return rtValue;
}



// Determine if any address fields are present
function isAddressFieldGroupClassPresent(element) {
	return isFieldGroupClassPresent(element, "addressField");
}

function isDedupeinDB(element) {
	return $(ele).siblings("input[id='" + $(ele).attr("id") + "Dedupe']").val();
}

/* Form Validation Functions */
function validatorSetup() {

	jQuery.validator.setDefaults({
		ignoreTitle: true,

		// callback for custom error display
		showErrors: function(errorMap, errorList) {
			var msg = "";
			var numFormLevelErrors = 0;
			// loop through the errorMap to display the name of the field and the error
			$.each(errorList, function() {
				var element = this.element;
				if ($(element).hasClass("formLvlErr")) {
					numFormLevelErrors++;
					var message = $(element).data("valmsg");
					if (message == null) {
						message = this.message;
					}
					msg += "<li>" + message + "</li>";
				}

			});

			// place error text inside box
			$("#formLevelErrorMessagesDetail").html(msg);

			// also show default labels from errorPlacement callback
			this.defaultShowErrors();

			// toggle the error summary box
			if (numFormLevelErrors > 0) {
				$("#formLevelErrors").show();
			} else {
				$("#formLevelErrors").hide();
			}

		}, // end showErrors callback

		// callback for custom error placement
		errorPlacement: function(error, element) {
			if (!$(element).hasClass("formLvlErr")) {
				if ($(element).hasClass("errorDiv")) {
					$("#" + element.attr("id") + "_" + "errorDiv").append(error);
				} else {
					error.insertAfter(element);
				}
			}
		},
		/*highlight: function(element) {
			$(element).addClass('error');
			highlight(element);
		},
		unhighlight: function(element) {
			$(element).removeClass('error');
			unhighlight(element);
		},*/
		/*success: function(element) {
			element.addClass('valid');
		},*/
		invalidHandler: function(event, validator) {
			invalidHandler(event, validator);
		},
		/*onfocusout: function(element) {
			$(element).valid();
		},
		onkeyup: function(element) {
			$(element).valid();
		},*/
		ignore: []
	});

	//Method for validating letters-only fields (Allows hyphens & spaces)
	$.validator.addMethod(
		"lettersonlyValidator",
		function(value, element) {
			return this.optional(element) || /^[a-z\-\s]*$/i.test(value);
		}
	);

	// Standard Alpha-num-special set #,&,+,-,.,/,0-9,A-Z,a-z, space
	$.validator.addMethod(
		"alphaNumSpecial",
		function(value, element) {
			return this.optional(element) || /^[a-zA-Z0-9\''@\,\#\&\+\-\.\/\s]*$/i.test(value);
		}
	);
	$.validator.addMethod(
		"alphaSpecial",
		function(value, element) {
			return this.optional(element) || /^[a-zA-Z\''\-]*$/i.test(value);
		}
	);

	$.validator.addMethod(
		"alphaAddressSpecial",
		function(value, element) {
			return this.optional(element) || /^[a-zA-Z0-9\/\''\s\-\#]*$/i.test(value);
		}
	);

	$.validator.addMethod(
		"alphaCitySpecial",
		function(value, element) {
			return this.optional(element) || /^[a-zA-Z\s\-]*$/i.test(value);
		}
	);

	$.validator.addMethod(
		"ValidEmail",
		function(value, element) {
			return this.optional(element) || /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9\\\.\/\^\>]+\.[a-zA-Z0-9\\\.\/\^\>]{2,8}$/i.test(value);
		}
	);

	// Standard Alpha-num set 0-9,A-Z,a-z
	$.validator.addMethod(
		"alphaNum",
		function(value, element) {
			return this.optional(element) || /^[a-zA-Z0-9]*$/i.test(value);
		}
	);

	$.validator.addMethod(
		"numericRequired",
		function(value, element) {
			return value > 0;
		}
	);

	$.validator.addMethod(
		"ValidPhone",
		function(_value, _element) {
			var phoneRegex = /^(?:\+?1[-. ]?)?\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/;

			//strip leading and trailing spaces
			_value.trim();

			//test the basic phone number regex
			return phoneRegex.test(_value);
		}
	);

	$.validator.addMethod(
		"minPhlength",
		function(value, element) {
			if (value.length === 10 || value.length === 0) {
				return true;
			}
			return false;
		}
	);
	$.validator.addMethod(
		"minValue",
		$.validator.methods.min,
		$.validator.format("Value must be greater than zero")
	);

	//Form Validations	
	$.validator.addClassRules({
		dateFieldValidator: {
			required: true,
			date: true
		},
		codeFieldValidator: {
			required: true,
			maxlength: 2
		},
		validPostalCode: {
			number: true,
			minlength: 5,
			maxlength: 5
		},
		phoneFieldValidator: {
			minlength: 10
		},
		validSSNNum: {
			minlength: 4
		},
		digitsFieldValidator: {
			digits: true
		},
		lettersFieldValidator: {
			lettersonly: true
		},
		validAlphaNum: {
			alphaNum: true
		},
		validAlphaNumSpecial: {
			alphaNumSpecial: true
		},
		requiredAddressPresent: {
			required: {
				depends: function(element) {
					return isAddressFieldGroupClassPresent(element);
				}
			}
		},
		validEmail: {
			email: true
		},
		validUSPhone: {
			phoneUS: true
		},
		validNumber: {
			number: true
		},
		validGTZero: {
			required: true,
			min: 1
		},
		nonZero: {
			minValue: 1
		},
		unique: {
			required: true,
			dedupe: true
		},
		phNum: {
			number: true,
			minPhlength: 10
		}
	});
}

/* ---- Allow for additional local highlight/unhighlight actions ---- */
function highlight(element) {}

function unhighlight(element) {}

function invalidHandler(event, validator) {}


/* ---- Provide common validation options ---- */

function phoneMask(event, obj, maskFunction) {
	var rtValue = false;
	var isRange = isSelectionRange(obj);
	var pos = doGetCaretPosition(obj);
	var origPhone = $(obj).val();
	var updPhone = $(obj).val();
	//If it's non input, do default	
	if (event != null) {
		if (isNonInput(event) || isCopyCut(event) || isSelectAll(event) || isPaste(event)) {
			if (isPaste(event) || isDelete(event)) {
				if (event.type == "keyup") {
					updPhone = maskFunction(obj);
				}
			}
			rtValue = true;
		}
		if (isNumeric(event)) {
			if (event.type == "keyup") {
				updPhone = maskFunction(obj);
			}
			rtValue = true;
		}
	} else {
		updatePhone = maskFunction(obj);
		rtValue = true;
	}
	setPhoneCursorPosition(origPhone, updPhone, pos, isRange, obj, event);
	return rtValue;
}


function setPhoneCursorPosition(origPhone, updPhone, pos, isRange, obj, event) {
	if (event != null && pos != origPhone.length && !(event.ctrlKey || event.shiftKey || event.keyCode == 16 || event.keyCode == 17 || isRange || (isNonInput(event) && !isDelete(event)))) { //Don't muck with stuff if people might be copying
		if (origPhone == updPhone) {
			setCaretPosition(obj, pos);
		} else if (origPhone.replace(/\D/g, '') == updPhone.replace(/\D/g, '')) {
			// We probably just formated the number nothing changed
			var lengthDif = updPhone.length - origPhone.length;
			var offset = 0;
			if (lengthDif == 1) {
				// we just added a dash
				if (pos > 3) {
					offset = 1;
				}
			} else if (lengthDif == 3) {
				// We added () 
				if (pos < 3) {
					offset = 1;
				}
				if (pos >= 3) {
					offset = 3;
				}
			} else if (lengthDif == 4) {
				// We added () -
				if (pos < 3) {
					offset = 1;
				}
				if (pos >= 3) {
					offset = 3;
				}
				if (pos >= 6) {
					offset = offset + 1;
				}
			} else if (lengthDif == -1) {
				if ((origPhone.match(/^([0-9]*) [0-9]*-[0-9]*$/g) && updPhone.match(/^([0-9]{3}) [0-9]{3}$/g)) || (origPhone.match(/^[0-9]*-[0-9]*$/g) && updPhone.match(/^[0-9]{3}$/g))) {
					// We removed -
					if (pos >= 3) {
						offset = -1;
					}
				}
			} else if (lengthDif == -3) {
				if (origPhone.match(/^\([0-9]*\) [0-9]*-[0-9]*$/g) && updPhone.match(/^[0-9]{3}-[0-9]*$/g)) {
					// We removed () -
					if (pos >= 3) {
						offset = -3;
					} else {
						offset = -1;
					}
				}
			} else if (lengthDif == -4) {
				if (origPhone.match(/^\([0-9]*\) [0-9]*-[0-9]*$/g) && updPhone.match(/^[0-9]{3}-[0-9]*$/g)) {
					// We added () -
					if (pos < 3) {
						offset = -1;
					}
					if (pos >= 3) {
						offset = -3;
					}
					if (pos >= 6) {
						offset = offset - 1;
					}
				}
			}
			setCaretPosition(obj, pos + offset);

		}
	}
}

function isNonInput(event) {
	var rtValue = false;
	switch (event.keyCode) {
		case $.ui.keyCode.TAB:
		case $.ui.keyCode.LEFT:
		case $.ui.keyCode.RIGHT:
		case $.ui.keyCode.UP:
		case $.ui.keyCode.DOWN:
		case $.ui.keyCode.ENTER:
		case $.ui.keyCode.ESCAPE:
		case $.ui.keyCode.HOME:
		case $.ui.keyCode.BACKSPACE:
		case $.ui.keyCode.DELETE:
		case $.ui.keyCode.END:
		case $.ui.keyCode.PAGE_UP:
		case $.ui.keyCode.PAGE_DOWN:
			rtValue = true;
			break;
	}
	return rtValue;
}

function isDelete(event) {
	var rtValue = false;
	switch (event.keyCode) {
		case $.ui.keyCode.BACKSPACE:
		case $.ui.keyCode.DELETE:
			rtValue = true;
			break;
	}
	return rtValue;
}

function isCopyCut(event) {
	var rtValue = false;
	if (event.ctrlKey) {
		// C, X
		if ($.inArray(event.keyCode, [67, 88]) !== -1) {
			rtValue = true;
		}
	}
	return rtValue;
}

function isSelectAll(event) {
	var rtValue = false;
	if (event.ctrlKey) {
		// A
		if (event.keyCode == 65) {
			rtValue = true;
		}
	}
	return rtValue;
}

function isPaste(event) {
	var rtValue = false;
	if (event.ctrlKey) {
		// V
		if (event.keyCode == 86) {
			rtValue = true;
		}
	}
	return rtValue;
}

function isNumeric(event) {
	var rtValue = false;
	// 0,1,2,3,4,5,6,7,8,9
	if (!event.ctrlKey && !event.shiftKey) {
		if ($.inArray(event.keyCode, [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105]) !== -1) {
			rtValue = true;
		}
	}
	return rtValue;
}

function editPhone(phoneFieldObj) {
	//Clean input
	var origPhone = $(phoneFieldObj).val();
	var phoneInput = $(phoneFieldObj).val().replace(/\D/g, '');
	var phoneOutput = phoneInput;
	var newPhone = "";

	var areaCode = "";
	var exchange = "";
	var suffix = "";

	if (phoneOutput.length > 7 && phoneOutput.length <= 10) {
		areaCode = phoneOutput.substr(0, 3);
		exchange = phoneOutput.substr(3, 3);
		suffix = phoneOutput.substr(6, 4);
	} else if (phoneOutput.length > 3 && phoneOutput.length <= 7) {
		exchange = phoneOutput.substr(0, 3);
		suffix = phoneOutput.substr(3, 4);
	} else {
		exchange = phoneOutput.substr(0, 3);
	}

	if (areaCode.length != 0) {
		newPhone = "(" + areaCode + ") ";
	}

	if (exchange.length == 3) {
		newPhone = newPhone + exchange;
	} else {
		newPhone = exchange;
	}

	if (suffix.length > 0) {
		newPhone = newPhone + "-" + suffix;
	}

	if (newPhone != origPhone) {
		$(phoneFieldObj).val(newPhone);
	}


	//Save to Hidden
	if ($(phoneFieldObj).attr("id") == 'primaryDisputePhone') {
		$("#primaryDisputeAreaCode").val(areaCode);
		$("#primaryDisputeExchange").val(exchange);
		$("#primaryDisputeSuffix").val(suffix);
	} else {
		$(phoneFieldObj).prev(".phoneHiddenFields").children().eq(0).val(areaCode);
		$(phoneFieldObj).prev(".phoneHiddenFields").children().eq(1).val(exchange);
		$(phoneFieldObj).prev(".phoneHiddenFields").children().eq(2).val(suffix);
	}
	if ($(phoneFieldObj).attr("id") == 'primaryDisputeFax') {
		$("#primaryDisputeFaxAreaCode").val(areaCode);
		$("#primaryDisputeFaxExchange").val(exchange);
		$("#primaryDisputeFaxSuffix").val(suffix);
	}
	setChangeSaveFlag();

	return newPhone;
}

//Validates and cleans the user entered phone inputs
function editPhone2(phoneFieldObj) {
	//Clean input
	var origPhone = $(phoneFieldObj).val();
	var phoneInput = $(phoneFieldObj).val().replace(/\D/g, '');
	var phoneOutput = phoneInput;

	var areaCode = phoneOutput.substr(0, 3);
	var exchange = phoneOutput.substr(3, 3);
	var suffix = phoneOutput.substr(6, 4);
	if (areaCode.length < 3) {
		phoneOutput = areaCode;
	} else {
		phoneOutput = "(" + areaCode + ") " + exchange;
		if (exchange.length == 3) {
			phoneOutput = phoneOutput + "-" + suffix;
			if (suffix.length == 1) {
				phoneOutput = "(   )" + areaCode + "-" + exchange + suffix;
			}
		}
	}
	if (phoneOutput != origPhone) {
		$(phoneFieldObj).val(phoneOutput);
	}

	//Save to Hidden
	if ($(phoneFieldObj).attr("id") == 'primaryDisputePhone') {
		$("#primaryDisputeAreaCode").val(areaCode);
		$("#primaryDisputeExchange").val(exchange);
		$("#primaryDisputeSuffix").val(suffix);
	} else {
		$(phoneFieldObj).prev(".phoneHiddenFields").children().eq(0).val(areaCode);
		$(phoneFieldObj).prev(".phoneHiddenFields").children().eq(1).val(exchange);
		$(phoneFieldObj).prev(".phoneHiddenFields").children().eq(2).val(suffix);
	}
	setChangeSaveFlag();
	return phoneOutput;
}

function doGetCaretPosition(ctrl) {
	var caretPos = 0; // IE Support
	if (document.selection) {
		var sel = document.selection.createRange();
		sel.moveStart('character', -ctrl.value.length);
		caretPos = sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
		caretPos = ctrl.selectionStart;
	}

	return (caretPos);
}

function isSelectionRange(ctrl) {
	var rtValue = false;
	if (document.selection) {
		var sel = document.selection.createRange();
		rtValue = sel.text.length != 0;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
		rtValue = ctrl.selectionStart != ctrl.selectionEnd;
	}
	return rtValue;
}

function setCaretPosition(ctrl, pos) {
	if (ctrl.setSelectionRange) {
		ctrl.setSelectionRange(pos, pos);
	} else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function validateFieldGroup(inputField) {
	var fieldGroupClass = $(inputField).data('groupid');
	$("." + fieldGroupClass).each(function() {
		if ($(this).closest("form").length != 0) {
			$(this).valid();
		}
	});
}

function validateNumeric(maxLength, decimalPlaces, event, ele) {
	var rtValue = false;

	if (isBasicKeys(event) || isCtrlKeys(event) || isShiftKeys(event) || isNum(event) || isPeriod(event)) {
		rtValue = true;
		var value = $(ele).val();

		if ((value.indexOf('.') != -1) && (event.which == 190 || event.which == 110))
			return false;

		if ((value.indexOf('.') == -1) && (value.length == (maxLength - decimalPlaces)))
			rtValue = false;

		if ((value.indexOf('.') == -1) && (value.length == (maxLength - decimalPlaces)) && (event.which == 190 || event.which == 110))
			rtValue = true;

		if ((event.which == 190 || event.which == 110) && decimalPlaces == 0)
			rtValue = false;

		if (isBasicKeys(event))
			rtValue = true;

	} else {
		rtValue = false;
	}

	return rtValue;
}

function isBasicKeys(e) {
	switch (e.keyCode) {
		case $.ui.keyCode.BACKSPACE:
		case $.ui.keyCode.ENTER:
		case $.ui.keyCode.INSERT:
		case $.ui.keyCode.LEFT:
		case $.ui.keyCode.RIGHT:
		case $.ui.keyCode.DELETE:
		case $.ui.keyCode.CONTROL:
		case $.ui.keyCode.END:
		case $.ui.keyCode.HOME:
		case $.ui.keyCode.TAB:
			return true;
			break;
		default:
			return false;
	}
}

function isCtrlKeys(e) {
	if (e.ctrlKey == true) {
		if (e.which == 65 || e.which == 67 || e.which == 86 || e.which == 88) {
			return true;
		}
	}
}

function isShiftKeys(e) {
	if (e.shiftKey == true) {
		switch (e.keyCode) {
			case $.ui.keyCode.LEFT:
			case $.ui.keyCode.RIGHT:
			case $.ui.keyCode.END:
			case $.ui.keyCode.HOME:
				return true;
				break;
			default:
				return false;
		}
	} else {
		return false;
	}
}

function isAlpha(e) {
	if ((e.which >= 65 && e.which <= 90)) {
		return true;
	} else {
		return false;
	}
}

function isHyphenSpace(e) {
	if (e.keyCode == $.ui.keyCode.SPACE || e.which == 109 || e.which == 189) {
		return true;
	} else {
		return false;
	}
}

function isPeriod(e) {
	if (e.keyCode == $.ui.keyCode.PERIOD || e.which == 190 || e.which == 110) {
		return true;
	} else {
		return false;
	}
}

function isNum(e) {
	if (e.which >= 48 && e.which <= 57 || e.which >= 96 && e.which <= 105) {
		if (e.shiftKey == true) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

function isWild(e) {
	if (e.shiftKey == true) {
		if (e.which == 53) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

$(document).ready(function() {
	initValidation();
	validatorSetup();
	//setupMaskingFunctions();	
});
