import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
interface MapProps {
  directions: google.maps.DirectionsResult
}

export const Map = ({ directions }: MapProps) => {
  const [id, setId] = useState('')

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
  const center = {
    lat: -30.1084702,
    lng: -51.3419492,
  }

  useEffect(() => {
    const newId = uuidv4()
    setId(newId)
  }, [directions])

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        options={options}
        center={center}
      >
        {directions &&
          Array.isArray(directions.routes) &&
          directions.routes.length > 0 && (
            <DirectionsRenderer directions={directions} key={id} />
          )}
      </GoogleMap>
    </>
  )
}
