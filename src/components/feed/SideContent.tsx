'use client'

import { Route, RouteStop } from '@/@types'
import PostCardMin from '../PostCardMin'
import { useEffect, useState } from 'react'
import { getRoutesByRouteIds } from '@/utils/routes'
import { useSession } from 'next-auth/react'

interface SideContentProps {
  allRouteStops: RouteStop[]
}

interface UserLocation {
  lat: number
  lng: number
}

export default function SideContent({ allRouteStops }: SideContentProps) {
  const session = useSession()
  const user = session?.data?.user

  const [userLocation, setUserLocation] = useState<UserLocation>(
    {} as UserLocation,
  )
  const [sideContentRoutes, setSideContentRoutes] = useState<Route[]>([])
  const hasGranttedLocationPermission = Object.entries(userLocation).length > 0

  useEffect(() => {
    async function fetchUserLocation() {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
            },
            (error) => {
              console.error('Erro ao obter a localização: ', error)
            },
          )
        } else {
          console.error('Geolocalização não é suportada pelo navegador.')
        }
      } catch (error) {
        console.error('Erro ao obter a localização: ', error)
      }
    }

    fetchUserLocation()
  }, [])

  useEffect(() => {
    const isWithinRadius = (location: RouteStop, radius: number) => {
      const earthRadiusKm = 6371
      const { lat: lat1, lng: lng1 } = userLocation
      const { lat: lat2, lng: lng2 } = location.location

      const dLat = degreesToRadians(lat2 - lat1)
      const dLng = degreesToRadians(lng2 - lng1)

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) *
          Math.cos(degreesToRadians(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2)

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = earthRadiusKm * c

      return distance <= radius
    }

    const degreesToRadians = (degrees: number) => {
      return degrees * (Math.PI / 180)
    }

    async function getRoutesByIds(routeIds: string[]) {
      const routes = (await getRoutesByRouteIds(routeIds)) as Route[]
      const sortedRoutes = routes
        .filter((route) => route.user_id !== user?.id)
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 3)
      setSideContentRoutes(sortedRoutes)
    }

    if (userLocation && Object.entries(userLocation).length > 0) {
      const nearRoutes = allRouteStops.filter((location) =>
        isWithinRadius(location, 150),
      )
      const nearRouteIds = nearRoutes.map((route) => route.route_id)
      getRoutesByIds(nearRouteIds)
    }
  }, [userLocation, allRouteStops])

  return (
    <>
      {hasGranttedLocationPermission && (
        <div className="side-content">
          <div className="section-title">
            <h2>Procurando um rolê perto?</h2>
          </div>

          <div className="cards">
            {sideContentRoutes &&
              sideContentRoutes.map((route) => (
                <div key={route.id}>
                  <PostCardMin route={route} showDetails={true} />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  )
}
