/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F0E8D0',
        'cream-alt': '#E6DCC0',
        sand: '#BCA98A',
        rust: '#B94A1C',
        'rust-hover': '#D05520',
        brown: '#2E1E12',
        'brown-mid': '#5C3D28',
        ink: '#1C0F08',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        body: ['"EB Garamond"', 'serif'],
      },
      keyframes: {
        sline: {
          '0%': { transform: 'scaleY(0)', opacity: '0', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', opacity: '1' },
          '100%': { transform: 'scaleY(0)', opacity: '0', transformOrigin: 'bottom' },
        },
        blobFloat: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(20px,-20px) scale(1.05)' },
        },
      },
      animation: {
        sline: 'sline 2s ease-in-out infinite',
        blobFloat: 'blobFloat 10s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};