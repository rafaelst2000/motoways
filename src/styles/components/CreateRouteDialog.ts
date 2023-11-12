import { styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  background: '#00000099',
})

export const DialogContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  width: 660,
  height: '100%',
  background: '$gray-800',
  boxShadow: '-4px 0px 30px 0px #00000080',
  padding: '24px 48px',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
})

export const DialogClose = styled(Dialog.Close, {
  color: '$gray-400',
  background: 'none',
  border: 'none',
  marginLeft: 'auto',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const CreateRouteDialogWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$gray-700',
  padding: '24px 32px',
  borderRadius: 10,

  h1: {
    fontSize: '1.25rem',
    color: '$gray-100',
    lineHeight: '140%',
    marginBottom: '1.125rem',
  },

  h2: {
    marginTop: '1.125rem',
    color: '$gray-100',
    fontSize: '1rem',
    lineHeight: '140%',
    marginBottom: '0.5rem',
  },
})

export const ActionsContainer = styled('div', {
  marginTop: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 8,

  button: {
    width: 40,
    height: 40,
    borderRadius: 4,
    background: '$gray-600',
    transition: '0.2s',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    svg: {
      width: 24,
      height: 24,
    },

    '&:not(:disabled):hover': {
      background: '$gray-500',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: '0.6',
    },
  },
})