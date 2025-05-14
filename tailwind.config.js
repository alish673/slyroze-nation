/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonPurple: '#C084FC',
        neonGreen: '#32E875',
        darkGray: '#1E1E1E',
        slyrozePink: '#FF4FCC',
        slyrozeBlue: '#5CFFFF'
      },
      boxShadow: {
        neon: '0 0 10px rgba(192, 132, 252, 0.7), 0 0 20px rgba(192, 132, 252, 0.5)'
      },
      scale: {
        102: '1.02',
        105: '1.05',
      },
    },
  },
  plugins: [],
};
