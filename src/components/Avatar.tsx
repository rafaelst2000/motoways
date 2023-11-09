import { AvatarContainer } from '@/styles/components/Avatar'
import Image, { StaticImageData } from 'next/image'

export interface AvatarProps {
  variant: 'xs' | 'sm' | 'lg'
  url: StaticImageData | string
}

export default function Avatar({ variant, url }: AvatarProps) {
  const sizes = {
    xs: 29,
    sm: 39,
    lg: 68,
  }
  const size = sizes[variant]

  return (
    <AvatarContainer variant={variant}>
      <Image
        src={url}
        width={size}
        height={size}
        quality={95}
        alt=""
        className="avatar"
      />
    </AvatarContainer>
  )
}
