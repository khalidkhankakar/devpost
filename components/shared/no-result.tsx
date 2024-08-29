import Image from 'next/image'
import React from 'react'

const NoResult = ({msg}:{msg:string}) => {
  return (
    <div className='flex h-full items-center space-y-3 justify-center flex-col'>
        <Image src={'/not-found.png'}  width={500} height={500} className='object-contain h-20 ' alt='not-found'/>
      <p className='text-xl font-semibold'>{msg}</p>
    </div>
  )
}

export default NoResult
