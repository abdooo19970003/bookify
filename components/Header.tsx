'use client'
import { cn, getInitials } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Session } from 'next-auth'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname()
  return (
    <header className=' my-10 flex justify-between gap-5 '>
      <Link
        href='/'
        className='flex items-center gap-2'
      >
        <Image
          src='/icons/logo.svg'
          alt='logo'
          className='object-contain h-auto w-10'
          width={37}
          height={37}
        />
        <span className='text-lg font-bold text-white'>Bookify</span>
      </Link>

      <ul className='flex flex-row items-center gap-8'>
        <li>
          <Link
            className={cn(
              'text-base cursor-pointer capitalize',
              pathname === '/library' ? 'text-light-200' : 'text-light-100',
            )}
            href={'/library'}
          >
            Library
          </Link>
        </li>
        <li>
          {session.user && (
            <Link href={'/my-profile'}>
              <Avatar className=' p-3 w-16 h-auto'>
                {/* <AvatarImage
                  // src={`https://placehold.co/400/orange/444?font=roboto&text=${session.user.fullName.toUpperCase().slice(0, 2)}`}
                  src={'https://avatars.githubusercontent.com/u/70283286?v=4'}
                  className='object-cover w-full'
                /> */}
                <AvatarFallback className='text-white bg-orange-500 aspect-square text-xl font-semiabold '>
                  {getInitials(session.user.fullName)}
                </AvatarFallback>
              </Avatar>
              {/* <span className='text-light-200 font-bold text-2xl capitalize'>
                Welcome back, {session.data.user.fullName}
              </span> */}
            </Link>
          )}
        </li>
      </ul>
    </header>
  )
}

export default Header
