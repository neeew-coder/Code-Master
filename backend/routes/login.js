const BASE_URL = "https://code-master.up.railway.app";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      // Redirect or load dashboard
    } else {
      alert(data.error || "Login failed.");
    }
  } catch (err) {
    alert("Server unreachable");
  }
});
