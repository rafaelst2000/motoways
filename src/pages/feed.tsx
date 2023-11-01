import PostCard from '@/components/PostCard'
import PostCardMin from '@/components/PostCardMin'
import PostCardMy from '@/components/PostCardMy'
import SideMenu from '@/components/SideMenu'
import { FeedContainer } from '@/styles/Feed'
import { CaretRight, ChartLineUp, PlusCircle } from '@phosphor-icons/react'
import Head from 'next/head'

export default function Feed() {
  return (
    <FeedContainer>
      <SideMenu />
      <div className="center-content">
        <div className="page-title">
          <ChartLineUp size={32} color={'#50B2C0'} />
          <h1>Início</h1>
        </div>

        <h2>Seu último passeio</h2>
        <PostCardMy />

        <h2 className="recent">Avaliações mais recentes</h2>
        <PostCard />
        <PostCard />
      </div>

      <div className="side-content">
        <button>
          <PlusCircle color={'#50b2c0'} size={16} />
          Criar roteiro
        </button>

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
