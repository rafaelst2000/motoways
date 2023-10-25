import { styled } from '@stitches/react'

export const HomeContainer = styled('main', {
  display: 'grid',
  padding: 20,
  gridTemplateColumns: '37.5rem 1fr',
  gap: 20,

  '.image-container': {
    width: '100%',
    height: '100%',

    '.image': {
      display: 'block !important',
      width: '100% !important',
      height: '100% !important',

      objectFit: 'cover !important',
      borderRadius: '8px',
    },
  },

  '.login-box': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '> div': {
      maxWidth: '372px',
    },

    h1: {
      fontSize: '1.5rem',
      lineHeight: '140%',
    },
    p: {
      fontSize: '1rem',
      lineHeight: '160%',
      color: '$gray-200',
      marginBottom: '2.5rem',
    },

    '.margin': {
      marginBottom: '1rem',
    },
  },

  '@media screen and (max-width: 990px)': {
    gridTemplateColumns: '1fr 372px',
  },
})

export const HomeButton = styled('button', {
  background: '$gray-600',
  border: 'none',
  color: '$gray-200',
  fontSize: '1.125rem',
  fontWeight: '700',
  lineHeight: '160%',
  padding: '20px 24px',
  width: '100%',
  gap: '20px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '8px',

  '&:hover': {
    transition: '0.2s all',
    transform: 'scale(1.03)',
    background: '$gray-700',
  },
})
