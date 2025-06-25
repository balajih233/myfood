// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all food items
    const foodCards = document.querySelectorAll('.food-card-detailed');
    const foodGridItems = document.querySelectorAll('.food-card');
    const searchBar = document.querySelector('.search-bar');
    const searchButton = document.querySelector('.search-button');
    
    // Function to filter and display matching items
    function filterItems(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        // Search in detailed food cards
        foodCards.forEach(card => {
            const foodName = card.querySelector('h4').textContent.toLowerCase();
            if (foodName.includes(term)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Search in food grid items
        foodGridItems.forEach(item => {
            const foodName = item.querySelector('p').textContent.toLowerCase();
            if (foodName.includes(term)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Event listener for search input (live search)
    searchBar.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        if (searchTerm.length > 0) {
            filterItems(searchTerm);
        } else {
            // Show all items if search is empty
            foodCards.forEach(card => card.style.display = 'flex');
            foodGridItems.forEach(item => item.style.display = 'flex');
        }
    });
    
    // Event listener for search button
    searchButton.addEventListener('click', function() {
        const searchTerm = searchBar.value.trim();
        if (searchTerm.length > 0) {
            filterItems(searchTerm);
        }
    });
    
    // Function for Order Now button
    window.clickMe = function() {
        alert('Order placed successfully! Enjoy your meal!');
    };
});

document.addEventListener('DOMContentLoaded', function() {
    const foodCards = document.querySelectorAll('.food-card-detailed');
    const foodGridItems = document.querySelectorAll('.food-card');
    const searchBar = document.querySelector('.search-bar');
    const searchButton = document.querySelector('.search-button');
    
    // Cart functionality
    const cartBtn = document.querySelector('.cart-btn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.querySelector('.cart-count');
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    let cart = [];
    
    // Function to filter and display matching items
    function filterItems(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        foodCards.forEach(card => {
            const foodName = card.querySelector('h4').textContent.toLowerCase();
            card.style.display = foodName.includes(term) ? 'flex' : 'none';
        });
        
        foodGridItems.forEach(item => {
            const foodName = item.querySelector('p').textContent.toLowerCase();
            item.style.display = foodName.includes(term) ? 'flex' : 'none';
        });
    }
    
    // Event listeners for search
    searchBar.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        searchTerm.length > 0 ? filterItems(searchTerm) : 
            (foodCards.forEach(card => card.style.display = 'flex'),
            foodGridItems.forEach(item => item.style.display = 'flex'));
    });
    
    searchButton.addEventListener('click', function() {
        const searchTerm = searchBar.value.trim();
        if (searchTerm.length > 0) filterItems(searchTerm);
    });
    
    // Function for Order Now button
    window.clickMe = function() {
        alert('Order placed successfully! Enjoy your meal!');
    };
    
    // Cart functionality
    
    // Add "Add to Cart" buttons to all food cards
    foodCards.forEach(card => {
        const addButton = document.createElement('button');
        addButton.className = 'add-to-cart';
        addButton.textContent = 'Add to Cart';
        
        const foodInfo = card.querySelector('.food-info');
        foodInfo.appendChild(addButton);
        
        addButton.addEventListener('click', () => {
            const foodTitle = card.querySelector('h4').textContent;
            const foodPrice = parseInt(card.querySelector('.price').textContent.replace('₹', ''));
            const foodImg = card.querySelector('img').src;
            const foodType = card.querySelector('.food-type').classList.contains('veg') ? 'Veg' : 'Non-Veg';
            
            addToCart(foodTitle, foodPrice, foodImg, foodType);
        });
    });
    
    // Add to cart function
    function addToCart(title, price, img, type) {
        const existingItem = cart.find(item => item.title === title);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                title,
                price,
                img,
                type,
                quantity: 1
            });
        }
        
        updateCart();
        showCartNotification(title);
    }
    
    // Update cart UI
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;
        
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            
            cartItemElement.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title} (${item.type})</div>
                    <div>₹${item.price} x ${item.quantity}</div>
                </div>
                <div class="cart-item-price">₹${item.price * item.quantity}</div>
                <div class="cart-item-remove" data-index="${index}">✕</div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });
        
        cartTotalElement.textContent = total;
        cartCountElement.textContent = itemCount;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
    
    // Show notification when item is added to cart
    function showCartNotification(itemName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = `${itemName} added to cart!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }
    
    // Clear cart
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        updateCart();
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const orderDetails = cart.map(item => 
            `${item.title} (${item.type}) - ${item.quantity} x ₹${item.price} = ₹${item.price * item.quantity}`
        ).join('\n');
        
        alert(`Order Summary:\n\n${orderDetails}\n\nTotal: ₹${total}\n\nThank you for your order!`);
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    });
    
    // Open/close cart modal
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });
    
    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Add CSS for notification
    const style = document.createElement('style');
    style.textContent = `
        .cart-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #2ecc71;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
        }
        
        .cart-notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});