import theme from 'styled-theming';

export const backgroundColor = theme('mode', {
  light: '#fafafa',
  dark: '#222'
});

export const textColor = theme('mode', {
  light: '#000',
  dark: '#fff'
});

export const invertedTextColor = theme('mode', {
  dark: 'grey',
  light: '#fff'
});

export const boxShadow = theme('mode', {
  dark:
    '0 1px 2px 0 rgba(195, 191, 188, 0.302), 0 1px 3px 1px rgba(195, 191, 188, 0.149)',
  light:
    '0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 1px 3px 1px rgba(60, 64, 67, 0.149)'
});
