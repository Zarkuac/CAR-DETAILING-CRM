/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#4f46e5",
          purple: "#9333ea",
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #4f46e5, #9333ea)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}