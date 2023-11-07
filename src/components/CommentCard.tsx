import { CommentCardContainer } from '@/styles/components/RouteDetailsDialog'
import Avatar from './Avatar'
import Stars from './Stars'
import rafael from '@/assets/rafael.png'

export const CommentCard = () => {
  return (
    <CommentCardContainer>
      <div className="card-header">
        <Avatar url={rafael} variant="sm" />
        <div className="person-info">
          <h3>Rafael Trevisan</h3>
          <span>Há 2 dias</span>
        </div>
        <Stars size="sm" rating={4} />
      </div>

      <p>
        Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
        Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta
        eget nec vitae sit vulputate eget
      </p>
    </CommentCardContainer>
  )
}
