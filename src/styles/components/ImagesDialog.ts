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

  '@media screen and (max-width: 1130px)': {
    width: '100%',
    padding: '12px 24px',
  },

  '.dialog-content': {
    width: '100%',
    height: 'calc(100vh - 48px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '@media screen and (max-width: 1130px)': {
      height: 'calc(100vh - 24px)',
    },
  },

  '.carrousel-container-images': {
    width: '100% !important',
  },

  '.slick-prev, .slick-next': {
    width: 42,
    height: 42,
  },

  '.images-slide-container': {
    height: 'calc(100vh - 48px)',
    width: '100%',
    display: 'flex !important',
    alignItems: 'center',
    justifyContent: 'center',

    '@media screen and (max-width: 1130px)': {
      height: 'calc(100vh - 24px)',
    },

    '.images-slide-image-container': {
      width: '100% !important',
      height: '100% !important',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 24px',

      img: {
        display: 'block',
        maxWidth: '100%',
      },
    },
  },
})

export const DialogClose = styled('button', {
  color: '$gray-400',
  background: 'none',
  border: 'none',
  marginLeft: 'auto',
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
})
