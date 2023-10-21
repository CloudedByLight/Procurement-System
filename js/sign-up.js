const btnSignUp = document.getElementById("sign-up");

btnSignUp.addEventListener("click", async (event) => {
  event.preventDefault();
  const form = document.getElementById("form--sign-up");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  const supervisorCheck = document.getElementById("supervisor").checked;

  if (form.reportValidity() && name && email && password && password2) {
    if (password2 != password) {
      alert("Passwords do not match");
      return;
    } else {
      try {
        const user = await signUpRequest(
          name,
          email,
          password,
          supervisorCheck
        );
        if (user) {
          const userJSON = JSON.stringify(user);
          sessionStorage.setItem("user", userJSON);
          window.location = "../home.html";
        }
      } catch (error) {
        console.error("There was an error sending the sign up request", error);
        alert("There was an error sending the sign up request");
      }
    }
  }
});

async function signUpRequest(name, email, password, isSupervisor) {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      isSupervisor: isSupervisor,
    }),
  });

  if (response.ok) {
    console.log("Sign Up Successful!");
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } else {
    console.log("Sign Up Failed.");
    console.log(response.status);
    alert(await response.text());
  }
}
