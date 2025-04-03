// Búsqueda de productos
function setupSearch() {
    const searchIcon = document.querySelector('[data-lucide="search"]');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar productos...';
    searchInput.className = 'search-input';
    
    searchContainer.appendChild(searchInput);
    searchIcon.parentNode.insertBefore(searchContainer, searchIcon);
    searchContainer.appendChild(searchIcon);
    
    searchInput.style.display = 'none';
    
    searchIcon.addEventListener('click', function() {
      if (searchInput.style.display === 'none') {
        searchInput.style.display = 'inline-block';
        searchInput.focus();
      } else {
        performSearch(searchInput.value.trim());
      }
    });
    
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        performSearch(this.value.trim());
      }
    });
  }
  
  function performSearch(term) {
    if (!term) {
      // Si la búsqueda está vacía, mostrar todos los productos
      document.querySelectorAll('.product-card').forEach(p => p.style.display = 'block');
      initializePagination();
      return;
    }
    
    const products = document.querySelectorAll('.product-card');
    let hasResults = false;
    
    products.forEach(product => {
      const productName = product.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
      if (productName.includes(term.toLowerCase())) {
        product.style.display = 'block';
        hasResults = true;
      } else {
        product.style.display = 'none';
      }
    });
    
    // Actualizar paginación
    initializePagination();
    
    // Mostrar mensaje si no hay resultados
    if (!hasResults) {
      showNoResultsMessage(term);
    }
  }
  
  function showNoResultsMessage(term) {
    let message = document.querySelector('.no-results-message');
    if (!message) {
      message = document.createElement('div');
      message.className = 'no-results-message';
      document.querySelector('.gallery-section').appendChild(message);
    }
    message.textContent = `No se encontraron resultados para "${term}"`;
  }
  
  // Inicializar búsqueda
  document.addEventListener('DOMContentLoaded', setupSearch);