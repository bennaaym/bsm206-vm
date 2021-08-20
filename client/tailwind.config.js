module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      light:{
        background:{
          100:'#fff',
          200:'#F9FAFB',
          300:'#F3F4F6'

        },
        text:{
          300:'#111827'
        },
        accent:'#3B82F6'
      },

      dark:{
        background:{
          100:'#111827',
          200:'#111827',
          300:'#1F2937',
          400:'#1F2937'
        },
        text:{
          300:'#fff'
        },
        accent:'#3B82F6'

      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
