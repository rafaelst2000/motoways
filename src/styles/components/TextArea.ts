import { styled } from '@stitches/react'

export const TextAreaContainer = styled('div', {
  background: '$gray-800',
  border: '1px solid $gray-500',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  borderRadius: 4,
  color: '$gray-500',
  transition: '0.2s',

  '&:focus-within': {
    color: '$green-200',
  },

  textarea: {
    flex: 1,
    padding: '14px 20px',
    border: 'none',
    background: 'none',
    color: '$gray-100',
    fontSize: '0.875rem',
    resize: 'none',
    minHeight: 136,

    '&::placeholder': {
      color: '$gray-400',
    },

    '&:focus': {
      outline: 'none',
    },
  },

  span: {
    color: '$gray-400',
    fontSize: 12,
    marginLeft: 'auto',
    paddingRight: 8,
    paddingBottom: 4,
  },
})
