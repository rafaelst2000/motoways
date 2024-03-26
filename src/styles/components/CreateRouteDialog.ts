import { styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  background: '#00000099',
  zIndex: 999,
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
  zIndex: 1000,

  '@media screen and (max-width: 1130px)': {
    width: '100%',
    padding: '12px 24px',
  },
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

  '@media screen and (max-width: 600px)': {
    padding: '16px',
  },

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

  '.input-stop': {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },

  '.route-info': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    '.route-info-item': {
      display: 'flex',
      alignItems: 'center',
      gap: 16,

      p: {
        fontSize: '0.875rem',
        color: '$gray-300',
        lineHeight: '160%',
        fontWeight: '400',
      },
      h3: {
        fontSize: '1rem',
        color: '$gray-200',
        lineHeight: '140%',
        fontWeight: '700',
      },
    },
  },

  'input[type="file"]': {
    display: 'none',
  },
  '.input-file': {
    content: '',
    width: 130,
    height: 130,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    background: '$gray-800',
    border: '1px solid $gray-500',
    borderRadius: 4,

    fontSize: 14,
    color: '$gray-100',
    cursor: 'pointer',
    transition: '0.2s',

    '&:hover': {
      background: '$gray-700',
    },
  },

  '.imgs-container': {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',

    img: {
      borderRadius: 4,
    },
  },

  '.upload-img-preview': {
    width: 130,
    height: 130,
    position: 'relative',

    '&:hover': {
      cursor: 'pointer',
      '.overlay': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 130,
        height: 130,
        background: 'rgba(0,0,0,0.8)',
        borderRadius: 4,
      },
    },

    '.overlay': {
      display: 'none',
    },
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

export const AddContainer = styled('div', {
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
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
