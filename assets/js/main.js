// Smooth scroll animation observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements
    const elementsToAnimate = document.querySelectorAll('.context, .services, .audience, .contact');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Animate service cards individually
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
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
    
    // Parallax effect for hero decoration
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const decoration = document.querySelector('.hero-decoration');
                if (decoration) {
                    const scrolled = window.pageYOffset;
                    decoration.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
});

// Add cursor interaction effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.service-card, .stat-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// Reset card transforms when mouse leaves
document.querySelectorAll('.service-card, .stat-card').forEach(card => {
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Flip Card Interaction
document.addEventListener('DOMContentLoaded', () => {
    const flipCard = document.querySelector('.flip-card');
    
    if (flipCard) {
        // Toggle flip on click (especially for mobile)
        flipCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    }
});
