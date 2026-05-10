

import React from 'react'

const MissingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1>404 - Page Not Found</h1>
        <p>
          The pages you are looking for does not exist.... 
          <a href="/" className='text-blue-400 hover:text-blue-800 italic'>
            Click Here to go back to the home page
          </a>
        </p>
    </div>
  )
}

export default MissingPage
