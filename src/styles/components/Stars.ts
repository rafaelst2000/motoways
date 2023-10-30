import { styled } from '@stitches/react'

export const StarsContainer = styled('div', {
  display: 'flex',
  alignContent: 'center',
  gap: 4,

  svg: {
    color: '$purple-100',
    boxSizing: 'content-box',

    '&:first-child': {
      paddingLeft: 0,
    },
  },

  variants: {
    size: {
      sm: {
        svg: {
          padding: '0 2px',
          width: 14,
          height: 14,
        },
      },
      md: {
        svg: {
          padding: '0 3px',
          width: 20,
          height: 20,
        },
      },
      lg: {
        svg: {
          padding: '0 2px',
          width: 24,
          height: 24,
        },
      },
    },
  },
})
