import { GoogleMap, LoadScript } from '@react-google-maps/api'

export const Map = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '220px',
    borderRadius: '4px',
  }

  const center = {
    lat: -29.9581063,
    lng: -51.7185162,
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
      />
    </LoadScript>
  )
}
