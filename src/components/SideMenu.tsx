import { SideMenuContainer } from '@/styles/components/SideMenu'
import { House, User, Binoculars, SignOut, Heart } from 'phosphor-react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import Image from 'next/image'
import Avatar from './Avatar'

import logo from '@/assets/Logo.png'

export default function SideMenu() {
  const router = useRouter()
  const session = useSession()
  const user = session?.data?.user

  function goToPage(page: string) {
    router.push(`/${page}`)
  }

  return (
    <SideMenuContainer>
      <Image
        src={logo}
        width={132}
        height={32}
        quality={100}
        priority={true}
        alt="Motoways logo"
        className="logo"
      />

      <ul>
        <li
          className={router.pathname === '/feed' ? 'selected' : ''}
          onClick={() => goToPage('feed')}
        >
          <House
            size={24}
            color={router.pathname === '/feed' ? '#F8F9FC' : '#8d95af'}
          />
          Início
        </li>
        <li
          className={router.pathname === '/explore' ? 'selected' : ''}
          onClick={() => goToPage('explore')}
        >
          <Binoculars
            size={24}
            color={router.pathname === '/explore' ? '#F8F9FC' : '#8d95af'}
          />
          Explorar
        </li>
        <li
          className={router.pathname === '/profile/[[...id]]' ? 'selected' : ''}
          onClick={() => goToPage('profile')}
        >
          <User
            size={24}
            color={
              router.pathname === '/profile/[[...id]]' ? '#F8F9FC' : '#8d95af'
            }
          />
          Perfil
        </li>
        <li
          className={router.pathname === '/favorites' ? 'selected' : ''}
          onClick={() => goToPage('favorites')}
        >
          <Heart
            size={24}
            color={router.pathname === '/favorites' ? '#F8F9FC' : '#8d95af'}
          />
          Favoritos
        </li>
      </ul>

      <div className="user-container">
        <Avatar url={user?.image || ''} variant={'xs'} />
        <p>{user?.name || ''}</p>
        <SignOut
          size={20}
          color="#F75A68"
          onClick={() => signOut({ callbackUrl: '/' })}
        />
      </div>
    </SideMenuContainer>
  )
}
