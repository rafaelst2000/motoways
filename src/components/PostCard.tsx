import { PostCardContainer } from '@/styles/components/PostCard'
import Image, { StaticImageData } from 'next/image'
import Avatar from './Avatar'
import rafael from '@/assets/rafael.png'
import rastro from '@/assets/rastro.jpg'
import Stars from './Stars'
import { RouteDetailsDialog } from './RouteDetailsDialog'
/* export interface AvatarProps {
  variant: 'xs' | 'sm' | 'lg'
  url: StaticImageData
} */

export default function PostCard() {
  return (
    <RouteDetailsDialog>
      <PostCardContainer>
        <div className="base-info">
          <Avatar url={rafael} variant="sm" />
          <div>
            <h3>Rafael Trevisan</h3>
            <span>Hoje</span>
          </div>

          <Stars size="md" rating={4} />
        </div>

        <div className="card-content">
          <Image width={108} height={152} alt="" src={rastro} />

          <div>
            <h4>São Jerônimo x Serra do Rio do Rastro</h4>
            <span>140km</span>
            <p>
              Semper et sapien proin vitae nisi. Feugiat neque integer donec et
              aenean posuere amet ultrices. Cras fermentum id pulvinar varius
              leo a in. Amet libero pharetra nunc elementum fringilla velit
              ipsum. Sed vulputate massa velit nibh
            </p>
          </div>
        </div>
      </PostCardContainer>
    </RouteDetailsDialog>
  )
}
