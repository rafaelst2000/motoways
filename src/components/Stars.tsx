import { StarsContainer } from '@/styles/components/Stars'
import { Star } from '@phosphor-icons/react'
import { ComponentProps, useState } from 'react'

type StarProps = ComponentProps<typeof StarsContainer> & {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  setRating?: (rating: number) => void
}

export default function Stars({
  rating,
  size = 'sm',
  setRating,
  ...props
}: StarProps) {
  const [previewValue, setPreviewValue] = useState(0)
  const isEditable = !!setRating
  const ratingValue = isEditable ? previewValue : rating

  const handleMouseEnter = (value: number) => {
    if (isEditable) setPreviewValue(value)
  }

  const handleMouseLeave = () => {
    if (isEditable) setPreviewValue(rating)
  }

  const handleSetValue = () => {
    if (isEditable) setRating(previewValue)
  }

  return (
    <StarsContainer
      css={isEditable ? { cursor: 'pointer' } : undefined}
      size={size}
      {...props}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={`star-${i}`}
          weight={i + 1 <= ratingValue ? 'fill' : 'regular'}
          onMouseEnter={() => handleMouseEnter(i + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={handleSetValue}
        />
      ))}
    </StarsContainer>
  )
}
