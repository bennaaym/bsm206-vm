module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      light:{
        background:{
          100:'#fff',
          200:'#fbfbfb',
          300:'f5f5f5',
        },
        text:{
          300:'#111827'
        },
        accent:'#0556F3'
      },

      dark:{
        background:{
          100:'#1F2023',
          200:'#2D2F34',
          300:'#1C2130',
          400:'#383B40',
        },
        text:{
          300:'#fff'
        },
        accent:'#0556F3'

      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
