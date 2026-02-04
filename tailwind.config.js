/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baby-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'ivory': '#faf9f6',
        'nude': '#e8dcc6',
        'charcoal': '#2c2c2c',
        'dark-blue': '#0a1628',
      },
    },
    fontFamily: {
      sans: ['Cabin', 'system-ui', 'sans-serif'],
      serif: ['Cabin', 'sans-serif'],
      mono: ['Cabin', 'monospace'],
    },
  },
  plugins: [],
}
