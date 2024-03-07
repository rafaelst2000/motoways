import { BottomContainer } from '@/styles/components/BottomMenu'
import { ChartLineUp, User, Binoculars, SignOut } from 'phosphor-react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import Image from 'next/image'
import Avatar from './Avatar'

import logo from '@/assets/Logo.png'

export default function BottomMenu() {
  const router = useRouter()
  const session = useSession()
  const user = session?.data?.user

  function goToPage(page: string) {
    router.push(`/${page}`)
  }

  return (
    <BottomContainer>
      <ul>
        <li
          className={router.pathname === '/feed' ? 'selected' : ''}
          onClick={() => goToPage('feed')}
        >
          <ChartLineUp
            size={28}
            color={router.pathname === '/feed' ? '#F8F9FC' : '#8d95af'}
          />
        </li>
        <li
          className={router.pathname === '/explore' ? 'selected' : ''}
          onClick={() => goToPage('explore')}
        >
          <Binoculars
            size={28}
            color={router.pathname === '/explore' ? '#F8F9FC' : '#8d95af'}
          />
        </li>
        <li
          className={router.pathname === '/profile/[[...id]]' ? 'selected' : ''}
          onClick={() => goToPage('profile')}
        >
          <User
            size={28}
            color={
              router.pathname === '/profile/[[...id]]' ? '#F8F9FC' : '#8d95af'
            }
          />
        </li>
        <li>
          <SignOut
            size={28}
            color="#F75A68"
            onClick={() => signOut({ callbackUrl: '/' })}
          />
        </li>
      </ul>
    </BottomContainer>
  )
}
