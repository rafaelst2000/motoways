import { StarsContainer } from '@/styles/components/Stars'
import { Star } from '@phosphor-icons/react'
import { ComponentProps } from 'react'

type StarProps = ComponentProps<typeof StarsContainer> & {
  rating: number
  size?: 'sm' | 'md' | 'lg'
}

export default function Stars({ rating, size = 'sm', ...props }: StarProps) {
  return (
    <StarsContainer {...props}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={`star-${i}`} weight={i + 1 <= rating ? 'fill' : 'regular'} />
      ))}
    </StarsContainer>
  )
}
