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
} from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode, useState } from 'react'

import rastro from '@/assets/rastro.jpg'
import map from '@/assets/map.png'
import Image from 'next/image'
import Stars from './Stars'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CommentCard } from './CommentCard'
import { RatingForm } from './RatingForm'

type RouteDetailsProps = {
  children: ReactNode
}

function NextArrow(props: any) {
  const { className, style, onClick } = props
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

function PreviousArrow(props: any) {
  const { className, style, onClick } = props
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

export const RouteDetailsDialog = ({ children }: RouteDetailsProps) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: false,
    className: 'carrousel-container',
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
  }

  const [showForm, setShowForm] = useState(false)

  function handleComment() {
    setShowForm(true)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose>
            <X size={24} />
          </DialogClose>

          <RouteDetailsWrapper>
            <div className="image-title-container">
              <Image src={rastro} alt="" width={157} height={130} />

              <div className="title-container">
                <div>
                  <h2>Charqueadas x Viaduto 13</h2>
                  <span>Rio Grande do Sul</span>
                </div>

                <div className="route-info">
                  <Stars rating={4} />

                  <div className="distance">
                    <MapPin size={24} color={'#50B2C0'} />
                    <div>
                      <p>Distância</p>
                      <h3>270km</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="route-description">
              Semper et sapien proin vitae nisi. Feugiat neque integer donec et
              aenean posuere amet ultrices. Cras fermentum id pulvinar varius
              leo a in. Amet libero pharetra nunc elementum fringilla velit
              ipsum. Sed vulputate massa velit nibh
            </p>

            <Slider {...settings}>
              <div className="carrousel-item">
                <Image src={rastro} alt="" width={125} height={125} />
              </div>
              <div className="carrousel-item">
                <Image src={map} alt="" width={125} height={125} />
              </div>
              <div className="carrousel-item">
                <Image src={rastro} alt="" width={125} height={125} />
              </div>
              <div className="carrousel-item">
                <Image src={map} alt="" width={125} height={125} />
              </div>
            </Slider>

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
                  routeId="teste"
                />
              )}
              <CommentCard />
              <CommentCard />
            </ul>
          </RouteCommentsWrapper>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
