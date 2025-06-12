// src/js/modules/statsView.js

export default async function loadOceanStats() {
  const statsSection = document.getElementById('stats-container');
  statsSection.innerHTML = `<p>Loading ocean stats...</p>`;

  try {
    const response = await fetch('/src/data/oceanStats.json');
    if (!response.ok) throw new Error('Failed to load ocean stats data.');

    const data = await response.json();

    const statsHtml = data.stats.map(stat => `
      <div class="stats-card">
        <h3>${stat.title}</h3>
        <p><strong>${stat.value}</strong></p>
        <p>${stat.description}</p>
      </div>
    `).join('');

    statsSection.innerHTML = `
      <div class="stats-grid">
        ${statsHtml}
      </div>
    `;

  } catch (error) {
    statsSection.innerHTML = `<p>Error loading data: ${error.message}</p>`;
    console.error(error);
  }
}
