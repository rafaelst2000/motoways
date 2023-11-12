import Avatar from '@/components/Avatar'
import PostCardMy from '@/components/PostCardMy'
import SideMenu from '@/components/SideMenu'
import { ProfileContainer } from '@/styles/Profile'
import { ChatText, MapPin, MapTrifold, User as UserIcon } from 'phosphor-react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Route, User } from '@/@types'
import { getUserRoutes } from '@/utils/routes'
import { getUserById, getUserAdditionalInfo } from '@/utils/users'
import Head from 'next/head'
import { formatNumber } from '@/utils/format-number'

type UserAdditionalInfo = {
  publishedRoutes: number
  km: number
  comments: number
}
interface ProfileProps {
  userRoutes: Route[]
  user: User
  userAdditionalInfo: UserAdditionalInfo
}

export default function Profile({
  userRoutes,
  user,
  userAdditionalInfo,
}: ProfileProps) {
  const userData = [
    {
      label: "Km's rodados",
      value: formatNumber(userAdditionalInfo.km),
      icon: <MapPin size={32} color={'#50b2c0'} />,
    },
    {
      label: 'Rotas publicadas',
      value: userAdditionalInfo.publishedRoutes,
      icon: <MapTrifold size={32} color={'#50b2c0'} />,
    },
    {
      label: 'Comentários',
      value: userAdditionalInfo.comments,
      icon: <ChatText size={32} color={'#50b2c0'} />,
    },
  ]

  return (
    <>
      <Head>
        <title>Motoways | Perfil</title>
      </Head>
      {user && (
        <ProfileContainer>
          <SideMenu />
          <div className="center-content">
            <div className="page-title desktop">
              <UserIcon size={32} color={'#50B2C0'} />
              <h1>Perfil</h1>
            </div>

            {userRoutes &&
              userRoutes.map((route) => (
                <PostCardMy key={route.id} route={route} />
              ))}
          </div>

          <div className="side-content">
            <div className="page-title mobile">
              <UserIcon size={32} color={'#50B2C0'} />
              <h1>Perfil</h1>
            </div>
            <div className="content">
              <Avatar variant="lg" url={user.image} />
              <h2>{user.name}</h2>
              <span>membro desde {user.member_since.substring(0, 4)}</span>
              <div className="separator" />

              <div className="info-item-container">
                {userData.map((item, index) => (
                  <div key={index} className="info-item">
                    {item.icon}

                    <div>
                      <h3>{item.label}</h3>
                      <p>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ProfileContainer>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  const userId =
    (Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id) || session?.user.id

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const userRoutes = (await getUserRoutes(userId)) as Route[]
  const user = (await getUserById(userId)) as User
  const userAdditionalInfo = await getUserAdditionalInfo(userId)
  return {
    props: {
      session,
      userRoutes,
      user: user || null,
      userAdditionalInfo,
    },
  }
}
