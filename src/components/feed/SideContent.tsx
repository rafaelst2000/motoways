'use client'

import { Route, RouteStop } from '@/@types'
import PostCardMin from '../PostCardMin'
import { useEffect, useState } from 'react'

const tempRoutes: Route[] = [
  {
    description: 'teste',
    distance: 200,
    id: '1',
    images: [
      'https://images.unsplash.com/photo-1657816909730-4b7cbfe2da41?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    publish_at: '2023-11-01T11:43:59.675Z',
    rate: 3,
    uf: 'sc',
    user_id: 'd4a7102a-6afb-4429-bb0f-c2e5b03eff0a',
    title: 'Teste',
    duration: 1000,
    route_stops: [],
  },
  {
    description: 'teste 2 ',
    distance: 200,
    id: '122',
    images: [
      'https://images.unsplash.com/photo-1657816909730-4b7cbfe2da41?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    publish_at: '2023-11-01T11:43:59.675Z',
    rate: 3,
    uf: 'sc',
    user_id: 'd4a7102a-6afb-4429-bb0f-c2e5b03eff0a',
    title: 'Teste 2',
    duration: 1000,
    route_stops: [],
  },
  {
    description: 'teste 3 ',
    distance: 200,
    id: '1223',
    images: [
      'https://images.unsplash.com/photo-1657816909730-4b7cbfe2da41?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    publish_at: '2023-11-01T11:43:59.675Z',
    rate: 3,
    uf: 'sc',
    user_id: 'd4a7102a-6afb-4429-bb0f-c2e5b03eff0a',
    title: 'Teste 3',
    duration: 1000,
    route_stops: [],
  },
]

interface SideContentProps {
  allRouteStops: RouteStop[]
}

interface GroupedLocations {
  [key: string]: RouteStop[]
}

interface UserLocation {
  lat: number
  lng: number
}

export default function SideContent({ allRouteStops }: SideContentProps) {
  const [userLocation, setUserLocation] = useState<UserLocation>(
    {} as UserLocation,
  )

  const radius = 10
  const hasGranttedLocationPermission = Object.entries(userLocation).length > 0

  const groupedByRouteId = allRouteStops.reduce(
    (acc: GroupedLocations, location) => {
      const { route_id: routeId } = location
      acc[routeId] = location
      return acc
    },
    {},
  )

  function calculateDistance(
    location1: UserLocation,
    location2: UserLocation,
  ): number {
    const R = 6371 // Raio da Terra em quilômetros
    const dLat = (location2.lat - location1.lat) * (Math.PI / 180)
    const dLon = (location2.lng - location1.lng) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(location1.lat * (Math.PI / 180)) *
        Math.cos(location2.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }

  const filteredRouteStops = Object.values(groupedByRouteId).filter(
    (routeStop: RouteStop) => {
      const distance = calculateDistance(userLocation, routeStop.location)
      return distance <= radius
    },
  )

  console.log('eu', filteredRouteStops)
  console.log('eu 2', groupedByRouteId)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          console.log('Latitude: ', position.coords.latitude)
          console.log('Longitude: ', position.coords.longitude)
          // Aqui você pode fazer o que precisar com a latitude e longitude
        },
        (error) => {
          console.error('Erro ao obter a localização: ', error)
        },
      )
    } else {
      console.error('Geolocalização não é suportada pelo navegador.')
    }
  }, [])

  return (
    <>
      {hasGranttedLocationPermission && (
        <div className="side-content">
          <div className="section-title">
            <h2>Rotas com destinos próximos</h2>
          </div>

          <div className="cards">
            {tempRoutes &&
              tempRoutes.map((route) => (
                <div key={route.id}>
                  <PostCardMin route={route} showDetails={false} />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  )
}
