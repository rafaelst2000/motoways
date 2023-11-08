import { CreateRouteDialog } from '@/components/CreateRouteDialog'
import PostCard from '@/components/PostCard'
import PostCardMin from '@/components/PostCardMin'
import PostCardMy from '@/components/PostCardMy'
import SideMenu from '@/components/SideMenu'
import { FeedContainer } from '@/styles/Feed'
import { CaretRight, ChartLineUp, PlusCircle } from '@phosphor-icons/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { GetServerSideProps } from 'next'
import { getUserLastRoute } from '@/utils/routes'

import Head from 'next/head'
import { Route } from '@/types'

interface FeedProps {
  userLastRoute: Route
}

export default function Feed({ userLastRoute }: FeedProps) {
  return (
    <FeedContainer>
      <SideMenu />
      <div className="center-content">
        <div className="page-title-container">
          <div className="page-title">
            <ChartLineUp size={32} color={'#50B2C0'} />
            <h1>Início</h1>
          </div>
          <CreateRouteDialog>
            <button>
              <PlusCircle color={'#50b2c0'} size={24} />
              Criar roteiro
            </button>
          </CreateRouteDialog>
        </div>

        <h2>Seu último passeio</h2>
        <PostCardMy route={userLastRoute} />

        <h2 className="recent">Avaliações mais recentes</h2>
        <PostCard />
        <PostCard />
      </div>

      <div className="side-content">
        <div className="section-title">
          <h2>Destinos populares</h2>
          <p>
            Ver todos <CaretRight color={'#8381d9'} size={16} />
          </p>
        </div>

        <div className="cards">
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
        </div>
      </div>
    </FeedContainer>
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
  const userLastRoute = (await getUserLastRoute(session.user.id)) as Route
  return {
    props: {
      session,
      userLastRoute,
    },
  }
}
