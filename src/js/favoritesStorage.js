const STORAGE_KEY = "favoritePoems";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function addFavorite(poem) {
  const favorites = getFavorites();

  // prevent duplicates
  const exists = favorites.some(p => p.title === poem.title);
  if (exists) return;

  favorites.push(poem);
  saveFavorites(favorites);
}

export function removeFavorite(title) {
  const favorites = getFavorites().filter(p => p.title !== title);
  saveFavorites(favorites);
}