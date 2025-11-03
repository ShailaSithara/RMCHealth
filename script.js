        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Mobile dropdown toggle
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = toggle.closest('.dropdown');
                    dropdown.classList.toggle('active');
                }
            });
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });

        // Scroll to top button
        const scrollTop = document.getElementById('scrollTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards for animation
        document.querySelectorAll('.card, .service-card, .stat-item, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });

        // Stats counter animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const number = entry.target.querySelector('.stat-number');
                    const text = number.textContent.replace('+', '');
                    const targetValue = text.includes('K') ? parseInt(text) * 1000 : parseInt(text);
                    const displayValue = text.includes('K') ? parseInt(text) : targetValue;
                    const suffix = text.includes('K') ? 'K+' : '+';
                    
                    let start = 0;
                    const duration = 2000;
                    const increment = displayValue / (duration / 16);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= displayValue) {
                            number.textContent = displayValue + suffix;
                            clearInterval(timer);
                        } else {
                            number.textContent = Math.floor(start) + suffix;
                        }
                    }, 16);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-item').forEach(stat => {
            statsObserver.observe(stat);
        });
// Scroll-to-top logic
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
