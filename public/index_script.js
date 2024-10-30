            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
    
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
    
            // Back to top button functionality
            document.getElementById('back-to-top-btn').addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
    
            // Mobile menu toggle
            const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            const dropdowns = document.querySelectorAll('.dropdown');
    
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
    
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            });
    
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && e.target !== menuToggle) {
                    navLinks.classList.remove('active');
                    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                }
            });
    
            // Resize handler to reset menu state
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navLinks.classList.remove('active');
                    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                }
            });
    
            // Scroll animation
            const sections = document.querySelectorAll('section');
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
    
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
    
            sections.forEach(section => {
                observer.observe(section);
            });
    
            // Dynamic text change
            const dynamicText = document.getElementById('dynamic-text');
            const cursor = document.querySelector('.cursor');
            const texts = [
                "We will Give You The Best Content About Islam 🕌",
                "We Will Provide You Books 📕",
                "We Also Provide Some Of The Islamic Content 📖",
                "Click It If You Want To Know, Who Are Us? 😯",
                "Click It If You Want To Go Back 🏠"
            ];
            let currentIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;
    
            function typeText() {
                const currentText = texts[currentIndex];
                
                if (isDeleting) {
                    dynamicText.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    dynamicText.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }
    
                cursor.style.left = `${dynamicText.offsetWidth}px`;
    
                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    typingSpeed = 50;
                    setTimeout(typeText, 1500);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % texts.length;
                    typingSpeed = 100;
                    setTimeout(typeText, 500);
                } else {
                    setTimeout(typeText, typingSpeed);
                }
            }
    
            typeText();