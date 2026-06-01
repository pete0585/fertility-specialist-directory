import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFAF7',
          100: '#F9F3EC',
          200: '#F2E8D9',
        },
        teal: {
          DEFAULT: '#1A6B6B',
          50: '#E8F4F4',
          100: '#C4E0E0',
          200: '#8EC2C2',
          300: '#5AABAB',
          400: '#2D8E8E',
          500: '#1A6B6B',
          600: '#155656',
          700: '#0F4040',
          800: '#092B2B',
          900: '#041515',
        },
        gold: {
          DEFAULT: '#C8993A',
          50: '#FBF4E3',
          100: '#F5E3B3',
          200: '#EAC96A',
          300: '#DEB04A',
          400: '#C8993A',
          500: '#A87D2E',
          600: '#866224',
          700: '#644819',
        },
        coral: {
          DEFAULT: '#E07B6A',
          50: '#FDF1EF',
          100: '#F8D7D2',
          200: '#F0AEA5',
          300: '#E88578',
          400: '#E07B6A',
          500: '#D15E4C',
          600: '#B8493A',
          700: '#8F382C',
        },
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
