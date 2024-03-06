import { HomeContainer, HomeButton } from '@/styles/Home'
import Head from 'next/head'
import Image from 'next/image'

import homeImage from '@/assets/Image.png'
import googleIcon from '@/assets/GoogleIcon.svg'
import logo from '@/assets/Logo.png'
import { signIn } from 'next-auth/react'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'

export default function Home() {
  return (
    <>
      <Head>
        <title>Motoways | Login</title>
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
            <HomeButton
              className="margin"
              onClick={(e) => {
                e.preventDefault()
                signIn('google')
              }}
            >
              <Image
                src={googleIcon}
                alt="Google icon"
                width={32}
                quality={100}
              />
              Entrar com Google
            </HomeButton>
          </div>
        </div>
      </HomeContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      props: {
        session,
      },
      redirect: {
        destination: '/feed',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
