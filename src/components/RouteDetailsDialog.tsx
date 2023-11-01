import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  RouteDetailsWrapper,
} from '@/styles/components/RouteDetailsDialog'
import { MapPin, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

import rastro from '@/assets/rastro.jpg'
import map from '@/assets/map.png'
import Image from 'next/image'
import Stars from './Stars'

type RouteDetailsProps = {
  children: ReactNode
}

export const RouteDetailsDialog = ({ children }: RouteDetailsProps) => {
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

            <div className="map-container">
              <Image src={map} alt="" width={503} height={220} />
            </div>
          </RouteDetailsWrapper>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
