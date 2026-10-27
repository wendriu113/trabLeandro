/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        educa: {
          deepBlue: '#245B78',
          midBlue: '#2F6F91',
          darkBlue: '#1a4156',
          lightBlue: '#3d86ad',
          yellow: '#FFC400',
          yellowHover: '#e6b000',
          green: '#20A765',
          greenHover: '#1b8e56',
          lightGray: '#EAF2F6',
          cardBg: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'game': '0 4px 14px 0 rgba(0, 0, 0, 0.25)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
