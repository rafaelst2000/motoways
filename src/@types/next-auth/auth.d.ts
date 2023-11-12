import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    image: string
    member_since: string
  }

  interface Session {
    user: User
  }
}

/* declare module 'next-auth' {
  interface Session {
    user: {

    }
  }
} */
