'use client'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  RouteDetailsWrapper,
  RouteCommentsWrapper,
} from '@/styles/components/RouteDetailsDialog'
import {
  CaretLeft,
  CaretRight,
  Heart,
  MapPin,
  PaperPlaneTilt,
  Timer,
  X,
} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { CSSProperties, ReactNode, useState } from 'react'

import Image from 'next/image'
import Stars from './Stars'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CommentCard } from './CommentCard'
import { RatingForm } from './RatingForm'
import { Route, User } from '@/@types'
import { getUf } from '@/utils/ufs'
import { getRouteDetails, addRouteComment } from '@/utils/routes'
import { updateUserFavoriteRoutes, getUserById } from '@/utils/users'
import { useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import Loading from './Loading'
import { formattedDistance } from '@/utils/format-distance'
import { formattedTimeToMinHours } from '@/utils/date-fns'
import { Map } from './Map'

type RouteDetailsProps = {
  children: ReactNode
  route: Route
}
interface FormData {
  description: string
  rate: number
}

interface ArrowProps {
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

function NextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <CaretRight
      className={className}
      size={24}
      color={'#F8F9FC'}
      onClick={onClick}
      style={{ ...style }}
    />
  )
}

function PreviousArrow({ className, style, onClick }: ArrowProps) {
  return (
    <CaretLeft
      className={className}
      size={24}
      color={'#F8F9FC'}
      onClick={onClick}
      style={{ ...style }}
    />
  )
}

export const RouteDetailsDialog = ({ children, route }: RouteDetailsProps) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: route?.images.length < 3 ? route.images.length : 3,
    slidesToScroll: 1,
    dots: false,
    className: 'carrousel-container',
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
  }
  const [showForm, setShowForm] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<Route>({} as Route)
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>({} as google.maps.DirectionsResult)
  const [favoriteRoutes, setFavoriteRoutes] = useState<string[]>([])
  const [loadingFavoriteRoute, setLoadingFavoriteRoute] = useState(false)

  const session = useSession()
  const user = session?.data?.user as User

  const isFavoriteRoute = favoriteRoutes.includes(route.id)

  function handleComment() {
    setShowForm(true)
  }

  async function handleFavoriteRoute() {
    setLoadingFavoriteRoute(true)
    try {
      let newRoutes = []
      if (isFavoriteRoute) {
        newRoutes = favoriteRoutes.filter((item) => item !== route.id)
      } else {
        newRoutes = [...favoriteRoutes, route.id]
      }
      setFavoriteRoutes(newRoutes)
      await updateUserFavoriteRoutes(user, newRoutes)
    } catch (error) {
      console.error(error)
      setFavoriteRoutes(favoriteRoutes)
    } finally {
      setLoadingFavoriteRoute(false)
    }
  }

  async function handleConfirmComment(data: FormData) {
    setShowForm(false)
    const newComment = {
      ...data,
      publish_at: new Date().toISOString(),
      route_id: route.id,
      user_id: user?.id,
      id: uuidv4(),
    }
    await addRouteComment(newComment)
    await onOpenModal(true)
  }

  async function onOpenModal(isOpen: boolean) {
    if (isOpen) {
      setIsLoading(true)
      const routeDetails = await getRouteDetails(route)
      await calculateRoute(routeDetails)
      const loggedUser = await getUserById(user.id)
      const userFavoriteRoutes = loggedUser.favorite_routes ?? []
      setFavoriteRoutes(userFavoriteRoutes)
      setIsLoading(false)
      setSelectedRoute(routeDetails)
    }
  }

  async function calculateRoute(routeDetails: Route) {
    const selectedLocationsSize = routeDetails.route_stops
      .map((item) => item.place_id)
      .filter((item) => item).length

    if (selectedLocationsSize >= 2) {
      let waypoints = []

      waypoints = routeDetails.route_stops
        .filter(
          (item) =>
            item.index !== 0 &&
            item.index !== routeDetails.route_stops.length - 1 &&
            item.place_id,
        )
        .map((item) => {
          return {
            location: item.location,
            stopover: true,
          }
        })

      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        travelMode: google.maps.TravelMode.DRIVING,
        origin: routeDetails.route_stops[0].location,
        destination:
          routeDetails.route_stops[routeDetails.route_stops.length - 1]
            .location,
        ...(waypoints.length > 0 && { waypoints }),
      })
      setDirectionsResponse(results)
    }
  }

  function openGoogleMaps() {
    if (directionsResponse && directionsResponse.routes.length > 0) {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      // eslint-disable-next-line
      const directions = directionsResponse as any

      const startLocation = `${directions.request.origin.location.lat()},${directions.request.origin.location.lng()}`
      const endLocation = `${directions.request.destination.location.lat()},${directions.request.destination.location.lng()}`
      const waypoints = directions?.request?.waypoints
        ? directions.request.waypoints
            .map(
              // eslint-disable-next-line
          (waypoint: any) =>
                `${waypoint.location.location.lat()},${waypoint.location.location.lng()}`,
            )
            .join('|')
        : []
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLocation}&destination=${endLocation}&waypoints=${waypoints}&travelmode=driving`
      if (isMobile) {
        window.location.href = `google.navigation:q=${mapsUrl}&mode=d`
      } else {
        window.open(mapsUrl, '_blank')
      }
    }
  }

  return (
    <Dialog.Root onOpenChange={onOpenModal}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose>
            <X size={24} />
          </DialogClose>

          {loading || !selectedRoute?.id ? (
            <Loading />
          ) : (
            <>
              <RouteDetailsWrapper>
                <div className="image-title-container">
                  <Image
                    src={selectedRoute.images[0]}
                    alt=""
                    width={157}
                    height={130}
                  />

                  <div className="title-container">
                    <div>
                      <h2>{selectedRoute.title}</h2>
                      <span>{getUf(selectedRoute.uf)}</span>
                      <p>Por: {route.user?.name || user.name}</p>
                    </div>

                    <div className="route-info">
                      <Stars rating={selectedRoute.rate} />
                    </div>
                  </div>
                </div>
                <p className="route-description">{selectedRoute.description}</p>

                {selectedRoute.images.length > 3 ? (
                  <Slider {...settings}>
                    {route.images.map((image) => (
                      <div key={image} className="carrousel-item">
                        <Image src={image} alt="" width={125} height={125} />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="images-container">
                    {selectedRoute.images.map((image) => (
                      <div key={image} className="carrousel-item">
                        <Image src={image} alt="" width={125} height={125} />
                      </div>
                    ))}
                  </div>
                )}

                <div className="map-container">
                  <h2>Vizualização</h2>
                  <Map directions={directionsResponse} />
                </div>

                <div className="route-info-container">
                  <div className="route-info-details">
                    <MapPin size={24} color={'#50B2C0'} />
                    <div>
                      <p>Distância</p>
                      <h3>{formattedDistance(route.distance)}</h3>
                    </div>
                  </div>

                  <div className="route-info-details">
                    <Timer size={24} color={'#50B2C0'} />
                    <div>
                      <p>Tempo estimado</p>
                      <h3>{formattedTimeToMinHours(route.duration)}</h3>
                    </div>
                  </div>
                </div>

                <div className="actions-container">
                  <button
                    disabled={loadingFavoriteRoute}
                    onClick={handleFavoriteRoute}
                  >
                    <Heart
                      weight={isFavoriteRoute ? 'fill' : 'regular'}
                      size={24}
                      color="#50B2C0"
                    />
                    {isFavoriteRoute ? 'Desfavoritar' : 'Favoritar'}
                  </button>

                  <button onClick={openGoogleMaps}>
                    <PaperPlaneTilt size={24} color="#50B2C0" />
                    Ver no maps
                  </button>
                </div>
              </RouteDetailsWrapper>

              <RouteCommentsWrapper>
                <div className="comment-actions">
                  <span>Comentários</span>
                  {!showForm && <p onClick={handleComment}>Comentar</p>}
                </div>

                <ul>
                  {showForm && (
                    <RatingForm
                      onCancel={() => setShowForm(false)}
                      onConfirm={handleConfirmComment}
                    />
                  )}
                  {Array.isArray(selectedRoute.comments) &&
                    selectedRoute.comments.map((comment) => (
                      <CommentCard key={comment.id} comment={comment} />
                    ))}
                </ul>
              </RouteCommentsWrapper>
            </>
          )}
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
