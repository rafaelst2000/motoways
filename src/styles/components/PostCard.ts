import { styled } from '@stitches/react'

export const PostCardContainer = styled('div', {
  width: '100%',
  background: '$gray-700',
  borderRadius: 8,
  transition: '0.2s all',

  '&:not(:first-of-type)': {
    marginTop: 12,
  },

  '.base-info': {
    padding: '24px 24px 16px',
    display: 'grid',
    gridTemplateColumns: '40px 1fr 120px',
    gap: 16,

    img: {
      cursor: 'pointer',
    },

    h3: {
      fontSize: '1rem',
      fontWeight: '400',
      color: '$gray-100',
      lineHeight: '160%',
      cursor: 'pointer',

      '&:hover': {
        color: '$gray-300',
        textDecoration: 'underline',
      },
    },

    span: {
      fontSize: '0.875rem',
      fontWeight: '400',
      color: '$gray-400',
      lineHeight: '160%',
    },
  },

  '.card-content': {
    '&:hover': {
      background: '$gray-600',
    },
    borderRadius: '0 0 8px 8px',
    cursor: 'pointer',
    padding: '24px',
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

      display: '-webkit-box',
      '-webkit-line-clamp': 1,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    },

    span: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '160%',
      color: '$gray-400',
    },

    p: {
      maxHeight: 88,
      marginTop: 20,
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '160%',
      color: '$gray-300',

      display: '-webkit-box',
      '-webkit-line-clamp': 4,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    },
  },
})
