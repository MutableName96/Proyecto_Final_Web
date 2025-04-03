// Estado global de filtros
const filterState = {
    género: { active: false, value: null },
    color: { active: false, value: null },
    textura: { active: false, value: null },
    marca: { active: false, value: null },
    forma: { active: false, value: null }
  };
  
  // Inicializar filtros
  function initFilters() {
    // Limpiar eventos anteriores para evitar duplicados
    document.querySelectorAll('.filter').forEach(filter => {
      filter.replaceWith(filter.cloneNode(true));
    });
  
    const filters = document.querySelectorAll('.filter');
    
    filters.forEach(filter => {
      const filterType = filter.dataset.filterType;
      const title = filter.querySelector('.filter-title');
      const options = filter.querySelector('.filter-options');
      
      // Inicializar icono
      if (!title.querySelector('i')) {
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', 'chevron-down');
        title.appendChild(icon);
      }
      
      // Actualizar título inicial
      updateFilterTitle(filter, filterType);
      
      // Evento para mostrar/ocultar opciones
      title.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFilterOptions(filter);
      });
      
      // Eventos para opciones de filtro
      options.querySelectorAll('a').forEach(option => {
        option.addEventListener('click', (e) => {
          e.preventDefault();
          handleFilterOptionClick(filterType, option.dataset.value, option.textContent.trim());
        });
      });
    });
    
    // Cerrar filtros al hacer clic fuera
    document.addEventListener('click', closeAllFilterOptions);
  }
  
  // Manejar selección de opción
  function handleFilterOptionClick(filterType, value, displayText) {
    // Toggle: si ya está seleccionado, deseleccionar
    if (filterState[filterType].value === value) {
      filterState[filterType] = { active: false, value: null };
    } else {
      filterState[filterType] = { active: true, value, displayText };
    }
    
    // Actualizar UI
    updateFilterUI();
    applyFilters();
  }
  
  // Actualizar toda la UI de filtros
  function updateFilterUI() {
    document.querySelectorAll('.filter').forEach(filter => {
      const filterType = filter.dataset.filterType;
      updateFilterTitle(filter, filterType);
    });
  }
  
  // Actualizar título de un filtro específico
  function updateFilterTitle(filter, filterType) {
    const title = filter.querySelector('.filter-title');
    const state = filterState[filterType];
    
    // Limpiar completamente el título
    title.innerHTML = '';
    
    // Crear elemento de texto
    const textSpan = document.createElement('span');
    textSpan.className = 'filter-text';
    
    if (state.active) {
      textSpan.textContent = `${filterType}: ${state.displayText}`;
      filter.classList.add('active');
    } else {
      textSpan.textContent = filterType;
      filter.classList.remove('active');
    }
    
    // Crear icono
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', 'chevron-down');
    
    // Ensamblar
    title.appendChild(textSpan);
    title.appendChild(icon);
    
    // Recrear iconos Lucide
    lucide.createIcons();
  }
  
  // Mostrar/ocultar opciones de un filtro
  function toggleFilterOptions(filter) {
    const options = filter.querySelector('.filter-options');
    const isShowing = options.style.display === 'block';
    
    closeAllFilterOptions();
    
    if (!isShowing) {
      options.style.display = 'block';
      filter.classList.add('expanded');
    }
  }
  
  // Cerrar todos los filtros
  function closeAllFilterOptions() {
    document.querySelectorAll('.filter-options').forEach(options => {
      options.style.display = 'none';
    });
    document.querySelectorAll('.filter').forEach(filter => {
      filter.classList.remove('expanded');
    });
  }
  
  // Aplicar filtros a los productos
  function applyFilters() {
    const activeFilters = Object.entries(filterState)
      .filter(([_, state]) => state.active)
      .map(([type, state]) => ({ type, value: state.value }));
    
    // Implementar lógica de filtrado real aquí
    console.log('Filtros activos:', activeFilters);
    
    // Actualizar paginación
    updatePagination();
  }