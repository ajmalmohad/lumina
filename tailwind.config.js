const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'move-slow': 'move 40s ease infinite',
      },
      keyframes: {
        move: {
          '0%, 100%': { transform: 'translate(-30%, -30%)' },
          '40%': { transform: 'translate(30%, 20%)' },
          '70%': { transform: 'translate(-30%, 30%)' },
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
