// Configuración de paginación
const productsPerPage = 8;
let currentPage = 1;

function initializePagination() {
  const totalProducts = document.querySelectorAll('.product-card:not([style*="display: none"])').length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginationContainer = document.querySelector('.pagination');
  
  // Limpiar botones existentes
  paginationContainer.innerHTML = '';
  
  // Crear botones de paginación
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      showPage(currentPage);
    });
    paginationContainer.appendChild(button);
  }
  
  // Mostrar primera página
  showPage(1);
}

function showPage(page) {
  const visibleProducts = Array.from(document.querySelectorAll('.product-card:not([style*="display: none"])'));
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  
  // Ocultar todos los productos primero
  document.querySelectorAll('.product-card').forEach(p => p.style.display = 'none');
  
  // Mostrar solo los productos de la página actual
  visibleProducts.slice(startIndex, endIndex).forEach(p => p.style.display = 'block');
  
  // Actualizar botones de paginación
  updatePaginationButtons(page);
}

function updatePaginationButtons(activePage) {
  const buttons = document.querySelectorAll('.pagination button');
  buttons.forEach((button, index) => {
    if (index + 1 === activePage) {
      button.style.backgroundColor = '#0D0D0D';
      button.style.color = 'white';
    } else {
      button.style.backgroundColor = '#eee';
      button.style.color = '#333';
    }
  });
}

// Inicializar paginación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializePagination);