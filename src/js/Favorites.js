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
    <li class="favorite-item">
      <a href="/?title=${encodeURIComponent(poem.title)}">
        <strong>${poem.title}</strong> — ${poem.author}
      </a>

      <span class="scroll-icon">📜</span>

      <button class="remove-btn">Remove</button>
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