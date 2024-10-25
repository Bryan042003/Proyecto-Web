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

    ]
  },
  plugins: [
    require('daisyui')
  ],
}

