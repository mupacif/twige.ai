// AI Education Organization - Enhanced Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Update footer year dynamically
    updateFooterYear();
    
    // Initialize smooth scroll navigation
    initSmoothScroll();
    
    // Initialize scroll-to-top button
    initScrollToTop();
    
    // Initialize section animations on scroll
    initScrollAnimations();
    
    // Initialize form submission handling
    initFormHandling();
});

// Update footer year to current year
function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Initialize smooth scroll navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"], .cta-button[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize scroll-to-top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Handle click to scroll to top
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize section animations on scroll
function initScrollAnimations() {
    // Add animation class to sections
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.add('section-animate');
    });
    
    // Create intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize form submission handling
function initFormHandling() {
    const form = document.querySelector('#contact form');
    const feedback = document.getElementById('form-feedback');
    
    if (!form || !feedback) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showFormFeedback('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormFeedback('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (in a real app, this would send to a server)
        showFormFeedback('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form after successful submission
        setTimeout(() => {
            form.reset();
            hideFormFeedback();
        }, 3000);
    });
}

// Show form feedback message
function showFormFeedback(message, type) {
    const feedback = document.getElementById('form-feedback');
    if (!feedback) return;
    
    feedback.textContent = message;
    feedback.className = 'form-feedback ' + type;
}

// Hide form feedback message
function hideFormFeedback() {
    const feedback = document.getElementById('form-feedback');
    if (!feedback) return;
    
    feedback.className = 'form-feedback';
    feedback.textContent = '';
}

// Enhanced keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close any modals or feedback
    if (e.key === 'Escape') {
        hideFormFeedback();
    }
    
    // Enter key on scroll-to-top button
    if (e.key === 'Enter' && e.target.id === 'scroll-to-top') {
        e.target.click();
    }
});

// Add focus management for better accessibility
function enhanceAccessibility() {
    // Skip link functionality (if added in future)
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#main') || document.querySelector('main');
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    // Ensure sections are focusable
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (!section.hasAttribute('tabindex')) {
            section.setAttribute('tabindex', '-1');
        }
    });
}

// Initialize accessibility enhancements
enhanceAccessibility();
