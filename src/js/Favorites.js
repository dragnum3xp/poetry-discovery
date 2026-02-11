import { getFavorites, removeFavorite } from "./favoritesStorage.js";

function renderFavorites() {
  const list = document.querySelector(".poem-list");
  if (!list) return;

  const favorites = getFavorites();

  if (favorites.length === 0) {
    list.innerHTML = "<p>No favorites yet ⭐</p>";
    return;
  }

  list.innerHTML = favorites.map(poem => `
    <li>
        <a href="/index.html?title=${encodeURIComponent(poem.title)}" class="favorite-link">
            <strong>${poem.title}</strong> — ${poem.author}
        </a>
        <button data-title="${poem.title}" class="remove-btn">Remove</button>
    </li>
  `).join("");

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFavorite(btn.dataset.title);
      renderFavorites();
    });
  });
}

renderFavorites();