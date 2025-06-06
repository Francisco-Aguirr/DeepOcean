// this file conects to the API from wich species are bring to the app scoup
const WORMS_BASE_URL = "https://www.marinespecies.org/rest";

export default class SpeciesData {
  static async searchSpecies(term) {
    try {
      const response = await fetch(`${WORMS_BASE_URL}/AphiaRecordsByName/${term}?like=true&marine_only=true`);
      if (!response.ok) throw new Error("Failed to fetch species data");
      return await response.json();
    } catch (error) {
      console.error("Error fetching species:", error);
      return [];
    }
  }

  static async getSpeciesById(id) {
    try {
      const response = await fetch(`${WORMS_BASE_URL}/AphiaRecordByID/${id}`);
      if (!response.ok) throw new Error("Failed to fetch species by ID");
      return await response.json();
    } catch (error) {
      console.error("Error fetching species by ID:", error);
      return null;
    }
  }
}
