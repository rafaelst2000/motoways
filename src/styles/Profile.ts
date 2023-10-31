import { styled } from '@stitches/react'

export const ProfileContainer = styled('main', {
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
  },

  '.side-content': {
    '.content': {
      padding: '0 3.5rem 1.25rem',
      borderLeft: '1px solid $gray-700',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    paddingTop: '8rem',

    h2: {
      marginTop: 20,
      fontSize: '1.25rem',
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

    '.separator': {
      width: 32,
      height: 4,
      margin: '32px auto',
      background: '$gradient-horizontal',
      borderRadius: 999,
    },

    '.info-item': {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      width: '100%',

      '&:not(:first-of-type)': {
        marginTop: '2.5rem',
      },

      h3: {
        fontSize: '1rem',
        fontWeight: '700',
        lineHeight: '140%',
        color: '$gray-200',
      },

      p: {
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '160%',
        color: '$gray-300',
      },
    },
  },
})
