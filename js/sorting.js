// Ordenamiento de productos
function setupSorting() {
    const sortContainer = document.createElement('div');
    sortContainer.className = 'sort-container';
    sortContainer.innerHTML = `
      <span>Ordenar por: </span>
      <select class="sort-select">
        <option value="default">Predeterminado</option>
        <option value="price-asc">Precio: Menor a Mayor</option>
        <option value="price-desc">Precio: Mayor a Menor</option>
        <option value="name-asc">Nombre: A-Z</option>
        <option value="name-desc">Nombre: Z-A</option>
      </select>
    `;
    
    document.querySelector('.gallery-section').insertBefore(sortContainer, document.querySelector('.gallery'));
    
    const sortSelect = document.querySelector('.sort-select');
    sortSelect.addEventListener('change', function() {
      sortProducts(this.value);
    });
  }
  
  function sortProducts(criteria) {
    const gallery = document.querySelector('.gallery');
    const products = Array.from(document.querySelectorAll('.product-card:not([style*="display: none"])'));
    
    products.sort((a, b) => {
      const nameA = a.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
      const nameB = b.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
      const priceA = parsePrice(a.querySelector('p:nth-of-type(2)').textContent);
      const priceB = parsePrice(b.querySelector('p:nth-of-type(2)').textContent);
      
      switch(criteria) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'name-asc':
          return nameA.localeCompare(nameB);
        case 'name-desc':
          return nameB.localeCompare(nameA);
        default:
          return 0;
      }
    });
    
    // Reordenar en el DOM
    products.forEach(product => {
      gallery.appendChild(product);
    });
    
    // Volver a mostrar la primera página
    showPage(1);
  }
  
  function parsePrice(priceStr) {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  }
  
  // Inicializar ordenamiento
  document.addEventListener('DOMContentLoaded', setupSorting);