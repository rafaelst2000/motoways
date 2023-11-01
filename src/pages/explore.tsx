import { Input } from '@/components/Input'
import PostCard from '@/components/PostCard'
import PostCardMin from '@/components/PostCardMin'
import PostCardMy from '@/components/PostCardMy'
import SideMenu from '@/components/SideMenu'
import { ExploreContainer, TagsContainer } from '@/styles/Explore'
import { useState } from 'react'
import {
  Binoculars,
  CaretRight,
  ChartLineUp,
  MagnifyingGlass,
  PlusCircle,
} from '@phosphor-icons/react'
import Head from 'next/head'
import { Tag } from '@/components/Tag'

export default function Explore() {
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const tags = [
    {
      label: 'Tudo',
      value: 'all',
    },
    {
      label: 'Rio Grande do Sul',
      value: 'RS',
    },
    {
      label: 'Santa Catarina',
      value: 'SC',
    },
  ]

  return (
    <ExploreContainer>
      <SideMenu />
      <div className="center-content">
        <div className="title-container">
          <div className="page-title">
            <Binoculars size={32} color={'#50B2C0'} />
            <h1>Explorar </h1>
          </div>

          <Input
            placeholder="Buscar destino"
            icon={<MagnifyingGlass size={20} />}
            css={{ maxWidth: 433 }}
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </div>

        <TagsContainer>
          {tags.map((tag) => (
            <Tag
              active={tag.value === selectedTag}
              key={tag.value}
              onClick={() => setSelectedTag(tag.value)}
            >
              {tag.label}
            </Tag>
          ))}
        </TagsContainer>

        <div className="cards">
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
          <PostCardMin />
        </div>
      </div>
    </ExploreContainer>
  )
}
