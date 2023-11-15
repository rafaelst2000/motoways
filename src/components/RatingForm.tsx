import {
  ActionsContainer,
  FormContainer,
  RatingFormContainer,
} from '@/styles/components/RouteDetailsDialog'
import { useState, FormEvent } from 'react'
import Avatar from './Avatar'
import Stars from './Stars'
import rafael from '@/assets/rafael.png'
import { TextArea } from './TextArea'
import { Check, X } from 'phosphor-react'
import { useSession } from 'next-auth/react'
interface FormData {
  description: string
  rate: number
}

type RatingFormProps = {
  onCancel: () => void
  onConfirm: (formData: FormData) => void
}

export const RatingForm = ({ onCancel, onConfirm }: RatingFormProps) => {
  const session = useSession()
  const user = session?.data?.user
  const [description, setDescription] = useState('')
  const [currentRate, setCurrentRate] = useState(0)

  function submitForm(event: FormEvent) {
    event.preventDefault()
    const formData = {
      description,
      rate: currentRate,
    }
    onConfirm(formData)
  }

  return (
    <RatingFormContainer>
      <div className="user-details">
        <div className="user-info">
          <Avatar url={user?.image || ''} variant="sm" />
          <h3>{user?.name}</h3>
        </div>
        <Stars rating={currentRate} size="lg" setRating={setCurrentRate} />
      </div>

      <FormContainer onSubmit={submitForm}>
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
