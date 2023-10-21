const table = document.getElementById("requests-table");

const userJSON = sessionStorage.getItem("user");
const user = JSON.parse(userJSON); // parses json back to obj
const email = user.email;

myRequestsRequest(email)
  .then((requests) => {
    if (requests) {
      console.log("Fetch request successful");
      if (requests.length === 0) {
        // If the array is empty, display a message
        const messageDiv = document.createElement("div");
        messageDiv.textContent = "No item requests have yet been placed.";
        table.insertAdjacentElement("afterend", messageDiv);
        table.style.display = "none"; // Hide the table
      } else {
        // If the array is not empty, populate the table
        requests.forEach((itemRequest) => {
          const row = table.insertRow(); // Creates a new row

          const itemCell = row.insertCell(0);
          const quantityCell = row.insertCell(1);
          const reasonCell = row.insertCell(2);
          const statusCell = row.insertCell(3);

          itemCell.textContent = itemRequest.item;
          quantityCell.textContent = itemRequest.quantity;
          reasonCell.textContent = itemRequest.reason;
          statusCell.textContent = itemRequest.status;
        });
      }
    }
  })
  .catch((error) => {
    console.error("There was an error sending the fetch request", error);
    alert("There was an error sending the fetch request");
  });

async function myRequestsRequest(email) {
  const response = await fetch(`http://localhost:3000/api/requests/${email}`);
  if (response.ok) {
    console.log("Past requests fetched successfully!");
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } else {
    console.log("Past requests fetch failed.");
    console.log(response.status);
    alert(await response.text());
  }
}
