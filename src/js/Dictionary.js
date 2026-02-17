const form = document.querySelector("#dictionary-search");
const input = document.querySelector("#word-input");
const meaningEl = document.querySelector("#meaning");
const soundingEl = document.querySelector("#sounding");

async function fetchWord(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) throw new Error("Word not found");

    const data = await response.json();

    const entry = data[0];

    
    const definition =
      entry.meanings[0].definitions[0].definition;

    const phonetic = entry.phonetic || 
      (entry.phonetics[0] && entry.phonetics[0].text) || 
      "N/A";

    meaningEl.textContent = definition;
    soundingEl.textContent = phonetic;

  } catch (error) {
    meaningEl.textContent = "Word not found 😢";
    soundingEl.textContent = "";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const word = input.value.trim().toLowerCase();
  if (!word) return;

  fetchWord(word);
  form.reset();
});
