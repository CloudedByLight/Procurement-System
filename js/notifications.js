const table = document.getElementById("notifs-table");
const form = document.getElementById("form--update-req");
const btnApprove = document.getElementById("approve");
const btnDeny = document.getElementById("deny");

const userJSON = sessionStorage.getItem("user");
if (!userJSON) window.location = "../sign-in.html"; // ensures auth
const user = JSON.parse(userJSON); // parses json back to obj
const email = user.email;

if (!user.isSupervisor && form) {
  form.style.display = "none";
}

if (table) {
  notifsRequest(email)
    .then((notifs) => {
      if (notifs) {
        console.log("Fetch request successful");

        if (notifs.length === 0) {
          // If the array is empty, display a message
          const messageDiv = document.createElement("div");
          messageDiv.textContent = "No notifications.";
          table.insertAdjacentElement("afterend", messageDiv);
          table.style.display = "none";
          form.style.display = "none";
        } else {
          // If the array is not empty, populate the table
          notifs.forEach((notif) => {
            const row = table.insertRow(); // Creates a new row
            const idCell = row.insertCell(0);
            const emailCell = row.insertCell(1);
            const itemCell = row.insertCell(2);
            const quantityCell = row.insertCell(3);
            const reasonCell = row.insertCell(4);
            const statusCell = row.insertCell(5);
            idCell.textContent = notif._id;
            emailCell.textContent = notif.email;
            itemCell.textContent = notif.item;
            quantityCell.textContent = notif.quantity;
            reasonCell.textContent = notif.reason;
            statusCell.textContent = notif.status;
          });
        }
      }
    })
    .catch((error) => {
      console.error(
        "There was an error sending the notifs fetch request",
        error
      );
      alert("There was an error sending the notifs fetch request");
    });
}

if (btnApprove && btnDeny) {
  btnApprove.addEventListener("click", (event) => {
    event.preventDefault();
    const id = document.getElementById("requestID").value;
    updateNotifRequest(email, id, btnApprove.value);
    window.location = "./notifications.html";
  });

  btnDeny.addEventListener("click", (event) => {
    event.preventDefault();
    const id = document.getElementById("requestID").value;
    updateNotifRequest(email, id, btnDeny.value);
    window.location = "./notifications.html";
  });
}

export async function notifsRequest(email) {
  const response = await fetch(
    `http://localhost:3000/api/requests/${email}/notifications`
  );
  if (response.ok) {
    console.log("Notifs fetched successfully!");
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } else {
    console.log("Notifications fetch failed.");
    console.log(response.status);
    alert(await response.text());
  }
}

async function updateNotifRequest(email, id, status) {
  const response = await fetch(`http://localhost:3000/api/requests/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, status: status }),
  });

  if (response.ok) {
    console.log("Update request successful!");
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } else {
    console.log("Update request failed.");
    console.log(response.status);
    alert(await response.text());
  }
}
