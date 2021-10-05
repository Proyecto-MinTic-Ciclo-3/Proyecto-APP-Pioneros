import React from 'react'
import {Link} from 'react-router-dom';
import ImagenLogo from 'components/ImagenLogo';

const AuthonLayout = ({children}) => {
    return (
    <div className='h-screen flex flex-col items-center justify-center  bg-gradient-to-t from-blue-400 to-blue-50'>
      <div className='max-w-md w-80'>
        <ImagenLogo/>
        {children}
      </div>
    </div>
  );
}

export default AuthonLayout
