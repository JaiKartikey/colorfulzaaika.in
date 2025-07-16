
// Modern JavaScript for Enhanced User Experience

// Search data
const searchData = [
    { name: 'Paneer Tikka', category: 'vegetarian', url: 'veg.html' },
    { name: 'Besan Ki Sabji', category: 'vegetarian', url: 'veg.html' },
    { name: 'Tehri', category: 'vegetarian', url: 'veg.html' },
    { name: 'Dal Pitthi', category: 'vegetarian', url: 'veg.html' },
    { name: 'Litti Chokha', category: 'vegetarian', url: 'veg.html' },
    { name: 'Gur ka Thekua', category: 'sweets', url: 'sweets.html' },
    { name: 'Rasgulla', category: 'sweets', url: 'sweets.html' },
    { name: 'Gulab Jamun', category: 'sweets', url: 'sweets.html' },
    { name: 'Chicken Curry', category: 'nonveg', url: 'nonveg.html' },
    { name: 'Mutton Biryani', category: 'nonveg', url: 'nonveg.html' },
    { name: 'Watercolor Paintings', category: 'art', url: 'watercolor.html' },
    { name: 'Pencil Sketches', category: 'art', url: 'pencil.html' },
    { name: 'Landscape Painting', category: 'art', url: 'watercolor.html' }
];

// DOM Elements
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const navbar = document.getElementById('navbar');
const loadingScreen = document.getElementById('loading-screen');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    showLoadingScreen();
    setTimeout(() => {
        hideLoadingScreen();
        initializeAll();
    }, 2500);
});

// Loading Screen
function showLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
}

function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Initialize all features
function initializeAll() {
    initializeCursor();
    initializeNavbar();
    initializeSearch();
    initializeAnimations();
    initializeScrollEffects();
    initializeInteractions();
    initializeMobileMenu();
    initializeParticles();
}

// Custom Cursor
function initializeCursor() {
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            
            if (cursor && cursorFollower) {
                cursor.style.left = x + 'px';
                cursor.style.top = y + 'px';
                
                setTimeout(() => {
                    cursorFollower.style.left = x + 'px';
                    cursorFollower.style.top = y + 'px';
                }, 50);
            }
        });

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .collection-card, .btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursor && cursorFollower) {
                    cursor.style.transform = 'scale(1.5)';
                    cursorFollower.style.transform = 'scale(1.5)';
                }
            });
            
            el.addEventListener('mouseleave', () => {
                if (cursor && cursorFollower) {
                    cursor.style.transform = 'scale(1)';
                    cursorFollower.style.transform = 'scale(1)';
                }
            });
        });
    }
}

// Navbar functionality
function initializeNavbar() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (navbar) {
            if (scrolled > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Search functionality
function initializeSearch() {
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                searchResults.style.display = 'block';
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-search')) {
                searchResults.style.display = 'none';
            }
        });
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        searchResults.style.display = 'none';
        return;
    }
    
    const filteredResults = searchData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    
    displaySearchResults(filteredResults);
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-${getCategoryIcon(result.category)}"></i>
                    <div>
                        <div style="font-weight: 500;">${result.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: capitalize;">${result.category}</div>
                    </div>
                </div>
            `;
            
            resultItem.addEventListener('click', () => {
                window.location.href = result.url;
            });
            
            searchResults.appendChild(resultItem);
        });
    }
    
    searchResults.style.display = 'block';
}

function getCategoryIcon(category) {
    const icons = {
        'vegetarian': 'leaf',
        'sweets': 'candy-cane',
        'nonveg': 'drumstick-bite',
        'art': 'palette'
    };
    return icons[category] || 'circle';
}

// Scroll Effects and Parallax
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Parallax effect for hero background
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax for floating elements
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.2);
            icon.style.transform = `translateY(${scrolled * speed * -0.1}px)`;
        });
    });
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.collection-card, .featured-content, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
    
    // Staggered animation for collection cards
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Interactive Elements
function initializeInteractions() {
    // Collection card interactions
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            
            const overlay = this.querySelector('.card-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const overlay = this.querySelector('.card-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });

    // Button interactions with ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            if (email) {
                showNotification('Thank you for subscribing!', 'success');
                this.querySelector('.newsletter-input').value = '';
            }
        });
    }
}

// Ripple effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Mobile Menu
function initializeMobileMenu() {
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = navLinks.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
}

// Particle effect
function initializeParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createFloatingParticle(heroParticles);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1})`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${Math.random() * 6 + 4}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--gradient-gold)' : 'var(--secondary-dark)'};
        color: ${type === 'success' ? 'var(--primary-dark)' : 'var(--text-primary)'};
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10001;
        font-weight: 500;
        box-shadow: var(--shadow-lg);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.style.opacity = '0';
                    img.onload = () => {
                        img.style.transition = 'opacity 0.3s ease';
                        img.style.opacity = '1';
                    };
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.src && !img.complete) {
            imageObserver.observe(img);
        }
    });
}

// Add CSS for additional animations and effects
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .nav-links.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(10, 10, 10, 0.98);
        flex-direction: column;
        padding: 1rem;
        backdrop-filter: blur(20px);
        border-top: 1px solid rgba(212, 175, 55, 0.2);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .animate-in {
        animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize image optimization
document.addEventListener('DOMContentLoaded', optimizeImages);

// Add scroll-triggered animations for enhanced UX
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Fade elements based on scroll position
    const fadeElements = document.querySelectorAll('.hero-stats, .scroll-indicator');
    fadeElements.forEach(el => {
        const elementTop = el.offsetTop;
        const elementHeight = el.offsetHeight;
        const fadeStart = elementTop - windowHeight;
        const fadeEnd = elementTop + elementHeight;
        
        if (scrolled >= fadeStart && scrolled <= fadeEnd) {
            const progress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
            el.style.opacity = Math.max(0, 1 - progress);
        }
    });
});
// </lov-write>

