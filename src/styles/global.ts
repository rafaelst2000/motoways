import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    'box-sizing': 'border-box',
  },

  html: {
    'scroll-behavior': 'smooth',
  },

  'body, button, input, textarea': {
    fontFamily: '$nunito',
  },

  body: {
    backgroundColor: '$gray-800',
    color: '$gray-100',
  },

  ul: {
    listStyle: 'none',
  },

  a: {
    textDecoration: 'none',
  },

  button: {
    cursor: 'pointer',
    outline: 'none',
  },
})
