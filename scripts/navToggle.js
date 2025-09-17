// ✅ Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
const mobileMenuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn?.querySelector('i');
const mobileSearch = document.getElementById('mobile-search');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
    mobileSearch?.classList.toggle('hidden');

    if (menuIcon?.classList.contains('fa-bars')) {
    menuIcon.classList.replace('fa-bars', 'fa-times');
    } else {
    menuIcon.classList.replace('fa-times', 'fa-bars');
    }
});
});