
const FAVORITES_KEY = 'deepocean-favorites';

export default class Favorites {
  constructor() {
    this.favorites = this.loadFavorites();
  }

  loadFavorites() {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
      return [];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }

  addFavorite(item) {
    const exists = this.favorites.find(fav => fav.id === item.id);
    if (!exists) {
      this.favorites.push(item);
      this.saveFavorites();
    }
  }

  removeFavorite(itemId) {
    this.favorites = this.favorites.filter(item => item.id !== itemId);
    this.saveFavorites();
  }

  isFavorite(itemId) {
    return this.favorites.some(item => item.id === itemId);
  }

  getFavorites() {
    return this.favorites;
  }

  clearAllFavorites() {
    this.favorites = [];
    this.saveFavorites();
  }
}
