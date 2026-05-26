/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        pretendard: [
          'Pretendard',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      fontWeight: {
        100: '100', // Thin
        200: '200', // ExtraLight
        300: '300', // Light
        400: '400', // Regular, font-normal
        500: '500', // Medium, font-medium
        600: '600', // SemiBold, font-semibold
        700: '700', // Bold, font-bold
        800: '800', // ExtraBold
        900: '900', // Black
      },
    },
  },
}
