import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api'

interface MapProps {
  directions: google.maps.DirectionsResult
}

export const Map = ({ directions }: MapProps) => {
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
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        options={options}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </>
  )
}
