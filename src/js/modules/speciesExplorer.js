import SpeciesData from "./speciesData.js";
import ImageService from "./imageService.js";
import Favorites from "./favorites.js";

// Generates a species card with a favorites button
function createSpeciesCard(species, imageUrl, isFavorite = false) {
  return `
    <article class="species-card">
      ${imageUrl ? `<img src="${imageUrl}" alt="${species.scientificname} image" />` : ""}
      <h3>${species.scientificname}</h3>
      <p><strong>Rank:</strong> ${species.rank}</p>
      <p><strong>Authority:</strong> ${species.authority || "N/A"}</p>
      <p><strong>Status:</strong> ${species.status || "Unknown"}</p>
      <button class="add-favorite" data-id="${species.lsid}" data-name="${species.scientificname}" ${isFavorite ? "disabled" : ""}>
        ${isFavorite ? "Added!" : "Add to Favorites"}
      </button>
    </article>
  `;
}

// Renders all species cards and sets up favorite functionality
async function renderSpeciesList(speciesList) {
  const resultsContainer = document.getElementById("species-results");
  resultsContainer.innerHTML = "";

  const favorites = new Favorites();

  if (speciesList.length === 0) {
    resultsContainer.innerHTML = "<p>No species found.</p>";
    return;
  }

  for (const species of speciesList) {
    const image = await ImageService.fetchImage(species.scientificname);
    const isFav = favorites.isFavorite(species.lsid);
    resultsContainer.innerHTML += createSpeciesCard(species, image, isFav);
  }

  setupFavoriteButtons();
}

// Adds click event listeners to all favorite buttons
function setupFavoriteButtons() {
  const favorites = new Favorites();
  const buttons = document.querySelectorAll(".add-favorite");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const name = button.dataset.name;

      favorites.addFavorite({ id, name });
      button.textContent = "Added!";
      button.disabled = true;
    });
  });
}

// Initializes the species search functionality
function setupSpeciesExplorer() {
  const form = document.getElementById("species-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const term = document.getElementById("species-input").value.trim();
    if (!term) return;

    const speciesList = await SpeciesData.searchSpecies(term);
    renderSpeciesList(speciesList);
  });
}

export default setupSpeciesExplorer;

