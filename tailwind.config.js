/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff", // White background
      },
      fontFamily:{
        
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1E3A8A",
          "secondary": "#9333EA",
          "accent": "#FACC15",
          "neutral": "#3D4451",
          "base-100": "#ffffff", // White background
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
    darkTheme: "mytheme",
  },
};