// src/js/modules/navigation.js

import FavoritesView from './favoritesView.js';

export function initNavigation() {
  const links = document.querySelectorAll('nav a[data-page]');
  const pages = document.querySelectorAll('.page');
  const favoritesView = new FavoritesView('#favorites-container'); // Pointing to the section, not container

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const pageId = link.dataset.page;

      window.location.hash = `#${pageId}`;

      // Hide all sections
      pages.forEach(page => {
    page.classList.add('hidden');
    page.classList.remove('active');
  });

      // Show selected section
      const activeSection = document.getElementById(pageId);
      if (activeSection) {
        activeSection.classList.remove('hidden');
        activeSection.classList.add('active');
      }

      // Special behavior for favorites
      if (pageId === 'favorites') {
        favoritesView.renderFavorites();
      }
    });
  });
}
