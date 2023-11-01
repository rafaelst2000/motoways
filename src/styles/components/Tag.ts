import { styled } from '..'

export const TagContainer = styled('button', {
  background: 'none',
  color: '$purple-100',
  border: '1px solid $purple-100',
  padding: '4px 16px',
  borderRadius: 999,
  transition: '0.2',

  '&:hover': {
    color: '$gray-100',
    background: '$purple-200',
  },

  variants: {
    active: {
      true: {
        color: '$gray-100',
        background: '$purple-200',
        borderColor: '$purple-200',
      },
    },
  },
})
