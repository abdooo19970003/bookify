import Image from 'next/image'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  if (session?.user) redirect('/')
  return (
    <main className='auth-container'>
      <section className='auth-form'>
        <div className='auth-box'>
          <div className='flex flex-row gap-3 items-center mb-6'>
            <Image
              src='/icons/logo.svg'
              alt='Logo'
              className='object-contain h-auto w-10'
              width={37}
              height={37}
            />
            <h1 className='text-2xl font-semibold text-white'>Bookify</h1>
          </div>
          <div className=''>{children}</div>
        </div>
      </section>
      <section className='auth-illustration'>
        <Image
          src='/images/auth-illustration.png'
          alt='Authentication Illustration'
          width={1000}
          height={1000}
          className='object-cover size-full'
        />
      </section>
    </main>
  )
}

export default layout
