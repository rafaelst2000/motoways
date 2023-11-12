import { PostCardMyContainer } from '@/styles/components/PostCardMy'
import Image from 'next/image'
import rastro from '@/assets/rastro.jpg'
import Stars from './Stars'
import { RouteDetailsDialog } from './RouteDetailsDialog'
import { Route } from '@/types'
import { formattedRelativeDate } from '@/utils/date-fns'
interface PostCardMyProps {
  route: Route
}

export default function PostCardMy({ route }: PostCardMyProps) {
  return (
    <RouteDetailsDialog route={route}>
      <PostCardMyContainer>
        <div className="card-content">
          <Image width={108} height={152} alt="" src={rastro} />

          <div>
            <div className="card-info">
              <span>{formattedRelativeDate(route.publish_at)}</span>
              <Stars size="md" rating={route.rate} />
            </div>
            <h4>{route.title}</h4>
            <span>{route.distance}km</span>
            <p>{route.description}</p>
          </div>
        </div>
      </PostCardMyContainer>
    </RouteDetailsDialog>
  )
}
