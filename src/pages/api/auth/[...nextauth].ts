import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getUserByEmail, createUserIfNotExists } from '@/utils/users'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.id_token) {
        return true
      }
      return false
    },
    async session({ session }) {
      const newUser = await createUserIfNotExists(session)
      if (newUser && newUser.id) {
        session.user = newUser
      } else {
        const authUser = await getUserByEmail(session?.user?.email)
        session.user = authUser
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
