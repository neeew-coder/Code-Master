
document.addEventListener("DOMContentLoaded", () => {
  // ─── Avatar Selection ───────────────────────────────────────────────────────
  const avatarOptions = document.querySelectorAll(".avatar-option");
  const avatarUpload = document.getElementById("avatarUpload");
  const profileAvatar = document.getElementById("profileAvatar");
  const navAvatar = document.getElementById("navAvatar");
  const avatarSelector = document.getElementById("avatarSelector");

  // Toggle avatar selector on avatar click
  profileAvatar.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent bubbling to document
    avatarSelector.classList.toggle("hidden");
  });

  // Hide selector when clicking outside
  document.addEventListener("click", (e) => {
    if (!avatarSelector.contains(e.target)) {
      avatarSelector.classList.add("hidden");
    }
  });

  // Handle avatar selection
  avatarOptions.forEach(img => {
    img.addEventListener("click", () => {
      avatarOptions.forEach(opt => opt.classList.remove("border-indigo-600"));
      img.classList.add("border-indigo-600");

      profileAvatar.innerHTML = `<img src="${img.src}" class="w-full h-full rounded-full" alt="Selected Avatar" />`;
      navAvatar.innerHTML = `<img src="${img.src}" class="w-full h-full rounded-full" alt="Nav Avatar" />`;

      localStorage.setItem("selectedAvatar", img.src);
      avatarSelector.classList.add("hidden");
    });
  });

  // Handle avatar upload
  avatarUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;

      profileAvatar.innerHTML = `<img src="${imageUrl}" class="w-full h-full rounded-full" alt="Uploaded Avatar" />`;
      navAvatar.innerHTML = `<img src="${imageUrl}" class="w-full h-full rounded-full" alt="Nav Avatar" />`;

      localStorage.setItem("selectedAvatar", imageUrl);
      avatarSelector.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  });

  // Load saved avatar
  const savedAvatar = localStorage.getItem("selectedAvatar");
  if (savedAvatar) {
    profileAvatar.innerHTML = `<img src="${savedAvatar}" class="w-full h-full rounded-full" alt="Saved Avatar" />`;
    navAvatar.innerHTML = `<img src="${savedAvatar}" class="w-full h-full rounded-full" alt="Saved Nav Avatar" />`;
  }
});