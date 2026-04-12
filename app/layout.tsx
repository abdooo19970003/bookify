import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

const ibmPlexSans = localFont({
  variable: '--font-ibm-plex-sans',
  src: [
    { path: '/fonts/IBMPlexSans-Regular.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Medium.ttf', weight: '500', style: 'normal' },
    { path: '/fonts/IBMPlexSans-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '/fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal' },
  ],
})
const bebasNeue = localFont({
  src: [
    { path: '/fonts/BebasNeue-Regular.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-bebas-neue',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bookify',
  description: 'Book Borrowing platform',
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  return (
    <html
      lang='en'
      className={`${ibmPlexSans.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <SessionProvider session={session}>
        <body className='min-h-screen min-w-scree'>
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}

export default RootLayout
export { ibmPlexSans, bebasNeue }
