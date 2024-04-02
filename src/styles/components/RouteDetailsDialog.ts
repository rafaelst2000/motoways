import { styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  background: '#00000099',
})

export const DialogContentImages = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '100%',
  height: '100%',
  background: '$gray-800',
  padding: '24px 48px',
  overflowY: 'none',
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
        fontStyle: 'italic',
      },

      '.route-info': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },

      '.profile-link': {
        textDecoration: 'underline',
        cursor: 'pointer',

        '&:hover': {
          transition: '0.2s',
          color: '$green-100',
        },
      },
    },

    '.route-description': {
      fontSize: '0.875rem',
      color: '$gray-300',
      lineHeight: '160%',
    },
  },

  '.route-info-container': {
    margin: '12px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '.route-info-details': {
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

  '.map-container': {
    h2: {
      marginTop: '1.125rem',
      color: '$gray-100',
      fontSize: '1rem',
      lineHeight: '140%',
      marginBottom: '0.5rem',
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
      cursor: 'pointer',
    },
  },

  '.images-container': {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
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

      '&:not(:disabled):hover': {
        backgroundColor: '$gray-500',
      },

      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
      },
    },
  },

  '@media screen and (max-width: 1130px)': {
    '.actions-container': {
      button: {
        justifyContent: 'center',
      },
    },
  },

  '@media screen and (max-width: 600px)': {
    '.actions-container': {
      flexDirection: 'column',
      alignItems: 'center',
    },
    padding: '16px',

    '.image-title-container': {
      gap: '0.875rem',

      img: {
        width: 100,
        height: 100,
      },
    },

    '.carrousel-item': {
      padding: '0 0.25rem',
      img: {
        width: '100%',
        height: 'auto',
        'aspect-ratio': '1 / 1',
        cursor: 'pointer',
      },
    },
  },
})

export const RouteCommentsWrapper = styled('div', {
  marginTop: 16,
  '.comment-actions': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    span: {
      fontSize: '0.875rem',
      color: '$gray-200',
      lineHeight: '160%',
    },

    p: {
      fontSize: '1rem',
      color: '$purple-100',
      lineHeight: '160%',
      fontWeight: '700',
      cursor: 'pointer',
      padding: '4px 8px',
      transition: '0.2s',

      '&:hover': {
        color: '$purple-200',
      },
    },
  },

  ul: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
})

export const CommentCardContainer = styled('li', {
  width: '100%',
  borderRadius: 8,
  backgroundColor: '$gray-700',
  padding: 24,

  p: {
    marginTop: 20,
    fontSize: '0.875rem',
    fontWeight: '400',
    lineHeight: '160%',
    color: '$gray-300',
  },

  '.card-header': {
    display: 'grid',
    gridTemplateColumns: '40px 1fr 100px',
    gap: 16,

    '.person-info': {
      h3: {
        fontSize: '1rem',
        color: '$gray-100',
        lineHeight: '140%',
      },
      span: {
        fontSize: '0.875rem',
        color: '$gray-400',
        lineHeight: '160%',
      },
    },
  },
})

export const RatingFormContainer = styled('div', {
  background: '$gray-700',
  padding: 24,
  borderRadius: 8,
  marginTop: 8,

  '.user-details': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '.user-info': {
      display: 'flex',
      alignItems: 'center',
      gap: 16,

      h3: {
        fontSize: '1rem',
        color: '$gray-100',
        lineHeight: '140%',
      },
    },
  },
})

export const FormContainer = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginTop: 24,
})

export const ActionsContainer = styled('div', {
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
