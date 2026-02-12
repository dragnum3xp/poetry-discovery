import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        favorites: resolve(__dirname, "favorites/index.html"),
        dictionary: resolve(__dirname, "dictionary/index.html"),
      },
    },
  },
});