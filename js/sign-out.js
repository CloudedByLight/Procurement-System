const signOutBtn = document.getElementById("sign-out");

signOutBtn.addEventListener("click", (event) => {
  event.preventDefault();
  sessionStorage.clear();
  window.location = "../sign-in.html";
});
