const BASE_URL = "https://code-master.up.railway.app";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Registration successful!");
      // Redirect to dashboard or login page
    } else {
      alert(data.error || "Registration failed.");
    }
  } catch (err) {
    alert("Server unreachable");
  }
});
