import { PostCardContainer } from '@/styles/components/PostCard'
import Image from 'next/image'
import Avatar from './Avatar'
import Stars from './Stars'
import { RouteDetailsDialog } from './RouteDetailsDialog'
import { Route } from '@/@types'
import { formattedRelativeDate } from '@/utils/date-fns'
import { formattedDistance } from '@/utils/format-distance'

interface PostCardProps {
  route: Route
}

export default function PostCard({ route }: PostCardProps) {
  return (
    <RouteDetailsDialog route={route}>
      <PostCardContainer>
        <div className="base-info">
          {route.user?.image && <Avatar url={route.user.image} variant="sm" />}
          <div>
            <h3>{route.user?.name}</h3>
            <span>{formattedRelativeDate(route.publish_at)}</span>
          </div>

          <Stars size="md" rating={route.rate} />
        </div>

        <div className="card-content">
          <Image width={108} height={152} alt="" src={route.images[0]} />

          <div>
            <h4>{route.title}</h4>
            <span>{formattedDistance(route.distance)}</span>
            <p>{route.description}</p>
          </div>
        </div>
      </PostCardContainer>
    </RouteDetailsDialog>
  )
}
