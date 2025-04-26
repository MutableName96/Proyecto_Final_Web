document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      searchBar.classList.toggle('active');
      if (searchBar.classList.contains('active')) {
        searchBar.focus();
      } else {
        searchBar.blur();
      }
    });
  });