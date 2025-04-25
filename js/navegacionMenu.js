let prevScrollPos = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScrollPos = window.scrollY;

  if (prevScrollPos > currentScrollPos) {
    // Si se hace scroll hacia arriba, muestra el header
    header.style.transform = 'translateY(0)';
  } else {
    // Si se hace scroll hacia abajo, oculta el header
    header.style.transform = 'translateY(-100%)';
  }

  prevScrollPos = currentScrollPos;
});
