import { DialogClose, DialogContent } from '@/styles/components/ImagesDialog'
import { CaretLeft, CaretRight, X } from 'phosphor-react'
import { useState } from 'react'

interface ImagesDialogProps {
  setIsOpen: (isOpen: boolean) => void
  images: string[]
}

export const ImagesDialog = ({ setIsOpen, images }: ImagesDialogProps) => {
  const [currentImage, setCurrentImage] = useState(0)

  function previousImage() {
    if (currentImage === 0) setCurrentImage(images.length - 1)
    else setCurrentImage(currentImage - 1)
  }

  function nextImage() {
    if (currentImage === images.length - 1) setCurrentImage(0)
    else setCurrentImage(currentImage + 1)
  }

  return (
    <DialogContent>
      <DialogClose onClick={() => setIsOpen(false)}>
        <X size={24} />
      </DialogClose>

      <div className="dialog-content">
        <div className="image-container">
          <CaretLeft
            onClick={previousImage}
            className="icon-left arrow-icon"
            size={42}
            color={'#F8F9FC'}
          />
          <img src={images[currentImage]} alt="" />
          <CaretRight
            onClick={nextImage}
            className="icon-right arrow-icon"
            size={42}
            color={'#F8F9FC'}
          />
        </div>
      </div>
    </DialogContent>
  )
}
