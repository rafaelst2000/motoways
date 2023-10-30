import { styled } from '@stitches/react'

export const PostCardMinContainer = styled('div', {
  width: '100%',
  background: '$gray-700',
  borderRadius: 8,
  padding: '16px 20px',
  cursor: 'pointer',
  transition: '0.2s all',

  '&:hover': {
    background: '$gray-600',
  },

  '&:not(:first-of-type)': {
    marginTop: 12,
  },

  '.card-content': {
    display: 'flex',
    gap: 20,
    img: {
      borderRadius: 4,
    },

    h4: {
      fontSize: '1rem',
      fontWeight: '700',
      lineHeight: '140%',
      color: '$gray-100',
    },

    span: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '160%',
      color: '$gray-400',
    },

    '.card-info': {
      display: 'flex',
      flexDirection: 'column',

      '.card-title': {
        flex: 1,
      },
    },
  },
})
