import { notifsRequest } from "./notifications.js";

const userJSON = sessionStorage.getItem("user");
const user = JSON.parse(userJSON); // parses json back to obj
const email = user.email;

// add collapsible--expanded class to first collapsible elem when toggler clicked
const collapsibles = document.querySelectorAll(".collapsible");
const togglerArea = document.getElementById("clickable");

togglerArea.addEventListener("click", function () {
  collapsibles[0].classList.toggle("collapsible--expanded");
});

notifsRequest(email)
  .then((notifs) => {
    if (notifs.length !== 0) {
      // animate menu list item "notifs"
      const toFlash = document.getElementById("mightFlash");
      if (toFlash) toFlash.classList.add("flash-red");
    }
  })
  .catch((error) => {
    console.log("Error fetching notifs:" + error);
  });
