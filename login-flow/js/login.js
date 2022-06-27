localStorage.setItem("loggedInUser", "True");
const user = localStorage.getItem("loggedInUser");
if (user) {
  console.log("Welcome back!");
} else {
  console.log("Login");
}
