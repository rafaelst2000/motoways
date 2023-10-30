import { styled } from '@stitches/react'

export const FeedContainer = styled('main', {
  padding: 20,
  display: 'grid',
  gridTemplateColumns: '232px 1fr 324px',
  gap: '4rem',

  '.center-content': {
    paddingTop: '3.5rem',
    '.page-title': {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '2.5rem',
      gap: 12,

      h1: {
        fontSize: '1.5rem',
        color: '$gray-100',
        fontWeight: 'bold',
      },
    },

    h2: {
      fontSize: '0.875rem',
      fontWeight: '400',
      color: '$gray-100',
      marginBottom: '1rem',
    },

    '.recent': {
      marginTop: '3rem',
    },
  },

  '.side-content': {
    paddingTop: '3.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',

    button: {
      background: '$gray-600',
      border: 'none',
      color: '$gray-200',
      fontSize: '0.875rem',
      fontWeight: '700',
      lineHeight: 1,
      padding: '12px 20px',
      gap: '8px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '8px',
      transition: '0.2s all',

      '&:hover': {
        transform: 'scale(1.03)',
        background: '$gray-700',
      },
    },

    '.section-title': {
      margin: '2.5rem 0 1rem',
      width: '100%',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      h2: {
        fontSize: '0.875rem',
        fontWeight: '400',
        color: '$gray-100',
      },

      p: {
        padding: '4px 8px',
        color: '$purple-100',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transition: '0.2s all',

        '&:hover': {
          color: '$purple-200',

          svg: {
            fill: '$purple-200',
          },
        },
      },
    },
  },
})
