import type { AppProps } from 'next/app'
import { globalStyles } from '@/styles/global'
import { SessionProvider } from 'next-auth/react'
import { LoadScriptProps, useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [libraries] = useState<LoadScriptProps['libraries']>(['places'])

  useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries,
  })

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
