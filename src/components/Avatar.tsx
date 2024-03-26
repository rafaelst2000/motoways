import { AvatarContainer } from '@/styles/components/Avatar'
import Image, { StaticImageData } from 'next/image'

export interface AvatarProps {
  variant: 'xs' | 'sm' | 'lg'
  url: StaticImageData | string
  onClick?: () => void
}

export default function Avatar({ variant, url, onClick }: AvatarProps) {
  const sizes = {
    xs: 30,
    sm: 38,
    lg: 68,
  }
  const size = sizes[variant]

  return (
    <AvatarContainer variant={variant} onClick={onClick}>
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
