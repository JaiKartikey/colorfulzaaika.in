
// Watercolor Gallery JavaScript

// Gallery data
const artworkData = [
    { id: 1, title: 'Serene Landscape', category: 'landscape', image: 'paint3.jpg', year: '2024', size: '24" x 18"' },
    { id: 2, title: 'Nature\'s Symphony', category: 'nature', image: 'watercolor-1c.jpeg', year: '2024', size: '16" x 20"' },
    { id: 3, title: 'Color Flow', category: 'abstract', image: 'abstract-watercolor.jpg', year: '2023', size: '12" x 16"' },
    { id: 4, title: 'Mountain Mist', category: 'landscape', image: 'mountain-watercolor.jpg', year: '2024', size: '20" x 24"' },
    { id: 5, title: 'Blooming Dreams', category: 'nature', image: 'floral-watercolor.jpg', year: '2023', size: '14" x 18"' },
    { id: 6, title: 'Gentle Soul', category: 'portrait', image: 'portrait-watercolor.jpg', year: '2024', size: '16" x 20"' }
];

// DOM Elements
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const navbar = document.getElementById('navbar');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxClose = document.querySelector('.lightbox-close');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

// Initialize all features
function initializeAll() {
    initializeCursor();
    initializeNavbar();
    initializeSearch();
    initializeGalleryFilter();
    initializeLightbox();
    initializeAnimations();
    initializeScrollEffects();
    initializeInteractions();
    initializeMobileMenu();
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
        const interactiveElements = document.querySelectorAll('a, button, .artwork-card, .filter-btn');
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
        searchInput.addEventListener('input', handleArtworkSearch);
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

function handleArtworkSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        searchResults.style.display = 'none';
        return;
    }
    
    const filteredResults = artworkData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    
    displayArtworkSearchResults(filteredResults);
}

function displayArtworkSearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No artworks found</div>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-palette"></i>
                    <div>
                        <div style="font-weight: 500;">${result.title}</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: capitalize;">${result.category} • ${result.year}</div>
                    </div>
                </div>
            `;
            
            resultItem.addEventListener('click', () => {
                viewArtwork(result.image, result.title);
                searchResults.style.display = 'none';
                searchInput.value = '';
            });
            
            searchResults.appendChild(resultItem);
        });
    }
    
    searchResults.style.display = 'block';
}

// Gallery Filter
function initializeGalleryFilter() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            filterGalleryItems(filter);
        });
    });
}

function filterGalleryItems(filter) {
    galleryItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Lightbox functionality
function initializeLightbox() {
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
}

function viewArtwork(imageSrc, title) {
    if (lightbox && lightboxImage && lightboxTitle) {
        lightboxImage.src = imageSrc;
        lightboxTitle.textContent = title;
        lightbox.style.display = 'flex';
        lightbox.style.opacity = '0';
        
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            // Restore body scroll
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Make viewArtwork available globally
window.viewArtwork = viewArtwork;

// Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.gallery-item, .artist-content, .section-title');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for hero image
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(-50%) scale(${1 + scrolled * 0.0002})`;
        }
        
        // Parallax for gallery items
        // const galleryItemElements = document.querySelectorAll('.gallery-item');
        // galleryItemElements.forEach((item, index) => {
        //     const speed = 0.1 + (index % 3) * 0.05;
        //     const yPos = scrolled * speed * -0.5;
        //     item.style.transform = `translateY(${yPos}px)`;
        // });
    });
}

// Interactive Elements
function initializeInteractions() {
    // Artwork card hover effects
    const artworkCards = document.querySelectorAll('.artwork-card');
    artworkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            const overlay = this.querySelector('.artwork-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const overlay = this.querySelector('.artwork-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });

    // Action button interactions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.querySelector('i').classList.contains('fa-heart') ? 'like' :
                          this.querySelector('i').classList.contains('fa-share') ? 'share' : 'view';
            
            handleArtworkAction(action, this);
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
}

// Handle artwork actions (like, share, view)
function handleArtworkAction(action, button) {
    const artworkCard = button.closest('.artwork-card');
    const artworkTitle = artworkCard.querySelector('.artwork-title').textContent;
    
    switch (action) {
        case 'like':
            toggleLike(artworkTitle, button);
            break;
        case 'share':
            shareArtwork(artworkTitle);
            break;
        case 'view':
            const artworkImage = artworkCard.querySelector('.artwork-image').src;
            viewArtwork(artworkImage, artworkTitle);
            break;
    }
}

function toggleLike(artworkTitle, button) {
    const isLiked = button.classList.contains('liked');
    
    if (isLiked) {
        button.classList.remove('liked');
        button.querySelector('i').style.color = '';
        showNotification('Removed from favorites', 'info');
    } else {
        button.classList.add('liked');
        button.querySelector('i').style.color = 'var(--gold-primary)';
        showNotification('Added to favorites!', 'success');
        
        // Heart animation
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Store in localStorage
    const favorites = JSON.parse(localStorage.getItem('artworkFavorites') || '[]');
    if (isLiked) {
        const index = favorites.indexOf(artworkTitle);
        if (index > -1) favorites.splice(index, 1);
    } else {
        favorites.push(artworkTitle);
    }
    localStorage.setItem('artworkFavorites', JSON.stringify(favorites));
}

function shareArtwork(artworkTitle) {
    if (navigator.share) {
        navigator.share({
            title: artworkTitle + ' - Colorful Zaaika Gallery',
            text: 'Check out this beautiful artwork!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Artwork link copied to clipboard!', 'success');
        });
    }
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

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--gradient-gold)' : 'var(--secondary-dark)'};
        color: ${type === 'success' ? 'var(--primary-dark)' : 'var(--text-primary)'};
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10001;
        font-weight: 500;
        font-size: 0.85rem;
        box-shadow: var(--shadow-lg);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
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

// Load favorites on page load
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('artworkFavorites') || '[]');
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        if (button.querySelector('.fa-heart')) {
            const artworkTitle = button.closest('.artwork-card').querySelector('.artwork-title').textContent;
            if (favorites.includes(artworkTitle)) {
                button.classList.add('liked');
                button.querySelector('i').style.color = 'var(--gold-primary)';
            }
        }
    });
}

// Gallery masonry layout
function initializeMasonryLayout() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;
    
    const resizeObserver = new ResizeObserver(() => {
        // Adjust grid layout based on content
        const items = grid.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
    
    resizeObserver.observe(grid);
}

// Enhanced gallery interactions
function enhanceGalleryInteractions() {
    const galleryItemElements = document.querySelectorAll('.gallery-item');
    
    galleryItemElements.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('.artwork-image');
            const title = this.querySelector('.artwork-title').textContent;
            viewArtwork(img.src, title);
        });
    });
}

// Add CSS for additional styles
const additionalStyles = `
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--space-6);
        margin-top: var(--space-8);
    }
    
    .gallery-item {
        transition: all var(--transition-medium);
    }
    
    .artwork-card {
        position: relative;
        border-radius: var(--radius-xl);
        overflow: hidden;
        box-shadow: var(--shadow-md);
        transition: all var(--transition-medium);
        cursor: pointer;
    }
    
    .artwork-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
        transition: transform var(--transition-slow);
    }
    
    .artwork-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--space-5);
        opacity: 0;
        transition: opacity var(--transition-medium);
    }
    
    .artwork-info h3 {
        color: var(--text-primary);
        font-size: var(--font-xl);
        margin-bottom: var(--space-1);
    }
    
    .artwork-desc {
        color: var(--text-secondary);
        font-size: var(--font-sm);
        margin-bottom: var(--space-3);
    }
    
    .artwork-details {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
        font-size: var(--font-xs);
        color: var(--text-muted);
    }
    
    .artwork-actions {
        display: flex;
        gap: var(--space-2);
        align-self: flex-end;
    }
    
    .gallery-filter {
        display: flex;
        justify-content: center;
        gap: var(--space-3);
        margin-bottom: var(--space-12);
        flex-wrap: wrap;
    }
    
    .filter-btn {
        background: transparent;
        border: 1px solid rgba(212, 175, 55, 0.3);
        color: var(--text-secondary);
        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-lg);
        font-size: var(--font-sm);
        cursor: pointer;
        transition: all var(--transition-medium);
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: var(--gradient-gold);
        color: var(--primary-dark);
        border-color: var(--gold-primary);
    }
    
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    }
    
    .lightbox-img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: var(--text-primary);
        font-size: 2rem;
        cursor: pointer;
        transition: color var(--transition-medium);
    }
    
    .lightbox-close:hover {
        color: var(--gold-primary);
    }
    
    .lightbox-info {
        margin-top: var(--space-4);
    }
    
    .lightbox-info h3 {
        color: var(--text-primary);
        font-size: var(--font-2xl);
        margin-bottom: var(--space-4);
    }
    
    .lightbox-actions {
        display: flex;
        justify-content: center;
        gap: var(--space-3);
    }
    
    .lightbox-btn {
        background: var(--gradient-gold);
        color: var(--primary-dark);
        border: none;
        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-lg);
        font-size: var(--font-sm);
        cursor: pointer;
        transition: all var(--transition-medium);
    }
    
    .lightbox-btn:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-gold);
    }
    
    .artist-section {
        padding: var(--space-16) 0;
        background: var(--secondary-dark);
    }
    
    .artist-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: var(--space-12);
        align-items: center;
    }
    
    .artist-image {
        border-radius: var(--radius-2xl);
        overflow: hidden;
        box-shadow: var(--shadow-lg);
    }
    
    .artist-image img {
        width: 100%;
        height: auto;
        display: block;
    }
    
    .artist-title {
        font-family: 'Playfair Display', serif;
        font-size: var(--font-3xl);
        margin-bottom: var(--space-4);
    }
    
    .artist-description {
        font-size: var(--font-base);
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: var(--space-6);
    }
    
    .artist-stats {
        display: flex;
        gap: var(--space-8);
    }
    
    @media (max-width: 768px) {
        .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: var(--space-4);
        }
        
        .artwork-image {
            height: 200px;
        }
        
        .filter-btn {
            font-size: var(--font-xs);
            padding: var(--space-1) var(--space-3);
        }
        
        .artist-content {
            grid-template-columns: 1fr;
            gap: var(--space-8);
            text-align: center;
        }
        
        .artist-stats {
            justify-content: center;
        }
        
        .lightbox-content {
            max-width: 95%;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    initializeMasonryLayout();
    enhanceGalleryInteractions();
});
