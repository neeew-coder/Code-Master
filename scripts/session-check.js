document.addEventListener("DOMContentLoaded", () => {
  fetch("https://code-master-kk2m.onrender.com/api/profile/me", {
    method: "GET",
    credentials: "include"
  })
  .then(res => {
    if (!res.ok) throw new Error("Not authenticated");
    return res.json();
  })
  .then(data => {
    document.getElementById("signInBtn")?.classList.add("hidden");
    document.getElementById("profileDropdownWrapper")?.classList.remove("hidden");
    document.getElementById("profileBtn").textContent = data.username || "Profile";
  })
  .catch(() => {
    document.getElementById("signInBtn")?.classList.remove("hidden");
    document.getElementById("profileDropdownWrapper")?.classList.add("hidden");
  });
});
