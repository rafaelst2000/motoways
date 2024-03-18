import { styled } from '@stitches/react'

export const BottomContainer = styled('aside', {
  '@media screen and (min-width: 1131px)': {
    display: 'none',
  },

  position: 'fixed',
  bottom: 0,
  left: 0,

  background:
    "$gray-700 url('/images/SideMenuBackground.png') no-repeat center",
  backgroundSize: 'cover',
  width: '100%',
  height: 50,
  borderRadius: '8px 8px 0 0',

  ul: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',

    li: {
      padding: '0 12px',
      cursor: 'pointer',
    },

    '.selected': {
      position: 'relative',

      '&:after': {
        content: '',
        width: 28,
        height: 4,
        borderRadius: 999,
        background:
          'var(--gradient-vertical, linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%))',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  },
})
