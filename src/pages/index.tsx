import { HomeContainer, HomeButton } from '@/styles/Home'
import Head from 'next/head'
import Image from 'next/image'

import homeImage from '@/assets/Image.png'
import googleIcon from '@/assets/GoogleIcon.svg'
import facebookIcon from '@/assets/FacebookIcon.svg'
import logo from '@/assets/Logo.png'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  function goToFeed() {
    router.push('/feed')
  }

  return (
    <>
      <Head>
        <title>Motoways - Login </title>
      </Head>
      <HomeContainer>
        <Image
          src={homeImage}
          width={0}
          height={0}
          layout="responsive"
          quality={100}
          priority={true}
          alt="Motoways login image"
          className="image"
        />

        <div className="login-box">
          <div>
            <div className="logo-container">
              <Image
                src={logo}
                width={0}
                height={0}
                layout="responsive"
                quality={100}
                priority={true}
                alt="Motoways logo"
                className="logo"
              />
            </div>
            <h1>Boas vindas!</h1>
            <p>Faça seu login e encontre as melhores rotas</p>
            <HomeButton className="margin" onClick={goToFeed}>
              <Image
                src={googleIcon}
                alt="Google icon"
                width={32}
                quality={100}
              />
              Entrar com Google
            </HomeButton>
            <HomeButton onClick={goToFeed}>
              <Image
                src={facebookIcon}
                alt="Facebook icon"
                width={32}
                quality={100}
              />
              Entrar com Facebook
            </HomeButton>
          </div>
        </div>
      </HomeContainer>
    </>
  )
}
