// src/js/imageService.js
const UNSPLASH_API_KEY = "TU_API_KEY"; // Reemplaza con tu API key real

const ImageService = {
  async fetchImage(query) {
    const endpoint = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(
      query
    )}&client_id=${UNSPLASH_API_KEY}&orientation=squarish`;

    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Image fetch failed");
      const data = await res.json();

      return data.results[0]?.urls?.small || null;
    } catch (error) {
      console.error("Unsplash error:", error);
      return null;
    }
  },
};

export default ImageService;
