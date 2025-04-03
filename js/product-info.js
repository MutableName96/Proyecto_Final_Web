// Variables globales
let selectedColor = 'black';
let selectedSize = 'M';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos del DOM
const addToCartBtn = document.getElementById('addToCart');
const sizeSelect = document.getElementById('size');
const colorOptions = document.querySelectorAll('.color');
const productImages = document.querySelectorAll('.gallery img');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Configurar eventos
    setupColorSelection();
    setupSizeSelection();
    setupAddToCart();
    setupImageGallery();
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Inicializar iconos Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Selección de color
function setupColorSelection() {
    // Seleccionar negro por defecto
    document.querySelector('.color.black').classList.add('selected');
    
    colorOptions.forEach(color => {
        color.addEventListener('click', (e) => {
            e.preventDefault();
            colorOptions.forEach(c => c.classList.remove('selected'));
            color.classList.add('selected');
            selectedColor = color.classList[1]; // Obtiene la clase del color (black, red, etc.)
            
            // Cambiar imagen principal según el color (opcional)
            // changeMainImage(selectedColor);
        });
    });
}

// Selección de talla
function setupSizeSelection() {
    sizeSelect.addEventListener('change', (e) => {
        selectedSize = e.target.value;
    });
}

// Galería de imágenes
function setupImageGallery() {
    if (productImages.length > 0) {
        productImages.forEach(img => {
            img.addEventListener('click', () => {
                // Cambiar imagen principal al hacer clic en miniaturas
                const mainImg = document.querySelector('.gallery img:first-child');
                const tempSrc = mainImg.src;
                mainImg.src = img.src;
                img.src = tempSrc;
            });
        });
    }
}

// Agregar al carrito
function setupAddToCart() {
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const product = {
            id: generateProductId(),
            name: document.querySelector('h1').textContent,
            price: parsePrice(document.querySelector('.price').textContent),
            size: selectedSize,
            color: selectedColor,
            image: getMainProductImage(),
            quantity: 1,
            description: document.querySelector('.description').textContent
        };
        
        addToCart(product);
        showCartNotification();
    });
}

// Función para agregar producto al carrito
function addToCart(product) {
    // Verificar si el producto ya está en el carrito (mismo id, talla y color)
    const existingProductIndex = cart.findIndex(item => 
        item.name === product.name && 
        item.size === product.size && 
        item.color === product.color
    );
    
    if (existingProductIndex !== -1) {
        // Si ya existe, incrementar cantidad
        cart[existingProductIndex].quantity += 1;
    } else {
        // Si no existe, agregar nuevo producto
        cart.push(product);
    }
    
    // Actualizar localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Actualizar contador
    updateCartCount();
}

// Generar ID único para el producto
function generateProductId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Obtener imagen principal del producto
function getMainProductImage() {
    const mainImg = document.querySelector('.gallery img');
    return mainImg ? mainImg.src : '';
}

// Parsear precio (eliminar símbolos no numéricos)
function parsePrice(priceStr) {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
}

// Actualizar contador del carrito en el nav
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

// Mostrar notificación de producto agregado
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <p>¡Producto agregado al carrito!</p>
        <a href="/pages/carrito.html">Ver carrito</a>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Cambiar imagen principal según color (opcional)
function changeMainImage(color) {
    const mainImg = document.querySelector('.gallery img:first-child');
    // Implementar lógica para cambiar imagen según color
    // Ejemplo: mainImg.src = `../assets/images/producto-${color}.jpg`;
}