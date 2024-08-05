import { styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

export const DialogContent = styled(Dialog.Content, {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  height: '100vh',
  background: '$gray-800',
  zIndex: 999,
  padding: '24px 42px',

  '.dialog-content': {
    width: '100%',
    height: 'calc(100vh - 48px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    '.image-container': {
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      img: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      },

      '.arrow-icon': {
        position: 'absolute',
        cursor: 'pointer',
      },

      '.icon-right': {
        right: '0',
      },

      '.icon-left': {
        left: '0',
      },
    },
  },
})

export const DialogClose = styled('button', {
  color: 'white',
  background: 'none',
  border: 'none',
  marginLeft: 'auto',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 2000,
  position: 'absolute',
  right: '24px',
})
