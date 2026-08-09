/* ==========================================================================
   Cow Business E-commerce - Main Script (script.js)
   UI Interactions, Search, Filters, Dark Mode & Page Rendering
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileNav();
    initScrollToTop();
    initNavbarSearch();
    initFAQAccordion();
    
    // Page specific initializers based on present DOM elements
    if (document.getElementById('featured-products-container')) {
        renderFeaturedProducts();
    }

    if (document.getElementById('catalog-products-container')) {
        initCatalogPage();
    }

    if (document.getElementById('cow-details-container')) {
        initDetailPage();
    }

    if (document.getElementById('cart-items-container')) {
        renderCartPage();
    }

    if (document.getElementById('checkout-form')) {
        initCheckoutPage();
    }

    if (document.getElementById('contact-form')) {
        initFormValidation('contact-form', 'Message sent successfully! Our farm expert will call you shortly.');
    }

    if (document.getElementById('login-form')) {
        initFormValidation('login-form', 'Login successful! Redirecting...');
    }

    if (document.getElementById('register-form')) {
        initFormValidation('register-form', 'Registration successful! You can now login.');
    }
});

/* --- Dark Mode Toggle --- */
function initDarkMode() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('cattle_theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeBtn) themeBtn.innerHTML = getSunIcon();
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('cattle_theme', newTheme);
            themeBtn.innerHTML = newTheme === 'dark' ? getSunIcon() : getMoonIcon();
            showToast(`Switched to ${newTheme} mode`, 'info');
        });
    }
}

function getMoonIcon() {
    return `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
}

function getSunIcon() {
    return `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
}

/* --- Mobile Navigation --- */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

/* --- Scroll To Top --- */
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('active');
        } else {
            scrollBtn.classList.remove('active');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --- Search & Auto Suggestions --- */
function initNavbarSearch() {
    const searchInput = document.getElementById('nav-search-input');
    const suggestionsBox = document.getElementById('search-suggestions');

    if (!searchInput || !suggestionsBox) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            suggestionsBox.classList.remove('active');
            return;
        }

        const matches = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.breed.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
            suggestionsBox.innerHTML = matches.map(p => `
                <div class="suggestion-item" onclick="window.location.href='cow-details.html?id=${p.id}'">
                    <div>
                        <strong style="font-size:0.9rem">${p.name}</strong>
                        <span style="display:block; font-size:0.75rem; color:var(--text-muted)">${p.breed} • $${p.price}</span>
                    </div>
                    <span class="badge badge-success">${p.healthStatus}</span>
                </div>
            `).join('');
            suggestionsBox.classList.add('active');
        } else {
            suggestionsBox.innerHTML = `<div class="suggestion-item" style="color:var(--text-muted)">No cattle found matching "${query}"</div>`;
            suggestionsBox.classList.add('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.classList.remove('active');
        }
    });
}

/* --- Product Card Template --- */
function createProductCardHTML(p) {
    const wishlist = getWishlist();
    const isWishlisted = wishlist.includes(p.id);

    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                <span class="badge badge-success product-badge">${p.healthStatus}</span>
                <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${p.id}'); this.classList.toggle('active');">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>
            <div class="product-content">
                <div class="product-header">
                    <h3 class="product-title">${p.name}</h3>
                </div>
                <div class="product-breed">${p.breed} • ${p.category.toUpperCase()}</div>
                
                <div class="product-specs">
                    <span><strong>Age:</strong> ${p.age}</span>
                    <span><strong>Weight:</strong> ${p.weight}</span>
                </div>

                <div class="product-seller">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                    <span>${p.location}</span>
                </div>

                <div class="product-footer">
                    <div class="product-price">$${p.price.toLocaleString()}</div>
                    <div class="product-actions">
                        <a href="cow-details.html?id=${p.id}" class="btn btn-secondary btn-sm">Details</a>
                        <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/* --- Featured Products Loader --- */
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products-container');
    const featured = getFeaturedProducts();
    container.innerHTML = featured.map(createProductCardHTML).join('');
}

/* --- Catalog Page Filter & Search Logic --- */
function initCatalogPage() {
    const container = document.getElementById('catalog-products-container');
    const categoryFilter = document.getElementById('filter-category');
    const breedFilter = document.getElementById('filter-breed');
    const priceFilter = document.getElementById('filter-price');
    const priceLabel = document.getElementById('price-value-label');
    const sortFilter = document.getElementById('filter-sort');

    function applyFilters() {
        let list = [...products];

        // Search Param in URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlCat = urlParams.get('category');
        if (urlCat && categoryFilter) {
            categoryFilter.value = urlCat;
        }

        if (categoryFilter && categoryFilter.value !== 'all') {
            list = list.filter(p => p.category === categoryFilter.value);
        }

        if (breedFilter && breedFilter.value !== 'all') {
            list = list.filter(p => p.breed === breedFilter.value);
        }

        if (priceFilter) {
            const maxPrice = parseInt(priceFilter.value, 10);
            if (priceLabel) priceLabel.textContent = `$${maxPrice.toLocaleString()}`;
            list = list.filter(p => p.price <= maxPrice);
        }

        if (sortFilter) {
            if (sortFilter.value === 'low-high') {
                list.sort((a, b) => a.price - b.price);
            } else if (sortFilter.value === 'high-low') {
                list.sort((a, b) => b.price - a.price);
            } else if (sortFilter.value === 'rating') {
                list.sort((a, b) => b.rating - a.rating);
            }
        }

        if (list.length === 0) {
            container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 4rem 1rem;">
                <h3>No cattle match your selected filter.</h3>
                <p style="color:var(--text-muted); margin-top:0.5rem">Try adjusting your price range or category filters.</p>
            </div>`;
        } else {
            container.innerHTML = list.map(createProductCardHTML).join('');
        }
    }

    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (breedFilter) breedFilter.addEventListener('change', applyFilters);
    if (priceFilter) priceFilter.addEventListener('input', applyFilters);
    if (sortFilter) sortFilter.addEventListener('change', applyFilters);

    applyFilters();
}

/* --- Details Page Initializer --- */
function initDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || 'cow-001';
    const product = getProductById(id) || products[0];

    const container = document.getElementById('cow-details-container');
    if (!container) return;

    container.innerHTML = `
        <div class="detail-grid">
            <div class="detail-gallery">
                <div class="main-image">
                    <img id="detail-main-img" src="${product.image}" alt="${product.name}">
                </div>
                <div class="gallery-thumbs">
                    ${product.gallery.map((img, idx) => `
                        <div class="thumb-img ${idx === 0 ? 'active' : ''}" onclick="changeDetailImg(this, '${img}')">
                            <img src="${img}" alt="Thumbnail">
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="detail-info">
                <span class="badge badge-success">${product.healthStatus}</span>
                <h1 style="margin-top:0.5rem">${product.name}</h1>
                <p style="color:var(--text-muted)">Breed: <strong>${product.breed}</strong> | Category: <strong>${product.category.toUpperCase()}</strong></p>

                <div class="detail-price">$${product.price.toLocaleString()}</div>
                <p>${product.description}</p>

                <table class="specs-table">
                    <tr><td>Age:</td><td>${product.age}</td></tr>
                    <tr><td>Body Weight:</td><td>${product.weight}</td></tr>
                    <tr><td>Milk Yield:</td><td>${product.milkYield}</td></tr>
                    <tr><td>Seller Name:</td><td>${product.sellerName}</td></tr>
                    <tr><td>Farm Location:</td><td>${product.location}</td></tr>
                    <tr><td>Vet Inspection:</td><td>Verified & Certified by DLS</td></tr>
                </table>

                <div style="display:flex; gap:1rem; margin-top:2rem">
                    <button class="btn btn-primary" onclick="addToCart('${product.id}')">Add to Cart</button>
                    <a href="checkout.html" class="btn btn-accent" onclick="addToCart('${product.id}', 1)">Buy Now</a>
                    <button class="btn btn-secondary" onclick="toggleWishlist('${product.id}')">♥ Wishlist</button>
                </div>
            </div>
        </div>
    `;
}

function changeDetailImg(thumbEl, imgSrc) {
    document.getElementById('detail-main-img').src = imgSrc;
    document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
}

/* --- Cart Page Render --- */
function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const cart = getCart();

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 4rem 1rem;">
                <h3>Your cattle cart is empty.</h3>
                <p style="color:var(--text-muted); margin: 0.5rem 0 1.5rem">Explore our marketplace to find healthy livestock.</p>
                <a href="cows.html" class="btn btn-primary">Browse Cattle</a>
            </div>
        `;
        if (subtotalEl) subtotalEl.textContent = "$0";
        if (totalEl) totalEl.textContent = "$0";
        return;
    }

    let subtotal = 0;
    container.innerHTML = `
        <div class="cart-table-wrapper">
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Cattle</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => {
                        const itemTotal = item.price * item.quantity;
                        subtotal += itemTotal;
                        return `
                            <tr>
                                <td style="display:flex; align-items:center; gap:1rem">
                                    <img src="${item.image}" width="60" height="60" style="border-radius:6px; object-fit:cover;">
                                    <div>
                                        <strong>${item.name}</strong>
                                        <div style="font-size:0.8rem; color:var(--text-muted)">${item.breed}</div>
                                    </div>
                                </td>
                                <td>$${item.price.toLocaleString()}</td>
                                <td>
                                    <div class="quantity-control">
                                        <button class="quantity-btn" onclick="changeQty('${item.id}', ${item.quantity - 1})">-</button>
                                        <input class="quantity-input" value="${item.quantity}" readonly>
                                        <button class="quantity-btn" onclick="changeQty('${item.id}', ${item.quantity + 1})">+</button>
                                    </div>
                                </td>
                                <td>$${itemTotal.toLocaleString()}</td>
                                <td>
                                    <button class="btn btn-sm btn-secondary" style="color:var(--danger-color); border-color:var(--danger-color)" onclick="removeFromCart('${item.id}'); renderCartPage();">Remove</button>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `$${(subtotal + 50).toLocaleString()}`; // Includes livestock transport
}

function changeQty(id, newQty) {
    if (newQty < 1) {
        removeFromCart(id);
    } else {
        updateCartQuantity(id, newQty);
    }
    renderCartPage();
}

/* --- Checkout Page Handler --- */
function initCheckoutPage() {
    const summaryContainer = document.getElementById('checkout-items-summary');
    const totalEl = document.getElementById('checkout-total-val');
    const cart = getCart();

    if (summaryContainer && cart.length > 0) {
        let total = 0;
        summaryContainer.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="summary-row">
                    <span>${item.name} (x${item.quantity})</span>
                    <strong>$${itemTotal.toLocaleString()}</strong>
                </div>
            `;
        }).join('');
        
        if (totalEl) totalEl.textContent = `$${(total + 50).toLocaleString()}`;
    }

    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Order placed successfully! Transaction ID: CT-982341. Our livestock transport logistics manager will contact you within 2 hours.');
            clearCart();
            window.location.href = 'index.html';
        });
    }
}

/* --- Accordions --- */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                faqItems.forEach(other => {
                    if (other !== item) other.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });
}

/* --- Form Validation Helper --- */
function initFormValidation(formId, successMsg) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast(successMsg, 'success');
        form.reset();
    });
}
