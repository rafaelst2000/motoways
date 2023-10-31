import { createStitches } from '@stitches/react'
import { Nunito_Sans as nunitoSans } from 'next/font/google'

const nunito = nunitoSans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  css,
} = createStitches({
  theme: {
    colors: {
      'green-100': '#50b2c0',
      'green-200': '#255d6a',
      'green-300': '#0a313c',

      'purple-100': '#8381d9',
      'purple-200': '#2a2879',

      'gray-100': '#f8f9fc',
      'gray-200': '#e6e8f2',
      'gray-300': '#d1d6e4',
      'gray-400': '#8d95af',
      'gray-500': '#303f73',
      'gray-600': '#252d4a',
      'gray-700': '#181c2a',
      'gray-800': '#0e1116',

      'gradient-vertical': 'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
      'gradient-horizontal': 'linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)',
    },

    fonts: {
      nunito: `${nunito.style.fontFamily}, sans-serif`,
    },

    fontSizes: {
      'f-14': '0.875rem',
      'f-16': '1rem',
      'f-18': '1.125rem',
      'f-20': '1.25rem',
      'f-24': '1.5rem',
    },
  },
})
