export function initComments(poemId) {
  const container = document.querySelector(".comments");
  if (!container) return;

  container.innerHTML = `
    <h3>Comments</h3>

    <form class="comment-form">
      <input type="text" name="name" placeholder="Your name" required />
      <textarea name="comment" placeholder="Write a comment..." required></textarea>
      <button type="submit">Post</button>
    </form>

    <ul class="comment-list"></ul>
  `;

  const form = container.querySelector(".comment-form");
  const list = container.querySelector(".comment-list");

  const key = `comments-${poemId}`;
  const saved = JSON.parse(localStorage.getItem(key)) || [];

  function render() {
    list.innerHTML = saved
      .map(c => `<li><strong>${c.name}</strong>: ${c.text}</li>`)
      .join("");
  }

  render();

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const text = form.comment.value.trim();

    if (!name || !text) return;

    saved.push({ name, text });
    localStorage.setItem(key, JSON.stringify(saved));

    form.reset();
    render();
  });
}
