import Header from '@/components/Header'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  // if (!session?.user) redirect('/sign-in')

  return (
    <main className=' flex min-h-screen flex-1 flex-col bg-pattern bg-cover bg-top bg-dark-100 px-5 xs:px-10 md:px-16 '>
      <div className='mx-auto max-w-7xl bg-accent'>
        <Header session={session!} />
        <div className='mt-20 pb-20'>{children}</div>
        Footer{' '}
      </div>
    </main>
  )
}

export default layout
