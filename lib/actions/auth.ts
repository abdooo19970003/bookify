'use server'

import { db } from '@/database/drizzle'
import { eq } from 'drizzle-orm'
import { users } from '@/database/schema'

import { AuthCredentials } from '@/types'
import { hash } from 'bcryptjs'
import { signIn, signOut } from '@/auth'

export const signOutAction = async () => {
  await signOut()
}


export const signInWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
  try {
    const { email, password } = params
    const result = await signIn('credentials', { email, password, redirect: false, redirectTo: '/' })
    if (result?.error) {
      console.error('Sign in Error: ', result.error)
      return {
        success: false,
        error: result.error.message,
      }
    }
    return {
      success: true,
    }

  } catch (error) {
    console.error('Sign in Error: ', error)
    return {
      success: false,
      error: error || "Something went wrong",
    }
  }
}

export const signUpAction = async (
  params: AuthCredentials,
) => {
  console.log('params', params)
  const { fullName, email, password, universityId, universityCard } = params
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then((users) => users[0])
  if (existingUser) {
    console.log('User already exists')
    return {
      success: false,
      error: 'User already exists',
    }
  }
  const hashedPassword = await hash(password, 10)
  console.log('hashedPassword', hashedPassword)
  try {

    const newUser = await db
      .insert(users)
      .values({
        fullName,
        email,
        password: hashedPassword,
        universityId,
        universityCard,
      })
      .returning()
      .then((users) => users[0])
    await signInWithCredentials({ email, password }) // TO-DO
    return {
      success: true,
    }
  } catch (error) {
    console.error('Sign up Error: ', error)
    return {
      success: false,
      error: error || "Something went wrong",
    }
  }
}
