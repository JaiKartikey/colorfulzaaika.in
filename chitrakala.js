// Custom cursor functionality
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .artwork-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
        
        // Hide cursor on touch devices
        document.addEventListener('touchstart', () => {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        });
    }
});

// Gallery lightbox functionality
function initGallery() {
    const artworkCards = document.querySelectorAll('.artwork-card');
    
    artworkCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            showLightbox(img.src, title, description);
        });
    });
}

// Create and show lightbox
function showLightbox(imgSrc, title, description) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${imgSrc}" alt="${title}">
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close lightbox functionality
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        lightbox.querySelector('.lightbox-content').style.transform = 'scale(1)';
    }, 10);
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.style.opacity = '0';
        lightbox.querySelector('.lightbox-content').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    
    // Hero animations
    gsap.from(".page-title", {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
    });
    
    gsap.from(".page-subtitle", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        delay: 0.6
    });
    
    gsap.from(".hero-image", {
        duration: 1.5,
        x: 100,
        opacity: 0,
        ease: "power3.out",
        delay: 0.4
    });
    
    // Navbar animation
    gsap.from(".navbar", {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: "power2.out"
    });
    
    // Gradient orbs animation
    gsap.from(".gradient-orb", {
        duration: 2,
        scale: 0,
        opacity: 0,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.2,
        delay: 0.5
    });
    
    // Artwork cards animation
    gsap.from(".artwork-card", {
        scrollTrigger: {
            trigger: ".artwork-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        duration: 0.8,
        y: 80,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // Section titles animation
    gsap.from(".section-title", {
        scrollTrigger: {
            trigger: ".section-title",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out"
    });
    
    // Close lightbox on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax effect for gradient orbs
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Enhanced hover effects
document.addEventListener('DOMContentLoaded', function() {
    const artworkCards = document.querySelectorAll('.artwork-card');
    
    artworkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -15,
                scale: 1.02,
                ease: "power2.out"
            });
            
            gsap.to(this.querySelector('img'), {
                duration: 0.5,
                scale: 1.1,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: "power2.out"
            });
            
            gsap.to(this.querySelector('img'), {
                duration: 0.5,
                scale: 1,
                ease: "power2.out"
            });
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});