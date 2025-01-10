/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',

        primary: {
          DEFAULT: '#18314f',
          50: '#f0f4fa',
          100: '#e0eaf5',
          300: '#4975aa',
          700: '#08111c',
        },

        secondary: {
          DEFAULT: '#4a4fb5',
          50: '#f5f5fb',
          100: '#ebebf7',
          300: '#7e82ca',
          700: '#353981',
        },

        tertiary: {
          DEFAULT: '#3d4863',
          50: '#f9f9f9',
          100: '#f3f3f3',
          300: '#a3acc2',
          700: '#1c2a4c',
        },

        blue: {
          DEFAULT: '#4285f4',
          50: '#e7f3ff',
          100: '#f1f8ff',
          300: '#8ab4f8',
          700: '#1860d8',
        },

        green: {
          DEFAULT: '#34a853',
          50: '#e6f4ea',
          100: '#d2ecd8',
          300: '#81c995',
          700: '#108b31',
        },

        yellow: {
          DEFAULT: '#f9ab00',
          50: '#fff8e1',
          100: '#ffecb3',
          300: '#fde293',
          700: '#c58700',
        },

        red: {
          DEFAULT: '#ea4335',
          50: '#fce8e6',
          100: '#f9d7d5',
          300: '#f28b82',
          700: '#c51708',
        },
      },
    },
  },
  plugins: [],
};
