import { styled, keyframes } from '@stitches/react'

const spin = keyframes({
  '0': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const LoadingContainer = styled('div', {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Loader = styled('div', {
  border: '8px solid $gray-600',
  borderTop: '8px solid $green-100',
  borderRadius: '50%',
  width: 80,
  height: 80,
  animation: `${spin} 2s linear infinite`,
})
