import * as Dialog from '@radix-ui/react-dialog'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  CreateRouteDialogWrapper,
  ActionsContainer,
  AddContainer,
} from '@/styles/components/CreateRouteDialog'
import { Check, Plus, X } from 'phosphor-react'
import { ReactNode, useState } from 'react'

import Stars from './Stars'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Input } from './Input'
import { TextArea } from './TextArea'
import { Map } from './Map'
import { GooglePlaceInput } from './GooglePlaceInput'

type CreateRouteDialogProps = {
  children: ReactNode
}

export const CreateRouteDialog = ({ children }: CreateRouteDialogProps) => {
  const [currentRate, setCurrentRate] = useState(0)
  const [description, setDescription] = useState('')
  const [stopInput, setStopInput] = useState(0)
  const [location, setLocation] = useState({
    address: '',
    latitude: 0,
    longitude: 0,
  })

  function addInput() {
    setStopInput((count) => count + 1)
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

          <CreateRouteDialogWrapper>
            <h1>Novo roteiro</h1>
            <Input
              placeholder="Nome do roteiro"
              css={{ maxWidth: '100%', marginBottom: '12px' }}
            />
            <GooglePlaceInput
              css={{ maxWidth: '100%', marginBottom: '12px' }}
              placeholder="Seu ponto de partida"
            />
            {stopInput > 0 &&
              Array.from({ length: stopInput }).map((_, index) => (
                <GooglePlaceInput
                  css={{ maxWidth: '100%', marginBottom: '12px' }}
                  placeholder={`Parada ${index + 1}`}
                  key={index}
                />
              ))}

            <AddContainer>
              <button type="submit" disabled={false} onClick={addInput}>
                <Plus color="#50b2c0" />
              </button>
            </AddContainer>
            <GooglePlaceInput
              css={{ maxWidth: '100%', marginBottom: '12px' }}
              placeholder="Seu destino"
            />

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
            {/* <Map /> */}
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
