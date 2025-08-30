const authStatus = document.getElementById('authStatus');

fetch("https://code-master-kk2m.onrender.com/api/profile/me", {
  method: "GET",
  credentials: "include"
})
  .then(res => {
    if (!res.ok) throw new Error("Not authenticated");
    return res.json();
  })
  .then(data => {
    authStatus?.classList.add("hidden");
    signInBtn?.classList.add("hidden");
    profileDropdownWrapper?.classList.remove("hidden");
    profileBtn.textContent = data.username || "Profile";

    profileNameEl.textContent = data.username;
    profileTaglineEl.textContent = data.bio || "";
    nameInput.value = data.username;
    taglineInput.value = data.bio || "";
  })
  .catch(() => {
    authStatus?.classList.add("hidden");
    signInBtn?.classList.remove("hidden");
    profileDropdownWrapper?.classList.add("hidden");
  });
