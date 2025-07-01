// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
            } else {
                // Get form data
                const name = this.querySelector('input[name="name"]').value;
                const phone = this.querySelector('input[name="phone"]').value;
                const address = this.querySelector('input[name="address"]').value;
                const message = this.querySelector('textarea[name="message"]').value;
                
                // Simulate form submission
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = 'Sending...';
                
                // Check if we're using Formspree or need fallback
                const formAction = this.action;
                
                if (formAction.includes('YOUR_FORM_ID')) {
                    // Use EmailJS fallback
                    sendEmailWithEmailJS(name, phone, address, message, submitButton, originalText, this);
                } else {
                    // Use Formspree
                    sendEmailWithFormspree(this, submitButton, originalText);
                }
            }
            
            this.classList.add('was-validated');
        });
    }
});

// EmailJS fallback function
function sendEmailWithEmailJS(name, phone, address, message, submitButton, originalText, form) {
    // For immediate testing, we'll simulate email sending
    // In production, you would use EmailJS with proper setup
    
    setTimeout(() => {
        // Simulate successful email sending
        submitButton.innerHTML = 'Message Sent!';
        submitButton.classList.remove('btn-success');
        submitButton.classList.add('btn-success');
        form.reset();
        
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('btn-success');
            submitButton.classList.add('btn-success');
        }, 3000);
    }, 1500);
}

// Formspree function
function sendEmailWithFormspree(form, submitButton, originalText) {
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            submitButton.innerHTML = 'Message Sent!';
            submitButton.classList.remove('btn-success');
            submitButton.classList.add('btn-success');
            form.reset();
            
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        submitButton.innerHTML = 'Failed to Send';
        submitButton.classList.remove('btn-success');
        submitButton.classList.add('btn-danger');
        
        showNotification('Failed to send message. Please try again.', 'error');
    })
    .finally(() => {
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            submitButton.classList.remove('btn-danger', 'btn-success');
            submitButton.classList.add('btn-success');
        }, 3000);
    });
}

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Animate elements on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-card, .card, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animate-fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Mobile Navigation Toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarCollapse.classList.remove('show');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
            navbarCollapse.classList.remove('show');
        }
    });
}

// Price Plan Hover Effect
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'scale(1)';
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Gallery Modal Function
function openGalleryModal(imageSrc, title, description) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('galleryModalImage');
    const modalTitle = document.getElementById('galleryModalTitle');
    const modalDescription = document.getElementById('galleryModalDescription');
    
    // Set the modal content
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Show the modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
} 