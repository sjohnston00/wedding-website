/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        'great-vibes': ['Great Vibes'],
        'times-new-roman': ['Times New Roman', 'Times', 'serif']
      },
      colors: {
        sage: '#5e8e76',
        'dark-sage': '#50846A'
      },
      animation: {
        show: 'show 1s forwards ease'
      },
      keyframes: {
        show: {
          '100%': { transform: 'translateY(0px)', opacity: '1' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
