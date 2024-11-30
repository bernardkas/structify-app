import React from 'react'
import { BeatLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <BeatLoader className='text-white' />
    </div>
  )
}

export default Loading