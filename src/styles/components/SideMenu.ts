import { styled } from '@stitches/react'

export const SideMenuContainer = styled('aside', {
  padding: '40px 0 20px',
  background:
    "$gray-700 url('/images/SideMenuBackground.png') no-repeat center",
  backgroundSize: 'cover',
  width: 232,
  borderRadius: 8,
  height: 'calc(100vh - 40px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'sticky',
  top: 20,

  '.logo': {
    cursor: 'pointer',
  },

  ul: {
    marginTop: '4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
    paddingLeft: '3rem',
    flex: 1,

    li: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '1rem',
      color: '$gray-400',
      cursor: 'pointer',
      transition: '0.3s all',

      '&:hover': {
        fontWeight: '700',
        color: '$gray-100',

        svg: {
          fill: '$gray-100 !important',
        },
      },
    },

    '.selected': {
      position: 'relative',
      fontWeight: '700',
      color: '$gray-100',

      '&:before': {
        content: '',
        width: 4,
        height: '100%',
        borderRadius: 999,
        background:
          'var(--gradient-vertical, linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%))',
        position: 'absolute',
        top: 0,
        left: -16,
      },
    },
  },

  '.user-container': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',

    p: {
      fontSize: '0.875rem',
      color: '$gray-200',
      cursor: 'pointer',
      transition: '0.2s',

      '&:hover': {
        textDecoration: 'underline',
      },
    },

    svg: {
      transition: '0.3s all',
      '&:hover': {
        cursor: 'pointer',
        fill: '$green-100',
      },
    },
  },

  '@media screen and (max-width: 1130px)': {
    display: 'none',
  },
})
