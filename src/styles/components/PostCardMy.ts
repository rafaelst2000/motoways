import { styled } from '@stitches/react'

export const PostCardMyContainer = styled('div', {
  width: '100%',
  background: '$gray-600',
  borderRadius: 8,
  padding: '20px 24px',
  transition: '0.2s',
  cursor: 'pointer',

  '&:not(:first-of-type)': {
    marginTop: 12,
  },

  '&:hover': {
    background: '$gray-500',
  },

  span: {
    fontSize: '0.875rem',
    fontWeight: '400',
    color: '$gray-400',
    lineHeight: '160%',
    display: 'block',
    marginBottom: 12,
  },

  '.card-content': {
    height: 152,
    display: 'flex',
    gap: 20,
    img: {
      borderRadius: 4,
    },

    '.card-info': {
      display: 'flex',
      justifyContent: 'space-between',
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
      maxHeight: 44,
      marginTop: 24,
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '160%',
      color: '$gray-300',

      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    },
  },
})
