import { PostCardMinContainer } from '@/styles/components/PostCardMin'
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

export default function PostCardMin() {
  return (
    <RouteDetailsDialog>
      <PostCardMinContainer>
        <div className="card-content">
          <Image width={64} height={94} alt="" src={rastro} />

          <div className="card-info">
            <div className="card-title">
              <h4>Serra do Rio do Rastro</h4>
              <span>Santa Catarina</span>
            </div>
            <Stars size="sm" rating={3} />
          </div>
        </div>
      </PostCardMinContainer>
    </RouteDetailsDialog>
  )
}
