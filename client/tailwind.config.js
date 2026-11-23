import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    path.join(__dirname, 'index.html').replace(/\\/g, '/'),
    path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx}').replace(/\\/g, '/'),
  ],
  theme: {
    extend: {
      colors: {
        washi: {
          50: '#FCFCFA',
          100: '#F6F5F0',
          200: '#EBE9E1',
          300: '#DCD9CD',
          400: '#C2BEAF'
        },
        sumi: {
          700: '#383838',
          800: '#242424',
          850: '#1A1C20',
          900: '#14161A',
          950: '#0F1115'
        },
        vermilion: {
          500: '#C83C23',
          600: '#A82B14',
          700: '#8A1F0C'
        },
        indigoMuted: {
          500: '#4A5B78',
          600: '#38465E'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        jp: ['"Noto Serif JP"', '"Yu Mincho"', 'serif']
      }
    },
  },
  plugins: [],
};
