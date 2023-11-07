import Avatar from '@/components/Avatar'
import PostCard from '@/components/PostCard'
import PostCardMin from '@/components/PostCardMin'
import PostCardMy from '@/components/PostCardMy'
import SideMenu from '@/components/SideMenu'
import { ProfileContainer } from '@/styles/Profile'
import { ChatText, MapPin, MapTrifold, User } from '@phosphor-icons/react'
import Head from 'next/head'
import rafael from '@/assets/rafael.png'

export default function Feed() {
  const userData = [
    {
      label: "Km's rodados",
      value: 3853,
      icon: <MapPin size={32} color={'#50b2c0'} />,
    },
    {
      label: 'Rotas publicadas',
      value: 10,
      icon: <MapTrifold size={32} color={'#50b2c0'} />,
    },
    {
      label: 'Comentários',
      value: 8,
      icon: <ChatText size={32} color={'#50b2c0'} />,
    },
  ]

  return (
    <ProfileContainer>
      <SideMenu />
      <div className="center-content">
        <div className="page-title desktop">
          <User size={32} color={'#50B2C0'} />
          <h1>Perfil</h1>
        </div>

        <PostCardMy />
        <PostCardMy />
        <PostCardMy />
      </div>

      <div className="side-content">
        <div className="page-title mobile">
          <User size={32} color={'#50B2C0'} />
          <h1>Perfil</h1>
        </div>
        <div className="content">
          <Avatar variant="lg" url={rafael} />
          <h2>Rafael Trevisan</h2>
          <span>membro desde 2023</span>
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
  )
}
