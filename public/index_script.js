function toggleSubmenu() {
    const submenu = document.getElementById('helpSubmenu');
    submenu.classList.toggle('active');
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close submenu and mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const helpBtn = document.querySelector('.help-btn');
    const submenu = document.getElementById('helpSubmenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.getElementById('navLinks');

    if (!helpBtn.contains(event.target)) {
        submenu.classList.remove('active');
    }

    if (!mobileMenuBtn.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active');
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});