const btnSignIn = document.getElementById("sign-in");

btnSignIn.addEventListener("click", async (event) => {
  event.preventDefault();
  const form = document.getElementById("form--sign-in");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (form.reportValidity() && email && password) {
    try {
      const user = await signInRequest(email, password);
      if (user) {
        const userJSON = JSON.stringify(user);
        sessionStorage.setItem("user", userJSON);
        window.location = "../home.html";
      }
    } catch (error) {
      console.error("There was an error sending the login request", error);
      alert("There was an error sending the login request");
    }
  }
});

async function signInRequest(email, password) {
  const response = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (response.ok) {
    console.log("Authentication Successful!");
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } else {
    console.log("Authentication Failed.");
    console.log(response.status);
    alert(await response.text());
  }
}
