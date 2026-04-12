import { Book } from '@/types'
import Image from 'next/image'
import { Button } from './ui/button'
import BookCover from './BookCover'
const BookOverview = ({ ...props }: Book) => {
  return (
    <section className='flex flex-col-reverse items-center gap-12 sm:gap-32 xl:flex-row xl:gap-8'>
      <div className='flex flex-1 flex-col gap-5 '>
        <h1 className='text-5xl font-semibold text-white md:text-7xl'>
          {props.title}
        </h1>
        <div className='mt-7 flex flex-row flex-wrap gap-4 text-xl text-light-100'>
          <p>
            By{' '}
            <span className='font-semibold text-light-200'>
              {props.author}
            </span>{' '}
          </p>
          <p>
            Category{' '}
            <span className='font-semibold text-light-200'>
              {props.genre}
            </span>{' '}
          </p>
          <div className='flex flex-row gap-1'>
            <Image
              src='/icons/star.svg'
              alt='star'
              className='object-contain h-auto w-5'
              width={'22'}
              height={'22'}
            />
            <p className='font-semibold text-light-200'>{props.rating}</p>
          </div>
        </div>
        <div className='book-copies flex flex-row flex-wrap gap-4 mt-1'>
          <p className='text-xl text-light-100'>
            Total Books:{' '}
            <span className='ml-2 font-semibold text-primary'>
              {props.totalCopies}
            </span>
          </p>
          <p className='text-xl text-light-100'>
            Available Books:{' '}
            <span className='ml-2 font-semibold text-primary'>
              {props.availableCopies}
            </span>
          </p>
        </div>
        <p className='book-description mt-2 text-justify text-xl text-light-100'>
          {props.description}
        </p>
        <Button
          className='mt-4! min-h-14! w-fit! bg-primary! text-dark-100! hover:bg-primary/90! max-md:w-full!'
          variant={'outline'}
        >
          <Image
            src='/icons/book.svg'
            alt='book'
            width={20}
            height={20}
          />
          <p className='font-bebas-neue text-xl text-dark-100'>Borrow Now</p>
        </Button>
      </div>
      <div className='relative flex flex-1 justify-center '>
        <div className='relative'>
          <BookCover
            variant='wide'
            className='z-10'
            coverColor={props.coverColor}
            coverImage={props.coverUrl}
          />
          <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden'>
            <BookCover
              variant='wide'
              coverColor={props.coverColor}
              coverImage={props.coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookOverview
