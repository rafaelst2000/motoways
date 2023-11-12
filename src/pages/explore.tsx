import { Input } from '@/components/Input'
import { ExploreContainer, TagsContainer } from '@/styles/Explore'
import { useState, useEffect } from 'react'
import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react'
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

interface ExploreProps {
  routes: Route[]
}

export default function Explore({ routes }: ExploreProps) {
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

  const tags = [
    {
      label: 'Tudo',
      value: '',
    },
    {
      label: 'Rio Grande do Sul',
      value: 'rs',
    },
    {
      label: 'Santa Catarina',
      value: 'sc',
    },
    {
      label: 'Paraná',
      value: 'pr',
    },
  ]

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
  return {
    props: {
      session,
      routes,
    },
  }
}
