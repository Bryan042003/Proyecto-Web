/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
    ]
  },
  plugins: [
    require('daisyui')
  ],
}

