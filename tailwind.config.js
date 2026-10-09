/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1f4d36',
        leaf: '#5f9f45',
        paper: '#f7f6f1',
        beige: '#ebe5d6',
        line: '#e0dccd',
        ink: '#1b2a21',
        mute: '#5f6e64',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
