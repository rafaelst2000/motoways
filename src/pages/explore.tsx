import { Input } from '@/components/Input'
import { ExploreContainer, TagsContainer } from '@/styles/Explore'
import { useState, useEffect } from 'react'
import { Binoculars, MagnifyingGlass } from 'phosphor-react'
import { Tag } from '@/components/Tag'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { getFilteredRoutes } from '@/utils/routes'
import { Route } from '@/@types'
import Loading from '@/components/Loading'
import Head from 'next/head'
import PostCardMin from '@/components/PostCardMin'
import SideMenu from '@/components/SideMenu'
import { getUf } from '@/utils/ufs'
import BottomMenu from '@/components/BottomMenu'

type UfItem = {
  value: string
  label: string
}
interface ExploreProps {
  routes: Route[]
  tags: UfItem[]
}

export default function Explore({ routes, tags }: ExploreProps) {
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([])
  const searchedRoutes = search
    ? filteredRoutes.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      )
    : filteredRoutes

  useEffect(() => {
    setFilteredRoutes(routes)
  }, [routes])

  async function filterRoutesByUf(uf: string) {
    if (uf === selectedTag) return
    setSelectedTag(uf)
    setIsLoading(true)
    const newRoutes = (await getFilteredRoutes(uf)) as Route[]
    setFilteredRoutes(newRoutes)
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>Motoways | Explorar</title>
      </Head>
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
              css={{}}
              value={search}
              className="search-input"
              onChange={({ target }) => setSearch(target.value)}
            />
          </div>

          <TagsContainer>
            {tags &&
              tags.map((tag) => (
                <Tag
                  active={tag.value === selectedTag}
                  key={tag.value}
                  onClick={() => filterRoutesByUf(tag.value)}
                >
                  {tag.label}
                </Tag>
              ))}
          </TagsContainer>

          {isLoading ? (
            <div className="cards">
              <Loading />
            </div>
          ) : (
            <div className="cards">
              {searchedRoutes &&
                searchedRoutes.map((route) => (
                  <div className="card" key={route.id}>
                    <PostCardMin route={route} showDetails={true} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </ExploreContainer>
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
  const routes = (await getFilteredRoutes()) as Route[]
  const allUfsFromRoutes = routes.map((route) => route.uf)
  const uniqueUfsSet = new Set(allUfsFromRoutes)
  const uniqueUfsArray = Array.from(uniqueUfsSet)
  const tags = uniqueUfsArray
    .map((tag) => ({ value: tag, label: getUf(tag) }))
    .sort((a, b) => a.label.localeCompare(b.label))
  tags.unshift({ value: '', label: 'Tudo' })
  return {
    props: {
      session,
      routes,
      tags,
    },
  }
}
