import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      return session
    },
    async signIn({ user, account, profile }) {
      return true
    }
  },
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt',
  },
}