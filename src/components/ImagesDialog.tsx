import { DialogClose, DialogContent } from '@/styles/components/ImagesDialog'
import { CaretLeft, CaretRight, X } from 'phosphor-react'
import { CSSProperties } from 'react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface ArrowProps {
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

function NextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <CaretRight
      className={className}
      size={42}
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
      size={42}
      color={'#F8F9FC'}
      onClick={onClick}
      style={{ ...style }}
    />
  )
}

interface ImagesDialogProps {
  setIsOpen: (isOpen: boolean) => void
  images: string[]
}

export const ImagesDialog = ({ setIsOpen, images }: ImagesDialogProps) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    className: 'carrousel-container-images',
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
  }
  console.log('aqui')

  return (
    <DialogContent>
      <DialogClose onClick={() => setIsOpen(false)}>
        <X size={24} />
      </DialogClose>

      <div className="dialog-content">
        <Slider {...settings}>
          {images.map((image) => (
            <div key={image} className="images-slide-container">
              <div className="images-slide-image-container">
                <img src={image} alt="" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </DialogContent>
  )
}
