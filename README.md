# React + Vite
```
 npx create vite@latest res-client -- --template react
 npm install react-router-dom localforage match-sorter sort-by
 npm install -D tailwindcss@3 postcss autoprefixer
 npx tailwindcss init -p
 npm i -D daisyui@latest

tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

index.css
@tailwind base;
@tailwind components;
@tailwind utilities;


if you get a eslint
In your .eslintrc.js file
env: {
   browser: true,
   node: true,    <<<<--- Add this
   es6: true
 }

 rules:{
  "react/prop-type": "off"
 }
 
```

# res-client
