import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  LoadScriptProps,
} from '@react-google-maps/api'
import { useState } from 'react'

interface MapProps {
  directions?: any
}

export const Map = ({ directions }: MapProps) => {
  const [libraries] = useState<LoadScriptProps['libraries']>(['places'])

  const mapContainerStyle = {
    width: '100%',
    height: '220px',
    borderRadius: '4px',
  }

  const options = {
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
  }

  return (
    <>
      {window.google === undefined ? (
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}
          libraries={libraries}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            options={options}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </LoadScript>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          options={options}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}
    </>
  )
}
