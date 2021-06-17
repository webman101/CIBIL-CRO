// JavaScript Document for No jQuery Header component

/* ---- Global Variables ---- */
const mmXs = window.matchMedia('screen and (max-width:767px)');
const mmSm = window.matchMedia('screen and (min-width:768px)');
const mmSmRange = window.matchMedia('screen and (min-width:768px) and (max-width:991px)');
const mmMd = window.matchMedia('screen and (min-width:992px)');
const mmMdRange = window.matchMedia('screen and (min-width:992px) and (max-width:1199px)');
const mmLg = window.matchMedia('screen and (min-width:1200px)');
var x;
var linkObj;
var navAction;

window.onload = function() {
    if (mmXs.matches || mmSmRange.matches) {
        var navDesktopLinks = document.getElementsByClassName("desktopLink");
        for (var i = 0; i < navDesktopLinks.length; i++) {
            navDesktopLinks[i].style.display = "none";
        }
        var navMobileLinks = document.getElementsByClassName("mobileLink");
        for (var i = 0; i < navMobileLinks.length; i++) {
            navMobileLinks[i].style.display = "block";
        }
        // Hide list items with collapsible headers (products, resources and services sub-nav) for mobile/tablet

		var listItems = document.getElementsByClassName("accordionNav");
        for (var i = 0; i < listItems.length; i++) {
			var subNavListItems = listItems[i].querySelectorAll(".subNavUList");
			for (var j = 0; j < subNavListItems.length; j++) {
				subNavListItems[j].style.display = "none";
			}
        }
    }
    else {
        var navDesktopLinks = document.getElementsByClassName("desktopLink");
        for (var i = 0; i < navDesktopLinks.length; i++) {
            navDesktopLinks[i].style.display = "block";
        }
        var navMobileLinks = document.getElementsByClassName("mobileLink");
        for (var i = 0; i < navMobileLinks.length; i++) {
            navMobileLinks[i].style.display = "none";
        }
        var listItems = document.getElementsByClassName("subNavUList");
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].style.display = "block";
        }
    }
}

// Function for 'Customer Support' and 'Annual Credit Report' links
function toggleHighlight (linkObj) {
    hideAll();
    linkObj.className += " activeSubNav";
}

// Toggle Search
function toggleSearch(navItem, linkObj) {
	hideAll();
	x = document.getElementById(navItem);
    x.style.transition = "all 3s ease";
    x.style.display = "block"; // Show 'navItem' if its hidden
    linkObj.parentNode.classList.add("active"); // Add 'active' class to the selected main nav <li>
    linkObj.className += " activeSubNav"; // Add 'activeSubNav' class to the selected main nav
    linkObj.setAttribute("aria-expanded", true);
    document.getElementById("searchBox").focus();
    // Add black overlay
    document.getElementById("desktopFade").style.display = "block";
}

// Toggle sub nav items on mobile or tablet //
function toggleSubNav (listObjID, linkObj) {
    var listObj = document.getElementById(listObjID);
    // If sub nav items are hidden, show them
    if (listObj.style.display === "none") {
        listObj.style.display = "block";
        linkObj.querySelector(".expandPlusSign").style.display = "none";
        linkObj.querySelector(".collapseMinusSign").style.display = "inline-block";
        linkObj.querySelector(".grayArrowLine").style.display = "block";
        linkObj.setAttribute("aria-expanded", true);
    }
    // If sub nav items are shown, hide them
    else {
        listObj.style.display = "none";
        linkObj.querySelector(".expandPlusSign").style.display = "inline-block";
        linkObj.querySelector(".collapseMinusSign").style.display = "none";
        linkObj.querySelector(".grayArrowLine").style.display = "none";
        linkObj.setAttribute("aria-expanded", false);
    }
}


// ****** Toggle main navigation *****//

function toggleMainNav(navItem, linkObj, navAction) {
	x = document.getElementById(navItem);
	var mainNavLinks = document.getElementById('mainNav').getElementsByClassName("toggleMenu");
    for (var i = 0; i < mainNavLinks.length; i++) {
		mainNavLinks[i].classList.remove("activeSubNav"); // Remove 'activeSubNav' class from all the main nav links
		mainNavLinks[i].setAttribute("aria-expanded", false);
	}
    var mainNavList = document.getElementById('mainNav').querySelectorAll('ul#mainNavList > li');
    for (var k = 0; k < mainNavList.length; k++) {
		mainNavList[k].classList.remove("active"); // Remove 'active' class from all the main nav <li>
    }
    var divsToHide = document.getElementsByClassName("dtSubNav");
    for (var j = 0; j < divsToHide.length; j++) {
		if (divsToHide[j] !== x) {
			divsToHide[j].style.display = "none"; // Hide all divs
		}
    }
	if (x.style.display === "none") {
		x.style.transition = "all 3s ease";
		x.style.display = "block"; // Show 'navItem' if its hidden
		linkObj.parentNode.classList.add("active"); // Add 'active' class to the selected main nav <li>
		linkObj.className += " activeSubNav"; // Add 'activeSubNav' class to the selected main nav
		linkObj.setAttribute("aria-expanded", true);
		// Add black overlay
		document.getElementById("desktopFade").style.display = "block";
	} else {
		if (navAction === 'click') {
			x.style.display = "none"; // Hide 'navItem' if its shown
			linkObj.parentNode.classList.remove("active");
			linkObj.classList.remove("activeSubNav"); // Remove 'activeSubNav' class from the main nav link
			linkObj.setAttribute("aria-expanded", false);
			// Remove black overlay
			document.getElementById("desktopFade").style.display = "none";
		}
		else {
			linkObj.parentNode.classList.add("active");			
			linkObj.className += " activeSubNav"; // Add 'activeSubNav' class to the selected main nav
			linkObj.setAttribute("aria-expanded", true);
			// Add black overlay
			document.getElementById("desktopFade").style.display = "block";
		}
	}
	// *** For mobile/tablet always show solutions and products subnav links *** //
	if (mmXs.matches || mmSmRange.matches) {
		var links = document.getElementsByClassName("spSubHeading");
		for (var k = 0; k < links.length; k++) {
			//links[k].classList.remove("active");
			links[k].setAttribute("aria-expanded", false);
		}
		if (typeof(document.getElementById("solAndProdSubNav")) != 'undefined' && document.getElementById("solAndProdSubNav") != null) {
			document.getElementById("solAndProdSubNav").style.display = "block";
			var listsToHide = document.getElementById("solAndProdSubNav").querySelectorAll(".subNavUList");
			for (var j = 0; j < listsToHide.length; j++) {
				listsToHide[j].style.display = "none"; // Hide all ul under Solutions/Products that have class '.subNavUList'
			}
		}
	}
}

// ****** Close navigation if user clicks elsewhere on the page ******//

// document.body.addEventListener('mouseup', function (event) {
// 	var mainNavLinks = document.getElementById('mainNav').getElementsByClassName("toggleMenu");

// 	if (x !== undefined && event.target !== x && event.target.parentNode !== x && event.target.innerHTML !== x.parentNode.children[0].innerHTML) {
// 		if (mmMd.matches || mmMdRange.matches) {
// 			hideAll();
// 		}
// 	}
// });

// ****** Hide open navigation when hovered away ****** //

function hideNavigation(menuID) {
    document.getElementById(menuID).addEventListener('mouseover', function() {
		document.getElementById(menuID).style.display = "block";
	});
	
    document.getElementById(menuID).addEventListener('mouseleave', function() {
        hideAll();
	});
}

// ****** Close navigation if ESC key is pressed ******//

document.onkeyup = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        var mainNavLinks = document.getElementById('mainNav').getElementsByClassName("toggleMenu");

		if (x !== undefined && evt.target !== x && evt.target.parentNode !== x) {
			hideAll();
		}
		var dropdowns = document.getElementsByClassName("utilityDropDown");
		for (var i = 0; i < dropdowns.length; i++) {
			if (dropdowns[i].classList.contains('show')) {
				dropdowns[i].classList.remove('show');
			}
		}
    }
};

// Generic function to hide all nav and remove active classes
function hideAll() {
	var mainNavLinks = document.getElementById('mainNav').getElementsByClassName("toggleMenu");
    for (var i = 0; i < mainNavLinks.length; i++) {
		mainNavLinks[i].classList.remove("activeSubNav"); // Remove 'activeSubNav' class from all the main nav links
		mainNavLinks[i].setAttribute("aria-expanded", false);
	}
    var mainNavList = document.getElementById('mainNav').querySelectorAll('ul#mainNavList > li');
    for (var k = 0; k < mainNavList.length; k++) {
		mainNavList[k].classList.remove("active"); // Remove 'active' class from all the main nav <li>
    }
    var divsToHide = document.getElementsByClassName("dtSubNav");
    for (var j = 0; j < divsToHide.length; j++) {
		divsToHide[j].style.display = "none"; // Hide all divs
    }
    document.getElementById("desktopFade").style.display = "none";	// Remove black overlay
}

// ****** Toggle mobile/tablet menu ****** //

function toggleMobileNavMenu() {
	document.body.classList.toggle("mobileMenuOpen");

	// Toggle aria-expanded attribute
	var x = document.getElementById("mobiNavActivate").getAttribute("aria-expanded");
	var logoLink = document.getElementById('headerLogo').getElementsByTagName('a');
	if (x == "true") {
		x = "false";	// Close menu
		document.getElementById("mobileNavAction").innerHTML = "Open Navigation";
		for (var i = 0; i < logoLink.length; i++) {
			logoLink[i].tabIndex = 0;	// Place TU logo link in tab order
		}
		if (document.getElementById("solAndProdSubNav")) {
			document.getElementById("solAndProdSubNav").style.display = "none";
			document.getElementById("solNavContent").style.display = "block";
		} 
	} 
	else {
		x = "true";		// Open menu
		document.getElementById("mobileNavAction").innerHTML = "Close Navigation";
		for (var i = 0; i < logoLink.length; i++) {
			logoLink[i].tabIndex = -1;	// Remove TU logo link from tab order
		}
		if (document.getElementById("solAndProdSubNav")) {
			document.getElementById("solAndProdSubNav").style.display = "block"
			document.getElementById("solNavContent").style.display = "none";
		}
	}
	document.getElementById("mobiNavActivate").setAttribute("aria-expanded", x);
}

// ****** Show header navigation for larger devices ****** //

if (mmMd.matches) {
	document.getElementById('mobileMainNav').style.display = "block";
}

// ****** Show/Hide Search Box functions ******//

var searchBoxObj = document.getElementById("nonJqueryHeaderWrapper").getElementsByClassName("searchBox")[0];

function toggleMobileSearchField(linkObj) {
	if (searchBoxObj.style.display === "none")
	{
		searchBoxObj.style.display = "block";
		linkObj.classList.add('activeLink');
		document.getElementById("nonJqueryHeaderWrapper").getElementsByClassName("searchField").value = "";
		document.getElementById("nonJqueryHeaderWrapper").getElementsByClassName("searchField")[0].focus();
	}
	else {
		searchBoxObj.style.display = "none";
		linkObj.classList.remove('activeLink');
	}
}

// ****** Clear function for search box ******//

var toggleClearFunction = function (event) {
	if (this.value.length !== 0) {
		document.getElementById("resetSearchBtn").style.display = "block";
	} else {
		document.getElementById("resetSearchBtn").style.display = "none";
	}
};
var toggleClearMobileFunction = function (event) {
	if (this.value.length !== 0) {
		document.getElementById("mobileResetSearchBtn").style.display = "block";
	} else {
		document.getElementById("mobileResetSearchBtn").style.display = "none";
	}
};

// Event listeners for clear functions above

document.getElementById("searchBox").addEventListener('click', toggleClearFunction, false);
document.getElementById("searchBox").addEventListener('keydown', toggleClearFunction, false);
document.getElementById("searchBox").addEventListener('change', toggleClearFunction, false);
document.getElementById("searchBox").addEventListener('focus', toggleClearFunction, false);

document.getElementById("searchBoxMobile").addEventListener('click', toggleClearMobileFunction, false);
document.getElementById("searchBoxMobile").addEventListener('keydown', toggleClearMobileFunction, false);
document.getElementById("searchBoxMobile").addEventListener('change', toggleClearMobileFunction, false);
document.getElementById("searchBoxMobile").addEventListener('focus', toggleClearMobileFunction, false);

function hideBtn(btnObj) {
	btnObj.style.display = "none";
	document.getElementById("searchBox").focus();
}

// ****** Affix header on window scroll ******//

window.onscroll = function changeNav() {
	var navBar = document.getElementById('nonJqueryHeaderMain');
	var navBarHeight = navBar.getBoundingClientRect().height;
	var scrollPosY = window.pageYOffset | document.body.scrollTop;

	if (scrollPosY > (navBarHeight/3)) {
		navBar.className = ('affix');
	} else if (scrollPosY <= navBarHeight) {
		navBar.className = ('affix-top');
	}
}

// ****** Add shadow on target nav on scroll ******//

document.getElementById("mobileMainNav").onscroll = function shadowNav() {
	var tarNav = document.getElementById("targetNav");
	if (document.getElementById("mobileMainNav").scrollTop > 0) {
		tarNav.classList.add("targetShadowed");
	} else {
		tarNav.classList.remove("targetShadowed");
	}
}

// ****** Skip Links ****** //

document.addEventListener("DOMContentLoaded", function(event) { 
    if (document.getElementById('columnSectionComponent')) {
		var skipLink = "<a class='skip-main' href='#columnSectionComponent'>Skip to Main Content</a>"; 
	}
	else if (document.getElementById('columnSecondComponent')) {
		var skipLink = "<a class='skip-main' href='#columnSecondComponent'>Skip to Main Content</a>";
	}
	skipLinkDiv = document.createElement('div');
	skipLinkDiv.innerHTML = skipLink;
	document.body.prepend(skipLinkDiv);
});