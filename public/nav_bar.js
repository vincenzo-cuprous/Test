const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const submenuToggles = document.querySelectorAll('.submenu-toggle');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const submenu = toggle.nextElementSibling;
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
        navLinks.classList.remove('active');
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.style.display = 'none';
        });
    }
});

// Keyboard accessibility
navLinks.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.style.display = 'none';
        });
    }
});

// Adjust submenu behavior on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.style.display = '';
        });
    }
});