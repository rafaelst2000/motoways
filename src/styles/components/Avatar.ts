import { styled } from '@stitches/react'

export const AvatarContainer = styled('div', {
  borderRadius: 999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    borderRadius: 999,
  },

  variants: {
    variant: {
      xs: {
        width: 32,
        height: 32,
        background: 'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
      },
      sm: {
        width: 40,
        height: 40,
        background: 'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
      },
      lg: {
        width: 72,
        height: 72,
        background: 'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
      },
    },
  },
})
