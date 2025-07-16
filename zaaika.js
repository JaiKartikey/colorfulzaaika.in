
// Modern JavaScript for Zaaika Recipe Pages

// Recipe data for search functionality
const recipeSearchData = [
    { name: 'Paneer Tikka', category: 'vegetarian', page: 'veg.html', id: 'paneer-tikka' },
    { name: 'Besan Ki Sabji', category: 'vegetarian', page: 'veg.html', id: 'besan-sabji' },
    { name: 'Tehri', category: 'vegetarian', page: 'veg.html', id: 'tehri' },
    { name: 'Dal Pitthi', category: 'vegetarian', page: 'veg.html', id: 'dal-pitthi' },
    { name: 'Litti Chokha', category: 'vegetarian', page: 'veg.html', id: 'litti-chokha' },
    
    { name: 'Gur ka Thekua', category: 'sweets', page: 'sweets.html', id: 'gur-thekua' },
    { name: 'Rasgulla', category: 'sweets', page: 'sweets.html', id: 'rasgulla' },
    { name: 'Gulab Jamun', category: 'sweets', page: 'sweets.html', id: 'gulab-jamun' },

    { name: 'Chicken Curry', category: 'nonveg', page: 'nonveg.html', id: 'chicken-curry' },
    { name: 'Mutton Biryani', category: 'nonveg', page: 'nonveg.html', id: 'mutton-biryani' }
];

// DOM Elements
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const navbar = document.getElementById('navbar');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Slider elements
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

// Initialize all features
function initializeAll() {
    initializeCursor();
    initializeNavbar();
    initializeSearch();
    initializeSlider();
    initializeAnimations();
    initializeScrollEffects();
    initializeInteractions();
    initializeMobileMenu();
    initializeIngredientCheckboxes();
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
        const interactiveElements = document.querySelectorAll('a, button, .recipe-card, .btn, .indicator');
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
        searchInput.addEventListener('input', handleRecipeSearch);
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

function handleRecipeSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        searchResults.style.display = 'none';
        return;
    }
    
    const filteredResults = recipeSearchData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    
    displayRecipeSearchResults(filteredResults);
}

function displayRecipeSearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No recipes found</div>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-${getCategoryIcon(result.category)}"></i>
                    <div>
                        <div style="font-weight: 500;">${result.name}</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: capitalize;">${result.category}</div>
                    </div>
                </div>
            `;
            
            resultItem.addEventListener('click', () => {
                if (result.page === window.location.pathname.split('/').pop()) {
                    // Same page, scroll to recipe
                    scrollToRecipe(result.id);
                } else {
                    // Different page, navigate
                    window.location.href = result.page + '#' + result.id;
                }
                searchResults.style.display = 'none';
                searchInput.value = '';
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
    return icons[category] || 'utensils';
}

// Recipe Slider
function initializeSlider() {
    if (!slides.length) return;
    
    // Show first slide
    showSlide(0);
    
    // Add event listeners to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(currentSlide);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            showSlide(currentSlide);
        });
    }
    
    // Add event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance slider
    setInterval(() => {
        currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    }, 6000);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(currentSlide);
        } else if (e.key === 'ArrowRight') {
            currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            showSlide(currentSlide);
        }
    });
}

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// Scroll to specific recipe
function scrollToRecipe(recipeId) {
    const recipeElement = document.getElementById(recipeId);
    if (recipeElement) {
        const offsetTop = recipeElement.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Highlight the recipe briefly
        recipeElement.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.5)';
        setTimeout(() => {
            recipeElement.style.boxShadow = '';
        }, 2000);
    }
}

// Make scrollToRecipe available globally
window.scrollToRecipe = scrollToRecipe;

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
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.recipe-detail-card, .related-card, .section-title');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
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
        
        // Progress indicator for recipe reading
        const recipeCards = document.querySelectorAll('.recipe-detail-card');
        recipeCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
                card.style.setProperty('--reading-progress', progress);
            }
        });
    });
}

// Interactive Elements
function initializeInteractions() {
    // Recipe card hover effects
    const recipeCards = document.querySelectorAll('.recipe-detail-card');
    recipeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = 'var(--shadow-xl)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
    });

    // Action button interactions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.querySelector('i').classList.contains('fa-bookmark') ? 'bookmark' :
                          this.querySelector('i').classList.contains('fa-share') ? 'share' : 'print';
            
            handleRecipeAction(action, this);
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

// Handle recipe actions (bookmark, share, print)
function handleRecipeAction(action, button) {
    const recipeCard = button.closest('.recipe-detail-card');
    const recipeTitle = recipeCard.querySelector('.recipe-title').textContent;
    
    switch (action) {
        case 'bookmark':
            toggleBookmark(recipeTitle, button);
            break;
        case 'share':
            shareRecipe(recipeTitle);
            break;
        case 'print':
            printRecipe(recipeCard);
            break;
    }
}

function toggleBookmark(recipeTitle, button) {
    const isBookmarked = button.classList.contains('bookmarked');
    
    if (isBookmarked) {
        button.classList.remove('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark"></i> Save';
        showNotification('Recipe removed from bookmarks', 'info');
    } else {
        button.classList.add('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark" style="color: var(--gold-primary);"></i> Saved';
        showNotification('Recipe saved to bookmarks!', 'success');
    }
    
    // Store in localStorage
    const bookmarks = JSON.parse(localStorage.getItem('recipeBookmarks') || '[]');
    if (isBookmarked) {
        const index = bookmarks.indexOf(recipeTitle);
        if (index > -1) bookmarks.splice(index, 1);
    } else {
        bookmarks.push(recipeTitle);
    }
    localStorage.setItem('recipeBookmarks', JSON.stringify(bookmarks));
}

function shareRecipe(recipeTitle) {
    if (navigator.share) {
        navigator.share({
            title: recipeTitle + ' - Colorful Zaaika',
            text: 'Check out this amazing recipe!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Recipe link copied to clipboard!', 'success');
        });
    }
}

function printRecipe(recipeCard) {
    const printContent = recipeCard.cloneNode(true);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Recipe - Colorful Zaaika</title>
            <style>
                body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; }
                .recipe-detail-content { display: block; }
                .recipe-image { display: none; }
                .recipe-actions { display: none; }
                h1, h2, h3 { color: #d4af37; }
                .ingredients-list, .instructions-list { padding-left: 20px; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            ${printContent.innerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Initialize ingredient checkboxes
function initializeIngredientCheckboxes() {
    const checkboxes = document.querySelectorAll('.ingredients-list input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const listItem = this.closest('li');
            if (this.checked) {
                listItem.style.opacity = '0.6';
                listItem.style.textDecoration = 'line-through';
            } else {
                listItem.style.opacity = '1';
                listItem.style.textDecoration = 'none';
            }
            
            // Save checkbox state
            const recipeId = this.closest('.recipe-detail-card').id;
            const ingredientText = listItem.textContent.trim();
            saveIngredientState(recipeId, ingredientText, this.checked);
        });
        
        // Restore checkbox state
        const recipeId = checkbox.closest('.recipe-detail-card').id;
        const ingredientText = checkbox.closest('li').textContent.trim();
        const isChecked = getIngredientState(recipeId, ingredientText);
        if (isChecked) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change'));
        }
    });
}

function saveIngredientState(recipeId, ingredient, checked) {
    const key = `ingredient_${recipeId}_${ingredient.replace(/\s+/g, '_')}`;
    localStorage.setItem(key, checked);
}

function getIngredientState(recipeId, ingredient) {
    const key = `ingredient_${recipeId}_${ingredient.replace(/\s+/g, '_')}`;
    return localStorage.getItem(key) === 'true';
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

// Recipe rating system
function initializeRating() {
    const ratingContainers = document.querySelectorAll('.recipe-rating');
    
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.fas.fa-star, .far.fa-star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const rating = index + 1;
                updateRating(container, rating);
                showNotification(`Rated ${rating} stars!`, 'success');
            });
        });
    });
}

function updateRating(container, rating) {
    const stars = container.querySelectorAll('.fas.fa-star, .far.fa-star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.className = 'fas fa-star';
        } else {
            star.className = 'far fa-star';
        }
    });
}

// Load bookmarked recipes on page load
function loadBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('recipeBookmarks') || '[]');
    const bookmarkButtons = document.querySelectorAll('.action-btn');
    
    bookmarkButtons.forEach(button => {
        if (button.querySelector('.fa-bookmark')) {
            const recipeTitle = button.closest('.recipe-detail-card').querySelector('.recipe-title').textContent;
            if (bookmarks.includes(recipeTitle)) {
                button.classList.add('bookmarked');
                button.innerHTML = '<i class="fas fa-bookmark" style="color: var(--gold-primary);"></i> Saved';
            }
        }
    });
}

// Enhanced scroll animations
function enhanceScrollAnimations() {
    const elements = document.querySelectorAll('.recipe-detail-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.2 });
    
    elements.forEach(el => observer.observe(el));
}

// Add CSS for additional animations
const additionalStyles = `
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(3px, 3px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -4px);
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
        gap: 0.5rem;
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
    
    .recipe-detail-card {
        position: relative;
        overflow: hidden;
    }
    
    .recipe-detail-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: var(--gradient-gold);
        transition: left 0.3s ease;
        z-index: 1;
    }
    
    .recipe-detail-card:hover::before {
        left: 0;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    loadBookmarks();
    initializeRating();
    enhanceScrollAnimations();
});

// Handle hash navigation for direct recipe links
window.addEventListener('load', () => {
    if (window.location.hash) {
        const recipeId = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToRecipe(recipeId);
        }, 500);
    }
});
