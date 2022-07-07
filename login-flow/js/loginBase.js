/* container */
/* $(window).on("load resize", function (e) {
    let HeaderContainer = $(".header-container").width();
    let formSection = $(".loginFlow-form-section").outerWidth();
  
    let totalMargin = (formSection - HeaderContainer) / 2;
  
    let fullRightPanel = $(".loginFlow-form-section .right-panel");
    fullRightPanel.css("padding-right", totalMargin);
  
    let footerText = $(".footer-text");
    let footerAlign = (fullRightPanel.innerWidth()/2) - (footerText.width()/2) ;
    footerText.css("left", footerAlign);
  }); */
  
  $footerText = $(".mhide.footer-text");
  $footerTextMarginTop = $footerText.attr("marginTop");
  $footerText.css("margin-top", $footerTextMarginTop+"px" );
