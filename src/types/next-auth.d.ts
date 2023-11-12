declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image: string
      member_since: string
    }
  }
}
