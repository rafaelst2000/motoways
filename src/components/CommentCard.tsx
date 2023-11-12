import { CommentCardContainer } from '@/styles/components/RouteDetailsDialog'
import { RouteComment } from '@/types'
import { formattedRelativeDate } from '@/utils/date-fns'

import Avatar from './Avatar'
import Stars from './Stars'

interface CommentCardProps {
  comment: RouteComment
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <CommentCardContainer>
      <div className="card-header">
        <Avatar url={comment.user.image || ''} variant="sm" />
        <div className="person-info">
          <h3>{comment.user.name}</h3>
          <span>{formattedRelativeDate(comment.publish_at)}</span>
        </div>
        <Stars size="sm" rating={comment.rate} />
      </div>

      <p>{comment.description}</p>
    </CommentCardContainer>
  )
}
