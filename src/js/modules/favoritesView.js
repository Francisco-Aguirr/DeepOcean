import Favorites from './favorites.js';

/**
 * FavoritesView handles the rendering and interaction
 * of the favorites section in the UI.
 */
export default class FavoritesView {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.favorites = new Favorites();
  }

  /**
   * Render all favorite items stored in localStorage.
   */
  renderFavorites() {
    const favorites = this.favorites.getFavorites();

    // Clear the container before rendering
    this.container.innerHTML = '';

    if (favorites.length === 0) {
      this.container.innerHTML = '<p>No favorites added yet.</p>';
      return;
    }

    // Loop through each favorite and build the HTML
    favorites.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('favorite-card');

      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><strong>ID:</strong> ${item.id}</p>
        <button class="remove-favorite" data-id="${item.id}">Remove</button>
      `;

      this.container.appendChild(card);
    });

    // Bind remove event listeners
    this.addRemoveListeners();
  }

  /**
   * Set up the remove button logic for each favorite.
   */
  addRemoveListeners() {
    const buttons = this.container.querySelectorAll('.remove-favorite');

    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const itemId = event.target.dataset.id;
        this.favorites.removeFavorite(itemId);
        this.renderFavorites();
      });
    });
  }

  /**
   * Optional: Render favorites when the view is first loaded.
   */
  init() {
    this.renderFavorites();
  }
}
