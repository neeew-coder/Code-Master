    document.addEventListener("DOMContentLoaded", () => {
      const toggleBtn = document.getElementById("menu-toggle");
      const menuIcon = document.getElementById("menu-icon");
      const mobileMenu = document.getElementById("mobile-menu");

      if (!toggleBtn || !mobileMenu || !menuIcon) return;

      toggleBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("open");

        mobileMenu.classList.toggle("open");
        mobileMenu.classList.toggle("hidden");

        // Toggle icon
        menuIcon.classList.toggle("fa-bars", isOpen);
        menuIcon.classList.toggle("fa-times", !isOpen);
      });
    });