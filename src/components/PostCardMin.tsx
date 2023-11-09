import { PostCardMinContainer } from '@/styles/components/PostCardMin'
import Image, { StaticImageData } from 'next/image'
import Avatar from './Avatar'
import rafael from '@/assets/rafael.png'
import rastro from '@/assets/rastro.jpg'
import Stars from './Stars'
import { RouteDetailsDialog } from './RouteDetailsDialog'

interface PostCardMinProps {
  showDetails?: boolean
}

export default function PostCardMin({ showDetails = false }: PostCardMinProps) {
  return (
    /*  <>
      {showDetails ? <RouteDetailsDialog route={}><CardContent /></RouteDetailsDialog> : <CardContent />}
    </> */
    <CardContent />
  )
}

function CardContent() {
  return (
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
  )
}
