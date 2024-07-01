import { styled } from '@stitches/react'

export const ExploreContainer = styled('main', {
  padding: 20,
  display: 'grid',
  gridTemplateColumns: '232px 1fr',
  gap: '4rem',

  '.center-content': {
    paddingTop: '3.5rem',

    '.title-container': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 20,
    },

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

  '.cards': {
    display: 'grid',
    gap: 20,
    gridTemplateColumns: 'repeat(auto-fit, 350px)',
  },

  '@media screen and (max-width: 1130px)': {
    gridTemplateColumns: '1fr',

    '.page-title': {
      marginBottom: '0.5rem !important',
    },
    paddingBottom: '4rem',
    '.center-content': {
      paddingTop: '0',
    },
  },

  '@media screen and (max-width: 768px)': {
    '.cards': {
      display: 'grid',
      gap: 20,
      gridTemplateColumns: '1fr',
    },

    '.title-container': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0 !important',
    },
  },
})

export const TagsContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  marginTop: 40,
  marginBottom: 48,

  '@media screen and (max-width: 1130px)': {
    margin: '1rem 0',
  },
})
