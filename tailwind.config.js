/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./*.html",
      "./_includes/**/*.html",
      "./_layouts/**/*.html",
      "./_posts/**/*.md",
      "./**/*.ipynb"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  /** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./*.html",
      "./**/*.html",
      "./**/*.ipynb",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  