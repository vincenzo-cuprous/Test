// Smooth scrolling function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Canvas animation
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Create particles
const particles = [];
const particleCount = 50;

function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    });
  }
}

// Draw particles
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(108, 99, 255, 0.5)";

  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();

    // Move particles
    particle.x += particle.dx;
    particle.y += particle.dy;

    // Bounce off edges
    if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
  });

  requestAnimationFrame(drawParticles);
}

// Initialize canvas
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
createParticles();
drawParticles();

// Another
function toggleSubmenu() {
  const submenu = document.getElementById("helpSubmenu");
  submenu.classList.toggle("active");
}

function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

// Close submenu and mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const helpBtn = document.querySelector(".help-btn");
  const submenu = document.getElementById("helpSubmenu");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.getElementById("navLinks");

  if (!helpBtn.contains(event.target)) {
    submenu.classList.remove("active");
  }

  if (
    !mobileMenuBtn.contains(event.target) &&
    !navLinks.contains(event.target)
  ) {
    navLinks.classList.remove("active");
  }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
