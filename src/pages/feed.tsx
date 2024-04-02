import { CreateRouteDialog } from '@/components/CreateRouteDialog'
import PostCard from '@/components/PostCard'
import PostCardMy from '@/components/PostCardMy'
import SideMenu from '@/components/SideMenu'
import { FeedContainer } from '@/styles/Feed'
import { ChartLineUp, PlusCircle } from 'phosphor-react'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { GetServerSideProps } from 'next'
import {
  getUserLastRoute,
  getFeedRoutes,
  getAllRouteStops,
} from '@/utils/routes'
import Head from 'next/head'
import { Route, RouteStop } from '@/@types'
import { useEffect, useState } from 'react'
import BottomMenu from '@/components/BottomMenu'
import SideContent from '@/components/feed/SideContent'

interface FeedProps {
  userLastRoute: Route
  feedRoutes: Route[]
  allRouteStops: RouteStop[]
}

export default function Feed({
  userLastRoute,
  feedRoutes,
  allRouteStops,
}: FeedProps) {
  const session = useSession()
  const user = session?.data?.user
  const [lastRoute, setLastRoute] = useState<Route>({} as Route)
  const [routes, setRoutes] = useState<Route[]>([] as Route[])

  useEffect(() => {
    setLastRoute(userLastRoute)
    setRoutes(feedRoutes)
  }, [userLastRoute, feedRoutes])

  async function onCreateRoute() {
    const lastRoute = (await getUserLastRoute(user?.id)) as Route
    const lastRoutes = (await getFeedRoutes(user?.id)) as Route[]
    setLastRoute(lastRoute)
    setRoutes(lastRoutes)
  }

  return (
    <>
      <Head>
        <title>Motoways | Início</title>
      </Head>
      <FeedContainer>
        <SideMenu />
        <div className="center-content">
          <div className="page-title-container">
            <div className="page-title">
              <ChartLineUp size={32} color={'#50B2C0'} />
              <h1>Início</h1>
            </div>
            <CreateRouteDialog onCreateRoute={onCreateRoute}>
              <button>
                <PlusCircle color={'#50b2c0'} size={24} />
                Criar roteiro
              </button>
            </CreateRouteDialog>
          </div>

          {lastRoute && lastRoute.id && (
            <>
              <h2>Seu último passeio</h2>
              <PostCardMy route={lastRoute} />
            </>
          )}

          <h2 className="recent">Avaliações mais recentes</h2>
          {routes &&
            routes.length > 0 &&
            routes.map((route) => <PostCard key={route.id} route={route} />)}
        </div>

        <SideContent allRouteStops={allRouteStops} />
      </FeedContainer>
      <BottomMenu />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const userLastRoute = (await getUserLastRoute(session.user?.id)) as Route
  const feedRoutes = (await getFeedRoutes(session.user?.id)) as Route[]
  const allRouteStops = (await getAllRouteStops()) as RouteStop[]
  return {
    props: {
      session,
      userLastRoute,
      feedRoutes,
      allRouteStops,
    },
  }
}
