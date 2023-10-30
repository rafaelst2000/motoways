import { SideMenuContainer } from '@/styles/components/SideMenu'
import { ChartLineUp, User, Binoculars, SignOut } from '@phosphor-icons/react'
import Image from 'next/image'
import Avatar from './Avatar'

import logo from '@/assets/Logo.png'
import rafael from '@/assets/rafael.png'

export default function SideMenu() {
  const isSelected = true

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
        <li className={isSelected ? 'selected' : ''}>
          <ChartLineUp size={24} color={isSelected ? '#F8F9FC' : '#8d95af'} />
          Início
        </li>
        <li>
          <Binoculars size={24} color="#8d95af" />
          Explorar
        </li>
        <li>
          <User size={24} color="#8d95af" />
          Perfil
        </li>
      </ul>

      <div className="user-container">
        <Avatar url={rafael} variant={'xs'} />
        <p>Rafael T</p>
        <SignOut size={20} color="#F75A68" />
      </div>
    </SideMenuContainer>
  )
}
