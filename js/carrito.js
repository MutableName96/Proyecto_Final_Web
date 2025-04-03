document.addEventListener('DOMContentLoaded', () => {
    // Variables globales
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.products-list');
    const encabezados = document.querySelector('.encabezados');
    
    // Inicializar carrito
    initCart();
    
    // Función principal de inicialización
    function initCart() {
        renderCart();
        setupEventListeners();
        updateCartCount();
        
        // Inicializar iconos Lucide
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Renderizar el carrito
    function renderCart() {
        // Limpiar solo los productos (conservar encabezados)
        const productsToRemove = document.querySelectorAll('.card-product:not(.encabezados)');
        productsToRemove.forEach(product => product.remove());
        
        // Mostrar mensaje si está vacío
        if (cart.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-cart';
            emptyMessage.textContent = 'Tu carrito está vacío';
            cartContainer.appendChild(emptyMessage);
            updateSummary();
            return;
        }
        
        // Renderizar cada producto
        cart.forEach((item, index) => {
            const productElement = createProductElement(item, index);
            cartContainer.appendChild(productElement);
        });
        
        updateSummary();
    }
    
    // Crear elemento de producto
    function createProductElement(item, index) {
        const productElement = document.createElement('div');
        productElement.className = 'card-product';
        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <p class="product-description">${item.description || item.name}</p>
            <span class="price">$${item.price.toFixed(2)}</span>
            <div class="quantity-wrapper">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
            <span class="price total-price">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="delete-btn" data-index="${index}">
                <img src="../assets/icons/carrito/trash-2.png" alt="Eliminar" />
            </button>
        `;
        return productElement;
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Delegación de eventos para elementos dinámicos
        cartContainer.addEventListener('click', (e) => {
            // Eliminar producto
            if (e.target.closest('.delete-btn')) {
                const index = e.target.closest('.delete-btn').dataset.index;
                removeProduct(index);
            }
            
            // Aumentar cantidad
            if (e.target.closest('.plus')) {
                const index = e.target.closest('.plus').dataset.index;
                updateQuantity(index, 1);
            }
            
            // Disminuir cantidad
            if (e.target.closest('.minus')) {
                const index = e.target.closest('.minus').dataset.index;
                updateQuantity(index, -1);
            }
        });
    }
    
    // Eliminar producto
    function removeProduct(index) {
        cart.splice(index, 1);
        saveAndUpdateCart();
    }
    
    // Actualizar cantidad
    function updateQuantity(index, change) {
        const newQuantity = cart[index].quantity + change;
        
        if (newQuantity < 1) {
            removeProduct(index);
        } else {
            cart[index].quantity = newQuantity;
            saveAndUpdateCart();
        }
    }
    
    // Guardar y actualizar
    function saveAndUpdateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
    
    // Actualizar resumen
    function updateSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = calculateDiscount(subtotal);
        const total = subtotal - discount;
        
        if (document.querySelector('.resumen-pedido:nth-child(1) span')) {
            document.querySelector('.resumen-pedido:nth-child(1) span').textContent = `$${subtotal.toFixed(2)}`;
            document.querySelector('.resumen-pedido:nth-child(2) .descuento').textContent = `-$${discount.toFixed(2)}`;
            document.querySelector('.resumen-pedido:nth-child(3) span').textContent = `$${total.toFixed(2)}`;
        }
    }
    
    // Calcular descuento (ejemplo)
    function calculateDiscount(subtotal) {
        return subtotal > 1000 ? subtotal * 0.1 : 0;
    }
    
    // Actualizar contador en el nav
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartIcon = document.querySelector('[data-lucide="shopping-cart"]');
        
        if (cartIcon) {
            let counter = cartIcon.nextElementSibling;
            if (!counter || !counter.classList.contains('cart-counter')) {
                counter = document.createElement('span');
                counter.className = 'cart-counter';
                cartIcon.parentNode.insertBefore(counter, cartIcon.nextSibling);
            }
            
            counter.textContent = totalItems > 0 ? totalItems : '';
        }
    }
});