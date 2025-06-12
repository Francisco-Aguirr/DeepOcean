// src/js/modules/navigation.js

import FavoritesView from './favoritesView.js';

// navigation.js (ejemplo de modificación)
export function initNavigation(callbacks = {}) {
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      
      // Ocultar todas las páginas
      document.querySelectorAll('.page').forEach(p => {
        p.classList.add('hidden');
      });
      
      // Mostrar la página seleccionada
      const targetPage = document.getElementById(page);
      if (targetPage) {
        targetPage.classList.remove('hidden');
        
        // Ejecutar callback específico si existe
        if (page === 'stats' && callbacks.loadOceanStats) {
          callbacks.loadOceanStats();
        } else if (page === 'favorites' && callbacks.showFavorites) {
          callbacks.showFavorites();
        }
      }
    });
  });
}