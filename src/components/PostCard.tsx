import { PostCardContainer } from '@/styles/components/PostCard'
import Image from 'next/image'
import Avatar from './Avatar'
import Stars from './Stars'
import { RouteDetailsDialog } from './RouteDetailsDialog'
import { Route } from '@/@types'
import { formattedRelativeDate } from '@/utils/date-fns'
import { formattedDistance } from '@/utils/format-distance'
import { useRouter } from 'next/router'

interface PostCardProps {
  route: Route
}

export default function PostCard({ route }: PostCardProps) {
  const router = useRouter()

  function goToUserProfile(id: string) {
    router.push(`/profile/${id}`)
  }

  return (
    <PostCardContainer>
      <div className="base-info">
        {route.user?.image && (
          <Avatar
            url={route.user.image}
            variant="sm"
            onClick={() => goToUserProfile(route.user?.id ?? '')}
          />
        )}
        <div>
          <h3 onClick={() => goToUserProfile(route.user?.id ?? '')}>
            {route.user?.name}
          </h3>
          <span>{formattedRelativeDate(route.publish_at)}</span>
        </div>

        <Stars size="md" rating={route.rate} />
      </div>

      <RouteDetailsDialog route={route}>
        <div className="card-content">
          <Image width={108} height={152} alt="" src={route.images[0]} />

          <div>
            <h4>{route.title}</h4>
            <span>{formattedDistance(route.distance)}</span>
            <p>{route.description}</p>
          </div>
        </div>
      </RouteDetailsDialog>
    </PostCardContainer>
  )
}
