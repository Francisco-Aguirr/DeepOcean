// src/js/modules/statsView.js
// este codigo hay que corregirlo p volver a la version anterior porque ya no funciona ni en local
// Importación correcta del archivo de estadísticas
import oceanStats from '../../../public/data/oceanStats.json';

export default function loadOceanStats() {
  const statsSection = document.getElementById('stats-container');
  
  // Mostrar estado de carga
  statsSection.innerHTML = `<p class="loading-message">Loading ocean stats...</p>`;

  try {
    // Validar que los datos existen y tienen la estructura correcta
    if (!oceanStats?.stats || !Array.isArray(oceanStats.stats)) {
      throw new Error('Invalid data format');
    }

    // Generar el HTML de las tarjetas
    const statsHtml = oceanStats.stats.map(stat => `
      <div class="stats-card">
        <h3>${stat.title || 'No title'}</h3>
        <p><strong>${stat.value || 'N/A'}</strong></p>
        ${stat.description ? `<p>${stat.description}</p>` : ''}
      </div>
    `).join('');

    // Insertar en el DOM
    statsSection.innerHTML = statsHtml ? `
      <div class="stats-grid">
        ${statsHtml}
      </div>
    ` : '<p>No statistics available</p>';

  } catch (error) {
    // Manejo de errores mejorado
    statsSection.innerHTML = `
      <div class="error-message">
        <p>⚠️ Error loading ocean data</p>
        <p>${error.message}</p>
      </div>
    `;
    console.error('Ocean stats loading error:', error);
  }
}