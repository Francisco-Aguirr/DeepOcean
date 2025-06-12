const FAVORITES_KEY = 'deepocean-favorites';

export default class Favorites {
  constructor() {
    this.favorites = this.loadFavorites();
    this.subscribers = []; // Array para almacenar las funciones callback
  }

  // Método para suscribirse a cambios
  subscribe(callback) {
    this.subscribers.push(callback);
    // Retornar función para desuscribirse
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  // Método para notificar a los suscriptores
  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.favorites));
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
      this.notifySubscribers(); // Notificar después de guardar
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
    return [...this.favorites]; // Devolver copia para evitar mutaciones externas
  }

  clearAllFavorites() {
    this.favorites = [];
    this.saveFavorites();
  }
}