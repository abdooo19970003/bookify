
import NextAuth, { NextAuthConfig, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./database/drizzle";
import { users } from "./database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      role: string
    } & User
  }
  interface User {
    role: string,
    fullName: string
  }
}

const config = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1)
          .then((users) => users[0])
        if (!user) {
          return null
        }
        const isPasswordMatch = await compare(
          credentials.password.toString(),
          user.password
        )
        return isPasswordMatch ? {
          id: user.id.toString(),
          email: user.email,
          fullName: user.fullName,
          role: user.role
        } as User : null
      },
    })
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
    error: "/sign-in",

  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
        token.fullName = user.fullName
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.fullName = token.fullName as string
      }
      return session
    }
  },
  session: {
    strategy: "jwt",

  },
  secret: process.env.BETTER_AUTH_SECRET,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config);