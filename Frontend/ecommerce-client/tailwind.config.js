/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
  ],
  theme: {
    extend: {},
  },
  daisyui:{
    themes:[
      "light",
      "dark",
      "cupcake",
    ]
  },
  plugins: [
    require('daisyui')
  ],
}

