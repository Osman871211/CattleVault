/* ==========================================================================
   Cow Business E-commerce - Cart & Wishlist Handler (cart.js)
   LocalStorage State Management, Cart Calculations & Toast Notifications
   ========================================================================== */

const CART_KEY = 'cattle_cart';
const WISHLIST_KEY = 'cattle_wishlist';

// Get Cart from LocalStorage
function getCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

// Save Cart to LocalStorage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadges();
}

// Add Item to Cart
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        const product = getProductById(productId);
        if (product) {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                breed: product.breed,
                quantity: quantity
            });
        }
    }

    saveCart(cart);
    showToast('Cattle added to cart successfully!', 'success');
}

// Update Item Quantity
function updateCartQuantity(productId, quantity) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity = parseInt(quantity, 10);
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        saveCart(cart);
    }
}

// Remove Item from Cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showToast('Item removed from cart', 'info');
}

// Clear Entire Cart
function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartBadges();
}

// Wishlist Logic
function getWishlist() {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
}

function toggleWishlist(productId) {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    let added = false;

    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from Wishlist', 'info');
    } else {
        wishlist.push(productId);
        added = true;
        showToast('Added to Wishlist!', 'success');
    }

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    updateWishlistBadges();
    return added;
}

// Update UI Badge Counters
function updateCartBadges() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = totalCount;
        badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });
}

function updateWishlistBadges() {
    const wishlist = getWishlist();
    const badges = document.querySelectorAll('.wishlist-badge');
    badges.forEach(badge => {
        badge.textContent = wishlist.length;
        badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });
}

// Toast Notification Engine
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// Auto Initialize Badges on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadges();
    updateWishlistBadges();
});
