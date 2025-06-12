// Futuristic AI Education Landing Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initializePage();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Add staggered animation for service cards
                if (entry.target.classList.contains('services-grid')) {
                    const cards = entry.target.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animationPlayState = 'running';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll('.glass-section, .glass-card, .services-grid');
    elementsToObserve.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form field focus animations
    const formFields = document.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.style.transform = 'scale(1.02)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            this.style.transform = 'scale(1)';
        });
    });

    // Header background opacity on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 300, 0.95);
        header.style.background = `rgba(20, 20, 30, ${0.1 + opacity * 0.7})`;
    }, 10));

    // Parallax effect for hero section (performance optimized)
    const hero = document.querySelector('#hero');
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        hero.style.transform = `translateY(${parallax}px)`;
    }, 10));

    // Add glowing cursor effect
    if (window.innerWidth > 768) { // Only on larger screens
        const glowCursor = document.createElement('div');
        glowCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(glowCursor);

        document.addEventListener('mousemove', throttle(function(e) {
            glowCursor.style.left = e.clientX - 10 + 'px';
            glowCursor.style.top = e.clientY - 10 + 'px';
        }, 5));
    }

    // Service card interaction enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0,212,255,0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize animations for elements already in view
    setTimeout(() => {
        const heroContent = document.querySelector('#hero .hero-content');
        if (heroContent) {
            heroContent.classList.add('active');
        }
    }, 500);

    // Form submission enhancement
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const button = this.querySelector('.cta-button');
            const originalText = button.textContent;
            
            // Animate button
            button.style.background = 'linear-gradient(45deg, #00ff88, #00cc66)';
            button.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                button.style.background = 'linear-gradient(45d, #00d4ff, #0099cc)';
                button.textContent = 'Message Sent!';
                
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            }, 1500);
        });
    }
});

// Utility functions
function initializePage() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
