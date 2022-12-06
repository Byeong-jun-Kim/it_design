const colors = {
  blue: '#0000FF',
  green: '#00FF00',
  pink: '#FF00FF',
  white: '#FFFFFF',
  black: '#000000',
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
    transparent: 'rgba(	0, 2, 16, 0.65)',
  },
  klip: '#216FEA',
};

export default colors;
export type TColor = keyof typeof colors;
