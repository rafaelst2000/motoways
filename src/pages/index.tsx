import { HomeContainer, HomeButton } from '@/styles/Home'
import Head from 'next/head'
import Image from 'next/image'

import homeImage from '@/assets/Image.png'
import googleIcon from '@/assets/GoogleIcon.svg'
import facebookIcon from '@/assets/FacebookIcon.svg'

export default function Home() {
  return (
    <>
      <Head>
        <title>Motoways - Login </title>
      </Head>
      <HomeContainer>
        <div className="image-container">
          <Image
            src={homeImage}
            alt="Motoways login image"
            layout=""
            priority
            className="image"
          />
        </div>
        <div className="login-box">
          <div>
            <h1>Boas vindas!</h1>
            <p>Faça seu login e encontre as melhores rotas</p>
            <HomeButton className="margin">
              <Image
                src={googleIcon}
                alt="Google icon"
                width={32}
                quality={100}
              />
              Entrar com Google
            </HomeButton>
            <HomeButton>
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
