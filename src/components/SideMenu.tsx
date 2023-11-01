import { SideMenuContainer } from '@/styles/components/SideMenu'
import { ChartLineUp, User, Binoculars, SignOut } from '@phosphor-icons/react'
import Image from 'next/image'
import Avatar from './Avatar'

import logo from '@/assets/Logo.png'
import rafael from '@/assets/rafael.png'
import { useRouter } from 'next/router'

export default function SideMenu() {
  const router = useRouter()

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
          <ChartLineUp
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
          className={router.pathname === '/profile' ? 'selected' : ''}
          onClick={() => goToPage('profile')}
        >
          <User
            size={24}
            color={router.pathname === '/profile' ? '#F8F9FC' : '#8d95af'}
          />
          Perfil
        </li>
      </ul>

      <div className="user-container">
        <Avatar url={rafael} variant={'xs'} />
        <p>Rafael T</p>
        <SignOut size={20} color="#F75A68" onClick={() => goToPage('')} />
      </div>
    </SideMenuContainer>
  )
}
