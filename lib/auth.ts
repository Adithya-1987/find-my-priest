import NextAuth, { DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signUp: '/signup',
  },
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
}

export default NextAuth(authOptions)
