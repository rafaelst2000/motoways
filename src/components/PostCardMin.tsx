import { PostCardMinContainer } from '@/styles/components/PostCardMin'
import Image from 'next/image'
import rastro from '@/assets/rastro.jpg'
import Stars from './Stars'
import { RouteDetailsDialog } from './RouteDetailsDialog'
import { getUf } from '@/utils/ufs'
import { Route } from '@/@types'

interface PostCardMinProps {
  showDetails?: boolean
  route: Route
}

export default function PostCardMin({
  showDetails = false,
  route,
  ...props
}: PostCardMinProps) {
  return (
    <>
      {showDetails ? (
        <RouteDetailsDialog route={route}>
          <CardContent route={route} {...props} />
        </RouteDetailsDialog>
      ) : (
        <CardContent route={route} />
      )}
    </>
  )
}

interface CardContentProps {
  route: Route
}
function CardContent({ route, ...props }: CardContentProps) {
  return (
    <PostCardMinContainer {...props}>
      <div className="card-content">
        <Image width={64} height={94} alt="" src={rastro} />

        <div className="card-info">
          <div className="card-title">
            <h4>{route.title}</h4>
            <span>{getUf(route.uf)}</span>
          </div>
          <Stars size="sm" rating={route.rate} />
        </div>
      </div>
    </PostCardMinContainer>
  )
}
