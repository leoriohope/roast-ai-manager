import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F0ECD9',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#3C2018',
          dark: '#26140E',
          light: '#6B4636',
        },
        accent: {
          DEFAULT: '#869247',
          dark: '#5C6B2E',
        },
        ink: {
          DEFAULT: '#2A1810',
          soft: '#6B5346',
          faint: '#A8998A',
        },
        line: '#DDD6BE',
        positive: '#3E8E5A',
        negative: '#D64545',
      },
      borderRadius: {
        card: '20px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 2px 10px rgba(42, 24, 16, 0.08)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config
