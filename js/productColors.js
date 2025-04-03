// Selección de colores con persistencia
document.querySelectorAll('.color').forEach(color => {
    color.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      // Remover selección previa en este grupo de colores
      const parent = this.parentElement;
      parent.querySelectorAll('.color').forEach(c => {
        c.classList.remove('selected');
        c.style.border = '1px solid #ccc';
      });
      
      // Seleccionar nuevo color
      this.classList.add('selected');
      this.style.border = '2px solid #0D0D0D';
      
      // Aquí podrías cambiar la imagen del producto según el color seleccionado
      // Ejemplo:
      // const productCard = this.closest('.product-card');
      // const mainImage = productCard.querySelector('img');
      // mainImage.src = obtenerNuevaImagenSegunColor(this);
    });
  });