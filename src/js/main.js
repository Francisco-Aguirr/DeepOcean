import { initNavigation } from './modules/navigation.js';
import { showCurrentYear } from './modules/ui.js';
import setupSpeciesExplorer from './modules/speciesExplorer.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  showCurrentYear();
  setupSpeciesExplorer();
});
