// Loading Animation
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 1500);
    });
}

// Title Slideshow functionality
function initTitleSlideshow() {
    const slides = document.querySelectorAll('.title-slideshow .slide');
    let currentSlide = 0;

    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Change slide every 3 seconds
    setInterval(nextSlide, 3000);
}

// Contact Form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            // Simulate sending the message
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            // Always reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Typing animation functionality
function initTypingAnimation() {
    const typingTexts = document.querySelectorAll('.typing-text');
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isTyping = false;

    function typeText(element, text) {
        if (currentCharIndex < text.length) {
            element.textContent = text.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            element.classList.add('typing');
            setTimeout(() => typeText(element, text), 30);
        } else {
            element.classList.remove('typing');
            isTyping = false;
        }
    }

    function startTyping() {
        if (!isTyping && currentTextIndex < typingTexts.length) {
            const element = typingTexts[currentTextIndex];
            const text = element.getAttribute('data-text') || element.textContent;
            element.textContent = '';
            element.classList.add('visible');
            currentCharIndex = 0;
            isTyping = true;
            typeText(element, text);
        }
    }

    function handleScroll() {
        typingTexts.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.75;
            
            if (isVisible && !element.classList.contains('visible')) {
                element.classList.add('visible');
                if (index === currentTextIndex) {
                    startTyping();
                }
            }
        });
    }

    // Store original text content
    typingTexts.forEach(element => {
        element.setAttribute('data-text', element.textContent);
    });

    // Initial check
    handleScroll();

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
}

// Navigation bar scroll effect
function initNavScroll() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Menu Toggle functionality
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Initialize all animations and functionality when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initTitleSlideshow();
    initTypingAnimation();
    initContactForm();
    initNavScroll();
    initMenuToggle();
}); 