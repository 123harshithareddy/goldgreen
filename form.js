/**
 * Form handling JavaScript for Green Gold website
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // Form validation
            if (!validateForm(formData)) {
                return;
            }
            
            // Simulating form submission (in a real application, you would send this to a server)
            console.log('Form submitted:', formData);
            
            // Show success message
            formSuccess.classList.add('active');
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after some time
            setTimeout(() => {
                formSuccess.classList.remove('active');
            }, 5000);
        });
    }
    
    // Form validation function
    function validateForm(formData) {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,12}$/;
        
        // Validate name
        if (formData.name.trim() === '') {
            showError('name', 'Please enter your name');
            isValid = false;
        } else {
            removeError('name');
        }
        
        // Validate email
        if (!emailRegex.test(formData.email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError('email');
        }
        
        // Validate phone
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        } else {
            removeError('phone');
        }
        
        // Validate message
        if (formData.message.trim() === '') {
            showError('message', 'Please enter your message');
            isValid = false;
        } else {
            removeError('message');
        }
        
        return isValid;
    }
    
    // Show error message
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = field.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#ff0000';
            errorDiv.style.fontSize = '0.8rem';
            errorDiv.style.marginTop = '5px';
            errorDiv.textContent = message;
            
            field.parentElement.appendChild(errorDiv);
        } else {
            errorElement.textContent = message;
        }
        
        field.style.borderColor = '#ff0000';
    }
    
    // Remove error message
    function removeError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = field.parentElement.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        field.style.borderColor = '';
    }
    
    // Real-time validation
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    message: document.getElementById('message').value
                };
                
                validateForm(formData);
            });
        });
    }
});