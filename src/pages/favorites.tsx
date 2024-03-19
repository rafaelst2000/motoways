import PostCardMy from '@/components/PostCardMy'
import SideMenu from '@/components/SideMenu'
import { ProfileContainer } from '@/styles/Profile'
import { Heart } from 'phosphor-react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Route } from '@/@types'
import { getUserFavoriteRoutes } from '@/utils/routes'
import Head from 'next/head'
import BottomMenu from '@/components/BottomMenu'

interface FavoritesProps {
  userRoutes: Route[]
}

export default function Favorites({ userRoutes }: FavoritesProps) {
  return (
    <>
      <Head>
        <title>Motoways | Favoritos</title>
      </Head>

      <ProfileContainer>
        <SideMenu />
        <div className="center-content">
          <div className="page-title desktop">
            <Heart size={32} color={'#50B2C0'} />
            <h1>Favoritos</h1>
          </div>

          {userRoutes &&
            userRoutes.map((route) => (
              <PostCardMy key={route.id} route={route} />
            ))}
        </div>
      </ProfileContainer>

      <BottomMenu />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  const userId = session?.user.id

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const userRoutes = (await getUserFavoriteRoutes(userId)) as Route[]
  return {
    props: {
      session,
      userRoutes,
    },
  }
}
