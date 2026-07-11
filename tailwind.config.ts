import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FBF3E7',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#E14D2A',
          dark: '#C13A1B',
          light: '#F2775A',
        },
        accent: {
          DEFAULT: '#F4A340',
          dark: '#DB8A28',
        },
        ink: {
          DEFAULT: '#2B211C',
          soft: '#6B5B50',
          faint: '#A99A8E',
        },
        line: '#EDE0D0',
        positive: '#3E8E5A',
        negative: '#D64545',
      },
      borderRadius: {
        card: '20px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 2px 10px rgba(43, 33, 28, 0.06)',
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
