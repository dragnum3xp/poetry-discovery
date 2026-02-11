import { loadHeaderFooter } from "./utils.mjs";
import "../css/style.css";


function setActiveNavLink() {
  const links = document.querySelectorAll(".main-nav a");
  const currentPath = window.location.pathname;

  links.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
}


async function init() {
  await loadHeaderFooter();
  setActiveNavLink();
}

init();