import { sampleBooks } from '@/app/constants'
import BookList from '@/components/BookList'
import { Button } from '@/components/ui/button'
import { signOutAction } from '@/lib/actions/auth'
import { DoorOpen, LogOutIcon } from 'lucide-react'

const MyProfilePage = () => {
  return (
    <div className=' w-full px-3 py-8 flex flex-col justify-between  gap-7 '>
      <div className='text-amber-100 flex justify-between items-center gap-4 mt-10'>
        <div className=''>
          <h1>My Profile Page</h1>
          <p>This is the content of the My Profile page.</p>
        </div>
        <form action={signOutAction}>
          <Button
            variant={'default'}
            className='px-4 rounded-3xl shadow hover:bg-orange-400 float-end text-slate-800'
            type='submit'
          >
            Sign Out
            <LogOutIcon className='me-2' />
          </Button>
        </form>
      </div>
      <BookList
        title='Borrowed Books'
        books={sampleBooks}
      />
    </div>
  )
}

export default MyProfilePage
