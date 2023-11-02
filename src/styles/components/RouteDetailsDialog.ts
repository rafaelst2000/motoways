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

export const RouteDetailsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$gray-700',
  padding: '24px 32px',
  borderRadius: 10,

  '.image-title-container': {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    gap: '1rem',
    borderBottom: '1px solid $gray-600',
    paddingBottom: '1rem',
    marginBottom: '1rem',

    img: {
      borderRadius: 8,
    },

    '.title-container': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',

      h2: {
        fontSize: '1.125rem',
        color: '$gray-100',
        lineHeight: '140%',
        fontWeight: '700',
      },

      span: {
        fontSize: '1rem',
        color: '$gray-300',
        lineHeight: '160%',
        fontWeight: '400',
      },

      '.route-info': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',

        '.distance': {
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
    },

    '.route-description': {
      fontSize: '0.875rem',
      color: '$gray-300',
      lineHeight: '160%',
    },
  },

  '.map-container': {
    marginTop: '1.5rem',

    img: {
      borderRadius: 8,
    },
  },

  '.carrousel-container': {
    maxWidth: 'calc(100% - 32px)',
    margin: '24px auto 0',
  },

  '.carrousel-item': {
    display: 'flex !important',
    justifyContent: 'center',

    img: {
      borderRadius: 8,
    },
  },

  '.actions-container': {
    width: '100%',
    display: 'flex',
    gap: 24,
    marginTop: 12,

    button: {
      width: '100%',
      outline: 'none',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      fontWeight: '700',
      fontSize: '1rem',
      color: '$gray-200',
      padding: '12px 24px',
      borderRadius: 8,
      transition: '0.2s',
      backgroundColor: '$gray-600',
      cursor: 'pointer',
      gap: 12,

      '&:hover': {
        backgroundColor: '$gray-500',
      },
    },
  },
})
