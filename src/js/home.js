import { initComments } from "./comments.js";
import { addFavorite } from "./favoritesStorage.js";

const MAX_CHARS = 1000;     

function truncatePoemLines(lines, maxChars) {
  let charCount = 0;
  const truncated = [];

  for (const line of lines) {
    if (charCount + line.length > maxChars) break;
    truncated.push(line);
    charCount += line.length;
  }

  return truncated;
}

function formatSearchInput(input) {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

async function searchPoemByTitle(title) {
  const container = document.querySelector(".r-poem");
  if (!container) return;

  try {
    const formatted = formatSearchInput(title);
    const response = await fetch(
      `https://poetrydb.org/title/${encodeURIComponent(formatted)}`
    );

    if (!response.ok) throw new Error("No poem found");

    const data = await response.json();
    renderPoem(data[0]);

  } catch (error) {
    container.innerHTML = `<p>No poem found 😢</p>`;
    console.error(error);
  }
  history.pushState(null, "", `?title=${encodeURIComponent(title)}`);
}

function renderPoem(poem) {
  const container = document.querySelector(".r-poem");
  if (!container) return;

  const totalChars = poem.lines.join("").length;
  const isTruncated = totalChars > MAX_CHARS;

  const visibleLines = isTruncated
    ? truncatePoemLines(poem.lines, MAX_CHARS)
    : poem.lines;

  const html = `
    <h2>${poem.title}</h2>
    <p><em>${poem.author}</em></p>

    <div class="poem-body">
      ${visibleLines.map(line => `<p>${line}</p>`).join("")}
    </div>

    ${
      isTruncated
        ? `<button class="read-more">Read full poem</button>`
        : ""
    }

    <button class="favorite-btn">⭐ Add to Favorites</button>
  `;

  renderPoemWithTransition(container, html, () => {

    
    if (isTruncated) {
      document.querySelector(".read-more").addEventListener("click", () => {
        document.querySelector(".poem-body").innerHTML =
          poem.lines.map(line => `<p>${line}</p>`).join("");
        document.querySelector(".read-more").remove();
      });
    }

    
    document.querySelector(".favorite-btn")
      .addEventListener("click", () => {
        addFavorite({
          title: poem.title,
          author: poem.author
        });

        document.querySelector(".favorite-btn").textContent = "⭐ Saved!";
      });

    
    initComments(poem.title);

  });
}


function renderPoemWithTransition(container, html, afterRender) {
  container.classList.add("fade-out");

  setTimeout(() => {
    container.innerHTML = html;

    container.classList.remove("fade-out");
    container.classList.add("fade-in");

    if (afterRender) afterRender();

    setTimeout(() => {
      container.classList.remove("fade-in");
    }, 400);

  }, 400);
}

async function loadPoem() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");

  if (title) {
    await searchPoemByTitle(title);
  } else {
    try {
      const response = await fetch("https://poetrydb.org/random");
      const data = await response.json();
      renderPoem(data[0]);
    } catch (error) {
      console.error(error);
    }
  }
}


loadPoem();

function initSearch() {
  const form = document.querySelector("#poem-search");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const input = form.querySelector("input").value;
    searchPoemByTitle(input);
    form.reset();
  });
}

initSearch();