// ============================================
// VINYL STORE - JAVASCRIPT FUNCTIONALITY
// ============================================

// Cart and Wishlist Storage
let cart = [];
let wishlist = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  loadWishlistFromStorage();
  updateCartCount();
  initializeEventListeners();
  initializeBackToTop();
});

// ============================================
// MOBILE MENU
// ============================================
function initializeEventListeners() {
  const bar = document.getElementById('bar');
  const close = document.getElementById('close');
  const navbar = document.getElementById('navbar');
  
  if (bar) {
    bar.addEventListener('click', () => {
      navbar.classList.add('active');
      bar.setAttribute('aria-expanded', 'true');
    });
  }
  
  if (close) {
    close.addEventListener('click', () => {
      navbar.classList.remove('active');
      if (bar) bar.setAttribute('aria-expanded', 'false');
    });
  }
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('#navbar li a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      if (bar) bar.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Initialize cart buttons
  initializeCartButtons();
  
  // Initialize wishlist buttons
  initializeWishlistButtons();
}

// ============================================
// CART FUNCTIONALITY
// ============================================
function initializeCartButtons() {
  const cartButtons = document.querySelectorAll('.cart-btn');
  
  cartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = button.closest('.pro');
      const product = {
        id: productCard.dataset.id,
        title: productCard.dataset.title,
        artist: productCard.dataset.artist,
        price: parseFloat(productCard.dataset.price),
        image: productCard.querySelector('img').src
      };
      
      addToCart(product, button);
    });
  });
}

function addToCart(product, button) {
  // Add loading state
  button.classList.add('btn-loading');
  
  // Check if product already exists in cart
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    existingProduct.quantity += 1;
    showToast(`Updated quantity for "${product.title}"`, 'info');
  } else {
    product.quantity = 1;
    cart.push(product);
    showToast(`"${product.title}" added to cart!`, 'success');
  }
  
  saveCartToStorage();
  updateCartCount();
  
  // Remove loading state
  setTimeout(() => {
    button.classList.remove('btn-loading');
  }, 300);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartCount();
  showToast('Item removed from cart', 'info');
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('.cart-count');
  
  cartCountElements.forEach(element => {
    element.textContent = totalItems;
    if (totalItems > 0) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  });
}

function saveCartToStorage() {
  try {
    localStorage.setItem('vinylCart', JSON.stringify(cart));
  } catch (e) {
    console.error('Error saving cart to storage:', e);
  }
}

function loadCartFromStorage() {
  try {
    const stored = localStorage.getItem('vinylCart');
    if (stored) {
      cart = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading cart from storage:', e);
    cart = [];
  }
}

function getCart() {
  return cart;
}

function getTotalPrice() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// ============================================
// WISHLIST FUNCTIONALITY
// ============================================
function initializeWishlistButtons() {
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  
  wishlistButtons.forEach(button => {
    const productCard = button.closest('.pro');
    const productId = productCard.dataset.id;
    
    // Check if already in wishlist
    if (wishlist.includes(productId)) {
      button.classList.add('active');
    }
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const product = {
        id: productId,
        title: productCard.dataset.title,
        artist: productCard.dataset.artist,
        price: parseFloat(productCard.dataset.price),
        image: productCard.querySelector('img').src
      };
      
      toggleWishlist(product, button);
    });
  });
}

function toggleWishlist(product, button) {
  const index = wishlist.findIndex(id => id === product.id);
  
  if (index > -1) {
    // Remove from wishlist
    wishlist.splice(index, 1);
    button.classList.remove('active');
    showToast(`"${product.title}" removed from wishlist`, 'info');
  } else {
    // Add to wishlist
    wishlist.push(product.id);
    button.classList.add('active');
    showToast(`"${product.title}" added to wishlist!`, 'success');
  }
  
  saveWishlistToStorage();
}

function saveWishlistToStorage() {
  try {
    localStorage.setItem('vinylWishlist', JSON.stringify(wishlist));
  } catch (e) {
    console.error('Error saving wishlist to storage:', e);
  }
}

function loadWishlistFromStorage() {
  try {
    const stored = localStorage.getItem('vinylWishlist');
    if (stored) {
      wishlist = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading wishlist from storage:', e);
    wishlist = [];
  }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.add('show');
  
  // Auto hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initializeBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (!backToTopButton) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  // Smooth scroll to top
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatPrice(price) {
  return `R${price.toFixed(2)}`;
}

// ============================================
// EXPORT FOR OTHER PAGES (if using modules)
// ============================================
// Expose functions globally for use in cart.html, etc.
window.VinylStore = {
  getCart,
  getTotalPrice,
  removeFromCart,
  updateCartCount,
  formatPrice,
  addToCart,
  showToast
};