import { CreateRouteDialog } from '@/components/CreateRouteDialog'
import PostCard from '@/components/PostCard'
import PostCardMin from '@/components/PostCardMin'
import PostCardMy from '@/components/PostCardMy'
import SideMenu from '@/components/SideMenu'
import { FeedContainer } from '@/styles/Feed'
import { CaretRight, ChartLineUp, PlusCircle } from 'phosphor-react'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { GetServerSideProps } from 'next'
import { getUserLastRoute, getFeedRoutes } from '@/utils/routes'
import Head from 'next/head'
import { Route } from '@/@types'
import { useEffect, useState } from 'react'

interface FeedProps {
  userLastRoute: Route
  feedRoutes: Route[]
}

const tempRoutes: Route[] = [
  {
    description: 'teste',
    distance: 200,
    id: '1',
    images: [
      'https://images.unsplash.com/photo-1657816909730-4b7cbfe2da41?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    publish_at: '2023-11-01T11:43:59.675Z',
    rate: 3,
    uf: 'sc',
    user_id: 'd4a7102a-6afb-4429-bb0f-c2e5b03eff0a',
    title: 'Teste',
    duration: 1000,
    route_stops: [],
  },
  {
    description: 'teste 2 ',
    distance: 200,
    id: '122',
    images: [
      'https://images.unsplash.com/photo-1657816909730-4b7cbfe2da41?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    publish_at: '2023-11-01T11:43:59.675Z',
    rate: 3,
    uf: 'sc',
    user_id: 'd4a7102a-6afb-4429-bb0f-c2e5b03eff0a',
    title: 'Teste 2',
    duration: 1000,
    route_stops: [],
  },
  {
    description: 'teste 3 ',
    distance: 200,
    id: '1223',
    images: [
      'https://images.unsplash.com/photo-1657816909730-4b7cbfe2da41?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    publish_at: '2023-11-01T11:43:59.675Z',
    rate: 3,
    uf: 'sc',
    user_id: 'd4a7102a-6afb-4429-bb0f-c2e5b03eff0a',
    title: 'Teste 3',
    duration: 1000,
    route_stops: [],
  },
]

export default function Feed({ userLastRoute, feedRoutes }: FeedProps) {
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

        <div className="side-content">
          <div className="section-title">
            <h2>Próximo a você</h2>
          </div>

          <div className="cards">
            {tempRoutes &&
              tempRoutes.map((route) => (
                <div key={route.id}>
                  <PostCardMin route={route} showDetails={false} />
                </div>
              ))}
          </div>
        </div>
      </FeedContainer>
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
  return {
    props: {
      session,
      userLastRoute,
      feedRoutes,
    },
  }
}
