import Favorites from './favorites.js';

export default class FavoritesView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.favorites = new Favorites();
    this.unsubscribe = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Suscribirse a cambios en los favoritos
    this.unsubscribe = this.favorites.subscribe(() => this.renderFavorites());
  }

  renderFavorites() {
    const favorites = this.favorites.getFavorites();

    this.container.innerHTML = '';

    if (favorites.length === 0) {
      this.container.innerHTML = '<div class="no-favorites"><p>No favorites added yet. Try to reload the page</p></div>';
      return;
    }

    favorites.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('favorite-card');
      card.innerHTML = `
        <h3>${item.name || 'Unnamed Item'}</h3>
        ${item.image ? `<img src="${item.image}" alt="${item.name}" class="favorite-img">` : ''}
        ${item.description ? `<p class="favorite-desc">${item.description}</p>` : ''}
        <button class="remove-favorite" data-id="${item.id}">Remove</button>
      `;
      this.container.appendChild(card);
    });

    this.addRemoveListeners();
  }

  addRemoveListeners() {
    const buttons = this.container.querySelectorAll('.remove-favorite');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const itemId = event.target.dataset.id;
        this.favorites.removeFavorite(itemId);
        // No necesitamos llamar a renderFavorites() aquí porque el subscriber lo hará
      });
    });
  }

  init() {
    this.renderFavorites();
  }

  // Limpiar suscripción cuando ya no se necesite
  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
