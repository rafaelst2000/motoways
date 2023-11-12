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
  X,
} from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { CSSProperties, ReactNode, useState } from 'react'

import map from '@/assets/map.png'
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
import { useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import Loading from './Loading'
import { formatNumber } from '@/utils/format-number'

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
  const session = useSession()
  const user = session?.data?.user as User

  function handleComment() {
    setShowForm(true)
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
      setSelectedRoute(routeDetails)
      setIsLoading(false)
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
                    </div>

                    <div className="route-info">
                      <Stars rating={selectedRoute.rate} />

                      <div className="distance">
                        <MapPin size={24} color={'#50B2C0'} />
                        <div>
                          <p>Distância</p>
                          <h3>{formatNumber(selectedRoute.distance)}km</h3>
                        </div>
                      </div>
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
                  <Image src={map} alt="" width={503} height={220} />
                </div>

                <div className="actions-container">
                  <button>
                    <Heart size={24} color="#50B2C0" />
                    Favoritar
                  </button>

                  <button>
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
