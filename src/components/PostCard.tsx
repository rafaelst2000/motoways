import { PostCardContainer } from '@/styles/components/PostCard'
import Image, { StaticImageData } from 'next/image'
import Avatar from './Avatar'
import rafael from '@/assets/rafael.png'
import rastro from '@/assets/rastro.jpg'
import Stars from './Stars'
import { RouteDetailsDialog } from './RouteDetailsDialog'
import { Route } from '@/types'
import { formattedRelativeDate } from '@/utils/date-fns'

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
            <span>{route.distance}km</span>
            <p>{route.description}</p>
          </div>
        </div>
      </PostCardContainer>
    </RouteDetailsDialog>
  )
}
