/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003366',
          light: '#004080',
          dark: '#002244',
        },
        secondary: {
          DEFAULT: '#FF6600',
          light: '#FF8533',
          dark: '#CC5200',
        },
        surface: '#F3F4F6',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto']
      }
    }
  },
  plugins: []
}
