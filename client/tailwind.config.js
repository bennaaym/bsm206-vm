module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    colors:{

      error:'#EF4444',

      light:{
        background:{
          100: '#F9FAFB',
          200: '#E5E7EB',
          300: '#F9FAFB',
          400: '#F3F4F6',
        },
        text:{
          300:'#111827'
        },
        accent:'#3B82F6',
        
        keyword:'#0018FF',
        symbol:'#318495',
        number:'#C5060B',
        comment:'#4C886B',
        line:'#D1D5DB'
      },

      dark:{
        background:{
          100:'#111827',
          200:'#111827',
          300:'#1F2937',
          400:'#1F2937'

        },
        text:{
          300:'#E5E7EB'
        },
        accent:'#3B82F6',
        
        keyword:'#FFB86C',
        symbol:'#CCCCCC',
        number:'#F1FA8C',
        comment:'#D1D5DB',
        line:'#111827'

      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
