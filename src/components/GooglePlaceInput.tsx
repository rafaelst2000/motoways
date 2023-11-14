import { InputContainer, InputWrapper } from '@/styles/components/Input'
import { CSS } from '@stitches/react'
import {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode
  css?: CSS
  onLocationSelected?: (place: any) => void
}

interface Place {
  description: string
  place_id: string
}

export const GooglePlaceInput = ({ icon, css, ...props }: InputProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<Place[]>([])

  useEffect(() => {
    fetchSuggestions()
  }, [inputValue])

  async function fetchSuggestions() {
    if (inputValue.trim() === '') {
      setSuggestions([])
      return
    }

    const response = await fetch(`/api/places?input=${inputValue.trim()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch place details')
    }
    const data = await response.json()

    if (data.predictions) {
      setSuggestions(data.predictions as Place[])
    } else {
      setSuggestions([])
    }
  }

  function handleLocationSelect(place: Place) {
    /*  try {
      const details = await fetchPlaceDetails(selectedPlace.place_id)
      setInputValue(details.address)
      setSuggestions([])
      onLocationSelect(details)
    } catch (error) {
      console.error('Error fetching place details:', error)
      setError('Failed to fetch place details. Please try again later.')
    } */
  }

  return (
    <InputWrapper>
      <InputContainer css={{ zIndex: 9999, ...css }}>
        <input
          {...props}
          onChange={({ target }) => setInputValue(target.value)}
          value={inputValue}
        />
        {/* {icon} */}
      </InputContainer>

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((place, i) => (
            <li
              key={place.place_id}
              onClick={() => handleLocationSelect(place)}
            >
              {place.description}
            </li>
          ))}
        </ul>
      )}
    </InputWrapper>
  )
}
