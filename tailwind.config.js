/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF8',
        surface: '#FFFFFF',
        'surface-dark': '#1F1C19',
        primary: '#1F1C19',
        secondary: '#6E665E',
        accent: '#E0A96D',
        'accent-soft': '#F5E7D3',
        'accent-rose': '#E9C5B9',
        border: '#E6E1D9',
        'border-dark': '#D7D0C6',
        highlight: '#F7F0E5',
        ink: '#1F1C19',
      },
      fontFamily: {
        'sans': ['Sora-Regular'],
        'medium': ['Sora-Medium'],
        'semibold': ['Sora-SemiBold'],
        'bold': ['Sora-Bold'],
      },
      borderRadius: {
        'card': '16px',
        'button': '24px',
        'input': '12px',
      },
    },
  },
  plugins: [],
};
