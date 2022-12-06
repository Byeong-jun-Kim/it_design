const px0_10 = {...Array.from(Array(11)).map((_, i) => `${i}px`), DEFAULT: '1px'};
const px0_100 = {...Array.from(Array(101)).map((_, i) => `${i}px`)};
const px101_900_4 = Array.from(Array(201))
  .map((_, i) => i)
  .reduce((a, v) => ({...a, [v * 4 + 100]: `${v * 4 + 100}px`}));
const dinTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.tsx'],
  theme: {
    colors: {
      mint: '#00FFD2',
      purple: '#9B8AFF',
      pink: '#FF19BE',
      white: '#FFFFFF',
      black: '#000210',
      blue: '#0000FF',
      gray: {
        50: '#EFEFEF',
        100: '#DCDDDD',
        200: '#C9CACA',
        300: '#B5B5B6',
        400: '#9FA0A0',
        500: '#898989',
        600: '#727171',
        700: '#595757',
        800: '#3E3A39',
        900: '#231815',
        transparent: 'rgba(0, 2, 16, 0.65)',
      },
      klip: '#216FEA',
      transparent: 'transparent',
    },
    borderRadius: {
      0: 0,
      DEFAULT: 4,
      lg: 12,
      full: '555px',
    },
    fontSize: {
      h0: ['32px', '48px'],
      h1: ['24px', '32px'],
      h2: ['20px', '30px'],
      h3: ['18px', '27px'],
      b1: ['16px', '24px'],
      b2: ['14px', '21px'],
      c1: ['12px', '18px'],
      c2: ['10px', '15px'],
    },
    borderWidth: px0_10,
    extend: {
      fontFamily: {
        sans: ['AppleSDGothicNeoM00', ...dinTheme.fontFamily.sans],
        appleB: ['AppleSDGothicNeoB00'],
        appleEB: ['AppleSDGothicNeoEB00'],
        appleM: ['AppleSDGothicNeoM00'],
      },
      zIndex: {
        100: 100,
        200: 200,
        300: 300,
        1000: 1000,
      },
      spacing: {...px0_100, ...px101_900_4},
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
