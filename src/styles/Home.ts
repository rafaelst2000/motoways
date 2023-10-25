import { styled } from '@stitches/react'

export const HomeContainer = styled('main', {
  padding: 20,
  display: 'flex',
  gap: 20,
  height: '100vh',
  overflow: 'hidden',

  '.image': {
    maxWidth: '550px',
    maxHeight: '100%',
    borderRadius: '8px',
  },

  '.login-box': {
    flex: 1,
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

    '.logo-container': {
      display: 'none',
    },
  },

  '@media screen and (max-width: 950px)': {
    '.image': {
      maxWidth: '400px',
      maxHeight: '100%',
      borderRadius: '8px',
    },
  },

  '@media screen and (max-width: 800px)': {
    '.image': {
      display: 'none',
    },
    '.logo-container': {
      display: 'block !important',
      textAlign: 'center',
      marginBottom: '1rem',

      '.logo': {
        maxWidth: '200px',
      },
    },
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
