const btnSubmitRequest = document.getElementById("submit-request");

btnSubmitRequest.addEventListener("click", async (event) => {
  event.preventDefault();
  const form = document.getElementById("request-item");
  const item = document.getElementById("item").value;
  let quantity = document.getElementById("quantity").value;
  const reason = document.getElementById("reason").value;

  const userJSON = sessionStorage.getItem("user");
  const user = JSON.parse(userJSON); // parses json back to obj
  const email = user.email;

  if (form.reportValidity() && item && reason) {
    if (!quantity) quantity = 1;
    try {
      const request = await itemRequest(email, item, reason, quantity);
      if (request) {
        alert("Request placed successfully!");
        form.reset();
      }
    } catch (error) {
      console.error("There was an error sending the request", error);
      alert("There was an error sending the request");
    }
  }
});

async function itemRequest(email, item, reason, quantity) {
  const response = await fetch("http://localhost:3000/api/requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      item: item,
      reason: reason,
      quantity: quantity,
    }),
  });

  if (response.ok) {
    console.log("Item request successful!");
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } else {
    console.log("Item request failed.");
    console.log(response.status);
    alert(await response.text());
  }
}
