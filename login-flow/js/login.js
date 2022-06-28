/* identify if user is existing or new */
localStorage.setItem("loggedInUser", "True");
const user = localStorage.getItem("loggedInUser");
if (user) {
  console.log("Welcome back!");
} else {
  console.log("Login");
}

/* container */
$(window).on("load resize", function (e) {
  let HeaderContainer = $(".header-container").width();
  let formSection = $(".login-form-section").outerWidth();

  let totalMargin = (formSection - HeaderContainer) / 2;

  let fullRightPanel = $(".login-form-section .right-panel");
  fullRightPanel.css("padding-right", totalMargin);

  let footerText = $(".footer-text");
  let footerAlign = (fullRightPanel.width()/2) - (footerText.width()/2) ;
  console.log(footerAlign);
  footerText.css("left", footerAlign);
});
