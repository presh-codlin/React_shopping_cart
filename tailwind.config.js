/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': {
          50: '#ffffff',
          100: '#f4f4f7',
          150: '#fefefe',
        },
        'orange': {
          300: '#ff8000',
        },
        'blue': {
          500: '#203040',
        },
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600', 
        bold: '700',
      },
      screens: {
        sm: {'max': '849px'},
        md: {'min': '500px'},
        'laptop': {'min': '850px'},
        'desktop': {'min': '1050px'},
        lg: {'min': '1980px'},
      }
    },
  },
  plugins: [], 
}
