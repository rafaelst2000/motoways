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
})
