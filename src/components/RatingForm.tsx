import {
  ActionsContainer,
  FormContainer,
  RatingFormContainer,
} from '@/styles/components/RouteDetailsDialog'
import { useState } from 'react'
import Avatar from './Avatar'
import Stars from './Stars'
import rafael from '@/assets/rafael.png'
import { TextArea } from './TextArea'
import { Check, X } from '@phosphor-icons/react'

type RatingFormProps = {
  onCancel: () => void
  routeId: string
}

export const RatingForm = ({ onCancel, routeId }: RatingFormProps) => {
  const [description, setDescription] = useState('')
  const [currentRate, setCurrentRate] = useState(0)

  return (
    <RatingFormContainer>
      <div className="user-details">
        <div className="user-info">
          <Avatar url={rafael} variant="sm" />
          <h3>Rafael Trevisan</h3>
        </div>
        <Stars rating={currentRate} size="lg" setRating={setCurrentRate} />
      </div>

      <FormContainer>
        <TextArea
          placeholder="Escreva sua avaliação"
          maxLength={450}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <ActionsContainer>
          <button onClick={onCancel}>
            <X color="#8381d9" />
          </button>
          <button type="submit" disabled={!description.trim() || !currentRate}>
            <Check color="#50b2c0" />
          </button>
        </ActionsContainer>
      </FormContainer>
    </RatingFormContainer>
  )
}
