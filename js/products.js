// Función principal que inicializa todo
function initProducts() {
    console.log("Inicializando funcionalidades de productos...");
    
    // Inicializar componentes
    initFilters();
    initProductColors();
    initSearch();
    initPagination();
    initSorting();
  }
  
  // FILTROS
  function initFilters() {
    const filters = document.querySelectorAll('.filter');
    
    filters.forEach(filter => {
      const title = filter.querySelector('span');
      const options = filter.querySelector('.filter-options');
      
      // Crear icono de chevrón si no existe
      if (!title.querySelector('i')) {
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', 'chevron-down');
        title.appendChild(icon);
      }
      
      title.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.filter-options').forEach(opt => {
          if (opt !== options) opt.style.display = 'none';
        });
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
      });
      
      options.querySelectorAll('a').forEach(option => {
        option.addEventListener('click', (e) => {
          e.preventDefault();
          const filterType = title.textContent.trim().replace('▼', '').replace('chevron-down', '').trim();
          const filterValue = option.textContent.trim();
          title.innerHTML = `${filterType}: ${filterValue} <i data-lucide="chevron-down"></i>`;
          lucide.createIcons();
          applyFilters();
          options.style.display = 'none';
        });
      });
    });
    
    document.addEventListener('click', () => {
      document.querySelectorAll('.filter-options').forEach(options => {
        options.style.display = 'none';
      });
    });
  }
  
  function applyFilters() {
    console.log("Aplicando filtros...");
    updatePagination();
  }
  
  // COLORES DE PRODUCTOS
  function initProductColors() {
    document.querySelectorAll('.color').forEach(color => {
      color.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        const parent = this.parentElement;
        parent.querySelectorAll('.color').forEach(c => {
          c.classList.remove('selected');
          c.style.border = '1px solid #ccc';
        });
        this.classList.add('selected');
        this.style.border = '2px solid #0D0D0D';
      });
    });
  }
  
  // BÚSQUEDA
  function initSearch() {
    const searchIcon = document.querySelector('[data-lucide="search"]');
    const searchWrapper = document.querySelector('.search-wrapper');
    const searchBar = document.querySelector('.search-bar');
  
    if (!searchIcon || !searchWrapper || !searchBar) {
      console.warn("Elementos de búsqueda no encontrados");
      return;
    }
  
    searchIcon.addEventListener('click', function(e) {
      e.preventDefault();
      searchWrapper.classList.toggle('active');
      if (searchWrapper.classList.contains('active')) {
        searchBar.focus();
      } else {
        searchBar.blur();
      }
    });
  
    // Buscar productos cuando presionas Enter en el input
    searchBar.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault(); // Evita que el formulario (si existe) se envíe
        const searchTerm = searchBar.value.trim().toLowerCase();
        
        if (searchTerm) {
          const products = document.querySelectorAll('.product-card');
          let hasResults = false;
          
          products.forEach(product => {
            const productName = product.querySelector('p:first-of-type').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
              product.style.display = 'block';
              hasResults = true;
            } else {
              product.style.display = 'none';
            }
          });
          
          updatePagination();
          
          if (!hasResults) {
            alert(`No se encontraron resultados para "${searchTerm}"`);
          }
        } else {
          // Si el campo está vacío, mostrar todo
          document.querySelectorAll('.product-card').forEach(p => p.style.display = 'block');
          updatePagination();
        }
      }
    });
  
    // Opcional: cerrar la barra si haces click fuera
    document.addEventListener('click', function(e) {
      if (!searchWrapper.contains(e.target) && e.target !== searchIcon) {
        searchWrapper.classList.remove('active');
      }
    });
  }
  
  
  // PAGINACIÓN
  let currentPage = 1;
  const productsPerPage = 8;
  
  function initPagination() {
    createPaginationButtons();
    showPage(1);
  }
  
  function createPaginationButtons() {
    const totalProducts = document.querySelectorAll('.product-card:not([style*="display: none"])').length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pagination = document.querySelector('.pagination');
    
    // Limpiar botones existentes
    pagination.innerHTML = '';
    
    // Crear nuevos botones
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', () => {
        currentPage = i;
        showPage(currentPage);
      });
      pagination.appendChild(button);
    }
  }
  
  function showPage(page) {
    const visibleProducts = Array.from(document.querySelectorAll('.product-card:not([style*="display: none"])'));
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    
    // Ocultar todos primero
    document.querySelectorAll('.product-card').forEach(p => p.style.display = 'none');
    
    // Mostrar solo los de la página actual
    visibleProducts.slice(startIndex, endIndex).forEach(p => p.style.display = 'block');
    
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
  
  function updatePagination() {
    createPaginationButtons();
    showPage(1);
  }
  
  // ORDENAMIENTO
  function initSorting() {
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
    
    const gallerySection = document.querySelector('.gallery-section');
    const gallery = document.querySelector('.gallery');
    gallerySection.insertBefore(sortContainer, gallery);
    
    const sortSelect = document.querySelector('.sort-select');
    sortSelect.addEventListener('change', function() {
      sortProducts(this.value);
    });
  }
  
  function sortProducts(criteria) {
    const gallery = document.querySelector('.gallery');
    const products = Array.from(document.querySelectorAll('.product-card:not([style*="display: none"])'));
    
    products.sort((a, b) => {
      const nameA = a.querySelector('p:first-of-type').textContent.toLowerCase();
      const nameB = b.querySelector('p:first-of-type').textContent.toLowerCase();
      const priceA = parsePrice(a.querySelector('p:nth-of-type(2)').textContent);
      const priceB = parsePrice(b.querySelector('p:nth-of-type(2)').textContent);
      
      switch(criteria) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'name-asc': return nameA.localeCompare(nameB);
        case 'name-desc': return nameB.localeCompare(nameA);
        default: return 0;
      }
    });
    
    // Reordenar en el DOM
    products.forEach(product => gallery.appendChild(product));
    
    // Mostrar primera página
    showPage(1);
  }
  
  function parsePrice(priceStr) {
    return parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  }
  
  // Hacer la función initProducts disponible globalmente
  window.initProducts = initProducts;