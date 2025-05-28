/**
 * Main JavaScript file for Green Gold website
 */

// Function to animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add animation classes to elements
function setupAnimations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        if (heading) heading.classList.add('animate-on-scroll');
        
        const paragraphs = section.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            p.classList.add('animate-on-scroll');
            p.style.animationDelay = `${index * 0.1}s`;
        });
        
        const buttons = section.querySelectorAll('.btn');
        buttons.forEach(btn => btn.classList.add('animate-on-scroll'));
        
        if (section.id === 'products') {
            const cards = section.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                card.classList.add('animate-on-scroll');
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }
    });
}

// Header scroll effect
function headerScrollEffect() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Add active class to current section in navigation
function activeNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Add to cart functionality (simplified for demo)
function setupAddToCart() {
    const addToCartButtons = document.querySelectorAll('.btn-product');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product-card');
            const productName = product.querySelector('h3').textContent;
            
            // Change button text temporarily
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = '#789459';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
            
            console.log(`Added ${productName} to cart`);
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupAnimations();
    animateOnScroll();
    headerScrollEffect();
    activeNavigation();
    setupAddToCart();
});