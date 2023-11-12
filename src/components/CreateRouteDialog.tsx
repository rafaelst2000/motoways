import * as Dialog from '@radix-ui/react-dialog'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  CreateRouteDialogWrapper,
  ActionsContainer,
} from '@/styles/components/CreateRouteDialog'
import { Check, X } from '@phosphor-icons/react'
import { ReactNode, useState } from 'react'

import map from '@/assets/map.png'
import Image from 'next/image'
import Stars from './Stars'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Input } from './Input'
import { TextArea } from './TextArea'

type CreateRouteDialogProps = {
  children: ReactNode
}

export const CreateRouteDialog = ({ children }: CreateRouteDialogProps) => {
  const [currentRate, setCurrentRate] = useState(0)
  const [description, setDescription] = useState('')

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogClose>
            <X size={24} />
          </DialogClose>

          <CreateRouteDialogWrapper>
            <h1>Novo roteiro</h1>
            <Input
              placeholder="Seu ponto de partida"
              css={{ maxWidth: '100%', marginBottom: '12px' }}
            />
            <Input placeholder="Seu destino" css={{ maxWidth: '100%' }} />

            <h2>Sua avaliação</h2>
            <Stars rating={currentRate} size="md" setRating={setCurrentRate} />

            <TextArea
              placeholder="Escreva sua avaliação"
              maxLength={450}
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              css={{ marginTop: '12px' }}
            />

            <h2>Fotos</h2>
            <h2>Vizualização</h2>
            <Image src={map} alt="" width={503} height={220} />
            <ActionsContainer>
              <button type="submit" disabled={false}>
                <Check color="#50b2c0" />
              </button>
            </ActionsContainer>
          </CreateRouteDialogWrapper>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
