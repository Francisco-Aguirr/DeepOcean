// src/js/main.js
// src/js/main.js
import { initNavigation } from './modules/navigation.js';
import { showCurrentYear } from './modules/ui.js';
import setupSpeciesExplorer from './modules/speciesExplorer.js';
import loadOceanStats from './modules/statsView.js';
import setupQuiz from './modules/quiz.js';
import FavoritesView from './modules/favoritesView.js';

// Función para los hechos del océano
function setupOceanFacts() {
  const facts = [
    "More than 80% of the ocean is unexplored.",
    "The ocean produces over half of the world's oxygen.",
    "Coral reefs are home to 25% of marine species.",
    "The deepest part of the ocean is nearly 11km deep.",
    "Ocean currents regulate Earth's climate."
  ];

  const factText = document.querySelector('.fact-text');
  const nextBtn = document.querySelector('.fact-next');
  let currentFact = 0;

  if (factText && nextBtn) {
    // Mostrar primer hecho
    factText.textContent = facts[currentFact];
    
    // Rotar hechos al hacer clic
    nextBtn.addEventListener('click', () => {
      currentFact = (currentFact + 1) % facts.length;
      factText.classList.add('animate__animated', 'animate__fadeIn');
      setTimeout(() => {
        factText.textContent = facts[currentFact];
        factText.classList.remove('animate__animated', 'animate__fadeIn');
      }, 500);
    });
  }

  // Configurar botones CTA
  document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
      document.getElementById(page)?.classList.remove('hidden');
    });
  });
}

// En el DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // ... (tu código existente)
  setupOceanFacts();
});

// Creamos una instancia global de FavoritesView
let favoritesView;

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar la vista de favoritos
  favoritesView = new FavoritesView('#favorites-container');
  favoritesView.init();
  
  // Pasar las funciones necesarias a initNavigation
  initNavigation({
    loadOceanStats,
    showFavorites: () => favoritesView.renderFavorites() // Forzar actualización al navegar a favoritos
  });
  
  showCurrentYear();
  setupSpeciesExplorer();
  setupQuiz();
});