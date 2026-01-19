const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  window.location.href = "main.html";
}

fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
  .then(res => res.json())
  .then(res => {
    const art = res.data;

    document.getElementById("artImage").src =
      `https://www.artic.edu/iiif/2/${art.image_id}/full/800,/0/default.jpg`;

    document.getElementById("title").textContent =
      art.title || "Untitled";

    document.getElementById("artist").textContent =
      art.artist_display || "Unknown artist";

    document.getElementById("year").textContent =
      art.date_display || "N/A";

    document.getElementById("medium").textContent =
      art.medium_display || "N/A";

    document.getElementById("dimension").textContent =
      art.dimensions || "N/A";

    document.getElementById("description").textContent =
      art.thumbnail?.alt_text ||
      "This artwork is part of the Art Institute of Chicago collection.";
  });

