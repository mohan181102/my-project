/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      
    } ,
    screens: {
      'sm': {'max':'640px'},
      // => @media (min-width: 640px) { ... }

      'md': {'max':'768px'},
      // => @media (min-width: 768px) { ... }

      'lg': {'max':'1024px'},
      // => @media (min-width: 1024px) { ... }

      'xl': {'max':'1280px'},
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },   

  },
  plugins: [
    require('autoprefixer')
  ],
}

