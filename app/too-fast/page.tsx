import React from 'react'

const TooFastPage = () => {
  return (
    <main className='root-container flex justify-center items-center flex-col bg-slate-100 min-h-screen gap-5 max-w-7xl'>
      <h1 className='text-6xl font-bebas-neue text-light-100 tracking-widest'>
        Whoa, Slow down buddy
      </h1>
      <p className='font-light text-lg text-light-500 max-w-xl text-center'>
        Looks like you&apos;ve been a little too eager, we&apos;ve put a
        temporary pause on your excitment.🚦chill for a bit, and try again
        shortly
      </p>
    </main>
  )
}

export default TooFastPage
