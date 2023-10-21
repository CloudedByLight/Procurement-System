const userJSON = sessionStorage.getItem("user");
const user = JSON.parse(userJSON); // parses json back to obj

document.getElementById("name").innerHTML = user.name;
document.getElementById("email").innerHTML = user.email;
document.getElementById("user_type").innerHTML = user.isSupervisor
  ? "Supervisor"
  : "Employee";
