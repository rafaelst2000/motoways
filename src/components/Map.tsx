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
  const center = {
    lat: -30.1084702,
    lng: -51.3419492,
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        options={options}
        center={center}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </>
  )
}
