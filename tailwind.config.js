/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backdropBlur: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
      },
      colors: {
        green: {
          100: "#e6f7f0",
          200: "#ccf0e1",
          300: "#99e1c3",
          400: "#66d2a5",
          500: "#33c387",
          600: "#00b469",
          700: "#009456",
          800: "#007342",
          900: "#00532e",
        },
        gray: {
          100: "#f7fafc",
          200: "#edf2f7",
          300: "#e2e8f0",
          400: "#cbd5e0",
          500: "#a0aec0",
          600: "#718096",
          700: "#4a5568",
          800: "#2d3748",
          900: "#1a202c",
        },
        white: "#ffffff",
        transparent: "transparent",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        atkinson: ['Atkinson Hyperlegible', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
        opendyslexic: ['OpenDyslexic', 'sans-serif'],
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'glass': 'rgba(255, 255, 255, 0.2)',
      }),
      borderColor: theme => ({
        ...theme('colors'),
        'glass': 'rgba(255, 255, 255, 0.3)',
      }),
    },
  },
  plugins: [
    '@tailwindcss/forms',
    'tailwindcss-animate',
    '@tailwindcss/typography',
    'tailwindcss',
    'autoprefixer',
  ],
};
