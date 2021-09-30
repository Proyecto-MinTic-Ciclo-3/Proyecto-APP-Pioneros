import React from 'react'
import {Link} from 'react-router-dom';
import Logo from '../media/Logo1.jpg'

const AuthonLayout = ({children}) => {
    return (
    <div className='min-h-screen flex flex-col items-center justify-center  bg-gradient-to-t from-blue-400 to-blue-50  py-2 px-4 sm:px-6 lg:px-8'>
      <div className='w-full flex items-start'>
        <Link to='/'>
          <i className='fas fa-home cursor-pointer hover:text-indigo-500' />
        </Link>
      </div>
      <div className='max-w-md w-80'>
        <img className='mx-auto h-52 w-auto' src={Logo} alt='Workflow' />
        {children}
      </div>
    </div>
  );
}

export default AuthonLayout
