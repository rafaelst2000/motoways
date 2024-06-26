import { InputContainer, InputWrapper } from '@/styles/components/Input'
import { CSS } from '@stitches/react'
import { InputHTMLAttributes, ReactNode, useEffect, useState } from 'react'

interface Place {
  description: string
  place_id: string
}

type Location = {
  lat: number
  lng: number
}

type AddressComponents = {
  short_name: string
}
export interface PlaceDetails {
  id: string
  index?: number
  place_id: string
  name: string
  formatted_address: string
  rating?: number
  business_status?: string
  geometry: {
    location: Location
  }
  address_components: [AddressComponents]
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode
  css?: CSS
  onLocationSelected: (place: PlaceDetails) => void
}

export const GooglePlaceInput = ({
  icon,
  css,
  onLocationSelected,
  ...props
}: InputProps) => {
  const [inputValue, setInputValue] = useState('')
  // eslint-disable-next-line
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails>(
    {} as PlaceDetails,
  )
  const [suggestions, setSuggestions] = useState<Place[]>([])
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')
  const [allowReq, setAllowReq] = useState(true)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedInputValue(inputValue?.trim())
    }, 300)

    return () => {
      clearTimeout(timerId)
    }
  }, [inputValue])

  useEffect(() => {
    fetchSuggestions()
    // eslint-disable-next-line
  }, [debouncedInputValue])

  async function fetchSuggestions() {
    if (!allowReq) return
    try {
      const response = await fetch(`/api/places?input=${debouncedInputValue}`)
      if (!response.ok) {
        throw new Error('Failed to fetch place details')
      }
      const data = await response.json()

      if (data.predictions) {
        // eslint-disable-next-line
        const filteredPredictions = data.predictions.filter((prediction: any) => {
            return prediction.terms.some(
              // eslint-disable-next-line
            (term: any) => term.value.toLowerCase() === 'brazil',
            )
          },
        )
        setSuggestions(filteredPredictions as Place[])
      } else {
        setSuggestions([])
      }
    } catch (error) {
      console.error('Error fetching place suggestions:', error)
    }
  }

  async function handleLocationSelect(place: Place) {
    try {
      const response = await fetch(
        `/api/place?placeId=${place.place_id.trim()}`,
      )
      const { result } = await response.json()
      setAllowReq(false)
      setSelectedPlace(result)
      setInputValue(result.formatted_address)
      onLocationSelected(result)
      setSuggestions([])
    } catch (error) {
      console.error('Error fetching place details:', error)
    }
  }

  return (
    <InputWrapper>
      <InputContainer css={{ zIndex: 9999, ...css }}>
        <input
          {...props}
          onChange={({ target }) => setInputValue(target.value)}
          onInput={() => {
            setAllowReq(true)
            setSelectedPlace({} as PlaceDetails)
          }}
          value={inputValue}
        />
        {icon}
      </InputContainer>

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((place) => (
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
